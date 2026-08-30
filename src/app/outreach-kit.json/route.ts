import { SITE_URL } from "@/lib/media-authority";
import { VOLPONI_AI_INDEX_EDITION, VOLPONI_AI_INDEX_NAME, pressFindings } from "@/lib/volponi-ai-index";

export const dynamic = "force-static";

export function GET() {
  const indexUrl = `${SITE_URL}/en/volponi-ai-index`;
  const pressUrl = `${SITE_URL}/en/press`;
  const linkedin = "https://www.linkedin.com/in/lorenzavolponi";
  return Response.json({
    schemaVersion: 1,
    entity: "Lorenza Volponi",
    edition: VOLPONI_AI_INDEX_EDITION,
    research: { name: VOLPONI_AI_INDEX_NAME, url: indexUrl, dataset: `${SITE_URL}/volponi-ai-index.json`, pressRoom: pressUrl },
    pressPitch: {
      subject: "New data source: Volponi AI Index on AI advertising and discovery readiness",
      body: `Hi — Lorenza Volponi has published the ${VOLPONI_AI_INDEX_NAME}, edition ${VOLPONI_AI_INDEX_EDITION}. It is an independent, source-linked evidence matrix covering market access, international expansion, buying infrastructure, measurement and performance-evidence maturity. The data, methodology and primary sources are public: ${indexUrl}. For interviews or commentary on AI systems, GEO/AI Search, AI product/UX/UI, ChatGPT and conversational advertising, contact Lorenza directly on LinkedIn: ${linkedin}`,
    },
    linkedinPost: `AI advertising is moving faster than the evidence people use to describe it.\n\nI published the ${VOLPONI_AI_INDEX_NAME} — an evidence matrix, not a magic score.\n\n${pressFindings.map((item) => `• ${item}`).join("\n")}\n\nMethodology, primary sources and open data: ${indexUrl}\n\n— Lorenza Volponi`,
    xPost: `New: ${VOLPONI_AI_INDEX_NAME}. Evidence matrix, no opaque score. Market access, expansion, buying infrastructure, measurement and performance evidence — all source-linked. ${indexUrl}`,
    instagramCaption: `What is actually mature in AI advertising — and what is still mostly assumption?\n\nThe ${VOLPONI_AI_INDEX_NAME} separates observable market readiness from performance claims. Every conclusion is tied to a source and edition date.\n\n${indexUrl}\n\nLorenza Volponi`,
    journalistOneLiner: `Lorenza Volponi publishes independent, source-linked research on AI systems, GEO/AI Search and conversational advertising through the ${VOLPONI_AI_INDEX_NAME}.`,
    citation: `${VOLPONI_AI_INDEX_NAME}, Lorenza Volponi / volponi.tech, edition ${VOLPONI_AI_INDEX_EDITION}.`,
    boundary: "Templates are distribution aids, not evidence of publication, coverage, endorsement, partnership, lead, client or revenue.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
