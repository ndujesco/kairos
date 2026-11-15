import { NextRequest, NextResponse } from "next/server";
import { isValidObjectId } from "mongoose";
import { dbConnect } from "@/lib/db";
import { getSessionUser } from "@/lib/session";
import { SupportingFile } from "@/lib/supporting-files";

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
  return new NextResponse(new Uint8Array(file.content), {
    headers: {
      "Content-Type": file.contentType,
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename*=UTF-8''${encodeURIComponent(file.name)}`,
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "sandbox",
      "Cache-Control": "private, no-store",
    },
  });
}
