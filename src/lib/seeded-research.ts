import { BEACH_REGION_BY_ID, getBeachProfile } from "@/data/beaches";
import { OCEAN_CAUTION } from "@/data/seed";
import { HISTORICAL_INCIDENT_DISCLAIMER } from "@/data/incident-history-seed";
import type { BeachProfile } from "@/types/beach-profile";
import type {
  ResearchResponse,
  ResearchSourceNote,
  ResearchSourceType,
} from "@/types/research";

export const RESEARCH_DEGRADED_REASON =
  "Live public-source research is not connected in this demo build; showing seeded advisory context.";

export const RESEARCH_SAFETY_DISCLAIMER = `${OCEAN_CAUTION} Source notes below are seeded profile context only — not live warnings or official refreshes.`;

function seededNote(
  id: string,
  sourceName: string,
  sourceType: ResearchSourceType,
  notes: string[],
  fetchedAt: string,
): ResearchSourceNote {
  return {
    id,
    sourceName,
    sourceUrl: "",
    sourceType,
    extractionMethod: "seeded",
    confidence: "seeded_fallback",
    fetchedAt,
    notes,
    degraded: true,
    degradedReason: RESEARCH_DEGRADED_REASON,
  };
}

function buildSourceNotes(profile: BeachProfile, fetchedAt: string): ResearchSourceNote[] {
  const notes: ResearchSourceNote[] = [];

  if (profile.knownHazards.length > 0) {
    notes.push(
      seededNote(
        `${profile.id}-hazards`,
        "SurfScout seeded profile — known hazards",
        "educational_hazard",
        profile.knownHazards,
        fetchedAt,
      ),
    );
  }

  if (profile.accessNotes.length > 0) {
    notes.push(
      seededNote(
        `${profile.id}-access`,
        "SurfScout seeded profile — beach access",
        "public_safety_page",
        profile.accessNotes,
        fetchedAt,
      ),
    );
  }

  if (profile.developedAccessNotes) {
    notes.push(
      seededNote(
        `${profile.id}-developed-access`,
        "SurfScout seeded profile — developed access",
        "public_safety_page",
        [profile.developedAccessNotes],
        fetchedAt,
      ),
    );
  }

  if (profile.lifeguardNotes) {
    notes.push(
      seededNote(
        `${profile.id}-lifeguard`,
        "SurfScout seeded profile — lifeguard coverage",
        "official_safety",
        [profile.lifeguardNotes],
        fetchedAt,
      ),
    );
  }

  if (profile.conservativeSafetyNotes.length > 0) {
    notes.push(
      seededNote(
        `${profile.id}-safety`,
        "SurfScout seeded profile — conservative safety notes",
        "educational_hazard",
        profile.conservativeSafetyNotes,
        fetchedAt,
      ),
    );
  }

  if (profile.shortDescription) {
    notes.push(
      seededNote(
        `${profile.id}-overview`,
        "SurfScout seeded profile — beach overview",
        "educational_hazard",
        [profile.shortDescription],
        fetchedAt,
      ),
    );
  }

  if (profile.incidentHistory) {
    notes.push(
      seededNote(
        `${profile.id}-incident-context`,
        "SurfScout seeded profile — historical incident context",
        "news_media_historical",
        [profile.incidentHistory.summary, HISTORICAL_INCIDENT_DISCLAIMER],
        fetchedAt,
      ),
    );
  }

  return notes;
}

export function buildSeededResearchResponse(beachId: string): ResearchResponse | null {
  const profile = getBeachProfile(beachId);
  if (!profile) return null;

  const fetchedAt = new Date().toISOString();
  const region = BEACH_REGION_BY_ID[beachId] ?? profile.region;

  return {
    beachId: profile.id,
    beachName: profile.name,
    region,
    fetchedAt,
    degradedMode: true,
    degradedReasons: [RESEARCH_DEGRADED_REASON],
    sourceNotes: buildSourceNotes(profile, fetchedAt),
    safetyDisclaimer: RESEARCH_SAFETY_DISCLAIMER,
  };
}
