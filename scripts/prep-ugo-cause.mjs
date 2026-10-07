/**
 * Makes Ugo's cause demo-ready. Idempotent, run it as often as you like.
 *
 *   npm run demo:prep
 *
 * Two jobs:
 *
 *  1. Hangs the real fee demand notice off the cause. The AI screening flagged
 *     "no institutional documents uploaded yet", which was the one weak line on
 *     the page.
 *  2. Puts the Remita reference on the budget line. The intake assistant writes
 *     the RRR into the vendor NAME, which reads fine but leaves the payout
 *     screen on its generic path: type an amount, pay a vendor. With rrr set,
 *     the organizer instead gets the school-fees path - no amount field at all,
 *     the reference shown, and the institution's own receipt at the end.
 */
import { MongoClient } from "mongodb";
import fs from "node:fs";

const uri = (process.env.MONGODB_URI ||
  fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .match(/MONGODB_URI=(.+)/)[1].trim());

const SLUG = process.env.SLUG || "final-year-student-unilag-tuition-fees-aom2";
const DOC = "/demo/docs/unilag-fee-demand-notice.pdf";

const client = await MongoClient.connect(uri);
const C = client.db().collection("causes");
const cause = await C.findOne({ slug: SLUG });
if (!cause) throw new Error(`no cause with slug ${SLUG}`);

const RRR = "3456 8835 9933";

/* The reference moves out of the vendor name and into its own field, where the
   payout screen can act on it. */
await C.updateOne(
  { _id: cause._id },
  {
    $set: {
      "budget.0.rrr": RRR,
      "budget.0.rrrStudent": "Ndujekwu Ugochukwu Peter",
      "budget.0.rrrMatric": "210403512",
      "budget.0.vendor.name": "University of Lagos (Bursary)",
      "budget.0.vendor.verified": true,
      "budget.0.vendor.account": "Remita biller",
    },
  }
);

const clean = { reuse: "clean", exif: "consistent", dates: "consistent" };
const want = [
  {
    label: `UNILAG statement of outstanding fees - RRR ${RRR}`,
    url: DOC,
    kind: "invoice",
    checks: clean,
  },
  { label: "Student identity and matriculation record (210403512)", kind: "document", checks: clean },
  { label: "Student portal screenshot showing the outstanding balance", kind: "photo", checks: clean },
];

/* keep whatever is already there, add only what is missing */
const existing = cause.evidence ?? [];
const have = new Set(existing.map((e) => e.label));
const added = want.filter((w) => !have.has(w.label));
const evidence = [...want, ...existing.filter((e) => !want.some((w) => w.label === e.label))];

await C.updateOne({ _id: cause._id }, { $set: { evidence, updatedAt: new Date() } });

console.log(`\n  ${SLUG}`);
console.log(`  budget line now settles against RRR ${RRR} (school-fees payout)`);
console.log(`  evidence now ${evidence.length} items (${added.length} added)\n`);
for (const e of evidence) console.log(`   · ${e.label}${e.url ? `\n       ${e.url}` : ""}`);
console.log();
await client.close();
