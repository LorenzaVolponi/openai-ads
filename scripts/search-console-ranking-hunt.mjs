import { writeFile } from "node:fs/promises";
import { createSign } from "node:crypto";

const siteUrl = process.env.GSC_SITE_URL?.trim() || "sc-domain:openai-ads.volponi.tech";
const clientEmail = process.env.GSC_CLIENT_EMAIL?.trim();
const privateKey = process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, "\n")?.trim();
const days = Math.max(3, Math.min(90, Number(process.env.GSC_DAYS || 28)));
const outputPath = process.env.GSC_OUTPUT || "/tmp/search-console-ranking-hunt.md";
const minPublicImpressions = Math.max(5, Number(process.env.GSC_MIN_PUBLIC_IMPRESSIONS || 10));

function number(value, digits = 0) {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: digits }).format(Number(value || 0));
}

function pct(value) {
  return `${number(Number(value || 0) * 100, 1)}%`;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
}

function safeQuery(value) {
  const query = String(value || "").trim();
  if (!query || query.length > 160) return null;
  if (/@/.test(query)) return null;
  if (/\b(?:\+?\d[\d\s().-]{7,}\d)\b/.test(query)) return null;
  if (/\b\d{7,}\b/.test(query)) return null;
  return query;
}

async function writeNotMeasured(reason) {
  const report = `# Search Console English opportunity hunt\n\n` +
    `Status: **NOT_MEASURED**  \n` +
    `Property: **${siteUrl}**  \n` +
    `Reason: ${reason}\n\n` +
    `> No ranking, traffic, query or opportunity claim is inferred while Search Console evidence is unavailable.\n\n` +
    `## Next evidence gate\n\n` +
    `Connect a read-only Google Search Console service account through the repository secrets expected by this workflow. Until then, English ranking priorities remain unmeasured rather than estimated.\n`;
  await writeFile(outputPath, report, "utf8");
  console.log(report);
}

if (!clientEmail || !privateKey) {
  await writeNotMeasured("Google Search Console credentials are not available to this workflow.");
  process.exit(0);
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000);
  const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = base64url(JSON.stringify({
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const unsigned = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  const assertion = `${unsigned}.${signer.sign(privateKey).toString("base64url")}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    signal: AbortSignal.timeout(20000),
  });

  const payload = await response.json();
  if (!response.ok || !payload.access_token) {
    throw new Error(`Google OAuth failed (${response.status}).`);
  }
  return payload.access_token;
}

async function querySearchAnalytics(token, dimensions, rowLimit = 25000) {
  const end = new Date();
  end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end);
  start.setUTCDate(start.getUTCDate() - days + 1);

  const response = await fetch(
    `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "content-type": "application/json",
        accept: "application/json",
        "user-agent": "VolponiEnglishOpportunityHunter/2.0",
      },
      body: JSON.stringify({
        startDate: isoDate(start),
        endDate: isoDate(end),
        dimensions,
        rowLimit,
        dataState: "final",
        type: "web",
      }),
      signal: AbortSignal.timeout(30000),
    },
  );

  const payload = await response.json();
  if (!response.ok) {
    throw new Error(`Search Console API failed (${response.status}).`);
  }
  return { rows: payload.rows || [], start, end };
}

function rawQuery(row) {
  return safeQuery(row.keys?.[0]);
}

function queryLabel(row) {
  return String(rawQuery(row) || "(query withheld)").replace(/\|/g, "\\|");
}

function pagePath(row) {
  try {
    const value = String(row.keys?.[1] || "");
    return value ? new URL(value).pathname : "";
  } catch {
    return String(row.keys?.[1] || "");
  }
}

function pageLabel(row) {
  return String(pagePath(row) || row.keys?.[1] || "(sem página)").replace(/\|/g, "\\|");
}

const ENGLISH_AUTHORITY = /\b(ai expert|ai specialist|artificial intelligence|generative ai|ai systems?|ai product|ai ux|ux ui|conversational ux|geo|generative engine optimization|ai search|ai discovery|chatgpt ads|openai ads|conversational advertising|ai advertising|ai consultant|ai strategy|ai advisor|ai media expert)\b/i;
const ENGLISH_COMMERCIAL = /\b(consultant|consulting|strategy|strategist|advisor|advisory|agency|agencies|brand|brands|hire|expert|specialist|partner|partnership|services?|work with)\b/i;
const RESEARCH_MEDIA = /\b(index|radar|research|report|study|data|dataset|evidence|media|press|journalist|interview|source)\b/i;
const PORTUGUESE_SIGNAL = /\b(como|anunciar|anuncio|anuncios|preco|precos|custo|metricas|privacidade|brasil|publicidade|especialista|consultor|consultoria|busca|produto|agencia|agencias)\b/i;

