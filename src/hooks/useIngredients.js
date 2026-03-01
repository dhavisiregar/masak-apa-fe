import { useState, useEffect, useCallback } from "react";
import { fetchIngredients } from "../utils/api";

export function useIngredients() {
  const [allIngredients, setAllIngredients] = useState([]);

  useEffect(() => {
    fetchIngredients()
      .then(setAllIngredients)
      .catch(() => {});
  }, []);

  return allIngredients;
}

export function useSelectedIngredients() {
  const [selected, setSelected] = useState([]);

  const add = useCallback((item) => {
    if (!item) return;
    setSelected((prev) => {
      if (prev.find((s) => s.id === item.id)) return prev;
      return [...prev, item];
    });
  }, []);

  const remove = useCallback((id) => {
    setSelected((prev) => prev.filter((s) => s.id !== id));
  }, []);

  return { selected, add, remove };
}

export function useAutocomplete(query, allIngredients, selected) {
  const [acItems, setAcItems] = useState([]);
  const [acOpen, setAcOpen] = useState(false);
  const [acIndex, setAcIndex] = useState(-1);

  useEffect(() => {
    if (!query.trim()) {
      setAcItems([]);
      setAcOpen(false);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allIngredients
      .filter(
        (i) =>
          i?.name &&
          i.name.toLowerCase().includes(q) &&
          !selected.find((s) => s.id === i.id),
      )
      .slice(0, 8);
    setAcItems(filtered);
    setAcOpen(filtered.length > 0);
    setAcIndex(-1);
  }, [query, allIngredients, selected]);

  const close = useCallback(() => setAcOpen(false), []);

  return { acItems, acOpen, acIndex, setAcIndex, close };
}
