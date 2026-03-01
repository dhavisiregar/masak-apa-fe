import { LIMIT } from "../utils/constants";

export default function Pagination({ page, total, onPage }) {
  const totalPages = Math.ceil(total / LIMIT);
  if (totalPages <= 1) return null;

  const pages = [];
  for (let p = 1; p <= totalPages; p++) {
    if (
      totalPages > 7 &&
      p > 3 &&
      p < totalPages - 1 &&
      Math.abs(p - page) > 1
    ) {
      if (p === 4 || p === totalPages - 2)
        pages.push({ type: "ellipsis", key: `e${p}` });
      continue;
    }
    pages.push({ type: "page", num: p, key: p });
  }

  const btnBase =
    "w-9 h-9 rounded-lg text-sm transition-colors flex items-center justify-center border";

  return (
    <div className="flex justify-center gap-2 mt-8 mb-12">
      <button
        onClick={() => onPage(page - 1)}
        disabled={page === 1}
        className={`${btnBase} border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-100 disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        ←
      </button>

      {pages.map((p) =>
        p.type === "ellipsis" ? (
          <span
            key={p.key}
            className={`${btnBase} border-transparent text-stone-600`}
          >
            …
          </span>
        ) : (
          <button
            key={p.key}
            onClick={() => onPage(p.num)}
            className={`${btnBase} ${
              p.num === page
                ? "bg-yellow-400 border-yellow-400 text-stone-900 font-medium"
                : "bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-100"
            }`}
          >
            {p.num}
          </button>
        ),
      )}

      <button
        onClick={() => onPage(page + 1)}
        disabled={page === totalPages}
        className={`${btnBase} border-stone-800 bg-stone-900 text-stone-400 hover:text-stone-100 disabled:opacity-30 disabled:cursor-not-allowed`}
      >
        →
      </button>
    </div>
  );
}
