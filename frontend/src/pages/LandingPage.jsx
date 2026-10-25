import React from "react";
import { Link } from "react-router-dom";
import {
  Cpu,
  BrainCircuit,
  Landmark,
  ShieldCheck,
  Droplets,
  Sprout,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Layers,
  MapPin,
  TrendingUp,
  FileCheck2,
  Users2,
  PlayCircle
} from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col">
      {/* Top Header / Navigation */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3.5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center p-1.5 shadow-md">
              <img src="/logo.svg" alt="AGRINOVA logo" className="w-full h-full" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-forest-dark block leading-none">
                AGRINOVA
              </span>
              <span className="text-[10px] font-semibold text-agri tracking-widest uppercase">
                Smart Agriculture
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-charcoal">
            <a href="#three-layers" className="hover:text-forest transition-colors">3-Layer Model</a>
            <a href="#how-it-works" className="hover:text-forest transition-colors">How It Works</a>
            <a href="#benefits" className="hover:text-forest transition-colors">Benefits</a>
            <a href="#pilot-regions" className="hover:text-forest transition-colors">Pilot Geography</a>
            <a href="#impact" className="hover:text-forest transition-colors">Ecosystem Impact</a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs sm:text-sm font-semibold text-forest px-4 py-2 rounded-xl hover:bg-forest/5 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/dashboard"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold bg-forest hover:bg-forest-dark text-lime-accent px-4 sm:px-5 py-2.5 rounded-xl shadow-md transition-all hover:scale-102"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-28 overflow-hidden bg-gradient-to-b from-white via-ivory to-ivory">
        {/* Subtle background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-lime-soft/60 to-transparent pointer-events-none rounded-full blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Headlines & Call to Action */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest/10 border border-forest/20 text-forest text-xs font-bold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-agri animate-ping" />
                <span>AI & IoT-Enabled Smart Agriculture System</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal tracking-tight leading-[1.12]">
                Transform Every Farm into a{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-forest via-agri to-emerald-700">
                  Data-Driven Farm.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                AGRINOVA connects real-time field sensing, intelligent agricultural decisions, and structured digital farm information to support more productive and sustainable farming.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <Link
                  to="/dashboard"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-bold bg-forest hover:bg-forest-dark text-lime-accent px-6 py-3.5 rounded-xl shadow-lg transition-all hover:-translate-y-0.5"
                >
                  <span>Explore Interactive Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-sm font-semibold bg-white text-forest hover:bg-slate-50 border border-slate-border px-6 py-3.5 rounded-xl shadow-sm transition-colors"
                >
                  <PlayCircle className="w-4 h-4 text-agri" />
                  <span>Discover How It Works</span>
                </a>
              </div>

              {/* Three Mini Highlights */}
              <div className="pt-6 grid grid-cols-3 gap-4 border-t border-slate-200/80 max-w-xl mx-auto lg:mx-0 text-left">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-lime-soft text-forest">
                    <Cpu className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-charcoal">Low-Cost IoT</h5>
                    <p className="text-[11px] text-slate-muted">Soil, Microclimate & NPK</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-lime-soft text-forest">
                    <BrainCircuit className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-charcoal">Decision Engine</h5>
                    <p className="text-[11px] text-slate-muted">Irrigation & Crop Advisory</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-lg bg-lime-soft text-forest">
                    <FileCheck2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-charcoal">Farm Profile</h5>
                    <p className="text-[11px] text-slate-muted">Finance & FPO Ready</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive UI Showcase Mockup */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none bg-white rounded-3xl p-6 shadow-2xl border border-slate-border">
                {/* Header of Preview Card */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-forest/10 text-forest flex items-center justify-center font-bold">
                      <Sprout className="w-5 h-5 text-forest" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-charcoal">Kongu Green Farms</h4>
                      <p className="text-xs text-slate-muted">Coimbatore, Tamil Nadu • 6.5 Acres</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    Optimal Health: 88%
                  </span>
                </div>

                {/* Simulated Telemetry Live Grid */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="bg-ivory p-3.5 rounded-2xl border border-slate-200/80">
                    <p className="text-[11px] font-medium text-slate-muted">Soil Moisture</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-forest">58.4</span>
                      <span className="text-xs font-bold text-slate-muted">%</span>
                    </div>
                    <p className="text-[10px] text-agri font-medium mt-1">Adequate (Band 45-70%)</p>
                  </div>

                  <div className="bg-ivory p-3.5 rounded-2xl border border-slate-200/80">
                    <p className="text-[11px] font-medium text-slate-muted">Canopy Temp & RH</p>
                    <div className="flex items-baseline gap-1 mt-1">
                      <span className="text-2xl font-black text-charcoal">31.8</span>
                      <span className="text-xs font-bold text-slate-muted">°C</span>
                    </div>
                    <p className="text-[10px] text-slate-muted mt-1">Relative Humidity: 62%</p>
                  </div>
                </div>

                {/* Live Recommendation Badge */}
                <div className="mt-4 p-3.5 rounded-2xl bg-forest text-white shadow-md">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-lime-accent">
                      Active AI Advisory
                    </span>
                    <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-md font-mono">
                      RULE-COTTON-02
                    </span>
                  </div>
                  <h5 className="text-xs font-bold mt-1 text-white">
                    Optimal Drip Cycle Reached — Pause Fertigation
                  </h5>
                  <p className="text-[11px] text-white/80 mt-1 line-clamp-2">
                    Root zone moisture is comfortable at 58.4%. Recommend pausing drip pump for 18 hours to save 4,800L water.
                  </p>
                </div>

                {/* Digital Farm Profile Readiness Indicator */}
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-muted flex items-center gap-1.5">
                    <FileCheck2 className="w-4 h-4 text-agri" />
                    Digital Farm Profile
                  </span>
                  <span className="font-bold text-charcoal">92% Complete (Finance-Ready)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Layer Architecture Section */}
      <section id="three-layers" className="py-20 bg-white border-y border-slate-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-agri">Architectural Philosophy</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal mt-2">
              The Three-Layer Agricultural Loop: Sense, Decide, Finance
            </h2>
            <p className="mt-3 text-slate-muted text-base leading-relaxed">
              AGRINOVA bridges physical field realities with actionable agronomic intelligence and a structured, consent-protected digital identity.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Layer 1: Sense */}
            <div className="bg-ivory rounded-3xl p-8 border border-slate-border relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-forest text-lime-accent flex items-center justify-center mb-6 shadow-md">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-forest uppercase tracking-widest block mb-1">
                Layer 01
              </span>
              <h3 className="text-xl font-bold text-charcoal mb-3">Sense Layer</h3>
              <p className="text-sm text-slate-muted leading-relaxed mb-6">
                Connects physical agricultural fields via low-cost field sensors. Captures soil moisture, canopy temperature, relative humidity, light intensity, soil pH, EC, and NPK nutrient telemetry.
              </p>
              <ul className="space-y-2.5 text-xs text-charcoal font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-agri flex-shrink-0" />
                  <span>Real-time soil moisture & EC root-depth tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-agri flex-shrink-0" />
                  <span>Microclimate ambient temperature & humidity nodes</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-agri flex-shrink-0" />
                  <span>Electrochemical soil pH & NPK nutrient sensors</span>
                </li>
              </ul>
            </div>

            {/* Layer 2: Decide */}
            <div className="bg-ivory rounded-3xl p-8 border border-slate-border relative overflow-hidden group hover:shadow-lg transition-all border-agri/40 shadow-sm">
              <div className="w-12 h-12 rounded-2xl bg-agri text-white flex items-center justify-center mb-6 shadow-md">
                <BrainCircuit className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-agri uppercase tracking-widest block mb-1">
                Layer 02
              </span>
              <h3 className="text-xl font-bold text-charcoal mb-3">Decide Layer</h3>
              <p className="text-sm text-slate-muted leading-relaxed mb-6">
                Transparent rule-based agricultural intelligence engine that evaluates field telemetry against crop-specific growth stages to generate irrigation advice, crop suitability, and early risk alerts.
              </p>
              <ul className="space-y-2.5 text-xs text-charcoal font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-agri flex-shrink-0" />
                  <span>Crop-specific AWD & precision drip advisory</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-agri flex-shrink-0" />
                  <span>Suitability scoring with Indian crop library</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-agri flex-shrink-0" />
                  <span>Proactive risk detection for moisture and heat stress</span>
                </li>
              </ul>
            </div>

            {/* Layer 3: Finance */}
            <div className="bg-ivory rounded-3xl p-8 border border-slate-border relative overflow-hidden group hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-forest-dark text-lime-accent flex items-center justify-center mb-6 shadow-md">
                <Landmark className="w-6 h-6" />
              </div>
              <span className="text-[11px] font-bold text-forest uppercase tracking-widest block mb-1">
                Layer 03
              </span>
              <h3 className="text-xl font-bold text-charcoal mb-3">Finance & Trust Layer</h3>
              <p className="text-sm text-slate-muted leading-relaxed mb-6">
                Transforms seasonal field records into a structured Digital Farm Profile. Facilitates consent-based data sharing, documentation checklists, and finance-readiness for credit and FPO initiatives.
              </p>
              <ul className="space-y-2.5 text-xs text-charcoal font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-agri flex-shrink-0" />
                  <span>Standardized Digital Farm Profile with schema v1.0</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-agri flex-shrink-0" />
                  <span>Consent governance with audit log & revoke controls</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-agri flex-shrink-0" />
                  <span>Farm documentation checklist for institutional engagement</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works 5 Steps */}
      <section id="how-it-works" className="py-20 bg-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-agri">The User Journey</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal mt-2">
              How AGRINOVA Works in 5 Steps
            </h2>
            <p className="mt-3 text-slate-muted text-base">
              A continuous workflow from initial farmer onboarding to finance-readiness.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {[
              {
                step: "01",
                title: "Register Farm",
                desc: "Record land area, soil type, irrigation setup, and crops in Tamil Nadu or Maharashtra.",
                icon: Sprout
              },
              {
                step: "02",
                title: "Connect Sensors",
                desc: "Pair physical hardware nodes or activate the built-in simulation telemetry engine.",
                icon: Cpu
              },
              {
                step: "03",
                title: "Collect Data",
                desc: "Streams soil moisture, microclimate parameters, EC, and nutrient levels across fields.",
                icon: Droplets
              },
              {
                step: "04",
                title: "Intelligent Advice",
                desc: "Rule engine calculates precise irrigation triggers and crop suitability recommendations.",
                icon: BrainCircuit
              },
              {
                step: "05",
                title: "Digital Profile",
                desc: "Generate exportable Digital Farm Profiles and consent records for banks and FPOs.",
                icon: FileCheck2
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-forest/20 font-mono">{item.step}</span>
                    <div className="p-2 rounded-xl bg-ivory-subtle text-forest">
                      <item.icon className="w-5 h-5 text-forest" />
                    </div>
                  </div>
                  <h4 className="text-base font-bold text-charcoal">{item.title}</h4>
                  <p className="mt-2 text-xs text-slate-muted leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planned Pilot Regions: Tamil Nadu & Maharashtra */}
      <section id="pilot-regions" className="py-20 bg-forest text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-lime-accent text-xs font-bold">
                <MapPin className="w-3.5 h-3.5" />
                <span>Initial Pilot Geographic Focus</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Designed for Key Agro-Climatic Zones in Tamil Nadu & Maharashtra
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                AGRINOVA is architected for planned pilot demonstrations in diverse agricultural ecosystems — from canal-irrigated paddy belts and precision cotton in Tamil Nadu to high-value grape orchards and rainfed dryland millets in Maharashtra.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/15">
                  <h4 className="text-base font-bold text-lime-accent">Tamil Nadu Pilot</h4>
                  <p className="text-xs text-white/80 mt-1">
                    Coimbatore (Red Loam, Cotton/Drip) & Thanjavur (Cauvery Delta, AWD Paddy).
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/15">
                  <h4 className="text-base font-bold text-lime-accent">Maharashtra Pilot</h4>
                  <p className="text-xs text-white/80 mt-1">
                    Nashik (Black Soil, Grapes/Cane) & Pune/Baramati (Black Cotton Soil, Bajra/Groundnut).
                  </p>
                </div>
              </div>
              <p className="text-[11px] text-white/60 italic">
                * Note: Demonstrations utilize simulated representative agro-climate models and illustrative field coordinates.
              </p>
            </div>

            <div className="lg:col-span-6">
              <div className="bg-forest-dark/80 p-6 rounded-3xl border border-white/10 shadow-2xl space-y-4">
                <h4 className="text-base font-bold text-white flex items-center gap-2">
                  <Layers className="w-5 h-5 text-lime-accent" />
                  <span>Pilot Implementation Roadmap</span>
                </h4>
                <div className="space-y-3 text-xs text-white/80">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-start gap-3">
                    <span className="font-mono text-lime-accent font-bold">01</span>
                    <div>
                      <strong className="text-white">Field Sensor Benchmarking:</strong> Calibrating low-cost capacitive moisture probes and micro-climate nodes in local soil textures.
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-start gap-3">
                    <span className="font-mono text-lime-accent font-bold">02</span>
                    <div>
                      <strong className="text-white">FPO Cluster Integration:</strong> Empowering local Farmer Producer Organizations with centralized multi-farm monitoring workspaces.
                    </div>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 flex items-start gap-3">
                    <span className="font-mono text-lime-accent font-bold">03</span>
                    <div>
                      <strong className="text-white">Digital Farm Profile Validation:</strong> Structuring verifiable documentation packages for institutional crop credit and micro-irrigation subsidies.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ecosystem Impact Section */}
      <section id="impact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-agri">Multi-Stakeholder Benefits</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-charcoal mt-2">
              Value Delivered Across the Agricultural Value Chain
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-ivory border border-slate-border">
              <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-4">
                <Sprout className="w-5 h-5 text-forest" />
              </div>
              <h4 className="text-base font-bold text-charcoal">Individual Farmers</h4>
              <p className="mt-2 text-xs text-slate-muted leading-relaxed">
                Replaces guesswork with real-time moisture alerts, reducing pump electricity, saving water, and avoiding yield-threatening stress.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-ivory border border-slate-border">
              <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-4">
                <Users2 className="w-5 h-5 text-forest" />
              </div>
              <h4 className="text-base font-bold text-charcoal">Farmer Producer Orgs</h4>
              <p className="mt-2 text-xs text-slate-muted leading-relaxed">
                Centralized dashboard to track aggregate acreage, identify member plots needing inputs, and organize collective market dispatch.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-ivory border border-slate-border">
              <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-4">
                <Landmark className="w-5 h-5 text-forest" />
              </div>
              <h4 className="text-base font-bold text-charcoal">Financial Institutions</h4>
              <p className="mt-2 text-xs text-slate-muted leading-relaxed">
                Standardized Digital Farm Profiles and documentation checklists to streamline farm appraisal and consent-based risk assessment.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-ivory border border-slate-border">
              <div className="w-10 h-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-4">
                <FileCheck2 className="w-5 h-5 text-forest" />
              </div>
              <h4 className="text-base font-bold text-charcoal">Agri Extension Officers</h4>
              <p className="mt-2 text-xs text-slate-muted leading-relaxed">
                Structured field visit logger and recommendation validator for prompt farmer advisory during critical growth phases.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-charcoal text-slate-muted py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-700/60">
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white">
                <div className="w-8 h-8 rounded-lg bg-forest flex items-center justify-center p-1">
                  <img src="/logo.svg" alt="logo" className="w-full h-full" />
                </div>
                <span className="font-bold text-lg text-white">AGRINOVA</span>
              </div>
              <p className="text-xs text-slate-muted leading-relaxed">
                "Sense the Field. Decide Intelligently. Grow Sustainably."
              </p>
              <p className="text-[11px] text-slate-500">
                AI & IoT Smart Agriculture Platform.
              </p>
            </div>

            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Navigation</h5>
              <ul className="space-y-2 text-xs">
                <li><Link to="/dashboard" className="hover:text-lime-accent">Dashboard Overview</Link></li>
                <li><Link to="/farms" className="hover:text-lime-accent">Farm Management</Link></li>
                <li><Link to="/sensors" className="hover:text-lime-accent">Sensor Telemetry</Link></li>
                <li><Link to="/intelligence" className="hover:text-lime-accent">Agri Intelligence</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Governance & Trust</h5>
              <ul className="space-y-2 text-xs">
                <li><Link to="/digital-profiles" className="hover:text-lime-accent">Digital Farm Profiles</Link></li>
                <li><Link to="/consent" className="hover:text-lime-accent">Consent Management</Link></li>
                <li><Link to="/finance-readiness" className="hover:text-lime-accent">Finance Readiness</Link></li>
                <li><Link to="/fpo-management" className="hover:text-lime-accent">FPO Workspace</Link></li>
              </ul>
            </div>

            <div>
              <h5 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Pilot Regions</h5>
              <p className="text-xs text-slate-muted">
                Tamil Nadu (Coimbatore & Thanjavur) & Maharashtra (Nashik & Pune).
              </p>
              <div className="mt-4 pt-4 border-t border-slate-700/60">
                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-lime-accent hover:underline"
                >
                  <span>Launch Live Demo System</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
            <p>© 2026 AGRINOVA Smart Agriculture. Developed for academic innovation, hackathon demonstration, and scalable deployment.</p>
            <p>Demo Data Layer • Sensor Simulation Active</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
