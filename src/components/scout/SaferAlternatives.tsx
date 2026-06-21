import type { SaferAlternative } from "@/types/surfscout";
import { advisoryLabel, advisoryStyles } from "@/lib/advisory";

type SaferAlternativesProps = {
  alternatives: SaferAlternative[];
};

export function SaferAlternatives({ alternatives }: SaferAlternativesProps) {
  return (
    <div className="card-coastal p-5">
      <p className="section-label">Safer alternatives</p>
      <p className="mt-1 text-sm text-[#1e3a4a]/65">
        Nearby options that may better fit your situation right now.
      </p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {alternatives.map((beach) => {
          const styles = advisoryStyles(beach.advisory);
          return (
            <li
              key={beach.id}
              className="rounded-xl border border-stone-200/60 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-[#1e4d5c]">{beach.name}</p>
                  <p className="text-xs text-[#1e3a4a]/55">{beach.location}</p>
                </div>
                <span
                  className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium ring-1 ring-inset ${styles.badge}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                  {advisoryLabel(beach.advisory)}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-[#1e3a4a]/75">
                {beach.summary}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
