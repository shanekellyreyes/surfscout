import type { SignalSource } from "@/data/seed";

type SourcesSignalsProps = {
  sources: SignalSource[];
};

export function SourcesSignals({ sources }: SourcesSignalsProps) {
  return (
    <div className="rounded-xl border border-sky-900/8 bg-white/80 p-4 backdrop-blur-sm">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-900/60">
        Sources &amp; signals
      </h3>
      <ul className="mt-3 space-y-2">
        {sources.map((source) => (
          <li
            key={source.id}
            className="flex items-start justify-between gap-3 border-b border-sky-900/5 pb-2 last:border-0 last:pb-0"
          >
            <div>
              <p className="text-sm font-medium text-sky-950">{source.label}</p>
              <p className="text-xs text-sky-800/65">{source.detail}</p>
            </div>
            <span className="shrink-0 rounded-md bg-sky-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-sky-700">
              {source.freshness}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
