import { SITE_URL } from "@/lib/editorial-meta";

export const SOCIAL_CARDS = {
  home: {
    eyebrow: "GUIA INDEPENDENTE · BRASIL 2026",
    title: "ChatGPT Ads: como anunciar, preços e métricas",
    subtitle: "Prints oficiais · dados auditados · Radar vivo · volponi.tech",
  },
  brasil: {
    eyebrow: "CHATGPT ADS · BRASIL",
    title: "ChatGPT Ads no Brasil: disponibilidade e lançamento",
    subtitle: "O que está disponível, quais planos podem ter anúncios e o que ainda muda no beta.",
  },
  precos: {
    eyebrow: "PREÇOS · CPC · CPM · oCPC",
    title: "Quanto custa anunciar no ChatGPT?",
    subtitle: "Modelos de compra, leilão e lance inicial explicados sem benchmark inventado.",
  },
  metricas: {
    eyebrow: "MÉTRICAS · MENSURAÇÃO",
    title: "CTR, CPC, CPM, CPA e ROAS no ChatGPT Ads",
    subtitle: "O que o Ads Manager mede e como interpretar cada número sem vender narrativa de dashboard.",
  },
  manager: {
    eyebrow: "OPENAI ADS MANAGER",
    title: "Ads Manager: como funciona, países e recursos",
    subtitle: "Campanhas, grupos, anúncios, reporting, disponibilidade e limites atuais do beta.",
  },
  privacidade: {
    eyebrow: "PRIVACIDADE · CHATGPT ADS",
    title: "O que anunciantes recebem — e o que não recebem",
    subtitle: "Conversas, memórias, personalização, dados agregados e separação entre anúncio e resposta.",
  },
  crawlers: {
    eyebrow: "OAI-ADSBOT · OAI-SEARCHBOT",
    title: "Crawlers da OpenAI: ads readiness e ChatGPT Search",
    subtitle: "robots.txt, landing pages, WAF, CDN, 403, 429, IP ranges e descoberta pública.",
  },
  radar: {
    eyebrow: "VOLPONI CHATGPT ADS RADAR",
    title: "Mudanças, países e disponibilidade em um registro vivo",
    subtitle: "Histórico auditado com fonte primária, estado anterior, estado atual e impacto.",
  },
  imprensa: {
    eyebrow: "MEDIA SOURCE ROOM · LORENZA VOLPONI",
    title: "IA, GEO e publicidade conversacional com evidência",
    subtitle: "Bio, dados, Radar, fontes e materiais verificáveis para imprensa e pesquisa.",
  },
} as const;

export type SocialCardKey = keyof typeof SOCIAL_CARDS;

const PATH_TO_CARD: Record<string, SocialCardKey> = {
  "/": "home",
  "/chatgpt-ads-brasil": "brasil",
  "/chatgpt-ads-precos": "precos",
  "/chatgpt-ads-metricas": "metricas",
  "/ads-manager-chatgpt": "manager",
  "/chatgpt-ads-privacidade": "privacidade",
  "/oai-adsbot-searchbot": "crawlers",
  "/radar": "radar",
  "/imprensa": "imprensa",
};

export function socialImageForPath(pathname: string) {
  const key = PATH_TO_CARD[pathname] ?? "home";
  return `${SITE_URL}/og/${key}`;
}

export function socialImageForCanonical(canonical: string) {
  try {
    return socialImageForPath(new URL(canonical).pathname);
  } catch {
    return socialImageForPath("/");
  }
}

export const searchIntentAnswers = [
  {
    q: "Como anunciar no ChatGPT?",
    a: "Comece entendendo como a unidade patrocinada aparece, defina objetivo e mensagem, mantenha a promessa coerente com a landing page e só então meça o resultado.",
    href: "/#como-aparece",
    linkLabel: "Ver o anúncio por dentro",
  },
  {
    q: "ChatGPT Ads está disponível no Brasil?",
    a: "Sim. No snapshot auditado em 25/08/2026, o Brasil aparece como mercado disponível no Ads Manager. Como o produto está em expansão, o status deve ser revalidado.",
    href: "/chatgpt-ads-brasil",
    linkLabel: "Ver disponibilidade no Brasil",
  },
  {
    q: "Quanto custa anunciar no ChatGPT?",
    a: "Não existe um CPC médio universal responsável. A documentação atual descreve CPM, CPC e oCPC e recomenda US$ 3–5 como lance máximo inicial para CPC — não como CPC médio realizado.",
    href: "/chatgpt-ads-precos",
    linkLabel: "Entender preços e leilão",
  },
  {
    q: "Quais métricas o ChatGPT Ads mostra?",
    a: "Impressões, cliques, gasto, CTR, CPC médio, CPM médio e conversões aparecem entre as métricas documentadas quando a mensuração aplicável está configurada.",
    href: "/chatgpt-ads-metricas",
    linkLabel: "Aprender as métricas",
  },
  {
    q: "Como funciona o OpenAI Ads Manager?",
    a: "A estrutura documentada trabalha com campanhas, grupos de anúncios e anúncios, além de reporting, objetivos de compra e disponibilidade que varia por mercado.",
    href: "/ads-manager-chatgpt",
    linkLabel: "Abrir guia do Ads Manager",
  },
  {
    q: "O que é OAI-AdsBot e por que liberar OAI-SearchBot?",
    a: "OAI-AdsBot é exigido pela OpenAI para validação e revisão de landing pages de ChatGPT Ads. OAI-SearchBot é recomendado para descoberta de conteúdo público e participação em experiências de busca do ChatGPT. robots.txt é só a primeira camada: WAF, CDN, CAPTCHA e rate limiting também podem bloquear acesso.",
    href: "/oai-adsbot-searchbot",
    linkLabel: "Abrir guia dos crawlers da OpenAI",
  },
  {
    q: "Anunciantes podem ler minhas conversas?",
    a: "Segundo a documentação oficial, não. Anunciantes não recebem chats, histórico ou memórias; a plataforma documenta dados agregados de desempenho publicitário.",
    href: "/chatgpt-ads-privacidade",
    linkLabel: "Entender privacidade",
  },
  {
    q: "Onde acompanhar mudanças do ChatGPT Ads?",
    a: "O Volponi ChatGPT Ads Radar registra alterações materiais com data, fonte primária, estado anterior, estado observado e impacto, além de RSS e dados estruturados.",
    href: "/radar",
    linkLabel: "Abrir o Radar",
  },
] as const;
