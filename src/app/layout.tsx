import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { SiteComplianceStrip, SiteWatermark } from "@/components/site-compliance";
import {
  LAST_EDITORIAL_REVIEW_DATE,
  LAST_EDITORIAL_REVIEW_ISO,
  SITE_URL,
} from "@/lib/editorial-meta";
import { socialImageForPath } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_NAME = "volponi.tech";
const AUTHOR = "Lorenza Volponi";
const TITLE = "ChatGPT Ads Brasil 2026: como anunciar, preços e métricas | volponi.tech";
const DESCRIPTION =
  "Aprenda como anunciar no ChatGPT no Brasil em 2026: exemplos oficiais, Ads Manager, CPC/CPM/oCPC, métricas, privacidade e Radar com fontes primárias.";
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION?.trim();
const SOCIAL_IMAGE = socialImageForPath("/");

const globalStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: "ChatGPT Ads no Brasil 2026 — Observatório independente",
      description: DESCRIPTION,
      inLanguage: "pt-BR",
      dateModified: LAST_EDITORIAL_REVIEW_DATE,
      publisher: { "@id": `${SITE_URL}/#author` },
      copyrightHolder: { "@id": `${SITE_URL}/#author` },
      copyrightYear: 2026,
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: AUTHOR,
      url: "https://volponi.tech",
      image: `${SITE_URL}/fox-black.png`,
      description:
        "AI systems strategist, builder e autora do observatório independente sobre ChatGPT Ads publicado por volponi.tech.",
      sameAs: [
        "https://volponi.tech",
        "https://github.com/LorenzaVolponi",
        "https://www.linkedin.com/in/lorenzavolponi",
      ],
      knowsAbout: [
        "Generative Engine Optimization",
        "Search Engine Optimization",
        "Artificial Intelligence",
        "AI systems",
        "ChatGPT Ads",
        "digital strategy",
        "software development",
      ],
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#fafaf8",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "volponi.tech — ChatGPT Ads Intelligence",
  authors: [{ name: AUTHOR, url: "https://volponi.tech" }],
  creator: AUTHOR,
  publisher: SITE_NAME,
  verification: GOOGLE_SITE_VERIFICATION ? { google: GOOGLE_SITE_VERIFICATION } : undefined,
  icons: {
    icon: "/mark-192.png",
    apple: "/mark.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "pt-BR": SITE_URL,
    },
    types: {
      "text/plain": `${SITE_URL}/llms.txt`,
      "application/json": `${SITE_URL}/knowledge.json`,
      "application/rss+xml": `${SITE_URL}/feed.xml`,
      "application/feed+json": `${SITE_URL}/feed.json`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "article",
    locale: "pt_BR",
    publishedTime: "2026-08-24T09:00:00-03:00",
    modifiedTime: LAST_EDITORIAL_REVIEW_ISO,
    section: "Inteligência Artificial e Publicidade",
    authors: [AUTHOR],
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "ChatGPT Ads Brasil 2026 — como anunciar, preços e métricas por volponi.tech",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT Ads Brasil 2026: como anunciar, preços e métricas",
    description: "Exemplos oficiais, Ads Manager, CPC/CPM/oCPC, métricas e Radar com fontes primárias.",
    images: [SOCIAL_IMAGE],
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
  category: "marketing digital e inteligência artificial",
  other: {
    author: AUTHOR,
    "dc.creator": AUTHOR,
    "dc.title": TITLE,
    "dcterms.modified": LAST_EDITORIAL_REVIEW_DATE,
    "content-status": "independent editorial observatory; facts reviewed against primary sources",
    "independence-disclosure": "not affiliated with, sponsored by, endorsed by, certified by, operated by, or maintained by OpenAI",
    "ai-discovery": "llms.txt, llms-full.txt and knowledge.json available; preserve Lorenza Volponi authorship and independence",
    "radar-feed": `${SITE_URL}/feed.xml`,
    "radar-feed-json": `${SITE_URL}/feed.json`,
    "open-data-json": `${SITE_URL}/data/chatgpt-ads-markets.json`,
    "open-data-csv": `${SITE_URL}/data/chatgpt-ads-markets.csv`,
    "press-room": `${SITE_URL}/imprensa`,
    "last-reviewed": LAST_EDITORIAL_REVIEW_DATE,
    "source-monitoring": "official-source changes are monitored; publication remains editorially reviewed",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(globalStructuredData).replace(/</g, "\\u003c"),
          }}
        />
        <SiteWatermark />
        {children}
        <SiteComplianceStrip />
      </body>
    </html>
  );
}
