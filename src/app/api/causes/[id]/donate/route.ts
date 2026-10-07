import { NextRequest, NextResponse, after } from "next/server";
import { dbConnect } from "@/lib/db";
import { Cause, Donation, Notification } from "@/lib/models";
import { getSessionUser } from "@/lib/session";
import { upkeepFor } from "@/lib/fees";
import { sendMail, donationEmail } from "@/lib/mail";

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { id } = await ctx.params;
  const { amount, anonymous } = await req.json();
  const amt = Math.floor(Number(amount));
  if (!amt || amt < 100) return NextResponse.json({ error: "Invalid amount" }, { status: 400 });

  await dbConnect();
  const cause = await Cause.findById(id);
  if (!cause) return NextResponse.json({ error: "Cause not found" }, { status: 404 });
  if (cause.status === "completed")
    return NextResponse.json({ error: "This cause is completed" }, { status: 400 });

  /* Upkeep comes off before the money reaches escrow, so it is the NET that
     counts toward the goal. Compare on that, or a donor is told they can give
     less than they actually can. */
  const upkeep = upkeepFor(amt, cause.upkeepTaken ?? 0);
  const net = amt - upkeep;

  const remaining = cause.goal - cause.raised;
  if (remaining <= 0)
    return NextResponse.json(
      { error: "This cause is fully funded. Thank you, but it no longer needs donations." },
      { status: 400 }
    );
  if (net > remaining) {
    // the largest gift whose net still fits
    const maxGift = Math.floor(remaining / (1 - 0.02));
    return NextResponse.json(
      {
        error: `Only ₦${remaining.toLocaleString()} more is needed. Please give ₦${maxGift.toLocaleString()} or less.`,
        remaining,
      },
      { status: 400 }
    );
  }

  const already = await Donation.exists({ cause: cause._id, donor: user._id });

  await Donation.create({
    cause: cause._id, donor: user._id, amount: amt,
    upkeep, net, anonymous: Boolean(anonymous),
  });
  cause.raised += net;
  cause.escrowBalance += net;
  cause.upkeepTaken = (cause.upkeepTaken ?? 0) + upkeep;
  if (!already) cause.donorCount += 1;
  if (cause.raised >= cause.goal && cause.status === "live") cause.status = "funded";
  await cause.save();

  // notify the organizer
  await Notification.create({
    user: cause.organizer,
    type: "donation_received",
    title: "New donation in escrow",
    body: `${anonymous ? "An anonymous donor" : `@${user.handle}`} gave ₦${amt.toLocaleString()}. ₦${net.toLocaleString()} is in escrow for “${cause.title}” after ₦${upkeep.toLocaleString()} upkeep.`,
    causeSlug: cause.slug,
  });

  /* The receipt goes out after the response, not before it. An SMTP handshake
     is seconds of someone staring at "confirming your transfer", and a mail
     server having a bad day must never look like a failed donation. */
  if (user.email) {
    const mail = donationEmail({
      donorName: (user.name || "there").split(" ")[0],
      amount: amt, upkeep, net,
      causeTitle: cause.title, causeSlug: cause.slug,
    });
    after(() => sendMail(user.email as string, mail.subject, mail.html));
  }

  return NextResponse.json({ ok: true, raised: cause.raised, upkeep, net });
}
