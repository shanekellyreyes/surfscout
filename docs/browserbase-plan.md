# SurfScout Browserbase Plan

## Goal

Use Browserbase as the **Live Advisory Scout** — a product-facing runtime that researches trusted public sources for Bay Area beach safety and returns structured source notes the app can display, cache, and explain.

## Agent name

`AdvisoryResearchAgent`

---

## Live Advisory Scout — Browserbase Runtime Feature

This is the primary user-facing Browserbase workflow SurfScout will ship after the seeded demo path is stable.

### User action

On `/scout`, the user clicks **“Refresh public advisory notes”** for the currently selected beach.

### Runtime flow

```
User clicks “Refresh public advisory notes”
  → POST /api/research { beachId, beachName, region }
  → AdvisoryResearchAgent (Browserbase Search / Fetch / Browse)
      → discovers trusted public sources for this beach/region
      → for each source, detects access mode:
           • public API available
           • static page (fetch/HTML parse)
           • browser extraction required
      → extracts advisory / access / surf-condition notes
      → normalizes into ResearchSourceNote[]
  → response returns source cards:
      • title, URL, note bullets, confidence, fetchedAt
      • degradedMode when any expected source failed
  → (future) Redis caches ResearchSourceNote[] by beachId + TTL
  → (future) Anthropic SafetyAdvisorAgent explains notes — from provided data only
```

### `/api/research` request (planned)

```json
{
  "beachId": "panther",
  "beachName": "Panther Beach",
  "region": "santa-cruz"
}
```

### `/api/research` response (planned)

```json
{
  "beachId": "panther",
  "beachName": "Panther Beach",
  "region": "santa-cruz",
  "degradedMode": false,
  "fetchedAt": "2026-06-20T12:00:00Z",
  "sourceNotes": [
    {
      "id": "nws-mtr-surf",
      "sourceName": "NWS MTR Surf Forecast",
      "sourceUrl": "https://www.weather.gov/mtr/SurfForecast",
      "sourceType": "official_safety",
      "extractionMethod": "fetch",
      "confidence": "official",
      "fetchedAt": "2026-06-20T12:00:00Z",
      "notes": ["Extracted advisory phrases only — no invented alerts"]
    }
  ]
}
```

### `ResearchSourceNote[]` (planned shape)

Each note is one **source card** in the UI:

