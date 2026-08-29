import { shareableQuotes } from "@/lib/shareability";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: "Lorenza Volponi",
    attribution: {
      short: "Lorenza Volponi, AI Systems Strategist and Builder",
      citation: "Lorenza Volponi — volponi.tech",
      requirement: "Preserve the canonical URL when possible and do not alter context to imply endorsement or affiliation.",
    },
    canonicalQuotes: shareableQuotes.map(({ id, quote, canonical }) => ({ id, quote, canonical })),
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
