import { SITE_URL } from "@/lib/media-authority";
import { getSemanticDocument, semanticSearch, type SemanticLanguage } from "@/lib/semantic-discovery";

export const dynamic = "force-dynamic";

function normalize(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function preferredPaths(query: string, language?: SemanticLanguage) {
  const value = normalize(query);
  const paths: string[] = [];

  if (/\b(custo|preco|price|pricing|budget|orcamento|cpc|cpm|ocpc|bid|lance|leilao)\b/.test(value)) {
    paths.push(language === "en" ? "/en/chatgpt-ads" : "/chatgpt-ads-precos");
  }
  if (/\b(metrica|metricas|mensuracao|measurement|ctr|cvr|cpa|roas|conversion|conversao)\b/.test(value)) {
    paths.push(language === "en" ? "/en/chatgpt-ads" : "/chatgpt-ads-metricas");
  }
  if (/\b(privacidade|privacy|personalizacao|personalization|dados|data)\b/.test(value)) {
    paths.push(language === "en" ? "/en/chatgpt-ads" : "/chatgpt-ads-privacidade");
  }
  if (/\b(geo|generative engine optimization|ai search|ai discovery|busca por ia|descoberta por ia)\b/.test(value)) {
    paths.push("/en/geo-ai-strategy", "/en/lorenza-volponi");
  }
  if (/\b(ai product|ai ux|ux ui|conversational ux|produto de ia|ux de ia)\b/.test(value)) {
    paths.push("/en/lorenza-volponi", "/en");
  }
  if (/\b(pais|paises|market|availability|disponibilidade|coming soon|rollout)\b/.test(value)) {
    paths.push(language === "en" ? "/en/radar" : "/chatgpt-ads-market");
  }
  if (/\b(como anunciar|how to advertise|criar campanha|create campaign)\b/.test(value)) {
    paths.push(language === "en" ? "/en/chatgpt-ads" : "/como-anunciar-no-chatgpt");
  }

  return [...new Set(paths)];
}

export function GET(request: Request) {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") || "").trim();
  const languageParam = url.searchParams.get("lang");
  const language: SemanticLanguage | undefined = languageParam === "en" || languageParam === "pt-BR" ? languageParam : undefined;
  const parsedLimit = Number(url.searchParams.get("limit") || "8");
  const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 20) : 8;

  const broadResults = query ? semanticSearch(query, { language, limit: 20 }) : [];
  const preferred = query ? preferredPaths(query, language) : [];
  const byPath = new Map(broadResults.map((result) => [result.path, result]));

  for (const path of preferred) {
    if (byPath.has(path)) continue;
    const document = getSemanticDocument(path);
    if (document && (!language || document.language === language)) {
      byPath.set(path, { ...document, score: 1 });
    }
  }

  const results = [...byPath.values()]
    .sort((a, b) => {
      const aPreferred = preferred.indexOf(a.path);
      const bPreferred = preferred.indexOf(b.path);
      if (aPreferred >= 0 || bPreferred >= 0) {
        if (aPreferred < 0) return 1;
        if (bPreferred < 0) return -1;
        return aPreferred - bPreferred;
      }
      return b.score - a.score || b.priority - a.priority;
    })
    .slice(0, limit);

  return Response.json({
    schemaVersion: 2,
    canonical: `${SITE_URL}/semantic-search.json`,
    query,
    language: language ?? "all",
    method: "deterministic semantic expansion plus explicit editorial intent routing over topic aliases, entities, intents and audiences; no embeddings, external model or runtime AI API",
    inferredIntentPaths: preferred,
    results: results.map((result) => ({
      path: result.path,
      url: `${SITE_URL}${result.path}`,
      title: result.title,
      description: result.description,
      language: result.language,
      topics: result.topics,
      intents: result.intents,
      score: result.score,
    })),
    boundary: "Scores rank documents inside this site's semantic index only. They are not Google rankings, AI citations, authority scores or performance predictions.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=300", "x-robots-tag": "noindex, follow" } });
}
