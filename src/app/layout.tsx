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
  "ChatGPT Ads 2026 — Guia Independente sobre Publicidade no ChatGPT | volponi.tech";
const DESCRIPTION =
  "Guia independente e atualizado em 2026 sobre publicidade no ChatGPT: como os anúncios são apresentados, privacidade, planos com anúncios, fundamentos de campanha, mensuração e boas práticas. Por Lorenza Volponi — volponi.tech.";

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
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "article",
    locale: "pt_BR",
    publishedTime: "2026-08-24T09:00:00-03:00",
    modifiedTime: "2026-08-24T17:55:00-03:00",
    section: "Marketing e Inteligência Artificial",
    authors: [AUTHOR],
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "ChatGPT Ads 2026 — guia independente da volponi.tech",
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
    title: "ChatGPT Ads 2026 — Guia Independente",
    description:
      "Publicidade no ChatGPT em 2026: fundamentos, privacidade, mensuração e boas práticas, sem confundir hipótese com recurso oficial.",
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
    "content-status": "independent educational guide; verify product availability in official OpenAI surfaces",
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
