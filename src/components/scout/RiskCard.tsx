import type { Recommendation, SelectedBeach } from "@/types/surfscout";
import { advisoryLabel, advisoryStyles } from "@/lib/advisory";
import { recommendationLabel } from "@/lib/recommendation";

type RiskCardProps = {
  beach: SelectedBeach;
  recommendation: Recommendation;
};

export function RiskCard({ beach, recommendation }: RiskCardProps) {
  const styles = advisoryStyles(beach.advisory);

  return (
    <div className="rounded-xl border border-sky-900/8 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-sky-900/50">
            Selected beach
          </p>
          <h3 className="mt-1 text-lg font-semibold text-sky-950">{beach.name}</h3>
          <p className="text-sm text-sky-800/70">{beach.location}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
            {advisoryLabel(beach.advisory)}
          </span>
          <span className="rounded-md bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-rose-800">
            {recommendationLabel(recommendation)}
          </span>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-sky-900/80">{beach.summary}</p>
    </div>
  );
}

export function RiskCardEmpty() {
  return (
    <div className="rounded-xl border border-dashed border-sky-300/60 bg-sky-50/30 p-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-sky-900/40">
        Selected beach
      </p>
      <p className="mt-2 text-sm text-sky-800/50">
        SurfScout will highlight the beach under discussion here.
      </p>
    </div>
  );
}
