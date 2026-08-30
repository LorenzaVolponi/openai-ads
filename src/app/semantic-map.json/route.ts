import { SITE_URL } from "@/lib/media-authority";
import { semanticDocuments, semanticEdges, semanticTopics } from "@/lib/semantic-discovery";

export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    canonical: `${SITE_URL}/semantic-map.json`,
    entity: {
      name: "Lorenza Volponi",
      id: "https://volponi.tech/#lorenza-volponi",
      researchProperty: SITE_URL,
    },
    purpose: "Machine-readable semantic map for topic/entity understanding, related-content discovery and AI/search retrieval. It does not claim ranking or external authority.",
    topics: semanticTopics,
    documents: semanticDocuments,
    edges: semanticEdges(4),
    search: `${SITE_URL}/semantic-search.json?q=ChatGPT%20Ads`,
    evidenceBoundary: "Semantic similarity is deterministic editorial metadata, not a claim that two pages are equivalent, endorsed or ranked by a search engine.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
