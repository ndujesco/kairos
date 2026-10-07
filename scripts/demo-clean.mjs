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

/* Abby is the donor who gives live on stage, so hers is the only address that
   needs to reach a real inbox. Everyone else gets a plausible-looking address
   on example.com, the reserved placeholder domain, so a payout email can never
   land on a real stranger. */
async function setEmails(U, inbox) {
  const users = await U.find({}, { projection: { handle: 1, name: 1 } }).toArray();
  const parts = (s) => s.toLowerCase().normalize("NFD").replace(/[^a-z ]/g, "").trim().split(/\s+/);
  const styles = [
    (p, n) => `${p[0]}.${p[1] ?? p[0]}${n}`,
    (p, n) => `${p[0]}${p[1] ? p[1][0] : ""}${n}`,
    (p, n) => `${p[1] ?? p[0]}${p[0][0]}${n}`,
    (p, n) => `${p[0]}_${p[1] ?? "ng"}${n}`,
  ];
  const ops = users.map((u) => {
    if (u.handle === "abby") return { updateOne: { filter: { _id: u._id }, update: { $set: { email: inbox } } } };
    const p = parts(u.name || u.handle);
    const n = 10 + Math.floor(Math.random() * 89);
    const local = styles[Math.floor(Math.random() * styles.length)](p, n).replace(/\.\./g, ".");
    return { updateOne: { filter: { _id: u._id }, update: { $set: { email: `${local}@example.com` } } } };
  });
  if (ops.length) await U.bulkWrite(ops);
}

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

/* only Abby has an inbox - she is the donor who gives live, and one arriving
   mail is far clearer to show than thirteen */
await setEmails(db.collection("users"), INBOX);

console.log("\n  Clean. Nothing of the school-fees demo is left.\n");
console.log(`  causes removed     ${mine.length}${mine.length ? "  (" + mine.map((c) => c.slug).join(", ") + ")" : ""}`);
console.log(`  donations removed  ${donations}`);
console.log(`  payouts removed    ${payouts}`);
console.log(`  notifications      ${notes} deleted (all users)`);
console.log(`  email              ${INBOX} on @abby only`);
console.log(`  users              ${await db.collection("users").countDocuments({})} kept\n`);
console.log("  Next: sign in as @ugo and create the cause on camera.\n");
await client.close();
