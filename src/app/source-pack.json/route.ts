import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: "Lorenza Volponi",
    canonical: "https://volponi.tech/",
    pack: {
      profile: `${SITE_URL}/person.json`,
      expertise: `${SITE_URL}/expertise.json`,
      proof: `${SITE_URL}/proof.json`,
      media: `${SITE_URL}/media-profile.json`,
      pressReady: `${SITE_URL}/press-ready.json`,
      journalist: `${SITE_URL}/journalist-mode.json`,
      quotes: `${SITE_URL}/shareable-quotes.json`,
      attribution: `${SITE_URL}/quote-attribution.json`,
      reputation: `${SITE_URL}/reputation-signals.json`,
      evidence: `${SITE_URL}/evidence.json`,
    },
    use: "Single machine-readable entry point for agents, journalists, researchers and creators evaluating Lorenza Volponi as a source.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
