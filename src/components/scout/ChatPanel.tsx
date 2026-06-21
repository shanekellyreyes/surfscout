"use client";

import { useState } from "react";
import type { ChatMessage } from "@/data/seed";
import { SCOUT_PROMPT_CHIPS } from "@/data/prompt-chips";
import type { SurfScoutChatResponse } from "@/types/surfscout";
import { AssistantResponse } from "./AssistantResponse";

type ChatPanelProps = {
  messages: ChatMessage[];
  loading: boolean;
  scoutData: SurfScoutChatResponse | null;
  initialInput?: string;
  onSubmit: (message: string) => void;
};

export function ChatPanel({
  messages,
  loading,
  scoutData,
  initialInput = "",
  onSubmit,
}: ChatPanelProps) {
  const [input, setInput] = useState(initialInput);

  function handleSubmit(message: string) {
    const trimmed = message.trim();
    if (!trimmed || loading) return;
    onSubmit(trimmed);
    setInput("");
  }

  const userMessages = messages.filter((m) => m.role === "user");

  return (
    <div className="flex h-full min-h-[420px] flex-col bg-[#fdfbf7] lg:min-h-0">
      <div className="border-b border-stone-200/70 px-4 py-4">
        <h2 className="text-sm font-semibold text-[#1e4d5c]">SurfScout assistant</h2>
        <p className="mt-1 text-xs leading-relaxed text-[#1e3a4a]/65">
          Ask SurfScout about Bay Area beaches — conditions, access, and safer
          options.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {SCOUT_PROMPT_CHIPS.slice(0, 4).map((chip) => (
            <button
              key={chip}
              type="button"
              disabled={loading}
              onClick={() => handleSubmit(chip)}
              className="rounded-full border border-[#5a9a9e]/25 bg-white px-2.5 py-1 text-[11px] leading-snug text-[#1e4d5c] transition-colors hover:border-[#2a6f7f]/35 hover:bg-[#e8f4f6] disabled:opacity-50"
            >
              {chip.length > 48 ? `${chip.slice(0, 48)}…` : chip}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {userMessages.length === 0 && !loading && (
          <div className="rounded-xl bg-[#e8f4f6]/50 px-4 py-3 text-center">
            <p className="text-sm text-[#1e3a4a]/65">
              Pick a prompt above or ask your own question below.
            </p>
          </div>
        )}

        {userMessages.map((message) => (
          <div key={message.id} className="flex justify-end">
            <div className="max-w-[92%] rounded-2xl rounded-br-md bg-[#2a6f7f] px-4 py-3 text-sm leading-relaxed text-white shadow-sm">
              {message.content}
            </div>
          </div>
        ))}

        {scoutData && !loading && (
          <div className="flex justify-start">
            <div className="max-w-[95%] rounded-2xl rounded-bl-md border border-stone-200/70 bg-white px-4 py-3 shadow-sm">
              <AssistantResponse response={scoutData} />
            </div>
          </div>
        )}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md border border-stone-200/70 bg-white px-4 py-3 text-sm text-[#1e3a4a]/55 shadow-sm">
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-[#5a9a9e]" />
                SurfScout is thinking…
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-stone-200/70 bg-[#f7f3eb]/50 p-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(input);
          }}
          className="flex gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about a beach trip…"
            disabled={loading}
            className="flex-1 rounded-xl border border-stone-200 bg-white px-3 py-3 text-sm text-[#1e3a4a] placeholder:text-[#1e3a4a]/40 focus:border-[#2a6f7f]/45 focus:outline-none focus:ring-2 focus:ring-[#2a6f7f]/12 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl bg-[#2a6f7f] px-4 py-3 text-sm font-medium text-white shadow-sm transition-opacity hover:bg-[#1e4d5c] disabled:opacity-40"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
