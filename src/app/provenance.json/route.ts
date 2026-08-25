import {
  LAST_EDITORIAL_REVIEW_DATE,
  latestRadarEntry,
  SITE_URL,
} from "@/lib/editorial-meta";
import { RADAR_SOURCES } from "@/lib/radar-data";

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      schema_version: "1.0",
      project: "Volponi ChatGPT Ads Guide & Radar",
      canonical: SITE_URL,
      publisher: "volponi.tech",
      author: {
        name: "Lorenza Volponi",
        url: "https://volponi.tech",
      },
      editorial_independence:
        "Independent editorial project. Not affiliated with, sponsored by, endorsed by, certified by, operated by, or maintained by OpenAI.",
      last_editorial_review: LAST_EDITORIAL_REVIEW_DATE,
      latest_radar_event: latestRadarEntry
        ? {
            date: latestRadarEntry.date,
            title: latestRadarEntry.title,
            url: `${SITE_URL}/radar/${latestRadarEntry.slug}`,
            primary_source: latestRadarEntry.source.url,
          }
        : null,
      source_monitoring: {
        cadence: "daily",
        mechanism: "GitHub Actions signature watcher",
        automatic_publication: false,
        policy:
          "A detected source change creates an editorial review signal. New facts are published only after human editorial review.",
        sources: Object.values(RADAR_SOURCES).map((source) => ({
          label: source.label,
          publisher: source.publisher,
          url: source.url,
        })),
      },
      discovery: {
        rss: `${SITE_URL}/feed.xml`,
        json_feed: `${SITE_URL}/feed.json`,
        sitemap: `${SITE_URL}/sitemap.xml`,
        llms: `${SITE_URL}/llms.txt`,
        llms_full: `${SITE_URL}/llms-full.txt`,
        knowledge: `${SITE_URL}/knowledge.json`,
        citation: `${SITE_URL}/citation.json`,
        dataset_json: `${SITE_URL}/data/chatgpt-ads-markets.json`,
        dataset_csv: `${SITE_URL}/data/chatgpt-ads-markets.csv`,
      },
      methodology: `${SITE_URL}/metodologia`,
      terms: `${SITE_URL}/termos`,
      privacy: `${SITE_URL}/privacidade`,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    },
  );
}
