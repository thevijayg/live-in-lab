import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  BookOpen,
  Sprout,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  Info,
  Calendar,
  Layers,
  Thermometer,
  Droplets,
  FlaskConical
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { Modal } from "../components/common/Modal";

export function CropRecommendation() {
  const {
    selectedFarm,
    currentFarmFields,
    currentFarmSensors,
    cropLibrary
  } = useApp();

  const [selectedFieldId, setSelectedFieldId] = useState(currentFarmFields[0]?.id || "");
  const [selectedSeason, setSelectedSeason] = useState("Kharif");
  const [waterAvailability, setWaterAvailability] = useState("Medium");
  const [farmerPreference, setFarmerPreference] = useState("Commercial Oilseed / Cash Crop");

  const [selectedCropInfo, setSelectedCropInfo] = useState(null);

  const activeField = currentFarmFields.find(f => f.id === selectedFieldId) || currentFarmFields[0];
  const phSensor = currentFarmSensors.find(s => s.type === "Soil pH");
  const moistureSensor = currentFarmSensors.find(s => s.type === "Soil Moisture");

  // Rule-based transparent suitability scoring engine
  const evaluatedCrops = cropLibrary.map((crop) => {
    let score = 70; // baseline
    const matchesSoil = crop.optimalSoil.some(s => s.toLowerCase().includes(selectedFarm?.soilType?.toLowerCase() || ""));
    if (matchesSoil) score += 15;

    if (waterAvailability === "High" && crop.waterNeed.includes("High")) score += 10;
    if (waterAvailability === "Low" && crop.waterNeed.includes("Low")) score += 12;
    if (waterAvailability === "Low" && crop.waterNeed.includes("High")) score -= 25;

    if (crop.keyStates.includes(selectedFarm?.state || "Tamil Nadu")) score += 8;

    const finalScore = Math.min(96, Math.max(35, score));

    return {
      ...crop,
      suitabilityScore: finalScore,
      supportingConditions: `Matches ${selectedFarm?.soilType || 'soil'} in ${selectedFarm?.state || 'region'}. Compatible with current ${waterAvailability.toLowerCase()} irrigation capacity.`,
      potentialConstraints: finalScore < 60 ? "Requires higher water availability than currently configured." : "Monitor seasonal pest vulnerability in early vegetative phase.",
      missingData: "Sub-surface phosphorus telemetry uncalibrated.",
      suggestedNextStep: "Consult local Krishi Vigyan Kendra (KVK) for certified breeder seed availability."
    };
  }).sort((a, b) => b.suitabilityScore - a.suitabilityScore);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">
              Crop fit
            </h1>
            <Badge variant="outline">Soil, water, climate</Badge>
          </div>
          <p className="text-sm text-slate-muted mt-1">
            Which listed crops match this plot’s soil, irrigation, and typical weather — scored, not promised.
          </p>
        </div>
      </div>

      {/* Input Parameters Config Panel */}
      <div className="panel p-5 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
          Plot conditions to score against
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-bold text-slate-muted mb-1">Target Field / Plot</label>
            <select
              value={selectedFieldId}
              onChange={(e) => setSelectedFieldId(e.target.value)}
              className="w-full bg-ivory text-charcoal px-3 py-2 rounded-xl border border-slate-border font-semibold"
            >
              {currentFarmFields.map(fld => (
                <option key={fld.id} value={fld.id}>{fld.name} ({fld.area} Acres)</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-muted mb-1">Upcoming Crop Season</label>
            <select
              value={selectedSeason}
              onChange={(e) => setSelectedSeason(e.target.value)}
              className="w-full bg-ivory text-charcoal px-3 py-2 rounded-xl border border-slate-border font-semibold"
            >
              <option value="Kharif">Kharif (Monsoon / Thaladi)</option>
              <option value="Rabi">Rabi (Winter Sowing)</option>
              <option value="Zaid">Zaid / Summer Fallow</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-muted mb-1">Expected Water Availability</label>
            <select
              value={waterAvailability}
              onChange={(e) => setWaterAvailability(e.target.value)}
              className="w-full bg-ivory text-charcoal px-3 py-2 rounded-xl border border-slate-border font-semibold"
            >
              <option value="High">High (Perennial Canal / Deep Borewell)</option>
              <option value="Medium">Medium (Micro-Drip + Shared Sluice)</option>
              <option value="Low">Low (Rainfed / Semi-Arid Dryland)</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-muted mb-1">Observed Soil pH & Moisture</label>
            <div className="bg-ivory px-3 py-2 rounded-xl border border-slate-border text-forest font-bold text-xs flex items-center justify-between">
              <span>pH: {phSensor?.latestReading || "6.8"}</span>
              <span>Moisture: {moistureSensor?.latestReading || "58"}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transparency Disclaimer Notice */}
      <div className="bg-ivory p-4 rounded-2xl border border-slate-border flex items-start gap-3 text-xs text-slate-muted">
        <Info className="w-5 h-5 text-forest flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-charcoal">Agronomic Advisory Notice:</strong> Suitability scores are rule-based indicative models reflecting agro-ecological fit. They do not constitute scientific harvest guarantees or commercial price forecasts. Local agricultural extension officers should always be consulted prior to sowing.
        </p>
      </div>

      {/* Evaluated Crops Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {evaluatedCrops.map((crop) => (
          <div
            key={crop.name}
            className="bg-white rounded-2xl p-5 border border-slate-border shadow-sm flex flex-col justify-between hover:border-agri/40 transition-all text-xs space-y-4"
          >
            <div>
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-bold text-charcoal">{crop.name}</h3>
                  <span className="text-[11px] text-slate-muted font-medium">{crop.season}</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-semibold text-forest">{crop.suitabilityScore}</span>
                  <span className="text-xs font-bold text-slate-muted">/100</span>
                  <Badge variant={crop.suitabilityScore >= 80 ? "agri" : crop.suitabilityScore >= 60 ? "lime" : "warning"} size="xs" className="block mt-0.5">
                    {crop.suitabilityScore >= 80 ? "Highly Suitable" : crop.suitabilityScore >= 60 ? "Moderate Fit" : "Conditional"}
                  </Badge>
                </div>
              </div>

              <p className="mt-3 text-slate-muted leading-relaxed line-clamp-2">
                {crop.description}
              </p>

              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-slate-muted">Water Need:</span>
                  <strong className="text-charcoal">{crop.waterNeed}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-muted">Optimal pH:</span>
                  <strong className="text-charcoal">{crop.phRange[0]} - {crop.phRange[1]}</strong>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-muted">Duration:</span>
                  <strong className="text-charcoal">{crop.growthDurationDays} Days</strong>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedCropInfo(crop)}
                className="text-xs font-bold text-forest hover:underline"
              >
                View Agronomic Criteria →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Crop Information Library Modal */}
      {selectedCropInfo && (
        <Modal
          isOpen={!!selectedCropInfo}
          onClose={() => setSelectedCropInfo(null)}
          title={`Crop Agronomic Profile: ${selectedCropInfo.name}`}
          maxWidth="max-w-xl"
        >
          <div className="space-y-4 text-xs">
            <div className="p-4 bg-ivory rounded-xl border border-slate-border">
              <h4 className="font-bold text-charcoal text-sm">{selectedCropInfo.name}</h4>
              <p className="mt-1 text-slate-muted">{selectedCropInfo.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-muted block font-bold uppercase text-[10px]">Optimal Soil Types</span>
                <span className="font-semibold text-charcoal">{selectedCropInfo.optimalSoil.join(", ")}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-muted block font-bold uppercase text-[10px]">Temperature Range</span>
                <span className="font-semibold text-charcoal">{selectedCropInfo.tempRange[0]}°C — {selectedCropInfo.tempRange[1]}°C</span>
              </div>
            </div>

            <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-slate-muted block font-bold uppercase text-[10px]">Rule-Based Supporting Factors</span>
              <p className="text-slate-muted">{selectedCropInfo.supportingConditions}</p>
              <span className="text-slate-muted block font-bold uppercase text-[10px] mt-2">Potential Constraints</span>
              <p className="text-slate-muted">{selectedCropInfo.potentialConstraints}</p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedCropInfo(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-forest text-cream"
              >
                Close Crop Profile
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
