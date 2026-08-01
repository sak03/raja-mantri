import { screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ResultScreen } from "@/components/ResultScreen";
import { applyMantriGuess, createGame, startRound } from "@/lib/game";
import type { PlayerId } from "@/lib/types";
import { renderWithLocale } from "./testUtils";

function finishedRound() {
  let state = createGame(2, ["Ada", "Bea"], 10000);
  state = startRound(state, () => 0);
  state = { ...state, phase: "mantriGuess" };
  const chorId = Object.entries(state.roles!).find(
    ([, r]) => r === "Chor",
  )![0] as PlayerId;
  return applyMantriGuess(state, chorId);
}

describe("ResultScreen", () => {
  it("highlights human rows with a You badge; bots have none", () => {
    const state = finishedRound();
    renderWithLocale(
      <ResultScreen state={state} onContinue={vi.fn()} />,
    );

    const youBadges = screen.getAllByText(/^You$/i);
    expect(youBadges.length).toBe(2);

    const botRows = state.players.filter((p) => p.isBot);
    for (const bot of botRows) {
      const nameEl = screen.getByText(bot.name);
      const row = nameEl.closest("li");
      expect(row?.textContent).not.toMatch(/\bYou\b/);
    }
  });
});
