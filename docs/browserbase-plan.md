SurfScout Browserbase Plan

Goal:
Use Browserbase as a Live Advisory Research Agent for Bay Area beach safety.

Agent name:
AdvisoryResearchAgent

Input:
- beach name
- city/region
- optional trusted source URLs

Output:
- source title
- source URL
- extracted safety/access notes
- advisory-relevant phrases
- confidence level
- timestamp
- fallback-safe summary

Trusted source categories:
- NOAA / National Weather Service
- California State Parks
- City/county beach pages
- lifeguard/public safety pages
- harbor/marine condition pages
- official park/access pages

Rules:
- Do not invent official warnings
- Do not claim closures unless directly found
- Prefer official sources over news/media
- If live browsing fails, return degradedMode: true