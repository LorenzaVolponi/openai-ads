const BASE_URL = (process.argv[2] || process.env.OPENAI_CRAWLER_HEALTH_BASE_URL || "https://openai-ads.volponi.tech").replace(/\/$/, "");
const MIN_HTML_BYTES = 1000;

const crawlers = [
  {
    name: "OAI-SearchBot",
    purpose: "ChatGPT search discovery and citation",
  },
  {
    name: "OAI-AdsBot",
    purpose: "ChatGPT Ads landing-page validation and relevance assessment",
  },
];

let failures = 0;

function pass(message) {
  console.log(`✓ ${message}`);
}

function fail(message) {
  failures += 1;
  console.error(`✗ ${message}`);
}

function assert(condition, message) {
  condition ? pass(message) : fail(message);
}

const robotsResponse = await fetch(`${BASE_URL}/robots.txt`, {
  headers: { "user-agent": "VolponiOpenAICrawlerHealth/1.0" },
  signal: AbortSignal.timeout(15000),
});
const robots = await robotsResponse.text();
assert(robotsResponse.status === 200, `robots.txt returns 200 (HTTP ${robotsResponse.status})`);

for (const crawler of crawlers) {
  const escaped = crawler.name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const explicitGroup = new RegExp(`User-agent:\\s*${escaped}[\\s\\S]{0,240}?Allow:\\s*/`, "i");
  assert(explicitGroup.test(robots), `robots.txt explicitly allows ${crawler.name}`);

  try {
    const response = await fetch(`${BASE_URL}/`, {
      redirect: "follow",
      headers: {
        "user-agent": crawler.name,
        accept: "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(15000),
    });
    const body = await response.text();
    const contentType = response.headers.get("content-type") || "";
    const robotsHeader = response.headers.get("x-robots-tag") || "";

    assert(response.status === 200, `${crawler.name} receives homepage HTTP 200`);
    assert(/text\/html/i.test(contentType), `${crawler.name} receives HTML content`);
    assert(Buffer.byteLength(body, "utf8") >= MIN_HTML_BYTES, `${crawler.name} receives a substantive homepage`);
    assert(!/noindex/i.test(robotsHeader), `${crawler.name} is not served a noindex canonical page`);
    assert(/ChatGPT Ads/i.test(body), `${crawler.name} can read the primary ChatGPT Ads topic`);
    assert(/Lorenza Volponi/i.test(body), `${crawler.name} can read the Lorenza Volponi author entity`);
    pass(`${crawler.name} end-to-end access verified — ${crawler.purpose}`);
  } catch (error) {
    fail(`${crawler.name} request failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} OpenAI crawler access invariant(s) failed.`);
  process.exit(1);
}

console.log("\nOpenAI crawler access is healthy for search discovery and ads-readiness validation.");
