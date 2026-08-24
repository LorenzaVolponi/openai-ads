// ============================================================
// Raposa IA — motor de respostas 100% local (opensource)
// ------------------------------------------------------------
// Retrieval determinístico sobre o conteúdo real do guia
// (src/lib/content.ts). Sem API externa, sem chaves, roda no
// navegador e na Vercel. Por construção NÃO inventa: só
// compõe respostas com o material indexado; abaixo do limite
// de confiança, admite que não sabe e sugere perguntas.
// ============================================================

import {
  faqs,
  glossary,
  apiTools,
  strategies,
  mistakes,
  timeline,
  benchmarks,
  checklistItems,
  measurementEvents,
  comparisonTabs,
  audienceTabs,
} from "@/lib/content";

export type KbEntry = {
  id: string;
  title: string;
  text: string;
  keywords: string[];
  section: string;
  href: string;
  followUps: string[];
};

export type AssistantAnswer = {
  text: string;
  sources: { label: string; href: string }[];
  followUps: string[];
};

// Histórico de conversa (contexto multi-turn)
export type ChatTurn = { role: "user" | "assistant"; text: string };

// ------------------------------------------------------------
// Normalização e tokenização (PT-BR)
// ------------------------------------------------------------

const STOPWORDS = new Set([
  "a", "o", "e", "ou", "de", "da", "do", "das", "dos", "para", "pra", "pro",
  "por", "com", "sem", "em", "no", "na", "nos", "nas", "num", "numa", "um",
  "uma", "uns", "umas", "que", "qual", "quais", "quanto", "quantos", "quanta",
  "quando", "onde", "quem", "cujo", "se", "sim", "nao", "mais", "menos",
  "meu", "minha", "meus", "minhas", "seu", "sua", "isso", "isto", "esse",
  "este", "essa", "esta", "ele", "ela", "eles", "elas", "eu", "nos",
  "ao", "aos", "os", "sao", "ser", "estar", "estao", "tem", "foi",
  "sera", "pode", "podem", "muito", "muita", "pouco", "ja", "ainda",
  "tambem", "entao", "assim", "porque", "pois", "como", "the", "of",
  "to", "is", "are", "and", "in",
]);

// Sinônimos expandem a consulta pra vocabulário do guia
const SYNONYMS: Record<string, string[]> = {
  preco: ["custo", "valor", "cpc", "cpm", "investimento"],
  custo: ["preco", "valor", "cpc"],
  custa: ["custo", "preco", "valor", "cpc"],
  custos: ["custo", "preco", "cpc"],
  valor: ["preco", "custo"],
  investir: ["investimento", "orcamento", "custo"],
  investimento: ["orcamento", "custo"],
  caro: ["custo", "preco", "cpc"],
  barato: ["custo", "preco", "cpc"],
  orcamento: ["investimento", "custo"],
  ia: ["inteligencia", "artificial"],
  anuncio: ["anuncios", "publicidade", "ads"],
  anuncios: ["anuncio", "publicidade", "ads"],
  anunciar: ["anuncios", "ads", "campanha", "publicidade"],
  publicidade: ["anuncio", "anuncios", "ads"],
  gpt: ["chatgpt"],
  medir: ["medicao", "rastrear", "rastreamento", "conversao", "pixel"],
  rastrear: ["medicao", "pixel", "capi", "rastreamento"],
  rastreamento: ["medicao", "pixel", "capi"],
  medicao: ["pixel", "capi", "conversao"],
  api: ["advertiser", "bulk", "capi", "conversions"],
  apis: ["api", "advertiser", "bulk", "capi"],
  lancamento: ["lancou", "lancado", "historia", "cronograma", "evolucao"],
  lancou: ["lancamento", "historia", "cronograma"],
  lancado: ["lancamento", "historia"],
  historia: ["cronograma", "lancamento", "evolucao", "linha"],
  evoluiu: ["historia", "cronograma", "evolucao"],
  cronograma: ["historia", "linha", "tempo"],
  melhor: ["comparativo", "vantagem"],
  pior: ["comparativo", "desvantagem"],
  vs: ["comparativo", "versus"],
  versus: ["comparativo", "vs"],
  comparar: ["comparativo", "vs"],
  comecar: ["passo", "comeco", "primeira", "conta", "criar"],
  iniciar: ["passo", "comeco", "conta", "criar"],
  conta: ["cadastro", "criar", "ads", "manager"],
  cadastro: ["conta", "criar", "ads", "manager"],
  erro: ["erros", "evitar", "errado"],
  erros: ["erro", "evitar", "errado"],
  evitar: ["erros", "errado"],
  falhar: ["erros", "errar"],
  dica: ["dicas", "estrategias", "otimizar"],
  dicas: ["estrategias", "otimizar"],
  otimizar: ["otimizacao", "ocpc", "estrategias", "dicas"],
  otimizacao: ["ocpc", "otimizar"],
  escala: ["escalar", "crescer", "bulk"],
  escalar: ["escala", "crescer", "bulk"],
  catalogo: ["product", "feeds", "feed"],
  produto: ["product", "feeds", "catalogo"],
  ecommerce: ["e-commerce", "loja", "catalogo", "feeds"],
  saas: ["software", "trial"],
  negocio: ["negocios", "empresa", "pme", "pequeno"],
  pequeno: ["pme", "negocio", "pequenos"],
  pequena: ["pme", "negocio", "pequenos"],
  formato: ["formatos"],
  formatos: ["formato"],
  leilao: ["lances", "bid", "concorrencia"],
  lances: ["leilao", "bid"],
  publico: ["audiencia", "quem"],
  audiencia: ["publico", "usuarios"],
  termos: ["glossario", "significado"],
  significado: ["glossario", "termos", "significa"],
  significa: ["significado", "glossario", "termos"],
  sigla: ["glossario", "termos"],
  comparativo: ["vs", "versus", "comparar"],
  google: ["ads", "busca"],
  meta: ["facebook", "instagram", "ads"],
  facebook: ["meta"],
  instagram: ["meta"],
  linkedin: ["b2b"],
};

