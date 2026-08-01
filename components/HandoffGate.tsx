"use client";

import { useLocale } from "./LocaleProvider";

interface HandoffGateProps {
  playerName: string;
  onUnlock: () => void;
}

export function HandoffGate({ playerName, onUnlock }: HandoffGateProps) {
  const { t } = useLocale();

  return (
    <section className="handoff-panel animate-fade-up" aria-live="polite">
      <p className="text-sm font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
        {t("handoffOnly", { name: playerName })}
      </p>
      <h2 className="handoff-name">{t("handoffTitle", { name: playerName })}</h2>
      <button type="button" className="btn-primary max-w-xs" onClick={onUnlock}>
        {t("handoffUnlock", { name: playerName })}
      </button>
    </section>
  );
}
