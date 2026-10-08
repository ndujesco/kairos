import { dbConnect } from "./db";
import { Cause, Notification } from "./models";

/**
 * A cheap fingerprint of "has anything the viewer cares about changed".
 *
 * Donations and payouts both save the cause, so its updatedAt moves on either.
 * The viewer's own notification count covers anything addressed to them
 * personally. Two indexed reads, which is light enough to run every second.
 */
export async function revision(userId?: string) {
  await dbConnect();
  const [latest, mine] = await Promise.all([
    /* timestamps:true adds updatedAt at runtime but it is not on the interface */
    Cause.findOne({}, { updatedAt: 1 }).sort({ updatedAt: -1 }).lean<{ updatedAt?: Date }>(),
    userId ? Notification.countDocuments({ user: userId }) : Promise.resolve(0),
  ]);
  const t = latest?.updatedAt ? new Date(latest.updatedAt).getTime() : 0;
  return `${t}.${mine}`;
}
