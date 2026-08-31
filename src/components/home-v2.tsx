import type { CSSProperties } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, BookOpen, Check, Radio, ShieldCheck } from "lucide-react";
import { AssistantChat } from "@/components/assistant-chat";
import { AdQualityLab } from "@/components/ad-quality-lab";
import { IntelligenceHub } from "@/components/intelligence-hub";
import { OfficialAdsLearning } from "@/components/official-ads-learning";
import { AuthorityMetrics, EvidenceLedger, MediaMath, ProductRealityGrid } from "@/components/authority-dashboard";
import { AuthorShowcase } from "@/components/author-showcase";
import { MobileDock } from "@/components/mobile-dock";
import { SearchIntentHub } from "@/components/search-intent-hub";
import { authorityMetrics, CHECKED_AT } from "@/lib/authority-data";

const deepDives = [
  ["/chatgpt-ads-brasil", "ChatGPT Ads no Brasil", "Disponibilidade, lançamento e planos."],
  ["/chatgpt-ads-market", "Market Snapshot", "Países disponíveis, coming soon e fonte oficial."],
  ["/chatgpt-ads-precos", "Quanto custa anunciar?", "CPM, CPC, oCPC, lance e leilão."],
  ["/chatgpt-ads-metricas", "Métricas do ChatGPT Ads", "CTR, CPC, CPM, conversão, CPA e ROAS."],
  ["/ads-manager-chatgpt", "OpenAI Ads Manager", "Recursos, países, reporting e limites do beta."],
  ["/chatgpt-ads-privacidade", "Privacidade no ChatGPT Ads", "Contexto, personalização e o que o anunciante recebe."],
  ["/chatgpt-ads-vs-google-ads", "ChatGPT Ads vs Google Ads", "Intenção conversacional, busca e complementaridade."],
  ["/chatgpt-ads-vs-meta-ads", "ChatGPT Ads vs Meta Ads", "Conversa, descoberta criativa e mensuração."],
  ["/chatgpt-ads-para-agencias", "Playbook para agências", "Operação, governança, piloto e critérios de escala."],
] as const;

const topNav = [
  ["#como-aparece", "Como anunciar"],
  ["#review", "Revisar anúncio"],
  ["#intelligence", "Intelligence"],
  ["#dados", "Dados"],
  ["/radar", "Radar"],
  ["/imprensa", "Imprensa"],
] as const;

