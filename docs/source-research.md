# SurfScout Source Research

## Purpose

SurfScout uses trusted public sources for **advisory decision support** — not safety guarantees. This document defines how future Browserbase-powered research (and later integrations) should gather, prioritize, and present coastal information for Bay Area and Santa Cruz beaches.

SurfScout does not guarantee safety. Sources are inputs for cautious, approximate guidance only. Always defer to official warnings, posted signage, and on-site lifeguards. Nothing here should be presented as an official safety boundary or guarantee.

For the product-facing Browserbase runtime flow, see **[Live Advisory Scout — Browserbase Runtime Feature](browserbase-plan.md#live-advisory-scout--browserbase-runtime-feature)** in `docs/browserbase-plan.md`.

## Source Priority

SurfScout applies a three-tier hierarchy:

### Tier 1 — Official / public safety (safety-critical)

Use for closures, official alerts, access rules, lifeguard coverage, and any safety-critical claim:

- NOAA / NWS / NDBC / CDIP
- California State Parks
- NPS (including GGNRA)
- City / county beach and public safety pages
- Lifeguard / public safety guidance

### Tier 2 — Supplemental surf-condition context

Use for enrichment when Tier 1 data is available — never as the sole basis for safety-critical claims:

- **Surfline** (spot-level surf height, wind, condition ratings — see [Supplemental Surf-Condition Sources](#supplemental-surf-condition-sources))

### Tier 3 — News / media / educational background

Use only when clearly labeled, confidence-scored, and corroborated where possible. Never use alone for closures, active warnings, or lifeguard directives. See [Future optional community context](#future-optional-community-context).

## Live Advisory Scout — Browserbase Runtime Feature

Product-facing flow (planned — not built yet):

```
User clicks “Refresh public advisory notes” on /scout
  → POST /api/research { beachId, beachName, region }
  → Browserbase Search / Fetch / Browse (AdvisoryResearchAgent)
  → API discovery per source (api | fetch | browser)
  → extract advisory / access / surf-condition notes
  → return ResearchSourceNote[] as source cards + degradedMode
  → (future) Redis caches notes by beachId
  → (future) Anthropic explains notes from provided data only
```

Full specification: [`docs/browserbase-plan.md`](browserbase-plan.md#live-advisory-scout--browserbase-runtime-feature).

### `ResearchSourceNote` (planned)

| Field | Description |
| --- | --- |
| `id` | Stable cache key |
| `sourceName` | Display label |
| `sourceUrl` | Public canonical URL |
| `sourceType` | `official_safety` \| `public_safety_page` \| `educational_hazard` \| `supplemental_surf_condition` \| `news_media_historical` |
| `extractionMethod` | `api` \| `fetch` \| `browser` |
| `confidence` | Extraction confidence tier |
| `fetchedAt` | ISO timestamp |
| `notes` | Extracted bullet points (advisory, access, surf-condition) |
| `degraded` | Optional per-source partial-failure flag |

## API Discovery

Browserbase **API discovery** is a first-class step before extraction:

| Step | Action |
| --- | --- |
| 1 | Start from this document's source inventory |
| 2 | Detect whether the source exposes a **public API** (e.g. `api.weather.gov`, CO-OPS, NDBC feeds) |
| 3 | **Prefer API or fetch** for official sources — faster and cache-friendly |
| 4 | Use **browser extraction** when pages are static HTML without APIs (State Parks, city pages, NPS) |
| 5 | Record `extractionMethod` on every `ResearchSourceNote` |

**Never:** bypass login/paywalls, scrape private content, or invent warnings, closures, tide times, or incident counts.

Known API-first sources in this inventory:

- NWS — [api.weather.gov/alerts/active](https://api.weather.gov/alerts/active)
- NOAA CO-OPS — tide prediction and water-level endpoints via [tidesandcurrents.noaa.gov](https://tidesandcurrents.noaa.gov/)
- NDBC — station data feeds via [ndbc.noaa.gov](https://www.ndbc.noaa.gov/)

## Browserbase Source Types

| Browserbase type | Maps to inventory tier | Use for |
| --- | --- | --- |
| `official_safety` | Tier 1 | Safety-critical claims, active alerts (when explicitly present) |
| `public_safety_page` | Tier 1 | Lifeguard, city/county, access and hazard pages |
| `educational_hazard` | Tier 3 | Hazard vocabulary, cold-water / sneaker-wave education |
| `supplemental_surf_condition` | Tier 2 | Surfline spot context — surf height, wind, tide table, ratings |
| `news_media_historical` | Tier 3 | Historical incident / visitor-experience background only |

## Source Inventory

Each entry lists: source type, signal SurfScout could use, how Browserbase or a future integration would use it, and reliability cautions.

### 1. NOAA Tides & Currents / CO-OPS

| Field | Detail |
| --- | --- |
| **Source type** | `official` |
| **Homepage** | [tidesandcurrents.noaa.gov](https://tidesandcurrents.noaa.gov/) |
| **Signal SurfScout could use** | Tide status, rising/falling state, high-tide proximity |
| **Browserbase / integration** | Fetch station predictions and real-time water levels for nearest CO-OPS station; compute tide signals for beach profile |
| **Reliability caution** | Predictions are astronomical only; storms and surge can shift real levels. Use nearest station and note distance. |

### 2. National Weather Service / api.weather.gov

| Field | Detail |
| --- | --- |
| **Source type** | `official` |
| **Homepage** | [weather.gov/mtr](https://www.weather.gov/mtr/) (Bay Area / Monterey WFO) |
| **Signal SurfScout could use** | Active NWS alerts, beach hazard statements, marine/surf forecast text |
| **Browserbase / integration** | Poll [api.weather.gov/alerts/active](https://api.weather.gov/alerts/active); match forecast zone to beach; extract hazard phrases from MTR marine/surf pages |
| **Reliability caution** | Alerts are zone-based, not beach-specific. **Never fabricate an alert that is not currently active.** |

Supporting endpoints:

- [NWS Public Alerts API](https://api.weather.gov/alerts/active)
- [Alerts map UI](https://alerts.weather.gov/)
- [NWS MTR Marine Forecasts](https://www.weather.gov/mtr/marine)
- [NWS MTR Surf Forecast](https://www.weather.gov/mtr/SurfForecast)

### 3. NDBC buoy data

| Field | Detail |
| --- | --- |
| **Source type** | `official` |
| **Homepage** | [ndbc.noaa.gov](https://www.ndbc.noaa.gov/) |
| **Signal SurfScout could use** | Buoy wave height, dominant period, wave direction, wind, water temperature |
| **Browserbase / integration** | Read station pages or feeds for nearest buoys; surface as offshore proxy metric with staleness checks |
| **Reliability caution** | Offshore buoys can read larger/different than breaking surf at shore. Buoys go offline — handle missing data gracefully. |

### 4. CDIP wave data

| Field | Detail |
| --- | --- |
| **Source type** | `official` (academic / federally supported — treat as semi-official) |
| **Homepage** | [cdip.ucsd.edu](https://cdip.ucsd.edu/) |
| **Signal SurfScout could use** | Nearshore wave models, swell forecasts where NDBC is sparse |
| **Browserbase / integration** | Pull station/model data for relevant coastal segments |
| **Reliability caution** | Research-grade data; verify station relevance to target beach. |

### 5. California State Parks beach pages

| Field | Detail |
| --- | --- |
| **Source type** | `official` |
| **Homepage** | [parks.ca.gov](https://www.parks.ca.gov/) |
| **Signal SurfScout could use** | Known beach hazards, access difficulty, official safety notes, park descriptions |
| **Browserbase / integration** | Browse park unit pages; extract hazard and access language with timestamp |
| **Reliability caution** | Pages are descriptive, not real-time; closures or updates may lag. |

Key pages:

- [Santa Cruz District](https://www.parks.ca.gov/?page_id=21566)
- [Natural Bridges State Beach](https://www.parks.ca.gov/?page_id=541)
- [Half Moon Bay State Beach](https://www.parks.ca.gov/?page_id=531)
- [Beach & Ocean Safety](https://www.parks.ca.gov/?page_id=29485)

### 6. NPS / Golden Gate National Recreation Area beach safety pages

| Field | Detail |
| --- | --- |
| **Source type** | `official` |
| **Homepage** | [nps.gov/goga](https://www.nps.gov/goga/) |
| **Signal SurfScout could use** | Location-specific hazard messaging (rip currents, cold water) for Ocean Beach and GGNRA shoreline |
| **Browserbase / integration** | Browse [Ocean Beach — Plan Your Visit](https://www.nps.gov/goga/planyourvisit/oceanbeach.htm); extract safety-relevant phrases |
| **Reliability caution** | Beach-specific guidance; check page currency. Not a live conditions feed. |

### 7. City / county beach and public safety pages

| Field | Detail |
| --- | --- |
| **Source type** | `official` |
| **Signal SurfScout could use** | Local hazard notes, access context, water-quality postings, regional advisories |
| **Browserbase / integration** | Browse municipal and county pages for beach-adjacent cities; extract advisory-relevant text |
| **Reliability caution** | Generally not real-time; sampling and posting may lag conditions. |

| Agency | URL | Focus |
| --- | --- | --- |
| City of Santa Cruz | [cityofsantacruz.com](https://www.cityofsantacruz.com/) | Local beach info, closures, advisories |
| Santa Cruz County | [santacruzcountyca.gov](https://www.santacruzcountyca.gov/) | Beach water-quality postings |
| SF Rec & Park | [sfrecpark.org](https://sfrecpark.org/) | SF shoreline park context |
| City of Pacifica | [cityofpacifica.org](https://www.cityofpacifica.org/) | Pacifica beach & pier info |
| City of Half Moon Bay | [half-moon-bay.ca.us](https://www.half-moon-bay.ca.us/) | Coastal / visitor info |
| San Mateo County | [smcgov.org](https://www.smcgov.org/) | Regional coastal / health info |

### 8. Lifeguard / public safety guidance

| Field | Detail |
| --- | --- |
| **Source type** | `public_safety` |
| **Homepage** | [usla.org](https://www.usla.org/) |
| **Signal SurfScout could use** | Rip-current safety phrasing, swim-near-lifeguard guidance, weak-swimmer / family messaging |
| **Browserbase / integration** | Reference USLA educational pages; combine with local lifeguard program pages where available |
| **Reliability caution** | General national guidance, not beach-specific real-time lifeguard status. **Most Bay Area open-coast beaches are not continuously lifeguarded** — SurfScout must make this explicit. |

Related:

- [USLA — Rip Currents](https://www.usla.org/page/ripcurrents)
- [California State Parks — Ocean Safety](https://www.parks.ca.gov/?page_id=29485)

### 9. Educational hazard resources

| Field | Detail |
| --- | --- |
| **Source type** | `educational` |
| **Signal SurfScout could use** | Hazard vocabulary and user-facing caution copy (sneaker waves, cold water, rip currents) |
| **Browserbase / integration** | Browse official NWS/NOAA educational pages; extract phrases for explanation layers — not for inventing active alerts |
| **Reliability caution** | Educational only; do not treat as live conditions or official warnings. |

| Topic | URL |
| --- | --- |
| Rip current safety | [weather.gov/safety/ripcurrent](https://www.weather.gov/safety/ripcurrent) |
| Sneaker waves | [weather.gov/safety/sneaker-waves](https://www.weather.gov/safety/sneaker-waves) |
| Cold water safety | [weather.gov/safety/coldwater](https://www.weather.gov/safety/coldwater) |
| NWS MTR beach hazards | [weather.gov/mtr/beachhazards](https://www.weather.gov/mtr/beachhazards) |
| NOAA tide mechanics tutorial | [oceanservice.noaa.gov/education/tutorial_tides/welcome.html](https://oceanservice.noaa.gov/education/tutorial_tides/welcome.html) |
| CA State Parks ocean safety | [parks.ca.gov/?page_id=29485](https://www.parks.ca.gov/?page_id=29485) |

**Key hazard notes for this coastline:**

- **Sneaker waves:** Signature Northern California hazard; can sweep people off dry sand or rocks. Never present a beach as safe to turn your back on the ocean.
- **Cold water:** Pacific water stays dangerously cold year-round (~50s °F). Cold-water shock is an immediate threat even on warm days.
- **Cliff hazards:** Santa Cruz and San Mateo coastlines have unstable bluffs — stay back from edges and bases.
- **Rip currents:** Common and powerful at Ocean Beach (SF) and many open-coast breaks.

### 10. Surfline (supplemental surf-condition context only)

| Field | Detail |
| --- | --- |
| **Source type** | `supplemental` |
| **Homepage** | [surfline.com](https://www.surfline.com/) |
| **Signal SurfScout could use** | Spot-level surf height, wind, tide table (when public), condition ratings (e.g. Ocean Beach, Steamer Lane) |
| **Browserbase / integration** | Browse **publicly visible** spot pages only; `extractionMethod: browser` or `fetch`; `sourceType: supplemental_surf_condition` |
| **Reliability caution** | Surf-condition guidance only — **not** beach safety guarantees. Must not be used alone for closures, rescue status, lifeguard directives, or official warnings. |

See [Supplemental Surf-Condition Sources](#supplemental-surf-condition-sources) for full policy.

## Relevant Stations and Example Sources

### NOAA CO-OPS tide stations

| Station | ID | Region | Link |
| --- | --- | --- | --- |
| Monterey, CA | 9413450 | Closest to Santa Cruz | [Station home](https://tidesandcurrents.noaa.gov/stationhome.html?id=9413450) |
| San Francisco (Presidio) | 9414290 | SF / Marin | [Station home](https://tidesandcurrents.noaa.gov/stationhome.html?id=9414290) |
| Point Reyes, CA | 9415020 | North Marin | [Station home](https://tidesandcurrents.noaa.gov/stationhome.html?id=9415020) |

Santa Cruz, Pacifica, and Half Moon Bay lack dedicated long-term CO-OPS stations. Use the nearest station and treat values as approximate.

### NDBC buoys

| Buoy | Location | Link |
| --- | --- | --- |
| 46042 | Monterey Bay — 27 NM W of Monterey | [Station 46042](https://www.ndbc.noaa.gov/station_page.php?station=46042) |
| 46026 | San Francisco — 18 NM W | [Station 46026](https://www.ndbc.noaa.gov/station_page.php?station=46026) |
| 46237 | San Francisco Bar | [Station 46237](https://www.ndbc.noaa.gov/station_page.php?station=46237) |
| 46012 | Half Moon Bay offshore | [Station 46012](https://www.ndbc.noaa.gov/station_page.php?station=46012) |

### NWS public alerts

- [api.weather.gov/alerts/active](https://api.weather.gov/alerts/active) — machine-readable active alerts
- [weather.gov/mtr/marine](https://www.weather.gov/mtr/marine) — MTR marine forecast
- [weather.gov/mtr/SurfForecast](https://www.weather.gov/mtr/SurfForecast) — Bay Area surf forecast

## Supplemental Surf-Condition Sources

### Surfline

Surfline can provide spot-level surf context such as reported/forecast **surf height**, **wind**, **tide table** (when shown on public pages), and **condition ratings** for popular breaks like **Ocean Beach** and **Steamer Lane**.

- Surfline ratings are **surf-condition guidance**, not beach safety guarantees.
- Surfline must **not** be used alone for closures, rescue status, lifeguard directives, or official warnings.
- Prefer NOAA, NWS, NDBC, CDIP, California State Parks, NPS, city/county pages, and lifeguard/public safety pages for safety-critical claims.
- Browserbase should only browse **publicly visible** pages and must respect terms, robots rules, login/paywall boundaries, and rate limits.
- If Surfline data is missing, blocked, stale, or behind login/paywall, SurfScout should fall back to NOAA / NWS / NDBC / CDIP / seeded data and set `degradedMode: true`.

> **Do not build the Surfline integration yet.** This section documents future research policy only.

## Browserbase Research Policy

When Browserbase research is implemented (`AdvisoryResearchAgent` — see [`docs/browserbase-plan.md`](browserbase-plan.md)):

1. Run **API discovery** before extraction — prefer APIs/fetch for official sources.
2. Browse **publicly visible pages only** — no login bypass, no paywall circumvention.
3. Respect site terms, `robots.txt`, and rate limits.
4. **Prefer official/public safety sources** for safety-critical claims.
5. Use Surfline **supplementally** (`supplemental_surf_condition`) for surf height, wind, tide table, and condition context when publicly accessible.
6. **Record confidence, `extractionMethod`, and timestamp** on every `ResearchSourceNote`.
7. **Never invent** warnings, closures, tide times, or incident counts.
8. Return source cards suitable for the **“Refresh public advisory notes”** UI action.

### Fallback and degraded mode

If any live source — including Surfline — is missing, blocked, stale, or behind login/paywall:

- Fall back to NOAA / NWS / NDBC / CDIP where available
- Fall back to seeded beach profiles and cached summaries
- Set `degradedMode: true` in the API response
- Do not present supplemental or stale data as current official guidance

## Recommended SurfScout Advisory Signals

All signals are approximate and strictly advisory — not official safety boundaries.

| Signal | Source(s) | Notes / Logic |
| --- | --- | --- |
| **Tide Status** | NOAA Tides & Currents | Current height mapped against the day's predicted range (Low / Mid / High). |
| **Rising / Falling Tide** | NOAA Tides & Currents | Trend vector between predicted high and low water marks. |
| **High-Tide Proximity** | NOAA Tides & Currents | Minutes/feet from next high tide (flags narrow-beach entrapment risks). |
| **Active NWS Alerts** | NWS / `api.weather.gov` | Only show currently active warnings/advisories; never extrapolate or invent one. |
| **Marine & Surf Conditions** | NWS MTR Marine & Surf | Plain-language surf size and period summary text. |
| **Buoy Wave Height** | NDBC / CDIP | Offshore proxy metric; clearly flag when data is missing, stale, or offline. |
| **Known Beach Hazards** | State Parks, NPS, NWS, local pages | Location-specific vectors: sneaker waves, rip currents, cliffs, cold water. |
| **Access Difficulty** | State Parks, city pages | Trails, steep stairs, rocky entries, remoteness from emergency help. |
| **Historical Incident Context** | Seeded incident context; official/public safety records; reputable local news when clearly labeled | Background risk awareness only — **not** a live warning and **not** an official safety boundary. See `docs/incident-signal-design.md`. |
| **User Context Integration** | App input / parser | Weak swimmer, family/kids, evening/low light, quiet/remote preference → bias toward caution and safer alternatives. |

## Reliability & Usage Principles

1. **Hierarchy of truth:** Prefer official federal and state sources (NOAA / NWS / NPS / State Parks) for safety-relevant signals.
2. **Proxy limitations:** Treat buoy and tide data as nearest-station approximations, not on-beach truth.
3. **Alert integrity:** Surface only currently active NWS alerts. Do not fabricate, extend, or imply warnings from buoy data alone.
4. **No definitive boundaries:** Advisory overlays are mathematical or descriptive approximations — not official safety boundaries.
5. **Educational bundling:** Pair localized outputs with cold-water, sneaker-wave, and swim-near-lifeguard reminders where appropriate.
6. **Core identity:** SurfScout provides decision-support guidance — it does not validate safe/unsafe binaries and never guarantees safety.

## Not in Scope for v1

- Google Earth integration
- Google Maps API migration
- Reddit sentiment as **live** safety input
- Scraping private or paywalled sources
- Claiming official safety boundaries from research notes or advisory overlays

## Future Optional Community Context

Sai may research **Reddit / community sentiment offline** for visitor-experience themes (crowds, parking, trail access, general beach vibe).

**Boundaries:**

- Reddit is **not** an official safety source
- Reddit must **not** be a primary risk-scoring input
- Any community-derived note uses `news_media_historical` (or a future `community_experience` type) — never `official_safety`
- Community themes may inform copy only when labeled anecdotal or corroborated by Tier 1 sources

See also [`docs/browserbase-plan.md`](browserbase-plan.md#future-optional-community-context).

## Future Integration

| Component | Role | Status |
| --- | --- | --- |
| **Browserbase** (`AdvisoryResearchAgent`) | Live Advisory Scout — `/api/research`, API discovery, `ResearchSourceNote[]` source cards | Not built |
| **Redis** | Cache `ResearchSourceNote[]` per beachId with TTL | Not built |
| **Seeded profiles** | Fallback when live research fails | Active (demo) |
| **Anthropic** | Explain structured notes from provided data only — no invented claims | Not built |
| **Surfline** | Supplemental surf-condition context via public pages only | Not built |

## Related Docs

- [`docs/browserbase-plan.md`](browserbase-plan.md) — AdvisoryResearchAgent plan
- [`docs/incident-signal-design.md`](incident-signal-design.md) — historical incident context (background signal only)
