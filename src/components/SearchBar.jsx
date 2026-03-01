import { useRef, useEffect } from "react";

export default function SearchBar({
  query,
  onChange,
  onKeyDown,
  onAdd,
  acItems,
  acOpen,
  acIndex,
  acRef,
  onSelect,
}) {
  const inputRef = useRef(null);

  return (
    <div className="relative mb-4">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Ketik nama bahan... (e.g. telur, tahu, bayam)"
            className="w-full bg-stone-900 border border-stone-800 rounded-xl px-5 py-3.5 text-stone-200 placeholder-stone-600 text-sm outline-none focus:border-yellow-500/60 focus:ring-2 focus:ring-yellow-500/10 transition-all"
          />

          {acOpen && (
            <div
              ref={acRef}
              className="animate-fade-in absolute top-full mt-2 left-0 right-0 bg-stone-900 border border-stone-800 rounded-xl overflow-hidden shadow-2xl z-50 max-h-56 overflow-y-auto"
            >
              {acItems.map((item, i) => (
                <div
                  key={item.id}
                  onMouseDown={() => onSelect(item)}
                  className={`ac-item px-5 py-3 text-sm cursor-pointer text-stone-300 flex items-center gap-2.5 transition-colors ${
                    i === acIndex ? "ac-active" : ""
                  }`}
                >
                  <span className="text-yellow-600 text-xs">◆</span>
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={onAdd}
          className="bg-yellow-400 hover:bg-yellow-300 text-stone-900 font-medium text-sm px-5 rounded-xl transition-colors"
        >
          Tambah
        </button>
      </div>
    </div>
  );
}
