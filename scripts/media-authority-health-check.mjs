const BASE_URL = (process.argv[2] || process.env.MEDIA_AUTHORITY_BASE_URL || "https://openai-ads.volponi.tech").replace(/\/$/, "");
const USER_AGENT = "VolponiMediaAuthorityHealth/1.1 (+https://openai-ads.volponi.tech/imprensa)";

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
  for (const ratio of ["1x1", "4x3", "16x9"]) {
    assert(html.includes(`ratio=${ratio}`) || html.includes(`ratio%3D${ratio}`), `latest Radar article advertises ${ratio} article image`);
  }
}

async function checkImageVariants() {
  const slug = "ads-manager-nine-markets";
  for (const ratio of ["1x1", "4x3", "16x9"]) {
    const response = await request(`/og/radar/${slug}?ratio=${ratio}`, "image/*");
    const contentType = response.headers.get("content-type") || "";
    assert(response.status === 200, `Radar ${ratio} image returns 200`, `HTTP ${response.status}`);
    assert(/^image\//i.test(contentType), `Radar ${ratio} route returns an image`, contentType || "missing content-type");
  }
}

await checkPressPage();
await checkPressKit();
await checkNewsSitemap();
await checkLatestRadarArticle();
await checkImageVariants();

console.log(`\nMedia authority health: ${failures === 0 ? "green" : `${failures} failure(s)`}.`);
if (failures) process.exit(1);
