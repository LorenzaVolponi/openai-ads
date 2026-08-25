import { ImageResponse } from "next/og";

import { radarEntries } from "@/lib/radar-data";

export const runtime = "edge";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const entry = radarEntries.find((item) => item.slug === slug);

  if (!entry) {
    return new Response("Not found", { status: 404 });
  }

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
          padding: "62px 72px",
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
              <div style={{ fontSize: 21, fontWeight: 800 }}>Volponi ChatGPT Ads Radar</div>
              <div style={{ fontSize: 13, letterSpacing: 2, color: "#a1a1aa" }}>CHANGE LEDGER · PRIMARY SOURCES</div>
            </div>
          </div>
          <div style={{ fontSize: 16, color: "#a1a1aa" }}>{entry.date}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1040 }}>
          <div style={{ fontSize: 17, letterSpacing: 2.2, color: "#d4d4d8", marginBottom: 20 }}>{entry.market.toUpperCase()} · {entry.kind.toUpperCase()}</div>
          <div style={{ fontSize: 66, lineHeight: 1.02, letterSpacing: -3.1, fontWeight: 800 }}>{entry.title}</div>
          <div style={{ marginTop: 26, fontSize: 23, lineHeight: 1.35, color: "#d4d4d8", maxWidth: 970 }}>{entry.summary}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #3f3f46", paddingTop: 22 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Lorenza Volponi · volponi.tech</div>
          <div style={{ fontSize: 14, color: "#a1a1aa" }}>estado observado · impacto · fonte primária</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
