import { describe, expect, it } from "vitest";
import {
  advanceReveal,
  applyMantriGuess,
  createGame,
  hideChitAndAdvance,
  nextRound,
  playAgain,
  startRound,
} from "@/lib/game";
import type { PlayerId } from "@/lib/types";

describe("game", () => {
  it("createGame rejects invalid targets and builds setup state", () => {
    expect(() => createGame(1, ["Alice"], 500)).toThrow();
    const state = createGame(1, ["Alice"], 5000);
    expect(state.phase).toBe("setup");
    expect(state.players).toHaveLength(4);
    expect(state.targetScore).toBe(5000);
    expect(state.roundNumber).toBe(0);
  });

  it("startRound deals roles and enters revealChits", () => {
    const setup = createGame(2, ["A", "B"], 5000);
    const state = startRound(setup, () => 0);
    expect(state.phase).toBe("revealChits");
    expect(state.roundNumber).toBe(1);
    expect(state.roles).not.toBeNull();
    const roles = Object.values(state.roles!);
    expect(new Set(roles).size).toBe(4);
  });

  it("advanceReveal skips bots and moves to rajaOrders", () => {
    let state = createGame(1, ["Solo"], 5000);
    state = startRound(state, () => 0);
    expect(state.phase).toBe("revealChits");
    expect(state.revealIndex).toBe(0);

    state = hideChitAndAdvance(state);
    expect(state.phase).toBe("rajaOrders");
  });

  it("full round: correct guess awards Mantri 800 / Chor 0", () => {
    let state = createGame(4, ["A", "B", "C", "D"], 10000);
    state = startRound(state, () => 0);
    while (state.phase === "revealChits") {
      state = hideChitAndAdvance(state);
    }
    expect(state.phase).toBe("rajaOrders");
    state = advanceReveal(state);
    expect(state.phase).toBe("mantriGuess");

    const chorId = Object.entries(state.roles!).find(
      ([, r]) => r === "Chor",
    )![0] as PlayerId;
    state = applyMantriGuess(state, chorId);

    expect(state.phase).toBe("roundResult");
    expect(state.lastRound?.correct).toBe(true);
    const mantri = state.players.find(
      (p) => p.id === state.lastRound!.mantriId,
    )!;
    const chor = state.players.find((p) => p.id === chorId)!;
    expect(mantri.score).toBe(800);
    expect(chor.score).toBe(0);
    expect(
      state.players.find((p) => p.id === state.lastRound!.rajaId)!.score,
    ).toBe(1000);
  });

  it("wrong guess swaps Mantri and Chor points", () => {
    let state = createGame(4, ["A", "B", "C", "D"], 10000);
    state = startRound(state, () => 0);
    while (state.phase === "revealChits") {
      state = hideChitAndAdvance(state);
    }
    state = advanceReveal(state);

    const sipahiId = Object.entries(state.roles!).find(
      ([, r]) => r === "Sipahi",
    )![0] as PlayerId;
    state = applyMantriGuess(state, sipahiId);

    expect(state.lastRound?.correct).toBe(false);
    const mantri = state.players.find(
      (p) => p.id === state.lastRound!.mantriId,
    )!;
    const chor = state.players.find(
      (p) => p.id === state.lastRound!.chorId,
    )!;
    expect(mantri.score).toBe(0);
    expect(chor.score).toBe(800);
  });

  it("ends game when someone reaches target after a round", () => {
    let state = createGame(4, ["A", "B", "C", "D"], 1000);
    state = startRound(state, () => 0);
    while (state.phase === "revealChits") {
      state = hideChitAndAdvance(state);
    }
    state = advanceReveal(state);
    const chorId = Object.entries(state.roles!).find(
      ([, r]) => r === "Chor",
    )![0] as PlayerId;
    state = applyMantriGuess(state, chorId);
    state = nextRound(state);
    expect(state.phase).toBe("gameOver");
    expect(state.winners.length).toBeGreaterThan(0);
  });

  it("playAgain keeps players/target and resets scores", () => {
    let state = createGame(2, ["A", "B"], 5000);
    state = startRound(state, () => 0);
    while (state.phase === "revealChits") {
      state = hideChitAndAdvance(state);
    }
    state = advanceReveal(state);
    const chorId = Object.entries(state.roles!).find(
      ([, r]) => r === "Chor",
    )![0] as PlayerId;
    state = applyMantriGuess(state, chorId);

    const again = playAgain(state);
    expect(again.phase).toBe("setup");
    expect(again.players.map((p) => p.name)).toEqual(
      state.players.map((p) => p.name),
    );
    expect(again.players.every((p) => p.score === 0)).toBe(true);
    expect(again.targetScore).toBe(5000);
    expect(again.roundNumber).toBe(0);
  });

  it("rejects guesses that are not hidden candidates", () => {
    let state = createGame(4, ["A", "B", "C", "D"], 10000);
    state = startRound(state, () => 0);
    while (state.phase === "revealChits") {
      state = hideChitAndAdvance(state);
    }
    state = advanceReveal(state);
    const rajaId = Object.entries(state.roles!).find(
      ([, r]) => r === "Raja",
    )![0] as PlayerId;
    expect(() => applyMantriGuess(state, rajaId)).toThrow();
  });
});
