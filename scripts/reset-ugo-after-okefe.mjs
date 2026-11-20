/** Restore only the recorded JCI cause to immediately after Okefe's gift.
 * Preview: npm run demo:reset:ugo
 * Apply:   npm run demo:reset:ugo -- --apply
 * No accounts, other causes, comments or uploaded files are changed.
 */
import { MongoClient } from "mongodb";
import { EJSON } from "bson";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { randomUUID } from "node:crypto";
import assert from "node:assert/strict";

const ROOT = fileURLToPath(new URL("../", import.meta.url));
export const SLUG = "final-year-student-unilag-tuition-fees-aom2";

export async function baseline() {
  const snapshot = EJSON.parse(await fs.readFile(path.join(ROOT, "scripts/snapshots/default.json"), "utf8"));
  const cause = snapshot.collections.causes.find((c) => c.slug === SLUG);
  assert.ok(cause, "JCI cause is missing from the reference snapshot.");
  const gifts = snapshot.collections.donations.filter((d) => String(d.cause) === String(cause._id));
  assert.equal(gifts.length, 1, "Reference must contain just Okefe's gift.");
  const gift = gifts[0];
  assert.equal(gift.amount, 150000); assert.equal(gift.upkeep, 3000); assert.equal(gift.net, 147000);
  assert.equal(cause.goal, 300000);
  return { cause, gift, notifications: snapshot.collections.notifications.filter((n) => n.causeSlug === SLUG) };
}

async function readState(db, ref, session) {
  const opts = session ? { session } : {};
  const cause = await db.collection("causes").findOne({ _id: ref.cause._id, slug: SLUG }, opts);
  assert.ok(cause, `The original JCI cause /cause/${SLUG} was not found. Nothing changed.`);
  assert.equal(String(cause.organizer), String(ref.cause.organizer), "Cause owner differs from the JCI reference.");
  const okefe = await db.collection("users").findOne({ handle: "okefe" }, { ...opts, projection: { _id: 1 } });
  assert.equal(String(okefe?._id), String(ref.gift.donor), "Okefe's account differs from the JCI reference.");
  assert.equal(cause.goal, ref.cause.goal, "Goal has changed; refusing to overwrite it.");
  assert.deepEqual(cause.budget.map((b) => [b.label, b.amount]), ref.cause.budget.map((b) => [b.label, b.amount]), "Budget has changed; refusing to overwrite it.");
  const donations = await db.collection("donations").find({ cause: cause._id }, opts).toArray();
  const gift = donations.find((d) => String(d._id) === String(ref.gift._id));
  assert.ok(gift, "The original Okefe donation is missing; refusing to invent a replacement.");
  for (const field of ["donor", "amount", "upkeep", "net", "anonymous"])
    assert.equal(String(gift[field]), String(ref.gift[field]), `Original gift's ${field} has changed.`);
  return {
    cause,
    donations,
    disbursements: await db.collection("disbursements").find({ cause: cause._id }, opts).toArray(),
    notifications: await db.collection("notifications").find({ causeSlug: SLUG }, opts).toArray(),
  };
}

function plan(state, ref) {
  return {
    cause: SLUG,
    before: { raised: state.cause.raised, escrowBalance: state.cause.escrowBalance, upkeepTaken: state.cause.upkeepTaken, donorCount: state.cause.donorCount, status: state.cause.status },
    after: { raised: 147000, escrowBalance: 147000, upkeepTaken: 3000, donorCount: 1, status: "live", goal: 300000, stillNeeded: 153000, budgetSpent: 0 },
    donationsToRemove: state.donations.length - 1,
    payoutsToRemove: state.disbursements.length,
    notificationsBefore: state.notifications.length,
    notificationsAfter: ref.notifications.length,
  };
}

export async function resetUgo(client, db, { apply = false, backupDir = path.resolve(ROOT, "../.local-backups/ugo-after-okefe") } = {}) {
  const ref = await baseline();
  if (!apply) return { applied: false, ...plan(await readState(db, ref), ref) };
  const session = client.startSession();
  let result;
  try {
    await session.withTransaction(async () => {
      const before = await readState(db, ref, session);
      const changes = plan(before, ref);
      await fs.mkdir(backupDir, { recursive: true, mode: 0o700 });
      const backup = path.join(backupDir, `${new Date().toISOString().replaceAll(":", "-")}-${randomUUID()}.ejson`);
      // Target documents only. No connection string, account or credential data.
      await fs.writeFile(backup, EJSON.stringify({ takenAt: new Date(), db: db.databaseName, slug: SLUG, collections: { causes: [before.cause], donations: before.donations, disbursements: before.disbursements, notifications: before.notifications } }, null, 2), { mode: 0o600, flag: "wx" });
      const opts = { session };
      await db.collection("donations").deleteMany({ cause: ref.cause._id, _id: { $ne: ref.gift._id } }, opts);
      await db.collection("disbursements").deleteMany({ cause: ref.cause._id }, opts);
      await db.collection("notifications").deleteMany({ causeSlug: SLUG }, opts);
      if (ref.notifications.length) await db.collection("notifications").insertMany(ref.notifications, opts);
      const update = await db.collection("causes").updateOne({ _id: ref.cause._id, slug: SLUG }, { $set: {
        raised: 147000, escrowBalance: 147000, upkeepTaken: 3000, donorCount: 1, status: "live",
        budget: before.cause.budget.map((b) => ({ ...b, spent: 0 })), updatedAt: new Date(),
      } }, opts);
      assert.equal(update.matchedCount, 1);
      const after = await readState(db, ref, session);
      assert.equal(after.donations.length, 1);
      assert.equal(after.disbursements.length, 0);
      assert.equal(after.notifications.length, ref.notifications.length);
      for (const [field, value] of Object.entries({ raised: 147000, escrowBalance: 147000, upkeepTaken: 3000, donorCount: 1, status: "live" })) assert.equal(after.cause[field], value);
      assert.ok(after.cause.budget.every((b) => b.spent === 0));
      result = { applied: true, ...changes, backup };
    }, { readConcern: { level: "snapshot" }, writeConcern: { w: "majority" } });
    return result;
  } finally { await session.endSession(); }
}

async function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help")) {
    console.log("npm run demo:reset:ugo             Preview only\nnpm run demo:reset:ugo -- --apply   Restore only Ugo's JCI cause after Okefe's gift");
    return;
  }
  assert.ok(args.every((a) => a === "--apply"), "Only --apply or --help is supported.");
  assert.ok(process.env.MONGODB_URI, "MONGODB_URI is missing from .env.local.");
  const qaDb = process.env.KAIROS_QA_DB;
  if (qaDb) assert.match(qaDb, /^kairos_qa_/, "Test database overrides must start with kairos_qa_.");
  const client = await MongoClient.connect(process.env.MONGODB_URI);
  try {
    const result = await resetUgo(client, client.db(qaDb || undefined), { apply: args.includes("--apply") });
    console.log(result.applied ? "Restored only Ugo's JCI cause." : "PREVIEW ONLY — database unchanged.");
    console.log(JSON.stringify(result, null, 2));
  } finally { await client.close(); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((err) => { console.error(err.message.replaceAll(process.env.MONGODB_URI || "<unset>", "<connection>")); process.exitCode = 1; });
}
