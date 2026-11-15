// Run against the dedicated local QA server, never the live database.
import assert from "node:assert/strict";
import { MongoClient } from "mongodb";
import { readFile } from "node:fs/promises";
const dbName = process.env.KAIROS_QA_DB;
assert.match(
  dbName ?? "",
  /^kairos_qa_/,
  "Set KAIROS_QA_DB to the disposable database used by port 3010.",
);
const client = await MongoClient.connect(process.env.MONGODB_URI);
const db = client.db(dbName);
const base = "http://127.0.0.1:3010";
let checks = 0;
const check = (label) => {
  checks++;
  console.log("PASS " + label);
};
async function post(path, body, cookie = "") {
  return fetch(base + path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(cookie ? { cookie } : {}),
    },
    body: JSON.stringify(body),
  });
}
async function signup(handle) {
  const r = await post("/api/auth/signup", {
    name: handle,
    handle,
    password: "password",
  });
  assert.equal(r.status, 200);
  const cookie = r.headers.get("set-cookie").split(";")[0];
  assert.ok(
    await db.collection("users").findOne({ handle }),
    "QA server must write only to the expected QA database.",
  );
  return cookie;
}
async function upload(cookie, causeId) {
  const bytes = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  const form = new FormData();
  form.set(
    "file",
    new File([bytes], "supporting-proof.png", { type: "image/png" }),
  );
  if (causeId) form.set("causeId", causeId);
  const r = await fetch(base + "/api/evidence", {
    method: "POST",
    headers: cookie ? { cookie } : {},
    body: form,
  });
  return { res: r, file: r.ok ? await r.json() : null, bytes };
}
try {
  const suffix = Date.now().toString(36);
  const owner = await signup("qa_owner_" + suffix),
    donor = await signup("qa_donor_" + suffix);
  check("signup works without email");
  const login = await post("/api/auth/login", {
    handle: "qa_owner_" + suffix,
    password: "password",
  });
  assert.equal(login.status, 200);
  check("handle/password login needs no email");
  assert.equal(
    (
      await post("/api/auth/login", {
        handle: "qa_owner_" + suffix,
        password: "wrong",
      })
    ).status,
    401,
  );
  check("wrong passwords are rejected");
  const started = performance.now();
  assert.equal(
    (await post("/api/auth/verify", { method: "NIN" }, owner)).status,
    200,
  );
  assert.ok(performance.now() - started < 6000);
  check("identity check responds within six-second UI deadline");
  const doc = await upload(owner);
  assert.equal(doc.res.status, 200);
  assert.equal((await fetch(base + doc.file.url)).status, 404);
  check("draft attachments are private");
  const create = await post(
    "/api/causes",
    {
      requestId: "qa-" + suffix,
      title: "QA cause " + suffix,
      category: "Education",
      story: "I need tuition paid directly to Example School.",
      summary: "Help with tuition.",
      budget: [
        { label: "Tuition", amount: 10000, vendorName: "Example School" },
      ],
      evidence: [],
      attachments: [doc.file.id],
    },
    owner,
  );
  assert.equal(create.status, 200);
  const { slug } = await create.json();
  const cause = await db.collection("causes").findOne({ slug });
  assert.ok(cause);
  const publicFile = await fetch(base + doc.file.url);
  assert.equal(publicFile.status, 200);
  assert.deepEqual(new Uint8Array(await publicFile.arrayBuffer()), doc.bytes);
  assert.equal(publicFile.headers.get("x-content-type-options"), "nosniff");
  check("uploaded file persists and becomes public with published cause");
  const retry = await post("/api/causes", { requestId: "qa-"+suffix, title:"QA cause "+suffix, story:"Retry of the same draft", budget:[{label:"Tuition",amount:10000,vendorName:"Example School"}], attachments:[doc.file.id] }, owner);
  assert.equal(retry.status,200);
  assert.equal((await retry.json()).slug,slug);
  assert.equal(await db.collection("causes").countDocuments({ creationKey: { $regex: "qa-"+suffix+"$" } }),1);
  check("retrying publication reuses the cause instead of duplicating it");

  assert.equal((await upload(donor, String(cause._id))).res.status, 403);
  check("another account cannot add evidence to your cause");
  const extra = await upload(owner, String(cause._id));
  assert.equal(extra.res.status, 200);
  assert.equal(
    (await db.collection("causes").findOne({ _id: cause._id })).evidence.length,
    2,
  );
  check("owner can add supporting documents after publication");
  assert.equal((await upload("", String(cause._id))).res.status, 401);
  check("signed-out visitors cannot add documents");
  const page = await (await fetch(base + "/cause/" + slug)).text();
  assert.match(page, /Your donation will be anonymous/);
  check("shared cause states guest anonymity before checkout");
  const guest = await post(`/api/causes/${cause._id}/donate`, {
    amount: 1000,
    anonymous: false,
    donor: "spoofed",
  });
  assert.equal(guest.status, 200);
  const gift = await db.collection("donations").findOne({ cause: cause._id });
  assert.equal(gift.donor, null);
  assert.equal(gift.anonymous, true);
  check("server enforces guest anonymity even if client requests a named gift");
  assert.equal(
    (
      await post(
        `/api/causes/${cause._id}/donate`,
        { amount: 2000, anonymous: false },
        donor,
      )
    ).status,
    200,
  );
  assert.equal(
    (
      await post(
        `/api/causes/${cause._id}/donate`,
        { amount: 1000, anonymous: true },
        donor,
      )
    ).status,
    200,
  );
  const updated = await db.collection("causes").findOne({ _id: cause._id });
  assert.equal(updated.donorCount, 2);
  assert.equal(updated.raised, 3920);
  check(
    "named and anonymous account gifts preserve escrow fees and distinct donor count",
  );
  assert.equal(
    (await post(`/api/causes/${cause._id}/donate`, { amount: 1000 }, owner))
      .status,
    403,
  );
  check("owners cannot give to their own cause");
  const paid = await post(
    `/api/causes/${cause._id}/disburse`,
    { budgetLabel: "Tuition", amount: 980 },
    owner,
  );
  assert.equal(paid.status, 200);
  assert.equal(
    await db.collection("notifications").countDocuments({ user: null }),
    0,
  );
  check(
    "vendor payout handles guest gifts and notifies only real donor accounts",
  );
  assert.equal((await post("/api/ai/interview", { messages: [] })).status, 401);
  check("AI interview requires a signed-in creator");
  const startedAI = performance.now();
  const ai = await post(
    "/api/ai/interview",
    {
      messages: [
        { from: "ai", text: "What happened?" },
        {
          from: "me",
          text: "This is a demonstration. Use Ada Example, tuition due at Example School in Lagos next week, 10000 naira, payable directly to Example School for tuition. Use the attached supporting-proof.png as the document.",
        },
      ],
      attachments: ["supporting-proof.png"],
    },
    owner,
  );
  assert.equal(ai.status, 200);
  const turn = await ai.json();
  assert.ok(performance.now() - startedAI < 14000);
  console.log(
    "AI source:",
    turn.source,
    "elapsed seconds:",
    ((performance.now() - startedAI) / 1000).toFixed(2),
  );
  assert.doesNotMatch(turn.reply, /demonstration|simulated|prototype|demo\b/i);
  check("AI accepts demonstration inputs without exposing internal context");
  const messages = Array.from({ length: 5 }, (_, i) => [
    { from: "ai", text: "Tell me more?" },
    { from: "me", text: "I need tuition help. " + i },
  ]).flat();
  const limit = await post("/api/ai/interview", { messages }, owner);
  const final = await limit.json();
  assert.equal(final.done, true);
  assert.ok(final.extracted);
  check("server finalizes at five answers");
  const html = await (
    await fetch(base + "/?feed=latest", { headers: { cookie: owner } })
  ).text();
  assert.match(html, /aria-current="page"[^>]*>.*?Latest/s);
  assert.match(html, /What change will you make/);
  check("feed tabs and giving prompt render");
  console.log(
    `Verified ${checks} demo-flow checks using an isolated QA database.`,
  );
} finally {
  await client.close();
}
