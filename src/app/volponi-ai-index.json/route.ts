import { indexDimensions, indexMethodology, indexSnapshot, pressFindings, VOLPONI_AI_INDEX_CANONICAL, VOLPONI_AI_INDEX_NAME } from "@/lib/volponi-ai-index";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    name: VOLPONI_AI_INDEX_NAME,
    canonical: VOLPONI_AI_INDEX_CANONICAL,
    author: {
      name: "Lorenza Volponi",
      canonical: "https://volponi.tech/",
      profile: "https://openai-ads.volponi.tech/en/lorenza-volponi",
      linkedin: "https://www.linkedin.com/in/lorenzavolponi",
    },
    snapshot: indexSnapshot,
    dimensions: indexDimensions,
    methodology: indexMethodology,
    mediaReadyFindings: pressFindings,
    evidenceBackbone: {
      radar: "https://openai-ads.volponi.tech/en/radar",
      marketData: "https://openai-ads.volponi.tech/data/chatgpt-ads-markets.json",
      evidence: "https://openai-ads.volponi.tech/evidence.json",
      provenance: "https://openai-ads.volponi.tech/provenance.json",
    },
    boundary: "This index is independent editorial research. It does not claim guaranteed market access, campaign performance, ranking, media coverage or affiliation with OpenAI.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600" } });
}
