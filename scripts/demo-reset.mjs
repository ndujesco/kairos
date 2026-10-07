/**
 * Restores the database to one exact snapshot: the moment the recorded video
 * ends. Ugo has published the cause, Okefe's ₦150,000 has landed, and nothing
 * else has happened yet.
 *
 *   npm run demo:reset        the state the LIVE demo starts from
 *   npm run demo:record       one step earlier: cause published, nobody has given
 *
 * After `demo:reset`:
 *   · Ugo's school-fees cause exists, published, with its Remita reference
 *   · Okefe has given ₦150,000  (₦3,000 upkeep, ₦147,000 in escrow)
 *   · Abby has NOT given.  Nothing has been paid out.  No budget line is spent.
 *   · EVERY notification in the database is gone, for every user
 *
 * User accounts are the only thing it leaves alone - they keep their handles,
 * passwords and emails. Everything else about the demo is rebuilt from zero.
 *
 * So the recorded video stops exactly where the live demo begins, and the live
 * sequence is always: Abby gives ₦75,000 → Ugo pays the fees → donors alerted.
 * Run this between every rehearsal.
 */
import { MongoClient, ObjectId } from "mongodb";
import fs from "node:fs";

const uri = (process.env.MONGODB_URI ||
  fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8")
    .match(/MONGODB_URI=(.+)/)[1].trim());

const SLUG = "ugo-final-year-fees-unilag";
const RRR = "280194771532";
const FEES = 220500;
const OKEFE_GIFT = 150000;          // upkeep ₦3,000 → ₦147,000 net
const ABBY_GIFT  = 75000;           // upkeep ₦1,500 → ₦73,500 net

/* Every account points at the same inbox, so whoever gives and whoever is
   alerted, the mail lands in the one inbox that is open on the projector.
   Override with DEMO_EMAIL. */
const INBOX = process.env.DEMO_EMAIL || "ugondu635@gmail.com";

/* Two points on the same timeline:
     --recording   the cause is published and nobody has given yet, so Okefe's
                   donation can be captured on camera
     default       Okefe's donation has landed - where that video ends and the
                   live demo picks up */
const FOR_RECORDING = process.argv.includes("--recording");

const client = await MongoClient.connect(uri);
const db = client.db();
const U = db.collection("users");
const C = db.collection("causes");
const D = db.collection("donations");
const P = db.collection("disbursements");
const N = db.collection("notifications");

const user = async (h) => U.findOne({ handle: h });
const ugo = await user("ugo");
const okefe = (await user("okefe")) || (await U.insertOne({
  name: "Okefe Joseph", handle: "okefe",
  // same hash shape as the seeded personas: password is "password"
  passwordHash: (await user("ugo")).passwordHash,
  email: INBOX, bio: "Software engineer. Gives to causes he can check.",
  avatarColor: "amber", emoji: "🧑🏾‍💻", role: "donor",
  verified: { identity: false, cac: false },
  trustLevel: 1, raiseLimit: 200000, completedCauses: 0,
  createdAt: new Date(), updatedAt: new Date(),
}).then(() => user("okefe")));
const abby = await user("abby");

await U.updateMany({}, { $set: { email: INBOX } });

/* ---- clear the other school-fee and demo causes, so the feed reads cleanly ---- */
for (const slug of ["keep-tobi-in-school-unilag", "help-emeka-surgery-igbobi"]) {
  const c = await C.findOne({ slug });
  if (!c) continue;
  await Promise.all([
    D.deleteMany({ cause: c._id }),
    P.deleteMany({ cause: c._id }),
    N.deleteMany({ causeSlug: slug }),
    C.deleteOne({ _id: c._id }),
  ]);
}

/* ---- wipe anything this cause has ever done ---- */
const old = await C.findOne({ slug: SLUG });
if (old) {
  await Promise.all([
    D.deleteMany({ cause: old._id }),
    P.deleteMany({ cause: old._id }),
    N.deleteMany({ causeSlug: SLUG }),
    C.deleteOne({ _id: old._id }),
  ]);
}

