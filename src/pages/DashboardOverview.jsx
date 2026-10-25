import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Sprout,
  Cpu,
  Droplets,
  AlertTriangle,
  FileCheck2,
  BrainCircuit,
  TrendingUp,
  Plus,
  RefreshCw,
  ArrowRight,
  CheckCircle2,
  Radio,
  Layers,
  Thermometer,
  Calendar,
  Activity
} from "lucide-react";
import { MetricCard } from "../components/common/MetricCard";
import { Badge } from "../components/common/Badge";
import { AlertBanner } from "../components/common/AlertBanner";
import { LocationMapPanel } from "../components/common/LocationMapPanel";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  AreaChart,
  Area
} from "recharts";

export function DashboardOverview() {
  const {
    currentUser,
    farms,
    selectedFarm,
    sensors,
    currentFarmSensors,
    currentFarmFields,
    recommendations,
    risks,
    irrigationLogs,
    refreshSensors,
    generateRecommendations
  } = useApp();

  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);

  // Compute metric values
  const totalArea = farms.reduce((sum, f) => sum + (f.area || 0), 0).toFixed(1);
  const activeSensorsCount = sensors.filter(s => s.status === "Online").length;
  const attentionFarmsCount = farms.filter(f => f.healthStatus !== "Optimal").length;
  const pendingRecsCount = recommendations.filter(r => r.status === "New").length;
  const avgCompleteness = Math.round(farms.reduce((sum, f) => sum + (f.dataCompleteness || 80), 0) / (farms.length || 1));

  // Current farm sensors
  const moistureSensor = currentFarmSensors.find(s => s.type === "Soil Moisture");
  const tempSensor = currentFarmSensors.find(s => s.type === "Air Temperature");
  const humiditySensor = currentFarmSensors.find(s => s.type === "Relative Humidity");

  // Chart data: 6-point hourly diurnal cycle for current farm
  const telemetryTrends = [
    { time: "04:00", moisture: 61, temp: 23, humidity: 78, baseline: 50 },
    { time: "08:00", moisture: 59, temp: 27, humidity: 71, baseline: 50 },
    { time: "12:00", moisture: 54, temp: 33, humidity: 55, baseline: 50 },
    { time: "16:00", moisture: 52, temp: 34, humidity: 51, baseline: 50 },
    { time: "20:00", moisture: 56, temp: 29, humidity: 64, baseline: 50 },
    { time: "24:00", moisture: 58, temp: 25, humidity: 74, baseline: 50 }
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    await generateRecommendations(selectedFarm?.id);
    setTimeout(() => setIsGenerating(false), 500);
  };

  return (
    <div className="space-y-6">
      {/* Welcome & Pilot Notification Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal">
              Welcome back, {currentUser?.name || "Farmer"}
            </h1>
            <Badge variant="lime">Pilot Simulation Mode</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Monitoring <strong className="text-charcoal">{selectedFarm?.name || "Your Farm"}</strong> ({selectedFarm?.village}, {selectedFarm?.district}, {selectedFarm?.state}) • Main Crop: <span className="text-forest font-semibold">{selectedFarm?.mainCrop}</span>
          </p>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate("/farms")}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-ivory text-charcoal hover:bg-slate-100 border border-slate-border transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5 text-agri" />
            <span>Add Farm</span>
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold rounded-xl bg-forest hover:bg-forest-dark text-lime-accent shadow-sm transition-all"
          >
            <BrainCircuit className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
            <span>{isGenerating ? "Evaluating Rules..." : "Run AI Engine"}</span>
          </button>
          <button
            onClick={() => navigate("/digital-profiles")}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-ivory-subtle text-forest hover:bg-lime-soft border border-forest/15 transition-colors shadow-sm"
          >
            <FileCheck2 className="w-3.5 h-3.5 text-forest" />
            <span>Farm Profile</span>
          </button>
        </div>
      </div>

      {/* Top 6 High-Level Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <MetricCard
          title="Farms"
          value={farms.length}
          subtitle="Pilot registrations"
          icon={Sprout}
          onClick={() => navigate("/farms")}
        />
        <MetricCard
          title="Total Area"
          value={totalArea}
          unit="Acres"
          subtitle="Acreage mapped"
          icon={Layers}
        />
        <MetricCard
          title="Active Sensors"
          value={activeSensorsCount}
          unit={`/ ${sensors.length}`}
          subtitle="Telemetry nodes"
          icon={Cpu}
          onClick={() => navigate("/sensors")}
        />
        <MetricCard
          title="Needs Review"
          value={attentionFarmsCount}
          subtitle="Moisture / alert"
          icon={AlertTriangle}
          variant={attentionFarmsCount > 0 ? "warning" : "default"}
          onClick={() => navigate("/risks")}
        />
        <MetricCard
          title="Pending Advice"
          value={pendingRecsCount}
          subtitle="Actionable items"
          icon={BrainCircuit}
          variant="forest"
          onClick={() => navigate("/intelligence")}
        />
        <MetricCard
          title="Farm Profile"
          value={selectedFarm?.dataCompleteness || avgCompleteness}
          unit="%"
          subtitle="Finance-ready score"
          icon={FileCheck2}
          variant="lime"
          onClick={() => navigate("/digital-profiles")}
        />
      </div>

      {/* Real-time Field Conditions & Telemetry Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 24-Hour Diurnal Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl p-5 sm:p-6 border border-slate-border shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-charcoal flex items-center gap-2">
                <Activity className="w-5 h-5 text-forest" />
                <span>24-Hour Root-Zone & Microclimate Trends</span>
              </h3>
              <p className="text-xs text-slate-muted mt-0.5">
                Simulated diurnal cycle for {selectedFarm?.name || "Active Farm"} (Updated in real-time)
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-agri font-semibold">
                <span className="w-2.5 h-2.5 rounded-full bg-agri" /> Moisture (%)
              </span>
              <span className="flex items-center gap-1 text-amber-warn font-semibold ml-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-warn" /> Temp (°C)
              </span>
              <span className="flex items-center gap-1 text-sky-600 font-semibold ml-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" /> Humidity (%)
              </span>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={telemetryTrends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2F855A" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2F855A" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E9A23B" stopOpacity={0.25}/>
                    <stop offset="95%" stopColor="#E9A23B" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF0E5" />
                <XAxis dataKey="time" stroke="#667085" fontSize={11} tickLine={false} />
                <YAxis stroke="#667085" fontSize={11} tickLine={false} domain={[10, 90]} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E4E7EC", fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="moisture" name="Soil Moisture (%)" stroke="#2F855A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMoisture)" />
                <Line type="monotone" dataKey="temp" name="Temperature (°C)" stroke="#E9A23B" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#0284C7" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between text-xs text-slate-muted">
            <span>Optimal Soil Moisture Band: <strong className="text-charcoal font-semibold">45% — 70%</strong></span>
            <Link to="/sensors" className="text-agri font-bold hover:underline flex items-center gap-1">
              <span>View All Registered Probes</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Farm Health & Irrigation Status Gauge */}
        <div className="lg:col-span-4 space-y-6">
          {/* Farm Health Gauge Card */}
          <div className="bg-white rounded-2xl p-5 border border-slate-border shadow-sm">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-muted mb-3">
              Overall Farm Health Score
            </h4>
            <div className="flex items-center justify-between">
              <div>
                <span className="text-4xl font-extrabold text-forest">
                  {selectedFarm?.healthScore || 85}
                </span>
                <span className="text-sm font-bold text-slate-muted ml-1">/ 100</span>
                <p className="text-xs font-semibold text-agri mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{selectedFarm?.healthStatus || "Optimal Conditions"}</span>
                </p>
              </div>
              <div className="w-20 h-20 rounded-full border-4 border-agri/20 border-t-agri flex items-center justify-center font-bold text-sm text-forest bg-ivory">
                {selectedFarm?.healthScore || 85}%
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2 text-xs">
              <div className="flex justify-between text-slate-muted">
                <span>Telemetry Freshness</span>
                <span className="font-semibold text-charcoal">Live (15m ago)</span>
              </div>
              <div className="flex justify-between text-slate-muted">
                <span>Field Sensor Coverage</span>
                <span className="font-semibold text-charcoal">{currentFarmSensors.length} Nodes Online</span>
              </div>
              <div className="flex justify-between text-slate-muted">
                <span>Irrigation Threshold</span>
                <span className="font-semibold text-charcoal">Normal</span>
              </div>
            </div>
          </div>

          {/* Quick Irrigation Action Snapshot */}
          <div className="bg-white rounded-2xl p-5 border border-slate-border shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-muted">
                Irrigation Advisory
              </h4>
              <Badge variant="lime" size="xs">Recommended</Badge>
            </div>
            <div className="p-3.5 rounded-xl bg-ivory-subtle border border-forest/10 space-y-2">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-forest" />
                <span className="text-xs font-bold text-forest">Precision Drip Scheduled</span>
              </div>
              <p className="text-xs text-charcoal leading-relaxed">
                Soil moisture at 58.4% is optimal. Next recommended scheduled fertigation window opens at 06:00 tomorrow morning.
              </p>
            </div>
            <Link
              to="/irrigation"
              className="mt-3 block text-center py-2 px-3 rounded-xl text-xs font-bold text-forest bg-ivory hover:bg-slate-100 border border-slate-border transition-colors"
            >
              Open Irrigation Advisory Module →
            </Link>
          </div>
        </div>
      </div>

      {/* Geolocation Visual Map & Agricultural Recommendations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Visual Location Panel */}
        <div className="lg:col-span-6">
          <LocationMapPanel farm={selectedFarm} sensors={currentFarmSensors} />
        </div>

        {/* Right: Latest AI Agricultural Recommendations */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-5 border border-slate-border shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div>
                <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-forest" />
                  <span>Latest Agricultural Intelligence</span>
                </h3>
                <p className="text-xs text-slate-muted">Generated by rule engine based on field conditions</p>
              </div>
              <Link to="/intelligence" className="text-xs text-agri font-bold hover:underline">
                View All ({recommendations.length})
              </Link>
            </div>

            <div className="space-y-3">
              {recommendations.slice(0, 3).map((rec) => (
                <div
                  key={rec.id}
                  className="p-3.5 rounded-xl border border-slate-100 bg-ivory/60 hover:bg-white hover:border-agri/30 transition-all text-xs space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-charcoal truncate">{rec.title}</span>
                    <Badge variant={rec.priority === "Critical" ? "danger" : rec.priority === "High" ? "warning" : "agri"} size="xs">
                      {rec.priority}
                    </Badge>
                  </div>
                  <p className="text-slate-muted line-clamp-2 leading-relaxed">{rec.explanation}</p>
                  <div className="pt-1 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-slate-400">{rec.ruleTriggered}</span>
                    <span className="text-forest font-semibold">{rec.category}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-muted">
            <span>Decision Layer: 100% Transparent Rule Engine</span>
            <Link to="/intelligence" className="text-forest font-bold hover:underline">
              Review Recommendations →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
