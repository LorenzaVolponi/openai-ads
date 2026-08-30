export type SemanticLanguage = "pt-BR" | "en";

export type SemanticDocument = {
  path: string;
  title: string;
  description: string;
  language: SemanticLanguage;
  topics: string[];
  entities: string[];
  intents: string[];
  audiences: string[];
  evidence: string[];
  priority: number;
};

export const semanticTopics = {
  "chatgpt-ads": {
    label: "ChatGPT Ads",
    aliases: ["OpenAI Ads", "GPT Ads", "Ads GPT", "ads in ChatGPT", "ChatGPT advertising", "anúncios no ChatGPT", "publicidade no ChatGPT"],
  },
  "ads-manager": {
    label: "Ads Manager",
    aliases: ["OpenAI Ads Manager", "ChatGPT Ads Manager", "self-serve ads", "autosserviço de anúncios"],
  },
  "market-availability": {
    label: "Market availability",
    aliases: ["market access", "country availability", "rollout", "availability", "disponibilidade", "países disponíveis", "expansão internacional"],
  },
  pricing: {
    label: "Pricing and auction",
    aliases: ["CPC", "CPM", "oCPC", "bid", "auction", "budget", "preço", "custo", "lance", "leilão", "orçamento"],
  },
  measurement: {
    label: "Measurement",
    aliases: ["metrics", "measurement", "CTR", "CPC", "CPM", "CVR", "CPA", "ROAS", "conversion", "métricas", "mensuração", "conversão"],
  },
  privacy: {
    label: "Privacy and governance",
    aliases: ["privacy", "data", "personalization", "governance", "privacidade", "dados", "personalização", "governança"],
  },
  "conversational-advertising": {
    label: "Conversational advertising",
    aliases: ["conversational ads", "AI advertising", "AI ads", "publicidade conversacional", "publicidade em IA"],
  },
  "geo-ai-search": {
    label: "GEO and AI Search",
    aliases: ["GEO", "Generative Engine Optimization", "AI Search", "AI discovery", "answer engines", "busca por IA", "descoberta por IA", "mecanismos generativos"],
  },
  "ai-systems": {
    label: "AI systems",
    aliases: ["AI systems strategy", "AI architecture", "agents", "automation", "sistemas de IA", "arquitetura de IA", "agentes", "automação"],
  },
  "ai-product-ux": {
    label: "AI Product and UX/UI",
    aliases: ["AI Product", "AI UX", "UX/UI for AI", "conversational UX", "produto de IA", "UX de IA", "interfaces conversacionais"],
  },
  evidence: {
    label: "Evidence architecture",
    aliases: ["primary sources", "provenance", "evidence ledger", "audit trail", "fontes primárias", "proveniência", "cadeia de evidências"],
  },
  research: {
    label: "Original research",
    aliases: ["Volponi AI Index", "research dataset", "independent research", "pesquisa original", "dataset", "índice"],
  },
  "lorenza-volponi": {
    label: "Lorenza Volponi",
    aliases: ["AI specialist", "AI Systems Strategist", "AI expert", "GEO strategist", "especialista em IA", "estrategista de sistemas de IA"],
  },
  media: {
    label: "Press and media source",
    aliases: ["press", "journalist", "interview", "media source", "imprensa", "jornalista", "entrevista", "fonte para imprensa"],
  },
} as const;

