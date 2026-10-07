/* Kairos desktop alerts. The page polls for new notifications and asks this
   worker to show them, so an alert still appears while the tab is in the
   background. */
self.addEventListener("install", (e) => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("message", (event) => {
  const d = event.data || {};
  if (d.kind !== "kairos-notify") return;
  self.registration.showNotification(d.title || "Kairos", {
    body: d.body || "",
    icon: "/icon.png",
    badge: "/icon.png",
    tag: d.id,
    requireInteraction: true,
    data: { url: d.url || "/notifications" },
  });
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || "/notifications";
  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
      for (const c of list) if ("focus" in c) { c.navigate(url); return c.focus(); }
      return self.clients.openWindow(url);
    })
  );
});
