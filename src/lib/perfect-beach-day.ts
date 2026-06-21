import {
  BEACH_REGION_BY_ID,
  getBeachProfile,
  requireBeachProfile,
} from "@/data/beaches";
import { OCEAN_CAUTION } from "@/data/seed";
import { getRedisClient } from "@/lib/redis/client";
import { attachReasons } from "@/lib/risk/reason-generator";
import {
  isRemoteBeach,
  riskLevelToAdvisory,
  scoreBeach,
} from "@/lib/risk/beach-risk-scorer";
import { parseUserContext, primaryRegion } from "@/lib/risk/user-context-parser";
import { findNearbyBeaches } from "@/lib/redis/beach-geo";
import type { BeachProfile } from "@/types/beach-profile";
import type {
  PerfectBeachCandidate,
  PerfectBeachDayResponse,
} from "@/types/perfect-beach-day";
import type { BeachRiskAssessment, ScorerRecommendation } from "@/types/risk";
import type { Recommendation } from "@/types/surfscout";
import { createHash } from "crypto";

export const PERFECT_BEACH_DAY_DISCLAIMER = `${OCEAN_CAUTION} Perfect Beach Day suggestions are advisory only and based on seeded profiles plus nearby lookup — not live conditions or official safety boundaries.`;
const PERFECT_BEACH_CACHE_TTL_SECONDS = 10 * 60;

function cacheKey(beachId: string, prompt: string) {
  const promptHash = createHash("sha256")
    .update(prompt.trim().toLowerCase())
    .digest("hex")
    .slice(0, 16);
  return `surfscout:perfect-beach-day:${beachId}:${promptHash}`;
}

async function readCachedResponse(
  beachId: string,
  prompt: string,
): Promise<PerfectBeachDayResponse | null> {
  const redis = await getRedisClient();
  if (redis.status !== "connected" || !redis.client) return null;

  const cached = await redis.client.get(cacheKey(beachId, prompt));
  if (!cached) return null;

  try {
    const response = JSON.parse(cached) as PerfectBeachDayResponse;
    return {
      ...response,
      redisPowered: true,
      redisStatus: "connected",
      redisCacheStatus: "hit",
      fallbackReasons: [],
    };
  } catch {
    return null;
  }
}

async function writeCachedResponse(
  response: PerfectBeachDayResponse,
  prompt: string,
) {
  if (!response.redisPowered) return;

  const redis = await getRedisClient();
  if (redis.status !== "connected" || !redis.client) return;

  await redis.client.set(cacheKey(response.beachId, prompt), JSON.stringify(response), {
    EX: PERFECT_BEACH_CACHE_TTL_SECONDS,
  });
}

function toResponseRecommendation(
  recommendation: ScorerRecommendation,
): Recommendation {
  if (recommendation === "go") return "good_fit";
  return recommendation;
}

function buildFitHighlights(
  profile: BeachProfile,
  assessment: BeachRiskAssessment,
  context: ReturnType<typeof parseUserContext>,
): string[] {
  const highlights: string[] = [];

  if (
    context.notStrongSwimmer &&
    (assessment.recommendation === "go" || assessment.riskLevel === "low")
  ) {
    highlights.push("Better fit for limited swimming confidence");
  }

  if (
    (context.withKids || context.withFamily) &&
    (profile.lifeguardNotes || profile.developedAccessNotes)
  ) {
    highlights.push("More family-friendly access");
  }

  if (context.wantsQuietRemote && isRemoteBeach(profile)) {
    highlights.push("Quieter, more remote option");
  }

  if (
    (context.withKids || context.withFamily) &&
    !isRemoteBeach(profile) &&
    assessment.riskScore <= 45
  ) {
    highlights.push("Easier access for families");
  }

  if (context.eveningTiming && profile.lifeguardNotes) {
    highlights.push("Developed beach with seasonal lifeguard coverage");
  }

  return highlights;
}

function toCandidate(
  profile: BeachProfile,
  assessment: BeachRiskAssessment,
  context: ReturnType<typeof parseUserContext>,
  region: ReturnType<typeof primaryRegion>,
  distanceKm?: number,
): PerfectBeachCandidate {
  const withReasons = attachReasons(assessment, profile, context, region);

  return {
    beachId: profile.id,
    name: profile.name,
    location: profile.region,
    region: BEACH_REGION_BY_ID[profile.id] ?? region,
    distanceKm: distanceKm != null ? Math.round(distanceKm * 10) / 10 : undefined,
    advisory: riskLevelToAdvisory(withReasons.riskLevel),
    riskLevel: withReasons.riskLevel,
    recommendation: toResponseRecommendation(withReasons.recommendation),
    reason:
      withReasons.reasons[0] ??
      profile.shortDescription,
    fitHighlights: buildFitHighlights(profile, withReasons, context),
  };
}

export async function buildPerfectBeachDayResponse(
  beachId: string,
  prompt: string,
): Promise<PerfectBeachDayResponse | null> {
  const selectedProfile = getBeachProfile(beachId);
  if (!selectedProfile) return null;

  const cached = await readCachedResponse(beachId, prompt);
  if (cached) return cached;

  const context = parseUserContext(prompt);
  const region = primaryRegion(context);
  const lookup = await findNearbyBeaches(beachId);

  const candidates = lookup.nearby
    .map((hit) => {
      const profile = getBeachProfile(hit.beachId);
      if (!profile) return null;
      const assessment = scoreBeach(profile, context);
      return toCandidate(profile, assessment, context, region, hit.distanceKm);
    })
    .filter((candidate): candidate is PerfectBeachCandidate => candidate != null)
    .sort((a, b) => {
      const riskOrder =
        riskSortValue(a.riskLevel) - riskSortValue(b.riskLevel);
      if (riskOrder !== 0) return riskOrder;
      return (a.distanceKm ?? 999) - (b.distanceKm ?? 999);
    })
    .slice(0, 6);

  const selected = requireBeachProfile(beachId);
  const regionKey = BEACH_REGION_BY_ID[beachId] ?? region;

  const response: PerfectBeachDayResponse = {
    beachId: selected.id,
    beachName: selected.name,
    selectedBeach: {
      beachId: selected.id,
      name: selected.name,
      location: selected.region,
      region: regionKey,
    },
    candidates,
    redisPowered: lookup.redisPowered,
    redisStatus: lookup.redisStatus,
    redisCacheStatus: lookup.redisPowered ? "miss" : "unavailable",
    fallbackReasons: lookup.fallbackReasons,
    safetyDisclaimer: PERFECT_BEACH_DAY_DISCLAIMER,
  };

  await writeCachedResponse(response, prompt);

  return response;
}

function riskSortValue(riskLevel: string): number {
  switch (riskLevel) {
    case "low":
      return 0;
    case "moderate":
      return 1;
    case "high":
      return 2;
    case "extreme":
      return 3;
    default:
      return 4;
  }
}
