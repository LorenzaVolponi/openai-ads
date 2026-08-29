import { createFreshnessHeaders } from "@/lib/http-freshness";
import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

const queries = [
  "ChatGPT Ads Brasil",
  "como anunciar no ChatGPT",
  "ChatGPT Ads preço",
  "ChatGPT Ads métricas",
  "ChatGPT Ads privacidade",
  "ChatGPT Ads vs Google Ads",
  "ChatGPT Ads vs Meta Ads",
  "Lorenza Volponi ChatGPT Ads",
];

export function GET() {
  const generatedAt = new Date().toISOString();
  const payload = {
    schemaVersion: 1,
    canonical: `${SITE_URL}/autoridade`,
    machineReadable: `${SITE_URL}/authority.json`,
    publisher: "volponi.tech",
    author: "Lorenza Volponi",
    generatedAt,
    authorityPipeline: [
      { stage: "primary-source-change", evidence: "official OpenAI surface fingerprint", automatic: true, publicationGate: "human editorial review" },
      { stage: "owned-authority-health", evidence: "canonical pages, datasets, feeds, crawler surfaces and provenance", automatic: true },
      { stage: "organic-search", evidence: "Google Search Console API", automatic: true, credentialsRequired: true },
      { stage: "external-citation", evidence: "declared source URL plus live marker/backlink verification", automatic: "verification only", discovery: "not claimed" },
      { stage: "publication", evidence: "reviewed factual diff", automatic: false },
    ],
    queryPortfolio: queries,
    evidenceSurfaces: {
      evidenceLedger: `${SITE_URL}/evidence.json`,
      provenance: `${SITE_URL}/provenance.json`,
      intelligenceGraph: `${SITE_URL}/intelligence.json`,
      mediaFacts: `${SITE_URL}/media-facts.json`,
      marketDataset: `${SITE_URL}/data/chatgpt-ads-markets.json`,
      radar: `${SITE_URL}/radar`,
    },
    boundaries: [
      "No ranking is claimed without Search Console or another verifiable source.",
      "No backlink, press mention or AI citation is counted without reviewable evidence.",
      "Source-change detection never auto-publishes factual claims.",
      "An empty citation ledger means no evidence has been declared in the ledger, not that the web contains zero citations.",
    ],
  };

  const body = JSON.stringify(payload, null, 2);
  return new Response(body, {
    headers: createFreshnessHeaders({ body, modifiedAt: generatedAt, contentType: "application/json; charset=utf-8" }),
  });
}
