import type { IncidentHistory, IncidentSeverity } from "@/types/incident-history";

export const HISTORICAL_INCIDENT_DISCLAIMER =
  "Historical incident context is not a real-time warning and should not replace official alerts, posted signs, lifeguards, or current conditions.";

export const HISTORICAL_INCIDENT_UI_DISCLAIMER =
  "Historical incident context is background risk awareness, not a live warning or official safety boundary.";

export const HISTORICAL_REASON_TEXT =
  "Historical context: this coastline has documented incident patterns such as sneaker waves, rip currents, rescues, tide-sensitive access, or surf-zone hazards. SurfScout treats this as background context only.";

const DEFAULT_COASTAL_SUMMARY =
  "This coastline has documented public reports of surf-zone rescues, sneaker-wave risk, rip currents, or tide-sensitive access issues. SurfScout treats this as background context only.";

function seededIncidentHistory(
  severity: IncidentSeverity,
  summary: string,
  type:
    | "rip_current"
    | "sneaker_wave"
    | "rescue"
    | "tide_trap"
    | "cliff_fall"
    | "other" = "other",
): IncidentHistory {
  return {
    summary,
    severity,
    incidents: [
      {
        date: "Background context — no specific incident date in seeded data",
        type,
        sourceName: "Seeded SurfScout incident summary",
        sourceUrl: "",
        confidence: "educational",
        note: HISTORICAL_INCIDENT_DISCLAIMER,
      },
    ],
  };
}

export const PANTHER_INCIDENT_HISTORY = seededIncidentHistory(
  "high",
  "The Panther Beach / Bonny Doon / Davenport coast is known in public safety and coastal education materials for remote cove access, surf-zone rescues, and tide-sensitive entry points. SurfScout uses this only as cautious background context.",
  "rip_current",
);

export const OCEAN_BEACH_SF_INCIDENT_HISTORY = seededIncidentHistory(
  "high",
  "Ocean Beach, SF appears frequently in public safety guidance about rip currents, cold-water shock, and surf-zone rescues. SurfScout treats this as background awareness, not a live warning.",
  "rip_current",
);

export const BAKER_BEACH_INCIDENT_HISTORY = seededIncidentHistory(
  "moderate",
  "Baker Beach and nearby Golden Gate shoreline segments are discussed in public safety education for cold water, tidal flow, and surf-zone hazards. SurfScout uses this as background context only.",
  "rip_current",
);

export const LINDA_MAR_INCIDENT_HISTORY = seededIncidentHistory(
  "moderate",
  "Pacifica / Linda Mar is referenced in local public safety materials for rip currents, shorebreak, and surf-zone rescues on swell days. SurfScout treats this as background context only.",
  "rip_current",
);

export const HALF_MOON_BAY_INCIDENT_HISTORY = seededIncidentHistory(
  "moderate",
  "The Half Moon Bay coastline has documented public reports of surf-zone rescues, fog-related visibility issues, and open-ocean exposure. SurfScout uses this as cautious background context.",
  "rescue",
);

export const STINSON_INCIDENT_HISTORY = seededIncidentHistory(
  "high",
  "Stinson Beach appears in public safety and coastal hazard education for rip currents, surf rescues, and busy summer conditions. SurfScout treats this as background context only.",
  "rip_current",
);

export const MAVERICKS_COAST_INCIDENT_HISTORY = seededIncidentHistory(
  "high",
  "The Mavericks / Pillar Point coast is known for powerful surf, cliff-adjacent access, and rescue activity in high-energy conditions. SurfScout uses this only as background context.",
  "sneaker_wave",
);

export const MONTARA_COAST_INCIDENT_HISTORY = seededIncidentHistory(
  "moderate",
  "Montara and nearby cove segments are discussed in coastal safety education for sneaker-wave risk, cliff access, and surf-zone hazards. SurfScout treats this as background context only.",
  "sneaker_wave",
);

export const PACIFICA_COAST_INCIDENT_HISTORY = seededIncidentHistory(
  "moderate",
  DEFAULT_COASTAL_SUMMARY,
  "rip_current",
);
