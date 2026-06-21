import { OCEAN_CAUTION } from "@/data/seed";

type OceanCautionFooterProps = {
  message?: string;
};

export function OceanCautionFooter({ message = OCEAN_CAUTION }: OceanCautionFooterProps) {
  return (
    <footer className="shrink-0 border-t border-[#1e4d5c]/15 bg-[#1e4d5c] px-4 py-3.5 text-[#e8f4f6]">
      <div className="mx-auto flex max-w-[1600px] items-start gap-3">
        <span
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#c96b5a]/25 text-xs text-amber-100"
          aria-hidden
        >
          ⚠
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-[#a8d4dc]/80">
            Ocean safety reminder
          </p>
          <p className="mt-1 text-xs leading-relaxed text-[#e8f4f6]/90 sm:text-sm">
            {message}
          </p>
        </div>
      </div>
    </footer>
  );
}
