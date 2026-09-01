import { buildSourceLifecycle } from "@/lib/source-lifecycle";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json(buildSourceLifecycle(new Date()), {
    headers: {
      "cache-control": "public, max-age=60, s-maxage=300, stale-while-revalidate=900",
      "x-robots-tag": "noindex, follow",
    },
  });
}
