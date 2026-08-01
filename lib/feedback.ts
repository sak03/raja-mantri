export interface RevealFeedbackDeps {
  vibrate?: (pattern: number | number[]) => boolean;
  beep?: () => void;
}

/**
 * Optional tactile/audio feedback on chit reveal.
 * Feature-detected; never throws.
 */
export function playRevealFeedback(deps: RevealFeedbackDeps = {}): void {
  try {
    const vibrate =
      deps.vibrate ??
      (typeof navigator !== "undefined" &&
      typeof navigator.vibrate === "function"
        ? navigator.vibrate.bind(navigator)
        : undefined);

    vibrate?.(12);
    deps.beep?.();
  } catch {
    // progressive enhancement — ignore
  }
}