export default function HomeV2() {
  const theme = {
    "--primary": "oklch(0.18 0 0)",
    "--primary-foreground": "oklch(1 0 0)",
    "--ring": "oklch(0.18 0 0)",
    "--signal": "oklch(0.18 0 0)",
    "--accent": "oklch(0.96 0 0)",
    "--accent-foreground": "oklch(0.18 0 0)",
  } as CSSProperties;

  return (
    <div style={theme} className="min-h-screen bg-[#fafaf8] pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-zinc-950 lg:pb-0">
      <a href="#main-content" className="skip-link">Pular para o conteúdo</a>

      <header className="sticky top-0 z-50 border-b border-zinc-200/80 bg-[#fafaf8]/94 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 md:px-6">
          <a href="https://volponi.tech" target="_blank" rel="noopener noreferrer" className="flex min-w-0 items-center gap-3">
            <Image src="/fox-black.png" alt="" width={36} height={36} className="h-9 w-9 shrink-0 rounded-xl" />
            <div className="min-w-0">
              <span className="block truncate text-sm font-black tracking-tight">volponi.tech</span>
              <span className="block truncate font-mono text-[9px] uppercase tracking-[0.18em] text-zinc-500">ChatGPT Ads Intelligence</span>
            </div>
          </a>
          <nav className="hidden items-center gap-5 lg:flex" aria-label="Navegação principal">
            {topNav.map(([href, label]) => (
              <a key={href} href={href} className="text-xs font-semibold text-zinc-600 transition hover:text-zinc-950">{label}</a>
            ))}
          </nav>
          <a href="/radar" className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-zinc-800">
            <span className="hidden sm:inline">Ver Radar</span><span className="sm:hidden">Radar</span> <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      <main id="main-content">
        <section className="relative overflow-hidden border-b border-zinc-200 bg-white">
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(circle_at_72%_24%,rgba(0,0,0,.055),transparent_24%),linear-gradient(180deg,#fff_0%,#fafaf8_100%)]" />
          <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-14 md:px-6 md:py-24 lg:grid-cols-[0.72fr_0.28fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600 shadow-sm">
                <BookOpen className="h-3.5 w-3.5" /> guia independente · volponi.tech
              </div>
              <h1 className="geo-answer mt-7 max-w-4xl font-serif text-[clamp(3.35rem,14vw,5rem)] leading-[0.92] tracking-[-0.055em] text-zinc-950 md:text-8xl">
                Aprenda a fazer anúncios no ChatGPT.
              </h1>
              <p className="press-summary mt-7 max-w-2xl text-lg leading-8 text-zinc-600 md:text-xl">
                De forma simples, direta e útil. Veja como o anúncio aparece, como escrever melhor, como medir e onde o produto realmente está disponível — sem transformar hype em resultado.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <a href="#como-aparece" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-zinc-800">
                  Ver como funciona <ArrowRight className="h-4 w-4" />
                </a>
                <a href="#intelligence" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-bold text-zinc-950 transition hover:border-zinc-500">
                  Abrir Intelligence <ArrowRight className="h-4 w-4" />
                </a>
                <a href="https://ads.openai.com/pt-BR" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-bold text-zinc-950 transition hover:border-zinc-500">
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
                <Image src="/fox-black.png" alt="Marca da volponi.tech" width={144} height={144} className="mx-auto h-36 w-36 rounded-[2rem] object-contain opacity-95" />
                <p className="mt-6 font-serif text-2xl tracking-[-0.03em]">Entender primeiro. Anunciar depois.</p>
                <p className="mt-3 text-sm leading-6 text-zinc-500">A Raposa transforma documentação técnica em explicação, evidência e decisão que dá para usar.</p>
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
        <SearchIntentHub />
        <IntelligenceHub />

        <section id="dados" className="content-auto scroll-mt-24 bg-white">
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

        <section className="content-auto border-y border-zinc-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <div className="grid gap-10 lg:grid-cols-[0.32fr_0.68fr]">
              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">Continue aprendendo</p>
                <h2 className="mt-4 font-serif text-5xl leading-[0.98] tracking-[-0.04em]">Uma pergunta por vez. Uma arquitetura inteira por trás.</h2>
                <p className="mt-4 text-sm leading-6 text-zinc-600">As subguias aprofundam cada intenção sem duplicar conteúdo. A home organiza a decisão; as páginas carregam detalhe, fonte e limite.</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
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
                  <div className="flex items-center justify-between gap-4"><h3 className="font-bold">Volponi ChatGPT Ads Radar</h3><ArrowUpRight className="h-4 w-4" /></div>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">Histórico de mudanças, fontes, dados abertos e RSS.</p>
                </a>
                <a href="/imprensa/dados" className="group rounded-2xl border border-zinc-950 bg-white p-5 text-zinc-950 transition hover:bg-zinc-50">
                  <div className="flex items-center justify-between gap-4"><h3 className="font-bold">Dados para imprensa</h3><ArrowUpRight className="h-4 w-4" /></div>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">Factsheet, ressalvas e citação pronta em formato humano e JSON.</p>
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
              <a href="/chatgpt-ads-market" className="rounded-full border border-white/15 px-4 py-2 hover:bg-white hover:text-zinc-950">Market</a>
              <a href="/radar" className="rounded-full border border-white/15 px-4 py-2 hover:bg-white hover:text-zinc-950">Radar</a>
              <a href="/metodologia" className="rounded-full border border-white/15 px-4 py-2 hover:bg-white hover:text-zinc-950">Metodologia</a>
              <a href="/privacidade" className="rounded-full border border-white/15 px-4 py-2 hover:bg-white hover:text-zinc-950">Privacidade</a>
              <a href="/imprensa" className="rounded-full border border-white/15 px-4 py-2 hover:bg-white hover:text-zinc-950">Imprensa</a>
              <a href="/en" className="rounded-full border border-white/15 px-4 py-2 hover:bg-white hover:text-zinc-950">English</a>
            </div>
          </div>
        </section>
      </main>

      <MobileDock />
      <AssistantChat />
    </div>
  );
}
