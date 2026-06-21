"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ChatMessage } from "@/data/seed";
import type { SurfScoutChatResponse } from "@/types/surfscout";
import { AdvisoryLegend } from "./AdvisoryLegend";
import { ChatPanel } from "./ChatPanel";
import { HistoricalIncidentCard } from "./HistoricalIncidentCard";
import { MapPlaceholder } from "./MapPlaceholder";
import { OceanCautionFooter } from "./OceanCautionFooter";
import { OnboardingPanel } from "./OnboardingPanel";
import { RiskCard } from "./RiskCard";
import { SaferAlternatives } from "./SaferAlternatives";
import { SourcesSignals } from "./SourcesSignals";

let messageCounter = 0;

function nextMessageId() {
  messageCounter += 1;
  return `msg-${messageCounter}`;
}

export function ScoutApp() {
  const searchParams = useSearchParams();
  const hasAutoSubmitted = useRef(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [scoutData, setScoutData] = useState<SurfScoutChatResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [initialPrompt] = useState(() => searchParams.get("prompt") ?? "");

  const askSurfScout = useCallback(async (message: string) => {
    setLoading(true);
    setError(null);
    setMessages((prev) => [
      ...prev,
      { id: nextMessageId(), role: "user", content: message },
    ]);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!res.ok) {
        const body = (await res.json().catch(() => null)) as { error?: string } | null;
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }

      const data = (await res.json()) as SurfScoutChatResponse;
      setScoutData(data);
    } catch (err) {
      const messageText =
        err instanceof Error ? err.message : "Something went wrong. Try again.";
      setError(messageText);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const prompt = searchParams.get("prompt");
    if (!prompt || hasAutoSubmitted.current) return;
    hasAutoSubmitted.current = true;
    askSurfScout(decodeURIComponent(prompt));
  }, [searchParams, askSurfScout]);

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-[#f7f3eb] via-[#fdfbf7] to-[#e8f4f6]/40">
      <header className="shrink-0 border-b border-stone-200/70 bg-white/80 px-4 py-3 backdrop-blur-md">
        <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2a6f7f] text-sm text-white shadow-sm">
              🌊
            </span>
            <div>
              <p className="text-sm font-semibold text-[#1e4d5c]">SurfScout</p>
              <p className="text-[10px] text-[#1e3a4a]/55">Coastal safety map</p>
            </div>
          </Link>
          <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-amber-800 ring-1 ring-amber-200/60">
            {scoutData?.degradedMode ? "Demo · Degraded mode" : "Demo · Seeded data"}
          </span>
        </div>
      </header>

      {error && (
        <div className="border-b border-rose-200 bg-rose-50 px-4 py-2 text-center text-sm text-rose-800">
          {error}
        </div>
      )}

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col lg:min-h-0 lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col border-b border-stone-200/70 lg:w-[400px] lg:border-b-0 lg:border-r xl:w-[430px]">
          <ChatPanel
            messages={messages}
            loading={loading}
            scoutData={scoutData}
            initialInput={initialPrompt}
            onSubmit={askSurfScout}
          />
        </aside>

        <main className="flex flex-1 flex-col gap-5 overflow-y-auto p-4 lg:min-h-0 lg:p-6">
          {!scoutData ? (
            loading ? (
              <div className="card-coastal flex min-h-[280px] items-center justify-center p-8">
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 text-sm text-[#1e3a4a]/65">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-[#5a9a9e]" />
                    Loading your advisory map…
                  </span>
                </div>
              </div>
            ) : (
              <OnboardingPanel />
            )
          ) : (
            <>
              <div className="space-y-2">
                <MapPlaceholder
                  mapView={scoutData.mapView}
                  markers={scoutData.mapMarkers}
                  selectedBeachId={scoutData.selectedBeach.id}
                />
                <p className="text-center text-[11px] text-[#1e3a4a]/50">
                  Approximate SurfScout advisory overlays — not official safety
                  boundaries.
                </p>
              </div>

              <div className="grid gap-4 lg:grid-cols-2">
                <RiskCard
                  beach={scoutData.selectedBeach}
                  recommendation={scoutData.recommendation}
                />
                <AdvisoryLegend zones={scoutData.advisoryZones} />
              </div>

              <SaferAlternatives alternatives={scoutData.saferAlternatives} />

              <div className="grid gap-4 lg:grid-cols-2">
                <SourcesSignals
                  sources={scoutData.sourcesUsed}
                  degradedMode={scoutData.degradedMode}
                />
                {scoutData.historicalIncidentContext && (
                  <HistoricalIncidentCard
                    context={scoutData.historicalIncidentContext}
                  />
                )}
              </div>
            </>
          )}
        </main>
      </div>

      <OceanCautionFooter message={scoutData?.oceanCaution} />
    </div>
  );
}
