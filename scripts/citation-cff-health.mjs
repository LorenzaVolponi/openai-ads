import { readFile } from "node:fs/promises";

const source = await readFile("CITATION.cff", "utf8");
const required = [
  ["CFF 1.2.0", "cff-version: 1.2.0"],
  ["preferred citation block", "preferred-citation:"],
  ["Lorenza family name", 'family-names: "Volponi"'],
  ["Lorenza given name", 'given-names: "Lorenza"'],
  ["AI Index title", 'title: "Volponi AI Index — AI Advertising & Discovery Readiness"'],
  ["immutable edition URL", 'url: "https://openai-ads.volponi.tech/research/volponi-ai-index/2026-08.json"'],
];

const failures = required.filter(([, expected]) => !source.includes(expected));
if (failures.length) {
  console.error("Citation CFF Health FAILED");
  for (const [label] of failures) console.error(`- missing ${label}`);
  process.exit(1);
}

console.log("Citation CFF Health PASSED — preferred citation resolves to Lorenza Volponi and the immutable Volponi AI Index 2026.08 edition.");
