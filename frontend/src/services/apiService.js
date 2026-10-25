// AGRINOVA API Service with automatic offline fallback to local state
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
} from "../data/mockData";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

// Local storage keys
const STORAGE_KEYS = {
  FARMS: "agrinova_farms",
  FIELDS: "agrinova_fields",
  SENSORS: "agrinova_sensors",
  RECOMMENDATIONS: "agrinova_recs",
  RISKS: "agrinova_risks",
  IRRIGATION: "agrinova_irrigation",
  CONSENTS: "agrinova_consents",
  DOCS: "agrinova_docs",
  NOTIFS: "agrinova_notifs",
  USER: "agrinova_current_user"
};

function getLocalData(key, fallback) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    return fallback;
  }
}

function setLocalData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error("Local storage error:", e);
  }
}

export const apiService = {
  // Check if live backend is reachable
  async checkBackendStatus() {
    try {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 1200);
      const res = await fetch(`${API_BASE_URL}/health`, { signal: controller.signal });
      clearTimeout(id);
      if (res.ok) {
        return { isOnline: true, data: await res.json() };
      }
    } catch (e) {
      // Backend not reached, fallback smoothly
    }
    return { isOnline: false, mode: "Standalone Client Simulation" };
  },

  // Farms
  async getFarms() {
    try {
      const res = await fetch(`${API_BASE_URL}/farms`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getLocalData(STORAGE_KEYS.FARMS, initialFarms);
  },

  async createFarm(farmData) {
    try {
      const res = await fetch(`${API_BASE_URL}/farms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(farmData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const farms = getLocalData(STORAGE_KEYS.FARMS, initialFarms);
    const newFarm = {
      id: `FARM-${farmData.state === "Tamil Nadu" ? "TN" : "MH"}-${String(farms.length + 1).padStart(3, "0")}`,
      ...farmData,
      registrationDate: new Date().toISOString().split("T")[0],
      healthStatus: "Optimal",
      healthScore: 85,
      dataCompleteness: 75,
      coordinates: farmData.coordinates || { lat: 11.0, lng: 77.0 }
    };
    farms.push(newFarm);
    setLocalData(STORAGE_KEYS.FARMS, farms);
    return newFarm;
  },

  async updateFarm(id, updates) {
    try {
      const res = await fetch(`${API_BASE_URL}/farms/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updates)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const farms = getLocalData(STORAGE_KEYS.FARMS, initialFarms);
    const idx = farms.findIndex(f => f.id === id);
    if (idx !== -1) {
      farms[idx] = { ...farms[idx], ...updates };
      setLocalData(STORAGE_KEYS.FARMS, farms);
      return farms[idx];
    }
    return null;
  },

  async deleteFarm(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/farms/${id}`, { method: "DELETE" });
      if (res.ok) return await res.json();
    } catch (e) {}

    let farms = getLocalData(STORAGE_KEYS.FARMS, initialFarms);
    farms = farms.filter(f => f.id !== id);
    setLocalData(STORAGE_KEYS.FARMS, farms);
    return { success: true };
  },

  // Fields
  async getFields(farmId) {
    try {
      if (farmId) {
        const res = await fetch(`${API_BASE_URL}/farms/${farmId}/fields`);
        if (res.ok) return await res.json();
      }
    } catch (e) {}
    const fields = getLocalData(STORAGE_KEYS.FIELDS, initialFields);
    return farmId ? fields.filter(f => f.farmId === farmId) : fields;
  },

  async createField(farmId, fieldData) {
    try {
      const res = await fetch(`${API_BASE_URL}/farms/${farmId}/fields`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fieldData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const fields = getLocalData(STORAGE_KEYS.FIELDS, initialFields);
    const newField = {
      id: `FLD-${farmId.slice(5)}-${String.fromCharCode(65 + fields.length % 26)}`,
      farmId,
      ...fieldData,
      sensorCount: 0,
      status: "Healthy"
    };
    fields.push(newField);
    setLocalData(STORAGE_KEYS.FIELDS, fields);
    return newField;
  },

  // Sensors
  async getSensors(filter = {}) {
    try {
      const params = new URLSearchParams(filter).toString();
      const res = await fetch(`${API_BASE_URL}/sensors?${params}`);
      if (res.ok) return await res.json();
    } catch (e) {}

    let sensors = getLocalData(STORAGE_KEYS.SENSORS, initialSensors);
    if (filter.farmId) sensors = sensors.filter(s => s.farmId === filter.farmId);
    if (filter.type) sensors = sensors.filter(s => s.type.toLowerCase() === filter.type.toLowerCase());
    return sensors;
  },

  async createSensor(sensorData) {
    try {
      const res = await fetch(`${API_BASE_URL}/sensors`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sensorData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const sensors = getLocalData(STORAGE_KEYS.SENSORS, initialSensors);
    const newSensor = {
      id: `SNS-USR-${String(sensors.length + 1).padStart(2, "0")}`,
      ...sensorData,
      status: "Online",
      battery: 100,
      latestReading: sensorData.type === "Soil Moisture" ? 55 : (sensorData.type === "Air Temperature" ? 28 : 65),
      lastUpdated: new Date().toISOString(),
      installationDate: sensorData.installationDate || new Date().toISOString().split("T")[0],
      hardwareUid: sensorData.hardwareUid || `AGRI-NODE-${Math.floor(1000 + Math.random() * 9000)}`
    };
    sensors.push(newSensor);
    setLocalData(STORAGE_KEYS.SENSORS, sensors);
    return newSensor;
  },

  async getSensorReadings(sensor) {
    try {
      const res = await fetch(`${API_BASE_URL}/sensors/${sensor.id}/readings`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return {
      sensorId: sensor.id,
      sensorName: sensor.name,
      unit: sensor.unit,
      readings: generate24HourReadings(sensor.latestReading, sensor.latestReading * 0.15, sensor.unit)
    };
  },

  async simulateSensorRefresh() {
    try {
      const res = await fetch(`${API_BASE_URL}/sensors/simulate-refresh`, { method: "POST" });
      if (res.ok) return await res.json();
    } catch (e) {}

    const sensors = getLocalData(STORAGE_KEYS.SENSORS, initialSensors).map(s => {
      if (s.status === "Offline") return s;
      const variance = s.type === "Light Intensity" ? 2000 : (s.unit === "pH" ? 0.05 : 1.2);
      const delta = (Math.random() - 0.48) * variance;
      let nextVal = parseFloat((s.latestReading + delta).toFixed(1));
      if (s.unit === "%") nextVal = Math.min(100, Math.max(5, nextVal));
      return { ...s, latestReading: nextVal, lastUpdated: new Date().toISOString() };
    });
    setLocalData(STORAGE_KEYS.SENSORS, sensors);
    return { message: "Simulated refresh completed", sensorCount: sensors.length };
  },

  // Recommendations
  async getRecommendations() {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getLocalData(STORAGE_KEYS.RECOMMENDATIONS, initialRecommendations);
  },

  async updateRecommendationStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const recs = getLocalData(STORAGE_KEYS.RECOMMENDATIONS, initialRecommendations);
    const rec = recs.find(r => r.id === id);
    if (rec) {
      rec.status = status;
      setLocalData(STORAGE_KEYS.RECOMMENDATIONS, recs);
      return rec;
    }
    return null;
  },

  async generateRecommendations(farmId) {
    try {
      const res = await fetch(`${API_BASE_URL}/recommendations/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ farmId })
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const newRec = {
      id: `REC-${Date.now()}-GEN`,
      farmId: farmId || "FARM-TN-001",
      fieldId: "FLD-TN01-A",
      category: "Irrigation",
      priority: "Medium",
      title: "Soil Moisture Optimization Routine",
      explanation: "Sensor telemetry evaluated against current crop vegetative requirements.",
      supportingMeasurements: "Moisture 54%, Ambient 31°C",
      suggestedAction: "Maintain planned micro-drip duration for 45 minutes.",
      timestamp: new Date().toISOString(),
      status: "New",
      ruleTriggered: "RULE-AUTO-EVAL-01"
    };

    const recs = getLocalData(STORAGE_KEYS.RECOMMENDATIONS, initialRecommendations);
    recs.unshift(newRec);
    setLocalData(STORAGE_KEYS.RECOMMENDATIONS, recs);
    return { message: "Generated new recommendation", totalRecommendations: recs.length };
  },

  // Risks
  async getRisks() {
    try {
      const res = await fetch(`${API_BASE_URL}/risks`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getLocalData(STORAGE_KEYS.RISKS, initialRisks);
  },

  async updateRiskStatus(id, status) {
    try {
      const res = await fetch(`${API_BASE_URL}/risks/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const risks = getLocalData(STORAGE_KEYS.RISKS, initialRisks);
    const risk = risks.find(r => r.id === id);
    if (risk) {
      risk.status = status;
      setLocalData(STORAGE_KEYS.RISKS, risks);
      return risk;
    }
    return null;
  },

  // Irrigation Logs
  async getIrrigationLogs() {
    try {
      const res = await fetch(`${API_BASE_URL}/irrigation-logs`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getLocalData(STORAGE_KEYS.IRRIGATION, initialIrrigationLogs);
  },

  async createIrrigationLog(logData) {
    try {
      const res = await fetch(`${API_BASE_URL}/irrigation-logs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const logs = getLocalData(STORAGE_KEYS.IRRIGATION, initialIrrigationLogs);
    const newLog = {
      id: `IRR-${String(logs.length + 1).padStart(3, "0")}`,
      ...logData,
      durationMinutes: Number(logData.durationMinutes) || 60,
      waterQuantityLiters: Number(logData.waterQuantityLiters) || 3000
    };
    logs.unshift(newLog);
    setLocalData(STORAGE_KEYS.IRRIGATION, logs);
    return newLog;
  },

  // Digital Farm Profiles
  async getDigitalFarmProfiles() {
    try {
      const res = await fetch(`${API_BASE_URL}/digital-farm-profiles`);
      if (res.ok) return await res.json();
    } catch (e) {}

    const farms = getLocalData(STORAGE_KEYS.FARMS, initialFarms);
    const fields = getLocalData(STORAGE_KEYS.FIELDS, initialFields);
    const sensors = getLocalData(STORAGE_KEYS.SENSORS, initialSensors);
    const recs = getLocalData(STORAGE_KEYS.RECOMMENDATIONS, initialRecommendations);
    const logs = getLocalData(STORAGE_KEYS.IRRIGATION, initialIrrigationLogs);
    const docs = getLocalData(STORAGE_KEYS.DOCS, initialDocuments);
    const consents = getLocalData(STORAGE_KEYS.CONSENTS, initialConsents);

    return farms.map(farm => {
      let score = 0;
      if (farm.name && farm.farmerName) score += 20;
      if (farm.coordinates?.lat && farm.district) score += 15;
      if (farm.soilType && farm.irrigationType) score += 15;
      if (fields.filter(f => f.farmId === farm.id).length > 0) score += 15;
      if (sensors.filter(s => s.farmId === farm.id).length > 0) score += 15;
      if (docs.filter(d => d.farmId === farm.id).length > 0) score += 10;
      if (consents.filter(c => c.farmId === farm.id).length > 0) score += 10;

      return {
        schemaVersion: "AGRINOVA-DFP-v1.0",
        generatedAt: new Date().toISOString(),
        farm,
        fields: fields.filter(f => f.farmId === farm.id),
        sensors: sensors.filter(s => s.farmId === farm.id),
        recommendations: recs.filter(r => r.farmId === farm.id),
        irrigationLogs: logs.filter(l => l.farmId === farm.id),
        documents: docs.filter(d => d.farmId === farm.id),
        consents: consents.filter(c => c.farmId === farm.id),
        completenessPercent: Math.min(100, score),
        isFinanceReady: score >= 80,
        disclaimer: "Demonstration Digital Farm Profile. Farmer-provided information is unverified by third parties unless explicitly stamped."
      };
    });
  },

  // Consents
  async getConsents() {
    try {
      const res = await fetch(`${API_BASE_URL}/consents`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getLocalData(STORAGE_KEYS.CONSENTS, initialConsents);
  },

  async createConsent(consentData) {
    try {
      const res = await fetch(`${API_BASE_URL}/consents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(consentData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const consents = getLocalData(STORAGE_KEYS.CONSENTS, initialConsents);
    const newConsent = {
      id: `CNS-${String(consents.length + 1).padStart(3, "0")}`,
      ...consentData,
      status: "Active",
      createdAt: new Date().toISOString(),
      revokedAt: null,
      isDemoOnly: true
    };
    consents.unshift(newConsent);
    setLocalData(STORAGE_KEYS.CONSENTS, consents);
    return newConsent;
  },

  async revokeConsent(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/consents/${id}/revoke`, { method: "PATCH" });
      if (res.ok) return await res.json();
    } catch (e) {}

    const consents = getLocalData(STORAGE_KEYS.CONSENTS, initialConsents);
    const c = consents.find(item => item.id === id);
    if (c) {
      c.status = "Revoked";
      c.revokedAt = new Date().toISOString();
      setLocalData(STORAGE_KEYS.CONSENTS, consents);
      return { success: true, consent: c };
    }
    return null;
  },

  // Documents
  async getDocuments() {
    try {
      const res = await fetch(`${API_BASE_URL}/documents`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getLocalData(STORAGE_KEYS.DOCS, initialDocuments);
  },

  async createDocument(docData) {
    try {
      const res = await fetch(`${API_BASE_URL}/documents`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(docData)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const docs = getLocalData(STORAGE_KEYS.DOCS, initialDocuments);
    const newDoc = {
      id: `DOC-${String(docs.length + 1).padStart(3, "0")}`,
      ...docData,
      uploadDate: new Date().toISOString().split("T")[0],
      status: "Farmer-Provided (Unverified)"
    };
    docs.unshift(newDoc);
    setLocalData(STORAGE_KEYS.DOCS, docs);
    return newDoc;
  },

  async deleteDocument(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/documents/${id}`, { method: "DELETE" });
      if (res.ok) return await res.json();
    } catch (e) {}

    let docs = getLocalData(STORAGE_KEYS.DOCS, initialDocuments);
    docs = docs.filter(d => d.id !== id);
    setLocalData(STORAGE_KEYS.DOCS, docs);
    return { success: true };
  },

  // Crop Library
  async getCropLibrary() {
    try {
      const res = await fetch(`${API_BASE_URL}/crop-library`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return cropLibrary;
  },

  // Notifications
  async getNotifications() {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return getLocalData(STORAGE_KEYS.NOTIFS, initialNotifications);
  },

  async markNotificationRead(id) {
    try {
      const res = await fetch(`${API_BASE_URL}/notifications/${id}/read`, { method: "PATCH" });
      if (res.ok) return await res.json();
    } catch (e) {}

    const notifs = getLocalData(STORAGE_KEYS.NOTIFS, initialNotifications);
    const n = notifs.find(item => item.id === id);
    if (n) {
      n.read = true;
      setLocalData(STORAGE_KEYS.NOTIFS, notifs);
      return n;
    }
    return null;
  },

  // Reset Demo State
  async resetAllDemoData() {
    try {
      await fetch(`${API_BASE_URL}/reset-demo-data`, { method: "POST" });
    } catch (e) {}
    localStorage.removeItem(STORAGE_KEYS.FARMS);
    localStorage.removeItem(STORAGE_KEYS.FIELDS);
    localStorage.removeItem(STORAGE_KEYS.SENSORS);
    localStorage.removeItem(STORAGE_KEYS.RECOMMENDATIONS);
    localStorage.removeItem(STORAGE_KEYS.RISKS);
    localStorage.removeItem(STORAGE_KEYS.IRRIGATION);
    localStorage.removeItem(STORAGE_KEYS.CONSENTS);
    localStorage.removeItem(STORAGE_KEYS.DOCS);
    localStorage.removeItem(STORAGE_KEYS.NOTIFS);
    return { success: true };
  }
};
