"use client";

import { useState } from "react";
import DonateModal from "@/components/DonateModal";

export default function CauseActions({
  causeId,
  causeTitle,
  slug,
  completed,
}: {
  causeId: string;
  causeTitle: string;
  slug: string;
  completed: boolean;
}) {
  const [donating, setDonating] = useState(false);
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = `${window.location.origin}/cause/${slug}`;
    await navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
      {!completed && (
        <button
          onClick={() => setDonating(true)}
          className="flex-1 rounded-full bg-accent py-2.5 font-bold text-black transition hover:bg-accent/90"
        >
          Donate
        </button>
      )}
      <button
        onClick={share}
        className="flex-1 rounded-full border border-line py-2.5 font-bold transition hover:bg-white/5"
        title="Anyone with this link can donate - no app needed"
      >
        {copied ? "Link copied ✓" : "🔗 Copy link"}
      </button>
      {donating && (
        <DonateModal causeId={causeId} causeTitle={causeTitle} onClose={() => setDonating(false)} />
      )}
    </div>
  );
}
