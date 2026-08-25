"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Check,
  ExternalLink,
  Menu,
  Radio,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AssistantChat } from "@/components/assistant-chat";
import {
  AuthorityMetrics,
  EvidenceLedger,
  MediaMath,
  ProductRealityGrid,
  TrustPrinciples,
} from "@/components/authority-dashboard";
import { AuthorShowcase } from "@/components/author-showcase";
import { CHECKED_AT, SOURCES } from "@/lib/authority-data";
import { SHARE_TEXT, SHARE_URL, faqs, strategies, timeline } from "@/lib/content";

const navigation = [
  { label: "Panorama", href: "#panorama" },
  { label: "Dados", href: "#dados-reais" },
  { label: "Produto", href: "#produto-real" },
  { label: "Evidência", href: "#evidencia" },
  { label: "Métricas", href: "#metricas" },
  { label: "Estratégia", href: "#estrategias" },
  { label: "FAQ", href: "#faq" },
  { label: "Autoria", href: "#autoria" },
];

function SourceChip({ label, href }: { label: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary"
    >
      {label} <ArrowUpRight className="h-3 w-3" />
    </a>
  );
}

function EditorialSection({
  id,
  eyebrow,
  title,
  subtitle,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 py-16 md:px-6 md:py-24"
    >
      <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr]">
        <div>
          <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">{eyebrow}</div>
        </div>
        <div>
          <h2 className="max-w-4xl text-4xl font-black tracking-[-0.045em] md:text-6xl">{title}</h2>
          {subtitle ? <p className="mt-5 max-w-3xl text-base leading-7 text-muted-foreground md:text-lg">{subtitle}</p> : null}
          <div className="mt-10">{children}</div>
        </div>
      </div>
    </motion.section>
  );
}

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (href: string) => {
    const id = href.startsWith("#") ? href.slice(1) : href;
    const target = document.getElementById(id);
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const share = async () => {
    const payload = {
      title: "ChatGPT Ads no Brasil 2026 — Lorenza Volponi",
      text: SHARE_TEXT,
      url: SHARE_URL,
    };
    if (navigator.share) {
      try {
        await navigator.share(payload);
        return;
      } catch {
        return;
      }
    }
    try {
      await navigator.clipboard.writeText(`${SHARE_TEXT} ${SHARE_URL}`);
    } catch {
      // A URL canônica continua visível caso a Clipboard API não esteja disponível.
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-background/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
          <a href="https://volponi.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5">
            <img src="/fox-black.png" alt="" width={34} height={34} className="h-8.5 w-8.5 rounded-lg" />
            <div className="leading-tight">
              <span className="block text-sm font-black">volponi.tech</span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">independent intelligence</span>
            </div>
          </a>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Navegação principal">
            {navigation.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="rounded-full px-3 py-2 text-xs font-medium text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden items-center gap-2 sm:flex">
            <Badge variant="outline" className="hidden border-emerald-500/25 bg-emerald-500/5 text-emerald-700 md:inline-flex">
              <Radio className="mr-1.5 h-3 w-3" /> revisão {CHECKED_AT}
            </Badge>
            <Button size="sm" variant="outline" onClick={share}>Compartilhar</Button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border xl:hidden"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen ? (
          <nav className="border-t border-border bg-background px-4 py-4 xl:hidden" aria-label="Navegação mobile">
            <div className="mx-auto grid max-w-7xl gap-1 sm:grid-cols-2">
              {navigation.map((item) => (
                <button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  className="rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        ) : null}
      </header>

      <main>
        <section id="panorama" className="relative overflow-hidden bg-zinc-950 text-white">
          <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] [background-size:48px_48px]" />
          <div className="pointer-events-none absolute -right-40 -top-40 h-[42rem] w-[42rem] rounded-full bg-amber-300/10 blur-3xl" />

          <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl gap-12 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge className="border border-amber-300/30 bg-amber-300/10 text-amber-200 hover:bg-amber-300/10">
                  Brasil · 2026 · fonte primária
                </Badge>
                <Badge className="border border-white/10 bg-white/5 text-zinc-300 hover:bg-white/5">
                  sem formulário · sem pixel · sem afiliação com a OpenAI
                </Badge>
              </div>

              <h1 className="geo-answer mt-8 max-w-5xl text-6xl font-black leading-[0.92] tracking-[-0.065em] sm:text-7xl md:text-8xl">
                ChatGPT Ads
                <span className="block text-amber-300">no Brasil.</span>
                <span className="block text-zinc-600">Sem folclore.</span>
              </h1>

              <p className="press-summary mt-8 max-w-3xl text-lg leading-8 text-zinc-300 md:text-xl">
                Dados, preços, métricas, Ads Manager, privacidade e mecanismo de veiculação — auditados contra
                documentação primária e explicados com o detalhe que falta quando um produto novo vira hype.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button size="lg" onClick={() => scrollTo("#dados-reais")} className="bg-amber-300 text-zinc-950 hover:bg-amber-200">
                  Ver os dados <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline" onClick={() => scrollTo("#autoria")} className="border-white/20 bg-transparent text-white hover:bg-white hover:text-zinc-950">
                  Quem fez isso?
                </Button>
              </div>

              <div className="mt-10 max-w-3xl">
                <TrustPrinciples />
              </div>
            </div>

            <aside className="relative rounded-[2rem] border border-white/10 bg-white/[0.045] p-6 shadow-2xl backdrop-blur md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">Estado da rede</p>
                  <h2 className="mt-2 text-2xl font-black tracking-tight">O retrato em 60 segundos</h2>
                </div>
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
                </span>
              </div>

              <div className="mt-7 space-y-1 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70">
                {[
                  ["Brasil", "Ads Manager disponível"],
                  ["Planos com ads", "Free e Go"],
                  ["Sem ads", "Plus, Pro, Business, Enterprise, Edu"],
                  ["Compra", "CPM · CPC · oCPC"],
                  ["Relatório", "7 métricas centrais"],
                  ["Resposta", "independente do anúncio"],
                ].map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[112px_1fr] gap-4 border-b border-white/[0.06] px-4 py-3 last:border-0">
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-zinc-600">{label}</span>
                    <span className="text-sm font-semibold text-zinc-200">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-amber-300/20 bg-amber-300/[0.06] p-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-amber-200">
                  <Sparkles className="h-4 w-4" /> A leitura que muda tudo
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  A escala do ChatGPT é enorme. O erro é transformar escala de produto em alcance publicitário,
                  ou recomendação de lance em benchmark de performance. Este guia separa essas camadas.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                <SourceChip label="OpenAI Ads" href={SOURCES.adsLaunch.url} />
                <SourceChip label="Ads Manager" href={SOURCES.availability.url} />
                <SourceChip label="Métricas" href={SOURCES.adsBasics.url} />
              </div>
            </aside>
          </div>
        </section>

        <AuthorityMetrics />

        <ProductRealityGrid />

        <EditorialSection
          id="o-que-sao"
          eyebrow="01 · definição"
          title="Publicidade dentro de uma conversa — sem comprar a resposta."
          subtitle="A diferença mais importante do produto não é estética. É arquitetural: a resposta do ChatGPT e o sistema de anúncios são separados. O anúncio aparece abaixo da resposta e é identificado como patrocinado."
        >
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                icon: BadgeCheck,
                title: "Separado e rotulado",
                text: "O anúncio é apresentado como conteúdo patrocinado e separado da resposta do assistente.",
              },
              {
                icon: ShieldCheck,
                title: "Sem influência na resposta",
                text: "A OpenAI informa que anunciantes não podem moldar, classificar ou alterar as respostas do ChatGPT.",
              },
              {
                icon: Check,
                title: "Privacidade do chat",
                text: "Anunciantes não recebem chats, histórico, memórias ou dados pessoais; a documentação fala em dados agregados de desempenho.",
              },
            ].map((item) => (
              <Card key={item.title} className="h-full">
                <CardContent className="p-6">
                  <item.icon className="h-5 w-5 text-primary" />
                  <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <SourceChip label="FAQ oficial de anúncios" href={SOURCES.generalAds.url} />
            <SourceChip label="Políticas publicitárias" href={SOURCES.adPolicies.url} />
          </div>
        </EditorialSection>

        <EvidenceLedger />

        <MediaMath />

        <EditorialSection
          id="cronograma"
          eyebrow="02 · linha do tempo"
          title="Produto beta envelhece em semanas, não em anos."
          subtitle="Por isso data de auditoria faz parte da informação. O que era teste nos EUA em fevereiro virou Brasil em agosto e, poucos dias depois, uma expansão europeia muito maior."
        >
          <div className="space-y-0 border-l border-border pl-6 md:pl-8">
            {timeline.map((item) => (
              <article key={`${item.date}-${item.title}`} className="relative pb-8 last:pb-0">
                <span className="absolute -left-[31px] top-1 h-3 w-3 rounded-full border-2 border-background bg-primary md:-left-[39px]" />
                <div className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-primary">{item.date}</div>
                <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">{item.desc}</p>
              </article>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-2">
            <SourceChip label="Lançamento e expansão" href={SOURCES.adsLaunch.url} />
            <SourceChip label="Expansão europeia" href={SOURCES.europe.url} />
          </div>
        </EditorialSection>

        <section id="estrategias" className="bg-zinc-950 text-white">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-24">
            <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr]">
              <div>
                <Badge className="border border-amber-300/25 bg-amber-300/10 text-amber-200 hover:bg-amber-300/10">Decisão</Badge>
                <h2 className="mt-5 text-4xl font-black tracking-[-0.045em] md:text-6xl">
                  Canal novo não precisa de fé. Precisa de hipótese.
                </h2>
                <p className="mt-5 max-w-xl text-base leading-7 text-zinc-400">
                  O objetivo de um primeiro ciclo não é provar que ChatGPT Ads “é melhor”. É descobrir onde ele
                  acrescenta valor que seus canais atuais não entregam — e documentar isso sem autoengano.
                </p>
              </div>

              <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2">
                {strategies.map((item, index) => (
                  <article key={item.title} className="bg-zinc-950 p-6">
                    <div className="flex items-center justify-between">
                      <item.icon className="h-5 w-5 text-amber-300" />
                      <span className="font-mono text-xs text-zinc-700">0{index + 1}</span>
                    </div>
                    <h3 className="mt-5 text-lg font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-500">{item.desc}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <EditorialSection
          id="privacidade"
          eyebrow="03 · privacidade"
          title="O anúncio pode usar contexto. O anunciante não recebe a sua conversa."
          subtitle="São duas ideias diferentes e elas precisam ficar separadas. A documentação descreve sinais de contexto usados pelo sistema de ads, ao mesmo tempo em que afirma que anunciantes não veem chats, histórico ou memórias."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">Sistema de ads</p>
              <h3 className="mt-4 text-2xl font-black">Pode considerar intenção e contexto.</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                A veiculação considera sinais como contexto e intenção da conversa atual, atributos do anúncio,
                landing page e context hints; personalização adicional depende dos controles do usuário.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-primary">Anunciante</p>
              <h3 className="mt-4 text-2xl font-black">Não recebe seu chat.</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                A OpenAI afirma que anunciantes não veem chats, histórico, memórias ou dados pessoais e recebem
                apenas dados agregados sobre desempenho publicitário.
              </p>
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <SourceChip label="Conceitos básicos" href={SOURCES.adsBasics.url} />
            <SourceChip label="FAQ de privacidade" href={SOURCES.generalAds.url} />
            <SourceChip label="Política deste site" href="/privacidade" />
          </div>
        </EditorialSection>

        <section id="faq" className="border-y border-border bg-muted/30">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-[0.38fr_0.62fr]">
            <div>
              <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">FAQ · citável</span>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.045em] md:text-5xl">Respostas que cabem numa busca. E sobrevivem a uma checagem.</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">
                Perguntas formuladas para pessoas, buscadores e sistemas de recuperação encontrarem respostas explícitas sem precisar inferir o que o texto quis dizer.
              </p>
            </div>
            <Accordion type="single" collapsible className="rounded-2xl border border-border bg-background px-5 md:px-7">
              {faqs.map((item, index) => (
                <AccordionItem key={item.q} value={`faq-${index}`}>
                  <AccordionTrigger className="text-left text-base font-bold">{item.q}</AccordionTrigger>
                  <AccordionContent className="max-w-3xl leading-7 text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        <AuthorShowcase />

        <section className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-primary">Fonte de verdade</div>
              <h2 className="mt-4 max-w-4xl text-4xl font-black tracking-[-0.04em] md:text-5xl">
                Se o produto mudou depois de 25/08/2026, confirme antes de repetir este guia.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                Este documento é deliberadamente datado. A força dele está em mostrar o estado auditado, não em fingir permanência num produto que continua evoluindo.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <SourceChip label="Ads Manager Availability" href={SOURCES.availability.url} />
                <SourceChip label="Ads Basics" href={SOURCES.adsBasics.url} />
                <SourceChip label="Ad Policies" href={SOURCES.adPolicies.url} />
                <SourceChip label="Metodologia" href="/metodologia" />
                <SourceChip label="Termos" href="/termos" />
              </div>
            </div>
            <Button asChild variant="outline" size="lg">
              <a href="https://ads.openai.com/pt-BR" target="_blank" rel="noopener noreferrer">
                OpenAI Ads <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm text-muted-foreground md:px-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-semibold text-foreground">© 2026 Lorenza Volponi — volponi.tech</p>
            <p className="mt-1 max-w-2xl leading-6">
              Guia editorial independente sobre ChatGPT Ads. Não afiliado, patrocinado, endossado, certificado, operado ou mantido pela OpenAI.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="/metodologia" className="hover:text-primary">Metodologia</a>
            <a href="/privacidade" className="hover:text-primary">Privacidade/LGPD</a>
            <a href="/termos" className="hover:text-primary">Termos</a>
            <a href="https://volponi.tech" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary">
              volponi.tech <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </footer>

      <AssistantChat onNavigate={scrollTo} />
    </div>
  );
}
