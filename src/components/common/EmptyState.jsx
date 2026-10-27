import React from "react";
import { Sprout } from "lucide-react";

export function EmptyState({ icon: Icon = Sprout, title, description, actionLabel, onAction }) {
  return (
    <div className="bg-white rounded-md border border-dashed border-slate-border p-8 text-center max-w-md mx-auto my-6">
      <div className="w-10 h-10 text-forest flex items-center justify-center mx-auto mb-4">
        <Icon className="w-6 h-6 text-forest" />
      </div>
      <h3 className="font-sans text-base font-semibold text-charcoal">{title}</h3>
      <p className="mt-1 text-sm text-slate-muted leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="btn-primary mt-5"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}
