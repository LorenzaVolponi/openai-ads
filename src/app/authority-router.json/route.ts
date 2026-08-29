import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    entity: "Lorenza Volponi",
    canonical: "https://volponi.tech/",
    routes: {
      who: `${SITE_URL}/person.json`,
      expertise: `${SITE_URL}/expertise.json`,
      proof: `${SITE_URL}/proof.json`,
      media: `${SITE_URL}/journalist-mode.json`,
      quotes: `${SITE_URL}/shareable-quotes.json`,
      reputation: `${SITE_URL}/reputation-signals.json`,
      hire: `${SITE_URL}/commercial-profile.json`
    }
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
