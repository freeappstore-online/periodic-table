import type { Element } from "./types";
import { CATEGORY_COLORS, CATEGORY_LABELS } from "./types";

interface ElementDetailProps {
  element: Element;
  onClose: () => void;
}

function formatTemp(kelvin: number | null): string {
  if (kelvin === null) return "Unknown";
  const celsius = kelvin - 273.15;
  return `${kelvin.toFixed(1)} K (${celsius.toFixed(1)} °C)`;
}

function PhaseIcon({ phase }: { phase: string }) {
  const colors: Record<string, string> = {
    solid: "var(--ink)",
    liquid: "#3b82f6",
    gas: "#22c55e",
    unknown: "var(--muted)",
  };
  return (
    <span
      className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium capitalize"
      style={{
        backgroundColor: `color-mix(in srgb, ${colors[phase] ?? "var(--muted)"} 15%, transparent)`,
        color: colors[phase] ?? "var(--muted)",
      }}
    >
      {phase}
    </span>
  );
}

export default function ElementDetail({ element, onClose }: ElementDetailProps) {
  const categoryColor = CATEGORY_COLORS[element.category] ?? CATEGORY_COLORS.unknown;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-lg rounded-t-2xl sm:rounded-2xl border shadow-2xl overflow-y-auto max-h-[85vh]"
        style={{
          backgroundColor: "var(--panel)",
          borderColor: "var(--line)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-colors hover:bg-[var(--line)] cursor-pointer"
          style={{ color: "var(--muted)" }}
          aria-label="Close detail panel"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-6">
            <div
              className="flex flex-col items-center justify-center w-20 h-20 rounded-xl border-2 shrink-0"
              style={{
                borderColor: categoryColor,
                backgroundColor: `color-mix(in srgb, ${categoryColor} 10%, transparent)`,
              }}
            >
              <span className="text-xs font-medium" style={{ color: "var(--muted)" }}>
                {element.number}
              </span>
              <span className="text-3xl font-extrabold leading-none" style={{ color: categoryColor }}>
                {element.symbol}
              </span>
              <span className="text-[10px] font-medium" style={{ color: "var(--muted)" }}>
                {element.mass.toFixed(element.mass === Math.round(element.mass) ? 0 : 4)}
              </span>
            </div>
            <div className="min-w-0">
              <h2 className="text-2xl font-bold" style={{ color: "var(--ink)", fontFamily: "'Fraunces', serif" }}>
                {element.name}
              </h2>
              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span
                  className="inline-block rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: `color-mix(in srgb, ${categoryColor} 15%, transparent)`,
                    color: categoryColor,
                  }}
                >
                  {CATEGORY_LABELS[element.category]}
                </span>
                <PhaseIcon phase={element.phase} />
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)" }}>
            {element.description}
          </p>

          {/* Properties grid */}
          <div
            className="grid grid-cols-2 gap-px rounded-xl overflow-hidden border"
            style={{ borderColor: "var(--line)", backgroundColor: "var(--line)" }}
          >
            <Property label="Atomic Number" value={String(element.number)} />
            <Property label="Atomic Mass" value={`${element.mass} u`} />
            <Property label="Electron Config" value={element.electronConfiguration} />
            <Property label="Discovery" value={element.discoveryYear ? String(element.discoveryYear) : "Ancient"} />
            <Property label="Melting Point" value={formatTemp(element.meltingPoint)} />
            <Property label="Boiling Point" value={formatTemp(element.boilingPoint)} />
            <Property
              label="Electronegativity"
              value={element.electronegativity !== null ? `${element.electronegativity} (Pauling)` : "N/A"}
            />
            <Property
              label="Atomic Radius"
              value={element.atomicRadius !== null ? `${element.atomicRadius} pm` : "N/A"}
            />
            <Property
              label="Ionization Energy"
              value={element.ionizationEnergy !== null ? `${element.ionizationEnergy} kJ/mol` : "N/A"}
              span2
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Property({ label, value, span2 }: { label: string; value: string; span2?: boolean }) {
  return (
    <div
      className={`p-3 ${span2 ? "col-span-2" : ""}`}
      style={{ backgroundColor: "var(--panel)" }}
    >
      <div className="text-[10px] uppercase tracking-wider font-semibold mb-0.5" style={{ color: "var(--muted)" }}>
        {label}
      </div>
      <div className="text-sm font-medium" style={{ color: "var(--ink)" }}>
        {value}
      </div>
    </div>
  );
}
