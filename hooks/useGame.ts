"use client";

import { useCallback, useEffect, useState } from "react";
import { botThinkDelay, chooseChor } from "@/lib/bot";
import { playRevealFeedback } from "@/lib/feedback";
import {
  advanceReveal,
  applyMantriGuess,
  createGame,
  getHiddenCandidates,
  getMantriId,
  hideChitAndAdvance,
  nextRound,
  playAgain as playAgainState,
  startRound,
  toHistoryEntry,
} from "@/lib/game";
import { appendHistory, loadHistory } from "@/lib/history";
import type { HumanCount } from "@/lib/players";
import { DEFAULT_TARGET_SCORE } from "@/lib/players";
import { clearGame, loadGame, loadGameResult, saveGame } from "@/lib/storage";
import type { GameState, MatchHistoryEntry, PlayerId } from "@/lib/types";

export function useGame() {
  const [state, setState] = useState<GameState | null>(null);
  const [savedSnapshot, setSavedSnapshot] = useState<GameState | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [history, setHistory] = useState<MatchHistoryEntry[]>([]);
  const [chitVisible, setChitVisible] = useState(false);
  const [handoffUnlocked, setHandoffUnlocked] = useState(false);
  const [restoreNotice, setRestoreNotice] = useState<string | null>(null);

  useEffect(() => {
    const result = loadGameResult();
    if (result.status === "ok") {
      setSavedSnapshot(result.game);
    } else if (result.status === "incompatible") {
      clearGame();
      setSavedSnapshot(null);
      setRestoreNotice("restoreFailed");
    } else {
      setSavedSnapshot(null);
    }
    setHistory(loadHistory());
    setHydrated(true);
  }, []);

  // Reset handoff when seat or phase changes
  useEffect(() => {
    setHandoffUnlocked(false);
    setChitVisible(false);
  }, [state?.phase, state?.revealIndex, state?.roundNumber]);

  const persist = useCallback((next: GameState) => {
    setState(next);
    setSavedSnapshot(next);
    saveGame(next);
  }, []);

  const startNewGame = useCallback(
    (
      humanCount: HumanCount,
      humanNames: string[],
      targetScore: number = DEFAULT_TARGET_SCORE,
    ) => {
      clearGame();
      const setup = createGame(humanCount, humanNames, targetScore);
      const started = startRound(setup);
      setChitVisible(false);
      setHandoffUnlocked(false);
      setRestoreNotice(null);
      persist(started);
    },
    [persist],
  );

  const resumeGame = useCallback(() => {
    const saved = savedSnapshot ?? loadGame();
    if (saved && saved.phase !== "setup") {
      setChitVisible(false);
      setHandoffUnlocked(false);
      setState(saved);
    }
  }, [savedSnapshot]);

  const resetGame = useCallback(() => {
    clearGame();
    setChitVisible(false);
    setHandoffUnlocked(false);
    setSavedSnapshot(null);
    setState(null);
  }, []);

  const dismissRestoreNotice = useCallback(() => {
    setRestoreNotice(null);
  }, []);

  const unlockHandoff = useCallback(() => {
    setHandoffUnlocked(true);
  }, []);

  const revealChit = useCallback(() => {
    setChitVisible(true);
    playRevealFeedback();
  }, []);

  const seenAndPass = useCallback(() => {
    if (!state) return;
    setChitVisible(false);
    setHandoffUnlocked(false);
    persist(hideChitAndAdvance(state));
  }, [state, persist]);

  const confirmRaja = useCallback(() => {
    if (!state) return;
    setHandoffUnlocked(false);
    persist(advanceReveal(state));
  }, [state, persist]);

  const submitGuess = useCallback(
    (guess: PlayerId) => {
      if (!state) return;
      persist(applyMantriGuess(state, guess));
    },
    [state, persist],
  );

  useEffect(() => {
    if (!state || state.phase !== "mantriGuess") return;
    const mantriId = getMantriId(state);
    if (!mantriId) return;
    const mantri = state.players.find((p) => p.id === mantriId);
    if (!mantri?.isBot) return;

    const timer = setTimeout(() => {
      const candidates = getHiddenCandidates(state);
      const guess = chooseChor(candidates);
      persist(applyMantriGuess(state, guess));
    }, botThinkDelay());

    return () => clearTimeout(timer);
  }, [state, persist]);

  const continueFromResult = useCallback(() => {
    if (!state) return;
    const next = nextRound(state);
    setChitVisible(false);
    setHandoffUnlocked(false);
    if (next.phase === "gameOver") {
      const entry = toHistoryEntry(next);
      setHistory(appendHistory(entry));
    }
    persist(next);
  }, [state, persist]);

  const handlePlayAgain = useCallback(() => {
    if (!state) return;
    const again = playAgainState(state);
    const started = startRound(again);
    setChitVisible(false);
    setHandoffUnlocked(false);
    persist(started);
  }, [state, persist]);

  const handleNewGame = useCallback(() => {
    resetGame();
  }, [resetGame]);

  return {
    state,
    hydrated,
    history,
    chitVisible,
    handoffUnlocked,
    restoreNotice,
    hasSavedGame: Boolean(
      savedSnapshot && savedSnapshot.phase !== "setup" && state === null,
    ),
    startNewGame,
    resumeGame,
    resetGame,
    dismissRestoreNotice,
    unlockHandoff,
    revealChit,
    seenAndPass,
    confirmRaja,
    submitGuess,
    continueFromResult,
    handlePlayAgain,
    handleNewGame,
  };
}
