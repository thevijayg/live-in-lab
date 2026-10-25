import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import { DashboardLayout } from "./layouts/DashboardLayout";

// Pages
import { LandingPage } from "./pages/LandingPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { DashboardOverview } from "./pages/DashboardOverview";
import { FarmManagement } from "./pages/FarmManagement";
import { FieldMonitoring } from "./pages/FieldMonitoring";
import { SensorManagement } from "./pages/SensorManagement";
import { AgriculturalIntelligence } from "./pages/AgriculturalIntelligence";
import { IrrigationAdvisory } from "./pages/IrrigationAdvisory";
import { CropRecommendation } from "./pages/CropRecommendation";
import { RiskMonitoring } from "./pages/RiskMonitoring";
import { DigitalFarmProfilePage } from "./pages/DigitalFarmProfilePage";
import { ConsentManagement } from "./pages/ConsentManagement";
import { FinanceReadiness } from "./pages/FinanceReadiness";
import { FpoManagement } from "./pages/FpoManagement";
import { AnalyticsReports } from "./pages/AnalyticsReports";
import { NotificationsPage } from "./pages/NotificationsPage";
import { SettingsPage } from "./pages/SettingsPage";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Authenticated Dashboard Core */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardOverview />} />
            <Route path="/farms" element={<FarmManagement />} />
            <Route path="/fields" element={<FieldMonitoring />} />
            <Route path="/sensors" element={<SensorManagement />} />
            <Route path="/intelligence" element={<AgriculturalIntelligence />} />
            <Route path="/irrigation" element={<IrrigationAdvisory />} />
            <Route path="/crop-recommendations" element={<CropRecommendation />} />
            <Route path="/risks" element={<RiskMonitoring />} />
            <Route path="/digital-profiles" element={<DigitalFarmProfilePage />} />
            <Route path="/consent" element={<ConsentManagement />} />
            <Route path="/finance-readiness" element={<FinanceReadiness />} />
            <Route path="/fpo-management" element={<FpoManagement />} />
            <Route path="/analytics" element={<AnalyticsReports />} />
            <Route path="/notifications" element={<NotificationsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
