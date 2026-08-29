const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const failures = [];

async function get(path) {
  const response = await fetch(`${base}${path}`, { redirect: "follow", signal: AbortSignal.timeout(15000) });
  const text = await response.text();
  if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
  return text;
}

const page = await get("/en/volponi-ai-index");
for (const needle of ["Volponi AI Index", "Lorenza Volponi", "AI readiness", "Evidence matrix", "Methodology"]) {
  if (!page.includes(needle)) failures.push(`/en/volponi-ai-index missing: ${needle}`);
}

const data = JSON.parse(await get("/volponi-ai-index.json"));
if (data?.author?.name !== "Lorenza Volponi") failures.push("index dataset: wrong author");
if (!Array.isArray(data?.dimensions) || data.dimensions.length < 5) failures.push("index dataset: dimensions missing");
if (data?.methodology?.principle !== "No opaque composite score.") failures.push("index dataset: methodology boundary missing");

const sitemap = await get("/sitemap.xml");
if (!sitemap.includes("/en/volponi-ai-index")) failures.push("sitemap: Volponi AI Index missing");

const distribution = await get("/distribution-manifest.json");
if (!distribution.includes("volponi-ai-index")) failures.push("distribution manifest: index missing");

const intelligence = await get("/intelligence.json");
if (!intelligence.includes("ai-index") || !intelligence.includes("flagshipResearch")) failures.push("intelligence graph: index missing");

if (failures.length) {
  console.error("Volponi AI Index Health FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Volponi AI Index Health PASSED — original research, evidence, entity and discovery are connected.");
