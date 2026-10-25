import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  BarChart3,
  Download,
  Printer,
  Calendar,
  Filter,
  PieChart as PieIcon,
  Activity,
  Layers,
  Sprout,
  Droplets,
  Cpu
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

export function AnalyticsReports() {
  const {
    farms,
    sensors,
    recommendations,
    risks,
    irrigationLogs,
    selectedFarm,
    selectedFarmId,
    setSelectedFarmId
  } = useApp();

  const [dateRange, setDateRange] = useState("7D");

  // Chart 1: Diurnal Multi-Day Trends
  const timeSeriesData = [
    { day: "Mon", moisture: 58, temp: 31, humidity: 65 },
    { day: "Tue", moisture: 54, temp: 33, humidity: 58 },
    { day: "Wed", moisture: 49, temp: 35, humidity: 52 },
    { day: "Thu", moisture: 62, temp: 29, humidity: 72 }, // after irrigation
    { day: "Fri", moisture: 59, temp: 32, humidity: 66 },
    { day: "Sat", moisture: 56, temp: 33, humidity: 61 },
    { day: "Sun", moisture: 58, temp: 31, humidity: 62 }
  ];

  // Chart 2: Crop Distribution by Acreage
  const cropData = [
    { name: "Cotton", acres: 6.5, fill: "#174C35" },
    { name: "Paddy", acres: 4.8, fill: "#2F855A" },
    { name: "Grapes & Cane", acres: 8.2, fill: "#38A169" },
    { name: "Bajra & Millets", acres: 5.0, fill: "#A3D977" }
  ];

  // Chart 3: Sensor Availability Pie
  const sensorAvailabilityData = [
    { name: "Online", value: sensors.filter(s => s.status === "Online").length, color: "#2F855A" },
    { name: "Warning", value: sensors.filter(s => s.status === "Warning").length, color: "#E9A23B" },
    { name: "Offline", value: sensors.filter(s => s.status === "Offline").length, color: "#DC5555" }
  ];

  // Chart 4: Recommendation Categories Distribution
  const recCategoriesData = [
    { category: "Irrigation", count: recommendations.filter(r => r.category === "Irrigation").length },
    { category: "Risk", count: recommendations.filter(r => r.category.includes("Risk")).length },
    { category: "Nutrient", count: recommendations.filter(r => r.category.includes("Soil")).length },
    { category: "Efficiency", count: recommendations.filter(r => r.category.includes("Resource")).length }
  ];

  // Export Tabular Data to CSV
  const handleExportCSV = () => {
    const rows = [
      ["AGRINOVA ANALYTICS & TELEMETRY REPORT", `Export Date: ${new Date().toISOString()}`],
      [""],
      ["FARM ACREAGE & HEALTH SUMMARY"],
      ["Farm ID", "Farm Name", "State", "District", "Area (Acres)", "Health Score", "Main Crop"],
      ...farms.map(f => [f.id, f.name, f.state, f.district, f.area, f.healthScore, f.mainCrop]),
      [""],
      ["REGISTERED IOT SENSORS"],
      ["Sensor ID", "Sensor Name", "Farm Name", "Type", "Latest Reading", "Unit", "Status"],
      ...sensors.map(s => [s.id, s.name, s.farmName, s.type, s.latestReading, s.unit, s.status])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AGRINOVA_Analytics_Export_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal">
              Analytics, Sensor Trends & Reports
            </h1>
            <Badge variant="forest">System Intelligence</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Historical time-series, sensor node availability, and regional crop distributions across Tamil Nadu & Maharashtra.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-ivory text-charcoal hover:bg-slate-100 border border-slate-border shadow-sm transition-colors"
          >
            <Printer className="w-3.5 h-3.5 text-forest" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-forest hover:bg-forest-dark text-lime-accent shadow-md transition-all"
          >
            <Download className="w-4 h-4" />
            <span>Download CSV Datasets</span>
          </button>
        </div>
      </div>

      {/* Primary Chart: 7-Day Soil Moisture vs Ambient Microclimate */}
      <div className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
              <Activity className="w-4 h-4 text-forest" />
              <span>Multi-Day Soil Moisture & Ambient Temperature Dynamics</span>
            </h3>
            <p className="text-xs text-slate-muted">Evaluating post-irrigation hydration retention cycles</p>
          </div>
          <div className="flex items-center gap-2 text-xs">
            {["24H", "7D", "30D"].map(range => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-3 py-1 rounded-lg font-bold transition-all ${
                  dateRange === range
                    ? "bg-forest text-lime-accent"
                    : "bg-ivory text-slate-muted hover:text-charcoal"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#EEF0E5" />
              <XAxis dataKey="day" stroke="#667085" fontSize={11} tickLine={false} />
              <YAxis stroke="#667085" fontSize={11} tickLine={false} />
              <Tooltip
                contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E4E7EC", fontSize: "12px" }}
              />
              <Legend />
              <Line type="monotone" dataKey="moisture" name="Soil Moisture (%)" stroke="#2F855A" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="temp" name="Ambient Temp (°C)" stroke="#E9A23B" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="humidity" name="Relative Humidity (%)" stroke="#0284C7" strokeWidth={1.5} strokeDasharray="4 4" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two Column Grid: Crop Area Distribution & Sensor Health */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Crop Acreage Distribution */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-border shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
              <Sprout className="w-4 h-4 text-forest" />
              <span>Pilot Acreage Distribution by Crop</span>
            </h3>
            <p className="text-xs text-slate-muted">Total cultivated area under monitored holdings</p>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cropData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EEF0E5" />
                <XAxis dataKey="name" stroke="#667085" fontSize={11} tickLine={false} />
                <YAxis stroke="#667085" fontSize={11} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "12px", border: "1px solid #E4E7EC", fontSize: "12px" }}
                />
                <Bar dataKey="acres" name="Cultivated Acres" fill="#2F855A" radius={[6, 6, 0, 0]}>
                  {cropData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right: Sensor Fleet Availability Pie */}
        <div className="lg:col-span-6 bg-white rounded-2xl p-6 border border-slate-border shadow-sm space-y-4">
          <div className="pb-3 border-b border-slate-100">
            <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
              <Cpu className="w-4 h-4 text-forest" />
              <span>IoT Sensor Fleet Connectivity Breakdown</span>
            </h3>
            <p className="text-xs text-slate-muted">Telemetry node heartbeat health across all pilot sectors</p>
          </div>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sensorAvailabilityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sensorAvailabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
