import type { Element, TrendKey, Category } from "./types";
import { CATEGORY_COLORS, CATEGORY_BG_COLORS } from "./types";

interface ElementCellProps {
  element: Element;
  isHighlighted: boolean;
  isDimmed: boolean;
  isSelected: boolean;
  trendMode: TrendKey | null;
  trendValue: number; // 0–1 normalized
  onClick: (element: Element) => void;
}

function getTrendColor(value: number): string {
  if (value <= 0) return "rgba(107, 114, 128, 0.2)";
  // Blue (low) -> Green (mid) -> Red (high)
  const r = value < 0.5 ? Math.round(value * 2 * 100) : Math.round(255 - (1 - value) * 2 * 50);
  const g = value < 0.5 ? Math.round(100 + value * 2 * 155) : Math.round(255 - (value - 0.5) * 2 * 255);
  const b = value < 0.5 ? Math.round(220 - value * 2 * 220) : Math.round(20);
  return `rgba(${r}, ${g}, ${b}, 0.35)`;
}

function getPhaseIcon(phase: string): string {
  switch (phase) {
    case "solid": return "";
    case "liquid": return "~";
    case "gas": return "...";
    default: return "?";
  }
}

export default function ElementCell({
  element,
  isHighlighted,
  isDimmed,
  isSelected,
  trendMode,
  trendValue,
  onClick,
}: ElementCellProps) {
  const bgColor = trendMode
    ? getTrendColor(trendValue)
    : CATEGORY_BG_COLORS[element.category as Category] ?? CATEGORY_BG_COLORS.unknown;

  const borderColor = isSelected
    ? "var(--accent)"
    : isHighlighted
    ? CATEGORY_COLORS[element.category as Category] ?? CATEGORY_COLORS.unknown
    : "var(--line)";

  const opacity = isDimmed ? 0.2 : 1;

  return (
    <button
      onClick={() => onClick(element)}
      className="relative flex flex-col items-center justify-center rounded-md border text-center transition-all duration-150 hover:scale-110 hover:z-10 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] cursor-pointer"
      style={{
        gridRow: element.row,
        gridColumn: element.col,
        backgroundColor: bgColor,
        borderColor,
        borderWidth: isSelected ? 2 : 1,
        opacity,
        minWidth: 0,
        padding: "2px",
        aspectRatio: "1",
      }}
      title={`${element.name} (${element.symbol})`}
      aria-label={`${element.name}, atomic number ${element.number}`}
    >
      <span
        className="text-[8px] leading-none font-medium sm:text-[9px]"
        style={{ color: "var(--muted)" }}
      >
        {element.number}
      </span>
      <span
        className="text-sm font-bold leading-tight sm:text-base"
        style={{
          color: CATEGORY_COLORS[element.category as Category] ?? CATEGORY_COLORS.unknown,
        }}
      >
        {element.symbol}
      </span>
      <span
        className="hidden text-[7px] leading-none truncate w-full sm:block"
        style={{ color: "var(--ink)" }}
      >
        {element.name}
      </span>
      {element.phase !== "solid" && element.phase !== "unknown" && (
        <span
          className="absolute top-[1px] right-[2px] text-[7px]"
          style={{ color: "var(--muted)" }}
          title={element.phase}
        >
          {getPhaseIcon(element.phase)}
        </span>
      )}
    </button>
  );
}
