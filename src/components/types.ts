export type CauseCardData = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  coverEmoji: string;
  coverColor: string;
  goal: number;
  raised: number;
  upkeepTaken: number;
  donorCount: number;
  vouchCount: number;
  vouchedByMe: boolean;
  isMine: boolean;
  status: string;
  createdAt: string;
  organizer: {
    name: string;
    handle: string;
    emoji: string;
    avatarColor: string;
    verified: boolean;
    ngo: boolean;
  };
};
