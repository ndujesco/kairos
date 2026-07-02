import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Cause } from "@/lib/models";
import { getSessionUser } from "@/lib/session";

export async function POST(_req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { id } = await ctx.params;
  await dbConnect();
  const cause = await Cause.findById(id);
  if (!cause) return NextResponse.json({ error: "Cause not found" }, { status: 404 });

  const uid = String(user._id);
  const has = cause.vouches.some((v) => String(v) === uid);
  if (has) {
    cause.vouches = cause.vouches.filter((v) => String(v) !== uid);
  } else {
    cause.vouches.push(user._id);
  }
  await cause.save();
  return NextResponse.json({ ok: true, vouches: cause.vouches.length });
}
