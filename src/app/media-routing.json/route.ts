import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: "Lorenza Volponi",
    routes: {
      "interview-now": `${SITE_URL}/journalist-mode.json`,
      "need-bio": `${SITE_URL}/press-ready.json`,
      "need-proof": `${SITE_URL}/proof.json`,
      "need-data": `${SITE_URL}/media-facts.json`,
      "need-quote": `${SITE_URL}/shareable-quotes.json`,
      "need-attribution": `${SITE_URL}/quote-attribution.json`,
      "need-topic-expertise": `${SITE_URL}/expertise.json`
    },
    purpose: "Reduce journalist friction without adding another visual funnel or meeting requirement.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
