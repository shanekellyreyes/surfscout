"use client";

import Link from "next/link";
import { useCallback, useState } from "react";
import type { ChatMessage } from "@/data/seed";
import { formatAssistantAnswer } from "@/lib/mock-ask";
import type { SurfScoutChatResponse } from "@/types/surfscout";
import {
  AdvisoryLegend,
  AdvisoryLegendEmpty,
} from "./AdvisoryLegend";
import { ChatPanel } from "./ChatPanel";
import { MapPlaceholder, MapPlaceholderEmpty } from "./MapPlaceholder";
import { OceanCautionFooter } from "./OceanCautionFooter";
import { RiskCard, RiskCardEmpty } from "./RiskCard";
import { SaferAlternatives, SaferAlternativesEmpty } from "./SaferAlternatives";
import { SourcesSignals, SourcesSignalsEmpty } from "./SourcesSignals";

function nextMessageId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function ScoutApp() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [scoutData, setScoutData] = useState<SurfScoutChatResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      setMessages((prev) => [
        ...prev,
        {
          id: nextMessageId(),
          role: "assistant",
          content: formatAssistantAnswer(data),
        },
      ]);
    } catch (err) {
      const messageText =
        err instanceof Error ? err.message : "Something went wrong. Try again.";
      setError(messageText);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="flex min-h-full flex-col bg-gradient-to-br from-sky-50 via-white to-teal-50/30">
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
            {scoutData?.degradedMode ? "Demo · Degraded mode" : "Demo · Seeded data"}
          </span>
        </div>
      </header>

      {error && (
        <div className="border-b border-rose-200 bg-rose-50 px-4 py-2 text-center text-sm text-rose-800">
          {error}
        </div>
      )}

      <div className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col lg:flex-row">
        <aside className="flex w-full shrink-0 flex-col border-b border-sky-900/8 bg-white/50 lg:w-[380px] lg:border-b-0 lg:border-r xl:w-[420px]">
          <ChatPanel messages={messages} loading={loading} onSubmit={askSurfScout} />
        </aside>

        <main className="flex flex-1 flex-col gap-4 overflow-y-auto p-4 lg:p-5">
          {scoutData ? (
            <MapPlaceholder
              mapView={scoutData.mapView}
              markers={scoutData.mapMarkers}
              selectedBeachId={scoutData.selectedBeach.id}
            />
          ) : (
            <MapPlaceholderEmpty />
          )}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="md:col-span-2 xl:col-span-1">
              {scoutData ? (
                <RiskCard
                  beach={scoutData.selectedBeach}
                  recommendation={scoutData.recommendation}
                />
              ) : (
                <RiskCardEmpty />
              )}
            </div>
            {scoutData ? (
              <AdvisoryLegend zones={scoutData.advisoryZones} />
            ) : (
              <AdvisoryLegendEmpty />
            )}
            {scoutData ? (
              <SaferAlternatives alternatives={scoutData.saferAlternatives} />
            ) : (
              <SaferAlternativesEmpty />
            )}
          </div>

          {scoutData ? (
            <SourcesSignals
              sources={scoutData.sourcesUsed}
              degradedMode={scoutData.degradedMode}
            />
          ) : (
            <SourcesSignalsEmpty />
          )}
        </main>
      </div>

      <OceanCautionFooter message={scoutData?.oceanCaution} />
    </div>
  );
}
