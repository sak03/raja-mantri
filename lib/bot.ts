import type { Rng } from "./deal";
import type { PlayerId } from "./types";

export const BOT_THINK_MIN_MS = 800;
export const BOT_THINK_MAX_MS = 1600;

/**
 * Bot Mantri picks the Chor at random among the hidden candidates (fair 50/50).
 */
export function chooseChor(
  candidates: PlayerId[],
  rng: Rng = Math.random,
): PlayerId {
  if (candidates.length === 0) {
    throw new Error("chooseChor requires at least one candidate");
  }
  const index = Math.floor(rng() * candidates.length);
  return candidates[Math.min(index, candidates.length - 1)];
}

/** Inclusive delay in [800, 1600] ms. */
export function botThinkDelay(rng: Rng = Math.random): number {
  const span = BOT_THINK_MAX_MS - BOT_THINK_MIN_MS + 1;
  return BOT_THINK_MIN_MS + Math.floor(rng() * span);
}
