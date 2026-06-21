# SurfScout — Demo Script

> **Standing disclaimer for the whole demo (say once, early):**
> "SurfScout is *advisory only*. It helps people make more cautious beach decisions — it does
> **not** guarantee safety, and it doesn't issue official warnings. Always defer to lifeguards,
> signage, and official sources."

---

## 30-Second Pitch
"The Northern California coast is gorgeous and deceptively dangerous — sneaker waves, rip
currents, and cold water catch people off guard every year. **SurfScout** is an AI coastal
safety map for Bay Area and Santa Cruz beachgoers. It turns trustworthy public signals and
historical incident context into **cautious, honest guidance** — a risk-aware view of a beach,
plus safer alternatives for families and weak swimmers. It's decision *support*, not a safety
guarantee. Today it runs on seeded beach data with deterministic scoring, and it's built to
plug into live research agents next."

---

## 3-Minute Pitch
**1. The problem (~30s).**
Most people check the weather, not the ocean. The open coast here has serious, recurring
hazards — sneaker waves, rip currents, cold water, cliffs — and many beaches aren't
continuously lifeguarded. Visitors often can't tell a calm-looking beach from a risky one.

**2. The idea (~30s).**
SurfScout is an AI coastal safety map focused on cautious decision support. For a beach, it
shows an advisory score, the hazards that matter, historical incident *context*, and safer
alternatives — all clearly framed as approximate and advisory, never a guarantee.

**3. What's built today (~45s).**
A working `/scout` experience on **seeded** Santa Cruz / Bay Area beach profiles, with
**deterministic risk scoring** (reproducible for demos), a **mock advisory API** with a stable
response schema, an advisory overlay/legend, a safer-alternatives panel, and an ocean-caution
footer. We also did the research groundwork: a vetted catalog of official sources and an
incident-research doc with confidence levels and explicit uncertainty handling.

**4. The architecture & sponsors (~45s).**
We designed SurfScout to grow into a multi-agent system: **Browserbase** as an
`AdvisoryResearchAgent` to gather public coastal data, **Anthropic** as a `SafetyAdvisorAgent`
to synthesize disclaimer-bound advisories, and **Redis** for geospatial lookup and cached
source summaries. **Simular Sai** helped us with source research, documentation, and will
support automated testing and demo runs. *(To be clear: the agent integrations are planned;
today's demo runs on seeded data and a mock API.)*

**5. Why it matters + close (~30s).**
SurfScout makes coastal risk legible and nudges people toward safer choices — honestly, without
overpromising. Next, we wire in live research and advisory agents. But the core principle stays:
**advisory, not a guarantee.**

---

## Demo Walkthrough
1. **Open `/scout`.** Show the coastal map / beach list seeded for Santa Cruz / Bay Area.
2. **Select a beach.** Point out the **advisory score** and explain it's **deterministic** —
   same seeded inputs always produce the same result (great for a reliable demo).
3. **Read the signals panel.** Walk through the hazard signals the design uses (tide state,
   surf/marine context, known hazards, access difficulty) and note which are seeded today.
4. **Show historical incident context.** Emphasize it's **context, not a verdict** — with
   confidence levels and "verify with source" where uncertain. *(Do not state specific incident
   counts or official confirmations that aren't in the source.)*
5. **Trigger the advisory (`/api/ask` mock).** Show the structured advisory response and the
   plain-language guidance. Note the schema is stable and currently mock-backed.
6. **Highlight safer alternatives.** Show how a risk-elevated context (weak swimmer, kids,
   evening, remote, no lifeguard) nudges toward safer options.
7. **Point to the ocean-caution footer + overlay disclaimer.** "Advisory overlays are
   approximate and **not** official safety boundaries."
8. **Close on the roadmap slide.** Browserbase / Anthropic / Redis / Sai — clearly labeled as
   planned vs. used-for-research.

---

## Backup Explanation (if live APIs fail)
SurfScout's demo is **designed to never depend on live APIs**:
- The full `/scout` experience runs on **seeded beach profiles**.
- Risk scoring is **deterministic**, so it can't "break" or return a surprise.
- The advisory flow uses a **mock `/api/ask`** with a fixed response schema.

If anything external is unavailable, say:
> "What you're seeing runs entirely on our seeded dataset and a mock advisory endpoint —
> by design, so the demo is reproducible. The live research and advisory agents
> (Browserbase, Anthropic, Redis) are the planned next step, not a demo dependency."

If the app itself hiccups, fall back to:
- The **source-research** and **incident-research** docs to show the trustworthy-data
  groundwork and our honest, confidence-graded approach.
- The architecture diagram/roadmap to explain the intended agent system.

---

## Safety Disclaimer (read at the end too)
SurfScout is **advisory and approximate**. It is **not** an official safety service and **does
not guarantee safety**. It does not issue official warnings, closures, or tide times, and its
overlays/scores are **not** official safety boundaries. Ocean conditions change rapidly —
always follow posted signage, on-site lifeguards, and official sources (NWS, NOAA, NPS,
California State Parks, and local authorities).
