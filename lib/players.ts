import type { Player, PlayerId } from "./types";

export const DEFAULT_TARGET_SCORE = 5000;
export const MIN_TARGET_SCORE = 1000;
export const MAX_TARGET_SCORE = 20000;
export const TARGET_SCORE_STEP = 500;

export type HumanCount = 1 | 2 | 3 | 4;

export function validateTargetScore(target: number): number {
  if (
    !Number.isInteger(target) ||
    target < MIN_TARGET_SCORE ||
    target > MAX_TARGET_SCORE ||
    target % TARGET_SCORE_STEP !== 0
  ) {
    throw new Error(
      `Target must be an integer between ${MIN_TARGET_SCORE} and ${MAX_TARGET_SCORE} in steps of ${TARGET_SCORE_STEP}`,
    );
  }
  return target;
}

/** Trim names; reject empty or case-insensitive duplicates. */
export function validateHumanNames(humanNames: string[]): string[] {
  const trimmed = humanNames.map((n) => n.trim());
  if (trimmed.some((n) => n.length === 0)) {
    throw new Error("Human names must be non-empty");
  }

  const seen = new Set<string>();
  for (const name of trimmed) {
    const key = name.toLowerCase();
    if (seen.has(key)) {
      throw new Error("Player names must be unique");
    }
    seen.add(key);
  }

  return trimmed;
}

/**
 * Fill 4 seats: named humans first, then Bot 1, Bot 2, …
 */
export function fillSeats(
  humanCount: HumanCount,
  humanNames: string[],
): Player[] {
  if (![1, 2, 3, 4].includes(humanCount)) {
    throw new Error("humanCount must be 1, 2, 3, or 4");
  }
  if (humanNames.length !== humanCount) {
    throw new Error(`Expected ${humanCount} human name(s)`);
  }

  const trimmed = validateHumanNames(humanNames);

  const players: Player[] = [];

  for (let i = 0; i < humanCount; i++) {
    players.push({
      id: `human-${i + 1}` as PlayerId,
      name: trimmed[i],
      isBot: false,
      score: 0,
    });
  }

  const botCount = 4 - humanCount;
  for (let i = 0; i < botCount; i++) {
    players.push({
      id: `bot-${i + 1}` as PlayerId,
      name: `Bot ${i + 1}`,
      isBot: true,
      score: 0,
    });
  }

  return players;
}

/** UI helper: names ready to start (non-empty + unique). */
export function canStartWithNames(names: string[], humanCount: number): boolean {
  const slice = names.slice(0, humanCount);
  if (slice.length !== humanCount) return false;
  try {
    validateHumanNames(slice);
    return true;
  } catch {
    return false;
  }
}
