import type { Metadata } from "next";
import { TermsContent } from "@/components/TermsContent";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and Conditions for playing Raja, Mantri & Sipahi online — free use, fair play, and liability.",
  alternates: { canonical: "/terms" },
  openGraph: {
    title: "Terms & Conditions | Raja Mantri Chor Sipahi",
    url: absoluteUrl("/terms"),
  },
};

export default function TermsPage() {
  return <TermsContent />;
}
