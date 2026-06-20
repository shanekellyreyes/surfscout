"use client";

import type { AdvisoryZone, MapMarker, MapView, SelectedBeach } from "@/types/surfscout";
import { advisoryStyles } from "@/lib/advisory";

type MapPlaceholderProps = {
  mapView?: MapView;
  markers?: MapMarker[];
  selectedBeachId?: string;
};

export function MapPlaceholder({
  mapView,
  markers = [],
  selectedBeachId,
}: MapPlaceholderProps) {
  const selectedMarker = markers.find((m) => m.id === selectedBeachId);
  const selectedStyles = selectedMarker
    ? advisoryStyles(selectedMarker.advisory)
    : advisoryStyles("red");

  return (
    <div className="relative overflow-hidden rounded-xl border border-sky-900/10 bg-gradient-to-br from-sky-100 via-teal-50 to-emerald-100 shadow-inner">
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-sky-400/40 via-sky-300/25 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-[28%] bg-gradient-to-t from-teal-500/20 to-transparent" />
        <div
          className="absolute inset-x-0 bottom-[22%] h-16 bg-gradient-to-r from-amber-100/80 via-amber-50/60 to-amber-100/40"
          style={{ clipPath: "ellipse(120% 100% at 50% 100%)" }}
        />
        <div className="absolute bottom-[18%] left-[20%] h-24 w-32 rounded-full bg-emerald-400/25 blur-2xl" />
        <div className="absolute bottom-[22%] left-[42%] h-20 w-28 rounded-full bg-amber-400/20 blur-2xl" />
        <div className="absolute bottom-[20%] right-[18%] h-28 w-36 rounded-full bg-rose-400/25 blur-2xl" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(#0c4a6e 1px, transparent 1px), linear-gradient(90deg, #0c4a6e 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {markers.map((marker) => {
        const styles = advisoryStyles(marker.advisory);
        const isSelected = marker.id === selectedBeachId;
        return (
          <div
            key={marker.id}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ top: marker.top, left: marker.left }}
          >
            <div
              className={`flex flex-col items-center gap-1 ${isSelected ? "scale-110" : ""}`}
            >
              <span
                className={`h-3 w-3 rounded-full ring-2 ring-white ${styles.dot} ${isSelected ? `ring-4 ${selectedStyles.ring} shadow-lg ${selectedStyles.glow}` : ""}`}
              />
              <span
                className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium shadow-sm ${
                  isSelected ? "bg-sky-950 text-white" : "bg-white/90 text-sky-900"
                }`}
              >
                {marker.name}
              </span>
            </div>
          </div>
        );
      })}

      <div className="absolute left-3 top-3 rounded-lg bg-white/90 px-2.5 py-1.5 text-xs font-medium text-sky-900 shadow-sm backdrop-blur-sm">
        Santa Cruz coast
        {mapView && (
          <span className="mt-0.5 block text-[10px] font-normal text-sky-700/70">
            {mapView.center.lat.toFixed(2)}, {mapView.center.lng.toFixed(2)} · z
            {mapView.zoom}
          </span>
        )}
      </div>
      <div className="absolute bottom-3 right-3 rounded-lg bg-white/80 px-2 py-1 text-[10px] text-sky-800/60 backdrop-blur-sm">
        Map placeholder — live tiles coming soon
      </div>

      <div className="aspect-[16/10] w-full min-h-[220px]" aria-hidden />
    </div>
  );
}

export function MapPlaceholderEmpty() {
  return (
    <div className="flex aspect-[16/10] min-h-[220px] w-full items-center justify-center rounded-xl border border-dashed border-sky-300/60 bg-sky-50/40">
      <p className="text-sm text-sky-800/60">
        Submit a prompt to load the advisory map
      </p>
    </div>
  );
}
