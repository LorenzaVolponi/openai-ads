import { createSign } from "node:crypto";
import { writeFile } from "node:fs/promises";

const siteUrl = process.env.GSC_SITE_URL?.trim() || "sc-domain:openai-ads.volponi.tech";
const clientEmail = process.env.GSC_CLIENT_EMAIL?.trim();
const privateKey = process.env.GSC_PRIVATE_KEY?.replace(/\\n/g, "\n")?.trim();
const days = Math.max(7, Math.min(90, Number(process.env.GSC_DAYS || 28)));
const output = process.env.GSC_OPPORTUNITY_OUTPUT || "/tmp/search-opportunity-hunter.md";

if (!clientEmail || !privateKey) {
  await writeFile(output, "# Search Opportunity Hunter\n\nStatus: **not measured** — GSC credentials are not configured. No ranking or commercial opportunity claim was generated.\n", "utf8");
  console.log(`Search Opportunity Hunter: not measured; report written to ${output}`);
  process.exit(0);
}

function b64(input) { return Buffer.from(input).toString("base64url"); }
function iso(date) { return date.toISOString().slice(0, 10); }
function esc(value) { return String(value || "").replace(/\|/g, "\\|"); }
function pct(value) { return `${(Number(value || 0) * 100).toFixed(1)}%`; }

async function token() {
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${b64(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${b64(JSON.stringify({ iss: clientEmail, scope: "https://www.googleapis.com/auth/webmasters.readonly", aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }))}`;
  const signer = createSign("RSA-SHA256"); signer.update(unsigned); signer.end();
  const assertion = `${unsigned}.${signer.sign(privateKey).toString("base64url")}`;
  const response = await fetch("https://oauth2.googleapis.com/token", { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }), signal: AbortSignal.timeout(20000) });
  const payload = await response.json();
  if (!response.ok || !payload.access_token) throw new Error(`Google OAuth failed (${response.status})`);
  return payload.access_token;
}

async function rows(accessToken) {
  const end = new Date(); end.setUTCDate(end.getUTCDate() - 3);
  const start = new Date(end); start.setUTCDate(start.getUTCDate() - days + 1);
  const response = await fetch(`https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`, { method: "POST", headers: { authorization: `Bearer ${accessToken}`, "content-type": "application/json", "user-agent": "VolponiOpportunityHunter/1.0" }, body: JSON.stringify({ startDate: iso(start), endDate: iso(end), dimensions: ["query", "page", "country"], rowLimit: 25000, dataState: "final", type: "web" }), signal: AbortSignal.timeout(30000) });
  const payload = await response.json();
  if (!response.ok) throw new Error(`Search Console API failed (${response.status})`);
  return { rows: payload.rows || [], start, end };
}

function intent(query, page) {
  const text = `${query} ${page}`.toLowerCase();
  if (/consultant|consulting|advisor|advisory|work with|hire|expert/.test(text)) return "CONSULTING";
  if (/partner|partnership|co-delivery|collaboration/.test(text)) return "PARTNERSHIP";
  if (/agency|agencies/.test(text)) return "AGENCY";
  if (/brand|advertiser|campaign|strategy/.test(text)) return "BRAND";
  if (/press|media|interview|journalist/.test(text)) return "PRESS";
  return "INFORMATIONAL";
}

function score(row) {
  const query = row.keys?.[0] || "";
  const page = row.keys?.[1] || "";
  const kind = intent(query, page);
  const commercial = kind === "INFORMATIONAL" ? 1 : 2.6;
  const position = Number(row.position || 100);
  const impressions = Number(row.impressions || 0);
  const ctr = Number(row.ctr || 0);
  const positionBoost = position >= 4 && position <= 15 ? 3 : position > 15 && position <= 30 ? 1.5 : position <= 3 ? 0.8 : 0.5;
  const ctrBoost = ctr < 0.03 && impressions >= 20 ? 1.5 : 1;
  return impressions * commercial * positionBoost * ctrBoost;
}

function action(row) {
  const position = Number(row.position || 100);
  const impressions = Number(row.impressions || 0);
  const ctr = Number(row.ctr || 0);
  if (position >= 4 && position <= 10) return "PUSH TOP 3: strengthen answer block, title, internal links and external distribution";
  if (position > 10 && position <= 20) return "PAGE 1 ATTACK: improve intent match and authority before creating another URL";
  if (position <= 5 && impressions >= 30 && ctr < 0.03) return "CTR FIX: test title/description/snippet without changing facts";
  if (position > 20 && impressions >= 50) return "CONTENT GAP: inspect whether a dedicated intent page is justified";
  return "WATCH";
}

const accessToken = await token();
const data = await rows(accessToken);
const ranked = [...data.rows].sort((a, b) => score(b) - score(a)).slice(0, 40);
const commercial = ranked.filter((row) => intent(row.keys?.[0] || "", row.keys?.[1] || "") !== "INFORMATIONAL").slice(0, 20);

const lines = [
  "# Search Opportunity Hunter",
  "",
  `Window: **${iso(data.start)} → ${iso(data.end)}**`,
  `Property: **${siteUrl}**`,
  "Source: **Google Search Console API — final web search data**",
  "",
  "> Visibility is not a lead. A click is not a proposal. This report only prioritizes observable search demand and commercial intent.",
  "",
  "## Highest-value commercial opportunities",
  "",
  "| Intent | Query | Country | Page | Clicks | Impressions | CTR | Position | Recommended move |",
  "| --- | --- | --- | --- | ---: | ---: | ---: | ---: | --- |",
  ...commercial.map((row) => {
    const [query, page, country] = row.keys || [];
    return `| ${intent(query, page)} | ${esc(query)} | ${esc(country || "unknown")} | ${esc(page)} | ${Number(row.clicks || 0)} | ${Number(row.impressions || 0)} | ${pct(row.ctr)} | ${Number(row.position || 0).toFixed(1)} | ${action(row)} |`;
  }),
  "",
  "## Operating rule",
  "",
  "- Optimize existing URLs before creating near-duplicate pages.",
  "- Prioritize commercial queries in positions 4–15 with meaningful impressions.",
  "- Treat country as routing context, not proof of client quality.",
  "- Never infer lead, proposal, partnership or revenue from search visibility.",
  "",
  `Generated ${new Date().toISOString()}.`,
].join("\n");

await writeFile(output, lines, "utf8");
console.log(lines);
