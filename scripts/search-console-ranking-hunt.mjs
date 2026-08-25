import { writeFile } from "node:fs/promises";
import { createSign } from "node:crypto";

const siteUrl = process.env.GSC_SITE_URL?.trim() || "sc-domain:openai-ads.volponi.tech";
const clientEmail = process.env.GSC_CLIENT_EMAIL?.trim();
const privateKey = process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, "\n")?.trim();
const days = Math.max(3, Math.min(90, Number(process.env.GSC_DAYS || 28)));
const outputPath = process.env.GSC_OUTPUT || "/tmp/search-console-ranking-hunt.md";

if (!clientEmail || !privateKey) {
  console.error("GSC_CLIENT_EMAIL and GSC_PRIVATE_KEY are required.");
  process.exit(2);
}

function base64url(input) {
  return Buffer.from(input).toString("base64url");
}

function number(value, digits = 0) {
  return new Intl.NumberFormat("pt-BR", { maximumFractionDigits: digits }).format(Number(value || 0));
}

function pct(value) {
  return `${number(Number(value || 0) * 100, 1)}%`;
}

function isoDate(date) {
  return date.toISOString().slice(0, 10);
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
    throw new Error(`Google OAuth failed (${response.status}): ${JSON.stringify(payload)}`);
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
        "user-agent": "VolponiRankingHunt/1.0",
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
    throw new Error(`Search Console API failed (${response.status}): ${JSON.stringify(payload)}`);
  }
  return { rows: payload.rows || [], start, end };
}

function queryLabel(row) {
  return String(row.keys?.[0] || "(sem query)").replace(/\|/g, "\\|");
}

function pageLabel(row) {
  return String(row.keys?.[1] || row.keys?.[0] || "(sem página)").replace(/\|/g, "\\|");
}

function intentScore(row) {
  const pos = Number(row.position || 100);
  const impressions = Number(row.impressions || 0);
  const ctr = Number(row.ctr || 0);
  let score = impressions;
  if (pos >= 4 && pos <= 12) score *= 3;
  else if (pos > 12 && pos <= 20) score *= 1.8;
  else if (pos <= 3) score *= 0.7;
  if (ctr < 0.03 && impressions >= 20) score *= 1.5;
  return score;
}

function classify(row) {
  const position = Number(row.position || 100);
  const impressions = Number(row.impressions || 0);
  const ctr = Number(row.ctr || 0);
  if (position >= 4 && position <= 10) return "EMPURRAR TOP 3";
  if (position > 10 && position <= 20) return "ATACAR PRIMEIRA PÁGINA";
  if (position <= 5 && impressions >= 30 && ctr < 0.03) return "REESCREVER SNIPPET";
  if (impressions >= 100 && ctr < 0.02) return "CTR BAIXO";
  return "OBSERVAR";
}

function queryTable(rows, limit = 25) {
  const sorted = [...rows].sort((a, b) => intentScore(b) - intentScore(a)).slice(0, limit);
  const lines = [
    "| Prioridade | Query | Página | Cliques | Impressões | CTR | Posição |",
    "| --- | --- | --- | ---: | ---: | ---: | ---: |",
  ];
  for (const row of sorted) {
    lines.push(`| ${classify(row)} | ${queryLabel(row)} | ${pageLabel(row)} | ${number(row.clicks)} | ${number(row.impressions)} | ${pct(row.ctr)} | ${number(row.position, 1)} |`);
  }
  return lines.join("\n");
}

function bucket(rows, predicate, limit = 12) {
  return [...rows]
    .filter(predicate)
    .sort((a, b) => intentScore(b) - intentScore(a))
    .slice(0, limit);
}

function bulletRows(rows) {
  if (!rows.length) return "- Sem oportunidades suficientes nesta janela.";
  return rows.map((row) => `- **${queryLabel(row)}** → posição ${number(row.position, 1)}, ${number(row.impressions)} impressões, CTR ${pct(row.ctr)}; página: ${pageLabel(row)}.`).join("\n");
}

const token = await getAccessToken();
const { rows, start, end } = await querySearchAnalytics(token, ["query", "page"]);

const top3Push = bucket(rows, (r) => r.position > 3 && r.position <= 10 && r.impressions >= 10);
const pageOneAttack = bucket(rows, (r) => r.position > 10 && r.position <= 20 && r.impressions >= 10);
const ctrFix = bucket(rows, (r) => r.position <= 8 && r.impressions >= 30 && r.ctr < 0.03);
const risingAuthority = bucket(rows, (r) => r.position <= 12 && r.impressions >= 25 && /chatgpt|gpt|openai|ads|publicidade|anunciar/i.test(queryLabel(r)));

const report = `# Search Console ranking hunt\n\n` +
  `Janela: **${isoDate(start)} → ${isoDate(end)}** (${days} dias)  \n` +
  `Propriedade: **${siteUrl}**  \n` +
  `Fonte: **Google Search Console API — dados finais de busca web**\n\n` +
  `> Este relatório não inventa ranking. Ele só gera prioridades quando o Search Console entrega consultas reais, impressões, CTR e posição média.\n\n` +
  `## Fila de caça\n\n${queryTable(rows)}\n\n` +
  `## Empurrar para Top 3\n\n${bulletRows(top3Push)}\n\n` +
  `## Atacar primeira página\n\n${bulletRows(pageOneAttack)}\n\n` +
  `## Reescrever snippet / CTR\n\n${bulletRows(ctrFix)}\n\n` +
  `## Autoridade temática emergente\n\n${bulletRows(risingAuthority)}\n\n` +
  `## Regra operacional\n\n` +
  `- Posição **4–10**: fortalecer página existente com atualização factual, links internos, distribuição e backlinks relevantes.\n` +
  `- Posição **11–20**: revisar intenção, cobertura semântica e autoridade externa antes de criar novas URLs.\n` +
  `- Posição boa + CTR baixo: testar title/description/snippet sem alterar fatos.\n` +
  `- Nunca fabricar autoridade, backlinks, datas ou evidências.\n` +
  `- Tratar este relatório como fila de priorização editorial, não como auto-publicação.\n\n` +
  `---\nGerado automaticamente em ${new Date().toISOString()}.\n`;

await writeFile(outputPath, report, "utf8");
console.log(report);
