"use client";

import type { GameState } from "@/lib/types";
import { useLocale } from "./LocaleProvider";
import { RoleChip } from "./RoleChip";

interface ResultScreenProps {
  state: GameState;
  onContinue: () => void;
}

export function ResultScreen({ state, onContinue }: ResultScreenProps) {
  const { t } = useLocale();
  const summary = state.lastRound;
  if (!summary) return null;

  const guessName =
    state.players.find((p) => p.id === summary.mantriGuess)?.name ?? "?";
  const chorName =
    state.players.find((p) => p.id === summary.chorId)?.name ?? "?";
  const mantriName =
    state.players.find((p) => p.id === summary.mantriId)?.name ?? "?";

  const willEnd = state.players.some((p) => p.score >= state.targetScore);

  return (
    <div className="flex flex-col gap-5 w-full my-auto animate-fade-up">
      <header className="text-center">
        <h2 className="text-2xl font-semibold text-[var(--ink)]">
          {t("resultTitle", { round: state.roundNumber })}
        </h2>
        <p className="mt-2 text-sm text-[var(--ink-muted)]">
          {t("accused", { mantri: mantriName, guess: guessName })}
        </p>
      </header>

      <div
        className={summary.correct ? "verdict verdict-ok" : "verdict verdict-bad"}
      >
        {summary.correct
          ? t("resultCorrect")
          : t("resultWrong", { chor: chorName })}
      </div>

      <ul className="flex flex-col gap-2">
        {[...state.players]
          .sort((a, b) => b.score - a.score)
          .map((player) => {
            const role = summary.roles[player.id];
            const delta = summary.roundScores[player.id] ?? 0;
            return (
              <li
                key={player.id}
                className={[
                  "flex items-center justify-between gap-3 px-3 py-3 rounded-xl",
                  player.isBot
                    ? "bg-[var(--surface)]"
                    : "result-row-you bg-[var(--accent-soft)] border border-[color:var(--teal)]",
                ].join(" ")}
              >
                <div className="min-w-0 flex flex-col gap-1">
                  <p className="font-medium truncate flex items-center gap-2">
                    {player.name}
                    {!player.isBot && (
                      <span className="you-badge">{t("youBadge")}</span>
                    )}
                  </p>
                  <RoleChip role={role} />
                </div>
                <div className="text-right shrink-0">
                  <p className="tabular-nums font-semibold text-[var(--teal)]">
                    +{delta}
                  </p>
                  <p className="text-xs tabular-nums text-[var(--ink-muted)]">
                    {t("total", { score: player.score })}
                  </p>
                </div>
              </li>
            );
          })}
      </ul>

      <button type="button" className="btn-primary" onClick={onContinue}>
        {willEnd ? t("seeWinner") : t("nextRound")}
      </button>
    </div>
  );
}
