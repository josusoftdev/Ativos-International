import React from "react";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  icon?: React.ReactNode;
}

export function StatCard({
  label,
  value,
  sub,
  trend,
  trendValue,
  icon,
}: StatCardProps) {
  const trendColor =
    trend === "up"
      ? "text-emerald-400"
      : trend === "down"
        ? "text-rose-400"
        : "text-slate-400";

  const trendArrow = trend === "up" ? "↑" : trend === "down" ? "↓" : "";

  return (
    <div className="card-glow rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur-sm">
      <div className="flex items-start justify-between">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          {label}
        </p>
        {icon && (
          <span className="rounded-lg bg-slate-800 p-2 text-slate-400">
            {icon}
          </span>
        )}
      </div>
      <p className="mt-3 text-3xl font-bold tracking-tight text-slate-100">
        {value}
      </p>
      {(sub ?? trendValue) && (
        <div className="mt-2 flex items-center gap-2">
          {trendValue && (
            <span className={`text-xs font-semibold ${trendColor}`}>
              {trendArrow} {trendValue}
            </span>
          )}
          {sub && <span className="text-xs text-slate-500">{sub}</span>}
        </div>
      )}
    </div>
  );
}
