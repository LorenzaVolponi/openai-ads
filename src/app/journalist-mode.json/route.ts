import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    source: {
      name: "Lorenza Volponi",
      canonical: "https://volponi.tech/",
      profile: `${SITE_URL}/en/lorenza-volponi`,
      linkedin: "https://www.linkedin.com/in/lorenzavolponi",
      language: ["pt-BR", "en"],
      availability: ["television", "newspapers", "magazines", "podcasts", "newsletters", "editorial commentary"],
    },
    topics: ["Artificial Intelligence", "AI systems", "ChatGPT", "GEO and AI Search", "AI Product and UX/UI", "automation and agents", "conversational advertising", "cybersecurity in AI systems", "digital product strategy"],
    journalistFastPath: {
      facts: `${SITE_URL}/media-facts.json`,
      pressKit: `${SITE_URL}/press-kit.json`,
      mediaProfile: `${SITE_URL}/media-profile.json`,
      evidence: `${SITE_URL}/evidence.json`,
      citations: `${SITE_URL}/citation.json`,
      quotes: `${SITE_URL}/shareable-quotes.json`,
    },
    contact: { linkedin: "https://www.linkedin.com/in/lorenzavolponi" },
    boundary: "Source-room shortcut only. It does not imply prior media coverage, endorsement, affiliation or guaranteed availability for a specific deadline.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
