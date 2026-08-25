export const SOURCE_REPOSITORY = "LorenzaVolponi/openai-ads";
export const SOURCE_REPOSITORY_URL = `https://github.com/${SOURCE_REPOSITORY}`;

const revisionCandidates = [
  process.env.PUBLIC_GIT_COMMIT_SHA,
  process.env.VERCEL_GIT_COMMIT_SHA,
  process.env.GITHUB_SHA,
];

const resolvedRevision = revisionCandidates
  .map((value) => value?.trim().toLowerCase())
  .find((value) => Boolean(value && /^[0-9a-f]{40}$/.test(value)));

export const SOURCE_COMMIT_SHA = resolvedRevision ?? null;
export const SOURCE_COMMIT_URL = SOURCE_COMMIT_SHA
  ? `${SOURCE_REPOSITORY_URL}/commit/${SOURCE_COMMIT_SHA}`
  : null;

export const sourceRevision = {
  repository: SOURCE_REPOSITORY,
  repositoryUrl: SOURCE_REPOSITORY_URL,
  commitSha: SOURCE_COMMIT_SHA,
  commitUrl: SOURCE_COMMIT_URL,
  scope:
    "This revision anchors the generated artifact to its source-code state. It does not prove that editorial claims or primary sources are true.",
};
