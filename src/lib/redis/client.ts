import { createClient, type RedisClientType } from "redis";

export type RedisConnectionStatus = "connected" | "missing_env" | "connection_failed";

export type RedisClientResult = {
  client: RedisClientType | null;
  status: RedisConnectionStatus;
  errorMessage?: string;
};

let cachedClient: RedisClientType | null = null;
let connectPromise: Promise<RedisClientResult> | null = null;

export async function getRedisClient(): Promise<RedisClientResult> {
  const url = process.env.REDIS_URL?.trim();

  if (!url) {
    return {
      client: null,
      status: "missing_env",
      errorMessage: "REDIS_URL is not set.",
    };
  }

  if (cachedClient?.isOpen) {
    return { client: cachedClient, status: "connected" };
  }

  if (connectPromise) {
    return connectPromise;
  }

  connectPromise = (async (): Promise<RedisClientResult> => {
    try {
      const client = createClient({ url });
      client.on("error", () => {
        // Swallow runtime errors so a dropped connection does not crash the app.
      });
      await client.connect();
      await client.ping();
      cachedClient = client;
      return { client, status: "connected" };
    } catch (error) {
      cachedClient = null;
      return {
        client: null,
        status: "connection_failed",
        errorMessage:
          error instanceof Error ? error.message : "Redis connection failed.",
      };
    } finally {
      connectPromise = null;
    }
  })();

  return connectPromise;
}
