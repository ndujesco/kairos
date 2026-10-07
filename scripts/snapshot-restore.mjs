/**
 * Puts the database back to exactly what a snapshot holds.
 *
 *   npm run snapshot:restore            <- scripts/snapshots/default.json
 *   npm run snapshot:restore -- finale
 *
 * Every collection in the snapshot is dropped and rewritten with the original
 * _ids and dates, so the result is indistinguishable from the moment the
 * snapshot was taken. Collections that exist now but are absent from the
 * snapshot are dropped too, because "exactly this" has to mean exactly.
 */
import { MongoClient } from "mongodb";
import { EJSON } from "bson";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const uri = (process.env.MONGODB_URI ||
  fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .match(/MONGODB_URI=(.+)/)[1].trim());

const name = (process.argv[2] || "default").replace(/[^a-z0-9_-]/gi, "");
const file = path.join(fileURLToPath(new URL("./snapshots/", import.meta.url)), `${name}.json`);
if (!fs.existsSync(file)) {
  console.error(`\n  No snapshot called "${name}". Take one with: npm run snapshot:save${name === "default" ? "" : ` -- ${name}`}\n`);
  process.exit(1);
}

const snap = EJSON.parse(fs.readFileSync(file, "utf8"), { relaxed: false });
const client = await MongoClient.connect(uri);
const db = client.db();

const want = Object.keys(snap.collections).sort();
const now = (await db.listCollections().toArray()).map((c) => c.name).filter((n) => !n.startsWith("system."));

let total = 0;
for (const n of want) {
  const docs = snap.collections[n];
  await db.collection(n).deleteMany({});
  if (docs.length) await db.collection(n).insertMany(docs, { ordered: false });
  total += docs.length;
  console.log(`    ${String(docs.length).padStart(5)}  ${n}`);
}

/* anything created since the snapshot was taken has no business surviving */
const extra = now.filter((n) => !want.includes(n));
for (const n of extra) {
  await db.collection(n).drop().catch(() => {});
  console.log(`    dropped  ${n}  (not in snapshot)`);
}

console.log(`\n  Restored "${name}" - ${total} documents, taken ${new Date(snap.takenAt).toLocaleString()}\n`);
await client.close();
