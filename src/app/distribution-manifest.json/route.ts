import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 3,
    entity: "Lorenza Volponi",
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
    },
    distributionObjects: {
      journalist: `${SITE_URL}/journalist-mode.json`,
      quotes: `${SITE_URL}/shareable-quotes.json`,
      reputation: `${SITE_URL}/reputation-signals.json`,
      mediaProfile: `${SITE_URL}/media-profile.json`,
      pressKit: `${SITE_URL}/press-kit.json`,
      citations: `${SITE_URL}/citation.json`,
      proof: `${SITE_URL}/proof.json`,
      commercial: `${SITE_URL}/commercial-profile.json`,
    },
    purpose: "Make one canonical Lorenza Volponi entity easier to discover, verify, quote, cite and contact while concentrating English authority around evidence-backed original research.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
