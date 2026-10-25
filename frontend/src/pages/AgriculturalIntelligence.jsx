import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  BrainCircuit,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  HelpCircle,
  Droplets,
  Sprout,
  ShieldAlert,
  Cpu,
  RefreshCw,
  ArrowRight
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";

export function AgriculturalIntelligence() {
  const {
    recommendations,
    updateRecommendationStatus,
    generateRecommendations,
    selectedFarm,
    selectedFarmId,
    farms
  } = useApp();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const [explainingRec, setExplainingRec] = useState(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    await generateRecommendations(selectedFarmId);
    setTimeout(() => setIsGenerating(false), 600);
  };

  const categories = [
    "Irrigation",
    "Crop suitability",
    "Soil condition",
    "Resource efficiency",
    "Environmental risk",
    "Data quality"
  ];

  const filteredRecs = recommendations.filter(rec => {
    const matchesSearch =
      rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.explanation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rec.suggestedAction.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || rec.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesPriority = !selectedPriority || rec.priority.toLowerCase() === selectedPriority.toLowerCase();
    const matchesStatus = !selectedStatus || rec.status.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal">
              Agricultural Intelligence Engine
            </h1>
            <Badge variant="agri">Decide Layer</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Transparent, rule-based decision engine converting real-time field telemetry into actionable farmer advisories.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-forest hover:bg-forest-dark text-lime-accent shadow-md transition-all self-start sm:self-auto"
        >
          <BrainCircuit className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
          <span>{isGenerating ? "Evaluating Rules..." : "Re-evaluate Rule Engine"}</span>
        </button>
      </div>

      {/* Transparent AI Architecture Banner */}
      <div className="bg-lime-soft p-4 rounded-2xl border border-agri/20 flex items-start gap-3 text-xs text-forest-dark">
        <HelpCircle className="w-5 h-5 text-agri flex-shrink-0 mt-0.5" />
        <div>
          <h4 className="font-bold">Transparent Rule-Based Architecture</h4>
          <p className="mt-0.5 opacity-90 leading-relaxed">
            Every recommendation below specifies its triggering agronomic rule, crop phenological stage, and supporting sensor measurements. No opaque black-box machine learning predictions or fabricated yield figures are used.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-border shadow-sm grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search advisory text..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-ivory text-charcoal pl-9 pr-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-ivory text-charcoal px-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none cursor-pointer"
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          className="bg-ivory text-charcoal px-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none cursor-pointer"
        >
          <option value="">All Priorities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="bg-ivory text-charcoal px-3 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none cursor-pointer"
        >
          <option value="">All Statuses</option>
          <option value="New">New</option>
          <option value="Reviewed">Reviewed</option>
          <option value="Accepted">Accepted</option>
          <option value="Dismissed">Dismissed</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Recommendations List */}
      <div className="space-y-4">
        {filteredRecs.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center text-slate-muted border border-slate-border text-sm">
            No recommendations match your current filters.
          </div>
        ) : (
          filteredRecs.map((rec) => {
            const isCritical = rec.priority === "Critical";
            const isHigh = rec.priority === "High";

            return (
              <div
                key={rec.id}
                className={`bg-white rounded-2xl p-5 sm:p-6 border shadow-sm transition-all text-xs space-y-3 ${
                  isCritical
                    ? "border-rose-200 bg-rose-50/20"
                    : isHigh
                    ? "border-amber-200"
                    : "border-slate-border"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={isCritical ? "danger" : isHigh ? "warning" : "agri"}
                      size="sm"
                    >
                      {rec.priority} Priority
                    </Badge>
                    <span className="font-bold text-forest uppercase tracking-wider text-[11px]">
                      {rec.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-slate-muted text-[11px]">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(rec.timestamp).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}</span>
                    <Badge variant={rec.status === "New" ? "lime" : rec.status === "Accepted" ? "agri" : "default"} size="xs">
                      Status: {rec.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-charcoal">
                    {rec.title}
                  </h3>
                  <p className="mt-1 text-slate-muted leading-relaxed">
                    {rec.explanation}
                  </p>
                </div>

                {/* Supporting Measurements Box */}
                <div className="p-3 bg-ivory rounded-xl border border-slate-200/80 font-mono text-[11px] text-charcoal">
                  <span className="text-slate-muted block font-sans font-bold uppercase text-[10px] mb-0.5">
                    Supporting Field Telemetry & Baseline:
                  </span>
                  {rec.supportingMeasurements}
                </div>

                {/* Suggested Action Bar */}
                <div className="p-3.5 rounded-xl bg-forest text-lime-accent flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-white/80 block">
                      Suggested Agronomic Action:
                    </span>
                    <p className="font-semibold text-xs text-white mt-0.5">
                      {rec.suggestedAction}
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <button
                      onClick={() => setExplainingRec(rec)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-bold bg-white/10 hover:bg-white/20 text-white transition-colors"
                    >
                      Why this rule?
                    </button>
                    {rec.status !== "Accepted" && (
                      <button
                        onClick={() => updateRecommendationStatus(rec.id, "Accepted")}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-lime-accent text-forest-dark hover:bg-lime-light transition-colors shadow-sm"
                      >
                        Accept Action
                      </button>
                    )}
                    {rec.status === "Accepted" && (
                      <button
                        onClick={() => updateRecommendationStatus(rec.id, "Completed")}
                        className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 text-white hover:bg-emerald-800 transition-colors"
                      >
                        Mark Completed
                      </button>
                    )}
                    {rec.status === "New" && (
                      <button
                        onClick={() => updateRecommendationStatus(rec.id, "Dismissed")}
                        className="px-2.5 py-1.5 rounded-lg text-xs text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                      >
                        Dismiss
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* "Why this rule?" Explanation Modal */}
      {explainingRec && (
        <Modal
          isOpen={!!explainingRec}
          onClose={() => setExplainingRec(null)}
          title={`How was this recommendation generated?`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-ivory rounded-xl border border-slate-border">
              <span className="text-slate-muted block text-[10px] uppercase font-bold">Rule Trigger Identifier</span>
              <p className="font-mono text-sm font-bold text-forest mt-0.5">{explainingRec.ruleTriggered || "RULE-GENERIC-EVAL"}</p>
            </div>

            <div>
              <h4 className="font-bold text-charcoal text-sm">Agronomic Rule Rationale</h4>
              <p className="mt-1 text-slate-muted leading-relaxed">
                The AGRINOVA Decision Engine continuously evaluates incoming IoT sensor readings against validated phenological requirements for the registered crop variety.
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <strong className="text-charcoal block">Input Telemetry Checked:</strong>
                <span className="text-slate-muted">{explainingRec.supportingMeasurements}</span>
              </div>
              <div className="p-3 bg-white rounded-lg border border-slate-200">
                <strong className="text-charcoal block">Underlying Decision Logic:</strong>
                <span className="text-slate-muted">{explainingRec.explanation}</span>
              </div>
            </div>

            <div className="p-3 bg-lime-soft rounded-lg border border-agri/20 text-forest-dark text-[11px]">
              <strong>Transparency Guarantee:</strong> This advisory was deterministically generated via the open rule repository. No unverified machine learning heuristics or opaque predictions are executed.
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setExplainingRec(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-forest text-lime-accent"
              >
                Close Explanation
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
