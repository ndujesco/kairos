import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/db";
import { User } from "@/lib/models";
import { verifyPassword } from "@/lib/auth";
import { SESSION_COOKIE } from "@/lib/session";

export async function POST(req: NextRequest) {
  const { handle, password } = await req.json();
  if (!handle?.trim() || !password)
    return NextResponse.json({ error: "Handle and password required" }, { status: 400 });

  await dbConnect();
  const user = await User.findOne({ handle: handle.trim().toLowerCase().replace(/^@/, "") });
  if (!user || !user.passwordHash || !verifyPassword(password, user.passwordHash))
    return NextResponse.json({ error: "Invalid handle or password" }, { status: 401 });

  const jar = await cookies();
  jar.set(SESSION_COOKIE, String(user._id), { httpOnly: true, path: "/" });
  return NextResponse.json({ ok: true });
}
