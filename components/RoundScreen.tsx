"use client";

import {
  getHiddenCandidates,
  getMantriId,
  getRajaId,
} from "@/lib/game";
import { getLeaders } from "@/lib/leaders";
import { ROLE_POINTS } from "@/lib/roles";
import type { GameState, PlayerId } from "@/lib/types";
import { HandoffGate } from "./HandoffGate";
import { useLocale } from "./LocaleProvider";
import { RoleChip } from "./RoleChip";
import { ScoreBoard } from "./ScoreBoard";
import { StepProgress } from "./StepProgress";

interface RoundScreenProps {
  state: GameState;
  chitVisible: boolean;
  handoffUnlocked: boolean;
  onUnlockHandoff: () => void;
  onRevealChit: () => void;
  onSeenAndPass: () => void;
  onConfirmRaja: () => void;
  onGuess: (id: PlayerId) => void;
  onAbandon: () => void;
}

export function RoundScreen({
  state,
  chitVisible,
  handoffUnlocked,
  onUnlockHandoff,
  onRevealChit,
  onSeenAndPass,
  onConfirmRaja,
  onGuess,
  onAbandon,
}: RoundScreenProps) {
  const { t } = useLocale();
  const current = state.players[state.revealIndex];
  const rajaId = getRajaId(state);
  const mantriId = getMantriId(state);
  const raja = state.players.find((p) => p.id === rajaId);
  const mantri = state.players.find((p) => p.id === mantriId);
  const candidates = getHiddenCandidates(state);
  const currentRole =
    current && state.roles ? state.roles[current.id] : null;

  const needsMantriHandoff =
    state.phase === "mantriGuess" && Boolean(mantri && !mantri.isBot);

  const leaderIds = getLeaders(state.players);
  const leaderNames = leaderIds
    .map((id) => state.players.find((p) => p.id === id)?.name)
    .filter(Boolean)
    .join(" & ");
  const leaderLabel =
    leaderIds.length > 1
      ? t("tiedLeading", { names: leaderNames })
      : t("leading", { names: leaderNames });

  return (
    <div className="flex flex-col gap-4 w-full my-auto">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[var(--teal-deep)]">
            {t("roundTarget", {
              round: state.roundNumber,
              target: state.targetScore,
            })}
          </p>
          <p className="leader-banner" data-testid="leader-banner">
            {leaderLabel}
          </p>
        </div>
        <button
          type="button"
          className="text-sm font-semibold text-[var(--ink-muted)] underline min-h-11 px-1"
          onClick={onAbandon}
        >
          {t("quit")}
        </button>
      </div>

      <StepProgress phase={state.phase} />
      <ScoreBoard players={state.players} compact />

      {state.phase === "revealChits" && current && !handoffUnlocked && (
        <HandoffGate playerName={current.name} onUnlock={onUnlockHandoff} />
      )}

      {state.phase === "revealChits" && current && handoffUnlocked && (
        <section className="flex flex-col gap-4 text-center animate-fade-up">
          <p className="turn-banner">{current.name}</p>
          <p className="text-sm text-[var(--ink-muted)]">{t("chitHint")}</p>

          <div
            data-testid="role-live"
            aria-live="polite"
            className="sr-only"
          >
            {chitVisible && currentRole
              ? t("youAre", {
                  role: currentRole,
                  points: ROLE_POINTS[currentRole],
                })
              : ""}
          </div>

          <button
            type="button"
            onClick={onRevealChit}
            className="chit"
            aria-pressed={chitVisible}
            disabled={chitVisible}
          >
            {chitVisible && currentRole ? (
              <>
                <RoleChip role={currentRole} />
                <span
                  className="chit-role animate-reveal"
                  style={{
                    color:
                      currentRole === "Raja"
                        ? "var(--role-raja)"
                        : currentRole === "Mantri"
                          ? "var(--role-mantri)"
                          : currentRole === "Sipahi"
                            ? "var(--role-sipahi)"
                            : "var(--role-chor)",
                  }}
                >
                  {currentRole}
                </span>
                <span className="text-sm text-[var(--ink-muted)]">
                  {t("youAre", {
                    role: currentRole,
                    points: ROLE_POINTS[currentRole],
                  })}
                </span>
              </>
            ) : (
              <span className="text-[var(--ink-muted)] text-lg">
                {t("tapReveal")}
              </span>
            )}
          </button>

          <button
            type="button"
            className="btn-primary"
            disabled={!chitVisible}
            onClick={onSeenAndPass}
          >
            {t("seenPass")}
          </button>
        </section>
      )}

      {state.phase === "rajaOrders" && (
        <section className="flex flex-col gap-4 text-center animate-fade-up">
          <p className="text-sm uppercase tracking-widest text-[var(--ink-muted)]">
            {t("rajaEyebrow")}
          </p>
          <p className="text-xl sm:text-2xl font-semibold text-[var(--ink)] leading-snug">
            {t("rajaLine", {
              raja: raja?.name ?? "?",
              mantri: mantri?.name ?? "?",
            })}
          </p>
          <div className="flex justify-center gap-2">
            <RoleChip role="Raja" />
            <RoleChip role="Mantri" />
          </div>
          <button type="button" className="btn-primary" onClick={onConfirmRaja}>
            {t("rajaCta")}
          </button>
        </section>
      )}

      {needsMantriHandoff && !handoffUnlocked && mantri && (
        <HandoffGate playerName={mantri.name} onUnlock={onUnlockHandoff} />
      )}

      {state.phase === "mantriGuess" &&
        (mantri?.isBot || handoffUnlocked) && (
          <section className="flex flex-col gap-4 text-center animate-fade-up">
            <p className="turn-banner">
              {mantri?.isBot
                ? t("botThinking", { name: mantri.name })
                : t("mantriAsk", { name: mantri?.name ?? "?" })}
            </p>

            {!mantri?.isBot && (
              <div className="grid grid-cols-1 gap-3">
                {candidates.map((id) => {
                  const player = state.players.find((p) => p.id === id)!;
                  return (
                    <button
                      key={id}
                      type="button"
                      className="btn-guess"
                      onClick={() => onGuess(id)}
                    >
                      {player.name}
                    </button>
                  );
                })}
              </div>
            )}

            {mantri?.isBot && (
              <div className="h-12 flex items-center justify-center">
                <span className="bot-pulse" aria-hidden />
              </div>
            )}
          </section>
        )}
    </div>
  );
}
