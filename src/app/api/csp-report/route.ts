const MAX_REPORT_BYTES = 16_384;

function clipped(value: unknown, limit = 240) {
  return typeof value === "string" ? value.slice(0, limit) : undefined;
}

function safeUrl(value: unknown) {
  if (typeof value !== "string") return undefined;
  try {
    const url = new URL(value);
    if (url.protocol === "data:" || url.protocol === "blob:") return url.protocol;
    return `${url.origin}${url.pathname}`.slice(0, 320);
  } catch {
    return value.slice(0, 120);
  }
}

function normalizeReport(payload: unknown) {
  const record = Array.isArray(payload) ? payload[0] : payload;
  if (!record || typeof record !== "object") return null;

  const outer = record as Record<string, unknown>;
  const bodyCandidate = outer["csp-report"] ?? outer.body ?? outer;
  if (!bodyCandidate || typeof bodyCandidate !== "object") return null;

  const body = bodyCandidate as Record<string, unknown>;
  return {
    effectiveDirective: clipped(body["effective-directive"] ?? body.effectiveDirective),
    violatedDirective: clipped(body["violated-directive"] ?? body.violatedDirective),
    blocked: safeUrl(body["blocked-uri"] ?? body.blockedURL),
    document: safeUrl(body["document-uri"] ?? body.documentURL),
    disposition: clipped(body.disposition),
    statusCode: typeof body["status-code"] === "number" ? body["status-code"] : body.statusCode,
  };
}

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") || "0");
  if (Number.isFinite(length) && length > MAX_REPORT_BYTES) {
    return new Response(null, { status: 413, headers: { "cache-control": "no-store" } });
  }

  let payload: unknown;
  try {
    const text = (await request.text()).slice(0, MAX_REPORT_BYTES);
    payload = text ? JSON.parse(text) : null;
  } catch {
    return new Response(null, { status: 204, headers: { "cache-control": "no-store" } });
  }

  const report = normalizeReport(payload);
  if (report) {
    console.warn("[csp-report]", JSON.stringify(report));
  }

  return new Response(null, {
    status: 204,
    headers: {
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow, noarchive",
    },
  });
}
