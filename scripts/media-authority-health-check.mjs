const BASE_URL = (process.argv[2] || process.env.MEDIA_AUTHORITY_BASE_URL || "https://openai-ads.volponi.tech").replace(/\/$/, "");
const USER_AGENT = "VolponiMediaAuthorityHealth/1.2 (+https://openai-ads.volponi.tech/imprensa)";

const RADAR_SLUGS = [
  "ads-manager-nine-markets",
  "chatgpt-ads-europe-31-markets",
  "chatgpt-ads-brasil-launch",
  "brazil-expansion-announced",
  "ads-manager-cpc-measurement",
  "canada-australia-new-zealand-expansion",
  "us-pilot-starts",
];

let failures = 0;
const pass = (label) => console.log(`✓ ${label}`);
const fail = (label, detail = "") => {
  failures += 1;
  console.error(`✗ ${label}${detail ? ` — ${detail}` : ""}`);
};
const assert = (condition, label, detail = "") => (condition ? pass(label) : fail(label, detail));

async function request(path, accept = "*/*") {
  return fetch(`${BASE_URL}${path}`, {
    headers: { "user-agent": USER_AGENT, accept },
    signal: AbortSignal.timeout(15000),
  });
}

async function checkAuthorityLinkHeaders(path) {
  const response = await request(path, "text/html");
  const links = response.headers.get("link") || "";
  assert(response.status === 200, `${path} returns 200 for authority-link verification`, `HTTP ${response.status}`);
  assert(links.includes(`${BASE_URL}/imprensa`) && /rel="author"/i.test(links), `${path} exposes author Link header`);
  assert(links.includes(`${BASE_URL}/citation.json`) && /rel="cite-as"/i.test(links), `${path} exposes cite-as Link header`);
  assert(links.includes(`${BASE_URL}/provenance.json`) && /rel="describedby"/i.test(links), `${path} exposes provenance Link header`);
  assert(links.includes(`${BASE_URL}/data-catalog.json`), `${path} exposes data-catalog discovery Link header`);
  assert(links.includes(`${BASE_URL}/feed.xml`) && /application\/rss\+xml/i.test(links), `${path} exposes RSS discovery Link header`);
}

async function checkPressPage() {
  const response = await request("/imprensa", "text/html");
  const html = await response.text();
  assert(response.status === 200, "press page returns 200", `HTTP ${response.status}`);
  assert(/Lorenza Volponi/i.test(html), "press page names Lorenza Volponi");
  assert(/ChatGPT Ads/i.test(html), "press page establishes ChatGPT Ads expertise");
  assert(/fonte para imprensa/i.test(html), "press page states media-source purpose");
  assert(/ProfilePage/i.test(html), "press page exposes ProfilePage structured data");
  assert(/AI Systems Strategist/i.test(html), "press page exposes expert role");
  assert(/\/press-kit\.json/i.test(html), "press page links the machine-readable press kit");
}

async function checkAuthorManifest() {
  const response = await request("/author.json", "application/json");
  const robots = response.headers.get("x-robots-tag") || "";
  const data = await response.json();
  assert(response.status === 200, "author.json returns 200", `HTTP ${response.status}`);
  assert(/noindex/i.test(robots) && /follow/i.test(robots), "author manifest is crawlable but noindex");
  assert(data?.name === "Lorenza Volponi", "author manifest preserves Lorenza Volponi identity");
  assert(data?.canonical === `${BASE_URL}/imprensa`, "author manifest points to canonical press profile");
  assert(Array.isArray(data?.expertise) && data.expertise.includes("ChatGPT Ads"), "author manifest declares ChatGPT Ads expertise");
  assert(Array.isArray(data?.latestAuthoredRecords) && data.latestAuthoredRecords.length >= 3, "author manifest exposes authored Radar records");
  assert(/independent/i.test(data?.editorialBoundary || ""), "author manifest preserves independence boundary");
}

