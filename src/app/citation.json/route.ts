import { lorenzaAuthority } from "@/lib/lorenza-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: lorenzaAuthority.entity.name,
    entityId: lorenzaAuthority.entity.entityId,
    canonical: lorenzaAuthority.entity.canonical,
    shortCitation: "Lorenza Volponi, AI Systems Strategist and AI Specialist",
    extendedCitation: "Lorenza Volponi — AI Systems Strategist, AI Specialist, AI Product & UX/UI, GEO & AI Search, Builder",
    preferredSourceLinks: [
      `${lorenzaAuthority.entity.publicResearchProperty}/en/lorenza-volponi`,
      `${lorenzaAuthority.entity.publicResearchProperty}/imprensa`,
      `${lorenzaAuthority.entity.publicResearchProperty}/evidence.json`,
      `${lorenzaAuthority.entity.publicResearchProperty}/provenance.json`,
    ],
    socialAttribution: {
      linkedin: lorenzaAuthority.entity.sameAs[0],
      github: lorenzaAuthority.entity.sameAs[1],
      website: lorenzaAuthority.entity.canonical,
    },
    boundary: "Citation guidance describes attribution format only; it does not claim third-party endorsement, coverage or authority signals that have not been observed.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "index, follow" } });
}
