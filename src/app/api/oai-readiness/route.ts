import type { NextRequest } from "next/server";

import { SITE_URL } from "@/lib/editorial-meta";
import {
  buildOaiCrawlerManifest,
  classifyOpenAIUserAgent,
  OAI_CRAWLER_GUIDE_URL,
  OAI_READINESS_REVIEWED_AT,
} from "@/lib/oai-crawler-readiness";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function diagnosticHeaders(detectedCrawler: string | null) {
  const headers = new Headers({
    "Content-Type": "application/json; charset=utf-8",
    "Content-Language": "pt-BR",
    "Cache-Control": "no-store",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "X-Content-Type-Options": "nosniff",
    "Access-Control-Allow-Origin": "*",
    Vary: "User-Agent",
    "X-Volponi-OAI-Readiness": "configured",
    Link: `<${OAI_CRAWLER_GUIDE_URL}>; rel="describedby"`,
  });

  headers.set("X-Volponi-Crawler-Detected", detectedCrawler ?? "other");
  return headers;
}

function payload(request: NextRequest) {
  const rawUserAgent = request.headers.get("user-agent") ?? "";
  const userAgent = rawUserAgent.slice(0, 512);
  const detected = classifyOpenAIUserAgent(userAgent);
  const manifest = buildOaiCrawlerManifest();

  return {
    schemaVersion: 1,
    status: "configured",
    purpose:
      "Public read-only diagnostic endpoint for OpenAI crawler readiness. Requests are not stored by this endpoint.",
    reviewedAt: OAI_READINESS_REVIEWED_AT,
    request: {
      userAgent,
      detectedCrawler: detected?.userAgent ?? null,
      detectedKind: detected?.kind ?? null,
    },
    readiness: {
      robots: `${SITE_URL}/robots.txt`,
      canonicalGuide: OAI_CRAWLER_GUIDE_URL,
      jsonManifest: `${SITE_URL}/oai-crawlers.json`,
      textManifest: `${SITE_URL}/oai-crawlers.txt`,
      expectedPublicLandingPageStatus: 200,
      blockingStatusesToAvoid: [401, 403, 429],
      authenticationRequired: false,
      captchaRequired: false,
    },
    crawlers: manifest.crawlers,
    caveat:
      "This endpoint reports application-level readiness. External WAF, CDN, bot mitigation, geo rules or network controls can still block a crawler and must be validated against the public production domain.",
  };
}

export async function GET(request: NextRequest) {
  const data = payload(request);
  return new Response(`${JSON.stringify(data, null, 2)}\n`, {
    status: 200,
    headers: diagnosticHeaders(data.request.detectedCrawler),
  });
}

export async function HEAD(request: NextRequest) {
  const data = payload(request);
  return new Response(null, {
    status: 200,
    headers: diagnosticHeaders(data.request.detectedCrawler),
  });
}
