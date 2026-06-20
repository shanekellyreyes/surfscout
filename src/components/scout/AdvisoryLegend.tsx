import { ADVISORY_ZONES } from "@/data/seed";
import { advisoryStyles } from "@/lib/advisory";

export function AdvisoryLegend() {
  return (
    <div className="rounded-xl border border-sky-900/8 bg-white/80 p-4 backdrop-blur-sm">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-sky-900/60">
        Advisory legend
      </h3>
      <ul className="mt-3 space-y-2">
        {ADVISORY_ZONES.map((zone) => {
          const styles = advisoryStyles(zone.level);
          return (
            <li key={zone.level} className="flex items-start gap-2.5">
              <span
                className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${styles.dot}`}
                aria-hidden
              />
              <div>
                <p className="text-sm font-medium text-sky-950">{zone.label}</p>
                <p className="text-xs text-sky-800/70">{zone.description}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
