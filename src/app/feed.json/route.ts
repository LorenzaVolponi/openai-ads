import { SITE_URL } from "@/lib/editorial-meta";
import { radarEntries } from "@/lib/radar-data";

export const dynamic = "force-static";

export function GET() {
  const body = {
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

  return Response.json(body, {
    headers: {
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
