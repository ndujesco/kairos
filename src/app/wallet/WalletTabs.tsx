"use client";

import { useState, type ReactNode } from "react";

/**
 * The two halves of a wallet: what you are holding for other people, and what
 * you have given. They are different jobs, so they get a tab each rather than
 * one long scroll, in the same segmented style as the feed.
 */
export default function WalletTabs({
  manageLabel,
  giveLabel,
  manage,
  give,
}: {
  manageLabel: string;
  giveLabel: string;
  manage: ReactNode;
  give: ReactNode;
}) {
  const [tab, setTab] = useState<"manage" | "give">("manage");

  const Tab = ({ id, label }: { id: "manage" | "give"; label: string }) => (
    <button
      onClick={() => setTab(id)}
      aria-selected={tab === id}
      role="tab"
      className={`relative flex-1 px-4 py-3.5 text-[15px] transition hover:bg-white/[0.03] ${
        tab === id ? "font-extrabold" : "font-semibold text-muted"
      }`}
    >
      {label}
      {tab === id && (
        <span className="absolute inset-x-0 bottom-0 mx-auto h-1 w-16 rounded-full bg-accent" />
      )}
    </button>
  );

  return (
    <>
      <div role="tablist" className="sticky top-[57px] z-10 flex border-b border-line bg-black/70 backdrop-blur-md">
        <Tab id="manage" label={manageLabel} />
        <Tab id="give" label={giveLabel} />
      </div>
      <div>{tab === "manage" ? manage : give}</div>
    </>
  );
}
