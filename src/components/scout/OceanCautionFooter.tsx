import { OCEAN_CAUTION } from "@/data/seed";

type OceanCautionFooterProps = {
  message?: string;
};

export function OceanCautionFooter({ message = OCEAN_CAUTION }: OceanCautionFooterProps) {
  return (
    <footer className="shrink-0 border-t border-sky-900/10 bg-sky-950 px-4 py-3 text-sky-100">
      <div className="mx-auto flex max-w-[1600px] items-start gap-3">
        <span
          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-amber-400/20 text-xs text-amber-200"
          aria-hidden
        >
          ⚠
        </span>
        <p className="text-xs leading-relaxed text-sky-200/90 sm:text-sm">{message}</p>
      </div>
    </footer>
  );
}
