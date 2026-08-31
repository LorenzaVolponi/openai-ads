import { buildVolponiAiIndexRis } from "@/lib/volponi-ai-index-citations";
import { buildHttpContentIntegrity } from "@/lib/http-content-integrity";

export const dynamic = "force-static";

export function GET() {
  const body = buildVolponiAiIndexRis();
  const integrity = buildHttpContentIntegrity(body);

  return new Response(body, {
    headers: {
      "content-type": "application/x-research-info-systems; charset=utf-8",
      "content-disposition": 'inline; filename="volponi-ai-index-2026-08.ris"',
      "x-representation-sha256": integrity.sha256Hex,
      "content-digest": integrity.contentDigest,
      etag: integrity.etag,
    },
  });
}
