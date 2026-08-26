import { ImageResponse } from "next/og";

export const runtime = "nodejs";

export async function GET() {
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
          padding: "56px 70px",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            <div style={{ fontSize: 22, fontWeight: 800 }}>Volponi ChatGPT Ads Radar</div>
            <div style={{ fontSize: 13, letterSpacing: 2.1, color: "#a1a1aa" }}>CHANGE LEDGER · PRIMARY SOURCES</div>
          </div>
          <div style={{ fontSize: 15, color: "#a1a1aa" }}>2026-08-25</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", maxWidth: 1040 }}>
          <div style={{ fontSize: 16, letterSpacing: 2.1, color: "#d4d4d8", marginBottom: 22 }}>
            GLOBAL / SELF-SERVE · AVAILABILITY
          </div>
          <div
            style={{
              fontSize: 64,
              lineHeight: 1.03,
              letterSpacing: -2.8,
              fontWeight: 800,
            }}
          >
            Ads Manager aparece disponível em nove países
          </div>
          <div
            style={{
              marginTop: 26,
              fontSize: 22,
              lineHeight: 1.35,
              color: "#d4d4d8",
              maxWidth: 960,
            }}
          >
            9 mercados Available no snapshot auditado em 25/08/2026.
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #3f3f46", paddingTop: 22 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Lorenza Volponi · volponi.tech</div>
          <div style={{ fontSize: 14, color: "#a1a1aa" }}>OpenAI Help Center · fonte primária</div>
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