export const semanticDocuments: SemanticDocument[] = [
  {
    path: "/",
    title: "ChatGPT Ads Brasil — Intelligence Hub",
    description: "Canonical Portuguese intelligence hub for ChatGPT Ads, markets, buying, measurement, privacy, Radar and evidence.",
    language: "pt-BR",
    topics: ["chatgpt-ads", "ads-manager", "market-availability", "pricing", "measurement", "privacy", "conversational-advertising", "evidence"],
    entities: ["Lorenza Volponi", "volponi.tech", "ChatGPT Ads"],
    intents: ["learn", "evaluate", "operate"],
    audiences: ["brands", "agencies", "operators", "journalists"],
    evidence: ["primary-sources", "radar", "datasets"],
    priority: 100,
  },
  {
    path: "/como-anunciar-no-chatgpt",
    title: "Como anunciar no ChatGPT",
    description: "Operational guide to campaign creation, Ads Manager, budget, landing pages, crawlers and measurement.",
    language: "pt-BR",
    topics: ["chatgpt-ads", "ads-manager", "pricing", "measurement", "conversational-advertising"],
    entities: ["ChatGPT Ads", "OpenAI Ads Manager"],
    intents: ["how-to", "operate"],
    audiences: ["brands", "agencies", "operators"],
    evidence: ["primary-sources"],
    priority: 96,
  },
  {
    path: "/chatgpt-ads-brasil",
    title: "ChatGPT Ads no Brasil",
    description: "Brazil availability, launch status, market context and operational boundaries.",
    language: "pt-BR",
    topics: ["chatgpt-ads", "market-availability", "ads-manager", "conversational-advertising"],
    entities: ["ChatGPT Ads", "Brasil"],
    intents: ["availability", "learn", "evaluate"],
    audiences: ["brands", "agencies", "journalists"],
    evidence: ["primary-sources", "radar"],
    priority: 94,
  },
  {
    path: "/chatgpt-ads-market",
    title: "ChatGPT Ads Market Snapshot",
    description: "Auditable market availability snapshot with open data and source-linked status.",
    language: "pt-BR",
    topics: ["chatgpt-ads", "market-availability", "ads-manager", "evidence", "research"],
    entities: ["ChatGPT Ads", "Volponi AI Index"],
    intents: ["availability", "research", "compare"],
    audiences: ["brands", "agencies", "journalists", "analysts"],
    evidence: ["dataset", "primary-sources", "radar"],
    priority: 95,
  },
  {
    path: "/chatgpt-ads-precos",
    title: "ChatGPT Ads preços, CPC, CPM e oCPC",
    description: "Buying models, budget, bidding and auction mechanics without invented benchmarks.",
    language: "pt-BR",
    topics: ["chatgpt-ads", "pricing", "ads-manager", "measurement"],
    entities: ["ChatGPT Ads", "OpenAI Ads Manager"],
    intents: ["pricing", "evaluate", "operate"],
    audiences: ["brands", "agencies", "operators"],
    evidence: ["primary-sources"],
    priority: 93,
  },
  {
    path: "/chatgpt-ads-metricas",
    title: "Métricas do ChatGPT Ads",
    description: "CTR, CPC, CPM, conversions, CPA and ROAS with measurement boundaries.",
    language: "pt-BR",
    topics: ["chatgpt-ads", "measurement", "pricing", "evidence"],
    entities: ["ChatGPT Ads", "OpenAI Ads Manager"],
    intents: ["measure", "evaluate"],
    audiences: ["brands", "agencies", "operators", "analysts"],
    evidence: ["primary-sources", "methodology"],
    priority: 93,
  },
  {
    path: "/ads-manager-chatgpt",
    title: "OpenAI Ads Manager",
    description: "Ads Manager availability, buying, reporting, measurement and operational limits.",
    language: "pt-BR",
    topics: ["chatgpt-ads", "ads-manager", "market-availability", "pricing", "measurement"],
    entities: ["OpenAI Ads Manager", "ChatGPT Ads"],
    intents: ["operate", "availability", "measure"],
    audiences: ["brands", "agencies", "operators"],
    evidence: ["primary-sources"],
    priority: 94,
  },
  {
    path: "/chatgpt-ads-privacidade",
    title: "Privacidade no ChatGPT Ads",
    description: "Privacy, advertiser data boundaries, personalization and governance.",
    language: "pt-BR",
    topics: ["chatgpt-ads", "privacy", "conversational-advertising", "evidence"],
    entities: ["ChatGPT Ads"],
    intents: ["privacy", "evaluate", "govern"],
    audiences: ["brands", "agencies", "legal", "journalists"],
    evidence: ["primary-sources"],
    priority: 91,
  },
  {
    path: "/chatgpt-ads-vs-google-ads",
    title: "ChatGPT Ads vs Google Ads",
    description: "Comparison of conversational context, search intent, measurement and channel role.",
    language: "pt-BR",
    topics: ["chatgpt-ads", "conversational-advertising", "measurement", "geo-ai-search"],
    entities: ["ChatGPT Ads", "Google Ads"],
    intents: ["compare", "strategy"],
    audiences: ["brands", "agencies", "operators"],
    evidence: ["primary-sources", "methodology"],
    priority: 89,
  },
  {
    path: "/chatgpt-ads-vs-meta-ads",
    title: "ChatGPT Ads vs Meta Ads",
    description: "Comparison of conversational discovery, creative context, privacy and measurement.",
    language: "pt-BR",
    topics: ["chatgpt-ads", "conversational-advertising", "measurement", "privacy"],
    entities: ["ChatGPT Ads", "Meta Ads"],
    intents: ["compare", "strategy"],
    audiences: ["brands", "agencies", "operators"],
    evidence: ["primary-sources", "methodology"],
    priority: 88,
  },
  {
    path: "/chatgpt-ads-para-agencias",
    title: "ChatGPT Ads para agências",
    description: "Agency operating model, client qualification, pilots, governance and measurement.",
    language: "pt-BR",
    topics: ["chatgpt-ads", "conversational-advertising", "measurement", "evidence"],
    entities: ["ChatGPT Ads", "Lorenza Volponi"],
    intents: ["strategy", "operate", "commercial"],
    audiences: ["agencies"],
    evidence: ["primary-sources", "methodology"],
    priority: 90,
  },
  {
    path: "/radar",
    title: "Volponi ChatGPT Ads Radar",
    description: "Public change ledger preserving dated, source-linked product and market changes.",
    language: "pt-BR",
    topics: ["chatgpt-ads", "market-availability", "evidence", "research"],
    entities: ["Lorenza Volponi", "Volponi ChatGPT Ads Radar"],
    intents: ["research", "verify", "news"],
    audiences: ["journalists", "analysts", "brands", "agencies"],
    evidence: ["primary-sources", "change-ledger"],
    priority: 97,
  },
  {
    path: "/imprensa",
    title: "Lorenza Volponi — fonte para imprensa",
    description: "Portuguese media source room for AI, ChatGPT Ads, GEO, AI Search and evidence-backed commentary.",
    language: "pt-BR",
    topics: ["lorenza-volponi", "media", "chatgpt-ads", "geo-ai-search", "ai-systems", "evidence"],
    entities: ["Lorenza Volponi", "volponi.tech"],
    intents: ["media", "authority", "verify"],
    audiences: ["journalists", "editors", "producers"],
    evidence: ["profile", "radar", "datasets"],
    priority: 92,
  },
  {
    path: "/autoridade",
    title: "Authority Observatory",
    description: "Evidence, search, GEO, citations and reputation signals connected to one canonical entity.",
    language: "pt-BR",
    topics: ["lorenza-volponi", "geo-ai-search", "evidence", "research", "ai-systems"],
    entities: ["Lorenza Volponi", "volponi.tech"],
    intents: ["authority", "verify", "research"],
    audiences: ["journalists", "analysts", "search-systems"],
    evidence: ["search-console", "provenance", "citation-ledger"],
    priority: 88,
  },
  {
    path: "/metodologia",
    title: "Metodologia editorial e de evidência",
    description: "Editorial review, evidence states, primary-source policy, GEO and provenance rules.",
    language: "pt-BR",
    topics: ["evidence", "research", "geo-ai-search", "chatgpt-ads"],
    entities: ["Lorenza Volponi", "Volponi AI Index"],
    intents: ["verify", "methodology", "research"],
    audiences: ["journalists", "analysts", "search-systems"],
    evidence: ["primary-sources", "provenance"],
    priority: 87,
  },
  {
    path: "/en",
    title: "AI, GEO, AI Search and ChatGPT Ads Intelligence",
    description: "English authority hub connecting original research, AI systems, AI Product/UX/UI, GEO, AI Search and conversational advertising.",
    language: "en",
    topics: ["chatgpt-ads", "geo-ai-search", "ai-systems", "ai-product-ux", "research", "lorenza-volponi", "evidence"],
    entities: ["Lorenza Volponi", "Volponi AI Index", "ChatGPT Ads"],
    intents: ["authority", "research", "strategy"],
    audiences: ["brands", "agencies", "journalists", "executives"],
    evidence: ["ai-index", "radar", "primary-sources"],
    priority: 99,
  },
  {
    path: "/en/chatgpt-ads",
    title: "ChatGPT Ads global guide",
    description: "English guide to markets, buying, measurement, strategy and verified product changes.",
    language: "en",
    topics: ["chatgpt-ads", "ads-manager", "market-availability", "pricing", "measurement", "conversational-advertising"],
    entities: ["ChatGPT Ads", "Lorenza Volponi"],
    intents: ["learn", "evaluate", "strategy"],
    audiences: ["brands", "agencies", "operators"],
    evidence: ["primary-sources", "radar"],
    priority: 95,
  },
  {
    path: "/en/radar",
    title: "ChatGPT Ads Evidence Radar",
    description: "English evidence hub for verified changes, markets, open data and primary sources.",
    language: "en",
    topics: ["chatgpt-ads", "market-availability", "evidence", "research"],
    entities: ["Lorenza Volponi", "Volponi ChatGPT Ads Radar"],
    intents: ["research", "verify", "news"],
    audiences: ["journalists", "analysts", "brands", "agencies"],
    evidence: ["primary-sources", "change-ledger", "dataset"],
    priority: 98,
  },
  {
    path: "/en/volponi-ai-index",
    title: "Volponi AI Index — AI Advertising & Discovery Readiness",
    description: "Original research on observable AI advertising and discovery readiness using a source-linked evidence matrix.",
    language: "en",
    topics: ["research", "evidence", "chatgpt-ads", "market-availability", "measurement", "geo-ai-search"],
    entities: ["Lorenza Volponi", "Volponi AI Index"],
    intents: ["research", "verify", "cite"],
    audiences: ["journalists", "analysts", "executives", "brands", "agencies"],
    evidence: ["dataset", "primary-sources", "methodology", "radar"],
    priority: 100,
  },
  {
    path: "/en/lorenza-volponi",
    title: "Lorenza Volponi — AI Systems Strategist & Builder",
    description: "Canonical English profile covering AI systems, AI Product/UX/UI, GEO, AI Search, automation and evidence architecture.",
    language: "en",
    topics: ["lorenza-volponi", "ai-systems", "ai-product-ux", "geo-ai-search", "evidence", "research"],
    entities: ["Lorenza Volponi", "volponi.tech"],
    intents: ["authority", "commercial", "media"],
    audiences: ["executives", "brands", "agencies", "journalists", "partners"],
    evidence: ["profile", "ai-index", "radar", "code"],
    priority: 99,
  },
  {
    path: "/en/press",
    title: "Lorenza Volponi — Press & Media",
    description: "English press room connecting Lorenza Volponi, original AI research, source-ready findings and evidence.",
    language: "en",
    topics: ["lorenza-volponi", "media", "research", "chatgpt-ads", "geo-ai-search", "ai-systems", "ai-product-ux"],
    entities: ["Lorenza Volponi", "Volponi AI Index"],
    intents: ["media", "cite", "authority"],
    audiences: ["journalists", "editors", "producers"],
    evidence: ["ai-index", "radar", "dataset", "citation"],
    priority: 96,
  },
  {
    path: "/en/geo-ai-strategy",
    title: "GEO & AI Search Strategy",
    description: "Strategy for entity clarity, AI discovery, evidence architecture and source-level discoverability.",
    language: "en",
    topics: ["geo-ai-search", "ai-systems", "evidence", "lorenza-volponi"],
    entities: ["Lorenza Volponi", "volponi.tech"],
    intents: ["strategy", "authority", "commercial"],
    audiences: ["brands", "executives", "publishers", "agencies"],
    evidence: ["methodology", "research", "code"],
    priority: 94,
  },
  {
    path: "/en/chatgpt-ads-strategy",
    title: "ChatGPT Ads Strategy",
    description: "Market entry, pilot architecture, measurement, governance and decision criteria.",
    language: "en",
    topics: ["chatgpt-ads", "conversational-advertising", "measurement", "evidence"],
    entities: ["Lorenza Volponi", "ChatGPT Ads"],
    intents: ["strategy", "commercial", "evaluate"],
    audiences: ["brands", "executives", "operators"],
    evidence: ["research", "primary-sources"],
    priority: 92,
  },
  {
    path: "/en/chatgpt-ads-for-agencies",
    title: "ChatGPT Ads for Agencies",
    description: "Agency enablement, operating models, client qualification and strategic partnership.",
    language: "en",
    topics: ["chatgpt-ads", "conversational-advertising", "measurement", "evidence", "lorenza-volponi"],
    entities: ["Lorenza Volponi", "ChatGPT Ads"],
    intents: ["strategy", "commercial", "operate"],
    audiences: ["agencies"],
    evidence: ["research", "methodology"],
    priority: 91,
  },
  {
    path: "/en/chatgpt-ads-for-brands",
    title: "ChatGPT Ads for Brands",
    description: "Brand readiness, pilot design, governance, measurement and AI discovery.",
    language: "en",
    topics: ["chatgpt-ads", "conversational-advertising", "measurement", "geo-ai-search"],
    entities: ["Lorenza Volponi", "ChatGPT Ads"],
    intents: ["strategy", "commercial", "evaluate"],
    audiences: ["brands", "executives"],
    evidence: ["research", "methodology"],
    priority: 91,
  },
];

