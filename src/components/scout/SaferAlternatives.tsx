import type { SaferAlternative } from "@/types/surfscout";
import { advisoryLabel, advisoryStyles } from "@/lib/advisory";

type SaferAlternativesProps = {
  alternatives: SaferAlternative[];
};

export function SaferAlternatives({ alternatives }: SaferAlternativesProps) {
  return (
    <div className="rounded-xl border border-sky-900/8 bg-white/80 p-4 backdrop-blur-sm">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-900/60">
        Safer alternatives
      </h3>
      <ul className="mt-3 space-y-3">
        {alternatives.map((beach) => {
          const styles = advisoryStyles(beach.advisory);
          return (
            <li
              key={beach.id}
              className="rounded-lg border border-sky-900/6 bg-sky-50/50 p-3 transition-colors hover:bg-sky-50"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-medium text-sky-950">{beach.name}</p>
                  <p className="text-xs text-sky-800/60">{beach.location}</p>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${styles.badge}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                  {advisoryLabel(beach.advisory)}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-sky-900/75">
                {beach.summary}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function SaferAlternativesEmpty() {
  return (
    <div className="rounded-xl border border-dashed border-sky-300/60 bg-sky-50/30 p-4">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-900/40">
        Safer alternatives
      </h3>
      <p className="mt-2 text-xs text-sky-800/50">
        Nearby options will appear after SurfScout responds.
      </p>
    </div>
  );
}
