import { lorenzaAuthority } from "@/lib/lorenza-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: lorenzaAuthority.entity,
    media: lorenzaAuthority.media,
    suggestedCitation: "Lorenza Volponi — AI Systems Strategist, AI Specialist, AI Product & UX/UI, GEO & AI Search, Builder",
    citationSurfaces: [
      `${lorenzaAuthority.entity.publicResearchProperty}/imprensa`,
      `${lorenzaAuthority.entity.publicResearchProperty}/en/press`,
      `${lorenzaAuthority.entity.publicResearchProperty}/media-facts.json`,
      `${lorenzaAuthority.entity.publicResearchProperty}/evidence.json`,
      `${lorenzaAuthority.entity.publicResearchProperty}/provenance.json`,
    ],
    independence: lorenzaAuthority.boundaries.independence,
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "index, follow" } });
}
