import type { PlayerId } from "./types";

export interface WinnerResult {
  over: boolean;
  winners: PlayerId[];
}

/**
 * Game ends when any player reaches `target`.
 * Among those at/above target, highest total wins; exact ties are shared wins.
 */
export function checkWinner(
  scores: Record<PlayerId, number>,
  target: number,
): WinnerResult {
  const eligible = (Object.entries(scores) as [PlayerId, number][]).filter(
    ([, score]) => score >= target,
  );

  if (eligible.length === 0) {
    return { over: false, winners: [] };
  }

  const max = Math.max(...eligible.map(([, score]) => score));
  const winners = eligible
    .filter(([, score]) => score === max)
    .map(([id]) => id);

  return { over: true, winners };
}
