import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Users,
  Building,
  Sprout,
  Layers,
  Cpu,
  BrainCircuit,
  FileCheck2,
  AlertTriangle,
  ClipboardList,
  MessageSquare,
  Plus,
  CheckCircle2,
  Filter,
  Search
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { MetricCard } from "../components/common/MetricCard";
import { Modal } from "../components/common/Modal";

export function FpoManagement() {
  const {
    farms,
    sensors,
    recommendations,
    currentUser
  } = useApp();

  const [selectedState, setSelectedState] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false);
  const [visitNoteData, setVisitNoteData] = useState({
    farmId: farms[0]?.id || "",
    officerName: currentUser?.name || "Field Officer Priya",
    visitDate: new Date().toISOString().split("T")[0],
    growthStageObserved: "Panicle Initiation",
    farmerFeedback: "Requested additional soil EC probe for upper slope plot.",
    actionItems: "Verify drip lateral pressure calibration."
  });

  const [visitNotesList, setVisitNotesList] = useState([
    {
      id: "VST-01",
      farmName: "Kongu Green Farms",
      officer: "Priya Sundaram",
      date: "2026-10-21",
      feedback: "Farmer confirmed drip fertigation pump is operating normally.",
      action: "Battery replaced for moisture probe."
    },
    {
      id: "VST-02",
      farmName: "Sahyadri Valley Horticulture",
      officer: "Dr. Arvind Kulkarni",
      date: "2026-10-18",
      feedback: "Grape cluster development uniform. Recommended foliar micronutrient spray.",
      action: "FPO collective harvest window scheduled for next month."
    }
  ]);

  const totalArea = farms.reduce((acc, f) => acc + (f.area || 0), 0).toFixed(1);
  const activeSensorsCount = sensors.filter(s => s.status === "Online").length;
  const pendingRecsCount = recommendations.filter(r => r.status === "New").length;
  const incompleteProfiles = farms.filter(f => (f.dataCompleteness || 0) < 80).length;
  const attentionFarms = farms.filter(f => f.healthStatus !== "Optimal").length;

  const handleVisitSubmit = (e) => {
    e.preventDefault();
    const farm = farms.find(f => f.id === visitNoteData.farmId);
    setVisitNotesList(prev => [
      {
        id: `VST-${Date.now()}`,
        farmName: farm?.name || "Farm",
        officer: visitNoteData.officerName,
        date: visitNoteData.visitDate,
        feedback: visitNoteData.farmerFeedback,
        action: visitNoteData.actionItems
      },
      ...prev
    ]);
    setIsVisitModalOpen(false);
  };

  const filteredFarms = farms.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) || f.farmerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesState = !selectedState || f.state === selectedState;
    const matchesCrop = !selectedCrop || f.mainCrop.toLowerCase().includes(selectedCrop.toLowerCase());
    return matchesSearch && matchesState && matchesCrop;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">
              FPO workspace
            </h1>
            <Badge variant="outline">Member farms</Badge>
          </div>
          <p className="text-sm text-slate-muted mt-1">
            Acreage and visit notes across member holdings in the Tamil Nadu and Maharashtra samples.
          </p>
        </div>

        <button
          onClick={() => setIsVisitModalOpen(true)}
          className="btn-primary self-start sm:self-auto"
        >
          <ClipboardList className="w-4 h-4" />
          <span>Log Field Officer Visit</span>
        </button>
      </div>

      {/* Aggregate FPO Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <MetricCard
          title="Member Farms"
          value={farms.length}
          subtitle="Collective members"
          icon={Building}
        />
        <MetricCard
          title="Combined Area"
          value={totalArea}
          unit="Acres"
          subtitle="Total acreage"
          icon={Layers}
        />
        <MetricCard
          title="Active Sensors"
          value={activeSensorsCount}
          subtitle="Telemetry nodes"
          icon={Cpu}
        />
        <MetricCard
          title="Pending Advice"
          value={pendingRecsCount}
          subtitle="Field advisories"
          icon={BrainCircuit}
          variant="forest"
        />
        <MetricCard
          title="Incomplete DFP"
          value={incompleteProfiles}
          subtitle="Needs documentation"
          icon={FileCheck2}
          variant={incompleteProfiles > 0 ? "warning" : "default"}
        />
        <MetricCard
          title="Attention Needed"
          value={attentionFarms}
          subtitle="Moisture stress"
          icon={AlertTriangle}
          variant={attentionFarms > 0 ? "danger" : "default"}
        />
      </div>

      {/* FPO Member Farms Filtered Table */}
      <div className="panel p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-3">
          <h3 className="text-sm font-bold text-charcoal">FPO Collective Farm Roster</h3>
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <input
              type="text"
              placeholder="Search member farm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-ivory text-charcoal px-3 py-1.5 rounded-xl border border-slate-border text-xs focus:bg-white focus:outline-none"
            />
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-ivory text-charcoal px-3 py-1.5 rounded-xl border border-slate-border text-xs"
            >
              <option value="">All States</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Maharashtra">Maharashtra</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-ivory border-b border-slate-100 text-slate-muted font-bold uppercase text-[10px]">
                <th className="py-2.5 px-3">Farm Name / Holding</th>
                <th className="py-2.5 px-3">Member Farmer</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Acreage</th>
                <th className="py-2.5 px-3">Main Crop</th>
                <th className="py-2.5 px-3">Sensors</th>
                <th className="py-2.5 px-3">Profile %</th>
                <th className="py-2.5 px-3">Health Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFarms.map(farm => {
                const farmSensorCount = sensors.filter(s => s.farmId === farm.id).length;
                return (
                  <tr key={farm.id} className="hover:bg-slate-50">
                    <td className="py-3 px-3 font-bold text-charcoal">{farm.name}</td>
                    <td className="py-3 px-3">{farm.farmerName}</td>
                    <td className="py-3 px-3 text-slate-muted">{farm.district}, {farm.state}</td>
                    <td className="py-3 px-3 font-bold">{farm.area} {farm.areaUnit}</td>
                    <td className="py-3 px-3 text-forest font-semibold">{farm.mainCrop}</td>
                    <td className="py-3 px-3">{farmSensorCount} Nodes</td>
                    <td className="py-3 px-3 font-mono font-bold">{farm.dataCompleteness || 85}%</td>
                    <td className="py-3 px-3">
                      <Badge variant={farm.healthStatus === "Optimal" ? "agri" : "warning"} size="xs">
                        {farm.healthStatus}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Field Officer Visit Log Records */}
      <div className="panel p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-forest" />
              <span>Field Officer Extension Visit Logs</span>
            </h3>
            <p className="text-xs text-slate-muted">Recorded agronomic observations and farmer feedback during in-person visits</p>
          </div>
          <Badge variant="lime" size="xs">{visitNotesList.length} Visit Records</Badge>
        </div>

        <div className="space-y-3">
          {visitNotesList.map(visit => (
            <div key={visit.id} className="p-4 bg-ivory rounded-2xl border border-slate-border text-xs space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-200">
                <span className="font-bold text-charcoal text-sm">{visit.farmName}</span>
                <div className="flex items-center gap-3 text-slate-muted">
                  <span>Officer: <strong className="text-forest">{visit.officer}</strong></span>
                  <span>Date: {visit.date}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <span className="text-slate-muted block font-bold uppercase text-[10px]">Farmer Feedback</span>
                  <p className="text-charcoal mt-0.5">{visit.feedback}</p>
                </div>
                <div>
                  <span className="text-slate-muted block font-bold uppercase text-[10px]">Action Plan / Recommendations</span>
                  <p className="text-forest font-semibold mt-0.5">{visit.action}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Log Visit Modal */}
      <Modal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        title="Log Field Extension Officer Visit"
        maxWidth="max-w-md"
      >
        <form onSubmit={handleVisitSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Select Farm Visited
            </label>
            <select
              value={visitNoteData.farmId}
              onChange={(e) => setVisitNoteData({ ...visitNoteData, farmId: e.target.value })}
              className="w-full bg-ivory text-charcoal text-xs sm:text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            >
              {farms.map(f => (
                <option key={f.id} value={f.id}>{f.name} ({f.district})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Field Extension Officer Name
            </label>
            <input
              type="text"
              required
              value={visitNoteData.officerName}
              onChange={(e) => setVisitNoteData({ ...visitNoteData, officerName: e.target.value })}
              className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Date of Inspection
            </label>
            <input
              type="date"
              required
              value={visitNoteData.visitDate}
              onChange={(e) => setVisitNoteData({ ...visitNoteData, visitDate: e.target.value })}
              className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Farmer Feedback & In-field Inquiries
            </label>
            <textarea
              rows={2}
              required
              value={visitNoteData.farmerFeedback}
              onChange={(e) => setVisitNoteData({ ...visitNoteData, farmerFeedback: e.target.value })}
              className="w-full bg-ivory text-charcoal text-sm p-3 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
              Action Items / Input Recommendation
            </label>
            <input
              type="text"
              required
              value={visitNoteData.actionItems}
              onChange={(e) => setVisitNoteData({ ...visitNoteData, actionItems: e.target.value })}
              className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
            />
          </div>

          <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsVisitModalOpen(false)}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-100 text-slate-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary text-xs"
            >
              Save Visit Log
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
