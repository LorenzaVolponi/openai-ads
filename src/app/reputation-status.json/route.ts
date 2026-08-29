import { reputationSignals } from "@/lib/reputation-signals";

export const dynamic = "force-static";

export function GET() {
  const counts = reputationSignals.reduce<Record<string, number>>((acc, signal) => {
    acc[signal.type] = (acc[signal.type] || 0) + 1;
    return acc;
  }, {});
  return Response.json({
    schemaVersion: 1,
    entity: "Lorenza Volponi",
    totalVerifiedSignals: reputationSignals.length,
    byType: counts,
    state: reputationSignals.length ? "measured" : "not-measured",
    rule: "Zero verified signals is reported as zero/not-measured, never replaced with synthetic authority.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
