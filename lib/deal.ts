import { ROLES, type Role } from "./roles";

export type Rng = () => number;

/**
 * Shuffle and deal the four role chits.
 * Inject `rng` (returning [0, 1)) for deterministic tests; defaults to Math.random.
 */
export function dealRoles(rng: Rng = Math.random): Role[] {
  const deck: Role[] = [...ROLES];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
