"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, CircleAlert, LockKeyhole, WandSparkles } from "lucide-react";

const benefitWords = ["reduz", "economiza", "organiza", "aumenta", "melhora", "evita", "centraliza", "simplifica", "ganhe", "ganha", "resolve", "ajuda", "resultado", "benefício", "tempo", "custo"];
const actionWords = ["saiba", "veja", "comece", "conheça", "teste", "compare", "organize", "descubra", "acesse", "fale", "solicite", "crie"];
const vagueWords = ["revolucionário", "incrível", "imperdível", "transforme sua vida", "melhor do mercado", "número 1", "clique agora"];

function scoreText(raw: string) {
  const text = raw.trim();
  const lower = text.toLocaleLowerCase("pt-BR");
  const words = text ? text.split(/\s+/).length : 0;

  const clarity = Math.max(1, Math.min(5, 5 - Math.max(0, Math.floor((words - 38) / 18)) - (text.length > 320 ? 1 : 0)));
  const benefit = Math.max(1, Math.min(5, 1 + benefitWords.filter((word) => lower.includes(word)).length));
  const specificity = Math.max(1, Math.min(5, 2 + (/[0-9%R$]/.test(text) ? 1 : 0) + (/(para|em|sem|com|por)\s+[a-záéíóúãõç]{4,}/i.test(text) ? 1 : 0) - vagueWords.filter((word) => lower.includes(word)).length));
  const nextStep = Math.max(1, Math.min(5, 1 + actionWords.filter((word) => lower.includes(word)).length * 2));
  const overall = Math.round(((clarity + benefit + specificity + nextStep) / 20) * 100);

  const tips: string[] = [];
  if (!text) tips.push("Cole um anúncio para começar.");
  if (clarity < 4) tips.push("Corte palavras. Uma ideia principal por anúncio.");
  if (benefit < 4) tips.push("Explique o ganho prático: o que melhora para a pessoa?");
  if (specificity < 4) tips.push("Troque promessa genérica por algo concreto e verificável.");
  if (nextStep < 4) tips.push("Diga qual é o próximo passo sem pressionar.");
  if (tips.length === 0) tips.push("Boa base. Agora teste versões pequenas e compare resultado real.");

  return { clarity, benefit, specificity, nextStep, overall, tips };
}

const examples = {
  ruim: "Transforme sua vida hoje! Conheça nossa plataforma revolucionária. Clique agora!",
  bom: "Organize despesas de viagens sem planilhas. Centralize cartões, comprovantes e aprovações em um só lugar para sua equipe financeira. Conheça como funciona.",
};

function Meter({ value }: { value: number }) {
  return (
    <div className="flex gap-1" aria-label={`${value} de 5`}>
      {[1, 2, 3, 4, 5].map((n) => <span key={n} className={`h-2.5 w-2.5 rounded-full ${n <= value ? "bg-zinc-950" : "bg-zinc-200"}`} />)}
    </div>
  );
}

export function AdQualityLab() {
  const [text, setText] = useState(examples.bom);
  const result = useMemo(() => scoreText(text), [text]);

  const rows = [
    ["Clareza", result.clarity, "A pessoa entende rápido?"],
    ["Benefício", result.benefit, "Fica claro o que ela ganha?"],
    ["Especificidade", result.specificity, "A promessa é concreta?"],
    ["Próximo passo", result.nextStep, "Ela sabe o que fazer depois?"],
  ] as const;

  return (
    <section id="review" className="scroll-mt-24 bg-[#f7f7f5]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">Volponi Ad Quality Review</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] text-zinc-950 md:text-6xl">Cole o anúncio. A Raposa explica como melhorar.</h2>
            <p className="mt-5 text-base leading-7 text-zinc-600">É uma rubrica editorial da volponi.tech, não um score oficial da OpenAI. Serve para ensinar clareza, benefício, especificidade e próximo passo.</p>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-3 text-xs text-zinc-600">
            <LockKeyhole className="h-4 w-4 text-zinc-950" /> A análise acontece no seu navegador. Este módulo não envia o texto para um backend.
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-5 md:p-7">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-lg font-bold text-zinc-950">Seu anúncio</h3>
              <div className="flex gap-2">
                <button type="button" onClick={() => setText(examples.ruim)} className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-600 hover:border-zinc-400">Exemplo ruim</button>
                <button type="button" onClick={() => setText(examples.bom)} className="rounded-full border border-zinc-950 bg-zinc-950 px-3 py-1.5 text-xs font-semibold text-white">Exemplo bom</button>
              </div>
            </div>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value.slice(0, 700))}
              aria-label="Texto do anúncio para análise"
              className="mt-5 min-h-56 w-full resize-y rounded-2xl border border-zinc-200 bg-zinc-50 p-4 text-base leading-7 text-zinc-950 outline-none transition focus:border-zinc-500"
              placeholder="Ex.: Organize despesas de viagens sem planilhas..."
            />
            <div className="mt-2 text-right text-xs text-zinc-400">{text.length}/700</div>
            <div className="mt-5 rounded-2xl bg-zinc-950 p-5 text-white">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.16em] text-zinc-400">Leitura editorial</p>
                  <p className="mt-1 text-3xl font-black">{result.overall}%</p>
                </div>
                <WandSparkles className="h-6 w-6" />
              </div>
              <p className="mt-3 text-xs leading-5 text-zinc-400">Use como diagnóstico didático. Resultado de mídia só existe depois de campanha, mensuração e teste.</p>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-zinc-200 bg-white p-5 md:p-7">
            <h3 className="text-lg font-bold text-zinc-950">Análise simples</h3>
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
                  {result.overall >= 75 && index === 0 ? <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-zinc-950" /> : <CircleAlert className="mt-1 h-4 w-4 shrink-0 text-zinc-950" />}
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 text-sm leading-6 text-zinc-600">
          <strong className="text-zinc-950">Regra de ouro:</strong> em ChatGPT Ads, a documentação oficial recomenda texto claro, específico e focado em benefício. O sistema também considera contexto, landing page, headline e copy para relevância. Este review traduz essas ideias em uma ferramenta de aprendizado — sem prometer performance.
        </div>
      </div>
    </section>
  );
}
