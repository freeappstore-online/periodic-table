import { useState, useCallback } from "react";
import type { Element, Category, TrendKey } from "./types";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import TrendSelector from "./TrendSelector";
import PeriodicTable from "./PeriodicTable";
import ElementDetail from "./ElementDetail";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategories, setActiveCategories] = useState<Set<Category>>(new Set());
  const [trendMode, setTrendMode] = useState<TrendKey | null>(null);
  const [selectedElement, setSelectedElement] = useState<Element | null>(null);

  const handleToggleCategory = useCallback((category: Category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }, []);

  const handleClearCategories = useCallback(() => {
    setActiveCategories(new Set());
  }, []);

  const handleSelectElement = useCallback((element: Element) => {
    setSelectedElement(element);
  }, []);

  const handleCloseDetail = useCallback(() => {
    setSelectedElement(null);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--paper)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-30 border-b backdrop-blur-md"
        style={{
          backgroundColor: "var(--glass)",
          borderColor: "var(--line)",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 py-3 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <h1
              className="text-xl font-extrabold tracking-tight sm:text-2xl shrink-0"
              style={{ fontFamily: "'Fraunces', serif", color: "var(--ink)" }}
            >
              <span style={{ color: "var(--accent)" }}>Periodic</span> Table
            </h1>
            <div className="flex-1 max-w-md">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
          </div>

          {/* Filters row */}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <CategoryFilter
              active={activeCategories}
              onToggle={handleToggleCategory}
              onClear={handleClearCategories}
            />
            <TrendSelector active={trendMode} onSelect={setTrendMode} />
          </div>
        </div>
      </header>

      {/* Table */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 py-6">
        <PeriodicTable
          searchQuery={searchQuery}
          activeCategories={activeCategories}
          trendMode={trendMode}
          selectedElement={selectedElement}
          onSelectElement={handleSelectElement}
        />

        {/* Legend */}
        <div className="mt-6 text-xs" style={{ color: "var(--muted)" }}>
          <p>
            Click any element to see detailed properties. Use the search bar to find elements by name, symbol, or atomic number.
            Filter by category or visualize trends across the table.
          </p>
          <p className="mt-1">
            Phase indicators: <span className="font-mono">~</span> = liquid at room temperature,{" "}
            <span className="font-mono">...</span> = gas, <span className="font-mono">?</span> = unknown.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t py-4 text-center text-xs"
        style={{
          borderColor: "var(--line)",
          color: "var(--muted)",
        }}
      >
        Periodic Table Explorer &mdash;{" "}
        <a
          href="https://freeappstore.online"
          className="underline hover:text-[var(--accent)]"
          target="_blank"
          rel="noopener noreferrer"
        >
          FreeAppStore
        </a>
      </footer>

      {/* Detail modal */}
      {selectedElement && (
        <ElementDetail element={selectedElement} onClose={handleCloseDetail} />
      )}
    </div>
  );
}
