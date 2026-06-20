import type { Recommendation } from "@/types/surfscout";

export function recommendationLabel(recommendation: Recommendation): string {
  switch (recommendation) {
    case "avoid_for_now":
      return "Avoid for now";
    case "use_caution":
      return "Use caution";
    case "good_fit":
      return "Good fit";
  }
}
