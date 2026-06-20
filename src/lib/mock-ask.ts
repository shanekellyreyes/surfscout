import { OCEAN_CAUTION } from "@/data/seed";
import {
  getBeachProfiles,
  getBeachesForRegion,
  getRegionMapConfig,
  requireBeachProfile,
} from "@/data/beaches";
import {
  buildMapMarkers,
  profileToSaferAlternative,
  profileToSelectedBeach,
} from "@/lib/beach-response";
import {
  buildHeadlineForAssessment,
  riskLevelToAdvisory,
  scoreAskRequest,
} from "@/lib/risk";
import type { ScorerRecommendation } from "@/types/risk";
import type { Recommendation, SurfScoutChatResponse } from "@/types/surfscout";

function toResponseRecommendation(
  recommendation: ScorerRecommendation,
): Recommendation {
  if (recommendation === "go") return "good_fit";
  return recommendation;
}

export function buildMockAskResponse(message: string): SurfScoutChatResponse {
  const scored = scoreAskRequest(message);
  const selectedProfile = requireBeachProfile(scored.selected.beachId);
  const alternativeProfiles = getBeachProfiles(
    scored.alternatives.map((entry) => entry.beachId),
  );
  const regionProfiles = getBeachesForRegion(scored.region);
  const mapConfig = getRegionMapConfig(scored.region);

  const selectedAdvisory = riskLevelToAdvisory(scored.selected.riskLevel);

  return {
    selectedBeach: profileToSelectedBeach(selectedProfile, selectedAdvisory),
    recommendation: toResponseRecommendation(scored.selected.recommendation),
    headline: buildHeadlineForAssessment(selectedProfile, scored.selected),
    reasons: scored.selected.reasons,
    saferAlternatives: alternativeProfiles.map((profile, index) => {
      const assessment = scored.alternatives[index];
      const advisory = assessment
        ? riskLevelToAdvisory(assessment.riskLevel)
        : profile.defaultAdvisory;
      return profileToSaferAlternative(profile, advisory);
    }),
    mapView: mapConfig.mapView,
    advisoryZones: mapConfig.legend,
    mapMarkers: buildMapMarkers(regionProfiles, mapConfig.bounds),
    sourcesUsed: [
      {
        id: "s1",
        label: "Seeded SurfScout beach profile",
        detail: `Seeded profile and deterministic risk scoring for ${selectedProfile.name}`,
        freshness: "Seeded",
      },
      {
        id: "s2",
        label: "Cached advisory notes",
        detail: "Placeholder cached notes — live research coming soon",
        freshness: "Cached",
      },
    ],
    degradedMode: true,
    oceanCaution: OCEAN_CAUTION,
  };
}

export function formatAssistantAnswer(response: SurfScoutChatResponse): string {
  const reasonLines = response.reasons.map((r) => `• ${r}`).join("\n");
  return `${response.headline}\n\n${reasonLines}`;
}
