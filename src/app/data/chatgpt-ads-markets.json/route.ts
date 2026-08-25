import { marketStates, RADAR_CHECKED_AT } from "@/lib/radar-data";

export const dynamic = "force-static";

export function GET() {
  return Response.json(
    {
      schemaVersion: 1,
      publisher: "volponi.tech",
      author: "Lorenza Volponi",
      canonical: "https://openai-ads.volponi.tech/radar",
      checkedAt: RADAR_CHECKED_AT,
      methodology: "https://openai-ads.volponi.tech/metodologia",
      note:
        "Snapshot editorial independente. O status do Ads Manager pode mudar após a data de checagem; confirme a fonte oficial antes de decisão operacional.",
      markets: marketStates,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
      },
    }
  );
}
