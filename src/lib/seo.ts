import { SITE_URL } from "@/lib/editorial-meta";

export const SOCIAL_CARDS = {
  home: {
    eyebrow: "GUIA INDEPENDENTE · BRASIL 2026",
    title: "ChatGPT Ads: como anunciar, preços e métricas",
    subtitle: "Prints oficiais · dados auditados · Radar vivo · volponi.tech",
  },
  comoAnunciar: {
    eyebrow: "COMO ANUNCIAR · CHATGPT ADS",
    title: "Como anunciar no ChatGPT Ads no Brasil",
    subtitle: "Ads Manager · R$ 40/dia · CPM/CPC/oCPC · iOS/Android/Web · landing page",
  },
  brasil: {
    eyebrow: "CHATGPT ADS · BRASIL",
    title: "ChatGPT Ads no Brasil: disponibilidade e lançamento",
    subtitle: "O que está disponível, quais planos podem ter anúncios e o que ainda muda no beta.",
  },
  market: {
    eyebrow: "MARKET SNAPSHOT · OPENAI ADS INTELLIGENCE",
    title: "Onde o ChatGPT Ads está disponível",
    subtitle: "Mercados Available e Coming Soon · fonte oficial · revisão temporal · JSON e CSV.",
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
  googleComparison: {
    eyebrow: "ESTRATÉGIA · CHATGPT ADS VS GOOGLE ADS",
    title: "Conversa contextual não é busca tradicional",
    subtitle: "Intenção · complementaridade · mensuração · teste incremental · sem falsa substituição.",
  },
  metaComparison: {
    eyebrow: "ESTRATÉGIA · CHATGPT ADS VS META ADS",
    title: "Conversa e descoberta disputam atenção de formas diferentes",
    subtitle: "Criativo · contexto · privacidade · atribuição · critérios responsáveis de escala.",
  },
  agencies: {
    eyebrow: "PLAYBOOK · CHATGPT ADS PARA AGÊNCIAS",
    title: "Da novidade à operação governada",
    subtitle: "Elegibilidade · landing page · piloto · reporting · decisão de escala.",
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
  "radar-ads-manager-nine-markets": {
    eyebrow: "RADAR · GLOBAL / SELF-SERVE · 25/08/2026",
    title: "Ads Manager aparece disponível em nove países",
    subtitle: "9 mercados Available no snapshot auditado em 25/08/2026 · fonte primária OpenAI Help Center.",
  },
  "radar-chatgpt-ads-europe-31-markets": {
    eyebrow: "RADAR · EUROPA · 24/08/2026",
    title: "ChatGPT Ads chega a 31 mercados europeus",
    subtitle: "Expansão europeia registrada com data, impacto e fonte primária OpenAI.",
  },
  "radar-chatgpt-ads-brasil-launch": {
    eyebrow: "RADAR · BRASIL · 11/08/2026",
    title: "ChatGPT Ads é lançado no Brasil e em quatro novos mercados",
    subtitle: "Lançamento oficial registrado com estado observado e fonte primária OpenAI.",
  },
  "radar-brazil-expansion-announced": {
    eyebrow: "RADAR · BRASIL · 07/05/2026",
    title: "OpenAI anuncia próxima onda internacional de Ads",
    subtitle: "Brasil entra formalmente no roadmap de expansão internacional do ChatGPT Ads.",
  },
  "radar-ads-manager-cpc-measurement": {
    eyebrow: "RADAR · PLATAFORMA · 05/05/2026",
    title: "Ads Manager beta e CPC ampliam a infraestrutura publicitária",
    subtitle: "Autosserviço beta, CPC e mensuração ampliada registrados com fonte primária.",
  },
  "radar-canada-australia-new-zealand-expansion": {
    eyebrow: "RADAR · EXPANSÃO · 26/03/2026",
    title: "Piloto começa a sair dos Estados Unidos",
    subtitle: "Canadá, Austrália e Nova Zelândia entram na primeira expansão internacional registrada.",
  },
  "radar-us-pilot-starts": {
    eyebrow: "RADAR · ESTADOS UNIDOS · 09/02/2026",
    title: "Começa o teste de anúncios no ChatGPT",
    subtitle: "Início do piloto nos EUA para parte dos usuários Free e Go, com fonte primária OpenAI.",
  },
  imprensa: {
    eyebrow: "MEDIA SOURCE ROOM · LORENZA VOLPONI",
    title: "IA, GEO e publicidade conversacional com evidência",
    subtitle: "Bio, dados, Radar, fontes e materiais verificáveis para imprensa e pesquisa.",
  },
  pressData: {
    eyebrow: "DADOS PARA IMPRENSA · CITE THIS DATA",
    title: "Fatos prontos para citar — com a ressalva que impede o dado de mentir",
    subtitle: "Mercados · mínimo de campanha · planos · fonte primária · citação humana e JSON.",
  },
  english: {
    eyebrow: "CHATGPT ADS INTELLIGENCE · ENGLISH EDITION",
    title: "Markets, measurement and verified product changes",
    subtitle: "Independent briefing · primary sources · open data · evidence before excitement.",
  },
} as const;

export type SocialCardKey = keyof typeof SOCIAL_CARDS;

const PATH_TO_CARD: Record<string, SocialCardKey> = {
  "/": "home",
  "/en": "english",
  "/como-anunciar-no-chatgpt": "comoAnunciar",
  "/chatgpt-ads-brasil": "brasil",
  "/chatgpt-ads-market": "market",
  "/chatgpt-ads-precos": "precos",
  "/chatgpt-ads-metricas": "metricas",
  "/ads-manager-chatgpt": "manager",
  "/chatgpt-ads-privacidade": "privacidade",
  "/chatgpt-ads-vs-google-ads": "googleComparison",
  "/chatgpt-ads-vs-meta-ads": "metaComparison",
  "/chatgpt-ads-para-agencias": "agencies",
  "/oai-adsbot-searchbot": "crawlers",
  "/radar": "radar",
  "/imprensa": "imprensa",
  "/imprensa/dados": "pressData",
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
    a: "No Brasil, o fluxo atual passa pelo OpenAI Ads Manager: configure a conta, escolha CPM, CPC ou oCPC, defina orçamento e segmentação, crie anúncios, valide a landing page e lance. A documentação atual lista mínimo diário de R$ 40 e plataformas iOS, Android e Web.",
    href: "/como-anunciar-no-chatgpt",
    linkLabel: "Ver o passo a passo completo",
  },
  {
    q: "ChatGPT Ads está disponível no Brasil?",
    a: "Sim. No snapshot auditado em 25/08/2026, o Brasil aparece como mercado disponível no Ads Manager. Como o produto está em expansão, o status deve ser revalidado.",
    href: "/chatgpt-ads-brasil",
    linkLabel: "Ver disponibilidade no Brasil",
  },
  {
    q: "Em quais países o Ads Manager está disponível?",
    a: "O Market Snapshot da volponi.tech separa mercados marcados como Available e Coming Soon, preservando a fonte oficial e a data de revisão em HTML, JSON e CSV.",
    href: "/chatgpt-ads-market",
    linkLabel: "Abrir o Market Snapshot",
  },
  {
    q: "Quanto custa anunciar no ChatGPT?",
    a: "Não existe um CPC médio universal responsável. A documentação atual descreve CPM, CPC e oCPC e lista R$ 40 como mínimo diário de campanha no Brasil; a orientação de US$ 3–5 é um lance máximo inicial para CPC, não CPC médio realizado.",
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
    q: "ChatGPT Ads substitui Google Ads ou Meta Ads?",
    a: "Não há evidência responsável para tratar o canal como substituto universal. A análise útil compara intenção conversacional, busca declarada, descoberta criativa, qualidade de resultado e contribuição incremental.",
    href: "/chatgpt-ads-vs-google-ads",
    linkLabel: "Ver comparativos estratégicos",
  },
  {
    q: "Como uma agência deve começar no ChatGPT Ads?",
    a: "Confirme elegibilidade e políticas, valide landing page e mensuração, rode um piloto com hipótese explícita e escale apenas depois de reconciliar qualidade, conversão e economia unitária.",
    href: "/chatgpt-ads-para-agencias",
    linkLabel: "Abrir playbook para agências",
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
