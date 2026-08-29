import { createFreshnessHeaders } from "@/lib/http-freshness";
import { SITE_URL } from "@/lib/media-authority";
import { marketStates, RADAR_CHECKED_AT, radarEntries } from "@/lib/radar-data";

export const dynamic = "force-static";

const nodes = [
  ["hub", "/", "ChatGPT Ads Intelligence Hub"],
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
    schemaVersion: 1,
    canonical: `${SITE_URL}/intelligence.json`,
    publisher: "volponi.tech",
    author: "Lorenza Volponi",
    checkedAt: RADAR_CHECKED_AT,
    graph: {
      nodes: nodes.map(([id, path, label]) => ({ id, label, url: `${SITE_URL}${path}` })),
      edges: [
        ["hub", "how-to", "explains"], ["hub", "market", "summarizes"], ["hub", "radar", "tracks"],
        ["market", "brazil", "contains"], ["how-to", "manager", "uses"], ["manager", "pricing", "documents"],
        ["manager", "metrics", "reports"], ["manager", "privacy", "constrains"], ["google", "metrics", "compares-through"],
        ["meta", "privacy", "compares-through"], ["agencies", "how-to", "operationalizes"], ["press", "press-data", "publishes"],
        ["press-data", "market", "cites"], ["radar", "market", "updates"],
      ].map(([from, to, relation]) => ({ from, to, relation })),
    },
    marketSnapshot: {
      available: marketStates.filter((market) => market.adsManager === "Available").length,
      comingSoon: marketStates.filter((market) => market.adsManager === "Coming Soon").length,
      data: `${SITE_URL}/data/chatgpt-ads-markets.json`,
    },
    latestChanges: radarEntries.slice(0, 5).map((entry) => ({ date: entry.date, title: entry.title, url: `${SITE_URL}/radar/${entry.slug}`, primarySource: entry.source.url })),
    editorialBoundary: "This graph describes the site's editorial architecture. It does not claim guaranteed ranking, AI citation, press coverage or affiliation with OpenAI.",
  };

  const body = JSON.stringify(data, null, 2);
  return new Response(body, {
    headers: createFreshnessHeaders({ body, modifiedAt: `${RADAR_CHECKED_AT}T12:00:00Z`, contentType: "application/json; charset=utf-8" }),
  });
}
