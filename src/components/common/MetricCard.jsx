import React from "react";

export function MetricCard({ title, value, unit, subtitle, icon: Icon, trend, trendLabel, variant = "default", onClick }) {
  const variantStyles = {
    default: "border-slate-border hover:border-agri/40",
    forest: "border-forest/30 bg-gradient-to-br from-white to-forest/5",
    lime: "border-lime-accent/50 bg-gradient-to-br from-white to-lime-soft",
    warning: "border-amber-warn/40 bg-gradient-to-br from-white to-amber-50/40",
    danger: "border-danger/30 bg-gradient-to-br from-white to-rose-50/40"
  };

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border shadow-sm transition-all duration-200 ${variantStyles[variant] || variantStyles.default} ${onClick ? "cursor-pointer hover:shadow-md" : ""}`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-muted">{title}</p>
          <div className="flex items-baseline gap-1.5 mt-2">
            <span className="text-2xl lg:text-3xl font-bold text-charcoal">{value}</span>
            {unit && <span className="text-sm font-semibold text-slate-muted">{unit}</span>}
          </div>
        </div>
        {Icon && (
          <div className="p-2.5 rounded-xl bg-ivory-subtle text-forest border border-forest/10 flex-shrink-0">
            <Icon className="w-5 h-5 text-forest" />
          </div>
        )}
      </div>

      {(subtitle || trend) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {subtitle && <span className="text-slate-muted truncate">{subtitle}</span>}
          {trend && (
            <span className={`font-semibold flex items-center gap-0.5 ${trend > 0 ? "text-agri" : "text-danger"}`}>
              {trend > 0 ? "+" : ""}{trend}% {trendLabel && <span className="text-slate-muted font-normal">({trendLabel})</span>}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
