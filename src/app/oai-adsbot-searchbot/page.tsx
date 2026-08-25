import type { Metadata } from "next";
import { ArrowUpRight, Bot, CheckCircle2, Search, ShieldCheck } from "lucide-react";

import { SITE_URL } from "@/lib/editorial-meta";

const PAGE_URL = `${SITE_URL}/oai-adsbot-searchbot`;
const OFFICIAL_GUIDE =
  "https://help.openai.com/pt-br/articles/20001243-orientacoes-para-anunciantes-sobre-como-permitir-rastreadores-da-web-da-openai";

export const metadata: Metadata = {
  title: "OAI-AdsBot e OAI-SearchBot: como liberar os crawlers da OpenAI | volponi.tech",
  description:
    "Guia em português sobre OAI-AdsBot e OAI-SearchBot: robots.txt, validação de landing pages, ChatGPT Search, WAF, CDN, 403, 429 e ads readiness.",
  keywords: [
    "OAI-AdsBot",
    "OAI-SearchBot",
    "OpenAI crawler",
    "ChatGPT Ads crawler",
    "ChatGPT Search crawler",
    "robots.txt OpenAI",
    "allow OAI-AdsBot",
    "allow OAI-SearchBot",
    "ChatGPT Ads landing page",
    "OpenAI ads readiness",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "OAI-AdsBot + OAI-SearchBot: o novo checklist de ads readiness",
    description:
      "OAI-AdsBot é exigido para validação de landing pages de anúncios; OAI-SearchBot é recomendado para descoberta pública. Veja como liberar ambos sem abrir mão de segurança.",
    url: PAGE_URL,
    type: "article",
    locale: "pt_BR",
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Article", "TechArticle"],
      "@id": `${PAGE_URL}#article`,
      headline: "OAI-AdsBot e OAI-SearchBot: como preparar seu site para ChatGPT Ads e ChatGPT Search",
      description:
        "Guia técnico independente sobre os crawlers oficiais da OpenAI usados em validação de landing pages de anúncios e descoberta de conteúdo público.",
      url: PAGE_URL,
      mainEntityOfPage: PAGE_URL,
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      datePublished: "2026-08-25T16:48:00-03:00",
      dateModified: "2026-08-25T16:48:00-03:00",
      citation: [OFFICIAL_GUIDE, "https://openai.com/adsbot.json", "https://openai.com/searchbot.json"],
      about: [
        { "@type": "Thing", name: "OAI-AdsBot" },
        { "@type": "Thing", name: "OAI-SearchBot" },
        { "@type": "Thing", name: "ChatGPT Ads" },
        { "@type": "Thing", name: "ChatGPT Search" },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "O OAI-AdsBot é obrigatório?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Segundo a orientação oficial da OpenAI para anunciantes, o OAI-AdsBot deve ser permitido para validação e revisão de landing pages enviadas como anúncios no ChatGPT.",
          },
        },
        {
          "@type": "Question",
          name: "O OAI-SearchBot também deve ser permitido?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A OpenAI recomenda permitir OAI-AdsBot e OAI-SearchBot. O OAI-SearchBot é associado à descoberta de conteúdo público nas experiências de busca do ChatGPT.",
          },
        },
        {
          "@type": "Question",
          name: "robots.txt é suficiente?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Não. Além do robots.txt, WAF, CDN, mitigação de bots, autenticação, CAPTCHA, regras geográficas e rate limiting podem bloquear crawlers legítimos e gerar erros 403 ou 429.",
          },
        },
      ],
    },
  ],
};

