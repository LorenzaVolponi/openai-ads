"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, Eraser, LockKeyhole, WandSparkles } from "lucide-react";

const benefitWords = ["reduz", "economiza", "organiza", "aumenta", "melhora", "evita", "centraliza", "simplifica", "ganhe", "ganha", "resolve", "ajuda", "tempo", "custo", "sem", "mais rápido"];
const actionWords = ["saiba", "veja", "comece", "conheça", "teste", "compare", "organize", "descubra", "acesse", "fale", "solicite", "crie", "simule"];
const vagueWords = ["revolucionário", "incrível", "imperdível", "transforme sua vida", "melhor do mercado", "número 1", "clique agora", "disruptivo"];
const stopWords = new Set(["para", "com", "sem", "uma", "um", "de", "da", "do", "das", "dos", "que", "em", "no", "na", "e", "o", "a", "os", "as", "seu", "sua", "por"]);

type Draft = {
  headline: string;
  description: string;
  benefit: string;
  cta: string;
  context: string;
  landingPromise: string;
};

const examples: Record<"ruim" | "bom", Draft> = {
  ruim: {
    headline: "Transforme sua vida hoje!",
    description: "Conheça nossa plataforma revolucionária e incrível. Clique agora!",
    benefit: "A melhor solução do mercado.",
    cta: "Clique agora",
    context: "Qualquer pessoa que queira algo melhor.",
    landingPromise: "Plataforma completa para transformar tudo.",
  },
  bom: {
    headline: "Organize despesas de viagens sem planilhas",
    description: "Centralize cartões, comprovantes e aprovações em um só lugar para sua equipe financeira.",
    benefit: "Menos retrabalho para fechar despesas e mais visibilidade do que foi gasto.",
    cta: "Conheça como funciona",
    context: "Equipe financeira procurando organizar despesas de viagens corporativas.",
    landingPromise: "Página explica como centralizar cartões, comprovantes e aprovações de viagens.",
  },
};

function clampScore(value: number) {
  return Math.max(1, Math.min(5, value));
}

