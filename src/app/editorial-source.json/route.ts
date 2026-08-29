import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    source: "Lorenza Volponi",
    canonical: "https://volponi.tech/",
    sourceRoom: `${SITE_URL}/imprensa`,
    globalProfile: `${SITE_URL}/en/lorenza-volponi`,
    availableFor: ["television", "print", "digital press", "podcasts", "newsletters", "editorial commentary"],
    topics: ["Artificial Intelligence", "AI Systems", "ChatGPT", "GEO", "AI Search", "AI Product", "UX/UI for AI", "automation", "agents", "conversational advertising", "cybersecurity in AI systems"],
    assets: {
      facts: `${SITE_URL}/media-facts.json`,
      pressKit: `${SITE_URL}/press-kit.json`,
      mediaProfile: `${SITE_URL}/media-profile.json`,
      evidence: `${SITE_URL}/evidence.json`,
      citationGuide: `${SITE_URL}/citation.json`,
      quotes: `${SITE_URL}/shareable-quotes.json`,
    },
    contactPolicy: "Use only verified public contact channels already published by Lorenza Volponi. This manifest intentionally does not invent an email address or phone number.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
