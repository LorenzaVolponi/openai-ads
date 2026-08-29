import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: "Lorenza Volponi",
    surfaces: [
      { role: "canonical profile", url: `${SITE_URL}/en/lorenza-volponi` },
      { role: "machine identity", url: `${SITE_URL}/person.json` },
      { role: "expertise", url: `${SITE_URL}/expertise.json` },
      { role: "proof", url: `${SITE_URL}/proof.json` },
      { role: "media source", url: `${SITE_URL}/journalist-mode.json` },
      { role: "shareability", url: `${SITE_URL}/shareable-quotes.json` },
      { role: "reputation", url: `${SITE_URL}/reputation-signals.json` },
      { role: "commercial", url: `${SITE_URL}/commercial-profile.json` }
    ],
    rule: "Every surface resolves to one Lorenza Volponi entity rather than creating competing persona pages.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