function sharedCount(a: string[], b: string[]) {
  const right = new Set(b.map((item) => item.toLowerCase()));
  return a.reduce((count, item) => count + (right.has(item.toLowerCase()) ? 1 : 0), 0);
}

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function tokens(value: string) {
  return new Set(normalize(value).split(/\s+/).filter((token) => token.length > 1));
}

export function getSemanticDocument(path: string) {
  return semanticDocuments.find((document) => document.path === path);
}

export function semanticSimilarity(source: SemanticDocument, target: SemanticDocument) {
  if (source.path === target.path) return 0;
  const topicScore = sharedCount(source.topics, target.topics) * 10;
  const entityScore = sharedCount(source.entities, target.entities) * 7;
  const intentScore = sharedCount(source.intents, target.intents) * 4;
  const audienceScore = sharedCount(source.audiences, target.audiences) * 2;
  const evidenceScore = sharedCount(source.evidence, target.evidence) * 2;
  const languageScore = source.language === target.language ? 4 : 0;
  const authorityScore = Math.round(target.priority / 20);
  return topicScore + entityScore + intentScore + audienceScore + evidenceScore + languageScore + authorityScore;
}

export function getRelatedSemanticDocuments(path: string, limit = 5, language?: SemanticLanguage) {
  const source = getSemanticDocument(path);
  if (!source) return [];

  const ranked = semanticDocuments
    .filter((target) => target.path !== source.path)
    .map((target) => ({
      ...target,
      score: semanticSimilarity(source, target),
      sharedTopics: target.topics.filter((topic) => source.topics.includes(topic)),
    }))
    .filter((target) => target.score > 0)
    .sort((a, b) => b.score - a.score || b.priority - a.priority);

  if (!language) return ranked.slice(0, limit);
  const sameLanguage = ranked.filter((target) => target.language === language);
  const otherLanguage = ranked.filter((target) => target.language !== language);
  return [...sameLanguage, ...otherLanguage].slice(0, limit);
}

