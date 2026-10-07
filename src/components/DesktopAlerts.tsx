"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Desktop alerts for the signed-in donor.
 *
 * A donor is not staring at Kairos when their money moves, so the receipt has
 * to come to them. This asks once, then polls for new notifications and shows
 * them through the service worker - which keeps working while the tab sits in
 * the background. Email covers the case where the browser is closed entirely.
 */
export default function DesktopAlerts() {
  const seen = useRef<Set<string>>(new Set());
  const primed = useRef(false);
  const [perm, setPerm] = useState<NotificationPermission>("default");

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    setPerm(Notification.permission);
    navigator.serviceWorker?.register("/sw.js").catch(() => {});

    const tick = async () => {
      try {
        const r = await fetch("/api/notifications/latest", { cache: "no-store" });
        const { items } = await r.json();
        // the first pass only records what already exists
        if (!primed.current) {
          items.forEach((n: { id: string }) => seen.current.add(n.id));
          primed.current = true;
          return;
        }
        for (const n of [...items].reverse()) {
          if (seen.current.has(n.id)) continue;
          seen.current.add(n.id);
          if (Notification.permission !== "granted") continue;
          const reg = await navigator.serviceWorker?.ready.catch(() => null);
          const payload = {
            kind: "kairos-notify",
            id: n.id,
            title: n.title,
            body: n.body,
            url: n.causeSlug ? `/cause/${n.causeSlug}` : "/notifications",
          };
          if (reg?.active) reg.active.postMessage(payload);
          else new Notification(n.title, { body: n.body });
        }
      } catch {
        /* a poll failure must never break the page */
      }
    };

    tick();
    const id = setInterval(tick, 3000);
    return () => clearInterval(id);
  }, []);

  if (perm === "granted" || perm === "denied") return null;

  return (
    <button
      onClick={async () => setPerm(await Notification.requestPermission())}
      className="fixed bottom-4 right-4 z-50 rounded-full border border-accent/40 bg-black/90 px-4 py-2.5 text-sm font-bold text-accent shadow-lg backdrop-blur hover:bg-accent/10"
    >
      Turn on payment alerts
    </button>
  );
}
