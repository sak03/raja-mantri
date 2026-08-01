import { describe, expect, it } from "vitest";
import {
  BOT_THINK_MAX_MS,
  BOT_THINK_MIN_MS,
  botThinkDelay,
  chooseChor,
} from "@/lib/bot";
import type { PlayerId } from "@/lib/types";

function createSeededRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 0x100000000;
  };
}

const A = "a" as PlayerId;
const B = "b" as PlayerId;

describe("chooseChor", () => {
  it("returns a valid hidden candidate", () => {
    const pick = chooseChor([A, B], createSeededRng(1));
    expect([A, B]).toContain(pick);
  });

  it("throws when candidates is empty", () => {
    expect(() => chooseChor([], createSeededRng(1))).toThrow();
  });

  it("returns the only candidate when there is one", () => {
    expect(chooseChor([A], createSeededRng(7))).toBe(A);
  });

  it("distributes ~50/50 over many runs", () => {
    const counts: Record<string, number> = { [A]: 0, [B]: 0 };
    const trials = 2000;
    const rng = createSeededRng(12345);
    for (let i = 0; i < trials; i++) {
      const pick = chooseChor([A, B], rng);
      counts[pick]++;
    }
    const ratio = counts[A] / trials;
    expect(ratio).toBeGreaterThan(0.4);
    expect(ratio).toBeLessThan(0.6);
  });

  it("is deterministic for the same seed", () => {
    expect(chooseChor([A, B], createSeededRng(42))).toBe(
      chooseChor([A, B], createSeededRng(42)),
    );
  });
});

describe("botThinkDelay", () => {
  it("stays within [800, 1600] across seeded runs", () => {
    const rng = createSeededRng(99);
    for (let i = 0; i < 500; i++) {
      const delay = botThinkDelay(rng);
      expect(delay).toBeGreaterThanOrEqual(BOT_THINK_MIN_MS);
      expect(delay).toBeLessThanOrEqual(BOT_THINK_MAX_MS);
    }
  });

  it("maps min RNG to 800 and near-max RNG to 1600", () => {
    expect(botThinkDelay(() => 0)).toBe(BOT_THINK_MIN_MS);
    expect(botThinkDelay(() => 0.999999)).toBe(BOT_THINK_MAX_MS);
  });
});
