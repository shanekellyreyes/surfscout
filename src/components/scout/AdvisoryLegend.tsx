import type { AdvisoryZone } from "@/types/surfscout";
import { advisoryStyles } from "@/lib/advisory";

type AdvisoryLegendProps = {
  zones: AdvisoryZone[];
};

export function AdvisoryLegend({ zones }: AdvisoryLegendProps) {
  return (
    <div className="card-coastal p-5">
      <p className="section-label">Advisory legend</p>
      <ul className="mt-3 space-y-3">
        {zones.map((zone) => {
          const styles = advisoryStyles(zone.level);
          return (
            <li key={zone.level} className="flex items-start gap-2.5">
              <span
                className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${styles.dot}`}
                aria-hidden
              />
              <div>
                <p className="text-sm font-medium text-[#1e4d5c]">{zone.label}</p>
                <p className="mt-0.5 text-xs leading-relaxed text-[#1e3a4a]/65">
                  {zone.description}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
