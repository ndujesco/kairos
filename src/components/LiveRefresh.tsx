"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

/**
 * Keeps the page current without anyone pressing reload.
 *
 * When a donation lands or a payout goes out, the figures on screen are stale
 * for everyone except the person who did it. This listens for a change and
 * calls router.refresh(), which re-renders the server components in place:
 * the numbers move, and client state such as an open modal survives.
 *
 * Two paths, because the first one can die quietly. The event stream carries
 * it, usually inside a second. A slow poll underneath catches anything the
 * stream misses, which matters on a platform that may cut a long connection.
 */
export default function LiveRefresh() {
  const router = useRouter();
  const rev = useRef<string>("");
  const refreshing = useRef(false);

  useEffect(() => {
    let stopped = false;
    let es: EventSource | null = null;

    const apply = (next: string) => {
      if (!next || next === rev.current) return;
      const first = rev.current === "";
      rev.current = next;
      if (first || refreshing.current) return;   // first read is just a baseline
      refreshing.current = true;
      router.refresh();
      setTimeout(() => { refreshing.current = false; }, 400);
    };

    const connect = () => {
      if (stopped) return;
      try {
        es = new EventSource("/api/live");
        es.addEventListener("open", (e) => {
          try { apply(JSON.parse((e as MessageEvent).data).rev); } catch { /* no payload */ }
        });
        es.addEventListener("change", (e) => {
          try { apply(JSON.parse((e as MessageEvent).data).rev); } catch { router.refresh(); }
        });
        // the stream closes itself every 50s; EventSource reopens on its own
      } catch {
        /* no EventSource in this browser: the poll below covers it */
      }
    };

    const tick = async () => {
      try {
        const r = await fetch("/api/live/rev", { cache: "no-store" });
        apply((await r.json()).rev);
      } catch {
        /* offline for a moment; try again on the next tick */
      }
    };

    tick();
    connect();
    const poll = setInterval(tick, 8000);
    const onVisible = () => document.visibilityState === "visible" && tick();
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      stopped = true;
      es?.close();
      clearInterval(poll);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [router]);

  return null;
}
