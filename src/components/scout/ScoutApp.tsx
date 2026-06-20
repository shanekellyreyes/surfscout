"use client";

import Link from "next/link";
import {
  SAFER_ALTERNATIVES,
  SELECTED_BEACH,
  SIGNAL_SOURCES,
} from "@/data/seed";
import { AdvisoryLegend } from "./AdvisoryLegend";
import { ChatPanel, useDemoChat } from "./ChatPanel";
import { MapPlaceholder } from "./MapPlaceholder";
import { OceanCautionFooter } from "./OceanCautionFooter";
import { RiskCard } from "./RiskCard";
import { SaferAlternatives } from "./SaferAlternatives";
import { SourcesSignals } from "./SourcesSignals";

export function ScoutApp() {
  const { messages, useExamplePrompt } = useDemoChat();

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-br from-sky-50 via-white to-teal-50/30">
      {/* Header */}
      <header className="shrink-0 border-b border-sky-900/8 bg-white/70 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sky-600 to-teal-600 text-sm text-white shadow-sm">
              🌊
            </span>
            <div>
              <p className="text-sm font-semibold text-sky-950">SurfScout</p>
              <p className="text-[10px] text-sky-800/50">Coastal safety map</p>
            </div>
          </Link>
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-amber-800">
            Demo · Seeded data
          </span>
        </div>
      </header>

      {/* Main split layout */}
      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col lg:flex-row">
        {/* Left: Chat */}
        <aside className="flex w-full shrink-0 flex-col border-b border-sky-900/8 bg-white/50 lg:w-[380px] lg:border-b-0 lg:border-r xl:w-[420px]">
          <ChatPanel messages={messages} onUseExample={useExamplePrompt} />
        </aside>

        {/* Right: Map + details */}
        <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 lg:p-5">
          <MapPlaceholder />

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="md:col-span-2 xl:col-span-1">
              <RiskCard beach={SELECTED_BEACH} />
            </div>
            <AdvisoryLegend />
            <SaferAlternatives alternatives={SAFER_ALTERNATIVES} />
          </div>

          <SourcesSignals sources={SIGNAL_SOURCES} />
        </main>
      </div>

      <OceanCautionFooter />
    </div>
  );
}
