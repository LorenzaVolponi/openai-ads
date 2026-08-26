export type RadarOgCard = {
  slug: string;
  date: string;
  kind: string;
  market: string;
  title: string;
  currentState: string;
  publisher: string;
};

// Deliberately minimal media manifest. The full editorial Radar model includes
// datasets and additional derived structures that are unnecessary inside the
// ImageResponse renderer. Keep this projection synchronized with radar-data.ts.
export const RADAR_OG_CARDS: readonly RadarOgCard[] = [
  {
    slug: "ads-manager-nine-markets",
    date: "2026-08-25",
    kind: "availability",
    market: "Global / self-serve",
    title: "Ads Manager aparece disponível em nove países",
    currentState: "9 mercados Available no snapshot auditado em 25/08/2026.",
    publisher: "OpenAI Help Center",
  },
  {
    slug: "chatgpt-ads-europe-31-markets",
    date: "2026-08-24",
    kind: "expansion",
    market: "Europa",
    title: "ChatGPT Ads chega a 31 mercados europeus",
    currentState: "31 mercados europeus com expansão anunciada e entrada em vigor em 24/08/2026.",
    publisher: "OpenAI",
  },
  {
    slug: "chatgpt-ads-brasil-launch",
    date: "2026-08-11",
    kind: "launch",
    market: "Brasil, Reino Unido, México, Japão e Coreia do Sul",
    title: "ChatGPT Ads é lançado no Brasil e em quatro novos mercados",
    currentState: "Brasil e quatro novos mercados oficialmente lançados.",
    publisher: "OpenAI",
  },
  {
    slug: "brazil-expansion-announced",
    date: "2026-05-07",
    kind: "expansion",
    market: "Brasil, Reino Unido, México, Japão e Coreia do Sul",
    title: "OpenAI anuncia próxima onda internacional de Ads",
    currentState: "Brasil incluído formalmente no roadmap de expansão.",
    publisher: "OpenAI",
  },
  {
    slug: "ads-manager-cpc-measurement",
    date: "2026-05-05",
    kind: "platform",
    market: "Plataforma",
    title: "Ads Manager beta e CPC ampliam a infraestrutura publicitária",
    currentState: "Autosserviço beta, CPC e mensuração ampliada entram na plataforma.",
    publisher: "OpenAI",
  },
  {
    slug: "canada-australia-new-zealand-expansion",
    date: "2026-03-26",
    kind: "expansion",
    market: "Canadá, Austrália e Nova Zelândia",
    title: "Piloto começa a sair dos Estados Unidos",
    currentState: "Primeira expansão internacional anunciada.",
    publisher: "OpenAI",
  },
  {
    slug: "us-pilot-starts",
    date: "2026-02-09",
    kind: "launch",
    market: "Estados Unidos",
    title: "Começa o teste de anúncios no ChatGPT",
    currentState: "Piloto iniciado nos EUA para parte dos usuários Free e Go.",
    publisher: "OpenAI",
  },
] as const;

export function getRadarOgCard(slug: string) {
  return RADAR_OG_CARDS.find((entry) => entry.slug === slug) ?? null;
}
