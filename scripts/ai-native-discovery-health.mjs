const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const failures = [];

async function get(path) {
  const response = await fetch(`${base}${path}`, {
    redirect: "follow",
    signal: AbortSignal.timeout(15000),
  });
  const text = await response.text();
  if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
  return { response, text };
}

async function getJson(path) {
  const { response, text } = await get(path);
  try {
    return { response, json: JSON.parse(text), text };
  } catch {
    failures.push(`${path}: invalid JSON`);
    return { response, json: null, text };
  }
}

function requireText(label, text, needles) {
  const lower = text.toLowerCase();
  for (const needle of needles) {
    if (!lower.includes(needle.toLowerCase())) failures.push(`${label}: missing ${needle}`);
  }
}

function requireNoindex(label, response) {
  const robots = response.headers.get("x-robots-tag") || "";
  if (!robots.toLowerCase().includes("noindex")) failures.push(`${label}: machine surface must be noindex`);
  if (!robots.toLowerCase().includes("follow")) failures.push(`${label}: machine surface should remain followable`);
}

const canonicalEntity = "https://volponi.tech/#lorenza-volponi";

const discoveryResult = await getJson("/discovery.json");
const discovery = discoveryResult.json;
requireNoindex("discovery.json", discoveryResult.response);
if (discovery?.canonical !== "https://openai-ads.volponi.tech") failures.push("discovery.json: canonical mismatch");
if (discovery?.entity?.id !== canonicalEntity) failures.push("discovery.json: Lorenza canonical entity mismatch");
if (discovery?.flagshipResearch?.edition !== "2026.08") failures.push("discovery.json: flagship research edition mismatch");
if (!discovery?.flagshipResearch?.immutableEdition?.includes("/research/volponi-ai-index/2026-08.json")) failures.push("discovery.json: immutable research edition missing");
if (!discovery?.semanticDiscovery?.map?.includes("semantic-map.json")) failures.push("discovery.json: semantic map missing");
if (!discovery?.commercial?.profile?.includes("commercial-profile.json")) failures.push("discovery.json: commercial profile missing");
if (!Array.isArray(discovery?.commercial?.services) || discovery.commercial.services.length !== 3) failures.push("discovery.json: expected three evidence-bounded commercial services");
if (!discovery?.trust?.security?.includes("/.well-known/security.txt")) failures.push("discovery.json: security discovery missing");
if (!discovery?.routingPolicy?.performanceClaims?.includes("separate evidence states")) failures.push("discovery.json: performance evidence boundary missing");

const commercialResult = await getJson("/commercial-profile.json");
const commercial = commercialResult.json;
requireNoindex("commercial-profile.json", commercialResult.response);
if (commercial?.schemaVersion !== 2) failures.push("commercial-profile.json: schemaVersion 2 required");
if (commercial?.entityId !== canonicalEntity) failures.push("commercial-profile.json: canonical entity mismatch");
if (!Array.isArray(commercial?.services) || commercial.services.length !== 3) failures.push("commercial-profile.json: service catalog missing");
if (!commercial?.qualifiedBrief?.endsWith("/work-with-lorenza/brief")) failures.push("commercial-profile.json: qualified brief missing");
if (!commercial?.commercialBoundary?.includes("not evidence of a client relationship")) failures.push("commercial-profile.json: commercial evidence boundary missing");

const llms = await get("/llms.txt");
requireNoindex("llms.txt", llms.response);
requireText("llms.txt", llms.text, [
  "/discovery.json",
  "/semantic-map.json",
  "/research/volponi-ai-index/2026-08.json",
  "/commercial-profile.json",
  "/work-with-lorenza/brief",
  "availability, access, inventory, delivery, attribution and business performance",
  "independent and are not affiliated",
]);

const llmsFull = await get("/llms-full.txt");
requireNoindex("llms-full.txt", llmsFull.response);
requireText("llms-full.txt", llmsFull.text, [
  "CycloneDX SBOM",
  "CSP Report-Only",
  "Vercel Web Analytics and Speed Insights",
  "Published service categories",
  "Missing evidence remains missing",
  "/discovery.json",
]);

const work = await get("/work-with-lorenza");
requireText("/work-with-lorenza", work.text, [
  "OfferCatalog",
  "Service",
  "Proof before pitch",
  "Volponi AI Index",
  "Evidence Radar",
  "Lorenza authority profile",
  "Send a structured brief",
]);

const home = await get("/");
const homeLinks = home.response.headers.get("link") || "";
for (const needle of [
  "/discovery.json",
  "/llms.txt",
  "/semantic-map.json",
  "/commercial-profile.json",
  "/research-manifest.json",
]) {
  if (!homeLinks.includes(needle)) failures.push(`/: Link header missing ${needle}`);
}

const english = await get("/en");
const englishLinks = english.response.headers.get("link") || "";
if ((english.response.headers.get("content-language") || "").toLowerCase() !== "en") failures.push("/en: Content-Language must be en");
for (const needle of ["/discovery.json", "/llms.txt", "/semantic-map.json", "/commercial-profile.json"]) {
  if (!englishLinks.includes(needle)) failures.push(`/en: Link header missing ${needle}`);
}

if (failures.length) {
  console.error("AI-native Discovery Health FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("AI-native Discovery Health PASSED — entity, research, semantics, machine routing and evidence-bounded commercial intent are connected in HTTP and HTML.");
