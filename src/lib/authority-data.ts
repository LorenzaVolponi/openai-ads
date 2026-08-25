export type SourceRef = {
  label: string;
  url: string;
  publisher: string;
  checkedAt: string;
};

export type AuthorityMetric = {
  value: string;
  label: string;
  context: string;
  caveat: string;
  source: SourceRef;
};

export const CHECKED_AT = "25 de agosto de 2026";

export const SOURCES = {
  scale: {
    label: "Scaling AI for everyone",
    url: "https://openai.com/index/scaling-ai-for-everyone/",
    publisher: "OpenAI",
    checkedAt: CHECKED_AT,
  },
  adsLaunch: {
    label: "Testando anúncios no ChatGPT",
    url: "https://openai.com/pt-BR/index/testing-ads-in-chatgpt/",
    publisher: "OpenAI",
    checkedAt: CHECKED_AT,
  },
  adsBasics: {
    label: "Anúncios no ChatGPT: conceitos básicos",
    url: "https://help.openai.com/pt-br/articles/20001207",
    publisher: "OpenAI Help Center",
    checkedAt: CHECKED_AT,
  },
  campaignSetup: {
    label: "Criar campanhas para o ChatGPT Ads",
    url: "https://help.openai.com/pt-br/articles/20001210-criar-campanhas-para-o-chatgpt-ads",
    publisher: "OpenAI Help Center",
    checkedAt: CHECKED_AT,
  },
  availability: {
    label: "Disponibilidade do Gerenciador de Anúncios",
    url: "https://help.openai.com/pt-br/articles/20001245-ads-manager-availability",
    publisher: "OpenAI Help Center",
    checkedAt: CHECKED_AT,
  },
  generalAds: {
    label: "Anúncios no ChatGPT",
    url: "https://help.openai.com/pt-br/articles/20001047-ads-in-chatgpt",
    publisher: "OpenAI Help Center",
    checkedAt: CHECKED_AT,
  },
  adPolicies: {
    label: "Políticas publicitárias",
    url: "https://openai.com/pt-BR/policies/ad-policies/",
    publisher: "OpenAI",
    checkedAt: CHECKED_AT,
  },
  europe: {
    label: "ChatGPT Anúncios se expande pela Europa",
    url: "https://openai.com/pt-BR/index/chatgpt-ads-expands-across-europe/",
    publisher: "OpenAI",
    checkedAt: CHECKED_AT,
  },
} satisfies Record<string, SourceRef>;

export const authorityMetrics: AuthorityMetric[] = [
  {
    value: "900M+",
    label: "usuários semanais do ChatGPT",
    context: "Escala global declarada pela OpenAI em fevereiro de 2026.",
    caveat: "Não equivale a alcance publicitário nem a inventário elegível para anúncios.",
    source: SOURCES.scale,
  },
  {
    value: "9M+",
    label: "usuários empresariais pagantes",
    context: "Base paga de negócios declarada pela OpenAI em fevereiro de 2026.",
    caveat: "Não é um número de anunciantes e não deve ser usado como proxy de mídia disponível.",
    source: SOURCES.scale,
  },
  {
    value: "50M+",
    label: "assinantes consumidores",
    context: "Assinantes de consumo declarados pela OpenAI em fevereiro de 2026.",
    caveat: "Planos pagos como Plus e Pro permanecem sem anúncios segundo a documentação atual.",
    source: SOURCES.scale,
  },
  {
    value: "9",
    label: "países com Ads Manager disponível",
    context: "Austrália, Brasil, Canadá, Japão, Coreia do Sul, México, Nova Zelândia, Reino Unido e EUA.",
    caveat: "A disponibilidade muda rápido; esta contagem é um retrato da auditoria de 25/08/2026.",
    source: SOURCES.availability,
  },
  {
    value: "31",
    label: "mercados europeus na expansão anunciada",
    context: "Expansão comunicada pela OpenAI para 24 de agosto de 2026.",
    caveat: "Presença de anúncios no mercado e acesso de autosserviço ao Ads Manager não são a mesma coisa.",
    source: SOURCES.europe,
  },
  {
    value: "US$ 3–5",
    label: "lance máximo CPC inicial sugerido",
    context: "Faixa recomendada pela OpenAI para começar campanhas CPC.",
    caveat: "É orientação de lance máximo, não benchmark de CPC realizado, CTR ou retorno.",
    source: SOURCES.adsBasics,
  },
];

