import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  ShieldCheck,
  Plus,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Clock,
  Building,
  Info,
  Calendar,
  Lock,
  History
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";
import { ConfirmDialog } from "../components/common/ConfirmDialog";

export function ConsentManagement() {
  const {
    consents,
    addConsent,
    revokeConsent,
    selectedFarm
  } = useApp();

  const [isGrantModalOpen, setIsGrantModalOpen] = useState(false);
  const [consentToRevoke, setConsentToRevoke] = useState(null);

  const [newConsentData, setNewConsentData] = useState({
    recipientName: "NABARD Agri-Credit Pilot Initiative (Sample Demo)",
    purpose: "Pre-qualification assessment for concessional solar-pump credit scheme",
    dataCategories: ["Soil Sensor Telemetry", "Crop Cycle & Harvest Estimates"],
    requestedDurationDays: 90
  });

  const availableCategories = [
    "Soil Sensor Telemetry",
    "Canopy Microclimate Logs",
    "Field Coordinates & Cadastral Boundaries",
    "Crop Cycle & Harvest Estimates",
    "Historical Irrigation Logs",
    "Uploaded Land Documentation"
  ];

  const handleCategoryToggle = (category) => {
    setNewConsentData(prev => {
      const exists = prev.dataCategories.includes(category);
      if (exists) {
        return { ...prev, dataCategories: prev.dataCategories.filter(c => c !== category) };
      } else {
        return { ...prev, dataCategories: [...prev.dataCategories, category] };
      }
    });
  };

  const handleGrantSubmit = async (e) => {
    e.preventDefault();
    if (newConsentData.dataCategories.length === 0) return;

    await addConsent({
      farmId: selectedFarm?.id,
      ...newConsentData
    });

    setIsGrantModalOpen(false);
  };

  const handleRevokeConfirm = async () => {
    if (consentToRevoke) {
      await revokeConsent(consentToRevoke.id);
      setConsentToRevoke(null);
    }
  };

  const farmConsents = consents.filter(c => c.farmId === selectedFarm?.id);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal">
              Consent-Based Data Sharing & Governance
            </h1>
            <Badge variant="forest">Finance & Trust Layer</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Empowers farmers with granular, time-bound consent controls for sharing Digital Farm Profiles with financial institutions, FPOs, and research partners.
          </p>
        </div>

        <button
          onClick={() => setIsGrantModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-forest hover:bg-forest-dark text-lime-accent shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Grant New Data Access Consent</span>
        </button>
      </div>

      {/* Trust & Architecture Governance Banner */}
      <div className="bg-ivory p-4 rounded-2xl border border-slate-border flex items-start gap-3 text-xs text-slate-muted">
        <Info className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-charcoal">Regulatory Transparency Notice:</strong> AGRINOVA adheres to privacy-by-design principles. This consent management module simulates consent token generation and authorization revocation. No official government infrastructure integration is currently claimed active. Recipient organizations are demonstration models.
        </p>
      </div>

      {/* Active Consents List */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-charcoal">Active Data-Sharing Authorizations</h3>
        {farmConsents.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-muted border border-slate-border text-xs">
            No active data sharing authorizations granted for {selectedFarm?.name}.
          </div>
        ) : (
          farmConsents.map((consent) => {
            const isRevoked = consent.status === "Revoked";

            return (
              <div
                key={consent.id}
                className={`bg-white rounded-2xl p-6 border shadow-sm transition-all text-xs space-y-4 ${
                  isRevoked ? "border-slate-200 opacity-60 bg-slate-50/50" : "border-slate-border hover:border-agri/30"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-ivory text-forest border border-slate-200">
                      <Building className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-charcoal">{consent.recipientName}</h4>
                      <span className="font-mono text-[10px] text-slate-400">Token ID: {consent.id}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge variant={isRevoked ? "default" : "agri"} size="xs">
                      {consent.status}
                    </Badge>
                    <span className="text-[11px] text-slate-400">
                      Granted: {new Date(consent.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-muted block">Authorized Purpose:</span>
                  <p className="font-medium text-charcoal mt-0.5">{consent.purpose}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-muted block mb-1">Permitted Data Categories:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {consent.dataCategories.map((cat, idx) => (
                      <Badge key={idx} variant="lime" size="xs">
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-slate-muted text-[11px]">
                  <span>Validity: {consent.requestedDurationDays} Days from grant</span>
                  {!isRevoked ? (
                    <button
                      onClick={() => setConsentToRevoke(consent)}
                      className="px-3 py-1.5 rounded-xl text-xs font-bold text-danger hover:bg-rose-50 border border-danger/30 transition-colors self-start sm:self-auto"
                    >
                      Revoke Consent Access
                    </button>
                  ) : (
                    <span className="text-danger font-semibold">
                      Revoked on {consent.revokedAt ? new Date(consent.revokedAt).toLocaleDateString() : "Historical"}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Grant New Consent Modal Form */}
      <Modal
        isOpen={isGrantModalOpen}
        onClose={() => setIsGrantModalOpen(false)}
        title="Authorize New Data Sharing Consent"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleGrantSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Select Recipient Organization
            </label>
            <select
              value={newConsentData.recipientName}
              onChange={(e) => setNewConsentData({ ...newConsentData, recipientName: e.target.value })}
              className="w-full bg-ivory text-charcoal text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            >
              <option value="NABARD Agri-Credit Pilot Initiative (Sample Demo)">NABARD Agri-Credit Pilot Initiative (Sample Demo)</option>
              <option value="Sahyadri Farmers Producer Company Ltd (FPO Demo)">Sahyadri Farmers Producer Company Ltd (FPO Demo)</option>
              <option value="AgriTech Crop Insurance Consortium (Sample Demo)">AgriTech Crop Insurance Consortium (Sample Demo)</option>
              <option value="Tamil Nadu Agricultural University Research Wing">Tamil Nadu Agricultural University Research Wing</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Stated Purpose of Data Sharing
            </label>
            <input
              type="text"
              required
              value={newConsentData.purpose}
              onChange={(e) => setNewConsentData({ ...newConsentData, purpose: e.target.value })}
              className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Authorized Data Categories (Select all that apply)
            </label>
            <div className="space-y-2 mt-2">
              {availableCategories.map((cat) => {
                const checked = newConsentData.dataCategories.includes(cat);
                return (
                  <label
                    key={cat}
                    onClick={() => handleCategoryToggle(cat)}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                      checked ? "bg-forest/5 border-forest text-charcoal font-semibold" : "bg-ivory border-slate-200 text-slate-600"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      readOnly
                      className="rounded text-forest focus:ring-agri w-4 h-4 cursor-pointer"
                    />
                    <span>{cat}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Consent Access Duration
            </label>
            <select
              value={newConsentData.requestedDurationDays}
              onChange={(e) => setNewConsentData({ ...newConsentData, requestedDurationDays: Number(e.target.value) })}
              className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            >
              <option value={30}>30 Days (Single crop cycle evaluation)</option>
              <option value={90}>90 Days (Quarterly credit review)</option>
              <option value={180}>180 Days (Half-year seasonal partnership)</option>
              <option value={365}>365 Days (Annual institutional renewal)</option>
            </select>
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsGrantModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl text-xs font-bold bg-forest hover:bg-forest-dark text-lime-accent"
            >
              Issue Consent Token
            </button>
          </div>
        </form>
      </Modal>

      {/* Revoke Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!consentToRevoke}
        onClose={() => setConsentToRevoke(null)}
        onConfirm={handleRevokeConfirm}
        title="Confirm Consent Revocation"
        message={`Are you sure you want to revoke data sharing authorization for '${consentToRevoke?.recipientName}'? The recipient will immediately lose API telemetry query privileges.`}
        confirmText="Revoke Access"
        isDanger={true}
      />
    </div>
  );
}
