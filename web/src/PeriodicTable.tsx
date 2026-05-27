import { useMemo } from "react";
import type { Element, TrendKey, Category } from "./types";
import { elements } from "./data";
import ElementCell from "./ElementCell";

interface PeriodicTableProps {
  searchQuery: string;
  activeCategories: Set<Category>;
  trendMode: TrendKey | null;
  selectedElement: Element | null;
  onSelectElement: (element: Element) => void;
}

function getTrendMinMax(key: TrendKey): { min: number; max: number } {
  let min = Infinity;
  let max = -Infinity;
  for (const el of elements) {
    const v = el[key];
    if (v !== null) {
      if (v < min) min = v;
      if (v > max) max = v;
    }
  }
  return { min, max };
}

export default function PeriodicTable({
  searchQuery,
  activeCategories,
  trendMode,
  selectedElement,
  onSelectElement,
}: PeriodicTableProps) {
  const query = searchQuery.trim().toLowerCase();

  const searchMatches = useMemo(() => {
    if (!query) return null;
    const matches = new Set<number>();
    for (const el of elements) {
      if (
        el.name.toLowerCase().includes(query) ||
        el.symbol.toLowerCase().includes(query) ||
        String(el.number) === query
      ) {
        matches.add(el.number);
      }
    }
    return matches;
  }, [query]);

  const trendRange = useMemo(() => {
    if (!trendMode) return null;
    return getTrendMinMax(trendMode);
  }, [trendMode]);

  return (
    <div className="w-full overflow-x-auto pb-4">
      <div
        className="grid gap-[2px] sm:gap-1 mx-auto"
        style={{
          gridTemplateColumns: "repeat(18, minmax(28px, 1fr))",
          gridTemplateRows: "repeat(10, minmax(28px, auto))",
          maxWidth: "1100px",
          minWidth: "560px",
        }}
      >
        {/* Lanthanide/Actinide labels */}
        <div
          className="flex items-center justify-end pr-1 text-[9px] font-semibold"
          style={{ gridRow: 9, gridColumn: "1 / 3", color: "var(--muted)" }}
        >
          57-71
        </div>
        <div
          className="flex items-center justify-end pr-1 text-[9px] font-semibold"
          style={{ gridRow: 10, gridColumn: "1 / 3", color: "var(--muted)" }}
        >
          89-103
        </div>

        {/* Spacer row between main table and Ln/An rows */}
        <div style={{ gridRow: 8, gridColumn: "1 / 19", height: "8px" }} />

        {elements.map((el) => {
          const isSearchMatch = searchMatches === null || searchMatches.has(el.number);
          const isCategoryMatch =
            activeCategories.size === 0 || activeCategories.has(el.category);
          const isHighlighted = isSearchMatch && isCategoryMatch;
          const isDimmed = !isHighlighted;
          const isSelected = selectedElement?.number === el.number;

          let trendValue = 0;
          if (trendMode && trendRange) {
            const v = el[trendMode];
            if (v !== null && trendRange.max !== trendRange.min) {
              trendValue = (v - trendRange.min) / (trendRange.max - trendRange.min);
            }
          }

          return (
            <ElementCell
              key={el.number}
              element={el}
              isHighlighted={isHighlighted}
              isDimmed={isDimmed}
              isSelected={isSelected}
              trendMode={trendMode}
              trendValue={trendValue}
              onClick={onSelectElement}
            />
          );
        })}
      </div>
    </div>
  );
}
