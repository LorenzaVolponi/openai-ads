export type RadarSource = {
  label: string;
  url: string;
  publisher: string;
};

export type RadarEntry = {
  date: string;
  slug: string;
  kind: "launch" | "expansion" | "platform" | "measurement" | "availability";
  market: string;
  title: string;
  summary: string;
  impact: string;
  previousState: string;
  currentState: string;
  confidence: "Fonte primária";
  source: RadarSource;
};

export type MarketState = {
  country: string;
  code: string;
  adsManager: "Available" | "Coming Soon";
  group: "current" | "europe-expansion";
  checkedAt: string;
  source: string;
};

export const RADAR_CHECKED_AT = "2026-08-25";

export const RADAR_SOURCES = {
  test: {
    label: "Testing ads in ChatGPT",
    url: "https://openai.com/index/testing-ads-in-chatgpt/",
    publisher: "OpenAI",
  },
  newWays: {
    label: "New ways to buy ChatGPT ads",
    url: "https://openai.com/index/new-ways-to-buy-chatgpt-ads/",
    publisher: "OpenAI",
  },
  europe: {
    label: "ChatGPT Ads expands across Europe",
    url: "https://openai.com/index/chatgpt-ads-expands-across-europe/",
    publisher: "OpenAI",
  },
  availability: {
    label: "Ads Manager Availability",
    url: "https://help.openai.com/en/articles/20001245-ads-manager-availability",
    publisher: "OpenAI Help Center",
  },
  faq: {
    label: "Frequently asked questions — Ads Manager Beta",
    url: "https://help.openai.com/en/articles/20001220",
    publisher: "OpenAI Help Center",
  },
} satisfies Record<string, RadarSource>;

export const radarEntries: RadarEntry[] = [
  {
    date: "2026-08-25",
    slug: "ads-manager-nine-markets",
    kind: "availability",
    market: "Global / self-serve",
    title: "Ads Manager aparece disponível em nove países",
    summary:
      "O snapshot oficial mais recente lista Austrália, Brasil, Canadá, Japão, Coreia do Sul, México, Nova Zelândia, Reino Unido e Estados Unidos como Available.",
    impact:
      "Transforma a discussão de disponibilidade em uma fotografia operacional auditável. O status pode mudar e deve ser rechecado antes de decisões de mídia.",
    previousState: "Disponibilidade variava por mercado e páginas localizadas podiam divergir.",
    currentState: "9 mercados Available no snapshot auditado em 25/08/2026.",
    confidence: "Fonte primária",
    source: RADAR_SOURCES.availability,
  },
  {
    date: "2026-08-24",
    slug: "chatgpt-ads-europe-31-markets",
    kind: "expansion",
    market: "Europa",
    title: "ChatGPT Ads chega a 31 mercados europeus",
    summary:
      "A expansão europeia entra em vigor em 24 de agosto. O acesso inicial é via Ads Solutions, agências e parceiros; autosserviço pelo Ads Manager vem depois.",
    impact:
      "Amplia fortemente a presença geográfica, mas não deve ser confundida com autosserviço simultâneo em todos os mercados.",
    previousState: "Europa ainda não fazia parte da presença ampla anunciada.",
    currentState: "31 mercados europeus com expansão anunciada e entrada em vigor em 24/08/2026.",
    confidence: "Fonte primária",
    source: RADAR_SOURCES.europe,
  },
  {
    date: "2026-08-11",
    slug: "chatgpt-ads-brasil-launch",
    kind: "launch",
    market: "Brasil, Reino Unido, México, Japão e Coreia do Sul",
    title: "ChatGPT Ads é lançado no Brasil e em quatro novos mercados",
    summary:
      "A OpenAI informa o lançamento no Reino Unido, México, Brasil, Japão e Coreia do Sul, dando continuidade à expansão iniciada nos Estados Unidos.",
    impact:
      "O Brasil deixa de ser apenas mercado anunciado e passa a integrar o rollout efetivo de ChatGPT Ads.",
    previousState: "Expansão anunciada, mas ainda não lançada.",
    currentState: "Brasil e quatro novos mercados oficialmente lançados.",
    confidence: "Fonte primária",
    source: RADAR_SOURCES.test,
  },
  {
    date: "2026-05-07",
    slug: "brazil-expansion-announced",
    kind: "expansion",
    market: "Brasil, Reino Unido, México, Japão e Coreia do Sul",
    title: "OpenAI anuncia próxima onda internacional de Ads",
    summary:
      "A OpenAI anuncia intenção de ampliar o piloto para cinco novos mercados nas semanas seguintes.",
    impact:
      "Cria o primeiro marco oficial específico para o Brasil antes do lançamento de agosto.",
    previousState: "Piloto internacional ainda concentrado em outros mercados.",
    currentState: "Brasil incluído formalmente no roadmap de expansão.",
    confidence: "Fonte primária",
    source: RADAR_SOURCES.test,
  },
  {
    date: "2026-05-05",
    slug: "ads-manager-cpc-measurement",
    kind: "platform",
    market: "Plataforma",
    title: "Ads Manager beta e CPC ampliam a infraestrutura publicitária",
    summary:
      "A OpenAI apresenta um Ads Manager de autosserviço beta, compra por CPC e ferramentas ampliadas de mensuração, além do acesso por parceiros.",
    impact:
      "Marca a transição de um piloto negociado diretamente para uma infraestrutura mais repetível de compra, gestão e mensuração.",
    previousState: "Compra concentrada em um grupo menor de anunciantes e formatos mais limitados.",
    currentState: "Autosserviço beta, CPC e mensuração ampliada entram na plataforma.",
    confidence: "Fonte primária",
    source: RADAR_SOURCES.newWays,
  },
  {
    date: "2026-03-26",
    slug: "canada-australia-new-zealand-expansion",
    kind: "expansion",
    market: "Canadá, Austrália e Nova Zelândia",
    title: "Piloto começa a sair dos Estados Unidos",
    summary:
      "A OpenAI anuncia que a expansão internacional começaria por Canadá, Austrália e Nova Zelândia.",
    impact:
      "É o primeiro sinal oficial de que o produto publicitário seria testado em múltiplos mercados e regulações.",
    previousState: "Teste restrito aos Estados Unidos.",
    currentState: "Primeira expansão internacional anunciada.",
    confidence: "Fonte primária",
    source: RADAR_SOURCES.test,
  },
  {
    date: "2026-02-09",
    slug: "us-pilot-starts",
    kind: "launch",
    market: "Estados Unidos",
    title: "Começa o teste de anúncios no ChatGPT",
    summary:
      "A OpenAI inicia o teste nos Estados Unidos para adultos conectados nos planos Free e Go, mantendo respostas separadas da publicidade.",
    impact:
      "Cria o marco zero público da cronologia do produto publicitário do ChatGPT.",
    previousState: "Sem piloto publicitário público em produção.",
    currentState: "Piloto iniciado nos EUA para parte dos usuários Free e Go.",
    confidence: "Fonte primária",
    source: RADAR_SOURCES.test,
  },
];

