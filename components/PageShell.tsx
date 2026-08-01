"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { useLocale } from "./LocaleProvider";

interface PageShellProps {
  title: string;
  children: ReactNode;
}

export function PageShell({ title, children }: PageShellProps) {
  const { t } = useLocale();

  return (
    <article className="legal-page animate-fade-up">
      <Link href="/" className="legal-back">
        ← {t("backToGame")}
      </Link>
      <h1 className="legal-title">{title}</h1>
      <p className="legal-updated">{t("legalUpdated")}</p>
      <div className="legal-body">{children}</div>
    </article>
  );
}
