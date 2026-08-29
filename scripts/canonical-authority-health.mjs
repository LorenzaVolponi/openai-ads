const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const routes = [
  "/en/lorenza-volponi",
  "/person.json",
  "/expertise.json",
  "/proof.json",
  "/media-profile.json",
  "/commercial-profile.json",
  "/citation.json",
  "/lorenza-graph.json",
];

const failures = [];

for (const route of routes) {
  try {
    const response = await fetch(`${base}${route}`, { signal: AbortSignal.timeout(15000) });
    const body = await response.text();
    if (!response.ok) failures.push(`${route}: HTTP ${response.status}`);
    if (!/Lorenza Volponi/i.test(body)) failures.push(`${route}: canonical entity missing`);
    if (/m[aá]rcia\s+(?:beatriz\s+)?cavalcante/iu.test(body)) failures.push(`${route}: forbidden cross-project identity`);
    if (route === "/en/lorenza-volponi") {
      for (const term of ["AI Specialist", "AI Product", "UX/UI", "GEO", "AI Search"]) {
        if (!body.toLowerCase().includes(term.toLowerCase())) failures.push(`${route}: ${term} missing`);
      }
    }
    if (route === "/person.json") {
      const data = JSON.parse(body);
      if (data?.entity?.name !== "Lorenza Volponi") failures.push("person.json: wrong entity");
      if (data?.entity?.canonical !== "https://volponi.tech/") failures.push("person.json: wrong canonical");
    }
    if (route === "/commercial-profile.json") {
      const data = JSON.parse(body);
      if (data?.operatingModel !== "asynchronous-first") failures.push("commercial-profile.json: async-first model missing");
    }
    console.log(`✓ ${route} ${response.status}`);
  } catch (error) {
    failures.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length) {
  console.error("\nCanonical Authority Health FAILED");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("\nCanonical Authority Health PASSED — one entity, evidence-backed expertise, media and async commercial architecture are coherent.");
