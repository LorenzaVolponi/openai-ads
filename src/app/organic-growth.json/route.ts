import { SITE_URL } from "@/lib/media-authority";
import { globalGrowthPages } from "@/lib/global-growth-data";

export const dynamic = "force-static";

export function GET() {
  const data = {
    schemaVersion: 1,
    canonical: `${SITE_URL}/organic-growth.json`,
    entity: { name: "Lorenza Volponi", canonical: "https://volponi.tech/", linkedin: "https://www.linkedin.com/in/lorenzavolponi", github: "https://github.com/LorenzaVolponi" },
    commercialArchitecture: {
      entry: `${SITE_URL}/work-with-lorenza`,
      globalPages: globalGrowthPages.map((page) => ({ intent: page.intent, title: page.title, url: `${SITE_URL}/en/${page.slug}` })),
      trackedEvent: "organic_client_intent",
    },
    evidenceBoundary: "Search visibility, CTA clicks, leads, proposals, partnerships and revenue are separate evidence states. The project does not infer later stages from earlier ones.",
  };
  return Response.json(data, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
