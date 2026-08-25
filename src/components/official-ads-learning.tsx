"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, Check, MousePointer2, Target, BarChart3, Layers3 } from "lucide-react";

const OFFICIAL_ASSETS = [
  {
    id: "experience",
    label: "Como aparece",
    title: "O anúncio entra depois da resposta.",
    text: "A captura oficial mostra a resposta do ChatGPT e, abaixo dela, uma unidade patrocinada visualmente separada. É o primeiro conceito que vale guardar: anúncio e resposta não são a mesma coisa.",
    image: "https://images.ctfassets.net/j22is2dtoxu1/45gBDlpsPyrcBXyq6KoPOD/c8f39c602ea719d7ad9f14e774dd1aa4/97cc3e77-9a02-4ef4-bd75-d347531609b4.png?fm=webp&q=80&w=1205",
    source: "https://help.openai.com/pt-br/articles/20001047-ads-in-chatgpt",
    sourceLabel: "OpenAI Help Center",
    alt: "Captura oficial da OpenAI mostrando uma resposta do ChatGPT seguida de um anúncio patrocinado.",
    lessons: [
      "O anúncio é rotulado como patrocinado.",
      "Ele aparece separado da resposta.",
      "A unidade pode reunir um ou mais itens.",
      "O menu do anúncio dá acesso a controles e feedback.",
    ],
  },
  {
    id: "campaign",
    label: "Criar campanha",
    title: "Primeiro você define o que quer alcançar.",
    text: "No Ads Manager, o fluxo começa pela estrutura da campanha. A captura oficial mostra o menu Create com opções para campanhas, grupos de anúncios, anúncios e upload em massa por CSV.",
    image: "https://images.ctfassets.net/kftzwdyauwt9/66L1eFlxtO1biCpyZuJLeH/2ad05275e722783f2b038a8bec5fe13a/chatgpt-ads-get-started.png",
    source: "https://ads.openai.com/pt-BR",
    sourceLabel: "OpenAI Ads",
    alt: "Captura oficial do OpenAI Ads Manager com o menu Create aberto.",
    lessons: [
      "Campanha define objetivo e orçamento.",
      "Grupo de anúncios organiza contexto e lance.",
      "Anúncio contém a mensagem e o destino.",
      "CSV permite operações em escala.",
    ],
  },
  {
    id: "creative",
    label: "Detalhes do anúncio",
    title: "O anúncio precisa explicar valor em segundos.",
    text: "A captura oficial de criação de anúncio mostra a peça com identidade do anunciante, headline, descrição, imagem e destino. A documentação recomenda textos claros, específicos e focados em benefício.",
    image: "https://images.ctfassets.net/kftzwdyauwt9/2XgqsXUVgnwEc9dZ0GzZVx/d7b38a91b24d67e286327dbccb1ca3a4/eb4a1a9d-5aa9-4899-b27b-1ce90fc0d803.png",
    source: "https://ads.openai.com/pt-BR",
    sourceLabel: "OpenAI Ads",
    alt: "Captura oficial do OpenAI Ads Manager mostrando os detalhes de um anúncio.",
    lessons: [
      "Headline: diga o benefício principal.",
      "Copy: explique por que aquilo ajuda.",
      "Criativo: complemente a mensagem.",
      "Landing page: cumpra a promessa do anúncio.",
    ],
  },
  {
    id: "measure",
    label: "Medir",
    title: "Depois do clique, você precisa aprender.",
    text: "A captura oficial de analytics mostra tendências e métricas de campanha. O Ads Manager Beta documenta impressões, cliques, gasto, CTR, CPC médio, CPM médio e conversões quando a mensuração está configurada.",
    image: "https://images.ctfassets.net/kftzwdyauwt9/231QcbY6rhKiVufQU3ov0w/e8d589ecf9dbf93261d2fb01f2a293e7/chatgpt-ads-metrics.png",
    source: "https://ads.openai.com/pt-BR",
    sourceLabel: "OpenAI Ads",
    alt: "Captura oficial do OpenAI Ads Manager mostrando dashboard e métricas de campanha.",
    lessons: [
      "CTR mostra a proporção que clicou.",
      "CPC mostra o custo médio por clique.",
      "CPM mostra o custo por mil impressões.",
      "Conversão só ajuda se o evento representar valor real.",
    ],
  },
] as const;

const anatomy = [
  ["1", "Patrocinado", "Deixa claro que é publicidade."],
  ["2", "Marca", "Mostra quem está anunciando."],
  ["3", "Título", "Resume o benefício principal."],
  ["4", "Texto", "Explica por que a oferta ajuda."],
  ["5", "Imagem", "Acrescenta informação visual."],
  ["6", "Destino", "Leva para uma página coerente com a promessa."],
] as const;

