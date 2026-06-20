import type { AdvisoryZone } from "@/types/surfscout";
import type { BeachProfile } from "@/types/beach-profile";
import { APPROXIMATE_ZONE_DISCLAIMER, BEACH_PROFILES } from "@/data/beach-profiles";

const profileById = new Map(BEACH_PROFILES.map((profile) => [profile.id, profile]));

export const SANTA_CRUZ_DEMO_BEACH_IDS = [
  "panther",
  "natural-bridges",
  "main-beach",
  "seabright",
] as const;

export const SANTA_CRUZ_MAP_BOUNDS = {
  north: 37.14,
  south: 36.94,
  west: -122.32,
  east: -121.99,
} as const;

export const DEMO_SANTA_CRUZ_MAP_VIEW = {
  center: { lat: 37.01, lng: -122.21 },
  zoom: 11,
} as const;

export const DEMO_SANTA_CRUZ_ADVISORY_LEGEND: AdvisoryZone[] = [
  {
    level: "green",
    label: "Lower-risk advisory area",
    description:
      "Generally milder surf and easier access for the Santa Cruz area. " +
      APPROXIMATE_ZONE_DISCLAIMER,
  },
  {
    level: "yellow",
    label: "Caution advisory area",
    description:
      "Variable surf, crowds, or rocky entry — stay alert and stay shallow. " +
      APPROXIMATE_ZONE_DISCLAIMER,
  },
  {
    level: "red",
    label: "Avoid / high-risk advisory area",
    description:
      "Remote access, stronger surf, or limited exit options for this trip profile. " +
      APPROXIMATE_ZONE_DISCLAIMER,
  },
];

export function getBeachProfile(id: string): BeachProfile | undefined {
  return profileById.get(id);
}

export function getBeachProfiles(ids: string[]): BeachProfile[] {
  return ids
    .map((id) => getBeachProfile(id))
    .filter((profile): profile is BeachProfile => profile != null);
}

export function getAllBeachProfiles(): BeachProfile[] {
  return BEACH_PROFILES;
}

export function requireBeachProfile(id: string): BeachProfile {
  const profile = getBeachProfile(id);
  if (!profile) {
    throw new Error(`Unknown beach profile: ${id}`);
  }
  return profile;
}