export default function OaiBotsPage() {
  return (
    <main className="min-h-screen bg-[#fafaf8] text-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}
      />

      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-6 md:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-zinc-600">
            <Bot className="h-3.5 w-3.5" /> OpenAI crawler readiness
          </div>
          <h1 className="geo-answer mt-7 max-w-4xl font-serif text-5xl leading-[0.94] tracking-[-0.05em] md:text-7xl">
            OAI-AdsBot + OAI-SearchBot: a camada invisível do ChatGPT Ads.
          </h1>
          <p className="press-summary mt-7 max-w-3xl text-lg leading-8 text-zinc-600">
            Não basta criar a campanha. A landing page precisa ser acessível aos crawlers certos. Para anúncios, a OpenAI orienta permitir OAI-AdsBot e recomenda permitir também OAI-SearchBot.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={OFFICIAL_GUIDE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-white"
            >
              Orientação oficial <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href="/chatgpt-ads-brasil"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-bold"
            >
              ChatGPT Ads Brasil
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
        <article className="rounded-3xl border border-zinc-200 bg-white p-7">
          <ShieldCheck className="h-7 w-7" />
          <h2 className="mt-5 font-serif text-3xl tracking-[-0.035em]">OAI-AdsBot</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            É o crawler que anunciantes devem priorizar para ads readiness. A OpenAI o utiliza para visitar landing pages enviadas como anúncios, validar segurança e políticas e compreender o conteúdo necessário à relevância do anúncio.
          </p>
          <p className="mt-4 rounded-2xl bg-zinc-950 p-4 font-mono text-xs leading-6 text-white">
            User-agent: OAI-AdsBot<br />Allow: /
          </p>
        </article>

        <article className="rounded-3xl border border-zinc-200 bg-white p-7">
          <Search className="h-7 w-7" />
          <h2 className="mt-5 font-serif text-3xl tracking-[-0.035em]">OAI-SearchBot</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            É o crawler recomendado em conjunto com OAI-AdsBot para conteúdo público. Em termos práticos, ele amplia a preparação da propriedade digital para descoberta nas experiências de busca do ChatGPT.
          </p>
          <p className="mt-4 rounded-2xl bg-zinc-950 p-4 font-mono text-xs leading-6 text-white">
            User-agent: OAI-SearchBot<br />Allow: /
          </p>
        </article>
      </section>

      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Checklist técnico</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-[-0.04em] md:text-5xl">O robots.txt é só a primeira porta.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "Permita explicitamente OAI-AdsBot e OAI-SearchBot no robots.txt.",
              "Valide que a landing page responde HTTP 200 sem login, CAPTCHA ou challenge JavaScript.",
              "Revise WAF, CDN e bot mitigation para evitar falsos positivos e 403.",
              "Monitore 429 e regras de rate limiting durante uploads em lote.",
              "Se usar allowlist por IP, consuma as listas oficiais adsbot.json e searchbot.json.",
              "Mantenha conteúdo principal server-rendered e facilmente legível por crawler.",
              "Use canonical, sitemap, dados estruturados e links internos para reforçar contexto semântico.",
              "Não confunda OAI-AdsBot com GPTBot: os propósitos são diferentes.",
            ].map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-zinc-200 bg-[#fafaf8] p-5 text-sm leading-6 text-zinc-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-zinc-950" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
        <h2 className="font-serif text-4xl tracking-[-0.04em]">Por que isso importa para SEO/GEO?</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-600">
          Porque a disputa deixou de ser apenas por ranking em dez links azuis. A nova superfície inclui indexação, recuperação, citação, entendimento semântico e elegibilidade de landing pages dentro de interfaces conversacionais. Permitir crawler não garante ranking nem entrega de mídia — mas bloquear o crawler certo pode impedir a participação antes mesmo da disputa começar.
        </p>
        <div className="mt-8 rounded-3xl bg-zinc-950 p-7 text-white">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-zinc-400">Volponi thesis</p>
          <p className="mt-4 font-serif text-3xl tracking-[-0.03em]">Crawler access virou infraestrutura de distribuição.</p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-400">
            SEO continua importando. GEO amplia o campo. Ads readiness adiciona uma terceira camada: estar tecnicamente acessível quando o ecossistema decide verificar, recuperar ou qualificar sua página.
          </p>
        </div>
      </section>
    </main>
  );
}
