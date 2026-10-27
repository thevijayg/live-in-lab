import React from "react";

export function Badge({ children, variant = "default", size = "sm" }) {
  const sizeClasses = {
    xs: "px-2 py-0.5 text-xs",
    sm: "px-2.5 py-1 text-xs font-medium",
    md: "px-3 py-1.5 text-sm font-medium"
  };

  const variantClasses = {
    default: "bg-slate-100 text-slate-700 border border-slate-200",
    success: "bg-emerald-50 text-emerald-800 border border-emerald-200",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
    danger: "bg-rose-50 text-rose-800 border border-rose-200",
    forest: "bg-forest/10 text-forest border border-forest/20",
    agri: "bg-agri/10 text-agri border border-agri/20",
    lime: "bg-lime-accent/20 text-forest-dark border border-lime-accent/40",
    outline: "bg-transparent text-charcoal border border-slate-300"
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded ${sizeClasses[size] || sizeClasses.sm} ${variantClasses[variant] || variantClasses.default}`}>
      {children}
    </span>
  );
}
