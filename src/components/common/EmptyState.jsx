import React from "react";
import { Sprout } from "lucide-react";

export function EmptyState({ icon: Icon = Sprout, title, description, actionLabel, onAction }) {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 text-center max-w-md mx-auto my-6">
      <div className="w-14 h-14 rounded-2xl bg-ivory-subtle text-forest flex items-center justify-center mx-auto mb-4 border border-forest/10">
        <Icon className="w-7 h-7 text-forest" />
      </div>
      <h3 className="text-base font-bold text-charcoal">{title}</h3>
      <p className="mt-1 text-sm text-slate-muted leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-forest text-white hover:bg-forest-dark transition-colors shadow-sm"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
