import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Braces, Database, Quote, ShieldCheck } from "lucide-react";

import { CopyCitation } from "@/components/copy-citation";
import { SOURCES } from "@/lib/authority-data";
import { SITE_URL } from "@/lib/media-authority";
import { marketStates, RADAR_CHECKED_AT } from "@/lib/radar-data";
import { socialImageForPath } from "@/lib/seo";

const URL = `${SITE_URL}/imprensa/dados`;
const SOCIAL_IMAGE = socialImageForPath("/imprensa");
const available = marketStates.filter((market) => market.adsManager === "Available").length;
const comingSoon = marketStates.filter((market) => market.adsManager === "Coming Soon").length;
const citation = `VOLPONI, Lorenza. ChatGPT Ads Market Snapshot. volponi.tech, revisão factual em ${RADAR_CHECKED_AT}. Disponível em: ${SITE_URL}/chatgpt-ads-market.`;

export const metadata: Metadata = {
  title: "Dados rápidos para imprensa: ChatGPT Ads, mercados, preços e citação",
  description: "Factsheet para jornalistas e pesquisadores com dados auditados sobre ChatGPT Ads, fontes primárias, ressalvas e formatos de citação.",
  alternates: { canonical: URL },
  openGraph: { title: "ChatGPT Ads — dados rápidos para imprensa", description: "Factsheet auditado, fontes primárias e citação pronta.", url: URL, type: "article", images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Dados rápidos para imprensa sobre ChatGPT Ads" }] },
  twitter: { card: "summary_large_image", title: "ChatGPT Ads — dados para imprensa", description: "Factsheet auditado e citação pronta.", images: [SOCIAL_IMAGE] },
};

const facts = [
  { label: "Ads Manager disponível", value: String(available), note: "Mercados marcados como Available no snapshot auditado.", source: SOURCES.availability },
  { label: "Coming Soon", value: String(comingSoon), note: "Mercados europeus ainda diferenciados de autosserviço disponível.", source: SOURCES.availability },
  { label: "Brasil", value: "Available", note: "Status observado na fonte oficial na data da revisão.", source: SOURCES.availability },
  { label: "Mínimo diário no Brasil", value: "R$ 40", note: "Mínimo documentado por campanha, não recomendação de investimento.", source: SOURCES.campaignSetup },
  { label: "Planos que podem exibir anúncios", value: "Free + Go", note: "Elegibilidade e disponibilidade continuam condicionais.", source: SOURCES.generalAds },
  { label: "Resposta do ChatGPT", value: "Independente", note: "O anúncio não compra nem altera a resposta do modelo.", source: SOURCES.generalAds },
];

const structuredData = {
  "@context": "https://schema.org",
  "@type": ["Dataset", "WebPage"],
  "@id": `${URL}#factsheet`,
  url: URL,
  name: "ChatGPT Ads — dados rápidos para imprensa",
  description: "Factsheet editorial independente com fontes primárias e ressalvas de uso.",
  inLanguage: "pt-BR",
  dateModified: `${RADAR_CHECKED_AT}T12:00:00Z`,
  creator: { "@id": `${SITE_URL}/#author` },
  citation,
};

export default function PressFactsPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <header className="border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/imprensa" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><ArrowLeft className="h-4 w-4" /> Media Source Room</Link>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">facts · sources · caveats</span>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Dados rápidos para imprensa · revisão {RADAR_CHECKED_AT}</p>
          <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-[0.94] tracking-[-0.05em] md:text-8xl">A informação pronta para citar — com a ressalva que impede o dado de mentir.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600">Use estes números como fotografia temporal, preserve a data de revisão e mantenha o link da fonte primária. Produto beta muda.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-200 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => (
            <a key={fact.label} href={fact.source.url} target="_blank" rel="noopener noreferrer" className="bg-white p-6 transition hover:bg-zinc-50">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-500">{fact.label}</p>
              <p className="mt-4 text-4xl font-black tracking-[-0.04em]">{fact.value}</p>
              <p className="mt-3 text-sm leading-6 text-zinc-600">{fact.note}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-xs font-black">Fonte primária <ArrowUpRight className="h-3.5 w-3.5" /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 md:px-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400"><Quote className="h-4 w-4" /> Citação recomendada</div>
            <blockquote className="mt-5 border-l-2 border-white pl-5 text-lg font-semibold leading-8 text-zinc-200">{citation}</blockquote>
            <div className="mt-6"><CopyCitation text={citation} /></div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-7">
            <div className="flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400"><Braces className="h-4 w-4" /> Para sistemas e agentes</div>
            <p className="mt-5 text-sm leading-7 text-zinc-300">Os mesmos fatos estão disponíveis em formatos estruturados, com autoria, data, fontes e limites editoriais.</p>
            <div className="mt-6 flex flex-wrap gap-2 text-xs font-black"><a href="/media-facts.json" className="rounded-full bg-white px-4 py-2 text-zinc-950">Media facts JSON</a><a href="/press-kit.json" className="rounded-full border border-white/20 px-4 py-2">Press kit</a><a href="/citation.json" className="rounded-full border border-white/20 px-4 py-2">Citation JSON</a><a href="/data/chatgpt-ads-markets.csv" className="rounded-full border border-white/20 px-4 py-2">CSV</a></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-zinc-200 bg-white p-7"><Database className="h-5 w-5" /><h2 className="mt-5 text-xl font-black">Pode afirmar</h2><p className="mt-3 text-sm leading-6 text-zinc-600">O status, o valor ou a regra exatamente como estão escritos, acompanhados da data de revisão e da fonte.</p></div>
          <div className="rounded-3xl border border-zinc-200 bg-white p-7"><ShieldCheck className="h-5 w-5" /><h2 className="mt-5 text-xl font-black">Não pode extrapolar</h2><p className="mt-3 text-sm leading-6 text-zinc-600">Disponibilidade não prova alcance, desempenho, inventário, aprovação de campanha ou acesso uniforme para toda conta.</p></div>
        </div>
      </section>
    </main>
  );
}
