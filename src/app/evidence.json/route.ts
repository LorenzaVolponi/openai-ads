import { evidenceLedger } from "@/lib/evidence-ledger";
import { LAST_EDITORIAL_REVIEW_ISO } from "@/lib/editorial-meta";
import { createFreshnessHeaders } from "@/lib/http-freshness";
import { SOURCE_COMMIT_SHA } from "@/lib/source-revision";

export const dynamic = "force-static";

export function GET() {
  const body = `${JSON.stringify(evidenceLedger, null, 2)}\n`;

  return new Response(body, {
    headers: {
      ...createFreshnessHeaders({
        body,
        modifiedAt: LAST_EDITORIAL_REVIEW_ISO,
        contentType: "application/json; charset=utf-8",
      }),
      ...(SOURCE_COMMIT_SHA ? { "X-Source-Commit": SOURCE_COMMIT_SHA } : {}),
    },
  });
}
