import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Cause, Comment } from "@/lib/models";
import { getSessionUser } from "@/lib/session";

export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });

  const { id } = await ctx.params;
  const { text } = await req.json();
  if (!text?.trim()) return NextResponse.json({ error: "Empty comment" }, { status: 400 });

  await dbConnect();
  const cause = await Cause.findById(id);
  if (!cause) return NextResponse.json({ error: "Cause not found" }, { status: 404 });

  await Comment.create({ cause: cause._id, author: user._id, text: text.trim().slice(0, 500) });
  return NextResponse.json({ ok: true });
}