/* ---- the cause, as Ugo published it ---- */
const causeId = new ObjectId();
await C.insertOne({
  _id: causeId,
  title: "Help me clear my final year fees at UNILAG",
  slug: SLUG,
  summary:
    "I am in my final year of Systems Engineering at UNILAG and ₦220,500 short. The money is paid straight to the university on a Remita reference. It cannot reach me.",
  story:
    "I am Ugochukwu, 400 level Systems Engineering at the University of Lagos, two semesters from graduating.\n\nFees went up this session and the balance on my portal is ₦220,500. The portal closes on the 17th of October. If it is not paid I sit out a year and lose the place I have worked four years for.\n\nI am not asking anyone to trust me with money. I generated the Remita reference on the UNILAG portal and put it on this page. It belongs to one student, one fee and one university account. Anyone holding it can pay it, and it cannot be redirected to me or to anybody else. When it is settled, UNILAG issues the receipt, not Kairos.",
  category: "Education",
  coverEmoji: "🎓",
  coverColor: "sky",
  organizer: ugo._id,
  goal: FEES,
  raised: 0,
  escrowBalance: 0,
  upkeepTaken: 0,
  donorCount: 0,
  vouches: [abby._id, okefe._id],
  budget: [{
    label: "UNILAG final year fees — 2025/2026",
    amount: FEES,
    spent: 0,
    vendor: { name: "University of Lagos (Bursary)", verified: true, account: "Remita biller" },
    rrr: RRR,
    rrrStudent: "Ndujekwu Ugochukwu Peter",
    rrrMatric: "210403512",
  }],
  evidence: [
    { label: "UNILAG fee invoice — RRR 280194771532", url: "/demo/docs/unilag-fee-invoice.pdf",
      kind: "invoice", checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
    { label: "Student ID and matriculation record", kind: "document",
      checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
    { label: "Portal screenshot showing the outstanding balance", kind: "photo",
      checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
  ],
  updates: [],
  status: "live",
  aiVerified: true,
  createdAt: new Date(Date.now() - 2 * 864e5),
  updatedAt: new Date(Date.now() - 864e5),
});

/* ---- Okefe's gift, unless we are about to film him giving it ---- */
const upkeep = FOR_RECORDING ? 0 : Math.min(Math.round(OKEFE_GIFT * 0.02), 5000);
const net = FOR_RECORDING ? 0 : OKEFE_GIFT - upkeep;

if (!FOR_RECORDING) {
  await D.insertOne({
    _id: new ObjectId(), cause: causeId, donor: okefe._id,
    amount: OKEFE_GIFT, upkeep, net, anonymous: false,
    createdAt: new Date(Date.now() - 36e5), updatedAt: new Date(Date.now() - 36e5),
  });
  await C.updateOne({ _id: causeId },
    { $set: { raised: net, escrowBalance: net, upkeepTaken: upkeep, donorCount: 1 } });
}
/* ---- and no payout from any earlier rehearsal survives ---- */
await P.deleteMany({});

/* ---- every notification goes, for every user ----
   The snapshot is "nothing has happened yet", so the bell must be empty. A
   stale alert from a previous rehearsal is the one thing that would give the
   demo away. */
await N.deleteMany({});

console.log(`\n  Ready: ${FOR_RECORDING ? "RECORDING Okefe's donation" : "the LIVE demo"}\n`);
console.log(`  cause      /cause/${SLUG}`);
if (FOR_RECORDING) {
  console.log(`  in escrow  ₦0   (nobody has given yet)`);
  console.log(`  fees due   ₦${FEES.toLocaleString()}   ·  RRR ${RRR}`);
  console.log(`  record     Okefe gives ₦${OKEFE_GIFT.toLocaleString()}. Stop there - Ugo does NOT pay on camera.`);
  console.log(`  after      run \`npm run demo:reset\` to land on the live starting state\n`);
} else {
  console.log(`  in escrow  ₦${net.toLocaleString()}   (@okefe gave ₦${OKEFE_GIFT.toLocaleString()}, upkeep ₦${upkeep.toLocaleString()})`);
  console.log(`  fees due   ₦${FEES.toLocaleString()}   ·  RRR ${RRR}   ·  still short ₦${(FEES - net).toLocaleString()}`);
  console.log(`  email      ${INBOX}   (every account — all mail lands here)`);
  console.log(`  live       Abby gives ₦${ABBY_GIFT.toLocaleString()} → Ugo pays the fees → Abby is notified\n`);
}
await client.close();
