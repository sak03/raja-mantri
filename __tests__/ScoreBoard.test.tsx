import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ScoreBoard } from "@/components/ScoreBoard";
import type { Player, PlayerId } from "@/lib/types";

const players: Player[] = [
  { id: "a" as PlayerId, name: "Player 1", isBot: false, score: 1300 },
  { id: "b" as PlayerId, name: "Bot 1", isBot: true, score: 1500 },
  { id: "c" as PlayerId, name: "Bot 2", isBot: true, score: 1000 },
  { id: "d" as PlayerId, name: "Bot 3", isBot: true, score: 800 },
];

describe("ScoreBoard", () => {
  it("compact mode shows Name: score with commas", () => {
    render(<ScoreBoard players={players} compact />);
    expect(screen.getByText("Bot 1")).toBeInTheDocument();
    expect(screen.getByText("1500")).toBeInTheDocument();
    expect(screen.getByText("Player 1")).toBeInTheDocument();
    expect(screen.queryByText(/^bot$/i)).not.toBeInTheDocument();
  });

  it("colors highest score green and lowest red", () => {
    const { container } = render(<ScoreBoard players={players} compact />);
    const items = container.querySelectorAll(".score-compact-item");
    expect(items[0]).toHaveStyle({ color: "var(--score-1)" }); // Bot 1 1500
    expect(items[1]).toHaveStyle({ color: "var(--score-2)" }); // Player 1 1300
    expect(items[2]).toHaveStyle({ color: "var(--score-3)" }); // Bot 2 1000
    expect(items[3]).toHaveStyle({ color: "var(--score-4)" }); // Bot 3 800
  });
});
