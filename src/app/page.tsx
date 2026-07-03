import { redirect } from "next/navigation";
import { getSessionUser } from "@/lib/session";
import { dbConnect } from "@/lib/db";
import { Cause } from "@/lib/models";
import { toCardData } from "@/lib/serialize";
import CauseCard from "@/components/CauseCard";
import type { IUser } from "@/lib/models";

export const dynamic = "force-dynamic";

export const metadata = {
  alternates: { canonical: "/" },
};

export default async function Home() {
  const user = await getSessionUser();
  if (!user) redirect("/login");

  await dbConnect();
  const causes = await Cause.find({})
    .sort({ createdAt: -1 })
    .populate<{ organizer: IUser }>("organizer")
    .lean();

  return (
    <div>
      <div className="sticky top-0 z-10 border-b border-line bg-black/80 backdrop-blur">
        <h1 className="px-4 pt-3 text-xl font-extrabold">Home</h1>
        <div className="mt-2 flex text-[15px] font-semibold text-muted">
          <span className="flex-1 cursor-pointer border-b-[3px] border-accent pb-3 text-center text-foreground">
            For you
          </span>
          <span className="flex-1 cursor-pointer pb-3 text-center transition hover:bg-white/5">
            Following
          </span>
        </div>
      </div>

      {causes.map((c) => (
        <CauseCard key={String(c._id)} cause={toCardData(c, String(user._id))} />
      ))}

      {causes.length === 0 && (
        <p className="p-8 text-center text-muted">
          No causes yet - run <code>npm run seed</code> to load demo data.
        </p>
      )}
    </div>
  );
}
