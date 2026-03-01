import { useState, useCallback } from "react";
import { fetchMatchRecipes } from "../utils/api";

export function useRecipeSearch() {
  const [recipes, setRecipes] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("idle"); // idle | loading | results | empty | error
  const [errorMsg, setErrorMsg] = useState("");

  const search = useCallback(
    async ({ selected, exact, minMatch, targetPage = 1 }) => {
      if (selected.length === 0) return;

      setStatus("loading");
      setPage(targetPage);

      const normalizedNames = selected.map(
        (s) => s.normalized_name || s.name.toLowerCase(),
      );

      try {
        const data = await fetchMatchRecipes({
          normalizedNames,
          page: targetPage,
          exact,
          minMatch,
        });

        if (!data.data || data.data.length === 0) {
          setStatus("empty");
        } else {
          setRecipes(data.data);
          setTotal(data.total);
          setStatus("results");
        }
      } catch {
        setErrorMsg(
          "Gagal terhubung ke server. Pastikan backend berjalan di localhost:8080",
        );
        setStatus("error");
      }
    },
    [],
  );

  return { recipes, total, page, status, errorMsg, search };
}
