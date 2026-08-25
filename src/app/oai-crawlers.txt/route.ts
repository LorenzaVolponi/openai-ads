import { createHash } from "node:crypto";
import type { NextRequest } from "next/server";

import {
  buildOaiCrawlerTextManifest,
  OAI_CRAWLER_GUIDE_URL,
  OAI_READINESS_REVIEWED_AT,
} from "@/lib/oai-crawler-readiness";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BODY = buildOaiCrawlerTextManifest();
const ETAG = `"sha256-${createHash("sha256").update(BODY).digest("base64url")}"`;
const LAST_MODIFIED = new Date(
  `${OAI_READINESS_REVIEWED_AT}T12:00:00Z`,
).toUTCString();

function headers() {
  return new Headers({
    "Content-Type": "text/plain; charset=utf-8",
    "Content-Language": "pt-BR",
    "Cache-Control":
      "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    "X-Robots-Tag": "noindex, follow",
    "X-Content-Type-Options": "nosniff",
    ETag: ETAG,
    "Last-Modified": LAST_MODIFIED,
    Link: `<${OAI_CRAWLER_GUIDE_URL}>; rel="canonical"`,
  });
}

export async function GET(request: NextRequest) {
  if (request.headers.get("if-none-match") === ETAG) {
    return new Response(null, { status: 304, headers: headers() });
  }

  return new Response(BODY, { status: 200, headers: headers() });
}

export async function HEAD() {
  return new Response(null, { status: 200, headers: headers() });
}
