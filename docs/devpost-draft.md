# SurfScout — Devpost Draft

## Project Title
**SurfScout** — AI coastal safety map for Bay Area & Santa Cruz beachgoers

## Tagline
Cautious, AI-assisted coastal decision support — helping you choose a smarter beach day. *(SurfScout does not guarantee safety.)*

---

## Inspiration
The Northern California coast is beautiful and deceptively dangerous. Sneaker waves, rip
currents, cold water, and unstable bluffs cause serious incidents every year — often to
visitors who don't realize a scenic, accessible beach can turn hazardous in seconds. Most
people check the *weather*, not the *ocean*. We wanted a tool that gathers trustworthy
public coastal signals and turns them into honest, cautious guidance — clearly framed as
**advisory, not a safety guarantee** — so a family, a weak swimmer, or someone visiting an
unfamiliar beach can make a more informed choice.

## What it does
SurfScout is an AI coastal safety map focused on the Bay Area / Santa Cruz coastline. For a
given beach it surfaces:
- A **deterministic risk/advisory score** built from beach profile + condition signals.
- **Historical incident context** (e.g., documented sneaker-wave or rip-current history),
  presented as cautious background — never as a verdict that a beach is "unsafe."
- **Safer alternatives**, nudging risk-elevated users (weak swimmer, kids, evening, remote,
  no lifeguard) toward more suitable options.
- An **advisory overlay** and an **ocean-caution footer**, with clear language that overlays
  are approximate and **not** official safety boundaries.

Everything is framed around cautious decision support. SurfScout repeatedly reminds users to
defer to posted signage, lifeguards, and official warnings.

### Current demo (implemented today)
- A working **/scout** experience built on **seeded beach profiles** for the Santa Cruz / Bay
  Area coast.
- **Deterministic risk scoring** and recommendation logic over that seeded data (reproducible
  for demos — same inputs, same output).
- A **mock `/api/ask`** endpoint returning a structured advisory response (stable schema) so
  the chat/advisory flow works without external APIs.
- Research documentation: a **trustworthy-source catalog** (NOAA/NWS/NDBC/State Parks/USLA)
  and an **incident-research** doc with confidence levels and explicit uncertainty handling.

### Planned / future (not yet wired in)
- Live source research and condition fetching via the sponsor architecture below.

## How we built it
- **Frontend & app:** Next.js (App Router) with a map-centric `/scout` UI and a clean
  component layout (advisory legend, safer alternatives, sources/signals panel, ocean-caution
  footer).
- **Data model:** Typed beach profiles and advisory types, seeded so the full demo path works
  offline and deterministically.
- **Scoring:** A deterministic recommendation/advisory module that converts beach attributes
  and condition signals into a cautious advisory level — intentionally explainable, not a
  black box.
- **Mock advisory API:** A stable `/api/ask` mock response so the UX is demonstrable before
  external integrations exist.
- **Research-first approach:** Before writing integrations, we cataloged official public
  sources and historical incident patterns to ground the product in trustworthy data and
  honest caveats.

## Sponsor technologies (used or planned)
> We're being explicit about status to keep this honest for judges.

| Sponsor / Tech | Role | Status |
|---|---|---|
| **Browserbase** | `AdvisoryResearchAgent` — autonomously gather/refresh public coastal source data (NOAA/NWS/NDBC/State Parks pages) | **Planned** |
| **Anthropic** | `SafetyAdvisorAgent` — synthesize signals into cautious, plain-language advisories with strong disclaimers | **Planned** |
| **Redis** | Geospatial lookup (nearest beaches/stations) + cached source summaries for fast, resilient reads | **Planned** |
| **Simular Sai** | Autonomous research, documentation, and future testing/demo support | **Used for research & docs; testing support planned** |

**How Sai helped:** Simular **Sai** assisted us with **source research** (compiling a vetted
catalog of official coastal-safety sources), **documentation** (this Devpost draft, a demo
script, source and incident research notes with confidence levels), and is intended to provide
**future testing and demo support** (e.g., exercising the demo path and validating builds).
Sai did **not** author the core app logic.

## Challenges we ran into
- **Honesty vs. usefulness:** Designing guidance that's genuinely helpful without ever implying
  a safety guarantee or fabricating warnings/closures/tide times.
- **Uncertainty handling:** Representing incident history with confidence levels and explicit
  "location/confirmation uncertain" flags instead of false precision.
- **Demo resilience:** Keeping the experience fully functional with seeded data and a mock API
  so a live-API hiccup can't break the demo.
- **Scope discipline:** Resisting feature creep (no auth, no payments, no architecture rewrites)
  to ship a clean, trustworthy demo path.

## Accomplishments we're proud of
- A working, deterministic demo path that runs entirely on seeded data.
- A genuinely **honest safety posture** baked into the UX (advisory framing, ocean-caution
  footer, "approximate, not official boundaries" disclaimer).
- Research groundwork (sources + incidents) that future agents can build on responsibly.
- Clear separation between **what's built** and **what's planned**.

## What we learned
- Coastal safety is a *signals* problem (tide state, surf/marine forecast, active NWS alerts,
  buoy data, known hazards, access difficulty) layered with *human context* (swimmer ability,
  group, time of day, remoteness).
- Trustworthy framing matters as much as the model: confidence levels, source typing, and
  disclaimers are core features, not afterthoughts.
- A deterministic, seedable core makes for a far more reliable hackathon demo.

## What's next
- Wire the **AdvisoryResearchAgent** (Browserbase) to refresh public source data on a schedule.
- Add the **SafetyAdvisorAgent** (Anthropic) for plain-language, disclaimer-bound advisories.
- Introduce **Redis** for geospatial nearest-beach/station lookup and cached summaries.
- Expand **Sai**-driven automated testing of the demo path and build verification.
- Broaden beach coverage and integrate live tide/marine/buoy signals — always advisory.

## Safety Disclaimer
SurfScout provides **advisory, approximate** coastal information to support decision-making.
It is **not** an official safety service and **does not guarantee safety**. Advisory overlays
and scores are approximate and are **not** official safety boundaries. SurfScout does not issue
official warnings or closures. Conditions change rapidly — always follow posted signage,
lifeguards, and official sources (NWS, NOAA, NPS, California State Parks, and local authorities).
