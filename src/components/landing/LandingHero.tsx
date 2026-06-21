"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { LANDING_PROMPT_CHIPS } from "@/data/prompt-chips";

export function LandingHero() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [activeChipIndex, setActiveChipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveChipIndex((index) => (index + 1) % LANDING_PROMPT_CHIPS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  function goToScout(prompt: string) {
    const trimmed = prompt.trim();
    if (!trimmed) return;
    router.push(`/scout?prompt=${encodeURIComponent(trimmed)}`);
  }

  return (
    <div className="relative flex min-h-full flex-col overflow-hidden bg-gradient-to-b from-[#e8f4f6] via-[#f7f3eb] to-[#f0e6d8] text-[#1e3a4a]">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-[#a8d4dc]/30 blur-3xl" />
        <div className="absolute -right-16 top-1/3 h-64 w-64 rounded-full bg-[#7a9e8e]/20 blur-3xl" />
        <div
          className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#5a9a9e]/15 to-transparent"
          aria-hidden
        />
        <svg
          className="absolute bottom-0 left-0 w-full text-[#5a9a9e]/10"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            fill="currentColor"
            d="M0,64 C240,100 480,20 720,56 C960,92 1200,36 1440,72 L1440,120 L0,120 Z"
          />
        </svg>
      </div>

      <header className="relative z-10 px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2a6f7f] text-lg text-white shadow-sm">
            🌊
          </span>
          <span className="text-lg font-semibold tracking-tight text-[#1e4d5c]">
            SurfScout
          </span>
        </div>
      </header>

      <main className="relative z-10 flex flex-1 flex-col items-center px-6 pb-16 pt-4">
        <div className="mx-auto w-full max-w-3xl text-center">
          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2a6f7f]/15 bg-white/60 px-3 py-1 text-xs font-medium text-[#2a6f7f]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#7a9e8e]" />
            Bay Area coastal safety
          </p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight text-[#1e4d5c] sm:text-5xl">
            Beautiful beaches. Real risks. Better decisions.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#1e3a4a]/75 sm:text-lg">
            SurfScout helps Bay Area beachgoers understand coastal hazards,
            access, and safer alternatives.
          </p>

          <div className="mt-8 rounded-2xl border border-stone-200/80 bg-[#fdfbf7]/90 p-5 shadow-lg shadow-[#1e4d5c]/5 backdrop-blur-sm sm:p-6">
            <p className="mb-3 text-left text-xs font-medium text-[#2a6f7f]/80">
              Try asking:
            </p>
            <p className="mb-4 min-h-[2.5rem] text-left text-sm leading-relaxed text-[#1e3a4a]/70 transition-opacity duration-500">
              &ldquo;{LANDING_PROMPT_CHIPS[activeChipIndex]}&rdquo;
            </p>

            <div className="mb-4 flex flex-wrap gap-2">
              {LANDING_PROMPT_CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => goToScout(chip)}
                  className="rounded-full border border-[#5a9a9e]/25 bg-white px-3 py-1.5 text-left text-xs text-[#1e4d5c] transition-colors hover:border-[#2a6f7f]/40 hover:bg-[#e8f4f6]"
                >
                  {chip.length > 42 ? `${chip.slice(0, 42)}…` : chip}
                </button>
              ))}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                goToScout(input);
              }}
              className="flex flex-col gap-3 sm:flex-row"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about a beach trip…"
                className="flex-1 rounded-xl border border-stone-200 bg-white px-4 py-3.5 text-sm text-[#1e3a4a] placeholder:text-[#1e3a4a]/40 focus:border-[#2a6f7f]/50 focus:outline-none focus:ring-2 focus:ring-[#2a6f7f]/15"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="rounded-xl bg-[#2a6f7f] px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:bg-[#1e4d5c] disabled:opacity-40"
              >
                Ask SurfScout
              </button>
            </form>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/scout"
              className="text-sm font-medium text-[#2a6f7f] underline-offset-4 hover:underline"
            >
              Explore demo
            </Link>
            <span className="text-xs text-[#1e3a4a]/50">
              No account needed · Seeded demo data
            </span>
          </div>
        </div>

        <div className="mx-auto mt-14 grid w-full max-w-4xl gap-4 sm:grid-cols-3">
          {[
            {
              title: "Ask naturally",
              body: "Describe your plans — who's going, skill level, timing, and what you want from the day.",
            },
            {
              title: "See advisory zones",
              body: "Green, yellow, and red overlays highlight relative concern — not official boundaries.",
            },
            {
              title: "Find safer alternatives",
              body: "Compare nearby beaches when your first choice isn't the best fit for your situation.",
            },
          ].map((feature) => (
            <div key={feature.title} className="card-coastal p-5 text-left">
              <h3 className="font-semibold text-[#1e4d5c]">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#1e3a4a]/70">
                {feature.body}
              </p>
            </div>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-stone-200/60 px-6 py-4 text-center text-xs leading-relaxed text-[#1e3a4a]/55">
        SurfScout is advisory only and does not guarantee beach safety. Always
        check posted signs, lifeguards on duty, and official sources before you
        go.
      </footer>
    </div>
  );
}
