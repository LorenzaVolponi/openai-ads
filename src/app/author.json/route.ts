import { createFreshnessHeaders } from "@/lib/http-freshness";
import { LAST_EDITORIAL_REVIEW_ISO, SITE_URL } from "@/lib/editorial-meta";
import { radarEntries } from "@/lib/radar-data";

export const dynamic = "force-static";

export function GET() {
  const canonicalIdentity = "https://volponi.tech";
  const ecosystemHub = `${canonicalIdentity}/hub`;

  const data = {
    schemaVersion: 2,
    canonical: `${SITE_URL}/imprensa`,
    type: "independent expert-source profile",
    name: "Lorenza Volponi",
    publisher: "volponi.tech",
    canonicalIdentity,
    ecosystemHub,
    ecosystemRole: "research property",
    isPartOf: ecosystemHub,
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
    website: canonicalIdentity,
    sameAs: [
      canonicalIdentity,
      ecosystemHub,
      "https://github.com/LorenzaVolponi",
      "https://www.linkedin.com/in/lorenzavolponi",
    ],
    authoredPublication: SITE_URL,
    radar: `${SITE_URL}/radar`,
    pressKit: `${SITE_URL}/press-kit.json`,
    citation: `${SITE_URL}/citation.json`,
    provenance: `${SITE_URL}/provenance.json`,
    evidence: `${SITE_URL}/evidence.json`,
    ecosystemDiscovery: `${canonicalIdentity}/ecosystem.json`,
    ecosystemFeed: `${canonicalIdentity}/feed.xml`,
    latestAuthoredRecords: radarEntries.slice(0, 5).map((entry) => ({
      date: entry.date,
      title: entry.title,
      url: `${SITE_URL}/radar/${entry.slug}`,
      primarySource: entry.source.url,
    })),
    citationGuidance:
      "For the ChatGPT Ads Radar cite the primary Radar URL. For ecosystem-level context cite https://volponi.tech/hub.",
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
