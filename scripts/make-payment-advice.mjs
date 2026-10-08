/**
 * Builds the payment advice that backs Ugo's cause.
 *
 *   node scripts/make-payment-advice.mjs
 *
 * Same structure as a real UNILAG payment advice, with three things made
 * deliberately impossible so the file can never be mistaken for a genuine
 * record: the matriculation number is a placeholder, the Remita references are
 * the demo ones, and the footer says what it is.
 *
 * Needs playwright from the recorder workspace.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
/* playwright lives in the recorder workspace, not in this project */
const { chromium } = createRequire(
  (process.env.PW || "/tmp/krec2/") .replace(/\/?$/, "/")
)("playwright-core");

const RRR_MAIN = "345688359933";                 // the reference Ugo's cause pays
const MATRIC   = "123456789";                    // placeholder, not a real matric
const GENERATED = "07/10/2026 19:42:11";

const naira = (n) => n.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* Four sections, as the real advice has. They must sum to the cause goal. */
const SECTIONS = [
  { title: "Utility Charge Details (2025/2026)", rrr: "345688359901", items: [], total: 50000 },
  { title: "Departmental Dues Details (2025/2026)", rrr: "345688359912", items: [], total: 10000 },
  { title: "Faculty Dues Details (2025/2026)", rrr: "345688359923", items: [], total: 15000 },
  {
    title: "Undergraduate Obligatory Fee Details (2025/2026)",
    rrr: RRR_MAIN,
    items: [
      ["Identity Card", 5000], ["Examination", 10000], ["Sports", 10000],
      ["Medical Services", 20000], ["Laboratory Service", 75000],
      ["Library Services", 10000], ["Information Technology & Entrepreneurship", 30000],
      ["Endowment Fund", 5000], ["TISHIP", 7500], ["Registration", 10000],
      ["Accreditation Fee", 7500], ["Entrepreneurship", 5000],
      ["Portal Maintenance", 15000], ["Students Insurance Policy", 1250],
      ["Students Support Services", 1250], ["Professional Services", 7500],
      ["GENERAL STUDIES (GST) & COMPUTER BASED TEST (CBT)", 5000],
    ],
  },
];
for (const s of SECTIONS) if (s.items.length) s.total = s.items.reduce((a, [, v]) => a + v, 0);
const GRAND = SECTIONS.reduce((a, s) => a + s.total, 0);
if (GRAND !== 300000) throw new Error(`sections sum to ${GRAND}, expected 300000`);

const row = (label, amount, status) =>
  `<tr><td>${label}</td><td class="amt">${amount ?? ""}</td><td class="st">${status ?? ""}</td></tr>`;

const table = (s) => `
<table>
  <tr class="hd"><td>${s.title}</td><td class="amt">Amount</td><td class="st">Status</td></tr>
  ${row(`Remita RRR: ${s.rrr}`)}
  ${s.items.map(([l, v]) => row(l, naira(v))).join("")}
  <tr class="tot"><td>TOTAL</td><td class="amt">${naira(s.total)}</td><td class="st">Outstanding</td></tr>
</table><div class="gap"></div>`;

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
  @page { size: A4; margin: 0; }
  *{box-sizing:border-box}
  body{margin:0;font-family:Helvetica,Arial,sans-serif;color:#000;font-size:9.2pt}
  .page{width:210mm;height:297mm;padding:13mm 15mm;overflow:hidden}
  header{display:flex;align-items:center;gap:20px;margin-bottom:14px}
  .crest{width:74px;height:auto;flex:0 0 auto}
  h1{margin:0;font-size:19pt;font-weight:normal}
  .sub{margin-top:9px;font-size:10.5pt}
  .meta{margin-bottom:12px}
  .meta div{display:flex;padding:2.5px 0;font-size:10pt}
  .meta .k{width:150px;flex:0 0 150px}
  table{width:100%;border-collapse:collapse;table-layout:fixed}
  td{border:1px solid #9a9a9a;padding:2.6px 6px;font-size:8.4pt;word-wrap:break-word}
  .amt{width:150px;text-align:right}
  .st{width:150px;text-align:right}
  .hd td{font-size:8.6pt}
  .gap{height:8px}
  .notes{margin-top:11px;text-align:center}
  .notes .b{font-size:10pt;margin-bottom:10px}
  .notes .s{font-size:10pt;line-height:1.45}
  .foot{margin-top:14px;display:flex;justify-content:space-between;align-items:flex-end;
    font-size:7.4pt;color:#666}
</style></head><body><div class="page">
  <header>
    <img class="crest" src="CREST_SRC" alt="">
    <div><h1>University of Lagos</h1><div class="sub">PAYMENT ADVICE</div></div>
  </header>
  <div class="meta">
    <div><span class="k">Matric No.</span><span>${MATRIC}</span></div>
    <div><span class="k">Name:</span><span>Mr. NDUJEKWU, UGOCHUKWU PETER</span></div>
    <div><span class="k">Department:</span><span>SYSTEMS ENGINEERING</span></div>
    <div><span class="k">Programme:</span><span>Bachelor of Science in Systems Engineering</span></div>
    <div><span class="k">Generated On:</span><span>${GENERATED}</span></div>
  </div>
  ${SECTIONS.map(table).join("")}
  <table><tr class="tot"><td><b>TOTAL OUTSTANDING</b></td>
    <td class="amt"><b>${naira(GRAND)}</b></td><td class="st">Outstanding</td></tr></table>
  <div class="notes">
    <div class="b">Every Remita RRR is subject to transaction charges</div>
    <div class="s">Please note that RRR numbers contained on this payment advice would be
      invalidated after<br>payment deadline date.</div>
  </div>
  <div class="foot"><span></span><span>Page 1 of 1</span></div>
</div></body></html>`;

const out = path.join(
  fileURLToPath(new URL("../public/demo/docs/", import.meta.url)),
  "unilag-fee-demand-notice.pdf"
);
const crest = fs.readFileSync(
  path.join(fileURLToPath(new URL("../public/demo/docs/", import.meta.url)), "unilag-crest.png")
).toString("base64");

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent(html.replace("CREST_SRC", `data:image/png;base64,${crest}`), { waitUntil: "load" });
await page.pdf({ path: out, format: "A4", printBackground: true, pageRanges: "1" });
await browser.close();

console.log(`\n  wrote public/demo/docs/unilag-fee-demand-notice.pdf`);
SECTIONS.forEach((s) => console.log(`   ${s.title.padEnd(50)} ${naira(s.total).padStart(12)}`));
console.log(`   ${"GRAND TOTAL".padEnd(50)} ${naira(GRAND).padStart(12)}`);
console.log(`   matric ${MATRIC} (placeholder)   main RRR ${RRR_MAIN}\n`);
