import type { CauseCardData } from "@/components/types";
import type { ICause, IUser } from "./models";
import { Types } from "mongoose";

type PopulatedCause = Omit<ICause, "organizer"> & { organizer: IUser };

export function toCardData(c: PopulatedCause, viewerId?: string): CauseCardData {
  return {
    id: String(c._id),
    slug: c.slug,
    title: c.title,
    summary: c.summary,
    category: c.category,
    coverEmoji: c.coverEmoji,
    coverColor: c.coverColor,
    goal: c.goal,
    raised: c.raised,
    donorCount: c.donorCount,
    vouchCount: c.vouches?.length ?? 0,
    vouchedByMe: viewerId
      ? (c.vouches ?? []).some((v: Types.ObjectId) => String(v) === viewerId)
      : false,
    status: c.status,
    createdAt: new Date(c.createdAt).toISOString(),
    organizer: {
      name: c.organizer.name,
      handle: c.organizer.handle,
      emoji: c.organizer.emoji,
      avatarColor: c.organizer.avatarColor,
      verified: c.organizer.verified?.identity ?? false,
      ngo: c.organizer.role === "ngo",
    },
  };
}
