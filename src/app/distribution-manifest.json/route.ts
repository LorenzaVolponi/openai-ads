import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: "Lorenza Volponi",
    canonical: "https://volponi.tech/",
    distributionObjects: {
      journalist: `${SITE_URL}/journalist-mode.json`,
      quotes: `${SITE_URL}/shareable-quotes.json`,
      reputation: `${SITE_URL}/reputation-signals.json`,
      mediaProfile: `${SITE_URL}/media-profile.json`,
      pressKit: `${SITE_URL}/press-kit.json`,
      citations: `${SITE_URL}/citation.json`,
      proof: `${SITE_URL}/proof.json`,
      commercial: `${SITE_URL}/commercial-profile.json`,
    },
    purpose: "Make one canonical Lorenza Volponi entity easier to quote, cite, verify and contact without multiplying visual pages.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
