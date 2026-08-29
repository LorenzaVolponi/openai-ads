import { writeFile } from "node:fs/promises";

const site = process.env.AUTHORITY_SITE || "https://openai-ads.volponi.tech";
const output = process.env.AUTHORITY_REPORT || "authority-observatory.md";

const queries = [
  "ChatGPT Ads Brasil",
  "como anunciar no ChatGPT",
  "ChatGPT Ads preço",
  "ChatGPT Ads métricas",
  "ChatGPT Ads privacidade",
  "ChatGPT Ads vs Google Ads",
  "ChatGPT Ads vs Meta Ads",
  "Lorenza Volponi ChatGPT Ads",
];

const checks = [
  ["hub", "/"], ["market", "/chatgpt-ads-market"], ["radar", "/radar"],
  ["press", "/imprensa/dados"], ["graph", "/intelligence.json"], ["facts", "/media-facts.json"],
];

const rows = [];
for (const [id, path] of checks) {
  try {
    const response = await fetch(`${site}${path}`, { redirect: "follow", headers: { "user-agent": "VolponiAuthorityObservatory/1.0" } });
    rows.push({ id, path, status: response.status, contentType: response.headers.get("content-type") || "" });
  } catch (error) {
    rows.push({ id, path, status: 0, contentType: error instanceof Error ? error.message : String(error) });
  }
}

const failed = rows.filter((row) => row.status < 200 || row.status >= 400);
const report = [
  "# Authority & Citation Observatory",
  "",
  `Generated: ${new Date().toISOString()}`,
  "",
  "## Authority surfaces",
  "",
  "| Surface | Path | HTTP | Content-Type |",
  "|---|---|---:|---|",
  ...rows.map((row) => `| ${row.id} | ${row.path} | ${row.status} | ${row.contentType.replaceAll("|", "\\|")} |`),
  "",
  "## Citation query portfolio",
  "",
  ...queries.map((query) => `- ${query}`),
  "",
  "## Interpretation boundary",
  "",
  "This observatory validates owned authority surfaces and defines the query portfolio to monitor. It does not fabricate rankings, backlinks, press citations or AI citations. External observations must come from Search Console or another verifiable source before being recorded as evidence.",
  "",
].join("\n");

await writeFile(output, report, "utf8");
console.log(report);
if (failed.length) process.exitCode = 1;
