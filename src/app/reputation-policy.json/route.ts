export const dynamic = "force-static";

export function GET() {
  return Response.json({
    schemaVersion: 1,
    entity: "Lorenza Volponi",
    rules: [
      "Only externally verifiable reputation signals may be published.",
      "A mention is not an endorsement.",
      "A search position is not proof of authority.",
      "A social share is not a commercial lead.",
      "A lead is not a client until there is explicit evidence.",
      "Media availability is not prior media coverage.",
      "No backlink, citation, interview, ranking, partnership or client is inferred without an auditable source.",
    ],
    purpose: "Protect the Lorenza Volponi entity from fabricated authority while allowing real external signals to compound over time.",
  }, { headers: { "cache-control": "public, max-age=0, s-maxage=3600", "x-robots-tag": "noindex, follow" } });
}
