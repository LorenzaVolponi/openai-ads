import { LAST_EDITORIAL_REVIEW_ISO } from "@/lib/editorial-meta";
import { createFreshnessHeaders } from "@/lib/http-freshness";
import { AUTHOR, PRESS_URL, SITE_URL } from "@/lib/media-authority";
import { radarEntries } from "@/lib/radar-data";

export const dynamic = "force-static";

export function GET() {
  const data = {
    schemaVersion: 1,
    type: "media-source-profile",
    canonical: PRESS_URL,
    reviewedAt: LAST_EDITORIAL_REVIEW_ISO,
    person: {
      name: AUTHOR.name,
      jobTitle: AUTHOR.jobTitle,
      profile: PRESS_URL,
      site: AUTHOR.personalSite,
      linkedin: AUTHOR.linkedin,
      github: AUTHOR.github,
      expertise: AUTHOR.knowsAbout,
    },
    shortBio:
      "Lorenza Volponi é AI systems strategist e builder. Pesquisa como sistemas de IA, busca e publicidade conversacional mudam descoberta, decisão e distribuição de informação. É autora do Volponi ChatGPT Ads Radar, observatório independente com fontes primárias, dados abertos e histórico auditado do mercado.",
    mediaUse:
      "Fonte para entrevistas, comentários de contexto e explicações técnicas sobre ChatGPT Ads, publicidade conversacional, GEO, AI discovery e sistemas de IA.",
    newsroomQuestions: [
      "Como funcionam os anúncios dentro do ChatGPT e o que eles não mudam na resposta?",
      "O que a chegada do ChatGPT Ads ao Brasil muda para anunciantes, agências e publishers?",
      "Quanto custa anunciar no ChatGPT e por que lance recomendado não é benchmark de CPC?",
      "Como medir ChatGPT Ads sem confundir clique, atribuição e causalidade?",
      "O que GEO realmente significa quando buscadores e IAs passam a escolher fontes?",
    ],
    latestSignals: radarEntries.slice(0, 5).map((entry) => ({
      date: entry.date,
      title: entry.title,
      summary: entry.summary,
      market: entry.market,
      url: `${SITE_URL}/radar/${entry.slug}`,
      primarySource: entry.source.url,
    })),
    evidence: {
      radar: `${SITE_URL}/radar`,
      methodology: `${SITE_URL}/metodologia`,
      evidenceLedger: `${SITE_URL}/evidence.json`,
      provenance: `${SITE_URL}/provenance.json`,
      marketsJson: `${SITE_URL}/data/chatgpt-ads-markets.json`,
      marketsCsv: `${SITE_URL}/data/chatgpt-ads-markets.csv`,
      citation: `${SITE_URL}/citation.json`,
    },
    citation:
      "VOLPONI, Lorenza. ChatGPT Ads no Brasil 2026: dados, preços, métricas, Ads Manager e privacidade. volponi.tech, 2026. Disponível em: https://openai-ads.volponi.tech.",
    independence:
      "Projeto editorial independente; não afiliado, patrocinado, endossado, certificado, operado ou mantido pela OpenAI.",
  };

  const body = `${JSON.stringify(data, null, 2)}\n`;
  return new Response(body, {
    headers: createFreshnessHeaders({
      body,
      modifiedAt: LAST_EDITORIAL_REVIEW_ISO,
      contentType: "application/json; charset=utf-8",
    }),
  });
}
