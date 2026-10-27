import React from "react";

export function MetricCard({ title, value, unit, subtitle, icon: Icon, trend, trendLabel, variant = "default", onClick }) {
  const variantStyles = {
    default: "border-slate-border",
    forest: "border-slate-border",
    lime: "border-slate-border",
    warning: "border-amber-warn/40",
    danger: "border-danger/30"
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-md p-4 border ${variantStyles[variant] || variantStyles.default} ${onClick ? "cursor-pointer hover:border-forest/40" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs text-slate-muted">{title}</p>
          <div className="flex items-baseline gap-1.5 mt-1.5">
            <span className="text-2xl font-semibold tabular-nums text-charcoal">{value}</span>
            {unit && <span className="text-sm text-slate-muted">{unit}</span>}
          </div>
        </div>
        {Icon && (
          <div className="p-1.5 text-forest flex-shrink-0">
            <Icon className="w-4 h-4" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 pt-3 border-t border-slate-border flex items-center justify-between text-xs">
          {subtitle && <span className="text-slate-muted truncate">{subtitle}</span>}
          {trend && (
            <span className={`font-medium ${trend > 0 ? "text-agri" : "text-danger"}`}>
              {trend > 0 ? "+" : ""}{trend}% {trendLabel && <span className="text-slate-muted font-normal">({trendLabel})</span>}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
