import type { GameState, Phase, Player, PlayerId, RoundSummary } from "./types";
import type { Role } from "./roles";

export const STORAGE_KEY = "rmcs:game";
export const SCHEMA_VERSION = 1;

export type LoadGameResult =
  | { status: "ok"; game: GameState }
  | { status: "none" }
  | { status: "corrupt" }
  | { status: "incompatible" };

const PHASES: Phase[] = [
  "setup",
  "revealChits",
  "rajaOrders",
  "mantriGuess",
  "roundResult",
  "gameOver",
];

const ROLES: Role[] = ["Raja", "Mantri", "Sipahi", "Chor"];

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isPlayer(value: unknown): value is Player {
  if (!isObject(value)) return false;
  return (
    typeof value.id === "string" &&
    typeof value.name === "string" &&
    typeof value.isBot === "boolean" &&
    typeof value.score === "number"
  );
}

function isRoleMap(value: unknown): value is Record<PlayerId, Role> {
  if (!isObject(value)) return false;
  return Object.values(value).every((r) => ROLES.includes(r as Role));
}

function isRoundSummary(value: unknown): value is RoundSummary {
  if (value === null) return false;
  if (!isObject(value)) return false;
  return (
    isRoleMap(value.roles) &&
    isObject(value.roundScores) &&
    typeof value.mantriGuess === "string" &&
    typeof value.correct === "boolean" &&
    typeof value.chorId === "string" &&
    typeof value.mantriId === "string" &&
    typeof value.rajaId === "string"
  );
}

function isGameState(value: unknown): value is GameState {
  if (!isObject(value)) return false;
  if (value.version !== SCHEMA_VERSION) return false;
  if (!PHASES.includes(value.phase as Phase)) return false;
  if (typeof value.roundNumber !== "number") return false;
  if (typeof value.targetScore !== "number") return false;
  if (!Array.isArray(value.players) || !value.players.every(isPlayer)) {
    return false;
  }
  if (value.players.length !== 4) return false;
  if (value.roles !== null && !isRoleMap(value.roles)) return false;
  if (typeof value.revealIndex !== "number") return false;
  if (value.mantriGuess !== null && typeof value.mantriGuess !== "string") {
    return false;
  }
  if (value.lastRound !== null && !isRoundSummary(value.lastRound)) {
    return false;
  }
  if (
    !Array.isArray(value.winners) ||
    !value.winners.every((w) => typeof w === "string")
  ) {
    return false;
  }
  return true;
}

function getStorage(): Storage | null {
  if (typeof localStorage === "undefined") return null;
  return localStorage;
}

export function saveGame(state: GameState): void {
  const storage = getStorage();
  if (!storage) return;
  storage.setItem(STORAGE_KEY, JSON.stringify(state));
}

export function loadGameResult(): LoadGameResult {
  const storage = getStorage();
  if (!storage) return { status: "none" };

  const raw = storage.getItem(STORAGE_KEY);
  if (raw === null) return { status: "none" };

  try {
    const parsed: unknown = JSON.parse(raw);
    if (!isObject(parsed)) return { status: "corrupt" };

    if (
      typeof parsed.version === "number" &&
      parsed.version !== SCHEMA_VERSION
    ) {
      return { status: "incompatible" };
    }

    if (!isGameState(parsed)) return { status: "corrupt" };
    return { status: "ok", game: parsed };
  } catch {
    return { status: "corrupt" };
  }
}

/** Convenience wrapper — returns game or null (collapses non-ok statuses). */
export function loadGame(): GameState | null {
  const result = loadGameResult();
  return result.status === "ok" ? result.game : null;
}

export function clearGame(): void {
  const storage = getStorage();
  if (!storage) return;
  storage.removeItem(STORAGE_KEY);
}
