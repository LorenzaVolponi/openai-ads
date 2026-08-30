import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 5,
    entity: "Lorenza Volponi",
    entityId: "https://volponi.tech/#lorenza-volponi",
    canonical: "https://volponi.tech/",
    EnglishAuthorityBackbone: {
      aiIndex: `${SITE_URL}/en/volponi-ai-index`,
      radar: `${SITE_URL}/en/radar`,
      profile: `${SITE_URL}/en/lorenza-volponi`,
      chatgptAds: `${SITE_URL}/en/chatgpt-ads`,
      geoAiSearch: `${SITE_URL}/en/geo-ai-strategy`,
      press: `${SITE_URL}/en/press`,
      commercial: `${SITE_URL}/work-with-lorenza`,
    },
    originalResearch: {
      flagship: `${SITE_URL}/en/volponi-ai-index`,
      dataset: `${SITE_URL}/volponi-ai-index.json`,
      evidenceRadar: `${SITE_URL}/en/radar`,
      mediaRoom: `${SITE_URL}/en/press`,
    },
    semanticDiscovery: {
      topicGraph: `${SITE_URL}/semantic-map.json`,
      searchEndpoint: `${SITE_URL}/semantic-search.json?q=AI%20advertising`,
      intelligenceGraph: `${SITE_URL}/intelligence.json`,
      behavior: "Related content is ranked by shared topics, entities, intents, audiences, evidence and language. No external model or embedding API is required.",
    },
    distributionObjects: {
      journalist: `${SITE_URL}/journalist-mode.json`,
      outreach: `${SITE_URL}/outreach-kit.json`,
      quotes: `${SITE_URL}/shareable-quotes.json`,
      reputation: `${SITE_URL}/reputation-signals.json`,
      mediaProfile: `${SITE_URL}/media-profile.json`,
      pressKit: `${SITE_URL}/press-kit.json`,
      citations: `${SITE_URL}/citation.json`,
      proof: `${SITE_URL}/proof.json`,
      commercial: `${SITE_URL}/commercial-profile.json`,
      author: `${SITE_URL}/author.json`,
      authority: `${SITE_URL}/authority.json`,
    },
    distributionFlow: ["Semantic discovery", "Volponi AI Index", "Evidence Radar", "Press room", "Citation/share objects", "Lorenza Volponi"],
    purpose: "Make one canonical Lorenza Volponi entity easier to discover, understand, verify, quote, cite and contact while concentrating authority around evidence-backed original research and semantically connected pages.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
