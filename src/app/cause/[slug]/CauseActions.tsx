"use client";

import { useState } from "react";
import DonateModal from "@/components/DonateModal";

export default function CauseActions({
  causeId,
  causeTitle,
  slug,
  completed,
  remaining,
}: {
  causeId: string;
  causeTitle: string;
  slug: string;
  completed: boolean;
  remaining: number;
}) {
  const [donating, setDonating] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullyFunded = completed || remaining <= 0;

  async function share() {
    const url = `${window.location.origin}/cause/${slug}`;
    await navigator.clipboard.writeText(url).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }

  return (
    <div className="mt-4 flex flex-col gap-2 sm:flex-row">
      {fullyFunded ? (
        <div className="flex flex-1 items-center justify-center rounded-full bg-accent/15 py-2.5 text-center font-bold text-accent">
          ✓ Fully funded - no more donations needed
        </div>
      ) : (
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
        <DonateModal
          causeId={causeId}
          causeTitle={causeTitle}
          remaining={remaining}
          onClose={() => setDonating(false)}
        />
      )}
    </div>
  );
}
