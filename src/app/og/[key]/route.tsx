import { ImageResponse } from "next/og";

import { SOCIAL_CARDS, type SocialCardKey } from "@/lib/seo";

export const runtime = "edge";

const SIZE = { width: 1200, height: 630 };

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const cardKey = (key in SOCIAL_CARDS ? key : "home") as SocialCardKey;
  const card = SOCIAL_CARDS[cardKey];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fafaf8",
          color: "#111111",
          padding: "64px 72px",
          border: "1px solid #e4e4e7",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 18,
                background: "#111111",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 28,
                fontWeight: 800,
              }}
            >
              V
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div style={{ fontSize: 22, fontWeight: 800 }}>volponi.tech</div>
              <div style={{ fontSize: 13, letterSpacing: 2.2, color: "#71717a" }}>INDEPENDENT INTELLIGENCE</div>
            </div>
          </div>
          <div style={{ fontSize: 15, color: "#71717a" }}>ChatGPT Ads · 2026</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1030 }}>
          <div style={{ fontSize: 17, letterSpacing: 2.6, color: "#52525b", marginBottom: 22 }}>{card.eyebrow}</div>
          <div style={{ fontSize: 68, lineHeight: 1.02, letterSpacing: -3.4, fontWeight: 800 }}>{card.title}</div>
          <div style={{ marginTop: 28, fontSize: 25, lineHeight: 1.35, color: "#52525b", maxWidth: 960 }}>{card.subtitle}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #d4d4d8", paddingTop: 22 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Lorenza Volponi</div>
          <div style={{ fontSize: 14, color: "#71717a" }}>fonte primária · revisão editorial · dados abertos</div>
        </div>
      </div>
    ),
    {
      ...SIZE,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
