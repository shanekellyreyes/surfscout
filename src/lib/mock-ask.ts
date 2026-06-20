import { OCEAN_CAUTION } from "@/data/seed";
import {
  DEMO_SANTA_CRUZ_ADVISORY_LEGEND,
  DEMO_SANTA_CRUZ_MAP_VIEW,
  getBeachProfiles,
  requireBeachProfile,
} from "@/data/beaches";
import {
  buildMapMarkers,
  profileToSaferAlternative,
  profileToSelectedBeach,
} from "@/lib/beach-response";
import type { SurfScoutChatResponse } from "@/types/surfscout";

const DEMO_SELECTED_BEACH_ID = "panther";
const DEMO_ALTERNATIVE_IDS = ["main-beach", "natural-bridges", "seabright"];
const DEMO_MAP_BEACH_IDS = [
  "main-beach",
  "natural-bridges",
  "seabright",
  "panther",
];

export function buildMockAskResponse(_message: string): SurfScoutChatResponse {
  const selectedProfile = requireBeachProfile(DEMO_SELECTED_BEACH_ID);
  const alternativeProfiles = getBeachProfiles(DEMO_ALTERNATIVE_IDS);
  const mapProfiles = getBeachProfiles(DEMO_MAP_BEACH_IDS);

  return {
    selectedBeach: profileToSelectedBeach(selectedProfile),
    recommendation: "avoid_for_now",
    headline: "I would not make Panther Beach my first choice for this trip.",
    reasons: [
      "user says they are not a strong swimmer",
      "user is going with wife/partner",
      "user wants a quiet/remote beach near Santa Cruz",
      "remote or tide-sensitive beaches can become risky quickly",
    ],
    saferAlternatives: alternativeProfiles.map(profileToSaferAlternative),
    mapView: DEMO_SANTA_CRUZ_MAP_VIEW,
    advisoryZones: DEMO_SANTA_CRUZ_ADVISORY_LEGEND,
    mapMarkers: buildMapMarkers(mapProfiles),
    sourcesUsed: [
      {
        id: "s1",
        label: "Seeded SurfScout beach profile",
        detail: `Demo profile data for ${selectedProfile.name} and nearby alternatives`,
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
