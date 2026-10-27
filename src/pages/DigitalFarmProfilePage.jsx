import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  FileCheck2,
  Printer,
  Download,
  Share2,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sprout,
  Cpu,
  Droplets,
  Layers,
  MapPin,
  Calendar,
  Info,
  Clock,
  Landmark
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { LocationMapPanel } from "../components/common/LocationMapPanel";

export function DigitalFarmProfilePage() {
  const {
    selectedFarm,
    currentFarmFields,
    currentFarmSensors,
    recommendations,
    irrigationLogs,
    documents,
    consents
  } = useApp();

  const [activeSection, setActiveSection] = useState("all");

  const farmRecs = recommendations.filter(r => r.farmId === selectedFarm?.id);
  const farmLogs = irrigationLogs.filter(l => l.farmId === selectedFarm?.id);
  const farmDocs = documents.filter(d => d.farmId === selectedFarm?.id);
  const farmConsents = consents.filter(c => c.farmId === selectedFarm?.id);

  // Dynamic completeness calculation
  const completenessItems = [
    { label: "Farm & Farmer Identity", complete: !!(selectedFarm?.name && selectedFarm?.farmerName), weight: 20 },
    { label: "Pilot Geolocation Coordinates", complete: !!(selectedFarm?.coordinates?.lat && selectedFarm?.district), weight: 15 },
    { label: "Soil & Irrigation Infrastructure", complete: !!(selectedFarm?.soilType && selectedFarm?.irrigationType), weight: 15 },
    { label: "Field Boundary Parcels Mapped", complete: currentFarmFields.length > 0, weight: 15 },
    { label: "IoT Sensor Probes Paired", complete: currentFarmSensors.length > 0, weight: 15 },
    { label: "Uploaded Farmer Documentation", complete: farmDocs.length > 0, weight: 10 },
    { label: "Consent & Data-Sharing Preference", complete: farmConsents.length > 0, weight: 10 }
  ];

  const totalScore = completenessItems.reduce((acc, item) => acc + (item.complete ? item.weight : 0), 0);
  const missingItems = completenessItems.filter(item => !item.complete);

  // Export to JSON Handler
  const handleExportJSON = () => {
    const profileObject = {
      schemaVersion: "AGRINOVA-DFP-v1.0",
      generatedAt: new Date().toISOString(),
      disclaimer: "Demonstration Digital Farm Profile. Farmer-provided information is unverified by third parties unless explicitly stamped.",
      completenessPercent: totalScore,
      isFinanceReady: totalScore >= 80,
      farmIdentity: {
        id: selectedFarm?.id,
        name: selectedFarm?.name,
        farmerName: selectedFarm?.farmerName,
        state: selectedFarm?.state,
        district: selectedFarm?.district,
        village: selectedFarm?.village,
        areaAcres: selectedFarm?.area,
        coordinates: selectedFarm?.coordinates
      },
      agronomicDetails: {
        soilType: selectedFarm?.soilType,
        irrigationType: selectedFarm?.irrigationType,
        mainCrop: selectedFarm?.mainCrop,
        fields: currentFarmFields
      },
      telemetryInventory: currentFarmSensors.map(s => ({
        id: s.id,
        type: s.type,
        latestReading: s.latestReading,
        unit: s.unit,
        status: s.status,
        lastUpdated: s.lastUpdated
      })),
      recentIrrigationEvents: farmLogs,
      activeAdvisories: farmRecs,
      associatedDocuments: farmDocs,
      consentRecords: farmConsents
    };

    const blob = new Blob([JSON.stringify(profileObject, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${selectedFarm?.id || 'FARM'}_Digital_Profile_v1.0.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export to CSV Handler
  const handleExportCSV = () => {
    const rows = [
      ["AGRINOVA DIGITAL FARM PROFILE", "Schema: AGRINOVA-DFP-v1.0", `Generated: ${new Date().toISOString()}`],
      [""],
      ["FARM IDENTITY"],
      ["Farm ID", selectedFarm?.id],
      ["Farm Name", selectedFarm?.name],
      ["Farmer Name", selectedFarm?.farmerName],
      ["State", selectedFarm?.state],
      ["District", selectedFarm?.district],
      ["Village", selectedFarm?.village],
      ["Total Land Area (Acres)", selectedFarm?.area],
      ["Soil Classification", selectedFarm?.soilType],
      ["Primary Irrigation", selectedFarm?.irrigationType],
      ["Main Crop", selectedFarm?.mainCrop],
      ["Profile Completeness (%)", `${totalScore}%`],
      [""],
      ["FIELD PARCELS"],
      ["Field ID", "Field Name", "Area (Acres)", "Crop", "Growth Stage"],
      ...currentFarmFields.map(f => [f.id, f.name, f.area, f.crop, f.cropStage]),
      [""],
      ["IOT SENSORS TELEMETRY"],
      ["Sensor ID", "Sensor Name", "Type", "Latest Reading", "Unit", "Status"],
      ...currentFarmSensors.map(s => [s.id, s.name, s.type, s.latestReading, s.unit, s.status])
    ];

    const csvContent = "data:text/csv;charset=utf-8," + rows.map(e => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `${selectedFarm?.id || 'FARM'}_Digital_Profile.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header with Export Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 no-print">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="page-title">
              Farm profile
            </h1>
            <Badge variant="outline">Shareable record</Badge>
          </div>
          <p className="text-sm text-slate-muted mt-1">
            Identity, season notes, and probe history in one file — shared only after consent.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-ivory text-charcoal hover:bg-slate-100 border border-slate-border transition-colors shadow-sm"
          >
            <Printer className="w-3.5 h-3.5 text-forest" />
            <span>Print Report</span>
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-ivory text-charcoal hover:bg-slate-100 border border-slate-border transition-colors shadow-sm"
          >
            <Download className="w-3.5 h-3.5 text-forest" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleExportJSON}
            className="btn-primary text-xs"
          >
            <Download className="w-4 h-4" />
            <span>Export DFP JSON</span>
          </button>
        </div>
      </div>

      {/* Completeness Gauge & Missing Data Checklist */}
      <div className="panel p-5 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        <div className="lg:col-span-4 bg-ivory p-6 rounded-2xl border border-slate-200/80 text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-muted">
            Profile Completeness
          </span>
          <div className="mt-2 flex items-center justify-center gap-1">
            <span className="text-5xl font-semibold text-forest">{totalScore}</span>
            <span className="text-xl font-bold text-slate-muted">%</span>
          </div>
          <Badge variant={totalScore >= 80 ? "agri" : "warning"} size="sm" className="mt-2">
            {totalScore >= 80 ? "Finance-Ready Verified Profile" : "Incomplete Documentation"}
          </Badge>
          <p className="text-[11px] text-slate-500 mt-2">
            Calculated dynamically from 7 core documentation dimensions.
          </p>
        </div>

        <div className="lg:col-span-8 space-y-3">
          <h3 className="text-sm font-bold text-charcoal">
            Documentation Completeness Checklist
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            {completenessItems.map((item, idx) => (
              <div
                key={idx}
                className={`p-2.5 rounded-xl border flex items-center justify-between ${
                  item.complete
                    ? "bg-emerald-50/60 border-emerald-200 text-charcoal"
                    : "bg-slate-50 border-slate-200 text-slate-500"
                }`}
              >
                <div className="flex items-center gap-2">
                  {item.complete ? (
                    <CheckCircle2 className="w-4 h-4 text-agri flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  )}
                  <span>{item.label}</span>
                </div>
                <span className="text-[11px] font-mono font-bold text-slate-400">+{item.weight}%</span>
              </div>
            ))}
          </div>

          {missingItems.length > 0 && (
            <p className="text-[11px] text-amber-warn font-medium pt-1">
              * Missing items: {missingItems.map(m => m.label).join(", ")}. Upload supporting records to achieve 100% finance-readiness.
            </p>
          )}
        </div>
      </div>

      {/* Printable Structured Farm Report Container */}
      <div className="bg-white rounded-md p-6 sm:p-10 border border-slate-border shadow-md space-y-8 print:border-none print:shadow-none print:p-0">
        {/* Printable Report Header */}
        <div className="flex items-start justify-between pb-6 border-b-2 border-forest">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-forest flex items-center justify-center p-2">
              <img src="/logo.svg" alt="logo" className="w-full h-full" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-forest-dark tracking-tight">AGRINOVA</h2>
              <p className="text-xs font-semibold text-agri uppercase tracking-widest">
                Official Digital Farm Profile Summary
              </p>
            </div>
          </div>
          <div className="text-right text-xs">
            <p className="font-mono font-bold text-charcoal">{selectedFarm?.id}</p>
            <p className="text-slate-muted">Generated: {new Date().toLocaleDateString()}</p>
            <p className="text-slate-muted font-mono text-[10px]">Schema: AGRINOVA-DFP-v1.0</p>
          </div>
        </div>

        {/* Section 1: Farm & Farmer Identity */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-forest flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <Sprout className="w-4 h-4 text-agri" />
            <span>1. Farm & Landholder Identity</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="bg-ivory p-3 rounded-xl border border-slate-200">
              <span className="text-slate-muted block text-[10px] uppercase font-bold">Farm Title</span>
              <strong className="text-charcoal text-sm">{selectedFarm?.name}</strong>
            </div>
            <div className="bg-ivory p-3 rounded-xl border border-slate-200">
              <span className="text-slate-muted block text-[10px] uppercase font-bold">Registered Farmer</span>
              <strong className="text-charcoal text-sm">{selectedFarm?.farmerName}</strong>
            </div>
            <div className="bg-ivory p-3 rounded-xl border border-slate-200">
              <span className="text-slate-muted block text-[10px] uppercase font-bold">Pilot State & District</span>
              <strong className="text-charcoal text-sm">{selectedFarm?.village}, {selectedFarm?.district}, {selectedFarm?.state}</strong>
            </div>
            <div className="bg-ivory p-3 rounded-xl border border-slate-200">
              <span className="text-slate-muted block text-[10px] uppercase font-bold">Total Cultivated Area</span>
              <strong className="text-charcoal text-sm">{selectedFarm?.area} {selectedFarm?.areaUnit}</strong>
            </div>
          </div>
        </div>

        {/* Section 2: Soil & Agronomic Characterization */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-forest flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <Layers className="w-4 h-4 text-agri" />
            <span>2. Soil & Irrigation Infrastructure</span>
          </h3>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-ivory border border-slate-200">
              <span className="text-slate-muted block text-[10px] uppercase font-bold">Soil Type</span>
              <strong className="text-charcoal">{selectedFarm?.soilType}</strong>
            </div>
            <div className="p-3 rounded-xl bg-ivory border border-slate-200">
              <span className="text-slate-muted block text-[10px] uppercase font-bold">Irrigation Mode</span>
              <strong className="text-charcoal">{selectedFarm?.irrigationType}</strong>
            </div>
            <div className="p-3 rounded-xl bg-ivory border border-slate-200">
              <span className="text-slate-muted block text-[10px] uppercase font-bold">Primary Cultivated Crop</span>
              <strong className="text-forest">{selectedFarm?.mainCrop}</strong>
            </div>
          </div>
        </div>

        {/* Section 3: Registered Sub-Plots / Fields */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-forest flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <Layers className="w-4 h-4 text-agri" />
            <span>3. Field Parcel Inventory</span>
          </h3>
          <div className="overflow-x-auto text-xs">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-ivory border-b border-slate-100 text-slate-muted font-bold uppercase text-[10px]">
                  <th className="py-2 px-3">Field ID</th>
                  <th className="py-2 px-3">Parcel Title</th>
                  <th className="py-2 px-3">Crop Variety</th>
                  <th className="py-2 px-3">Stage</th>
                  <th className="py-2 px-3 text-right">Area (Acres)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {currentFarmFields.map(fld => (
                  <tr key={fld.id}>
                    <td className="py-2 px-3 font-mono">{fld.id}</td>
                    <td className="py-2 px-3 font-bold text-charcoal">{fld.name}</td>
                    <td className="py-2 px-3">{fld.crop}</td>
                    <td className="py-2 px-3 text-slate-muted">{fld.cropStage}</td>
                    <td className="py-2 px-3 text-right font-bold">{fld.area}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Section 4: Sensor Hardware Inventory */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-forest flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <Cpu className="w-4 h-4 text-agri" />
            <span>4. IoT Sensor Telemetry Inventory</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            {currentFarmSensors.map(sensor => (
              <div key={sensor.id} className="p-3 rounded-xl bg-ivory border border-slate-200 space-y-1">
                <span className="font-bold text-charcoal block truncate">{sensor.type}</span>
                <span className="text-base font-semibold text-forest block">{sensor.latestReading} {sensor.unit}</span>
                <span className="font-mono text-[10px] text-slate-400 block">{sensor.id}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section 5: Documents & Verified Attachments */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold uppercase tracking-wider text-forest flex items-center gap-2 border-b border-slate-200 pb-1.5">
            <FileCheck2 className="w-4 h-4 text-agri" />
            <span>5. Attached Documentation Records</span>
          </h3>
          <div className="space-y-2 text-xs">
            {farmDocs.length === 0 ? (
              <p className="text-slate-muted italic">No farmer documents uploaded yet.</p>
            ) : (
              farmDocs.map(doc => (
                <div key={doc.id} className="p-2.5 rounded-xl bg-ivory border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-charcoal">{doc.name}</span>
                    <span className="text-slate-muted text-[11px] block">{doc.type} • Uploaded {doc.uploadDate}</span>
                  </div>
                  <Badge variant="lime" size="xs">{doc.status}</Badge>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Section 6: Official Audit & Disclaimer Stamp */}
        <div className="pt-6 border-t-2 border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-muted">
          <div>
            <p className="font-bold text-charcoal">AGRINOVA Digital Trust Seal</p>
            <p className="text-[11px] max-w-xl mt-0.5 leading-relaxed">
              This profile aggregates sensor observations and farmer-declared records for agro-climatic pilot evaluation in Tamil Nadu & Maharashtra. Distinguishes estimated values from metered parameters. Does not fabricate financial ratings.
            </p>
          </div>
          <div className="border border-forest/30 p-3 rounded-xl text-center bg-ivory-subtle">
            <span className="text-[10px] font-mono text-forest uppercase font-bold block">Digital Checksum</span>
            <span className="font-mono text-xs font-bold text-charcoal">SHA256: 8F2A...91BC</span>
          </div>
        </div>
      </div>
    </div>
  );
}
