export type IncidentType =
  | "drowning"
  | "near_drowning"
  | "hospitalization"
  | "rescue"
  | "sneaker_wave"
  | "rip_current"
  | "tide_trap"
  | "cliff_fall"
  | "other";

export type IncidentConfidence =
  | "official"
  | "public_safety"
  | "reputable_news"
  | "educational"
  | "unverified";

export type IncidentSeverity = "low" | "moderate" | "high";

export type IncidentRecord = {
  date: string;
  type: IncidentType;
  sourceName: string;
  sourceUrl: string;
  confidence: IncidentConfidence;
  note: string;
};

export type IncidentHistory = {
  summary: string;
  severity: IncidentSeverity;
  incidents: IncidentRecord[];
};

export type HistoricalIncidentContext = {
  summary: string;
  severity: IncidentSeverity;
  disclaimer: string;
};
