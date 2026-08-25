import type { Metadata } from "next";
import { ArrowUpRight, Bot, CheckCircle2, Search, ShieldCheck } from "lucide-react";

import { SITE_URL } from "@/lib/editorial-meta";
import { socialImageForPath } from "@/lib/seo";

const PAGE_URL = `${SITE_URL}/oai-adsbot-searchbot`;
const SOCIAL_IMAGE = socialImageForPath("/oai-adsbot-searchbot");
const OFFICIAL_ADVERTISER_GUIDE =
  "https://help.openai.com/pt-br/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers";
const OFFICIAL_PUBLISHER_GUIDE =
  "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq";
const ADSBOT_IPS = "https://openai.com/adsbot.json";
const SEARCHBOT_IPS = "https://openai.com/searchbot.json";

export const metadata: Metadata = {
  title: "OAI-AdsBot e OAI-SearchBot: robots.txt, ChatGPT Ads e Search | volponi.tech",
  description:
    "Guia técnico em português sobre OAI-AdsBot e OAI-SearchBot: robots.txt, validação de landing pages, ChatGPT Search, WAF, CDN, 403, 429, IP ranges e ads readiness.",
  keywords: [
    "OAI-AdsBot",
    "OAI-SearchBot",
    "OpenAI crawler",
    "OpenAI crawlers",
    "ChatGPT Ads crawler",
    "ChatGPT Search crawler",
    "robots.txt OpenAI",
    "como liberar OAI-AdsBot",
    "como liberar OAI-SearchBot",
    "allow OAI-AdsBot",
    "allow OAI-SearchBot",
    "ChatGPT Ads landing page",
    "OpenAI ads readiness",
    "adsbot.json",
    "searchbot.json",
  ],
  alternates: { canonical: PAGE_URL },
  robots: { index: true, follow: true },
  openGraph: {
    title: "OAI-AdsBot + OAI-SearchBot: crawler readiness para ChatGPT Ads e Search",
    description:
      "OAI-AdsBot é exigido para revisão de landing pages; OAI-SearchBot participa da descoberta pública no ChatGPT. Veja robots.txt, WAF, CDN, IP ranges e testes.",
    url: PAGE_URL,
    type: "article",
    locale: "pt_BR",
    images: [
      {
        url: SOCIAL_IMAGE,
        width: 1200,
        height: 630,
        alt: "OAI-AdsBot e OAI-SearchBot: crawler readiness para ChatGPT Ads e ChatGPT Search",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "OAI-AdsBot + OAI-SearchBot: robots.txt, Ads e Search",
    description: "Guia técnico em português com checklist de crawler readiness da OpenAI.",
    images: [SOCIAL_IMAGE],
  },
};

const faq = [
  {
    q: "O OAI-AdsBot é obrigatório para ChatGPT Ads?",
    a: "Segundo a orientação oficial da OpenAI para anunciantes, o OAI-AdsBot deve ser permitido para validação e revisão das landing pages enviadas como anúncios no ChatGPT.",
  },
  {
    q: "Por que liberar o OAI-SearchBot?",
    a: "A OpenAI recomenda permitir OAI-AdsBot e OAI-SearchBot. Para publishers, a OpenAI diz que não bloquear OAI-SearchBot ajuda o conteúdo público a ser descoberto, exibido, citado e incluído em resumos e snippets no ChatGPT Search.",
  },
  {
    q: "OAI-SearchBot é o mesmo que GPTBot?",
    a: "Não. OAI-SearchBot está ligado à descoberta e às experiências de busca. A própria documentação separa esse controle de GPTBot, que é o user-agent associado à exclusão de conteúdo de potencial treinamento.",
  },
  {
    q: "robots.txt é suficiente?",
    a: "Não. Além do robots.txt, WAF, CDN, mitigação de bots, autenticação, CAPTCHA, desafios JavaScript, regras geográficas e rate limiting podem bloquear crawlers legítimos e gerar erros 403 ou 429.",
  },
  {
    q: "A landing page pode influenciar a relevância do anúncio?",
    a: "Sim, no sentido documentado pela OpenAI: além de validar segurança e políticas, a OpenAI afirma que pode usar o conteúdo da landing page para determinar quando é mais relevante mostrar o anúncio ao usuário. Isso não equivale a promessa de ranking ou entrega.",
  },
] as const;

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
      image: SOCIAL_IMAGE,
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      datePublished: "2026-08-25T16:48:00-03:00",
      dateModified: "2026-08-25T17:10:00-03:00",
      author: { "@id": `${SITE_URL}/#author` },
      publisher: { "@id": `${SITE_URL}/#publisher` },
      citation: [
        OFFICIAL_ADVERTISER_GUIDE,
        OFFICIAL_PUBLISHER_GUIDE,
        ADSBOT_IPS,
        SEARCHBOT_IPS,
      ],
      about: [
        { "@type": "Thing", name: "OAI-AdsBot" },
        { "@type": "Thing", name: "OAI-SearchBot" },
        { "@type": "Thing", name: "ChatGPT Ads" },
        { "@type": "Thing", name: "ChatGPT Search" },
        { "@type": "Thing", name: "robots.txt" },
      ],
      keywords: [
        "OAI-AdsBot",
        "OAI-SearchBot",
        "OpenAI crawlers",
        "ChatGPT Ads landing page validation",
        "ChatGPT Search discovery",
        "robots.txt OpenAI",
        "adsbot.json",
        "searchbot.json",
      ],
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".geo-answer", ".press-summary"],
      },
    },
    {
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${PAGE_URL}#breadcrumbs`,
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ChatGPT Ads", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "OAI-AdsBot e OAI-SearchBot", item: PAGE_URL },
      ],
    },
  ],
};

