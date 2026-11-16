// Node 22+ (native TypeScript support). Safe to resume; no cause URLs change.
import { MongoClient } from "mongodb";
import {
  uploadEvidenceToCloudinary,
  downloadCloudinaryEvidence,
  evidenceDigest,
  removeCloudinaryEvidence,
} from "../src/lib/cloudinary.ts";

const client = new MongoClient(process.env.MONGODB_URI, {
  serverSelectionTimeoutMS: 8000,
});
try {
  await client.connect();
  const files = client.db().collection("supportingfiles");
  let migrated = 0;
  for await (const file of files.find({
    content: { $exists: true },
    cloudinaryPublicId: { $exists: false },
  })) {
    const bytes = Buffer.from(file.content.buffer);
    const uploaded = await uploadEvidenceToCloudinary(bytes, file.name);
    try {
      const response = await downloadCloudinaryEvidence(
        uploaded.cloudinaryPublicId,
      );
      const copy = Buffer.from(await response.arrayBuffer());
      if (evidenceDigest(copy) !== uploaded.sha256)
        throw new Error("Migration copy verification failed.");
      const result = await files.updateOne(
        { _id: file._id, cloudinaryPublicId: { $exists: false } },
        {
          $set: uploaded,
          $unset: { content: "" },
        },
      );
      if (result.modifiedCount) migrated++;
      else await removeCloudinaryEvidence(uploaded.cloudinaryPublicId);
    } catch (error) {
      await removeCloudinaryEvidence(uploaded.cloudinaryPublicId).catch(
        () => {},
      );
      throw error;
    }
  }
  console.log(
    JSON.stringify({
      migrated,
      remainingMongoFileContents: await files.countDocuments({
        content: { $exists: true },
      }),
    }),
  );
} finally {
  await client.close();
}
