# Redis Prize Plan

## Prize qualification notes

* SurfScout must clearly demonstrate Redis usage in both the demo and GitHub repo.
* Qualified Redis tools include Redis Cloud, Redis OSS, RedisVL, Agent Memory Server, and Redis AI Incubator tools.
* Judging emphasizes:
  * Redis beyond caching
  * creativity/originality and fun factor
  * solving a real human problem
  * technical implementation, correctness, scalability, and architecture

## Useful Redis setup notes

* Redis Cloud Essentials tier is recommended for this hackathon.
* Redis Cloud credit code from the sponsor deck: `CALHACKER2026`
* Redis agent skill command:

  ```bash
  npx skills add redis/agent-skills
  ```

## SurfScout Redis feature target

**Feature name:**  
“Perfect Beach Day”

**User-facing button:**  
“Find my Perfect Beach Day”

**Visible demo copy:**  
“Powered by Redis Geo + Cache”

## Why Redis fits SurfScout

SurfScout needs fast context retrieval for beach decision support:

* nearest candidate beaches
* safer alternatives by user context
* cached advisory/source notes from Live Advisory Scout
* resilient fallback when live research is unavailable

## Planned Redis implementation

1. Redis GEO stores beach coordinates by beachId.
2. SurfScout uses Redis geospatial lookup to find nearby candidate beaches.
3. App filters/ranks candidates using existing deterministic risk scoring and user context.
4. Redis caches `/api/research` source notes by beachId.
5. If Browserbase/live research fails, SurfScout can use Redis cached notes before falling back to seeded data.
6. UI clearly labels Redis-powered results only when Redis is actually wired.

## Safety constraints

* Redis must not change safety claims by itself.
* Do not invent warnings, closures, tide times, incident counts, or official claims.
* Redis can retrieve and cache context, but SurfScout still presents advisory-only guidance.
* If Redis is unavailable, app must continue with seeded fallback.

## Initial implementation slice

* Add Redis client guarded by `REDIS_URL`.
* Add endpoint/helper for Redis-backed safer beach lookup.
* Seed beach coordinates into Redis on demand or via helper.
* Add “Perfect Beach Day” button/card in `/scout`.
* Show fallback mode if Redis is missing.
* Keep `/api/ask` stable.
