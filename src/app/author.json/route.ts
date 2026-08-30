import { createFreshnessHeaders } from "@/lib/http-freshness";
import { LAST_EDITORIAL_REVIEW_ISO, SITE_URL } from "@/lib/editorial-meta";
import { lorenzaAuthority } from "@/lib/lorenza-authority";
import { radarEntries } from "@/lib/radar-data";

export const dynamic = "force-static";

export function GET() {
  const data = {
    schemaVersion: 3,
    canonical: `${SITE_URL}/en/lorenza-volponi`,
    entityId: lorenzaAuthority.entity.entityId,
    type: "Person",
    name: lorenzaAuthority.entity.name,
    positioning: lorenzaAuthority.entity.positioning,
    publisher: "volponi.tech",
    canonicalIdentity: lorenzaAuthority.entity.canonical,
    researchProperty: SITE_URL,
    ecosystemRole: "independent research and intelligence property",
    languages: ["pt-BR", "en"],
    description: lorenzaAuthority.entity.description,
    expertise: lorenzaAuthority.expertise.map((item) => ({ id: item.id, label: item.label, aliases: item.aliases, evidence: item.evidence })),
    profile: `${SITE_URL}/en/lorenza-volponi`,
    press: `${SITE_URL}/imprensa`,
    globalPress: `${SITE_URL}/en/press`,
    website: lorenzaAuthority.entity.canonical,
    sameAs: lorenzaAuthority.entity.sameAs,
    authoredPublication: SITE_URL,
    flagshipResearch: `${SITE_URL}/en/volponi-ai-index`,
    radar: `${SITE_URL}/en/radar`,
    pressKit: `${SITE_URL}/press-kit.json`,
    citation: `${SITE_URL}/citation.json`,
    provenance: `${SITE_URL}/provenance.json`,
    evidence: `${SITE_URL}/evidence.json`,
    semanticDiscovery: {
      map: `${SITE_URL}/semantic-map.json`,
      search: `${SITE_URL}/semantic-search.json?q=AI%20Search`,
    },
    latestAuthoredRecords: radarEntries.slice(0, 5).map((entry) => ({
      date: entry.date,
      title: entry.title,
      url: `${SITE_URL}/radar/${entry.slug}`,
      primarySource: entry.source.url,
    })),
    citationGuidance: "For original research cite the Volponi AI Index or the specific Radar/data URL supporting the claim. For the person entity use the canonical Lorenza Volponi profile.",
    editorialBoundary: lorenzaAuthority.boundaries.independence,
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