function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function tokenize(s: string): string[] {
  return normalize(s)
    .split(/[^a-z0-9]+/)
    .filter((t) => t.length > 1 && !STOPWORDS.has(t));
}

function expand(tokens: string[]): string[] {
  const out = new Set(tokens);
  for (const t of tokens) {
    for (const syn of SYNONYMS[t] || []) out.add(syn);
  }
  return [...out];
}

// ------------------------------------------------------------
// Base de conhecimento — construída do conteúdo real do guia
// ------------------------------------------------------------

const FOLLOWUP_POOL = [
  "Quanto custa anunciar no ChatGPT?",
  "Como medir resultados?",
  "ChatGPT Ads vs Google Ads?",
  "O que é oCPC?",
  "Está disponível no Brasil?",
  "Quem pode anunciar no ChatGPT?",
  "Quais erros devo evitar?",
  "Como funciona o leilão de anúncios?",
];

function pick(...indices: number[]): string[] {
  return indices.map((i) => FOLLOWUP_POOL[i % FOLLOWUP_POOL.length]);
}

const KB: KbEntry[] = [
  // FAQ — 16 perguntas completas
  ...faqs.map((f, i) => ({
    id: `faq-${i}`,
    title: f.q,
    text: f.a,
    keywords: tokenize(f.q),
    section: "FAQ",
    href: "#faq",
    followUps: pick(i, i + 3, i + 5),
  })),

  // Glossário — 20 termos
  ...glossary.map((g, i) => ({
    id: `gloss-${i}`,
    title: `${g.term} — o que significa`,
    text: `${g.term}: ${g.desc}`,
    keywords: [...tokenize(g.term), "significado", "significa", "termo", "glossario", "sigla"],
    section: "Glossário",
    href: "#glossario",
    followUps: pick(i, i + 2, i + 4),
  })),

  // API e ferramentas — 6 cards
  ...apiTools.map((t, i) => ({
    id: `api-${i}`,
    title: t.title,
    text: `${t.desc} ${t.detail}`,
    keywords: [...tokenize(t.title), ...tokenize(t.desc), "api", "ferramenta", "developer"],
    section: "API e Ferramentas",
    href: "#api",
    followUps: pick(i + 1, i + 4, i + 6),
  })),

  // Estratégias — 6 táticas
  ...strategies.map((s, i) => ({
    id: `strat-${i}`,
    title: `Estratégia: ${s.title}`,
    text: s.desc,
    keywords: [...tokenize(s.title), ...tokenize(s.desc), "estrategia", "dica", "otimizar"],
    section: "Estratégias Práticas",
    href: "#estrategias",
    followUps: pick(i + 2, i + 5, i + 7),
  })),

  // Erros comuns — 6 armadilhas
  ...mistakes.map((m, i) => ({
    id: `err-${i}`,
    title: `Erro comum: ${m.title}`,
    text: m.desc,
    keywords: [...tokenize(m.title), ...tokenize(m.desc), "erro", "evitar", "armadilha"],
    section: "Erros comuns",
    href: "#erros",
    followUps: pick(i, i + 3, i + 6),
  })),

  // Cronograma — 5 marcos
  ...timeline.map((t, i) => ({
    id: `tl-${i}`,
    title: `${t.date} — ${t.title}`,
    text: t.desc,
    keywords: [...tokenize(t.title), ...tokenize(t.desc), "historia", "cronograma", "lancamento", "evolucao", "linha", "tempo"],
    section: "Cronograma",
    href: "#cronograma",
    followUps: pick(i + 4, i + 6, i + 1),
  })),

  // Benchmarks — tabela de custos
  {
    id: "bench",
    title: "Benchmarks: quanto custa anunciar no ChatGPT",
    text: `Faixas estimadas de mercado em reais (use como régua, não como promessa):\n\n• CPC médio: ChatGPT Ads R$ 0,80–2,50 · Google Ads R$ 2–8 · Meta Ads R$ 1–4 · LinkedIn Ads R$ 15–40\n• CTR médio: ChatGPT Ads 3–6% · Google 2–5% · Meta 0,9–1,5% · LinkedIn 0,4–0,6%\n• CPM médio: ChatGPT Ads R$ 8–20 · Google R$ 20–60 · Meta R$ 10–30 · LinkedIn R$ 80–200\n• Concorrência nos leilões: baixa no ChatGPT, altíssima no Google\n\nOs valores variam por nicho, segmentação, qualidade do criativo e momento da plataforma — confira os reais da sua conta no Ads Manager.`,
    keywords: [
      "custo", "custa", "preco", "valor", "cpc", "ctr", "cpm", "benchmarks",
      "caro", "barato", "investimento", "orcamento", "custo", "comparacao",
      "precos", "plataformas", "estimativa", "numeros",
    ],
    section: "Benchmarks",
    href: "#benchmarks",
    followUps: ["O que é CPC?", "Como otimizar campanhas?", "ChatGPT Ads vs LinkedIn Ads?"],
  },

  // Medição — eventos pixel/CAPI
  {
    id: "events",
    title: "Eventos de conversão: Pixel e CAPI",
    text: `A medição usa dois métodos complementares: o Measurement Pixel (navegador) e a Conversions API/CAPI (servidor). Eventos suportados:\n\n• page_view (Pixel) — visualização de página\n• click (Pixel) — clique no anúncio\n• view_content (ambos) — visualização de conteúdo/produto\n• add_to_cart (ambos) — adição ao carrinho\n• purchase (CAPI) — compra concluída\n• sign_up (CAPI) — cadastro realizado\n• custom_event (ambos) — evento customizado definido pelo anunciante\n\nO ideal é enviar conversões pelos dois métodos, com a CAPI como fonte principal de verdade — assim o oCPC otimiza com dados completos.`,
    keywords: [
      "eventos", "pixel", "capi", "medicao", "rastrear", "rastreamento",
      "conversao", "purchase", "sign_up", "page_view", "add_to_cart",
      "view_content", "custom_event", "medir",
    ],
    section: "Medição e Conversões",
    href: "#medicao",
    followUps: ["O que é a CAPI?", "Como medir resultados?", "O que é o Measurement Pixel?"],
  },

  // Comparativos — 3 plataformas
  ...comparisonTabs.map((tab, i) => ({
    id: `cmp-${i}`,
    title: `ChatGPT Ads vs ${tab.label}`,
    text: tab.rows
      .map(
        (r) =>
          `${r.advantage ? "✓ vantagem do ChatGPT Ads" : "✗ vantagem do " + tab.label} — ${r.feature}: ${r.note}`
      )
      .join("\n"),
    keywords: [...tokenize(tab.label), "comparativo", "vs", "versus", "melhor", "diferenca", "comparar", "vantagem"],
    section: "Comparativo",
    href: "#comparativo",
    followUps: pick(i + 2, i + 5, i + 7),
  })),

  // Públicos — 4 audiências
  ...audienceTabs.map((tab, i) => ({
    id: `aud-${i}`,
    title: `ChatGPT Ads para ${tab.label}`,
    text: tab.cards.map((c) => `• ${c.title}: ${c.desc}`).join("\n"),
    keywords: [...tokenize(tab.label), "publico", "audiencia", "casos", "uso", "segmento"],
    section: "Para quem é",
    href: "#para-quem",
    followUps: pick(i + 1, i + 4, i + 6),
  })),

  // Passo a passo — 5 passos
  {
    id: "steps",
    title: "Como anunciar no ChatGPT: o passo a passo",
    text: `Cinco passos, do zero à escala:\n\n1. Crie sua conta em ads.openai.com e cadastre o negócio — processo simples e rápido.\n2. Configure a campanha: objetivo, público, orçamento e criativo pelo Ads Manager ou pela API.\n3. Integre a medição: instale o Measurement Pixel e/ou a Conversions API pra rastrear conversões reais.\n4. Otimize com dados: o oCPC aprende com seus dados e otimiza a entrega automaticamente.\n5. Escale os resultados: ajuste bids, teste criativos, use Product Feeds e Bulk API pra crescer.`,
    keywords: [
      "anunciar", "passo", "passos", "comecar", "iniciar", "primeira",
      "campanha", "criar", "conta", "cadastro", "funciona", "tutorial", "zero",
    ],
    section: "Como funciona",
    href: "#como-funciona",
    followUps: ["Quanto custa anunciar no ChatGPT?", "O que é oCPC?", "Quais erros devo evitar?"],
  },

  // Checklist — 10 itens
  {
    id: "checklist",
    title: "Checklist de lançamento (10 itens)",
    text: `Antes de subir a primeira campanha, confira:\n\n${checklistItems.map((c, i) => `${i + 1}. ${c.title} — ${c.desc}`).join("\n")}`,
    keywords: [
      "checklist", "lancamento", "lista", "pronto", "preparar",
      "antes", "subir", "planejamento", "itens",
    ],
    section: "Checklist",
    href: "#checklist",
    followUps: ["Como anunciar no ChatGPT: o passo a passo?", "O que é a CAPI?", "Quais erros devo evitar?"],
  },

  // Visão geral do guia
  {
    id: "overview",
    title: "O que é este guia",
    text: `Este é um guia completo e gratuito, em português, sobre ChatGPT Ads — a plataforma de publicidade nativa da OpenAI dentro do ChatGPT. O guia cobre: o que são ChatGPT Ads, por que anunciar, cronograma da evolução, para quem é, passo a passo, comparativos com Google/Meta/LinkedIn, benchmarks de custo, API e ferramentas (Advertiser API, CAPI, Pixel, Product Feeds, Bulk API, oCPC), medição e conversões, estratégias práticas, erros comuns, um checklist interativo de lançamento, glossário com 20 termos e um FAQ com 16 perguntas.\n\nSou a Raposa IA, a assistente deste guia — respondo APENAS com o conteúdo da página, então pode confiar: nada aqui é inventado.`,
    keywords: [
      "guia", "site", "pagina", "conteudo", "sobre", "resumo",
      "visao", "geral", "materia", "material", "topicos", "ajudar", "ajuda",
    ],
    section: "Início",
    href: "#o-que-sao",
    followUps: ["O que são ChatGPT Ads?", "Quanto custa anunciar no ChatGPT?", "Como medir resultados?"],
  },

  // Meta — quem é a Raposa
  {
    id: "meta-raposa",
    title: "Quem é você",
    text: `Sou a Raposa IA 🦊 — a assistente deste guia da volponi.tech. Funciono com um motor de busca semântica local: indexei todo o conteúdo da página (FAQ, glossário, benchmarks, API, estratégias...) e respondo somente com esse material real. Se você perguntar algo que não está no guia, eu aviso em vez de inventar.`,
    keywords: [
      "voce", "voces", "quem", "raposa", "assistente", "robo", "bot",
      "motor", "chatbot", "nome", "ajudar", "ajuda", "perguntar", "perguntas",
    ],
    section: "Início",
    href: "#o-que-sao",
    followUps: ["O que é este guia?", "O que são ChatGPT Ads?", "Quem escreveu o guia?"],
  },

  // Autora
  {
    id: "autora",
    title: "Quem escreveu o guia",
    text: `O guia foi escrito por Lorenza Volponi — AI Strategist · Builder · Educator. Ela estuda e aplica inteligência artificial em negócios reais e publica guias práticos como este em português claro, direto e sem enrolação na volponi.tech — inteligência artificial aplicada, estratégia e educação em IA.`,
    keywords: [
      "autora", "lorenza", "volponi", "escreveu", "criou",
      "fez", "marca", "background",
    ],
    section: "Sobre a Autora",
    href: "#sobre",
    followUps: ["O que é este guia?", "O que são ChatGPT Ads?", "Onde aprender mais?"],
  },
];

