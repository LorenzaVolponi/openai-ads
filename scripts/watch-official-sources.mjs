import { createHash } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const stateFile = process.env.RADAR_WATCH_STATE || ".radar-watch/state.json";
const reportFile = process.env.RADAR_WATCH_REPORT || ".radar-watch/report.md";
const freshnessPolicy = JSON.parse(
  await readFile(new URL("../data/freshness-policy.json", import.meta.url), "utf8"),
);

const sources = freshnessPolicy.sources.map((source) => ({
  id: source.id,
  label: source.label,
  url: source.url,
  markers: source.markers,
}));

function decodeEntities(value) {
  return value
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function htmlToText(html) {
  return decodeEntities(
    html
      .replace(/<!--[\s\S]*?-->/g, " ")
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, " ")
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, " ")
      .replace(/<[^>]+>/g, " "),
  )
    .replace(/\s+/g, " ")
    .trim();
}

function buildSignature(text, markers) {
  const lower = text.toLocaleLowerCase("en-US");
  const windows = [];

  for (const marker of markers) {
    let startAt = 0;
    const needle = marker.toLocaleLowerCase("en-US");

    while (startAt < lower.length) {
      const index = lower.indexOf(needle, startAt);
      if (index === -1) break;
      windows.push(text.slice(Math.max(0, index - 450), Math.min(text.length, index + 900)));
      startAt = index + needle.length;
      if (windows.length >= 24) break;
    }
  }

  const signature = (windows.length ? windows : [text.slice(0, 12000)])
    .map((value) => value.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter((value, index, values) => values.indexOf(value) === index)
    .join("\n---\n")
    .slice(0, 30000);

  return signature;
}

function fingerprint(value) {
  return createHash("sha256").update(value).digest("hex");
}

function reviewDueAt(verifiedAt, days) {
  const date = new Date(`${verifiedAt}T00:00:00Z`);
  date.setUTCDate(date.getUTCDate() + days);
  return date;
}

async function fetchSource(source) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);

  try {
    const response = await fetch(source.url, {
      redirect: "follow",
      signal: controller.signal,
      headers: {
        "user-agent": "VolponiRadarSourceWatcher/2.0 (+https://openai-ads.volponi.tech/metodologia)",
        accept: "text/html,application/xhtml+xml",
      },
    });

    const html = await response.text();
    const text = htmlToText(html);
    const signature = buildSignature(text, source.markers);

    return {
      id: source.id,
      label: source.label,
      url: source.url,
      finalUrl: response.url,
      status: response.status,
      etag: response.headers.get("etag"),
      lastModified: response.headers.get("last-modified"),
      fingerprint: fingerprint(`${response.status}\n${signature}`),
      excerpt: signature.slice(0, 900),
      checkedAt: new Date().toISOString(),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return {
      id: source.id,
      label: source.label,
      url: source.url,
      finalUrl: source.url,
      status: 0,
      etag: null,
      lastModified: null,
      fingerprint: fingerprint(`ERROR\n${message}`),
      excerpt: `Fetch error: ${message}`,
      checkedAt: new Date().toISOString(),
    };
  } finally {
    clearTimeout(timeout);
  }
}

async function readPreviousState() {
  try {
    return JSON.parse(await readFile(stateFile, "utf8"));
  } catch {
    return null;
  }
}

function short(hash) {
  return hash ? hash.slice(0, 12) : "—";
}

async function setOutput(name, value) {
  if (!process.env.GITHUB_OUTPUT) return;
  await writeFile(process.env.GITHUB_OUTPUT, `${name}=${value}\n`, { flag: "a" });
}

await mkdir(path.dirname(stateFile), { recursive: true });
const previous = await readPreviousState();
const currentSources = await Promise.all(sources.map(fetchSource));
const now = new Date();
const reviewDueSources = freshnessPolicy.sources
  .filter((source) => source.reviewAfterDays !== null)
  .map((source) => ({
    ...source,
    reviewDueAt: reviewDueAt(freshnessPolicy.editorialSnapshotVerifiedAt, source.reviewAfterDays),
  }))
  .filter((source) => now.getTime() >= source.reviewDueAt.getTime());
