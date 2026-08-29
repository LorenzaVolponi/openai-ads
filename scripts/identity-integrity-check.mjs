import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const FORBIDDEN = [
  /m[aá]rcia\s+beatriz\s+cavalcante/iu,
  /m[aá]rcia\s+cavalcante/iu,
  /marcia\s+beatriz\s+cavalcante/iu,
  /marcia\s+cavalcante/iu,
];
const REQUIRED = /lorenza\s+volponi/iu;
const SKIP_DIRS = new Set([".git", ".next", "node_modules", ".vercel", "coverage"]);
const ALLOWED_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".mjs", ".cjs", ".json", ".md", ".txt", ".yml", ".yaml", ".cff", ".html", ".xml", ".csv"]);

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    if (entry.name.startsWith(".") && entry.name !== ".github") {
      if (entry.isDirectory()) continue;
    }
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) files.push(...await walk(full));
      continue;
    }
    if (ALLOWED_EXTENSIONS.has(path.extname(entry.name).toLowerCase()) || entry.name === "CITATION.cff") files.push(full);
  }
  return files;
}

const files = await walk(ROOT);
const violations = [];
let lorenzaMentions = 0;

for (const file of files) {
  let content;
  try {
    content = await readFile(file, "utf8");
  } catch {
    continue;
  }

  if (REQUIRED.test(content)) lorenzaMentions += 1;
  for (const pattern of FORBIDDEN) {
    if (pattern.test(content)) {
      violations.push(path.relative(ROOT, file));
      break;
    }
  }
}

if (violations.length) {
  console.error("Identity integrity check FAILED.");
  console.error("This repository is exclusively a Lorenza Volponi property. Forbidden cross-project identity references were found:");
  for (const file of violations) console.error(`- ${file}`);
  process.exit(1);
}

if (lorenzaMentions === 0) {
  console.error("Identity integrity check FAILED: no Lorenza Volponi identity reference found.");
  process.exit(1);
}

console.log(`Identity integrity check passed: no forbidden cross-project identity references found; Lorenza Volponi appears in ${lorenzaMentions} text files.`);
