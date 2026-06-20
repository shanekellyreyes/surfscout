import {
  getBeachProfile,
  getBeachesForRegion,
} from "@/data/beaches";
import {
  attachReasons,
  generateHeadline,
} from "@/lib/risk/reason-generator";
import {
  isRemoteBeach,
  riskLevelToAdvisory,
  scoreBeach,
  scoreBeaches,
} from "@/lib/risk/beach-risk-scorer";
import {
  parseUserContext,
  primaryRegion,
} from "@/lib/risk/user-context-parser";
import type { BeachProfile } from "@/types/beach-profile";
import type { BeachRiskAssessment, ScoredAskResult } from "@/types/risk";

function selectPrimaryBeach(
  scored: BeachRiskAssessment[],
  profiles: BeachProfile[],
  context: ReturnType<typeof parseUserContext>,
): BeachRiskAssessment {
  const byId = new Map(scored.map((entry) => [entry.beachId, entry]));
  const profileById = new Map(profiles.map((profile) => [profile.id, profile]));

  for (const beachId of context.mentionedBeachIds) {
    const match = byId.get(beachId);
    if (match) return match;
  }

  if (context.wantsQuietRemote) {
    const remoteCandidates = scored
      .filter((entry) => {
        const profile = profileById.get(entry.beachId);
        return profile != null && isRemoteBeach(profile);
      })
      .sort((a, b) => b.riskScore - a.riskScore);

    if (remoteCandidates[0]) return remoteCandidates[0];
  }

  return [...scored].sort((a, b) => b.riskScore - a.riskScore)[0];
}

function selectAlternatives(
  scored: BeachRiskAssessment[],
  selectedId: string,
  limit = 3,
): BeachRiskAssessment[] {
  return scored
    .filter((entry) => entry.beachId !== selectedId)
    .sort((a, b) => a.riskScore - b.riskScore)
    .slice(0, limit);
}

export function scoreAskRequest(message: string): ScoredAskResult {
  const context = parseUserContext(message);
  const region = primaryRegion(context);
  const profiles = getBeachesForRegion(region);
  const scored = scoreBeaches(profiles, context).map((assessment) => {
    const profile = getBeachProfile(assessment.beachId);
    if (!profile) return assessment;
    return attachReasons(assessment, profile, context, region);
  });

  const selected = selectPrimaryBeach(scored, profiles, context);
  const alternatives = selectAlternatives(scored, selected.beachId).map(
    (assessment) => {
      const profile = getBeachProfile(assessment.beachId);
      if (!profile) return assessment;
      return attachReasons(assessment, profile, context, region);
    },
  );

  return { context, selected, alternatives, region };
}

export function buildHeadlineForAssessment(
  beach: BeachProfile,
  assessment: BeachRiskAssessment,
): string {
  return generateHeadline(beach.name, assessment.recommendation);
}

export { riskLevelToAdvisory, scoreBeach };
