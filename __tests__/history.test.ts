import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
  HISTORY_KEY,
  appendHistory,
  clearHistory,
  loadHistory,
} from "@/lib/history";
import type { MatchHistoryEntry, PlayerId } from "@/lib/types";

function entry(label: string): MatchHistoryEntry {
  return {
    finishedAt: `2026-01-01T00:00:0${label}Z`,
    targetScore: 5000,
    winners: [{ id: "human-1" as PlayerId, name: "Alice", score: 5000 }],
    standings: [
      { id: "human-1" as PlayerId, name: "Alice", score: 5000, isBot: false },
      { id: "bot-1" as PlayerId, name: "Bot 1", score: 1000, isBot: true },
      { id: "bot-2" as PlayerId, name: "Bot 2", score: 800, isBot: true },
      { id: "bot-3" as PlayerId, name: "Bot 3", score: 500, isBot: true },
    ],
    rounds: 5,
  };
}

describe("history", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  it("appends entries newest-first and caps at 10", () => {
    for (let i = 0; i < 12; i++) {
      appendHistory(entry(String(i % 10)));
    }
    const history = loadHistory();
    expect(history).toHaveLength(10);
    expect(history[0].finishedAt).toBe("2026-01-01T00:00:01Z");
  });

  it("returns empty array for corrupt history data", () => {
    localStorage.setItem(HISTORY_KEY, "!!!");
    expect(loadHistory()).toEqual([]);
  });

  it("clearHistory wipes the list", () => {
    appendHistory(entry("1"));
    clearHistory();
    expect(loadHistory()).toEqual([]);
  });
});
