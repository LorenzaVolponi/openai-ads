"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  ChevronRight,
  ExternalLink,
  LockKeyhole,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssistantChat } from "@/components/assistant-chat";
import {
  SHARE_TEXT,
  SHARE_URL,
  apiTools,
  audienceTabs,
  benchmarks,
  checklistItems,
  comparisonTabs,
  faqs,
  glossary,
  mistakes,
  navItems,
  strategies,
  timeline,
  tocItems,
} from "@/lib/content";

const LAST_REVIEW = "24 de agosto de 2026";

function Section({
  id,
  badge,
  title,
  subtitle,
  children,
}: {
  id: string;
  badge: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      className="mx-auto w-full max-w-6xl scroll-mt-20 px-4 py-16 md:px-6 md:py-24"
    >
      <Badge variant="secondary" className="border border-primary/25 bg-primary/10 text-primary">
        {badge}
      </Badge>
      <h2 className="mt-4 max-w-4xl text-3xl font-bold tracking-tight md:text-5xl">{title}</h2>
      {subtitle ? (
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      ) : null}
      <div className="mt-10">{children}</div>
    </motion.section>
  );
}

export default function Page() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [glossarySearch, setGlossarySearch] = useState("");
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const scrollTo = (href: string) => {
    const target = document.getElementById(href.replace("#", ""));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    setMobileMenuOpen(false);
  };

  const filteredGlossary = useMemo(() => {
    const query = glossarySearch.trim().toLowerCase();
    if (!query) return glossary;
    return glossary.filter(
      (item) => item.term.toLowerCase().includes(query) || item.desc.toLowerCase().includes(query)
    );
  }, [glossarySearch]);

  const toggleChecklist = (index: number) => {
    setCheckedItems((current) => {
      const next = new Set(current);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const share = async () => {
    const payload = { title: "ChatGPT Ads 2026", text: SHARE_TEXT, url: SHARE_URL };
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
      // O link permanece visível no navegador mesmo quando a Clipboard API não está disponível.
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <a href="https://volponi.tech" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            <img src="/fox-black.png" alt="" width={32} height={32} className="h-8 w-8 rounded-lg" />
            <span className="font-bold">volponi.tech</span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Navegação principal">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-border lg:hidden"
            aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        {mobileMenuOpen ? (
          <nav className="border-t border-border bg-card px-4 py-3 lg:hidden" aria-label="Navegação mobile">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
          </nav>
        ) : null}
      </header>

      <main>
        <section className="relative overflow-hidden border-b border-border">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.16),transparent_55%)]" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-center px-4 py-20 text-center md:px-6 md:py-28">
            <Badge className="border border-primary/30 bg-primary/10 text-primary hover:bg-primary/10">
              Auditada em {LAST_REVIEW}
            </Badge>
            <h1 className="mt-6 max-w-5xl text-5xl font-black tracking-tight md:text-7xl">
              ChatGPT Ads <span className="text-primary">2026</span>
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground md:text-xl">
              Um guia independente sobre publicidade no ChatGPT — separando o que é fato de produto,
              o que depende da sua conta e o que ainda não merece ser tratado como verdade.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-2">
              <Badge variant="outline" className="gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Sem benchmarks inventados</Badge>
              <Badge variant="outline" className="gap-1.5"><LockKeyhole className="h-3.5 w-3.5" /> Privacidade explícita</Badge>
              <Badge variant="outline" className="gap-1.5"><BadgeCheck className="h-3.5 w-3.5" /> Ano e metadados 2026</Badge>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="lg" onClick={() => scrollTo("#o-que-sao")}>
                Ler o guia <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={share}>
                Compartilhar
              </Button>
            </div>

            <p className="mt-8 text-sm text-muted-foreground">
              Conteúdo educacional independente. Não é uma página oficial da OpenAI.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-10 md:px-6" aria-label="Índice do guia">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-7">
            {tocItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollTo(item.href)}
                className="rounded-xl border border-border bg-card p-3 text-left transition hover:border-primary/40 hover:bg-primary/5"
              >
                <span className="block font-mono text-xs text-primary">{item.n}</span>
                <span className="mt-1 block text-sm font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </section>

        <Separator />

        <Section
          id="o-que-sao"
          badge="Fundamento"
          title="O que são ChatGPT Ads?"
          subtitle="Anúncios podem aparecer na experiência do ChatGPT para usuários e planos elegíveis. O ponto central é simples: publicidade e resposta do assistente continuam sendo coisas diferentes."
        >
          <div className="grid gap-5 md:grid-cols-3">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-primary" /> Conteúdo patrocinado</CardTitle></CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                O anúncio é apresentado como item patrocinado e separado da mensagem do assistente.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Resposta independente</CardTitle></CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                Anúncios não determinam a resposta do ChatGPT. A resposta do assistente não é um texto comprado pelo anunciante.
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><LockKeyhole className="h-5 w-5 text-primary" /> Conversa privada</CardTitle></CardHeader>
              <CardContent className="text-sm leading-relaxed text-muted-foreground">
                Conversas são mantidas privadas dos anunciantes e dados do usuário não são vendidos a anunciantes.
              </CardContent>
            </Card>
          </div>
        </Section>

        <Separator />

        <Section
          id="cronograma"
          badge="Estado do produto"
          title="A linha do tempo sem ficção"
          subtitle="Produto novo muda rápido. Por isso a auditoria privilegia fatos verificáveis e registra quando o guia foi revisado."
        >
          <div className="mx-auto max-w-3xl space-y-4">
            {timeline.map((item) => (
              <Card key={`${item.date}-${item.title}`}>
                <CardContent className="flex gap-4 p-5 md:p-6">
                  <div className="min-w-24 font-mono text-sm font-semibold text-primary">{item.date}</div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Separator />

        <Section
          id="para-quem"
          badge="Planejamento"
          title="Para quem esse canal pode fazer sentido?"
          subtitle="O melhor uso não nasce de uma promessa universal; nasce de um teste bem desenhado para o seu modelo de negócio."
        >
          <Tabs defaultValue={audienceTabs[0]?.id} className="w-full">
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
              {audienceTabs.map((tab) => (
                <TabsTrigger key={tab.id} value={tab.id} className="gap-2">
                  <tab.icon className="h-4 w-4" /> {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
            {audienceTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-6">
                <div className="grid gap-4 md:grid-cols-3">
                  {tab.cards.map((card) => (
                    <Card key={card.title} className="h-full">
                      <CardContent className="p-6">
                        <card.icon className="h-6 w-6 text-primary" />
                        <h3 className="mt-4 font-semibold">{card.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.desc}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </Section>

        <Separator />

        <Section
          id="como-funciona"
          badge="Experiência"
          title="Como os anúncios aparecem para o usuário"
          subtitle="A regra mais importante para entender o produto é a separação: o item patrocinado é uma camada de publicidade, não a resposta do assistente."
        >
          <div className="grid gap-5 md:grid-cols-2">
            <Card className="border-primary/25 bg-primary/5">
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Resposta do ChatGPT</p>
                <p className="mt-3 leading-relaxed">Conteúdo do assistente, gerado para responder à solicitação do usuário.</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Patrocinado</p>
                <p className="mt-3 leading-relaxed text-muted-foreground">Item publicitário separado e identificado como patrocinado na interface quando exibido.</p>
              </CardContent>
            </Card>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
            A presença de publicidade não significa que o anunciante escolheu a resposta do assistente ou recebeu acesso à conversa.
          </p>
        </Section>

        <Separator />

        <Section
          id="privacidade"
          badge="Governança"
          title="Privacidade não é detalhe de rodapé"
          subtitle="Para usuário e anunciante, a arquitetura correta começa pela separação entre conversa, resposta e publicidade."
        >
          <div className="grid gap-4 md:grid-cols-2">
            <Card><CardContent className="p-6"><h3 className="font-semibold">Para usuários</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Conversas são privadas dos anunciantes. Anúncios são separados e claramente rotulados; anúncios irrelevantes podem ter opções de ocultação ou feedback na interface.</p></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="font-semibold">Para anunciantes</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Não trate contexto conversacional como um banco de dados disponível para segmentação. Trabalhe apenas com os controles, dados e integrações realmente disponibilizados pela plataforma.</p></CardContent></Card>
          </div>
        </Section>

        <Separator />

        <Section
          id="comparativo"
          badge="Decisão"
          title="ChatGPT Ads vs canais maduros"
          subtitle="O objetivo aqui não é declarar um vencedor. É impedir que novidade seja confundida com superioridade comprovada."
        >
          <Tabs defaultValue={comparisonTabs[0]?.id} className="w-full">
            <TabsList className="flex h-auto w-full flex-wrap justify-start gap-1">
              {comparisonTabs.map((tab) => <TabsTrigger key={tab.id} value={tab.id}>{tab.label}</TabsTrigger>)}
            </TabsList>
            {comparisonTabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-6">
                <Card>
                  <CardContent className="space-y-5 p-6">
                    {tab.rows.map((row) => (
                      <div key={row.feature}>
                        <div className="flex items-center gap-2">
                          {row.advantage ? <BadgeCheck className="h-4 w-4 text-primary" /> : <ShieldCheck className="h-4 w-4 text-muted-foreground" />}
                          <h3 className="font-semibold">{row.feature}</h3>
                        </div>
                        <p className="mt-1 pl-6 text-sm leading-relaxed text-muted-foreground">{row.note}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </Section>

        <Separator />

        <Section
          id="benchmarks"
          badge="Dados"
          title="Benchmarks: onde o guia anterior errava"
          subtitle="Faixas fechadas de CPC, CTR e CPM foram removidas porque pareciam precisão, mas não tinham uma fonte oficial robusta."
        >
          <div className="overflow-x-auto rounded-xl border border-border">
            <table className="w-full min-w-[760px] text-sm">
              <thead className="bg-muted/50 text-left">
                <tr>
                  <th className="p-4">Métrica</th><th className="p-4">ChatGPT Ads</th><th className="p-4">Google</th><th className="p-4">Meta</th><th className="p-4">LinkedIn</th>
                </tr>
              </thead>
              <tbody>
                {benchmarks.map((row) => (
                  <tr key={row.metric} className="border-t border-border">
                    <td className="p-4 font-medium">{row.metric}</td><td className="p-4 text-primary">{row.chatgpt}</td><td className="p-4 text-muted-foreground">{row.google}</td><td className="p-4 text-muted-foreground">{row.meta}</td><td className="p-4 text-muted-foreground">{row.linkedin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Separator />

        <Section
          id="api"
          badge="Operação"
          title="Recursos para anunciantes: só o que a conta provar"
          subtitle="A regra operacional é mais valiosa que uma lista inflada de siglas: não use como oficial aquilo que não está documentado ou habilitado para você."
        >
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {apiTools.map((tool) => (
              <Card key={tool.title} className="h-full">
                <CardContent className="p-6">
                  <tool.icon className="h-6 w-6 text-primary" />
                  <h3 className="mt-4 font-semibold">{tool.title}</h3>
                  <p className="mt-2 text-sm font-medium">{tool.desc}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{tool.detail}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        <Separator />

        <Section
          id="medicao"
          badge="Analytics"
          title="Medição: construa uma cadeia de evidência"
          subtitle="A pergunta certa não é 'quantos cliques vieram?', mas 'qual resultado incremental e verificável esse investimento gerou?'."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Card><CardContent className="p-6"><h3 className="font-semibold">1. Instrumente</h3><p className="mt-2 text-sm text-muted-foreground">Use apenas métodos oficialmente suportados na conta e valide disparos e consentimento.</p></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="font-semibold">2. Reconcilie</h3><p className="mt-2 text-sm text-muted-foreground">Compare plataforma, analytics, CRM e receita para encontrar divergências de atribuição.</p></CardContent></Card>
            <Card><CardContent className="p-6"><h3 className="font-semibold">3. Decida</h3><p className="mt-2 text-sm text-muted-foreground">Escale com base em resultado de negócio, não em uma métrica de vaidade isolada.</p></CardContent></Card>
          </div>
        </Section>

        <Separator />

        <Section id="estrategias" badge="Execução" title="Estratégias práticas para um canal em evolução">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {strategies.map((item) => (
              <Card key={item.title}><CardContent className="p-6"><item.icon className="h-6 w-6 text-primary" /><h3 className="mt-4 font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p></CardContent></Card>
            ))}
          </div>
        </Section>

        <Separator />

        <Section id="erros" badge="Auditoria" title="Erros que derrubam a credibilidade de um guia técnico">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {mistakes.map((item) => (
              <Card key={item.title}><CardContent className="p-6"><item.icon className="h-6 w-6 text-destructive" /><h3 className="mt-4 font-semibold">{item.title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p></CardContent></Card>
            ))}
          </div>
        </Section>

        <Separator />

        <Section id="checklist" badge="Interativo" title="Checklist antes de colocar dinheiro no canal">
          <div className="mx-auto max-w-3xl space-y-3">
            {checklistItems.map((item, index) => (
              <button
                key={item.title}
                type="button"
                onClick={() => toggleChecklist(index)}
                className="flex w-full gap-3 rounded-xl border border-border bg-card p-4 text-left transition hover:border-primary/40"
              >
                <Checkbox checked={checkedItems.has(index)} onCheckedChange={() => toggleChecklist(index)} onClick={(event) => event.stopPropagation()} aria-label={item.title} />
                <span>
                  <span className="block font-medium">{item.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{item.desc}</span>
                </span>
              </button>
            ))}
            <p className="pt-3 text-sm text-muted-foreground">{checkedItems.size} de {checklistItems.length} itens concluídos.</p>
          </div>
        </Section>

        <Separator />

        <Section id="glossario" badge="Referência" title="Glossário de ChatGPT Ads 2026">
          <div className="relative mx-auto mb-8 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input value={glossarySearch} onChange={(event) => setGlossarySearch(event.target.value)} placeholder="Buscar termo..." className="pl-9" />
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredGlossary.map((item) => (
              <Card key={item.term}><CardContent className="p-5"><h3 className="font-semibold text-primary">{item.term}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p></CardContent></Card>
            ))}
          </div>
        </Section>

        <Separator />

        <Section id="faq" badge="FAQ" title="Perguntas frequentes — versão auditada">
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible>
              {faqs.map((item, index) => (
                <AccordionItem key={item.q} value={`faq-${index}`}>
                  <AccordionTrigger>{item.q}</AccordionTrigger>
                  <AccordionContent className="leading-relaxed text-muted-foreground">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>

        <section className="mx-auto max-w-6xl px-4 pb-24 md:px-6">
          <Card className="overflow-hidden border-primary/30 bg-primary/5">
            <CardContent className="p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <Badge variant="outline" className="border-primary/30 text-primary">Fonte de verdade</Badge>
                  <h2 className="mt-4 text-3xl font-bold">Produto mudou? O guia também precisa mudar.</h2>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                    Para decisões de mídia, confirme disponibilidade e regras nas superfícies oficiais da OpenAI. Este guia é deliberadamente conservador onde a evidência pública não é suficiente.
                  </p>
                </div>
                <Button asChild>
                  <a href="https://openai.com" target="_blank" rel="noopener noreferrer">
                    OpenAI <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border bg-card">
        <div className="mx-auto flex max-w-6xl flex-col gap-5 px-4 py-10 text-sm text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <div>
            <p className="font-semibold text-foreground">© 2026 Lorenza Volponi — volponi.tech</p>
            <p className="mt-1">Guia independente sobre ChatGPT Ads. Última auditoria: {LAST_REVIEW}.</p>
          </div>
          <div className="flex flex-wrap gap-4">
            <a href="https://volponi.tech" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:text-primary">volponi.tech <ArrowUpRight className="h-3.5 w-3.5" /></a>
            <button type="button" onClick={() => scrollTo("#o-que-sao")} className="inline-flex items-center gap-1 hover:text-primary"><BookOpen className="h-3.5 w-3.5" /> Voltar ao guia</button>
          </div>
        </div>
      </footer>

      <AssistantChat onNavigate={scrollTo} />
    </div>
  );
}
