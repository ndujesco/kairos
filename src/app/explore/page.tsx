import { redirect } from "next/navigation";
import Link from "next/link";
import { dbConnect } from "@/lib/db";
import { Cause, type IUser } from "@/lib/models";
import { getSessionUser } from "@/lib/session";
import { toCardData } from "@/lib/serialize";
import CauseCard from "@/components/CauseCard";

export const dynamic = "force-dynamic";

const CATEGORIES = ["All", "Medical", "Prison Outreach", "Education", "Food & Shelter", "Emergency", "Community"];

export default async function ExplorePage(props: {
  searchParams: Promise<{ c?: string; q?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  const { c = "All", q = "" } = await props.searchParams;

  await dbConnect();
  const filter: Record<string, unknown> = {};
  if (c !== "All") filter.category = c;
  if (q) filter.$or = [{ title: new RegExp(q, "i") }, { summary: new RegExp(q, "i") }];

  const causes = await Cause.find(filter)
    .sort({ donorCount: -1 })
    .populate<{ organizer: IUser }>("organizer")
    .lean();

  return (
    <div>
      <div className="sticky top-0 z-10 border-b border-line bg-black/80 backdrop-blur">
        <h1 className="px-4 pt-3 text-xl font-extrabold">Explore</h1>
        <form className="px-4 pt-2" action="/explore" method="GET">
          <input
            name="q"
            defaultValue={q}
            placeholder="Search causes…"
            className="w-full rounded-full border border-line bg-transparent px-4 py-2 text-[15px] outline-none placeholder:text-muted focus:border-accent"
          />
        </form>
        <div className="flex gap-2 overflow-x-auto px-4 py-3">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat}
              href={`/explore?c=${encodeURIComponent(cat)}`}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-bold transition ${
                c === cat
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-line text-muted hover:bg-white/5"
              }`}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>

      {causes.map((cause) => (
        <CauseCard key={String(cause._id)} cause={toCardData(cause, String(user._id))} />
      ))}
      {causes.length === 0 && (
        <p className="p-8 text-center text-muted">No causes match — yet. Causes that move you are coming.</p>
      )}
    </div>
  );
}
