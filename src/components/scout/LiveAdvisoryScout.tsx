import type { ResearchResponse } from "@/types/research";

type LiveAdvisoryScoutProps = {
  research: ResearchResponse | null;
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
};

const SEEDED_CONTEXT_MESSAGE =
  "Seeded advisory context — live public-source research is not connected in this demo build.";

function formatLabel(value: string) {
  return value.replace(/_/g, " ");
}

function formatConfidence(value: string) {
  if (value === "seeded_fallback") return "Seeded source notes";
  return formatLabel(value);
}

function formatFetchedAt(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export function LiveAdvisoryScout({
  research,
  loading,
  error,
  onRefresh,
}: LiveAdvisoryScoutProps) {
  return (
    <div className="card-coastal p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="section-label">Live Advisory Scout</p>
          <p className="mt-1 text-xs text-[#1e3a4a]/60">
            Browserbase-ready scaffold — seeded notes only in this build.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-stone-100 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-600 ring-1 ring-stone-200/80">
            Seeded source notes
          </span>
          <button
            type="button"
            onClick={onRefresh}
            disabled={loading}
            className="rounded-lg bg-[#2a6f7f] px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-opacity hover:bg-[#1e4d5c] disabled:opacity-50"
          >
            {loading ? "Loading notes…" : "View seeded advisory notes"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-800">
          {error}
        </div>
      )}

      {loading && !research && (
        <div className="mt-4 flex items-center gap-2 text-sm text-[#1e3a4a]/60">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#5a9a9e]" />
          Loading seeded advisory notes…
        </div>
      )}

      {research && (
        <div className="mt-4 space-y-4">
          <div className="rounded-lg border border-stone-200/70 bg-[#e8f4f6]/50 px-3 py-2.5 text-xs leading-relaxed text-[#1e3a4a]/75">
            {SEEDED_CONTEXT_MESSAGE}
          </div>

          <ul className="space-y-3">
            {research.sourceNotes.map((note) => (
              <li
                key={note.id}
                className="rounded-lg border border-stone-200/50 bg-white/80 p-3"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <p className="text-sm font-medium text-[#1e4d5c]">
                    {note.sourceName}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    <span className="rounded-md bg-[#e8f4f6] px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#2a6f7f]">
                      {formatConfidence(note.confidence)}
                    </span>
                    <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-stone-600">
                      {formatLabel(note.extractionMethod)}
                    </span>
                  </div>
                </div>
                <p className="mt-1 text-[10px] text-[#1e3a4a]/50">
                  Loaded {formatFetchedAt(note.fetchedAt)}
                </p>
                <ul className="mt-2 space-y-1">
                  {note.notes.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-xs leading-relaxed text-[#1e3a4a]/75"
                    >
                      <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#5a9a9e]" />
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <p className="text-[11px] leading-relaxed text-[#1e3a4a]/55">
            {research.safetyDisclaimer}
          </p>
        </div>
      )}

      {!research && !loading && !error && (
        <p className="mt-4 text-xs leading-relaxed text-[#1e3a4a]/55">
          View seeded advisory notes for the selected beach. Live public-source
          research is not connected yet.
        </p>
      )}
    </div>
  );
}
