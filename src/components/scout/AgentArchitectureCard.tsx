const SPONSORS = [
  {
    name: "Browserbase",
    status:
      "Live Advisory Scout source research scaffold; live web integration next",
  },
  {
    name: "Redis",
    status: "Planned Perfect Beach Day + geospatial/cache layer",
  },
  {
    name: "Anthropic",
    status: "Planned SafetyAdvisorAgent for grounded advisory summaries",
  },
  {
    name: "Simular Sai",
    status: "Used for research, docs, QA, and demo testing",
  },
] as const;

export function AgentArchitectureCard() {
  return (
    <div className="card-coastal mx-4 mb-4 p-4 lg:mx-6">
      <p className="section-label">Agentic architecture</p>
      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
        {SPONSORS.map((sponsor) => (
          <li
            key={sponsor.name}
            className="rounded-lg border border-stone-200/50 bg-white/60 px-3 py-2"
          >
            <p className="text-xs font-medium text-[#1e4d5c]">{sponsor.name}</p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-[#1e3a4a]/60">
              {sponsor.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
