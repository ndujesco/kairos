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

/**
 * The gift that lands a cause on exactly `targetNet` after upkeep.
 *
 * This is the fee rule run backwards, and it has two regimes: while the cap has
 * room the charge is 2%, and once the cap binds the charge is whatever is left
 * under it. Rounding means neither formula is reliable on its own, so we test
 * the few candidates and take the smallest gift that lands exactly. The donor
 * should never be asked for a naira more than closes the gap.
 */
export function giftForNet(targetNet: number, alreadyTaken = 0) {
  if (targetNet <= 0) return 0;
  const room = Math.max(0, UPKEEP_CAP - alreadyTaken);
  const proportional = Math.round(targetNet / (1 - UPKEEP_RATE));
  const candidates = [
    targetNet + room,                 // the cap binds
    proportional - 2, proportional - 1, proportional,
    proportional + 1, proportional + 2,
  ].filter((g) => g > 0).sort((a, b) => a - b);

  for (const g of candidates) {
    if (g - upkeepFor(g, alreadyTaken) === targetNet) return g;
  }
  return targetNet + room;
}
