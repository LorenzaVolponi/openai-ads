import {
  buildVolponiAiIndexPublication,
  digestVolponiAiIndexPublication,
  VOLPONI_AI_INDEX_VERSIONED_URL,
} from "@/lib/volponi-ai-index-publication";
import {
  VOLPONI_AI_INDEX_BIBTEX_URL,
  VOLPONI_AI_INDEX_CSL_URL,
  VOLPONI_AI_INDEX_RIS_URL,
} from "@/lib/volponi-ai-index-citations";
import { buildHttpContentIntegrity } from "@/lib/http-content-integrity";

export const dynamic = "force-static";

export function GET() {
  const publication = buildVolponiAiIndexPublication();
  const publicationDigest = digestVolponiAiIndexPublication();
  const payload = {
    ...publication,
    canonicalDataset: VOLPONI_AI_INDEX_VERSIONED_URL,
    contentDigest: publicationDigest,
    digestScope: "publication payload without digest metadata",
    immutableEdition: true,
  };
  const body = `${JSON.stringify(payload, null, 2)}\n`;
  const integrity = buildHttpContentIntegrity(body);

  return new Response(body, {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=31536000, s-maxage=31536000, immutable",
      "x-content-sha256": publicationDigest.replace("sha256:", ""),
      "x-representation-sha256": integrity.sha256Hex,
      "content-digest": integrity.contentDigest,
      etag: integrity.etag,
      link: [
        `<${VOLPONI_AI_INDEX_BIBTEX_URL}>; rel="alternate"; type="application/x-bibtex"`,
        `<${VOLPONI_AI_INDEX_RIS_URL}>; rel="alternate"; type="application/x-research-info-systems"`,
        `<${VOLPONI_AI_INDEX_CSL_URL}>; rel="alternate"; type="application/vnd.citationstyles.csl+json"`,
      ].join(", "),
    },
  });
}