function expandedQueryTerms(query: string) {
  const base = tokens(query);
  for (const [topicId, topic] of Object.entries(semanticTopics)) {
    const candidates = [topicId, topic.label, ...topic.aliases];
    const matches = candidates.some((candidate) => {
      const candidateTokens = tokens(candidate);
      let overlap = 0;
      for (const token of candidateTokens) if (base.has(token)) overlap += 1;
      return overlap > 0 || normalize(query).includes(normalize(candidate));
    });
    if (matches) {
      for (const candidate of candidates) for (const token of tokens(candidate)) base.add(token);
    }
  }
  return base;
}

export function semanticSearch(query: string, options: { language?: SemanticLanguage; limit?: number } = {}) {
  const queryTerms = expandedQueryTerms(query);
  const limit = options.limit ?? 8;

  return semanticDocuments
    .filter((document) => !options.language || document.language === options.language)
    .map((document) => {
      const topicText = document.topics.flatMap((topicId) => {
        const topic = semanticTopics[topicId as keyof typeof semanticTopics];
        return topic ? [topicId, topic.label, ...topic.aliases] : [topicId];
      }).join(" ");
      const searchable = tokens([document.title, document.description, topicText, ...document.entities, ...document.intents, ...document.audiences].join(" "));
      let overlap = 0;
      for (const term of queryTerms) if (searchable.has(term)) overlap += 1;
      const exactTitle = normalize(document.title).includes(normalize(query)) ? 12 : 0;
      const exactDescription = normalize(document.description).includes(normalize(query)) ? 6 : 0;
      const score = overlap * 3 + exactTitle + exactDescription + Math.round(document.priority / 25);
      return { ...document, score };
    })
    .filter((result) => result.score > 4)
    .sort((a, b) => b.score - a.score || b.priority - a.priority)
    .slice(0, limit);
}

export function semanticEdges(limitPerNode = 4) {
  return semanticDocuments.flatMap((source) =>
    getRelatedSemanticDocuments(source.path, limitPerNode).map((target) => ({
      from: source.path,
      to: target.path,
      relation: "semantically-related",
      score: target.score,
      sharedTopics: target.sharedTopics,
    })),
  );
}
