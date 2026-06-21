import type { PerfectBeachDayResponse } from "@/types/perfect-beach-day";
import { advisoryLabel, advisoryStyles } from "@/lib/advisory";
import { recommendationLabel } from "@/lib/recommendation";

type PerfectBeachDayProps = {
  result: PerfectBeachDayResponse | null;
  loading: boolean;
  error: string | null;
  onFind: () => void;
};

export function PerfectBeachDay({
  result,
  loading,
  error,
  onFind,
}: PerfectBeachDayProps) {
  return (
    <div className="card-coastal p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="section-label">Perfect Beach Day</p>
          <p className="mt-1 text-xs text-[#1e3a4a]/60">
            Nearby beaches ranked for your trip context — advisory only.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {result?.redisPowered ? (
            <span className="rounded-full bg-[#dc382d]/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#b82e25] ring-1 ring-[#dc382d]/20">
              Powered by Redis Geo + Cache
            </span>
          ) : result ? (
            <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-600 ring-1 ring-stone-200/80">
              Seeded fallback
            </span>
          ) : null}
          <button
            type="button"
            onClick={onFind}
            disabled={loading}
            className="rounded-lg bg-[#2a6f7f] px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-opacity hover:bg-[#1e4d5c] disabled:opacity-50"
          >
            {loading ? "Finding beaches…" : "Find my Perfect Beach Day"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
          {error}
        </div>
      )}

      {loading && !result && (
        <div className="mt-4 flex items-center gap-2 text-sm text-[#1e3a4a]/60">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#5a9a9e]" />
          Looking for nearby beach options…
        </div>
      )}

      {result && (
        <div className="mt-4 space-y-4">
          {!result.redisPowered && result.fallbackReasons.length > 0 && (
            <div className="rounded-lg border border-stone-200/70 bg-[#e8f4f6]/50 px-3 py-2.5 text-xs leading-relaxed text-[#1e3a4a]/75">
              {result.fallbackReasons[0]}
            </div>
          )}

          <p className="text-xs text-[#1e3a4a]/65">
            Near{" "}
            <span className="font-medium text-[#1e4d5c]">{result.selectedBeach.name}</span>{" "}
            — ranked by fit for your prompt, not live conditions.
          </p>

          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {result.candidates.map((candidate) => {
              const styles = advisoryStyles(candidate.advisory);
              return (
                <li
                  key={candidate.beachId}
                  className="rounded-xl border border-stone-200/60 bg-white p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-semibold text-[#1e4d5c]">{candidate.name}</p>
                      <p className="text-xs text-[#1e3a4a]/55">{candidate.location}</p>
                      {candidate.distanceKm != null && (
                        <p className="mt-0.5 text-[10px] text-[#1e3a4a]/50">
                          ~{candidate.distanceKm} km away
                        </p>
                      )}
                    </div>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${styles.badge}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                      {advisoryLabel(candidate.advisory)}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#1e3a4a]/75">
                    {candidate.reason}
                  </p>
                  <p className="mt-1.5 text-[10px] font-medium text-[#2a6f7f]/80">
                    {recommendationLabel(candidate.recommendation)}
                  </p>
                  {candidate.fitHighlights.length > 0 && (
                    <ul className="mt-2 space-y-1">
                      {candidate.fitHighlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="text-[10px] leading-relaxed text-[#1e3a4a]/60"
                        >
                          · {highlight}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          <p className="text-[11px] leading-relaxed text-[#1e3a4a]/55">
            {result.safetyDisclaimer}
          </p>
        </div>
      )}

      {!result && !loading && !error && (
        <p className="mt-4 text-xs leading-relaxed text-[#1e3a4a]/55">
          Find nearby beaches ranked for your trip. Uses Redis GEO when{" "}
          <code className="rounded bg-stone-100 px-1">REDIS_URL</code> is configured;
          otherwise falls back to seeded coordinates.
        </p>
      )}
    </div>
  );
}
