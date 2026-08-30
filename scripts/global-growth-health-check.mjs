const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const routes = [
  "/en/chatgpt-ads",
  "/en/chatgpt-ads-strategy",
  "/en/chatgpt-ads-for-agencies",
  "/en/chatgpt-ads-for-brands",
  "/en/chatgpt-ads-partnerships",
  "/en/geo-ai-strategy",
  "/en/chatgpt-ads-consultant",
  "/en/lorenza-volponi",
  "/work-with-lorenza",
  "/work-with-lorenza/brief",
  "/organic-growth.json",
  "/intelligence.json",
  "/sitemap.xml",
];

const forbidden = [
  /m[aá]rcia\s+beatriz\s+cavalcante/iu,
  /m[aá]rcia\s+cavalcante/iu,
  /marcia\s+beatriz\s+cavalcante/iu,
  /marcia\s+cavalcante/iu,
];
const failures = [];

for (const route of routes) {
  try {
    const response = await fetch(`${base}${route}`, { redirect: "follow", signal: AbortSignal.timeout(15000) });
    const body = await response.text();
    if (!response.ok) failures.push(`${route}: HTTP ${response.status}`);
    for (const pattern of forbidden) if (pattern.test(body)) failures.push(`${route}: forbidden cross-project identity`);
    if (route.includes("/en/") || route.startsWith("/work-with-lorenza")) {
      if (!/Lorenza Volponi/i.test(body)) failures.push(`${route}: Lorenza Volponi entity missing`);
      if (!/work|consult|strateg|partner|brand|agenc|geo|discovery|opportunity|brief/i.test(body)) failures.push(`${route}: commercial intent copy missing`);
    }
    if (route === "/work-with-lorenza/brief") {
      if (!/Qualified opportunity brief/i.test(body)) failures.push("work-with-lorenza/brief: qualified brief marker missing");
      if (!/Nothing is submitted or stored/i.test(body)) failures.push("work-with-lorenza/brief: privacy boundary missing");
    }
    if (route === "/organic-growth.json") {
      const parsed = JSON.parse(body);
      if (parsed?.entity?.name !== "Lorenza Volponi") failures.push("organic-growth.json: wrong entity");
      if (parsed?.commercialArchitecture?.trackedEvent !== "organic_client_intent") failures.push("organic-growth.json: tracked event missing");
    }
    if (route === "/sitemap.xml") {
      for (const path of ["/en/chatgpt-ads-consultant", "/en/chatgpt-ads-partnerships", "/en/geo-ai-strategy", "/en/lorenza-volponi", "/work-with-lorenza", "/work-with-lorenza/brief"]) if (!body.includes(path)) failures.push(`sitemap: ${path} missing`);
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
