import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Cause } from "@/lib/models";
import { getSessionUser } from "@/lib/session";

const CATEGORY_COVER: Record<string, { emoji: string; color: string }> = {
  Medical: { emoji: "🏥", color: "rose" },
  "Prison Outreach": { emoji: "🕊️", color: "sky" },
  Education: { emoji: "📚", color: "violet" },
  "Food & Shelter": { emoji: "🍲", color: "amber" },
  Emergency: { emoji: "🚨", color: "rose" },
  Community: { emoji: "🤝", color: "emerald" },
};

function slugify(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 60) +
    "-" +
    Math.random().toString(36).slice(2, 6)
  );
}

export async function POST(req: NextRequest) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (!user.verified?.identity)
    return NextResponse.json({ error: "Identity verification required" }, { status: 403 });

  const { title, category, story, summary, budget, evidence } = await req.json();
  if (!title?.trim() || !story?.trim() || !Array.isArray(budget) || budget.length === 0)
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

  const goal = budget.reduce(
    (sum: number, b: { amount: number }) => sum + (Math.floor(Number(b.amount)) || 0),
    0
  );
  if (goal <= 0) return NextResponse.json({ error: "Budget must be greater than zero" }, { status: 400 });

  await dbConnect();

  // Newcomers start small: the trust system caps how much a user can raise.
  if (goal > user.raiseLimit)
    return NextResponse.json(
      {
        error: `Your current trust level caps raises at ₦${user.raiseLimit.toLocaleString()}. Complete smaller causes with proof to unlock more.`,
      },
      { status: 400 }
    );

  const cover = CATEGORY_COVER[category] ?? CATEGORY_COVER.Community;

  const cause = await Cause.create({
    title: title.trim(),
    slug: slugify(title),
    story: story.trim(),
    summary: (summary || story).trim().slice(0, 200),
    category: category || "Community",
    coverEmoji: cover.emoji,
    coverColor: cover.color,
    organizer: user._id,
    goal,
    budget: budget.map((b: { label: string; amount: number; vendorName: string }) => ({
      label: String(b.label).slice(0, 80),
      amount: Math.floor(Number(b.amount)),
      spent: 0,
      vendor: {
        name: String(b.vendorName || "Vendor TBD").slice(0, 80),
        verified: true, // mock CAC + bank-name match passed
        account: "•••• " + String(Math.floor(1000 + Math.random() * 9000)),
      },
    })),
    evidence: (evidence ?? []).map((label: string) => ({
      label: String(label).slice(0, 80),
      kind: /bill|invoice|estimate/i.test(label) ? "invoice" : /photo|picture/i.test(label) ? "photo" : "document",
      checks: { reuse: "clean", exif: "consistent", dates: "consistent" },
    })),
    aiVerified: true,
    status: "live",
  });

  return NextResponse.json({ ok: true, slug: cause.slug });
}
