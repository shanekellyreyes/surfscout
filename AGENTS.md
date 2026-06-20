<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# SurfScout Agent Instructions

SurfScout is a UC Berkeley AI Hackathon project due before 11am Sunday.

Goal:
Build a polished demo of an AI coastal safety map for Bay Area beachgoers.

Core demo path:
User prompt -> SurfScout answer -> selected beach -> map with green/yellow/red advisory zones -> safer alternatives -> ocean caution footer.

Rules:
- Do not add auth.
- Do not add payments.
- Do not overbuild.
- Do not guarantee beach safety.
- Do not invent official warnings, closures, tide times, or emergency claims.
- Use seeded fallback data if live APIs fail.
- Prefer small, focused changes.
- Preserve the demo path.
- Before major edits, explain the plan.
- After changes, summarize changed files and how to test.

Sponsor priorities:
1. Anthropic for the SafetyAdvisorAgent.
2. Redis for geospatial safer-beach search and cached advisory notes.
3. Browserbase for web-powered advisory research.
4. Fetch.ai / ASI:One only if the core demo works.
5. Sentry only if time remains.

Immediate priority:
Build the demo path first using seeded data. External services come after the UI and mock flow work.