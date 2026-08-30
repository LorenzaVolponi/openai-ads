import {
  buildVolponiAiIndexPublication,
  digestVolponiAiIndexPublication,
  VOLPONI_AI_INDEX_VERSIONED_URL,
} from "@/lib/volponi-ai-index-publication";

export const dynamic = "force-static";

export function GET() {
  const publication = buildVolponiAiIndexPublication();
  const contentDigest = digestVolponiAiIndexPublication();

  return Response.json({
    ...publication,
    canonicalDataset: VOLPONI_AI_INDEX_VERSIONED_URL,
    contentDigest,
    digestScope: "publication payload without digest metadata",
    immutableEdition: true,
  }, {
    headers: {
      "cache-control": "public, max-age=31536000, s-maxage=31536000, immutable",
      "x-content-sha256": contentDigest.replace("sha256:", ""),
    },
  });
}
