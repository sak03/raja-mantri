"use client";

import { PageShell } from "./PageShell";
import { useLocale } from "./LocaleProvider";

export function TermsContent() {
  const { t, locale } = useLocale();

  if (locale === "hi") {
    return (
      <PageShell title={t("navTerms")}>
        <p>
          <strong>{t("brand")}</strong> खेलने से आप इन नियमों से सहमत होते हैं।
        </p>
        <h2>उपयोग</h2>
        <p>
          यह गेम व्यक्तिगत, गैर-व्यावसायिक मनोरंजन के लिए मुफ़्त उपलब्ध है। आप
          गेम को गलत तरीके से तोड़ने, स्पैम करने या नुकसान पहुँचाने का प्रयास न
          करें।
        </p>
        <h2>कोई दाँव नहीं</h2>
        <p>
          यह केवल मनोरंजन है। कोई वास्तविक पैसे, सट्टा या इनाम शामिल नहीं है।
        </p>
        <h2>स्थानीय डेटा</h2>
        <p>
          स्कोर और प्रगति आपके ब्राउज़र में रहती है। डेटा मिटाने या डिवाइस बदलने
          पर प्रगति खो सकती है।
        </p>
        <h2>अस्वीकरण</h2>
        <p>
          गेम “जैसा है” उपलब्ध है। हम निर्बाध उपलब्धता या त्रुटि-मुक्त अनुभव की
          गारंटी नहीं देते।
        </p>
        <h2>संपर्क</h2>
        <p>
          <a
            href="https://sartajalam.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            sartajalam.in
          </a>
        </p>
      </PageShell>
    );
  }

  return (
    <PageShell title={t("navTerms")}>
      <p>
        By playing <strong>{t("brand")}</strong> you agree to these Terms &amp;
        Conditions.
      </p>
      <h2>Use of the game</h2>
      <p>
        This game is provided free for personal, non-commercial entertainment.
        Do not attempt to abuse, spam, or disrupt the service.
      </p>
      <h2>No gambling</h2>
      <p>
        This is a casual parlour game only. There is no real-money betting,
        wagering, or cash prizes.
      </p>
      <h2>Local data</h2>
      <p>
        Scores and progress stay in your browser. Clearing site data or changing
        devices may erase your progress.
      </p>
      <h2>Disclaimer</h2>
      <p>
        The game is provided “as is”. We do not guarantee uninterrupted
        availability or an error-free experience.
      </p>
      <h2>Changes</h2>
      <p>
        We may update these terms from time to time. Continued use means you
        accept the latest version.
      </p>
      <h2>Contact</h2>
      <p>
        <a
          href="https://sartajalam.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          sartajalam.in
        </a>
      </p>
    </PageShell>
  );
}
