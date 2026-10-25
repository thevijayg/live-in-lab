# AGRINOVA — AI & IoT-Enabled Smart Agriculture System
> *"Sense the Field. Decide Intelligently. Grow Sustainably."*

---

## 1. Project Overview & Problem Statement

Agriculture in India is increasingly vulnerable to unpredictable climate patterns, groundwater depletion, and input mismanagement. In pilot regions like **Tamil Nadu** (e.g. Cauvery delta paddy commands, Coimbatore cotton/oilseed clusters) and **Maharashtra** (e.g. Nashik horticulture, dryland millets in Pune/Baramati), farmers frequently rely on subjective intuition for critical irrigation and crop nutrition decisions. 

**AGRINOVA** transforms agricultural guesswork into data-driven precision through a unified three-layer loop:
1. **Sense Layer (IoT Telemetry):** Captures real-time ground truths—soil moisture at root depth, ambient temperature, relative humidity, light flux, soil pH, and NPK nutrients.
2. **Decide Layer (Intelligent Rules Engine):** Translates field conditions into transparent irrigation schedules, AWD (Alternate Wetting & Drying) advisories, crop suitability recommendations, and early risk alerts.
3. **Finance Layer (Digital Farm Profile & Trust):** Compiles physical observations into a standardized **Digital Farm Profile (DFP v1.0)** with granular, consent-based governance and institutional finance-readiness checklists.

---

## 2. Technology Stack

- **Frontend:**
  - React 18 with Vite
  - Tailwind CSS (Agricultural Green `#2F855A`, Deep Forest `#174C35`, Fresh Lime `#A3D977`, Ivory `#F7F8F2`)
  - Lucide React (Lucid agricultural and IoT iconography)
  - Recharts (Diurnal 24-hr moisture curves, microclimate charts, crop distribution bars, availability gauges)
  - React Router DOM v6
- **Backend:**
  - Node.js (v24.x) & Express.js REST API
  - CORS, Dotenv, Modular routes/controllers/services
  - Stateful in-memory demo data layer with LocalStorage fallback resilience
- **Standards & Formats:**
  - Digital Farm Profile Schema: `AGRINOVA-DFP-v1.0`
  - Export Formats: JSON, CSV, Printable Reports

---

## 3. Project Architecture & The 3-Layer Workflow

```
       +-------------------------------------------------------------+
       |                        AGRINOVA                             |
       |  "Sense the Field. Decide Intelligently. Grow Sustainably." |
       +-------------------------------------------------------------+
                                      |
         +----------------------------+----------------------------+
         |                            |                            |
         v                            v                            v
  [1. SENSE LAYER]             [2. DECIDE LAYER]            [3. FINANCE LAYER]
  - Capacitive Soil Probes     - Transparent Rule Engine    - Digital Farm Profile
  - Microclimate Air Nodes     - Alternate Wetting & Drying - Consent Governance
  - NPK / pH Ion Sensors       - Crop Suitability Scoring   - Documentation Checklist
  - Controlled Telemetry Jitter- Stress Early Warning       - FPO & Credit Packaging
```

---

## 4. Repository & Folder Structure

