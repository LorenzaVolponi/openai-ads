export const dynamic = "force-static";

export function GET() {
  return Response.json({
    entity: "Lorenza Volponi",
    template: {
      type: "press|citation|backlink|podcast|social|ai-citation|search",
      source: "external source name",
      url: "https://example.com/evidence",
      observedAt: "YYYY-MM-DD",
      evidenceUrl: "https://example.com/evidence",
      note: "optional context"
    },
    rule: "Populate only after the source exists and can be audited.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=86400", "x-robots-tag": "noindex, follow" } });
}
