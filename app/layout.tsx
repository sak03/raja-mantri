import type { Metadata, Viewport } from "next";
import { Fraunces, Noto_Sans_Devanagari, Source_Sans_3 } from "next/font/google";
import { JsonLd } from "@/components/JsonLd";
import { Providers } from "@/components/Providers";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import {
  SEO,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from "@/lib/seo";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const sans = Source_Sans_3({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const hindi = Noto_Sans_Devanagari({
  variable: "--font-hindi",
  subsets: ["devanagari"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SEO.title,
    template: SEO.titleTemplate,
  },
  description: SEO.description,
  keywords: [...SEO.keywords],
  authors: [{ name: SEO.author, url: "https://sartajalam.in" }],
  creator: SEO.author,
  publisher: SEO.author,
  applicationName: SITE_NAME,
  category: "games",
  classification: "Indian parlour / chits game",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-icon", type: "image/png", sizes: "180x180" }],
    shortcut: ["/favicon.svg"],
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-IN": "/",
      "hi-IN": "/",
      "x-default": "/",
    },
  },
  openGraph: {
    type: "website",
    url: absoluteUrl("/"),
    siteName: `${SITE_NAME} | Raja Mantri Chor Sipahi`,
    title: "Raja Mantri Chor Sipahi Game Online Free",
    description: SEO.description,
    locale: SEO.locale,
    alternateLocale: [SEO.alternateLocale],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raja Mantri Chor Sipahi — Play Free Online",
    description:
      "Free pass-the-phone Raja Mantri Chor Sipahi (राजा मंत्री चोर सिपाही). Hindi & English. No download.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f5c5c" },
    { media: "(prefers-color-scheme: dark)", color: "#121a19" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const themeInitScript = `
(function(){
  try {
    var raw = localStorage.getItem('rmcs:theme');
    var theme = 'light';
    if (raw) {
      try { var p = JSON.parse(raw); if (p === 'dark' || p === 'light') theme = p; }
      catch (e) { if (raw === 'dark' || raw === 'light') theme = raw; }
    }
    var root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle('dark', theme === 'dark');
  } catch (e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-IN"
      data-theme="light"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${hindi.variable} h-full`}
    >
      <head>
        <link rel="alternate" hrefLang="en-IN" href={absoluteUrl("/")} />
        <link rel="alternate" hrefLang="hi-IN" href={absoluteUrl("/")} />
        <link rel="alternate" hrefLang="x-default" href={absoluteUrl("/")} />
        <meta name="geo.region" content="IN" />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="antialiased">
        <JsonLd />
        <div className="atmosphere" aria-hidden />
        <Providers>
          <SiteHeader />
          <div className="app-shell">{children}</div>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  );
}
