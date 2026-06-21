# SurfScout Source Research

## Purpose

This document defines how SurfScout (via future Browserbase-powered research) should gather and prioritize coastal information for Bay Area and Santa Cruz beaches.

SurfScout provides cautious guidance — not safety guarantees. Source research must support that posture.

## Source priority

### Tier 1 — Safety-critical (preferred)

Use these for closures, official alerts, access rules, lifeguard coverage, and public safety claims:

| Source | Typical use |
|--------|-------------|
| NOAA | Marine forecasts, coastal hazards |
| NWS (National Weather Service) | Surf zone forecasts, beach hazards, rip-current statements |
| NDBC | Buoy observations (wave height, period, wind) |
| CDIP | Coastal wave models and station data |
| California State Parks | Park beach access, seasonal rules, posted guidance |
| NPS | National seashore / recreation area pages |
| City / county beach pages | Local access, amenities, seasonal postings |
| Lifeguard / public safety pages | Guarded areas, seasonal coverage, safety messaging |

### Tier 2 — Supplemental context

Use for enrichment when Tier 1 data is available or as non-authoritative background — never as the sole basis for safety-critical claims.

## Supplemental surf-condition sources

### Surfline

Surfline can provide spot-level surf context such as reported/forecast surf height, wind, and condition ratings for popular breaks like **Ocean Beach** and **Steamer Lane**.

**What Surfline is good for:**

- Reported and forecast surf height
- Wind speed and direction at the spot
- Break-level condition ratings and surf summaries
- Popular-spot context for demo beaches and nearby alternatives

**What Surfline is not:**

- An official safety authority
- A substitute for lifeguard directives or posted signage
- A guarantee of safe or unsafe conditions
- A source for closure or emergency claims unless corroborated by Tier 1 sources

Surfline ratings should be treated as **surf-condition guidance**, not beach safety guarantees.

## Browserbase research policy

When Browserbase research is implemented:

1. **Browse publicly visible pages only** — no login bypass, no paywall circumvention.
2. **Respect site terms, robots.txt, and rate limits.**
3. **Prefer Tier 1 sources** for anything safety-critical (closures, warnings, access restrictions, lifeguard status).
4. **Use Surfline supplementally** for surf height, wind, and condition ratings when pages are publicly accessible.
5. **Record confidence and timestamp** for every extracted note.
6. **Never invent** warnings, closures, tide times, or incident counts.

## Fallback and degraded mode

If any live source — including Surfline — is missing, blocked, stale, or behind login/paywall:

- Fall back to NOAA / NWS / NDBC / CDIP data where available
- Fall back to seeded beach profiles and cached summaries
- Set `degradedMode: true` in the API response
- Do not present supplemental or stale data as current official guidance

## Future integration (not built yet)

| Component | Role |
|-----------|------|
| Browserbase | Browse trusted public pages; extract advisory-relevant phrases |
| Redis | Cache source summaries and research timestamps |
| Seeded profiles | Fallback when live research fails |

**Do not build the Surfline integration yet.** This document describes intended source hierarchy only.

## Related docs

- `docs/browserbase-plan.md` — AdvisoryResearchAgent plan
- `docs/incident-signal-design.md` — historical incident context (background signal only)