// ------------------------------------------------------------
// Busca e composição de respostas
// ------------------------------------------------------------

function scoreEntry(queryTokens: string[], normQuery: string, entry: KbEntry): { score: number; matched: number } {
  const titleTokens = new Set(tokenize(entry.title));
  const kwTokens = new Set(entry.keywords.flatMap((k) => tokenize(k)));
  const textTokens = tokenize(entry.text);
  const textCount = new Map<string, number>();
  for (const t of textTokens) textCount.set(t, (textCount.get(t) || 0) + 1);

  let score = 0;
  let matched = 0;
  for (const qt of queryTokens) {
    const inKw = kwTokens.has(qt);
    const inTitle = titleTokens.has(qt);
    const c = textCount.get(qt) || 0;
    if (inKw || inTitle || c > 0) matched++;
    if (inKw) score += 4;
    if (inTitle) score += 3;
    if (c > 0) score += Math.min(c, 3);
  }

  // Bônus de frase exata
  const normText = normalize(entry.text);
  const normTitle = normalize(entry.title);
  if (normQuery.length >= 8) {
    if (normText.includes(normQuery)) score += 5;
    if (normTitle.includes(normQuery)) score += 3;
  }
  return { score, matched };
}

const GREETING_RE = /^(oi+|ola|e a[ei]|eae|hey|hello|bom dia|boa tarde|boa noite|tudo bem|salve|opa)\b/;
const THANKS_RE = /(obrigad[oa]|valeu|show|perfeito|top\b|massa|legal\b|adorei|gostei)/;

