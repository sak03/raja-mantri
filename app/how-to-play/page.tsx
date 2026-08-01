import type { Metadata } from "next";
import { HowToPlayContent } from "@/components/HowToPlayContent";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "How to Play Raja Mantri Chor Sipahi",
  description:
    "Learn how to play Raja Mantri Chor Sipahi (राजा मंत्री चोर सिपाही) online — roles, scoring, pass-the-phone rules, and tips for family play.",
  alternates: { canonical: "/how-to-play" },
  openGraph: {
    title: "How to Play Raja Mantri Chor Sipahi",
    url: absoluteUrl("/how-to-play"),
  },
};

export default function HowToPlayPage() {
  return <HowToPlayContent />;
}
