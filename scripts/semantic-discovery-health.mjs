const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const failures = [];

async function get(path) {
  const response = await fetch(`${base}${path}`, { redirect: "follow", signal: AbortSignal.timeout(15000) });
  const text = await response.text();
  if (!response.ok) failures.push(`${path}: HTTP ${response.status}`);
  return { response, text };
}

async function getJson(path) {
  const { text } = await get(path);
  try { return JSON.parse(text); }
  catch { failures.push(`${path}: invalid JSON`); return null; }
}

const semanticMap = await getJson("/semantic-map.json");
if (semanticMap?.entity?.id !== "https://volponi.tech/#lorenza-volponi") failures.push("semantic map: canonical Lorenza entity mismatch");
if (!semanticMap?.topics?.["geo-ai-search"]?.aliases?.some((value) => value.includes("Generative Engine Optimization"))) failures.push("semantic map: GEO alias missing");
if (!Array.isArray(semanticMap?.documents) || semanticMap.documents.length < 20) failures.push("semantic map: document registry too small");
if (!Array.isArray(semanticMap?.edges) || semanticMap.edges.length < 20) failures.push("semantic map: similarity edges missing");

const geo = await getJson("/semantic-search.json?q=Generative%20Engine%20Optimization&lang=en");
const geoPaths = geo?.results?.map((item) => item.path) ?? [];
if (!geoPaths.includes("/en/geo-ai-strategy") && !geoPaths.includes("/en/lorenza-volponi")) failures.push("semantic search: GEO query did not resolve to English GEO/Lorenza authority surfaces");

const pricing = await getJson("/semantic-search.json?q=custo%20anuncio&lang=pt-BR");
const pricingPaths = pricing?.results?.map((item) => item.path) ?? [];
if (!pricingPaths.includes("/chatgpt-ads-precos")) failures.push("semantic search: pricing intent did not resolve to /chatgpt-ads-precos");
if (pricingPaths[0] !== "/chatgpt-ads-precos") failures.push("semantic search: pricing page should lead explicit pricing intent");

const aiProduct = await getJson("/semantic-search.json?q=AI%20product%20UX&lang=en");
const aiProductPaths = aiProduct?.results?.map((item) => item.path) ?? [];
if (!aiProductPaths.includes("/en/lorenza-volponi") && !aiProductPaths.includes("/en")) failures.push("semantic search: AI Product/UX query did not resolve to Lorenza/English hub");

const pageChecks = [
  ["/", ["Descoberta semântica", "Continue pelo significado"]],
  ["/chatgpt-ads-precos", ["similaridade semântica"]],
  ["/en", ["Semantic discovery", "Continue by meaning"]],
  ["/en/radar", ["Semantic discovery"]],
  ["/en/press", ["Semantic discovery"]],
  ["/en/volponi-ai-index", ["Semantic discovery"]],
];
for (const [path, needles] of pageChecks) {
  const { text } = await get(path);
  const lower = text.toLowerCase();
  for (const needle of needles) if (!lower.includes(needle.toLowerCase())) failures.push(`${path}: missing ${needle}`);
}

const author = await getJson("/author.json");
if (author?.entityId !== "https://volponi.tech/#lorenza-volponi") failures.push("author manifest: canonical entity mismatch");
if (!author?.semanticDiscovery?.map?.includes("semantic-map.json")) failures.push("author manifest: semantic discovery missing");

const authority = await getJson("/authority.json");
if (!authority?.semanticDiscovery?.map?.includes("semantic-map.json")) failures.push("authority manifest: semantic map missing");
if (!authority?.queryPortfolio?.en?.includes("AI expert Brazil")) failures.push("authority manifest: English query portfolio missing");

const citation = await getJson("/citation.json");
if (!citation?.flagshipResearch?.page?.includes("/en/volponi-ai-index") && !citation?.preferredSourceLinks?.some((url) => url.includes("/en/volponi-ai-index"))) failures.push("citation manifest: flagship research missing");

const intelligence = await getJson("/intelligence.json");
if (!intelligence?.semanticDiscovery?.map?.includes("semantic-map.json")) failures.push("intelligence graph: semantic discovery missing");
if (intelligence?.canonicalAuthority?.entityId !== "https://volponi.tech/#lorenza-volponi") failures.push("intelligence graph: canonical entity mismatch");

const lorenzaGraph = await getJson("/lorenza-graph.json");
if (!lorenzaGraph?.flagshipResearch?.page?.includes("/en/volponi-ai-index")) failures.push("lorenza graph: flagship research missing");
if (!lorenzaGraph?.graph?.nodes?.some((node) => node.id === "volponi-ai-index")) failures.push("lorenza graph: AI Index node missing");

const distribution = await getJson("/distribution-manifest.json");
if (!distribution?.semanticDiscovery?.topicGraph?.includes("semantic-map.json")) failures.push("distribution manifest: semantic graph missing");

if (failures.length) {
  console.error("Semantic Discovery Health FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Semantic Discovery Health PASSED — canonical entity, semantic search, similarity links and machine discovery are connected without runtime AI APIs.");