const availableMarkets = [
  ["Australia", "AU"],
  ["Brazil", "BR"],
  ["Canada", "CA"],
  ["Japan", "JP"],
  ["South Korea", "KR"],
  ["Mexico", "MX"],
  ["New Zealand", "NZ"],
  ["United Kingdom", "GB"],
  ["United States", "US"],
] as const;

const europeComingSoon = [
  ["Austria", "AT"], ["Belgium", "BE"], ["Bulgaria", "BG"], ["Croatia", "HR"],
  ["Cyprus", "CY"], ["Czech Republic", "CZ"], ["Denmark", "DK"], ["Estonia", "EE"],
  ["Finland", "FI"], ["France", "FR"], ["Germany", "DE"], ["Greece", "GR"],
  ["Hungary", "HU"], ["Iceland", "IS"], ["Ireland", "IE"], ["Italy", "IT"],
  ["Latvia", "LV"], ["Liechtenstein", "LI"], ["Lithuania", "LT"], ["Luxembourg", "LU"],
  ["Malta", "MT"], ["Netherlands", "NL"], ["Norway", "NO"], ["Poland", "PL"],
  ["Portugal", "PT"], ["Romania", "RO"], ["Slovakia", "SK"], ["Slovenia", "SI"],
  ["Spain", "ES"], ["Sweden", "SE"], ["Switzerland", "CH"],
] as const;

export const marketStates: MarketState[] = [
  ...availableMarkets.map(([country, code]) => ({
    country,
    code,
    adsManager: "Available" as const,
    group: "current" as const,
    checkedAt: RADAR_CHECKED_AT,
    source: RADAR_SOURCES.availability.url,
  })),
  ...europeComingSoon.map(([country, code]) => ({
    country,
    code,
    adsManager: "Coming Soon" as const,
    group: "europe-expansion" as const,
    checkedAt: RADAR_CHECKED_AT,
    source: RADAR_SOURCES.availability.url,
  })),
];

export const readinessDimensions = [
  {
    dimension: "Disponibilidade no Brasil",
    level: "Operacional",
    evidence: "Brasil aparece como Available no Ads Manager.",
    source: RADAR_SOURCES.availability,
  },
  {
    dimension: "Modelos de compra",
    level: "Expandidos",
    evidence: "CPM, CPC e oCPC aparecem na documentação atual da plataforma.",
    source: RADAR_SOURCES.europe,
  },
  {
    dimension: "Mensuração",
    level: "Avançando",
    evidence: "OpenAI Pixel, Conversions API e integrações de mensuração de terceiros foram anunciados.",
    source: RADAR_SOURCES.europe,
  },
  {
    dimension: "Autosserviço",
    level: "Beta disponível",
    evidence: "Ads Manager Beta opera em mercados elegíveis, incluindo Brasil no snapshot atual.",
    source: RADAR_SOURCES.availability,
  },
  {
    dimension: "Benchmarks de performance",
    level: "Imaturos",
    evidence: "A própria FAQ afirma que ainda não há benchmarks de performance entre anunciantes, setores ou tipos de campanha.",
    source: RADAR_SOURCES.faq,
  },
] as const;
