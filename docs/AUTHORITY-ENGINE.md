# Authority Engine

The project treats authority as a measurable evidence pipeline rather than a publishing claim.

## Closed loop

1. Primary-source watcher detects material changes in official OpenAI surfaces by fingerprint.
2. Editorial review decides whether the change is factual, relevant and publishable.
3. Radar, evidence ledger, datasets, feeds and canonical pages are updated together.
4. Search/crawler health checks validate discoverability after deployment.
5. Google Search Console supplies verified impressions, clicks, CTR and position when credentials are configured.
6. Citation evidence is declared in `data/authority-citations.json` and live-checked against its source URL and markers.
7. The Authority Observatory consolidates owned health, Search Console evidence and citation verification into one scheduled report and GitHub issue.

## Non-negotiable boundary

Detection never auto-publishes factual claims. The system may prepare evidence and priorities, but human editorial review remains the publication gate.

The observatory never invents rankings, backlinks, press coverage or AI citations. An empty ledger means no evidence has been declared in the repository; it does not mean the web contains zero references.

## Citation evidence ledger

Each external evidence record must contain:

- stable `id`;
- kind: `backlink`, `press`, `academic`, `industry` or `ai-citation`;
- HTTPS `sourceUrl`;
- human-readable `title`;
- `observedAt` date;
- one or more `markers` expected on the source;
- status: `candidate`, `verified` or `rejected`;
- `evidenceNote` when status is `verified`.

`npm run authority:citations` fetches declared URLs and confirms markers. It verifies known evidence; it is not a web-wide discovery engine.

## Search Console

The existing Search Console integration uses read-only OAuth service-account credentials:

- `GSC_CLIENT_EMAIL`
- `GSC_PRIVATE_KEY`
- optional repository variable `GSC_SITE_URL`

When those secrets are absent, the unified workflow records that boundary and makes no ranking claim.

## Citation portfolio

- ChatGPT Ads Brasil
- como anunciar no ChatGPT
- ChatGPT Ads preço
- ChatGPT Ads métricas
- ChatGPT Ads privacidade
- ChatGPT Ads vs Google Ads
- ChatGPT Ads vs Meta Ads
- Lorenza Volponi ChatGPT Ads

## Public surfaces

- `/autoridade` — human-readable Authority Observatory.
- `/authority.json` — machine-readable methodology and evidence surfaces.
- `/intelligence.json` — topic/entity graph.
- `/evidence.json` — factual evidence ledger.
- `/provenance.json` — source revision and provenance.
- `/media-facts.json` — citation-ready factsheet.

## Scheduled output

`.github/workflows/authority-citation-observatory.yml` runs twice weekly and on demand. It:

1. validates owned authority surfaces;
2. verifies declared external citations;
3. pulls real Search Console signals when credentials exist;
4. composes one executive evidence report;
5. refreshes a single GitHub issue named `Authority Engine — verified signals`;
6. uploads the evidence bundle as a 30-day artifact.

This is deliberately zero-AI in the monitoring path: deterministic checks first, human interpretation second.
