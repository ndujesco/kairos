import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { User } from "@/lib/models";
import { getSessionUser } from "@/lib/session";

/**
 * Marks the signed-in user identity-verified.
 *
 * Nobody is asked for an ID to join or to give. This is called at the moment an
 * organiser publishes a cause - the one point where a stranger is about to be
 * asked for money. In production the NIN goes to a licensed verification
 * partner and we store the result, never the number; here the check is
 * simulated and only the outcome is written.
 */
export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { method } = await req.json().catch(() => ({ method: "NIN" }));

  await dbConnect();
  await User.findByIdAndUpdate(user._id, {
    $set: { "verified.identity": true, "verified.method": method === "BVN" ? "BVN" : "NIN" },
  });

  return NextResponse.json({ ok: true });
}
