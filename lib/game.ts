import { dealRoles, type Rng } from "./deal";
import {
  DEFAULT_TARGET_SCORE,
  type HumanCount,
  fillSeats,
  validateTargetScore,
} from "./players";
import { resolveRound } from "./resolveRound";
import type { Role } from "./roles";
import type { GameState, PlayerId, RoundSummary } from "./types";
import { checkWinner } from "./winner";
import { SCHEMA_VERSION } from "./storage";

export function createGame(
  humanCount: HumanCount,
  humanNames: string[],
  targetScore: number = DEFAULT_TARGET_SCORE,
): GameState {
  const target = validateTargetScore(targetScore);
  const players = fillSeats(humanCount, humanNames);

  return {
    version: SCHEMA_VERSION,
    phase: "setup",
    roundNumber: 0,
    targetScore: target,
    players,
    roles: null,
    revealIndex: 0,
    mantriGuess: null,
    lastRound: null,
    winners: [],
  };
}

export function startRound(state: GameState, rng: Rng = Math.random): GameState {
  const dealt = dealRoles(rng);
  const roles = {} as Record<PlayerId, Role>;
  state.players.forEach((player, index) => {
    roles[player.id] = dealt[index];
  });

  const firstHumanIndex = state.players.findIndex((p) => !p.isBot);

  return {
    ...state,
    phase: "revealChits",
    roundNumber: state.roundNumber + 1,
    roles,
    revealIndex: firstHumanIndex === -1 ? 0 : firstHumanIndex,
    mantriGuess: null,
    lastRound: null,
    winners: [],
  };
}

/** Move from rajaOrders → mantriGuess */
export function confirmRajaOrder(state: GameState): GameState {
  if (state.phase !== "rajaOrders") {
    throw new Error("confirmRajaOrder only valid during rajaOrders");
  }
  return { ...state, phase: "mantriGuess" };
}

/**
 * After a human has hidden their chit, advance to the next human reveal
 * or to rajaOrders when all humans are done.
 */
export function hideChitAndAdvance(state: GameState): GameState {
  if (state.phase !== "revealChits") {
    throw new Error("hideChitAndAdvance only valid during revealChits");
  }

  let next = state.revealIndex + 1;
  while (next < state.players.length && state.players[next].isBot) {
    next++;
  }

  if (next >= state.players.length) {
    return { ...state, phase: "rajaOrders", revealIndex: next };
  }

  return { ...state, revealIndex: next };
}

/** Alias used by tests / UI for advancing past rajaOrders */
export function advanceReveal(state: GameState): GameState {
  if (state.phase === "rajaOrders") {
    return confirmRajaOrder(state);
  }
  return hideChitAndAdvance(state);
}

export function getHiddenCandidates(state: GameState): PlayerId[] {
  if (!state.roles) return [];
  return state.players
    .filter((p) => {
      const role = state.roles![p.id];
      return role === "Sipahi" || role === "Chor";
    })
    .map((p) => p.id);
}

export function getRajaId(state: GameState): PlayerId | null {
  if (!state.roles) return null;
  const entry = Object.entries(state.roles).find(([, r]) => r === "Raja");
  return entry ? (entry[0] as PlayerId) : null;
}

export function getMantriId(state: GameState): PlayerId | null {
  if (!state.roles) return null;
  const entry = Object.entries(state.roles).find(([, r]) => r === "Mantri");
  return entry ? (entry[0] as PlayerId) : null;
}

export function applyMantriGuess(
  state: GameState,
  guess: PlayerId,
): GameState {
  if (state.phase !== "mantriGuess") {
    throw new Error("applyMantriGuess only valid during mantriGuess");
  }
  if (!state.roles) {
    throw new Error("No roles dealt");
  }

  const candidates = getHiddenCandidates(state);
  if (!candidates.includes(guess)) {
    throw new Error("Guess must be one of the hidden players");
  }

  const resolved = resolveRound(state.roles, guess);
  const players = state.players.map((p) => ({
    ...p,
    score: p.score + resolved.roundScores[p.id],
  }));

  const lastRound: RoundSummary = {
    roundScores: resolved.roundScores,
    roles: { ...state.roles },
    mantriGuess: guess,
    correct: resolved.correct,
    chorId: resolved.chorId,
    mantriId: resolved.mantriId,
    rajaId: resolved.rajaId,
  };

  return {
    ...state,
    phase: "roundResult",
    players,
    mantriGuess: guess,
    lastRound,
  };
}

/**
 * From roundResult: either start next round or move to gameOver if target hit.
 */
export function nextRound(state: GameState, rng: Rng = Math.random): GameState {
  if (state.phase !== "roundResult" && state.phase !== "gameOver") {
    throw new Error("nextRound only valid after a round result");
  }

  const scores = Object.fromEntries(
    state.players.map((p) => [p.id, p.score]),
  ) as Record<PlayerId, number>;

  const { over, winners } = checkWinner(scores, state.targetScore);
  if (over) {
    return {
      ...state,
      phase: "gameOver",
      winners,
    };
  }

  return startRound(
    {
      ...state,
      winners: [],
      lastRound: null,
      mantriGuess: null,
      roles: null,
    },
    rng,
  );
}

/** Keep names / human-bot seats / target; reset scores and round. */
export function playAgain(state: GameState): GameState {
  return {
    ...state,
    phase: "setup",
    roundNumber: 0,
    players: state.players.map((p) => ({ ...p, score: 0 })),
    roles: null,
    revealIndex: 0,
    mantriGuess: null,
    lastRound: null,
    winners: [],
  };
}

export function toHistoryEntry(state: GameState) {
  const winnerSet = new Set(state.winners);
  return {
    finishedAt: new Date().toISOString(),
    targetScore: state.targetScore,
    winners: state.players
      .filter((p) => winnerSet.has(p.id))
      .map((p) => ({ id: p.id, name: p.name, score: p.score })),
    standings: [...state.players]
      .sort((a, b) => b.score - a.score)
      .map((p) => ({
        id: p.id,
        name: p.name,
        score: p.score,
        isBot: p.isBot,
      })),
    rounds: state.roundNumber,
  };
}
