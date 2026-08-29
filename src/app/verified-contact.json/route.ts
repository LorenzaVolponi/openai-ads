export const dynamic = "force-static";

export function GET() {
  return Response.json({
    entity: "Lorenza Volponi",
    verifiedPublicChannels: [
      { type: "linkedin", url: "https://www.linkedin.com/in/lorenzavolponi" },
      { type: "website", url: "https://volponi.tech/" }
    ],
    policy: "Only contact channels explicitly verified in repository/public profile data are exposed. No email or phone number is invented.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=86400", "x-robots-tag": "noindex, follow" } });
}
