import { createSign } from "node:crypto";
import { writeFile } from "node:fs/promises";

const siteUrl = process.env.GSC_SITE_URL?.trim() || "sc-domain:openai-ads.volponi.tech";
const clientEmail = process.env.GSC_CLIENT_EMAIL?.trim();
const privateKey = process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, "\n")?.trim();
const days = Math.max(7, Math.min(90, Number(process.env.GSC_DAYS || 28)));
const output = process.env.ORGANIC_CLIENT_OUTPUT || "organic-client-intelligence.md";

function b64(value) { return Buffer.from(value).toString("base64url"); }
function iso(date) { return date.toISOString().slice(0, 10); }
function n(value, digits = 0) { return new Intl.NumberFormat("en-US", { maximumFractionDigits: digits }).format(Number(value || 0)); }
function pct(value) { return `${n(Number(value || 0) * 100, 1)}%`; }
function safe(value) { return String(value || "").replaceAll("|", "\\|"); }

function classify(query) {
  const q = query.toLowerCase();
  if (/consultant|consulting|advisor|advisory|expert|specialist|hire|freelance/.test(q)) return "CONSULTING";
  if (/agency|agencies|partner|partnership|white label|enablement/.test(q)) return "PARTNERSHIP";
  if (/brand|company|enterprise|business|for brands/.test(q)) return "BRAND";
  if (/strategy|strategist|market entry|pilot|readiness|implementation/.test(q)) return "COMMERCIAL";
  if (/press|journalist|media|interview|source/.test(q)) return "PRESS";
  return "INFORMATIONAL";
}

function score(row) {
  const intent = classify(row.keys?.[0] || "");
  const multiplier = { CONSULTING: 8, PARTNERSHIP: 7, BRAND: 6, COMMERCIAL: 5, PRESS: 3, INFORMATIONAL: 1 }[intent];
  const position = Number(row.position || 100);
  const positionWeight = position <= 3 ? 2 : position <= 10 ? 4 : position <= 20 ? 2.5 : 1;
  return Number(row.impressions || 0) * multiplier * positionWeight;
}

if (!clientEmail || !privateKey) {
  const report = `# Organic Client Intelligence\n\nStatus: **not measured**\n\nSearch Console credentials are not configured for this run. No query, country, ranking or commercial-demand data is fabricated.\n`;
  await writeFile(output, report, "utf8");
  console.log(report);
  process.exit(0);
}

async function token() {
  const now = Math.floor(Date.now() / 1000);
  const header = b64(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claim = b64(JSON.stringify({ iss: clientEmail, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }));
  const unsigned = `${header}.${claim}`;
  const signer = createSign("RSA-SHA256"); signer.update(unsigned); signer.end();
  const assertion = `${unsigned}.${signer.sign(privateKey).toString("base64url")}`;
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }), signal: AbortSignal.timeout(20000) });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error(`Google OAuth failed (${response.status})`);
  return data.access_token;
}

async function query(accessToken) {
  const end = new Date(); end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end); start.setUTCDate(start.getUTCDate() - days + 1);
  const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, { method: "POST", headers: { authorization: `Bearer ${accessToken}`, "content-type": "application/json" }, body: JSON.stringify({ startDate: iso(start), endDate: iso(end), dimensions: ["query", "page", "country"], rowLimit: 25000, dataState: "final", type: "web" }), signal: AbortSignal.timeout(30000) });
  const data = await response.json();
  if (!response.ok) throw new Error(`Search Console API failed (${response.status})`);
  return { rows: data.rows || [], start, end };
}

const accessToken = await token();
const { rows, start, end } = await query(accessToken);
const commercial = rows.filter((row) => classify(row.keys?.[0] || "") !== "INFORMATIONAL").sort((a, b) => score(b) - score(a));
const countryMap = new Map();
for (const row of commercial) {
  const country = row.keys?.[2] || "unknown";
  const current = countryMap.get(country) || { impressions: 0, clicks: 0 };
  current.impressions += Number(row.impressions || 0); current.clicks += Number(row.clicks || 0); countryMap.set(country, current);
}
const topCountries = [...countryMap.entries()].sort((a, b) => b[1].impressions - a[1].impressions).slice(0, 12);
const table = commercial.slice(0, 40).map((row) => `| ${classify(row.keys?.[0] || "")} | ${safe(row.keys?.[0])} | ${safe(row.keys?.[2])} | ${n(row.impressions)} | ${n(row.clicks)} | ${pct(row.ctr)} | ${n(row.position, 1)} | ${safe(row.keys?.[1])} |`).join("\n") || "| — | No commercial-intent queries detected in this window | — | — | — | — | — | — |";
const report = `# Organic Client Intelligence\n\nWindow: **${iso(start)} → ${iso(end)}**  \nProperty: **${siteUrl}**  \nSource: **Google Search Console final web data**\n\n> This report classifies real search demand. It does not claim that a query became a lead or client unless a separate verified conversion signal exists.\n\n## Commercial-intent opportunities\n\n| Intent | Query | Country | Impressions | Clicks | CTR | Position | Landing page |\n|---|---|---|---:|---:|---:|---:|---|\n${table}\n\n## Countries generating commercial-intent visibility\n\n${topCountries.length ? topCountries.map(([country, value]) => `- **${country}** — ${n(value.impressions)} impressions, ${n(value.clicks)} clicks`).join("\n") : "- No commercial-intent country signal yet."}\n\n## Operating rule\n\n- CONSULTING/PARTNERSHIP queries in positions 4–20 are priority pages for internal links, external distribution and evidence-rich updates.\n- High impressions + low CTR means snippet/message opportunity before creating another URL.\n- Custom Vercel event \`organic_client_intent\` tracks clicks on commercial CTAs; Search Console and click events are separate evidence layers.\n- A click is not a lead. A lead is not a client. Revenue is only recorded from verified commercial systems.\n\nGenerated ${new Date().toISOString()}.\n`;
await writeFile(output, report, "utf8");
console.log(report);
