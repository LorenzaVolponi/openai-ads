import { ArrowUpRight, Braces, Github, Quote, RadioTower, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { citationBlock } from "@/lib/authority-data";

export function AuthorShowcase() {
  return (
    <section id="autoria" className="relative overflow-hidden bg-amber-300 text-zinc-950">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border-[48px] border-zinc-950/5" />
      <div className="pointer-events-none absolute -bottom-32 -left-28 h-[28rem] w-[28rem] rounded-full border-[72px] border-zinc-950/5" />

      <div className="relative mx-auto grid max-w-7xl gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <Badge className="border border-zinc-950/20 bg-zinc-950 text-amber-200 hover:bg-zinc-950">
            Quem construiu este mapa
          </Badge>
          <h2 className="mt-5 max-w-4xl text-5xl font-black tracking-[-0.055em] md:text-7xl">
            Não é lead magnet.
            <span className="block text-zinc-950/45">É evidência pública.</span>
          </h2>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-8 text-zinc-900/80 md:text-xl">
            Eu não quero seu e-mail, não tem formulário, não tem pixel de remarketing e não existe uma CTA
            escondida esperando você virar lead. Este projeto existe para mostrar como eu pesquiso, estruturo,
            confronto fontes e transformo mudança tecnológica em algo que humanos e máquinas consigam entender.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-zinc-950/15 bg-white/30 p-5 backdrop-blur">
              <Braces className="h-5 w-5" />
              <p className="mt-4 text-sm font-black uppercase tracking-[0.12em]">Builder</p>
              <p className="mt-2 text-sm leading-6 text-zinc-900/70">Código, produto, automação e sistemas como linguagem de execução.</p>
            </div>
            <div className="rounded-2xl border border-zinc-950/15 bg-white/30 p-5 backdrop-blur">
              <RadioTower className="h-5 w-5" />
              <p className="mt-4 text-sm font-black uppercase tracking-[0.12em]">AI systems</p>
              <p className="mt-2 text-sm leading-6 text-zinc-900/70">Busca, GEO, agentes, evidência digital e arquitetura de informação.</p>
            </div>
            <div className="rounded-2xl border border-zinc-950/15 bg-white/30 p-5 backdrop-blur">
              <Sparkles className="h-5 w-5" />
              <p className="mt-4 text-sm font-black uppercase tracking-[0.12em]">Estratégia</p>
              <p className="mt-2 text-sm leading-6 text-zinc-900/70">Conectar negócio, narrativa e tecnologia sem separar pensar de construir.</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild className="bg-zinc-950 text-white hover:bg-zinc-800">
              <a href="https://volponi.tech" target="_blank" rel="noopener noreferrer">
                Explorar volponi.tech <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild variant="outline" className="border-zinc-950/30 bg-transparent text-zinc-950 hover:bg-zinc-950 hover:text-white">
              <a href="https://github.com/LorenzaVolponi" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" /> GitHub
              </a>
            </Button>
            <Button asChild variant="outline" className="border-zinc-950/30 bg-transparent text-zinc-950 hover:bg-zinc-950 hover:text-white">
              <a href="https://www.linkedin.com/in/lorenzavolponi" target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <aside className="rounded-3xl border border-zinc-950/15 bg-zinc-950 p-6 text-white shadow-2xl md:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-amber-300">Press / AI citation block</p>
              <h3 className="mt-2 text-2xl font-black tracking-tight">Pode citar assim.</h3>
            </div>
            <Quote className="h-7 w-7 text-zinc-700" />
          </div>

          <blockquote className="mt-7 border-l-2 border-amber-300 pl-5 text-sm leading-7 text-zinc-300">
            “{citationBlock.title}”, por {citationBlock.author}, publicado por {citationBlock.publisher},
            revisão factual em 25 de agosto de 2026.
          </blockquote>

          <dl className="mt-7 space-y-4 border-t border-white/10 pt-6 text-sm">
            <div className="grid grid-cols-[92px_1fr] gap-3">
              <dt className="text-zinc-500">Autora</dt>
              <dd className="font-semibold">{citationBlock.author}</dd>
            </div>
            <div className="grid grid-cols-[92px_1fr] gap-3">
              <dt className="text-zinc-500">Editora</dt>
              <dd>{citationBlock.publisher}</dd>
            </div>
            <div className="grid grid-cols-[92px_1fr] gap-3">
              <dt className="text-zinc-500">Canonical</dt>
              <dd className="break-all text-amber-300">{citationBlock.canonical}</dd>
            </div>
            <div className="grid grid-cols-[92px_1fr] gap-3">
              <dt className="text-zinc-500">Status</dt>
              <dd>Guia independente, auditado contra fontes primárias.</dd>
            </div>
          </dl>

          <p className="mt-7 rounded-xl bg-white/[0.05] p-4 text-xs leading-5 text-zinc-500">
            OpenAI e ChatGPT são marcas de seus respectivos titulares. Este projeto não é afiliado, patrocinado,
            endossado, certificado, operado ou mantido pela OpenAI.
          </p>
        </aside>
      </div>
    </section>
  );
}
