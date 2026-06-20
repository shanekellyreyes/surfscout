export type SurfScoutRegion =
  | "santa-cruz"
  | "san-francisco"
  | "pacifica"
  | "half-moon-bay";

export type RiskLevel = "low" | "moderate" | "high" | "extreme";

export type ScorerRecommendation = "go" | "use_caution" | "avoid_for_now";

export type UserContext = {
  notStrongSwimmer: boolean;
  withSpouseOrPartner: boolean;
  withFamily: boolean;
  withKids: boolean;
  eveningTiming: boolean;
  wantsQuietRemote: boolean;
  regions: SurfScoutRegion[];
  mentionedBeachIds: string[];
};

export type BeachRiskAssessment = {
  beachId: string;
  riskScore: number;
  riskLevel: RiskLevel;
  recommendation: ScorerRecommendation;
  reasons: string[];
};

export type ScoredAskResult = {
  context: UserContext;
  selected: BeachRiskAssessment;
  alternatives: BeachRiskAssessment[];
  region: SurfScoutRegion;
};
