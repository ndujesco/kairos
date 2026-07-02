import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Cause, Donation, User, type IUser } from "@/lib/models";
import { getSessionUser } from "@/lib/session";
import { naira } from "@/lib/format";
import Avatar from "@/components/Avatar";
import VerifiedBadge from "@/components/VerifiedBadge";
import CauseCard from "@/components/CauseCard";
import { toCardData } from "@/lib/serialize";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: { params: Promise<{ handle: string }> }) {
  const { handle } = await props.params;
  await dbConnect();
  const user = await User.findOne({ handle }).lean();
  if (!user) return { title: "Profile not found" };
  return {
    title: `${user.name} (@${user.handle})`,
    description:
      user.bio ??
      `${user.name} on Kairos — verified identity, transparent causes, every naira receipted.`,
    openGraph: {
      type: "profile",
      siteName: "Kairos",
      title: `${user.name} (@${user.handle}) · Kairos`,
      description: user.bio ?? `${user.name} on Kairos — verified, transparent giving.`,
    },
  };
}

export default async function ProfilePage(props: { params: Promise<{ handle: string }> }) {
  const viewer = await getSessionUser();
  if (!viewer) redirect("/login");

  const { handle } = await props.params;
  await dbConnect();
  const user = await User.findOne({ handle }).lean();
  if (!user) notFound();

  const [causes, donations] = await Promise.all([
    Cause.find({ organizer: user._id })
      .sort({ createdAt: -1 })
      .populate<{ organizer: IUser }>("organizer")
      .lean(),
    Donation.find({ donor: user._id }).lean(),
  ]);

  const totalGiven = donations.reduce((s, d) => s + d.amount, 0);
  const totalRaised = causes.reduce((s, c) => s + c.raised, 0);

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-6 border-b border-line bg-black/80 px-4 py-3 backdrop-blur">
        <Link href="/" className="rounded-full p-2 hover:bg-white/10">
          ←
        </Link>
        <h1 className="text-lg font-extrabold">{user.name}</h1>
      </div>

      <div className="h-32 bg-gradient-to-r from-emerald-900 via-teal-900 to-black" />
      <div className="px-4">
        <div className="-mt-10 mb-3">
          <div className="inline-block rounded-full ring-4 ring-black">
            <Avatar emoji={user.emoji} color={user.avatarColor} size={20} />
          </div>
        </div>
        {String(user._id) === String(viewer._id) && (
          <form action="/api/auth/logout" method="POST" className="float-right mt-2">
            <button
              type="submit"
              className="rounded-full border border-line px-4 py-1.5 text-sm font-bold text-muted transition hover:border-rose-400/50 hover:text-rose-400"
            >
              Log out
            </button>
          </form>
        )}
        <p className="flex items-center gap-1.5 text-xl font-extrabold">
          {user.name}
          {user.verified?.identity && <VerifiedBadge />}
          {user.role === "ngo" && (
            <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[11px] font-bold text-sky-400">
              NGO · CAC verified
            </span>
          )}
        </p>
        <p className="text-muted">@{user.handle}</p>
        {user.bio && <p className="mt-2 text-[15px]">{user.bio}</p>}

        <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
          <span>
            <b>{causes.length}</b> <span className="text-muted">causes organized</span>
          </span>
          <span>
            <b className="text-accent">{naira(totalRaised)}</b>{" "}
            <span className="text-muted">raised</span>
          </span>
          <span>
            <b className="text-accent">{naira(totalGiven)}</b>{" "}
            <span className="text-muted">given</span>
          </span>
          <span>
            <b>{user.completedCauses}</b> <span className="text-muted">completed</span>
          </span>
        </div>
        <p className="mt-2 text-[13px] text-muted">
          🪪 One verified identity · accountable record since{" "}
          {new Date(user.createdAt).getFullYear()}
        </p>
      </div>

      <div className="mt-4 border-b border-line">
        <span className="inline-block border-b-[3px] border-accent px-4 pb-3 font-bold">
          Causes
        </span>
      </div>

      {causes.map((c) => (
        <CauseCard key={String(c._id)} cause={toCardData(c, String(viewer._id))} />
      ))}
      {causes.length === 0 && (
        <p className="p-8 text-center text-muted">No causes organized yet.</p>
      )}
    </div>
  );
}
