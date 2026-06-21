import type { SourceUsed } from "@/types/surfscout";

type SourcesSignalsProps = {
  sources: SourceUsed[];
  degradedMode?: boolean;
};

export function SourcesSignals({ sources, degradedMode }: SourcesSignalsProps) {
  return (
    <div className="card-coastal p-5">
      <div className="flex items-center justify-between gap-2">
        <p className="section-label">Sources &amp; signals</p>
        {degradedMode && (
          <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-amber-800 ring-1 ring-amber-200/60">
            Degraded mode
          </span>
        )}
      </div>
      <ul className="mt-3 space-y-3">
        {sources.map((source) => (
          <li
            key={source.id}
            className="rounded-lg border border-stone-200/50 bg-white/80 p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium text-[#1e4d5c]">{source.label}</p>
                <p className="mt-1 text-xs leading-relaxed text-[#1e3a4a]/65">
                  {source.detail}
                </p>
              </div>
              <span className="shrink-0 rounded-md bg-[#e8f4f6] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#2a6f7f]">
                {source.freshness}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