function signals(row) {
  const query = rawQuery(row) || "";
  const path = pagePath(row);
  const englishAuthority = ENGLISH_AUTHORITY.test(query);
  const commercial = ENGLISH_COMMERCIAL.test(query);
  const researchMedia = RESEARCH_MEDIA.test(query);
  const englishSurface = path.startsWith("/en/") || path === "/en";
  const likelyEnglish = englishAuthority || commercial || researchMedia || (englishSurface && !PORTUGUESE_SIGNAL.test(query));
  return { englishAuthority, commercial, researchMedia, englishSurface, likelyEnglish };
}

function intentScore(row) {
  const pos = Number(row.position || 100);
  const impressions = Number(row.impressions || 0);
  const ctr = Number(row.ctr || 0);
  const signal = signals(row);
  let score = impressions;

  if (pos > 3 && pos <= 10) score *= 4;
  else if (pos > 10 && pos <= 20) score *= 2.6;
  else if (pos <= 3) score *= 0.65;
  else if (pos <= 40) score *= 1.25;

  if (signal.likelyEnglish) score *= 1.7;
  if (signal.englishAuthority) score *= 1.45;
  if (signal.commercial) score *= 1.45;
  if (signal.researchMedia) score *= 1.2;
  if (signal.englishSurface) score *= 1.15;
  if (ctr < 0.03 && impressions >= 20) score *= 1.35;
  return score;
}

function classify(row) {
  const position = Number(row.position || 100);
  const impressions = Number(row.impressions || 0);
  const ctr = Number(row.ctr || 0);
  const signal = signals(row);
  if (signal.likelyEnglish && position > 3 && position <= 10) return "EN → TOP 3";
  if (signal.likelyEnglish && position > 10 && position <= 20) return "EN → PAGE 1";
  if (position > 3 && position <= 10) return "EMPURRAR TOP 3";
  if (position > 10 && position <= 20) return "ATACAR PRIMEIRA PÁGINA";
  if (position <= 8 && impressions >= 30 && ctr < 0.03) return "REESCREVER SNIPPET";
  if (impressions >= 100 && ctr < 0.02) return "CTR BAIXO";
  return "OBSERVAR";
}

function expectedRoute(row) {
  const query = rawQuery(row) || "";
  if (/\b(lorenza volponi|ai expert|ai specialist|ai systems?|ai product|ai ux|ux ui)\b/i.test(query)) return "/en/lorenza-volponi";
  if (/\b(geo|generative engine optimization|ai search|ai discovery)\b/i.test(query)) return "/en/geo-ai-strategy";
  if (/\b(chatgpt ads consultant|chatgpt ads consulting|ai advertising consultant)\b/i.test(query)) return "/en/chatgpt-ads-consultant";
  if (/\b(chatgpt ads strategy|ai advertising strategy)\b/i.test(query)) return "/en/chatgpt-ads-strategy";
  if (/\b(ai index|volponi ai index|ai advertising readiness)\b/i.test(query)) return "/en/volponi-ai-index";
  if (/\b(radar|availability|market|markets|coming soon)\b/i.test(query)) return "/en/radar";
  if (/\b(press|media|journalist|interview|source)\b/i.test(query)) return "/en/press";
  if (/\b(price|pricing|cost|cpc|cpm|ocpc|bid|budget)\b/i.test(query)) return "/en/chatgpt-ads";
  return null;
}

function publishable(row) {
  return Boolean(rawQuery(row)) && Number(row.impressions || 0) >= minPublicImpressions;
}

function queryTable(rows, limit = 30) {
  const sorted = [...rows].filter(publishable).sort((a, b) => intentScore(b) - intentScore(a)).slice(0, limit);
  const lines = [
    "| Prioridade | Query | Página atual | Rota-alvo | Cliques | Impressões | CTR | Posição |",
    "| --- | --- | --- | --- | ---: | ---: | ---: | ---: |",
  ];
  for (const row of sorted) {
    lines.push(`| ${classify(row)} | ${queryLabel(row)} | ${pageLabel(row)} | ${expectedRoute(row) || "—"} | ${number(row.clicks)} | ${number(row.impressions)} | ${pct(row.ctr)} | ${number(row.position, 1)} |`);
  }
  if (lines.length === 2) lines.push("| — | Sem queries publicáveis nesta janela | — | — | 0 | 0 | — | — |");
  return lines.join("\n");
}

function bucket(rows, predicate, limit = 15) {
  return [...rows]
    .filter((row) => publishable(row) && predicate(row))
    .sort((a, b) => intentScore(b) - intentScore(a))
    .slice(0, limit);
}

function bulletRows(rows) {
  if (!rows.length) return "- Sem oportunidades com volume publicável suficiente nesta janela.";
  return rows.map((row) => {
    const target = expectedRoute(row);
    return `- **${queryLabel(row)}** → posição ${number(row.position, 1)}, ${number(row.impressions)} impressões, CTR ${pct(row.ctr)}; página atual: ${pageLabel(row)}${target ? `; rota semântica esperada: ${target}` : ""}.`;
  }).join("\n");
}

