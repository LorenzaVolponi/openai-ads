export const dynamic = "force-static";

export function GET() {
  return Response.json({
    $schema: "https://json-schema.org/draft/2020-12/schema",
    title: "Lorenza Volponi Reputation Signal",
    type: "object",
    required: ["type", "source", "url", "observedAt"],
    properties: {
      type: { enum: ["press", "citation", "backlink", "podcast", "social", "ai-citation", "search"] },
      source: { type: "string", minLength: 1 },
      url: { type: "string", format: "uri" },
      observedAt: { type: "string" },
      evidenceUrl: { type: "string", format: "uri" },
      note: { type: "string" }
    },
    additionalProperties: false,
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=86400", "x-robots-tag": "noindex, follow" } });
}
