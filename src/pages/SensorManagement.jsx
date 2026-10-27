import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Cpu,
  Search,
  Filter,
  Plus,
  RefreshCw,
  Battery,
  BatteryCharging,
  Wifi,
  WifiOff,
  AlertTriangle,
  Clock,
  Radio,
  SlidersHorizontal,
  ChevronRight,
  TrendingUp,
  BarChart2,
  X
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";
import { EmptyState } from "../components/common/EmptyState";
import { generate24HourReadings } from "../data/mockData";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

export function SensorManagement() {
  const {
    sensors,
    farms,
    fields,
    selectedFarmId,
    refreshSensors,
    addSensor,
    isSimulating,
    setIsSimulating
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFarmFilter, setSelectedFarmFilter] = useState("");
  const [selectedTypeFilter, setSelectedTypeFilter] = useState("");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("");

  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedSensorForDetails, setSelectedSensorForDetails] = useState(null);

  // Form state for adding sensor
  const [newSensorData, setNewSensorData] = useState({
    name: "",
    type: "Soil Moisture",
    farmId: selectedFarmId || (farms[0]?.id || ""),
    fieldId: "",
    installationDate: new Date().toISOString().split("T")[0],
    hardwareUid: "",
    thresholdMin: 40,
    thresholdMax: 70
  });

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshSensors();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const farm = farms.find(f => f.id === newSensorData.farmId);
    const field = fields.find(f => f.id === newSensorData.fieldId);

    let unit = "%";
    if (newSensorData.type === "Air Temperature") unit = "°C";
    else if (newSensorData.type === "Relative Humidity") unit = "%";
    else if (newSensorData.type === "Light Intensity") unit = "lux";
    else if (newSensorData.type === "Soil pH") unit = "pH";
    else if (newSensorData.type === "Soil EC") unit = "dS/m";
    else if (newSensorData.type.includes("Nitrogen") || newSensorData.type.includes("Phosphorus") || newSensorData.type.includes("Potassium")) unit = "mg/kg";

    await addSensor({
      ...newSensorData,
      farmName: farm?.name || "Farm",
      fieldName: field?.name || "Main Field",
      unit
    });

    setIsAddModalOpen(false);
    setNewSensorData({
      name: "",
      type: "Soil Moisture",
      farmId: selectedFarmId || (farms[0]?.id || ""),
      fieldId: "",
      installationDate: new Date().toISOString().split("T")[0],
      hardwareUid: "",
      thresholdMin: 40,
      thresholdMax: 70
    });
  };

  // Filtered sensors
  const filteredSensors = sensors.filter(sensor => {
    const matchesSearch =
      sensor.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sensor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sensor.hardwareUid?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFarm = !selectedFarmFilter || sensor.farmId === selectedFarmFilter;
    const matchesType = !selectedTypeFilter || sensor.type.toLowerCase() === selectedTypeFilter.toLowerCase();
    const matchesStatus = !selectedStatusFilter || sensor.status.toLowerCase() === selectedStatusFilter.toLowerCase();
    return matchesSearch && matchesFarm && matchesType && matchesStatus;
  });

  const sensorTypes = [
    "Soil Moisture",
    "Air Temperature",
    "Relative Humidity",
    "Light Intensity",
    "Soil pH",
    "Soil EC",
    "Nitrogen (N)",
    "Phosphorus (P)",
    "Potassium (K)"
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & Simulation Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">
              Sensors
            </h1>
            <Badge variant="outline">{sensors.length} probes</Badge>
          </div>
          <p className="text-sm text-slate-muted mt-1">
            Moisture, weather, pH, EC, and NPK nodes on the sample farms. The stream here is simulated.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Simulation Toggle */}
          <button
            onClick={() => setIsSimulating(!isSimulating)}
            className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold border transition-all ${
              isSimulating
                ? "bg-emerald-50 text-emerald-800 border-emerald-300"
                : "bg-slate-50 text-slate-600 border-slate-200"
            }`}
          >
            <Radio className={`w-3.5 h-3.5 ${isSimulating ? "text-agri animate-pulse" : ""}`} />
            <span>Simulated Stream: {isSimulating ? "Active (30s)" : "Paused"}</span>
          </button>

          {/* Manual Refresh */}
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-ivory text-charcoal hover:bg-slate-100 border border-slate-border shadow-sm transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>Refresh Readings</span>
          </button>

          {/* Add Sensor */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="btn-primary text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Sensor</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-border shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search sensor ID or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-ivory text-charcoal text-xs sm:text-sm pl-9 pr-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
          />
        </div>

        {/* Farm Filter */}
        <select
          value={selectedFarmFilter}
          onChange={(e) => setSelectedFarmFilter(e.target.value)}
          className="bg-ivory text-charcoal text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none cursor-pointer"
        >
          <option value="">All Farms</option>
          {farms.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          value={selectedTypeFilter}
          onChange={(e) => setSelectedTypeFilter(e.target.value)}
          className="bg-ivory text-charcoal text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none cursor-pointer"
        >
          <option value="">All Sensor Types</option>
          {sensorTypes.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatusFilter}
          onChange={(e) => setSelectedStatusFilter(e.target.value)}
          className="bg-ivory text-charcoal text-xs sm:text-sm px-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="Online">Online</option>
          <option value="Warning">Warning</option>
          <option value="Offline">Offline</option>
          <option value="Maintenance">Maintenance</option>
        </select>
      </div>

      {/* Sensor Records Table */}
      {filteredSensors.length === 0 ? (
        <EmptyState
          icon={Cpu}
          title="No Sensor Devices Found"
          description="No sensors match your active filter criteria. Try clearing filters or register a new hardware probe."
          actionLabel="Clear Filters"
          onAction={() => {
            setSearchTerm("");
            setSelectedFarmFilter("");
            setSelectedTypeFilter("");
            setSelectedStatusFilter("");
          }}
        />
      ) : (
        <div className="panel overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-ivory/80 border-b border-slate-100 text-slate-muted font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Sensor / Hardware UID</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Farm & Parcel</th>
                  <th className="py-3.5 px-4 text-right">Latest Reading</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Battery</th>
                  <th className="py-3.5 px-4">Last Update</th>
                  <th className="py-3.5 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-charcoal">
                {filteredSensors.map((sensor) => {
                  const isWarning = sensor.status === "Warning";
                  const isOffline = sensor.status === "Offline";

                  return (
                    <tr
                      key={sensor.id}
                      className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                      onClick={() => setSelectedSensorForDetails(sensor)}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className={`p-2 rounded-xl ${
                            isOffline ? "bg-slate-100 text-slate-400" : isWarning ? "bg-amber-100 text-amber-warn" : "bg-ivory-subtle text-forest"
                          }`}>
                            <Cpu className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="font-bold text-charcoal block group-hover:text-forest transition-colors">
                              {sensor.name}
                            </span>
                            <span className="font-mono text-[10px] text-slate-muted">
                              {sensor.id} • {sensor.hardwareUid || "UID-NODE"}
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 font-medium">
                        {sensor.type}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-semibold block truncate max-w-[150px]">{sensor.farmName}</span>
                        <span className="text-slate-muted text-[10px]">{sensor.fieldName}</span>
                      </td>

                      <td className="py-3.5 px-4 text-right">
                        <span className="text-base font-semibold text-forest">
                          {sensor.latestReading}
                        </span>
                        <span className="text-xs font-bold text-slate-muted ml-1">
                          {sensor.unit}
                        </span>
                        {sensor.thresholdMin !== undefined && (
                          <span className="block text-[10px] text-slate-400">
                            Target: {sensor.thresholdMin}-{sensor.thresholdMax} {sensor.unit}
                          </span>
                        )}
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge
                          variant={isOffline ? "default" : isWarning ? "warning" : "agri"}
                          size="xs"
                        >
                          {sensor.status}
                        </Badge>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-xs font-semibold">
                          <Battery className={`w-4 h-4 ${sensor.battery < 20 ? "text-danger" : "text-agri"}`} />
                          <span>{sensor.battery}%</span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-muted text-[11px]">
                        {new Date(sensor.lastUpdated).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </td>

                      <td className="py-3.5 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSensorForDetails(sensor);
                          }}
                          className="px-2.5 py-1 text-xs font-bold text-forest hover:bg-forest/10 rounded-lg transition-colors"
                        >
                          Telemetry Chart →
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Sensor Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Register New IoT Sensor Node"
        maxWidth="max-w-xl"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Sensor Label / Name
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Canopy Relative Humidity Probe #2"
              value={newSensorData.name}
              onChange={(e) => setNewSensorData({ ...newSensorData, name: e.target.value })}
              className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Sensor Modality / Type
              </label>
              <select
                value={newSensorData.type}
                onChange={(e) => setNewSensorData({ ...newSensorData, type: e.target.value })}
                className="w-full bg-ivory text-charcoal text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              >
                {sensorTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Target Farm
              </label>
              <select
                value={newSensorData.farmId}
                onChange={(e) => setNewSensorData({ ...newSensorData, farmId: e.target.value })}
                className="w-full bg-ivory text-charcoal text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              >
                {farms.map(f => (
                  <option key={f.id} value={f.id}>{f.name} ({f.state})</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Hardware Device Identifier (UID)
              </label>
              <input
                type="text"
                placeholder="e.g. AGRI-ESP32-NODE-1024"
                value={newSensorData.hardwareUid}
                onChange={(e) => setNewSensorData({ ...newSensorData, hardwareUid: e.target.value })}
                className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Installation Date
              </label>
              <input
                type="date"
                value={newSensorData.installationDate}
                onChange={(e) => setNewSensorData({ ...newSensorData, installationDate: e.target.value })}
                className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Safe Threshold Min
              </label>
              <input
                type="number"
                value={newSensorData.thresholdMin}
                onChange={(e) => setNewSensorData({ ...newSensorData, thresholdMin: Number(e.target.value) })}
                className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Safe Threshold Max
              </label>
              <input
                type="number"
                value={newSensorData.thresholdMax}
                onChange={(e) => setNewSensorData({ ...newSensorData, thresholdMax: Number(e.target.value) })}
                className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsAddModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary text-xs"
            >
              Register Sensor Node
            </button>
          </div>
        </form>
      </Modal>

      {/* Sensor Telemetry Details & 24-hr Chart Modal */}
      {selectedSensorForDetails && (
        <Modal
          isOpen={!!selectedSensorForDetails}
          onClose={() => setSelectedSensorForDetails(null)}
          title={`Sensor Telemetry: ${selectedSensorForDetails.name}`}
          maxWidth="max-w-2xl"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3 bg-ivory p-4 rounded-xl border border-slate-border text-xs">
              <div>
                <p className="text-slate-muted">Latest Measurement</p>
                <p className="text-2xl font-semibold text-forest mt-0.5">
                  {selectedSensorForDetails.latestReading} {selectedSensorForDetails.unit}
                </p>
              </div>
              <div>
                <p className="text-slate-muted">Hardware UID</p>
                <p className="font-mono text-charcoal font-bold mt-1">
                  {selectedSensorForDetails.hardwareUid || selectedSensorForDetails.id}
                </p>
              </div>
              <div>
                <p className="text-slate-muted">Battery & Link</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={selectedSensorForDetails.status === "Online" ? "agri" : "warning"} size="xs">
                    {selectedSensorForDetails.status}
                  </Badge>
                  <span className="font-bold text-charcoal">{selectedSensorForDetails.battery}%</span>
                </div>
              </div>
            </div>

            {/* 24-Hour Time Series Chart */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-charcoal mb-2">
                24-Hour Historical Readings Curve
              </h4>
              <div className="h-60 w-full bg-white rounded-xl border border-slate-border p-2">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={generate24HourReadings(
                      selectedSensorForDetails.latestReading,
                      selectedSensorForDetails.latestReading * 0.15,
                      selectedSensorForDetails.unit
                    )}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#EEF0E5" />
                    <XAxis dataKey="time" stroke="#667085" fontSize={10} tickLine={false} />
                    <YAxis stroke="#667085" fontSize={10} tickLine={false} />
                    <Tooltip
                      contentStyle={{ backgroundColor: "#FFFFFF", borderRadius: "8px", border: "1px solid #E4E7EC", fontSize: "11px" }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      name={`${selectedSensorForDetails.type} (${selectedSensorForDetails.unit})`}
                      stroke="#174C35"
                      strokeWidth={2.5}
                      dot={{ r: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-ivory text-[11px] text-slate-muted border border-slate-200">
              <strong>Simulated Data Notice:</strong> In demonstration mode, telemetric variance is generated using controlled sinusoidal microclimate models to reflect day/night diurnal transpiration.
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="button"
                onClick={() => setSelectedSensorForDetails(null)}
                className="btn-primary text-xs"
              >
                Close Telemetry View
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
