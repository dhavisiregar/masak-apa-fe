import { useState, useEffect } from "react";
import { API } from "../utils/constants";

export default function AISuggestion({ selected }) {
  const [suggestion, setSuggestion] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selected.length === 0) {
      setSuggestion("");
      return;
    }

    const timeout = setTimeout(async () => {
      setLoading(true);
      setSuggestion("");

      try {
        const res = await fetch(`${API}/suggest`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ingredients: selected.map((s) => s.name),
          }),
        });

        const data = await res.json();
        setSuggestion(data.suggestion ?? "");
      } catch {
        setSuggestion("");
      } finally {
        setLoading(false);
      }
    }, 600);

    return () => clearTimeout(timeout);
  }, [selected]);

  if (selected.length === 0) return null;

  return (
    <div className="mb-5 flex items-center gap-3 min-h-7">
      <span className="text-xs uppercase tracking-widest text-stone-500 shrink-0">
        💡 Bisa masak
      </span>
      {loading ? (
        <div className="flex gap-1 items-center">
          <span
            className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-1.5 h-1.5 bg-yellow-400 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
      ) : suggestion ? (
        <p className="text-sm text-yellow-300 font-medium animate-fade-in">
          {suggestion}
        </p>
      ) : null}
    </div>
  );
}
