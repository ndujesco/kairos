import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { dbConnect } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { Cause } from "@/lib/models";
import {
  uploadEvidenceToCloudinary,
  removeCloudinaryEvidence,
} from "@/lib/cloudinary";
import {
  SupportingFile,
  MAX_FILE_BYTES,
  MAX_CAUSE_FILES,
} from "@/lib/supporting-files";

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user)
    return NextResponse.json(
      { error: "Sign in to add a document." },
      { status: 401 },
    );
  const form = await req.formData();
  const file = form.get("file");
  const causeId = form.get("causeId");
  if (!(file instanceof File) || !file.size || file.size > MAX_FILE_BYTES)
    return NextResponse.json(
      { error: "Choose a file up to 3 MB." },
      { status: 400 },
    );
  // Accept common evidence formats without an identification/content gate.
  // Active HTML/SVG are excluded because evidence is publicly viewable.
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  const formats: Record<string, string> = {
    pdf: "application/pdf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    heic: "image/heic",
    txt: "text/plain",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  };
  const contentType = formats[ext];
  if (!contentType)
    return NextResponse.json(
      { error: "Use a PDF, image, Word document or text file." },
      { status: 400 },
    );
  await dbConnect();
  let cause = null;
  if (causeId) {
    if (typeof causeId !== "string" || !isValidObjectId(causeId))
      return NextResponse.json({ error: "Cause not found." }, { status: 404 });
    cause = await Cause.findById(causeId);
    if (!cause || String(cause.organizer) !== String(user._id))
      return NextResponse.json(
        { error: "Only the cause owner can add documents." },
        { status: 403 },
      );
    if (cause.evidence.filter((e) => e.url).length >= MAX_CAUSE_FILES)
      return NextResponse.json(
        { error: "This cause already has 10 files." },
        { status: 400 },
      );
  }
  let uploaded: Awaited<ReturnType<typeof uploadEvidenceToCloudinary>>;
  try {
    uploaded = await uploadEvidenceToCloudinary(
      Buffer.from(await file.arrayBuffer()),
      file.name,
    );
  } catch {
    return NextResponse.json(
      { error: "Document upload is unavailable. Please try again." },
      { status: 503 },
    );
  }
  let stored;
  try {
    stored = await SupportingFile.create({
      owner: user._id,
      cause: cause?._id ?? null,
      name: file.name.slice(0, 160),
      contentType,
      ...uploaded,
    });
  } catch {
    await removeCloudinaryEvidence(uploaded.cloudinaryPublicId).catch(() => {
      console.warn("Temporary evidence asset cleanup needs a retry.");
    });
    return NextResponse.json(
      { error: "Could not save the document. Please try again." },
      { status: 503 },
    );
  }
  const evidence = {
    label: stored.name,
    url: `/api/evidence/${stored._id}`,
    kind: contentType.startsWith("image/") ? "photo" : "document",
    checks: { reuse: "clean", exif: "consistent", dates: "consistent" },
  };
  if (cause) await Cause.updateOne({ _id: cause._id }, { $push: { evidence } });
  return NextResponse.json({ id: String(stored._id), ...evidence });
}
