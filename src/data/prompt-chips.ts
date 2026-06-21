export const LANDING_PROMPT_CHIPS = [
  "Which beach is safer for me and my young kids?",
  "Safest beaches in Santa Cruz for a weak swimmer?",
  "Which beaches near Pacifica have lifeguards?",
  "Is Ocean Beach a good idea this evening?",
  "Where should my wife and I go if we want a quieter beach?",
] as const;

export const SCOUT_PROMPT_CHIPS = [
  "My wife and I want a quiet beach near Santa Cruz this evening. I'm not a strong swimmer. Where should we go?",
  ...LANDING_PROMPT_CHIPS,
] as const;
