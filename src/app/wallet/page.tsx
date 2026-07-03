import Link from "next/link";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Cause, Donation } from "@/lib/models";
import { getSessionUser } from "@/lib/session";
import { naira, timeAgo } from "@/lib/format";
import DisburseForm from "./DisburseForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Wallet",
  robots: { index: false },
};

const STATUS_STYLES: Record<string, { label: string; cls: string }> = {
  live: { label: "Live", cls: "bg-white/10 text-foreground" },
  funded: { label: "Funded", cls: "bg-sky-500/15 text-sky-400" },
  completed: { label: "Completed", cls: "bg-accent/15 text-accent" },
};

export default async function WalletPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  await dbConnect();
  const [myCauses, myDonations] = await Promise.all([
    Cause.find({ organizer: user._id }).sort({ createdAt: -1 }).lean(),
    Donation.find({ donor: user._id })
      .sort({ createdAt: -1 })
      .populate<{ cause: { title: string; slug: string } }>("cause")
      .lean(),
  ]);

  const totalEscrow = myCauses.reduce((s, c) => s + c.escrowBalance, 0);
  const totalGiven = myDonations.reduce((s, d) => s + d.amount, 0);
  const trust = Math.min(5, Math.max(0, user.trustLevel));

  return (
    <div>
      <div className="sticky top-0 z-10 border-b border-line bg-black/80 px-4 py-3 backdrop-blur">
        <h1 className="text-xl font-extrabold">Wallet</h1>
      </div>

      {/* balance summary */}
      <div className="border-b border-line px-4 py-5">
        <p className="text-sm text-muted">Held in escrow across your causes</p>
        <p className="mt-1 text-[34px] font-extrabold leading-none tracking-tight">
          {naira(totalEscrow)}
        </p>
        <p className="mt-2 text-[13px] leading-snug text-muted">
          Escrow funds never touch your account. They can only be paid to the verified vendors on
          each cause&rsquo;s published budget.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-line p-3.5">
            <p className="text-[12px] uppercase tracking-wide text-muted">Raise limit</p>
            <p className="mt-1 truncate text-lg font-extrabold text-accent">
              {naira(user.raiseLimit)}
            </p>
          </div>
          <div className="rounded-2xl border border-line p-3.5">
            <p className="text-[12px] uppercase tracking-wide text-muted">Total given</p>
            <p className="mt-1 truncate text-lg font-extrabold">{naira(totalGiven)}</p>
          </div>
        </div>

        {/* trust level */}
        <div className="mt-3 rounded-2xl border border-line p-3.5">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-bold">Trust level</p>
            <p className="text-sm text-muted">{trust} of 5</p>
          </div>
          <div className="mt-2.5 flex gap-1.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i <= trust ? "bg-accent" : "bg-white/10"}`}
              />
            ))}
          </div>
          <p className="mt-2.5 text-[13px] leading-snug text-muted">
            Visible only to you. Completing causes with receipts raises your level and your raise
            limit. {user.completedCauses} completed so far.
          </p>
        </div>
      </div>

      {/* organizer view */}
      <section className="border-b border-line px-4 py-5">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-extrabold">Causes you manage</h2>
          {myCauses.length > 0 && (
            <p className="text-sm text-muted">
              {myCauses.length} cause{myCauses.length === 1 ? "" : "s"}
            </p>
          )}
        </div>

        {myCauses.length === 0 ? (
          <div className="mt-3 rounded-2xl border border-line p-6 text-center">
            <p className="text-muted">You aren&rsquo;t managing any causes yet.</p>
            <Link
              href="/create"
              className="mt-3 inline-block rounded-full bg-accent px-5 py-2 text-sm font-bold text-black transition hover:bg-accent/90"
            >
              Start a cause
            </Link>
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-3">
            {myCauses.map((c) => {
              const status = STATUS_STYLES[c.status] ?? STATUS_STYLES.live;
              return (
                <div key={String(c._id)} className="rounded-2xl border border-line p-4">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/cause/${c.slug}`}
                      className="min-w-0 font-bold leading-snug hover:underline"
                    >
                      {c.title}
                    </Link>
                    <span
                      className={`shrink-0 rounded-full px-3 py-0.5 text-xs font-bold ${status.cls}`}
                    >
                      {status.label}
                    </span>
                  </div>

                  <div className="mt-3 flex gap-8">
                    <div>
                      <p className="text-[12px] uppercase tracking-wide text-muted">Raised</p>
                      <p className="mt-0.5 font-bold">{naira(c.raised)}</p>
                    </div>
                    <div>
                      <p className="text-[12px] uppercase tracking-wide text-muted">In escrow</p>
                      <p className="mt-0.5 font-bold text-accent">{naira(c.escrowBalance)}</p>
                    </div>
                  </div>

                  {c.status !== "completed" && c.escrowBalance > 0 ? (
                    <DisburseForm
                      causeId={String(c._id)}
                      escrow={c.escrowBalance}
                      items={c.budget.map((b) => ({
                        label: b.label,
                        remaining: b.amount - b.spent,
                        vendor: b.vendor.name,
                      }))}
                    />
                  ) : c.status === "completed" ? (
                    <p className="mt-3 border-t border-line pt-3 text-sm text-muted">
                      All funds paid out to vendors, with receipts on the cause page.
                    </p>
                  ) : (
                    <p className="mt-3 border-t border-line pt-3 text-sm text-muted">
                      Nothing in escrow yet. Share the cause link to start raising.
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* donor view */}
      <section className="px-4 py-5">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-extrabold">Your giving</h2>
          {myDonations.length > 0 && (
            <p className="text-sm text-muted">{naira(totalGiven)} total</p>
          )}
        </div>

        {myDonations.length === 0 ? (
          <div className="mt-3 rounded-2xl border border-line p-6 text-center">
            <p className="text-muted">No donations yet.</p>
            <Link
              href="/explore"
              className="mt-2 inline-block text-sm font-bold text-accent hover:underline"
            >
              Explore causes
            </Link>
          </div>
        ) : (
          <div className="mt-3 overflow-hidden rounded-2xl border border-line">
            {myDonations.map((d) => (
              <Link
                key={String(d._id)}
                href={`/cause/${d.cause?.slug ?? ""}`}
                className="flex items-center justify-between gap-3 border-b border-line p-3.5 transition last:border-0 hover:bg-white/[0.03]"
              >
                <div className="min-w-0">
                  <p className="truncate text-[15px] font-semibold">
                    {d.cause?.title ?? "Cause"}
                  </p>
                  <p className="mt-0.5 text-[13px] text-muted">{timeAgo(d.createdAt)}</p>
                </div>
                <span className="shrink-0 font-bold text-accent">{naira(d.amount)}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
