/**
 * Cross-tab payment alerts.
 *
 * The session is one cookie, so every tab in a browser is the same signed-in
 * user. That makes the obvious demo setup - donor in one tab, organizer in
 * another - impossible to poll for: signing in as the organizer signs the donor
 * out, and the donor's tab starts polling the organizer's notifications.
 *
 * So the tab that performs the payout announces the donor alerts directly to
 * every other tab in the browser. No session, no poll, no timing window.
 */
export type AlertPayload = {
  id: string;
  title: string;
  body: string;
  url?: string;
  donorName?: string;
};

const CHANNEL = "kairos-alerts";

/** Announce alerts to every other tab. Safe to call anywhere. */
export function announce(alerts: AlertPayload[]) {
  if (typeof window === "undefined" || !("BroadcastChannel" in window)) return;
  try {
    const ch = new BroadcastChannel(CHANNEL);
    for (const a of alerts) ch.postMessage(a);
    // let the messages flush before the channel goes away
    setTimeout(() => ch.close(), 1000);
  } catch {
    /* an alert must never break a payment */
  }
}

/** Listen for alerts announced by another tab. Returns an unsubscribe. */
export function listen(onAlert: (a: AlertPayload) => void) {
  if (typeof window === "undefined" || !("BroadcastChannel" in window)) return () => {};
  let ch: BroadcastChannel;
  try {
    ch = new BroadcastChannel(CHANNEL);
  } catch {
    return () => {};
  }
  const handler = (e: MessageEvent) => {
    if (e.data && e.data.id && e.data.title) onAlert(e.data as AlertPayload);
  };
  ch.addEventListener("message", handler);
  return () => {
    ch.removeEventListener("message", handler);
    ch.close();
  };
}
