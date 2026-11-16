import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { dbConnect } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { SupportingFile } from "@/lib/supporting-files";
import { downloadCloudinaryEvidence } from "@/lib/cloudinary";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  if (!isValidObjectId(id))
    return new NextResponse("Not found", { status: 404 });
  await dbConnect();
  const file = await SupportingFile.findById(id);
  if (!file) return new NextResponse("Not found", { status: 404 });
  if (!file.cause) {
    const user = await getSessionUser();
    if (!user || String(file.owner) !== String(user._id))
      return new NextResponse("Not found", { status: 404 });
  }
  const inline = /^(image\/(jpeg|png|webp|gif)|application\/pdf)$/.test(
    file.contentType,
  );
  const headers = {
    "Content-Type": file.contentType,
    "Content-Disposition": `${inline ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(file.name)}`,
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "sandbox",
    "Cache-Control": "private, no-store",
  };
  if (file.cloudinaryPublicId) {
    try {
      const response = await downloadCloudinaryEvidence(
        file.cloudinaryPublicId,
      );
      return new NextResponse(response.body, { headers });
    } catch {
      return new NextResponse(
        "Could not load this document. Please try again.",
        { status: 502 },
      );
    }
  }
  // Preserve existing links during the transition; the migration removes
  // MongoDB file contents only after verifying the Cloudinary copy.
  const legacy = await SupportingFile.findById(id).select("+content");
  if (!legacy?.content) return new NextResponse("Not found", { status: 404 });
  return new NextResponse(new Uint8Array(legacy.content), { headers });
}