// ------------------------------------------------------------
// Segurança — sanitização e bloqueio de prompt injection
// ------------------------------------------------------------

/** Limpa a entrada: remove tags, chars de controle e limita o tamanho. */
function sanitizeQuery(raw: string): string {
  return raw
    .replace(/[<>]/g, "") // remove < > (anti tag/script)
    .replace(/[\u0000-\u001F\u007F]/g, " ") // chars de controle
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 300);
}

/** Padrões clássicos de prompt injection / jailbreak / XSS. */
const INJECTION_PATTERNS: RegExp[] = [
  /ignore\s+(as\s+)?(all\s+|previous|above|prior|todas\s+)?\s*(instru|instructions?|prompt|regras)/i,
  /instru[\u00e7\u00f5][a\u00f5]?es?\s+anteriores/i,
  /(system\s+prompt|prompt\s+(do\s+)?sistema|seu\s+prompt|your\s+prompt|reveal\s+your\s+prompt)/i,
  /desconsidere\s+(tudo|o\s+que|as)/i,
  /esque[\u00e7\u00e7]a\s+(tudo|as\s+instru)/i,
  /(revele|revelar|mostrar?|mostra)\s+(suas?\s+)?(instru|regras|prompt|configura|interno)/i,
  /(you\s+are\s+now|act\s+as|pretend\s+(to|that)|finja\s+(que|ser)|aja\s+como)/i,
  /(jailbreak|dan\s+mode|developer\s+mode)/i,
  /(repita\s+depois\s+de\s+mim|repeat\s+after\s+me)/i,
  /<\s*script|javascript\s*:|on(?:error|load|click)\s*=|data\s*:text\/html/i,
  /(prompt\s+injection|inje[\u00e7\u00e3]o\s+de\s+prompt)/i,
  /(nova\s+(persona|personalidade)|mude\s+seu\s+papel|switch\s+(roles|persona))/i,
  /(conte[\u00fados]?\s+do?s?\s+seu?s?\s+(c[\u00f3]digo|fonte|c[\u00f3]digo-fonte)|source\s+code|seus\s+segredos)/i,
];

