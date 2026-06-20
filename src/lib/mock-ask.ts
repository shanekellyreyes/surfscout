import { OCEAN_CAUTION } from "@/data/seed";
import type { SurfScoutChatResponse } from "@/types/surfscout";

export function buildMockAskResponse(_message: string): SurfScoutChatResponse {
  return {
    selectedBeach: {
      id: "panther",
      name: "Panther Beach",
      location: "Davenport, CA — north of Santa Cruz",
      advisory: "red",
      summary:
        "Remote cove with steep cliff access and limited exit options. Surf can pick up quickly; not ideal when swimming confidence is limited.",
    },
    recommendation: "avoid_for_now",
    headline: "I would not make Panther Beach my first choice for this trip.",
    reasons: [
      "user says they are not a strong swimmer",
      "user is going with wife/partner",
      "user wants a quiet/remote beach near Santa Cruz",
      "remote or tide-sensitive beaches can become risky quickly",
    ],
    saferAlternatives: [
      {
        id: "main-beach",
        name: "Santa Cruz Main Beach",
        location: "Downtown Santa Cruz",
        advisory: "yellow",
        summary:
          "Lifeguard coverage in season and easy access, but can be crowded and surf varies near the wharf.",
      },
      {
        id: "natural-bridges",
        name: "Natural Bridges State Beach",
        location: "Westside Santa Cruz",
        advisory: "yellow",
        summary:
          "Scenic and calmer for tide-pooling; rocky entry makes it better for exploring than swimming.",
      },
      {
        id: "seabright",
        name: "Seabright State Beach",
        location: "Eastside Santa Cruz",
        advisory: "green",
        summary:
          "Harbor shadow often keeps surf milder — a better fit for a quieter evening with limited swimming confidence.",
      },
    ],
    mapView: {
      center: { lat: 37.01, lng: -122.21 },
      zoom: 11,
    },
    advisoryZones: [
      {
        level: "green",
        label: "Lower-risk advisory area",
        description: "Generally milder surf and easier access for the Santa Cruz area",
      },
      {
        level: "yellow",
        label: "Caution advisory area",
        description: "Variable surf, crowds, or rocky entry — stay alert and stay shallow",
      },
      {
        level: "red",
        label: "Avoid / high-risk advisory area",
        description: "Remote access, stronger surf, or limited exit options for this trip profile",
      },
    ],
    mapMarkers: [
      {
        id: "main-beach",
        name: "Main Beach",
        advisory: "yellow",
        top: "52%",
        left: "48%",
      },
      {
        id: "natural-bridges",
        name: "Natural Bridges",
        advisory: "yellow",
        top: "45%",
        left: "28%",
      },
      {
        id: "seabright",
        name: "Seabright",
        advisory: "green",
        top: "58%",
        left: "62%",
      },
      {
        id: "panther",
        name: "Panther Beach",
        advisory: "red",
        top: "38%",
        left: "78%",
      },
    ],
    sourcesUsed: [
      {
        id: "s1",
        label: "Seeded SurfScout beach profile",
        detail: "Demo beach characteristics for Santa Cruz coast",
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
