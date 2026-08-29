import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  const data = {
    schemaVersion: 1,
    canonical: `${SITE_URL}/global-media-kit.json`,
    person: {
      name: "Lorenza Volponi",
      canonical: "https://volponi.tech/",
      linkedin: "https://www.linkedin.com/in/lorenzavolponi",
      github: "https://github.com/LorenzaVolponi",
    },
    pressRoom: `${SITE_URL}/en/press`,
    interviewTopics: [
      "ChatGPT Ads markets, buying models and measurement",
      "GEO and AI discovery",
      "AI systems strategy and evidence architecture",
      "Brazil and LATAM interpretation of new AI advertising surfaces",
    ],
    citationSurfaces: [
      `${SITE_URL}/citation.json`,
      `${SITE_URL}/media-facts.json`,
      `${SITE_URL}/evidence.json`,
      `${SITE_URL}/provenance.json`,
      `${SITE_URL}/intelligence.json`,
      `${SITE_URL}/radar`,
    ],
    editorialBoundary: "Independent research by Lorenza Volponi. Not affiliated with, sponsored by, endorsed by, certified by, operated by or maintained by OpenAI. Availability, access, inventory and performance are separate claims.",
  };

  return Response.json(data, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
