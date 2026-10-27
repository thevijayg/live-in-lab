import React from "react";
import { Modal } from "./Modal";
import { AlertTriangle } from "lucide-react";

export function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", isDanger = false }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} maxWidth="max-w-md">
      <div className="flex items-start gap-4">
        <div className={`p-3 rounded-full flex-shrink-0 ${isDanger ? "bg-rose-100 text-danger" : "bg-amber-100 text-amber-warn"}`}>
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-slate-muted leading-relaxed">{message}</p>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={() => {
            onConfirm();
            onClose();
          }}
          className={`px-4 py-2 rounded-md text-sm font-medium text-cream ${
            isDanger ? "bg-danger hover:bg-rose-800" : "bg-forest hover:bg-forest-dark"
          }`}
        >
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
