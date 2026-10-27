import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Filter,
  Search,
  Check,
  Cpu,
  Droplets,
  Thermometer,
  Info
} from "lucide-react";
import { Badge } from "../components/common/Badge";

export function RiskMonitoring() {
  const { risks, updateRiskStatus, selectedFarm } = useApp();

  const [selectedSeverity, setSelectedSeverity] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const filteredRisks = risks.filter(r => {
    const matchesSev = !selectedSeverity || r.severity.toLowerCase() === selectedSeverity.toLowerCase();
    const matchesStatus = !selectedStatus || r.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSev && matchesStatus;
  });

  const activeRisks = filteredRisks.filter(r => r.status === "Active");
  const resolvedRisks = filteredRisks.filter(r => r.status !== "Active");

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">
              Risks
            </h1>
            <Badge variant="warning">{activeRisks.length} open</Badge>
          </div>
          <p className="text-sm text-slate-muted mt-1">
            Moisture falling too far, heat on the canopy, or a probe that stopped reporting.
          </p>
        </div>
      </div>

      {/* Distinction Disclaimer Banner */}
      <div className="bg-ivory p-4 rounded-2xl border border-slate-border flex items-start gap-3 text-xs text-slate-muted">
        <Info className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-charcoal">Telemetry Distinction Notice:</strong> Observed risk indicators represent mathematical deviations from established physiological baselines (e.g., low soil water tension or thermal stress). AGRINOVA does not claim to diagnose unseen biological pest or viral infections without optical or lab assay confirmation.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-border shadow-sm flex flex-wrap items-center gap-3 text-xs">
        <select
          value={selectedSeverity}
          onChange={(e) => setSelectedSeverity(e.target.value)}
          className="bg-ivory text-charcoal px-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
        >
          <option value="">All Severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-ivory text-charcoal px-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
        >
          <option value="">All Statuses</option>
          <option value="Active">Active</option>
          <option value="Acknowledged">Acknowledged</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {/* Active Risks Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-charcoal">Active Farm Risks</h3>
        {activeRisks.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-muted border border-slate-border text-xs">
            🎉 No active risk conditions detected. All telemetric parameters are within normal variance.
          </div>
        ) : (
          activeRisks.map((risk) => {
            const isCritical = risk.severity === "Critical";
            const isHigh = risk.severity === "High";

            return (
              <div
                key={risk.id}
                className={`bg-white rounded-2xl p-5 sm:p-6 border shadow-sm transition-all text-xs space-y-3 ${
                  isCritical ? "border-rose-300 bg-rose-50/20" : isHigh ? "border-amber-300 bg-amber-50/15" : "border-slate-border"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Badge variant={isCritical ? "danger" : isHigh ? "warning" : "default"} size="sm">
                      {risk.severity} Severity
                    </Badge>
                    <span className="font-bold text-charcoal">{risk.category}</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-muted text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Detected {new Date(risk.detectionTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm sm:text-base font-bold text-charcoal">{risk.title}</h4>
                  <p className="mt-1 font-mono text-[11px] text-slate-600 bg-ivory p-2.5 rounded-xl border border-slate-200/80">
                    Supporting Data: {risk.supportingData}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-forest/5 border border-forest/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-forest block">Suggested Action:</span>
                    <span className="font-semibold text-charcoal">{risk.suggestedAction}</span>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => updateRiskStatus(risk.id, "Acknowledged")}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-ivory text-charcoal hover:bg-slate-100 border border-slate-border transition-colors"
                    >
                      Acknowledge
                    </button>
                    <button
                      onClick={() => updateRiskStatus(risk.id, "Resolved")}
                      className="btn-primary text-xs py-1.5 px-3"
                    >
                      Mark Resolved
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Historical / Acknowledged Risks Table */}
      {resolvedRisks.length > 0 && (
        <div className="panel p-5 space-y-4">
          <h3 className="text-sm font-bold text-charcoal">Resolved & Acknowledged Risk Log</h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-ivory border-b border-slate-100 text-slate-muted font-bold uppercase text-[10px]">
                  <th className="py-2.5 px-3">Risk Category</th>
                  <th className="py-2.5 px-3">Title</th>
                  <th className="py-2.5 px-3">Severity</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {resolvedRisks.map(r => (
                  <tr key={r.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-charcoal">{r.category}</td>
                    <td className="py-2.5 px-3">{r.title}</td>
                    <td className="py-2.5 px-3">{r.severity}</td>
                    <td className="py-2.5 px-3">
                      <Badge variant="default" size="xs">{r.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