```
pdl/
├── frontend/
│   ├── public/
│   │   └── logo.svg                 # AGRINOVA agricultural brand logo
│   ├── src/
│   │   ├── components/common/
│   │   │   ├── AlertBanner.jsx      # System warnings and alert strips
│   │   │   ├── Badge.jsx            # Themed status & priority badges
│   │   │   ├── ConfirmDialog.jsx    # Accessible confirmation modals
│   │   │   ├── EmptyState.jsx       # Fallback empty state cards
│   │   │   ├── LocationMapPanel.jsx # Interactive field vector & satellite map
│   │   │   ├── MetricCard.jsx       # Reusable KPI metric widgets
│   │   │   ├── Modal.jsx            # Accessible dialog component
│   │   │   ├── Navbar.jsx           # Top navigation with farm selector & alerts
│   │   │   └── Sidebar.jsx          # 15-item persistent sidebar & drawer
│   │   ├── context/
│   │   │   └── AppContext.jsx       # Global state & offline fallback management
│   │   ├── data/
│   │   │   └── mockData.js          # Tamil Nadu & Maharashtra pilot records
│   │   ├── layouts/
│   │   │   └── DashboardLayout.jsx  # Main authenticated workspace wrapper
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx      # Public presentation & 5-step journey
│   │   │   ├── LoginPage.jsx        # Demo login with 1-click evaluator access
│   │   │   ├── RegisterPage.jsx     # Farm onboarding form with state/district
│   │   │   ├── DashboardOverview.jsx# Central dashboard KPIs & diurnal curves
│   │   │   ├── FarmManagement.jsx   # Farm holdings, tabs & location panel
│   │   │   ├── FieldMonitoring.jsx  # Multi-field comparisons & sub-plot data
│   │   │   ├── SensorManagement.jsx # IoT fleet telemetry, 24-hr charts & jitter
│   │   │   ├── AgriculturalIntelligence.jsx # Transparent rule engine
│   │   │   ├── IrrigationAdvisory.jsx# AWD irrigation schedules & water logs
│   │   │   ├── CropRecommendation.jsx# Indian crop library & suitability engine
│   │   │   ├── RiskMonitoring.jsx   # Stress alerts & acknowledge workflow
│   │   │   ├── DigitalFarmProfilePage.jsx # Flagship DFP v1.0, JSON/CSV exports
│   │   │   ├── ConsentManagement.jsx# Granular data authorization & audit trail
│   │   │   ├── FinanceReadiness.jsx # Banking checklist & document upload
│   │   │   ├── FpoManagement.jsx    # Collective farm overview & visit logger
│   │   │   ├── AnalyticsReports.jsx # Fleet analytics & printable report
│   │   │   ├── NotificationsPage.jsx# Central alert center
│   │   │   └── SettingsPage.jsx     # Farmer preferences & demo reset
│   │   ├── services/
│   │   │   └── apiService.js        # Hybrid REST API client with local fallback
│   │   ├── styles/
│   │   │   └── index.css            # Tailwind directives & print CSS
│   │   ├── App.jsx                  # React Router configuration
│   │   └── main.jsx                 # Vite application entrypoint
│   ├── .env.example
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
├── backend/
│   ├── src/
│   │   ├── data/mockData.js         # Backend demonstration records
│   │   ├── routes/api.js            # REST API endpoints (Farms, Sensors, etc.)
│   │   ├── services/recommendationEngine.js # Algorithmic rule decision engine
│   │   ├── app.js                   # Express application setup
│   │   └── server.js                # Server entrypoint (Port 5000)
│   ├── .env.example
│   └── package.json
├── package.json                     # Monorepo root scripts
└── README.md
```

---

## 5. Getting Started & Installation

### 1. Install Dependencies
```powershell
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_ENV=development
VITE_DEMO_MODE=true
```

### 3. Development Commands

#### Start Frontend (Vite)
```powershell
npm run dev
```
Open your browser at 👉 **`http://localhost:5173`**

#### Start Backend (Express REST API)
```powershell
npm run backend
```
Backend health check at 👉 **`http://localhost:5000/api/health`**

---

## 5.1 Deployment Instructions (Vercel & Netlify)

