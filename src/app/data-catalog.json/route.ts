import { LAST_EDITORIAL_REVIEW_ISO, SITE_URL } from "@/lib/editorial-meta";
import { createFreshnessHeaders } from "@/lib/http-freshness";
import { RADAR_CHECKED_AT } from "@/lib/radar-data";

export const dynamic = "force-static";

export function GET() {
  const data = {
    schemaVersion: 1,
    type: "DataCatalog",
    name: "Volponi ChatGPT Ads Data Catalog",
    canonical: `${SITE_URL}/radar`,
    author: "Lorenza Volponi",
    publisher: "volponi.tech",
    checkedAt: RADAR_CHECKED_AT,
    datasets: [
      {
        name: "ChatGPT Ads Manager market availability",
        json: `${SITE_URL}/data/chatgpt-ads-markets.json`,
        csv: `${SITE_URL}/data/chatgpt-ads-markets.csv`,
        source: "https://help.openai.com/en/articles/20001245-ads-manager-availability",
        methodology: `${SITE_URL}/metodologia`,
        terms: `${SITE_URL}/termos`,
      },
    ],
    provenance: `${SITE_URL}/provenance.json`,
    evidence: `${SITE_URL}/evidence.json`,
    citation: `${SITE_URL}/citation.json`,
    caveat: "Independent editorial snapshot. Re-check the current primary source for operational decisions.",
  };
  const body = `${JSON.stringify(data, null, 2)}\n`;
  return new Response(body, {
    headers: createFreshnessHeaders({
      body,
      modifiedAt: LAST_EDITORIAL_REVIEW_ISO,
      contentType: "application/json; charset=utf-8",
    }),
  });
}
