export default function IngredientTag({ name, onRemove }) {
  return (
    <span className="animate-tag-in inline-flex items-center gap-2 bg-stone-800 border border-stone-700 rounded-full px-4 py-1.5 text-sm text-stone-200">
      <span className="text-yellow-400 text-xs">◆</span>
      {name}
      <button
        onClick={onRemove}
        className="text-stone-500 hover:text-red-400 transition-colors text-base leading-none ml-0.5"
      >
        ×
      </button>
    </span>
  );
}
