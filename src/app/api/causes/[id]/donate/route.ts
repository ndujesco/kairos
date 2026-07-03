import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Cause, Donation, Notification } from "@/lib/models";
import { getSessionUser } from "@/lib/session";

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

  const remaining = cause.goal - cause.raised;
  if (remaining <= 0)
    return NextResponse.json(
      { error: "This cause is fully funded. Thank you, but it no longer needs donations." },
      { status: 400 }
    );
  if (amt > remaining)
    return NextResponse.json(
      {
        error: `Only ₦${remaining.toLocaleString()} is needed to complete this cause. Please donate ₦${remaining.toLocaleString()} or less.`,
        remaining,
      },
      { status: 400 }
    );

  const already = await Donation.exists({ cause: cause._id, donor: user._id });

  await Donation.create({ cause: cause._id, donor: user._id, amount: amt, anonymous: Boolean(anonymous) });
  cause.raised += amt;
  cause.escrowBalance += amt;
  if (!already) cause.donorCount += 1;
  if (cause.raised >= cause.goal && cause.status === "live") cause.status = "funded";
  await cause.save();

  // notify the organizer
  await Notification.create({
    user: cause.organizer,
    type: "donation_received",
    title: "New donation in escrow",
    body: `${anonymous ? "An anonymous donor" : `@${user.handle}`} put ₦${amt.toLocaleString()} into escrow for “${cause.title}”.`,
    causeSlug: cause.slug,
  });

  return NextResponse.json({ ok: true, raised: cause.raised });
}
