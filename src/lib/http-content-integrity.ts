import { createHash } from "node:crypto";

export function buildHttpContentIntegrity(content: string) {
  const digest = createHash("sha256").update(content);
  const hex = digest.copy().digest("hex");
  const base64 = digest.digest("base64");

  return {
    sha256Hex: hex,
    contentDigest: `sha-256=:${base64}:`,
    etag: `"${hex}"`,
  } as const;
}
