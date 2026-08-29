import { reputationBoundary, reputationEndpoints, reputationSignals } from "@/lib/reputation-signals";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: "Lorenza Volponi",
    boundary: reputationBoundary,
    endpoints: reputationEndpoints,
    signals: reputationSignals,
    measured: reputationSignals.length > 0,
    note: reputationSignals.length ? "Verified external signals only." : "No verified external reputation signals are published in this manifest yet.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
