import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative flex min-h-full flex-col overflow-hidden bg-gradient-to-b from-sky-950 via-sky-900 to-teal-900 text-white">
      {/* Decorative waves */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-1/4 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />
        <div className="absolute -right-1/4 bottom-1/4 h-80 w-80 rounded-full bg-sky-400/10 blur-3xl" />
        <div
          className="absolute inset-x-0 bottom-0 h-48 opacity-20"
          style={{
            background:
              "repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 80px)",
          }}
        />
      </div>

      <header className="relative z-10 px-6 py-6">
        <div className="mx-auto flex max-w-5xl items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg backdrop-blur-sm">
            🌊
          </span>
          <span className="text-lg font-semibold tracking-tight">SurfScout</span>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pb-20 pt-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-sky-200 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Bay Area coastal safety
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl sm:leading-tight">
            Know before you go to the beach
          </h1>

          <p className="mx-auto mt-5 max-w-lg text-base leading-relaxed text-sky-200/90 sm:text-lg">
            Ask SurfScout about conditions, access, and safer alternatives —
            then explore advisory zones on an interactive coastal map.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/scout"
              className="inline-flex h-12 w-full items-center justify-center rounded-full bg-white px-8 text-sm font-semibold text-sky-950 shadow-lg shadow-sky-950/30 transition-transform hover:scale-[1.02] sm:w-auto"
            >
              Open SurfScout
            </Link>
            <span className="text-xs text-sky-300/70">
              No account needed · Demo with seeded data
            </span>
          </div>
        </div>

        {/* Feature preview cards */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-4 sm:grid-cols-3">
          {[
            {
              title: "Ask naturally",
              body: "Describe your plans — skill level, timing, and what you want from the day.",
            },
            {
              title: "See advisories",
              body: "Green, yellow, and red zones highlight relative concern areas on the map.",
            },
            {
              title: "Find alternatives",
              body: "Compare nearby beaches when your first choice isn't the best fit.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left backdrop-blur-sm"
            >
              <h3 className="font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-sky-200/80">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-white/10 px-6 py-4 text-center text-xs text-sky-300/60">
        SurfScout provides general guidance, not lifeguard advice. Always check
        local conditions and signage.
      </footer>
    </div>
  );
}
