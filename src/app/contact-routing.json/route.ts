import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    entity: "Lorenza Volponi",
    routes: {
      press: `${SITE_URL}/journalist-mode.json`,
      business: `${SITE_URL}/commercial-profile.json`,
      partnership: `${SITE_URL}/partner-opportunities.json`,
      directPublicChannel: "https://www.linkedin.com/in/lorenzavolponi"
    },
    model: "asynchronous-first",
    avoid: ["generic discovery call", "capability meeting", "calendar-first funnel"],
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
