import Link from "next/link";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Notification } from "@/lib/models";
import { getSessionUser } from "@/lib/session";
import { naira, timeAgo } from "@/lib/format";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Notifications",
  robots: { index: false },
};

const ICONS: Record<string, { path: string; cls: string }> = {
  money_moved: {
    path: "M2.01 21L23 12 2.01 3 2 10l15 2-15 2z",
    cls: "bg-accent/15 text-accent",
  },
  donation_received: {
    path: "M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z",
    cls: "bg-sky-500/15 text-sky-400",
  },
  milestone: {
    path: "M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z",
    cls: "bg-amber-500/15 text-amber-400",
  },
  vouch: {
    path: "M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z",
    cls: "bg-rose-500/15 text-rose-400",
  },
};

const DEFAULT_ICON = {
  path: "M12 2C7.58 2 4 5.58 4 10v5l-2 2v1h20v-1l-2-2v-5c0-4.42-3.58-8-8-8zm0 20c1.38 0 2.5-1.12 2.5-2.5h-5c0 1.38 1.12 2.5 2.5 2.5z",
  cls: "bg-white/10 text-muted",
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
          Nothing here yet. When money you gave is paid out, the receipt lands here.
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
            {(() => {
              const icon = ICONS[n.type] ?? DEFAULT_ICON;
              return (
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${icon.cls}`}
                >
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
                    <path d={icon.path} />
                  </svg>
                </span>
              );
            })()}
            <div className="min-w-0 flex-1">
              <p className="font-bold">
                {n.title} <span className="font-normal text-muted">· {timeAgo(n.createdAt)}</span>
              </p>
              <p className="mt-0.5 text-[15px] text-foreground/90">{n.body}</p>

              {n.type === "money_moved" && n.detail?.yourShare != null && (
                <div className="mt-2 rounded-xl border border-accent/40 bg-accent/5 p-3">
                  <p className="text-[13px] uppercase tracking-wide text-muted">
                    Your share of this payment
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
                  <p className="mt-2 text-sm font-bold text-accent">View receipt and photos</p>
                </div>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