function tokens(value: string) {
  return value
    .toLocaleLowerCase("pt-BR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length >= 4 && !stopWords.has(token));
}

function overlapScore(a: string, b: string) {
  const first = new Set(tokens(a));
  const second = new Set(tokens(b));
  const overlap = [...first].filter((token) => second.has(token)).length;
  if (overlap >= 4) return 5;
  if (overlap >= 3) return 4;
  if (overlap >= 2) return 3;
  if (overlap >= 1) return 2;
  return 1;
}

function scoreDraft(draft: Draft) {
  const headlineWords = draft.headline.trim().split(/\s+/).filter(Boolean).length;
  const descriptionWords = draft.description.trim().split(/\s+/).filter(Boolean).length;
  const all = `${draft.headline} ${draft.description} ${draft.benefit} ${draft.cta}`.trim();
  const lower = all.toLocaleLowerCase("pt-BR");

  const vaguePenalty = vagueWords.filter((word) => lower.includes(word)).length;
  const clarity = clampScore(
    5 -
      (headlineWords === 0 ? 4 : headlineWords > 13 ? 2 : headlineWords > 10 ? 1 : 0) -
      (descriptionWords > 45 ? 2 : descriptionWords > 32 ? 1 : 0) -
      vaguePenalty
  );

  const benefitSignals = benefitWords.filter((word) => lower.includes(word)).length;
  const benefit = clampScore(1 + Math.min(3, benefitSignals) + (draft.benefit.trim().length >= 24 ? 1 : 0) - vaguePenalty);

  const specificity = clampScore(
    2 +
      (/[0-9%R$]/.test(all) ? 1 : 0) +
      (/(para|em|sem|com|por)\s+[a-záéíóúãõç]{4,}/i.test(all) ? 1 : 0) +
      (draft.benefit.trim().length >= 30 ? 1 : 0) -
      vaguePenalty
  );

  const contextFit = draft.context.trim()
    ? clampScore(overlapScore(`${draft.headline} ${draft.description} ${draft.benefit}`, draft.context) + 1)
    : 1;

  const promiseIntegrity = draft.landingPromise.trim()
    ? clampScore(overlapScore(`${draft.headline} ${draft.description} ${draft.benefit}`, draft.landingPromise) + 1)
    : 1;

  const ctaLower = draft.cta.toLocaleLowerCase("pt-BR");
  const ctaWords = draft.cta.trim().split(/\s+/).filter(Boolean).length;
  const nextStep = clampScore(
    1 +
      (actionWords.some((word) => ctaLower.includes(word)) ? 3 : 0) +
      (ctaWords >= 2 && ctaWords <= 6 ? 1 : 0) -
      (ctaLower.includes("clique agora") ? 2 : 0)
  );

  const overall = Math.round(((clarity + benefit + specificity + contextFit + promiseIntegrity + nextStep) / 30) * 100);

  const tips: string[] = [];
  if (!draft.headline.trim()) tips.push("Comece por uma headline que explique o ganho principal.");
  if (clarity < 4) tips.push("Corte palavras e adjetivos. Uma ideia principal por anúncio.");
  if (benefit < 4) tips.push("Explique o ganho prático: o que melhora para a pessoa?");
  if (specificity < 4) tips.push("Troque promessa genérica por algo concreto e verificável.");
  if (contextFit < 4) tips.push("Aproxime a mensagem da necessidade que você descreveu no contexto.");
  if (promiseIntegrity < 4) tips.push("Faça a landing continuar a mesma promessa feita no anúncio.");
  if (nextStep < 4) tips.push("Diga o próximo passo de forma simples, sem pressão artificial.");
  if (tips.length === 0) tips.push("Boa base editorial. Agora teste versões pequenas e compare resultado real de campanha.");

  return { clarity, benefit, specificity, contextFit, promiseIntegrity, nextStep, overall, tips };
}

function Meter({ value }: { value: number }) {
  return (
    <div className="flex gap-1" role="img" aria-label={`${value} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => <span key={n} aria-hidden="true" className={`h-2.5 w-2.5 rounded-full ${n <= value ? "bg-zinc-950" : "bg-zinc-200"}`} />)}
    </div>
  );
}

function Field({ label, hint, value, onChange, multiline = false }: { label: string; hint: string; value: string; onChange: (value: string) => void; multiline?: boolean }) {
  const shared = "mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-[16px] leading-6 text-zinc-950 outline-none transition focus:border-zinc-500 focus:bg-white";
  return (
    <label className="block">
      <span className="text-sm font-bold text-zinc-950">{label}</span>
      <span className="mt-1 block text-xs leading-5 text-zinc-500">{hint}</span>
      {multiline ? (
        <textarea value={value} onChange={(event) => onChange(event.target.value.slice(0, 280))} className={`${shared} min-h-24 resize-y`} />
      ) : (
        <input value={value} onChange={(event) => onChange(event.target.value.slice(0, 180))} className={shared} />
      )}
    </label>
  );
}

export function AdQualityLab() {
  const [draft, setDraft] = useState<Draft>(examples.bom);
  const result = useMemo(() => scoreDraft(draft), [draft]);

  const update = (field: keyof Draft, value: string) => setDraft((current) => ({ ...current, [field]: value }));

  const rows = [
    ["Clareza", result.clarity, "Entende rápido sem reler?"],
    ["Benefício", result.benefit, "Fica claro o que melhora?"],
    ["Especificidade", result.specificity, "A promessa é concreta?"],
    ["Contexto", result.contextFit, "A mensagem combina com a necessidade?"],
    ["Promessa", result.promiseIntegrity, "A landing continua a mesma história?"],
    ["Próximo passo", result.nextStep, "A ação é simples e coerente?"],
  ] as const;

  return (
    <section id="review" className="content-auto scroll-mt-24 bg-[#f7f7f5]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">Volponi Ad Quality Review</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-zinc-950 md:text-6xl">Monte o anúncio. A Raposa mostra onde ele ainda está fraco.</h2>
            <p className="mt-5 text-base leading-7 text-zinc-600">É uma rubrica editorial da volponi.tech, não um score oficial da OpenAI. O objetivo é ensinar coerência antes de gastar mídia.</p>
          </div>
          <div className="flex items-start gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-xs leading-5 text-zinc-600">
            <LockKeyhole className="mt-0.5 h-4 w-4 shrink-0 text-zinc-950" /> Tudo abaixo é analisado no seu navegador. O site não envia este texto para um backend.
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-5 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-bold text-zinc-950">Construa em seis peças</h3>
                <p className="mt-1 text-xs text-zinc-500">Se uma peça não fecha, o anúncio ainda não está pronto.</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="button" onClick={() => setDraft(examples.ruim)} className="min-h-10 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:border-zinc-400">Exemplo ruim</button>
                <button type="button" onClick={() => setDraft(examples.bom)} className="min-h-10 rounded-full border border-zinc-950 bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white">Exemplo bom</button>
                <button type="button" onClick={() => setDraft({ headline: "", description: "", benefit: "", cta: "", context: "", landingPromise: "" })} aria-label="Limpar campos" className="flex min-h-10 min-w-10 items-center justify-center rounded-full border border-zinc-200 text-zinc-600 hover:border-zinc-400"><Eraser className="h-4 w-4" /></button>
              </div>
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Headline" hint="Uma frase: o que melhora?" value={draft.headline} onChange={(value) => update("headline", value)} />
              <Field label="Próximo passo" hint="O que a pessoa faz depois?" value={draft.cta} onChange={(value) => update("cta", value)} />
              <div className="sm:col-span-2"><Field label="Descrição" hint="Explique por que isso ajuda, sem discurso de vendedor." value={draft.description} onChange={(value) => update("description", value)} multiline /></div>
              <Field label="Benefício concreto" hint="Qual ganho prático você consegue defender?" value={draft.benefit} onChange={(value) => update("benefit", value)} multiline />
              <Field label="Contexto" hint="Em qual necessidade essa mensagem faria sentido?" value={draft.context} onChange={(value) => update("context", value)} multiline />
              <div className="sm:col-span-2"><Field label="Promessa da landing" hint="O que a página de destino realmente entrega? Não precisa colar URL." value={draft.landingPromise} onChange={(value) => update("landingPromise", value)} multiline /></div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-5 md:p-7">
            <div className="flex items-start justify-between gap-4 rounded-2xl bg-zinc-950 p-5 text-white">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Leitura editorial</p>
                <p className="mt-1 text-4xl font-black">{result.overall}%</p>
                <p className="mt-2 max-w-xs text-xs leading-5 text-zinc-400">Não prevê performance. Mostra apenas se a mensagem está coerente o suficiente para merecer um teste real.</p>
              </div>
              <WandSparkles className="h-6 w-6 shrink-0" />
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200">
              {rows.map(([label, value, explanation]) => (
                <div key={label} className="grid gap-3 border-b border-zinc-200 p-4 last:border-0 sm:grid-cols-[1fr_auto] sm:items-center">
                  <div>
                    <p className="font-semibold text-zinc-950">{label}</p>
                    <p className="mt-1 text-xs text-zinc-500">{explanation}</p>
                  </div>
                  <Meter value={value} />
                </div>
              ))}
            </div>

            <div className="mt-6 space-y-3">
              {result.tips.map((tip, index) => (
                <div key={`${tip}-${index}`} className="flex gap-3 rounded-xl bg-zinc-50 p-4 text-sm leading-6 text-zinc-700">
                  {result.overall >= 78 && index === 0 ? <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-zinc-950" /> : <CircleAlert className="mt-1 h-4 w-4 shrink-0 text-zinc-950" />}
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 text-xs leading-5 text-zinc-500">
          Esta revisão usa uma heurística local e transparente. Ela não acessa sua conta, não prevê CTR, CPA, ROAS, aprovação ou entrega e não substitui teste de campanha nem documentação oficial.
        </div>
      </div>
    </section>
  );
}
