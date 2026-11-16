import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cause: { type: Schema.Types.ObjectId, ref: "Cause", default: null },
    name: { type: String, required: true },
    contentType: { type: String, required: true },
    storage: { type: String, enum: ["cloudinary", "mongodb"] },
    cloudinaryPublicId: { type: String },
    cloudinaryAssetId: { type: String },
    size: { type: Number },
    sha256: { type: String },
    // Retained only for reading/migrating pre-Cloudinary records.
    content: { type: Buffer, select: false },
  },
  { timestamps: true },
);

export const SupportingFile =
  mongoose.models.SupportingFile || mongoose.model("SupportingFile", schema);
export const MAX_FILE_BYTES = 3 * 1024 * 1024;
export const MAX_CAUSE_FILES = 10;
