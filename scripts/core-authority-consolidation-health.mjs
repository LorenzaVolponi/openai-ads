const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const failures = [];

async function get(path) {
  const response = await fetch(`${base}${path}`, { redirect: "follow", signal: AbortSignal.timeout(15000) });
  const text = await response.text();
  if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
  return text;
}

const checks = [
  ["/en", ["Volponi AI Index", "Lorenza Volponi", "AI Search", "/en/radar", "/en/press"]],
  ["/en/lorenza-volponi", ["Lorenza Volponi", "AI Product", "UX/UI", "GEO", "Send the opportunity"]],
  ["/en/radar", ["Lorenza Volponi", "Evidence", "ChatGPT Ads"]],
  ["/en/press", ["Lorenza Volponi", "Volponi AI Index"]],
  ["/en/volponi-ai-index", ["Volponi AI Index", "Lorenza Volponi", "Methodology"]],
  ["/autoridade", ["Lorenza Volponi", "Volponi AI Index", "GEO", "evid" ]],
  ["/imprensa", ["Lorenza Volponi", "ChatGPT Ads", "GEO"]],
  ["/metodologia", ["Volponi AI Index", "Provenance", "Lorenza Volponi", "GEO"]],
];

for (const [path, needles] of checks) {
  const html = await get(path);
  for (const needle of needles) if (!html.toLowerCase().includes(needle.toLowerCase())) failures.push(`${path} missing: ${needle}`);
}

const graph = await get("/lorenza-graph.json");
for (const needle of ["Lorenza Volponi", "volponi-ai-index", "media-profile", "commercial-profile"]) {
  if (!graph.includes(needle)) failures.push(`lorenza graph missing: ${needle}`);
}

const intelligence = await get("/intelligence.json");
for (const needle of ["ai-index", "en-radar", "lorenza"]) {
  if (!intelligence.includes(needle)) failures.push(`intelligence graph missing: ${needle}`);
}

if (failures.length) {
  console.error("Core Authority Consolidation Health FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Core Authority Consolidation Health PASSED — English hub, Lorenza entity, research, evidence, press and methodology are connected.");
