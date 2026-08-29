const BASE_URL = (process.argv[2] || process.env.INTELLIGENCE_HEALTH_BASE_URL || "https://openai-ads.volponi.tech").replace(/\/$/, "");
const USER_AGENT = "VolponiIntelligenceHealth/1.0 (+https://openai-ads.volponi.tech/metodologia)";

const humanRoutes = [
  "/",
  "/en",
  "/chatgpt-ads-market",
  "/chatgpt-ads-vs-google-ads",
  "/chatgpt-ads-vs-meta-ads",
  "/chatgpt-ads-para-agencias",
  "/imprensa/dados",
];

const machineRoutes = [
  "/intelligence.json",
  "/media-facts.json",
];

const socialCards = [
  "market",
  "googleComparison",
  "metaComparison",
  "agencies",
  "pressData",
  "english",
];

let failures = 0;

function pass(label, detail = "") {
  console.log(`✓ ${label}${detail ? ` — ${detail}` : ""}`);
}

function fail(label, detail = "") {
  failures += 1;
  console.error(`✗ ${label}${detail ? ` — ${detail}` : ""}`);
}

function assert(condition, label, detail = "") {
  condition ? pass(label, detail) : fail(label, detail);
}

function canonicalHref(html) {
  const tag = html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0]
    || html.match(/<link[^>]+href=["'][^"']+["'][^>]+rel=["']canonical["'][^>]*>/i)?.[0]
    || "";
  return tag.match(/href=["']([^"']+)["']/i)?.[1] || "";
}

function normalizeUrl(value) {
  const url = new URL(value, BASE_URL);
  url.hash = "";
  if (url.pathname !== "/") url.pathname = url.pathname.replace(/\/$/, "");
  return url.toString().replace(/\/$/, url.pathname === "/" ? "/" : "");
}

function expectedUrl(path) {
  return normalizeUrl(`${BASE_URL}${path}`);
}

async function request(path, options = {}) {
  return fetch(`${BASE_URL}${path}`, {
    redirect: options.redirect || "follow",
    headers: { "user-agent": USER_AGENT, accept: options.accept || "*/*" },
    signal: AbortSignal.timeout(15000),
  });
}

async function checkHumanRoutes() {
  for (const path of humanRoutes) {
    try {
      const response = await request(path, { accept: "text/html" });
      const html = await response.text();
      const canonical = canonicalHref(html);
      const robots = response.headers.get("x-robots-tag") || "";

      assert(response.status === 200, `${path} returns 200`, `HTTP ${response.status}`);
      assert(!/noindex/i.test(robots), `${path} remains indexable`, robots || "no X-Robots-Tag");
      assert(Boolean(canonical), `${path} exposes canonical`);
      if (canonical) assert(normalizeUrl(canonical) === expectedUrl(path), `${path} canonical is exact`, canonical);
      assert(/Lorenza Volponi/i.test(html), `${path} preserves author entity`);

      if (path === "/en") {
        const language = response.headers.get("content-language") || "";
        assert(language.toLowerCase() === "en", "/en declares English response language", language || "missing");
        assert(/<main[^>]+lang=["']en["']/i.test(html), "/en marks its content language in HTML");
        assert(html.includes(`${BASE_URL}/en`), "/en publishes English alternate URL");
      }
    } catch (error) {
      fail(`${path} request succeeds`, error instanceof Error ? error.message : String(error));
    }
  }
}

async function checkMachineRoutes() {
  for (const path of machineRoutes) {
    try {
      const response = await request(path, { accept: "application/json" });
      const robots = response.headers.get("x-robots-tag") || "";
      const cacheControl = response.headers.get("cache-control") || "";
      const data = await response.json();

      assert(response.status === 200, `${path} returns 200`, `HTTP ${response.status}`);
      assert(/noindex/i.test(robots) && /follow/i.test(robots), `${path} stays machine-readable but out of the index`, robots || "missing");
      assert(/s-maxage=/i.test(cacheControl), `${path} exposes shared-cache policy`, cacheControl || "missing");
      assert(data?.author === "Lorenza Volponi", `${path} preserves Lorenza Volponi authorship`);
      assert(data?.publisher === "volponi.tech", `${path} preserves publisher identity`);
    } catch (error) {
      fail(`${path} machine asset check succeeds`, error instanceof Error ? error.message : String(error));
    }
  }

  try {
    const response = await request("/intelligence.json", { accept: "application/json" });
    const data = await response.json();
    const nodeIds = new Set((data?.graph?.nodes || []).map((node) => node.id));
    for (const id of ["hub", "market", "google", "meta", "agencies", "radar", "press-data"]) {
      assert(nodeIds.has(id), `intelligence graph contains ${id}`);
    }
    assert(Array.isArray(data?.graph?.edges) && data.graph.edges.length >= 10, "intelligence graph exposes semantic edges");
  } catch (error) {
    fail("intelligence graph semantic check succeeds", error instanceof Error ? error.message : String(error));
  }

  try {
    const response = await request("/media-facts.json", { accept: "application/json" });
    const data = await response.json();
    assert(Array.isArray(data?.facts) && data.facts.length >= 6, "media facts exposes citation-ready facts");
    assert(Boolean(data?.citation), "media facts exposes citation guidance");
    assert(Boolean(data?.editorialBoundary), "media facts exposes editorial boundary");
  } catch (error) {
    fail("media facts semantic check succeeds", error instanceof Error ? error.message : String(error));
  }
}

async function checkSitemap() {
  try {
    const response = await request("/sitemap.xml", { accept: "application/xml" });
    const xml = await response.text();
    assert(response.status === 200, "sitemap.xml returns 200", `HTTP ${response.status}`);
    for (const path of humanRoutes) {
      assert(xml.includes(`<loc>${expectedUrl(path)}</loc>`), `sitemap contains ${path}`);
    }
    for (const path of machineRoutes) {
      assert(!xml.includes(`<loc>${expectedUrl(path)}</loc>`), `sitemap excludes ${path}`);
    }
    assert(/hreflang=["']en["']/i.test(xml), "sitemap publishes English hreflang");
    assert(/hreflang=["']pt-BR["']/i.test(xml), "sitemap publishes Portuguese hreflang");
  } catch (error) {
    fail("sitemap intelligence check succeeds", error instanceof Error ? error.message : String(error));
  }
}

async function checkSocialCards() {
  for (const key of socialCards) {
    try {
      const response = await request(`/og/${key}`);
      const contentType = response.headers.get("content-type") || "";
      const bytes = Number(response.headers.get("content-length") || 0);
      assert(response.status === 200, `OG ${key} returns 200`, `HTTP ${response.status}`);
      assert(/^image\//i.test(contentType), `OG ${key} returns an image`, contentType || "missing");
      if (bytes) assert(bytes > 1000, `OG ${key} is not empty`, `${bytes} bytes`);
    } catch (error) {
      fail(`OG ${key} request succeeds`, error instanceof Error ? error.message : String(error));
    }
  }
}

await checkHumanRoutes();
await checkMachineRoutes();
await checkSitemap();
await checkSocialCards();

if (failures > 0) {
  console.error(`\nIntelligence health failed with ${failures} issue(s).`);
  process.exit(1);
}

console.log("\nIntelligence health passed.");
