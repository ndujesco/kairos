/**
 * Wipes the school-fees demo entirely, so the cause can be created from
 * scratch on camera.
 *
 *   npm run demo:clean
 *
 * After it runs there is no school-fees cause, no donation, no payout and no
 * notification anywhere in the database. User accounts are untouched, and they
 * all point at the same inbox.
 *
 * Use this before recording. Use `npm run demo:reset` to jump straight to the
 * state the live demo starts from instead.
 */
import { MongoClient } from "mongodb";
import fs from "node:fs";

const uri = (process.env.MONGODB_URI ||
  fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .match(/MONGODB_URI=(.+)/)[1].trim());

const INBOX = process.env.DEMO_EMAIL || "ugondu635@gmail.com";

/* every school-fees lookalike, so the feed reads cleanly on camera */
const SLUGS = [
  "ugo-final-year-fees-unilag",
  "keep-tobi-in-school-unilag",
  "help-emeka-surgery-igbobi",
];

const client = await MongoClient.connect(uri);
const db = client.db();

const ugo = await db.collection("users").findOne({ handle: "ugo" });
const mine = await db.collection("causes")
  .find({ $or: [{ slug: { $in: SLUGS } }, { organizer: ugo?._id }] })
  .toArray();

let donations = 0, payouts = 0;
for (const c of mine) {
  donations += (await db.collection("donations").deleteMany({ cause: c._id })).deletedCount;
  payouts += (await db.collection("disbursements").deleteMany({ cause: c._id })).deletedCount;
  await db.collection("causes").deleteOne({ _id: c._id });
}

/* every notification goes - a leftover alert is what gives a demo away */
const notes = (await db.collection("notifications").deleteMany({})).deletedCount;

/* one inbox for every account, so any alert can be shown from one mailbox */
await db.collection("users").updateMany({}, { $set: { email: INBOX } });

console.log("\n  Clean. Nothing of the school-fees demo is left.\n");
console.log(`  causes removed     ${mine.length}${mine.length ? "  (" + mine.map((c) => c.slug).join(", ") + ")" : ""}`);
console.log(`  donations removed  ${donations}`);
console.log(`  payouts removed    ${payouts}`);
console.log(`  notifications      ${notes} deleted (all users)`);
console.log(`  email              ${INBOX} on every account`);
console.log(`  users              ${await db.collection("users").countDocuments({})} kept\n`);
console.log("  Next: sign in as @ugo and create the cause on camera.\n");
await client.close();
