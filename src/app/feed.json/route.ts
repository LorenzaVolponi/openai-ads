import { LATEST_RADAR_DATE_OBJECT, SITE_URL } from "@/lib/editorial-meta";
import { createFreshnessHeaders } from "@/lib/http-freshness";
import { radarEntries } from "@/lib/radar-data";

export const dynamic = "force-static";

export function GET() {
  const data = {
    version: "https://jsonfeed.org/version/1.1",
    title: "Volponi ChatGPT Ads Radar",
    home_page_url: `${SITE_URL}/radar`,
    feed_url: `${SITE_URL}/feed.json`,
    description:
      "Mudanças auditadas em ChatGPT Ads, Ads Manager, mercados, compra e mensuração, com fonte primária e contexto editorial.",
    language: "pt-BR",
    authors: [
      {
        name: "Lorenza Volponi",
        url: "https://volponi.tech",
      },
    ],
    items: radarEntries.map((entry) => ({
      id: `${SITE_URL}/radar/${entry.slug}`,
      url: `${SITE_URL}/radar/${entry.slug}`,
      title: entry.title,
      content_text: `${entry.summary}\n\nImpacto: ${entry.impact}\n\nAntes: ${entry.previousState}\nAgora: ${entry.currentState}`,
      date_published: `${entry.date}T12:00:00Z`,
      authors: [{ name: "Lorenza Volponi", url: "https://volponi.tech" }],
      tags: [entry.kind, entry.market, "ChatGPT Ads", "Volponi Ads Radar"],
      _source: {
        label: entry.source.label,
        publisher: entry.source.publisher,
        url: entry.source.url,
        confidence: entry.confidence,
      },
    })),
  };
  const body = JSON.stringify(data);

  return new Response(body, {
    headers: createFreshnessHeaders({
      body,
      modifiedAt: LATEST_RADAR_DATE_OBJECT,
      contentType: "application/feed+json; charset=utf-8",
    }),
  });
}