const reviewDue = reviewDueSources.length > 0;

const current = {
  version: 2,
  checkedAt: now.toISOString(),
  editorialSnapshotVerifiedAt: freshnessPolicy.editorialSnapshotVerifiedAt,
  reviewDue,
  reviewDueSourceIds: reviewDueSources.map((source) => source.id),
  sources: Object.fromEntries(currentSources.map((source) => [source.id, source])),
};

const changes = [];
const newlyTracked = [];
if (previous?.sources) {
  for (const source of currentSources) {
    const old = previous.sources[source.id];
    if (!old) {
      newlyTracked.push(source);
      continue;
    }
    if (old.fingerprint !== source.fingerprint) {
      changes.push({ source, old });
    }
  }
}

const seeded = !previous?.sources;
const changed = !seeded && changes.length > 0;

const lines = [
  "## Volponi Radar — revisão de fonte oficial",
  "",
  `Checagem automatizada: ${current.checkedAt}`,
  `Snapshot editorial publicado: ${freshnessPolicy.editorialSnapshotVerifiedAt}`,
  "",
  "Este monitor **não publica nem renova fatos automaticamente**. Mudança de fingerprint e vencimento de janela editorial são sinais para revisão humana/editorial antes de alterar o Radar.",
  "",
];

if (changes.length) {
  lines.push("### Mudanças de assinatura detectadas", "", "| Fonte | HTTP | fingerprint anterior | fingerprint atual |", "|---|---:|---|---|");
  for (const { source, old } of changes) {
    lines.push(`| [${source.label}](${source.url}) | ${source.status} | ${short(old?.fingerprint)} | ${short(source.fingerprint)} |`);
  }
  lines.push("", "### Trechos atuais para triagem", "");
  for (const { source } of changes) {
    lines.push(`#### ${source.label}`, "", "```text", source.excerpt, "```", "");
  }
} else {
  lines.push(seeded ? "Baseline inicial criado; nenhuma mudança comparável foi avaliada." : "Nenhuma mudança material detectada nas assinaturas monitoradas.", "");
}

if (reviewDueSources.length) {
  lines.push("### Janela editorial atingida", "", "As fontes mutáveis abaixo já atingiram a janela configurada de rechecagem editorial. Isso **não significa que o conteúdo esteja errado**; significa que o snapshot histórico não deve ser apresentado como estado atual sem nova validação editorial.", "", "| Fonte | classe | revisão a cada | revisão devida desde |", "|---|---|---:|---|");
  for (const source of reviewDueSources) {
    lines.push(`| [${source.label}](${source.url}) | ${source.lifecycle} | ${source.reviewAfterDays} dias | ${source.reviewDueAt.toISOString().slice(0, 10)} |`);
  }
  lines.push("");
}

if (newlyTracked.length) {
  lines.push("### Novas fontes adicionadas ao monitoramento", "");
  for (const source of newlyTracked) {
    lines.push(`- ${source.label}: baseline criado sem gerar alerta de mudança.`);
  }
  lines.push("");
}

lines.push(
  "### Fronteira de evidência",
  "",
  freshnessPolicy.policy.principle,
  "",
  "Status público de freshness: https://openai-ads.volponi.tech/freshness.json",
);

await writeFile(stateFile, `${JSON.stringify(current, null, 2)}\n`);
await writeFile(reportFile, `${lines.join("\n")}\n`);
await setOutput("changed", String(changed));
await setOutput("seeded", String(seeded));
await setOutput("review_due", String(reviewDue));
await setOutput("changed_count", String(changes.length));
await setOutput("review_due_count", String(reviewDueSources.length));
await setOutput("new_source_count", String(newlyTracked.length));
await setOutput("report_path", reportFile);

console.log(
  seeded
    ? `Radar source watcher baseline seeded; ${reviewDueSources.length} source(s) reached editorial review window.`
    : `Radar source watcher: ${changes.length} source change(s), ${reviewDueSources.length} review-due source(s), ${newlyTracked.length} new baseline source(s).`,
);
