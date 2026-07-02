import { cookies } from "next/headers";
import { dbConnect } from "./db";
import { User } from "./models";

const COOKIE = "kairos_uid";

export async function getSessionUser() {
  const jar = await cookies();
  const uid = jar.get(COOKIE)?.value;
  if (!uid) return null;
  await dbConnect();
  try {
    const user = await User.findById(uid).lean();
    return user ?? null;
  } catch {
    return null;
  }
}

export const SESSION_COOKIE = COOKIE;
