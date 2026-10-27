import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Droplets,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Activity,
  History,
  Sliders,
  Calendar,
  Layers,
  Info
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from "recharts";

export function IrrigationAdvisory() {
  const {
    selectedFarm,
    currentFarmFields,
    currentFarmSensors,
    irrigationLogs,
    addIrrigationLog
  } = useApp();

  const [selectedFieldId, setSelectedFieldId] = useState(currentFarmFields[0]?.id || "");
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [isThresholdModalOpen, setIsThresholdModalOpen] = useState(false);

  const activeField = currentFarmFields.find(f => f.id === selectedFieldId) || currentFarmFields[0];
  const moistureSensor = currentFarmSensors.find(s => s.type === "Soil Moisture" && s.fieldId === activeField?.id)
    || currentFarmSensors.find(s => s.type === "Soil Moisture");

  const [thresholds, setThresholds] = useState({
    min: activeField?.soilMoistureTarget?.min || 45,
    max: activeField?.soilMoistureTarget?.max || 70
  });

  // Irrigation log form state
  const [logFormData, setLogFormData] = useState({
    date: new Date().toISOString().split("T")[0],
    method: "Drip Irrigation",
    durationMinutes: 90,
    waterQuantityLiters: 3600,
    isEstimated: false,
    notes: ""
  });

  const handleLogSubmit = async (e) => {
    e.preventDefault();
    await addIrrigationLog({
      farmId: selectedFarm?.id,
      fieldId: activeField?.id,
      fieldName: activeField?.name,
      ...logFormData
    });
    setIsLogModalOpen(false);
  };

  // Advisory status evaluation
  let advisoryStatus = "Moisture Adequate";
  let statusVariant = "agri";
  let statusExplanation = "Soil moisture is comfortably inside the target agronomic band for root-depth transpiration.";

  if (!moistureSensor) {
    advisoryStatus = "Sensor Data Unavailable";
    statusVariant = "default";
    statusExplanation = "No active soil moisture probe found in this parcel. Readings cannot be verified.";
  } else if (moistureSensor.latestReading < thresholds.min) {
    advisoryStatus = "Irrigation May Be Needed";
    statusVariant = "danger";
    statusExplanation = `Moisture at ${moistureSensor.latestReading}% has fallen below minimum threshold (${thresholds.min}%). Schedule water application to prevent stomatal closure.`;
  } else if (moistureSensor.latestReading < thresholds.min + 5) {
    advisoryStatus = "Monitor Moisture";
    statusVariant = "warning";
    statusExplanation = `Moisture at ${moistureSensor.latestReading}% is approaching lower boundary (${thresholds.min}%). Monitor hourly evapotranspiration.`;
  }

  // Moisture trend curve
  const moistureCurve = [
    { time: "06:00", value: (moistureSensor?.latestReading || 50) + 4 },
    { time: "09:00", value: (moistureSensor?.latestReading || 50) + 2 },
    { time: "12:00", value: (moistureSensor?.latestReading || 50) - 2 },
    { time: "15:00", value: (moistureSensor?.latestReading || 50) - 3 },
    { time: "18:00", value: (moistureSensor?.latestReading || 50) - 1 },
    { time: "21:00", value: (moistureSensor?.latestReading || 50) }
  ];

  const totalLoggedWater = irrigationLogs
    .filter(l => l.farmId === selectedFarm?.id)
    .reduce((sum, l) => sum + (l.waterQuantityLiters || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">
              Irrigation
            </h1>
            <Badge variant="outline">Moisture vs crop stage</Badge>
          </div>
          <p className="text-sm text-slate-muted mt-1">
            Whether this plot should run a cycle, based on root-zone moisture and growth stage.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => setIsThresholdModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-ivory text-charcoal hover:bg-slate-100 border border-slate-border transition-colors shadow-sm"
          >
            <Sliders className="w-3.5 h-3.5 text-forest" />
            <span>Adjust Thresholds</span>
          </button>
          <button
            onClick={() => setIsLogModalOpen(true)}
            className="btn-primary text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Record Irrigation Event</span>
          </button>
        </div>
      </div>

      {/* Advisory Status Banner Card */}
      <div className="panel p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center gap-3">
            <div className={`p-3 rounded-2xl ${
              advisoryStatus.includes("Needed")
                ? "bg-rose-100 text-danger"
                : advisoryStatus.includes("Monitor")
                ? "bg-amber-100 text-amber-warn"
                : "bg-emerald-100 text-agri"
            }`}>
              <Droplets className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-muted">Advisory Engine Output</span>
              <h2 className="text-xl sm:text-2xl font-semibold text-charcoal">{advisoryStatus}</h2>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted leading-relaxed">
            {statusExplanation}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-muted pt-1">
            <span>Crop: <strong className="text-forest font-semibold">{activeField?.crop}</strong></span>
            <span>•</span>
            <span>Stage: <strong className="text-charcoal">{activeField?.cropStage}</strong></span>
            <span>•</span>
            <span>Safe Band: <strong className="text-charcoal">{thresholds.min}% — {thresholds.max}%</strong></span>
          </div>
        </div>

        <div className="lg:col-span-4 bg-ivory p-4 rounded-2xl border border-slate-200/80 text-center space-y-2">
          <span className="text-xs text-slate-muted font-bold uppercase tracking-wider block">
            Current Root-Depth Moisture
          </span>
          <span className="text-4xl font-semibold text-forest">
            {moistureSensor ? `${moistureSensor.latestReading}%` : "N/A"}
          </span>
          <p className="text-[11px] text-slate-400">
            Probe: {moistureSensor?.name || "No capacitive sensor"}
          </p>
        </div>
      </div>

      {/* Moisture Trend Chart vs Threshold Bands */}
      <div className="panel p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
              <Activity className="w-4 h-4 text-forest" />
              <span>Soil Moisture Trend vs Configured Irrigation Limits</span>
            </h3>
            <p className="text-xs text-slate-muted">Last 18 hours moisture trajectory against target bounds</p>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={moistureCurve} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0E5" />
              <XAxis dataKey="time" stroke="#667085" fontSize={11} tickLine={false} />
              <YAxis stroke="#667085" fontSize={11} tickLine={false} domain={[20, 90]} />
              <Tooltip
                contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E4E7EC", fontSize: "12px" }}
              />
              <ReferenceLine y={thresholds.min} stroke="#E9A23B" strokeDasharray="3 3" label={{ value: `Min Threshold (${thresholds.min}%)`, fill: "#E9A23B", fontSize: 10 }} />
              <ReferenceLine y={thresholds.max} stroke="#667085" strokeDasharray="3 3" label={{ value: `Max Threshold (${thresholds.max}%)`, fill: "#667085", fontSize: 10 }} />
              <Line type="monotone" dataKey="value" name="Soil Moisture (%)" stroke="#2F855A" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Irrigation History & Log Table */}
      <div className="panel p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
              <History className="w-4 h-4 text-forest" />
              <span>Irrigation Event Log History</span>
            </h3>
            <p className="text-xs text-slate-muted">Recorded applications for water accounting and soil conservation</p>
          </div>
          <div className="text-xs text-slate-muted">
            Total Water Applied: <strong className="text-forest text-sm font-bold">{totalLoggedWater.toLocaleString()} Liters</strong>
          </div>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ivory border-b border-slate-100 text-slate-muted font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Plot / Field</th>
                <th className="py-2.5 px-3">Watering Method</th>
                <th className="py-2.5 px-3">Duration</th>
                <th className="py-2.5 px-3 text-right">Volume (Liters)</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {irrigationLogs
                .filter(l => l.farmId === selectedFarm?.id)
                .map(log => (
                  <tr key={log.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-charcoal">{log.date}</td>
                    <td className="py-2.5 px-3">{log.fieldName}</td>
                    <td className="py-2.5 px-3 font-medium text-forest">{log.method}</td>
                    <td className="py-2.5 px-3">{log.durationMinutes} min</td>
                    <td className="py-2.5 px-3 text-right font-mono font-bold">{log.waterQuantityLiters?.toLocaleString()} L</td>
                    <td className="py-2.5 px-3">
                      <Badge variant={log.isEstimated ? "warning" : "agri"} size="xs">
                        {log.isEstimated ? "Estimated" : "Metered"}
                      </Badge>
                    </td>
                    <td className="py-2.5 px-3 text-slate-muted truncate max-w-xs">{log.notes || "—"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Record Irrigation Event Modal */}
      <Modal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        title="Record Field Irrigation Event"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleLogSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Date of Event
            </label>
            <input
              type="date"
              required
              value={logFormData.date}
              onChange={(e) => setLogFormData({ ...logFormData, date: e.target.value })}
              className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Watering Method
            </label>
            <select
              value={logFormData.method}
              onChange={(e) => setLogFormData({ ...logFormData, method: e.target.value })}
              className="w-full bg-ivory text-charcoal text-sm px-3 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            >
              <option value="Drip Irrigation">Precision Drip Irrigation</option>
              <option value="Canal Inflow">Canal Inflow / Sluice Gate</option>
              <option value="Micro Sprinkler">Micro Sprinkler Overhead</option>
              <option value="Furrow Flood">Furrow Flooding</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Duration (Minutes)
              </label>
              <input
                type="number"
                required
                value={logFormData.durationMinutes}
                onChange={(e) => setLogFormData({ ...logFormData, durationMinutes: Number(e.target.value) })}
                className="w-full bg-ivory text-charcoal text-sm px-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Water Volume (Liters)
              </label>
              <input
                type="number"
                value={logFormData.waterQuantityLiters}
                onChange={(e) => setLogFormData({ ...logFormData, waterQuantityLiters: Number(e.target.value) })}
                className="w-full bg-ivory text-charcoal text-sm px-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="isEstimated"
              checked={logFormData.isEstimated}
              onChange={(e) => setLogFormData({ ...logFormData, isEstimated: e.target.checked })}
              className="rounded text-forest focus:ring-agri w-4 h-4 cursor-pointer"
            />
            <label htmlFor="isEstimated" className="text-slate-muted cursor-pointer">
              Volume is estimated (no flow meter installed)
            </label>
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Field Notes / Fertigation
            </label>
            <input
              type="text"
              placeholder="e.g. Applied water alongside bio-fertilizer batch"
              value={logFormData.notes}
              onChange={(e) => setLogFormData({ ...logFormData, notes: e.target.value })}
              className="w-full bg-ivory text-charcoal text-sm px-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsLogModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary text-xs"
            >
              Save Irrigation Log
            </button>
          </div>
        </form>
      </Modal>

      {/* Adjust Thresholds Modal */}
      <Modal
        isOpen={isThresholdModalOpen}
        onClose={() => setIsThresholdModalOpen(false)}
        title="Adjust Moisture Thresholds"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-xs">
          <p className="text-slate-muted leading-relaxed">
            Configure the trigger limits for <strong className="text-charcoal">{activeField?.crop}</strong>. These thresholds govern automated irrigation recommendations.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Lower Limit (%)
              </label>
              <input
                type="number"
                value={thresholds.min}
                onChange={(e) => setThresholds({ ...thresholds, min: Number(e.target.value) })}
                className="w-full bg-ivory text-charcoal text-sm px-3 py-2 rounded-xl border border-slate-border"
              />
            </div>
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Upper Limit (%)
              </label>
              <input
                type="number"
                value={thresholds.max}
                onChange={(e) => setThresholds({ ...thresholds, max: Number(e.target.value) })}
                className="w-full bg-ivory text-charcoal text-sm px-3 py-2 rounded-xl border border-slate-border"
              />
            </div>
          </div>

          <div className="pt-3 flex justify-end gap-3">
            <button
              onClick={() => setIsThresholdModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-forest text-cream"
            >
              Save Limits
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
