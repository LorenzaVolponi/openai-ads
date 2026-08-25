import { createFreshnessHeaders } from "@/lib/http-freshness";
import { LAST_EDITORIAL_REVIEW_ISO, SITE_URL } from "@/lib/editorial-meta";
import { radarEntries } from "@/lib/radar-data";

export const dynamic = "force-static";

export function GET() {
  const data = {
    schemaVersion: 1,
    canonical: `${SITE_URL}/imprensa`,
    type: "independent expert-source profile",
    name: "Lorenza Volponi",
    publisher: "volponi.tech",
    language: "pt-BR",
    description:
      "AI systems strategist, builder e autora do observatório independente Volponi ChatGPT Ads Radar, com foco em ChatGPT Ads, GEO, SEO, publicidade conversacional e sistemas de IA.",
    expertise: [
      "ChatGPT Ads",
      "OpenAI Ads Manager",
      "Generative Engine Optimization",
      "Search Engine Optimization",
      "AI systems",
      "conversational advertising",
      "digital strategy",
      "software development",
    ],
    profile: `${SITE_URL}/imprensa`,
    website: "https://volponi.tech",
    sameAs: [
      "https://github.com/LorenzaVolponi",
      "https://www.linkedin.com/in/lorenzavolponi",
    ],
    authoredPublication: SITE_URL,
    radar: `${SITE_URL}/radar`,
    pressKit: `${SITE_URL}/press-kit.json`,
    citation: `${SITE_URL}/citation.json`,
    provenance: `${SITE_URL}/provenance.json`,
    evidence: `${SITE_URL}/evidence.json`,
    latestAuthoredRecords: radarEntries.slice(0, 5).map((entry) => ({
      date: entry.date,
      title: entry.title,
      url: `${SITE_URL}/radar/${entry.slug}`,
      primarySource: entry.source.url,
    })),
    editorialBoundary:
      "Independent source profile. This endpoint does not claim affiliation, certification or endorsement by OpenAI and does not claim guaranteed ranking, citation or press coverage.",
  };
  const body = `${JSON.stringify(data, null, 2)}\n`;

  return new Response(body, {
    headers: createFreshnessHeaders({
      body,
      modifiedAt: LAST_EDITORIAL_REVIEW_ISO,
      contentType: "application/json; charset=utf-8",
    }),
  });
}
