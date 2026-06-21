import type { BeachProfile } from "@/types/beach-profile";
import { HISTORICAL_INCIDENT_UI_DISCLAIMER } from "@/data/incident-history-seed";
import type { HistoricalIncidentContext } from "@/types/incident-history";

export function toHistoricalIncidentContext(
  profile: BeachProfile,
): HistoricalIncidentContext | undefined {
  if (!profile.incidentHistory) return undefined;

  return {
    summary: profile.incidentHistory.summary,
    severity: profile.incidentHistory.severity,
    disclaimer: HISTORICAL_INCIDENT_UI_DISCLAIMER,
  };
}
