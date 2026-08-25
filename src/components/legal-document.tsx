import type { ReactNode } from "react";

export function LegalDocument({
  eyebrow,
  title,
  description,
  updatedAt,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <main className="relative z-10 min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-card/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-5 md:px-6">
          <a href="/" className="flex items-center gap-3" aria-label="Voltar ao guia">
            <img src="/fox-black.png" alt="Marca volponi.tech" width={36} height={36} className="h-9 w-9 rounded-lg" />
            <span className="font-semibold">volponi.tech</span>
          </a>
          <a href="/" className="text-sm font-medium text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
            Voltar ao guia
          </a>
        </div>
      </header>

      <article className="mx-auto max-w-4xl px-4 py-14 md:px-6 md:py-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{eyebrow}</p>
        <h1 className="mt-3 text-4xl font-black tracking-tight md:text-6xl">{title}</h1>
        <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
        <p className="mt-4 text-sm text-muted-foreground">Última atualização: {updatedAt}</p>
        <div className="legal-copy mt-12 space-y-10">{children}</div>
      </article>
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
      <div className="space-y-3 leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}
