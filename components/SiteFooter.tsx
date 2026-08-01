"use client";

import Link from "next/link";
import { BrandLogo } from "./BrandLogo";
import { useLocale } from "./LocaleProvider";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-col footer-brand">
          <Link href="/" className="footer-brand-link">
            <BrandLogo size={28} title={t("brand")} />
            <span>{t("brand")}</span>
          </Link>
          <p className="footer-tagline">{t("setupSubtitle")}</p>
        </div>

        <nav className="footer-col footer-links" aria-label="Footer">
          <Link href="/how-to-play">{t("navHowToPlay")}</Link>
          <Link href="/privacy">{t("navPrivacy")}</Link>
          <Link href="/terms">{t("navTerms")}</Link>
        </nav>

        <div className="footer-col footer-credit">
          <p className="footer-credit-label">{t("maintainedBy")}</p>
          <a
            href="https://sartajalam.in"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-credit-link"
          >
            Sartaj Alam
          </a>
        </div>
      </div>
    </footer>
  );
}
