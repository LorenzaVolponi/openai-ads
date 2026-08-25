import { radarEntries } from "@/lib/radar-data";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export function GET() {
  const items = radarEntries
    .map((entry) => {
      const url = `https://openai-ads.volponi.tech/radar/${entry.slug}`;
      return `
    <item>
      <title>${escapeXml(entry.title)}</title>
      <link>${escapeXml(url)}</link>
      <guid isPermaLink="true">${escapeXml(url)}</guid>
      <pubDate>${new Date(`${entry.date}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${escapeXml(`${entry.summary} Impacto: ${entry.impact}`)}</description>
      <source url="${escapeXml(entry.source.url)}">${escapeXml(entry.source.publisher)}</source>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Volponi ChatGPT Ads Radar</title>
    <link>https://openai-ads.volponi.tech/radar</link>
    <description>Mudanças auditadas em ChatGPT Ads, Ads Manager, mercados, compra e mensuração.</description>
    <language>pt-BR</language>
    <lastBuildDate>${new Date("2026-08-25T12:00:00Z").toUTCString()}</lastBuildDate>
    <managingEditor>Lorenza Volponi — volponi.tech</managingEditor>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
