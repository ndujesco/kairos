/**
 * Kairos upkeep: 2% of a gift, capped at ₦5,000 for the whole cause.
 *
 * The donor pays exactly what they chose. The charge is deducted before the
 * money lands in escrow, so the cause receives the net. Both figures are shown
 * before the donor confirms, and the charge posts on the public ledger.
 */
export const UPKEEP_RATE = 0.02;
export const UPKEEP_CAP = 5000;

/** What we take from a single gift, respecting the per-cause cap. */
export function upkeepFor(amount: number, alreadyTaken = 0) {
  const room = Math.max(0, UPKEEP_CAP - alreadyTaken);
  return Math.min(Math.round(amount * UPKEEP_RATE), room);
}

/** What actually reaches escrow. */
export function netOf(amount: number, alreadyTaken = 0) {
  return amount - upkeepFor(amount, alreadyTaken);
}
