import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { SetupScreen } from "@/components/SetupScreen";
import { renderWithLocale } from "./testUtils";

describe("SetupScreen", () => {
  it("starts a game with selected human count and names", async () => {
    const user = userEvent.setup();
    const onStart = vi.fn();

    renderWithLocale(
      <SetupScreen
        hasSavedGame={false}
        history={[]}
        onStart={onStart}
        onResume={vi.fn()}
      />,
    );

    expect(screen.getByText(/Ready to play/i)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "2" }));
    const inputs = screen.getAllByPlaceholderText(/Player/);
    expect(inputs).toHaveLength(2);

    await user.clear(inputs[0]);
    await user.type(inputs[0], "Ada");
    await user.clear(inputs[1]);
    await user.type(inputs[1], "Bea");

    await user.click(screen.getByRole("button", { name: /start game/i }));

    expect(onStart).toHaveBeenCalledWith(2, ["Ada", "Bea"], 5000);
  });

  it("shows resume when a saved game exists", async () => {
    const user = userEvent.setup();
    const onResume = vi.fn();

    renderWithLocale(
      <SetupScreen
        hasSavedGame
        history={[]}
        onStart={vi.fn()}
        onResume={onResume}
      />,
    );

    await user.click(screen.getByRole("button", { name: /resume game/i }));
    expect(onResume).toHaveBeenCalled();
  });

  it("shows restore notice when previous save could not be restored", () => {
    renderWithLocale(
      <SetupScreen
        hasSavedGame={false}
        history={[]}
        restoreNotice="Your previous game couldn't be restored."
        onDismissRestoreNotice={vi.fn()}
        onStart={vi.fn()}
        onResume={vi.fn()}
      />,
    );

    expect(
      screen.getByText(/couldn't be restored/i),
    ).toBeInTheDocument();
  });

  it("switches CTA to Hindi when language toggle is used", async () => {
    const user = userEvent.setup();

    const { LanguageToggle } = await import("@/components/LanguageToggle");

    renderWithLocale(
      <>
        <LanguageToggle />
        <SetupScreen
          hasSavedGame={false}
          history={[]}
          onStart={vi.fn()}
          onResume={vi.fn()}
        />
      </>,
    );

    expect(screen.getByRole("button", { name: /start game/i })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "हिं" }));
    expect(screen.getByRole("button", { name: "खेल शुरू" })).toBeInTheDocument();
  });

  it("disables Start when a name is cleared", async () => {
    const user = userEvent.setup();
    renderWithLocale(
      <SetupScreen
        hasSavedGame={false}
        history={[]}
        onStart={vi.fn()}
        onResume={vi.fn()}
      />,
    );

    const start = screen.getByRole("button", { name: /start game/i });
    expect(start).toBeEnabled();

    const input = screen.getByPlaceholderText(/Player 1/i);
    await user.clear(input);
    expect(start).toBeDisabled();
  });

  it("disables Start on duplicate names and enables when unique", async () => {
    const user = userEvent.setup();
    renderWithLocale(
      <SetupScreen
        hasSavedGame={false}
        history={[]}
        onStart={vi.fn()}
        onResume={vi.fn()}
      />,
    );

    await user.click(screen.getByRole("button", { name: "2" }));
    const inputs = screen.getAllByPlaceholderText(/Player/);
    await user.clear(inputs[0]);
    await user.type(inputs[0], "Ada");
    await user.clear(inputs[1]);
    await user.type(inputs[1], "ada");

    const start = screen.getByRole("button", { name: /start game/i });
    expect(start).toBeDisabled();

    await user.clear(inputs[1]);
    await user.type(inputs[1], "Bea");
    expect(start).toBeEnabled();
  });

  it("disables + at max target score", async () => {
    const user = userEvent.setup();
    renderWithLocale(
      <SetupScreen
        hasSavedGame={false}
        history={[]}
        onStart={vi.fn()}
        onResume={vi.fn()}
      />,
    );

    const increase = screen.getByRole("button", { name: /increase target/i });
    // 5000 → 20000 is 30 steps of 500
    for (let i = 0; i < 40; i++) {
      if ((increase as HTMLButtonElement).disabled) break;
      await user.click(increase);
    }
    expect(screen.getByText("20000")).toBeInTheDocument();
    expect(increase).toBeDisabled();
  });

  it("switches to dark theme when Dark is selected", async () => {
    const user = userEvent.setup();
    const { ThemeToggle } = await import("@/components/ThemeToggle");

    renderWithLocale(
      <>
        <ThemeToggle />
        <SetupScreen
          hasSavedGame={false}
          history={[]}
          onStart={vi.fn()}
          onResume={vi.fn()}
        />
      </>,
    );

    expect(document.documentElement.dataset.theme).toBe("light");
    await user.click(screen.getByRole("button", { name: /^Dark$/i }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.classList.contains("dark")).toBe(true);
    expect(document.documentElement.style.colorScheme).toBe("");
  });
});
