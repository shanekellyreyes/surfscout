export type AdvisoryLevel = "green" | "yellow" | "red";

export type Beach = {
  id: string;
  name: string;
  location: string;
  advisory: AdvisoryLevel;
  summary: string;
  distanceMi?: number;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type SignalSource = {
  id: string;
  label: string;
  detail: string;
  freshness: string;
};

export const EXAMPLE_PROMPT =
  "My wife and I want a quiet beach near Santa Cruz this evening. I'm not a strong swimmer. Where should we go?";

export const SEED_MESSAGES: ChatMessage[] = [
  {
    id: "m1",
    role: "user",
    content: EXAMPLE_PROMPT,
  },
  {
    id: "m2",
    role: "assistant",
    content:
      "For a quieter evening near Santa Cruz with limited swimming confidence, I'd steer you toward Seabright Beach. It's typically calmer than Cowell or Main Beach, with gentler surf in the lee of the harbor. Natural Bridges can be scenic but watch for uneven footing on the rocks. Avoid Panther Beach this evening — access is steep and surf tends to run heavier there.",
  },
];

export const SELECTED_BEACH: Beach = {
  id: "seabright",
  name: "Seabright Beach",
  location: "Eastside Santa Cruz, CA",
  advisory: "green",
  summary:
    "Generally mild surf in harbor shadow. Sandy entry, popular with locals for evening walks. Lifeguard coverage varies by season — check on-site signage.",
};

export const SAFER_ALTERNATIVES: Beach[] = [
  {
    id: "cowell",
    name: "Cowell Beach",
    location: "Santa Cruz Wharf area",
    advisory: "yellow",
    summary: "Busier and more variable surf near the wharf. Fine for wading; stay shallow if you're not a strong swimmer.",
    distanceMi: 1.2,
  },
  {
    id: "natural-bridges",
    name: "Natural Bridges",
    location: "Westside Santa Cruz",
    advisory: "yellow",
    summary: "Scenic tide pools and rock formations. Rocky entry — better for exploring than swimming tonight.",
    distanceMi: 2.8,
  },
];

export const SIGNAL_SOURCES: SignalSource[] = [
  {
    id: "s1",
    label: "Seeded demo profile",
    detail: "Typical evening conditions for Santa Cruz eastside beaches",
    freshness: "Demo data",
  },
  {
    id: "s2",
    label: "Surf height estimate",
    detail: "1–2 ft, long-period swell — placeholder",
    freshness: "Demo data",
  },
  {
    id: "s3",
    label: "Crowd pattern",
    detail: "Lower foot traffic after sunset on weekdays",
    freshness: "Demo data",
  },
];

export const ADVISORY_ZONES = [
  {
    level: "green" as const,
    label: "Lower concern",
    description: "Calmer conditions for the area — still use caution",
  },
  {
    level: "yellow" as const,
    label: "Moderate concern",
    description: "Variable surf, crowds, or access challenges",
  },
  {
    level: "red" as const,
    label: "Higher concern",
    description: "Stronger surf, difficult access, or limited visibility",
  },
];

export const OCEAN_CAUTION =
  "SurfScout provides general coastal guidance, not lifeguard advice. Conditions change quickly. Never turn your back on the ocean, check local signage, and call 911 in an emergency.";

export const MAP_ZONE_MARKERS = [
  { id: "seabright", name: "Seabright", advisory: "green" as const, top: "58%", left: "62%" },
  { id: "cowell", name: "Cowell", advisory: "yellow" as const, top: "52%", left: "48%" },
  { id: "natural-bridges", name: "Natural Bridges", advisory: "yellow" as const, top: "45%", left: "28%" },
  { id: "panther", name: "Panther Beach", advisory: "red" as const, top: "38%", left: "78%" },
];
