import React, { useState } from "react";
import { MapPin, Layers, Info } from "lucide-react";
import { Badge } from "./Badge";

export function LocationMapPanel({ farm, sensors = [] }) {
  const [mapLayer, setMapLayer] = useState("satellite");

  if (!farm) return null;

  const lat = farm.coordinates?.lat || 11.0;
  const lng = farm.coordinates?.lng || 77.0;

  return (
    <div className="panel p-5 overflow-hidden">
      <div className="flex items-center justify-between pb-3 border-b border-slate-border mb-4 gap-3">
        <div>
          <h4 className="font-sans text-sm font-semibold text-charcoal flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-forest" />
            Plot location
          </h4>
          <p className="text-xs text-slate-muted mt-0.5">{farm.village}, {farm.district}, {farm.state}</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => setMapLayer(mapLayer === "satellite" ? "cadastral" : "satellite")}
            className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-md border border-slate-border text-charcoal hover:bg-ivory"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{mapLayer === "satellite" ? "Satellite" : "Sketch"}</span>
          </button>
          <Badge variant="outline">{farm.state}</Badge>
        </div>
      </div>

      <div className={`relative h-64 rounded-md border border-slate-border overflow-hidden flex flex-col items-center justify-center p-4 ${
        mapLayer === "satellite"
          ? "bg-[#1E3A2F]"
          : "bg-ivory"
      }`}>
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          {mapLayer === "satellite" ? (
            <>
              <polygon points="60,40 280,30 310,190 70,180" fill="#2D6A4F" fillOpacity="0.35" stroke="#DAD7CD" strokeWidth="1.5" />
              <polygon points="320,40 540,50 510,210 330,195" fill="#40916C" fillOpacity="0.25" stroke="#DAD7CD" strokeWidth="1" />
              <path d="M40 220 Q 250 170 560 210" fill="none" stroke="#7EB8D4" strokeWidth="2" strokeOpacity="0.7" />
            </>
          ) : (
            <>
              <polygon points="80,50 300,40 330,200 90,190" fill="#EAE6DC" stroke="#1B4332" strokeWidth="1.5" />
              <line x1="180" y1="45" x2="200" y2="195" stroke="#A3B18A" strokeWidth="1" />
            </>
          )}
        </svg>

        <div className={`absolute top-3 left-3 px-2.5 py-1 text-xs tabular-nums ${mapLayer === "satellite" ? "bg-black/40 text-cream" : "bg-white border border-slate-border text-charcoal"}`}>
          {lat.toFixed(4)}° N, {lng.toFixed(4)}° E
        </div>

        <div className="absolute z-10 flex flex-wrap gap-2 items-center justify-center max-w-[90%]">
          {sensors.slice(0, 4).map((sensor) => (
            <div
              key={sensor.id}
              className="bg-white px-2.5 py-1.5 rounded-md border border-slate-border text-left"
            >
              <p className="text-[10px] text-slate-muted leading-none">{sensor.type}</p>
              <p className="text-xs font-medium text-charcoal mt-0.5 tabular-nums">{sensor.latestReading} {sensor.unit}</p>
            </div>
          ))}
        </div>

        <div className={`absolute bottom-2 right-2 text-[10px] px-2 py-1 ${mapLayer === "satellite" ? "text-cream/80" : "text-slate-muted"}`}>
          {farm.soilType} · {farm.area} {farm.areaUnit} · {farm.irrigationType}
        </div>
      </div>

      <div className="mt-3 flex items-start gap-2 text-xs text-slate-muted bg-ivory p-2.5 rounded-md">
        <Info className="w-4 h-4 text-forest flex-shrink-0 mt-0.5" />
        <p>
          Sketch only. Pins and boundaries are typical of {farm.district}, {farm.state} — not a surveyed cadastral plot.
        </p>
      </div>
    </div>
  );
}
