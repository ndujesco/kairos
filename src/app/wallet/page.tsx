import Link from "next/link";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Cause, Disbursement, Donation } from "@/lib/models";
import { getSessionUser } from "@/lib/session";
import { naira, timeAgo, gradient } from "@/lib/format";
import DisburseForm from "./DisburseForm";
import WalletTabs from "./WalletTabs";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Wallet",
  robots: { index: false },
};

const STATUS: Record<string, { label: string; cls: string }> = {
  live: { label: "Raising", cls: "bg-white/10 text-foreground" },
  funded: { label: "Funded", cls: "bg-sky-500/15 text-sky-400" },
  completed: { label: "Paid out", cls: "bg-accent/15 text-accent" },
};

export default async function WalletPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  await dbConnect();
  const [myCauses, myDonations] = await Promise.all([
    Cause.find({ organizer: user._id }).sort({ createdAt: -1 }).lean(),
    Donation.find({ donor: user._id })
      .sort({ createdAt: -1 })
      .populate<{ cause: { title: string; slug: string; coverEmoji: string; coverColor: string } }>(
        "cause"
      )
      .lean(),
  ]);
  const payouts = await Disbursement.find({ cause: { $in: myCauses.map((c) => c._id) } })
    .sort({ createdAt: -1 })
    .lean();

  const totalEscrow = myCauses.reduce((s, c) => s + c.escrowBalance, 0);
  const totalGiven = myDonations.reduce((s, d) => s + d.amount, 0);
  const totalToCauses = myDonations.reduce((s, d) => s + (d.net ?? d.amount), 0);
  const totalPaidOut = payouts.reduce((s, p) => s + p.amount, 0);
  const trust = Math.min(5, Math.max(0, user.trustLevel));
  const isOrganizer = myCauses.length > 0;

  /* ------------------------------ managing ------------------------------ */
  const manage =
    myCauses.length === 0 ? (
      <Empty
        line="You are not managing any causes yet."
        href="/create"
        cta="Start a cause"
        solid
      />
    ) : (
      <div>
        {myCauses.map((c) => {
          const st = STATUS[c.status] ?? STATUS.live;
          const pct = c.goal > 0 ? Math.min(100, Math.round((c.raised / c.goal) * 100)) : 0;
          const paid = payouts.filter((p) => String(p.cause) === String(c._id));
          return (
            <div key={String(c._id)} className="border-b border-line px-4 py-4">
              <div className="flex gap-3">
                <div
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-xl ${gradient(
                    c.coverColor
                  )}`}
                >
                  {c.coverEmoji}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/cause/${c.slug}`}
                      className="min-w-0 text-[15px] font-bold leading-snug hover:underline"
                    >
                      {c.title}
                    </Link>
                    <span className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>

                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-accent" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="mt-1.5 flex items-baseline justify-between text-[13px]">
                    <span className="tabular-nums text-muted">
                      <b className="text-foreground">{naira(c.raised)}</b> of {naira(c.goal)}
                    </span>
                    <span className="tabular-nums text-muted">{pct}%</span>
                  </div>

                  <dl className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-[13px]">
                    <div className="flex gap-1.5">
                      <dt className="text-muted">In escrow</dt>
                      <dd className="font-bold tabular-nums text-accent">{naira(c.escrowBalance)}</dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="text-muted">Paid out</dt>
                      <dd className="font-bold tabular-nums">
                        {naira(paid.reduce((s, p) => s + p.amount, 0))}
                      </dd>
                    </div>
                    <div className="flex gap-1.5">
                      <dt className="text-muted">Donors</dt>
                      <dd className="font-bold tabular-nums">{c.donorCount}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {c.status !== "completed" && c.escrowBalance > 0 ? (
                <DisburseForm
                  causeId={String(c._id)}
                  escrow={c.escrowBalance}
                  causeTitle={c.title}
                  items={c.budget.map((b) => ({
                    label: b.label,
                    remaining: b.amount - b.spent,
                    vendor: b.vendor.name,
                    rrr: b.rrr ?? null,
                    rrrStudent: b.rrrStudent ?? null,
                    rrrMatric: b.rrrMatric ?? null,
                  }))}
                />
              ) : null}

              {paid.length > 0 && (
                <ul className="mt-3 border-t border-line pt-3">
                  {paid.map((p) => (
                    <li
                      key={String(p._id)}
                      className="flex items-baseline justify-between gap-3 py-1 text-[13px]"
                    >
                      <span className="min-w-0 truncate text-muted">
                        <span className="text-foreground">Paid</span> {p.vendorName}
                        <span className="text-muted"> · {p.invoiceNo}</span>
                      </span>
                      <span className="shrink-0 tabular-nums text-muted">
                        &minus;{naira(p.amount)}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    );

  /* ------------------------------- giving ------------------------------- */
  const give =
    myDonations.length === 0 ? (
      <Empty line="You have not given to anything yet." href="/explore" cta="Explore causes" />
    ) : (
      <div>
        {myDonations.map((d) => {
          const net = d.net ?? d.amount;
          const upkeep = d.upkeep ?? 0;
          return (
            <Link
              key={String(d._id)}
              href={`/cause/${d.cause?.slug ?? ""}`}
              className="flex gap-3 border-b border-line px-4 py-3.5 transition hover:bg-white/[0.03]"
            >
              <div
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br text-lg ${gradient(
                  d.cause?.coverColor ?? "emerald"
                )}`}
              >
                {d.cause?.coverEmoji ?? "💚"}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="min-w-0 truncate text-[15px] font-semibold">
                    {d.cause?.title ?? "Cause"}
                  </p>
                  <span className="shrink-0 font-bold tabular-nums">&minus;{naira(d.amount)}</span>
                </div>
                <div className="mt-0.5 flex items-baseline justify-between gap-3 text-[13px] text-muted">
                  <span className="truncate">
                    Given · {timeAgo(d.createdAt)}
                    {d.anonymous ? " · anonymous" : ""}
                  </span>
                  <span className="shrink-0 tabular-nums">
                    {naira(net)} to the cause
                    {upkeep > 0 ? ` · ${naira(upkeep)} upkeep` : ""}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
        <p className="px-4 py-4 text-[13px] text-muted">
          {naira(totalGiven)} given in total, of which{" "}
          <b className="tabular-nums text-foreground">{naira(totalToCauses)}</b> reached causes.
          The difference is upkeep, capped at {naira(5000)} per cause.
        </p>
      </div>
    );

  return (
    <div>
      <header className="sticky top-0 z-20 flex h-[57px] items-center border-b border-line bg-black/70 px-4 backdrop-blur-md">
        <div>
          <h1 className="text-xl font-extrabold leading-tight">Wallet</h1>
          <p className="text-[12px] leading-tight text-muted">@{user.handle}</p>
        </div>
      </header>

      {/* the one number that matters, which depends on who is asking */}
      <section className="border-b border-line px-4 py-5">
        <p className="text-[13px] text-muted">
          {isOrganizer ? "Held in escrow across your causes" : "You have given"}
        </p>
        <p className="mt-1 text-[40px] font-extrabold leading-none tracking-tight tabular-nums">
          {naira(isOrganizer ? totalEscrow : totalGiven)}
        </p>

        <div className="mt-3 flex items-start gap-2 rounded-xl border border-line bg-white/[0.02] p-3">
          <span aria-hidden className="mt-0.5 text-accent">&#9679;</span>
          <p className="text-[13px] leading-snug text-muted">
            {isOrganizer ? (
              <>
                <b className="text-foreground">
                  There is no withdraw button, and that is the point.
                </b>{" "}
                Escrow never touches your account. It can only be paid to the verified vendors on
                each cause&rsquo;s published budget, and every donor gets a receipt when it moves.
              </>
            ) : (
              <>
                <b className="text-foreground">
                  {naira(totalToCauses)} of that reached the causes themselves.
                </b>{" "}
                Nothing you give can be withdrawn as cash. It is paid to verified vendors, and you
                get a receipt for your exact share of every payment.
              </>
            )}
          </p>
        </div>

        <dl className="mt-3 grid grid-cols-3 gap-2">
          {isOrganizer ? (
            <>
              <Stat label="Raise limit" value={naira(user.raiseLimit)} accent />
              <Stat label="You have given" value={naira(totalGiven)} />
              <Stat label="You have paid out" value={naira(totalPaidOut)} />
            </>
          ) : (
            <>
              <Stat label="Reached causes" value={naira(totalToCauses)} accent />
              <Stat label="Causes backed" value={String(myDonations.length)} />
              <Stat label="Raise limit" value={naira(user.raiseLimit)} />
            </>
          )}
        </dl>

        <div className="mt-2 rounded-xl border border-line p-3.5">
          <div className="flex items-baseline justify-between">
            <p className="text-sm font-bold">Trust level</p>
            <p className="text-sm tabular-nums text-muted">{trust} of 5</p>
          </div>
          <div className="mt-2.5 flex gap-1.5" role="img" aria-label={`Trust level ${trust} of 5`}>
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
      </section>

      <WalletTabs
        manageLabel={`Managing${myCauses.length ? ` (${myCauses.length})` : ""}`}
        giveLabel={`Giving${myDonations.length ? ` (${myDonations.length})` : ""}`}
        manage={manage}
        give={give}
      />

    </div>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="min-w-0 rounded-xl border border-line p-3">
      <dt className="truncate text-[11px] uppercase tracking-wide text-muted">{label}</dt>
      <dd
        className={`mt-1 truncate text-[15px] font-extrabold tabular-nums ${
          accent ? "text-accent" : ""
        }`}
      >
        {value}
      </dd>
    </div>
  );
}

function Empty({
  line,
  href,
  cta,
  solid,
}: {
  line: string;
  href: string;
  cta: string;
  solid?: boolean;
}) {
  return (
    <div className="px-4 py-10 text-center">
      <p className="text-muted">{line}</p>
      <Link
        href={href}
        className={
          solid
            ? "mt-3 inline-block rounded-full bg-accent px-5 py-2 text-sm font-bold text-black transition hover:bg-accent/90"
            : "mt-2 inline-block text-sm font-bold text-accent hover:underline"
        }
      >
        {cta}
      </Link>
    </div>
  );
}
