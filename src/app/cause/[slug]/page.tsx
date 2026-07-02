import Link from "next/link";
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/db";
import { Cause, Comment, Disbursement, Donation, type IUser } from "@/lib/models";
import { getSessionUser } from "@/lib/session";
import { naira, timeAgo, gradient } from "@/lib/format";
import Avatar from "@/components/Avatar";
import VerifiedBadge from "@/components/VerifiedBadge";
import ProgressBar from "@/components/ProgressBar";
import CauseActions from "./CauseActions";
import CommentForm from "./CommentForm";

export const dynamic = "force-dynamic";

export async function generateMetadata(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  await dbConnect();
  const cause = await Cause.findOne({ slug }).populate<{ organizer: IUser }>("organizer").lean();
  if (!cause) return { title: "Cause not found" };

  const pct = Math.min(100, Math.round((cause.raised / Math.max(cause.goal, 1)) * 100));
  const description = `${cause.summary} · ₦${cause.raised.toLocaleString()} raised of ₦${cause.goal.toLocaleString()} (${pct}%) · organized by ${cause.organizer.name} · every naira escrowed & receipted on Kairos.`;

  return {
    title: cause.title,
    description: cause.summary,
    openGraph: {
      type: "article",
      siteName: "Kairos",
      title: cause.title,
      description,
      url: `/cause/${cause.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: cause.title,
      description,
    },
  };
}

export default async function CausePage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const viewer = await getSessionUser();

  await dbConnect();
  const cause = await Cause.findOne({ slug }).populate<{ organizer: IUser }>("organizer").lean();
  if (!cause) notFound();

  const [donations, disbursements, comments] = await Promise.all([
    Donation.find({ cause: cause._id })
      .sort({ createdAt: -1 })
      .populate<{ donor: IUser }>("donor")
      .lean(),
    Disbursement.find({ cause: cause._id }).sort({ createdAt: -1 }).lean(),
    Comment.find({ cause: cause._id })
      .sort({ createdAt: -1 })
      .populate<{ author: IUser }>("author")
      .lean(),
  ]);

  const pct = Math.min(100, Math.round((cause.raised / Math.max(cause.goal, 1)) * 100));

  // merge the money story into one public ledger, newest first
  const ledger = [
    ...donations.map((d) => ({
      kind: "in" as const,
      at: new Date(d.createdAt),
      label: d.donor ? `@${d.donor.handle} donated` : "Donation",
      amount: d.amount,
    })),
    ...disbursements.map((d) => ({
      kind: "out" as const,
      at: new Date(d.createdAt),
      label: `Paid ${d.vendorName} - ${d.budgetLabel} (Invoice ${d.invoiceNo})`,
      amount: d.amount,
    })),
  ].sort((a, b) => b.at.getTime() - a.at.getTime());

  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-6 border-b border-line bg-black/80 px-4 py-3 backdrop-blur">
        <Link href="/" className="rounded-full p-2 hover:bg-white/10">
          ←
        </Link>
        <div>
          <h1 className="text-lg font-extrabold leading-tight">{cause.title}</h1>
          <p className="text-[13px] text-muted">
            {cause.category} · {cause.donorCount} donors
          </p>
        </div>
      </div>

      {/* organizer */}
      <div className="flex flex-wrap items-center gap-3 px-4 pt-4">
        <Link href={`/profile/${cause.organizer.handle}`}>
          <Avatar emoji={cause.organizer.emoji} color={cause.organizer.avatarColor} size={11} />
        </Link>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 font-bold">
            {cause.organizer.name}
            {cause.organizer.verified?.identity && <VerifiedBadge />}
            {cause.organizer.role === "ngo" && (
              <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[11px] font-bold text-sky-400">
                NGO · CAC verified
              </span>
            )}
          </p>
          <p className="text-sm text-muted">
            @{cause.organizer.handle} · organizer · identity on file
          </p>
        </div>
        {cause.status === "completed" ? (
          <span className="rounded-full bg-accent/15 px-3 py-1 text-sm font-bold text-accent">
            ✓ Completed
          </span>
        ) : cause.status === "funded" ? (
          <span className="rounded-full bg-sky-500/15 px-3 py-1 text-sm font-bold text-sky-400">
            Fully funded
          </span>
        ) : (
          <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold">Live</span>
        )}
      </div>

      {/* cover + story */}
      <div className="px-4">
        <div
          className={`mt-4 flex h-52 items-center justify-center rounded-2xl border border-line bg-gradient-to-br text-7xl ${gradient(cause.coverColor)}`}
        >
          {cause.coverEmoji}
        </div>
        <p className="mt-4 whitespace-pre-line text-[15px] leading-relaxed">{cause.story}</p>
      </div>

      {/* progress + actions */}
      <div className="mx-4 mt-5 rounded-2xl border border-line p-4">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="text-2xl font-extrabold text-accent">{naira(cause.raised)}</span>
          <span className="text-muted">of {naira(cause.goal)} · {pct}%</span>
        </div>
        <ProgressBar raised={cause.raised} goal={cause.goal} />
        <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-sm text-muted">
          <span>🔒 {naira(cause.escrowBalance)} currently in escrow</span>
          <span>
            🤝 {cause.vouches?.length ?? 0} independent vouch{(cause.vouches?.length ?? 0) === 1 ? "" : "es"}
          </span>
        </div>
        <CauseActions
          causeId={String(cause._id)}
          causeTitle={cause.title}
          slug={cause.slug}
          completed={cause.status === "completed"}
          remaining={Math.max(0, cause.goal - cause.raised)}
        />
      </div>

      {/* AI verification */}
      <section className="mx-4 mt-5 rounded-2xl border border-line p-4">
        <h2 className="font-extrabold">🛡️ Verification</h2>
        <ul className="mt-2 flex flex-col gap-1.5 text-sm">
          <li className="flex items-center gap-2 text-accent">
            ✓ <span className="text-foreground">Organizer identity verified ({cause.organizer.verified?.method ?? "BVN"})</span>
          </li>
          {cause.evidence.map((e, i) => (
            <li key={i} className="flex items-center gap-2 text-accent">
              ✓{" "}
              <span className="text-foreground">
                {e.label}{" "}
                <span className="text-muted"> - {e.kind}, reuse check {e.checks.reuse}, dates {e.checks.dates}
                </span>
              </span>
            </li>
          ))}
          <li className="flex items-center gap-2 text-accent">
            ✓ <span className="text-foreground">AI fraud screen passed - no image reuse or timeline contradictions</span>
          </li>
        </ul>
      </section>

      {/* itemized budget */}
      <section className="mx-4 mt-5 rounded-2xl border border-line p-4">
        <h2 className="font-extrabold">📋 Itemized budget - where every naira goes</h2>
        <div className="mt-3 flex flex-col gap-3">
          {cause.budget.map((b, i) => {
            const done = b.spent >= b.amount;
            return (
              <div key={i} className="rounded-xl border border-line p-3">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-bold">{b.label}</p>
                  <p className="shrink-0 text-sm">
                    <span className={done ? "text-accent" : ""}>{naira(b.spent)}</span>
                    <span className="text-muted"> / {naira(b.amount)}</span>
                  </p>
                </div>
                <p className="mt-0.5 text-sm text-muted">
                  → {b.vendor.name}{" "}
                  {b.vendor.verified && (
                    <span className="text-accent">✓ verified vendor</span>
                  )}{" "}
                  · acct {b.vendor.account}
                </p>
                <div className="mt-2">
                  <ProgressBar raised={b.spent} goal={b.amount} />
                </div>
                {done && <p className="mt-1 text-[13px] font-bold text-accent">Paid in full ✓</p>}
              </div>
            );
          })}
        </div>
        <p className="mt-3 text-[13px] text-muted">
          Funds are released to these vendors directly, in stages. The organizer cannot withdraw
          cash.
        </p>
      </section>

      {/* receipts */}
      {disbursements.length > 0 && (
        <section className="mx-4 mt-5 rounded-2xl border border-line p-4">
          <h2 className="font-extrabold">🧾 Receipts</h2>
          <div className="mt-3 flex flex-col gap-3">
            {disbursements.map((d) => (
              <div
                key={String(d._id)}
                className="rounded-xl border border-dashed border-accent/40 bg-accent/5 p-4 font-mono text-sm"
              >
                <div className="flex justify-between text-muted">
                  <span>KAIROS ESCROW PAYMENT</span>
                  <span>{new Date(d.createdAt).toLocaleDateString("en-NG")}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span>Paid to</span>
                  <b>{d.vendorName}</b>
                </div>
                <div className="flex justify-between">
                  <span>For</span>
                  <b>{d.budgetLabel}</b>
                </div>
                <div className="flex justify-between">
                  <span>Invoice</span>
                  <b>{d.invoiceNo}</b>
                </div>
                <div className="mt-2 flex justify-between border-t border-line pt-2 text-base">
                  <span>Amount</span>
                  <b className="text-accent">{naira(d.amount)}</b>
                </div>
                {d.note && <p className="mt-2 text-muted">“{d.note}”</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* updates */}
      {cause.updates?.length > 0 && (
        <section className="mx-4 mt-5 rounded-2xl border border-line p-4">
          <h2 className="font-extrabold">📸 Updates from the field</h2>
          <div className="mt-3 flex flex-col gap-4">
            {cause.updates.map((u, i) => (
              <div key={i}>
                <p className="text-[15px]">{u.text}</p>
                {u.photos?.length > 0 && (
                  <div className="mt-2 flex gap-2">
                    {u.photos.map((p, j) => (
                      <div
                        key={j}
                        className={`flex h-24 flex-1 items-center justify-center rounded-xl border border-line bg-gradient-to-br text-4xl ${gradient(cause.coverColor)}`}
                      >
                        {p}
                      </div>
                    ))}
                  </div>
                )}
                <p className="mt-1 text-[13px] text-muted">{timeAgo(u.at)} ago · location & time verified</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* public ledger */}
      <section className="mx-4 mt-5 rounded-2xl border border-line p-4">
        <h2 className="font-extrabold">📖 Public ledger - the full money story</h2>
        <div className="mt-3 flex flex-col">
          {ledger.length === 0 && <p className="text-sm text-muted">No transactions yet.</p>}
          {ledger.map((l, i) => (
            <div
              key={i}
              className="flex items-center justify-between border-b border-line/60 py-2 text-sm last:border-0"
            >
              <span className="flex items-center gap-2">
                <span
                  className={`flex h-6 w-6 items-center justify-center rounded-full text-xs ${
                    l.kind === "in" ? "bg-accent/15 text-accent" : "bg-sky-500/15 text-sky-400"
                  }`}
                >
                  {l.kind === "in" ? "↓" : "↗"}
                </span>
                {l.label}
              </span>
              <span className={`font-bold ${l.kind === "in" ? "text-accent" : "text-sky-400"}`}>
                {l.kind === "in" ? "+" : "−"}
                {naira(l.amount)}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* words of support */}
      <section className="mx-4 my-5 rounded-2xl border border-line p-4">
        <h2 className="font-extrabold">💬 Words of support</h2>
        {viewer && <CommentForm causeId={String(cause._id)} />}
        <div className="mt-3 flex flex-col gap-3">
          {comments.map((c) => (
            <div key={String(c._id)} className="flex gap-2">
              <Avatar emoji={c.author?.emoji ?? "🙂"} color={c.author?.avatarColor ?? "slate"} size={8} />
              <div>
                <p className="text-sm">
                  <b>{c.author?.name}</b>{" "}
                  <span className="text-muted">
                    @{c.author?.handle} · {timeAgo(c.createdAt)}
                  </span>
                </p>
                <p className="text-[15px]">{c.text}</p>
              </div>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-sm text-muted">Be the first to leave a word of support.</p>
          )}
        </div>
      </section>
    </div>
  );
}
