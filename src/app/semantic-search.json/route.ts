import { SITE_URL } from "@/lib/media-authority";
import { semanticSearch, type SemanticLanguage } from "@/lib/semantic-discovery";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const url = new URL(request.url);
  const query = (url.searchParams.get("q") || "").trim();
  const languageParam = url.searchParams.get("lang");
  const language: SemanticLanguage | undefined = languageParam === "en" || languageParam === "pt-BR" ? languageParam : undefined;
  const parsedLimit = Number(url.searchParams.get("limit") || "8");
  const limit = Number.isFinite(parsedLimit) ? Math.min(Math.max(parsedLimit, 1), 20) : 8;

  const results = query ? semanticSearch(query, { language, limit }) : [];

  return Response.json({
    schemaVersion: 1,
    canonical: `${SITE_URL}/semantic-search.json`,
    query,
    language: language ?? "all",
    method: "deterministic semantic expansion over editorial topic aliases, entities, intents and audiences; no embeddings, external model or runtime AI API",
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
