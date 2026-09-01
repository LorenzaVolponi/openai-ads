import { lorenzaAuthority } from "@/lib/lorenza-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      schemaVersion: 2,
      entity: lorenzaAuthority.entity.name,
      entityId: lorenzaAuthority.entity.entityId,
      operatingModel: lorenzaAuthority.commercial.operatingModel,
      principle: lorenzaAuthority.commercial.principle,
      intents: lorenzaAuthority.commercial.intents,
      audiences: lorenzaAuthority.commercial.audiences,
      services: lorenzaAuthority.commercial.services,
      entry: lorenzaAuthority.commercial.entry,
      qualifiedBrief: lorenzaAuthority.commercial.qualifiedBrief,
      preferredFlow: [
        "discover public work",
        "evaluate evidence",
        "send opportunity with context",
        "proposal",
        "contract",
      ],
      evidenceFirst: [
        "https://openai-ads.volponi.tech/en/volponi-ai-index",
        "https://openai-ads.volponi.tech/en/radar",
        "https://openai-ads.volponi.tech/en/lorenza-volponi",
      ],
      machineDiscovery: lorenzaAuthority.machineDiscovery,
      avoidByDesign: ["capability discovery meetings", "generic introductory calls", "meeting-first funnels"],
      evidenceBoundary: lorenzaAuthority.boundaries.evidence,
      commercialBoundary: lorenzaAuthority.boundaries.commercial,
    },
    {
      headers: {
        "cache-control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
        "x-robots-tag": "noindex, follow",
      },
    }
  );
}
