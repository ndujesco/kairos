/**
 * Builds the surgical estimate that backs Chidinma's cause.
 *
 *   node scripts/make-hospital-estimate.mjs
 *
 * Shaped like a teaching-hospital proforma. The hospital number and the
 * estimate reference are deliberately placeholders so the file cannot be
 * mistaken for a real record, and the lines sum to the cause goal.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
const { chromium } = createRequire((process.env.PW || "/tmp/krec2/").replace(/\/?$/, "/"))("playwright-core");

const HOSP_NO = "LUTH/ORT/000000";
const ESTIMATE = "EST-000000";
const ISSUED = "21 June 2026";
const VALID = "21 July 2026";

const naira = (n) => n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

const GROUPS = [
  { title: "Theatre and Surgical", items: [
      ["Corrective osteotomy, left tibia and fibula", 310000],
      ["Orthopaedic implants: locking plate and screws", 265000],
      ["Theatre use and consumables", 95000],
      ["Anaesthesia, general", 60000],
    ]},
  { title: "Ward and Investigations", items: [
      ["Admission and ward stay, 6 nights", 72000],
      ["Pre-operative imaging and laboratory", 48000],
    ]},
  { title: "Post-operative", items: [
      ["Post-operative medication, 8 weeks", 120000],
    ]},
];
for (const g of GROUPS) g.total = g.items.reduce((a, [, v]) => a + v, 0);
const GRAND = GROUPS.reduce((a, g) => a + g.total, 0);
if (GRAND !== 970000) throw new Error(`lines sum to ${GRAND}, expected 970000`);

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @page{size:A4;margin:0}
  *{box-sizing:border-box}
  body{margin:0;font-family:Helvetica,Arial,sans-serif;color:#111;font-size:9.4pt}
  .page{width:210mm;height:297mm;padding:15mm 16mm;overflow:hidden}
  header{border-bottom:2.5px solid #123c6b;padding-bottom:12px;margin-bottom:14px}
  h1{margin:0;font-size:17pt;color:#123c6b;letter-spacing:.2px}
  .sub{font-size:9pt;color:#444;margin-top:4px}
  h2{font-size:11.5pt;letter-spacing:2px;text-align:center;margin:16px 0 4px;color:#123c6b}
  .ref{text-align:center;font-size:8.6pt;color:#555;margin-bottom:14px}
  .meta{width:100%;border-collapse:collapse;margin-bottom:14px}
  .meta td{padding:3px 0;font-size:9.6pt;vertical-align:top}
  .meta td:first-child{width:34%;color:#444}
  table.items{width:100%;border-collapse:collapse;border:1px solid #333}
  table.items th{background:#123c6b;color:#fff;text-align:left;padding:6px 9px;font-size:8.8pt;letter-spacing:.4px}
  table.items th.amt,table.items td.amt{text-align:right;white-space:nowrap;width:150px}
  table.items td{padding:5px 9px;border-top:1px solid #ccc;font-size:9pt}
  tr.grp td{background:#eef2f7;font-weight:bold;font-size:8.8pt;letter-spacing:.3px}
  tr.sub td{font-size:8.8pt;color:#444}
  tr.tot td{border-top:2px solid #333;background:#f2f2f2;font-weight:bold;font-size:11pt}
  .note{margin-top:14px;font-size:9pt;line-height:1.55;color:#333}
  .note li{margin-bottom:3px}
  .sig{margin-top:26px;display:flex;justify-content:flex-end;text-align:center}
  .sig div{border-top:1px solid #333;padding-top:4px;width:230px;font-size:9pt}
  footer{margin-top:18px;border-top:1px solid #999;padding-top:7px;font-size:7.8pt;color:#555;
    display:flex;justify-content:space-between}
</style></head><body><div class="page">
  <header>
    <h1>Lagos University Teaching Hospital</h1>
    <div class="sub">Department of Orthopaedic and Trauma Surgery &middot; Idi-Araba, Surulere, Lagos</div>
    <div class="sub">orthopaedics@luth.gov.ng &middot; +234 1 793 1234</div>
  </header>

  <h2>ESTIMATE OF TREATMENT COST</h2>
  <div class="ref">Estimate no. ${ESTIMATE} &middot; issued ${ISSUED} &middot; valid until ${VALID}</div>

  <table class="meta">
    <tr><td>Patient</td><td><b>Miss Chidinma Obi</b></td></tr>
    <tr><td>Hospital number</td><td><b>${HOSP_NO}</b></td></tr>
    <tr><td>Age / Sex</td><td>24 / Female</td></tr>
    <tr><td>Diagnosis</td><td>Comminuted fracture, left tibia and fibula (road traffic injury)</td></tr>
    <tr><td>Procedure advised</td><td>Open reduction and internal fixation with implants</td></tr>
    <tr><td>Consultant</td><td>Dr. A. Olaniyan, Orthopaedic and Trauma Surgery</td></tr>
  </table>

  <table class="items">
    <tr><th>Description</th><th class="amt">Amount (NGN)</th></tr>
    ${GROUPS.map((g) => `
      <tr class="grp"><td>${g.title}</td><td class="amt">${naira(g.total)}</td></tr>
      ${g.items.map(([l, v]) => `<tr class="sub"><td>&nbsp;&nbsp;${l}</td><td class="amt">${naira(v)}</td></tr>`).join("")}
    `).join("")}
    <tr class="tot"><td>TOTAL ESTIMATE</td><td class="amt">${naira(GRAND)}</td></tr>
  </table>

  <div class="note"><ul>
    <li>This is an estimate of cost. Final charges may vary with findings at surgery.</li>
    <li>Payment is made to the hospital account only. No member of staff is authorised to receive cash.</li>
    <li>Surgery is scheduled on confirmation of payment and availability of theatre.</li>
    <li>This estimate lapses on the validity date shown above.</li>
  </ul></div>

  <div class="sig"><div>Head, Orthopaedic and Trauma Surgery</div></div>

  <footer>
    <span>Lagos University Teaching Hospital &middot; Patient Accounts</span>
    <span>Page 1 of 1</span>
  </footer>
</div></body></html>`;

const out = path.join(
  fileURLToPath(new URL("../public/demo/docs/", import.meta.url)),
  "luth-surgical-estimate.pdf"
);
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html, { waitUntil: "load" });
await page.pdf({ path: out, format: "A4", printBackground: true, pageRanges: "1" });
await browser.close();
console.log(`\n  wrote public/demo/docs/luth-surgical-estimate.pdf`);
GROUPS.forEach((g) => console.log(`   ${g.title.padEnd(28)} ${naira(g.total).padStart(12)}`));
console.log(`   ${"TOTAL".padEnd(28)} ${naira(GRAND).padStart(12)}\n`);
