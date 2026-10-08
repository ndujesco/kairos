"use client";

import { useEffect, useState } from "react";

/**
 * Opens an attached document over the page instead of navigating away.
 *
 * A donor checking the evidence should not lose the cause they were reading.
 * The document scrolls inside the overlay; Escape, the backdrop and the close
 * button all dismiss it, and a direct link is offered for anyone who would
 * rather have the file itself.
 */
export default function EvidenceViewer({ url, label }: { url: string; label: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";       // the page behind must not scroll
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="text-left font-bold text-accent underline underline-offset-2 hover:opacity-80"
      >
        {label}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[#5b708366] p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
          onClick={(e) => e.target === e.currentTarget && setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={label}
        >
          <div className="flex h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-t-2xl bg-background shadow-[0_0_40px_rgba(0,0,0,0.3)] ring-1 ring-line sm:h-[88dvh] sm:rounded-2xl">
            <div className="flex items-start justify-between gap-3 border-b border-line px-4 py-3">
              <div className="min-w-0">
                <p className="truncate text-[15px] font-bold leading-snug">{label}</p>
                <p className="text-[12px] text-muted">Attached to this cause</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <a
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-3 py-1.5 text-[13px] font-bold text-accent hover:bg-accent/10"
                  title="Open the file on its own"
                >
                  Open
                </a>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="rounded-full p-1.5 text-muted hover:bg-raised"
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M18.3 5.71L12 12l6.3 6.29-1.41 1.42L10.59 13.4 4.3 19.71 2.89 18.3 9.17 12 2.89 5.71 4.3 4.29l6.29 6.3 6.3-6.3z" />
                  </svg>
                </button>
              </div>
            </div>
            {/* the document itself, scrolling inside the overlay */}
            <iframe
              src={`${url}#view=FitH&navpanes=0&toolbar=0`}
              title={label}
              className="min-h-0 flex-1 bg-raised"
            />
          </div>
        </div>
      )}
    </>
  );
}
