import { Suspense } from "react";
import { ScoutApp } from "@/components/scout/ScoutApp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scout — SurfScout",
  description:
    "AI coastal safety map for Bay Area beachgoers. Chat, map advisories, and safer alternatives.",
};

function ScoutFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f7f3eb] text-sm text-[#1e3a4a]/60">
      Loading SurfScout…
    </div>
  );
}

export default function ScoutPage() {
  return (
    <Suspense fallback={<ScoutFallback />}>
      <ScoutApp />
    </Suspense>
  );
}
