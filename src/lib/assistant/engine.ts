import {
  apiTools,
  audienceTabs,
  benchmarks,
  checklistItems,
  comparisonTabs,
  faqs,
  glossary,
  mistakes,
  strategies,
  timeline,
} from "@/lib/content";

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

const sanitize = (value: string) =>
  value
    .replace(/[<>]/g, "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 240);

const entries: Entry[] = [
  ...faqs.map((item) => ({
    title: item.q,
    text: item.a,
    href: "#faq",
    section: "FAQ",
    keywords: tokenize(`${item.q} ${item.a}`),
  })),
  ...glossary.map((item) => ({
    title: item.term,
    text: `${item.term}: ${item.desc}`,
    href: "#glossario",
    section: "Glossário",
    keywords: tokenize(`${item.term} ${item.desc}`),
  })),
  ...timeline.map((item) => ({
    title: `${item.date} — ${item.title}`,
    text: item.desc,
    href: "#cronograma",
    section: "Estado em 2026",
    keywords: tokenize(`${item.date} ${item.title} ${item.desc}`),
  })),
  ...apiTools.map((item) => ({
    title: item.title,
    text: `${item.desc} ${item.detail}`,
    href: "#api",
    section: "Recursos",
    keywords: tokenize(`${item.title} ${item.desc} ${item.detail}`),
  })),
  ...strategies.map((item) => ({
    title: item.title,
    text: item.desc,
    href: "#estrategias",
    section: "Estratégias",
    keywords: tokenize(`${item.title} ${item.desc}`),
  })),
  ...mistakes.map((item) => ({
    title: item.title,
    text: item.desc,
    href: "#erros",
    section: "Erros comuns",
    keywords: tokenize(`${item.title} ${item.desc}`),
  })),
  ...comparisonTabs.map((tab) => ({
    title: `ChatGPT Ads vs ${tab.label}`,
    text: tab.rows.map((row) => `${row.feature}: ${row.note}`).join("\n"),
    href: "#comparativo",
    section: "Comparativo",
    keywords: tokenize(`${tab.label} ${tab.rows.map((row) => `${row.feature} ${row.note}`).join(" ")}`),
  })),
  ...audienceTabs.map((tab) => ({
    title: `ChatGPT Ads para ${tab.label}`,
    text: tab.cards.map((card) => `${card.title}: ${card.desc}`).join("\n"),
    href: "#para-quem",
    section: "Para quem",
    keywords: tokenize(`${tab.label} ${tab.cards.map((card) => `${card.title} ${card.desc}`).join(" ")}`),
  })),
  {
    title: "Benchmarks e custos",
    text: benchmarks.map((row) => `${row.metric}: ${row.chatgpt}`).join("\n"),
    href: "#benchmarks",
    section: "Dados e custos",
    keywords: tokenize("benchmark custo cpc ctr cpm preço valor barato caro dados custo por clique"),
  },
  {
    title: "Checklist antes de anunciar",
    text: checklistItems.map((item, index) => `${index + 1}. ${item.title}: ${item.desc}`).join("\n"),
    href: "#checklist",
    section: "Checklist",
    keywords: tokenize("checklist começar anunciar campanha lançamento preparar segurança privacidade medição"),
  },
];

const STARTERS = [
  "O que são ChatGPT Ads?",
  "Os anúncios influenciam as respostas?",
  "Anunciantes podem ler minhas conversas?",
  "Quanto custa anunciar no ChatGPT?",
  "Está disponível no Brasil?",
  "Como medir resultados?",
];

export const STARTER_QUESTIONS = STARTERS;

const greeting = (): AssistantAnswer => ({
  text:
    "Oi! Eu sou a Raposa IA 🦊. Respondo somente com a versão auditada deste guia sobre ChatGPT Ads 2026. Se o guia não sustentar uma afirmação, eu prefiro dizer que não sei em vez de inventar.",
  sources: [],
  followUps: STARTERS.slice(0, 4),
});

const fallback = (): AssistantAnswer => ({
  text:
    "Não encontrei uma resposta suficientemente sustentada no conteúdo auditado deste guia. 🦊 Como o produto muda rápido, não vou completar a lacuna com rumor. Para uma decisão operacional, confirme na superfície oficial da OpenAI.",
  sources: [],
  followUps: STARTERS.slice(0, 4),
});

const score = (queryTokens: string[], entry: Entry) => {
  const haystack = new Set([...entry.keywords, ...tokenize(entry.title), ...tokenize(entry.text)]);
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
      text: "Por nada! 🦊 Se quiser, eu continuo pela versão auditada do guia.",
      sources: [],
      followUps: STARTERS.slice(1, 5),
    };
  }

  let effectiveQuery = clean;
  if (/^(e|mas|isso|essa|esse|como assim|por que|porque|explica|mais)\b/i.test(clean) && history.length) {
    const lastUser = [...history].reverse().find((turn) => turn.role === "user");
    if (lastUser) effectiveQuery = `${lastUser.text} ${clean}`;
  }

  const queryTokens = tokenize(effectiveQuery);
  if (!queryTokens.length) return fallback();

  const ranked = entries
    .map((entry) => ({ entry, score: score(queryTokens, entry) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score);

  const best = ranked[0];
  if (!best || best.score < (queryTokens.length === 1 ? 1 : 2)) return fallback();

  const second = ranked[1];
  const sources = [{ label: best.entry.section, href: best.entry.href }];
  let text = best.entry.text;

  if (second && second.score >= best.score * 0.75 && second.entry.href !== best.entry.href) {
    text += `\n\nTambém vale consultar ${second.entry.section.toLowerCase()}: ${second.entry.text.split("\n")[0]}`;
    sources.push({ label: second.entry.section, href: second.entry.href });
  }

  return {
    text,
    sources,
    followUps: STARTERS.filter((item) => normalize(item) !== normalize(clean)).slice(0, 3),
  };
}
