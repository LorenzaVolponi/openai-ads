import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Database, ShieldCheck } from "lucide-react";

import { MarketExplorer } from "@/components/market-explorer";
import { SemanticRelatedLinks } from "@/components/semantic-related-links";
import { AUTHOR_ID, PUBLISHER_ID, SITE_URL, mediaAuthorStructuredData, publisherStructuredData } from "@/lib/media-authority";
import { marketStates, RADAR_CHECKED_AT, RADAR_SOURCES } from "@/lib/radar-data";
import { socialImageForPath } from "@/lib/seo";

const URL = `${SITE_URL}/chatgpt-ads-market`;
const SOCIAL_IMAGE = socialImageForPath("/chatgpt-ads-market");
const available = marketStates.filter((market) => market.adsManager === "Available").length;
const comingSoon = marketStates.filter((market) => market.adsManager === "Coming Soon").length;

export const metadata: Metadata = {
  title: "ChatGPT Ads Market Snapshot: países e disponibilidade do Ads Manager",
  description: "Mapa auditável dos mercados do ChatGPT Ads e do Ads Manager: países disponíveis, coming soon, fonte oficial e data de revisão.",
  authors: [{ name: "Lorenza Volponi", url: `${SITE_URL}/en/lorenza-volponi` }],
  alternates: { canonical: URL },
  openGraph: {
    title: "ChatGPT Ads Market Snapshot",
    description: "Disponibilidade por país, fonte oficial e data de revisão em um mapa auditável.",
    url: URL,
    type: "website",
    images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "ChatGPT Ads Market Snapshot por Lorenza Volponi / volponi.tech" }],
  },
  twitter: { card: "summary_large_image", title: "ChatGPT Ads Market Snapshot", description: "Mercados disponíveis e coming soon com fonte oficial.", images: [SOCIAL_IMAGE] },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Dataset", "CollectionPage"],
      "@id": `${URL}#dataset`,
      name: "ChatGPT Ads Market Snapshot",
      description: "Snapshot editorial independente da disponibilidade do Ads Manager por mercado.",
      url: URL,
      inLanguage: "pt-BR",
      dateModified: `${RADAR_CHECKED_AT}T12:00:00Z`,
      creator: { "@id": AUTHOR_ID },
      author: { "@id": AUTHOR_ID },
      publisher: { "@id": PUBLISHER_ID },
      isAccessibleForFree: true,
      about: ["ChatGPT Ads", "OpenAI Ads Manager", "market availability", "AI advertising", "conversational advertising"],
      subjectOf: [{ "@type": "Dataset", url: `${SITE_URL}/en/volponi-ai-index`, name: "Volponi AI Index — AI Advertising & Discovery Readiness" }],
      distribution: [
        { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${SITE_URL}/data/chatgpt-ads-markets.json` },
        { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${SITE_URL}/data/chatgpt-ads-markets.csv` },
      ],
      citation: RADAR_SOURCES.availability.url,
    },
    mediaAuthorStructuredData,
    publisherStructuredData,
  ],
};

export default function MarketSnapshotPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className="border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><ArrowLeft className="h-4 w-4" /> Observatório</Link>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">OpenAI Ads Intelligence</span>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600"><Database className="h-3.5 w-3.5" /> Market Snapshot · {RADAR_CHECKED_AT}</div>
          <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-[0.94] tracking-[-0.05em] md:text-8xl">Onde o ChatGPT Ads está operacional — e onde ainda não está.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600">Uma fotografia auditável da disponibilidade do Ads Manager. Status de mercado não é garantia de acesso para toda conta, inventário, volume ou performance.</p>
          <p className="mt-4 text-sm font-semibold text-zinc-500">Pesquisa e curadoria editorial: Lorenza Volponi · volponi.tech.</p>

          <div className="mt-10 grid max-w-2xl grid-cols-2 gap-3">
            <div className="rounded-3xl bg-zinc-950 p-6 text-white"><p className="text-5xl font-black">{available}</p><p className="mt-2 text-sm text-zinc-400">mercados Available</p></div>
            <div className="rounded-3xl border border-zinc-200 bg-[#fafaf8] p-6"><p className="text-5xl font-black">{comingSoon}</p><p className="mt-2 text-sm text-zinc-500">mercados Coming Soon</p></div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3 text-xs font-bold">
            <a href="/data/chatgpt-ads-markets.json" className="rounded-full border border-zinc-300 bg-white px-4 py-2">JSON</a>
            <a href="/data/chatgpt-ads-markets.csv" className="rounded-full border border-zinc-300 bg-white px-4 py-2">CSV</a>
            <Link href="/en/volponi-ai-index" className="rounded-full border border-zinc-300 bg-white px-4 py-2">Volponi AI Index</Link>
            <a href={RADAR_SOURCES.availability.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-4 py-2">Fonte oficial <ArrowUpRight className="h-3.5 w-3.5" /></a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
        <MarketExplorer />
      </section>

      <SemanticRelatedLinks currentPath="/chatgpt-ads-market" language="pt-BR" limit={5} />

      <section className="border-t border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 md:px-6 lg:grid-cols-[auto_1fr] lg:items-start">
          <ShieldCheck className="h-7 w-7" />
          <div>
            <h2 className="text-xl font-black">Limite editorial</h2>
            <p className="mt-2 max-w-4xl text-sm leading-6 text-zinc-600">Este mapa reproduz um snapshot de fonte primária na data indicada. Mudanças posteriores podem ainda não estar refletidas. Confirme a superfície oficial e a própria conta antes de decisão operacional de mídia.</p>
            <p className="mt-3 text-xs leading-5 text-zinc-500">Projeto independente de Lorenza Volponi / volponi.tech. Não afiliado, patrocinado, endossado, certificado, operado ou mantido pela OpenAI.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
