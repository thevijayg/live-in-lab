import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Sprout,
  Plus,
  Search,
  MapPin,
  Layers,
  Droplets,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Cpu,
  BrainCircuit,
  Calendar,
  X
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";
import { ConfirmDialog } from "../components/common/ConfirmDialog";
import { LocationMapPanel } from "../components/common/LocationMapPanel";
import { Link } from "react-router-dom";

export function FarmManagement() {
  const {
    farms,
    selectedFarmId,
    setSelectedFarmId,
    addFarm,
    updateFarm,
    deleteFarm,
    sensors,
    fields,
    recommendations
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStateFilter, setSelectedStateFilter] = useState("");
  const [selectedFarmForModal, setSelectedFarmForModal] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Create / Edit modal state
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingFarmId, setEditingFarmId] = useState(null);
  const [farmFormData, setFarmFormData] = useState({
    name: "",
    farmerName: "",
    state: "Tamil Nadu",
    district: "Coimbatore",
    village: "",
    area: 5,
    areaUnit: "Acres",
    soilType: "Red Sandy Loam",
    irrigationType: "Precision Drip",
    mainCrop: "Cotton",
    coordinates: { lat: 10.9984, lng: 76.8450 },
    notes: ""
  });

  // Delete confirm modal state
  const [farmToDelete, setFarmToDelete] = useState(null);

  const districtsByState = {
    "Tamil Nadu": ["Coimbatore", "Thanjavur", "Madurai", "Tiruchirappalli", "Salem", "Erode"],
    "Maharashtra": ["Nashik", "Pune", "Ahmednagar", "Solapur", "Satara", "Kolhapur"]
  };

  const handleOpenCreate = () => {
    setEditingFarmId(null);
    setFarmFormData({
      name: "",
      farmerName: "",
      state: "Tamil Nadu",
      district: "Coimbatore",
      village: "",
      area: 5,
      areaUnit: "Acres",
      soilType: "Red Sandy Loam",
      irrigationType: "Precision Drip",
      mainCrop: "Cotton",
      coordinates: { lat: 10.9984, lng: 76.8450 },
      notes: ""
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEdit = (farm) => {
    setEditingFarmId(farm.id);
    setFarmFormData({
      name: farm.name,
      farmerName: farm.farmerName,
      state: farm.state,
      district: farm.district,
      village: farm.village,
      area: farm.area,
      areaUnit: farm.areaUnit,
      soilType: farm.soilType,
      irrigationType: farm.irrigationType,
      mainCrop: farm.mainCrop,
      coordinates: farm.coordinates || { lat: 11.0, lng: 77.0 },
      notes: farm.notes || ""
    });
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (editingFarmId) {
      await updateFarm(editingFarmId, farmFormData);
    } else {
      await addFarm(farmFormData);
    }
    setIsFormModalOpen(false);
  };

  const handleDeleteConfirm = async () => {
    if (farmToDelete) {
      await deleteFarm(farmToDelete.id);
      setFarmToDelete(null);
      if (selectedFarmForModal?.id === farmToDelete.id) {
        setSelectedFarmForModal(null);
      }
    }
  };

  const filteredFarms = farms.filter(f => {
    const matchesSearch =
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.farmerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.village.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !selectedStateFilter || f.state === selectedStateFilter;
    return matchesSearch && matchesState;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">
              Farms
            </h1>
            <Badge variant="outline">{farms.length} holdings</Badge>
          </div>
          <p className="text-sm text-slate-muted mt-1">
            Land records for the Tamil Nadu and Maharashtra sample farms.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="btn-primary self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add farm</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-border shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search farm name, farmer, district, village..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-ivory text-charcoal text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
          />
        </div>
        <select
          value={selectedStateFilter}
          onChange={(e) => setSelectedStateFilter(e.target.value)}
          className="bg-ivory text-charcoal text-xs sm:text-sm px-4 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none cursor-pointer"
        >
          <option value="">All Pilot States (TN & MH)</option>
          <option value="Tamil Nadu">Tamil Nadu</option>
          <option value="Maharashtra">Maharashtra</option>
        </select>
      </div>

      {/* Farms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFarms.map((farm) => {
          const farmSensors = sensors.filter(s => s.farmId === farm.id);
          const farmFields = fields.filter(fld => fld.farmId === farm.id);
          const isSelected = selectedFarmId === farm.id;

          return (
            <div
              key={farm.id}
              className={`bg-white rounded-2xl p-6 border shadow-sm transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected ? "border-agri ring-2 ring-agri/20" : "border-slate-border hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-charcoal">{farm.name}</h3>
                      <Badge variant={farm.state === "Tamil Nadu" ? "agri" : "forest"} size="xs">
                        {farm.state}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-muted mt-0.5">
                      Farmer: <strong className="text-charcoal">{farm.farmerName}</strong> • {farm.village}, {farm.district}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(farm)}
                      className="p-1.5 rounded-lg text-slate-muted hover:text-charcoal hover:bg-slate-100"
                      title="Edit Farm Details"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setFarmToDelete(farm)}
                      className="p-1.5 rounded-lg text-slate-muted hover:text-danger hover:bg-rose-50"
                      title="Delete Farm Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Key Attributes */}
                <div className="grid grid-cols-3 gap-2 py-4 text-xs">
                  <div className="bg-ivory p-2.5 rounded-xl border border-slate-200/70">
                    <span className="text-slate-muted block text-[10px] uppercase font-bold">Area</span>
                    <span className="font-display font-medium text-charcoal text-sm">{farm.area} {farm.areaUnit}</span>
                  </div>
                  <div className="bg-ivory p-2.5 rounded-xl border border-slate-200/70">
                    <span className="text-slate-muted block text-[10px] uppercase font-bold">Soil</span>
                    <span className="font-semibold text-charcoal truncate block">{farm.soilType}</span>
                  </div>
                  <div className="bg-ivory p-2.5 rounded-xl border border-slate-200/70">
                    <span className="text-slate-muted block text-[10px] uppercase font-bold">Irrigation</span>
                    <span className="font-semibold text-charcoal truncate block">{farm.irrigationType}</span>
                  </div>
                </div>

                {/* Telemetry coverage stats */}
                <div className="flex items-center justify-between text-xs text-slate-muted py-2">
                  <span className="flex items-center gap-1">
                    <Cpu className="w-3.5 h-3.5 text-agri" />
                    <strong>{farmSensors.length}</strong> Sensors Registered
                  </span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-forest" />
                    <strong>{farmFields.length}</strong> Fields / Plots
                  </span>
                  <span className="flex items-center gap-1">
                    <FileCheck2 className="w-3.5 h-3.5 text-forest" />
                    <strong>{farm.dataCompleteness || 85}%</strong> Complete
                  </span>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedFarmId(farm.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-agri text-white shadow-sm"
                      : "bg-ivory text-charcoal hover:bg-slate-100 border border-slate-border"
                  }`}
                >
                  {isSelected ? "Active Dashboard Farm" : "Select as Active"}
                </button>

                <button
                  onClick={() => {
                    setSelectedFarmForModal(farm);
                    setActiveTab("overview");
                  }}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-forest hover:bg-forest/10 transition-colors"
                >
                  View Full Profile & Tabs →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Farm Detail Comprehensive Modal with 6 Tabs */}
      {selectedFarmForModal && (
        <Modal
          isOpen={!!selectedFarmForModal}
          onClose={() => setSelectedFarmForModal(null)}
          title={`Farm Profile: ${selectedFarmForModal.name}`}
          maxWidth="max-w-4xl"
        >
          <div className="space-y-4">
            {/* Modal Tabs */}
            <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1 text-xs">
              {[
                { id: "overview", label: "Overview & Map" },
                { id: "sensors", label: `Sensors (${sensors.filter(s => s.farmId === selectedFarmForModal.id).length})` },
                { id: "crops", label: "Crops & Fields" },
                { id: "irrigation", label: "Irrigation Setup" },
                { id: "recommendations", label: "AI Recommendations" },
                { id: "profile", label: "Digital Farm Profile" }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-3 rounded-lg font-bold transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-forest text-cream"
                      : "text-slate-muted hover:text-charcoal hover:bg-slate-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab 1: Overview & Location Map */}
            {activeTab === "overview" && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-ivory p-4 rounded-xl border border-slate-border">
                  <div>
                    <span className="text-slate-muted block">Farmer</span>
                    <strong className="text-charcoal text-sm">{selectedFarmForModal.farmerName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-muted block">Pilot Location</span>
                    <strong className="text-charcoal text-sm">{selectedFarmForModal.village}, {selectedFarmForModal.state}</strong>
                  </div>
                  <div>
                    <span className="text-slate-muted block">Acreage</span>
                    <strong className="text-charcoal text-sm">{selectedFarmForModal.area} {selectedFarmForModal.areaUnit}</strong>
                  </div>
                  <div>
                    <span className="text-slate-muted block">Health Score</span>
                    <strong className="text-agri text-sm">{selectedFarmForModal.healthScore || 85} / 100</strong>
                  </div>
                </div>

                <LocationMapPanel
                  farm={selectedFarmForModal}
                  sensors={sensors.filter(s => s.farmId === selectedFarmForModal.id)}
                />
              </div>
            )}

            {/* Tab 2: Sensors */}
            {activeTab === "sensors" && (
              <div className="space-y-3 text-xs">
                {sensors.filter(s => s.farmId === selectedFarmForModal.id).map(sensor => (
                  <div key={sensor.id} className="p-3 bg-ivory rounded-xl border border-slate-border flex items-center justify-between">
                    <div>
                      <p className="font-bold text-charcoal">{sensor.name}</p>
                      <p className="text-slate-muted text-[11px]">{sensor.type} • {sensor.fieldName}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-extrabold text-forest">{sensor.latestReading} {sensor.unit}</span>
                      <Badge variant={sensor.status === "Online" ? "agri" : "warning"} size="xs" className="ml-2">
                        {sensor.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 3: Crops & Fields */}
            {activeTab === "crops" && (
              <div className="space-y-3 text-xs">
                <p className="text-slate-muted">Registered agricultural plots and growth stages for {selectedFarmForModal.name}:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {fields.filter(f => f.farmId === selectedFarmForModal.id).map(fld => (
                    <div key={fld.id} className="p-3 bg-ivory rounded-xl border border-slate-border">
                      <h4 className="font-bold text-charcoal">{fld.name}</h4>
                      <p className="text-slate-muted mt-0.5">Crop: <strong className="text-forest">{fld.crop}</strong> ({fld.area} Acres)</p>
                      <p className="text-slate-muted mt-0.5">Current Stage: {fld.cropStage}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tab 4: Irrigation */}
            {activeTab === "irrigation" && (
              <div className="space-y-3 text-xs">
                <div className="p-4 bg-ivory rounded-xl border border-slate-border">
                  <h4 className="font-bold text-charcoal text-sm">Irrigation Infrastructure</h4>
                  <p className="mt-1 text-slate-muted">
                    Primary watering method: <strong className="text-forest">{selectedFarmForModal.irrigationType}</strong>
                  </p>
                  <p className="mt-1 text-slate-muted">
                    Soil Texture: <strong className="text-charcoal">{selectedFarmForModal.soilType}</strong>
                  </p>
                </div>
                <Link
                  to="/irrigation"
                  className="inline-flex items-center gap-1 text-xs font-bold text-forest hover:underline"
                >
                  <span>Open Dedicated Irrigation Advisory & Logs Module →</span>
                </Link>
              </div>
            )}

            {/* Tab 5: AI Recommendations */}
            {activeTab === "recommendations" && (
              <div className="space-y-3 text-xs">
                {recommendations.filter(r => r.farmId === selectedFarmForModal.id).map(rec => (
                  <div key={rec.id} className="p-3 bg-ivory rounded-xl border border-slate-border">
                    <div className="flex justify-between items-center mb-1">
                      <strong className="text-charcoal">{rec.title}</strong>
                      <Badge variant={rec.priority === "Critical" ? "danger" : "agri"} size="xs">
                        {rec.priority}
                      </Badge>
                    </div>
                    <p className="text-slate-muted">{rec.explanation}</p>
                    <p className="mt-1 text-forest font-semibold">Action: {rec.suggestedAction}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Tab 6: Digital Farm Profile */}
            {activeTab === "profile" && (
              <div className="space-y-3 text-xs text-center py-6">
                <FileCheck2 className="w-12 h-12 text-forest mx-auto" />
                <h4 className="font-bold text-charcoal text-sm">Full Structured Digital Farm Profile</h4>
                <p className="text-slate-muted max-w-md mx-auto">
                  View dynamic completeness breakdown, consent records, and exportable standardized JSON/CSV documentation.
                </p>
                <Link
                  to="/digital-profiles"
                  className="mt-3 inline-block px-4 py-2 rounded-xl text-xs font-bold bg-forest text-cream"
                >
                  Open Digital Farm Profile Page
                </Link>
              </div>
            )}
          </div>
        </Modal>
      )}

      {/* Add / Edit Farm Modal Form */}
      <Modal
        isOpen={isFormModalOpen}
        onClose={() => setIsFormModalOpen(false)}
        title={editingFarmId ? "Edit Farm Information" : "Register New Agricultural Farm"}
        maxWidth="max-w-2xl"
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Farm Name / Holding Title
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Kongu Green Farms"
                value={farmFormData.name}
                onChange={(e) => setFarmFormData({ ...farmFormData, name: e.target.value })}
                className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Farmer / Landholder Name
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Murugan Selvam"
                value={farmFormData.farmerName}
                onChange={(e) => setFarmFormData({ ...farmFormData, farmerName: e.target.value })}
                className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Pilot State
              </label>
              <select
                value={farmFormData.state}
                onChange={(e) => {
                  const newState = e.target.value;
                  setFarmFormData({
                    ...farmFormData,
                    state: newState,
                    district: districtsByState[newState][0]
                  });
                }}
                className="w-full bg-ivory text-charcoal text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              >
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Maharashtra">Maharashtra</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                District
              </label>
              <select
                value={farmFormData.district}
                onChange={(e) => setFarmFormData({ ...farmFormData, district: e.target.value })}
                className="w-full bg-ivory text-charcoal text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              >
                {districtsByState[farmFormData.state].map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Village / Taluk
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Thondamuthur"
                value={farmFormData.village}
                onChange={(e) => setFarmFormData({ ...farmFormData, village: e.target.value })}
                className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Cultivated Land Area
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={farmFormData.area}
                onChange={(e) => setFarmFormData({ ...farmFormData, area: Number(e.target.value) })}
                className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Soil Classification
              </label>
              <select
                value={farmFormData.soilType}
                onChange={(e) => setFarmFormData({ ...farmFormData, soilType: e.target.value })}
                className="w-full bg-ivory text-charcoal text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              >
                <option value="Red Sandy Loam">Red Sandy Loam</option>
                <option value="Alluvial Clay Loam">Alluvial Clay Loam</option>
                <option value="Medium Black Soil">Medium Black Soil</option>
                <option value="Deep Black Cotton Soil">Deep Black Cotton Soil</option>
                <option value="Laterite Loam">Laterite Loam</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Irrigation System
              </label>
              <select
                value={farmFormData.irrigationType}
                onChange={(e) => setFarmFormData({ ...farmFormData, irrigationType: e.target.value })}
                className="w-full bg-ivory text-charcoal text-xs sm:text-sm px-3 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              >
                <option value="Precision Drip">Precision Drip</option>
                <option value="Canal Inflow & AWD">Canal Inflow & AWD</option>
                <option value="Micro Sprinkler">Micro Sprinkler</option>
                <option value="Furrow Irrigation">Furrow Irrigation</option>
                <option value="Rainfed / Submersible Pump">Rainfed / Submersible Pump</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Main Crop
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Cotton (Bt Hybrid) or Paddy (CR 1009)"
              value={farmFormData.mainCrop}
              onChange={(e) => setFarmFormData({ ...farmFormData, mainCrop: e.target.value })}
              className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsFormModalOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary text-xs"
            >
              {editingFarmId ? "Update Farm Record" : "Save Farm Registration"}
            </button>
          </div>
        </form>
      </Modal>

      {/* Confirmation Dialog for Delete */}
      <ConfirmDialog
        isOpen={!!farmToDelete}
        onClose={() => setFarmToDelete(null)}
        onConfirm={handleDeleteConfirm}
        title="Confirm Deletion of Farm Record"
        message={`Are you sure you want to delete '${farmToDelete?.name}'? In demo mode, this will safely remove the farm record from local memory.`}
        confirmText="Delete Farm"
        isDanger={true}
      />
    </div>
  );
}
