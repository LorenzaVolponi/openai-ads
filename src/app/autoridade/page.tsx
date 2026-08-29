import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Eye, FileCheck2, Radar, SearchCheck, ShieldCheck } from "lucide-react";

import { SITE_URL } from "@/lib/media-authority";
import { socialImageForPath } from "@/lib/seo";

const URL = `${SITE_URL}/autoridade`;
const SOCIAL_IMAGE = socialImageForPath("/imprensa");

export const metadata: Metadata = {
  title: "Authority Observatory: como a volponi.tech mede autoridade sem inventar sinais",
  description: "Pipeline público de autoridade do observatório ChatGPT Ads: fontes primárias, Search Console, evidências externas verificáveis, Radar, citations e guardrails editoriais.",
  alternates: { canonical: URL },
  openGraph: { title: "Authority Observatory · volponi.tech", description: "Autoridade medida por evidência, não por narrativa.", url: URL, type: "website", images: [{ url: SOCIAL_IMAGE, width: 1200, height: 630, alt: "Authority Observatory volponi.tech" }] },
  twitter: { card: "summary_large_image", title: "Authority Observatory · volponi.tech", description: "Autoridade medida por evidência, não por narrativa.", images: [SOCIAL_IMAGE] },
};

const stages = [
  [Radar, "1. Fonte primária", "Mudanças em superfícies oficiais da OpenAI são detectadas por fingerprint. Nenhum fato é publicado automaticamente."],
  [FileCheck2, "2. Evidence gate", "A revisão editorial decide se a mudança altera fatos, datasets, Radar, feeds ou páginas canônicas."],
  [SearchCheck, "3. Search Console", "Impressões, cliques, CTR e posição média só entram quando vierem da API oficial do Google Search Console."],
  [Eye, "4. Citation Observatory", "Backlinks, imprensa, indústria, academia e citações por IA só contam quando existe URL/evidência verificável."],
  [ShieldCheck, "5. Provenance", "Deploy, evidence ledger, source revision e artefatos continuam ligados a GitHub, CI e attestations."],
] as const;

export default function AuthorityPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <header className="border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold"><ArrowLeft className="h-4 w-4" /> Observatório</Link>
          <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500">authority · evidence · citations</span>
        </div>
      </header>

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Authority Observatory</p>
          <h1 className="mt-6 max-w-5xl font-serif text-5xl leading-[0.94] tracking-[-0.05em] md:text-8xl">Autoridade não é uma frase bonita. É uma cadeia de evidências.</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-600">Este painel explica como a volponi.tech separa infraestrutura própria, performance orgânica real e sinais externos verificáveis. O sistema prefere declarar “ainda não medido” a fabricar autoridade.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/authority.json" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-black text-white">Abrir versão para máquinas <ArrowUpRight className="h-4 w-4" /></a>
            <a href="/intelligence.json" className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 text-sm font-black">Authority graph <ArrowUpRight className="h-4 w-4" /></a>
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
          <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">Pode ser automatizado</p><h2 className="mt-4 font-serif text-4xl tracking-[-0.04em]">Detecção, validação e priorização.</h2><p className="mt-4 text-sm leading-7 text-zinc-300">Fingerprint de fontes, saúde das superfícies, leitura do Search Console, verificação de URLs declaradas e geração de relatórios podem rodar sem IA e sem custo operacional adicional.</p></div>
          <div><p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400">Continua humano</p><h2 className="mt-4 font-serif text-4xl tracking-[-0.04em]">Publicação factual e interpretação.</h2><p className="mt-4 text-sm leading-7 text-zinc-300">Uma mudança detectada não vira notícia sozinha. Uma menção possível não vira citação confirmada. O gate editorial permanece explícito.</p></div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 md:px-6">
        <h2 className="font-serif text-4xl tracking-[-0.04em]">O ciclo que estamos construindo</h2>
        <p className="mt-5 max-w-4xl text-lg leading-8 text-zinc-600">Fonte oficial muda → detecção → revisão → publicação estruturada → indexação → Search Console → citação externa verificável → nova evidência de autoridade. Cada seta precisa deixar rastro auditável.</p>
      </section>
    </main>
  );
}
