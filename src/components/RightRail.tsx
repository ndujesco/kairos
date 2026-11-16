import Link from "next/link";
import { dbConnect } from "@/lib/db";
import { Cause, Disbursement } from "@/lib/models";
import { naira } from "@/lib/format";

export default async function RightRail({
  guest = false,
}: {
  guest?: boolean;
}) {
  await dbConnect();
  const trending = await Cause.find({ status: { $ne: "completed" } })
    .sort({ donorCount: -1 })
    .limit(4)
    .lean();
  const [impact] = await Disbursement.aggregate<{
    total: number;
    payments: number;
  }>([
    {
      $group: { _id: null, total: { $sum: "$amount" }, payments: { $sum: 1 } },
    },
  ]);

  return (
    <aside className="sticky top-0 hidden h-dvh w-[350px] shrink-0 flex-col gap-4 overflow-y-auto pb-6 pl-7 pr-2 pt-2 lg:flex">
      <form
        action="/explore"
        className="shrink-0 flex items-center gap-3 rounded-full border border-transparent bg-surface px-4 py-3 text-muted focus-within:border-accent"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M10.25 4.25c-3.31 0-6 2.69-6 6s2.69 6 6 6c1.52 0 2.9-.56 3.96-1.48l4.63 4.64 1.42-1.42-4.64-4.63c.92-1.06 1.48-2.44 1.48-3.96 0-3.31-2.69-6-6-6zm-4 6c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" />
        </svg>
        <input
          name="q"
          aria-label="Search causes"
          placeholder="Search causes"
          className="w-full min-w-0 bg-transparent text-[15px] text-foreground outline-none placeholder:text-muted"
        />
      </form>

      <section className="shrink-0 relative overflow-hidden rounded-2xl border border-accent/30 bg-accent/[0.07] p-4">
        <span
          className="absolute -right-3 -top-5 text-[110px] font-black leading-none text-accent/10"
          aria-hidden="true"
        >
          ⧖
        </span>
        <p className="relative text-[12px] font-bold uppercase tracking-[0.14em] text-accent">
          The good, accounted for
        </p>
        <p className="relative mt-3 text-[32px] font-extrabold leading-none tracking-tight">
          {naira(impact?.total ?? 0)}
        </p>
        <p className="relative mt-2 text-[14px] leading-snug text-muted">
          paid directly to providers across {impact?.payments ?? 0} recorded
          payments.
        </p>
        <div className="relative mt-4 flex items-center gap-2 border-t border-accent/20 pt-3 text-[12px] font-bold">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          Every payment, on the record
        </div>
      </section>

      <section className="shrink-0 rounded-2xl border border-line">
        <h2 className="px-4 pt-3 text-xl font-extrabold">
          Where help is happening
        </h2>
        {trending.map((c) => (
          <Link
            key={String(c._id)}
            href={`/cause/${c.slug}`}
            className="block px-4 py-3 transition hover:bg-surface"
          >
            <p className="text-[13px] text-muted">
              {c.category} · {c.donorCount} donors
            </p>
            <p className="font-bold leading-snug">{c.title}</p>
            <p className="text-[13px] text-accent">
              {naira(c.raised)} raised of {naira(c.goal)}
            </p>
          </Link>
        ))}
        <Link
          href="/explore"
          className="block rounded-b-2xl px-4 py-3 text-accent hover:bg-surface"
        >
          Show more
        </Link>
      </section>

      <section className="shrink-0 rounded-2xl border border-line p-4">
        <h2 className="text-xl font-extrabold">
          A little trust. A lot of proof.
        </h2>
        <ul className="mt-3 flex flex-col gap-2.5 text-[14px] leading-snug text-muted">
          <li className="border-l-2 border-accent/60 pl-3">
            Donations sit in escrow. Organizers can&rsquo;t withdraw cash.
          </li>
          <li className="border-l-2 border-accent/60 pl-3">
            Payments go to verified vendors directly, never personal accounts.
          </li>
          <li className="border-l-2 border-accent/60 pl-3">
            Every payment comes back to you as a receipt for your share.
          </li>
        </ul>
      </section>

      {guest && (
        <section className="shrink-0 rounded-2xl border border-line p-4">
          <h2 className="text-xl font-extrabold">
            Be part of someone’s next chapter.
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-muted">
            Create an account to keep your receipts and follow the difference
            your giving makes.
          </p>
          <Link
            href="/login"
            className="mt-4 block rounded-full bg-foreground px-4 py-2.5 text-center text-sm font-bold text-background hover:opacity-90"
          >
            Join Kairos
          </Link>
        </section>
      )}

      <p className="px-2 text-[13px] text-muted">
        Kairos · Transparent Giving · 2026
      </p>
    </aside>
  );
}