function cannibalization(rows) {
  const groups = new Map();
  for (const row of rows.filter(publishable)) {
    const query = rawQuery(row)?.toLowerCase();
    if (!query) continue;
    const group = groups.get(query) || [];
    group.push(row);
    groups.set(query, group);
  }

  const candidates = [...groups.entries()]
    .map(([query, items]) => ({
      query,
      items,
      pages: [...new Set(items.map(pagePath).filter(Boolean))],
      impressions: items.reduce((sum, item) => sum + Number(item.impressions || 0), 0),
    }))
    .filter((item) => item.pages.length > 1 && item.impressions >= minPublicImpressions * 2)
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 12);

  if (!candidates.length) return "- Nenhuma canibalização com volume suficiente detectada nesta janela.";
  return candidates.map((item) => `- **${item.query.replace(/\|/g, "\\|")}** → ${number(item.impressions)} impressões distribuídas entre ${item.pages.map((page) => `\`${page}\``).join(", ")}. Revisar intenção/canonical/internal linking antes de criar URL nova.`).join("\n");
}

let token;
try {
  token = await getAccessToken();
} catch (error) {
  await writeNotMeasured(error instanceof Error ? error.message : "Google OAuth unavailable.");
  process.exit(0);
}

let result;
try {
  result = await querySearchAnalytics(token, ["query", "page"]);
} catch (error) {
  await writeNotMeasured(error instanceof Error ? error.message : "Search Console API unavailable.");
  process.exit(0);
}

const { rows, start, end } = result;
const eligible = rows.filter(publishable);
const englishMaster = bucket(eligible, (row) => signals(row).likelyEnglish && row.position > 3 && row.position <= 20, 25);
const commercialAuthority = bucket(eligible, (row) => {
  const signal = signals(row);
  return (signal.commercial || signal.englishAuthority) && row.position <= 30;
}, 20);
const top3Push = bucket(eligible, (row) => row.position > 3 && row.position <= 10);
const pageOneAttack = bucket(eligible, (row) => row.position > 10 && row.position <= 20);
const ctrFix = bucket(eligible, (row) => row.position <= 8 && row.impressions >= 30 && row.ctr < 0.03);
const researchMedia = bucket(eligible, (row) => signals(row).researchMedia && row.position <= 30);

const report = `# Search Console English opportunity hunt\n\n` +
  `Status: **MEASURED**  \n` +
  `Janela: **${isoDate(start)} → ${isoDate(end)}** (${days} dias)  \n` +
  `Propriedade: **${siteUrl}**  \n` +
  `Fonte: **Google Search Console API — dados finais de busca web**  \n` +
  `Privacidade: somente queries com **≥ ${minPublicImpressions} impressões** e sem padrões de e-mail/telefone/identificadores longos entram neste relatório público.\n\n` +
  `> Este relatório não inventa ranking. Cada prioridade abaixo nasce de query, página, impressões, CTR e posição média entregues pelo Search Console.\n\n` +
  `## English master queue · posições 4–20\n\n${bulletRows(englishMaster)}\n\n` +
  `## Commercial + authority intent\n\n${bulletRows(commercialAuthority)}\n\n` +
  `## Fila completa priorizada\n\n${queryTable(eligible)}\n\n` +
  `## Empurrar para Top 3\n\n${bulletRows(top3Push)}\n\n` +
  `## Atacar primeira página\n\n${bulletRows(pageOneAttack)}\n\n` +
  `## Reescrever snippet / CTR\n\n${bulletRows(ctrFix)}\n\n` +
  `## Research / media discovery\n\n${bulletRows(researchMedia)}\n\n` +
  `## Possível canibalização semântica\n\n${cannibalization(eligible)}\n\n` +
  `## Regra operacional\n\n` +
  `- **English 4–10**: prioridade máxima; fortalecer a URL existente, evidência, resposta curta, internal links e snippet antes de qualquer nova página.\n` +
  `- **English 11–20**: revisar intenção e cobertura semântica; consolidar em rota canônica quando houver dispersão.\n` +
  `- **Commercial/authority**: Lorenza, AI systems, AI Product/UX/UI, GEO/AI Search e ChatGPT Ads devem convergir para a página certa — não para doorway pages.\n` +
  `- **Boa posição + CTR baixo**: testar title/description/snippet sem alterar fatos.\n` +
  `- **Canibalização**: corrigir canonical/internal linking/intenção antes de criar conteúdo adicional.\n` +
  `- Nunca fabricar autoridade, backlinks, datas, buscas, leads ou evidências.\n` +
  `- Tratar este relatório como fila de priorização editorial, não como auto-publicação.\n\n` +
  `---\nGerado automaticamente em ${new Date().toISOString()}.\n`;

await writeFile(outputPath, report, "utf8");
console.log(report);
