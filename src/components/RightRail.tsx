import Link from "next/link";
import { dbConnect } from "@/lib/db";
import { Cause } from "@/lib/models";
import { naira } from "@/lib/format";

export default async function RightRail() {
  await dbConnect();
  const trending = await Cause.find({ status: { $ne: "completed" } })
    .sort({ donorCount: -1 })
    .limit(4)
    .lean();

  return (
    <aside className="sticky top-0 hidden h-screen w-[350px] shrink-0 flex-col gap-4 overflow-y-auto px-6 py-3 lg:flex">
      <Link
        href="/explore"
        className="flex items-center gap-3 rounded-full border border-line bg-white/5 px-4 py-3 text-muted"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
          <path d="M10.25 4.25c-3.31 0-6 2.69-6 6s2.69 6 6 6c1.52 0 2.9-.56 3.96-1.48l4.63 4.64 1.42-1.42-4.64-4.63c.92-1.06 1.48-2.44 1.48-3.96 0-3.31-2.69-6-6-6zm-4 6c0-2.21 1.79-4 4-4s4 1.79 4 4-1.79 4-4 4-4-1.79-4-4z" />
        </svg>
        Search causes
      </Link>

      <section className="rounded-2xl border border-line">
        <h2 className="px-4 pt-3 text-xl font-extrabold">Trending causes</h2>
        {trending.map((c) => (
          <Link
            key={String(c._id)}
            href={`/cause/${c.slug}`}
            className="block px-4 py-3 transition hover:bg-white/5"
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
        <Link href="/explore" className="block rounded-b-2xl px-4 py-3 text-accent hover:bg-white/5">
          Show more
        </Link>
      </section>

      <section className="rounded-2xl border border-line p-4">
        <h2 className="text-xl font-extrabold">Why trust Kairos?</h2>
        <ul className="mt-2 flex flex-col gap-2 text-[14px] text-muted">
          <li>🔒 Funds sit in escrow — organizers can’t withdraw cash.</li>
          <li>🏥 We pay verified vendors directly, never personal accounts.</li>
          <li>🧾 Every payment comes back to you as a receipt, sliced to your share.</li>
          <li>🪪 Every organizer is BVN/NIN verified. One person, one reputation.</li>
        </ul>
      </section>

      <p className="px-2 text-[13px] text-muted">
        Kairos · Transparent Giving — prototype build · 2026
      </p>
    </aside>
  );
}