function isInjectionAttempt(q: string): boolean {
  return INJECTION_PATTERNS.some((re) => re.test(q));
}

/** Resposta ao bloqueio — firme, com personalidade e redirecionando pro guia. */
function injectionRefusal(): AssistantAnswer {
  const refusals = [
    "Boa tentativa! 🦊 Mas aqui não rola: eu não tenho instruções secretas nem troco de papel — sou só a leitora oficial do conteúdo deste guia.\n\nQuer aprender de verdade sobre ChatGPT Ads? Pode perguntar à vontade!",
    "Haha, espertinho! 🦊 Injeção de prompt não funciona comigo: meu único cérebro é o texto desta página.\n\nBora voltar pro que importa — me pergunta qualquer coisa do guia!",
    "Isso aí parece tentativa de hackear a raposa. 🦊 Sem chance: eu respondo APENAS com o conteúdo do guia — nada de instruções externas.\n\nManda uma pergunta real sobre ChatGPT Ads que eu te ajudo!",
  ];
  const text = refusals[Math.floor(Math.random() * refusals.length)];
  return {
    text,
    sources: [],
    followUps: [
      "O que são ChatGPT Ads?",
      "Quanto custa anunciar no ChatGPT?",
      "O que é a CAPI?",
    ],
  };
}

