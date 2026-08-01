"use client";

import type { GameState } from "@/lib/types";
import { useLocale } from "./LocaleProvider";
import { ScoreBoard } from "./ScoreBoard";

interface GameOverScreenProps {
  state: GameState;
  onPlayAgain: () => void;
  onNewGame: () => void;
}

export function GameOverScreen({
  state,
  onPlayAgain,
  onNewGame,
}: GameOverScreenProps) {
  const { t } = useLocale();
  const winnerNames = state.players
    .filter((p) => state.winners.includes(p.id))
    .map((p) => p.name);

  const title =
    winnerNames.length > 1
      ? t("shareWin", { names: winnerNames.join(" & ") })
      : t("wins", { name: winnerNames[0] ?? "?" });

  return (
    <div className="flex flex-col gap-5 w-full my-auto text-center animate-fade-up">
      <header>
        <h2 className="text-3xl font-semibold text-[var(--ink)] leading-tight animate-win">
          {title}
        </h2>
        <p className="mt-2 text-[var(--ink-muted)]">
          {t("gameOverMeta", {
            target: state.targetScore,
            rounds: state.roundNumber,
          })}
        </p>
      </header>

      <ScoreBoard players={state.players} highlightIds={state.winners} />

      <div className="flex flex-col gap-3">
        <button type="button" className="btn-primary" onClick={onPlayAgain}>
          {t("playAgain")}
        </button>
        <button type="button" className="btn-secondary" onClick={onNewGame}>
          {t("newGame")}
        </button>
      </div>
    </div>
  );
}
