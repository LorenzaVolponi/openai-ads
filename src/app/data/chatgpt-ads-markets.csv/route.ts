import { marketStates } from "@/lib/radar-data";

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

  const csv = [header, ...rows]
    .map((row) => row.map((value) => csvCell(String(value))).join(","))
    .join("\n");

  return new Response(`${csv}\n`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'inline; filename="chatgpt-ads-markets.csv"',
      "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
