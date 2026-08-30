import { createHash } from "node:crypto";

const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const expectedEdition = "2026.08";
const expectedLockedDigest = process.env.VOLPONI_AI_INDEX_2026_08_DIGEST?.trim() || "";
const failures = [];

async function get(path) {
  const response = await fetch(`${base}${path}`, { signal: AbortSignal.timeout(15000) });
  const text = await response.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
  return { response, text, json };
}

function requireValue(condition, message) {
  if (!condition) failures.push(message);
}

function corePayload(record) {
  if (!record || typeof record !== "object") return null;
  const {
    canonicalDataset: _canonicalDataset,
    contentDigest: _contentDigest,
    digestScope: _digestScope,
    immutableEdition: _immutableEdition,
    ...core
  } = record;
  return core;
}

function digestPayload(record) {
  const core = corePayload(record);
  if (!core) return "";
  const serialized = `${JSON.stringify(core, null, 2)}\n`;
  return `sha256:${createHash("sha256").update(serialized).digest("hex")}`;
}

const latest = await get("/volponi-ai-index.json");
const versioned = await get("/research/volponi-ai-index/2026-08.json");
const manifest = await get("/research-manifest.json");
const page = await fetch(`${base}/en/volponi-ai-index`, { signal: AbortSignal.timeout(15000) });
const pageHtml = await page.text();
if (!page.ok) failures.push(`/en/volponi-ai-index: HTTP ${page.status}`);

const latestJson = latest.json;
const versionedJson = versioned.json;
const manifestEntry = manifest.json?.research?.find?.((item) => item?.id === "volponi-ai-index");

requireValue(latestJson?.edition === expectedEdition, `latest dataset: expected edition ${expectedEdition}`);
requireValue(versionedJson?.edition === expectedEdition, `versioned dataset: expected edition ${expectedEdition}`);
requireValue(manifestEntry?.edition === expectedEdition, `research manifest: expected edition ${expectedEdition}`);
requireValue(latestJson?.immutableEdition === false, "latest dataset must be mutable pointer, not immutable edition");
requireValue(versionedJson?.immutableEdition === true, "versioned dataset must declare immutableEdition=true");

const latestDigest = latestJson?.contentDigest || "";
const versionedDigest = versionedJson?.contentDigest || "";
const manifestDigest = manifestEntry?.contentDigest || "";
const recomputedLatest = digestPayload(latestJson);
const recomputedVersioned = digestPayload(versionedJson);

requireValue(/^sha256:[a-f0-9]{64}$/.test(latestDigest), "latest dataset: invalid SHA-256 digest format");
requireValue(latestDigest === versionedDigest, "latest/versioned content digests differ");
requireValue(latestDigest === manifestDigest, "dataset/manifest content digests differ");
requireValue(latestDigest === recomputedLatest, "latest dataset digest does not match its publication payload");
requireValue(versionedDigest === recomputedVersioned, "versioned dataset digest does not match its publication payload");

const latestHeaderDigest = latest.response.headers.get("x-content-sha256") || "";
const versionedHeaderDigest = versioned.response.headers.get("x-content-sha256") || "";
requireValue(latestHeaderDigest === latestDigest.replace("sha256:", ""), "latest x-content-sha256 header mismatch");
requireValue(versionedHeaderDigest === versionedDigest.replace("sha256:", ""), "versioned x-content-sha256 header mismatch");

const versionedCache = versioned.response.headers.get("cache-control") || "";
requireValue(/31536000/.test(versionedCache) && /immutable/i.test(versionedCache), `versioned cache is not immutable for one year: ${versionedCache || "none"}`);
for (const [label, result] of [["latest", latest], ["versioned", versioned], ["manifest", manifest]]) {
  const robots = result.response.headers.get("x-robots-tag") || "";
  requireValue(/noindex/i.test(robots) && /follow/i.test(robots), `${label}: machine endpoint must be noindex, follow (${robots || "none"})`);
}

requireValue(latestJson?.versionedDataset?.endsWith("/research/volponi-ai-index/2026-08.json"), "latest dataset: versionedDataset link missing");
requireValue(latestJson?.researchManifest?.endsWith("/research-manifest.json"), "latest dataset: research manifest link missing");
requireValue(manifestEntry?.versionedDataset === latestJson?.versionedDataset, "manifest/versioned dataset URL mismatch");
requireValue(manifestEntry?.latestDataset === latestJson?.latestDataset, "manifest/latest dataset URL mismatch");
requireValue(/independent/i.test(latestJson?.boundary || "") && /OpenAI/i.test(latestJson?.boundary || ""), "research independence boundary missing");
requireValue(/id=["']methodology["']/.test(pageHtml), "AI Index page: stable #methodology anchor missing");
requireValue(pageHtml.includes("2026-08.json"), "AI Index page: versioned edition link missing");
requireValue(pageHtml.includes("research-manifest.json"), "AI Index page: research manifest link missing");

if (expectedLockedDigest) {
  requireValue(latestDigest === expectedLockedDigest, `edition digest lock changed: expected ${expectedLockedDigest}, got ${latestDigest}`);
} else {
  console.log(`DIGEST_LOCK_CANDIDATE=${latestDigest}`);
  console.log("WARNING: edition digest lock is not yet configured in this health script/workflow.");
}

if (failures.length) {
  console.error("\nResearch Publication Health FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`\nResearch Publication Health PASSED — edition ${expectedEdition}, digest ${latestDigest}.`);
