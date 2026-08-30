import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Eye, FileCheck2, Radar, SearchCheck, ShieldCheck } from "lucide-react";

import { SITE_URL } from "@/lib/media-authority";
import { RADAR_CHECKED_AT } from "@/lib/radar-data";
import { socialImageForPath } from "@/lib/seo";

const URL = `${SITE_URL}/autoridade`;
const SOCIAL_IMAGE = socialImageForPath("/imprensa");

export const metadata: Metadata = {
  title: "Authority Observatory: evidência, GEO, IA e autoridade verificável | Lorenza Volponi",
  description: "Como Lorenza Volponi e a volponi.tech conectam pesquisa original, fontes primárias, Search Console, Radar, citações verificáveis, GEO e provenance sem fabricar sinais de autoridade.",
  authors: [{ name: "Lorenza Volponi", url: `${SITE_URL}/en/lorenza-volponi` }],
  alternates: { canonical: URL },
  openGraph: { title: "Authority Observatory · Lorenza Volponi / volponi.tech", description: "Autoridade medida por evidência, pesquisa original e sinais verificáveis — não por narrativa.", url: URL, type: "website", images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Authority Observatory Lorenza Volponi" }] },
  twitter: { card: "summary_large_image", title: "Authority Observatory · Lorenza Volponi", description: "Autoridade medida por evidência, não por narrativa.", images: [SOCIAL_IMAGE] },
};

const stages = [
  [Radar, "1. Fonte primária", "Mudanças em superfícies oficiais são detectadas e registradas. Nenhum fato é publicado automaticamente."],
  [FileCheck2, "2. Evidence gate", "A revisão editorial decide se a mudança altera pesquisa, datasets, Radar, feeds ou páginas canônicas."],
  [SearchCheck, "3. Search Console", "Impressões, cliques, CTR e posição média só entram quando vierem da API oficial do Google Search Console."],
  [Eye, "4. Reputation signals", "Backlinks, imprensa, indústria, academia, social e citações por IA só contam quando existe URL ou evidência verificável."],
  [ShieldCheck, "5. Provenance", "Deploy, evidence ledger, source revision, GitHub, CI e attestations preservam o rastro entre afirmação e origem."],
] as const;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebPage",
      "@id": `${URL}#page`,
      url: URL,
      name: "Authority Observatory",
      description: "Pipeline público de autoridade verificável, pesquisa, GEO, evidence architecture e reputation signals.",
      inLanguage: "pt-BR",
      dateModified: `${RADAR_CHECKED_AT}T12:00:00Z`,
      author: { "@id": "https://volponi.tech/#lorenza-volponi" },
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: ["Artificial Intelligence", "GEO", "AI Search", "entity authority", "evidence architecture", "reputation signals"],
      hasPart: [
        { "@type": "Dataset", url: `${SITE_URL}/en/volponi-ai-index`, name: "Volponi AI Index — AI Advertising & Discovery Readiness" },
        { "@type": "CollectionPage", url: `${SITE_URL}/radar`, name: "Volponi ChatGPT Ads Radar" },
      ],
    },
    {
      "@type": "Person",
      "@id": "https://volponi.tech/#lorenza-volponi",
      name: "Lorenza Volponi",
      url: "https://volponi.tech/",
      sameAs: ["https://www.linkedin.com/in/lorenzavolponi", "https://github.com/LorenzaVolponi"],
      knowsAbout: ["AI systems", "AI Product", "UX/UI", "GEO", "AI Search", "evidence architecture", "automation", "ChatGPT Ads"],
    },
  ],
};

export default function AuthorityPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className="border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><ArrowLeft className="h-4 w-4" /> Observatório</Link>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">authority · evidence · citations · GEO</span>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Authority Observatory · Lorenza Volponi</p>
          <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-[0.94] tracking-[-0.05em] md:text-8xl">Autoridade não é uma frase bonita. É uma cadeia de evidências.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600">Pesquisa original, fontes primárias, GEO, AI Search, indexação, backlinks, imprensa e citações só entram no sistema quando existe uma evidência separável e auditável. “Ainda não medido” continua sendo uma resposta válida.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/en/volponi-ai-index" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-black text-white">Volponi AI Index <ArrowUpRight className="h-4 w-4" /></Link>
            <Link href="/authority.json" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 text-sm font-black">Versão para máquinas <ArrowUpRight className="h-4 w-4" /></Link>
            <Link href="/intelligence.json" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 text-sm font-black">Authority graph <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {stages.map(([Icon, title, text]) => (
            <article key={title} className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-white"><Icon className="h-4 w-4" /></span>
              <h2 className="mt-6 text-base font-black">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-14 md:px-6 lg:grid-cols-2">
          <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">Pode ser automatizado</p><h2 className="mt-4 font-serif text-4xl tracking-[-0.04em]">Detecção, validação e priorização.</h2><p className="mt-4 text-sm leading-7 text-zinc-300">Fingerprint de fontes, saúde das superfícies, Search Console, verificação de URLs declaradas, freshness e relatórios podem rodar automaticamente sem transformar automação em fabricação de autoridade.</p></div>
          <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">Continua humano</p><h2 className="mt-4 font-serif text-4xl tracking-[-0.04em]">Publicação factual e interpretação.</h2><p className="mt-4 text-sm leading-7 text-zinc-300">Uma mudança detectada não vira notícia sozinha. Uma menção possível não vira citação confirmada. O gate editorial permanece explícito e a fonte primária continua acima da narrativa.</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <h2 className="font-serif text-4xl tracking-[-0.04em]">O ciclo de autoridade verificável</h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-600">Pesquisa ou fonte oficial → revisão → publicação estruturada → descoberta por Google/AI Search → Search Console → citação externa verificável → reputation signal → nova evidência ligada à entidade Lorenza Volponi. Cada seta precisa deixar rastro auditável.</p>
        <div className="mt-8 flex flex-wrap gap-3 text-sm font-black"><Link href="/radar" className="rounded-full border border-zinc-300 bg-white px-4 py-2">Radar</Link><Link href="/imprensa" className="rounded-full border border-zinc-300 bg-white px-4 py-2">Imprensa</Link><Link href="/en/lorenza-volponi" className="rounded-full border border-zinc-300 bg-white px-4 py-2">Lorenza Volponi</Link><Link href="/metodologia" className="rounded-full border border-zinc-300 bg-white px-4 py-2">Metodologia</Link></div>
      </section>
    </main>
  );
}
