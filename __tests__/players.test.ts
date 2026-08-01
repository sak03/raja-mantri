import { describe, expect, it } from "vitest";
import {
  DEFAULT_TARGET_SCORE,
  MAX_TARGET_SCORE,
  MIN_TARGET_SCORE,
  TARGET_SCORE_STEP,
  fillSeats,
  validateHumanNames,
  validateTargetScore,
} from "@/lib/players";

describe("fillSeats", () => {
  it("always yields 4 seats for 1 human + 3 bots", () => {
    const seats = fillSeats(1, ["Alice"]);
    expect(seats).toHaveLength(4);
    expect(seats.filter((p) => !p.isBot)).toHaveLength(1);
    expect(seats.filter((p) => p.isBot)).toHaveLength(3);
    expect(seats[0].name).toBe("Alice");
    expect(seats.slice(1).map((p) => p.name)).toEqual([
      "Bot 1",
      "Bot 2",
      "Bot 3",
    ]);
  });

  it("fills remaining seats with bots for 2 and 3 humans", () => {
    const two = fillSeats(2, ["A", "B"]);
    expect(two).toHaveLength(4);
    expect(two.filter((p) => p.isBot).map((p) => p.name)).toEqual([
      "Bot 1",
      "Bot 2",
    ]);

    const three = fillSeats(3, ["A", "B", "C"]);
    expect(three).toHaveLength(4);
    expect(three.filter((p) => p.isBot).map((p) => p.name)).toEqual(["Bot 1"]);
  });

  it("yields 4 humans and 0 bots for 4 humans", () => {
    const seats = fillSeats(4, ["A", "B", "C", "D"]);
    expect(seats).toHaveLength(4);
    expect(seats.every((p) => !p.isBot)).toBe(true);
    expect(seats.map((p) => p.name)).toEqual(["A", "B", "C", "D"]);
  });

  it("starts all scores at 0 with unique ids", () => {
    const seats = fillSeats(2, ["X", "Y"]);
    expect(seats.every((p) => p.score === 0)).toBe(true);
    const ids = new Set(seats.map((p) => p.id));
    expect(ids.size).toBe(4);
  });

  it("rejects invalid human counts", () => {
    expect(() => fillSeats(0 as 1, [])).toThrow();
    expect(() => fillSeats(5 as 1, ["a", "b", "c", "d", "e"])).toThrow();
  });

  it("rejects mismatched or blank human names", () => {
    expect(() => fillSeats(2, ["OnlyOne"])).toThrow();
    expect(() => fillSeats(1, ["   "])).toThrow();
    expect(() => fillSeats(2, ["A", ""])).toThrow();
  });

  it("rejects duplicate human names", () => {
    expect(() => fillSeats(2, ["Ada", "Ada"])).toThrow(/unique/i);
    expect(() => fillSeats(2, ["Ada", "ada"])).toThrow(/unique/i);
    expect(() => fillSeats(2, [" Ada ", "ada"])).toThrow(/unique/i);
  });
});

describe("validateHumanNames", () => {
  it("returns trimmed unique names", () => {
    expect(validateHumanNames([" Ada ", "Bea"])).toEqual(["Ada", "Bea"]);
  });

  it("rejects empty names", () => {
    expect(() => validateHumanNames(["  "])).toThrow(/non-empty/i);
  });

  it("rejects case-insensitive duplicates with whitespace", () => {
    expect(() => validateHumanNames(["Ada", " ada "])).toThrow(/unique/i);
  });

  it("never fails uniqueness for a single name", () => {
    expect(validateHumanNames(["Solo"])).toEqual(["Solo"]);
  });
});

describe("validateTargetScore", () => {
  it("accepts the default and valid stepped values", () => {
    expect(validateTargetScore(DEFAULT_TARGET_SCORE)).toBe(5000);
    expect(validateTargetScore(1000)).toBe(1000);
    expect(validateTargetScore(1500)).toBe(1500);
    expect(validateTargetScore(MAX_TARGET_SCORE)).toBe(MAX_TARGET_SCORE);
  });

  it("rejects below-min, above-max, and non-step values", () => {
    expect(() => validateTargetScore(MIN_TARGET_SCORE - TARGET_SCORE_STEP)).toThrow();
    expect(() => validateTargetScore(500)).toThrow();
    expect(() => validateTargetScore(1250)).toThrow();
    expect(() => validateTargetScore(0)).toThrow();
    expect(() => validateTargetScore(MAX_TARGET_SCORE + TARGET_SCORE_STEP)).toThrow();
  });
});
