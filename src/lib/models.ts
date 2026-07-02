import mongoose, { Schema, model, models, Types } from "mongoose";

/* ---------------------------------- User --------------------------------- */

export interface IUser {
  _id: Types.ObjectId;
  name: string;
  handle: string;
  passwordHash?: string;
  bio?: string;
  avatarColor: string; // gradient key for the mock avatar
  emoji: string;
  role: "donor" | "organizer" | "ngo";
  verified: { identity: boolean; method?: "BVN" | "NIN"; cac?: boolean };
  trustLevel: number; // 1..5 - internal, drives raise limit
  raiseLimit: number; // max active raise in naira
  completedCauses: number;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    handle: { type: String, required: true, unique: true },
    passwordHash: { type: String },
    bio: String,
    avatarColor: { type: String, default: "emerald" },
    emoji: { type: String, default: "🙂" },
    role: { type: String, enum: ["donor", "organizer", "ngo"], default: "donor" },
    verified: {
      identity: { type: Boolean, default: false },
      method: { type: String, enum: ["BVN", "NIN"] },
      cac: { type: Boolean, default: false },
    },
    trustLevel: { type: Number, default: 1 },
    raiseLimit: { type: Number, default: 200_000 },
    completedCauses: { type: Number, default: 0 },
  },
  { timestamps: true }
);

/* --------------------------------- Cause --------------------------------- */

export interface IBudgetItem {
  label: string;
  amount: number;
  spent: number;
  vendor: { name: string; verified: boolean; account: string };
}

export interface IEvidence {
  label: string;
  kind: "photo" | "document" | "invoice";
  checks: { reuse: "clean" | "flagged"; exif: "consistent" | "flagged"; dates: "consistent" | "flagged" };
}

export interface ICauseUpdate {
  text: string;
  photos: string[]; // emoji placeholders for the mock gallery
  at: Date;
}

export interface ICause {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  story: string;
  summary: string;
  category: string;
  coverEmoji: string;
  coverColor: string;
  organizer: Types.ObjectId;
  goal: number;
  raised: number;
  escrowBalance: number;
  donorCount: number;
  vouches: Types.ObjectId[];
  budget: IBudgetItem[];
  evidence: IEvidence[];
  updates: ICauseUpdate[];
  status: "live" | "funded" | "completed";
  aiVerified: boolean;
  milestoneNote?: string;
  createdAt: Date;
}

const CauseSchema = new Schema<ICause>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    story: { type: String, required: true },
    summary: { type: String, required: true },
    category: { type: String, required: true },
    coverEmoji: { type: String, default: "💚" },
    coverColor: { type: String, default: "emerald" },
    organizer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    goal: { type: Number, required: true },
    raised: { type: Number, default: 0 },
    escrowBalance: { type: Number, default: 0 },
    donorCount: { type: Number, default: 0 },
    vouches: [{ type: Schema.Types.ObjectId, ref: "User" }],
    budget: [
      {
        label: String,
        amount: Number,
        spent: { type: Number, default: 0 },
        vendor: { name: String, verified: { type: Boolean, default: true }, account: String },
      },
    ],
    evidence: [
      {
        label: String,
        kind: { type: String, enum: ["photo", "document", "invoice"] },
        checks: {
          reuse: { type: String, default: "clean" },
          exif: { type: String, default: "consistent" },
          dates: { type: String, default: "consistent" },
        },
      },
    ],
    updates: [{ text: String, photos: [String], at: Date }],
    status: { type: String, enum: ["live", "funded", "completed"], default: "live" },
    aiVerified: { type: Boolean, default: true },
    milestoneNote: String,
  },
  { timestamps: true }
);

/* -------------------------------- Donation ------------------------------- */

export interface IDonation {
  _id: Types.ObjectId;
  cause: Types.ObjectId;
  donor: Types.ObjectId;
  amount: number;
  anonymous: boolean;
  createdAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    cause: { type: Schema.Types.ObjectId, ref: "Cause", required: true },
    donor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    anonymous: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/* ------------------------------ Disbursement ----------------------------- */

export interface IDisbursement {
  _id: Types.ObjectId;
  cause: Types.ObjectId;
  budgetLabel: string;
  vendorName: string;
  vendorAccount: string;
  amount: number;
  invoiceNo: string;
  note?: string;
  createdAt: Date;
}

const DisbursementSchema = new Schema<IDisbursement>(
  {
    cause: { type: Schema.Types.ObjectId, ref: "Cause", required: true },
    budgetLabel: { type: String, required: true },
    vendorName: { type: String, required: true },
    vendorAccount: { type: String, required: true },
    amount: { type: Number, required: true },
    invoiceNo: { type: String, required: true },
    note: String,
  },
  { timestamps: true }
);

/* ------------------------------ Notification ----------------------------- */

export interface INotification {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  type: "money_moved" | "donation_received" | "milestone" | "vouch";
  title: string;
  body: string;
  causeSlug: string;
  detail?: {
    yourShare?: number;
    yourDonation?: number;
    totalPaid?: number;
    vendor?: string;
    invoiceNo?: string;
    pct?: number;
  };
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, required: true },
    title: { type: String, required: true },
    body: { type: String, required: true },
    causeSlug: { type: String, required: true },
    detail: {
      yourShare: Number,
      yourDonation: Number,
      totalPaid: Number,
      vendor: String,
      invoiceNo: String,
      pct: Number,
    },
    read: { type: Boolean, default: false },
  },
  { timestamps: true }
);

/* -------------------------------- Comment -------------------------------- */

export interface IComment {
  _id: Types.ObjectId;
  cause: Types.ObjectId;
  author: Types.ObjectId;
  text: string;
  createdAt: Date;
}

const CommentSchema = new Schema<IComment>(
  {
    cause: { type: Schema.Types.ObjectId, ref: "Cause", required: true },
    author: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { timestamps: true }
);

/* -------------------------------- exports -------------------------------- */

export const User = (models.User as mongoose.Model<IUser>) || model<IUser>("User", UserSchema);
export const Cause = (models.Cause as mongoose.Model<ICause>) || model<ICause>("Cause", CauseSchema);
export const Donation =
  (models.Donation as mongoose.Model<IDonation>) || model<IDonation>("Donation", DonationSchema);
export const Disbursement =
  (models.Disbursement as mongoose.Model<IDisbursement>) ||
  model<IDisbursement>("Disbursement", DisbursementSchema);
export const Notification =
  (models.Notification as mongoose.Model<INotification>) ||
  model<INotification>("Notification", NotificationSchema);
export const Comment =
  (models.Comment as mongoose.Model<IComment>) || model<IComment>("Comment", CommentSchema);
