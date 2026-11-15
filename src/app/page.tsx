import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import { dbConnect } from "@/lib/db";
import { Cause } from "@/lib/models";
import { toCardData } from "@/lib/serialize";
import CauseCard from "@/components/CauseCard";
import type { IUser } from "@/lib/models";
import Link from "next/link";
import Avatar from "@/components/Avatar";
import NavIcon from "@/components/NavIcon";

export const dynamic = "force-dynamic";

export const metadata = {
  alternates: { canonical: "/" },
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ feed?: string }>;
}) {
  const user = await getSessionUser();
  if (!user) redirect("/login");
  const latest = (await searchParams).feed === "latest";

  await dbConnect();
  const causes = await Cause.find({})
    .sort(latest ? { createdAt: -1 } : { donorCount: -1, createdAt: -1 })
    .populate<{ organizer: IUser }>("organizer")
    .lean();

  return (
    <div>
      <div className="sticky top-0 z-10 border-b border-line bg-background/80 backdrop-blur">
        <div className="hidden items-center justify-between px-4 py-3 sm:flex">
          <h1 className="text-xl font-extrabold">Home</h1>
          <span className="flex items-center gap-1.5 text-[12px] text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Giving, with proof
          </span>
        </div>
        <div
          className="flex text-[15px] font-semibold text-muted"
          aria-label="Feed order"
        >
          {[
            { href: "/", label: "For you", active: !latest },
            { href: "/?feed=latest", label: "Latest", active: latest },
          ].map((tab) => (
            <Link
              key={tab.href}
              href={tab.href}
              aria-current={tab.active ? "page" : undefined}
              className={`flex flex-1 justify-center pt-4 transition hover:bg-surface ${tab.active ? "text-foreground" : ""}`}
            >
              <span
                className={`relative pb-4 ${tab.active ? "font-bold after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:rounded-full after:bg-accent" : ""}`}
              >
                {tab.label}
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="border-b border-line px-4 pb-3 pt-4">
        <div className="flex items-start gap-3">
          <Avatar emoji={user.emoji} color={user.avatarColor} />
          <div className="min-w-0 flex-1">
            <Link href="/create" className="block py-2 text-xl text-muted">
              What change will you make?
            </Link>
            <p className="mb-3 mt-1 text-[13px] text-accent">
              A real need. A clear budget. Proof it helped.
            </p>
            <div className="flex items-center justify-between border-t border-line pt-3">
              <Link
                href="/explore"
                className="flex items-center gap-2 text-sm font-bold text-accent hover:underline"
              >
                <NavIcon name="Explore" className="h-[18px] w-[18px]" />
                Find a cause
              </Link>
              <Link
                href="/create"
                className="rounded-full bg-accent px-5 py-2 text-[14px] font-bold text-on-accent hover:bg-accent/90"
              >
                Start a cause
              </Link>
            </div>
          </div>
        </div>
      </div>

      {causes.map((c) => (
        <CauseCard
          key={String(c._id)}
          cause={toCardData(c, String(user._id))}
        />
      ))}

      {causes.length === 0 && (
        <p className="p-8 text-center text-muted">
          A little help can go a long way. Start the first cause.
        </p>
      )}
    </div>
  );
}
