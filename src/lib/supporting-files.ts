import mongoose, { Schema } from "mongoose";

const schema = new Schema(
  {
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    cause: { type: Schema.Types.ObjectId, ref: "Cause", default: null },
    name: { type: String, required: true },
    contentType: { type: String, required: true },
    content: { type: Buffer, required: true },
  },
  { timestamps: true },
);

export const SupportingFile =
  mongoose.models.SupportingFile || mongoose.model("SupportingFile", schema);
export const MAX_FILE_BYTES = 3 * 1024 * 1024;
export const MAX_CAUSE_FILES = 10;
