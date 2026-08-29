const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const routes = ["/en/radar", "/en/lorenza-volponi", "/en/chatgpt-ads", "/en/geo-ai-strategy", "/en/press", "/distribution-manifest.json", "/intelligence.json", "/sitemap.xml"];
const failures = [];

for (const route of routes) {
  try {
    const response = await fetch(`${base}${route}`, { redirect: "follow", signal: AbortSignal.timeout(15000) });
    const body = await response.text();
    if (!response.ok) failures.push(`${route}: HTTP ${response.status}`);
    if (route.startsWith("/en/")) {
      if (!/Lorenza Volponi/i.test(body)) failures.push(`${route}: Lorenza entity missing`);
      if (!/AI|GEO|ChatGPT|evidence|Radar|UX\/UI|AI Search/i.test(body)) failures.push(`${route}: authority vocabulary missing`);
    }
    if (route === "/en/radar") {
      for (const term of ["ChatGPT Ads Radar", "AI Product & UX/UI", "GEO", "AI Search", "primary-source", "Lorenza Volponi"]) {
        if (!body.includes(term)) failures.push(`/en/radar: missing ${term}`);
      }
    }
    if (route === "/distribution-manifest.json") {
      const data = JSON.parse(body);
      if (data?.EnglishAuthorityBackbone?.radar !== `${base}/en/radar` && !String(data?.EnglishAuthorityBackbone?.radar || "").endsWith("/en/radar")) failures.push("distribution-manifest: English Radar missing");
    }
    if (route === "/intelligence.json") {
      const data = JSON.parse(body);
      if (!data?.graph?.nodes?.some((node) => node.id === "en-radar")) failures.push("intelligence: en-radar node missing");
      if (!data?.canonicalAuthority?.EnglishEvidenceHub?.endsWith("/en/radar")) failures.push("intelligence: EnglishEvidenceHub missing");
    }
    if (route === "/sitemap.xml" && !body.includes("/en/radar")) failures.push("sitemap: /en/radar missing");
    console.log(`✓ ${route} ${response.status}`);
  } catch (error) {
    failures.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length) {
  console.error("\nEnglish Authority Radar Health FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nEnglish Authority Radar Health PASSED — Radar, Lorenza entity and English authority network are connected.");
