import type { BeachProfile } from "@/types/beach-profile";
import { HISTORICAL_REASON_TEXT } from "@/data/incident-history-seed";
import type {
  BeachRiskAssessment,
  ScorerRecommendation,
  SurfScoutRegion,
  UserContext,
} from "@/types/risk";
import { isRemoteBeach } from "@/lib/risk/beach-risk-scorer";

const REGION_LABELS: Record<SurfScoutRegion, string> = {
  "santa-cruz": "Santa Cruz",
  "san-francisco": "San Francisco",
  pacifica: "Pacifica",
  "half-moon-bay": "Half Moon Bay",
};

export function generateUserContextReasons(
  context: UserContext,
  region: SurfScoutRegion,
): string[] {
  const reasons: string[] = [];

  if (context.notStrongSwimmer) {
    reasons.push("user says they are not a strong swimmer");
  }

  if (context.withSpouseOrPartner) {
    reasons.push("user is going with wife/partner");
  } else if (context.withFamily) {
    reasons.push("user is going with family");
  }

  if (context.withKids) {
    reasons.push("user is bringing kids");
  }

  if (context.wantsQuietRemote) {
    reasons.push(`user wants a quiet/remote beach near ${REGION_LABELS[region]}`);
  }

  if (context.eveningTiming) {
    reasons.push("user plans to go in the evening or near sunset");
  }

  return reasons;
}

export function generateBeachReasons(
  profile: BeachProfile,
  assessment: BeachRiskAssessment,
  context: UserContext,
): string[] {
  const reasons: string[] = [];
  const text = [
    profile.shortDescription,
    ...profile.knownHazards,
    ...profile.accessNotes,
  ].join(" ");

  if (isRemoteBeach(profile) && (context.wantsQuietRemote || context.eveningTiming)) {
    reasons.push("remote or tide-sensitive beaches can become risky quickly");
  }

  if (/\b(steep|cliff|trail)\b/i.test(text)) {
    reasons.push(`${profile.name} has steep or cliff access that is harder to exit quickly`);
  }

  if (/\b(rip current|shorebreak|strong surf|stronger surf)\b/i.test(text)) {
    reasons.push(`${profile.name} can see stronger surf or rip-current risk for this profile`);
  }

  if (profile.lifeguardNotes && assessment.recommendation === "go") {
    reasons.push(`${profile.name} has more developed access and seasonal lifeguard coverage`);
  }

  if (context.notStrongSwimmer && profile.defaultAdvisory === "red") {
    reasons.push(`${profile.name} is a poor match when swimming confidence is limited`);
  }

  if (assessment.riskLevel === "extreme" || assessment.riskLevel === "high") {
    reasons.push(
      `SurfScout scored ${profile.name} as ${assessment.riskLevel} risk for this trip context`,
    );
  }

  return reasons;
}

export function generateHeadline(
  beachName: string,
  recommendation: ScorerRecommendation,
): string {
  switch (recommendation) {
    case "avoid_for_now":
      return `I would not make ${beachName} my first choice for this trip.`;
    case "use_caution":
      return `I would use extra caution at ${beachName} for this trip.`;
    case "go":
      return `${beachName} could be a reasonable fit for this trip.`;
  }
}

export function mergeReasons(...groups: string[][]): string[] {
  const seen = new Set<string>();
  const merged: string[] = [];

  for (const group of groups) {
    for (const reason of group) {
      const key = reason.toLowerCase();
      if (!seen.has(key)) {
        seen.add(key);
        merged.push(reason);
      }
    }
  }

  return merged.slice(0, 7);
}

export function attachReasons(
  assessment: BeachRiskAssessment,
  profile: BeachProfile,
  context: UserContext,
  region: SurfScoutRegion,
): BeachRiskAssessment {
  const reasons = mergeReasons(
    generateUserContextReasons(context, region),
    generateBeachReasons(profile, assessment, context),
  );

  if (
    profile.incidentHistory &&
    !reasons.some((reason) => reason === HISTORICAL_REASON_TEXT)
  ) {
    if (reasons.length >= 7) reasons.pop();
    reasons.push(HISTORICAL_REASON_TEXT);
  }

  return {
    ...assessment,
    reasons,
  };
}
