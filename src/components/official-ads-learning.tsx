"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { ArrowRight, ArrowUpRight, BarChart3, Check, Focus, Layers3, Minus, MousePointer2, Plus, RotateCcw, Target } from "lucide-react";

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
  { id: "sponsored", n: "1", title: "Patrocinado", desc: "Deixa claro que é publicidade.", question: "A pessoa consegue distinguir anúncio de resposta sem precisar adivinhar?" },
  { id: "brand", n: "2", title: "Marca", desc: "Mostra quem está anunciando.", question: "Está claro quem assume a promessa e para qual marca o clique leva?" },
  { id: "headline", n: "3", title: "Título", desc: "Resume o benefício principal.", question: "O título explica um ganho concreto em poucos segundos?" },
  { id: "copy", n: "4", title: "Texto", desc: "Explica por que a oferta ajuda.", question: "A copy responde por que isso é útil agora, sem encher de adjetivos?" },
  { id: "image", n: "5", title: "Imagem", desc: "Acrescenta informação visual.", question: "O criativo ensina alguma coisa ou só ocupa espaço?" },
  { id: "destination", n: "6", title: "Destino", desc: "Leva para uma página coerente com a promessa.", question: "A landing continua exatamente a conversa iniciada pelo anúncio?" },
] as const;

type AnatomyId = (typeof anatomy)[number]["id"];

