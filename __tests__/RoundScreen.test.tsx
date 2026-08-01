import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { RoundScreen } from "@/components/RoundScreen";
import { createGame, startRound } from "@/lib/game";
import type { PlayerId } from "@/lib/types";
import { renderWithLocale } from "./testUtils";

describe("RoundScreen", () => {
  it("blocks chit until handoff is unlocked, then requires reveal before pass", async () => {
    const user = userEvent.setup();
    const onUnlockHandoff = vi.fn();
    const onRevealChit = vi.fn();
    const onSeenAndPass = vi.fn();

    let state = createGame(1, ["Solo"], 5000);
    state = startRound(state, () => 0);

    const { rerender } = renderWithLocale(
      <RoundScreen
        state={state}
        chitVisible={false}
        handoffUnlocked={false}
        onUnlockHandoff={onUnlockHandoff}
        onRevealChit={onRevealChit}
        onSeenAndPass={onSeenAndPass}
        onConfirmRaja={vi.fn()}
        onGuess={vi.fn()}
        onAbandon={vi.fn()}
      />,
    );

    expect(screen.getByText(/Pass the phone to Solo/i)).toBeInTheDocument();
    expect(screen.queryByText(/Tap to reveal/i)).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: /I am Solo — show chit/i }),
    );
    expect(onUnlockHandoff).toHaveBeenCalled();

    rerender(
      <RoundScreen
        state={state}
        chitVisible={false}
        handoffUnlocked={true}
        onUnlockHandoff={onUnlockHandoff}
        onRevealChit={onRevealChit}
        onSeenAndPass={onSeenAndPass}
        onConfirmRaja={vi.fn()}
        onGuess={vi.fn()}
        onAbandon={vi.fn()}
      />,
    );

    expect(screen.getByText(/Tap to reveal/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /I have seen it — pass the phone/i }),
    ).toBeDisabled();

    await user.click(screen.getByRole("button", { name: /Tap to reveal/i }));
    expect(onRevealChit).toHaveBeenCalled();

    rerender(
      <RoundScreen
        state={state}
        chitVisible={true}
        handoffUnlocked={true}
        onUnlockHandoff={onUnlockHandoff}
        onRevealChit={onRevealChit}
        onSeenAndPass={onSeenAndPass}
        onConfirmRaja={vi.fn()}
        onGuess={vi.fn()}
        onAbandon={vi.fn()}
      />,
    );

    const role = state.roles!["human-1" as PlayerId];
    expect(screen.getAllByText(role).length).toBeGreaterThan(0);

    const live = screen.getByTestId("role-live");
    expect(live).toHaveAttribute("aria-live", "polite");
    expect(live.textContent).toMatch(new RegExp(role, "i"));

    await user.click(
      screen.getByRole("button", { name: /I have seen it — pass the phone/i }),
    );
    expect(onSeenAndPass).toHaveBeenCalled();
  });

  it("does not expose the role in aria-live before reveal", () => {
    let state = createGame(1, ["Solo"], 5000);
    state = startRound(state, () => 0);
    const role = state.roles!["human-1" as PlayerId];

    renderWithLocale(
      <RoundScreen
        state={state}
        chitVisible={false}
        handoffUnlocked={true}
        onUnlockHandoff={vi.fn()}
        onRevealChit={vi.fn()}
        onSeenAndPass={vi.fn()}
        onConfirmRaja={vi.fn()}
        onGuess={vi.fn()}
        onAbandon={vi.fn()}
      />,
    );

    const live = screen.getByTestId("role-live");
    expect(live.textContent ?? "").not.toMatch(new RegExp(role, "i"));
  });

  it("shows round number and leader indicator", () => {
    let state = createGame(1, ["Solo"], 5000);
    state = startRound(state, () => 0);
    state = {
      ...state,
      players: state.players.map((p, i) =>
        i === 0 ? { ...p, score: 2000 } : { ...p, score: 500 },
      ),
    };

    renderWithLocale(
      <RoundScreen
        state={state}
        chitVisible={false}
        handoffUnlocked={true}
        onUnlockHandoff={vi.fn()}
        onRevealChit={vi.fn()}
        onSeenAndPass={vi.fn()}
        onConfirmRaja={vi.fn()}
        onGuess={vi.fn()}
        onAbandon={vi.fn()}
      />,
    );

    expect(screen.getByText(/Round 1/i)).toBeInTheDocument();
    expect(screen.getByTestId("leader-banner").textContent).toMatch(/Solo/i);
  });
});
