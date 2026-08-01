import type { Player, PlayerId } from "./types";

/** All player ids sharing the highest score (tie-aware). */
export function getLeaders(players: Player[]): PlayerId[] {
  if (players.length === 0) return [];
  const max = Math.max(...players.map((p) => p.score));
  return players.filter((p) => p.score === max).map((p) => p.id);
}
