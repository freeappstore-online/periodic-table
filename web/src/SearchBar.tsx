interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4"
        style={{ color: "var(--muted)" }}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
      </svg>
      <input
        type="text"
        placeholder="Search by name, symbol, or number..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border py-2 pl-9 pr-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
        style={{
          backgroundColor: "var(--panel)",
          borderColor: "var(--line)",
          color: "var(--ink)",
        }}
      />
      {value && (
        <button
          onClick={() => onChange("")}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center rounded-full hover:bg-[var(--line)] transition-colors cursor-pointer"
          style={{ color: "var(--muted)" }}
          aria-label="Clear search"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 3l6 6M9 3l-6 6" />
          </svg>
        </button>
      )}
    </div>
  );
}
