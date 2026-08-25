import { ArrowLeft, ArrowUpRight, CheckCircle2, Quote } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";

export type TopicFact = {
  label: string;
  value: string;
  note: string;
};

export type TopicSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type TopicSource = {
  label: string;
  url: string;
  publisher: string;
};

export function TopicArticle({
  eyebrow,
  title,
  description,
  summary,
  facts,
  sections,
  sources,
  related,
}: {
  eyebrow: string;
  title: string;
  description: string;
  summary: string;
  facts: TopicFact[];
  sections: TopicSection[];
  sources: TopicSource[];
  related: { label: string; href: string }[];
}) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold hover:text-primary">
            <ArrowLeft className="h-4 w-4" /> Voltar ao observatório
          </Link>
          <a href="https://volponi.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-black">
            <img src="/fox-black.png" alt="" width={28} height={28} className="h-7 w-7 rounded-md" />
            volponi.tech
          </a>
        </div>
      </header>

      <article>
        <section className="border-b border-border bg-zinc-950 text-white">
          <div className="mx-auto max-w-6xl px-4 py-16 md:px-6 md:py-24">
            <Badge className="border border-amber-300/30 bg-amber-300/10 text-amber-200 hover:bg-amber-300/10">{eyebrow}</Badge>
            <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[0.95] tracking-[-0.055em] md:text-7xl">{title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-400 md:text-xl">{description}</p>
            <div className="mt-8 max-w-4xl rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-6">
              <div className="flex items-center gap-2 text-sm font-bold text-amber-200">
                <Quote className="h-4 w-4" /> Resposta curta
              </div>
              <p className="mt-3 text-base leading-7 text-zinc-300">{summary}</p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-12 md:px-6">
          <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {facts.map((fact) => (
              <div key={`${fact.label}-${fact.value}`} className="bg-background p-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{fact.label}</p>
                <p className="mt-3 text-3xl font-black tracking-[-0.04em] text-primary">{fact.value}</p>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{fact.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-4 pb-16 md:px-6 md:pb-24 lg:grid-cols-[0.72fr_0.28fr]">
          <div className="space-y-12">
            {sections.map((section) => (
              <section key={section.title}>
                <h2 className="text-3xl font-black tracking-[-0.035em] md:text-4xl">{section.title}</h2>
                <div className="mt-5 space-y-4 text-base leading-8 text-muted-foreground">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
                {section.bullets ? (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>

          <aside className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Fontes primárias</p>
              <div className="mt-4 space-y-3">
                {sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-xl border border-border p-3 transition hover:border-primary/35 hover:bg-primary/5"
                  >
                    <span className="block text-xs font-semibold">{source.label}</span>
                    <span className="mt-1 block text-[11px] text-muted-foreground">{source.publisher}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-primary">Continue</p>
              <div className="mt-4 space-y-2">
                {related.map((item) => (
                  <Link key={item.href} href={item.href} className="flex items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-muted hover:text-primary">
                    {item.label} <ArrowUpRight className="h-3.5 w-3.5" />
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5 text-xs leading-5 text-muted-foreground">
              Revisão factual: 25/08/2026. Projeto independente de Lorenza Volponi / volponi.tech. Não afiliado, patrocinado, endossado, certificado, operado ou mantido pela OpenAI.
            </div>
          </aside>
        </section>
      </article>
    </main>
  );
}
