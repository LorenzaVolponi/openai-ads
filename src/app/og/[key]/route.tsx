import { ImageResponse } from "next/og";

import { SOCIAL_CARDS, type SocialCardKey } from "@/lib/seo";

export const runtime = "nodejs";

const SOCIAL_SIZE = { width: 1200, height: 630 };
const RADAR_VARIANTS = {
  "1x1": { width: 1080, height: 1080 },
  "4x3": { width: 1200, height: 900 },
  "16x9": { width: 1200, height: 675 },
  social: SOCIAL_SIZE,
} as const;

const RADAR_CARDS = {
  "ads-manager-nine-markets": {
    date: "2026-08-25",
    kind: "availability",
    market: "Global / self-serve",
    title: "Ads Manager aparece disponível em nove países",
    currentState: "9 mercados Available no snapshot auditado em 25/08/2026.",
    publisher: "OpenAI Help Center",
  },
  "chatgpt-ads-europe-31-markets": {
    date: "2026-08-24",
    kind: "expansion",
    market: "Europa",
    title: "ChatGPT Ads chega a 31 mercados europeus",
    currentState: "31 mercados europeus com expansão anunciada e entrada em vigor em 24/08/2026.",
    publisher: "OpenAI",
  },
  "chatgpt-ads-brasil-launch": {
    date: "2026-08-11",
    kind: "launch",
    market: "Brasil, Reino Unido, México, Japão e Coreia do Sul",
    title: "ChatGPT Ads é lançado no Brasil e em quatro novos mercados",
    currentState: "Brasil e quatro novos mercados oficialmente lançados.",
    publisher: "OpenAI",
  },
  "brazil-expansion-announced": {
    date: "2026-05-07",
    kind: "expansion",
    market: "Brasil, Reino Unido, México, Japão e Coreia do Sul",
    title: "OpenAI anuncia próxima onda internacional de Ads",
    currentState: "Brasil incluído formalmente no roadmap de expansão.",
    publisher: "OpenAI",
  },
  "ads-manager-cpc-measurement": {
    date: "2026-05-05",
    kind: "platform",
    market: "Plataforma",
    title: "Ads Manager beta e CPC ampliam a infraestrutura publicitária",
    currentState: "Autosserviço beta, CPC e mensuração ampliada entram na plataforma.",
    publisher: "OpenAI",
  },
  "canada-australia-new-zealand-expansion": {
    date: "2026-03-26",
    kind: "expansion",
    market: "Canadá, Austrália e Nova Zelândia",
    title: "Piloto começa a sair dos Estados Unidos",
    currentState: "Primeira expansão internacional anunciada.",
    publisher: "OpenAI",
  },
  "us-pilot-starts": {
    date: "2026-02-09",
    kind: "launch",
    market: "Estados Unidos",
    title: "Começa o teste de anúncios no ChatGPT",
    currentState: "Piloto iniciado nos EUA para parte dos usuários Free e Go.",
    publisher: "OpenAI",
  },
} as const;

type RadarCardKey = keyof typeof RADAR_CARDS;
type RadarVariant = keyof typeof RADAR_VARIANTS;

function resolveRadarCard(key: string) {
  if (!key.startsWith("radar-")) return null;

  let slug = key.slice("radar-".length);
  let variant: RadarVariant = "social";

  for (const [suffix, candidate] of [
    ["--1x1", "1x1"],
    ["--4x3", "4x3"],
    ["--16x9", "16x9"],
    ["--social", "social"],
  ] as const) {
    if (slug.endsWith(suffix)) {
      slug = slug.slice(0, -suffix.length);
      variant = candidate;
      break;
    }
  }

  if (!(slug in RADAR_CARDS)) return null;

  return {
    card: RADAR_CARDS[slug as RadarCardKey],
    variant,
  };
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string }> }
) {
  const { key } = await params;
  const radar = resolveRadarCard(key);

  if (radar) {
    const { width, height } = RADAR_VARIANTS[radar.variant];
    const square = radar.variant === "1x1";
    const tall = square || radar.variant === "4x3";
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
            <div style={{ fontSize: 15, color: "#a1a1aa" }}>{radar.card.date}</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", maxWidth: square ? 900 : 1040 }}>
            <div style={{ fontSize: 16, letterSpacing: 2.1, color: "#d4d4d8", marginBottom: 22 }}>
              {radar.card.market.toUpperCase()} · {radar.card.kind.toUpperCase()}
            </div>
            <div
              style={{
                fontSize: titleSize,
                lineHeight: 1.03,
                letterSpacing: square ? -2.3 : -2.8,
                fontWeight: 800,
              }}
            >
              {radar.card.title}
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
              {radar.card.currentState}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #3f3f46", paddingTop: 22 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>Lorenza Volponi · volponi.tech</div>
            <div style={{ fontSize: 14, color: "#a1a1aa" }}>{radar.card.publisher} · fonte primária</div>
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
      ...SOCIAL_SIZE,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800",
      },
    }
  );
}
