import { describe, expect, it } from "vitest";
import { checkWinner } from "@/lib/winner";
import type { PlayerId } from "@/lib/types";

const A = "a" as PlayerId;
const B = "b" as PlayerId;
const C = "c" as PlayerId;
const D = "d" as PlayerId;

describe("checkWinner", () => {
  it("does not end when all scores are below target", () => {
    const result = checkWinner(
      { [A]: 1000, [B]: 800, [C]: 500, [D]: 0 },
      5000,
    );
    expect(result.over).toBe(false);
    expect(result.winners).toEqual([]);
  });

  it("ends when a player reaches exactly the target", () => {
    const result = checkWinner(
      { [A]: 5000, [B]: 4000, [C]: 3000, [D]: 2000 },
      5000,
    );
    expect(result.over).toBe(true);
    expect(result.winners).toEqual([A]);
  });

  it("ends when a player is above the target", () => {
    const result = checkWinner(
      { [A]: 5500, [B]: 4000, [C]: 3000, [D]: 2000 },
      5000,
    );
    expect(result.over).toBe(true);
    expect(result.winners).toEqual([A]);
  });

  it("picks the highest total when multiple cross the target", () => {
    const result = checkWinner(
      { [A]: 5200, [B]: 5600, [C]: 5100, [D]: 1000 },
      5000,
    );
    expect(result.over).toBe(true);
    expect(result.winners).toEqual([B]);
  });

  it("declares a shared win on exact tie at the top", () => {
    const result = checkWinner(
      { [A]: 5500, [B]: 5500, [C]: 5100, [D]: 1000 },
      5000,
    );
    expect(result.over).toBe(true);
    expect(result.winners.sort()).toEqual([A, B].sort());
  });

  it("does not treat below-target players as winners even if tied for second", () => {
    const result = checkWinner(
      { [A]: 6000, [B]: 4000, [C]: 4000, [D]: 1000 },
      5000,
    );
    expect(result.winners).toEqual([A]);
  });
});
