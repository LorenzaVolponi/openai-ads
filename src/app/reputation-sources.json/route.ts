import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: "Lorenza Volponi",
    acceptedEvidence: [
      { type: "press", requirement: "publisher URL or archived article URL naming Lorenza Volponi" },
      { type: "citation", requirement: "public source URL containing attributable citation" },
      { type: "backlink", requirement: "external page URL linking to a Lorenza/volponi.tech property" },
      { type: "podcast", requirement: "episode page or platform URL naming Lorenza Volponi" },
      { type: "social", requirement: "public post URL containing attributable mention" },
      { type: "ai-citation", requirement: "captured evidence and source context; not inferred from model behavior" },
      { type: "search", requirement: "Search Console or equivalent first-party search evidence" },
    ],
    appendTo: `${SITE_URL}/reputation-signals.json`,
    policy: `${SITE_URL}/reputation-policy.json`,
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
