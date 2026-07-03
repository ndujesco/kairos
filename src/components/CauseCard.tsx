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
  const remaining = Math.max(0, cause.goal - cause.raised);
  const fullyFunded = remaining <= 0 || cause.status === "completed";

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

          <div className="mt-3 flex items-center justify-between gap-1 text-muted">
            <Link
              href={`/cause/${cause.slug}`}
              className="group flex min-w-0 items-center gap-1 text-xs transition hover:text-sky-400 sm:gap-1.5 sm:text-sm"
              title="Words of support"
            >
              <span className="rounded-full p-1 group-hover:bg-sky-400/10 sm:p-1.5">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
                  <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
                </svg>
              </span>
              <span className="hidden min-[400px]:inline">Support</span>
            </Link>

            <button
              onClick={toggleVouch}
              className={`group flex min-w-0 items-center gap-1 text-xs transition sm:gap-1.5 sm:text-sm ${
                vouched ? "text-rose-400" : "hover:text-rose-400"
              }`}
              title="Vouch for this cause"
            >
              <span className="rounded-full p-1 group-hover:bg-rose-400/10 sm:p-1.5">
                {vouched ? (
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
                    <path d="M1 21h4V9H1v12zM23 10c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
                    <path d="M9 21h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.58 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2zM9 9l4.34-4.34L12 10h9v2l-3 7H9V9zM1 9h4v12H1z" />
                  </svg>
                )}
              </span>
              <span className="truncate">
                {vouchCount}
                <span className="hidden min-[400px]:inline"> vouch{vouchCount === 1 ? "" : "es"}</span>
              </span>
            </button>

            <button
              onClick={share}
              className="group flex min-w-0 items-center gap-1 text-xs transition hover:text-accent sm:gap-1.5 sm:text-sm"
              title="Copy link, anyone can donate without the app"
            >
              <span className="rounded-full p-1 group-hover:bg-accent/10 sm:p-1.5">
                <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] fill-current">
                  <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                </svg>
              </span>
              <span className="hidden min-[400px]:inline">{copied ? "Copied" : "Share"}</span>
              {copied && <span className="min-[400px]:hidden">Copied</span>}
            </button>

            {fullyFunded ? (
              <span className="shrink-0 rounded-full bg-accent/15 px-4 py-1.5 text-xs font-bold text-accent sm:text-sm">
                Funded
              </span>
            ) : (
              <button
                onClick={() => setDonating(true)}
                className="shrink-0 rounded-full bg-accent px-4 py-1.5 text-xs font-bold text-black transition hover:bg-accent/90 sm:px-5 sm:text-sm"
              >
                Donate
              </button>
            )}
          </div>
        </div>
      </div>

      {donating && (
        <DonateModal
          causeId={cause.id}
          causeTitle={cause.title}
          remaining={remaining}
          onClose={() => setDonating(false)}
        />
      )}
    </article>
  );
}
