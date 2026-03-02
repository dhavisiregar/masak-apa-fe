import MatchBar from "./MatchBar";

export default function RecipeCard({ recipe, index, onClick }) {
  const pct = Math.round(recipe.match_percentage);
  const missing = recipe.missing_ingredients || [];
  const perfect = pct === 100;

  return (
    <div
      className="animate-card-in card-hover relative bg-stone-900 border border-stone-800 rounded-2xl p-5 cursor-pointer overflow-hidden"
      style={{ animationDelay: `${index * 0.06}s` }}
      onClick={() => onClick(recipe)}
    >
      <div className="card-bar-accent absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-yellow-400 to-orange-500" />

      <h3 className="font-display text-base font-bold text-stone-100 mb-3 leading-snug">
        {recipe.title}
      </h3>

      <MatchBar pct={pct} />

      {perfect && (
        <div className="inline-flex items-center gap-1.5 bg-emerald-900/30 border border-emerald-700/40 rounded-full px-3 py-1 text-xs text-emerald-400 mb-2">
          <span>✓</span> Semua bahan tersedia!
        </div>
      )}

      {missing.length > 0 && (
        <div className="mt-2">
          <p className="text-xs uppercase tracking-widest text-red-400/70 mb-2">
            Bahan kurang:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {missing.map((m, i) => (
              <span
                key={i}
                className="bg-red-950/40 border border-red-800/30 rounded-full px-2.5 py-0.5 text-xs text-red-300"
              >
                {m}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Click hint */}
      <p className="mt-3 text-xs text-stone-600 flex items-center gap-1">
        <span>👆</span> Tap untuk lihat cara masak
      </p>
    </div>
  );
}
