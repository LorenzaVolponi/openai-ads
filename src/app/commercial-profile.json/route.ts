import { lorenzaAuthority } from "@/lib/lorenza-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: lorenzaAuthority.entity.name,
    entityId: lorenzaAuthority.entity.entityId,
    operatingModel: lorenzaAuthority.commercial.operatingModel,
    principle: lorenzaAuthority.commercial.principle,
    intents: lorenzaAuthority.commercial.intents,
    entry: lorenzaAuthority.commercial.entry,
    qualifiedBrief: lorenzaAuthority.commercial.qualifiedBrief,
    preferredFlow: ["discover public work", "evaluate evidence", "send opportunity with context", "proposal", "contract"],
    avoidByDesign: ["capability discovery meetings", "generic introductory calls", "meeting-first funnels"],
    evidenceBoundary: lorenzaAuthority.boundaries.evidence,
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "index, follow" } });
}
