/** Hangs the surgical estimate off Chidinma's cause. Idempotent. */
import { MongoClient } from "mongodb";
import fs from "node:fs";
const uri = (process.env.MONGODB_URI ||
  fs.readFileSync(new URL("../.env.local", import.meta.url), "utf8").match(/MONGODB_URI=(.+)/)[1].trim());
const cl = await MongoClient.connect(uri);
const C = cl.db().collection("causes");
const c = await C.findOne({ slug: "help-chidinma-walk-again" });
const ev = (c.evidence ?? []).map((e) =>
  /hospital bill/i.test(e.label)
    ? { ...e, label: "LUTH estimate of treatment cost - EST-000000",
        url: "/demo/docs/luth-surgical-estimate.pdf", kind: "invoice" }
    : e
);
await C.updateOne({ _id: c._id }, { $set: { evidence: ev, updatedAt: new Date() } });
console.log("\n  help-chidinma-walk-again");
ev.forEach((e) => console.log(`   · ${e.label}${e.url ? `\n       ${e.url}` : ""}`));
await cl.close();
