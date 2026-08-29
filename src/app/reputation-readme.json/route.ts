export const dynamic = "force-static";

export function GET() {
  return Response.json({
    entity: "Lorenza Volponi",
    principle: "Reputation compounds only from evidence that can survive verification.",
    instructions: [
      "Do not insert synthetic mentions.",
      "Do not infer endorsement from citation.",
      "Do not infer client status from commercial intent.",
      "When a real external signal appears, record the public source URL and observation date.",
    ],
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=86400", "x-robots-tag": "noindex, follow" } });
}
