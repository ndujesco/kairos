import Link from "next/link";
import { redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Cause, Donation } from "@/lib/models";
import { getSessionUser } from "@/lib/session";
import { naira } from "@/lib/format";
import DisburseForm from "./DisburseForm";

export const dynamic = "force-dynamic";

export default async function WalletPage() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  await dbConnect();
  const [myCauses, myDonations] = await Promise.all([
    Cause.find({ organizer: user._id }).sort({ createdAt: -1 }).lean(),
    Donation.find({ donor: user._id }).populate<{ cause: { title: string; slug: string } }>("cause").lean(),
  ]);

  const totalEscrow = myCauses.reduce((s, c) => s + c.escrowBalance, 0);
  const totalGiven = myDonations.reduce((s, d) => s + d.amount, 0);

  return (
    <div>
      <div className="sticky top-0 z-10 border-b border-line bg-black/80 px-4 py-3 backdrop-blur">
        <h1 className="text-xl font-extrabold">Escrow Wallet</h1>
      </div>

      {/* trust card */}
      <div className="mx-4 mt-4 rounded-2xl border border-line bg-gradient-to-br from-emerald-950/60 to-black p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted">Trust level (private to you)</p>
            <p className="text-2xl font-extrabold">
              {"⭐".repeat(Math.min(5, user.trustLevel))}{" "}
              <span className="text-base font-normal text-muted">Level {user.trustLevel}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted">You can raise up to</p>
            <p className="text-2xl font-extrabold text-accent">{naira(user.raiseLimit)}</p>
          </div>
        </div>
        <p className="mt-2 text-[13px] text-muted">
          Complete causes honestly, with proof, and this limit grows. {user.completedCauses} cause
          {user.completedCauses === 1 ? "" : "s"} completed so far. This score is never shown
          publicly — it unlocks bigger projects, it doesn’t rank people.
        </p>
      </div>

      {/* organizer view */}
      <section className="mx-4 mt-5">
        <h2 className="mb-1 text-lg font-extrabold">Causes you manage</h2>
        <p className="mb-3 text-sm text-muted">
          {naira(totalEscrow)} held in escrow across {myCauses.length} cause
          {myCauses.length === 1 ? "" : "s"}. You can’t withdraw it — you can only direct it to
          verified vendors on your published budget.
        </p>

        {myCauses.length === 0 && (
          <div className="rounded-2xl border border-line p-6 text-center text-muted">
            You don’t manage any causes.{" "}
            <Link href="/create" className="text-accent hover:underline">
              Start one →
            </Link>
          </div>
        )}

        <div className="flex flex-col gap-4">
          {myCauses.map((c) => (
            <div key={String(c._id)} className="rounded-2xl border border-line p-4">
              <div className="flex items-baseline justify-between gap-2">
                <Link href={`/cause/${c.slug}`} className="font-bold hover:underline">
                  {c.title}
                </Link>
                <span
                  className={`shrink-0 rounded-full px-3 py-0.5 text-xs font-bold ${
                    c.status === "completed"
                      ? "bg-accent/15 text-accent"
                      : c.status === "funded"
                        ? "bg-sky-500/15 text-sky-400"
                        : "bg-white/10"
                  }`}
                >
                  {c.status}
                </span>
              </div>
              <p className="mt-1 text-sm text-muted">
                Raised {naira(c.raised)} · In escrow{" "}
                <b className="text-accent">{naira(c.escrowBalance)}</b>
              </p>

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
                <p className="mt-2 text-sm font-bold text-accent">
                  ✓ Fully executed — every naira accounted for
                </p>
              ) : (
                <p className="mt-2 text-sm text-muted">
                  No funds in escrow yet — share your cause link to start raising.
                </p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* donor view */}
      <section className="mx-4 my-6">
        <h2 className="mb-1 text-lg font-extrabold">Your giving</h2>
        <p className="mb-3 text-sm text-muted">
          {naira(totalGiven)} given across {myDonations.length} donation
          {myDonations.length === 1 ? "" : "s"}.
        </p>
        <div className="flex flex-col gap-2">
          {myDonations.map((d) => (
            <Link
              key={String(d._id)}
              href={`/cause/${d.cause?.slug ?? ""}`}
              className="flex items-center justify-between rounded-xl border border-line p-3 transition hover:bg-white/[0.03]"
            >
              <span className="text-[15px]">{d.cause?.title ?? "Cause"}</span>
              <span className="font-bold text-accent">{naira(d.amount)}</span>
            </Link>
          ))}
          {myDonations.length === 0 && (
            <p className="rounded-2xl border border-line p-6 text-center text-muted">
              You haven’t given yet. Find a cause that moves you.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
