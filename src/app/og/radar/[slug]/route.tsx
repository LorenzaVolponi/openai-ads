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

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const entry = radarEntries.find((item) => item.slug === slug);

  if (!entry) {
    return new Response("Not found", { status: 404 });
  }

  const ratio = new URL(request.url).searchParams.get("ratio") as ImageVariant | null;
  const variant: ImageVariant = ratio && ratio in IMAGE_VARIANTS ? ratio : "social";
  const { width, height } = IMAGE_VARIANTS[variant];
  const square = variant === "1x1";
  const tall = square || variant === "4x3";

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
          padding: square ? "70px" : tall ? "64px 72px" : "58px 72px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 17,
                background: "#ffffff",
                color: "#111111",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 26,
                fontWeight: 800,
              }}
            >
              V
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ fontSize: square ? 19 : 21, fontWeight: 800 }}>Volponi ChatGPT Ads Radar</div>
              <div style={{ fontSize: 13, letterSpacing: 2, color: "#a1a1aa" }}>CHANGE LEDGER · PRIMARY SOURCES</div>
            </div>
          </div>
          {!square && <div style={{ fontSize: 16, color: "#a1a1aa" }}>{entry.date}</div>}
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: square ? 890 : 1040 }}>
          <div style={{ fontSize: square ? 16 : 17, letterSpacing: 2.2, color: "#d4d4d8", marginBottom: 20 }}>
            {entry.market.toUpperCase()} · {entry.kind.toUpperCase()} · {entry.date}
          </div>
          <div
            style={{
              fontSize: square ? 58 : tall ? 62 : 66,
              lineHeight: 1.02,
              letterSpacing: square ? -2.4 : -3.1,
              fontWeight: 800,
            }}
          >
            {entry.title}
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: square ? 22 : 23,
              lineHeight: 1.35,
              color: "#d4d4d8",
              maxWidth: square ? 860 : 970,
            }}
          >
            {entry.summary}
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #3f3f46", paddingTop: 22 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Lorenza Volponi · volponi.tech</div>
          {!square && <div style={{ fontSize: 14, color: "#a1a1aa" }}>estado observado · impacto · fonte primária</div>}
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
