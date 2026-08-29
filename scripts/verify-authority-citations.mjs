import { readFile, writeFile } from "node:fs/promises";

const ledgerPath = process.env.AUTHORITY_CITATION_LEDGER || "data/authority-citations.json";
const markdownOutput = process.env.AUTHORITY_CITATION_REPORT || "authority-citations-report.md";
const jsonOutput = process.env.AUTHORITY_CITATION_JSON || "authority-citations-report.json";

const ledger = JSON.parse(await readFile(ledgerPath, "utf8"));
const records = Array.isArray(ledger.records) ? ledger.records : [];
const allowedKinds = new Set(ledger.policy?.acceptedKinds || ["backlink", "press", "academic", "industry", "ai-citation"]);

function normalize(value) {
  return String(value || "").toLocaleLowerCase("en-US");
}

function validateRecord(record, index) {
  const errors = [];
  if (!record?.id) errors.push("missing id");
  if (!record?.kind || !allowedKinds.has(record.kind)) errors.push("invalid kind");
  if (!record?.sourceUrl || !/^https:\/\//i.test(record.sourceUrl)) errors.push("sourceUrl must be https");
  if (!record?.title) errors.push("missing title");
  if (!record?.observedAt || !/^\d{4}-\d{2}-\d{2}/.test(record.observedAt)) errors.push("invalid observedAt");
  if (!Array.isArray(record?.markers) || record.markers.length === 0) errors.push("markers required");
  if (record?.status === "verified" && !record?.evidenceNote) errors.push("verified records require evidenceNote");
  if (!record?.status || !["candidate", "verified", "rejected"].includes(record.status)) errors.push("invalid status");
  return errors.map((message) => `record ${index + 1}: ${message}`);
}

async function inspect(record) {
  const validationErrors = validateRecord(record, records.indexOf(record));
  if (validationErrors.length) {
    return { id: record?.id || null, status: "invalid", sourceUrl: record?.sourceUrl || null, errors: validationErrors, matchedMarkers: [] };
  }

  if (record.status === "rejected") {
    return { id: record.id, status: "rejected", sourceUrl: record.sourceUrl, errors: [], matchedMarkers: [] };
  }

  try {
    const response = await fetch(record.sourceUrl, {
      redirect: "follow",
      signal: AbortSignal.timeout(25000),
      headers: {
        "user-agent": "VolponiAuthorityVerifier/1.0 (+https://openai-ads.volponi.tech/autoridade)",
        accept: "text/html,text/plain,application/xhtml+xml",
      },
    });
    const text = await response.text();
    const haystack = normalize(text);
    const matchedMarkers = record.markers.filter((marker) => haystack.includes(normalize(marker)));
    const liveVerified = response.ok && matchedMarkers.length > 0;
    const status = record.status === "verified" && liveVerified ? "verified" : liveVerified ? "candidate-confirmed" : "unconfirmed";
    return {
      id: record.id,
      kind: record.kind,
      title: record.title,
      sourceUrl: record.sourceUrl,
      declaredStatus: record.status,
      status,
      httpStatus: response.status,
      finalUrl: response.url,
      matchedMarkers,
      checkedAt: new Date().toISOString(),
      errors: [],
    };
  } catch (error) {
    return {
      id: record.id,
      kind: record.kind,
      title: record.title,
      sourceUrl: record.sourceUrl,
      declaredStatus: record.status,
      status: "fetch-error",
      httpStatus: 0,
      finalUrl: record.sourceUrl,
      matchedMarkers: [],
      checkedAt: new Date().toISOString(),
      errors: [error instanceof Error ? error.message : String(error)],
    };
  }
}

const results = [];
for (const record of records) results.push(await inspect(record));

const verified = results.filter((item) => item.status === "verified");
const candidates = results.filter((item) => item.status === "candidate-confirmed" || item.status === "unconfirmed");
const invalid = results.filter((item) => item.status === "invalid" || item.status === "fetch-error");

const payload = {
  schemaVersion: 1,
  generatedAt: new Date().toISOString(),
  ledgerPath,
  counts: {
    total: results.length,
    verified: verified.length,
    candidates: candidates.length,
    invalid: invalid.length,
  },
  results,
  boundary: "This verifier only confirms declared evidence URLs and markers. It does not discover or invent backlinks, press coverage, rankings or AI citations.",
};

const lines = [
  "# Verified Authority Evidence",
  "",
  `Generated: ${payload.generatedAt}`,
  "",
  `- Ledger records: **${payload.counts.total}**`,
  `- Verified: **${payload.counts.verified}**`,
  `- Candidates: **${payload.counts.candidates}**`,
  `- Invalid/fetch errors: **${payload.counts.invalid}**`,
  "",
  "> This report never fabricates authority signals. An external citation only counts after a verifiable source URL and declared marker are confirmed.",
  "",
];

if (!results.length) {
  lines.push("No external authority evidence has been declared yet. This is intentionally different from claiming zero citations across the web.", "");
} else {
  lines.push("| ID | Kind | Declared | Live check | Source |", "|---|---|---|---|---|");
  for (const item of results) {
    lines.push(`| ${item.id || "—"} | ${item.kind || "—"} | ${item.declaredStatus || "—"} | ${item.status} | ${item.sourceUrl ? `[source](${item.sourceUrl})` : "—"} |`);
  }
  lines.push("");
}

await writeFile(jsonOutput, JSON.stringify(payload, null, 2), "utf8");
await writeFile(markdownOutput, lines.join("\n"), "utf8");
console.log(lines.join("\n"));

if (results.some((item) => item.status === "invalid")) process.exitCode = 1;