export const productFacts = [
  {
    eyebrow: "Compra",
    title: "CPM, CPC e oCPC",
    text: "O Ads Manager documenta objetivos de alcance por CPM, cliques por CPC e campanhas oCPC otimizadas para conversões pós-clique.",
    source: SOURCES.campaignSetup,
  },
  {
    eyebrow: "Leilão",
    title: "Segundo preço ponderado por relevância",
    text: "A seleção considera relevância e resultados esperados; contexto da conversa, landing page, título, texto e context hints entram na decisão de veiculação.",
    source: SOURCES.adsBasics,
  },
  {
    eyebrow: "Segmentação",
    title: "Context hints não são exact match",
    text: "Sugestões de contexto ajudam a orientar correspondência, mas não funcionam como palavras-chave de correspondência exata e não garantem entrega em conversas específicas.",
    source: SOURCES.adsBasics,
  },
  {
    eyebrow: "Relatórios",
    title: "7 sinais centrais de performance",
    text: "O Ads Manager Beta informa impressões, cliques, gasto, CTR, CPC médio, CPM médio e conversões quando a mensuração está configurada.",
    source: SOURCES.adsBasics,
  },
  {
    eyebrow: "Privacidade",
    title: "Anunciantes não veem as conversas",
    text: "A documentação informa que anunciantes não veem chats, histórico, memórias ou dados pessoais e recebem dados agregados de desempenho publicitário.",
    source: SOURCES.generalAds,
  },
  {
    eyebrow: "Separação",
    title: "Anúncio não altera a resposta",
    text: "Os anúncios rodam em sistemas separados do modelo de chat, aparecem abaixo da resposta e são claramente rotulados como patrocinados.",
    source: SOURCES.generalAds,
  },
] as const;

export const metricFormulas = [
  {
    metric: "CTR",
    formula: "cliques ÷ impressões × 100",
    reads: "Quanto da exposição virou clique.",
    warning: "CTR alto sem conversão pode significar curiosidade, não valor de negócio.",
  },
  {
    metric: "CPC",
    formula: "gasto ÷ cliques",
    reads: "Quanto custa gerar uma visita válida.",
    warning: "Compare com qualidade do tráfego e taxa de conversão; CPC barato sozinho não é vitória.",
  },
  {
    metric: "CPM",
    formula: "gasto ÷ impressões × 1.000",
    reads: "Quanto custa comprar mil impressões.",
    warning: "É útil para alcance, mas não mede sozinho intenção, atenção ou impacto incremental.",
  },
  {
    metric: "CVR",
    formula: "conversões ÷ cliques × 100",
    reads: "Quanto do tráfego virou ação desejada.",
    warning: "Depende de evento de conversão bem definido e mensuração funcionando.",
  },
  {
    metric: "CPA",
    formula: "gasto ÷ conversões",
    reads: "Quanto custa cada conversão medida.",
    warning: "Só faz sentido quando a conversão representa valor real para o negócio.",
  },
  {
    metric: "ROAS",
    formula: "receita atribuída ÷ gasto em mídia",
    reads: "Retorno de receita atribuído ao investimento.",
    warning: "Atribuição não é causalidade; use testes incrementais quando a decisão justificar.",
  },
] as const;

export const evidenceLedger = [
  {
    status: "confirmado",
    title: "Brasil está disponível no Ads Manager",
    text: "A página de disponibilidade lista o Brasil como disponível na auditoria de 25/08/2026.",
    source: SOURCES.availability,
  },
  {
    status: "confirmado",
    title: "Free e Go podem exibir anúncios",
    text: "Plus, Pro, Business, Enterprise e Edu permanecem sem anúncios segundo a documentação atual.",
    source: SOURCES.generalAds,
  },
  {
    status: "confirmado",
    title: "Medição de conversão existe",
    text: "Conversões aparecem nos relatórios quando a mensuração está configurada; a documentação também descreve campanhas oCPC.",
    source: SOURCES.campaignSetup,
  },
  {
    status: "não confundir",
    title: "900M usuários ≠ 900M de alcance de mídia",
    text: "O número descreve uso semanal do ChatGPT, não pessoas elegíveis, inventário comprado ou alcance garantido de campanhas.",
    source: SOURCES.scale,
  },
  {
    status: "não confundir",
    title: "US$ 3–5 ≠ CPC médio da plataforma",
    text: "A faixa é recomendação de lance máximo inicial para CPC, não dado de performance realizado.",
    source: SOURCES.adsBasics,
  },
  {
    status: "em evolução",
    title: "Mercados e recursos mudam rapidamente",
    text: "O Ads Manager continua beta; disponibilidade, integrações e fluxos podem mudar sem que benchmarks antigos continuem válidos.",
    source: SOURCES.availability,
  },
] as const;

export const citationBlock = {
  title: "ChatGPT Ads no Brasil 2026: dados, preços, métricas, Ads Manager e privacidade",
  author: "Lorenza Volponi",
  publisher: "volponi.tech",
  canonical: "https://openai-ads.volponi.tech",
  reviewedAt: "2026-08-25",
  description:
    "Guia editorial independente, auditado contra fontes primárias, sobre ChatGPT Ads no Brasil em 2026.",
};
