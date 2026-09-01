export const dynamic = "force-static";

const SECURITY_TEXT = `Contact: https://www.linkedin.com/in/lorenzavolponi
Expires: 2027-09-01T00:00:00.000Z
Canonical: https://openai-ads.volponi.tech/.well-known/security.txt
Policy: https://github.com/LorenzaVolponi/openai-ads/security/policy
Preferred-Languages: pt-BR, en
`;

export function GET() {
  return new Response(SECURITY_TEXT, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
      "x-robots-tag": "noindex, follow",
    },
  });
}
