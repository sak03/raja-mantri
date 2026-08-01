"use client";

import Link from "next/link";
import { PageShell } from "./PageShell";
import { useLocale } from "./LocaleProvider";

export function HowToPlayContent() {
  const { t, locale } = useLocale();

  if (locale === "hi") {
    return (
      <PageShell title={t("navHowToPlay")}>
        <p>
          <strong>{t("brand")}</strong> क्लासिक भारतीय चिट / पर्ची खेल है। एक
          फ़ोन पर १–४ लोग खेल सकते हैं; बाकी सीटें बॉट भरते हैं।
        </p>
        <h2>चरण</h2>
        <ol>
          <li>{t("howStep1")}</li>
          <li>{t("howStep2")}</li>
          <li>{t("howStep3")}</li>
          <li>{t("howStep4")}</li>
        </ol>
        <h2>अंक</h2>
        <p>{t("pointsStrip")}</p>
        <h2>पास-द-फ़ोन</h2>
        <p>
          हर खिलाड़ी की बारी पर फ़ोन उसे दें। सिर्फ वही अपनी चिट देखे। देखने के
          बाद “मैंने देख लिया” दबाएँ और फ़ोन आगे दें।
        </p>
        <p>
          <Link href="/" className="legal-cta">
            {t("backToGame")}
          </Link>
        </p>
      </PageShell>
    );
  }

  return (
    <PageShell title={t("navHowToPlay")}>
      <p>
        <strong>{t("brand")}</strong> is the classic Indian chits / parchi game.
        Play with 1–4 people on one phone; bots fill empty seats.
      </p>
      <h2>Steps</h2>
      <ol>
        <li>{t("howStep1")}</li>
        <li>{t("howStep2")}</li>
        <li>{t("howStep3")}</li>
        <li>{t("howStep4")}</li>
      </ol>
      <h2>Points</h2>
      <p>{t("pointsStrip")}</p>
      <h2>Pass the phone</h2>
      <p>
        When it is someone&apos;s turn, hand them the phone. Only they should
        look at their chit. After peeking, tap “I have seen it” and pass the
        phone to the next player.
      </p>
      <h2>Winning</h2>
      <p>
        Points add up each round. The first player to reach the target score
        wins. If two players hit the target with the same score, they share the
        win.
      </p>
      <p>
        <Link href="/" className="legal-cta">
          {t("backToGame")}
        </Link>
      </p>
    </PageShell>
  );
}
