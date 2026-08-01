"use client";

import type { Phase } from "@/lib/types";
import { useLocale } from "./LocaleProvider";

interface StepProgressProps {
  phase: Phase;
}

const ORDER = ["revealChits", "rajaOrders", "mantriGuess", "roundResult"] as const;

export function StepProgress({ phase }: StepProgressProps) {
  const { t } = useLocale();
  const labels = [
    t("stepChit"),
    t("stepRaja"),
    t("stepMantri"),
    t("stepResult"),
  ];

  let activeIndex = ORDER.indexOf(phase as (typeof ORDER)[number]);
  if (phase === "gameOver") activeIndex = 3;
  if (activeIndex < 0) activeIndex = 0;

  return (
    <ol className="step-progress" aria-label="Round progress">
      {labels.map((label, i) => {
        const cls =
          i < activeIndex
            ? "step-item step-item-done"
            : i === activeIndex
              ? "step-item step-item-active"
              : "step-item";
        return (
          <li key={label} className={cls}>
            {label}
          </li>
        );
      })}
    </ol>
  );
}
