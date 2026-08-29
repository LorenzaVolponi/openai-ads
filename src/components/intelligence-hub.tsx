import { ArrowUpRight, Database, Network, Newspaper, RadioTower } from "lucide-react";

import { marketStates, RADAR_CHECKED_AT, radarEntries } from "@/lib/radar-data";

const topicLinks = [
  ["/chatgpt-ads-brasil", "Brasil", "status, rollout e elegibilidade"],
  ["/como-anunciar-no-chatgpt", "Como anunciar", "jornada operacional e configuração"],
  ["/ads-manager-chatgpt", "Ads Manager", "autosserviço, recursos e limites"],
  ["/chatgpt-ads-precos", "Preços", "mínimos, lances e modelos de compra"],
  ["/chatgpt-ads-metricas", "Métricas", "CTR, CPC, CPM, CPA e ROAS"],
  ["/chatgpt-ads-privacidade", "Privacidade", "dados, contexto e proteção do usuário"],
  ["/chatgpt-ads-vs-google-ads", "vs Google Ads", "intenção, busca e complementaridade"],
  ["/chatgpt-ads-vs-meta-ads", "vs Meta Ads", "conversa, descoberta e criatividade"],
  ["/chatgpt-ads-para-agencias", "Para agências", "operação, governança e piloto"],
  ["/radar", "Radar", "mudanças oficiais e memória temporal"],
] as const;

const available = marketStates.filter((market) => market.adsManager === "Available");
const comingSoon = marketStates.filter((market) => market.adsManager === "Coming Soon");
const latest = radarEntries.slice(0, 3);

export function IntelligenceHub() {
  return (
    <section className="border-y border-zinc-200 bg-[#f4f4f1]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-300 bg-white px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600">
              <RadioTower className="h-3.5 w-3.5" /> OpenAI Ads Intelligence
            </div>
            <h2 className="mt-5 font-serif text-5xl leading-[0.94] tracking-[-0.045em] md:text-7xl">Uma camada de inteligência, não só um guia.</h2>
          </div>
          <p className="max-w-2xl text-base leading-7 text-zinc-600 lg:justify-self-end">
            O Radar registra mudanças; o Market Snapshot mostra disponibilidade; o Authority Graph conecta cada intenção à evidência certa. Revisão editorial: {RADAR_CHECKED_AT}.
          </p>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          <article className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-white"><Database className="h-4 w-4" /></span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">Market snapshot</span>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-[#fafaf8] p-4"><p className="text-3xl font-black">{available.length}</p><p className="mt-1 text-xs text-zinc-500">Available</p></div>
              <div className="rounded-2xl bg-[#fafaf8] p-4"><p className="text-3xl font-black">{comingSoon.length}</p><p className="mt-1 text-xs text-zinc-500">Coming Soon</p></div>
            </div>
            <a href="/chatgpt-ads-market" className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Abrir mapa de mercados <ArrowUpRight className="h-4 w-4" /></a>
          </article>

          <article className="rounded-[2rem] border border-zinc-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between gap-4">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-zinc-950 text-white"><Network className="h-4 w-4" /></span>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-zinc-500">Topic authority graph</span>
            </div>
            <div className="mt-6 grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
              {topicLinks.map(([href, title, desc]) => (
                <a key={href} href={href} className="rounded-2xl border border-zinc-200 bg-[#fafaf8] p-4 transition hover:border-zinc-400 hover:bg-white">
                  <p className="text-sm font-black">{title}</p>
                  <p className="mt-1 text-xs leading-5 text-zinc-500">{desc}</p>
                </a>
              ))}
            </div>
          </article>
        </div>

        <div className="mt-4 rounded-[2rem] border border-zinc-200 bg-zinc-950 p-6 text-white md:p-8">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-400"><Newspaper className="h-3.5 w-3.5" /> Latest verified changes</div>
              <h3 className="mt-3 font-serif text-3xl tracking-[-0.03em] md:text-4xl">Radar Intelligence</h3>
            </div>
            <a href="/radar" className="inline-flex items-center gap-2 text-sm font-bold">Ver histórico completo <ArrowUpRight className="h-4 w-4" /></a>
          </div>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {latest.map((entry) => (
              <a key={entry.slug} href={`/radar/${entry.slug}`} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 transition hover:bg-white/[0.08]">
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400">{entry.date} · {entry.market}</p>
                <p className="mt-3 text-base font-black leading-6">{entry.title}</p>
                <p className="mt-2 text-xs leading-5 text-zinc-400">{entry.currentState}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
