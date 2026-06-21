import type { SurfScoutChatResponse } from "@/types/surfscout";
import { recommendationLabel } from "@/lib/recommendation";
import { advisoryLabel } from "@/lib/advisory";

type AssistantResponseProps = {
  response: SurfScoutChatResponse;
};

export function AssistantResponse({ response }: AssistantResponseProps) {
  const recStyles =
    response.recommendation === "avoid_for_now"
      ? "bg-[#c96b5a]/12 text-[#8b3d32] ring-[#c96b5a]/25"
      : response.recommendation === "use_caution"
        ? "bg-amber-100/80 text-amber-900 ring-amber-200"
        : "bg-[#7a9e8e]/15 text-[#3d6b5a] ring-[#7a9e8e]/30";

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[#2a6f7f]">
        SurfScout
      </p>
      <p className="text-sm font-medium leading-snug text-[#1e4d5c]">
        {response.headline}
      </p>
      <span
        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ring-1 ring-inset ${recStyles}`}
      >
        {recommendationLabel(response.recommendation)}
      </span>
      {response.reasons.length > 0 && (
        <ul className="space-y-1.5 pt-1">
          {response.reasons.map((reason) => (
            <li
              key={reason}
              className="flex gap-2 text-xs leading-relaxed text-[#1e3a4a]/80"
            >
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#5a9a9e]" />
              {reason}
            </li>
          ))}
        </ul>
      )}
      <p className="text-[10px] text-[#1e3a4a]/50">
        Selected: {response.selectedBeach.name} ·{" "}
        {advisoryLabel(response.selectedBeach.advisory)}
      </p>
    </div>
  );
}
