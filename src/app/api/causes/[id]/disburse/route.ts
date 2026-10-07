import { NextRequest, NextResponse, after } from "next/server";
import { dbConnect } from "@/lib/db";
import { Cause, Donation, Disbursement, Notification, User } from "@/lib/models";
import { getSessionUser } from "@/lib/session";
import { sendMail, paidOutEmail } from "@/lib/mail";

/**
 * The heart of Kairos: money leaves escrow only toward a named vendor on a
 * published budget line - and every donor is told, proportionally, what THEIR
 * money just did.
 */
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { id } = await ctx.params;
  const { budgetLabel, amount, note } = await req.json();
  const amt = Math.floor(Number(amount));

  await dbConnect();
  const cause = await Cause.findById(id);
  if (!cause) return NextResponse.json({ error: "Cause not found" }, { status: 404 });
  if (String(cause.organizer) !== String(user._id))
    return NextResponse.json({ error: "Only the organizer can direct payments" }, { status: 403 });

  const item = cause.budget.find((b) => b.label === budgetLabel);
  if (!item) return NextResponse.json({ error: "Budget item not found" }, { status: 400 });
  if (!item.vendor?.verified)
    return NextResponse.json(
      { error: "Vendor failed verification - payment paused for review" },
      { status: 400 }
    );
  if (!amt || amt <= 0) return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  if (amt > cause.escrowBalance)
    return NextResponse.json({ error: "Amount exceeds escrow balance" }, { status: 400 });
  if (amt > item.amount - item.spent)
    return NextResponse.json({ error: "Amount exceeds what this line item has left" }, { status: 400 });

  const invoiceNo = "#" + String(Math.floor(1000 + Math.random() * 9000));

  const disb = await Disbursement.create({
    cause: cause._id,
    budgetLabel: item.label,
    vendorName: item.vendor.name,
    vendorAccount: item.vendor.account,
    amount: amt,
    invoiceNo,
    note,
  });

  item.spent += amt;
  cause.escrowBalance -= amt;

  // completed when every line item is fully spent
  const allSpent = cause.budget.every((b) => b.spent >= b.amount);
  if (allSpent) cause.status = "completed";
  await cause.save();

  /* ---- donor-level attribution: every donor sees their own money move ---- */
  const donations = await Donation.find({ cause: cause._id });
  const byDonor = new Map<string, number>();
  for (const d of donations) {
    // a donor's claim is what reached escrow, not what they paid
    const credited = d.net ?? d.amount;
    byDonor.set(String(d.donor), (byDonor.get(String(d.donor)) ?? 0) + credited);
  }
  const pct = cause.raised > 0 ? amt / cause.raised : 0;

  const notifications = [...byDonor.entries()].map(([donorId, donorTotal]) => ({
    user: donorId,
    type: "money_moved" as const,
    title: "Your donation was paid out",
    body: `₦${Math.round(donorTotal * pct).toLocaleString()} of your ₦${donorTotal.toLocaleString()} was paid to ${item.vendor.name} for “${item.label}” (Invoice ${invoiceNo}).`,
    causeSlug: cause.slug,
    detail: {
      yourShare: Math.round(donorTotal * pct),
      yourDonation: donorTotal,
      totalPaid: amt,
      vendor: item.vendor.name,
      invoiceNo,
      pct: Math.round(pct * 100),
    },
  }));
  const inserted = notifications.length ? await Notification.insertMany(notifications) : [];

  /* Hand the donor alerts back to the caller so the organizer's tab can
     announce them to the donor's tab. Same browser, one session cookie - the
     donor tab cannot poll for these itself. */
  const donorNames = new Map(
    (await User.find({ _id: { $in: [...byDonor.keys()] } }, { name: 1 })).map(
      (u) => [String(u._id), u.name as string]
    )
  );
  const alerts = inserted.map((n, i) => ({
    id: String(n._id),
    title: notifications[i].title,
    body: notifications[i].body,
    url: `/cause/${cause.slug}`,
    donorName: donorNames.get(String(notifications[i].user)) ?? "A donor",
  }));

  /* and by email, for the donors who gave us an address */
  const donors = await User.find(
    { _id: { $in: [...byDonor.keys()] }, email: { $exists: true, $ne: "" } },
    { name: 1, email: 1 }
  );
  /* After the response. With one handshake per donor this is the difference
     between an instant receipt and a payout that appears to hang. */
  after(() => Promise.all(
    donors.map((d) => {
      const credited = byDonor.get(String(d._id)) ?? 0;
      const mail = paidOutEmail({
        donorName: (d.name || "there").split(" ")[0],
        share: Math.round(credited * pct),
        credited,
        vendor: item.vendor.name,
        causeTitle: cause.title,
        causeSlug: cause.slug,
        invoiceNo,
        pct: Math.round(pct * 100),
      });
      return sendMail(d.email as string, mail.subject, mail.html);
    })
  ));

  /* ---- trust grows with honest, completed execution ---- */
  if (allSpent) {
    await User.findByIdAndUpdate(cause.organizer, {
      $inc: { trustLevel: 1, completedCauses: 1 },
      $mul: { raiseLimit: 2 },
    });
    await Notification.create({
      user: cause.organizer,
      type: "milestone",
      title: "Cause completed",
      body: `“${cause.title}” is fully paid out, with receipts. Your trust level went up, so you can now raise more.`,
      causeSlug: cause.slug,
    });
  }

  return NextResponse.json({
    ok: true,
    invoiceNo,
    notified: notifications.length,
    alerts,
    disbursementId: String(disb._id),
    completed: allSpent,
  });
}
