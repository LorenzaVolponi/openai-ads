const BASE_URL = (process.argv[2] || process.env.SEO_HEALTH_BASE_URL || "https://openai-ads.volponi.tech").replace(/\/$/, "");
const USER_AGENT = "VolponiSEOHealth/1.3 (+https://openai-ads.volponi.tech/metodologia)";

const canonicalPages = [
  ["/", "/"],
  ["/chatgpt-ads-brasil", "/chatgpt-ads-brasil"],
  ["/chatgpt-ads-precos", "/chatgpt-ads-precos"],
  ["/chatgpt-ads-metricas", "/chatgpt-ads-metricas"],
  ["/ads-manager-chatgpt", "/ads-manager-chatgpt"],
  ["/chatgpt-ads-privacidade", "/chatgpt-ads-privacidade"],
  ["/radar", "/radar"],
  ["/imprensa", "/imprensa"],
  ["/metodologia", "/metodologia"],
];

const aliases = [
  ["/chatgpt-ads", "/"],
  ["/gpt-ads", "/"],
  ["/ads-gpt", "/"],
  ["/openai-ads", "/"],
  ["/anuncios-chatgpt", "/"],
  ["/chatgpt-ads-brasil-2026", "/chatgpt-ads-brasil"],
  ["/openai-ads-manager", "/ads-manager-chatgpt"],
  ["/chatgpt-ads-manager", "/ads-manager-chatgpt"],
  ["/quanto-custa-anunciar-no-chatgpt", "/chatgpt-ads-precos"],
  ["/metricas-chatgpt-ads", "/chatgpt-ads-metricas"],
];

const machineOnly = [
  "/feed.xml",
  "/feed.json",
  "/knowledge.json",
  "/citation.json",
  "/provenance.json",
  "/evidence.json",
  "/press-kit.json",
  "/llms.txt",
  "/llms-full.txt",
  "/humans.txt",
  "/data/chatgpt-ads-markets.json",
  "/data/chatgpt-ads-markets.csv",
];

const freshnessAssets = [
  "/feed.xml",
  "/feed.json",
  "/provenance.json",
  "/evidence.json",
  "/press-kit.json",
  "/data/chatgpt-ads-markets.json",
  "/data/chatgpt-ads-markets.csv",
];

const sitemapRequired = [
  "/",
  "/chatgpt-ads-brasil",
  "/chatgpt-ads-precos",
  "/chatgpt-ads-metricas",
  "/ads-manager-chatgpt",
  "/chatgpt-ads-privacidade",
  "/radar",
  "/imprensa",
  "/metodologia",
];

const sitemapForbidden = [
  ...aliases.map(([path]) => path),
  ...machineOnly,
];

const results = [];
let failures = 0;

function normalizeUrl(value) {
  const url = new URL(value, BASE_URL);
  url.hash = "";
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/$/, "");
  return url.toString().replace(/\/$/, url.pathname === "/" ? "/" : "");
}

function expectedUrl(path) {
  return normalizeUrl(`${BASE_URL}${path}`);
}

function pass(label, detail = "") {
  results.push({ ok: true, label, detail });
  console.log(`✓ ${label}${detail ? ` — ${detail}` : ""}`);
}

function fail(label, detail = "") {
  failures += 1;
  results.push({ ok: false, label, detail });
  console.error(`✗ ${label}${detail ? ` — ${detail}` : ""}`);
}

function assert(condition, label, detail = "") {
  condition ? pass(label, detail) : fail(label, detail);
}

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, {
    redirect: options.redirect || "follow",
    headers: { "user-agent": USER_AGENT, accept: options.accept || "*/*" },
    signal: AbortSignal.timeout(15000),
  });
  return response;
}

function metaContent(html, property, value) {
  const patternA = new RegExp(`<meta[^>]+${property}=["']${value}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i");
  const patternB = new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+${property}=["']${value}["'][^>]*>`, "i");
  return html.match(patternA)?.[1] || html.match(patternB)?.[1] || "";
}

