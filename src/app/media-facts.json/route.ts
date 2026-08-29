import { SOURCES } from "@/lib/authority-data";
import { createFreshnessHeaders } from "@/lib/http-freshness";
import { SITE_URL } from "@/lib/media-authority";
import { marketStates, RADAR_CHECKED_AT } from "@/lib/radar-data";

export const dynamic = "force-static";

export function GET() {
  const available = marketStates.filter((market) => market.adsManager === "Available").length;
  const comingSoon = marketStates.filter((market) => market.adsManager === "Coming Soon").length;

  const data = {
    schemaVersion: 1,
    type: "independent editorial media factsheet",
    canonical: `${SITE_URL}/imprensa/dados`,
    publisher: "volponi.tech",
    author: "Lorenza Volponi",
    language: "pt-BR",
    reviewedAt: RADAR_CHECKED_AT,
    citation: `VOLPONI, Lorenza. ChatGPT Ads Market Snapshot. volponi.tech, revisão factual em ${RADAR_CHECKED_AT}. ${SITE_URL}/chatgpt-ads-market`,
    facts: [
      { id: "ads-manager-available-markets", value: available, unit: "markets", statement: `${available} mercados aparecem como Available no snapshot auditado do Ads Manager.`, caveat: "Status de mercado não garante acesso uniforme, inventário, entrega ou performance.", source: SOURCES.availability.url },
      { id: "ads-manager-coming-soon-markets", value: comingSoon, unit: "markets", statement: `${comingSoon} mercados aparecem como Coming Soon no snapshot auditado.`, caveat: "Expansão de anúncios e disponibilidade de autosserviço são estados diferentes.", source: SOURCES.availability.url },
      { id: "brazil-status", value: "Available", statement: "Brasil aparece como Available na superfície oficial auditada.", caveat: "Confirme a própria conta antes de decisão operacional.", source: SOURCES.availability.url },
      { id: "brazil-daily-campaign-minimum", value: 40, currency: "BRL", period: "day", statement: "A documentação registra mínimo diário de 40 BRL por campanha no Brasil.", caveat: "Mínimo de plataforma não é recomendação de orçamento nem garantia de aprendizado.", source: SOURCES.campaignSetup.url },
      { id: "ad-supported-plans", value: ["Free", "Go"], statement: "Anúncios podem aparecer nos planos Free e Go.", caveat: "Elegibilidade e disponibilidade continuam condicionais.", source: SOURCES.generalAds.url },
      { id: "answer-independence", value: true, statement: "O anúncio não compra nem altera a resposta do ChatGPT.", caveat: "Resposta e sistema publicitário devem ser tratados como camadas separadas.", source: SOURCES.generalAds.url },
    ],
    machineReadable: {
      pressKit: `${SITE_URL}/press-kit.json`,
      citation: `${SITE_URL}/citation.json`,
      marketJson: `${SITE_URL}/data/chatgpt-ads-markets.json`,
      marketCsv: `${SITE_URL}/data/chatgpt-ads-markets.csv`,
      intelligenceGraph: `${SITE_URL}/intelligence.json`,
    },
    editorialBoundary: "Snapshot temporal baseado em fontes primárias. Não representa afiliação com a OpenAI, benchmark de performance ou garantia de cobertura, ranking, inventário ou aprovação.",
  };

  const body = JSON.stringify(data, null, 2);
  return new Response(body, {
    headers: createFreshnessHeaders({ body, modifiedAt: `${RADAR_CHECKED_AT}T12:00:00Z`, contentType: "application/json; charset=utf-8" }),
  });
}
