import type { AdvisoryLevel } from "@/types/surfscout";

export function advisoryStyles(level: AdvisoryLevel) {
  switch (level) {
    case "green":
      return {
        badge: "bg-emerald-500/15 text-emerald-800 ring-emerald-500/30",
        dot: "bg-emerald-500",
        ring: "ring-emerald-400/50",
        glow: "shadow-emerald-500/20",
      };
    case "yellow":
      return {
        badge: "bg-amber-500/15 text-amber-900 ring-amber-500/30",
        dot: "bg-amber-400",
        ring: "ring-amber-400/50",
        glow: "shadow-amber-500/20",
      };
    case "red":
      return {
        badge: "bg-rose-500/15 text-rose-900 ring-rose-500/30",
        dot: "bg-rose-500",
        ring: "ring-rose-400/50",
        glow: "shadow-rose-500/20",
      };
  }
}

export function advisoryLabel(level: AdvisoryLevel) {
  switch (level) {
    case "green":
      return "Lower concern";
    case "yellow":
      return "Moderate concern";
    case "red":
      return "Higher concern";
  }
}
