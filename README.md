# SurfScout

**Deployed URL:** _TBD — add Vercel/production link before submission_

SurfScout is an AI coastal safety map for Bay Area beachgoers. Ask a natural-language question, see advisory zones for a selected beach, review safer alternatives, and explore seeded source notes — all with clear safety disclaimers.

Built for the UC Berkeley AI Hackathon.

## What it does

- **Landing page** — hero prompt with example beach questions
- **`/scout`** — chat assistant + advisory map dashboard
- **Deterministic risk scoring** — seeded beach profiles, user-context parsing, historical incident context
- **Live Advisory Scout** — `/api/research` scaffold with seeded source notes (Browserbase integration planned)
- **Perfect Beach Day** — `/api/perfect-beach-day` with Redis GEO nearby lookup (seeded fallback when Redis is unavailable)

## Demo prompt

Try this on the landing page or at `/scout`:

> My wife and I want a quiet beach near Santa Cruz this evening. I'm not a strong swimmer. Where should we go?

Expected result: Panther Beach selected with caution guidance and safer alternatives (e.g. Seabright, Main Beach, Natural Bridges).

## Agentic architecture

| Integration | Status |
| --- | --- |
| **Browserbase** | Live Advisory Scout source research scaffold; live web integration next |
| **Redis** | Perfect Beach Day geospatial lookup + cache layer (GEO when `REDIS_URL` is set) |
| **Anthropic** | Planned SafetyAdvisorAgent for grounded advisory summaries |
| **Simular Sai** | Used for research, docs, QA, and demo testing |

## Safety disclaimer

SurfScout provides **general coastal guidance, not lifeguard advice**. It does **not guarantee beach safety**. Conditions change quickly. Never turn your back on the ocean, check posted signs and lifeguards, and call 911 in an emergency. Advisory overlays and source notes are approximate demo context — not official safety boundaries or live warnings.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the landing page, or [http://localhost:3000/scout](http://localhost:3000/scout) for the dashboard.

```bash
npm run build   # production build
npm start       # run production server
```

## API routes (demo)

- `POST /api/ask` — `{ "message": "..." }` → advisory response
- `POST /api/research` — `{ "beachId": "panther" }` → seeded source notes
- `POST /api/perfect-beach-day` — `{ "beachId": "panther", "prompt": "..." }` → nearby ranked candidates

## Redis (optional)

Perfect Beach Day uses **Redis GEO** for nearby beach lookup when configured. Redis is optional — the app falls back to seeded in-memory coordinates if Redis is missing or unreachable.

```bash
export REDIS_URL="redis://localhost:6379"
```

Redis Cloud Essentials is recommended for the hackathon (`CALHACKER2026` credit code). See `docs/redis-prize-plan.md` for the full plan.
