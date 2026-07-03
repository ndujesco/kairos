import type { MetadataRoute } from "next";
import { dbConnect } from "@/lib/db";
import { Cause, User } from "@/lib/models";

export const dynamic = "force-dynamic";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();
  const [causes, users] = await Promise.all([
    Cause.find({}, { slug: 1, updatedAt: 1 }).lean(),
    User.find({}, { handle: 1 }).lean(),
  ]);

  return [
    { url: APP_URL, changeFrequency: "daily", priority: 1 },
    { url: `${APP_URL}/explore`, changeFrequency: "daily", priority: 0.9 },
    { url: `${APP_URL}/login`, changeFrequency: "monthly", priority: 0.3 },
    ...causes.map((c) => ({
      url: `${APP_URL}/cause/${c.slug}`,
      lastModified: (c as { updatedAt?: Date }).updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.8,
    })),
    ...users.map((u) => ({
      url: `${APP_URL}/profile/${u.handle}`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
  ];
}
