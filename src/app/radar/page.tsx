import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Database,
  Download,
  RadioTower,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  marketStates,
  RADAR_CHECKED_AT,
  radarEntries,
  readinessDimensions,
} from "@/lib/radar-data";

const URL = "https://openai-ads.volponi.tech/radar";

export const metadata: Metadata = {
  title: "Volponi ChatGPT Ads Radar 2026: mudanças, países e maturidade | Lorenza Volponi",
  description:
    "Radar editorial independente com histórico auditado de ChatGPT Ads: lançamentos, disponibilidade por país, Ads Manager, compra, mensuração, fontes primárias e dados abertos.",
  alternates: {
    canonical: URL,
    types: {
      "application/rss+xml": "https://openai-ads.volponi.tech/feed.xml",
      "application/json": "https://openai-ads.volponi.tech/data/chatgpt-ads-markets.json",
      "text/csv": "https://openai-ads.volponi.tech/data/chatgpt-ads-markets.csv",
    },
  },
  openGraph: {
    title: "Volponi ChatGPT Ads Radar",
    description: "Histórico auditado e dados abertos sobre a evolução do ChatGPT Ads.",
    url: URL,
    type: "article",
    images: ["/og.png"],
  },
};

const availableCount = marketStates.filter((market) => market.adsManager === "Available").length;
const comingSoonCount = marketStates.filter((market) => market.adsManager === "Coming Soon").length;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollectionPage",
      "@id": `${URL}/#page`,
      url: URL,
      name: "Volponi ChatGPT Ads Radar",
      inLanguage: "pt-BR",
      dateModified: RADAR_CHECKED_AT,
      author: { "@id": "https://openai-ads.volponi.tech/#author" },
      isPartOf: { "@id": "https://openai-ads.volponi.tech/#website" },
    },
    {
      "@type": "Dataset",
      "@id": `${URL}/#dataset`,
      name: "ChatGPT Ads Manager market availability — snapshot 2026-08-25",
      description:
        "Snapshot editorial independente de mercados Available e Coming Soon no Ads Manager, com fonte oficial e data de checagem.",
      creator: { "@id": "https://openai-ads.volponi.tech/#author" },
      dateModified: RADAR_CHECKED_AT,
      distribution: [
        {
          "@type": "DataDownload",
          encodingFormat: "application/json",
          contentUrl: "https://openai-ads.volponi.tech/data/chatgpt-ads-markets.json",
        },
        {
          "@type": "DataDownload",
          encodingFormat: "text/csv",
          contentUrl: "https://openai-ads.volponi.tech/data/chatgpt-ads-markets.csv",
        },
      ],
      license: "https://openai-ads.volponi.tech/termos",
      isBasedOn: "https://help.openai.com/en/articles/20001245-ads-manager-availability",
    },
  ],
};

export default function RadarPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Observatório
          </Link>
          <div className="flex items-center gap-2 text-sm font-black">
            <RadioTower className="h-4 w-4 text-primary" /> Volponi Ads Radar
          </div>
        </div>
      </header>

      <section className="border-b border-border bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <Badge className="border border-emerald-400/30 bg-emerald-400/10 text-emerald-300 hover:bg-emerald-400/10">
            snapshot auditado · {RADAR_CHECKED_AT}
          </Badge>
          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.94] tracking-[-0.055em] md:text-7xl">
            O mercado muda.
            <span className="block text-amber-300">O Radar guarda a memória.</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">
            Um registro público de mudanças em ChatGPT Ads, com estado anterior, estado atual, impacto,
            fonte primária e data. Não é previsão. Não é benchmark vendido como fato.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild className="bg-amber-300 text-zinc-950 hover:bg-amber-200">
              <a href="/data/chatgpt-ads-markets.json">
                <Database className="mr-2 h-4 w-4" /> Dataset JSON
              </a>
            </Button>
            <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-zinc-950">
              <a href="/data/chatgpt-ads-markets.csv">
                <Download className="mr-2 h-4 w-4" /> CSV
              </a>
            </Button>
            <Button asChild variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-zinc-950">
              <a href="/feed.xml">RSS</a>
            </Button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6">
        <div className="grid gap-px overflow-hidden rounded-3xl border border-border bg-border md:grid-cols-3">
          {[
            [String(availableCount), "mercados Available", "Ads Manager no snapshot atual"],
            [String(comingSoonCount), "mercados Coming Soon", "na fotografia oficial atual"],
            [String(radarEntries.length), "mudanças registradas", "com fonte primária e contexto"],
          ].map(([value, label, note]) => (
            <div key={label} className="bg-background p-7">
              <p className="text-5xl font-black tracking-[-0.05em] text-primary">{value}</p>
              <p className="mt-2 font-bold">{label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 md:px-6 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">Readiness Matrix v1</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">Maturidade sem nota mágica.</h2>
            <p className="mt-4 text-sm leading-6 text-muted-foreground">
              Em vez de fabricar um score agregado, a matriz publica cada dimensão e a evidência que sustenta a leitura.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {readinessDimensions.map((item) => (
              <Card key={item.dimension}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold">{item.dimension}</p>
                      <p className="mt-1 text-2xl font-black text-primary">{item.level}</p>
                    </div>
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.evidence}</p>
                  <a
                    href={item.source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
                  >
                    {item.source.publisher} <ArrowUpRight className="h-3 w-3" />
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
          <div className="max-w-3xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">Change ledger</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] md:text-5xl">Cada mudança deixa rastro.</h2>
          </div>

          <div className="mt-10 space-y-4">
            {radarEntries.map((entry) => (
              <article id={entry.slug} key={entry.slug} className="scroll-mt-24 rounded-3xl border border-border bg-background p-6 md:p-8">
                <div className="grid gap-7 lg:grid-cols-[150px_1fr]">
                  <div>
                    <p className="font-mono text-sm font-black text-primary">{entry.date}</p>
                    <p className="mt-2 text-xs uppercase tracking-[0.14em] text-muted-foreground">{entry.market}</p>
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline">{entry.kind}</Badge>
                      <Badge variant="secondary">{entry.confidence}</Badge>
                    </div>
                    <h3 className="mt-4 text-2xl font-black tracking-[-0.025em] md:text-3xl">{entry.title}</h3>
                    <p className="mt-3 max-w-4xl leading-7 text-muted-foreground">{entry.summary}</p>

                    <div className="mt-6 grid gap-3 md:grid-cols-3">
                      <div className="rounded-2xl border border-border bg-muted/30 p-4">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">antes</p>
                        <p className="mt-2 text-sm leading-6">{entry.previousState}</p>
                      </div>
                      <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-primary">agora</p>
                        <p className="mt-2 text-sm font-semibold leading-6">{entry.currentState}</p>
                      </div>
                      <div className="rounded-2xl border border-border bg-muted/30 p-4">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">impacto</p>
                        <p className="mt-2 text-sm leading-6">{entry.impact}</p>
                      </div>
                    </div>

                    <a
                      href={entry.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
                    >
                      Fonte: {entry.source.label} <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-8 md:p-12">
          <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">Como usar</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-black tracking-[-0.04em] md:text-5xl">
            Pode baixar, comparar e citar. Só preserve a fonte e a data.
          </h2>
          <p className="mt-5 max-w-3xl leading-7 text-muted-foreground">
            O dataset é uma curadoria editorial de fontes públicas. Ele não substitui a documentação oficial e não afirma que status observados em 25/08/2026 permanecerão iguais no futuro.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/metodologia">Metodologia</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/imprensa">Sala de imprensa</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
