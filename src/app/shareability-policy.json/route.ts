export const dynamic = "force-static";

export function GET() {
  return Response.json({
    entity: "Lorenza Volponi",
    rules: [
      "Preserve author attribution.",
      "Preserve canonical URL when possible.",
      "Do not alter a quote to imply endorsement, affiliation or a stronger claim.",
      "Social copy is a distribution aid, not evidence that a post has been published.",
    ],
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=86400", "x-robots-tag": "noindex, follow" } });
}
