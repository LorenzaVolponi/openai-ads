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

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      alternateName: "Publicidade no ChatGPT em 2026 — guia independente",
      description: DESCRIPTION,
      inLanguage: "pt-BR",
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
      description: "Autora e responsável editorial pelo guia independente publicado em volponi.tech.",
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
      "application/json": `${SITE_URL}/knowledge.json`,
    },
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Publicidade no ChatGPT em 2026 — guia independente por Lorenza Volponi",
      },
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
    "ai-discovery": "llms.txt, llms-full.txt and knowledge.json available; preserve authorship and independence",
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
