import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

const topics = [
  "Artificial Intelligence",
  "AI systems",
  "ChatGPT",
  "GEO and AI Search",
  "AI Product and UX/UI",
  "automation and agents",
  "conversational advertising",
  "cybersecurity in AI systems",
  "digital product strategy",
] as const;

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
    topics,
    journalistFastPath: {
      facts: `${SITE_URL}/media-facts.json`,
      pressKit: `${SITE_URL}/press-kit.json`,
      mediaProfile: `${SITE_URL}/media-profile.json`,
      evidence: `${SITE_URL}/evidence.json`,
      citations: `${SITE_URL}/citation.json`,
      quotes: `${SITE_URL}/shareable-quotes.json`,
    },
    workflow: [
      "identify topic",
      "use public evidence and attributable quote",
      "contact Lorenza through the public LinkedIn profile when direct editorial contact is required",
    ],
    boundary: "This endpoint is a source-room shortcut. It does not imply prior media coverage, endorsement, affiliation or guaranteed availability for a specific deadline.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
