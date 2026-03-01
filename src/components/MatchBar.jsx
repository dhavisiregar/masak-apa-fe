export default function MatchBar({ pct }) {
  const color =
    pct === 100
      ? "from-emerald-500 to-emerald-400"
      : pct >= 75
        ? "from-yellow-600 to-yellow-400"
        : pct >= 50
          ? "from-orange-600 to-yellow-500"
          : "from-red-700 to-orange-500";

  return (
    <div className="mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs uppercase tracking-widest text-stone-500">
          Kecocokan
        </span>
        <span className="text-sm font-medium text-yellow-400">{pct}%</span>
      </div>
      <div className="h-1.5 bg-stone-800 rounded-full overflow-hidden">
        <div
          className={`bar-fill h-full rounded-full bg-linear-to-r ${color}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
