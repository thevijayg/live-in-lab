import React from "react";
import { AlertTriangle, AlertCircle, CheckCircle2, Info, X } from "lucide-react";

export function AlertBanner({ type = "info", title, message, actionLabel, onAction, onClose, className = "" }) {
  const configs = {
    warning: {
      bg: "bg-amber-50/90 border-amber-300 text-amber-900",
      icon: AlertTriangle,
      iconColor: "text-amber-600",
      btn: "bg-amber-600 hover:bg-amber-700 text-white"
    },
    critical: {
      bg: "bg-rose-50/95 border-rose-300 text-rose-900",
      icon: AlertCircle,
      iconColor: "text-danger",
      btn: "bg-danger hover:bg-rose-700 text-white"
    },
    success: {
      bg: "bg-emerald-50/90 border-emerald-300 text-emerald-900",
      icon: CheckCircle2,
      iconColor: "text-agri",
      btn: "bg-agri hover:bg-forest text-white"
    },
    info: {
      bg: "bg-slate-50 border-slate-200 text-slate-800",
      icon: Info,
      iconColor: "text-forest",
      btn: "bg-forest hover:bg-forest-dark text-white"
    }
  };

  const current = configs[type] || configs.info;
  const Icon = current.icon;

  return (
    <div className={`rounded-xl border p-4 shadow-sm flex items-start gap-3 transition-all ${current.bg} ${className}`}>
      <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${current.iconColor}`} />
      <div className="flex-1 text-sm">
        {title && <h4 className="font-semibold">{title}</h4>}
        {message && <p className={`mt-0.5 ${title ? "opacity-90" : ""}`}>{message}</p>}
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-colors flex-shrink-0 ${current.btn}`}
        >
          {actionLabel}
        </button>
      )}
      {onClose && (
        <button
          onClick={onClose}
          className="p-1 rounded-md hover:bg-black/5 opacity-60 hover:opacity-100 transition-opacity"
          aria-label="Dismiss alert"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
