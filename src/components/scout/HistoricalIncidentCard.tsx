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
    <div className="card-coastal p-5">
      <div className="flex items-start justify-between gap-3">
        <p className="section-label">Historical incident context</p>
        <span className="shrink-0 rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-600">
          {SEVERITY_LABELS[context.severity]}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-[#1e3a4a]/80">{context.summary}</p>
      <p className="mt-3 rounded-lg bg-[#e8f4f6]/60 px-3 py-2 text-xs leading-relaxed text-[#1e3a4a]/65">
        Background risk awareness only — not a live warning or official safety
        boundary.
      </p>
    </div>
  );
}
