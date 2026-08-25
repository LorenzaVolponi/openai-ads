import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Database, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { radarEntries } from "@/lib/radar-data";

const BASE_URL = "https://openai-ads.volponi.tech/radar";

export function generateStaticParams() {
  return radarEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const entry = radarEntries.find((item) => item.slug === slug);
  if (!entry) return {};

  const url = `${BASE_URL}/${entry.slug}`;
  return {
    title: `${entry.title} | Volponi ChatGPT Ads Radar`,
    description: entry.summary,
    alternates: { canonical: url },
    openGraph: {
      title: entry.title,
      description: entry.summary,
      url,
      type: "article",
      publishedTime: `${entry.date}T12:00:00Z`,
      authors: ["Lorenza Volponi"],
      images: ["/og.png"],
    },
  };
}

export default async function RadarEntryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = radarEntries.find((item) => item.slug === slug);
  if (!entry) notFound();

  const url = `${BASE_URL}/${entry.slug}`;
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Article", "TechArticle"],
        "@id": `${url}/#article`,
        headline: entry.title,
        description: entry.summary,
        datePublished: entry.date,
        dateModified: "2026-08-25",
        inLanguage: "pt-BR",
        mainEntityOfPage: url,
        author: { "@id": "https://openai-ads.volponi.tech/#author" },
        publisher: { "@id": "https://openai-ads.volponi.tech/#author" },
        isBasedOn: entry.source.url,
        articleSection: `ChatGPT Ads Radar — ${entry.kind}`,
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Observatório", item: "https://openai-ads.volponi.tech/" },
          { "@type": "ListItem", position: 2, name: "Radar", item: BASE_URL },
          { "@type": "ListItem", position: 3, name: entry.title, item: url },
        ],
      },
    ],
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 md:px-6">
          <Link href="/radar" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold hover:text-zinc-600">
            <ArrowLeft className="h-4 w-4" /> Voltar ao Radar
          </Link>
          <span className="font-mono text-xs font-bold text-zinc-950">{entry.date}</span>
        </div>
      </header>

      <article>
        <section className="border-b border-border bg-zinc-950 text-white">
          <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
            <div className="flex flex-wrap gap-2">
              <Badge className="border border-white/20 bg-white/10 text-white hover:bg-white/10">{entry.kind}</Badge>
              <Badge className="border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/5">{entry.market}</Badge>
              <Badge className="border border-white/20 bg-white/10 text-zinc-200 hover:bg-white/10">{entry.confidence}</Badge>
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.055em] md:text-7xl">{entry.title}</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">{entry.summary}</p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Estado anterior</p>
              <p className="mt-3 text-sm leading-6">{entry.previousState}</p>
            </div>
            <div className="rounded-2xl border border-zinc-300 bg-zinc-50 p-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-950">Estado observado</p>
              <p className="mt-3 text-sm font-semibold leading-6">{entry.currentState}</p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground">Impacto</p>
              <p className="mt-3 text-sm leading-6">{entry.impact}</p>
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.68fr_0.32fr]">
            <div className="rounded-3xl border border-border p-7 md:p-9">
              <div className="flex items-center gap-2 text-zinc-950">
                <ShieldCheck className="h-5 w-5" />
                <span className="font-mono text-xs font-bold uppercase tracking-[0.16em]">Critério editorial</span>
              </div>
              <h2 className="mt-4 text-3xl font-black tracking-[-0.035em]">Registro, não previsão.</h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Este registro descreve o estado observado na data indicada. Produto, disponibilidade e documentação podem mudar depois. Para decisões operacionais, a fonte oficial vigente prevalece sobre o snapshot histórico.
              </p>
              <a
                href={entry.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1 font-semibold text-zinc-950 hover:underline"
              >
                {entry.source.label} · {entry.source.publisher} <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>

            <aside className="rounded-3xl border border-zinc-200 bg-zinc-50 p-7">
              <Database className="h-5 w-5 text-zinc-950" />
              <h2 className="mt-4 text-xl font-black">Dados abertos</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                O snapshot de mercados também está disponível em formatos estruturados para auditoria e reutilização.
              </p>
              <div className="mt-5 space-y-2">
                <Button asChild size="sm" className="w-full"><a href="/data/chatgpt-ads-markets.json">JSON</a></Button>
                <Button asChild size="sm" variant="outline" className="w-full"><a href="/data/chatgpt-ads-markets.csv">CSV</a></Button>
              </div>
            </aside>
          </div>
        </section>
      </article>
    </main>
  );
}
