import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { dbConnect } from "@/lib/db";
import { User } from "@/lib/models";
import { hashPassword } from "@/lib/auth";
import { SESSION_COOKIE } from "@/lib/session";

const COLORS = ["emerald", "sky", "rose", "amber", "violet"];
const EMOJI = ["🙂", "😊", "🌟", "🌱", "🕊️", "🤲"];

export async function POST(req: NextRequest) {
  const { name, handle, password, email } = await req.json();
  if (!name?.trim() || !handle?.trim())
    return NextResponse.json({ error: "Name and handle required" }, { status: 400 });
  if (!password || password.length < 6)
    return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 });

  await dbConnect();
  const clean = handle.trim().toLowerCase().replace(/^@/, "");
  const exists = await User.findOne({ handle: clean });
  if (exists) return NextResponse.json({ error: "Handle already taken" }, { status: 409 });

  const user = await User.create({
    name: name.trim(),
    handle: clean,
    email: typeof email === "string" && email.includes("@") ? email.trim().toLowerCase() : undefined,
    passwordHash: hashPassword(password),
    avatarColor: COLORS[Math.floor(Math.random() * COLORS.length)],
    emoji: EMOJI[Math.floor(Math.random() * EMOJI.length)],
    role: "donor",
    // new accounts are unverified: donors never need it, and an organiser is
    // checked at publish, not at the door
    verified: { identity: false },
    trustLevel: 1,
    raiseLimit: 500_000, // newcomers start small; grows with completed causes
  });

  const jar = await cookies();
  jar.set(SESSION_COOKIE, String(user._id), { httpOnly: true, path: "/" });
  return NextResponse.json({ ok: true });
}
