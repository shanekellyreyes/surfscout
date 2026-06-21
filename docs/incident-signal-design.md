# SurfScout Incident Signal Design

## Purpose

SurfScout uses **historical incident context** as an optional, seeded-data signal for popular Bay Area and Santa Cruz coastlines. It supports cautious guidance — not a “death score” and not a claim that any beach is officially unsafe.

Historical incident context is **background risk awareness only**. It must not dominate:

- **current conditions**
- **official alerts**
- **posted signs**
- **lifeguard guidance**
- **user context** (swimming ability, timing, companions)

It must never replace Tier 1 sources defined in [`docs/source-research.md`](source-research.md).

## Responsible use

SurfScout applies these rules to incident history:

1. **No invented counts** — seeded summaries describe hazard patterns, not statistics.
2. **No live claims** — historical incident context is not a real-time warning.
3. **No sensationalism** — copy stays neutral and educational.
4. **No official status** — SurfScout does not claim closures, active warnings, or lifeguard orders from incident data alone.
5. **No safety guarantees** — historical context informs caution; it does not certify safety.

## Data model

Each beach profile may include optional `incidentHistory`:

```typescript
type IncidentHistory = {
  summary: string;
  severity: "low" | "moderate" | "high";
  incidents: Array<{
    date: string;
    type: "drowning" | "near_drowning" | "hospitalization" | "rescue" |
          "sneaker_wave" | "rip_current" | "tide_trap" | "cliff_fall" | "other";
    sourceName: string;
    sourceUrl: string;
    confidence: "official" | "public_safety" | "reputable_news" |
                "educational" | "unverified";
    note: string;
  }>;
};
```

Seeded demo data uses `confidence: "educational"` and neutral placeholder summaries such as:

> This coastline has documented public reports of surf-zone rescues, sneaker-wave risk, rip currents, or tide-sensitive access issues. SurfScout treats this as background context only.

## Risk scoring influence

Historical incident context is a **small background signal** in the deterministic scorer — capped so it cannot override current-style signals or user context:

| Severity   | Score bump |
|------------|------------|
| `high`     | +2         |
| `moderate` | +1         |
| `low`      | +0         |

Incident history must not dominate:

- seeded hazard profiles
- access difficulty
- user context (weak swimmer, evening, quiet/remote preference, family/kids)
- future live conditions from NOAA / NWS / NDBC / CDIP (when integrated)

When present, the reason generator adds:

> Historical context: this coastline has documented incident patterns such as sneaker waves, rip currents, rescues, tide-sensitive access, or surf-zone hazards. SurfScout treats this as background context only.

## API and UI

`/api/ask` preserves the existing `SurfScoutChatResponse` schema and adds an optional field:

- `historicalIncidentContext?: { summary, severity, disclaimer }`

When the selected beach has `incidentHistory`:

- a concise historical context reason may appear in `reasons`
- a **Historical incident context** entry appears in `sourcesUsed`
- the scout UI shows a **Historical incident context** card with disclaimer:

> Historical incident context is background risk awareness, not a live warning or official safety boundary.

## Popular coastline coverage (seeded)

### Santa Cruz area
- Panther Beach / Davenport coast
- Natural Bridges State Beach
- Santa Cruz Main Beach
- Seabright State Beach
- Twin Lakes State Beach
- Capitola Beach

### San Francisco / Marin
- Ocean Beach SF
- Baker Beach
- China Beach
- Stinson Beach
- Muir Beach
- Rodeo Beach

### Pacifica / Montara
- Linda Mar / Pacifica State Beach
- Rockaway Beach
- Sharp Park Beach
- Montara State Beach
- Gray Whale Cove

### Half Moon Bay
- Half Moon Bay State Beach
- Mavericks / Pillar Point
- Poplar Beach

Only main demo beaches retain approximate advisory zone polygons. New beaches use markers and basic profiles.

## Future plan

1. **Browserbase (`AdvisoryResearchAgent`)** — research trusted public pages and extract advisory-relevant phrases with confidence and timestamps. See [`docs/browserbase-plan.md`](browserbase-plan.md) and [`docs/source-research.md`](source-research.md).
2. **Redis** — cache source summaries and geospatial safer-beach lookups.
3. **Anthropic** — explain structured signals from provided data only; no invented official claims.

Until live research is integrated, SurfScout runs in **degraded mode** with seeded incident summaries and deterministic scoring.

## Related docs

- [`docs/source-research.md`](source-research.md) — source priority; Historical Incident Context in advisory signals table
- [`docs/browserbase-plan.md`](browserbase-plan.md) — Browserbase agent plan
