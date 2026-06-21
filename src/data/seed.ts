export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export const EXAMPLE_PROMPT =
  "My wife and I want a quiet beach near Santa Cruz this evening. I'm not a strong swimmer. Where should we go?";

export const OCEAN_CAUTION =
  "SurfScout provides general coastal guidance, not lifeguard advice. Conditions change quickly. Never turn your back on the ocean, check posted signs, and call 911 in an emergency.";
