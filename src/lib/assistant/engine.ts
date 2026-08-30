import { AUDITED_KNOWLEDGE } from "@/lib/assistant/knowledge";
import { evidenceLedger, metricFormulas, productFacts } from "@/lib/authority-data";
import { strategies } from "@/lib/content";
import { editorialFaqs, editorialTimeline } from "@/lib/editorial-content";
import { semanticSearch, semanticTopics } from "@/lib/semantic-discovery";

export type ChatTurn = { role: "user" | "assistant"; text: string };

export type AssistantAnswer = {
  text: string;
  sources: { label: string; href: string }[];
  followUps: string[];
};

type Entry = {
  title: string;
  text: string;
  href: string;
  section: string;
  keywords: string[];
};

const STOPWORDS = new Set([
  "a", "o", "e", "de", "da", "do", "das", "dos", "em", "no", "na", "nos", "nas",
  "um", "uma", "uns", "umas", "para", "pra", "por", "com", "sem", "que", "qual",
  "como", "quando", "onde", "quem", "se", "isso", "essa", "esse", "este", "esta", "eu",
  "voce", "vocês", "me", "meu", "minha", "the", "of", "to", "is", "are", "and", "in",
]);

const normalize = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const tokenize = (value: string) =>
  normalize(value)
    .split(/\s+/)
    .filter((token) => token.length > 1 && !STOPWORDS.has(token));

const semanticTokenize = (value: string) => {
  const base = new Set(tokenize(value));
  const normalizedQuery = normalize(value);

  for (const [topicId, topic] of Object.entries(semanticTopics)) {
    const candidates = [topicId, topic.label, ...topic.aliases];
    const matched = candidates.some((candidate) => {
      const normalizedCandidate = normalize(candidate);
      const candidateTokens = tokenize(candidate);
      return normalizedQuery.includes(normalizedCandidate) || candidateTokens.some((token) => base.has(token));
    });
    if (!matched) continue;
    for (const candidate of candidates) for (const token of tokenize(candidate)) base.add(token);
  }

  return [...base];
};

const sanitize = (value: string) =>
  value
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 240);

const entries: Entry[] = [
  ...AUDITED_KNOWLEDGE.map((item) => ({
    title: item.title,
    text: item.text,
    href: item.href,
    section: item.section,
    keywords: semanticTokenize(`${item.title} ${item.text} ${item.tags}`),
  })),
  ...editorialFaqs.map((item) => ({
    title: item.q,
    text: item.a,
    href: "#faq",
    section: "FAQ",
    keywords: semanticTokenize(`${item.q} ${item.a}`),
  })),
  ...editorialTimeline.map((item) => ({
    title: `${item.date} — ${item.title}`,
    text: item.desc,
    href: "#cronograma",
    section: "Linha do tempo",
    keywords: semanticTokenize(`${item.date} ${item.title} ${item.desc}`),
  })),
  ...productFacts.map((item) => ({
    title: item.title,
    text: item.text,
    href: "#produto-real",
    section: "Produto real",
    keywords: semanticTokenize(`${item.eyebrow} ${item.title} ${item.text}`),
  })),
  ...metricFormulas.map((item) => ({
    title: `${item.metric} — ${item.formula}`,
    text: `${item.reads} ${item.warning}`,
    href: "#metricas",
    section: "Métricas",
    keywords: semanticTokenize(`${item.metric} ${item.formula} ${item.reads} ${item.warning}`),
  })),
  ...evidenceLedger.map((item) => ({
    title: item.title,
    text: item.text,
    href: "#evidencia",
    section: "Evidência",
    keywords: semanticTokenize(`${item.status} ${item.title} ${item.text}`),
  })),
  ...strategies.map((item) => ({
    title: item.title,
    text: item.desc,
    href: "#estrategias",
    section: "Estratégia",
    keywords: semanticTokenize(`${item.title} ${item.desc}`),
  })),
];

