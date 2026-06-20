import { getAllBeachProfiles } from "@/data/beaches";
import type { SurfScoutRegion, UserContext } from "@/types/risk";

const REGION_PATTERNS: { region: SurfScoutRegion; pattern: RegExp }[] = [
  { region: "santa-cruz", pattern: /\bsanta cruz\b/i },
  { region: "san-francisco", pattern: /\b(san francisco|sf\b|ocean beach|baker beach)\b/i },
  { region: "pacifica", pattern: /\b(pacifica|linda mar)\b/i },
  { region: "half-moon-bay", pattern: /\b(half moon bay|hmb)\b/i },
];

const NOT_STRONG_SWIMMER =
  /\b(not a strong swimmer|not strong swimmer|weak swimmer|poor swimmer|beginner swimmer|not strong in the water|limited swimming confidence)\b/i;

const WITH_SPOUSE_OR_PARTNER =
  /\b(wife|husband|spouse|partner|boyfriend|girlfriend|fianc[eé]|significant other)\b/i;

const WITH_FAMILY = /\b(family|families|relatives|parents|grandparents)\b/i;

const WITH_KIDS =
  /\b(kids|kid|children|child|toddler|toddlers|baby|babies|infant)\b/i;

const EVENING_TIMING =
  /\b(evening|sunset|sun set|night|tonight|after dark|dusk|twilight)\b/i;

const WANTS_QUIET_REMOTE =
  /\b(quiet|remote|secluded|hidden|uncrowded|peaceful|off the beaten path|less crowded)\b/i;

function normalizeMessage(message: string): string {
  return message.trim().replace(/\s+/g, " ");
}

function detectRegions(message: string): SurfScoutRegion[] {
  const regions = REGION_PATTERNS.filter(({ pattern }) => pattern.test(message)).map(
    ({ region }) => region,
  );

  return regions.length > 0 ? regions : ["santa-cruz"];
}

function detectMentionedBeachIds(message: string): string[] {
  const lower = message.toLowerCase();

  return getAllBeachProfiles()
    .filter((profile) => {
      const name = profile.name.toLowerCase();
      const aliases = [name, profile.id.replace(/-/g, " ")];
      return aliases.some((alias) => lower.includes(alias));
    })
    .map((profile) => profile.id);
}

export function parseUserContext(message: string): UserContext {
  const normalized = normalizeMessage(message);

  return {
    notStrongSwimmer: NOT_STRONG_SWIMMER.test(normalized),
    withSpouseOrPartner: WITH_SPOUSE_OR_PARTNER.test(normalized),
    withFamily: WITH_FAMILY.test(normalized),
    withKids: WITH_KIDS.test(normalized),
    eveningTiming: EVENING_TIMING.test(normalized),
    wantsQuietRemote: WANTS_QUIET_REMOTE.test(normalized),
    regions: detectRegions(normalized),
    mentionedBeachIds: detectMentionedBeachIds(normalized),
  };
}

export function primaryRegion(context: UserContext): SurfScoutRegion {
  return context.regions[0] ?? "santa-cruz";
}
