import { ArrowUpRight, Search } from "lucide-react";

import { searchIntentAnswers } from "@/lib/seo";

export function SearchIntentHub() {
  return (
    <section aria-labelledby="search-intent-title" className="content-auto border-y border-zinc-200 bg-[#fafaf8]">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.34fr_0.66fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">
              <Search className="h-3.5 w-3.5" /> respostas diretas
            </div>
            <h2 id="search-intent-title" className="mt-4 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-zinc-950">
              O que as pessoas realmente querem saber.
            </h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-zinc-600">
              Respostas curtas primeiro. Depois, um link claro para a explicação completa e para as fontes que sustentam a resposta.
            </p>
          </div>

          <div className="divide-y divide-zinc-200 border-y border-zinc-200">
            {searchIntentAnswers.map((item) => (
              <article key={item.q} className="py-6 md:py-7">
                <h3 className="text-xl font-black tracking-[-0.02em] text-zinc-950 md:text-2xl">{item.q}</h3>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-600 md:text-base">{item.a}</p>
                <a
                  href={item.href}
                  className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-zinc-950 underline decoration-zinc-300 underline-offset-4 transition hover:decoration-zinc-950"
                >
                  {item.linkLabel} <ArrowUpRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
