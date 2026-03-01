import { useState, useRef, useCallback, useEffect } from "react";
import AISuggestion from "./components/AISuggestion";
import SearchBar from "./components/SearchBar";
import IngredientTag from "./components/IngredientTag";
import FilterControls from "./components/FilterControls";
import RecipeGrid from "./components/RecipeGrid";
import Pagination from "./components/Pagination";
import StatusView from "./components/StatusView";
import {
  useIngredients,
  useSelectedIngredients,
  useAutocomplete,
} from "./hooks/useIngredients";
import { useRecipeSearch } from "./hooks/useRecipeSearch";

export default function MasakApa() {
  const [query, setQuery] = useState("");
  const [minMatch, setMinMatch] = useState(0);
  const [exact, setExact] = useState(false);

  const allIngredients = useIngredients();
  const { selected, add, remove } = useSelectedIngredients();
  const { acItems, acOpen, acIndex, setAcIndex, close } = useAutocomplete(
    query,
    allIngredients,
    selected,
  );
  const { recipes, total, page, status, errorMsg, search } = useRecipeSearch();

  const acRef = useRef(null);
  const resultsRef = useRef(null);

  // Close autocomplete on outside click
  useEffect(() => {
    const handler = (e) => {
      if (!acRef.current?.contains(e.target)) close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [close]);

  // Scroll to results when they load
  useEffect(() => {
    if (status === "results") {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    }
  }, [status, recipes]);

  const handleSelect = useCallback(
    (item) => {
      add(item);
      setQuery("");
      close();
    },
    [add, close],
  );

  const handleAdd = () => {
    if (acItems.length > 0) {
      handleSelect(acItems[acIndex >= 0 ? acIndex : 0]);
    }
  };

  const handleKeyDown = (e) => {
    if (!acOpen || !acItems.length) {
      if (e.key === "Enter") handleSearch(1);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setAcIndex((i) => Math.min(i + 1, acItems.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAcIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      handleSelect(acItems[acIndex >= 0 ? acIndex : 0]);
    } else if (e.key === "Escape") {
      close();
    }
  };

  const handleSearch = (targetPage = 1) => {
    search({ selected, exact, minMatch, targetPage });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-200 relative overflow-x-hidden">
      {/* Background overlays */}
      <div className="fixed inset-0 grain-overlay z-0" />
      <div className="fixed inset-0 glow-top-right z-0" />
      <div className="fixed inset-0 glow-bottom-left z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Header */}
        <header className="pt-14 pb-10">
          <div className="flex items-end gap-5">
            <span className="animate-float text-6xl leading-none">🍳</span>
            <div>
              <h1
                className="font-display text-yellow-400 leading-none tracking-tight"
                style={{
                  fontSize: "clamp(3rem, 8vw, 5.5rem)",
                  fontWeight: 900,
                }}
              >
                Masak Apa?
              </h1>
              <p className="mt-2 text-stone-500 text-sm tracking-wide">
                Temukan resep dari bahan yang kamu punya
              </p>
            </div>
          </div>
          <div className="mt-6 h-px bg-linear-to-r from-yellow-500/40 via-orange-500/20 to-transparent" />
        </header>

        {/* Search */}
        <SearchBar
          query={query}
          onChange={setQuery}
          onKeyDown={handleKeyDown}
          onAdd={handleAdd}
          acItems={acItems}
          acOpen={acOpen}
          acIndex={acIndex}
          acRef={acRef}
          onSelect={handleSelect}
        />

        {/* Tags */}
        <div className="min-h-10 flex flex-wrap gap-2 mb-3">
          {selected.map((s) => (
            <IngredientTag
              key={s.id}
              name={s.name}
              onRemove={() => remove(s.id)}
            />
          ))}
        </div>

        <p className="text-xs text-stone-600 italic mb-7 h-4">
          {selected.length === 0
            ? "Tambahkan minimal satu bahan untuk mulai mencari resep."
            : `${selected.length} bahan dipilih`}
        </p>

        <AISuggestion selected={selected} />

        {/* Filters + Search button */}
        <FilterControls
          minMatch={minMatch}
          onMinMatchChange={setMinMatch}
          exact={exact}
          onExactChange={setExact}
          onSearch={() => handleSearch(1)}
          loading={status === "loading"}
          disabled={selected.length === 0}
        />

        {/* Results */}
        <div ref={resultsRef}>
          <StatusView
            status={status !== "results" ? status : null}
            errorMsg={errorMsg}
          />

          {status === "results" && (
            <>
              <RecipeGrid recipes={recipes} total={total} />
              <Pagination page={page} total={total} onPage={handleSearch} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
