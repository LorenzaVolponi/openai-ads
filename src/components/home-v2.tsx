"use client";

import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight, BookOpen, Check, Radio, ShieldCheck } from "lucide-react";
import { AssistantChat } from "@/components/assistant-chat";
import { AdQualityLab } from "@/components/ad-quality-lab";
import { OfficialAdsLearning } from "@/components/official-ads-learning";
import { AuthorityMetrics, EvidenceLedger, MediaMath, ProductRealityGrid } from "@/components/authority-dashboard";
import { AuthorShowcase } from "@/components/author-showcase";
import { authorityMetrics, CHECKED_AT } from "@/lib/authority-data";

const deepDives = [
  ["/chatgpt-ads-brasil", "Brasil", "Disponibilidade, lançamento e planos."],
  ["/chatgpt-ads-precos", "Preços", "CPM, CPC, oCPC, lance e leilão."],
  ["/chatgpt-ads-metricas", "Métricas", "CTR, CPC, CPM, conversão, CPA e ROAS."],
  ["/ads-manager-chatgpt", "Ads Manager", "Recursos, países, reporting e limites do beta."],
  ["/chatgpt-ads-privacidade", "Privacidade", "Contexto, personalização e o que o anunciante recebe."],
] as const;

const topNav = [
  ["#como-aparece", "Como anunciar"],
  ["#review", "Revisar anúncio"],
  ["#dados", "Dados"],
  ["/radar", "Radar"],
  ["/imprensa", "Imprensa"],
] as const;

