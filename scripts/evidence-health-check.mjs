import { createHash } from "node:crypto";

const BASE_URL = (process.argv[2] || process.env.EVIDENCE_HEALTH_BASE_URL || "https://openai-ads.volponi.tech").replace(/\/$/, "");
const USER_AGENT = "VolponiEvidenceHealth/1.0 (+https://openai-ads.volponi.tech/metodologia)";

const sha256 = (value) => createHash("sha256").update(value, "utf8").digest("hex");

const fail = (message) => {
  console.error(`✗ ${message}`);
  process.exitCode = 1;
};

const pass = (message) => console.log(`✓ ${message}`);

const assert = (condition, message) => (condition ? pass(message) : fail(message));

const response = await fetch(`${BASE_URL}/evidence.json`, {
  headers: { "user-agent": USER_AGENT, accept: "application/json" },
  signal: AbortSignal.timeout(15000),
});

assert(response.status === 200, `evidence.json returns 200 (HTTP ${response.status})`);

const robots = response.headers.get("x-robots-tag") || "";
const etag = response.headers.get("etag") || "";
const lastModified = response.headers.get("last-modified") || "";

assert(/noindex/i.test(robots) && /follow/i.test(robots), "evidence.json is crawlable but excluded from traditional index");
assert(Boolean(etag), "evidence.json exposes ETag");
assert(Boolean(lastModified) && !Number.isNaN(Date.parse(lastModified)), "evidence.json exposes valid Last-Modified");

const ledger = await response.json();
assert(ledger?.schemaVersion === 1, "evidence ledger schemaVersion is 1");
assert(ledger?.hashChain?.algorithm === "sha-256", "evidence ledger declares SHA-256");
assert(Array.isArray(ledger?.entries) && ledger.entries.length > 0, "evidence ledger contains records");

let previousChainSha256 = null;
for (const [index, entry] of (ledger.entries || []).entries()) {
  const normalizedRecord = {
    date: entry.date,
    slug: entry.slug,
    kind: entry.kind,
    market: entry.market,
    title: entry.title,
    summary: entry.summary,
    impact: entry.impact,
    previousState: entry.previousState,
    currentState: entry.currentState,
    confidence: entry.confidence,
    canonicalUrl: entry.canonicalUrl,
    source: {
      label: entry.source?.label,
      publisher: entry.source?.publisher,
      url: entry.source?.url,
    },
  };

  const recordSha256 = sha256(JSON.stringify(normalizedRecord));
  const expectedChainSha256 = sha256(`${previousChainSha256 ?? "GENESIS"}\n${recordSha256}`);

  assert(entry.sequence === index + 1, `record ${index + 1} sequence is stable`);
  assert(entry.hashes?.recordSha256 === recordSha256, `record ${index + 1} record hash verifies`);
  assert(entry.hashes?.previousChainSha256 === previousChainSha256, `record ${index + 1} previous chain link verifies`);
  assert(entry.hashes?.chainSha256 === expectedChainSha256, `record ${index + 1} chain hash verifies`);
  assert(/^https:\/\/(openai\.com|help\.openai\.com)\//i.test(entry.source?.url || ""), `record ${index + 1} points to an OpenAI primary-source host`);

  previousChainSha256 = expectedChainSha256;
}

assert(ledger?.hashChain?.rootSha256 === previousChainSha256, "published evidence root matches recomputed chain root");
assert(/not a digital signature/i.test(ledger?.hashChain?.caveat || ""), "ledger explicitly avoids overstating cryptographic proof");

if (process.exitCode) {
  console.error("Evidence ledger integrity check failed.");
  process.exit(process.exitCode);
}

console.log(`\nEvidence ledger integrity: ${ledger.entries.length} record(s) verified; root ${previousChainSha256}.`);
