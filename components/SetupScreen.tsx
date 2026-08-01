"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  DEFAULT_TARGET_SCORE,
  MAX_TARGET_SCORE,
  MIN_TARGET_SCORE,
  TARGET_SCORE_STEP,
  canStartWithNames,
  type HumanCount,
} from "@/lib/players";
import type { MatchHistoryEntry } from "@/lib/types";
import { useLocale } from "./LocaleProvider";

interface SetupScreenProps {
  hasSavedGame: boolean;
  history: MatchHistoryEntry[];
  restoreNotice?: string | null;
  onDismissRestoreNotice?: () => void;
  onStart: (humanCount: HumanCount, names: string[], target: number) => void;
  onResume: () => void;
}

export function SetupScreen({
  hasSavedGame,
  history,
  restoreNotice = null,
  onDismissRestoreNotice,
  onStart,
  onResume,
}: SetupScreenProps) {
  const { t } = useLocale();
  const [humanCount, setHumanCount] = useState<HumanCount>(1);
  const [names, setNames] = useState<string[]>(["Player 1"]);
  const [target, setTarget] = useState(DEFAULT_TARGET_SCORE);
  const [error, setError] = useState<string | null>(null);

  const nameSlots = useMemo(
    () => Array.from({ length: humanCount }, (_, i) => i),
    [humanCount],
  );

  const canStart = canStartWithNames(names, humanCount);

  function handleCountChange(count: HumanCount) {
    setHumanCount(count);
    setNames((prev) =>
      Array.from({ length: count }, (_, i) => prev[i] || `Player ${i + 1}`),
    );
  }

  function handleStart() {
    setError(null);
    try {
      onStart(humanCount, names, target);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start game");
    }
  }

  const bots = 4 - humanCount;

  return (
    <div className="flex flex-col gap-4 w-full my-auto">
      <header className="text-center">
        <p className="text-xl font-semibold text-[var(--teal-deep)] font-[family-name:var(--font-display)]">
          {t("playNow")}
        </p>
        <p className="mt-1 text-sm text-[var(--ink-muted)] leading-snug">
          {t("setupSubtitle")}
        </p>
        <Link
          href="/how-to-play"
          className="inline-block mt-2 text-sm font-semibold text-[var(--teal)] underline underline-offset-2"
        >
          {t("navHowToPlay")}
        </Link>
      </header>

      {restoreNotice && (
        <div
          className="rounded-xl bg-[var(--accent-soft)] px-3 py-2.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
          role="status"
        >
          <p className="text-sm text-[var(--ink)]">{restoreNotice}</p>
          {onDismissRestoreNotice && (
            <button
              type="button"
              className="btn-secondary shrink-0"
              onClick={onDismissRestoreNotice}
            >
              OK
            </button>
          )}
        </div>
      )}

      {hasSavedGame && (
        <div className="rounded-xl bg-[var(--gold-soft)] px-3 py-2.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[var(--ink)]">{t("resumeHint")}</p>
          <button
            type="button"
            onClick={onResume}
            className="btn-secondary shrink-0"
          >
            {t("resumeGame")}
          </button>
        </div>
      )}

      <section className="flex flex-col gap-4">
        <div>
          <label className="label">{t("playersLabel")}</label>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {([1, 2, 3, 4] as HumanCount[]).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => handleCountChange(n)}
                className={
                  humanCount === n ? "seat-btn seat-btn-active" : "seat-btn"
                }
                aria-pressed={humanCount === n}
              >
                {n}
              </button>
            ))}
          </div>
          <p className="mt-1.5 text-xs text-[var(--ink-muted)]">
            {bots === 0 ? t("allHumans") : t("botsFill", { n: bots })}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="label">{t("namesLabel")}</label>
          {nameSlots.map((i) => (
            <input
              key={i}
              type="text"
              value={names[i] ?? ""}
              onChange={(e) => {
                const next = [...names];
                next[i] = e.target.value;
                setNames(next);
              }}
              className="input"
              placeholder={t("playerPlaceholder", { n: i + 1 })}
              maxLength={20}
              autoComplete="off"
            />
          ))}
        </div>

        <div>
          <label className="label">{t("targetLabel")}</label>
          <div className="mt-2 flex items-center justify-center gap-3">
            <button
              type="button"
              className="btn-icon"
              aria-label="Decrease target"
              disabled={target <= MIN_TARGET_SCORE}
              onClick={() =>
                setTarget((v) => Math.max(MIN_TARGET_SCORE, v - TARGET_SCORE_STEP))
              }
            >
              −
            </button>
            <span className="tabular-nums text-2xl font-semibold text-[var(--ink)] min-w-[4.5rem] text-center">
              {target}
            </span>
            <button
              type="button"
              className="btn-icon"
              aria-label="Increase target"
              disabled={target >= MAX_TARGET_SCORE}
              onClick={() =>
                setTarget((v) =>
                  Math.min(MAX_TARGET_SCORE, v + TARGET_SCORE_STEP),
                )
              }
            >
              +
            </button>
          </div>
        </div>

        {error && (
          <p className="text-sm text-[var(--danger)]" role="alert">
            {error}
          </p>
        )}

        <button
          type="button"
          className="btn-primary"
          onClick={handleStart}
          disabled={!canStart}
        >
          {t("startGame")}
        </button>
      </section>

      {history.length > 0 && (
        <section>
          <h2 className="label mb-1.5">{t("recentMatches")}</h2>
          <ul className="flex flex-col gap-1">
            {history.slice(0, 2).map((entry) => (
              <li
                key={entry.finishedAt}
                className="text-sm text-[var(--ink-muted)] flex justify-between gap-2"
              >
                <span className="truncate">
                  {entry.winners.map((w) => w.name).join(" & ") || "—"}{" "}
                  {t("won")}
                </span>
                <span className="tabular-nums shrink-0">
                  {entry.standings[0]?.score ?? 0}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
