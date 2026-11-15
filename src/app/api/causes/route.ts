import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/db";
import { Cause, type IEvidence } from "@/lib/models";
import { SupportingFile } from "@/lib/supporting-files";
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
  if (!user)
    return NextResponse.json({ error: "Not signed in" }, { status: 401 });
  if (!user.verified?.identity)
    return NextResponse.json(
      { error: "Identity verification required" },
      { status: 403 },
    );

  const {
    title,
    category,
    story,
    summary,
    budget,
    evidence,
    attachments,
    requestId,
  } = await req.json();
  if (
    !title?.trim() ||
    !story?.trim() ||
    !Array.isArray(budget) ||
    budget.length === 0
  )
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );

  const goal = budget.reduce(
    (sum: number, b: { amount: number }) =>
      sum + (Math.floor(Number(b.amount)) || 0),
    0,
  );
  if (goal <= 0)
    return NextResponse.json(
      { error: "Budget must be greater than zero" },
      { status: 400 },
    );

  await dbConnect();

  // Newcomers start small: the trust system caps how much a user can raise.
  if (goal > user.raiseLimit)
    return NextResponse.json(
      {
        error: `Your current trust level caps raises at ₦${user.raiseLimit.toLocaleString()}. Complete smaller causes with proof to unlock more.`,
      },
      { status: 400 },
    );

  const creationKey =
    typeof requestId === "string" && /^[a-z0-9-]{1,80}$/i.test(requestId)
      ? `${user._id}:${requestId}`
      : undefined;
  if (creationKey) {
    const previous = await Cause.findOne({ creationKey });
    if (previous) return NextResponse.json({ ok: true, slug: previous.slug });
  }
  const fileIds = Array.isArray(attachments)
    ? attachments
        .filter(
          (id: unknown) => typeof id === "string" && /^[a-f0-9]{24}$/i.test(id),
        )
        .slice(0, 10)
    : [];
  const files = await SupportingFile.find(
    { _id: { $in: fileIds }, owner: user._id, cause: null },
    { content: 0 },
  );
  if (files.length !== fileIds.length)
    return NextResponse.json(
      { error: "A document is unavailable. Please attach it again." },
      { status: 400 },
    );
  const cover = CATEGORY_COVER[category] ?? CATEGORY_COVER.Community;

  const cause = await Cause.create({
    creationKey,
    title: title.trim(),
    slug: slugify(title),
    story: story.trim(),
    summary: (summary || story).trim().slice(0, 200),
    category: category || "Community",
    coverEmoji: cover.emoji,
    coverColor: cover.color,
    organizer: user._id,
    goal,
    budget: budget.map(
      (b: { label: string; amount: number; vendorName: string }) => ({
        label: String(b.label).slice(0, 80),
        amount: Math.floor(Number(b.amount)),
        spent: 0,
        vendor: {
          name: String(b.vendorName || "Vendor TBD").slice(0, 80),
          verified: true, // mock CAC + bank-name match passed
          account: "•••• " + String(Math.floor(1000 + Math.random() * 9000)),
        },
      }),
    ),
    evidence: [
      ...(Array.isArray(evidence) ? evidence : [])
        .filter(
          (label: unknown) =>
            typeof label === "string" && !files.some((f) => f.name === label),
        )
        .map(
          (label: string): IEvidence => ({
            label: String(label).slice(0, 80),
            kind: /bill|invoice|estimate/i.test(label)
              ? "invoice"
              : /photo|picture/i.test(label)
                ? "photo"
                : "document",
            checks: { reuse: "clean", exif: "consistent", dates: "consistent" },
          }),
        ),
      ...files.map(
        (file): IEvidence => ({
          label: file.name,
          url: `/api/evidence/${file._id}`,
          kind: file.contentType.startsWith("image/") ? "photo" : "document",
          checks: { reuse: "clean", exif: "consistent", dates: "consistent" },
        }),
      ),
    ],
    aiVerified: true,
    status: "live",
  });

  await SupportingFile.updateMany(
    { _id: { $in: files.map((f) => f._id) }, owner: user._id },
    { $set: { cause: cause._id } },
  );
  return NextResponse.json({ ok: true, slug: cause.slug });
}
