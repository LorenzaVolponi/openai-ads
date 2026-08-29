const base = (process.argv[2] || "http://127.0.0.1:3000").replace(/\/$/, "");
const routes = [
  "/reputation-signals.json",
  "/shareable-quotes.json",
  "/journalist-mode.json",
  "/person.json",
  "/citation.json",
  "/media-profile.json",
];

const failures = [];
for (const route of routes) {
  try {
    const response = await fetch(`${base}${route}`, { signal: AbortSignal.timeout(15000) });
    const body = await response.text();
    if (!response.ok) failures.push(`${route}: HTTP ${response.status}`);
    if (!/Lorenza Volponi/i.test(body)) failures.push(`${route}: canonical entity missing`);
    if (route === "/reputation-signals.json") {
      const parsed = JSON.parse(body);
      if (!Array.isArray(parsed.signals)) failures.push("reputation-signals.json: signals array missing");
      if (!/Only externally verifiable/i.test(JSON.stringify(parsed.boundary))) failures.push("reputation-signals.json: evidence boundary missing");
    }
    if (route === "/shareable-quotes.json") {
      const parsed = JSON.parse(body);
      if (!parsed.quotes?.length) failures.push("shareable-quotes.json: no quote objects");
      if (!parsed.quotes?.every((q) => q.canonical && q.social?.linkedin && q.social?.x && q.social?.instagram)) failures.push("shareable-quotes.json: incomplete share object");
    }
    if (route === "/journalist-mode.json") {
      const parsed = JSON.parse(body);
      if (!parsed.journalistFastPath?.evidence || !parsed.journalistFastPath?.quotes) failures.push("journalist-mode.json: fast path incomplete");
    }
    console.log(`✓ ${route} ${response.status}`);
  } catch (error) {
    failures.push(`${route}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

if (failures.length) {
  console.error("\nReputation + Shareability Health FAILED");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("\nReputation + Shareability Health PASSED — evidence-only reputation, canonical quotes and journalist fast path are coherent.");
