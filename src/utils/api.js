import { API, LIMIT } from "./constants";

export async function fetchIngredients() {
  const res = await fetch(`${API}/ingredients`);
  if (!res.ok) throw new Error("Failed to fetch ingredients");
  const data = await res.json();
  const normalized = Array.isArray(data)
    ? data.map((i) => ({
        id: i.ID ?? i.id,
        name: i.Name ?? i.name,
        normalized_name: (
          i.NormalizedName ||
          i.normalized_name ||
          i.Name ||
          i.name ||
          ""
        ).toLowerCase(),
      }))
    : [];
  return normalized;
}

export async function fetchMatchRecipes({
  normalizedNames,
  page,
  exact,
  minMatch,
}) {
  let url = `${API}/match-recipes?page=${page}&limit=${LIMIT}`;
  if (exact) url += `&exact=true`;
  else url += `&min_match=${minMatch}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ingredients: normalizedNames }),
  });

  if (!res.ok) throw new Error("Failed to fetch recipes");
  return res.json();
}
