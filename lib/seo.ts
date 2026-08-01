/**
 * Site URL used for canonical, Open Graph, sitemap, and JSON-LD.
 * Override with NEXT_PUBLIC_SITE_URL when deploying (e.g. https://raja-mantri.sartajalam.in).
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://raja-mantri.sartajalam.in"
).replace(/\/$/, "");

export const SITE_NAME = "Raja, Mantri & Sipahi";
export const SITE_NAME_HI = "राजा, मंत्री और सिपाही";

export const SEO = {
  title: "Raja Mantri Chor Sipahi Game Online Free | Raja, Mantri & Sipahi",
  titleTemplate: "%s | Raja Mantri Chor Sipahi",
  description:
    "Play Raja Mantri Chor Sipahi (राजा मंत्री चोर सिपाही) free online — pass-and-phone chits / parchi game for family. 1–4 players, Hindi & English, no download. Classic Indian parlour game with Raja, Mantri, Sipahi & Chor.",
  keywords: [
    "raja mantri chor sipahi",
    "raja mantri chor sipahi game",
    "raja mantri chor sipahi online",
    "raja mantri sipahi",
    "raja mantri game",
    "राजा मंत्री चोर सिपाही",
    "राजा मंत्री चोर सिपाही खेल",
    "राजा मंत्री और सिपाही",
    "chor sipahi game",
    "indian chits game",
    "parchi game",
    "pass the phone game",
    "family game india",
    "ghar ka khel",
    "raja mantri online free",
    "play raja mantri chor sipahi",
  ],
  locale: "en_IN",
  alternateLocale: "hi_IN",
  author: "Sartaj Alam",
  twitterHandle: "",
} as const;

export function absoluteUrl(path = "/"): string {
  if (!path.startsWith("/")) return `${SITE_URL}/${path}`;
  return `${SITE_URL}${path}`;
}
