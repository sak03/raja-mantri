import type { Metadata } from "next";
import { PrivacyContent } from "@/components/PrivacyContent";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Raja, Mantri & Sipahi — how this free browser game handles data, localStorage, and analytics.",
  alternates: { canonical: "/privacy" },
  openGraph: {
    title: "Privacy Policy | Raja Mantri Chor Sipahi",
    url: absoluteUrl("/privacy"),
  },
};

export default function PrivacyPage() {
  return <PrivacyContent />;
}
