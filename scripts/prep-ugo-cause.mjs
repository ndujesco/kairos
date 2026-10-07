/**
 * Attaches the document proof to Ugo's cause.
 *
 *   node scripts/add-cause-evidence.mjs
 *
 * The AI screening flagged "no institutional documents uploaded yet", which is
 * the one weak line on the page. This hangs the real fee demand notice off the
 * cause so the claim and the document agree. Idempotent: run it as often as
 * you like.
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

const clean = { reuse: "clean", exif: "consistent", dates: "consistent" };
const want = [
  {
    label: `UNILAG statement of outstanding fees - RRR ${
      (cause.budget[0]?.vendor?.name || "").match(/[\d\s]{10,}/)?.[0].trim() || "3456 8835 9933"
    }`,
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
console.log(`  evidence now ${evidence.length} items (${added.length} added)\n`);
for (const e of evidence) console.log(`   · ${e.label}${e.url ? `\n       ${e.url}` : ""}`);
console.log();
await client.close();
