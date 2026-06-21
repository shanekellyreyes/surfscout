"use client";

import type { MapMarker, MapView } from "@/types/surfscout";
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
    <div className="relative h-[min(480px,55vh)] min-h-[320px] w-full overflow-hidden rounded-2xl border border-stone-200/70 bg-gradient-to-br from-[#dbeef2] via-[#e8f4f6] to-[#f0e6d8] shadow-sm lg:h-[480px]">
      <div className="absolute inset-0">
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-[#5a9a9e]/35 via-[#a8d4dc]/20 to-transparent" />
        <div
          className="absolute inset-x-0 bottom-[20%] h-14 bg-gradient-to-r from-[#f0e6d8]/90 via-[#fdfbf7]/70 to-[#f0e6d8]/90"
          style={{ clipPath: "ellipse(120% 100% at 50% 100%)" }}
        />
        <div className="absolute bottom-[18%] left-[18%] h-24 w-32 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="absolute bottom-[22%] left-[42%] h-20 w-28 rounded-full bg-amber-400/18 blur-2xl" />
        <div className="absolute bottom-[20%] right-[16%] h-28 w-36 rounded-full bg-rose-400/20 blur-2xl" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#1e4d5c 1px, transparent 1px), linear-gradient(90deg, #1e4d5c 1px, transparent 1px)",
          backgroundSize: "48px 48px",
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
              className={`flex flex-col items-center gap-1 transition-transform ${isSelected ? "scale-110" : ""}`}
            >
              <span
                className={`h-3.5 w-3.5 rounded-full ring-2 ring-white shadow-sm ${styles.dot} ${isSelected ? `ring-4 ${selectedStyles.ring}` : ""}`}
              />
              <span
                className={`max-w-[5.5rem] truncate rounded-lg px-2 py-0.5 text-[10px] font-medium shadow-sm ${
                  isSelected
                    ? "bg-[#1e4d5c] text-white"
                    : "bg-white/95 text-[#1e4d5c]"
                }`}
              >
                {marker.name}
              </span>
            </div>
          </div>
        );
      })}

      <div className="absolute left-3 top-3 rounded-lg bg-white/95 px-3 py-2 text-xs font-medium text-[#1e4d5c] shadow-sm">
        Advisory map
        {mapView && (
          <span className="mt-0.5 block text-[10px] font-normal text-[#1e3a4a]/55">
            {mapView.center.lat.toFixed(2)}, {mapView.center.lng.toFixed(2)} · z
            {mapView.zoom}
          </span>
        )}
      </div>
      <div className="absolute bottom-3 right-3 rounded-lg bg-white/90 px-2.5 py-1 text-[10px] text-[#1e3a4a]/55 shadow-sm">
        Map placeholder — live tiles coming soon
      </div>
    </div>
  );
}
