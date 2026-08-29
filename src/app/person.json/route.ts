import { lorenzaAuthority } from "@/lib/lorenza-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    canonical: lorenzaAuthority.entity.canonical,
    entity: lorenzaAuthority.entity,
    expertise: lorenzaAuthority.expertise.map(({ id, label, aliases }) => ({ id, label, aliases })),
    sameAs: lorenzaAuthority.entity.sameAs,
    media: lorenzaAuthority.media,
    commercial: {
      operatingModel: lorenzaAuthority.commercial.operatingModel,
      entry: lorenzaAuthority.commercial.entry,
      qualifiedBrief: lorenzaAuthority.commercial.qualifiedBrief,
    },
    boundaries: lorenzaAuthority.boundaries,
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "index, follow" } });
}
