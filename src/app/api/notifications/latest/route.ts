import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Notification } from "@/lib/models";
import { getSessionUser } from "@/lib/session";

export const dynamic = "force-dynamic";

/** The few most recent notifications, for the desktop-alert poller. */
export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ items: [] });
  await dbConnect();
  const items = await Notification.find({ user: user._id })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();
  return NextResponse.json({
    items: items.map((n) => ({
      id: String(n._id),
      type: n.type,
      title: n.title,
      body: n.body,
      causeSlug: n.causeSlug ?? null,
      at: n.createdAt,
    })),
  });
}
