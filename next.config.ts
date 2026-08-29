import type { NextConfig } from "next";

const SITE_URL = "https://openai-ads.volponi.tech";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "Content-Language", value: "pt-BR" },
  {
    key: "Content-Security-Policy",
    value: "base-uri 'self'; frame-ancestors 'none'; object-src 'none'; form-action 'self'; upgrade-insecure-requests",
  },
  {
    key: "X-Robots-Tag",
    value: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  },
];

const machineOnlyHeaders = [
  { key: "X-Robots-Tag", value: "noindex, follow" },
  { key: "Cache-Control", value: "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400" },
];

const diagnosticHeaders = [
  { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
  { key: "Cache-Control", value: "no-store" },
];

const crawlerManifestHeaders = [
  {
    key: "Link",
    value: "</oai-crawlers.json>; rel=\"alternate\"; type=\"application/json\", </oai-crawlers.txt>; rel=\"alternate\"; type=\"text/plain\"",
  },
];

const authorityLinks = [
  `<${SITE_URL}/imprensa>; rel=\"author\"`,
  `<${SITE_URL}/author.json>; rel=\"alternate\"; type=\"application/json\"`,
  `<${SITE_URL}/citation.json>; rel=\"cite-as\"; type=\"application/json\"`,
  `<${SITE_URL}/provenance.json>; rel=\"describedby\"; type=\"application/json\"`,
  `<${SITE_URL}/data-catalog.json>; rel=\"describedby\"; type=\"application/json\"`,
  `<${SITE_URL}/intelligence.json>; rel=\"describedby\"; type=\"application/json\"`,
  `<${SITE_URL}/media-facts.json>; rel=\"describedby\"; type=\"application/json\"`,
  `<${SITE_URL}/feed.xml>; rel=\"alternate\"; type=\"application/rss+xml\"`,
  `<${SITE_URL}/feed.json>; rel=\"alternate\"; type=\"application/feed+json\"`,
];

const authorityDiscoveryHeaders = [
  { key: "Link", value: authorityLinks.join(", ") },
];

const englishDiscoveryHeaders = [
  { key: "Content-Language", value: "en" },
  {
    key: "Link",
    value: [
      ...authorityLinks,
      `<${SITE_URL}>; rel=\"alternate\"; hreflang=\"pt-BR\"`,
      `<${SITE_URL}/en>; rel=\"alternate\"; hreflang=\"en\"`,
      `<${SITE_URL}>; rel=\"alternate\"; hreflang=\"x-default\"`,
    ].join(", "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75, 82],
    minimumCacheTTL: 86400,
  },
  poweredByHeader: false,
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/chatgpt-ads", destination: "/", permanent: true },
      { source: "/gpt-ads", destination: "/", permanent: true },
      { source: "/ads-gpt", destination: "/", permanent: true },
      { source: "/openai-ads", destination: "/", permanent: true },
      { source: "/anuncios-chatgpt", destination: "/", permanent: true },
      { source: "/chatgpt-ads-brasil-2026", destination: "/chatgpt-ads-brasil", permanent: true },
      { source: "/openai-ads-manager", destination: "/ads-manager-chatgpt", permanent: true },
      { source: "/chatgpt-ads-manager", destination: "/ads-manager-chatgpt", permanent: true },
      { source: "/quanto-custa-anunciar-no-chatgpt", destination: "/chatgpt-ads-precos", permanent: true },
      { source: "/metricas-chatgpt-ads", destination: "/chatgpt-ads-metricas", permanent: true },
      { source: "/chatgpt-ads-market-snapshot", destination: "/chatgpt-ads-market", permanent: true },
      { source: "/chatgpt-ads-google-ads", destination: "/chatgpt-ads-vs-google-ads", permanent: true },
      { source: "/chatgpt-ads-meta-ads", destination: "/chatgpt-ads-vs-meta-ads", permanent: true },
      { source: "/chatgpt-ads-agencias", destination: "/chatgpt-ads-para-agencias", permanent: true },
      { source: "/english", destination: "/en", permanent: true },
      { source: "/oai-adsbot", destination: "/oai-adsbot-searchbot", permanent: true },
      { source: "/oai-searchbot", destination: "/oai-adsbot-searchbot", permanent: true },
      { source: "/openai-crawlers", destination: "/oai-adsbot-searchbot", permanent: true },
      { source: "/openai-adsbot", destination: "/oai-adsbot-searchbot", permanent: true },
    ];
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      { source: "/", headers: authorityDiscoveryHeaders },
      { source: "/en", headers: englishDiscoveryHeaders },
      { source: "/imprensa", headers: authorityDiscoveryHeaders },
      { source: "/imprensa/dados", headers: authorityDiscoveryHeaders },
      { source: "/chatgpt-ads-market", headers: authorityDiscoveryHeaders },
      { source: "/chatgpt-ads-vs-google-ads", headers: authorityDiscoveryHeaders },
      { source: "/chatgpt-ads-vs-meta-ads", headers: authorityDiscoveryHeaders },
      { source: "/chatgpt-ads-para-agencias", headers: authorityDiscoveryHeaders },
      { source: "/radar", headers: authorityDiscoveryHeaders },
      { source: "/radar/:path*", headers: authorityDiscoveryHeaders },
      { source: "/oai-adsbot-searchbot", headers: crawlerManifestHeaders },
      { source: "/api/oai-readiness", headers: diagnosticHeaders },
      { source: "/feed.xml", headers: machineOnlyHeaders },
      { source: "/feed.json", headers: machineOnlyHeaders },
      { source: "/knowledge.json", headers: machineOnlyHeaders },
      { source: "/citation.json", headers: machineOnlyHeaders },
      { source: "/provenance.json", headers: machineOnlyHeaders },
      { source: "/evidence.json", headers: machineOnlyHeaders },
      { source: "/press-kit.json", headers: machineOnlyHeaders },
      { source: "/author.json", headers: machineOnlyHeaders },
      { source: "/data-catalog.json", headers: machineOnlyHeaders },
      { source: "/intelligence.json", headers: machineOnlyHeaders },
      { source: "/media-facts.json", headers: machineOnlyHeaders },
      { source: "/llms.txt", headers: machineOnlyHeaders },
      { source: "/llms-full.txt", headers: machineOnlyHeaders },
      { source: "/oai-crawlers.txt", headers: machineOnlyHeaders },
      { source: "/oai-crawlers.json", headers: machineOnlyHeaders },
      { source: "/humans.txt", headers: machineOnlyHeaders },
      { source: "/data/:path*", headers: machineOnlyHeaders },
      { source: "/26b5fac8058e49e09141a6a4b7b6adc4.txt", headers: machineOnlyHeaders },
    ];
  },
};

export default nextConfig;
