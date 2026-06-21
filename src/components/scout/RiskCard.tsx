import type { Recommendation, SelectedBeach } from "@/types/surfscout";
import { advisoryLabel, advisoryStyles } from "@/lib/advisory";
import { recommendationLabel } from "@/lib/recommendation";

type RiskCardProps = {
  beach: SelectedBeach;
  recommendation: Recommendation;
};

function recommendationBadgeClass(recommendation: Recommendation) {
  switch (recommendation) {
    case "avoid_for_now":
      return "bg-[#c96b5a]/12 text-[#8b3d32] ring-[#c96b5a]/25";
    case "use_caution":
      return "bg-amber-50 text-amber-900 ring-amber-200/80";
    case "good_fit":
      return "bg-[#7a9e8e]/15 text-[#3d6b5a] ring-[#7a9e8e]/30";
  }
}

export function RiskCard({ beach, recommendation }: RiskCardProps) {
  const styles = advisoryStyles(beach.advisory);

  return (
    <div className="card-coastal p-5">
      <p className="section-label">Selected beach</p>
      <div className="mt-2 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-[#1e4d5c]">{beach.name}</h3>
          <p className="text-sm text-[#1e3a4a]/65">{beach.location}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
            {advisoryLabel(beach.advisory)}
          </span>
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-inset ${recommendationBadgeClass(recommendation)}`}
          >
            {recommendationLabel(recommendation)}
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#1e3a4a]/80">{beach.summary}</p>
    </div>
  );
}
