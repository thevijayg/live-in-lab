import express from "express";
import {
  initialFarms,
  initialFields,
  initialSensors,
  initialRecommendations,
  initialRisks,
  initialIrrigationLogs,
  initialConsents,
  initialDocuments,
  cropLibrary,
  initialNotifications,
  demoUsers,
  generate24HourReadings
} from "../data/mockData.js";
import { evaluateFieldConditions } from "../services/recommendationEngine.js";

const router = express.Router();

// Stateful in-memory demo database
let farms = [...initialFarms];
let fields = [...initialFields];
let sensors = [...initialSensors];
let recommendations = [...initialRecommendations];
let risks = [...initialRisks];
let irrigationLogs = [...initialIrrigationLogs];
let consents = [...initialConsents];
let documents = [...initialDocuments];
let notifications = [...initialNotifications];
let users = [...demoUsers];

// --- HEALTH CHECK ---
router.get("/health", (req, res) => {
  res.json({
    status: "ok",
    service: "AGRINOVA Backend API",
    mode: "Demonstration & Pilot Simulation",
    activeFarms: farms.length,
    activeSensors: sensors.length,
    timestamp: new Date().toISOString()
  });
});

// --- RESET DEMO DATA ---
router.post("/reset-demo-data", (req, res) => {
  farms = [...initialFarms];
  fields = [...initialFields];
  sensors = [...initialSensors];
  recommendations = [...initialRecommendations];
  risks = [...initialRisks];
  irrigationLogs = [...initialIrrigationLogs];
  consents = [...initialConsents];
  documents = [...initialDocuments];
  notifications = [...initialNotifications];
  res.json({ message: "Demonstration datasets reset successfully to baseline state." });
});

// --- FARMS ENDPOINTS ---
router.get("/farms", (req, res) => {
  const { state, district } = req.query;
  let result = [...farms];
  if (state) result = result.filter(f => f.state.toLowerCase() === state.toLowerCase());
  if (district) result = result.filter(f => f.district.toLowerCase() === district.toLowerCase());
  res.json(result);
});

router.post("/farms", (req, res) => {
  const { name, farmerName, state, district, village, area, areaUnit, soilType, irrigationType, mainCrop, coordinates } = req.body;
  if (!name || !farmerName || !state || !district) {
    return res.status(400).json({ error: "Missing required farm fields: name, farmerName, state, district" });
  }
  const newFarm = {
    id: `FARM-${state === "Tamil Nadu" ? "TN" : "MH"}-${String(farms.length + 1).padStart(3, "0")}`,
    name,
    farmerName,
    state,
    district,
    village: village || "Sample Village",
    area: Number(area) || 5,
    areaUnit: areaUnit || "Acres",
    soilType: soilType || "Loam",
    irrigationType: irrigationType || "Drip",
    mainCrop: mainCrop || "Paddy",
    registrationDate: new Date().toISOString().split("T")[0],
    healthStatus: "Optimal",
    healthScore: 85,
    dataCompleteness: 75,
    coordinates: coordinates || { lat: 11.0, lng: 77.0 },
    notes: req.body.notes || "Registered via AGRINOVA portal."
  };
  farms.push(newFarm);
  res.status(201).json(newFarm);
});

router.get("/farms/:id", (req, res) => {
  const farm = farms.find(f => f.id === req.params.id);
  if (!farm) return res.status(404).json({ error: "Farm not found" });
  res.json(farm);
});

