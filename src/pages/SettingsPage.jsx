import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import {
  Settings,
  User,
  Globe,
  Bell,
  Shield,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info
} from "lucide-react";
import { Badge } from "../components/common/Badge";
import { ConfirmDialog } from "../components/common/ConfirmDialog";

export function SettingsPage() {
  const {
    currentUser,
    loginUser,
    preferredLanguage,
    setPreferredLanguage,
    resetAllDemoData,
    selectedFarm
  } = useApp();

  const [formData, setFormData] = useState({
    name: currentUser?.name || "Murugan Selvam",
    email: currentUser?.email || "murugan@agrinova.demo",
    phone: currentUser?.phone || "+91 98421 54321",
    state: currentUser?.state || "Tamil Nadu",
    district: currentUser?.district || "Coimbatore",
    role: currentUser?.role || "Farmer"
  });

  const [notifSettings, setNotifSettings] = useState({
    moistureAlerts: true,
    sensorOfflineAlerts: true,
    highPriorityAdvisories: true,
    weeklyReportDigest: false
  });

  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [resetMessage, setResetMessage] = useState("");

  const handleSaveProfile = (e) => {
    e.preventDefault();
    loginUser({ ...currentUser, ...formData });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  const handleResetConfirm = async () => {
    setIsResetConfirmOpen(false);
    await resetAllDemoData();
    setResetMessage("Demonstration state has been restored to default baseline!");
    setTimeout(() => setResetMessage(""), 4000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal">
              Farmer Profile & System Preferences
            </h1>
            <Badge variant="forest">{currentUser?.role || "Farmer"}</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Manage your account credentials, regional language preferences, and evaluation environment settings.
          </p>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-900 text-xs flex items-center gap-2 font-bold animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-agri" />
          <span>Profile preferences updated successfully!</span>
        </div>
      )}

      {resetMessage && (
        <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-amber-900 text-xs flex items-center gap-2 font-bold animate-in fade-in">
          <AlertTriangle className="w-4 h-4 text-amber-warn" />
          <span>{resetMessage}</span>
        </div>
      )}

      {/* Profile Form */}
      <div className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
          <User className="w-4 h-4 text-forest" />
          <span>Personal & Farm Contact Information</span>
        </h3>

        <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                Pilot State
              </label>
              <input
                type="text"
                disabled
                value={formData.state}
                className="w-full bg-slate-100 text-slate-500 text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block font-bold text-charcoal uppercase tracking-wider mb-1">
                District
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full bg-ivory text-charcoal text-sm px-3.5 py-2.5 rounded-xl border border-slate-border focus:bg-white focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl text-xs font-bold bg-forest hover:bg-forest-dark text-lime-accent shadow-md transition-all"
            >
              Save Profile Updates
            </button>
          </div>
        </form>
      </div>

      {/* Language Preferences */}
      <div className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
          <Globe className="w-4 h-4 text-forest" />
          <span>Multilingual Interface Setup (Tamil Nadu & Maharashtra)</span>
        </h3>
        <p className="text-xs text-slate-muted">
          Select interface translation mode. AGRINOVA prepares translation strings for Tamil and Marathi while preserving underlying agronomic precision.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          {[
            { lang: "English", native: "English", status: "Active Interface" },
            { lang: "Tamil", native: "தமிழ்", status: "Pilot Preview Ready" },
            { lang: "Marathi", native: "मराठी", status: "Pilot Preview Ready" }
          ].map(item => (
            <div
              key={item.lang}
              onClick={() => setPreferredLanguage(item.lang)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                preferredLanguage === item.lang
                  ? "bg-forest/5 border-forest ring-1 ring-forest"
                  : "bg-ivory border-slate-border hover:bg-slate-50"
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-charcoal">{item.lang}</span>
                <span className="text-xs text-agri font-bold">{item.native}</span>
              </div>
              <span className="text-[11px] text-slate-muted">{item.status}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm space-y-4 text-xs">
        <h3 className="text-sm font-bold text-charcoal flex items-center gap-2">
          <Bell className="w-4 h-4 text-forest" />
          <span>Notification & Telemetry Alert Preferences</span>
        </h3>

        <div className="space-y-3">
          {[
            { key: "moistureAlerts", title: "Soil Moisture Stress Alerts", desc: "Notify immediately when root zone moisture drops below configured crop threshold." },
            { key: "sensorOfflineAlerts", title: "Sensor Node Battery & Offline Heartbeat", desc: "Alert when probe fails to send telemetry for over 18 hours or battery < 15%." },
            { key: "highPriorityAdvisories", title: "Critical Agricultural Advisories", desc: "Push notification for pest, canal scheduling, or AWD cycle triggers." }
          ].map(item => (
            <label key={item.key} className="flex items-start gap-3 p-3 bg-ivory rounded-xl border border-slate-200/80 cursor-pointer">
              <input
                type="checkbox"
                checked={notifSettings[item.key]}
                onChange={(e) => setNotifSettings({ ...notifSettings, [item.key]: e.target.checked })}
                className="rounded text-forest focus:ring-agri w-4 h-4 mt-0.5"
              />
              <div>
                <span className="font-bold text-charcoal block">{item.title}</span>
                <span className="text-slate-muted text-[11px] block mt-0.5">{item.desc}</span>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Demo State Reset Box */}
      <div className="bg-white rounded-2xl p-6 border border-rose-200 shadow-sm space-y-3 text-xs">
        <div className="flex items-center gap-2 text-danger">
          <RotateCcw className="w-4 h-4" />
          <h3 className="text-sm font-bold">Reset Demonstration Data</h3>
        </div>
        <p className="text-slate-muted leading-relaxed">
          Restore all farms, sensors, recommendations, risks, irrigation logs, and documents to their clean initial state for fresh evaluation or competition presentation.
        </p>
        <button
          onClick={() => setIsResetConfirmOpen(true)}
          className="px-4 py-2 rounded-xl text-xs font-bold bg-danger hover:bg-rose-700 text-white shadow-sm transition-colors"
        >
          Reset All Demo Records
        </button>
      </div>

      {/* Confirm Reset Dialog */}
      <ConfirmDialog
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={handleResetConfirm}
        title="Reset All Demo Records to Initial Baseline?"
        message="This will clear your local alterations and reload the initial pilot datasets for Tamil Nadu & Maharashtra."
        confirmText="Confirm Reset"
        isDanger={true}
      />
    </div>
  );
}
