import { SITE_URL } from "@/lib/media-authority";
import { globalGrowthPages } from "@/lib/global-growth-data";

export const dynamic = "force-static";

export function GET() {
  const globalPages = [
    ...globalGrowthPages.map((page) => ({ intent: page.intent, title: page.title, url: `${SITE_URL}/en/${page.slug}` })),
    { intent: "consulting", title: "GEO & AI Discovery Strategy Consultant: Lorenza Volponi", url: `${SITE_URL}/en/geo-ai-strategy` },
    { intent: "partnership", title: "ChatGPT Ads Partnerships", url: `${SITE_URL}/en/chatgpt-ads-partnerships` },
  ];

  const data = {
    schemaVersion: 2,
    canonical: `${SITE_URL}/organic-growth.json`,
    entity: { name: "Lorenza Volponi", canonical: "https://volponi.tech/", linkedin: "https://www.linkedin.com/in/lorenzavolponi", github: "https://github.com/LorenzaVolponi" },
    commercialArchitecture: {
      entry: `${SITE_URL}/work-with-lorenza`,
      globalPages,
      trackedEvent: "organic_client_intent",
      funnelStates: ["visibility", "click", "lead", "proposal", "partnership", "client", "revenue"],
    },
    evidenceBoundary: "Search visibility, CTA clicks, leads, proposals, partnerships, clients and revenue are separate evidence states. The project does not infer later stages from earlier ones.",
  };
  return Response.json(data, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
