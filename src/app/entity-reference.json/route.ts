import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#author`,
    name: "Lorenza Volponi",
    url: "https://volponi.tech/",
    sameAs: ["https://www.linkedin.com/in/lorenzavolponi", "https://github.com/LorenzaVolponi"],
    mainEntityOfPage: `${SITE_URL}/en/lorenza-volponi`,
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=86400", "x-robots-tag": "noindex, follow" } });
}
