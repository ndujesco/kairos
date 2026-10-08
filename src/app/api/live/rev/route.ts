import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/session";
import { revision } from "@/lib/revision";

export const dynamic = "force-dynamic";

/** The same fingerprint, for the slow backstop poll when the stream is down. */
export async function GET() {
  const user = await getSessionUser();
  return NextResponse.json({ rev: await revision(user ? String(user._id) : undefined) });
}
