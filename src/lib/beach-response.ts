import { SANTA_CRUZ_MAP_BOUNDS } from "@/data/beaches";
import type { BeachProfile } from "@/types/beach-profile";
import type {
  MapMarker,
  SaferAlternative,
  SelectedBeach,
} from "@/types/surfscout";

type MapBounds = {
  north: number;
  south: number;
  west: number;
  east: number;
};

export function profileToSelectedBeach(profile: BeachProfile): SelectedBeach {
  return {
    id: profile.id,
    name: profile.name,
    location: profile.region,
    advisory: profile.defaultAdvisory,
    summary: profile.shortDescription,
  };
}

export function profileToSaferAlternative(profile: BeachProfile): SaferAlternative {
  return {
    id: profile.id,
    name: profile.name,
    location: profile.region,
    advisory: profile.defaultAdvisory,
    summary: profile.shortDescription,
  };
}

export function latLngToMapPosition(
  latitude: number,
  longitude: number,
  bounds: MapBounds = SANTA_CRUZ_MAP_BOUNDS,
): { top: string; left: string } {
  const topPct =
    ((bounds.north - latitude) / (bounds.north - bounds.south)) * 100;
  const leftPct =
    ((longitude - bounds.west) / (bounds.east - bounds.west)) * 100;

  return {
    top: `${Math.min(92, Math.max(8, topPct)).toFixed(0)}%`,
    left: `${Math.min(92, Math.max(8, leftPct)).toFixed(0)}%`,
  };
}

export function buildMapMarkers(profiles: BeachProfile[]): MapMarker[] {
  return profiles.map((profile) => {
    const position = latLngToMapPosition(profile.latitude, profile.longitude);
    return {
      id: profile.id,
      name: mapMarkerLabel(profile),
      advisory: profile.defaultAdvisory,
      top: position.top,
      left: position.left,
    };
  });
}

function mapMarkerLabel(profile: BeachProfile): string {
  switch (profile.id) {
    case "main-beach":
      return "Main Beach";
    case "natural-bridges":
      return "Natural Bridges";
    case "seabright":
      return "Seabright";
    case "panther":
      return "Panther";
    default:
      return profile.name;
  }
}