export function OfficialAdsLearning() {
  const [activeId, setActiveId] = useState<(typeof OFFICIAL_ASSETS)[number]["id"]>("experience");
  const [zoom, setZoom] = useState(1);
  const [deconstruct, setDeconstruct] = useState(false);
  const [anatomyId, setAnatomyId] = useState<AnatomyId>("sponsored");
  const active = useMemo(() => OFFICIAL_ASSETS.find((item) => item.id === activeId) ?? OFFICIAL_ASSETS[0], [activeId]);
  const activeAnatomy = anatomy.find((item) => item.id === anatomyId) ?? anatomy[0];

  const selectScreen = (id: (typeof OFFICIAL_ASSETS)[number]["id"]) => {
    setActiveId(id);
    setZoom(1);
  };

  return (
    <section id="como-aparece" className="content-auto scroll-mt-24 border-y border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="max-w-4xl">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">Aprenda olhando · prints oficiais</p>
          <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-zinc-950 md:text-6xl">Como o anúncio realmente aparece — e como criar um bom.</h2>
          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 md:text-lg">
            Sem mockup fantasiado. As telas abaixo são capturas publicadas pela própria OpenAI. A volponi.tech entra apenas com a explicação didática, em linguagem simples.
          </p>
        </div>

        <div className="mt-8 flex snap-x gap-2 overflow-x-auto pb-3" role="tablist" aria-label="Etapas de aprendizado com telas oficiais">
          {OFFICIAL_ASSETS.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeId === item.id}
              aria-controls="official-screen-panel"
              onClick={() => selectScreen(item.id)}
              className={`min-h-11 shrink-0 snap-start rounded-full border px-4 py-2 text-sm font-semibold transition ${activeId === item.id ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-400 hover:text-zinc-950"}`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div id="official-screen-panel" role="tabpanel" className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <figure className="overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-zinc-50 shadow-[0_24px_80px_rgba(0,0,0,.08)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-white px-4 py-4 md:px-5">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-zinc-500">Captura oficial</p>
                <p className="mt-1 text-sm font-semibold text-zinc-950">{active.sourceLabel}</p>
              </div>
              <div className="flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 p-1" aria-label="Controles de ampliação">
                <button type="button" onClick={() => setZoom((value) => Math.max(1, Number((value - 0.25).toFixed(2))))} disabled={zoom <= 1} aria-label="Diminuir imagem" className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 hover:bg-white disabled:opacity-30"><Minus className="h-4 w-4" /></button>
                <span className="min-w-12 text-center font-mono text-[10px] font-bold text-zinc-500">{Math.round(zoom * 100)}%</span>
                <button type="button" onClick={() => setZoom((value) => Math.min(1.75, Number((value + 0.25).toFixed(2))))} disabled={zoom >= 1.75} aria-label="Ampliar imagem" className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 hover:bg-white disabled:opacity-30"><Plus className="h-4 w-4" /></button>
                <button type="button" onClick={() => setZoom(1)} aria-label="Restaurar ampliação" className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-600 hover:bg-white"><RotateCcw className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="relative h-[min(62dvh,660px)] min-h-[360px] overflow-hidden bg-[#f7f7f5]">
              <div className="absolute inset-0 transition-transform duration-200 ease-out" style={{ transform: `scale(${zoom})` }}>
                <Image
                  key={active.image}
                  src={active.image}
                  alt={active.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 68vw"
                  quality={82}
                  className="object-contain p-3 md:p-6"
                />
              </div>
            </div>

            <figcaption className="border-t border-zinc-200 bg-white px-5 py-4 text-xs leading-5 text-zinc-500">
              Imagem oficial publicada pela OpenAI. O Ads Manager está em beta e a interface pode evoluir. A captura é exibida aqui apenas para explicação editorial e educacional; a volponi.tech não é afiliada à OpenAI.
              <a href={active.source} target="_blank" rel="noopener noreferrer" className="ml-2 inline-flex items-center gap-1 font-semibold text-zinc-950 hover:underline">Abrir fonte em tamanho real <ArrowUpRight className="h-3.5 w-3.5" /></a>
            </figcaption>
          </figure>

          <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-6 md:p-8">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">O que você precisa guardar</p>
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
            <button type="button" onClick={() => setDeconstruct((value) => !value)} className="mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full border border-zinc-950 bg-white px-4 py-2 text-sm font-bold text-zinc-950 transition hover:bg-zinc-950 hover:text-white">
              <Focus className="h-4 w-4" /> {deconstruct ? "Fechar radiografia" : "Desmontar este anúncio"}
            </button>
          </div>
        </div>

        {deconstruct ? (
          <div className="mt-6 rounded-[1.75rem] border border-zinc-200 bg-[#fafaf8] p-5 md:p-7">
            <div className="grid gap-6 lg:grid-cols-[0.58fr_0.42fr]">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Radiografia didática</p>
                <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {anatomy.map((item) => (
                    <button key={item.id} type="button" onClick={() => setAnatomyId(item.id)} className={`min-h-20 rounded-2xl border p-4 text-left transition ${anatomyId === item.id ? "border-zinc-950 bg-zinc-950 text-white" : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400"}`}>
                      <span className={`flex h-7 w-7 items-center justify-center rounded-full border text-xs font-bold ${anatomyId === item.id ? "border-white/30" : "border-zinc-300"}`}>{item.n}</span>
                      <span className="mt-3 block text-sm font-bold">{item.title}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-zinc-200 bg-white p-6">
                <p className="font-mono text-xs font-bold text-zinc-500">{activeAnatomy.n}/6</p>
                <h3 className="mt-2 text-2xl font-black tracking-[-0.03em]">{activeAnatomy.title}</h3>
                <p className="mt-3 text-sm leading-6 text-zinc-600">{activeAnatomy.desc}</p>
                <p className="mt-5 border-l-2 border-zinc-950 pl-4 text-sm font-semibold leading-6 text-zinc-950">Pergunte: {activeAnatomy.question}</p>
                <a href="#review" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white">Agora revise o seu <ArrowRight className="h-4 w-4" /></a>
              </div>
            </div>
          </div>
        ) : null}

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
            <h3 className="text-lg font-bold">Regra simples</h3>
          </div>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-400">Problema real → benefício claro → promessa específica → próximo passo coerente → mensuração. Se uma etapa não faz sentido, o anúncio ainda não está pronto para mídia.</p>
        </div>
      </div>
    </section>
  );
}
