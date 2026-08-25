import { createHash } from "node:crypto";

export function createFreshnessHeaders({
  body,
  modifiedAt,
  contentType,
  cacheControl = "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400",
}: {
  body: string;
  modifiedAt: Date | string;
  contentType?: string;
  cacheControl?: string;
}) {
  const date = modifiedAt instanceof Date ? modifiedAt : new Date(modifiedAt);
  const etag = createHash("sha256").update(body).digest("base64url").slice(0, 32);

  return {
    ...(contentType ? { "Content-Type": contentType } : {}),
    "Cache-Control": cacheControl,
    "Content-Language": "pt-BR",
    "Last-Modified": date.toUTCString(),
    ETag: `"${etag}"`,
  };
}
