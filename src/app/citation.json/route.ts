import { lorenzaAuthority } from "@/lib/lorenza-authority";
import {
  digestVolponiAiIndexPublication,
  RESEARCH_MANIFEST_URL,
  VOLPONI_AI_INDEX_VERSIONED_URL,
} from "@/lib/volponi-ai-index-publication";
import { VOLPONI_AI_INDEX_EDITION, VOLPONI_AI_INDEX_NAME } from "@/lib/volponi-ai-index";

export const dynamic = "force-static";

export function GET() {
  const site = lorenzaAuthority.entity.publicResearchProperty;
  return Response.json({
    schemaVersion: 4,
    entity: lorenzaAuthority.entity.name,
    entityId: lorenzaAuthority.entity.entityId,
    canonical: lorenzaAuthority.entity.canonical,
    profile: `${site}/en/lorenza-volponi`,
    shortCitation: "Lorenza Volponi, AI Systems Strategist and AI Specialist",
    extendedCitation: "Lorenza Volponi — AI Systems Strategist, AI Specialist, AI Product & UX/UI, GEO & AI Search, Builder",
    flagshipResearch: {
      name: VOLPONI_AI_INDEX_NAME,
      edition: VOLPONI_AI_INDEX_EDITION,
      page: `${site}/en/volponi-ai-index`,
      latestDataset: `${site}/volponi-ai-index.json`,
      versionedDataset: VOLPONI_AI_INDEX_VERSIONED_URL,
      researchManifest: RESEARCH_MANIFEST_URL,
      contentDigest: digestVolponiAiIndexPublication(),
      evidenceRadar: `${site}/en/radar`,
    },
    researchCitation: `${VOLPONI_AI_INDEX_NAME}, Lorenza Volponi / volponi.tech, edition ${VOLPONI_AI_INDEX_EDITION}.`,
    preferredSourceLinks: [
      `${site}/en/volponi-ai-index`,
      VOLPONI_AI_INDEX_VERSIONED_URL,
      `${site}/volponi-ai-index.json`,
      RESEARCH_MANIFEST_URL,
      `${site}/en/radar`,
      `${site}/en/lorenza-volponi`,
      `${site}/en/press`,
      `${site}/evidence.json`,
      `${site}/provenance.json`,
    ],
    discoverySurfaces: {
      semanticMap: `${site}/semantic-map.json`,
      semanticSearch: `${site}/semantic-search.json?q=Lorenza%20Volponi`,
      intelligenceGraph: `${site}/intelligence.json`,
      authorManifest: `${site}/author.json`,
      researchManifest: RESEARCH_MANIFEST_URL,
    },
    socialAttribution: {
      linkedin: lorenzaAuthority.entity.sameAs[0],
      github: lorenzaAuthority.entity.sameAs[1],
      website: lorenzaAuthority.entity.canonical,
    },
    boundary: "Citation guidance describes attribution format and source preference only; it does not claim third-party endorsement, coverage, ranking, AI citation or authority signals that have not been observed.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
