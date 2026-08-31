import { buildVolponiAiIndexCsl } from "@/lib/volponi-ai-index-citations";

export const dynamic = "force-static";

export function GET() {
  return Response.json(buildVolponiAiIndexCsl(), {
    headers: {
      "content-type": "application/vnd.citationstyles.csl+json; charset=utf-8",
      "content-disposition": 'inline; filename="volponi-ai-index-2026-08.csl.json"',
    },
  });
}
