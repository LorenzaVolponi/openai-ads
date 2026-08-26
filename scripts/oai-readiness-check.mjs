const BASE_URL = (
  process.argv[2] ||
  process.env.OAI_READINESS_BASE_URL ||
  "https://openai-ads.volponi.tech"
).replace(/\/$/, "");

const TEST_USER_AGENT =
  "VolponiOAIReadiness/1.2 (+https://openai-ads.volponi.tech/oai-adsbot-searchbot)";
const CRAWLERS = ["OAI-AdsBot", "OAI-SearchBot", "GPTBot"];
const REVIEWED_AT = "2026-08-26";

let failures = 0;
let checks = 0;

function pass(label, detail = "") {
  checks += 1;
  console.log(`✓ ${label}${detail ? ` — ${detail}` : ""}`);
}

function fail(label, detail = "") {
  checks += 1;
  failures += 1;
  console.error(`✗ ${label}${detail ? ` — ${detail}` : ""}`);
}

function assert(condition, label, detail = "") {
  if (condition) pass(label, detail);
  else fail(label, detail);
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (!headers.has("user-agent")) {
    headers.set("user-agent", options.userAgent || TEST_USER_AGENT);
  }
  if (!headers.has("accept")) headers.set("accept", options.accept || "*/*");

  return fetch(`${BASE_URL}${path}`, {
    method: options.method || "GET",
    redirect: options.redirect || "follow",
    headers,
    signal: AbortSignal.timeout(15000),
  });
}

function hasCrawlerAllowRule(robots, crawler) {
  const escaped = crawler.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(
    `User-agent:\\s*${escaped}[\\s\\S]{0,180}?Allow:\\s*/(?:\\s|$)`,
    "i",
  ).test(robots);
}

// Vercel consumes s-maxage/SWR from Cache-Control before forwarding the
// response. CDN-Cache-Control remains externally observable and is therefore
// the production invariant for shared-cache policy.
function assertCachePolicy(response, label) {
  const browserCache = response.headers.get("cache-control") || "";
  const cdnCache = response.headers.get("cdn-cache-control") || "";

  assert(
    /max-age=300/i.test(browserCache),
    `${label} exposes browser-cache policy`,
    browserCache || "missing",
  );
  assert(
    /max-age=3600/i.test(cdnCache) &&
      /stale-while-revalidate=86400/i.test(cdnCache),
    `${label} exposes CDN shared-cache policy`,
    cdnCache || "missing",
  );
}

async function checkRobots() {
  try {
    const response = await request("/robots.txt");
    const body = await response.text();
    assert(response.status === 200, "robots.txt returns 200", `HTTP ${response.status}`);
    for (const crawler of CRAWLERS) {
      assert(hasCrawlerAllowRule(body, crawler), `robots.txt explicitly allows ${crawler}`);
    }
  } catch (error) {
    fail("robots.txt readiness check succeeds", error instanceof Error ? error.message : String(error));
  }
}

async function checkManifestJson() {
  try {
    const response = await request("/oai-crawlers.json", {
      accept: "application/json",
    });
    const contentType = response.headers.get("content-type") || "";
    const robots = response.headers.get("x-robots-tag") || "";
    const etag = response.headers.get("etag") || "";
    const lastModified = response.headers.get("last-modified") || "";
    const link = response.headers.get("link") || "";
    const data = await response.json();

    assert(response.status === 200, "crawler JSON manifest returns 200", `HTTP ${response.status}`);
    assert(/application\/json/i.test(contentType), "crawler JSON manifest has JSON content-type", contentType);
    assert(/noindex/i.test(robots) && /follow/i.test(robots), "crawler JSON is crawlable but noindex", robots);
    assert(Boolean(etag), "crawler JSON exposes deterministic ETag", etag || "missing");
    assert(Boolean(lastModified) && !Number.isNaN(Date.parse(lastModified)), "crawler JSON exposes valid Last-Modified", lastModified || "missing");
    assertCachePolicy(response, "crawler JSON");
    assert(link.includes("/oai-adsbot-searchbot"), "crawler JSON points to human canonical", link || "missing");
    assert(Number(data?.schemaVersion) >= 2, "crawler JSON schema is backend v2+", String(data?.schemaVersion || "missing"));
    assert(data?.reviewedAt === REVIEWED_AT, "crawler JSON publishes current technical review date", String(data?.reviewedAt || "missing"));
    assert(data?.crawlers?.["OAI-AdsBot"]?.advertiserPriority === "required", "OAI-AdsBot is marked required");
    assert(
      String(data?.crawlers?.["OAI-SearchBot"]?.advertiserPriority || "").includes("recommended"),
      "OAI-SearchBot is marked recommended",
    );
    assert(data?.crawlers?.GPTBot?.kind === "training-control", "GPTBot remains a separate control");
    assert(
      String(data?.crawlers?.GPTBot?.documentedUses || "").includes("potential training"),
      "GPTBot manifest explains potential-training control",
    );
    assert(
      data?.crawlers?.["OAI-SearchBot"]?.referralSignal === "utm_source=chatgpt.com",
      "OAI-SearchBot exposes ChatGPT referral signal",
    );

    const diagnosticEndpoint = String(data?.siteImplementation?.diagnosticEndpoint || "");
    let expectedDiagnostic = "";
    try {
      expectedDiagnostic = `${new URL(String(data?.canonical || BASE_URL)).origin}/api/oai-readiness`;
    } catch {
      expectedDiagnostic = `${BASE_URL}/api/oai-readiness`;
    }
    assert(
      diagnosticEndpoint === expectedDiagnostic,
      "manifest advertises diagnostic endpoint",
      diagnosticEndpoint || "missing",
    );

    if (etag) {
      const conditional = await request("/oai-crawlers.json", {
        headers: { "If-None-Match": etag },
      });
      assert(conditional.status === 304, "crawler JSON supports conditional GET", `HTTP ${conditional.status}`);
    }
  } catch (error) {
    fail("crawler JSON readiness check succeeds", error instanceof Error ? error.message : String(error));
  }
}

