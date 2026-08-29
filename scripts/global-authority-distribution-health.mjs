const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const routes = ["/en/press", "/en/partners", "/global-media-kit.json", "/partner-opportunities.json", "/sitemap.xml"];
const failures = [];

for (const route of routes) {
  try {
    const response = await fetch(`${base}${route}`, { redirect: "follow", signal: AbortSignal.timeout(15000) });
    const body = await response.text();
    if (!response.ok) failures.push(`${route}: HTTP ${response.status}`);
    if (/m[aá]rcia\s+(?:beatriz\s+)?cavalcante/iu.test(body)) failures.push(`${route}: forbidden cross-project identity`);
    if (route !== "/sitemap.xml" && !/Lorenza Volponi/i.test(body)) failures.push(`${route}: Lorenza Volponi missing`);
    if (route === "/global-media-kit.json") {
      const parsed = JSON.parse(body);
      if (parsed?.person?.name !== "Lorenza Volponi") failures.push(`${route}: wrong person entity`);
      if (!Array.isArray(parsed?.citationSurfaces) || parsed.citationSurfaces.length < 4) failures.push(`${route}: citation surfaces incomplete`);
    }
    if (route === "/partner-opportunities.json") {
      const parsed = JSON.parse(body);
      if (!Array.isArray(parsed?.models) || parsed.models.length < 4) failures.push(`${route}: partnership models incomplete`);
    }
    if (route === "/sitemap.xml") {
      for (const path of ["/en/press", "/en/partners"]) if (!body.includes(path)) failures.push(`sitemap: ${path} missing`);
    }
    console.log(`✓ ${route} ${response.status}`);
  } catch (error) {
    failures.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length) {
  console.error("\nGlobal Authority Distribution Health FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nGlobal Authority Distribution Health PASSED — press, citation and partnership surfaces are coherent.");