function canonicalHref(html) {
  const tag = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0]
    || html.match(/<link[^>]+href=["'][^"']+["'][^>]+rel=["']canonical["'][^>]*>/i)?.[0]
    || "";
  return tag.match(/href=["']([^"']+)["']/i)?.[1] || "";
}

async function checkCanonicalPages() {
  for (const [path, canonicalPath] of canonicalPages) {
    try {
      const response = await request(path);
      const html = await response.text();
      const robots = response.headers.get("x-robots-tag") || "";
      const language = response.headers.get("content-language") || "";
      const canonical = canonicalHref(html);
      const ogTitle = metaContent(html, "property", "og:title");
      const ogImage = metaContent(html, "property", "og:image");

      assert(response.status === 200, `${path} returns 200`, `HTTP ${response.status}`);
      assert(!/noindex/i.test(robots), `${path} remains indexable`, robots || "no X-Robots-Tag");
      assert(language.toLowerCase().includes("pt-br"), `${path} declares pt-BR`, language || "missing Content-Language");
      assert(Boolean(canonical), `${path} exposes canonical`);
      if (canonical) {
        assert(normalizeUrl(canonical) === expectedUrl(canonicalPath), `${path} canonical is exact`, canonical);
      }
      assert(/<html[^>]+lang=["']pt-BR["']/i.test(html), `${path} HTML language is pt-BR`);
      assert(Boolean(ogTitle), `${path} exposes og:title`);
      assert(Boolean(ogImage), `${path} exposes og:image`);
      assert(/Lorenza Volponi/i.test(html), `${path} preserves Lorenza Volponi entity`);
    } catch (error) {
      fail(`${path} request succeeds`, error instanceof Error ? error.message : String(error));
    }
  }
}

async function checkAliases() {
  for (const [source, destination] of aliases) {
    try {
      const response = await request(source, { redirect: "manual" });
      const location = response.headers.get("location") || "";
      assert([301, 308].includes(response.status), `${source} is permanent redirect`, `HTTP ${response.status}`);
      assert(Boolean(location), `${source} exposes Location`, location || "missing");
      if (location) {
        assert(normalizeUrl(location) === expectedUrl(destination), `${source} consolidates authority`, location);
      }
    } catch (error) {
      fail(`${source} redirect check succeeds`, error instanceof Error ? error.message : String(error));
    }
  }
}

async function checkMachineOnly() {
  for (const path of machineOnly) {
    try {
      const response = await request(path);
      const robots = response.headers.get("x-robots-tag") || "";
      assert(response.status === 200, `${path} remains available`, `HTTP ${response.status}`);
      assert(/noindex/i.test(robots), `${path} stays out of traditional index`, robots || "missing X-Robots-Tag");
      assert(/follow/i.test(robots), `${path} remains crawlable`, robots || "missing X-Robots-Tag");
    } catch (error) {
      fail(`${path} machine asset check succeeds`, error instanceof Error ? error.message : String(error));
    }
  }
}

async function checkFreshnessSignals() {
  for (const path of freshnessAssets) {
    try {
      const response = await request(path);
      const etag = response.headers.get("etag") || "";
      const lastModified = response.headers.get("last-modified") || "";
      const cacheControl = response.headers.get("cache-control") || "";
      const language = response.headers.get("content-language") || "";

      assert(Boolean(etag), `${path} exposes deterministic ETag`, etag || "missing");
      assert(Boolean(lastModified) && !Number.isNaN(Date.parse(lastModified)), `${path} exposes valid Last-Modified`, lastModified || "missing");
      assert(/s-maxage=/i.test(cacheControl), `${path} exposes shared-cache policy`, cacheControl || "missing");
      assert(language.toLowerCase().includes("pt-br"), `${path} declares pt-BR`, language || "missing");
    } catch (error) {
      fail(`${path} freshness check succeeds`, error instanceof Error ? error.message : String(error));
    }
  }
}

async function checkDiscovery() {
  try {
    const response = await request("/robots.txt");
    const body = await response.text();
    assert(response.status === 200, "robots.txt returns 200", `HTTP ${response.status}`);
    assert(body.includes(`${BASE_URL}/sitemap.xml`), "robots.txt advertises canonical sitemap");
    assert(/OAI-SearchBot/i.test(body), "robots.txt allows OAI-SearchBot explicitly");
    assert(/OAI-AdsBot/i.test(body), "robots.txt allows OAI-AdsBot explicitly");
    assert(/GPTBot/i.test(body), "robots.txt allows GPTBot explicitly");
  } catch (error) {
    fail("robots.txt check succeeds", error instanceof Error ? error.message : String(error));
  }

  try {
    const response = await request("/sitemap.xml");
    const body = await response.text();
    assert(response.status === 200, "sitemap.xml returns 200", `HTTP ${response.status}`);
    for (const path of sitemapRequired) {
      assert(body.includes(expectedUrl(path)), `sitemap contains ${path}`);
    }
    for (const path of sitemapForbidden) {
      assert(!body.includes(expectedUrl(path)), `sitemap excludes ${path}`);
    }
  } catch (error) {
    fail("sitemap.xml check succeeds", error instanceof Error ? error.message : String(error));
  }

  try {
    const response = await request("/og/home");
    const contentType = response.headers.get("content-type") || "";
    assert(response.status === 200, "dynamic OG image returns 200", `HTTP ${response.status}`);
    assert(/^image\//i.test(contentType), "dynamic OG route returns an image", contentType || "missing content-type");
  } catch (error) {
    fail("dynamic OG check succeeds", error instanceof Error ? error.message : String(error));
  }

  try {
    const response = await request("/knowledge.json");
    const data = await response.json();
    const rawAliases = data?.searchEntity?.aliases ?? data?.entity?.aliases ?? [];
    const aliasesFromKnowledge = Array.isArray(rawAliases) ? rawAliases.map((value) => String(value).toLowerCase()) : [];
    assert(data?.canonical === BASE_URL, "knowledge.json canonical matches production", String(data?.canonical || "missing"));
    for (const term of ["chatgpt ads", "gpt ads", "ads gpt", "openai ads"]) {
      assert(aliasesFromKnowledge.includes(term), `knowledge.json maps alias: ${term}`);
    }
    assert(data?.discovery?.openAICrawlers?.["OAI-SearchBot"]?.allowed === true, "knowledge.json declares OAI-SearchBot discovery policy");
    assert(data?.discovery?.openAICrawlers?.["OAI-AdsBot"]?.allowed === true, "knowledge.json declares OAI-AdsBot readiness policy");
    assert(/not presented as an organic ranking signal/i.test(data?.discovery?.openAICrawlers?.["OAI-AdsBot"]?.rankingCaveat || ""), "knowledge.json avoids overstating AdsBot as an SEO ranking signal");
  } catch (error) {
    fail("knowledge.json semantic check succeeds", error instanceof Error ? error.message : String(error));
  }
}

await checkCanonicalPages();
await checkAliases();
await checkMachineOnly();
await checkFreshnessSignals();
await checkDiscovery();

console.log(`\nSEO authority health: ${results.length - failures}/${results.length} checks passed.`);
if (failures > 0) {
  console.error(`${failures} SEO authority invariant(s) failed.`);
  process.exit(1);
}
