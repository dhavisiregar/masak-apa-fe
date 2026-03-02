import { useEffect } from "react";

export default function RecipeModal({ recipe, onClose }) {
  const pct = Math.round(recipe.match_percentage);
  const missing = recipe.missing_ingredients || [];
  const perfect = pct === 100;

  // Parse instructions into steps
  const steps = recipe.instructions
    ? recipe.instructions.split(/\d+\.\s+/).filter(Boolean)
    : [];

  // Close on Escape
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const difficultyLabel = { easy: "Mudah", medium: "Sedang", hard: "Sulit" };
  const difficultyColor = {
    easy: "text-emerald-400",
    medium: "text-yellow-400",
    hard: "text-red-400",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative z-10 w-full sm:max-w-lg bg-stone-900 border border-stone-700 rounded-t-3xl sm:rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-6 pb-4 border-b border-stone-800">
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-linear-to-r from-yellow-400 to-orange-500" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white transition-colors"
          >
            ✕
          </button>
          <h2 className="font-display text-xl font-bold text-stone-100 pr-10 leading-snug">
            {recipe.title}
          </h2>

          {/* Meta */}
          <div className="flex items-center gap-4 mt-3">
            {recipe.cooking_time > 0 && (
              <span className="text-xs text-stone-400 flex items-center gap-1">
                🕐 {recipe.cooking_time} menit
              </span>
            )}
            {recipe.difficulty && (
              <span
                className={`text-xs font-medium ${difficultyColor[recipe.difficulty] || "text-stone-400"}`}
              >
                ★ {difficultyLabel[recipe.difficulty] || recipe.difficulty}
              </span>
            )}
            {perfect ? (
              <span className="text-xs text-emerald-400 bg-emerald-900/30 border border-emerald-700/40 rounded-full px-2 py-0.5">
                ✓ Semua bahan ada!
              </span>
            ) : (
              <span className="text-xs text-yellow-400">{pct}% cocok</span>
            )}
          </div>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 p-6 space-y-5">
          {/* Missing ingredients */}
          {missing.length > 0 && (
            <div>
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

          {/* Steps */}
          {steps.length > 0 && (
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500 mb-3">
                Cara Masak:
              </p>
              <ol className="space-y-3">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-400 text-xs flex items-center justify-center font-bold">
                      {i + 1}
                    </span>
                    <p className="text-sm text-stone-300 leading-relaxed pt-0.5">
                      {step.trim()}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
