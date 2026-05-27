import type { TrendKey } from "./types";

const TRENDS: { key: TrendKey; label: string; description: string }[] = [
  { key: "electronegativity", label: "Electronegativity", description: "Pauling scale" },
  { key: "atomicRadius", label: "Atomic Radius", description: "pm" },
  { key: "ionizationEnergy", label: "Ionization Energy", description: "kJ/mol" },
];

interface TrendSelectorProps {
  active: TrendKey | null;
  onSelect: (trend: TrendKey | null) => void;
}

export default function TrendSelector({ active, onSelect }: TrendSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      <span className="text-xs font-semibold mr-1" style={{ color: "var(--muted)" }}>
        Trends:
      </span>
      {TRENDS.map(({ key, label }) => {
        const isActive = active === key;
        return (
          <button
            key={key}
            onClick={() => onSelect(isActive ? null : key)}
            className="rounded-full px-2.5 py-1 text-xs font-semibold border transition-all cursor-pointer"
            style={{
              borderColor: isActive ? "var(--accent)" : "var(--line)",
              backgroundColor: isActive ? "var(--accent)" : "transparent",
              color: isActive ? "#fff" : "var(--muted)",
            }}
          >
            {label}
          </button>
        );
      })}
      {active && (
        <div className="flex items-center gap-1 ml-2">
          <div
            className="w-24 h-3 rounded-full"
            style={{
              background: "linear-gradient(to right, rgba(37, 99, 235, 0.35), rgba(34, 197, 94, 0.35), rgba(239, 68, 68, 0.35))",
            }}
          />
          <span className="text-[10px]" style={{ color: "var(--muted)" }}>
            Low → High
          </span>
        </div>
      )}
    </div>
  );
}
