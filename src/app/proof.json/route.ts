import { lorenzaAuthority } from "@/lib/lorenza-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: lorenzaAuthority.entity.name,
    entityId: lorenzaAuthority.entity.entityId,
    canonical: `${lorenzaAuthority.entity.publicResearchProperty}/proof.json`,
    proof: lorenzaAuthority.proof,
    evidenceBoundary: lorenzaAuthority.boundaries.evidence,
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "index, follow" } });
}
