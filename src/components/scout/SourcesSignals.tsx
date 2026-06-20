import type { SourceUsed } from "@/types/surfscout";

type SourcesSignalsProps = {
  sources: SourceUsed[];
  degradedMode?: boolean;
};

export function SourcesSignals({ sources, degradedMode }: SourcesSignalsProps) {
  return (
    <div className="rounded-xl border border-sky-900/8 bg-white/80 p-4 backdrop-blur-sm">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-900/60">
          Sources &amp; signals
        </h3>
        {degradedMode && (
          <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-800">
            Degraded mode
          </span>
        )}
      </div>
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

export function SourcesSignalsEmpty() {
  return (
    <div className="rounded-xl border border-dashed border-sky-300/60 bg-sky-50/30 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-900/40">
        Sources &amp; signals
      </h3>
      <p className="mt-2 text-xs text-sky-800/50">
        Data sources used in the response will be listed here.
      </p>
    </div>
  );
}
