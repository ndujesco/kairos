"use client";

import { useEffect, useState } from "react";
import { announce } from "@/lib/alerts";

/**
 * Notification diagnostics.
 *
 * When an alert does not appear there are five different places it can die, and
 * four of them fail silently. This walks each one and says which. Open it at
 * /debug/alerts on whichever origin is misbehaving.
 */
type Row = { label: string; value: string; ok: boolean | null };

export default function AlertsDebug() {
  const [rows, setRows] = useState<Row[]>([]);
  const [log, setLog] = useState<string[]>([]);
  const say = (m: string) =>
    setLog((l) => [`${new Date().toLocaleTimeString()}  ${m}`, ...l].slice(0, 12));

  async function probe() {
    const out: Row[] = [];
    const secure = window.isSecureContext;
    out.push({
      label: "Secure context (https or localhost)",
      value: `${secure} · ${location.origin}`,
      ok: secure,
    });

    const hasNotif = "Notification" in window;
    out.push({ label: "Notification API", value: String(hasNotif), ok: hasNotif });

    const perm = hasNotif ? Notification.permission : "n/a";
    out.push({
      label: "Permission",
      value: perm,
      ok: perm === "granted" ? true : perm === "denied" ? false : null,
    });

    const hasSW = "serviceWorker" in navigator;
    out.push({ label: "Service worker API", value: String(hasSW), ok: hasSW });

    if (hasSW) {
      const regs = await navigator.serviceWorker.getRegistrations();
      out.push({
        label: "Registrations",
        value: regs.length
          ? regs.map((r) => `${r.scope} (${r.active ? "active" : r.installing ? "installing" : "waiting"})`).join(", ")
          : "none",
        ok: regs.length > 0,
      });

      const ready = await Promise.race([
        navigator.serviceWorker.ready.then(() => "resolved").catch((e) => `rejected: ${e}`),
        new Promise<string>((r) => setTimeout(() => r("TIMED OUT after 3s"), 3000)),
      ]);
      out.push({ label: "serviceWorker.ready", value: ready, ok: ready === "resolved" });

      const reg = await navigator.serviceWorker.getRegistration();
      const shown = reg ? (await reg.getNotifications()).length : 0;
      out.push({ label: "Notifications currently on screen", value: String(shown), ok: null });
    }

    out.push({
      label: "BroadcastChannel (cross-tab alerts)",
      value: String("BroadcastChannel" in window),
      ok: "BroadcastChannel" in window,
    });

    setRows(out);
  }

  useEffect(() => {
    navigator.serviceWorker?.register("/sw.js").catch(() => {});
    probe();
  }, []);

  const btn =
    "rounded-lg border border-line px-3 py-2 text-sm font-bold transition hover:bg-white/5";

  return (
    <div className="mx-auto max-w-2xl p-5">
      <h1 className="text-xl font-extrabold">Notification diagnostics</h1>
      <p className="mt-1 text-sm text-muted">
        Every row must be green before an alert can reach the screen. Run the tests
        below in order; the first one that produces nothing is where it is dying.
      </p>

      <table className="mt-4 w-full text-sm">
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-line">
              <td className="py-2 pr-3 align-top text-muted">{r.label}</td>
              <td className="py-2 font-mono text-[12px]">
                <span
                  className={
                    r.ok === true ? "text-accent" : r.ok === false ? "text-rose-400" : ""
                  }
                >
                  {r.value}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="mt-5 flex flex-wrap gap-2">
        <button className={btn} onClick={() => probe()}>Re-run checks</button>

        <button
          className={btn}
          onClick={async () => {
            const p = await Notification.requestPermission();
            say(`requestPermission -> ${p}`);
            probe();
          }}
        >
          1. Ask permission
        </button>

        <button
          className={btn}
          onClick={() => {
            try {
              new Notification("Kairos test (direct)", {
                body: "Raised by the page, with no service worker involved.",
                icon: "/icon.png",
              });
              say("direct Notification() constructed with no error");
            } catch (e) {
              say(`direct Notification() threw: ${(e as Error).message}`);
            }
          }}
        >
          2. Direct notification
        </button>

        <button
          className={btn}
          onClick={async () => {
            const reg = await Promise.race([
              navigator.serviceWorker.ready,
              new Promise<null>((r) => setTimeout(() => r(null), 3000)),
            ]);
            if (!reg) return say("service worker never became ready (3s)");
            reg.active?.postMessage({
              kind: "kairos-notify",
              id: `test-${Date.now()}`,
              title: "Kairos test (service worker)",
              body: "Raised by sw.js. This is the path a real payout uses.",
              url: "/notifications",
            });
            say("posted to the service worker");
            setTimeout(probe, 800);
          }}
        >
          3. Via service worker
        </button>

        <button
          className={btn}
          onClick={() => {
            announce([
              {
                id: `bc-${Date.now()}`,
                title: "Kairos test (cross-tab)",
                body: "Broadcast from this tab. It should appear from OTHER tabs.",
                url: "/notifications",
              },
            ]);
            say("broadcast sent — watch your other Kairos tab");
          }}
        >
          4. Broadcast to other tabs
        </button>

        <button
          className={btn}
          onClick={async () => {
            const regs = await navigator.serviceWorker.getRegistrations();
            await Promise.all(regs.map((r) => r.unregister()));
            say(`unregistered ${regs.length} worker(s) — reloading`);
            setTimeout(() => location.reload(), 600);
          }}
        >
          Reset worker
        </button>
      </div>

      {log.length > 0 && (
        <pre className="mt-4 whitespace-pre-wrap rounded-lg border border-line p-3 font-mono text-[12px] text-muted">
          {log.join("\n")}
        </pre>
      )}

      <div className="mt-5 rounded-lg border border-line p-4 text-sm leading-relaxed text-muted">
        <b className="text-foreground">If every row is green and 2 and 3 still show nothing</b>,
        the browser is doing its job and the operating system is swallowing it. On a Mac,
        check System Settings, Notifications, Google Chrome: it must be set to
        <b className="text-foreground"> Allow Notifications</b>, with the style set to
        Alerts or Banners. Also turn off Do Not Disturb and any Focus mode, and do not
        present in fullscreen, since macOS hides notifications over a fullscreen window.
      </div>
    </div>
  );
}
