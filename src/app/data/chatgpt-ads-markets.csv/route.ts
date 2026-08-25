import { createFreshnessHeaders } from "@/lib/http-freshness";
import { marketStates, RADAR_CHECKED_AT } from "@/lib/radar-data";

export const dynamic = "force-static";

const csvCell = (value: string) => {
  const escaped = value.replace(/"/g, '""');
  return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
};

export function GET() {
  const header = ["country", "iso2", "adsManager", "group", "checkedAt", "source"];
  const rows = marketStates.map((market) => [
    market.country,
    market.code,
    market.adsManager,
    market.group,
    market.checkedAt,
    market.source,
  ]);

  const body = `${[header, ...rows]
    .map((row) => row.map((value) => csvCell(String(value))).join(","))
    .join("\n")}\n`;

  return new Response(body, {
    headers: {
      ...createFreshnessHeaders({
        body,
        modifiedAt: `${RADAR_CHECKED_AT}T12:00:00Z`,
        contentType: "text/csv; charset=utf-8",
      }),
      "Content-Disposition": 'inline; filename="chatgpt-ads-markets.csv"',
    },
  });
}
