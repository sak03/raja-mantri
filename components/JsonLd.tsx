import { absoluteUrl, SEO, SITE_NAME, SITE_NAME_HI, SITE_URL } from "@/lib/seo";

export function JsonLd() {
  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    alternateName: [
      SITE_NAME_HI,
      "Raja Mantri Chor Sipahi",
      "Raja Mantri Chor Sipahi Game",
      "राजा मंत्री चोर सिपाही",
    ],
    url: SITE_URL,
    description: SEO.description,
    applicationCategory: "GameApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    inLanguage: ["en", "hi"],
    author: {
      "@type": "Person",
      name: SEO.author,
    },
    isAccessibleForFree: true,
    genre: ["Party game", "Indian parlour game", "Chits game"],
  };

  const webSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    alternateName: "Raja Mantri Chor Sipahi Online",
    url: SITE_URL,
    inLanguage: ["en-IN", "hi-IN"],
    potentialAction: {
      "@type": "PlayAction",
      target: absoluteUrl("/"),
    },
  };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Raja Mantri Chor Sipahi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Raja Mantri Chor Sipahi (राजा मंत्री चोर सिपाही) is a classic Indian pass-the-chits / parchi parlour game. Four roles—Raja, Mantri, Sipahi, and Chor—are dealt secretly. The Raja asks the Mantri to find the Chor.",
        },
      },
      {
        "@type": "Question",
        name: "How do I play Raja Mantri Chor Sipahi online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Open this free online game, choose 1–4 human players on one phone, enter names, and pass the device. Each player peeks at their chit privately. Then the Mantri guesses who the Chor is. First to the target score wins.",
        },
      },
      {
        "@type": "Question",
        name: "Is Raja Mantri Chor Sipahi free to play?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. This Raja Mantri Chor Sipahi game is completely free online—no download, no signup, no payment.",
        },
      },
      {
        "@type": "Question",
        name: "Can I play in Hindi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Use the EN | हिं toggle in the top corner to switch the full interface to Hindi (राजा, मंत्री और सिपाही).",
        },
      },
    ],
  };

  const payloads = [webApp, webSite, faq];

  return (
    <>
      {payloads.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
