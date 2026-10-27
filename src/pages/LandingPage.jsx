import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-ivory text-charcoal flex flex-col">
      <header className="sticky top-0 z-40 bg-ivory/95 border-b border-slate-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="" className="w-8 h-8" />
            <div>
              <span className="block text-[15px] font-semibold tracking-wide text-forest">AGRINOVA</span>
              <span className="block text-[11px] text-slate-muted">Field operations, Tamil Nadu & Maharashtra</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-charcoal-light">
            <a href="#how-it-works" className="hover:text-forest">How it works</a>
            <a href="#layers" className="hover:text-forest">What it covers</a>
            <a href="#pilots" className="hover:text-forest">Pilot districts</a>
            <a href="#who" className="hover:text-forest">Who uses it</a>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden sm:inline text-sm font-medium text-forest px-3 py-2 hover:underline">
              Sign in
            </Link>
            <Link to="/dashboard" className="btn-primary text-sm py-2 px-3.5">
              Open demo
            </Link>
          </div>
        </div>
      </header>

      <section className="border-b border-slate-border bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14 lg:py-20 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-7">
            <p className="page-kicker">Pilot demonstration · 2026</p>
            <h1 className="mt-3 font-display text-[2.15rem] sm:text-5xl font-medium text-charcoal max-w-xl">
              Read the field before you run the pump.
            </h1>
            <p className="mt-5 text-base sm:text-[17px] text-slate-muted max-w-lg leading-relaxed">
              AGRINOVA is a workspace for farms in Tamil Nadu and Maharashtra. Soil moisture, canopy weather, and a short advisory sit next to a farm profile you can share with an FPO or a loan officer — if you choose to.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link to="/dashboard" className="btn-primary">
                Open the live demo
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="#how-it-works" className="btn-secondary">
                Walk through a farm day
              </a>
            </div>
            <p className="mt-6 text-xs text-slate-muted max-w-md">
              Sensor readings in this demo are simulated from typical Coimbatore cotton and Thanjavur paddy conditions. They are not live hardware feeds.
            </p>
          </div>

          <aside className="lg:col-span-5 w-full">
            <div className="panel overflow-hidden">
              <div className="px-5 py-4 border-b border-slate-border bg-white flex items-baseline justify-between">
                <div>
                  <p className="text-sm font-semibold text-charcoal">Kongu Green Farms</p>
                  <p className="text-xs text-slate-muted mt-0.5">Thondamuthur, Coimbatore · 6.5 acres · cotton, drip</p>
                </div>
                <p className="text-xs text-agri font-medium">Moisture adequate</p>
              </div>
              <dl className="divide-y divide-slate-border">
                <div className="px-5 py-3 grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="text-xs text-slate-muted">Root-zone moisture</dt>
                    <dd className="mt-0.5 font-medium tabular-nums">58.4%</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-slate-muted">Canopy air</dt>
                    <dd className="mt-0.5 font-medium tabular-nums">31.8°C · 62% RH</dd>
                  </div>
                </div>
                <div className="px-5 py-3 text-sm">
                  <dt className="text-xs text-slate-muted">Today’s note</dt>
                  <dd className="mt-1 text-charcoal leading-relaxed">
                    Pause fertigation. Moisture is inside the 45–70% band. Holding the drip for about 18 hours saves an estimated 4,800 litres on this plot.
                  </dd>
                </div>
                <div className="px-5 py-3 flex items-center justify-between text-sm bg-ivory/70">
                  <span className="text-slate-muted">Farm profile for credit talks</span>
                  <span className="font-medium">92% of documents on file</span>
                </div>
              </dl>
            </div>
          </aside>
        </div>
      </section>

      <section id="how-it-works" className="border-b border-slate-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <p className="page-kicker">From registration to a shareable profile</p>
            <h2 className="mt-3 font-display text-3xl text-charcoal">A farm day, in order</h2>
            <p className="mt-4 text-sm text-slate-muted leading-relaxed">
              The product is a loop, not a set of disconnected modules. You register the land, attach probes (or use the simulator), read the plot, act on a rule, and keep the record.
            </p>
          </div>
          <ol className="lg:col-span-8 divide-y divide-slate-border border-t border-slate-border">
            {[
              ["Register the holding", "Area, soil type, irrigation method, and the crop in the ground — Coimbatore red loam and drip, or a Cauvery delta paddy field, for example."],
              ["Attach sensors or the simulator", "Capacitive moisture, canopy temperature, humidity, pH, EC, and NPK. In this demo, a telemetry engine stands in for hardware."],
              ["Watch the plot through the day", "Moisture falls through the afternoon heat and recovers at night. The dashboard shows that cycle for the selected farm."],
              ["Take the advisory", "Rules compare readings to crop stage. Irrigation, crop fit, and stress alerts are listed with the rule that fired — not a black box."],
              ["Keep a farm profile", "Season records and documents sit in one place. Sharing with a bank or FPO requires explicit consent and can be revoked."]
            ].map(([title, body], i) => (
              <li key={title} className="py-5 grid grid-cols-[2.5rem_1fr] gap-4">
                <span className="text-sm tabular-nums text-soil pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-sans text-base font-semibold text-charcoal">{title}</h3>
                  <p className="mt-1 text-sm text-slate-muted leading-relaxed">{body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section id="layers" className="border-b border-slate-border bg-ivory">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <p className="page-kicker">What the workspace covers</p>
          <h2 className="mt-3 font-display text-3xl text-charcoal max-w-xl">Sense the plot. Decide on the plot. File the plot.</h2>
          <div className="mt-10 grid md:grid-cols-3 gap-px bg-slate-border border border-slate-border">
            <article className="bg-ivory p-6 sm:p-8">
              <p className="text-xs font-semibold text-soil">Sense</p>
              <h3 className="mt-2 font-sans text-lg font-semibold">Probes in the root zone</h3>
              <p className="mt-3 text-sm text-slate-muted leading-relaxed">
                Moisture at root depth, canopy temperature, humidity, light, pH, electrical conductivity, and NPK. Meant for low-cost nodes, not a lab bench.
              </p>
            </article>
            <article className="bg-white p-6 sm:p-8">
              <p className="text-xs font-semibold text-soil">Decide</p>
              <h3 className="mt-2 font-sans text-lg font-semibold">Rules you can read</h3>
              <p className="mt-3 text-sm text-slate-muted leading-relaxed">
                Irrigation windows (including AWD for paddy), crop suitability against an Indian crop list, and early moisture or heat-stress flags. Each note names the rule.
              </p>
            </article>
            <article className="bg-ivory p-6 sm:p-8">
              <p className="text-xs font-semibold text-soil">Finance & trust</p>
              <h3 className="mt-2 font-sans text-lg font-semibold">A profile, not a pitch deck</h3>
              <p className="mt-3 text-sm text-slate-muted leading-relaxed">
                Documents, completeness, and consent logs. Useful when an FPO, a branch, or an extension officer asks for the same packet you already keep.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section id="pilots" className="border-b border-slate-border bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20 grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <p className="page-kicker">Where this is built to run</p>
            <h2 className="mt-3 font-display text-3xl text-charcoal">Four districts, two cropping systems</h2>
            <p className="mt-4 text-sm text-slate-muted leading-relaxed">
              The demo farms follow soils and irrigation you would actually meet: red loam cotton under drip around Coimbatore, AWD paddy in the Cauvery delta, grape and cane around Nashik, and rainfed millet or groundnut near Baramati.
            </p>
            <p className="mt-4 text-xs text-slate-muted">
              Map pins and coordinates are representative. They are not a claim that hardware is already installed at those points.
            </p>
          </div>
          <div className="lg:col-span-7 overflow-x-auto">
            <table className="w-full text-sm text-left border-t border-slate-border">
              <thead>
                <tr className="text-xs text-slate-muted">
                  <th className="py-3 pr-4 font-medium">District</th>
                  <th className="py-3 pr-4 font-medium">Soil / water</th>
                  <th className="py-3 font-medium">What we model</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-border">
                <tr>
                  <td className="py-3 pr-4 font-medium">Coimbatore, TN</td>
                  <td className="py-3 pr-4 text-slate-muted">Red loam, drip</td>
                  <td className="py-3 text-slate-muted">Cotton fertigation windows</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Thanjavur, TN</td>
                  <td className="py-3 pr-4 text-slate-muted">Delta clay, canal</td>
                  <td className="py-3 text-slate-muted">Alternate wetting and drying for paddy</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Nashik, MH</td>
                  <td className="py-3 pr-4 text-slate-muted">Black soil, well</td>
                  <td className="py-3 text-slate-muted">Grape and sugarcane canopy stress</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-medium">Pune / Baramati, MH</td>
                  <td className="py-3 pr-4 text-slate-muted">Black cotton, rainfed</td>
                  <td className="py-3 text-slate-muted">Bajra and groundnut moisture risk</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="who" className="bg-forest text-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 lg:py-20 grid md:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-soil-light">On the farm</p>
            <h2 className="mt-3 font-display text-3xl text-cream">Farmers and FPOs</h2>
            <p className="mt-4 text-sm text-cream/80 leading-relaxed">
              A farmer sees whether today’s moisture still justifies a pumping hour, and keeps season notes in one place. An FPO admin looks across member acreage, spots plots that need attention, and prepares the same documentation packet for a buyer or a lender.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-soil-light">Around the farm</p>
            <h2 className="mt-3 font-display text-3xl text-cream">Officers and branches</h2>
            <p className="mt-4 text-sm text-cream/80 leading-relaxed">
              Extension staff get a visit log and the last advisory, not a second spreadsheet. A credit team can review a structured farm profile after the farmer grants consent — completeness scores are a checklist, not a credit rating.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-charcoal text-stone-400 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/10">
          <div>
            <p className="text-cream font-semibold tracking-wide">AGRINOVA</p>
            <p className="mt-2 text-sm leading-relaxed">
              Field sensing, readable advice, and a farm file you control.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cream/70 mb-3">Workspace</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/dashboard" className="hover:text-cream">Dashboard</Link></li>
              <li><Link to="/farms" className="hover:text-cream">Farms</Link></li>
              <li><Link to="/sensors" className="hover:text-cream">Sensors</Link></li>
              <li><Link to="/intelligence" className="hover:text-cream">Advice</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cream/70 mb-3">Records</p>
            <ul className="space-y-2 text-sm">
              <li><Link to="/digital-profiles" className="hover:text-cream">Farm profiles</Link></li>
              <li><Link to="/consent" className="hover:text-cream">Consent</Link></li>
              <li><Link to="/finance-readiness" className="hover:text-cream">Documents</Link></li>
              <li><Link to="/fpo-management" className="hover:text-cream">FPO workspace</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-cream/70 mb-3">Demo</p>
            <p className="text-sm leading-relaxed">
              Coimbatore, Thanjavur, Nashik, Pune. Open the dashboard without creating an account.
            </p>
            <Link to="/dashboard" className="inline-flex items-center gap-1 mt-3 text-sm text-cream hover:underline">
              Launch demo <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <p>© 2026 AGRINOVA. Built as a working demonstration for pilots, not a production bank product.</p>
          <p>Simulated telemetry</p>
        </div>
      </footer>
    </div>
  );
}
