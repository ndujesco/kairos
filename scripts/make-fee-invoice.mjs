/**
 * Renders the UNILAG fee demand notice that backs Ugo's cause.
 *
 *   node scripts/make-fee-invoice.mjs
 *
 * Figures are read from the cause itself, so the document can never drift from
 * what the page claims. Output: public/demo/docs/unilag-fee-demand-notice.pdf
 *
 * Needs playwright, which lives in the recorder workspace:
 *   PW=/tmp/krec2/node_modules node scripts/make-fee-invoice.mjs
 */
import { MongoClient } from "mongodb";
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const PW = process.env.PW || "/tmp/krec2/node_modules";
const { chromium } = require(path.join(PW, "playwright-core"));

const uri = (process.env.MONGODB_URI ||
  fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .match(/MONGODB_URI=(.+)/)[1].trim());

const SLUG = process.env.SLUG || "final-year-student-unilag-tuition-fees-aom2";

const client = await MongoClient.connect(uri);
const cause = await client.db().collection("causes").findOne({ slug: SLUG });
await client.close();
if (!cause) throw new Error(`no cause with slug ${SLUG}`);

const total = cause.goal;
const rrr = (cause.budget[0]?.vendor?.name || "").match(/[\d\s]{10,}/)?.[0].trim() || "3456 8835 9933";

/* The breakdown is apportioned from the real total so the lines always sum. */
const WEIGHTS = [
  ["Tuition and academic fee, Engineering (400 level)", 0.6333],
  ["Laboratory and workshop levy", 0.15],
  ["Library and ICT services levy", 0.0833],
  ["Examination and registration", 0.0667],
  ["Sports and development levy", 0.04],
  ["Student union dues and group insurance", 0.0267],
];
let running = 0;
const lines = WEIGHTS.map(([label, w], i) => {
  const amt = i === WEIGHTS.length - 1
    ? total - running
    : Math.round((total * w) / 100) * 100;
  running += amt;
  return { label, amt };
});

