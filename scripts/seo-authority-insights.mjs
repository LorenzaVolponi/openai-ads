const API_BASE = "https://api.vercel.com/v1/query/web-analytics/visits";
const token = process.env.VERCEL_TOKEN?.trim();
const projectId = process.env.VERCEL_PROJECT_ID?.trim() || "prj_M3T9oOgs7yMDQbyVStxZL29wxmVA";
const teamSlug = process.env.VERCEL_TEAM_SLUG?.trim() || "adm-wuazecoms-projects";
const days = Math.max(1, Math.min(90, Number(process.env.INSIGHTS_DAYS || 7)));
const outputPath = process.env.INSIGHTS_OUTPUT || "/tmp/seo-authority-insights.md";

if (!token) {
  console.error("VERCEL_TOKEN is required to query Web Analytics.");
  process.exit(2);
}

const until = new Date();
const since = new Date(until.getTime() - days * 24 * 60 * 60 * 1000);

function number(value) {
  return new Intl.NumberFormat("pt-BR").format(Number(value || 0));
}

function valueOf(row, key) {
  return row?.[key] ?? row?.value ?? row?.name ?? "(unknown)";
}

async function query(path, params = {}) {
  const url = new URL(`${API_BASE}/${path}`);
  url.searchParams.set("projectId", projectId);
  url.searchParams.set("slug", teamSlug);
  url.searchParams.set("since", since.toISOString());
  url.searchParams.set("until", until.toISOString());
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
  }

  const response = await fetch(url, {
    headers: {
      authorization: `Bearer ${token}`,
      accept: "application/json",
      "user-agent": "VolponiSEOInsights/1.0",
    },
    signal: AbortSignal.timeout(20000),
  });

  const text = await response.text();
  let payload = null;
  try {
    payload = text ? JSON.parse(text) : null;
  } catch {
    payload = { raw: text };
  }

  if (!response.ok) {
    const error = new Error(`Vercel Web Analytics API ${response.status} for ${path}`);
    error.status = response.status;
    error.payload = payload;
    throw error;
  }
  return payload;
}

function table(rows, dimension, limit = 12) {
  if (!Array.isArray(rows) || rows.length === 0) return "_Sem dados suficientes nesta janela._\n";
  const lines = ["| Valor | Pageviews | Visitantes |", "| --- | ---: | ---: |"]; 
  for (const row of rows.slice(0, limit)) {
    const label = String(valueOf(row, dimension)).replace(/\|/g, "\\|");
    lines.push(`| ${label} | ${number(row.pageviews ?? row.count)} | ${number(row.visitors)} |`);
  }
  return `${lines.join("\n")}\n`;
}

function recommendationBlock(pathRows, referrerRows) {
  const rows = Array.isArray(pathRows) ? pathRows : [];
  const referrers = Array.isArray(referrerRows) ? referrerRows : [];
  const deepDive = rows.find((row) => String(valueOf(row, "requestPath")) !== "/");
  const searchRef = referrers.find((row) => /google|bing|duckduckgo|yahoo/i.test(String(valueOf(row, "referrerHostname"))));
  const notes = [];

  if (deepDive) {
    notes.push(`- **Página profunda com maior atenção:** \`${valueOf(deepDive, "requestPath")}\` (${number(deepDive.pageviews)} pageviews). Prioridade para backlinks, distribuição e atualização factual — não para duplicar conteúdo.`);
  } else {
    notes.push("- Ainda não há volume suficiente em páginas profundas para priorizar um cluster por comportamento.");
  }

  if (searchRef) {
    notes.push(`- **Busca orgânica já aparece entre os referrers:** ${valueOf(searchRef, "referrerHostname")} (${number(searchRef.pageviews)} pageviews). O próximo salto depende de Search Console para enxergar queries/posição/CTR.`);
  } else {
    notes.push("- Referrer de busca ainda não aparece com volume relevante nesta janela. Continue fortalecendo autoridade externa e aguarde indexação/recrawl antes de tirar conclusões.");
  }

  notes.push("- **Regra editorial:** use estes dados para priorizar atualização, links e distribuição; não altere fatos para perseguir CTR e não crie doorway pages.");
  notes.push("- **Limite do relatório:** Vercel Web Analytics mostra audiência e referrer, não posição no Google. Queries/ranking exigem Google Search Console.");
  return notes.join("\n");
}

let report;
try {
  const [count, paths, referrers, countries, devices] = await Promise.all([
    query("count"),
    query("aggregate", { by: "requestPath", limit: 20 }),
    query("aggregate", { by: "referrerHostname", limit: 15 }),
    query("aggregate", { by: "country", limit: 12 }),
    query("aggregate", { by: "deviceType", limit: 10 }),
  ]);

  const total = count?.data || {};
  const pathRows = paths?.data || [];
  const referrerRows = referrers?.data || [];

  report = `# SEO authority weekly insights\n\n` +
    `Janela: **${since.toISOString().slice(0, 10)} → ${until.toISOString().slice(0, 10)}** (${days} dias)  \n` +
    `Projeto: **openai-ads.volponi.tech**  \n` +
    `Fonte: **Vercel Web Analytics agregado**\n\n` +
    `> Este relatório não contém nome, e-mail, texto digitado na Raposa, conteúdo do Ad Quality Review ou outros campos de usuário. Ele serve para priorização editorial/SEO.\n\n` +
    `## Pulso\n\n` +
    `- Pageviews: **${number(total.pageviews)}**\n` +
    `- Visitantes: **${number(total.visitors)}**\n\n` +
    `## Páginas com mais atenção\n\n${table(pathRows, "requestPath", 15)}\n` +
    `## Referrers\n\n${table(referrerRows, "referrerHostname", 12)}\n` +
    `## Países\n\n${table(countries?.data || [], "country", 10)}\n` +
    `## Dispositivos\n\n${table(devices?.data || [], "deviceType", 8)}\n` +
    `## Decisões sugeridas\n\n${recommendationBlock(pathRows, referrerRows)}\n\n` +
    `---\nGerado automaticamente em ${until.toISOString()}.`;
} catch (error) {
  const status = error?.status ? `HTTP ${error.status}` : "erro de rede/API";
  report = `# SEO authority weekly insights\n\n` +
    `A leitura agregada do Vercel Web Analytics não ficou disponível nesta execução (${status}).\n\n` +
    `Isto **não afeta produção, SEO, indexação nem o funcionamento do site**. Pode significar analytics recém-habilitado, ausência de dados suficientes, permissão da API ou indisponibilidade temporária.\n\n` +
    `Janela solicitada: ${since.toISOString()} → ${until.toISOString()}.\n`;
  console.warn(error instanceof Error ? error.message : String(error));
}

await import("node:fs/promises").then(({ writeFile }) => writeFile(outputPath, `${report}\n`, "utf8"));
console.log(report);
