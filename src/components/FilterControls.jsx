export default function FilterControls({
  minMatch,
  onMinMatchChange,
  exact,
  onExactChange,
  onSearch,
  loading,
  disabled,
}) {
  return (
    <div className="flex flex-wrap items-center gap-6 mb-10">
      {/* Min match slider */}
      <div
        className={`flex items-center gap-3 transition-opacity ${exact ? "opacity-30 pointer-events-none" : ""}`}
      >
        <span className="text-xs uppercase tracking-widest text-stone-500">
          Min. Cocok
        </span>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          value={minMatch}
          onChange={(e) => onMinMatchChange(Number(e.target.value))}
          className="w-28"
        />
        <span className="text-sm font-medium text-yellow-400 min-w-10">
          {minMatch}%
        </span>
      </div>

      {/* Exact match toggle */}
      <label className="flex items-center gap-2.5 cursor-pointer select-none">
        <div
          className={`toggle-track relative w-10 h-5 rounded-full ${exact ? "bg-orange-600" : "bg-stone-700"}`}
          onClick={() => onExactChange(!exact)}
        >
          <div
            className="toggle-thumb absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow"
            style={{ transform: exact ? "translateX(20px)" : "translateX(0)" }}
          />
        </div>
        <span className="text-xs uppercase tracking-widest text-stone-400">
          Exact match
        </span>
      </label>

      {/* Search button */}
      <button
        onClick={onSearch}
        disabled={disabled || loading}
        className="ml-auto bg-linear-to-br from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 disabled:opacity-40 disabled:cursor-not-allowed text-white font-medium text-sm px-7 py-3 rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-orange-900/30"
      >
        {loading ? (
          <>
            <div className="animate-spin-custom w-4 h-4 rounded-full border-2 border-white/30 border-t-white" />
            Mencari...
          </>
        ) : (
          <>🔍 Cari Resep</>
        )}
      </button>
    </div>
  );
}