async function checkManifestText() {
  try {
    const response = await request("/oai-crawlers.txt", { accept: "text/plain" });
    const body = await response.text();
    const contentType = response.headers.get("content-type") || "";
    const robots = response.headers.get("x-robots-tag") || "";
    const etag = response.headers.get("etag") || "";
    const lastModified = response.headers.get("last-modified") || "";

    assert(response.status === 200, "crawler text manifest returns 200", `HTTP ${response.status}`);
    assert(/text\/plain/i.test(contentType), "crawler text manifest has text content-type", contentType);
    assert(/noindex/i.test(robots) && /follow/i.test(robots), "crawler text is crawlable but noindex", robots);
    assert(body.includes("OAI-AdsBot") && body.includes("OAI-SearchBot"), "crawler text describes ads and search crawlers");
    assert(body.includes("GPTBot"), "crawler text preserves GPTBot distinction");
    assert(body.includes(`Last reviewed: ${REVIEWED_AT}`), "crawler text publishes current technical review date");
    assert(body.includes("utm_source=chatgpt.com"), "crawler text exposes ChatGPT referral signal");
    assert(Boolean(etag), "crawler text exposes deterministic ETag", etag || "missing");
    assert(Boolean(lastModified) && !Number.isNaN(Date.parse(lastModified)), "crawler text exposes valid Last-Modified", lastModified || "missing");
    assertCachePolicy(response, "crawler text");
  } catch (error) {
    fail("crawler text readiness check succeeds", error instanceof Error ? error.message : String(error));
  }
}

async function checkPublicCrawlerAccess() {
  for (const crawler of CRAWLERS) {
    for (const path of ["/", "/oai-adsbot-searchbot"]) {
      try {
        const response = await request(path, { userAgent: crawler });
        const auth = response.headers.get("www-authenticate") || "";
        const cfMitigated = response.headers.get("cf-mitigated") || "";
        assert(response.status === 200, `${crawler} can fetch ${path}`, `HTTP ${response.status}`);
        assert(!auth, `${crawler} sees no authentication challenge at ${path}`, auth || "none");
        assert(cfMitigated.toLowerCase() !== "challenge", `${crawler} sees no CDN challenge at ${path}`, cfMitigated || "none");
      } catch (error) {
        fail(`${crawler} public access check for ${path}`, error instanceof Error ? error.message : String(error));
      }
    }
  }
}

async function checkDiagnosticEndpoint() {
  for (const crawler of CRAWLERS) {
    try {
      const response = await request("/api/oai-readiness", {
        userAgent: crawler,
        accept: "application/json",
      });
      const data = await response.json();
      const robots = response.headers.get("x-robots-tag") || "";
      const cacheControl = response.headers.get("cache-control") || "";
      const vary = response.headers.get("vary") || "";
      const readiness = response.headers.get("x-volponi-oai-readiness") || "";
      const detected = response.headers.get("x-volponi-crawler-detected") || "";

      assert(response.status === 200, `diagnostic endpoint answers ${crawler}`, `HTTP ${response.status}`);
      assert(data?.status === "configured", `diagnostic reports configured for ${crawler}`);
      assert(data?.request?.detectedCrawler === crawler, `diagnostic identifies ${crawler}`, String(data?.request?.detectedCrawler || "missing"));
      assert(readiness === "configured", `diagnostic response header confirms readiness for ${crawler}`, readiness || "missing");
      assert(detected === crawler, `diagnostic response header identifies ${crawler}`, detected || "missing");
      assert(/noindex/i.test(robots) && /nofollow/i.test(robots), "diagnostic endpoint is excluded from search index", robots || "missing");
      assert(/no-store/i.test(cacheControl), "diagnostic endpoint is not cached", cacheControl || "missing");
      assert(/user-agent/i.test(vary), "diagnostic endpoint varies by User-Agent", vary || "missing");
    } catch (error) {
      fail(`diagnostic readiness check for ${crawler}`, error instanceof Error ? error.message : String(error));
    }
  }
}

async function checkGuideDiscoveryHeaders() {
  try {
    const response = await request("/oai-adsbot-searchbot");
    const link = response.headers.get("link") || "";
    assert(response.status === 200, "crawler guide returns 200", `HTTP ${response.status}`);
    assert(link.includes("/oai-crawlers.json"), "crawler guide advertises JSON manifest", link || "missing");
    assert(link.includes("/oai-crawlers.txt"), "crawler guide advertises text manifest", link || "missing");
  } catch (error) {
    fail("crawler guide discovery header check succeeds", error instanceof Error ? error.message : String(error));
  }
}

await checkRobots();
await checkManifestJson();
await checkManifestText();
await checkPublicCrawlerAccess();
await checkDiagnosticEndpoint();
await checkGuideDiscoveryHeaders();

console.log(`\nOpenAI crawler readiness: ${checks - failures}/${checks} checks passed.`);
if (failures > 0) {
  console.error(`${failures} OpenAI crawler readiness invariant(s) failed.`);
  process.exit(1);
}
