import { ImageResponse } from "next/og";

import { radarEntries } from "@/lib/radar-data";

export const runtime = "nodejs";

const IMAGE_VARIANTS = {
  "1x1": { width: 1080, height: 1080 },
  "4x3": { width: 1200, height: 900 },
  "16x9": { width: 1200, height: 675 },
  social: { width: 1200, height: 630 },
} as const;

type ImageVariant = keyof typeof IMAGE_VARIANTS;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") || "";
  const entry = radarEntries.find((item) => item.slug === slug);

  if (!entry) {
    return new Response("Not found", { status: 404 });
  }

  const ratio = url.searchParams.get("ratio") as ImageVariant | null;
  const variant: ImageVariant = ratio && ratio in IMAGE_VARIANTS ? ratio : "social";
  const { width, height } = IMAGE_VARIANTS[variant];
  const square = variant === "1x1";
  const tall = square || variant === "4x3";
  const titleSize = square ? 58 : tall ? 61 : 64;
  const subtitleSize = square ? 23 : 22;
  const padding = square ? "68px" : tall ? "62px 70px" : "56px 70px";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#111111",
          color: "#ffffff",
          padding,
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ fontSize: square ? 21 : 22, fontWeight: 800 }}>Volponi ChatGPT Ads Radar</div>
            <div style={{ fontSize: 13, letterSpacing: 2.1, color: "#a1a1aa" }}>CHANGE LEDGER · PRIMARY SOURCES</div>
          </div>
          <div style={{ fontSize: 15, color: "#a1a1aa" }}>{entry.date}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: square ? 900 : 1040 }}>
          <div style={{ fontSize: 16, letterSpacing: 2.1, color: "#d4d4d8", marginBottom: 22 }}>
            {entry.market.toUpperCase()} · {entry.kind.toUpperCase()}
          </div>
          <div
            style={{
              fontSize: titleSize,
              lineHeight: 1.03,
              letterSpacing: square ? -2.3 : -2.8,
              fontWeight: 800,
            }}
          >
            {entry.title}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: subtitleSize,
              lineHeight: 1.35,
              color: "#d4d4d8",
              maxWidth: square ? 880 : 960,
            }}
          >
            {entry.currentState}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #3f3f46", paddingTop: 22 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Lorenza Volponi · volponi.tech</div>
          <div style={{ fontSize: 14, color: "#a1a1aa" }}>{entry.source.publisher} · fonte primária</div>
        </div>
      </div>
    ),
    {
      width,
      height,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
