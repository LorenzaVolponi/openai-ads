import {
  buildVolponiAiIndexPublication,
  digestVolponiAiIndexPublication,
} from "@/lib/volponi-ai-index-publication";

export const dynamic = "force-static";

export function GET() {
  const publication = buildVolponiAiIndexPublication();
  const contentDigest = digestVolponiAiIndexPublication();

  return Response.json({
    ...publication,
    contentDigest,
    digestScope: "publication payload without digest metadata",
    immutableEdition: false,
  }, {
    headers: {
      "cache-control": "public, max-age=0, s-maxage=3600",
      "x-content-sha256": contentDigest.replace("sha256:", ""),
    },
  });
}
