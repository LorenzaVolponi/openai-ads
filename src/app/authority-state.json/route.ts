export const dynamic = "force-static";

export function GET() {
  return Response.json({
    entity: "Lorenza Volponi",
    visualStrategy: "one canonical profile",
    backendStrategy: "high evidence density",
    commercialStrategy: "asynchronous-first",
    mediaStrategy: "source-ready",
    reputationStrategy: "evidence-only",
    distributionStrategy: "quote and citation ready",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=86400", "x-robots-tag": "noindex, follow" } });
}
