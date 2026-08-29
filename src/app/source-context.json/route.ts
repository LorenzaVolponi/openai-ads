export const dynamic = "force-static";

export function GET() {
  return Response.json({
    entity: "Lorenza Volponi",
    context: "Independent AI systems, AI product/UX, GEO, AI Search and conversational advertising research and strategy.",
    independence: "Not affiliated with, sponsored by, endorsed by, certified by, operated by or maintained by OpenAI.",
    attribution: "Lorenza Volponi — volponi.tech",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=86400", "x-robots-tag": "noindex, follow" } });
}
