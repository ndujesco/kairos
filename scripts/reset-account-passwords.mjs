// Reset existing demo accounts without changing profiles, causes or payments.
import { MongoClient } from "mongodb";
import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const client = new MongoClient(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/kairos",
);
function matches(stored) {
  try {
    const [salt, hash] = stored.split(":");
    const expected = Buffer.from(hash, "hex");
    return (
      expected.length === 64 &&
      timingSafeEqual(scryptSync("password", salt, 64), expected)
    );
  } catch {
    return false;
  }
}
try {
  await client.connect();
  const users = client.db().collection("users");
  let changed = 0;
  for (const user of await users
    .find({}, { projection: { passwordHash: 1 } })
    .toArray()) {
    if (matches(user.passwordHash)) continue;
    const salt = randomBytes(16).toString("hex");
    const passwordHash = `${salt}:${scryptSync("password", salt, 64).toString("hex")}`;
    await users.updateOne({ _id: user._id }, { $set: { passwordHash } });
    changed++;
  }
  const all = await users
    .find({}, { projection: { passwordHash: 1 } })
    .toArray();
  if (!all.every((user) => matches(user.passwordHash)))
    throw new Error("Password verification failed");
  console.log(
    `Updated ${changed} accounts. Verified all ${all.length} accounts use the demo password.`,
  );
} finally {
  await client.close();
}
