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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <p className="page-kicker">Today on the selected farm</p>
          <h1 className="page-title mt-1">
            {selectedFarm?.name || "Your farm"}
          </h1>
          <p className="text-sm text-slate-muted mt-1">
            {currentUser?.name ? `${currentUser.name} · ` : ""}
            {selectedFarm?.village}, {selectedFarm?.district}, {selectedFarm?.state}
            {selectedFarm?.mainCrop ? ` · ${selectedFarm.mainCrop}` : ""}
            <span className="ml-2 inline-block"><Badge variant="outline">Simulated readings</Badge></span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => navigate("/farms")}
            className="btn-secondary text-xs py-2"
          >
            <Plus className="w-3.5 h-3.5" />
            Add farm
          </button>
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="btn-primary text-xs py-2"
          >
            <BrainCircuit className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
            {isGenerating ? "Running rules…" : "Run advice rules"}
          </button>
          <button
            onClick={() => navigate("/digital-profiles")}
            className="btn-secondary text-xs py-2"
          >
            <FileCheck2 className="w-3.5 h-3.5" />
            Farm profile
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
        <div className="lg:col-span-8 panel p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-border gap-2 mb-4">
            <div>
              <h3 className="font-sans text-base font-semibold text-charcoal">
                Moisture and weather, last 24 hours
              </h3>
              <p className="text-xs text-slate-muted mt-0.5">
                Typical day-night cycle for {selectedFarm?.name || "this farm"} — simulated, not a live probe
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
                  contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "6px", border: "1px solid #DDD6C9", fontSize: "12px" }}
                />
                <Area type="monotone" dataKey="moisture" name="Soil Moisture (%)" stroke="#2F855A" strokeWidth={2.5} fillOpacity={1} fill="url(#colorMoisture)" />
                <Line type="monotone" dataKey="temp" name="Temperature (°C)" stroke="#E9A23B" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="humidity" name="Humidity (%)" stroke="#0284C7" strokeWidth={1.5} strokeDasharray="3 3" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-border flex flex-wrap items-center justify-between text-xs text-slate-muted">
            <span>Comfortable moisture band: <strong className="text-charcoal font-medium">45%–70%</strong></span>
            <Link to="/sensors" className="text-forest font-medium hover:underline flex items-center gap-1">
              All probes
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Right: Farm Health & Irrigation Status Gauge */}
        <div className="lg:col-span-4 space-y-6">
          {/* Farm Health Gauge Card */}
          <div className="panel p-5">
            <h4 className="text-xs font-medium text-slate-muted mb-3">
              Field condition
            </h4>
            <div>
              <span className="font-display text-4xl font-medium text-forest tabular-nums">
                {selectedFarm?.healthScore || 85}
              </span>
              <span className="text-sm text-slate-muted ml-1">/ 100</span>
              <p className="text-xs text-agri mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{selectedFarm?.healthStatus || "Within range"}</span>
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-border space-y-2 text-xs">
              <div className="flex justify-between text-slate-muted">
                <span>Last simulated update</span>
                <span className="font-medium text-charcoal">15 min ago</span>
              </div>
              <div className="flex justify-between text-slate-muted">
                <span>Probes on this farm</span>
                <span className="font-medium text-charcoal">{currentFarmSensors.length} online</span>
              </div>
              <div className="flex justify-between text-slate-muted">
                <span>Irrigation</span>
                <span className="font-medium text-charcoal">No extra cycle today</span>
              </div>
            </div>
          </div>

          {/* Quick Irrigation Action Snapshot */}
          <div className="panel p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-medium text-slate-muted">
                Irrigation
              </h4>
              <Badge variant="outline" size="xs">Hold drip</Badge>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-forest" />
                <span className="text-xs font-medium text-forest">Moisture is in band</span>
              </div>
              <p className="text-xs text-charcoal leading-relaxed">
                58.4% at root depth. Next fertigation window is 06:00 tomorrow, unless the afternoon reading falls below 45%.
              </p>
            </div>
            <Link
              to="/irrigation"
              className="mt-3 block text-center py-2 px-3 rounded-md text-xs font-medium text-forest bg-ivory hover:bg-ivory-subtle border border-slate-border"
            >
              Open irrigation notes
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
        <div className="lg:col-span-6 panel p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-border mb-4">
              <div>
                <h3 className="font-sans text-sm font-semibold text-charcoal">
                  Latest advice
                </h3>
                <p className="text-xs text-slate-muted">From crop-stage rules on the current readings</p>
              </div>
              <Link to="/intelligence" className="text-xs text-forest font-medium hover:underline">
                All notes ({recommendations.length})
              </Link>
            </div>

            <div className="space-y-3">
              {recommendations.slice(0, 3).map((rec) => (
                <div
                  key={rec.id}
                  className="p-3 border border-slate-border bg-ivory text-xs space-y-1.5"
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

          <div className="mt-4 pt-3 border-t border-slate-border flex items-center justify-between text-xs text-slate-muted">
            <span>Each note names the rule that fired</span>
            <Link to="/intelligence" className="text-forest font-medium hover:underline">
              Review advice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
