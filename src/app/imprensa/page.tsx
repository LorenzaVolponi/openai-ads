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
import {
  AUTHOR,
  AUTHOR_ID,
  PRESS_URL,
  PUBLISHER_ID,
  SITE_URL,
  mediaAuthorStructuredData,
  publisherStructuredData,
} from "@/lib/media-authority";
import { radarEntries } from "@/lib/radar-data";

export const metadata: Metadata = {
  title: "Lorenza Volponi: especialista em ChatGPT Ads, IA e GEO | Imprensa",
  description:
    "Fonte para entrevistas e matérias sobre ChatGPT Ads, publicidade conversacional, IA, GEO e AI systems. Bio, dados auditados, Radar, datasets, fontes primárias e citação de Lorenza Volponi.",
  authors: [{ name: AUTHOR.name, url: PRESS_URL }],
  alternates: { canonical: PRESS_URL },
  openGraph: {
    title: "Lorenza Volponi — fonte para imprensa em ChatGPT Ads, IA e GEO",
    description: "Bio, pautas, dados auditados, fontes primárias e Radar independente para redações e jornalistas.",
    url: PRESS_URL,
    type: "profile",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Lorenza Volponi — ChatGPT Ads, IA e GEO",
    description: "Fonte para entrevistas com evidência, dados auditados e fontes primárias.",
    images: ["/og.png"],
  },
  other: {
    "expert-source": "ChatGPT Ads, conversational advertising, GEO, AI systems, AI discovery",
    "media-source": "Lorenza Volponi / volponi.tech",
  },
};

const latestProfileArticles = radarEntries.slice(0, 5).map((entry) => ({
  "@type": "NewsArticle",
  "@id": `${SITE_URL}/radar/${entry.slug}#article`,
  headline: entry.title,
  url: `${SITE_URL}/radar/${entry.slug}`,
  datePublished: `${entry.date}T12:00:00Z`,
  author: { "@id": AUTHOR_ID },
  publisher: { "@id": PUBLISHER_ID },
}));

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${PRESS_URL}#page`,
      url: PRESS_URL,
      name: "Lorenza Volponi — fonte para imprensa em ChatGPT Ads, IA e GEO",
      description:
        "Perfil editorial e Media Source Room de Lorenza Volponi para entrevistas, contexto e citação sobre ChatGPT Ads, publicidade conversacional, GEO e sistemas de IA.",
      inLanguage: "pt-BR",
      dateModified: "2026-08-25T16:30:00-03:00",
      mainEntity: { "@id": AUTHOR_ID },
      isPartOf: { "@id": `${SITE_URL}/#website` },
      publisher: { "@id": PUBLISHER_ID },
      hasPart: latestProfileArticles,
    },
    {
      ...mediaAuthorStructuredData,
      description:
        "AI Systems Strategist & Builder, autora do observatório independente Volponi ChatGPT Ads Radar e fonte para imprensa sobre ChatGPT Ads, IA, GEO e publicidade conversacional.",
      image: `${SITE_URL}/fox-black.png`,
      worksFor: { "@id": PUBLISHER_ID },
      subjectOf: [
        { "@type": "WebSite", "@id": `${SITE_URL}/#website`, url: SITE_URL },
        { "@type": "CollectionPage", url: `${SITE_URL}/radar`, name: "Volponi ChatGPT Ads Radar" },
      ],
    },
    publisherStructuredData,
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

