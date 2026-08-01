"use client";

import { useLocale } from "./LocaleProvider";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { t } = useLocale();

  return (
    <div
      className="theme-toggle"
      role="group"
      aria-label={t("themeToggleAria")}
    >
      <button
        type="button"
        className={theme === "light" ? "lang-btn lang-btn-active" : "lang-btn"}
        aria-pressed={theme === "light"}
        onClick={() => setTheme("light")}
      >
        {t("themeLight")}
      </button>
      <button
        type="button"
        className={theme === "dark" ? "lang-btn lang-btn-active" : "lang-btn"}
        aria-pressed={theme === "dark"}
        onClick={() => setTheme("dark")}
      >
        {t("themeDark")}
      </button>
    </div>
  );
}
