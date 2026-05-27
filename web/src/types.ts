export type Phase = "solid" | "liquid" | "gas" | "unknown";

export type Category =
  | "alkali-metal"
  | "alkaline-earth-metal"
  | "transition-metal"
  | "post-transition-metal"
  | "metalloid"
  | "nonmetal"
  | "halogen"
  | "noble-gas"
  | "lanthanide"
  | "actinide"
  | "unknown";

export interface Element {
  number: number;
  symbol: string;
  name: string;
  mass: number;
  category: Category;
  phase: Phase;
  electronConfiguration: string;
  discoveryYear: number | null;
  meltingPoint: number | null; // Kelvin
  boilingPoint: number | null; // Kelvin
  electronegativity: number | null; // Pauling scale
  atomicRadius: number | null; // pm
  ionizationEnergy: number | null; // kJ/mol
  description: string;
  row: number; // 1-based grid row
  col: number; // 1-based grid column (1-18)
}

export type TrendKey = "electronegativity" | "atomicRadius" | "ionizationEnergy";

export const CATEGORY_LABELS: Record<Category, string> = {
  "alkali-metal": "Alkali Metal",
  "alkaline-earth-metal": "Alkaline Earth Metal",
  "transition-metal": "Transition Metal",
  "post-transition-metal": "Post-transition Metal",
  metalloid: "Metalloid",
  nonmetal: "Nonmetal",
  halogen: "Halogen",
  "noble-gas": "Noble Gas",
  lanthanide: "Lanthanide",
  actinide: "Actinide",
  unknown: "Unknown",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  "alkali-metal": "#ef4444",
  "alkaline-earth-metal": "#f97316",
  "transition-metal": "#eab308",
  "post-transition-metal": "#22c55e",
  metalloid: "#14b8a6",
  nonmetal: "#06b6d4",
  halogen: "#8b5cf6",
  "noble-gas": "#ec4899",
  lanthanide: "#f472b6",
  actinide: "#a78bfa",
  unknown: "#6b7280",
};

/** Slightly muted background versions for element cells */
export const CATEGORY_BG_COLORS: Record<Category, string> = {
  "alkali-metal": "rgba(239, 68, 68, 0.15)",
  "alkaline-earth-metal": "rgba(249, 115, 22, 0.15)",
  "transition-metal": "rgba(234, 179, 8, 0.15)",
  "post-transition-metal": "rgba(34, 197, 94, 0.15)",
  metalloid: "rgba(20, 184, 166, 0.15)",
  nonmetal: "rgba(6, 182, 212, 0.15)",
  halogen: "rgba(139, 92, 246, 0.15)",
  "noble-gas": "rgba(236, 72, 153, 0.15)",
  lanthanide: "rgba(244, 114, 182, 0.15)",
  actinide: "rgba(167, 139, 250, 0.15)",
  unknown: "rgba(107, 114, 128, 0.15)",
};
