// Mutation checks use a disposable QA database; never the default/live DB.
import { MongoClient, ObjectId } from "mongodb";
import { EJSON } from "bson";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { baseline, resetUgo, SLUG } from "./reset-ugo-after-okefe.mjs";

const client = await MongoClient.connect(process.env.MONGODB_URI);
const name = `kairos_qa_ugo_reset_${Date.now()}`;
assert.match(name, /^kairos_qa_/);
const db = client.db(name);
const backupDir = await fs.mkdtemp(path.join(os.tmpdir(), "kairos-qa-ugo-reset-"));
const clone = (value) => EJSON.parse(EJSON.stringify(value));
const ref = await baseline();
const other = new ObjectId(), donor = new ObjectId();
const filters = {
  causes: { _id: { $ne: ref.cause._id } },
  donations: { cause: { $ne: ref.cause._id } },
  disbursements: { cause: { $ne: ref.cause._id } },
  notifications: { causeSlug: { $ne: SLUG } },
  users: {}, comments: {}, supportingfiles: {},
};
async function digest(filters) {
  const rows = await Promise.all(Object.entries(filters).map(async ([name, query]) => [name, await db.collection(name).find(query).sort({ _id: 1 }).toArray()]));
  return EJSON.stringify(Object.fromEntries(rows));
}
async function seed() {
  await Promise.all(Object.keys(filters).map((n) => db.collection(n).deleteMany({})));
  const cause = clone(ref.cause);
  Object.assign(cause, { raised: 300000, escrowBalance: 0, upkeepTaken: 5000, donorCount: 2, status: "completed" });
  cause.budget.forEach((b) => b.spent = b.amount);
  // A newly uploaded document must survive the financial rewind.
  cause.evidence.push({ label: "Later supporting document", url: "/test-proof", kind: "document" });
  await db.collection("causes").insertMany([cause, { _id: other, slug: "untouched", raised: 12345, escrowBalance: 5000, status: "live" }]);
  await db.collection("users").insertMany([{ _id: ref.cause.organizer, handle: "ugo", completedCauses: 7, trustLevel: 8 }, { _id: ref.gift.donor, handle: "okefe" }, { _id: donor, handle: "abby" }]);
  await db.collection("donations").insertMany([clone(ref.gift), { _id: new ObjectId(), cause: ref.cause._id, donor, amount: 155000, upkeep: 2000, net: 153000 }, { _id: new ObjectId(), cause: other, amount: 12345 }]);
  await db.collection("disbursements").insertMany([{ _id: new ObjectId(), cause: ref.cause._id, amount: 300000 }, { _id: new ObjectId(), cause: other, amount: 7345 }]);
  await db.collection("notifications").insertMany([...clone(ref.notifications), { _id: new ObjectId(), causeSlug: SLUG, type: "money_moved", user: donor }, { _id: new ObjectId(), causeSlug: "untouched", user: donor, type: "money_moved" }]);
  await db.collection("comments").insertOne({ _id: new ObjectId(), cause: ref.cause._id, text: "Preserve this comment" });
  await db.collection("supportingfiles").insertOne({ _id: new ObjectId(), cause: ref.cause._id, url: "/test-proof" });
}

try {
  await seed();
  const allFilters = Object.fromEntries(Object.keys(filters).map((n) => [n, {}]));
  const before = await digest(allFilters), protectedBefore = await digest(filters);
  const preview = await resetUgo(client, db, { backupDir });
  assert.equal(preview.applied, false); assert.equal(await digest(allFilters), before);
  assert.equal((await fs.readdir(backupDir)).length, 0);
  console.log("PASS preview writes no documents or backups");
  const applied = await resetUgo(client, db, { apply: true, backupDir });
  assert.equal(applied.applied, true); assert.equal(await digest(filters), protectedBefore);
  const cause = await db.collection("causes").findOne({ _id: ref.cause._id });
  assert.equal(cause.raised, 147000); assert.equal(cause.escrowBalance, 147000);
  assert.equal(cause.upkeepTaken, 3000); assert.equal(cause.donorCount, 1); assert.equal(cause.status, "live");
  assert.equal(cause.goal - cause.raised, 153000); assert.ok(cause.budget.every((b) => b.spent === 0));
  assert.ok(cause.evidence.some((e) => e.url === "/test-proof"));
  assert.equal(EJSON.stringify(await db.collection("donations").findOne({ _id: ref.gift._id })), EJSON.stringify(ref.gift));
  console.log("PASS exact JCI financial state; original gift, accounts, other causes, evidence and comments preserved");
  const backup = EJSON.parse(await fs.readFile(applied.backup, "utf8"));
  assert.equal(backup.collections.causes.length, 1); assert.equal(backup.collections.donations.length, 2);
  assert.equal(backup.collections.disbursements.length, 1); assert.equal(backup.collections.notifications.length, 2);
  assert.deepEqual(Object.keys(backup.collections).sort(), ["causes", "disbursements", "donations", "notifications"]);
  assert.equal((await fs.stat(applied.backup)).mode & 0o777, 0o600);
  console.log("PASS private, cause-only recovery snapshot saved before mutation");
  await resetUgo(client, db, { apply: true, backupDir });
  assert.equal(await db.collection("donations").countDocuments({ cause: ref.cause._id }), 1);
  assert.equal(await db.collection("notifications").countDocuments({ causeSlug: SLUG }), ref.notifications.length);
  assert.equal(await digest(filters), protectedBefore);
  console.log("PASS repeat application does not duplicate donations/alerts or affect other causes");
  await seed();
  await db.collection("causes").updateOne({ _id: ref.cause._id }, { $set: { goal: 300001 } });
  const changedGoal = await digest(allFilters);
  await assert.rejects(resetUgo(client, db, { apply: true, backupDir }), /Goal has changed/);
  assert.equal(await digest(allFilters), changedGoal);
  console.log("PASS changed-goal guard refuses without mutation");
  await seed();
  // Force a late insert failure, after the transaction has staged deletions.
  await db.collection("notifications").updateOne({ _id: ref.notifications[0]._id }, { $set: { causeSlug: "untouched" } });
  const rollbackBefore = await digest(allFilters);
  await assert.rejects(resetUgo(client, db, { apply: true, backupDir }), /duplicate key/i);
  assert.equal(await digest(allFilters), rollbackBefore);
  console.log("PASS late transaction failure rolls all changes back, including donation/payout deletions");
  console.log("All six checks passed in an isolated kairos_qa_ database; live data unchanged.");
} finally {
  try {
    // This Atlas account can delete documents but cannot drop databases.
    await Promise.all(Object.keys(filters).map((n) => db.collection(n).deleteMany({})));
  } finally {
    await client.close();
    await fs.rm(backupDir, { recursive: true, force: true });
  }
}
