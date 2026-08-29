# Authority Engine Operations

## GitHub configuration

The unified observatory works without paid AI services. For real Google Search Console evidence, configure repository secrets:

- `GSC_CLIENT_EMAIL`
- `GSC_PRIVATE_KEY`

Optional repository variable:

- `GSC_SITE_URL` (defaults to `sc-domain:openai-ads.volponi.tech`)

## External citation workflow

1. Add a real source to `data/authority-citations.json` with status `candidate`.
2. Add markers that should be present on the source page, such as the canonical domain, author name or cited page URL.
3. Run `npm run authority:citations` or dispatch `Authority Citation Observatory`.
4. Review the generated live-check report.
5. Only after human review, change the record to `verified` and add a concise `evidenceNote`.

## Automation cadence

The unified workflow runs Monday and Thursday and can also be dispatched manually. It refreshes a single GitHub issue rather than generating issue spam.

## What the system does not do

- It does not infer a backlink from a social mention.
- It does not call an AI model and treat the answer as proof of an AI citation.
- It does not scrape search result pages and declare their order a stable ranking.
- It does not auto-publish source changes as editorial facts.
- It does not claim absence of citations when the ledger is empty.

Those boundaries are intentional governance, not missing features.
