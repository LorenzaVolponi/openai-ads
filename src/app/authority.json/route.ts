import { createFreshnessHeaders } from "@/lib/http-freshness";
import { LAST_EDITORIAL_REVIEW_ISO } from "@/lib/editorial-meta";
import { lorenzaAuthority } from "@/lib/lorenza-authority";
import { SITE_URL } from "@/lib/media-authority";
import { semanticTopics } from "@/lib/semantic-discovery";

export const dynamic = "force-static";

const queryPortfolio = {
  ptBR: [
    "ChatGPT Ads Brasil",
    "como anunciar no ChatGPT",
    "ChatGPT Ads preço",
    "ChatGPT Ads métricas",
    "OpenAI Ads Manager",
    "especialista em IA",
    "GEO busca por IA",
    "Lorenza Volponi",
  ],
  en: [
    "ChatGPT Ads",
    "ChatGPT Ads strategy",
    "ChatGPT Ads consultant",
    "AI expert Brazil",
    "AI specialist Brazil",
    "AI Product UX expert",
    "GEO AI Search strategy",
    "Lorenza Volponi",
  ],
};

export function GET() {
  const payload = {
    schemaVersion: 2,
    canonical: `${SITE_URL}/autoridade`,
    machineReadable: `${SITE_URL}/authority.json`,
    publisher: "volponi.tech",
    author: {
      name: lorenzaAuthority.entity.name,
      id: lorenzaAuthority.entity.entityId,
      canonical: lorenzaAuthority.entity.canonical,
      profile: `${SITE_URL}/en/lorenza-volponi`,
    },
    reviewedAt: LAST_EDITORIAL_REVIEW_ISO,
    authorityPipeline: [
      { stage: "primary-source-change", evidence: "official source fingerprint", automatic: true, publicationGate: "human editorial review" },
      { stage: "owned-authority-health", evidence: "canonical pages, research, datasets, feeds, semantic graph, crawler surfaces and provenance", automatic: true },
      { stage: "semantic-discovery", evidence: "topic/entity/intent relationships and deterministic related-content graph", automatic: true, externalRankingClaim: false },
      { stage: "organic-search", evidence: "Google Search Console API", automatic: true, credentialsRequired: true },
      { stage: "external-citation", evidence: "declared source URL plus live marker/backlink verification", automatic: "verification only", discovery: "not claimed" },
      { stage: "publication", evidence: "reviewed factual diff", automatic: false },
    ],
    queryPortfolio,
    semanticClusters: semanticTopics,
    semanticDiscovery: {
      map: `${SITE_URL}/semantic-map.json`,
      search: `${SITE_URL}/semantic-search.json?q=ChatGPT%20Ads`,
      method: "deterministic editorial semantic expansion; no embeddings or external AI API",
    },
    flagshipResearch: `${SITE_URL}/en/volponi-ai-index`,
    evidenceSurfaces: {
      evidenceLedger: `${SITE_URL}/evidence.json`,
      provenance: `${SITE_URL}/provenance.json`,
      intelligenceGraph: `${SITE_URL}/intelligence.json`,
      mediaFacts: `${SITE_URL}/media-facts.json`,
      marketDataset: `${SITE_URL}/data/chatgpt-ads-markets.json`,
      radar: `${SITE_URL}/en/radar`,
      methodology: `${SITE_URL}/metodologia`,
    },
    boundaries: [
      "No ranking is claimed without Search Console or another verifiable source.",
      "No backlink, press mention or AI citation is counted without reviewable evidence.",
      "Semantic similarity scores describe relationships inside this site only and are not search-engine rankings.",
      "Source-change detection never auto-publishes factual claims.",
      "Visibility, click, citation, lead, proposal, client and revenue remain separate evidence states.",
    ],
  };

  const body = JSON.stringify(payload, null, 2);
  return new Response(body, {
    headers: createFreshnessHeaders({ body, modifiedAt: LAST_EDITORIAL_REVIEW_ISO, contentType: "application/json; charset=utf-8" }),
  });
}