const naira = (n) => "₦" + n.toLocaleString("en-NG") + ".00";
const issued = new Date(cause.createdAt ?? Date.now());
const due = new Date(issued.getTime() + 864e5);
const fmt = (d) => d.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 0; }
  * { box-sizing: border-box; }
  body { margin:0; font-family: "Times New Roman", Times, serif; color:#111; font-size:11pt; }
  .page { width:210mm; min-height:297mm; padding:16mm 18mm; position:relative; }
  .crest { width:62px; height:62px; border-radius:50%; border:2.5px solid #0a3d2e;
           display:flex; align-items:center; justify-content:center; flex-direction:column;
           color:#0a3d2e; font-size:6.5pt; line-height:1.15; text-align:center; font-weight:bold; }
  header { display:flex; gap:16px; align-items:center; border-bottom:3px double #0a3d2e; padding-bottom:12px; }
  h1 { margin:0; font-size:19pt; letter-spacing:.5px; color:#0a3d2e; }
  .sub { font-size:9.5pt; color:#444; margin-top:3px; }
  h2 { text-align:center; font-size:12.5pt; letter-spacing:2px; margin:20px 0 4px; text-decoration:underline; }
  .ref { text-align:center; font-size:9pt; color:#555; margin-bottom:16px; }
  table { width:100%; border-collapse:collapse; }
  .meta td { padding:3.5px 0; font-size:10.5pt; vertical-align:top; }
  .meta td:first-child { width:38%; color:#444; }
  .meta b { font-weight:bold; }
  .items { margin-top:14px; border:1px solid #333; }
  .items th { background:#0a3d2e; color:#fff; text-align:left; padding:7px 10px; font-size:10pt; letter-spacing:.4px; }
  .items td { padding:6.5px 10px; border-top:1px solid #ccc; font-size:10.5pt; }
  .items td.amt, .items th.amt { text-align:right; white-space:nowrap; }
  .total td { border-top:2px solid #333; font-weight:bold; font-size:12pt; background:#f2f2f2; }
  .rrrbox { margin-top:18px; border:2px solid #0a3d2e; padding:12px 14px; background:#f7faf9; }
  .rrrbox .lab { font-size:8.5pt; letter-spacing:1.5px; color:#0a3d2e; font-weight:bold; }
  .rrrbox .val { font-family:"Courier New",monospace; font-size:21pt; font-weight:bold; letter-spacing:3px; margin-top:3px; }
  .note { margin-top:16px; font-size:9.5pt; line-height:1.55; color:#333; }
  .note li { margin-bottom:3px; }
  .stamp { position:absolute; top:300px; right:52px; transform:rotate(-16deg);
           border:5px solid #b3261e; color:#b3261e; padding:7px 24px; font-size:30pt;
           font-weight:bold; letter-spacing:5px; opacity:.5; border-radius:7px; }
  footer { position:absolute; bottom:14mm; left:18mm; right:18mm; border-top:1px solid #999;
           padding-top:8px; font-size:8.5pt; color:#555; display:flex; justify-content:space-between; }
  .sig { margin-top:26px; display:flex; justify-content:flex-end; text-align:center; }
  .sig div { border-top:1px solid #333; padding-top:4px; width:200px; font-size:9.5pt; }
</style></head><body><div class="page">
  <header>
    <div class="crest">UNIVERSITY<br>OF<br>LAGOS<br>1962</div>
    <div>
      <h1>UNIVERSITY OF LAGOS</h1>
      <div class="sub">Office of the Bursar · Akoka, Yaba, Lagos State, Nigeria</div>
      <div class="sub">bursary@unilag.edu.ng · +234 1 280 2439</div>
    </div>
  </header>

  <h2>STATEMENT OF OUTSTANDING FEES</h2>
  <div class="ref">Document no. UL/BUR/SOF/${issued.getFullYear()}/${String(cause.goal).slice(0,4)}${issued.getDate()}${issued.getMonth()+1}</div>

  <table class="meta">
    <tr><td>Student name</td><td><b>Ndujekwu Ugochukwu Peter</b></td></tr>
    <tr><td>Matriculation number</td><td><b>210403512</b></td></tr>
    <tr><td>Faculty / Department</td><td>Engineering / Systems Engineering</td></tr>
    <tr><td>Level of study</td><td>400 (Final year)</td></tr>
    <tr><td>Academic session</td><td>2025 / 2026</td></tr>
    <tr><td>Date of issue</td><td>${fmt(issued)}</td></tr>
    <tr><td>Payment deadline</td><td><b style="color:#b3261e">${fmt(due)}</b></td></tr>
  </table>

  <table class="items">
    <tr><th>Description of charge</th><th class="amt">Amount (NGN)</th></tr>
    ${lines.map((l) => `<tr><td>${l.label}</td><td class="amt">${naira(l.amt)}</td></tr>`).join("")}
    <tr class="total"><td>TOTAL OUTSTANDING</td><td class="amt">${naira(total)}</td></tr>
  </table>

  <div class="rrrbox">
    <div class="lab">REMITA RETRIEVAL REFERENCE (RRR)</div>
    <div class="val">${rrr}</div>
    <div style="font-size:9pt;color:#444;margin-top:5px">
      Biller: University of Lagos (Bursary) · Service: Student Fees 2025/2026
    </div>
  </div>

  <div class="note"><ul>
    <li>This reference is issued to the named student only and is valid for this charge alone.</li>
    <li>Payment may be completed at any commercial bank, or online through the Remita platform, by quoting the reference above.</li>
    <li>Funds settle directly to the University of Lagos account. The reference cannot be redirected to any third party.</li>
    <li>Failure to settle this balance by the stated deadline will result in withdrawal of examination clearance.</li>
    <li>Retain the Remita receipt. Clearance will not be processed without it.</li>
  </ul></div>

  <div class="stamp">UNPAID</div>

  <div class="sig"><div>Deputy Bursar (Student Accounts)</div></div>

  <footer>
    <span>University of Lagos · Office of the Bursar</span>
    <span>Computer generated. Valid without signature when verified by RRR.</span>
  </footer>
</div></body></html>`;

/* fileURLToPath, not .pathname - the repo path contains a space, and a URL
   pathname keeps it percent-encoded, which writes to a "The%20Forge" folder. */
const outDir = fileURLToPath(new URL("../public/demo/docs/", import.meta.url));
fs.mkdirSync(outDir, { recursive: true });
const out = path.join(outDir, "unilag-fee-demand-notice.pdf");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "load" });
await page.pdf({ path: out, format: "A4", printBackground: true });
await browser.close();

console.log(`\n  wrote  public/demo/docs/unilag-fee-demand-notice.pdf`);
console.log(`  cause  ${SLUG}`);
console.log(`  total  ${naira(total)}  (lines sum to ${naira(lines.reduce((a, l) => a + l.amt, 0))})`);
console.log(`  RRR    ${rrr}\n`);
