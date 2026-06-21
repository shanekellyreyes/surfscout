# SurfScout Browserbase Plan

## Goal

Use Browserbase as a Live Advisory Research Agent for Bay Area beach safety.

## Agent name

`AdvisoryResearchAgent`

## Input

- beach name
- city/region
- optional trusted source URLs

## Output

- source title
- source URL
- extracted safety/access notes
- advisory-relevant phrases
- confidence level
- timestamp
- fallback-safe summary

## Trusted source categories (safety-critical)

SurfScout should prefer **official and public sources** for safety-critical claims:

- NOAA / National Weather Service (NWS)
- NDBC / CDIP buoy and coastal observation data
- California State Parks
- National Park Service (NPS)
- City / county beach pages
- Lifeguard / public safety pages
- Harbor / marine condition pages
- Official park / access pages

See [`docs/source-research.md`](source-research.md) for the full source inventory and station reference.

## Supplemental surf-condition sources

### Surfline (supplemental only)

Surfline can provide spot-level surf context such as reported/forecast surf height, wind, and condition ratings for popular breaks like Ocean Beach and Steamer Lane.

**Usage rules:**

- Treat Surfline ratings as **surf-condition guidance**, not beach safety guarantees.
- Use Surfline to enrich surf height, wind, and break-level condition context when publicly available.
- Do **not** use Surfline alone for closure claims, rescue status, lifeguard directives, or official warnings.
- Prefer NOAA, NWS, NDBC, CDIP, California State Parks, NPS, city/county pages, and lifeguard/public safety pages for safety-critical claims.

**Browsing boundaries:**

- Browserbase should only browse **publicly visible** Surfline pages.
- Respect site terms, robots rules, login/paywall boundaries, and rate limits.
- Do not attempt to bypass authentication or paid tiers.

**Fallback:**

- If Surfline data is missing, blocked, stale, or behind login/paywall, fall back to NOAA / NWS / NDBC / CDIP / seeded data and set `degradedMode: true`.

> **Note:** Do not build the Surfline integration yet. This section documents future Browserbase research policy only.

## General rules

- Do not invent official warnings, closures, tide times, or incident counts
- Do not claim closures unless directly found on an official or authorized public source
- Prefer official/public sources over news, media, and supplemental surf-condition sites for safety-critical guidance
- Record confidence and timestamp for every extracted note
- If live browsing fails or sources are unavailable, return `degradedMode: true`

## Status

Documentation only — no Browserbase, Surfline, Redis, or Anthropic integration implemented yet.

## Related docs

- [`docs/source-research.md`](source-research.md) — source priority, inventory, and advisory signals
- [`docs/incident-signal-design.md`](incident-signal-design.md) — historical incident context (background signal only)
