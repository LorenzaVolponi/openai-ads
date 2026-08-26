import { ImageResponse } from "next/og";

export const runtime = "nodejs";

const IMAGE_VARIANTS = {
  "1x1": { width: 1080, height: 1080 },
  "4x3": { width: 1200, height: 900 },
  "16x9": { width: 1200, height: 675 },
  social: { width: 1200, height: 630 },
} as const;

const RADAR_OG_CARDS = {
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

type ImageVariant = keyof typeof IMAGE_VARIANTS;
type RadarOgCardKey = keyof typeof RADAR_OG_CARDS;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const slug = url.searchParams.get("slug") || "";
  const cardKey = (slug in RADAR_OG_CARDS ? slug : null) as RadarOgCardKey | null;

  if (!cardKey) {
    return new Response("Not found", { status: 404 });
  }

  const entry = RADAR_OG_CARDS[cardKey];
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
          <div style={{ fontSize: 14, color: "#a1a1aa" }}>{entry.publisher} · fonte primária</div>
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
