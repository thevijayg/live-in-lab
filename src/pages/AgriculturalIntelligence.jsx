import React, { useState, useRef, useEffect } from "react";
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
  ArrowRight,
  Play,
  ChevronDown,
  ChevronUp,
  Database,
  Zap,
  Shield,
  BarChart3,
  CheckSquare
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

  // Train AI Model state
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState("");
  const [trainingLog, setTrainingLog] = useState([]);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [trainingResults, setTrainingResults] = useState(null);
  const [showTrainingPanel, setShowTrainingPanel] = useState(true);
  const logRef = useRef(null);

  const TRAINING_PHASES = [
    { id: 1, label: "Data Validation", description: "Validating sensor telemetry dataset...", startPct: 0, endPct: 25, duration: 3500 },
    { id: 2, label: "Threshold Calibration", description: "Calibrating crop-specific thresholds...", startPct: 25, endPct: 55, duration: 4500 },
    { id: 3, label: "Rule Weight Adjustment", description: "Adjusting rule weights from farmer feedback...", startPct: 55, endPct: 80, duration: 3500 },
    { id: 4, label: "Model Validation", description: "Running cross-validation on pilot farm data...", startPct: 80, endPct: 100, duration: 3500 }
  ];

  const TRAINING_LOG_ENTRIES = [
    { delay: 200, type: "INFO", msg: "Initializing AGRINOVA Rule Engine training pipeline..." },
    { delay: 700, type: "INFO", msg: "Loading 2,847 sensor records from 4 pilot farms..." },
    { delay: 1400, type: "INFO", msg: "Data validation: 98.3% records valid (47 outliers excluded)" },
    { delay: 2200, type: "INFO", msg: "Calibrating soil moisture thresholds for Cotton (Bt Hybrid)..." },
    { delay: 3200, type: "INFO", msg: "Updating AWD timing rules for Paddy (CR 1009)..." },
    { delay: 4500, type: "INFO", msg: "Processing farmer acceptance feedback (312 records)..." },
    { delay: 5800, type: "INFO", msg: "Cross-validation: fold 1/5 accuracy = 91.2%" },
    { delay: 7000, type: "INFO", msg: "Cross-validation: fold 2/5 accuracy = 89.6%" },
    { delay: 8200, type: "WARN", msg: "Low confidence rule detected: RULE-SOIL-COND-07 (removed)" },
    { delay: 9400, type: "INFO", msg: "Cross-validation: fold 3/5 accuracy = 90.1%" },
    { delay: 10600, type: "INFO", msg: "Cross-validation: fold 4/5 accuracy = 88.4%" },
    { delay: 11800, type: "INFO", msg: "Cross-validation: fold 5/5 accuracy = 87.8%" },
    { delay: 13000, type: "INFO", msg: "Finalizing model weights and rule updates..." },
    { delay: 14200, type: "SUCCESS", msg: "Training complete. New model: v2.2.0" }
  ];

  const startTraining = () => {
    setIsTraining(true);
    setTrainingComplete(false);
    setTrainingProgress(0);
    setTrainingLog([]);
    setTrainingResults(null);
    setCurrentPhase(TRAINING_PHASES[0].description);

    // Schedule log entries
    const logTimers = TRAINING_LOG_ENTRIES.map(entry =>
      setTimeout(() => {
        const ts = new Date().toLocaleTimeString("en-IN", { hour12: false });
        setTrainingLog(prev => [...prev, { time: ts, type: entry.type, msg: entry.msg }]);
      }, entry.delay)
    );

    // Animate progress through phases
    let phaseIdx = 0;
    const totalDuration = TRAINING_PHASES.reduce((sum, p) => sum + p.duration, 0);
    const tickInterval = 80; // ms per tick
    let elapsed = 0;

    const progressTimer = setInterval(() => {
      elapsed += tickInterval;
      const phase = TRAINING_PHASES[phaseIdx];
      const phaseElapsed = elapsed - TRAINING_PHASES.slice(0, phaseIdx).reduce((s, p) => s + p.duration, 0);
      const phaseProgress = Math.min(phaseElapsed / phase.duration, 1);
      const pct = Math.round(phase.startPct + (phase.endPct - phase.startPct) * phaseProgress);

      setTrainingProgress(pct);
      setCurrentPhase(phase.description);

      if (phaseElapsed >= phase.duration && phaseIdx < TRAINING_PHASES.length - 1) {
        phaseIdx++;
      }

      if (elapsed >= totalDuration) {
        clearInterval(progressTimer);
        setTrainingProgress(100);
        setIsTraining(false);
        setTrainingComplete(true);
        setCurrentPhase("Complete");
        setTrainingResults({
          accuracyImprovement: "+4.2%",
          rulesUpdated: "7 of 23",
          anomalyPatterns: 2,
          validationScore: "89.3%",
          trainingDuration: "2m 14s",
          prevVersion: "v2.1.4",
          newVersion: "v2.2.0"
        });
      }
    }, tickInterval);
  };

  // Auto-scroll training log
  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [trainingLog]);

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
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">
              Field advice
            </h1>
            <Badge variant="outline">Rules, not a black box</Badge>
          </div>
          <p className="text-sm text-slate-muted mt-1">
            Each note lists the rule, the crop stage, and the readings that triggered it.
          </p>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="btn-primary self-start sm:self-auto"
        >
          <BrainCircuit className={`w-4 h-4 ${isGenerating ? "animate-spin" : ""}`} />
          <span>{isGenerating ? "Checking readings…" : "Re-run rules"}</span>
        </button>
      </div>

      <div className="bg-ivory p-4 rounded-md border border-slate-border flex items-start gap-3 text-sm text-charcoal">
        <HelpCircle className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          Advice here is from published agronomic thresholds, not a hidden model. Yield promises are not generated.
        </p>
      </div>

      {/* ═══════════════ TRAIN AI MODEL PANEL ═══════════════ */}
      <div className="panel overflow-hidden">
        {/* Panel Header */}
        <div className="px-5 py-4 border-b border-slate-border flex items-center justify-between">
          <div>
              <h2 className="font-sans text-sm font-semibold text-charcoal">
                Recalibrate thresholds
              </h2>
              <p className="text-xs text-slate-muted mt-0.5">
                Uses stored farmer accept/reject feedback to nudge moisture and AWD bands. This is a demo run.
              </p>
          </div>
          <button
            onClick={() => setShowTrainingPanel(!showTrainingPanel)}
            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-muted transition-colors"
          >
            {showTrainingPanel ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showTrainingPanel && (
          <div className="p-6 space-y-5">
            {/* Two-column top layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Dataset Summary + Train Button */}
              <div className="space-y-4">
                <div className="p-4 rounded-xl bg-ivory border border-slate-200 space-y-2.5">
                  <h4 className="text-xs font-bold text-charcoal flex items-center gap-2 uppercase tracking-wider">
                    <Database className="w-3.5 h-3.5 text-forest" />
                    Training Dataset Summary
                  </h4>
                  <div className="space-y-1.5 text-xs text-charcoal">
                    {[
                      { label: "Sensor readings", value: "2,847 records (last 90 days)" },
                      { label: "Farms included", value: "4 (Tamil Nadu: 2, Maharashtra: 2)" },
                      { label: "Crop varieties", value: "6 types" },
                      { label: "Outcome labels", value: "Irrigation events, Yield notes" }
                    ].map(row => (
                      <div key={row.label} className="flex items-start gap-2">
                        <span className="text-agri mt-0.5">•</span>
                        <span>
                          <span className="font-semibold text-slate-600">{row.label}:</span>{" "}
                          {row.value}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Model Metadata */}
                <div className="p-4 rounded-xl bg-forest/5 border border-forest/15 space-y-2">
                  <h4 className="text-xs font-bold text-forest uppercase tracking-wider flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5" />
                    Current Model Metadata
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { label: "Version", value: trainingComplete ? "v2.2.0" : "v2.1.4" },
                      { label: "Last Trained", value: trainingComplete ? "Just now" : "Oct 18, 2026" },
                      { label: "Farm Coverage", value: "4 pilot farms" },
                      { label: "Active Rules", value: trainingComplete ? "25 rules" : "23 rules" }
                    ].map(m => (
                      <div key={m.label} className="bg-white rounded-lg px-3 py-2 border border-forest/10">
                        <p className="text-[10px] text-slate-muted uppercase tracking-wide">{m.label}</p>
                        <p className="font-bold text-charcoal mt-0.5">{m.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Train Button */}
                <button
                  onClick={startTraining}
                  disabled={isTraining}
                  className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold shadow-md transition-all ${
                    isTraining
                      ? "bg-slate-200 text-slate-500 cursor-not-allowed"
                      : "btn-primary"
                  }`}
                >
                  <Play className={`w-4 h-4 ${isTraining ? "animate-pulse" : ""}`} />
                  {isTraining ? "Training in Progress..." : "Train on Farm Data"}
                </button>

                {/* Disclaimer */}
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 leading-relaxed">
                  <strong>ℹ️ Transparency Note:</strong> AGRINOVA uses transparent rule-based logic. "Training" refines rule thresholds and weights from field feedback — no black-box neural networks are used.
                </div>
              </div>

              {/* Progress + Phases / Results */}
              <div className="space-y-4">
                {/* Progress Bar */}
                {(isTraining || trainingComplete) && (
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="font-bold text-charcoal">{currentPhase}</span>
                      <span className="font-mono font-bold text-forest">{trainingProgress}%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-forest to-agri rounded-full transition-all duration-150"
                        style={{ width: `${trainingProgress}%` }}
                      />
                    </div>

                    {/* Phase checklist */}
                    <div className="space-y-1.5 pt-1">
                      {TRAINING_PHASES.map(phase => {
                        const done = trainingProgress >= phase.endPct;
                        const inProgress = !done && trainingProgress >= phase.startPct;
                        return (
                          <div key={phase.id} className="flex items-center gap-2 text-xs">
                            <span className={`w-4 h-4 flex-shrink-0 flex items-center justify-center rounded-full text-[10px] font-bold ${
                              done
                                ? "bg-agri text-white"
                                : inProgress
                                ? "bg-amber-400 text-white animate-pulse"
                                : "bg-slate-200 text-slate-400"
                            }`}>
                              {done ? "✓" : inProgress ? "⟳" : "○"}
                            </span>
                            <span className={`${done ? "text-charcoal font-semibold" : inProgress ? "text-amber-700 font-semibold" : "text-slate-400"}`}>
                              Phase {phase.id}: {phase.label}
                              {done && <span className="ml-1 text-agri">✓ Complete</span>}
                              {inProgress && <span className="ml-1 text-amber-600">⟳ In Progress</span>}
                              {!done && !inProgress && <span className="ml-1 text-slate-400">○ Queued</span>}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Training Results */}
                {trainingComplete && trainingResults && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3">
                    <h4 className="text-xs font-bold text-emerald-800 flex items-center gap-2 uppercase tracking-wider">
                      <CheckCircle2 className="w-4 h-4 text-agri" />
                      Last Training Run — Results
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { label: "Accuracy Improvement", value: trainingResults.accuracyImprovement + " vs baseline", color: "text-agri" },
                        { label: "Rules Updated", value: trainingResults.rulesUpdated + " agronomic rules", color: "text-charcoal" },
                        { label: "New Anomaly Patterns", value: trainingResults.anomalyPatterns + " detected", color: "text-charcoal" },
                        { label: "Validation Score", value: trainingResults.validationScore, color: "text-charcoal" },
                        { label: "Training Duration", value: trainingResults.trainingDuration, color: "text-charcoal" },
                        { label: "Model Version", value: `${trainingResults.prevVersion} → ${trainingResults.newVersion}`, color: "text-forest font-mono" }
                      ].map(r => (
                        <div key={r.label} className="bg-white rounded-lg px-3 py-2 border border-emerald-100">
                          <p className="text-[10px] text-slate-muted uppercase tracking-wide">{r.label}</p>
                          <p className={`font-bold mt-0.5 ${r.color}`}>{r.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Placeholder before training */}
                {!isTraining && !trainingComplete && (
                  <div className="p-6 rounded-xl border-2 border-dashed border-slate-200 text-center text-slate-400 flex flex-col items-center gap-3">
                    <BrainCircuit className="w-10 h-10 opacity-30" />
                    <div>
                      <p className="text-sm font-semibold">No training run yet</p>
                      <p className="text-xs mt-1">Click "Train on Farm Data" to start the adaptive rule refinement process.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Training Log */}
            {(isTraining || trainingComplete) && trainingLog.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-charcoal uppercase tracking-wider flex items-center gap-2">
                  <BarChart3 className="w-3.5 h-3.5 text-slate-muted" />
                  Training Event Log
                </h4>
                <div
                  ref={logRef}
                  className="bg-slate-900 rounded-xl p-4 h-40 overflow-y-auto font-mono text-[11px] space-y-1 scroll-smooth"
                >
                  {trainingLog.map((entry, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="text-slate-500 flex-shrink-0">[{entry.time}]</span>
                      <span className={`flex-shrink-0 font-bold ${
                        entry.type === "SUCCESS" ? "text-agri" :
                        entry.type === "WARN" ? "text-amber-400" :
                        entry.type === "ERROR" ? "text-red-400" :
                        "text-slate-400"
                      }`}>{entry.type}</span>
                      <span className="text-slate-200">{entry.msg}</span>
                    </div>
                  ))}
                  {isTraining && (
                    <div className="flex items-center gap-2 text-slate-500">
                      <span className="animate-pulse">▌</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      {/* ═══════════════ END TRAIN AI MODEL PANEL ═══════════════ */}

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
                <div className="p-3.5 rounded-xl bg-forest text-cream flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
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
                className="px-4 py-2 rounded-xl text-xs font-bold bg-forest text-cream"
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
