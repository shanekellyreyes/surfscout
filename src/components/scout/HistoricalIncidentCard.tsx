import type { HistoricalIncidentContext } from "@/types/incident-history";

type HistoricalIncidentCardProps = {
  context: HistoricalIncidentContext;
};

const SEVERITY_LABELS: Record<HistoricalIncidentContext["severity"], string> = {
  low: "Low background signal",
  moderate: "Moderate background signal",
  high: "High background signal",
};

export function HistoricalIncidentCard({ context }: HistoricalIncidentCardProps) {
  return (
    <div className="rounded-xl border border-sky-900/8 bg-white/80 p-4 backdrop-blur-sm">
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-900/60">
          Historical incident context
        </h3>
        <span className="shrink-0 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-slate-700">
          {SEVERITY_LABELS[context.severity]}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-sky-900/80">{context.summary}</p>
      <p className="mt-3 text-xs leading-relaxed text-sky-800/60">{context.disclaimer}</p>
    </div>
  );
}

export function HistoricalIncidentCardEmpty() {
  return null;
}
