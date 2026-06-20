import type { Beach } from "@/data/seed";
import { advisoryLabel, advisoryStyles } from "@/lib/advisory";

type RiskCardProps = {
  beach: Beach;
};

export function RiskCard({ beach }: RiskCardProps) {
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
        <span
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${styles.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
          {advisoryLabel(beach.advisory)}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-sky-900/80">{beach.summary}</p>
    </div>
  );
}
