import { shareableQuotes, socialCopy } from "@/lib/shareability";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: "Lorenza Volponi",
    usage: "Quotes may be attributed to Lorenza Volponi with the canonical URL preserved. Context should not be altered to imply endorsement or affiliation.",
    quotes: shareableQuotes.map((quote) => ({ ...quote, social: socialCopy(quote) })),
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
