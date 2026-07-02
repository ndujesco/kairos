"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Avatar from "./Avatar";
import VerifiedBadge from "./VerifiedBadge";
import ProgressBar from "./ProgressBar";
import DonateModal from "./DonateModal";
import type { CauseCardData } from "./types";

function naira(n: number) {
  return "₦" + Math.round(n).toLocaleString("en-NG");
}

function timeAgo(iso: string) {
  const s = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "now";
  if (s < 3600) return Math.floor(s / 60) + "m";
  if (s < 86400) return Math.floor(s / 3600) + "h";
  return Math.floor(s / 86400) + "d";
}

const GRADIENTS: Record<string, string> = {
  emerald: "from-emerald-500 to-teal-700",
  sky: "from-sky-500 to-indigo-700",
  rose: "from-rose-500 to-fuchsia-700",
  amber: "from-amber-400 to-orange-600",
  violet: "from-violet-500 to-purple-800",
  slate: "from-slate-500 to-slate-800",
};

export default function CauseCard({ cause }: { cause: CauseCardData }) {
  const router = useRouter();
  const [donating, setDonating] = useState(false);
  const [vouched, setVouched] = useState(cause.vouchedByMe);
  const [vouchCount, setVouchCount] = useState(cause.vouchCount);
  const [copied, setCopied] = useState(false);

  async function toggleVouch() {
    setVouched(!vouched);
    setVouchCount((c) => c + (vouched ? -1 : 1));
    await fetch(`/api/causes/${cause.id}/vouch`, { method: "POST" });
    router.refresh();
  }

  async function share() {
    const url = `${window.location.origin}/cause/${cause.slug}`;
    await navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  const pct = Math.min(100, Math.round((cause.raised / Math.max(cause.goal, 1)) * 100));

  return (
    <article className="border-b border-line px-4 py-3 transition hover:bg-white/[0.03]">
      <div className="flex gap-3">
        <Link href={`/profile/${cause.organizer.handle}`}>
          <Avatar emoji={cause.organizer.emoji} color={cause.organizer.avatarColor} />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1 text-[15px]">
            <Link
              href={`/profile/${cause.organizer.handle}`}
              className="font-bold hover:underline"
            >
              {cause.organizer.name}
            </Link>
            {cause.organizer.verified && <VerifiedBadge />}
            {cause.organizer.ngo && (
              <span className="rounded-full bg-sky-500/15 px-2 py-0.5 text-[11px] font-bold text-sky-400">
                NGO · CAC verified
              </span>
            )}
            <span className="text-muted">
              @{cause.organizer.handle} · {timeAgo(cause.createdAt)}
            </span>
          </div>

          <Link href={`/cause/${cause.slug}`} className="block">
            <h2 className="mt-0.5 font-bold leading-snug">{cause.title}</h2>
            <p className="mt-1 text-[15px] leading-snug text-foreground/90">{cause.summary}</p>

            <div
              className={`mt-3 flex h-40 items-center justify-center rounded-2xl border border-line bg-gradient-to-br text-6xl ${
                GRADIENTS[cause.coverColor] ?? GRADIENTS.emerald
              }`}
            >
              {cause.coverEmoji}
            </div>
          </Link>

          <div className="mt-3">
            <div className="mb-1.5 flex items-baseline justify-between text-sm">
              <span>
                <b className="text-accent">{naira(cause.raised)}</b>{" "}
                <span className="text-muted">of {naira(cause.goal)}</span>
              </span>
              <span className="text-muted">
                {pct}% · {cause.donorCount} donors
              </span>
            </div>
            <ProgressBar raised={cause.raised} goal={cause.goal} />
          </div>

          <div className="mt-3 flex items-center justify-between text-muted">
            <Link
              href={`/cause/${cause.slug}`}
              className="group flex items-center gap-1.5 text-sm transition hover:text-sky-400"
              title="Words of support"
            >
              <span className="rounded-full p-1.5 group-hover:bg-sky-400/10">💬</span>
              Support
            </Link>

            <button
              onClick={toggleVouch}
              className={`group flex items-center gap-1.5 text-sm transition ${
                vouched ? "text-rose-400" : "hover:text-rose-400"
              }`}
              title="Vouch — I believe this cause is real"
            >
              <span className="rounded-full p-1.5 group-hover:bg-rose-400/10">
                {vouched ? "🤝" : "🫱"}
              </span>
              {vouchCount} vouch{vouchCount === 1 ? "" : "es"}
            </button>

            <button
              onClick={share}
              className="group flex items-center gap-1.5 text-sm transition hover:text-accent"
              title="Share link — donors don’t need the app"
            >
              <span className="rounded-full p-1.5 group-hover:bg-accent/10">🔗</span>
              {copied ? "Copied!" : "Share"}
            </button>

            <button
              onClick={() => setDonating(true)}
              className="rounded-full bg-accent px-5 py-1.5 text-sm font-bold text-black transition hover:bg-accent/90"
            >
              Donate
            </button>
          </div>
        </div>
      </div>

      {donating && (
        <DonateModal causeId={cause.id} causeTitle={cause.title} onClose={() => setDonating(false)} />
      )}
    </article>
  );
}
