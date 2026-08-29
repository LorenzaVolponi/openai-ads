import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: "Lorenza Volponi",
    canonical: "https://volponi.tech/",
    discover: {
      profile: `${SITE_URL}/en/lorenza-volponi`,
      sourcePack: `${SITE_URL}/source-pack.json`,
      distribution: `${SITE_URL}/distribution-manifest.json`,
      journalist: `${SITE_URL}/journalist-mode.json`,
      commercial: `${SITE_URL}/commercial-profile.json`,
      intelligence: `${SITE_URL}/intelligence.json`,
    },
    statement: "One canonical entity, many machine-readable evidence surfaces, minimal visual duplication.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
