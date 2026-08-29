import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  const data = {
    schemaVersion: 1,
    canonical: `${SITE_URL}/partner-opportunities.json`,
    person: "Lorenza Volponi",
    entry: `${SITE_URL}/en/partners`,
    models: [
      { kind: "agency-co-delivery", fit: ["agencies", "consultancies"], outcome: "senior research and strategy layer" },
      { kind: "product-adtech-intelligence", fit: ["AI products", "adtech", "martech"], outcome: "market intelligence and evidence architecture" },
      { kind: "media-research", fit: ["media", "newsletters", "research teams"], outcome: "source-linked commentary, datasets and explainers" },
      { kind: "strategic-advisory", fit: ["founders", "executives", "specialist teams"], outcome: "focused GEO, AI systems and ChatGPT Ads advisory" },
    ],
    qualification: ["real market problem", "clear audience", "concrete distribution or client opportunity", "defined reason to combine capabilities"],
    boundary: "This file describes partnership pathways, not existing partners, customers, logos or endorsements.",
  };

  return Response.json(data, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
