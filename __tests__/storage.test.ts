import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  STORAGE_KEY,
  SCHEMA_VERSION,
  clearGame,
  loadGame,
  loadGameResult,
  saveGame,
} from "@/lib/storage";
import type { GameState, PlayerId } from "@/lib/types";

function makeState(overrides: Partial<GameState> = {}): GameState {
  return {
    version: SCHEMA_VERSION,
    phase: "revealChits",
    roundNumber: 1,
    targetScore: 5000,
    players: [
      { id: "human-1" as PlayerId, name: "Alice", isBot: false, score: 0 },
      { id: "bot-1" as PlayerId, name: "Bot 1", isBot: true, score: 0 },
      { id: "bot-2" as PlayerId, name: "Bot 2", isBot: true, score: 0 },
      { id: "bot-3" as PlayerId, name: "Bot 3", isBot: true, score: 0 },
    ],
    roles: {
      ["human-1" as PlayerId]: "Raja",
      ["bot-1" as PlayerId]: "Mantri",
      ["bot-2" as PlayerId]: "Sipahi",
      ["bot-3" as PlayerId]: "Chor",
    },
    revealIndex: 0,
    mantriGuess: null,
    lastRound: null,
    winners: [],
    ...overrides,
  };
}

describe("storage", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("round-trips a valid game state", () => {
    const state = makeState({ roundNumber: 3, phase: "mantriGuess" });
    saveGame(state);
    expect(loadGame()).toEqual(state);
  });

  it("returns null when nothing is stored", () => {
    expect(loadGame()).toBeNull();
  });

  it("safely recovers from corrupt JSON (no throw)", () => {
    localStorage.setItem(STORAGE_KEY, "{not-json");
    expect(() => loadGame()).not.toThrow();
    expect(loadGame()).toBeNull();
  });

  it("rejects old / wrong schema versions via loadGame", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(makeState({ version: SCHEMA_VERSION + 99 })),
    );
    expect(loadGame()).toBeNull();
  });

  it("rejects payloads missing required fields", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: SCHEMA_VERSION, phase: "setup" }),
    );
    expect(loadGame()).toBeNull();
  });

  it("clearGame removes persisted state", () => {
    saveGame(makeState());
    clearGame();
    expect(loadGame()).toBeNull();
    expect(localStorage.getItem(STORAGE_KEY)).toBeNull();
  });
});

describe("loadGameResult", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("returns ok for a valid current-version save", () => {
    const state = makeState();
    saveGame(state);
    expect(loadGameResult()).toEqual({ status: "ok", game: state });
  });

  it("returns none when nothing is stored", () => {
    expect(loadGameResult()).toEqual({ status: "none" });
  });

  it("returns corrupt for invalid JSON without throwing", () => {
    localStorage.setItem(STORAGE_KEY, "{not-json");
    expect(() => loadGameResult()).not.toThrow();
    expect(loadGameResult()).toEqual({ status: "corrupt" });
  });

  it("flags wrong schema version as incompatible (not silently none)", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(makeState({ version: SCHEMA_VERSION + 99 })),
    );
    expect(loadGameResult()).toEqual({ status: "incompatible" });
  });

  it("returns corrupt for missing required fields with current version", () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ version: SCHEMA_VERSION, phase: "setup" }),
    );
    expect(loadGameResult()).toEqual({ status: "corrupt" });
  });
});
