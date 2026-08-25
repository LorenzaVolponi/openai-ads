import { createFreshnessHeaders } from "@/lib/http-freshness";
import { marketStates, RADAR_CHECKED_AT } from "@/lib/radar-data";

export const dynamic = "force-static";

export function GET() {
  const data = {
    schemaVersion: 1,
    publisher: "volponi.tech",
    author: "Lorenza Volponi",
    canonical: "https://openai-ads.volponi.tech/radar",
    checkedAt: RADAR_CHECKED_AT,
    methodology: "https://openai-ads.volponi.tech/metodologia",
    note:
      "Snapshot editorial independente. O status do Ads Manager pode mudar após a data de checagem; confirme a fonte oficial antes de decisão operacional.",
    markets: marketStates,
  };
  const body = JSON.stringify(data);

  return new Response(body, {
    headers: createFreshnessHeaders({
      body,
      modifiedAt: `${RADAR_CHECKED_AT}T12:00:00Z`,
      contentType: "application/json; charset=utf-8",
    }),
  });
}
