import { describe, expect, it } from "vitest";
import { getLeaders } from "@/lib/leaders";
import type { Player, PlayerId } from "@/lib/types";

const players = (
  scores: [string, number][],
): Player[] =>
  scores.map(([id, score], i) => ({
    id: id as PlayerId,
    name: id,
    isBot: i > 0,
    score,
  }));

describe("getLeaders", () => {
  it("points at the top-scoring player", () => {
    expect(
      getLeaders(players([
        ["a", 1000],
        ["b", 1500],
        ["c", 800],
      ])),
    ).toEqual(["b"]);
  });

  it("marks all tied leaders on an exact tie", () => {
    expect(
      getLeaders(players([
        ["a", 1500],
        ["b", 1500],
        ["c", 800],
      ])).sort(),
    ).toEqual(["a", "b"]);
  });

  it("returns empty for empty input", () => {
    expect(getLeaders([])).toEqual([]);
  });
});
