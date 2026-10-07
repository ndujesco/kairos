/**
 * Prints a fingerprint of the entire database.
 *
 *   npm run snapshot:verify
 *
 * Run it, change things, restore, run it again. Identical fingerprints mean the
 * restore was exact, down to every _id and timestamp.
 */
import { MongoClient } from "mongodb";
import { EJSON } from "bson";
import crypto from "node:crypto";
import fs from "node:fs";
import { fileURLToPath } from "node:url";

const uri = (process.env.MONGODB_URI ||
  fs.readFileSync(fileURLToPath(new URL("../.env.local", import.meta.url)), "utf8")
    .match(/MONGODB_URI=(.+)/)[1].trim());

const client = await MongoClient.connect(uri);
const db = client.db();
const names = (await db.listCollections().toArray())
  .map((c) => c.name).filter((n) => !n.startsWith("system.")).sort();

const all = {};
let total = 0;
for (const n of names) {
  all[n] = await db.collection(n).find({}).sort({ _id: 1 }).toArray();
  total += all[n].length;
}
const hash = crypto.createHash("sha256")
  .update(EJSON.stringify(all, { relaxed: false })).digest("hex");

console.log(`\n  ${hash.slice(0, 32)}   ${total} docs across ${names.length} collections\n`);
await client.close();
