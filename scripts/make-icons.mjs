/**
 * Renders the Kairos mark to real PNG files.
 *
 *   npm run icons
 *
 * src/app/icon.tsx generates the favicon at /icon, which is a 32px route and
 * not a file. A notification icon has to be a plain URL the service worker can
 * point at, and 32px is far too small for one, so we write proper files.
 *
 *   public/icon-192.png   the notification icon (Chrome draws it ~48-64px)
 *   public/icon-512.png   spare, for a manifest or a share card
 *   public/badge-96.png   monochrome mask Android uses in the status bar
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const { chromium } = createRequire("/tmp/krec2/")("/tmp/krec2/node_modules/playwright-core");

/* the same path as src/app/icon.tsx, so the mark can never drift */
const GLASS =
  "M6 2v6l4 4-4 4v6h12v-6l-4-4 4-4V2H6zm10 14.5V20H8v-3.5l4-4 4 4zM8 7.5V4h8v3.5l-4 4-4-4z";

const page_ = (size, fill, bg, radius) => `<!doctype html><html><head><style>
  html,body{margin:0;padding:0;background:transparent}
  .w{width:${size}px;height:${size}px;display:flex;align-items:center;justify-content:center;
     background:${bg};border-radius:${radius}px}
  svg{width:${Math.round(size * 0.72)}px;height:${Math.round(size * 0.72)}px}
</style></head><body>
  <div class="w"><svg viewBox="0 0 24 24" fill="${fill}"><path d="${GLASS}"/></svg></div>
</body></html>`;

const out = fileURLToPath(new URL("../public/", import.meta.url));
fs.mkdirSync(out, { recursive: true });

const jobs = [
  { file: "icon-192.png", size: 192, fill: "#00ba7c", bg: "#000000", radius: 36 },
  { file: "icon-512.png", size: 512, fill: "#00ba7c", bg: "#000000", radius: 96 },
  // a badge is used as a mask: it must be solid white on transparent
  { file: "badge-96.png", size: 96, fill: "#ffffff", bg: "transparent", radius: 0 },
];

const browser = await chromium.launch();
for (const j of jobs) {
  const ctx = await browser.newContext({
    viewport: { width: j.size, height: j.size },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.setContent(page_(j.size, j.fill, j.bg, j.radius), { waitUntil: "load" });
  await page.screenshot({ path: path.join(out, j.file), omitBackground: true });
  await ctx.close();
  console.log(`  ${j.file}  ${j.size}x${j.size}`);
}
await browser.close();
