import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { apiService } from "../services/apiService";
import { demoUsers } from "../data/mockData";

const AppContext = createContext();

export function AppProvider({ children }) {
  // Current user & authentication
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem("agrinova_user");
      return saved ? JSON.parse(saved) : demoUsers[0];
    } catch (e) {
      return demoUsers[0];
    }
  });

  // Backend status
  const [backendStatus, setBackendStatus] = useState({ isOnline: false, mode: "Checking..." });

  // Core domain entities
  const [farms, setFarms] = useState([]);
  const [selectedFarmId, setSelectedFarmId] = useState("");
  const [fields, setFields] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [risks, setRisks] = useState([]);
  const [irrigationLogs, setIrrigationLogs] = useState([]);
  const [consents, setConsents] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [cropLibrary, setCropLibrary] = useState([]);

  // UI state
  const [searchTerm, setSearchTerm] = useState("");
  const [preferredLanguage, setPreferredLanguage] = useState(
    () => localStorage.getItem("agrinova_lang") || "English"
  );

  // Persist language to localStorage whenever it changes
  const setPreferredLanguageWithPersist = (lang) => {
    localStorage.setItem("agrinova_lang", lang);
    setPreferredLanguage(lang);
  };
  const [isSimulating, setIsSimulating] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Load initial data
  const loadData = useCallback(async () => {
    setIsLoading(true);
    try {
      // Check backend status
      const status = await apiService.checkBackendStatus();
      setBackendStatus(status);

      // Fetch all entities
      const [
        farmsData,
        fieldsData,
        sensorsData,
        recsData,
        risksData,
        irrigationData,
        consentsData,
        docsData,
        notifsData,
        cropsData
      ] = await Promise.all([
        apiService.getFarms(),
        apiService.getFields(),
        apiService.getSensors(),
        apiService.getRecommendations(),
        apiService.getRisks(),
        apiService.getIrrigationLogs(),
        apiService.getConsents(),
        apiService.getDocuments(),
        apiService.getNotifications(),
        apiService.getCropLibrary()
      ]);

      setFarms(farmsData || []);
      if (farmsData && farmsData.length > 0) {
        setSelectedFarmId(prev => prev || farmsData[0].id);
      }
      setFields(fieldsData || []);
      setSensors(sensorsData || []);
      setRecommendations(recsData || []);
      setRisks(risksData || []);
      setIrrigationLogs(irrigationData || []);
      setConsents(consentsData || []);
      setDocuments(docsData || []);
      setNotifications(notifsData || []);
      setCropLibrary(cropsData || []);
    } catch (err) {
      console.error("Error initializing app state:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Selected farm object helper
  const selectedFarm = farms.find(f => f.id === selectedFarmId) || farms[0] || null;

  // Selected farm fields & sensors
  const currentFarmFields = selectedFarm ? fields.filter(f => f.farmId === selectedFarm.id) : [];
  const currentFarmSensors = selectedFarm ? sensors.filter(s => s.farmId === selectedFarm.id) : [];

  // Sensor simulation refresh handler
  const refreshSensors = async () => {
    await apiService.simulateSensorRefresh();
    const updated = await apiService.getSensors();
    setSensors(updated);
  };

  // Safe bounded periodic simulation (runs every 30 seconds if enabled)
  useEffect(() => {
    if (!isSimulating) return;
    const interval = setInterval(() => {
      refreshSensors();
    }, 30000);
    return () => clearInterval(interval);
  }, [isSimulating]);

  // Action methods
  const addFarm = async (farmData) => {
    const created = await apiService.createFarm(farmData);
    setFarms(prev => [...prev, created]);
    setSelectedFarmId(created.id);
    return created;
  };

  const updateFarm = async (id, updates) => {
    const updated = await apiService.updateFarm(id, updates);
    if (updated) {
      setFarms(prev => prev.map(f => (f.id === id ? updated : f)));
    }
    return updated;
  };

  const deleteFarm = async (id) => {
    await apiService.deleteFarm(id);
    setFarms(prev => {
      const remaining = prev.filter(f => f.id !== id);
      if (selectedFarmId === id && remaining.length > 0) {
        setSelectedFarmId(remaining[0].id);
      }
      return remaining;
    });
  };

  const addSensor = async (sensorData) => {
    const created = await apiService.createSensor(sensorData);
    setSensors(prev => [...prev, created]);
    return created;
  };

  const addIrrigationLog = async (logData) => {
    const created = await apiService.createIrrigationLog(logData);
    setIrrigationLogs(prev => [created, ...prev]);
    return created;
  };

  const updateRecommendationStatus = async (id, status) => {
    const updated = await apiService.updateRecommendationStatus(id, status);
    if (updated) {
      setRecommendations(prev => prev.map(r => (r.id === id ? updated : r)));
    }
  };

  const generateRecommendations = async (farmId) => {
    await apiService.generateRecommendations(farmId);
    const updated = await apiService.getRecommendations();
    setRecommendations(updated);
    const updatedRisks = await apiService.getRisks();
    setRisks(updatedRisks);
  };

  const updateRiskStatus = async (id, status) => {
    const updated = await apiService.updateRiskStatus(id, status);
    if (updated) {
      setRisks(prev => prev.map(r => (r.id === id ? updated : r)));
    }
  };

  const addConsent = async (consentData) => {
    const created = await apiService.createConsent(consentData);
    setConsents(prev => [created, ...prev]);
    return created;
  };

  const revokeConsent = async (id) => {
    await apiService.revokeConsent(id);
    setConsents(prev =>
      prev.map(c => (c.id === id ? { ...c, status: "Revoked", revokedAt: new Date().toISOString() } : c))
    );
  };

  const addDocument = async (docData) => {
    const created = await apiService.createDocument(docData);
    setDocuments(prev => [created, ...prev]);
    return created;
  };

  const deleteDocument = async (id) => {
    await apiService.deleteDocument(id);
    setDocuments(prev => prev.filter(d => d.id !== id));
  };

  const markNotificationRead = async (id) => {
    await apiService.markNotificationRead(id);
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)));
  };

  const loginUser = (user) => {
    setCurrentUser(user);
    localStorage.setItem("agrinova_user", JSON.stringify(user));
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("agrinova_user");
  };

  const resetAllDemoData = async () => {
    await apiService.resetAllDemoData();
    await loadData();
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        currentUser,
        loginUser,
        logoutUser,
        backendStatus,
        farms,
        selectedFarmId,
        setSelectedFarmId,
        selectedFarm,
        fields,
        currentFarmFields,
        sensors,
        currentFarmSensors,
        recommendations,
        risks,
        irrigationLogs,
        consents,
        documents,
        notifications,
        unreadNotifCount,
        cropLibrary,
        searchTerm,
        setSearchTerm,
        preferredLanguage,
        setPreferredLanguage: setPreferredLanguageWithPersist,
        isSimulating,
        setIsSimulating,
        isLoading,
        refreshSensors,
        addFarm,
        updateFarm,
        deleteFarm,
        addSensor,
        addIrrigationLog,
        updateRecommendationStatus,
        generateRecommendations,
        updateRiskStatus,
        addConsent,
        revokeConsent,
        addDocument,
        deleteDocument,
        markNotificationRead,
        resetAllDemoData,
        reloadAllData: loadData
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
