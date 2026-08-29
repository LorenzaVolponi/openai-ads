const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const routes = [
  "/en/chatgpt-ads",
  "/en/chatgpt-ads-strategy",
  "/en/chatgpt-ads-for-agencies",
  "/en/chatgpt-ads-for-brands",
  "/en/chatgpt-ads-consultant",
  "/en/lorenza-volponi",
  "/work-with-lorenza",
  "/organic-growth.json",
  "/intelligence.json",
  "/sitemap.xml",
];

const forbidden = [/Márcia Cavalcante/i, /Márcia Beatriz Cavalcante/i, /Marcia Cavalcante/i, /Marcia Beatriz Cavalcante/i];
const failures = [];

for (const route of routes) {
  try {
    const response = await fetch(`${base}${route}`, { redirect: "follow", signal: AbortSignal.timeout(15000) });
    const body = await response.text();
    if (!response.ok) failures.push(`${route}: HTTP ${response.status}`);
    for (const pattern of forbidden) if (pattern.test(body)) failures.push(`${route}: forbidden identity ${pattern}`);
    if (route.includes("/en/") || route === "/work-with-lorenza") {
      if (!/Lorenza Volponi/i.test(body)) failures.push(`${route}: Lorenza Volponi entity missing`);
      if (!/work|consult|strateg|partner|brand|agenc/i.test(body)) failures.push(`${route}: commercial intent copy missing`);
    }
    if (route === "/organic-growth.json") {
      const parsed = JSON.parse(body);
      if (parsed?.entity?.name !== "Lorenza Volponi") failures.push("organic-growth.json: wrong entity");
      if (parsed?.commercialArchitecture?.trackedEvent !== "organic_client_intent") failures.push("organic-growth.json: tracked event missing");
    }
    if (route === "/sitemap.xml") {
      for (const path of ["/en/chatgpt-ads-consultant", "/en/lorenza-volponi", "/work-with-lorenza"]) if (!body.includes(path)) failures.push(`sitemap: ${path} missing`);
    }
    console.log(`✓ ${route} ${response.status}`);
  } catch (error) {
    failures.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length) {
  console.error("\nGlobal Growth Health FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nGlobal Growth Health PASSED — worldwide authority, commercial routes and Lorenza identity are coherent.");
