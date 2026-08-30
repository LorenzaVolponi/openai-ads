import { lorenzaAuthority } from "@/lib/lorenza-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 2,
    entity: lorenzaAuthority.entity,
    media: lorenzaAuthority.media,
    flagshipResearch: {
      name: "Volponi AI Index — AI Advertising & Discovery Readiness",
      page: `${lorenzaAuthority.entity.publicResearchProperty}/en/volponi-ai-index`,
      dataset: `${lorenzaAuthority.entity.publicResearchProperty}/volponi-ai-index.json`,
      evidenceRadar: `${lorenzaAuthority.entity.publicResearchProperty}/en/radar`,
      outreachKit: `${lorenzaAuthority.entity.publicResearchProperty}/outreach-kit.json`,
    },
    suggestedCitation: "Lorenza Volponi — AI Systems Strategist, AI Specialist, AI Product & UX/UI, GEO & AI Search, Builder",
    citationSurfaces: [
      `${lorenzaAuthority.entity.publicResearchProperty}/en/press`,
      `${lorenzaAuthority.entity.publicResearchProperty}/en/volponi-ai-index`,
      `${lorenzaAuthority.entity.publicResearchProperty}/volponi-ai-index.json`,
      `${lorenzaAuthority.entity.publicResearchProperty}/imprensa`,
      `${lorenzaAuthority.entity.publicResearchProperty}/media-facts.json`,
      `${lorenzaAuthority.entity.publicResearchProperty}/evidence.json`,
      `${lorenzaAuthority.entity.publicResearchProperty}/provenance.json`,
    ],
    independence: lorenzaAuthority.boundaries.independence,
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "index, follow" } });
}
