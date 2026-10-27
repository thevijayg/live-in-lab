import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components/common/Sidebar";
import { Navbar } from "../components/common/Navbar";
import { useApp } from "../context/AppContext";
import { AlertBanner } from "../components/common/AlertBanner";
import { Link } from "react-router-dom";

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { risks, sensors, isSimulating } = useApp();
  const location = useLocation();

  const criticalRisks = risks.filter(r => r.status === "Active" && r.severity === "Critical");
  const offlineSensors = sensors.filter(s => s.status === "Offline");

  return (
    <div className="min-h-screen bg-ivory flex">
      {/* Sidebar (Desktop Persistent + Mobile Drawer) */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all">
        <Navbar onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-6">
          {/* Critical Risk Global Banner */}
          {criticalRisks.length > 0 && location.pathname !== "/risks" && (
            <AlertBanner
              type="critical"
              title="A field needs attention"
              message={`${criticalRisks[0].title}. Open risks to see the reading and the recommended action.`}
              actionLabel="Open risks"
              onAction={() => window.location.href = "/risks"}
            />
          )}

          {/* Child Page Content */}
          <Outlet />
        </main>

        {/* Global Dashboard Footer */}
        <footer className="border-t border-slate-border py-3 px-6 text-center text-xs text-slate-muted bg-white">
          <p>
            AGRINOVA · Tamil Nadu & Maharashtra pilots · Sensor values in this demo are simulated
          </p>
        </footer>
      </div>
    </div>
  );
}