const newsroomQuestions = [
  "Como funcionam os anúncios dentro do ChatGPT — e o que eles não mudam na resposta?",
  "O que a chegada do ChatGPT Ads ao Brasil muda para anunciantes, agências e publishers?",
  "Quanto custa anunciar no ChatGPT e por que lance recomendado não é benchmark de CPC?",
  "Como medir ChatGPT Ads sem confundir clique, atribuição e causalidade?",
  "O que GEO realmente significa quando buscadores e IAs passam a escolher fontes?",
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
          <Link href="/" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:text-zinc-600">
            <ArrowLeft className="h-4 w-4" /> Observatório
          </Link>
          <span className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Media Source Room</span>
        </div>
      </header>

      <section className="border-b border-border bg-white text-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Badge className="border border-zinc-950 bg-zinc-950 text-white hover:bg-zinc-950">
              fonte para imprensa · ChatGPT Ads · IA · GEO
            </Badge>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.94] tracking-[-0.055em] md:text-7xl">
              ChatGPT Ads, IA e GEO.
              <span className="block text-zinc-400">Fonte para redações com evidência.</span>
            </h1>
            <p className="mt-7 max-w-3xl text-lg font-medium leading-8 text-zinc-700 md:text-xl">
              Lorenza Volponi é AI systems strategist, builder e autora do observatório independente sobre ChatGPT Ads da volponi.tech. O trabalho cruza código, busca, GEO, arquitetura de informação, publicidade conversacional e leitura estratégica de produtos de IA em rápida evolução.
            </p>
            <p className="mt-4 max-w-3xl text-sm font-semibold leading-6 text-zinc-500">
              Disponível como fonte para entrevistas, comentários de contexto e explicações técnicas sobre mudanças verificadas no ecossistema de publicidade e IA.
            </p>
          </div>

          <aside className="rounded-3xl bg-zinc-950 p-7 text-white shadow-2xl">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-400">bio curta · pronta para uso</p>
            <p className="mt-4 text-sm leading-7 text-zinc-300">
              Lorenza Volponi é AI systems strategist e builder. Pesquisa como sistemas de IA, busca e publicidade conversacional mudam descoberta, decisão e distribuição de informação. É autora do Volponi ChatGPT Ads Radar, observatório independente com fontes primárias, dados abertos e histórico auditado do mercado.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild size="sm" className="bg-white text-zinc-950 hover:bg-zinc-200">
                <a href={AUTHOR.personalSite} target="_blank" rel="noopener noreferrer">volponi.tech <ArrowUpRight className="ml-1 h-3.5 w-3.5" /></a>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-white/20 bg-transparent text-white hover:bg-white hover:text-zinc-950">
                <a href={AUTHOR.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              </Button>
            </div>
          </aside>
        </div>
      </section>

      <section className="content-auto mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.32fr_0.68fr]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-950">Pautas</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">Onde eu posso acrescentar contexto.</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {interviewTopics.map((topic) => (
              <Card key={topic.title}>
                <CardContent className="p-6">
                  <topic.icon className="h-5 w-5 text-zinc-950" />
                  <h3 className="mt-5 text-lg font-black">{topic.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{topic.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="content-auto border-y border-border bg-zinc-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 lg:grid-cols-[0.38fr_0.62fr]">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-950">Para redações</p>
            <h2 className="mt-4 text-3xl font-black tracking-[-0.04em]">Cinco perguntas que eu consigo responder sem enrolação.</h2>
          </div>
          <div className="divide-y divide-zinc-200 rounded-3xl border border-zinc-200 bg-white px-6">
            {newsroomQuestions.map((question, index) => (
              <div key={question} className="flex gap-4 py-5">
                <span className="font-mono text-xs font-black text-zinc-400">0{index + 1}</span>
                <p className="font-semibold leading-6 text-zinc-800">{question}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="content-auto border-y border-border bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr]">
            <div>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Últimos sinais</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em]">Três fatos que mudaram recentemente.</h2>
              <p className="mt-5 text-sm leading-6 text-zinc-400">
                Cada item aponta para uma URL permanente do Radar e para a fonte primária que sustenta a afirmação.
              </p>
            </div>
            <div className="space-y-3">
              {latest.map((entry) => (
                <Link
                  key={entry.slug}
                  href={`/radar/${entry.slug}`}
                  className="block rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/30 hover:bg-white/[0.07]"
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-white">{entry.date}</span>
                    <span className="text-xs text-zinc-600">· {entry.market}</span>
                  </div>
                  <p className="mt-2 font-bold">{entry.title}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{entry.summary}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-auto mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-5 lg:grid-cols-2">
          <Card className="border-zinc-200 bg-zinc-50">
            <CardContent className="p-7 md:p-9">
              <div className="flex items-center gap-2 text-zinc-950">
                <Quote className="h-5 w-5" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.16em]">Como citar</span>
              </div>
              <blockquote className="mt-5 border-l-2 border-zinc-950 pl-5 text-lg font-semibold leading-8">
                “{citationBlock.title}”, por {citationBlock.author}, publicado por {citationBlock.publisher}, revisão factual em 25 de agosto de 2026.
              </blockquote>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild size="sm">
                  <a href="/press-kit.json">Press Kit JSON</a>
                </Button>
                <Button asChild size="sm" variant="outline">
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
              <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-zinc-950">Acompanhar</p>
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
            <Button asChild variant="outline"><a href={AUTHOR.github} target="_blank" rel="noopener noreferrer"><Github className="mr-2 h-4 w-4" /> Código</a></Button>
          </div>
        </div>
      </section>
    </main>
  );
}
