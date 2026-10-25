import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  RefreshCw,
  Radio,
  User,
  LogOut,
  ChevronDown,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Server,
  Globe
} from "lucide-react";
import { Badge } from "./Badge";

export function Navbar({ onToggleSidebar }) {
  const {
    currentUser,
    logoutUser,
    farms,
    selectedFarmId,
    setSelectedFarmId,
    selectedFarm,
    searchTerm,
    setSearchTerm,
    refreshSensors,
    notifications,
    unreadNotifCount,
    markNotificationRead,
    backendStatus,
    preferredLanguage,
    setPreferredLanguage
  } = useApp();

  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refreshSensors();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-border px-4 lg:px-8 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Menu Toggle & Brand / Farm Selector */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-xl text-charcoal hover:bg-slate-100 lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Current Farm Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-block text-xs font-semibold text-slate-muted uppercase tracking-wider">
              Active Farm:
            </span>
            <div className="relative">
              <select
                value={selectedFarmId}
                onChange={(e) => setSelectedFarmId(e.target.value)}
                className="appearance-none bg-ivory text-charcoal text-xs sm:text-sm font-semibold pl-3 pr-8 py-2 rounded-xl border border-slate-border hover:border-agri focus:outline-none focus:ring-2 focus:ring-agri/20 cursor-pointer shadow-sm"
              >
                {farms.map((farm) => (
                  <option key={farm.id} value={farm.id}>
                    {farm.name} ({farm.state})
                  </option>
                ))}
              </select>
              <ChevronDown className="w-4 h-4 text-slate-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Backend Connection Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-[11px] text-slate-muted">
            <span className={`w-2 h-2 rounded-full ${backendStatus.isOnline ? "bg-agri" : "bg-amber-warn"}`} />
            <span>{backendStatus.isOnline ? "API Connected" : "Local Demo Mode"}</span>
          </div>
        </div>

        {/* Center: Search Control */}
        <div className="hidden xl:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sensors, fields, recommendations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-ivory text-charcoal text-xs sm:text-sm pl-9 pr-4 py-2 rounded-xl border border-slate-border focus:bg-white focus:outline-none focus:ring-2 focus:ring-agri/30 transition-all placeholder:text-slate-muted"
            />
          </div>
        </div>

        {/* Right: Telemetry Refresh, Language, Notifications & Profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Manual Refresh Button */}
          <button
            onClick={handleRefresh}
            title="Refresh Simulated Sensor Telemetry"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-ivory-subtle text-forest hover:bg-lime-accent/30 border border-forest/10 transition-colors shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh Telemetry</span>
          </button>

          {/* Language Selector */}
          <div className="hidden lg:flex items-center gap-1 text-xs text-slate-muted bg-ivory px-2 py-1.5 rounded-lg border border-slate-200">
            <Globe className="w-3.5 h-3.5 text-forest" />
            <select
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className="bg-transparent text-xs font-medium text-charcoal focus:outline-none cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Tamil">தமிழ் (Tamil)</option>
              <option value="Marathi">मराठी (Marathi)</option>
            </select>
          </div>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setShowUserMenu(false);
              }}
              className="relative p-2 rounded-xl text-charcoal hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-border"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5 text-slate-muted" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-border overflow-hidden z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-3 bg-ivory border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-charcoal">Alerts & Notifications</h4>
                    <Badge variant="lime" size="xs">{unreadNotifCount} new</Badge>
                  </div>
                  <Link
                    to="/notifications"
                    onClick={() => setShowNotifMenu(false)}
                    className="text-xs text-agri font-semibold hover:underline"
                  >
                    View All
                  </Link>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-100">
                  {notifications.slice(0, 5).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3 text-xs transition-colors cursor-pointer hover:bg-slate-50 flex items-start gap-2.5 ${
                        !notif.read ? "bg-lime-soft/40 font-medium" : "text-slate-muted"
                      }`}
                    >
                      {notif.type === "Critical" ? (
                        <AlertTriangle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
                      ) : notif.type === "Warning" ? (
                        <AlertTriangle className="w-4 h-4 text-amber-warn flex-shrink-0 mt-0.5" />
                      ) : (
                        <CheckCircle2 className="w-4 h-4 text-agri flex-shrink-0 mt-0.5" />
                      )}
                      <div className="flex-1">
                        <p className="text-charcoal font-semibold">{notif.title}</p>
                        <p className="mt-0.5 text-slate-muted line-clamp-2">{notif.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {new Date(notif.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifMenu(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-border"
            >
              <div className="w-8 h-8 rounded-full bg-forest text-lime-accent flex items-center justify-center font-bold text-xs border border-forest/20 shadow-sm">
                {currentUser?.name ? currentUser.name.charAt(0) : "U"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-charcoal leading-none truncate max-w-[100px]">
                  {currentUser?.name || "Farmer"}
                </p>
                <p className="text-[10px] text-slate-muted mt-0.5">{currentUser?.role || "Farmer"}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-muted hidden sm:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-border py-2 z-50 animate-in fade-in zoom-in-95">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-charcoal">{currentUser?.name}</p>
                  <p className="text-[11px] text-slate-muted truncate">{currentUser?.email}</p>
                  <div className="mt-1.5">
                    <Badge variant="forest" size="xs">{currentUser?.role}</Badge>
                  </div>
                </div>
                <div className="py-1">
                  <Link
                    to="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-charcoal hover:bg-slate-50 transition-colors"
                  >
                    <User className="w-4 h-4 text-slate-muted" />
                    <span>Farmer Profile & Settings</span>
                  </Link>
                  <Link
                    to="/digital-profiles"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-charcoal hover:bg-slate-50 transition-colors"
                  >
                    <Layers className="w-4 h-4 text-slate-muted" />
                    <span>Digital Farm Profile</span>
                  </Link>
                </div>
                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-danger hover:bg-rose-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4 text-danger" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
