import { buildVolponiAiIndexBibtex } from "@/lib/volponi-ai-index-citations";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildVolponiAiIndexBibtex(), {
    headers: {
      "content-type": "application/x-bibtex; charset=utf-8",
      "content-disposition": 'inline; filename="volponi-ai-index-2026-08.bib"',
    },
  });
}
