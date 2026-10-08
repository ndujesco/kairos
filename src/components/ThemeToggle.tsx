"use client";

import { useEffect, useState } from "react";

type Mode = "system" | "light" | "dark";

/**
 * Light and dark, with the system as the default.
 *
 * A projector is rarely as dark as a laptop screen, so the choice has to be
 * reachable on the day rather than baked in. The chosen mode is remembered;
 * "system" simply removes the attribute and lets the media query decide.
 */
export default function ThemeToggle({ compact = false }: { compact?: boolean }) {
  const [mode, setMode] = useState<Mode>("system");

  useEffect(() => {
    const saved = (localStorage.getItem("kairos-theme") as Mode) || "system";
    setMode(saved);
  }, []);

  const choose = (m: Mode) => {
    setMode(m);
    try {
      localStorage.setItem("kairos-theme", m);
    } catch {
      /* private window: the choice just will not stick */
    }
    const root = document.documentElement;
    if (m === "system") root.removeAttribute("data-theme");
    else root.setAttribute("data-theme", m);
  };

  const next: Mode = mode === "dark" ? "light" : mode === "light" ? "system" : "dark";
  const label = mode === "system" ? "Theme: system" : mode === "light" ? "Theme: light" : "Theme: dark";

  return (
    <button
      onClick={() => choose(next)}
      title={`${label}. Click for ${next}.`}
      aria-label={label}
      className={
        compact
          ? "rounded-full p-2 text-muted transition hover:bg-raised"
          : "flex items-center gap-3 rounded-full p-3 text-muted transition hover:bg-raised"
      }
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
        {mode === "light" ? (
          <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0-5v3m0 14v3M2 12h3m14 0h3M4.2 4.2l2.1 2.1m11.4 11.4l2.1 2.1M19.8 4.2l-2.1 2.1M6.3 17.7l-2.1 2.1" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" />
        ) : mode === "dark" ? (
          <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
        ) : (
          <path d="M12 3a9 9 0 000 18c1 0 1-1 1-1V4s0-1-1-1z" />
        )}
      </svg>
      {!compact && <span className="hidden text-[15px] xl:block">{label}</span>}
    </button>
  );
}
