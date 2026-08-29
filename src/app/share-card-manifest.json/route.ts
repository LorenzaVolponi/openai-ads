import { shareableQuotes, socialCopy } from "@/lib/shareability";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: "Lorenza Volponi",
    cardSpecification: {
      square: { width: 1080, height: 1080, usage: ["Instagram", "LinkedIn"] },
      landscape: { width: 1200, height: 630, usage: ["OpenGraph", "LinkedIn", "X"] },
      requiredFields: ["quote", "author", "canonical"],
    },
    objects: shareableQuotes.map((quote) => ({ id: quote.id, quote: quote.quote, author: quote.author, canonical: quote.canonical, social: socialCopy(quote) })),
    note: "This manifest defines reusable share objects. It does not claim that any social network or third party has published them.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