| Field | Purpose |
| --- | --- |
| `id` | Stable key for caching/dedup |
| `sourceName` | Human-readable source label |
| `sourceUrl` | Canonical public URL |
| `sourceType` | See [Browserbase source types](#browserbase-source-types) |
| `extractionMethod` | `api` \| `fetch` \| `browser` |
| `confidence` | `official` \| `public_safety` \| `educational` \| `supplemental` \| `news_media` |
| `fetchedAt` | ISO timestamp |
| `notes` | Extracted advisory/access/surf-condition bullet points |
| `degraded` | Optional per-source flag when extraction partially failed |

SurfScout displays these as **public advisory source cards** with timestamps and confidence badges — not as official safety boundaries.

### Downstream consumers (future, not v1)

| Consumer | Role |
| --- | --- |
| **Redis** | Cache `ResearchSourceNote[]` per `beachId`; serve stale-while-revalidate when Browserbase is slow |
| **Anthropic** | Turn structured notes into plain-language guidance — **only from provided notes**, never inventing claims |
| **`/api/ask`** | May incorporate cached research notes into `sourcesUsed` when fresh enough |

---

## API discovery

Browserbase is responsible for **discovering how to read each trusted source** before extraction.

### Discovery steps

1. **Check known registry** — start from [`docs/source-research.md`](source-research.md) inventory (NWS `api.weather.gov`, CO-OPS, NDBC, etc.).
2. **Detect public API endpoints** when available (e.g. NWS alerts API, CO-OPS predictions API, NDBC station feeds).
3. **Prefer API or fetch** for official sources — faster, more reliable, easier to cache.
4. **Use browser extraction** only when no stable API/fetch path exists (State Parks HTML, city pages, NPS content).
5. **Record `extractionMethod`** on every `ResearchSourceNote` for transparency.

### Hard rules

- Never bypass login, paywalls, or robots restrictions
- Never invent warnings, closures, tide times, or incident counts
- Never present extracted text as an official alert unless the source explicitly states it is currently active
- If discovery fails for a source, mark that note `degraded: true` and set response-level `degradedMode: true` when critical Tier 1 sources are missing

---

## Browserbase source types

Map each extracted note to one type for UI labeling and priority:

| Type | Examples | Safety-critical? |
| --- | --- | --- |
| **official_safety** | NOAA, NWS, NDBC, CDIP, State Parks, NPS | Yes — preferred for safety claims |
| **public_safety_page** | City/county beach pages, lifeguard program pages, USLA | Yes — with currency checks |
| **educational_hazard** | NWS sneaker-wave / cold-water pages, NOAA tide tutorials | No — vocabulary and caution copy only |
| **supplemental_surf_condition** | Surfline public spot pages | No — surf height, wind, tide table, condition context |
| **news_media_historical** | Reputable local news (historical context only) | No — background only; clearly labeled |

Tier 1 sources from [`docs/source-research.md`](source-research.md) map to `official_safety` and `public_safety_page`.

---

## Supplemental surf-condition sources

### Surfline (supplemental only)

Surfline may be browsed for **spot-level context when publicly visible**:

- Reported / forecast surf height
- Wind
- Tide table (when shown on public pages)
- Condition ratings and spot summaries (e.g. Ocean Beach, Steamer Lane)

**Rules:**

- Surfline is **surf-condition guidance**, not beach safety guarantees
- **Never use alone** for closures, rescue status, lifeguard directives, or official warnings
- Prefer NOAA / NWS / NDBC / CDIP and official park pages for safety-critical claims
- Browse public pages only; respect terms, robots, login/paywall boundaries, and rate limits
- If blocked, stale, or paywalled → omit Surfline note, fall back to Tier 1 + seeded data, set `degradedMode: true`

> Do not build Surfline integration yet.

---

## Trusted source categories (safety-critical)

Prefer these for safety-critical extraction and Anthropic explanation:

- NOAA / NWS / NDBC / CDIP
- California State Parks
- NPS (GGNRA and related units)
- City / county beach and public safety pages
- Lifeguard / public safety guidance

Full inventory: [`docs/source-research.md`](source-research.md).

---

## General rules

- Do not invent official warnings, closures, tide times, or incident counts
- Do not claim closures unless directly found on an official or authorized public source
- Prefer official/public sources over supplemental surf and news/media for safety-critical guidance
- Record confidence and timestamp on every `ResearchSourceNote`
- Return `degradedMode: true` when live research fails or critical sources are unavailable

---

## Not in scope for v1

- Google Earth integration
- Google Maps API migration
- Reddit sentiment as **live** safety input
- Scraping private or paywalled sources
- Claiming official safety boundaries or drawing authoritative closure zones from research notes

---

## Future optional community context

Sai may research **Reddit / community sentiment offline** for visitor-experience themes (crowds, parking, trail conditions, general vibe).

**Hard boundaries:**

- Reddit must **not** be used as an official safety source
- Reddit must **not** be a primary risk-scoring input
- Any community context must be labeled `news_media` or a future `community_experience` type — never `official_safety`
- Community themes may inform copy suggestions only when corroborated or clearly marked as anecdotal

---

## Status

Documentation only — **no Browserbase, `/api/research`, Redis, Surfline, or Anthropic integration implemented yet.**

Current demo uses seeded profiles, deterministic risk scoring, and `/api/ask`.

---

## Related docs

- [`docs/source-research.md`](source-research.md) — source inventory, stations, advisory signals, API discovery details
- [`docs/incident-signal-design.md`](incident-signal-design.md) — historical incident context (background signal only)
