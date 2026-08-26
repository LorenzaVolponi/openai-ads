import { SITE_URL } from "@/lib/editorial-meta";

export const OAI_READINESS_REVIEWED_AT = "2026-08-26";
export const OAI_CRAWLER_GUIDE_URL = `${SITE_URL}/oai-adsbot-searchbot`;
export const OAI_ADVERTISER_GUIDE_URL =
  "https://help.openai.com/pt-br/articles/20001243-advertiser-guidance-for-allowing-openai-web-crawlers";
export const OAI_PUBLISHER_FAQ_URL =
  "https://help.openai.com/en/articles/12627856-publishers-and-developers-faq";

export const OPENAI_CRAWLERS = [
  {
    userAgent: "OAI-AdsBot",
    kind: "ads",
    role: "ChatGPT Ads landing-page validation and review",
    advertiserPriority: "required",
    robotsExample: "User-agent: OAI-AdsBot\nAllow: /",
    documentedUses: [
      "validate safety and policy compliance of pages submitted as ads",
      "landing-page content may be used to help determine when an ad is relevant to show",
    ],
    ipRanges: "https://openai.com/adsbot.json",
    officialSource: OAI_ADVERTISER_GUIDE_URL,
  },
  {
    userAgent: "OAI-SearchBot",
    kind: "search",
    role: "public web discovery for ChatGPT search experiences",
    advertiserPriority: "recommended alongside OAI-AdsBot",
    robotsExample: "User-agent: OAI-SearchBot\nAllow: /",
    documentedUses: [
      "helps public content be discovered and surfaced",
      "allows eligible content to appear in summaries and snippets",
      "supports clear citations and links in ChatGPT search experiences",
    ],
    referralSignal: "utm_source=chatgpt.com",
    ipRanges: "https://openai.com/searchbot.json",
    officialSource: OAI_PUBLISHER_FAQ_URL,
  },
  {
    userAgent: "GPTBot",
    kind: "training-control",
    role: "separate publisher control associated with potential training",
    advertiserPriority: "separate control",
    robotsExample: "User-agent: GPTBot\nAllow: /",
    documentedUses: [
      "publishers can disallow GPTBot on sites or pages they wish to exclude from potential training",
      "GPTBot must not be treated as interchangeable with OAI-AdsBot or OAI-SearchBot",
    ],
    officialSource: OAI_PUBLISHER_FAQ_URL,
  },
] as const;

export const OPENAI_CRAWLER_USER_AGENTS = OPENAI_CRAWLERS.map(
  (crawler) => crawler.userAgent,
);

export const OAI_INFRASTRUCTURE_CHECKS = [
  "robots.txt explicitly permits the intended crawler and path",
  "landing page returns a successful HTTP response without authentication",
  "WAF/CDN/bot mitigation does not return 403",
  "CAPTCHA or JavaScript challenges do not block crawler access",
  "geo restrictions do not block validation",
  "rate limiting does not return 429 during crawler activity",
  "redirect chains resolve to a crawlable web destination",
  "IP allowlists reference current official OpenAI JSON endpoints when required",
] as const;

export const OAI_READINESS_LIMITS = [
  "Crawler access does not guarantee ChatGPT Search ranking, citation, indexing or ad delivery.",
  "Allowing OAI-AdsBot is a technical prerequisite for the documented ads-review flow, not a guarantee of ad approval.",
  "GPTBot is a separate potential-training control and does not substitute for OAI-SearchBot discovery or OAI-AdsBot ads readiness.",
  "Official crawler behavior and IP ranges may change; operational decisions should re-check OpenAI primary sources.",
] as const;

export function classifyOpenAIUserAgent(userAgent: string) {
  const normalized = userAgent.toLowerCase();
  return (
    OPENAI_CRAWLERS.find((crawler) =>
      normalized.includes(crawler.userAgent.toLowerCase()),
    ) ?? null
  );
}

export function buildOaiCrawlerManifest() {
  return {
    schemaVersion: 2,
    canonical: OAI_CRAWLER_GUIDE_URL,
    publisher: "volponi.tech",
    author: "Lorenza Volponi",
    language: "pt-BR",
    reviewedAt: OAI_READINESS_REVIEWED_AT,
    type: "independent crawler-readiness reference",
    independence:
      "This is an independent editorial and technical reference. It is not an OpenAI standard, partnership, certification or official crawler manifest.",
    crawlers: Object.fromEntries(
      OPENAI_CRAWLERS.map((crawler) => [crawler.userAgent, crawler]),
    ),
    infrastructureChecks: OAI_INFRASTRUCTURE_CHECKS,
    siteImplementation: {
      robots: `${SITE_URL}/robots.txt`,
      sitemap: `${SITE_URL}/sitemap.xml`,
      humanGuide: OAI_CRAWLER_GUIDE_URL,
      textManifest: `${SITE_URL}/oai-crawlers.txt`,
      jsonManifest: `${SITE_URL}/oai-crawlers.json`,
      diagnosticEndpoint: `${SITE_URL}/api/oai-readiness`,
    },
    backend: {
      sourceOfTruth: "src/lib/oai-crawler-readiness.ts",
      manifestsGeneratedAtRequestTime: true,
      diagnosticEndpointIsPublicAndReadOnly: true,
      diagnosticEndpointStoresRequests: false,
    },
    limits: OAI_READINESS_LIMITS,
  };
}

export function buildOaiCrawlerTextManifest() {
  const lines = [
    "# OpenAI crawler readiness — volponi.tech",
    "",
    `Canonical guide: ${OAI_CRAWLER_GUIDE_URL}`,
    "Language: pt-BR",
    `Last reviewed: ${OAI_READINESS_REVIEWED_AT}`,
    "Source of truth: src/lib/oai-crawler-readiness.ts",
    `Diagnostic endpoint: ${SITE_URL}/api/oai-readiness`,
    "",
  ];

  for (const crawler of OPENAI_CRAWLERS) {
    lines.push(`## ${crawler.userAgent}`);
    lines.push(`Purpose: ${crawler.role}.`);
    lines.push(`Operational priority: ${crawler.advertiserPriority}.`);
    lines.push("robots.txt:");
    lines.push(crawler.robotsExample);
    if ("ipRanges" in crawler && crawler.ipRanges) {
      lines.push(`Published IP ranges: ${crawler.ipRanges}`);
    }
    if ("referralSignal" in crawler && crawler.referralSignal) {
      lines.push(`Referral signal: ${crawler.referralSignal}`);
    }
    for (const documentedUse of crawler.documentedUses) {
      lines.push(`Documented note: ${documentedUse}.`);
    }
    lines.push(`Official source: ${crawler.officialSource}`);
    lines.push("");
  }

  lines.push("## Infrastructure checklist");
  for (const item of OAI_INFRASTRUCTURE_CHECKS) lines.push(`- ${item}`);
  lines.push("");
  lines.push("## Limits");
  for (const item of OAI_READINESS_LIMITS) lines.push(`- ${item}`);
  lines.push("");
  lines.push(
    "This is an independent editorial resource by volponi.tech and is not affiliated with, sponsored by, endorsed by, certified by, operated by, or maintained by OpenAI.",
  );
  lines.push("");

  return lines.join("\n");
}
