import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Grid3X3,
  Layers,
  Sprout,
  Cpu,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Activity,
  Droplets,
  Thermometer,
  Sun,
  FlaskConical,
  Clock,
  ArrowRight
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { MetricCard } from "../components/common/MetricCard";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

export function FieldMonitoring() {
  const {
    farms,
    selectedFarm,
    selectedFarmId,
    setSelectedFarmId,
    fields,
    currentFarmFields,
    sensors,
    currentFarmSensors
  } = useApp();

  const [selectedFieldId, setSelectedFieldId] = useState(currentFarmFields[0]?.id || "");
  const [comparisonMode, setComparisonMode] = useState(false);

  const activeField = currentFarmFields.find(f => f.id === selectedFieldId) || currentFarmFields[0] || null;
  const activeFieldSensors = activeField ? currentFarmSensors.filter(s => s.fieldId === activeField.id) : [];

  // Categorize sensors for active field
  const moistureSensor = activeFieldSensors.find(s => s.type === "Soil Moisture");
  const tempSensor = activeFieldSensors.find(s => s.type === "Air Temperature");
  const humiditySensor = activeFieldSensors.find(s => s.type === "Relative Humidity");
  const lightSensor = activeFieldSensors.find(s => s.type === "Light Intensity");
  const phSensor = activeFieldSensors.find(s => s.type === "Soil pH");
  const nSensor = activeFieldSensors.find(s => s.type.includes("Nitrogen"));

  // Multi-field comparison dataset for current farm
  const fieldComparisonData = currentFarmFields.map(fld => {
    const fldSensors = currentFarmSensors.filter(s => s.fieldId === fld.id);
    const m = fldSensors.find(s => s.type === "Soil Moisture")?.latestReading || 0;
    return {
      name: fld.name,
      crop: fld.crop,
      moisture: m,
      targetMin: fld.soilMoistureTarget?.min || 40,
      targetMax: fld.soilMoistureTarget?.max || 70,
      area: fld.area
    };
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal">
              Field-Level Telemetry Monitoring
            </h1>
            <Badge variant="forest">{currentFarmFields.length} Registered Plots</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Sense Layer: Granular sub-plot environmental telemetry for <strong className="text-charcoal">{selectedFarm?.name}</strong>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setComparisonMode(!comparisonMode)}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition-all ${
              comparisonMode
                ? "bg-forest text-lime-accent border-forest shadow-sm"
                : "bg-ivory text-charcoal border-slate-border hover:bg-slate-50"
            }`}
          >
            {comparisonMode ? "Close Comparison" : "Compare All Fields"}
          </button>
        </div>
      </div>

      {/* Field Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {currentFarmFields.map(fld => (
          <button
            key={fld.id}
            onClick={() => setSelectedFieldId(fld.id)}
            className={`py-2.5 px-4 rounded-xl font-bold transition-all whitespace-nowrap border ${
              activeField?.id === fld.id
                ? "bg-forest text-lime-accent border-forest shadow-sm"
                : "bg-white text-slate-muted border-slate-border hover:text-charcoal hover:bg-slate-50"
            }`}
          >
            {fld.name} ({fld.crop})
          </button>
        ))}
      </div>

      {/* Multi-Field Comparison Matrix (When active) */}
      {comparisonMode && (
        <div className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
                <Activity className="w-4 h-4 text-forest" />
                <span>Sub-Plot Soil Moisture Comparison vs Configured Crop Band</span>
              </h3>
              <p className="text-xs text-slate-muted">Evaluating differential moisture levels across fields</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fieldComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF0E5" />
                <XAxis dataKey="name" stroke="#667085" fontSize={11} tickLine={false} />
                <YAxis stroke="#667085" fontSize={11} tickLine={false} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E4E7EC", fontSize: "12px" }}
                />
                <Legend />
                <Bar dataKey="moisture" name="Current Moisture (%)" fill="#2F855A" radius={[6, 6, 0, 0]} />
                <Bar dataKey="targetMin" name="Target Min (%)" fill="#E9A23B" radius={[6, 6, 0, 0]} />
                <Bar dataKey="targetMax" name="Target Max (%)" fill="#667085" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Selected Field Telemetry Overview */}
      {activeField ? (
        <div className="space-y-6">
          {/* Active Field Header Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-charcoal">{activeField.name}</h2>
                <Badge variant="lime" size="xs">{activeField.status}</Badge>
              </div>
              <p className="text-xs text-slate-muted mt-1">
                Crop: <strong className="text-forest">{activeField.crop}</strong> • Growth Phase: <strong className="text-charcoal">{activeField.cropStage}</strong> • Parcel Size: {activeField.area} Acres
              </p>
            </div>

            <div className="text-xs text-slate-muted flex items-center gap-3">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-forest" />
                <span>Last Telemetry Sync: 12m ago</span>
              </span>
              <span className="flex items-center gap-1 font-semibold text-charcoal">
                <Cpu className="w-3.5 h-3.5 text-agri" />
                <span>{activeFieldSensors.length} Associated Nodes</span>
              </span>
            </div>
          </div>

          {/* Key Field Metric Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {/* Soil Moisture */}
            <div className="bg-white rounded-2xl p-4 border border-slate-border shadow-sm">
              <div className="flex items-center justify-between text-slate-muted text-[11px] font-bold uppercase">
                <span>Soil Moisture</span>
                <Droplets className="w-4 h-4 text-agri" />
              </div>
              {moistureSensor ? (
                <div className="mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-forest">{moistureSensor.latestReading}</span>
                    <span className="text-xs font-bold text-slate-muted">%</span>
                  </div>
                  <span className={`text-[10px] font-bold mt-1 block ${
                    moistureSensor.latestReading < (activeField.soilMoistureTarget?.min || 40)
                      ? "text-danger"
                      : "text-agri"
                  }`}>
                    {moistureSensor.latestReading < (activeField.soilMoistureTarget?.min || 40)
                      ? "Deficit Detected"
                      : "Optimal Range"}
                  </span>
                </div>
              ) : (
                <div className="mt-2 text-xs text-slate-400 italic">No probe connected</div>
              )}
            </div>

            {/* Air Temperature */}
            <div className="bg-white rounded-2xl p-4 border border-slate-border shadow-sm">
              <div className="flex items-center justify-between text-slate-muted text-[11px] font-bold uppercase">
                <span>Air Temp</span>
                <Thermometer className="w-4 h-4 text-amber-warn" />
              </div>
              {tempSensor ? (
                <div className="mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-charcoal">{tempSensor.latestReading}</span>
                    <span className="text-xs font-bold text-slate-muted">°C</span>
                  </div>
                  <span className="text-[10px] text-slate-muted mt-1 block">Ambient Canopy</span>
                </div>
              ) : (
                <div className="mt-2 text-xs text-slate-400 italic">No probe connected</div>
              )}
            </div>

            {/* Relative Humidity */}
            <div className="bg-white rounded-2xl p-4 border border-slate-border shadow-sm">
              <div className="flex items-center justify-between text-slate-muted text-[11px] font-bold uppercase">
                <span>Humidity</span>
                <Activity className="w-4 h-4 text-sky-500" />
              </div>
              {humiditySensor ? (
                <div className="mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-charcoal">{humiditySensor.latestReading}</span>
                    <span className="text-xs font-bold text-slate-muted">%</span>
                  </div>
                  <span className="text-[10px] text-slate-muted mt-1 block">Canopy Boundary</span>
                </div>
              ) : (
                <div className="mt-2 text-xs text-slate-400 italic">No probe connected</div>
              )}
            </div>

            {/* Solar Radiation */}
            <div className="bg-white rounded-2xl p-4 border border-slate-border shadow-sm">
              <div className="flex items-center justify-between text-slate-muted text-[11px] font-bold uppercase">
                <span>Light Intensity</span>
                <Sun className="w-4 h-4 text-amber-400" />
              </div>
              {lightSensor ? (
                <div className="mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-charcoal">{lightSensor.latestReading}</span>
                    <span className="text-[10px] font-bold text-slate-muted">lux</span>
                  </div>
                  <span className="text-[10px] text-slate-muted mt-1 block">Photosynthetic Flux</span>
                </div>
              ) : (
                <div className="mt-2 text-xs text-slate-400 italic">Ambient Sunlight</div>
              )}
            </div>

            {/* Soil pH */}
            <div className="bg-white rounded-2xl p-4 border border-slate-border shadow-sm">
              <div className="flex items-center justify-between text-slate-muted text-[11px] font-bold uppercase">
                <span>Soil pH</span>
                <FlaskConical className="w-4 h-4 text-forest" />
              </div>
              {phSensor ? (
                <div className="mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-forest">{phSensor.latestReading}</span>
                    <span className="text-xs font-bold text-slate-muted">pH</span>
                  </div>
                  <span className="text-[10px] text-agri font-semibold mt-1 block">Neutral Loam</span>
                </div>
              ) : (
                <div className="mt-2 text-xs text-slate-400 italic">Baseline: 6.8 pH</div>
              )}
            </div>

            {/* Available Nitrogen */}
            <div className="bg-white rounded-2xl p-4 border border-slate-border shadow-sm">
              <div className="flex items-center justify-between text-slate-muted text-[11px] font-bold uppercase">
                <span>Available N</span>
                <Sprout className="w-4 h-4 text-agri" />
              </div>
              {nSensor ? (
                <div className="mt-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black text-charcoal">{nSensor.latestReading}</span>
                    <span className="text-[10px] font-bold text-slate-muted">mg/kg</span>
                  </div>
                  <span className="text-[10px] text-amber-warn font-semibold mt-1 block">Sub-optimal</span>
                </div>
              ) : (
                <div className="mt-2 text-xs text-slate-400 italic">No ion probe</div>
              )}
            </div>
          </div>

          {/* Condition Evaluation Summary Card */}
          <div className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-charcoal">Agronomic Condition Evaluation for {activeField.name}</h3>
            <p className="text-xs text-slate-muted leading-relaxed">
              Based on active sensor telemetry, root-depth moisture is evaluated against the configured target band ({activeField.soilMoistureTarget?.min}% - {activeField.soilMoistureTarget?.max}%) for {activeField.crop}.
            </p>
            {moistureSensor && moistureSensor.latestReading < (activeField.soilMoistureTarget?.min || 40) ? (
              <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center justify-between">
                <span>⚠️ <strong>Moisture Deficit:</strong> Current reading is below threshold. Irrigation cycle advised.</span>
                <a href="/irrigation" className="font-bold underline text-amber-900">Open Irrigation Advisory</a>
              </div>
            ) : (
              <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-agri flex-shrink-0" />
                <span>Current soil moisture is within healthy physiological limits for {activeField.cropStage}.</span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center text-slate-muted border border-slate-border">
          No fields registered for the selected farm.
        </div>
      )}
    </div>
  );
}
