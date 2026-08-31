import { buildVolponiAiIndexRis } from "@/lib/volponi-ai-index-citations";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildVolponiAiIndexRis(), {
    headers: {
      "content-type": "application/x-research-info-systems; charset=utf-8",
      "content-disposition": 'inline; filename="volponi-ai-index-2026-08.ris"',
    },
  });
}
