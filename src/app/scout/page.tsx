import { ScoutApp } from "@/components/scout/ScoutApp";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Scout — SurfScout",
  description:
    "AI coastal safety map for Bay Area beachgoers. Chat, map advisories, and safer alternatives.",
};

export default function ScoutPage() {
  return <ScoutApp />;
}