const checklist = [
  "Permita explicitamente OAI-AdsBot e OAI-SearchBot no robots.txt.",
  "Valide que a landing page responde HTTP 200 sem login, CAPTCHA ou challenge JavaScript.",
  "Revise WAF, CDN e bot mitigation para evitar falsos positivos e 403.",
  "Revise regras de geoblocking: a página precisa ser alcançável pelo crawler que fará a validação.",
  "Investigue 429 e regras de rate limiting durante uploads em lote.",
  "Se usar allowlist por IP, consuma as listas oficiais adsbot.json e searchbot.json — não copie ranges para sempre.",
  "Mantenha o conteúdo central acessível no HTML e semanticamente claro.",
  "Use canonical, sitemap, dados estruturados e links internos para reforçar contexto sem criar páginas duplicadas.",
  "Não confunda OAI-AdsBot, OAI-SearchBot e GPTBot: os controles e propósitos são diferentes.",
] as const;

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
            <Bot className="h-3.5 w-3.5" /> OpenAI crawler readiness · revisão 25/08/2026
          </div>
          <h1 className="geo-answer mt-7 max-w-4xl font-serif text-5xl leading-[0.94] tracking-[-0.05em] md:text-7xl">
            OAI-AdsBot + OAI-SearchBot: a camada invisível do ChatGPT Ads.
          </h1>
          <p className="press-summary mt-7 max-w-3xl text-lg leading-8 text-zinc-600">
            Para ChatGPT Ads, a OpenAI exige acesso do OAI-AdsBot à landing page e recomenda liberar também OAI-SearchBot. Para busca, a OpenAI afirma que OAI-SearchBot ajuda conteúdo público a ser descoberto, exibido e citado em experiências do ChatGPT.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={OFFICIAL_ADVERTISER_GUIDE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-zinc-950 px-5 py-3 text-sm font-bold text-white"
            >
              Guia oficial para anunciantes <ArrowUpRight className="h-4 w-4" />
            </a>
            <a
              href={OFFICIAL_PUBLISHER_GUIDE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-zinc-300 bg-white px-5 py-3 text-sm font-bold"
            >
              Guia oficial para publishers <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-5 px-4 py-14 md:grid-cols-2 md:px-6 md:py-20">
        <article className="rounded-3xl border border-zinc-200 bg-white p-7">
          <ShieldCheck className="h-7 w-7" />
          <h2 className="mt-5 font-serif text-3xl tracking-[-0.035em]">OAI-AdsBot</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            É o crawler que anunciantes devem priorizar para ads readiness. A OpenAI o utiliza para visitar landing pages enviadas como anúncios, verificar segurança e políticas e pode usar o conteúdo da página para decidir quando o anúncio é mais relevante.
          </p>
          <p className="mt-4 rounded-2xl bg-zinc-950 p-4 font-mono text-xs leading-6 text-white">
            User-agent: OAI-AdsBot<br />Allow: /
          </p>
          <a href={ADSBOT_IPS} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-bold underline underline-offset-4">
            IP ranges oficiais: adsbot.json <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </article>

        <article className="rounded-3xl border border-zinc-200 bg-white p-7">
          <Search className="h-7 w-7" />
          <h2 className="mt-5 font-serif text-3xl tracking-[-0.035em]">OAI-SearchBot</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-600">
            É o crawler de descoberta pública. A OpenAI diz que permitir OAI-SearchBot ajuda páginas a participar de resumos, snippets, citações e links no ChatGPT Search. Referral vindo de resultados do ChatGPT pode chegar com <span className="font-mono text-xs">utm_source=chatgpt.com</span>.
          </p>
          <p className="mt-4 rounded-2xl bg-zinc-950 p-4 font-mono text-xs leading-6 text-white">
            User-agent: OAI-SearchBot<br />Allow: /
          </p>
          <a href={SEARCHBOT_IPS} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-bold underline underline-offset-4">
            IP ranges oficiais: searchbot.json <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </article>
      </section>

      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Checklist técnico</p>
          <h2 className="mt-4 max-w-3xl font-serif text-4xl tracking-[-0.04em] md:text-5xl">O robots.txt é só a primeira porta.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {checklist.map((item) => (
              <div key={item} className="flex gap-3 rounded-2xl border border-zinc-200 bg-[#fafaf8] p-5 text-sm leading-6 text-zinc-700">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-zinc-950" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500">Teste operacional</p>
        <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em]">Não confie só no arquivo. Faça a requisição.</h2>
        <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-600">
          Um robots.txt perfeito não salva uma landing page bloqueada pelo edge. O teste mais simples é simular os user-agents e confirmar resposta bem-sucedida na URL pública real.
        </p>
        <div className="mt-7 grid gap-4 lg:grid-cols-2">
          <pre className="overflow-x-auto rounded-2xl bg-zinc-950 p-5 font-mono text-xs leading-6 text-zinc-100"><code>{`curl -I \\
  -A "OAI-AdsBot" \\
  https://seusite.com/landing-page`}</code></pre>
          <pre className="overflow-x-auto rounded-2xl bg-zinc-950 p-5 font-mono text-xs leading-6 text-zinc-100"><code>{`curl -I \\
  -A "OAI-SearchBot" \\
  https://seusite.com/landing-page`}</code></pre>
        </div>
        <p className="mt-4 text-sm leading-6 text-zinc-500">
          Procure por 200/2xx no destino final. Investigue redirects excessivos, 403, 429, CAPTCHA, login, bloqueio regional e respostas diferentes por user-agent.
        </p>
      </section>

      <section className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-14 md:px-6 md:py-20">
          <h2 className="font-serif text-4xl tracking-[-0.04em]">SearchBot não é GPTBot.</h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-zinc-600">
            A documentação de publishers da OpenAI separa descoberta em busca de potencial treinamento. Para aparecer em resumos e snippets, o controle citado é OAI-SearchBot. Para excluir páginas de potencial treinamento, o controle citado é GPTBot. Tratar todos os bots como uma coisa só destrói governança.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["OAI-AdsBot", "Ads", "Validação/revisão da landing page e sinais de relevância documentados para anúncios."],
              ["OAI-SearchBot", "Search", "Descoberta, snippets, citações e links em experiências de busca do ChatGPT."],
              ["GPTBot", "Training control", "User-agent separado usado por publishers para optar por excluir conteúdo de potencial treinamento."],
            ].map(([name, role, text]) => (
              <article key={name} className="rounded-2xl border border-zinc-200 bg-[#fafaf8] p-5">
                <p className="font-mono text-xs font-black">{name}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.14em] text-zinc-500">{role}</p>
                <p className="mt-4 text-sm leading-6 text-zinc-600">{text}</p>
              </article>
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

        <div className="mt-10 flex flex-wrap gap-3">
          <a href="/chatgpt-ads-brasil" className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-bold">ChatGPT Ads Brasil</a>
          <a href="/ads-manager-chatgpt" className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-bold">Ads Manager</a>
          <a href="/chatgpt-ads-metricas" className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-bold">Métricas</a>
          <a href="/metodologia" className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-bold">Metodologia</a>
          <a href="/" className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-bold text-white">Voltar ao guia</a>
        </div>
      </section>
    </main>
  );
}
