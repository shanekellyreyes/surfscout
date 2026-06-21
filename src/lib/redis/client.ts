import { createClient, type RedisClientType } from "redis";

export type RedisConnectionStatus =
  | "connected"
  | "missing_env"
  | "connection_failed";

export type RedisConfigSource = "env_parts" | "url";

export type RedisClientResult = {
  client: RedisClientType | null;
  status: RedisConnectionStatus;
  configSource?: RedisConfigSource;
  errorMessage?: string;
};

const HARD_CONNECT_TIMEOUT_MS = 4000;

const REDIS_URL_SOCKET_OPTIONS = {
  connectTimeout: 5000,
  reconnectStrategy: false as const,
};

const REDIS_TIMEOUT_MESSAGE =
  "Redis connection timed out; using seeded fallback.";

type ResolvedRedisConfig =
  | {
      kind: "env_parts";
      host: string;
      port: number;
      username: string;
      password: string;
    }
  | {
      kind: "url";
      url: string;
    }
  | {
      kind: "missing";
    };

let cachedClient: RedisClientType | null = null;
let cachedConfigSource: RedisConfigSource | undefined;
let connectPromise: Promise<RedisClientResult> | null = null;

class RedisConnectTimeoutError extends Error {
  constructor() {
    super(REDIS_TIMEOUT_MESSAGE);
    this.name = "RedisConnectTimeoutError";
  }
}

function withHardTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new RedisConnectTimeoutError());
    }, ms);

    promise
      .then((value) => {
        clearTimeout(timer);
        resolve(value);
      })
      .catch((error) => {
        clearTimeout(timer);
        reject(error);
      });
  });
}

function resolveRedisConfig(): ResolvedRedisConfig {
  const host = process.env.REDIS_HOST?.trim();
  const portRaw = process.env.REDIS_PORT?.trim();
  const password = process.env.REDIS_PASSWORD?.trim();

  if (host && portRaw && password) {
    const port = Number(portRaw);
    if (!Number.isFinite(port) || port <= 0) {
      return { kind: "missing" };
    }

    return {
      kind: "env_parts",
      host,
      port,
      username: process.env.REDIS_USER?.trim() || "default",
      password,
    };
  }

  const url = process.env.REDIS_URL?.trim();
  if (url) {
    return { kind: "url", url };
  }

  return { kind: "missing" };
}

function createRedisClient(config: Exclude<ResolvedRedisConfig, { kind: "missing" }>) {
  if (config.kind === "env_parts") {
    return createClient({
      username: config.username,
      password: config.password,
      socket: {
        host: config.host,
        port: config.port,
      },
    });
  }

  return createClient({
    url: config.url,
    socket: REDIS_URL_SOCKET_OPTIONS,
  });
}

function sanitizeRedisError(error: unknown): string {
  const raw =
    error instanceof Error ? error.message : "Redis connection failed.";
  return raw
    .replace(/redis:\/\/[^@\s/]+@/gi, "redis://***@")
    .replace(/password=[^\s&]+/gi, "password=***");
}

async function disconnectQuietly(client: RedisClientType) {
  try {
    if (client.isOpen) {
      await client.quit();
      return;
    }
    client.destroy();
  } catch {
    try {
      client.destroy();
    } catch {
      // Ignore cleanup errors during failed connect attempts.
    }
  }
}

export async function getRedisClient(): Promise<RedisClientResult> {
  const config = resolveRedisConfig();

  if (config.kind === "missing") {
    return {
      client: null,
      status: "missing_env",
      errorMessage:
        "Redis is not configured. Set REDIS_HOST, REDIS_PORT, REDIS_PASSWORD (and optional REDIS_USER), or REDIS_URL.",
    };
  }

  if (cachedClient?.isOpen && cachedConfigSource) {
    return {
      client: cachedClient,
      status: "connected",
      configSource: cachedConfigSource,
    };
  }

  if (connectPromise) {
    return connectPromise;
  }

  const configSource: RedisConfigSource =
    config.kind === "env_parts" ? "env_parts" : "url";

  connectPromise = (async (): Promise<RedisClientResult> => {
    const client = createRedisClient(config);

    client.on("error", () => {
      // Swallow runtime errors so a dropped connection does not crash the app.
    });

    try {
      await withHardTimeout(
        (async () => {
          await client.connect();
          await client.ping();
        })(),
        HARD_CONNECT_TIMEOUT_MS,
      );

      cachedClient = client;
      cachedConfigSource = configSource;
      return {
        client,
        status: "connected",
        configSource,
      };
    } catch (error) {
      await disconnectQuietly(client);
      cachedClient = null;
      cachedConfigSource = undefined;

      if (error instanceof RedisConnectTimeoutError) {
        return {
          client: null,
          status: "connection_failed",
          configSource,
          errorMessage: REDIS_TIMEOUT_MESSAGE,
        };
      }

      return {
        client: null,
        status: "connection_failed",
        configSource,
        errorMessage: sanitizeRedisError(error),
      };
    } finally {
      connectPromise = null;
    }
  })();

  return connectPromise;
}
