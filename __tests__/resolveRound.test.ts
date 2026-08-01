import { describe, expect, it } from "vitest";
import { resolveRound } from "@/lib/resolveRound";
import type { PlayerId } from "@/lib/types";
import type { Role } from "@/lib/roles";

const P1 = "p1" as PlayerId;
const P2 = "p2" as PlayerId;
const P3 = "p3" as PlayerId;
const P4 = "p4" as PlayerId;

const assignment: Record<PlayerId, Role> = {
  [P1]: "Raja",
  [P2]: "Mantri",
  [P3]: "Sipahi",
  [P4]: "Chor",
};

describe("resolveRound", () => {
  it("correct Mantri guess → Mantri 800, Chor 0", () => {
    const result = resolveRound(assignment, P4);
    expect(result.correct).toBe(true);
    expect(result.chorId).toBe(P4);
    expect(result.roundScores[P2]).toBe(800);
    expect(result.roundScores[P4]).toBe(0);
  });

  it("wrong Mantri guess → Mantri 0, Chor 800 (swap)", () => {
    const result = resolveRound(assignment, P3);
    expect(result.correct).toBe(false);
    expect(result.roundScores[P2]).toBe(0);
    expect(result.roundScores[P4]).toBe(800);
  });

  it("Raja always scores 1000 and Sipahi always 500", () => {
    const correct = resolveRound(assignment, P4);
    expect(correct.roundScores[P1]).toBe(1000);
    expect(correct.roundScores[P3]).toBe(500);

    const wrong = resolveRound(assignment, P3);
    expect(wrong.roundScores[P1]).toBe(1000);
    expect(wrong.roundScores[P3]).toBe(500);
  });

  it("returns scores for every player in the assignment", () => {
    const result = resolveRound(assignment, P4);
    expect(Object.keys(result.roundScores).sort()).toEqual(
      [P1, P2, P3, P4].sort(),
    );
  });

  it("throws when Mantri guess is not a player in the assignment", () => {
    expect(() => resolveRound(assignment, "unknown" as PlayerId)).toThrow();
  });

  it("throws when assignment is missing a required role", () => {
    const bad: Record<PlayerId, Role> = {
      [P1]: "Raja",
      [P2]: "Mantri",
      [P3]: "Sipahi",
      [P4]: "Sipahi",
    };
    expect(() => resolveRound(bad, P3)).toThrow();
  });
});