// ------------------------------------------------------------
// Humanização — aberturas e variações naturais
// ------------------------------------------------------------

const OPENERS = [
  "Boa pergunta!",
  "Anota aí:",
  "Resumindo:",
  "Direto ao ponto:",
  "Ótimo, deixa eu te contar:",
  "Essa é clássica —",
];

const FALLBACKS = [
  "Hmm, isso não está no material deste guia. 🦊\n\nEu respondo apenas com o conteúdo da página — ChatGPT Ads, GPT Ads, ads IA, custos, API, medição, comparativos e estratégias — pra não te passar nenhuma informação inventada.\n\nTenta reformular ou escolhe uma dessas:",
  "Essa eu não sei — e prefiro admitir a inventar. 🦊\n\nMeu universo é o conteúdo desta página: ChatGPT Ads, custos, API, medição, comparativos, estratégias...\n\nQue tal uma dessas perguntas?",
  "Não encontrei isso no guia. 🦊\n\nComo eu só respondo com o material real da página, não vou chutar — mas olha essas que eu domino:",
];

/** Detecta perguntas de continuação ("e isso?", "por quê?", "explica melhor") */
const FOLLOWUP_RE = /^(e|mas|ou|então|também|tb)\b/i;
const FOLLOWUP_WORDS =
  /\b(isso|esse|essa|este|esta|ele|ela|aí|nesse|nessa|desse|dessa|por que|pq|porque|como assim|melhora|melhore|explica|explicar|detalha|detalhar|exemplo|ainda|sobre isso|mais)\b/i;

/** Palavras que, sozinhas, indicam continuação sem conteúdo novo. */
const PURE_FOLLOWUP = new Set([
  "e", "mas", "ou", "entao", "tambem", "tb", "isso", "esse", "essa",
  "este", "esta", "ele", "ela", "ai", "nesse", "nessa", "desse", "dessa",
  "porque", "pq", "como", "assim", "melhora", "melhore", "melhor",
  "explica", "explicar", "detalha", "detalhar", "ainda", "mais", "sobre",
  "exemplo",
]);

function isFollowup(q: string): boolean {
  return FOLLOWUP_RE.test(q) || FOLLOWUP_WORDS.test(q);
}

