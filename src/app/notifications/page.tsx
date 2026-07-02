import Link from "next/link";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Notification } from "@/lib/models";
import { getSessionUser } from "@/lib/session";
import { naira, timeAgo } from "@/lib/format";

export const dynamic = "force-dynamic";

const ICONS: Record<string, string> = {
  money_moved: "💸",
  donation_received: "🔒",
  milestone: "🎉",
  vouch: "🤝",
};

export default async function NotificationsPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  await dbConnect();
  const items = await Notification.find({ user: user._id }).sort({ createdAt: -1 }).limit(50).lean();
  // mark as read once seen
  await Notification.updateMany({ user: user._id, read: false }, { $set: { read: true } });

  return (
    <div>
      <div className="sticky top-0 z-10 border-b border-line bg-black/80 px-4 py-3 backdrop-blur">
        <h1 className="text-xl font-extrabold">Notifications</h1>
      </div>

      {items.length === 0 && (
        <p className="p-8 text-center text-muted">
          Nothing yet. When money you gave moves, you’ll see it here first.
        </p>
      )}

      {items.map((n) => (
        <Link
          key={String(n._id)}
          href={`/cause/${n.causeSlug}`}
          className={`block border-b border-line px-4 py-3 transition hover:bg-white/[0.03] ${
            !n.read ? "bg-accent/[0.04]" : ""
          }`}
        >
          <div className="flex gap-3">
            <span className="text-2xl">{ICONS[n.type] ?? "🔔"}</span>
            <div className="min-w-0 flex-1">
              <p className="font-bold">
                {n.title} <span className="font-normal text-muted">· {timeAgo(n.createdAt)}</span>
              </p>
              <p className="mt-0.5 text-[15px] text-foreground/90">{n.body}</p>

              {n.type === "money_moved" && n.detail?.yourShare != null && (
                <div className="mt-2 rounded-xl border border-accent/40 bg-accent/5 p-3">
                  <p className="text-[13px] uppercase tracking-wide text-muted">
                    Your donation just moved
                  </p>
                  <p className="mt-1 text-xl font-extrabold text-accent">
                    {naira(n.detail.yourShare)}{" "}
                    <span className="text-sm font-normal text-muted">
                      of your {naira(n.detail.yourDonation ?? 0)}
                    </span>
                  </p>
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-muted">Paid to</p>
                      <p className="font-bold">{n.detail.vendor}</p>
                    </div>
                    <div>
                      <p className="text-muted">Invoice</p>
                      <p className="font-bold">{n.detail.invoiceNo}</p>
                    </div>
                    <div>
                      <p className="text-muted">Share of payment</p>
                      <p className="font-bold">{n.detail.pct}% of your gift</p>
                    </div>
                    <div>
                      <p className="text-muted">Total paid</p>
                      <p className="font-bold">{naira(n.detail.totalPaid ?? 0)}</p>
                    </div>
                  </div>
                  <p className="mt-2 text-sm font-bold text-accent">View receipt & photos →</p>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
