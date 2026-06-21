import type { BeachProfile } from "@/types/beach-profile";
import type {
  BeachRiskAssessment,
  RiskLevel,
  ScorerRecommendation,
  UserContext,
} from "@/types/risk";
import type { AdvisoryLevel } from "@/types/surfscout";

const ADVISORY_BASE: Record<AdvisoryLevel, number> = {
  green: 15,
  yellow: 40,
  red: 65,
};

const REMOTE_KEYWORDS =
  /\b(remote|cove|cliff|cliffs|steep|rocky|rock|limited exit|limited cell|shorebreak|rip current)\b/i;

const ACCESS_DIFFICULTY_KEYWORDS =
  /\b(steep|cliff|trail|dirt path|slippery|descend|climb|limited access)\b/i;

function profileText(profile: BeachProfile): string {
  return [
    profile.shortDescription,
    profile.region,
    ...profile.knownHazards,
    ...profile.accessNotes,
    ...profile.conservativeSafetyNotes,
    profile.lifeguardNotes ?? "",
    profile.developedAccessNotes ?? "",
  ].join(" ");
}

export function isRemoteBeach(profile: BeachProfile): boolean {
  const text = profileText(profile);
  return (
    profile.id === "panther" ||
    (REMOTE_KEYWORDS.test(text) &&
      /\b(remote|cove|cliff|steep|limited)\b/i.test(text))
  );
}

function scoreFromAdvisory(advisory: AdvisoryLevel): number {
  return ADVISORY_BASE[advisory];
}

function scoreHazards(profile: BeachProfile): number {
  return Math.min(18, profile.knownHazards.length * 3);
}

function scoreTerrainNotes(profile: BeachProfile): number {
  const text = profileText(profile);
  let score = 0;

  if (/\b(remote|cove)\b/i.test(text)) score += 10;
  if (/\b(cliff|cliffs|steep)\b/i.test(text)) score += 8;
  if (/\b(rocky|rock|rocks)\b/i.test(text)) score += 6;

  return score;
}

function scoreAccessDifficulty(profile: BeachProfile): number {
  const text = `${profile.accessNotes.join(" ")} ${profile.shortDescription}`;
  return ACCESS_DIFFICULTY_KEYWORDS.test(text) ? 10 : 0;
}

function scoreDevelopedAccess(profile: BeachProfile): number {
  let reduction = 0;

  if (profile.lifeguardNotes) reduction += 10;
  if (profile.developedAccessNotes) reduction += 8;

  return reduction;
}

function scoreIncidentHistory(profile: BeachProfile): number {
  if (!profile.incidentHistory) return 0;

  switch (profile.incidentHistory.severity) {
    case "high":
      return 2;
    case "moderate":
      return 1;
    case "low":
      return 0;
  }
}

function scoreUserContext(profile: BeachProfile, context: UserContext): number {
  const text = profileText(profile);
  let score = 0;

  if (context.notStrongSwimmer) {
    if (/\b(rip current|shorebreak|stronger surf|strong surf|open ocean)\b/i.test(text)) {
      score += 12;
    }
    if (profile.defaultAdvisory === "red") score += 12;
    if (profile.defaultAdvisory === "yellow") score += 6;
  }

  if (context.eveningTiming) {
    if (isRemoteBeach(profile)) score += 10;
    if (!profile.lifeguardNotes) score += 6;
    if (ACCESS_DIFFICULTY_KEYWORDS.test(text)) score += 6;
  }

  if (context.wantsQuietRemote && isRemoteBeach(profile)) {
    score += 14;
  }

  if (context.withKids || context.withFamily) {
    if (isRemoteBeach(profile)) score += 10;
    if (/\b(rocky|rip current|shorebreak|crowd)\b/i.test(text)) score += 5;
  }

  if (context.withSpouseOrPartner && isRemoteBeach(profile)) {
    score += 4;
  }

  return score;
}

function riskLevelFromScore(riskScore: number): RiskLevel {
  if (riskScore <= 35) return "low";
  if (riskScore <= 55) return "moderate";
  if (riskScore <= 75) return "high";
  return "extreme";
}

function recommendationFromScore(riskScore: number): ScorerRecommendation {
  if (riskScore <= 40) return "go";
  if (riskScore <= 65) return "use_caution";
  return "avoid_for_now";
}

export function scoreBeach(
  profile: BeachProfile,
  context: UserContext,
): BeachRiskAssessment {
  const riskScore = Math.max(
    0,
    Math.min(
      100,
      scoreFromAdvisory(profile.defaultAdvisory) +
        scoreHazards(profile) +
        scoreTerrainNotes(profile) +
        scoreAccessDifficulty(profile) +
        scoreUserContext(profile, context) +
        scoreIncidentHistory(profile) -
        scoreDevelopedAccess(profile),
    ),
  );

  const riskLevel = riskLevelFromScore(riskScore);
  const recommendation = recommendationFromScore(riskScore);

  return {
    beachId: profile.id,
    riskScore,
    riskLevel,
    recommendation,
    reasons: [],
  };
}

export function riskLevelToAdvisory(riskLevel: RiskLevel): AdvisoryLevel {
  switch (riskLevel) {
    case "low":
      return "green";
    case "moderate":
      return "yellow";
    case "high":
    case "extreme":
      return "red";
  }
}

export function scoreBeaches(
  profiles: BeachProfile[],
  context: UserContext,
): BeachRiskAssessment[] {
  return profiles.map((profile) => scoreBeach(profile, context));
}
