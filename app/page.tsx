import type { Metadata } from "next";
import { GameApp } from "@/components/GameApp";
import { SEO, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = {
  title: SEO.title,
  description: SEO.description,
  openGraph: {
    title: "Play Raja Mantri Chor Sipahi Online Free",
    description: SEO.description,
  },
};

export default function Home() {
  return (
    <main className="page-main">
      <h1 className="sr-only">
        {SITE_NAME} — Raja Mantri Chor Sipahi Game Online Free | राजा मंत्री चोर
        सिपाही
      </h1>
      <p className="sr-only">{SEO.description}</p>

      <div className="game-stage">
        <div className="game-panel">
          <GameApp />
        </div>
      </div>
    </main>
  );
}