router.put("/farms/:id", (req, res) => {
  const index = farms.findIndex(f => f.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Farm not found" });
  farms[index] = { ...farms[index], ...req.body, id: req.params.id };
  res.json(farms[index]);
});

router.delete("/farms/:id", (req, res) => {
  const index = farms.findIndex(f => f.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Farm not found" });
  const deleted = farms.splice(index, 1);
  res.json({ message: "Farm removed successfully", deleted: deleted[0] });
});

// --- FIELDS ENDPOINTS ---
router.get("/farms/:id/fields", (req, res) => {
  const farmFields = fields.filter(f => f.farmId === req.params.id);
  res.json(farmFields);
});

router.post("/farms/:id/fields", (req, res) => {
  const { name, area, crop, cropStage, soilMoistureTarget } = req.body;
  if (!name || !crop) return res.status(400).json({ error: "Field name and crop required" });
  const newField = {
    id: `FLD-${req.params.id.slice(5)}-${String.fromCharCode(65 + fields.length % 26)}`,
    farmId: req.params.id,
    name,
    area: Number(area) || 2.0,
    crop,
    cropStage: cropStage || "Vegetative",
    soilMoistureTarget: soilMoistureTarget || { min: 40, max: 70 },
    sensorCount: 0,
    status: "Healthy"
  };
  fields.push(newField);
  res.status(201).json(newField);
});

// --- SENSORS ENDPOINTS ---
router.get("/sensors", (req, res) => {
  const { farmId, fieldId, type, status } = req.query;
  let result = [...sensors];
  if (farmId) result = result.filter(s => s.farmId === farmId);
  if (fieldId) result = result.filter(s => s.fieldId === fieldId);
  if (type) result = result.filter(s => s.type.toLowerCase() === type.toLowerCase());
  if (status) result = result.filter(s => s.status.toLowerCase() === status.toLowerCase());
  res.json(result);
});

router.post("/sensors", (req, res) => {
  const { name, type, farmId, fieldId, installationDate, hardwareUid, thresholdMin, thresholdMax } = req.body;
  if (!name || !type || !farmId) {
    return res.status(400).json({ error: "Sensor name, type and farmId are required" });
  }

  const farm = farms.find(f => f.id === farmId);
  const field = fields.find(f => f.id === fieldId);

  let unit = "%";
  let defaultReading = 50;
  if (type === "Air Temperature") { unit = "°C"; defaultReading = 29.5; }
  else if (type === "Relative Humidity") { unit = "%"; defaultReading = 65; }
  else if (type === "Light Intensity") { unit = "lux"; defaultReading = 48000; }
  else if (type === "Soil pH") { unit = "pH"; defaultReading = 6.8; }
  else if (type === "Soil EC") { unit = "dS/m"; defaultReading = 1.2; }
  else if (type.includes("Nitrogen") || type.includes("Phosphorus") || type.includes("Potassium")) {
    unit = "mg/kg";
    defaultReading = 150;
  }

  const newSensor = {
    id: `SNS-USR-${String(sensors.length + 1).padStart(2, "0")}`,
    name,
    farmId,
    farmName: farm ? farm.name : "Unknown Farm",
    fieldId: fieldId || (farm ? `FLD-${farm.id}-01` : "FLD-01"),
    fieldName: field ? field.name : "Main Field",
    type,
    unit,
    latestReading: defaultReading,
    thresholdMin: thresholdMin || 30,
    thresholdMax: thresholdMax || 80,
    status: "Online",
    battery: 100,
    lastUpdated: new Date().toISOString(),
    installationDate: installationDate || new Date().toISOString().split("T")[0],
    hardwareUid: hardwareUid || `AGRI-NODE-${Math.floor(1000 + Math.random() * 9000)}`
  };

  sensors.push(newSensor);
  res.status(201).json(newSensor);
});

router.get("/sensors/:id", (req, res) => {
  const sensor = sensors.find(s => s.id === req.params.id);
  if (!sensor) return res.status(404).json({ error: "Sensor not found" });
  res.json(sensor);
});

router.get("/sensors/:id/readings", (req, res) => {
  const sensor = sensors.find(s => s.id === req.params.id);
  if (!sensor) return res.status(404).json({ error: "Sensor not found" });
  const readings = generate24HourReadings(sensor.latestReading, sensor.latestReading * 0.15, sensor.unit);
  res.json({
    sensorId: sensor.id,
    sensorName: sensor.name,
    unit: sensor.unit,
    readings
  });
});

// Simulated sensor refresh endpoint
router.post("/sensors/simulate-refresh", (req, res) => {
  sensors = sensors.map(s => {
    if (s.status === "Offline") return s;
    // Apply realistic slight jitter (+- 3%)
    const variance = s.type === "Light Intensity" ? 2500 : (s.unit === "pH" ? 0.05 : 1.2);
    const delta = (Math.random() - 0.48) * variance;
    let nextVal = parseFloat((s.latestReading + delta).toFixed(1));
    if (s.unit === "%") nextVal = Math.min(100, Math.max(5, nextVal));
    if (s.unit === "pH") nextVal = Math.min(10, Math.max(3, nextVal));
    return {
      ...s,
      latestReading: nextVal,
      lastUpdated: new Date().toISOString()
    };
  });

  res.json({
    message: "Sensor measurements refreshed with controlled realistic simulation jitter",
    timestamp: new Date().toISOString(),
    sensorCount: sensors.length
  });
});

// --- RECOMMENDATIONS ENDPOINTS ---
router.get("/recommendations", (req, res) => {
  const { farmId, category, priority, status } = req.query;
  let result = [...recommendations];
  if (farmId) result = result.filter(r => r.farmId === farmId);
  if (category) result = result.filter(r => r.category.toLowerCase() === category.toLowerCase());
  if (priority) result = result.filter(r => r.priority.toLowerCase() === priority.toLowerCase());
  if (status) result = result.filter(r => r.status.toLowerCase() === status.toLowerCase());
  res.json(result);
});

router.post("/recommendations/generate", (req, res) => {
  const { farmId } = req.body;
  const targetFarms = farmId ? farms.filter(f => f.id === farmId) : farms;
  let generatedCount = 0;

  targetFarms.forEach(farm => {
    const farmFields = fields.filter(fld => fld.farmId === farm.id);
    farmFields.forEach(fld => {
      const evaluation = evaluateFieldConditions(farm, fld, sensors);
      evaluation.recommendations.forEach(rec => {
        // avoid exact duplicates
        const exists = recommendations.some(existing => existing.fieldId === rec.fieldId && existing.category === rec.category && existing.status === "New");
        if (!exists) {
          recommendations.unshift(rec);
          generatedCount++;
        }
      });
      evaluation.risks.forEach(rsk => {
        const exists = risks.some(existing => existing.fieldId === rsk.fieldId && existing.category === rsk.category && existing.status === "Active");
        if (!exists) risks.unshift(rsk);
      });
    });
  });

  res.json({
    message: `Rule engine evaluated ${targetFarms.length} farm(s). Generated ${generatedCount} new actionable recommendation(s).`,
    totalRecommendations: recommendations.length
  });
});

router.patch("/recommendations/:id/status", (req, res) => {
  const { status } = req.body;
  const rec = recommendations.find(r => r.id === req.params.id);
  if (!rec) return res.status(404).json({ error: "Recommendation not found" });
  rec.status = status;
  res.json(rec);
});

// --- RISKS ENDPOINTS ---
router.get("/risks", (req, res) => {
  const { farmId } = req.query;
  let result = [...risks];
  if (farmId) result = result.filter(r => r.farmId === farmId);
  res.json(result);
});

router.patch("/risks/:id/status", (req, res) => {
  const { status } = req.body;
  const risk = risks.find(r => r.id === req.params.id);
  if (!risk) return res.status(404).json({ error: "Risk not found" });
  risk.status = status;
  res.json(risk);
});

// --- IRRIGATION LOGS ENDPOINTS ---
router.get("/irrigation-logs", (req, res) => {
  const { farmId } = req.query;
  let result = [...irrigationLogs];
  if (farmId) result = result.filter(l => l.farmId === farmId);
  res.json(result);
});

router.post("/irrigation-logs", (req, res) => {
  const { farmId, fieldId, fieldName, date, method, durationMinutes, waterQuantityLiters, isEstimated, notes } = req.body;
  if (!farmId || !date || !method) {
    return res.status(400).json({ error: "farmId, date, and method are required" });
  }

  const newLog = {
    id: `IRR-${String(irrigationLogs.length + 1).padStart(3, "0")}`,
    farmId,
    fieldId: fieldId || "FLD-01",
    fieldName: fieldName || "Main Field",
    date,
    method,
    durationMinutes: Number(durationMinutes) || 60,
    waterQuantityLiters: Number(waterQuantityLiters) || 3000,
    isEstimated: Boolean(isEstimated),
    notes: notes || ""
  };

  irrigationLogs.unshift(newLog);
  res.status(201).json(newLog);
});

// --- DIGITAL FARM PROFILES ENDPOINTS ---
router.get("/digital-farm-profiles", (req, res) => {
  // Synthesize structured profile from live components
  const profiles = farms.map(farm => {
    const farmFields = fields.filter(fld => fld.farmId === farm.id);
    const farmSensors = sensors.filter(s => s.farmId === farm.id);
    const farmRecs = recommendations.filter(r => r.farmId === farm.id);
    const farmLogs = irrigationLogs.filter(l => l.farmId === farm.id);
    const farmDocs = documents.filter(d => d.farmId === farm.id);
    const farmConsents = consents.filter(c => c.farmId === farm.id);

    // Calculate completeness dynamically
    let score = 0;
    if (farm.name && farm.farmerName) score += 20;
    if (farm.coordinates?.lat && farm.district) score += 15;
    if (farm.soilType && farm.irrigationType) score += 15;
    if (farmFields.length > 0) score += 15;
    if (farmSensors.length > 0) score += 15;
    if (farmDocs.length > 0) score += 10;
    if (farmConsents.length > 0) score += 10;

    return {
      schemaVersion: "AGRINOVA-DFP-v1.0",
      generatedAt: new Date().toISOString(),
      farm,
      fields: farmFields,
      sensors: farmSensors,
      recommendations: farmRecs,
      irrigationLogs: farmLogs,
      documents: farmDocs,
      consents: farmConsents,
      completenessPercent: Math.min(100, score),
      isFinanceReady: score >= 80,
      disclaimer: "Demonstration Digital Farm Profile. Farmer-provided information is unverified by third parties unless explicitly stamped."
    };
  });

  res.json(profiles);
});

router.get("/digital-farm-profiles/:id", (req, res) => {
  const farm = farms.find(f => f.id === req.params.id);
  if (!farm) return res.status(404).json({ error: "Farm not found" });

  const farmFields = fields.filter(fld => fld.farmId === farm.id);
  const farmSensors = sensors.filter(s => s.farmId === farm.id);
  const farmRecs = recommendations.filter(r => r.farmId === farm.id);
  const farmLogs = irrigationLogs.filter(l => l.farmId === farm.id);
  const farmDocs = documents.filter(d => d.farmId === farm.id);
  const farmConsents = consents.filter(c => c.farmId === farm.id);

  let score = 0;
  if (farm.name && farm.farmerName) score += 20;
  if (farm.coordinates?.lat && farm.district) score += 15;
  if (farm.soilType && farm.irrigationType) score += 15;
  if (farmFields.length > 0) score += 15;
  if (farmSensors.length > 0) score += 15;
  if (farmDocs.length > 0) score += 10;
  if (farmConsents.length > 0) score += 10;

  res.json({
    schemaVersion: "AGRINOVA-DFP-v1.0",
    generatedAt: new Date().toISOString(),
    farm,
    fields: farmFields,
    sensors: farmSensors,
    recommendations: farmRecs,
    irrigationLogs: farmLogs,
    documents: farmDocs,
    consents: farmConsents,
    completenessPercent: Math.min(100, score),
    isFinanceReady: score >= 80,
    disclaimer: "Demonstration Digital Farm Profile. Farmer-provided information is unverified by third parties unless explicitly stamped."
  });
});

// --- CONSENT MANAGEMENT ENDPOINTS ---
router.get("/consents", (req, res) => {
  const { farmId } = req.query;
  let result = [...consents];
  if (farmId) result = result.filter(c => c.farmId === farmId);
  res.json(result);
});

router.post("/consents", (req, res) => {
  const { farmId, dataCategories, recipientName, purpose, requestedDurationDays } = req.body;
  if (!farmId || !recipientName || !purpose) {
    return res.status(400).json({ error: "farmId, recipientName, and purpose are required" });
  }

  const newConsent = {
    id: `CNS-${String(consents.length + 1).padStart(3, "0")}`,
    farmId,
    dataCategories: dataCategories || ["Soil Sensor Telemetry", "Farm Boundary"],
    recipientName,
    purpose,
    requestedDurationDays: Number(requestedDurationDays) || 90,
    status: "Active",
    createdAt: new Date().toISOString(),
    revokedAt: null,
    isDemoOnly: true
  };

  consents.unshift(newConsent);
  res.status(201).json(newConsent);
});

router.patch("/consents/:id/revoke", (req, res) => {
  const consent = consents.find(c => c.id === req.params.id);
  if (!consent) return res.status(404).json({ error: "Consent record not found" });
  consent.status = "Revoked";
  consent.revokedAt = new Date().toISOString();
  res.json({ message: "Consent revoked successfully", consent });
});

// --- DOCUMENTS ENDPOINTS ---
router.get("/documents", (req, res) => {
  const { farmId } = req.query;
  let result = [...documents];
  if (farmId) result = result.filter(d => d.farmId === farmId);
  res.json(result);
});

router.post("/documents", (req, res) => {
  const { farmId, name, type, fileSize, notes } = req.body;
  if (!farmId || !name || !type) {
    return res.status(400).json({ error: "farmId, document name and type required" });
  }

  const newDoc = {
    id: `DOC-${String(documents.length + 1).padStart(3, "0")}`,
    farmId,
    name,
    type,
    fileSize: fileSize || "1.0 MB",
    uploadDate: new Date().toISOString().split("T")[0],
    status: "Farmer-Provided (Unverified)",
    notes: notes || "Uploaded via AGRINOVA document checklist."
  };

  documents.unshift(newDoc);
  res.status(201).json(newDoc);
});

router.delete("/documents/:id", (req, res) => {
  const index = documents.findIndex(d => d.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: "Document not found" });
  const deleted = documents.splice(index, 1);
  res.json({ message: "Document removed", document: deleted[0] });
});

// --- CROP LIBRARY ENDPOINTS ---
router.get("/crop-library", (req, res) => {
  res.json(cropLibrary);
});

// --- ANALYTICS OVERVIEW ENDPOINT ---
router.get("/analytics/overview", (req, res) => {
  const totalArea = farms.reduce((acc, f) => acc + (f.area || 0), 0);
  const activeSensors = sensors.filter(s => s.status === "Online").length;
  const warningSensors = sensors.filter(s => s.status === "Warning").length;
  const offlineSensors = sensors.filter(s => s.status === "Offline").length;
  const highPriorityRecs = recommendations.filter(r => r.priority === "High" || r.priority === "Critical").length;

  res.json({
    metrics: {
      totalRegisteredFarms: farms.length,
      totalCultivatedAreaAcres: parseFloat(totalArea.toFixed(1)),
      totalActiveSensors: activeSensors,
      sensorsWarning: warningSensors,
      sensorsOffline: offlineSensors,
      farmsRequiringAttention: farms.filter(f => f.healthStatus !== "Optimal").length,
      pendingRecommendations: recommendations.filter(r => r.status === "New").length,
      highPriorityRecommendations: highPriorityRecs,
      averageDataCompleteness: Math.round(farms.reduce((acc, f) => acc + (f.dataCompleteness || 0), 0) / (farms.length || 1))
    },
    cropDistribution: [
      { crop: "Cotton", count: 1, area: 6.5 },
      { crop: "Paddy", count: 1, area: 4.8 },
      { crop: "Grapes & Cane", count: 1, area: 8.2 },
      { crop: "Millets & Oilseed", count: 1, area: 5.0 }
    ],
    stateDistribution: [
      { state: "Tamil Nadu", farms: farms.filter(f => f.state === "Tamil Nadu").length },
      { state: "Maharashtra", farms: farms.filter(f => f.state === "Maharashtra").length }
    ],
    recentSensorActivity: [
      { time: "06:00", moisture: 54, temperature: 24, humidity: 75 },
      { time: "09:00", moisture: 52, temperature: 28, humidity: 68 },
      { time: "12:00", moisture: 47, temperature: 33, humidity: 55 },
      { time: "15:00", moisture: 44, temperature: 35, humidity: 48 },
      { time: "18:00", moisture: 51, temperature: 30, humidity: 62 },
      { time: "21:00", moisture: 55, temperature: 27, humidity: 70 }
    ]
  });
});

// --- NOTIFICATIONS ENDPOINTS ---
router.get("/notifications", (req, res) => {
  res.json(notifications);
});

router.patch("/notifications/:id/read", (req, res) => {
  const notif = notifications.find(n => n.id === req.params.id);
  if (!notif) return res.status(404).json({ error: "Notification not found" });
  notif.read = true;
  res.json(notif);
});

// --- AUTH & ROLES ENDPOINTS (DEMO & BACKEND HYBRID) ---
router.post("/auth/login", (req, res) => {
  const { email, password, role } = req.body;
  const user = users.find(u => u.email === email || u.role === role);
  if (user) {
    return res.json({
      token: "demo-jwt-agrinova-auth-token-xyz",
      user,
      isDemoAuth: true,
      message: "Authenticated successfully in demo evaluation mode"
    });
  }
  // Fallback to first user
  res.json({
    token: "demo-jwt-agrinova-auth-token-xyz",
    user: users[0],
    isDemoAuth: true
  });
});

router.post("/auth/register", (req, res) => {
  const { name, email, phone, role, preferredLanguage, state, district } = req.body;
  const newUser = {
    id: `USR-${String(users.length + 1).padStart(2, "0")}`,
    name: name || "New Farmer",
    email: email || "farmer.new@agrinova.demo",
    role: role || "Farmer",
    phone: phone || "+91 90000 00000",
    preferredLanguage: preferredLanguage || "English",
    state: state || "Tamil Nadu",
    district: district || "Coimbatore",
    farmId: "FARM-TN-001"
  };
  users.push(newUser);
  res.status(201).json({
    token: "demo-jwt-agrinova-auth-token-xyz",
    user: newUser,
    isDemoAuth: true
  });
});

router.get("/auth/users", (req, res) => {
  res.json(users);
});

export default router;
