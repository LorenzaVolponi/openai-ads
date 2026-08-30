const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const failures = [];

async function get(path) {
  const response = await fetch(`${base}${path}`, { redirect: "follow", signal: AbortSignal.timeout(15000) });
  const text = await response.text();
  if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
  return text;
}

const press = await get("/en/press");
for (const needle of ["Need an AI source?", "Volponi AI Index", "Lorenza Volponi", "AI Product & UX/UI", "GEO", "AI Search"]) {
  if (!press.includes(needle)) failures.push(`/en/press missing: ${needle}`);
}

const journalist = JSON.parse(await get("/journalist-mode.json"));
if (!journalist?.flagshipResearch?.page?.includes("/en/volponi-ai-index")) failures.push("journalist mode: flagship research missing");
if (!journalist?.journalistFastPath?.outreach?.includes("/outreach-kit.json")) failures.push("journalist mode: outreach kit missing");

const outreach = JSON.parse(await get("/outreach-kit.json"));
if (outreach?.entity !== "Lorenza Volponi") failures.push("outreach kit: wrong entity");
if (!outreach?.pressPitch?.subject || !outreach?.linkedinPost || !outreach?.xPost) failures.push("outreach kit: distribution copy incomplete");

const quotes = JSON.parse(await get("/shareable-quotes.json"));
if (!JSON.stringify(quotes).includes("Volponi AI Index")) failures.push("shareable quotes: AI Index quote missing");

const media = JSON.parse(await get("/media-profile.json"));
if (!media?.flagshipResearch?.page?.includes("/en/volponi-ai-index")) failures.push("media profile: flagship research missing");

const distribution = JSON.parse(await get("/distribution-manifest.json"));
if (!distribution?.distributionObjects?.outreach?.includes("/outreach-kit.json")) failures.push("distribution manifest: outreach missing");

const sitemap = await get("/sitemap.xml");
if (!sitemap.includes("/en/press")) failures.push("sitemap: English press room missing");

if (failures.length) {
  console.error("AI Index Distribution Health FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("AI Index Distribution Health PASSED — research, press, journalist and social distribution are connected.");
