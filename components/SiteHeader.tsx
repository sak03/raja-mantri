"use client";

import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { LanguageToggle } from "./LanguageToggle";
import { useLocale } from "./LocaleProvider";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  const { t } = useLocale();

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="site-brand" aria-label={t("brand")}>
          <BrandLogo size={34} className="site-brand-logo" title={t("brand")} />
          <span className="site-brand-text">
            <span className="site-brand-full">{t("brand")}</span>
            <span className="site-brand-short" aria-hidden>
              {t("brandShort")}
            </span>
          </span>
        </Link>
        <div className="site-header-controls">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
