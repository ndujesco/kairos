/**
 * Kairos demo seed - loads a believable world:
 *  - 6 personas (donors, organizers, an NGO)
 *  - a live medical cause with a real disbursement + donor attribution alerts
 *  - a prison outreach ready for the LIVE demo disbursement
 *  - an NGO shelter cause
 *  - a completed cause proving the trust loop
 *
 * Run: npm run seed
 */
import mongoose from "mongoose";
import { randomBytes, scryptSync } from "crypto";

const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kairos";

const daysAgo = (d, h = 0) => new Date(Date.now() - d * 864e5 - h * 36e5);

// all seeded personas share the demo password "password", but each gets its
// own salt so the stored hashes are unique per user
function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(password, salt, 64).toString("hex")}`;
}
const demoHash = () => hashPassword("password");

async function main() {
  await mongoose.connect(URI);
  const db = mongoose.connection.db;

  console.log("→ clearing old data…");
  for (const c of ["causes", "donations", "disbursements", "notifications", "comments"]) {
    await db.collection(c).deleteMany({});
  }
  // only replace the seeded personas - accounts people created via signup survive reseeds
  const PERSONA_HANDLES = ["ugo", "abby", "amina_gives", "chiamaka", "david_outreach", "hopehaven"];
  await db.collection("users").deleteMany({ handle: { $in: PERSONA_HANDLES } });

  const oid = () => new mongoose.Types.ObjectId();

  /* ------------------------------- users ------------------------------- */
  const ugo = {
    _id: oid(), name: "Ugo Ndujekwu", handle: "ugo", emoji: "👨🏾‍💻", avatarColor: "sky",
    passwordHash: demoHash(), role: "donor", bio: "Give, watch it land. Building Kairos.",
    verified: { identity: true, method: "BVN", cac: false },
    trustLevel: 2, raiseLimit: 500000, completedCauses: 0,
    createdAt: daysAgo(90), updatedAt: daysAgo(90),
  };
  const abby = {
    _id: oid(), name: "Abby Sokenu", handle: "abby", emoji: "👩🏾‍💼", avatarColor: "violet",
    passwordHash: demoHash(), role: "donor", bio: "Product @ Kairos. Generosity needs infrastructure.",
    verified: { identity: true, method: "NIN", cac: false },
    trustLevel: 2, raiseLimit: 500000, completedCauses: 0,
    createdAt: daysAgo(90), updatedAt: daysAgo(90),
  };
  const amina = {
    _id: oid(), name: "Amina Yusuf", handle: "amina_gives", emoji: "🧕🏾", avatarColor: "amber",
    passwordHash: demoHash(), role: "donor", bio: "I give small small, but I give often.",
    verified: { identity: true, method: "BVN", cac: false },
    trustLevel: 1, raiseLimit: 200000, completedCauses: 0,
    createdAt: daysAgo(60), updatedAt: daysAgo(60),
  };
  const chiamaka = {
    _id: oid(), name: "Chiamaka Obi", handle: "chiamaka", emoji: "👩🏾", avatarColor: "rose",
    passwordHash: demoHash(), role: "organizer", bio: "Raising for my sister’s surgery. Every receipt public.",
    verified: { identity: true, method: "NIN", cac: false },
    trustLevel: 2, raiseLimit: 1500000, completedCauses: 0,
    createdAt: daysAgo(30), updatedAt: daysAgo(30),
  };
  const david = {
    _id: oid(), name: "David Adeleke", handle: "david_outreach", emoji: "🧑🏿‍🦱", avatarColor: "emerald",
    passwordHash: demoHash(), role: "organizer", bio: "Saw Kirikiri once. Couldn’t unsee it. Now we go monthly.",
    verified: { identity: true, method: "BVN", cac: false },
    trustLevel: 3, raiseLimit: 1000000, completedCauses: 1,
    createdAt: daysAgo(75), updatedAt: daysAgo(75),
  };
  const ngo = {
    _id: oid(), name: "Hope Haven Foundation", handle: "hopehaven", emoji: "🏠", avatarColor: "slate",
    passwordHash: demoHash(), role: "ngo", bio: "Shelter and a second chance for women escaping abuse. RC 1482290.",
    verified: { identity: true, method: "BVN", cac: true },
    trustLevel: 4, raiseLimit: 10000000, completedCauses: 6,
    createdAt: daysAgo(200), updatedAt: daysAgo(200),
  };
  await db.collection("users").insertMany([ugo, abby, amina, chiamaka, david, ngo]);
  console.log("✓ users");

  /* ---------------------- cause 1: medical (live) ----------------------- */
  const medical = {
    _id: oid(),
    title: "Help Chidinma walk again - surgery at LUTH",
    slug: "help-chidinma-walk-again",
    summary:
      "My sister Chidinma, 24, shattered her leg in an okada accident on Ikorodu Road. LUTH can fix it - we can’t fix the bill alone. Every naira goes to the hospital directly, never to me.",
    story:
      "On June 14th my younger sister Chidinma was riding an okada along Ikorodu Road when a truck swerved into their lane. She survived - thank God - but her left leg was shattered in three places.\n\nThe orthopaedic team at LUTH says she needs corrective surgery with implants, followed by eight weeks of medication. The total estimate is ₦970,000. Our family has raised what we can; we need help with the rest.\n\nI chose Kairos because I know how hard it is to trust a stranger’s story. You are not sending money to me - the hospital gets paid directly, and you’ll see the invoice the moment it happens.",
    category: "Medical",
    coverEmoji: "🏥",
    coverColor: "rose",
    organizer: chiamaka._id,
    goal: 970000,
    raised: 614000,
    escrowBalance: 214000,
    donorCount: 4,
    vouches: [ugo._id, amina._id, david._id],
    budget: [
      {
        label: "Corrective surgery + implants", amount: 850000, spent: 400000,
        vendor: { name: "LUTH - Lagos University Teaching Hospital", verified: true, account: "•••• 4127" },
      },
      {
        label: "Post-op medication (8 weeks)", amount: 120000, spent: 0,
        vendor: { name: "HealthPlus Pharmacy, Yaba", verified: true, account: "•••• 8843" },
      },
    ],
    evidence: [
      { label: "Hospital bill - LUTH orthopaedics", kind: "invoice", checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
      { label: "Doctor’s estimate & treatment plan", kind: "document", checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
      { label: "Photos from the ward", kind: "photo", checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
    ],
    updates: [
      {
        text: "Deposit paid! LUTH has scheduled Chidinma’s surgery for next Tuesday. Thank you - she cried when I showed her the donor list. Receipts are on the cause page.",
        photos: ["🩺", "💊", "🙏🏾"],
        at: daysAgo(2),
      },
    ],
    status: "live",
    aiVerified: true,
    createdAt: daysAgo(12),
    updatedAt: daysAgo(2),
  };

  /* ----------------- cause 2: prison outreach (for live demo) ----------------- */
  const outreach = {
    _id: oid(),
    title: "Kirikiri Outreach - a hot meal for 200 inmates",
    slug: "kirikiri-outreach-200-inmates",
    summary:
      "Last month I visited Kirikiri and couldn’t sleep after. On July 19th we go back with hot food, toiletries and toothpaste for 200 inmates. Itemized below - vendors get paid, not me.",
    story:
      "I’m not an NGO. I’m just a guy who followed a friend to Kirikiri Medium Security Prison one Saturday and left changed.\n\nMany inmates there are awaiting trial for years. The food is thin, toiletries are a luxury, and a hot meal from outside is an event.\n\nOn Saturday July 19th, with five volunteers, we’re bringing hot jollof and chicken for 200 inmates, plus toiletry packs (soap, toothpaste, sanitary items). The caterer and suppliers are named below - Kairos pays them directly. After the visit, you get the photos, time-stamped and location-checked.\n\nI did this once before on Kairos (see my profile - completed, every naira receipted). Let’s do it again, bigger.",
    category: "Prison Outreach",
    coverEmoji: "🕊️",
    coverColor: "sky",
    organizer: david._id,
    goal: 500000,
    raised: 155000,
    escrowBalance: 155000,
    donorCount: 3,
    vouches: [ugo._id, abby._id, amina._id, chiamaka._id],
    budget: [
      {
        label: "Hot meals ×200 (jollof + chicken)", amount: 300000, spent: 0,
        vendor: { name: "Iya Basira Catering Services", verified: true, account: "•••• 5561" },
      },
      {
        label: "Toiletry packs ×200", amount: 120000, spent: 0,
        vendor: { name: "Wellmart Supplies, Apapa", verified: true, account: "•••• 2209" },
      },
      {
        label: "Transport & logistics", amount: 80000, spent: 0,
        vendor: { name: "GIG Logistics", verified: true, account: "•••• 7734" },
      },
    ],
    evidence: [
      { label: "Outreach plan & prison approval letter", kind: "document", checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
      { label: "Caterer’s quotation", kind: "invoice", checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
      { label: "Photos from last outreach", kind: "photo", checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
    ],
    updates: [],
    status: "live",
    aiVerified: true,
    createdAt: daysAgo(5),
    updatedAt: daysAgo(5),
  };

  /* ------------------------- cause 3: NGO shelter ------------------------ */
  const shelter = {
    _id: oid(),
    title: "Keep 40 women safe - Hope Haven shelter, Q3",
    slug: "hope-haven-shelter-q3",
    summary:
      "Our shelter houses 40 women escaping domestic abuse. Q3 costs: rent, food, counseling - fully itemized. As an NGO we publish every receipt; Kairos makes that automatic.",
    story:
      "Hope Haven has run a shelter in Surulere since 2019. Right now, 40 women and 12 children call it home while they rebuild their lives.\n\nEvery quarter we raise our operating budget openly. This quarter: rent for the shelter building, food supplies, and professional counseling sessions.\n\nWe moved to Kairos because donors kept asking the same fair question: “where does my money actually go?” Now the answer is automatic - the landlord, the food supplier and the counselors are paid directly through escrow, and every donor sees their share of every payment.",
    category: "Food & Shelter",
    coverEmoji: "🏠",
    coverColor: "amber",
    organizer: ngo._id,
    goal: 2100000,
    raised: 1340000,
    escrowBalance: 740000,
    donorCount: 3,
    vouches: [ugo._id, abby._id],
    budget: [
      {
        label: "Shelter rent (Q3)", amount: 1200000, spent: 600000,
        vendor: { name: "Adewale Properties Ltd", verified: true, account: "•••• 9012" },
      },
      {
        label: "Food supplies (3 months)", amount: 600000, spent: 0,
        vendor: { name: "FoodCo Wholesale, Mushin", verified: true, account: "•••• 3345" },
      },
      {
        label: "Counseling sessions ×24", amount: 300000, spent: 0,
        vendor: { name: "Mindful Wellness Consulting", verified: true, account: "•••• 6678" },
      },
    ],
    evidence: [
      { label: "CAC registration RC 1482290", kind: "document", checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
      { label: "Tenancy agreement", kind: "document", checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
      { label: "Q2 impact report with receipts", kind: "document", checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
    ],
    updates: [
      {
        text: "Half of Q3 rent is paid - receipt below. Two new residents arrived this week; your food-supply donations go out to FoodCo on the 15th.",
        photos: ["🏠", "🧺"],
        at: daysAgo(4),
      },
    ],
    status: "live",
    aiVerified: true,
    createdAt: daysAgo(20),
    updatedAt: daysAgo(4),
  };

  /* -------------------- cause 4: completed (trust loop) ------------------- */
  const completed = {
    _id: oid(),
    title: "Ikoyi Custodial Centre - first outreach (COMPLETED)",
    slug: "ikoyi-outreach-completed",
    summary:
      "My first outreach on Kairos: hot meals for 120 inmates at Ikoyi Custodial Centre. Fully executed - every receipt and photo is below. This is why you can trust the next one.",
    story:
      "This was my first cause on Kairos. 120 hot meals delivered to Ikoyi Custodial Centre on May 24th.\n\nEverything was paid through escrow: the caterer got ₦180,000 directly, transport ₦40,000. The photos below were verified against the date and location we promised.\n\nBecause this completed cleanly, my trust level went up - which is how I’m allowed to raise ₦500,000 for the bigger Kirikiri outreach now. That’s the Kairos loop: deliver, prove it, unlock more.",
    category: "Prison Outreach",
    coverEmoji: "✅",
    coverColor: "emerald",
    organizer: david._id,
    goal: 220000,
    raised: 220000,
    escrowBalance: 0,
    donorCount: 3,
    vouches: [ugo._id, abby._id, amina._id, chiamaka._id, ngo._id],
    budget: [
      {
        label: "Hot meals ×120", amount: 180000, spent: 180000,
        vendor: { name: "Iya Basira Catering Services", verified: true, account: "•••• 5561" },
      },
      {
        label: "Transport", amount: 40000, spent: 40000,
        vendor: { name: "GIG Logistics", verified: true, account: "•••• 7734" },
      },
    ],
    evidence: [
      { label: "Outreach plan & approval", kind: "document", checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
      { label: "Caterer’s invoice", kind: "invoice", checks: { reuse: "clean", exif: "consistent", dates: "consistent" } },
    ],
    updates: [
      {
        text: "DONE. 120 meals served at Ikoyi Custodial Centre. Photos verified: taken 24 May, 12:41pm, on location. Thank you to all 3 donors - you saw exactly where every naira went.",
        photos: ["🍛", "🕊️", "📸"],
        at: daysAgo(38),
      },
    ],
    status: "completed",
    aiVerified: true,
    createdAt: daysAgo(50),
    updatedAt: daysAgo(38),
  };

  await db.collection("causes").insertMany([medical, outreach, shelter, completed]);
  console.log("✓ causes");

  /* ------------------------------ donations ------------------------------ */
  const donations = [
    // medical - raised 614,000 (ugo 7k, abby 50k, amina 7k, ngo-person? use david 550k? no - david is organizer elsewhere, fine as donor here)
    { _id: oid(), cause: medical._id, donor: ugo._id, amount: 7000, anonymous: false, createdAt: daysAgo(10), updatedAt: daysAgo(10) },
    { _id: oid(), cause: medical._id, donor: abby._id, amount: 50000, anonymous: false, createdAt: daysAgo(9), updatedAt: daysAgo(9) },
    { _id: oid(), cause: medical._id, donor: amina._id, amount: 7000, anonymous: false, createdAt: daysAgo(8), updatedAt: daysAgo(8) },
    { _id: oid(), cause: medical._id, donor: david._id, amount: 550000, anonymous: false, createdAt: daysAgo(7), updatedAt: daysAgo(7) },
    // outreach - raised 155,000
    { _id: oid(), cause: outreach._id, donor: ugo._id, amount: 25000, anonymous: false, createdAt: daysAgo(4), updatedAt: daysAgo(4) },
    { _id: oid(), cause: outreach._id, donor: abby._id, amount: 100000, anonymous: false, createdAt: daysAgo(3), updatedAt: daysAgo(3) },
    { _id: oid(), cause: outreach._id, donor: amina._id, amount: 30000, anonymous: false, createdAt: daysAgo(2), updatedAt: daysAgo(2) },
    // shelter - raised 1,340,000
    { _id: oid(), cause: shelter._id, donor: ugo._id, amount: 40000, anonymous: false, createdAt: daysAgo(15), updatedAt: daysAgo(15) },
    { _id: oid(), cause: shelter._id, donor: abby._id, amount: 300000, anonymous: false, createdAt: daysAgo(14), updatedAt: daysAgo(14) },
    { _id: oid(), cause: shelter._id, donor: chiamaka._id, amount: 1000000, anonymous: false, createdAt: daysAgo(13), updatedAt: daysAgo(13) },
    // completed - raised 220,000
    { _id: oid(), cause: completed._id, donor: ugo._id, amount: 20000, anonymous: false, createdAt: daysAgo(48), updatedAt: daysAgo(48) },
    { _id: oid(), cause: completed._id, donor: abby._id, amount: 100000, anonymous: false, createdAt: daysAgo(47), updatedAt: daysAgo(47) },
    { _id: oid(), cause: completed._id, donor: amina._id, amount: 100000, anonymous: false, createdAt: daysAgo(46), updatedAt: daysAgo(46) },
  ];
  await db.collection("donations").insertMany(donations);
  console.log("✓ donations");

  /* ---------------------------- disbursements ---------------------------- */
  const disbursements = [
    {
      _id: oid(), cause: medical._id, budgetLabel: "Corrective surgery + implants",
      vendorName: "LUTH - Lagos University Teaching Hospital", vendorAccount: "•••• 4127",
      amount: 400000, invoiceNo: "#0042", note: "Surgery deposit - theatre booked for Tuesday",
      createdAt: daysAgo(2, 3), updatedAt: daysAgo(2, 3),
    },
    {
      _id: oid(), cause: shelter._id, budgetLabel: "Shelter rent (Q3)",
      vendorName: "Adewale Properties Ltd", vendorAccount: "•••• 9012",
      amount: 600000, invoiceNo: "#1187", note: "50% of Q3 rent per tenancy agreement",
      createdAt: daysAgo(4, 5), updatedAt: daysAgo(4, 5),
    },
    {
      _id: oid(), cause: completed._id, budgetLabel: "Hot meals ×120",
      vendorName: "Iya Basira Catering Services", vendorAccount: "•••• 5561",
      amount: 180000, invoiceNo: "#0891", note: "120 meal packs, delivered to Ikoyi gate",
      createdAt: daysAgo(39), updatedAt: daysAgo(39),
    },
    {
      _id: oid(), cause: completed._id, budgetLabel: "Transport",
      vendorName: "GIG Logistics", vendorAccount: "•••• 7734",
      amount: 40000, invoiceNo: "#0892", note: "Bus hire, Ikoyi run",
      createdAt: daysAgo(39), updatedAt: daysAgo(39),
    },
  ];
  await db.collection("disbursements").insertMany(disbursements);
  console.log("✓ disbursements");

  /* ---------------------------- notifications ---------------------------- */
  // LUTH payment attribution: 400,000 of 614,000 raised → 65% (round to real math)
  const pct = 400000 / 614000;
  const medDonors = [
    [ugo, 7000],
    [abby, 50000],
    [amina, 7000],
    [david, 550000],
  ];
  const notifications = medDonors.map(([u, amt]) => ({
    _id: oid(),
    user: u._id,
    type: "money_moved",
    title: "Your donation just moved 💸",
    body: `₦${Math.round(amt * pct).toLocaleString()} of your ₦${amt.toLocaleString()} was paid to LUTH - Lagos University Teaching Hospital for “Corrective surgery + implants” (Invoice #0042).`,
    causeSlug: medical.slug,
    detail: {
      yourShare: Math.round(amt * pct),
      yourDonation: amt,
      totalPaid: 400000,
      vendor: "LUTH - Lagos University Teaching Hospital",
      invoiceNo: "#0042",
      pct: Math.round(pct * 100),
    },
    read: false,
    createdAt: daysAgo(2, 3),
    updatedAt: daysAgo(2, 3),
  }));

  notifications.push(
    {
      _id: oid(), user: david._id, type: "milestone",
      title: "Cause completed 🎉",
      body: "“Ikoyi Custodial Centre - first outreach” is fully executed with receipts. Your trust level went up - you can now raise bigger causes.",
      causeSlug: completed.slug, detail: {}, read: true,
      createdAt: daysAgo(38), updatedAt: daysAgo(38),
    },
    {
      _id: oid(), user: chiamaka._id, type: "donation_received",
      title: "New donation in escrow",
      body: "@david_outreach put ₦550,000 into escrow for “Help Chidinma walk again - surgery at LUTH”.",
      causeSlug: medical.slug, detail: {}, read: true,
      createdAt: daysAgo(7), updatedAt: daysAgo(7),
    }
  );
  await db.collection("notifications").insertMany(notifications);
  console.log("✓ notifications");

  /* ------------------------------- comments ------------------------------ */
  await db.collection("comments").insertMany([
    {
      _id: oid(), cause: medical._id, author: amina._id,
      text: "Praying for Chidinma’s full recovery. Gave my widow’s mite - and I actually saw it reach LUTH. God bless this platform. 🙏🏾",
      createdAt: daysAgo(2), updatedAt: daysAgo(2),
    },
    {
      _id: oid(), cause: medical._id, author: ugo._id,
      text: "Got the alert when the surgery deposit was paid - ₦4,558 of my ₦7,000 went straight to the hospital. This is how giving should work.",
      createdAt: daysAgo(1), updatedAt: daysAgo(1),
    },
    {
      _id: oid(), cause: outreach._id, author: abby._id,
      text: "Vouched AND donated. David’s Ikoyi outreach receipts convinced me - check his profile, everything is there.",
      createdAt: daysAgo(3), updatedAt: daysAgo(3),
    },
    {
      _id: oid(), cause: shelter._id, author: chiamaka._id,
      text: "An NGO that shows the rent receipt. Never seen that before. Following every update.",
      createdAt: daysAgo(4), updatedAt: daysAgo(4),
    },
  ]);
  console.log("✓ comments");

  console.log("\nSeed complete 🎉  Personas: @ugo @abby @amina_gives @chiamaka @david_outreach @hopehaven");
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
