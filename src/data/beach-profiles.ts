import type { BeachProfile } from "@/types/beach-profile";

export const APPROXIMATE_ZONE_DISCLAIMER =
  "Approximate SurfScout advisory zones for demo purposes — not official safety boundaries.";

export const BEACH_PROFILES: BeachProfile[] = [
  {
    id: "panther",
    name: "Panther Beach",
    region: "Davenport, CA — north of Santa Cruz",
    latitude: 37.123,
    longitude: -122.303,
    shortDescription:
      "Remote cove with steep cliff access and limited exit options. Surf can pick up quickly; not ideal when swimming confidence is limited.",
    knownHazards: [
      "Steep cliff and trail access",
      "Stronger surf and shorebreak than nearby developed beaches",
      "Limited cell service and emergency access",
      "Rip currents possible in larger surf",
    ],
    accessNotes: [
      "Park along Highway 1 and descend a steep dirt path",
      "Trail can be slippery when wet",
      "Plan extra time and daylight for the return climb",
    ],
    conservativeSafetyNotes: [
      "Better suited to experienced beachgoers who stay out of the surf",
      "Avoid if you are not a strong swimmer or unfamiliar with remote beaches",
      "Conditions can change quickly with tide and swell",
    ],
    defaultAdvisory: "red",
    advisoryZoneDisclaimer: APPROXIMATE_ZONE_DISCLAIMER,
    advisoryZones: [
      {
        level: "red",
        label: "Higher-concern surf zone",
        approximateArea: "Open water and shorebreak along the main cove",
        description:
          "Stronger surf, rip currents, and limited exit options — approximate demo zone only",
      },
      {
        level: "yellow",
        label: "Caution nearshore band",
        approximateArea: "Wet sand and lower beach near the water",
        description:
          "Variable shorebreak and surge — stay alert and keep partners close",
      },
      {
        level: "green",
        label: "Lower-concern upper beach",
        approximateArea: "Dry sand and trail approach above the high-tide line",
        description:
          "Lower immediate water risk, but still remote with steep access — not a swimming area",
      },
    ],
  },
  {
    id: "natural-bridges",
    name: "Natural Bridges State Beach",
    region: "Westside Santa Cruz, CA",
    latitude: 36.95,
    longitude: -122.057,
    shortDescription:
      "Scenic and calmer for tide-pooling; rocky entry makes it better for exploring than swimming.",
    knownHazards: [
      "Rocky and uneven footing near tide pools",
      "Sneaker waves possible on exposed rocks",
      "Cold water and occasional surf near open ocean side",
    ],
    accessNotes: [
      "State beach parking and marked paths to the sand",
      "Some areas close at sunset — check on-site signage",
    ],
    lifeguardNotes:
      "Seasonal lifeguard coverage may apply in summer — verify current postings.",
    developedAccessNotes:
      "Restrooms and paved paths near the main parking area.",
    conservativeSafetyNotes: [
      "Stay off wet rocks and never turn your back on the ocean",
      "Better for tide-pooling and short wades than swimming",
      "Keep children within arm's reach near the water",
    ],
    defaultAdvisory: "yellow",
    advisoryZoneDisclaimer: APPROXIMATE_ZONE_DISCLAIMER,
    advisoryZones: [
      {
        level: "green",
        label: "Lower-concern sheltered side",
        approximateArea: "Protected tide-pool area east of the arch",
        description:
          "Generally calmer for exploring at low tide — still watch footing and surge",
      },
      {
        level: "yellow",
        label: "Caution sandy main beach",
        approximateArea: "Central sand near the arch and picnic areas",
        description:
          "Moderate surf and mixed crowds — stay shallow if swimming confidence is limited",
      },
      {
        level: "red",
        label: "Higher-concern open-ocean side",
        approximateArea: "West-facing rocks and open surf line",
        description:
          "Exposure to larger surf and sneaker waves — avoid wet rock ledges",
      },
    ],
  },
  {
    id: "main-beach",
    name: "Santa Cruz Main Beach",
    region: "Downtown Santa Cruz, CA",
    latitude: 36.963,
    longitude: -122.017,
    shortDescription:
      "Lifeguard coverage in season and easy access, but can be crowded and surf varies near the wharf.",
    knownHazards: [
      "Crowds and busy boardwalk area",
      "Variable surf near the wharf and jetty",
      "Cold water year-round",
    ],
    accessNotes: [
      "Central downtown access with nearby parking and amenities",
      "Boardwalk and municipal facilities adjacent to the sand",
    ],
    lifeguardNotes:
      "Seasonal lifeguard towers typically operate in summer — confirm on-site flags and postings.",
    developedAccessNotes:
      "Paved paths, restrooms, food, and boardwalk access nearby.",
    conservativeSafetyNotes: [
      "Stay inside flagged swim areas when lifeguards are present",
      "Keep distance from the wharf pilings and jetty rocks",
      "Crowded conditions make it easy to lose sight of partners",
    ],
    defaultAdvisory: "yellow",
    advisoryZoneDisclaimer: APPROXIMATE_ZONE_DISCLAIMER,
    advisoryZones: [
      {
        level: "green",
        label: "Lower-concern central swim area",
        approximateArea: "Main guarded beach fronting the boardwalk",
        description:
          "Typical family swim zone when lifeguards are on duty — still use caution",
      },
      {
        level: "yellow",
        label: "Caution near wharf and edges",
        approximateArea: "Sand near the Santa Cruz Wharf and crowd fringes",
        description:
          "Busier traffic and variable surf — stay shallow and aware of boards and boats",
      },
      {
        level: "red",
        label: "Higher-concern structure zones",
        approximateArea: "Jetty rocks, wharf pilings, and outside posted swim limits",
        description:
          "Strong currents and hazards near structures — not recommended for wading",
      },
    ],
  },
  {
    id: "seabright",
    name: "Seabright State Beach",
    region: "Eastside Santa Cruz, CA",
    latitude: 36.972,
    longitude: -122.002,
    shortDescription:
      "Harbor shadow often keeps surf milder — a better fit for a quieter evening with limited swimming confidence.",
    knownHazards: [
      "Harbor mouth currents possible nearby",
      "Cold water and occasional surges",
      "Mixed use with walkers, dogs, and paddlers",
    ],
    accessNotes: [
      "Neighborhood street parking and short paths to the sand",
      "Harbor jetty at the east end — avoid climbing on rocks",
    ],
    lifeguardNotes:
      "Limited or seasonal lifeguard coverage — do not assume a guarded beach.",
    developedAccessNotes:
      "Nearby cafes and residential streets; fewer boardwalk crowds than Main Beach.",
    conservativeSafetyNotes: [
      "Often milder than open-coast beaches but conditions still vary",
      "Good option for shoreline walks and shallow wading",
      "Stay clear of the harbor entrance and jetty",
    ],
    defaultAdvisory: "green",
  },
  {
    id: "ocean-beach-sf",
    name: "Ocean Beach",
    region: "San Francisco, CA",
    latitude: 37.759,
    longitude: -122.51,
    shortDescription:
      "Long open-ocean beach with cold water, strong surf, and rip currents — best for walks unless you know local conditions.",
    knownHazards: [
      "Cold water and strong rip currents",
      "Powerful surf and shorebreak",
      "Fog and low visibility at times",
    ],
    accessNotes: [
      "Street parking along the Great Highway",
      "Multiple stairwells down to the sand",
    ],
    lifeguardNotes:
      "Seasonal lifeguard staffing at select stairwells — verify current coverage.",
    developedAccessNotes:
      "Nearby restrooms at some stairwells; wide flat sand at low tide.",
    conservativeSafetyNotes: [
      "Not recommended for casual swimming without local knowledge",
      "Many visitors underestimate surf and cold-water shock",
      "Stay out of the water when surf is elevated",
    ],
    defaultAdvisory: "yellow",
  },
  {
    id: "linda-mar",
    name: "Linda Mar / Pacifica State Beach",
    region: "Pacifica, CA",
    latitude: 37.598,
    longitude: -122.503,
    shortDescription:
      "Popular crescent beach with parking and facilities; surf and rip currents can be significant on swell days.",
    knownHazards: [
      "Rip currents and shorebreak",
      "Cold water",
      "Surf lineup congestion when waves are good",
    ],
    accessNotes: [
      "Large parking lot off Highway 1 with direct beach access",
      "Can fill on sunny weekends",
    ],
    lifeguardNotes:
      "Seasonal lifeguard towers may operate — check on-site postings.",
    developedAccessNotes:
      "Restrooms, picnic areas, and nearby shops along the coast highway.",
    conservativeSafetyNotes: [
      "Fine for shoreline time; swim only with caution and local awareness",
      "Keep children well back from the water on high-surf days",
      "Do not assume calm conditions because the beach looks sheltered",
    ],
    defaultAdvisory: "yellow",
  },
  {
    id: "half-moon-bay",
    name: "Half Moon Bay State Beach",
    region: "Half Moon Bay, CA",
    latitude: 37.433,
    longitude: -122.443,
    shortDescription:
      "Wide sandy state beach with campground nearby; open-ocean exposure means surf and fog can change plans quickly.",
    knownHazards: [
      "Cold water and rip currents",
      "Fog reducing visibility",
      "Occasionally strong surf",
    ],
    accessNotes: [
      "State beach parking and paths to the sand",
      "Campground and Francis Beach access points nearby",
    ],
    lifeguardNotes:
      "Limited lifeguard presence — treat as unguarded unless posted otherwise.",
    developedAccessNotes:
      "Restrooms, campground, and picnic tables at Francis Beach area.",
    conservativeSafetyNotes: [
      "Good for beach walks and picnics with conservative water use",
      "Stay back from steep shorebreak faces",
      "Check surf forecast before entering the water",
    ],
    defaultAdvisory: "yellow",
  },
  {
    id: "baker-beach",
    name: "Baker Beach",
    region: "San Francisco, CA",
    latitude: 37.793,
    longitude: -122.483,
    shortDescription:
      "Scenic Golden Gate views with cold, unpredictable surf — popular for photos more than swimming.",
    knownHazards: [
      "Cold water and rip currents",
      "Strong outgoing tidal flow near the Golden Gate",
      "Cliff edges on northern trails",
    ],
    accessNotes: [
      "Paved parking lot with stair access to the sand",
      "Northern clothing-optional section — be aware of mixed use",
    ],
    developedAccessNotes:
      "Restrooms in the main parking area; paved paths to viewpoints.",
    conservativeSafetyNotes: [
      "Stay shallow and avoid swimming unless experienced with local currents",
      "Keep distance from the north end cliffs and unstable bluff edges",
      "Fog and wind can reduce comfort quickly",
    ],
    defaultAdvisory: "yellow",
  },
];