### Deploying on Vercel (1-Click Ready)
The repository is now pre-configured for **zero-configuration Vercel deployment**:
- **Framework Preset:** `Vite`
- **Root Directory:** `./` (default root, no subfolder configuration needed)
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **SPA Routing:** Configured via root [vercel.json](file:///c:/Users/Admin/Desktop/pdl/vercel.json) to rewrite all routes to `/index.html`.

### Deploying on Netlify
- **Build Command:** `npm run build`
- **Publish Directory:** `dist`
- **SPA Routing:** Configured via [public/_redirects](file:///c:/Users/Admin/Desktop/pdl/public/_redirects).

---

## 6. One-Click Demo Credentials

For evaluation, competitions, and demonstrations, four pre-configured roles are available on the **`/login`** page:

| Role | User Name | Demo Email | Target Context |
|---|---|---|---|
| **Farmer** | Murugan Selvam | `murugan@agrinova.demo` | Kongu Green Farms (Coimbatore, TN) |
| **FPO Administrator** | Dr. Arvind Kulkarni | `fpo.director@sahyadri.demo` | Sahyadri FPO (Nashik, MH) |
| **Field Officer** | Priya Sundaram | `officer.tn@agrinova.demo` | Thanjavur Cauvery Delta (TN) |
| **Platform Administrator** | Admin AGRINOVA | `admin@agrinova.org` | Central Operations (All India) |

---

## 7. Pilot Geographic Context

AGRINOVA is seeded with demonstration farms from two agro-ecological pilot zones:

1. **Tamil Nadu:**
   - **Coimbatore (`FARM-TN-001`):** Red sandy loam; precision drip irrigation; Bt hybrid cotton & groundnut.
   - **Thanjavur (`FARM-TN-002`):** Alluvial clay loam; canal command Alternate Wetting & Drying (AWD); CR 1009 Kuruvai paddy.
2. **Maharashtra:**
   - **Nashik (`FARM-MH-001`):** Medium black soil; automated drip with fertigation; table grapes & sugarcane.
   - **Pune / Baramati (`FARM-MH-002`):** Deep black cotton soil; micro sprinkler; drought-resilient pearl millet (bajra).

---

## 8. Verifiable Features & Testing Status

- ✅ **Public Landing Page:** Explains the 3-layer architecture, 5-step farmer journey, pilot regions, and benefits.
- ✅ **Authentication:** Role switcher (Farmer, FPO admin, Field officer, Platform admin) with demo one-click logins.
- ✅ **Dashboard Overview:** Real-time diurnal 24-hr time-series, farm health gauge, active advisories, quick-action navigation.
- ✅ **IoT Sensor Management:** Search & filter 9 sensor modalities (soil moisture, temperature, humidity, pH, EC, N, P, K, lux), 24-hour reading modal, safe periodic simulation timer with controlled variance.
- ✅ **Farm Management:** Multi-farm list, modal forms with validation, tabbed farm detail view (Overview, Sensors, Crops, Irrigation, Recs, Profile), vector cadastral map.
- ✅ **Field Monitoring:** Sub-plot condition cards, multi-field comparison chart vs crop thresholds, neutral data states.
- ✅ **Agricultural Intelligence Engine:** Transparent rules engine with "Why this rule?" logic modal, priority badges, accept/complete/dismiss lifecycle.
- ✅ **Irrigation Advisory:** AWD moisture thresholds, soil hydration line charts, water volume log book with metered vs estimated tags.
- ✅ **Crop Recommendation:** 7 Indian crops (Paddy, Cotton, Sugarcane, Bajra, Groundnut, Maize, Pulses) with rule-based suitability scoring.
- ✅ **Risk Monitoring:** Mathematical anomaly alerts (soil moisture stress, heat wave, sensor dropout), acknowledge & resolve workflows.
- ✅ **Digital Farm Profile (DFP v1.0):** Dynamic completeness calculation (7 dimensions), printable summary (`window.print()`), JSON and CSV export with standardized schema.
- ✅ **Consent & Data Sharing:** Granular category authorization, purpose definition, duration controls, instant revocation, and audit logs.
- ✅ **Finance Readiness:** Documentation checklist, client-side document validation (PDF/PNG/JPG/CSV <10MB), institutional appraisal disclaimer.
- ✅ **FPO Workspace:** Member farm roster, aggregate acreage tracking, field extension visit note logger.
- ✅ **Analytics & Reports:** Diurnal microclimate trends, crop area bar charts, sensor connectivity pie, CSV download.
- ✅ **Multilingual Ready:** English interface active, Tamil and Marathi previews prepared.

---

## 9. Current Limitations & Future Roadmap

- **Sensor Hardware:** Sensor telemetry is generated deterministically through realistic sinusoidal diurnal models and controlled jitter. Hardware drivers (e.g. MQTT / LoRaWAN gateways) can be connected to `POST /api/sensors/:id/readings`.
- **Database:** Local demo layer uses persistent browser storage and Express memory state. For enterprise scale, Supabase / PostgreSQL configuration placeholders are pre-wired in `backend/.env.example`.
- **Weather API:** External satellite radar feeds can be mapped into the decision engine to complement field sensors with 48-hour rainfall forecasts.

---

## 10. Production Build Verification

```powershell
cd frontend
npm run build
# Output:
# ✓ 2597 modules transformed.
# dist/index.html                   1.06 kB
# dist/assets/index-Bdqfopkl.css   39.55 kB
# dist/assets/index-DxT3BSdr.js   884.46 kB
# ✓ built in 11.76s (Exit code 0)
```

---
*Developed for academic evaluation, hackathons, and sustainable agricultural innovation.*
