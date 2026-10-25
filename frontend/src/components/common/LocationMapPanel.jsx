import React, { useState } from "react";
import { MapPin, Navigation, Radio, Info, Layers } from "lucide-react";
import { Badge } from "./Badge";

export function LocationMapPanel({ farm, sensors = [] }) {
  const [mapLayer, setMapLayer] = useState("satellite");

  if (!farm) return null;

  const lat = farm.coordinates?.lat || 11.0;
  const lng = farm.coordinates?.lng || 77.0;

  return (
    <div className="bg-white rounded-2xl border border-slate-border p-5 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-ivory-subtle text-forest border border-forest/10">
            <MapPin className="w-5 h-5 text-forest" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-charcoal">Visual Farm Location Panel</h4>
            <p className="text-xs text-slate-muted">{farm.village}, {farm.district}, {farm.state}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setMapLayer(mapLayer === "satellite" ? "cadastral" : "satellite")}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{mapLayer === "satellite" ? "Satellite View" : "Cadastral Grid"}</span>
          </button>
          <Badge variant={farm.state === "Tamil Nadu" ? "agri" : "forest"}>{farm.state} Pilot</Badge>
        </div>
      </div>

      {/* Styled Interactive SVG Map Surface */}
      <div className={`relative h-64 rounded-xl border border-slate-200 overflow-hidden flex flex-col items-center justify-center p-4 ${
        mapLayer === "satellite"
          ? "bg-gradient-to-br from-[#1b3d2f] via-[#235340] to-[#163628]"
          : "bg-[#f4f7f2] bg-[radial-gradient(#2F855A_1px,transparent_1px)] [background-size:16px_16px]"
      }`}>
        {/* Farm Cadastral Boundary polygon */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {mapLayer === "satellite" ? (
            <>
              {/* Field parcels */}
              <polygon points="60,40 280,30 310,190 70,180" fill="#2F855A" fillOpacity="0.25" stroke="#A3D977" strokeWidth="2" strokeDasharray="4 4" />
              <polygon points="320,40 540,50 510,210 330,195" fill="#38A169" fillOpacity="0.20" stroke="#A3D977" strokeWidth="1.5" />
              <line x1="70" y1="180" x2="310" y2="190" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
              {/* Canal or Drip Mainline */}
              <path d="M40 220 Q 250 170 560 210" fill="none" stroke="#60A5FA" strokeWidth="3" strokeOpacity="0.8" />
            </>
          ) : (
            <>
              <polygon points="80,50 300,40 330,200 90,190" fill="#E2E8F0" fillOpacity="0.5" stroke="#2F855A" strokeWidth="2" />
              <line x1="180" y1="45" x2="200" y2="195" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
            </>
          )}
        </svg>

        {/* Floating Telemetry Coordinates Badge */}
        <div className="absolute top-3 left-3 bg-charcoal/80 backdrop-blur-md text-white px-3 py-1.5 rounded-lg text-xs font-mono flex items-center gap-2 border border-white/10 shadow-lg">
          <Navigation className="w-3.5 h-3.5 text-lime-accent" />
          <span>{lat.toFixed(4)}° N, {lng.toFixed(4)}° E</span>
        </div>

        {/* Active Sensor Node Pins on Map */}
        <div className="absolute z-10 flex flex-wrap gap-4 items-center justify-center pointer-events-auto">
          {sensors.slice(0, 4).map((sensor, idx) => (
            <div
              key={sensor.id}
              className="group relative bg-white/95 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-forest/20 shadow-lg flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-agri"></span>
              </span>
              <div className="text-left">
                <p className="text-[10px] font-bold text-charcoal leading-none">{sensor.type}</p>
                <p className="text-xs font-extrabold text-forest mt-0.5">{sensor.latestReading} {sensor.unit}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom map overlay bar */}
        <div className="absolute bottom-2 right-2 bg-charcoal/70 backdrop-blur-sm text-white/90 text-[10px] px-2.5 py-1 rounded-md">
          {farm.soilType} • {farm.area} {farm.areaUnit} • {farm.irrigationType}
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 text-xs text-slate-muted bg-ivory p-2.5 rounded-lg border border-slate-200">
        <Info className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
        <p>
          <strong className="text-charcoal">Illustrative Geolocation:</strong> Coordinates and field boundaries are demonstration models for pilot regions in {farm.state} (District: {farm.district}). AGRINOVA protects farmer privacy by avoiding public disclosure of non-consented Cadastral surveyed plots.
        </p>
      </div>
    </div>
  );
}
