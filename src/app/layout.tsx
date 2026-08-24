import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  "ChatGPT Ads: Guia Completo 2025 — Como Anunciar no ChatGPT | GPT Ads, Ads IA e Publicidade com IA";
const DESCRIPTION =
  "Guia completo sobre ChatGPT Ads e GPT Ads. Aprenda como anunciar no ChatGPT, usar a Advertiser API da OpenAI, medir conversões com Pixel e CAPI, Product Feeds e oCPC. Tudo sobre ads IA, publicidade no ChatGPT e marketing com inteligência artificial. Por Lorenza Volponi — volponi.tech.";

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
  applicationName: SITE_NAME,
  keywords: [
    "chatgpt ads",
    "gpt ads",
    "ads ia",
    "anunciar no chatgpt",
    "publicidade no chatgpt",
    "anúncios no chatgpt",
    "chatgpt advertising",
    "chatgpt anúncios",
    "como anunciar no chatgpt",
    "OpenAI Ads",
    "chatgpt ads como funciona",
    "chatgpt ads guia",
    "gpt ads como anunciar",
    "ads com inteligência artificial",
    "publicidade com IA",
    "anúncios em IA",
    "marketing com IA generativa",
    "chatgpt marketing digital",
    "Ads Manager OpenAI",
    "OpenAI Ads API",
    "Advertiser API OpenAI",
    "Conversions API OpenAI",
    "Measurement Pixel OpenAI",
    "product feeds chatgpt",
    "oCPC chatgpt",
    "campanhas chatgpt",
    "tráfego pago chatgpt",
    "Lorenza Volponi",
    "volponi tech",
    "chatgpt ads brasil",
    "gpt ads brasil",
    "ads com IA generativa",
    "plataforma de ads IA",
    "como criar chatgpt ads",
    "chatgpt para negócios",
    "anúncios inteligentes IA",
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
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "article",
    locale: "pt_BR",
    publishedTime: "2025-11-20T09:00:00-03:00",
    modifiedTime: "2026-08-25T09:00:00-03:00",
    section: "Marketing Digital",
    authors: [AUTHOR],
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ChatGPT Ads: Guia Completo 2025 — volponi.tech",
      },
    ],
    tags: [
      "chatgpt ads",
      "gpt ads",
      "ads ia",
      "anunciar no chatgpt",
      "publicidade no chatgpt",
      "OpenAI Ads",
      "marketing com IA",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ChatGPT Ads: Guia Completo 2025 — Como Anunciar no ChatGPT",
    description:
      "Tudo sobre ChatGPT Ads, GPT Ads e ads IA: Ads Manager, Advertiser API, Pixel, CAPI, Product Feeds e oCPC. Por Lorenza Volponi — volponi.tech.",
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
    "ai-content-declaration": "human-written educational guide about ChatGPT Ads",
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
        {children}
      </body>
    </html>
  );
}