async function checkDataCatalog() {
  const response = await request("/data-catalog.json", "application/json");
  const robots = response.headers.get("x-robots-tag") || "";
  const data = await response.json();
  assert(response.status === 200, "data-catalog.json returns 200", `HTTP ${response.status}`);
  assert(/noindex/i.test(robots) && /follow/i.test(robots), "data catalog is crawlable but noindex");
  assert(data?.type === "DataCatalog", "data catalog declares DataCatalog type");
  assert(data?.author === "Lorenza Volponi", "data catalog preserves author identity");
  assert(Array.isArray(data?.datasets) && data.datasets.length > 0, "data catalog contains datasets");
  const dataset = data?.datasets?.[0] || {};
  assert(dataset.json === `${BASE_URL}/data/chatgpt-ads-markets.json`, "data catalog points to JSON dataset");
  assert(dataset.csv === `${BASE_URL}/data/chatgpt-ads-markets.csv`, "data catalog points to CSV dataset");
  assert(/^https:\/\/help\.openai\.com\//i.test(dataset.source || ""), "data catalog preserves primary-source URL");
  assert(data?.provenance === `${BASE_URL}/provenance.json`, "data catalog links provenance");
  assert(data?.evidence === `${BASE_URL}/evidence.json`, "data catalog links evidence ledger");
}

async function checkPressKit() {
  const response = await request("/press-kit.json", "application/json");
  const robots = response.headers.get("x-robots-tag") || "";
  const data = await response.json();
  assert(response.status === 200, "press-kit.json returns 200", `HTTP ${response.status}`);
  assert(/noindex/i.test(robots) && /follow/i.test(robots), "press kit is crawlable but noindex");
  assert(data?.schemaVersion >= 2, "press kit exposes newsroom briefing schema");
  assert(data?.person?.name === "Lorenza Volponi", "press kit preserves person identity");
  assert(data?.canonical === `${BASE_URL}/imprensa`, "press kit canonical points to the human profile");
  assert(Array.isArray(data?.fastFacts) && data.fastFacts.length >= 5, "press kit exposes fast facts for newsroom use");
  assert(Array.isArray(data?.newsroomAngles) && data.newsroomAngles.length >= 4, "press kit exposes differentiated newsroom angles");
  assert(Array.isArray(data?.latestSignals) && data.latestSignals.length >= 3, "press kit exposes recent Radar signals");
  assert(/independente|independent/i.test(data?.independence || ""), "press kit preserves editorial independence");

  for (const [index, item] of (data?.fastFacts || []).entries()) {
    assert(/^https:\/\/(openai\.com|help\.openai\.com)\//i.test(item?.source || ""), `fast fact ${index + 1} cites an OpenAI primary-source host`);
  }

  for (const [index, angle] of (data?.newsroomAngles || []).entries()) {
    assert(Boolean(angle?.title) && Boolean(angle?.angle) && Boolean(angle?.whyItMatters), `newsroom angle ${index + 1} is editorially complete`);
    assert(Array.isArray(angle?.primarySources) && angle.primarySources.length > 0, `newsroom angle ${index + 1} has primary sources`);
    for (const source of angle?.primarySources || []) {
      assert(/^https:\/\/(openai\.com|help\.openai\.com)\//i.test(source), `newsroom angle ${index + 1} stays grounded in an OpenAI primary-source host`);
    }
  }
}

async function checkNewsSitemap() {
  const response = await request("/news-sitemap.xml", "application/xml");
  const xml = await response.text();
  assert(response.status === 200, "news sitemap returns 200", `HTTP ${response.status}`);
  assert(/xmlns:news="http:\/\/www\.google\.com\/schemas\/sitemap-news\/0\.9"/i.test(xml), "news sitemap declares Google News namespace");

  const dates = [...xml.matchAll(/<news:publication_date>([^<]+)<\/news:publication_date>/g)].map((match) => match[1]);
  const now = Date.now();
  for (const date of dates) {
    const timestamp = Date.parse(`${date}T00:00:00Z`);
    assert(!Number.isNaN(timestamp), `news sitemap date parses: ${date}`);
    assert(now - timestamp <= 48 * 60 * 60 * 1000, `news sitemap keeps ${date} inside the 48h window`);
  }
}

async function checkLatestRadarArticle() {
  const feed = await request("/feed.json", "application/feed+json");
  const data = await feed.json();
  const latestUrl = data?.items?.[0]?.url;
  assert(Boolean(latestUrl), "JSON Feed exposes a latest Radar URL");
  if (!latestUrl) return;

  const url = new URL(latestUrl);
  const response = await request(url.pathname, "text/html");
  const html = await response.text();
  assert(response.status === 200, "latest Radar article returns 200", `HTTP ${response.status}`);
  assert(/NewsArticle/i.test(html), "latest Radar article exposes NewsArticle structured data");
  assert(/TechArticle/i.test(html), "latest Radar article preserves TechArticle semantics");
  assert(/rel="author"/i.test(html), "latest Radar article exposes a visible author relationship");
  assert(/\/imprensa/i.test(html), "latest Radar article links author to press profile");
  assert(html.includes(`/og/radar-${RADAR_SLUGS[0]}`), "latest Radar article advertises its unique stable social image");
}

async function checkRadarImages() {
  for (const slug of RADAR_SLUGS) {
    const response = await request(`/og/radar-${slug}`, "image/*");
    const contentType = response.headers.get("content-type") || "";
    const bytes = (await response.arrayBuffer()).byteLength;
    assert(response.status === 200, `Radar image ${slug} returns 200`, `HTTP ${response.status}`);
    assert(/^image\//i.test(contentType), `Radar image ${slug} returns image content`, contentType || "missing content-type");
    assert(bytes >= 1000, `Radar image ${slug} is substantive`, `${bytes} bytes`);
  }
}

async function checkLegacyRadarImageRedirect() {
  const slug = RADAR_SLUGS[0];
  const response = await request(`/og/radar/${slug}?ratio=1x1`, "image/*");
  const contentType = response.headers.get("content-type") || "";
  assert(response.status === 200, "legacy Radar OG URL resolves through compatibility redirect", `HTTP ${response.status}`);
  assert(/^image\//i.test(contentType), "legacy Radar OG URL resolves to a real image", contentType || "missing content-type");
}

await checkAuthorityLinkHeaders("/");
await checkAuthorityLinkHeaders("/imprensa");
await checkPressPage();
await checkAuthorManifest();
await checkDataCatalog();
await checkPressKit();
await checkNewsSitemap();
await checkLatestRadarArticle();
await checkRadarImages();
await checkLegacyRadarImageRedirect();

console.log(`\nMedia authority health: ${failures === 0 ? "green" : `${failures} failure(s)`}.`);
if (failures) process.exit(1);
