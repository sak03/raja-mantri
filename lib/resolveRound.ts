import { ROLE_POINTS, type Role } from "./roles";
import type { PlayerId } from "./types";

export interface ResolveRoundResult {
  roundScores: Record<PlayerId, number>;
  correct: boolean;
  chorId: PlayerId;
  mantriId: PlayerId;
  rajaId: PlayerId;
  sipahiId: PlayerId;
}

function findRole(
  assignment: Record<PlayerId, Role>,
  role: Role,
): PlayerId {
  const entries = Object.entries(assignment).filter(([, r]) => r === role);
  if (entries.length !== 1) {
    throw new Error(`Expected exactly one ${role}, found ${entries.length}`);
  }
  return entries[0][0] as PlayerId;
}

/**
 * Apply round scoring given Mantri's guess of who the Chor is.
 * Correct → Mantri 800 / Chor 0. Wrong → swap (Mantri 0 / Chor 800).
 * Raja always 1000, Sipahi always 500.
 */
export function resolveRound(
  assignment: Record<PlayerId, Role>,
  mantriGuess: PlayerId,
): ResolveRoundResult {
  if (!(mantriGuess in assignment)) {
    throw new Error("Mantri guess must refer to a player in the assignment");
  }

  const rajaId = findRole(assignment, "Raja");
  const mantriId = findRole(assignment, "Mantri");
  const sipahiId = findRole(assignment, "Sipahi");
  const chorId = findRole(assignment, "Chor");

  const correct = mantriGuess === chorId;
  const roundScores = {} as Record<PlayerId, number>;

  for (const [id, role] of Object.entries(assignment) as [PlayerId, Role][]) {
    if (role === "Raja") {
      roundScores[id] = ROLE_POINTS.Raja;
    } else if (role === "Sipahi") {
      roundScores[id] = ROLE_POINTS.Sipahi;
    } else if (role === "Mantri") {
      roundScores[id] = correct ? ROLE_POINTS.Mantri : ROLE_POINTS.Chor;
    } else {
      // Chor
      roundScores[id] = correct ? ROLE_POINTS.Chor : ROLE_POINTS.Mantri;
    }
  }

  return { roundScores, correct, chorId, mantriId, rajaId, sipahiId };
}
