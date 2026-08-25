import { SITE_URL } from "@/lib/media-authority";
import { radarEntries } from "@/lib/radar-data";

export const dynamic = "force-dynamic";

const TWO_DAYS_MS = 48 * 60 * 60 * 1000;

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const now = Date.now();
  const recentEntries = radarEntries.filter((entry) => {
    const publishedAt = Date.parse(`${entry.date}T00:00:00Z`);
    const age = now - publishedAt;
    return age >= 0 && age <= TWO_DAYS_MS;
  });

  const urls = recentEntries
    .map(
      (entry) => `  <url>
    <loc>${escapeXml(`${SITE_URL}/radar/${entry.slug}`)}</loc>
    <news:news>
      <news:publication>
        <news:name>volponi.tech</news:name>
        <news:language>pt</news:language>
      </news:publication>
      <news:publication_date>${entry.date}</news:publication_date>
      <news:title>${escapeXml(entry.title)}</news:title>
    </news:news>
  </url>`,
    )
    .join("\n");

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urls}
</urlset>\n`;

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=3600",
      "Content-Language": "pt-BR",
    },
  });
}
