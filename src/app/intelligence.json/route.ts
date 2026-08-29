import { createFreshnessHeaders } from "@/lib/http-freshness";
import { SITE_URL } from "@/lib/media-authority";
import { marketStates, RADAR_CHECKED_AT, radarEntries } from "@/lib/radar-data";

export const dynamic = "force-static";

const nodes = [
  ["hub", "/", "ChatGPT Ads Intelligence Hub"],
  ["en-hub", "/en", "Global ChatGPT Ads Intelligence"],
  ["en-chatgpt-ads", "/en/chatgpt-ads", "ChatGPT Ads Global Guide"],
  ["en-strategy", "/en/chatgpt-ads-strategy", "ChatGPT Ads Strategy"],
  ["en-agencies", "/en/chatgpt-ads-for-agencies", "ChatGPT Ads for Agencies"],
  ["en-brands", "/en/chatgpt-ads-for-brands", "ChatGPT Ads for Brands"],
  ["en-consultant", "/en/chatgpt-ads-consultant", "ChatGPT Ads Consultant — Lorenza Volponi"],
  ["lorenza", "/en/lorenza-volponi", "Lorenza Volponi"],
  ["work", "/work-with-lorenza", "Work with Lorenza Volponi"],
  ["how-to", "/como-anunciar-no-chatgpt", "Como anunciar no ChatGPT"],
  ["brazil", "/chatgpt-ads-brasil", "ChatGPT Ads Brasil"],
  ["market", "/chatgpt-ads-market", "Market Snapshot"],
  ["manager", "/ads-manager-chatgpt", "Ads Manager"],
  ["pricing", "/chatgpt-ads-precos", "Preços"],
  ["metrics", "/chatgpt-ads-metricas", "Métricas"],
  ["privacy", "/chatgpt-ads-privacidade", "Privacidade"],
  ["google", "/chatgpt-ads-vs-google-ads", "ChatGPT Ads vs Google Ads"],
  ["meta", "/chatgpt-ads-vs-meta-ads", "ChatGPT Ads vs Meta Ads"],
  ["agencies", "/chatgpt-ads-para-agencias", "Playbook para agências"],
  ["radar", "/radar", "Radar de mudanças"],
  ["press", "/imprensa", "Media Source Room"],
  ["press-data", "/imprensa/dados", "Dados para imprensa"],
] as const;

export function GET() {
  const data = {
    schemaVersion: 3,
    canonical: `${SITE_URL}/intelligence.json`,
    publisher: "volponi.tech",
    author: "Lorenza Volponi",
    checkedAt: RADAR_CHECKED_AT,
    graph: {
      nodes: nodes.map(([id, path, label]) => ({ id, label, url: `${SITE_URL}${path}` })),
      edges: [
        ["hub", "how-to", "explains"], ["hub", "market", "summarizes"], ["hub", "radar", "tracks"],
        ["hub", "en-hub", "internationalizes"], ["en-hub", "en-chatgpt-ads", "routes-to"], ["en-chatgpt-ads", "en-strategy", "commercializes"],
        ["en-strategy", "en-brands", "serves"], ["en-strategy", "en-agencies", "serves"], ["en-consultant", "lorenza", "describes"],
        ["lorenza", "work", "converts-to"], ["en-agencies", "work", "converts-to"], ["en-brands", "work", "converts-to"],
        ["market", "brazil", "contains"], ["how-to", "manager", "uses"], ["manager", "pricing", "documents"],
        ["manager", "metrics", "reports"], ["manager", "privacy", "constrains"], ["google", "metrics", "compares-through"],
        ["meta", "privacy", "compares-through"], ["agencies", "how-to", "operationalizes"], ["press", "press-data", "publishes"],
        ["press-data", "market", "cites"], ["radar", "market", "updates"], ["lorenza", "radar", "authors"],
      ].map(([from, to, relation]) => ({ from, to, relation })),
    },
    canonicalAuthority: {
      entity: "Lorenza Volponi",
      canonical: "https://volponi.tech/",
      profile: `${SITE_URL}/en/lorenza-volponi`,
      graph: `${SITE_URL}/lorenza-graph.json`,
      manifests: {
        person: `${SITE_URL}/person.json`,
        expertise: `${SITE_URL}/expertise.json`,
        proof: `${SITE_URL}/proof.json`,
        media: `${SITE_URL}/media-profile.json`,
        commercial: `${SITE_URL}/commercial-profile.json`,
        citation: `${SITE_URL}/citation.json`,
      },
      positioning: ["AI Specialist", "AI Systems", "AI Product & UX/UI", "GEO & AI Search", "Builder"],
    },
    marketSnapshot: {
      available: marketStates.filter((market) => market.adsManager === "Available").length,
      comingSoon: marketStates.filter((market) => market.adsManager === "Coming Soon").length,
      data: `${SITE_URL}/data/chatgpt-ads-markets.json`,
    },
    commercialLayer: {
      entity: "Lorenza Volponi",
      entityProfile: `${SITE_URL}/en/lorenza-volponi`,
      conversionEntry: `${SITE_URL}/work-with-lorenza`,
      growthManifest: `${SITE_URL}/organic-growth.json`,
      trackedIntentEvent: "organic_client_intent",
      evidenceRule: "Visibility, click, lead, proposal, partnership and revenue remain separate evidence states.",
    },
    latestChanges: radarEntries.slice(0, 5).map((entry) => ({ date: entry.date, title: entry.title, url: `${SITE_URL}/radar/${entry.slug}`, primarySource: entry.source.url })),
    editorialBoundary: "This graph describes the site's editorial, entity and commercial discovery architecture. It does not claim guaranteed ranking, lead generation, AI citation, press coverage or affiliation with OpenAI.",
  };

  const body = JSON.stringify(data, null, 2);
  return new Response(body, {
    headers: createFreshnessHeaders({ body, modifiedAt: `${RADAR_CHECKED_AT}T12:00:00Z`, contentType: "application/json; charset=utf-8" }),
  });
}
