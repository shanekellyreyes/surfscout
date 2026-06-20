export type AdvisoryLevel = "green" | "yellow" | "red";

export type Recommendation = "avoid_for_now" | "use_caution" | "good_fit";

export type MapView = {
  center: { lat: number; lng: number };
  zoom: number;
};

export type AdvisoryZone = {
  level: AdvisoryLevel;
  label: string;
  description: string;
};

export type MapMarker = {
  id: string;
  name: string;
  advisory: AdvisoryLevel;
  top: string;
  left: string;
};

export type SelectedBeach = {
  id: string;
  name: string;
  location: string;
  advisory: AdvisoryLevel;
  summary: string;
};

export type SaferAlternative = {
  id: string;
  name: string;
  location: string;
  advisory: AdvisoryLevel;
  summary: string;
};

export type SourceUsed = {
  id: string;
  label: string;
  detail: string;
  freshness: string;
};

export type SurfScoutChatResponse = {
  selectedBeach: SelectedBeach;
  recommendation: Recommendation;
  headline: string;
  reasons: string[];
  saferAlternatives: SaferAlternative[];
  mapView: MapView;
  advisoryZones: AdvisoryZone[];
  mapMarkers: MapMarker[];
  sourcesUsed: SourceUsed[];
  degradedMode: boolean;
  oceanCaution: string;
};

export type AskRequestBody = {
  message: string;
};
