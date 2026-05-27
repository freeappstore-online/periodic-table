import type { Category } from "./types";
import { CATEGORY_LABELS, CATEGORY_COLORS } from "./types";

const ALL_CATEGORIES: Category[] = [
  "alkali-metal",
  "alkaline-earth-metal",
  "transition-metal",
  "post-transition-metal",
  "metalloid",
  "nonmetal",
  "halogen",
  "noble-gas",
  "lanthanide",
  "actinide",
  "unknown",
];

interface CategoryFilterProps {
  active: Set<Category>;
  onToggle: (category: Category) => void;
  onClear: () => void;
}

export default function CategoryFilter({ active, onToggle, onClear }: CategoryFilterProps) {
  const anyActive = active.size > 0;

  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      <button
        onClick={onClear}
        className="rounded-full px-2.5 py-1 text-xs font-semibold border transition-colors cursor-pointer"
        style={{
          borderColor: anyActive ? "var(--line)" : "var(--accent)",
          backgroundColor: anyActive ? "transparent" : "var(--accent)",
          color: anyActive ? "var(--muted)" : "#fff",
        }}
      >
        All
      </button>
      {ALL_CATEGORIES.map((cat) => {
        const isActive = active.has(cat);
        const color = CATEGORY_COLORS[cat];
        return (
          <button
            key={cat}
            onClick={() => onToggle(cat)}
            className="rounded-full px-2.5 py-1 text-xs font-semibold border transition-all cursor-pointer"
            style={{
              borderColor: isActive ? color : "var(--line)",
              backgroundColor: isActive ? `color-mix(in srgb, ${color} 15%, transparent)` : "transparent",
              color: isActive ? color : "var(--muted)",
            }}
          >
            {CATEGORY_LABELS[cat]}
          </button>
        );
      })}
    </div>
  );
}
