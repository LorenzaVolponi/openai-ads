import type { NextConfig } from "next";

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
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      { source: "/feed.xml", headers: machineOnlyHeaders },
      { source: "/feed.json", headers: machineOnlyHeaders },
      { source: "/knowledge.json", headers: machineOnlyHeaders },
      { source: "/citation.json", headers: machineOnlyHeaders },
      { source: "/provenance.json", headers: machineOnlyHeaders },
      { source: "/llms.txt", headers: machineOnlyHeaders },
      { source: "/llms-full.txt", headers: machineOnlyHeaders },
      { source: "/humans.txt", headers: machineOnlyHeaders },
      { source: "/data/:path*", headers: machineOnlyHeaders },
      { source: "/26b5fac8058e49e09141a6a4b7b6adc4.txt", headers: machineOnlyHeaders },
    ];
  },
};

export default nextConfig;
