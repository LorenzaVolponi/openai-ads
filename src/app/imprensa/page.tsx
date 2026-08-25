import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Braces,
  Database,
  Github,
  Quote,
  RadioTower,
  Search,
} from "lucide-react";

import { PreferredSourceLink } from "@/components/preferred-source-link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { citationBlock } from "@/lib/authority-data";
import { radarEntries } from "@/lib/radar-data";

const URL = "https://openai-ads.volponi.tech/imprensa";

export const metadata: Metadata = {
  title: "Sala de Imprensa: Lorenza Volponi, IA, GEO e ChatGPT Ads | volponi.tech",
  description:
    "Media Source Room de Lorenza Volponi: bio curta, temas para entrevistas, dados auditados, fontes, datasets e forma correta de citar o observatório ChatGPT Ads.",
  alternates: { canonical: URL },
  openGraph: {
    title: "Lorenza Volponi — Media Source Room",
    description: "Fonte editorial sobre IA, GEO, sistemas de IA e publicidade conversacional.",
    url: URL,
    type: "profile",
    images: ["/og.png"],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${URL}/#page`,
      url: URL,
      name: "Lorenza Volponi — Media Source Room",
      inLanguage: "pt-BR",
      dateModified: "2026-08-25",
      mainEntity: { "@id": "https://openai-ads.volponi.tech/#author" },
      isPartOf: { "@id": "https://openai-ads.volponi.tech/#website" },
    },
    {
      "@type": "Person",
      "@id": "https://openai-ads.volponi.tech/#author",
      name: "Lorenza Volponi",
      url: "https://volponi.tech",
      sameAs: [
        "https://github.com/LorenzaVolponi",
        "https://www.linkedin.com/in/lorenzavolponi",
      ],
      knowsAbout: [
        "Generative Engine Optimization",
        "Artificial Intelligence",
        "AI systems",
        "ChatGPT Ads",
        "Search Engine Optimization",
        "software development",
        "digital strategy",
      ],
    },
  ],
};

const interviewTopics = [
  {
    icon: Search,
    title: "GEO e descoberta por IA",
    text: "Como marcas, especialistas e publicações passam a ser encontrados, entendidos e citados por mecanismos generativos sem confundir GEO com truques de markup.",
  },
  {
    icon: RadioTower,
    title: "Publicidade conversacional",
    text: "O que muda quando mídia paga entra em uma interface de conversa, e por que resposta do modelo, inventário e mensuração precisam ser tratados como camadas separadas.",
  },
  {
    icon: Braces,
    title: "AI systems e construção",
    text: "Arquitetura de informação, agentes, automação e código como parte da estratégia — não apenas como execução posterior.",
  },
  {
    icon: Database,
    title: "Dados e evidência",
    text: "Como trabalhar com produtos em rápida evolução sem publicar rumor como fato, usando fonte primária, timestamps, datasets e histórico de mudanças.",
  },
];

export default function PressPage() {
  const latest = radarEntries.slice(0, 3);

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
          <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Media Source Room</span>
        </div>
      </header>

      <section className="border-b border-border bg-amber-300 text-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Badge className="border border-zinc-950/20 bg-zinc-950 text-amber-200 hover:bg-zinc-950">
              fonte para imprensa · IA · GEO · ads
            </Badge>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.94] tracking-[-0.055em] md:text-7xl">
              Se a pauta é IA em movimento,
              <span className="block text-zinc-950/45">eu prefiro chegar com evidência.</span>
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-medium leading-8 text-zinc-900/75 md:text-xl">
              Lorenza Volponi é AI systems strategist, builder e autora do observatório independente sobre ChatGPT Ads da volponi.tech. O trabalho cruza código, busca, GEO, arquitetura de informação e leitura estratégica de produtos de IA em rápida evolução.
            </p>
          </div>

          <aside className="rounded-3xl bg-zinc-950 p-7 text-white shadow-2xl">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-amber-300">bio curta · pronta para uso</p>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Lorenza Volponi é AI systems strategist e builder. Pesquisa como sistemas de IA, busca e publicidade conversacional mudam descoberta, decisão e distribuição de informação. É autora do Volponi ChatGPT Ads Radar, observatório independente com fontes primárias, dados abertos e histórico auditado do mercado.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild size="sm" className="bg-amber-300 text-zinc-950 hover:bg-amber-200">
                <a href="https://volponi.tech" target="_blank" rel="noopener noreferrer">volponi.tech <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></a>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-zinc-950">
                <a href="https://www.linkedin.com/in/lorenzavolponi" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">Pautas</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">Onde eu posso acrescentar contexto.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {interviewTopics.map((topic) => (
              <Card key={topic.title}>
                <CardContent className="p-6">
                  <topic.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-5 text-lg font-black">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{topic.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-amber-300">Últimos sinais</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em]">Três fatos que mudaram recentemente.</h2>
              <p className="mt-5 text-sm leading-6 text-zinc-400">
                Cada item aponta para o Radar completo e para a fonte primária que sustenta a afirmação.
              </p>
            </div>
            <div className="space-y-3">
              {latest.map((entry) => (
                <a
                  key={entry.slug}
                  href={`/radar#${entry.slug}`}
                  className="block rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-amber-300/30 hover:bg-white/[0.07]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-amber-300">{entry.date}</span>
                    <span className="text-xs text-zinc-600">· {entry.market}</span>
                  </div>
                  <p className="mt-2 font-bold">{entry.title}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{entry.summary}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-7 md:p-9">
              <div className="flex items-center gap-2 text-primary">
                <Quote className="h-5 w-5" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.16em]">Como citar</span>
              </div>
              <blockquote className="mt-5 border-l-2 border-primary pl-5 text-lg font-semibold leading-8">
                “{citationBlock.title}”, por {citationBlock.author}, publicado por {citationBlock.publisher}, revisão factual em 25 de agosto de 2026.
              </blockquote>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <a href="/citation.json">Citation JSON</a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href="/data/chatgpt-ads-markets.csv">Dataset CSV</a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-7 md:p-9">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-primary">Acompanhar</p>
              <h2 className="mt-3 text-2xl font-black">Se isso virar sua fonte, diga ao Google.</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                O link abaixo abre a ferramenta oficial de Preferred Sources do Google. O domínio não carrega o script do Google automaticamente e não recebe dados sobre a sua seleção.
              </p>
              <PreferredSourceLink className="mt-6" />
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-12 md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <p className="font-black">Assets e verificação</p>
            <p className="mt-1 text-sm text-muted-foreground">Sem formulário. Use os canais públicos e os dados verificáveis do projeto.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="outline"><Link href="/radar">Radar</Link></Button>
            <Button asChild variant="outline"><Link href="/metodologia">Metodologia</Link></Button>
            <Button asChild variant="outline"><a href="https://github.com/LorenzaVolponi/openai-ads" target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> Código</a></Button>
          </div>
        </div>
      </section>
    </main>
  );
}
