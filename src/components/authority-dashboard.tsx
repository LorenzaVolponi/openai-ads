import {
  ArrowUpRight,
  BarChart3,
  CircleCheck,
  Database,
  Gauge,
  Radio,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  authorityMetrics,
  evidenceLedger,
  metricFormulas,
  productFacts,
} from "@/lib/authority-data";

function SourceLink({ label, url, inverse = false }: { label: string; url: string; inverse?: boolean }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-xs font-medium underline-offset-4 hover:underline ${inverse ? "text-zinc-300 hover:text-white" : "text-zinc-800 hover:text-zinc-950"}`}
    >
      Fonte primária: {label} <ArrowUpRight className="h-3 w-3" />
    </a>
  );
}

export function AuthorityMetrics() {
  return (
    <section id="dados-reais" className="content-auto border-y border-white/10 bg-zinc-950 text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
          <div>
            <Badge className="border border-white/20 bg-white/10 text-white hover:bg-white/10">
              Signal board · auditado em 25/08/2026
            </Badge>
            <h2 className="mt-5 text-4xl font-black tracking-[-0.04em] md:text-6xl">
              Números grandes.
              <span className="block text-zinc-500">Interpretação maior ainda.</span>
            </h2>
            <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400 md:text-lg">
              O objetivo não é impressionar com volume. É impedir que escala de produto, alcance de mídia,
              disponibilidade de anunciante e benchmark sejam misturados como se fossem a mesma coisa.
            </p>
          </div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 xl:grid-cols-3">
            {authorityMetrics.map((metric) => (
              <article key={`${metric.value}-${metric.label}`} className="bg-zinc-950 p-6 md:p-7">
                <div className="font-mono text-4xl font-black tracking-[-0.05em] text-white md:text-5xl">
                  {metric.value}
                </div>
                <h3 className="mt-3 text-sm font-semibold uppercase tracking-[0.14em] text-white">
                  {metric.label}
                </h3>
                <p className="mt-3 text-sm leading-6 text-zinc-400">{metric.context}</p>
                <p className="mt-4 border-l border-white/25 pl-3 text-xs leading-5 text-zinc-500">
                  {metric.caveat}
                </p>
                <div className="mt-5">
                  <SourceLink label={metric.source.label} url={metric.source.url} inverse />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProductRealityGrid() {
  return (
    <section id="produto-real" className="content-auto mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Badge variant="outline" className="border-zinc-300 text-zinc-950">Produto real</Badge>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">
            O que o Ads Manager já faz de verdade.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
            Menos futurismo, mais mecanismo: compra, leilão, veiculação, mensuração, privacidade e os limites
            que a própria documentação deixa explícitos.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {productFacts.map((fact) => (
            <Card key={fact.title} className="group h-full overflow-hidden transition hover:-translate-y-0.5 hover:border-zinc-400 hover:shadow-lg">
              <CardContent className="p-6 md:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-950">
                    {fact.eyebrow}
                  </span>
                  <Radio className="h-4 w-4 text-muted-foreground transition group-hover:text-zinc-950" />
                </div>
                <h3 className="mt-5 text-xl font-bold tracking-tight">{fact.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{fact.text}</p>
                <div className="mt-5">
                  <SourceLink label={fact.source.label} url={fact.source.url} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export function EvidenceLedger() {
  const iconFor = (status: string) => {
    if (status === "confirmado") return <CircleCheck className="h-4 w-4 text-zinc-950" />;
    if (status === "não confundir") return <TriangleAlert className="h-4 w-4 text-zinc-950" />;
    return <Gauge className="h-4 w-4 text-zinc-950" />;
  };

  return (
    <section id="evidencia" className="content-auto border-y border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="max-w-3xl">
          <Badge variant="secondary" className="border border-zinc-200 bg-white text-zinc-950">
            Evidence ledger
          </Badge>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">
            O dado só vale quando você sabe o que ele não significa.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            Esta é a camada que eu gostaria de encontrar em qualquer relatório sério: o fato, o limite da
            interpretação e a fonte que permite revalidar a afirmação.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {evidenceLedger.map((item) => (
            <article key={item.title} className="rounded-2xl border border-border bg-background p-6">
              <div className="flex items-center gap-2">
                {iconFor(item.status)}
                <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {item.status}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
              <div className="mt-4">
                <SourceLink label={item.source.label} url={item.source.url} />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function MediaMath() {
  return (
    <section id="metricas" className="content-auto mx-auto w-full max-w-7xl px-4 py-16 md:px-6 md:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
        <div>
          <Badge variant="outline" className="border-zinc-300 text-zinc-950">Métrica ≠ estratégia</Badge>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] md:text-5xl">
            A matemática mínima para não comprar narrativa de dashboard.
          </h2>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            O Ads Manager Beta reporta impressões, cliques, gasto, CTR, CPC médio, CPM médio e conversões.
            As fórmulas abaixo mostram como interpretar a cadeia de performance sem inventar benchmark.
          </p>
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <BarChart3 className="h-4 w-4 text-zinc-950" /> Regra de leitura
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              Quanto mais perto da receita ou do resultado real, menos uma métrica deve ser lida isoladamente.
              Clique é comportamento; conversão é evento; receita é consequência; incrementalidade é evidência.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {metricFormulas.map((item) => (
            <article key={item.metric} className="rounded-2xl border border-border bg-card p-5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-zinc-950">{item.metric}</span>
                <Database className="h-4 w-4 text-muted-foreground" />
              </div>
              <code className="mt-4 block rounded-lg bg-muted px-3 py-2 text-xs font-semibold text-foreground">
                {item.formula}
              </code>
              <p className="mt-4 text-sm font-medium leading-6">{item.reads}</p>
              <p className="mt-3 text-xs leading-5 text-muted-foreground">{item.warning}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TrustPrinciples() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <ShieldCheck className="h-4 w-4 text-white" />
        <p className="mt-3 text-sm font-semibold text-white">Fonte primária primeiro</p>
        <p className="mt-1 text-xs leading-5 text-zinc-500">OpenAI/Help Center antes de rumor, print ou benchmark reciclado.</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <Database className="h-4 w-4 text-white" />
        <p className="mt-3 text-sm font-semibold text-white">Dado com ressalva</p>
        <p className="mt-1 text-xs leading-5 text-zinc-500">Todo número relevante explica também o limite da interpretação.</p>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
        <Radio className="h-4 w-4 text-white" />
        <p className="mt-3 text-sm font-semibold text-white">Documento vivo</p>
        <p className="mt-1 text-xs leading-5 text-zinc-500">Produto beta exige data de auditoria e revalidação contínua.</p>
      </div>
    </div>
  );
}
