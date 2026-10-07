"use client";

import { useEffect, useRef, useState } from "react";
import { listen, type AlertPayload } from "@/lib/alerts";

/**
 * Desktop alerts for the donor.
 *
 * Two ways in, because they fail in different situations:
 *
 *   1. Another tab announces the alert the instant a payout succeeds. This is
 *      what carries the demo - the session cookie is shared across tabs, so the
 *      donor tab cannot poll for its own alerts once the organizer signs in.
 *   2. A poll, for the ordinary case of one person in one tab whose money moved
 *      while they were elsewhere on the site.
 *
 * Email covers the case where the browser is closed entirely.
 */
export default function DesktopAlerts() {
  const seen = useRef<Set<string>>(new Set());
  const primed = useRef(false);
  const [perm, setPerm] = useState<NotificationPermission>("default");

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;
    setPerm(Notification.permission);
    navigator.serviceWorker?.register("/sw.js").catch(() => {});

    /** Raise one OS notification, through the worker when we have it. */
    const show = async (a: AlertPayload) => {
      if (seen.current.has(a.id)) return;
      seen.current.add(a.id);
      if (Notification.permission !== "granted") return;
      const payload = {
        kind: "kairos-notify",
        id: a.id,
        title: a.title,
        body: a.body,
        url: a.url || "/notifications",
      };
      /* serviceWorker.ready never rejects: if registration failed it simply
         never settles, and awaiting it would swallow the alert in silence.
         Give it a moment, then raise the notification directly instead. */
      const reg = await Promise.race([
        navigator.serviceWorker?.ready.catch(() => null) ?? Promise.resolve(null),
        new Promise<null>((r) => setTimeout(() => r(null), 1500)),
      ]);
      try {
        if (reg?.active) reg.active.postMessage(payload);
        else new Notification(a.title, { body: a.body, icon: "/icon-192.png" });
      } catch {
        /* some browsers forbid the Notification constructor once a worker is
           controlling the page; the worker path above is the one that counts */
      }
    };

    /* 1 - announced by whichever tab did the payout */
    const stop = listen(show);

    /* 2 - and a poll, for this tab's own notifications */
    const tick = async () => {
      try {
        const r = await fetch("/api/notifications/latest", { cache: "no-store" });
        const { items } = await r.json();
        if (!primed.current) {
          items.forEach((n: { id: string }) => seen.current.add(n.id));
          primed.current = true;
          return;
        }
        for (const n of [...items].reverse()) {
          await show({
            id: n.id,
            title: n.title,
            body: n.body,
            url: n.causeSlug ? `/cause/${n.causeSlug}` : "/notifications",
          });
        }
      } catch {
        /* a poll failure must never break the page */
      }
    };

    tick();
    const id = setInterval(tick, 3000);
    /* a hidden tab has its timers throttled, so catch up the moment it is seen */
    const onVisible = () => document.visibilityState === "visible" && tick();
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVisible);
      stop();
    };
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
