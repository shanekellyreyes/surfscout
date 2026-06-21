import type { AdvisoryLevel, Recommendation } from "@/types/surfscout";

export type RedisStatus =
  | "connected"
  | "missing_env"
  | "connection_failed"
  | "fallback";

export type RedisCacheStatus = "hit" | "miss" | "unavailable";

export type PerfectBeachDayRequest = {
  beachId: string;
  prompt: string;
};

export type PerfectBeachDaySelectedBeach = {
  beachId: string;
  name: string;
  location: string;
  region: string;
};

export type PerfectBeachCandidate = {
  beachId: string;
  name: string;
  location: string;
  region: string;
  distanceKm?: number;
  advisory: AdvisoryLevel;
  riskLevel: string;
  recommendation: Recommendation;
  reason: string;
  fitHighlights: string[];
};

export type PerfectBeachDayResponse = {
  beachId: string;
  beachName: string;
  selectedBeach: PerfectBeachDaySelectedBeach;
  candidates: PerfectBeachCandidate[];
  redisPowered: boolean;
  redisStatus: RedisStatus;
  redisCacheStatus: RedisCacheStatus;
  fallbackReasons: string[];
  safetyDisclaimer: string;
};
