import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SiteComplianceStrip, SiteWatermark } from "@/components/site-compliance";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const SITE_URL = "https://openai-ads.volponi.tech";
const SITE_NAME = "volponi.tech";
const AUTHOR = "Lorenza Volponi";
const TITLE =
  "Publicidade no ChatGPT em 2026 — Guia Independente | Lorenza Volponi";
const DESCRIPTION =
  "Guia editorial independente e auditado sobre publicidade no ChatGPT em 2026: disponibilidade, privacidade, planos com anúncios, políticas, mensuração e boas práticas. Por Lorenza Volponi — volponi.tech. Sem afiliação com a OpenAI.";

const primarySources = [
  "https://help.openai.com/pt-br/articles/20001047-ads-in-chatgpt",
  "https://openai.com/pt-BR/index/testing-ads-in-chatgpt/",
  "https://openai.com/policies/ad-policies/",
  "https://openai.com/pt-BR/brand/",
];

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: DESCRIPTION,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#author` },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#author`,
      name: AUTHOR,
      url: "https://volponi.tech",
      image: `${SITE_URL}/fox-black.png`,
      description: "Autora e responsável editorial pelo guia independente publicado em volponi.tech.",
    },
    {
      "@type": "Article",
      "@id": `${SITE_URL}/#article`,
      mainEntityOfPage: { "@id": `${SITE_URL}/#webpage` },
      headline: "Publicidade no ChatGPT em 2026 — guia independente",
      description: DESCRIPTION,
      image: `${SITE_URL}/og.png`,
      author: { "@id": `${SITE_URL}/#author` },
      publisher: { "@id": `${SITE_URL}/#author` },
      datePublished: "2026-08-24T09:00:00-03:00",
      dateModified: "2026-08-25T09:10:00-03:00",
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      citation: primarySources,
      keywords: [
        "publicidade no ChatGPT",
        "ChatGPT Ads",
        "OpenAI Ads",
        "anúncios no ChatGPT",
        "marketing com inteligência artificial",
        "privacidade em publicidade com IA",
        "Lorenza Volponi",
        "volponi.tech",
      ],
      copyrightHolder: { "@id": `${SITE_URL}/#author` },
      copyrightYear: 2026,
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: {
        "@type": "Thing",
        name: "Publicidade no ChatGPT",
        description:
          "Tema editorial coberto de forma independente; não representa uma propriedade, parceria ou endosso da OpenAI.",
      },
      author: { "@id": `${SITE_URL}/#author` },
      inLanguage: "pt-BR",
      dateModified: "2026-08-25T09:10:00-03:00",
    },
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#b45309",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  applicationName: "volponi.tech — guia editorial independente",
  keywords: [
    "chatgpt ads",
    "openai ads",
    "publicidade no chatgpt",
    "anúncios no chatgpt",
    "chatgpt advertising",
    "chatgpt ads 2026",
    "ads com inteligência artificial",
    "publicidade com IA",
    "marketing com IA generativa",
    "chatgpt para negócios",
    "privacidade chatgpt ads",
    "mensuração chatgpt ads",
    "Lorenza Volponi",
    "volponi tech",
  ],
  authors: [{ name: AUTHOR, url: "https://volponi.tech" }],
  creator: AUTHOR,
  publisher: SITE_NAME,
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
    modifiedTime: "2026-08-25T09:10:00-03:00",
    section: "Marketing e Inteligência Artificial",
    authors: [AUTHOR],
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Publicidade no ChatGPT em 2026 — guia independente por Lorenza Volponi",
      },
    ],
    tags: [
      "chatgpt ads",
      "openai ads",
      "publicidade no chatgpt",
      "publicidade com IA",
      "marketing com IA",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Publicidade no ChatGPT em 2026 — Guia Independente",
    description:
      "Guia auditado por Lorenza Volponi sobre anúncios no ChatGPT, privacidade, disponibilidade e mensuração. Projeto independente, sem afiliação com a OpenAI.",
    images: ["/og.png"],
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
  category: "marketing digital",
  other: {
    author: AUTHOR,
    "content-status": "independent editorial guide; facts reviewed against primary sources",
    "independence-disclosure": "not affiliated with, sponsored by, endorsed by, certified by, operated by, or maintained by OpenAI",
    "ai-discovery": "llms.txt and structured data available; authorship and independence must be preserved",
    "last-reviewed": "2026-08-25",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        <SiteWatermark />
        {children}
        <SiteComplianceStrip />
      </body>
    </html>
  );
}