export function askAssistant(query: string, history?: ChatTurn[]): AssistantAnswer {
  const sanitized = sanitizeQuery(query);
  if (!sanitized) {
    return fallback();
  }
  const trimmed = sanitized;
  const norm = normalize(trimmed);

  // 🔒 Bloqueio de prompt injection — antes de qualquer processamento
  if (isInjectionAttempt(sanitized)) {
    return injectionRefusal();
  }

  // Saudações
  if (GREETING_RE.test(norm)) {
    return {
      text: `Oi! Eu sou a Raposa IA 🦊 — a assistente deste guia sobre ChatGPT Ads.\n\nEu li todo o conteúdo da página e respondo só com ele: o que são ChatGPT Ads, quanto custa, como anunciar, API, medição, comparativos com Google/Meta/LinkedIn, benchmarks, estratégias, erros a evitar e mais.\n\nPode perguntar!`,
      sources: [],
      followUps: [
        "O que são ChatGPT Ads?",
        "Quanto custa anunciar no ChatGPT?",
        "Como anunciar no ChatGPT: o passo a passo?",
        "ChatGPT Ads vs Google Ads?",
      ],
    };
  }

  // Agradecimentos
  if (THANKS_RE.test(norm) && tokenize(trimmed).length <= 3) {
    return {
      text: `Por nada! 🦊 Se surgir outra dúvida sobre ChatGPT Ads, é só chamar — eu só saio daqui do guia.`,
      sources: [],
      followUps: ["O que é oCPC?", "Quais erros devo evitar?", "Está disponível no Brasil?"],
    };
  }

  // Busca — com contexto multi-turn: perguntas de continuação resolvem
  // pronomes fundindo com a última pergunta do usuário.
  const rawTokens = tokenize(trimmed);
  let effQuery = trimmed;

  if (history && history.length > 0 && isFollowup(trimmed)) {
    const lastUser = [...history].reverse().find((h) => h.role === "user");
    if (lastUser) {
      // Tem conteúdo novo além dos marcadores? Funde. Senão, re-responde o tema anterior.
      const hasNewContent = rawTokens.some((t) => !PURE_FOLLOWUP.has(t));
      effQuery = hasNewContent ? `${lastUser.text} ${trimmed}` : lastUser.text;
    }
  }

  const effTokens = tokenize(effQuery);
  const effNorm = normalize(effQuery);

  const queryTokens = expand(effTokens);
  if (queryTokens.length === 0) {
    return fallback();
  }

  const scored = KB.map((e) => ({ entry: e, ...scoreEntry(queryTokens, effNorm, e) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = scored[0];
  // Guarda anti-delírio: score mínimo E cobertura da pergunta
  // (ou frase exata forte). Pergunta de 1 token precisa de 1 match.
  const covers =
    best &&
    (best.matched >= 2 || (effTokens.length === 1 && best.matched >= 1)) &&
    (best.score >= 3 || best.score >= 10);

  if (!best || scored.length === 0 || !covers) {
    return fallback();
  }
  const sources = [{ label: best.entry.section, href: best.entry.href }];
  let text = best.entry.text;

  // Segunda entrada relevante (se próxima do primeiro)
  if (scored.length > 1 && scored[1].score >= best.score * 0.55) {
    const second = scored[1].entry;
    text += `\n\nTambém pode interessar — ${second.title}: ${second.text.split("\n")[0]}`;
    sources.push({ label: second.section, href: second.href });
  }

  // Humanização: abertura natural ocasional (respostas longas)
  if (text.length > 140 && Math.random() < 0.4) {
    const opener = OPENERS[Math.floor(Math.random() * OPENERS.length)];
    text = `${opener}\n\n${text}`;
  }

  return { text, sources, followUps: best.entry.followUps };
}

function fallback(): AssistantAnswer {
  const text = FALLBACKS[Math.floor(Math.random() * FALLBACKS.length)];
  return {
    text,
    sources: [],
    followUps: [
      "O que são ChatGPT Ads?",
      "Quanto custa anunciar no ChatGPT?",
      "Como medir resultados?",
      "ChatGPT Ads vs Google Ads?",
    ],
  };
}

export const STARTER_QUESTIONS = [
  "O que são ChatGPT Ads?",
  "Quanto custa anunciar no ChatGPT?",
  "Como anunciar no ChatGPT: o passo a passo?",
  "ChatGPT Ads vs Google Ads?",
  "O que é a CAPI?",
  "Quais erros devo evitar?",
];
