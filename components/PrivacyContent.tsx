"use client";

import { PageShell } from "./PageShell";
import { useLocale } from "./LocaleProvider";

export function PrivacyContent() {
  const { t, locale } = useLocale();

  if (locale === "hi") {
    return (
      <PageShell title={t("navPrivacy")}>
        <p>
          यह गोपनीयता नीति <strong>{t("brand")}</strong> वेब गेम पर लागू होती है।
        </p>
        <h2>हम कौन सा डेटा रखते हैं?</h2>
        <p>
          यह गेम मुख्य रूप से आपके ब्राउज़र में ही चलता है। खेल की स्थिति, भाषा,
          थीम और मैच इतिहास <strong>localStorage</strong> में आपके डिवाइस पर
          सहेजे जाते हैं। कोई खाता या लॉगिन नहीं है।
        </p>
        <h2>सर्वर / खाते</h2>
        <p>
          हम खिलाड़ियों के नाम या स्कोर का कोई केंद्रीय डेटाबेस नहीं रखते। खेल
          ऑफलाइन-फर्स्ट, क्लाइंट-साइड है।
        </p>
        <h2>कुकीज़ व एनालिटिक्स</h2>
        <p>
          इस ऐप का कोर गेमप्ले तीसरे पक्ष की ट्रैकिंग पर निर्भर नहीं करता। यदि
          होस्टिंग प्रदाता मानक लॉग रखता है (जैसे IP, यूज़र-एजेंट), वे उनके
          नियमों के अधीन हैं।
        </p>
        <h2>बच्चों की गोपनीयता</h2>
        <p>
          यह एक पारिवारिक मनोरंजन गेम है। जानबूझकर बच्चों से व्यक्तिगत जानकारी
          एकत्र नहीं की जाती।
        </p>
        <h2>संपर्क</h2>
        <p>
          प्रश्न हों तो{" "}
          <a
            href="https://sartajalam.in"
            target="_blank"
            rel="noopener noreferrer"
          >
            sartajalam.in
          </a>{" "}
          पर संपर्क करें।
        </p>
      </PageShell>
    );
  }

  return (
    <PageShell title={t("navPrivacy")}>
      <p>
        This Privacy Policy applies to the <strong>{t("brand")}</strong> web
        game.
      </p>
      <h2>What data do we store?</h2>
      <p>
        The game runs in your browser. Game progress, language preference,
        theme preference, and match history are saved in{" "}
        <strong>localStorage</strong> on your device. There are no accounts and
        no login.
      </p>
      <h2>Servers and accounts</h2>
      <p>
        We do not operate a central database of player names or scores. Gameplay
        is client-side. Clearing your browser storage deletes local game data.
      </p>
      <h2>Cookies and analytics</h2>
      <p>
        Core gameplay does not require third-party tracking cookies. Your
        hosting provider may keep standard server logs (such as IP address and
        user-agent) under their own policies.
      </p>
      <h2>Children&apos;s privacy</h2>
      <p>
        This is a family parlour game. We do not knowingly collect personal
        information from children.
      </p>
      <h2>Contact</h2>
      <p>
        Questions? Visit{" "}
        <a
          href="https://sartajalam.in"
          target="_blank"
          rel="noopener noreferrer"
        >
          sartajalam.in
        </a>
        .
      </p>
    </PageShell>
  );
}
