"use client";

import { useState } from "react";
import { EXAMPLE_PROMPT, type ChatMessage } from "@/data/seed";

type ChatPanelProps = {
  messages: ChatMessage[];
  loading: boolean;
  onSubmit: (message: string) => void;
};

export function ChatPanel({ messages, loading, onSubmit }: ChatPanelProps) {
  const [input, setInput] = useState("");

  function handleSubmit(message: string) {
    const trimmed = message.trim();
    if (!trimmed || loading) return;
    onSubmit(trimmed);
    setInput("");
  }

  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-sky-900/8 px-4 py-3">
        <h2 className="text-sm font-semibold text-sky-950">SurfScout chat</h2>
        <p className="text-xs text-sky-800/60">
          Ask about Bay Area beaches — conditions, access, and safer options
        </p>
      </div>

      <div className="flex-1 space-y-4 overflow-y-auto px-4 py-4">
        {messages.length === 0 && (
          <div className="rounded-xl border border-dashed border-sky-300/60 bg-sky-50/50 p-4 text-center">
            <p className="text-sm text-sky-800/70">
              Try the example prompt below to preview the demo flow.
            </p>
          </div>
        )}

        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[92%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                message.role === "user"
                  ? "rounded-br-md bg-sky-900 text-white"
                  : "rounded-bl-md border border-sky-900/8 bg-white text-sky-950 shadow-sm"
              }`}
            >
              {message.role === "assistant" && (
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-teal-600">
                  SurfScout
                </p>
              )}
              <span className="whitespace-pre-line">{message.content}</span>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-md border border-sky-900/8 bg-white px-4 py-3 text-sm text-sky-800/60 shadow-sm">
              SurfScout is thinking…
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3 border-t border-sky-900/8 p-4">
        <button
          type="button"
          disabled={loading}
          onClick={() => handleSubmit(EXAMPLE_PROMPT)}
          className="w-full rounded-xl border border-teal-200/80 bg-teal-50/80 px-3 py-2.5 text-left text-xs leading-relaxed text-teal-900 transition-colors hover:border-teal-300 hover:bg-teal-50 disabled:opacity-50"
        >
          <span className="mb-1 block text-[10px] font-semibold uppercase tracking-wider text-teal-600">
            Example prompt
          </span>
          &ldquo;{EXAMPLE_PROMPT}&rdquo;
        </button>

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
            placeholder="Ask about a beach..."
            disabled={loading}
            className="flex-1 rounded-xl border border-sky-900/10 bg-white px-3 py-2.5 text-sm text-sky-950 placeholder:text-sky-800/40 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-400/20 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="rounded-xl bg-sky-900 px-4 py-2.5 text-sm font-medium text-white transition-opacity disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