export function OfficialAdsLearning() {
  const [activeId, setActiveId] = useState<(typeof OFFICIAL_ASSETS)[number]["id"]>("experience");
  const active = useMemo(() => OFFICIAL_ASSETS.find((item) => item.id === activeId) ?? OFFICIAL_ASSETS[0], [activeId]);

  return (
    <section id="como-aparece" className="scroll-mt-24 border-y border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="max-w-4xl">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">Aprenda olhando · prints oficiais</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-zinc-950 md:text-6xl">Como o anúncio realmente aparece — e como criar um bom.</h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 md:text-lg">
            Sem mockup fantasiado. As telas abaixo são capturas publicadas pela própria OpenAI. A volponi.tech entra apenas com a explicação didática, em linguagem simples.
          </p>
        </div>

        <div className="mt-8 flex gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Etapas de aprendizado com telas oficiais">
          {OFFICIAL_ASSETS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeId === item.id}
              onClick={() => setActiveId(item.id)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${activeId === item.id ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-950"}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <figure className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50 shadow-[0_24px_80px_rgba(0,0,0,.08)]">
            <div className="flex items-center justify-between gap-4 border-b border-zinc-200 bg-white px-5 py-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Captura oficial</p>
                <p className="mt-1 text-sm font-semibold text-zinc-950">{active.sourceLabel}</p>
              </div>
              <a href={active.source} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-950">
                Ver fonte <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="bg-[#f7f7f5] p-3 md:p-6">
              <a href={active.source} target="_blank" rel="noopener noreferrer" aria-label={`Abrir fonte oficial: ${active.sourceLabel}`}>
                <img
                  key={active.image}
                  src={active.image}
                  alt={active.alt}
                  loading="lazy"
                  className="mx-auto max-h-[660px] w-full rounded-xl border border-zinc-200 bg-white object-contain"
                />
              </a>
            </div>
            <figcaption className="border-t border-zinc-200 bg-white px-5 py-4 text-xs leading-5 text-zinc-500">
              Imagem oficial publicada pela OpenAI. O Ads Manager está em beta e a interface pode evoluir. A captura é exibida aqui apenas para explicação editorial e educacional; a volponi.tech não é afiliada à OpenAI.
            </figcaption>
          </figure>

          <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 md:p-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">O que a criança precisa entender</p>
            <h3 className="mt-3 text-2xl font-black tracking-[-0.03em] text-zinc-950">{active.title}</h3>
            <p className="mt-4 text-sm leading-6 text-zinc-600">{active.text}</p>
            <div className="mt-6 space-y-3">
              {active.lessons.map((lesson) => (
                <div key={lesson} className="flex gap-3 rounded-xl bg-zinc-50 p-3 text-sm leading-5 text-zinc-700">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-zinc-950 text-white"><Check className="h-3 w-3" /></span>
                  {lesson}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <Target className="h-5 w-5 text-zinc-950" />
            <h3 className="mt-4 font-bold text-zinc-950">1. Entenda o problema</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">O anúncio começa com a dor real que a pessoa quer resolver — não com uma frase bonita sobre a sua empresa.</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <MousePointer2 className="h-5 w-5 text-zinc-950" />
            <h3 className="mt-4 font-bold text-zinc-950">2. Mostre o benefício</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Explique em poucas palavras o ganho prático. A pessoa precisa saber por que aquilo é útil agora.</p>
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <BarChart3 className="h-5 w-5 text-zinc-950" />
            <h3 className="mt-4 font-bold text-zinc-950">3. Meça e aprenda</h3>
            <p className="mt-2 text-sm leading-6 text-zinc-600">Clique não é vitória sozinho. Leia CTR, CPC, conversão e o valor que chegou ao negócio.</p>
          </div>
        </div>

        <div className="mt-8 rounded-[1.75rem] border border-zinc-200 bg-zinc-950 p-6 text-white md:p-8">
          <div className="flex items-center gap-3">
            <Layers3 className="h-5 w-5" />
            <h3 className="text-lg font-bold">Anatomia de um anúncio, sem complicar</h3>
          </div>
          <div className="mt-6 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {anatomy.map(([n, title, desc]) => (
              <div key={n} className="bg-zinc-950 p-5">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/25 text-xs font-bold">{n}</span>
                <p className="mt-4 font-bold">{title}</p>
                <p className="mt-1 text-sm leading-5 text-zinc-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