export default function HomeV2() {
  const navigate = (href: string) => {
    if (href.startsWith("#")) {
      document.getElementById(href.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.location.href = href;
  };

  const theme = {
    "--primary": "oklch(0.18 0 0)",
    "--primary-foreground": "oklch(1 0 0)",
    "--ring": "oklch(0.18 0 0)",
    "--signal": "oklch(0.18 0 0)",
    "--accent": "oklch(0.96 0 0)",
    "--accent-foreground": "oklch(0.18 0 0)",
  } as CSSProperties;

  return (
    <div style={theme} className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-[#fafaf8]/92 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <a href="https://volponi.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3">
            <img src="/fox-black.png" alt="" className="h-9 w-9 rounded-xl" />
            <div>
              <span className="block text-sm font-black tracking-tight">volponi.tech</span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">ChatGPT Ads Guide</span>
            </div>
          </a>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Navegação principal">
            {topNav.map(([href, label]) => (
              <a key={href} href={href} className="text-xs font-semibold text-zinc-600 transition hover:text-zinc-950">{label}</a>
            ))}
          </nav>
          <a href="/radar" className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-zinc-800">
            Ver Radar <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-zinc-200 bg-white">
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_72%_24%,rgba(0,0,0,.06),transparent_24%),linear-gradient(180deg,#fff_0%,#fafaf8_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[0.72fr_0.28fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600 shadow-sm">
                <BookOpen className="h-3.5 w-3.5" /> guia independente · volponi.tech
              </div>
              <h1 className="geo-answer mt-7 max-w-4xl font-serif text-6xl leading-[0.92] tracking-[-0.055em] text-zinc-950 sm:text-7xl md:text-8xl">
                Aprenda a fazer anúncios no ChatGPT.
              </h1>
              <p className="press-summary mt-7 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
                De forma simples, direta e útil. Veja como o anúncio aparece, como escrever melhor e como medir sem transformar hype em resultado.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button type="button" onClick={() => navigate("#como-aparece")} className="inline-flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-zinc-800">
                  Ver como funciona <ArrowRight className="h-4 w-4" />
                </button>
                <a href="https://ads.openai.com/pt-BR" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-bold text-zinc-950 transition hover:border-zinc-500">
                  Fonte oficial <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-9 flex flex-wrap gap-x-5 gap-y-2 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-zinc-950" /> sem formulário</span>
                <span className="inline-flex items-center gap-1.5"><Check className="h-3.5 w-3.5 text-zinc-950" /> sem pixel comercial</span>
                <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5 text-zinc-950" /> independente da OpenAI</span>
              </div>
            </div>

            <aside className="relative mx-auto w-full max-w-sm">
              <div className="absolute inset-6 rounded-full bg-zinc-100 blur-3xl" />
              <div className="relative rounded-[2.25rem] border border-zinc-200 bg-[#f7f7f5] p-8 text-center shadow-[0_30px_90px_rgba(0,0,0,.08)]">
                <img src="/fox-black.png" alt="Marca da volponi.tech" className="mx-auto h-36 w-36 rounded-[2rem] object-contain opacity-95" />
                <p className="mt-6 font-serif text-2xl tracking-[-0.03em]">Entender primeiro. Anunciar depois.</p>
                <p className="mt-3 text-sm leading-6 text-zinc-500">A Raposa transforma documentação técnica em explicação que dá para usar.</p>
                <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-2 text-[11px] font-semibold text-zinc-600">
                  <Radio className="h-3.5 w-3.5 text-zinc-950" /> revisão {CHECKED_AT}
                </div>
              </div>
            </aside>
          </div>

          <div className="relative mx-auto grid max-w-7xl gap-px border-t border-zinc-200 bg-zinc-200 sm:grid-cols-3">
            {authorityMetrics.slice(0, 3).map((metric) => (
              <a key={metric.label} href={metric.source.url} target="_blank" rel="noopener noreferrer" className="bg-white px-6 py-6 transition hover:bg-zinc-50">
                <p className="text-3xl font-black tracking-[-0.04em]">{metric.value}</p>
                <p className="mt-1 text-sm font-semibold text-zinc-700">{metric.label}</p>
                <p className="mt-2 text-xs leading-5 text-zinc-500">{metric.caveat}</p>
              </a>
            ))}
          </div>
        </section>

        <OfficialAdsLearning />
        <AdQualityLab />

        <section id="dados" className="scroll-mt-24 bg-white">
          <div className="mx-auto max-w-7xl px-4 pt-16 md:px-6 md:pt-24">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">Dados auditados</p>
            <h2 className="mt-4 max-w-4xl font-serif text-5xl leading-[0.96] tracking-[-0.045em] md:text-7xl">Depois de aprender o formato, veja o que já está confirmado.</h2>
            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600">Números, disponibilidade e características do produto sempre acompanhados de fonte e ressalva. Escala de produto não é alcance de mídia.</p>
          </div>
          <AuthorityMetrics />
        </section>

        <ProductRealityGrid />
        <EvidenceLedger />
        <MediaMath />

        <section className="border-y border-zinc-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr]">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">Continue aprendendo</p>
                <h2 className="mt-4 font-serif text-5xl leading-[0.98] tracking-[-0.04em]">Uma pergunta por vez.</h2>
                <p className="mt-4 text-sm leading-6 text-zinc-600">As subguias continuam existindo para quem quiser aprofundar. A home fica simples; o detalhe fica onde faz sentido.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {deepDives.map(([href, title, desc]) => (
                  <a key={href} href={href} className="group rounded-2xl border border-zinc-200 bg-[#fafaf8] p-5 transition hover:-translate-y-0.5 hover:border-zinc-400 hover:bg-white hover:shadow-md">
                    <div className="flex items-center justify-between gap-4">
                      <h3 className="font-bold text-zinc-950">{title}</h3>
                      <ArrowUpRight className="h-4 w-4 text-zinc-400 transition group-hover:text-zinc-950" />
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{desc}</p>
                  </a>
                ))}
                <a href="/radar" className="group rounded-2xl border border-zinc-950 bg-zinc-950 p-5 text-white transition hover:bg-zinc-800">
                  <div className="flex items-center justify-between gap-4"><h3 className="font-bold">Radar vivo</h3><ArrowUpRight className="h-4 w-4" /></div>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">Histórico de mudanças, fontes, dados abertos e RSS.</p>
                </a>
              </div>
            </div>
          </div>
        </section>

        <AuthorShowcase />

        <section className="bg-zinc-950 text-white">
          <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="font-serif text-3xl tracking-[-0.03em]">Projeto editorial independente.</p>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">OpenAI e ChatGPT são marcas de seus respectivos titulares. Este site é informativo, não afiliado, patrocinado, endossado, certificado, operado ou mantido pela OpenAI.</p>
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-semibold">
              <a href="/radar" className="rounded-full border border-white/15 px-4 py-2 hover:bg-white hover:text-zinc-950">Radar</a>
              <a href="/metodologia" className="rounded-full border border-white/15 px-4 py-2 hover:bg-white hover:text-zinc-950">Metodologia</a>
              <a href="/privacidade" className="rounded-full border border-white/15 px-4 py-2 hover:bg-white hover:text-zinc-950">Privacidade</a>
              <a href="/imprensa" className="rounded-full border border-white/15 px-4 py-2 hover:bg-white hover:text-zinc-950">Imprensa</a>
            </div>
          </div>
        </section>
      </main>

      <AssistantChat onNavigate={navigate} />
    </div>
  );
}
