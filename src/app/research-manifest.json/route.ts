import {
  digestVolponiAiIndexPublication,
  RESEARCH_MANIFEST_URL,
  VOLPONI_AI_INDEX_VERSIONED_URL,
} from "@/lib/volponi-ai-index-publication";
import {
  VOLPONI_AI_INDEX_CANONICAL,
  VOLPONI_AI_INDEX_EDITION,
  VOLPONI_AI_INDEX_NAME,
} from "@/lib/volponi-ai-index";
import { LORENZA_ENTITY_ID } from "@/lib/lorenza-authority";
import { SITE_URL } from "@/lib/media-authority";

export const dynamic = "force-static";

export function GET() {
  const contentDigest = digestVolponiAiIndexPublication();

  return Response.json({
    schemaVersion: 1,
    canonical: RESEARCH_MANIFEST_URL,
    publisher: "volponi.tech",
    authorEntity: LORENZA_ENTITY_ID,
    research: [
      {
        id: "volponi-ai-index",
        name: VOLPONI_AI_INDEX_NAME,
        edition: VOLPONI_AI_INDEX_EDITION,
        page: VOLPONI_AI_INDEX_CANONICAL,
        latestDataset: `${SITE_URL}/volponi-ai-index.json`,
        versionedDataset: VOLPONI_AI_INDEX_VERSIONED_URL,
        contentDigest,
        digestAlgorithm: "SHA-256",
        methodology: `${VOLPONI_AI_INDEX_CANONICAL}#methodology`,
        evidence: `${SITE_URL}/evidence.json`,
        provenance: `${SITE_URL}/provenance.json`,
        citation: `${VOLPONI_AI_INDEX_NAME}, Lorenza Volponi / volponi.tech, edition ${VOLPONI_AI_INDEX_EDITION}.`,
      },
    ],
    boundary:
      "This manifest describes independent editorial research objects. It is not evidence of endorsement, publication by a third party, media coverage, ranking or commercial performance.",
  }, {
    headers: {
      "cache-control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
