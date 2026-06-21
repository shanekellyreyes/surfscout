import {
  BEACH_REGION_BY_ID,
  getAllBeachProfiles,
  getBeachProfile,
} from "@/data/beaches";
import { getRedisClient } from "@/lib/redis/client";
import type { RedisStatus } from "@/types/perfect-beach-day";
import type { RedisClientType } from "redis";

export const BEACH_GEO_KEY = "surfscout:beaches:geo";
const SEARCH_RADIUS_KM = 80;
const MAX_NEARBY = 12;

export type NearbyBeachHit = {
  beachId: string;
  distanceKm: number;
};

export type NearbyBeachLookup = {
  nearby: NearbyBeachHit[];
  redisPowered: boolean;
  redisStatus: RedisStatus;
  fallbackReasons: string[];
};

let geoSeededThisProcess = false;

function haversineKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function seedBeachGeo(client: RedisClientType): Promise<void> {
  if (geoSeededThisProcess) return;

  const profiles = getAllBeachProfiles();
  await Promise.all(
    profiles.map((profile) =>
      client.geoAdd(BEACH_GEO_KEY, {
        longitude: profile.longitude,
        latitude: profile.latitude,
        member: profile.id,
      }),
    ),
  );

  geoSeededThisProcess = true;
}

function seededNearbyBeaches(
  originBeachId: string,
  redisStatus: RedisStatus,
  fallbackReasons: string[],
): NearbyBeachLookup {
  const origin = getBeachProfile(originBeachId);
  if (!origin) {
    return {
      nearby: [],
      redisPowered: false,
      redisStatus,
      fallbackReasons,
    };
  }

  const nearby = getAllBeachProfiles()
    .map((profile) => ({
      beachId: profile.id,
      distanceKm: haversineKm(
        origin.latitude,
        origin.longitude,
        profile.latitude,
        profile.longitude,
      ),
    }))
    .filter((hit) => hit.beachId !== originBeachId)
    .filter((hit) => hit.distanceKm <= SEARCH_RADIUS_KM)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, MAX_NEARBY);

  return {
    nearby,
    redisPowered: false,
    redisStatus,
    fallbackReasons,
  };
}

async function redisNearbyBeaches(
  client: RedisClientType,
  originBeachId: string,
): Promise<NearbyBeachHit[]> {
  const origin = getBeachProfile(originBeachId);
  if (!origin) return [];

  await seedBeachGeo(client);

  const results = await client.geoSearchWith(
    BEACH_GEO_KEY,
    { longitude: origin.longitude, latitude: origin.latitude },
    { radius: SEARCH_RADIUS_KM, unit: "km" },
    ["WITHDIST"],
  );

  return results
    .map((entry) => ({
      beachId: entry.member,
      distanceKm: Number(entry.distance),
    }))
    .filter((entry) => entry.beachId !== originBeachId)
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, MAX_NEARBY);
}

export async function findNearbyBeaches(
  originBeachId: string,
): Promise<NearbyBeachLookup> {
  const origin = getBeachProfile(originBeachId);
  if (!origin) {
    return {
      nearby: [],
      redisPowered: false,
      redisStatus: "fallback",
      fallbackReasons: [`Unknown beachId: ${originBeachId}`],
    };
  }

  const redisResult = await getRedisClient();

  if (redisResult.status === "missing_env") {
    return seededNearbyBeaches(originBeachId, "missing_env", [
      redisResult.errorMessage ?? "REDIS_URL is not set.",
    ]);
  }

  if (redisResult.status === "connection_failed" || !redisResult.client) {
    return seededNearbyBeaches(originBeachId, "connection_failed", [
      redisResult.errorMessage ?? "Could not connect to Redis.",
    ]);
  }

  try {
    const nearby = await redisNearbyBeaches(redisResult.client, originBeachId);

    if (nearby.length === 0) {
      return seededNearbyBeaches(originBeachId, "fallback", [
        "Redis GEO search returned no nearby beaches; using seeded in-memory lookup.",
      ]);
    }

    return {
      nearby,
      redisPowered: true,
      redisStatus: "connected",
      fallbackReasons: [],
    };
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Redis GEO lookup failed.";
    return seededNearbyBeaches(originBeachId, "fallback", [message]);
  }
}

export function regionLabelForBeach(beachId: string): string {
  const profile = getBeachProfile(beachId);
  return BEACH_REGION_BY_ID[beachId] ?? profile?.region ?? "bay-area";
}
