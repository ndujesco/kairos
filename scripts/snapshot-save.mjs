/**
 * Freezes the whole database to a file.
 *
 *   npm run snapshot:save              -> scripts/snapshots/default.json
 *   npm run snapshot:save -- finale    -> scripts/snapshots/finale.json
 *
 * Every collection, every document, byte for byte, with ObjectIds and Dates
 * preserved via MongoDB Extended JSON. Restoring gives you exactly this state
 * back - same _ids, same timestamps, same everything.
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
const dir = fileURLToPath(new URL("./snapshots/", import.meta.url));
fs.mkdirSync(dir, { recursive: true });
const out = path.join(dir, `${name}.json`);

const client = await MongoClient.connect(uri);
const db = client.db();

const names = (await db.listCollections().toArray())
  .map((c) => c.name)
  .filter((n) => !n.startsWith("system."))
  .sort();

const data = {};
let total = 0;
for (const n of names) {
  const docs = await db.collection(n).find({}).toArray();
  data[n] = docs;
  total += docs.length;
}

fs.writeFileSync(
  out,
  EJSON.stringify({ takenAt: new Date(), db: db.databaseName, collections: data }, { relaxed: false }, 2)
);

console.log(`\n  Saved snapshot "${name}"\n`);
for (const n of names) console.log(`    ${String(data[n].length).padStart(5)}  ${n}`);
console.log(`\n  ${total} documents -> scripts/snapshots/${name}.json`);
console.log(`  restore with:  npm run snapshot:restore${name === "default" ? "" : ` -- ${name}`}\n`);
await client.close();
