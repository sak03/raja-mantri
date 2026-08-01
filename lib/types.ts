import type { Role } from "./roles";

export type PlayerId = string & { readonly __brand: "PlayerId" };

export type Phase =
  | "setup"
  | "revealChits"
  | "rajaOrders"
  | "mantriGuess"
  | "roundResult"
  | "gameOver";

export interface Player {
  id: PlayerId;
  name: string;
  isBot: boolean;
  score: number;
}

export interface RoundSummary {
  roundScores: Record<PlayerId, number>;
  roles: Record<PlayerId, Role>;
  mantriGuess: PlayerId;
  correct: boolean;
  chorId: PlayerId;
  mantriId: PlayerId;
  rajaId: PlayerId;
}

export interface GameState {
  version: number;
  phase: Phase;
  roundNumber: number;
  targetScore: number;
  players: Player[];
  roles: Record<PlayerId, Role> | null;
  revealIndex: number;
  mantriGuess: PlayerId | null;
  lastRound: RoundSummary | null;
  winners: PlayerId[];
}

export interface MatchHistoryEntry {
  finishedAt: string;
  targetScore: number;
  winners: { id: PlayerId; name: string; score: number }[];
  standings: { id: PlayerId; name: string; score: number; isBot: boolean }[];
  rounds: number;
}
