// Run against the dedicated QA server and database, never against production.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { MongoClient, ObjectId } from "mongodb";
import { createHash } from "node:crypto";

const name = process.env.KAIROS_QA_DB;
assert.match(name ?? "", /^kairos_qa_/);
const client = await MongoClient.connect(process.env.MONGODB_URI);
const db = client.db(name);
const base = "http://localhost:3010";
const hash = (bytes) => createHash("sha256").update(bytes).digest("hex");
try {
  const owner = await db.collection("users").findOne({ handle: /^qa_owner_/ });
  assert.ok(owner, "Run the demo-flow verification first.");
  const login = await fetch(base + "/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ handle: owner.handle, password: "password" }),
  });
  assert.equal(login.status, 200);
  const cookie = login.headers.get("set-cookie").split(";")[0];

  const pdf = await readFile(
    new URL("../public/demo/docs/unilag-fee-invoice.pdf", import.meta.url),
  );
  const form = new FormData();
  form.set(
    "file",
    new File([pdf], "invoice-proof.pdf", { type: "application/pdf" }),
  );
  const upload = await fetch(base + "/api/evidence", {
    method: "POST",
    headers: { cookie },
    body: form,
  });
  assert.equal(upload.status, 200);
  const info = await upload.json();
  const stored = await db
    .collection("supportingfiles")
    .findOne({ _id: new ObjectId(info.id) });
  assert.equal(stored.storage, "cloudinary");
  assert.equal(Object.hasOwn(stored, "content"), false);
  assert.equal(stored.sha256, hash(pdf));
  assert.equal((await fetch(base + info.url)).status, 404);
  const fetched = await fetch(base + info.url, { headers: { cookie } });
  assert.equal(fetched.status, 200);
  assert.equal(fetched.headers.get("content-type"), "application/pdf");
  assert.ok(fetched.headers.get("content-disposition").startsWith("inline;"));
  assert.equal(hash(Buffer.from(await fetched.arrayBuffer())), hash(pdf));
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME.trim();
  const unsigned = `https://res.cloudinary.com/${cloudName}/raw/authenticated/${stored.cloudinaryPublicId}`;
  assert.equal((await fetch(unsigned)).ok, false);
  console.log(
    "PASS PDF upload/download preserves bytes and headers; direct unsigned access is blocked.",
  );

  const bytes = Buffer.from("Temporary legacy Kairos migration proof.\n");
  const id = new ObjectId();
  await db
    .collection("supportingfiles")
    .insertOne({
      _id: id,
      owner: owner._id,
      cause: null,
      name: "legacy-proof.txt",
      contentType: "text/plain",
      content: bytes,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  const url = base + "/api/evidence/" + id;
  assert.equal(
    hash(
      Buffer.from(
        await (await fetch(url, { headers: { cookie } })).arrayBuffer(),
      ),
    ),
    hash(bytes),
  );
  console.log("PASS existing MongoDB attachments still open before migration.");

  const uri = new URL(process.env.MONGODB_URI);
  uri.pathname = "/" + name;
  const migration = spawnSync(
    process.execPath,
    ["--env-file=.env.local", "scripts/migrate-evidence-to-cloudinary.mjs"],
    {
      cwd: new URL("..", import.meta.url),
      env: {
        ...process.env,
        MONGODB_URI: uri.toString(),
        CLOUDINARY_UPLOAD_FOLDER: "kairos/qa/cloudinary20261116",
      },
      encoding: "utf8",
      timeout: 30000,
    },
  );
  assert.equal(migration.status, 0, "Migration command failed.");
  const migrated = await db.collection("supportingfiles").findOne({ _id: id });
  assert.equal(migrated.storage, "cloudinary");
  assert.equal(Object.hasOwn(migrated, "content"), false);
  assert.equal(migrated.sha256, hash(bytes));
  assert.equal((await fetch(url)).status, 404);
  assert.equal(
    hash(
      Buffer.from(
        await (await fetch(url, { headers: { cookie } })).arrayBuffer(),
      ),
    ),
    hash(bytes),
  );
  assert.equal(
    await db
      .collection("supportingfiles")
      .countDocuments({ content: { $exists: true } }),
    0,
  );
  console.log(
    "PASS migration verifies the Cloudinary copy before removing MongoDB bytes; original links and privacy remain intact.",
  );
} finally {
  await client.close();
}
