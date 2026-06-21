import type { BeachProfile } from "@/types/beach-profile";
import {
  HALF_MOON_BAY_INCIDENT_HISTORY,
  MAVERICKS_COAST_INCIDENT_HISTORY,
  MONTARA_COAST_INCIDENT_HISTORY,
  PACIFICA_COAST_INCIDENT_HISTORY,
  STINSON_INCIDENT_HISTORY,
} from "@/data/incident-history-seed";

export const BEACH_PROFILES_EXTRA: BeachProfile[] = [
  {
    id: "stinson",
    name: "Stinson Beach",
    region: "Marin County, CA",
    latitude: 37.894,
    longitude: -122.638,
    shortDescription:
      "Popular Marin beach with lifeguards in season, but open-ocean rip currents and busy summer crowds require caution.",
    knownHazards: [
      "Rip currents and shorebreak",
      "Cold water",
      "Crowded conditions on warm weekends",
    ],
    accessNotes: [
      "Main parking and town services nearby",
      "Arrive early on peak summer days",
    ],
    lifeguardNotes:
      "Seasonal lifeguard coverage may apply — verify on-site postings.",
    developedAccessNotes:
      "Restrooms, shops, and picnic areas near the main beach.",
    conservativeSafetyNotes: [
      "Stay inside flagged swim areas when lifeguards are present",
      "Do not underestimate rip-current risk on calm-looking days",
    ],
    defaultAdvisory: "yellow",
    incidentHistory: STINSON_INCIDENT_HISTORY,
  },
  {
    id: "muir-beach",
    name: "Muir Beach",
    region: "Marin County, CA",
    latitude: 37.861,
    longitude: -122.581,
    shortDescription:
      "Small cove beach with lagoon outlet nearby — scenic but cold with variable surf and limited space.",
    knownHazards: ["Cold water", "Lagoon outlet currents", "Rocky margins"],
    accessNotes: ["Paid parking and short walk to sand", "Can be windy and foggy"],
    developedAccessNotes: "Restrooms and picnic area near the parking lot.",
    conservativeSafetyNotes: [
      "Better for shoreline time than swimming for most visitors",
      "Keep children away from lagoon outlet mixing zone",
    ],
    defaultAdvisory: "yellow",
  },
  {
    id: "rodeo-beach",
    name: "Rodeo Beach",
    region: "Marin Headlands, CA",
    latitude: 37.832,
    longitude: -122.538,
    shortDescription:
      "Coarse-sand cove with cold surf and strong currents — scenic headlands with limited shelter from swell.",
    knownHazards: [
      "Cold water and rip currents",
      "Sneaker waves near rocks",
      "Fog and wind exposure",
    ],
    accessNotes: ["Headlands parking and trail access", "Stay off wet rocks"],
    conservativeSafetyNotes: [
      "Not recommended for casual swimming",
      "Keep distance from cliff-backed rock edges",
    ],
    defaultAdvisory: "yellow",
  },
  {
    id: "china-beach",
    name: "China Beach",
    region: "San Francisco, CA",
    latitude: 37.788,
    longitude: -122.494,
    shortDescription:
      "Small cove beneath Sea Cliff — sheltered appearance but cold water and limited exit if conditions change.",
    knownHazards: ["Cold water", "Limited beach area at high tide", "Rocky edges"],
    accessNotes: ["Stair access from parking area", "Small beach fills at high tide"],
    conservativeSafetyNotes: [
      "Fine for short visits and photos — stay shallow in the water",
      "Watch tide level before descending stairs",
    ],
    defaultAdvisory: "yellow",
  },
  {
    id: "twin-lakes",
    name: "Twin Lakes State Beach",
    region: "Eastside Santa Cruz, CA",
    latitude: 36.965,
    longitude: -121.988,
    shortDescription:
      "Harbor-adjacent beach with calmer conditions than open coast, but harbor currents and boat traffic nearby.",
    knownHazards: ["Harbor mouth currents", "Cold water", "Mixed boat and swim traffic"],
    accessNotes: ["Neighborhood access and harbor paths", "Check harbor activity before wading"],
    lifeguardNotes: "Limited lifeguard coverage — verify seasonal postings.",
    conservativeSafetyNotes: [
      "Often milder than Main Beach but not risk-free",
      "Stay clear of boat lanes and harbor entrance",
    ],
    defaultAdvisory: "green",
  },
  {
    id: "capitola",
    name: "Capitola Beach",
    region: "Capitola, CA",
    latitude: 36.971,
    longitude: -121.951,
    shortDescription:
      "Village beach with wharf and gentle appearance — can get crowded with variable surf near the jetty.",
    knownHazards: ["Crowds", "Jetty currents", "Cold water"],
    accessNotes: ["Village parking and stair access", "Busy on summer weekends"],
    lifeguardNotes: "Seasonal lifeguard coverage may apply in summer.",
    developedAccessNotes: "Restaurants, shops, and restrooms in the village.",
    conservativeSafetyNotes: [
      "Stay away from jetty rocks and wharf pilings",
      "Good for family shoreline time with close supervision",
    ],
    defaultAdvisory: "yellow",
  },
  {
    id: "rockaway",
    name: "Rockaway Beach",
    region: "Pacifica, CA",
    latitude: 37.602,
    longitude: -122.494,
    shortDescription:
      "Pacifica cove with restaurant overlook — rocky margins and surf can pick up quickly on swell days.",
    knownHazards: ["Rip currents", "Rocky edges", "Shorebreak"],
    accessNotes: ["Cliff-side paths and stair access", "Avoid wet rocks"],
    lifeguardNotes: "Check for seasonal lifeguard postings.",
    conservativeSafetyNotes: [
      "Stay central on sand and out of surge zones",
      "Keep children back from rocky headlands",
    ],
    defaultAdvisory: "yellow",
    incidentHistory: PACIFICA_COAST_INCIDENT_HISTORY,
  },
  {
    id: "sharp-park",
    name: "Sharp Park Beach",
    region: "Pacifica, CA",
    latitude: 37.634,
    longitude: -122.493,
    shortDescription:
      "Longer Pacifica strand near the golf course — open exposure with rip currents possible.",
    knownHazards: ["Rip currents", "Cold water", "Wind and fog"],
    accessNotes: ["Street and lot parking with path access"],
    conservativeSafetyNotes: [
      "Better for walks than swimming unless conditions are mild",
      "Stay back from steep shorebreak",
    ],
    defaultAdvisory: "yellow",
    incidentHistory: PACIFICA_COAST_INCIDENT_HISTORY,
  },
  {
    id: "montara",
    name: "Montara State Beach",
    region: "Montara, CA",
    latitude: 37.547,
    longitude: -122.516,
    shortDescription:
      "Wide open beach below Montara — scenic but exposed to swell, fog, and rip currents.",
    knownHazards: [
      "Rip currents and shorebreak",
      "Cold water",
      "Cliff-backed access at some points",
    ],
    accessNotes: ["Highway 1 parking and path to sand"],
    lifeguardNotes: "Limited lifeguard presence — treat as unguarded unless posted.",
    conservativeSafetyNotes: [
      "Do not turn your back on the ocean",
      "Stay off cliff edges above the beach",
    ],
    defaultAdvisory: "yellow",
    incidentHistory: MONTARA_COAST_INCIDENT_HISTORY,
  },
  {
    id: "gray-whale-cove",
    name: "Gray Whale Cove",
    region: "Montara, CA",
    latitude: 37.542,
    longitude: -122.513,
    shortDescription:
      "Cove below bluffs with steep access — remote feel with tide-sensitive entry and stronger surf exposure.",
    knownHazards: [
      "Steep trail access",
      "Sneaker waves near rocks",
      "Tide-sensitive beach width",
    ],
    accessNotes: [
      "Steep stair/trail from Highway 1 overlook",
      "Plan exit before tide rises",
    ],
    conservativeSafetyNotes: [
      "Not ideal for weak swimmers or first-time visitors",
      "Stay off wet rocks and bluff edges",
    ],
    defaultAdvisory: "red",
    incidentHistory: MONTARA_COAST_INCIDENT_HISTORY,
  },
  {
    id: "mavericks",
    name: "Mavericks / Pillar Point",
    region: "Half Moon Bay, CA",
    latitude: 37.493,
    longitude: -122.501,
    shortDescription:
      "World-famous big-wave zone — viewing from safe distances only; shoreline and reef hazards are severe.",
    knownHazards: [
      "Extremely powerful surf",
      "Reef and rock hazards",
      "Sneaker waves on nearby shores",
    ],
    accessNotes: [
      "View from designated coastal paths and harbor areas",
      "Do not enter the water during large swells",
    ],
    conservativeSafetyNotes: [
      "Not a swimming beach — treat as hazardous surf coast",
      "Keep children and pets away from surge zones",
    ],
    defaultAdvisory: "red",
    incidentHistory: MAVERICKS_COAST_INCIDENT_HISTORY,
  },
  {
    id: "poplar",
    name: "Poplar Beach",
    region: "Half Moon Bay, CA",
    latitude: 37.422,
    longitude: -122.435,
    shortDescription:
      "Half Moon Bay area beach with horse trails nearby — open-ocean exposure with variable surf.",
    knownHazards: ["Rip currents", "Cold water", "Fog"],
    accessNotes: ["Coastal path and bluff-top parking access"],
    conservativeSafetyNotes: [
      "Good for walks with conservative water use",
      "Stay back from steep shorebreak faces",
    ],
    defaultAdvisory: "yellow",
    incidentHistory: HALF_MOON_BAY_INCIDENT_HISTORY,
  },
];
