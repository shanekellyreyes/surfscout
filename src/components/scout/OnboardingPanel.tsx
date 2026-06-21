export function OnboardingPanel() {
  const sampleBeaches = [
    { name: "Seabright", level: "green" as const },
    { name: "Main Beach", level: "yellow" as const },
    { name: "Panther", level: "red" as const },
  ];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-200/70 bg-gradient-to-br from-[#e8f4f6] via-[#fdfbf7] to-[#f0e6d8] p-6 shadow-sm sm:p-8">
      <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full bg-[#5a9a9e]/10 blur-2xl" />
      <svg
        className="pointer-events-none absolute bottom-0 left-0 w-full text-[#2a6f7f]/8"
        viewBox="0 0 800 80"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          fill="currentColor"
          d="M0,40 C200,70 400,10 600,45 C700,62 750,55 800,48 L800,80 L0,80 Z"
        />
      </svg>

      <div className="relative">
        <h2 className="text-lg font-semibold text-[#1e4d5c]">
          Ask a beach question to load your advisory map
        </h2>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#1e3a4a]/70">
          SurfScout will highlight the selected beach, advisory zones, safer
          alternatives, and source signals.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          {sampleBeaches.map((beach) => (
            <div
              key={beach.name}
              className="flex items-center gap-2 rounded-xl border border-stone-200/60 bg-white/80 px-3 py-2 shadow-sm"
            >
              <span
                className={`h-2.5 w-2.5 rounded-full ${
                  beach.level === "green"
                    ? "bg-emerald-500"
                    : beach.level === "yellow"
                      ? "bg-amber-400"
                      : "bg-rose-500"
                }`}
              />
              <span className="text-xs font-medium text-[#1e4d5c]">
                {beach.name}
              </span>
            </div>
          ))}
        </div>

        <p className="mt-6 text-xs text-[#1e3a4a]/50">
          Approximate SurfScout advisory overlays — not official safety
          boundaries.
        </p>
      </div>
    </div>
  );
}
