import type { IncidentHistory } from "@/types/incident-history";
import type { AdvisoryLevel } from "@/types/surfscout";

export type BeachAdvisoryZone = {
  level: AdvisoryLevel;
  label: string;
  description: string;
  approximateArea: string;
};

export type BeachProfile = {
  id: string;
  name: string;
  region: string;
  latitude: number;
  longitude: number;
  shortDescription: string;
  knownHazards: string[];
  accessNotes: string[];
  lifeguardNotes?: string;
  developedAccessNotes?: string;
  conservativeSafetyNotes: string[];
  defaultAdvisory: AdvisoryLevel;
  advisoryZones?: BeachAdvisoryZone[];
  advisoryZoneDisclaimer?: string;
  incidentHistory?: IncidentHistory;
};