const STARTERS = [
  "Está disponível no Brasil?",
  "Quanto custa anunciar?",
  "Como funciona o leilão?",
  "Quais métricas o Ads Manager mostra?",
  "900 milhões é alcance de anúncios?",
  "Anunciantes podem ler minhas conversas?",
];

export const STARTER_QUESTIONS = STARTERS;

const greeting = (): AssistantAnswer => ({
  text:
    "Oi! Eu sou a Raposa IA 🦊. Respondo somente com o conteúdo auditado deste observatório independente sobre ChatGPT Ads em 2026. Se a evidência não sustentar uma afirmação, eu prefiro dizer que não sei em vez de inventar.",
  sources: [],
  followUps: STARTERS.slice(0, 4),
});

const fallback = (): AssistantAnswer => ({
  text:
    "Não encontrei uma resposta suficientemente sustentada no conteúdo auditado deste observatório. 🦊 Como o produto muda rápido, não vou completar a lacuna com rumor. Para uma decisão operacional, confirme na documentação oficial vigente.",
  sources: [],
  followUps: STARTERS.slice(0, 4),
});

const semanticNavigation = (query: string): AssistantAnswer | null => {
  const matches = semanticSearch(query, { language: "pt-BR", limit: 3 });
  if (!matches.length) return null;
  return {
    text: "Não encontrei uma resposta factual suficientemente forte para afirmar algo novo, mas encontrei conteúdos semanticamente relacionados no observatório. Posso te levar direto para a evidência mais próxima sem inventar uma resposta.",
    sources: matches.map((match) => ({ label: match.title, href: match.path })),
    followUps: STARTERS.slice(0, 3),
  };
};

const score = (queryTokens: string[], entry: Entry) => {
  const haystack = new Set([...entry.keywords, ...semanticTokenize(entry.title), ...semanticTokenize(entry.text)]);
  let total = 0;
  for (const token of queryTokens) {
    if (haystack.has(token)) total += entry.keywords.includes(token) ? 3 : 1;
  }
  return total;
};

export function askAssistant(query: string, history: ChatTurn[] = []): AssistantAnswer {
  const clean = sanitize(query);
  if (!clean) return fallback();

  const normalized = normalize(clean);
  if (/^(oi|ola|olá|opa|hey|hello|bom dia|boa tarde|boa noite)\b/.test(normalized)) {
    return greeting();
  }

  if (/^(obrigad|valeu|perfeito|show|top)\b/.test(normalized)) {
    return {
      text: "Por nada! 🦊 Se quiser, eu continuo pela base auditada do observatório.",
      sources: [],
      followUps: STARTERS.slice(1, 5),
    };
  }

  let effectiveQuery = clean;
  if (/^(e|mas|isso|essa|esse|como assim|por que|porque|explica|mais)\b/i.test(clean) && history.length) {
    const lastUser = [...history].reverse().find((turn) => turn.role === "user");
    if (lastUser) effectiveQuery = `${lastUser.text} ${clean}`;
  }

  const queryTokens = semanticTokenize(effectiveQuery);
  if (!queryTokens.length) return fallback();

  const ranked = entries
    .map((entry) => ({ entry, score: score(queryTokens, entry) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  if (!best || best.score < (queryTokens.length === 1 ? 1 : 2)) return semanticNavigation(effectiveQuery) ?? fallback();

  const second = ranked[1];
  const sources = [{ label: best.entry.section, href: best.entry.href }];
  let text = best.entry.text;

  if (second && second.score >= best.score * 0.75 && second.entry.href !== best.entry.href) {
    text += `\n\nTambém vale consultar ${second.entry.section.toLowerCase()}: ${second.entry.text.split("\n")[0]}`;
    sources.push({ label: second.entry.section, href: second.entry.href });
  }

  const related = semanticSearch(effectiveQuery, { language: "pt-BR", limit: 2 });
  for (const match of related) {
    if (!sources.some((source) => source.href === match.path)) sources.push({ label: match.title, href: match.path });
  }

  return {
    text,
    sources: sources.slice(0, 4),
    followUps: STARTERS.filter((item) => normalize(item) !== normalize(clean)).slice(0, 3),
  };
}
