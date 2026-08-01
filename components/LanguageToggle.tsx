"use client";

import { useLocale } from "./LocaleProvider";

export function LanguageToggle() {
  const { locale, setLocale, t } = useLocale();

  return (
    <div className="lang-toggle" role="group" aria-label={t("langToggleAria")}>
      <button
        type="button"
        className={locale === "en" ? "lang-btn lang-btn-active" : "lang-btn"}
        aria-pressed={locale === "en"}
        onClick={() => setLocale("en")}
      >
        {t("langEn")}
      </button>
      <button
        type="button"
        className={locale === "hi" ? "lang-btn lang-btn-active" : "lang-btn"}
        aria-pressed={locale === "hi"}
        onClick={() => setLocale("hi")}
      >
        {t("langHi")}
      </button>
    </div>
  );
}
