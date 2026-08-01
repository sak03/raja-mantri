"use client";

import { useGame } from "@/hooks/useGame";
import { GameOverScreen } from "./GameOverScreen";
import { useLocale } from "./LocaleProvider";
import { ResultScreen } from "./ResultScreen";
import { RoundScreen } from "./RoundScreen";
import { SetupScreen } from "./SetupScreen";

export function GameApp() {
  const game = useGame();
  const { t } = useLocale();

  if (!game.hydrated) {
    return (
      <div className="flex items-center justify-center min-h-[40vh] text-[var(--ink-muted)]">
        {t("loading")}
      </div>
    );
  }

  if (!game.state) {
    return (
      <SetupScreen
        hasSavedGame={game.hasSavedGame}
        history={game.history}
        restoreNotice={
          game.restoreNotice === "restoreFailed" ? t("restoreFailed") : null
        }
        onDismissRestoreNotice={game.dismissRestoreNotice}
        onStart={game.startNewGame}
        onResume={game.resumeGame}
      />
    );
  }

  if (game.state.phase === "gameOver") {
    return (
      <GameOverScreen
        state={game.state}
        onPlayAgain={game.handlePlayAgain}
        onNewGame={game.handleNewGame}
      />
    );
  }

  if (game.state.phase === "roundResult") {
    return (
      <ResultScreen state={game.state} onContinue={game.continueFromResult} />
    );
  }

  return (
    <RoundScreen
      state={game.state}
      chitVisible={game.chitVisible}
      handoffUnlocked={game.handoffUnlocked}
      onUnlockHandoff={game.unlockHandoff}
      onRevealChit={game.revealChit}
      onSeenAndPass={game.seenAndPass}
      onConfirmRaja={game.confirmRaja}
      onGuess={game.submitGuess}
      onAbandon={game.resetGame}
    />
  );
}
