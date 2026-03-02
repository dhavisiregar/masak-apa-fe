import { useState } from "react";
import RecipeCard from "./RecipeCard";
import RecipeModal from "./RecipeModal";

export default function RecipeGrid({ recipes, total }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="animate-fade-in">
      <div className="flex items-baseline justify-between mb-5">
        <h2 className="font-display text-2xl font-bold text-stone-100">
          Hasil Resep
        </h2>
        <span className="text-xs text-stone-500 uppercase tracking-widest">
          {total} resep
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((r, i) => (
          <RecipeCard key={r.id} recipe={r} index={i} onClick={setSelected} />
        ))}
      </div>

      {selected && (
        <RecipeModal recipe={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
