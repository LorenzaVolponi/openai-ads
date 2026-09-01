import freshnessPolicy from "../../data/freshness-policy.json";

const DAY_MS = 24 * 60 * 60 * 1000;

type Lifecycle = "operational" | "documentation" | "historical";
type FreshnessStatus = "within_review_window" | "review_due" | "archival_reference";

function parseDateOnly(value: string) {
  return new Date(`${value}T00:00:00Z`);
}

function addDays(value: string, days: number) {
  const date = parseDateOnly(value);
  date.setUTCDate(date.getUTCDate() + days);
  return date;
}

function dateOnly(value: Date) {
  return value.toISOString().slice(0, 10);
}

export const EDITORIAL_SNAPSHOT_VERIFIED_AT = freshnessPolicy.editorialSnapshotVerifiedAt;
export const FRESHNESS_POLICY_VERSION = freshnessPolicy.schemaVersion;

export function buildSourceLifecycle(now = new Date()) {
  const snapshotDate = parseDateOnly(EDITORIAL_SNAPSHOT_VERIFIED_AT);
  const daysSinceEditorialVerification = Math.max(0, Math.floor((now.getTime() - snapshotDate.getTime()) / DAY_MS));

  const sources = freshnessPolicy.sources.map((source) => {
    const lifecycle = source.lifecycle as Lifecycle;
    const reviewAfterDays = source.reviewAfterDays;

    if (lifecycle === "historical" || reviewAfterDays === null) {
      return {
        ...source,
        status: "archival_reference" as FreshnessStatus,
        editorialVerifiedAt: EDITORIAL_SNAPSHOT_VERIFIED_AT,
        reviewDueAt: null,
        daysSinceEditorialVerification,
        interpretation:
          "This source anchors a historical event in the chronology. Its event date is preserved; it is not treated as a live operational-status claim.",
      };
    }

    const due = addDays(EDITORIAL_SNAPSHOT_VERIFIED_AT, reviewAfterDays);
    const status: FreshnessStatus = now.getTime() >= due.getTime() ? "review_due" : "within_review_window";

    return {
      ...source,
      status,
      editorialVerifiedAt: EDITORIAL_SNAPSHOT_VERIFIED_AT,
      reviewDueAt: dateOnly(due),
      daysSinceEditorialVerification,
      interpretation:
        status === "review_due"
          ? "The published snapshot remains historical evidence, but this mutable source has reached its editorial recheck window before being used as a current-state claim."
          : "The mutable source remains inside the configured editorial review window for the published snapshot.",
    };
  });

  const mutable = sources.filter((source) => source.lifecycle !== "historical");
  const due = mutable.filter((source) => source.status === "review_due");
  const nextDueDates = mutable
    .map((source) => source.reviewDueAt)
    .filter((value): value is string => Boolean(value))
    .sort();

  return {
    schemaVersion: 1,
    policyVersion: FRESHNESS_POLICY_VERSION,
    generatedAt: now.toISOString(),
    editorialSnapshotVerifiedAt: EDITORIAL_SNAPSHOT_VERIFIED_AT,
    daysSinceEditorialVerification,
    status: due.length > 0 ? "review_due" : "within_review_window",
    nextOperationalReviewDueAt: nextDueDates[0] ?? null,
    summary: {
      trackedSources: sources.length,
      mutableSources: mutable.length,
      reviewDueSources: due.length,
      archivalReferences: sources.length - mutable.length,
    },
    policy: freshnessPolicy.policy,
    automationBoundary:
      "The daily source watcher can detect reachability or fingerprint changes and can raise an editorial-review issue. It does not automatically advance editorialSnapshotVerifiedAt or rewrite published claims.",
    sources,
  };
}
