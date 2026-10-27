import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import {
  Menu,
  Search,
  Bell,
  RefreshCw,
  User,
  LogOut,
  ChevronDown,
  Layers,
  CheckCircle2,
  AlertTriangle,
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
    <header className="sticky top-0 z-30 bg-white border-b border-slate-border px-4 lg:px-6 py-2.5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className="p-2 rounded-md text-charcoal hover:bg-ivory lg:hidden"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <label htmlFor="farm-select" className="hidden sm:inline text-xs text-slate-muted">
              Farm
            </label>
            <div className="relative">
              <select
                id="farm-select"
                value={selectedFarmId}
                onChange={(e) => setSelectedFarmId(e.target.value)}
                className="appearance-none bg-white text-charcoal text-sm font-medium pl-3 pr-8 py-1.5 rounded-md border border-slate-border hover:border-forest focus:outline-none focus:ring-1 focus:ring-forest/20 cursor-pointer"
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

          <div className="hidden md:flex items-center gap-1.5 text-[11px] text-slate-muted">
            <span className={`w-1.5 h-1.5 rounded-full ${backendStatus.isOnline ? "bg-agri" : "bg-amber-warn"}`} />
            <span>{backendStatus.isOnline ? "API connected" : "Local demo"}</span>
          </div>
        </div>

        <div className="hidden xl:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search sensors, fields, advice…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-ivory text-charcoal text-sm pl-9 pr-4 py-1.5 rounded-md border border-transparent focus:bg-white focus:outline-none focus:border-slate-border placeholder:text-slate-muted"
            />
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={handleRefresh}
            title="Refresh simulated sensor readings"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-forest hover:bg-ivory border border-transparent hover:border-slate-border"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <div className="hidden lg:flex items-center gap-1 text-xs text-slate-muted px-2 py-1">
            <Globe className="w-3.5 h-3.5 text-forest" />
            <select
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className="bg-transparent text-xs font-medium text-charcoal focus:outline-none cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Tamil">தமிழ்</option>
              <option value="Marathi">मराठी</option>
            </select>
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowNotifMenu(!showNotifMenu);
                setShowUserMenu(false);
              }}
              className="relative p-2 rounded-md text-charcoal hover:bg-ivory"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5 text-slate-muted" />
              {unreadNotifCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-danger text-white text-[10px] font-medium rounded-full flex items-center justify-center">
                  {unreadNotifCount}
                </span>
              )}
            </button>

            {showNotifMenu && (
              <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-md border border-slate-border overflow-hidden z-50">
                <div className="px-4 py-3 bg-ivory border-b border-slate-border flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h4 className="font-sans text-sm font-semibold text-charcoal">Alerts</h4>
                    <Badge variant="lime" size="xs">{unreadNotifCount} new</Badge>
                  </div>
                  <Link
                    to="/notifications"
                    onClick={() => setShowNotifMenu(false)}
                    className="text-xs text-forest font-medium hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="max-h-72 overflow-y-auto divide-y divide-slate-border">
                  {notifications.slice(0, 5).map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      className={`p-3 text-xs cursor-pointer hover:bg-ivory flex items-start gap-2.5 ${
                        !notif.read ? "bg-cream font-medium" : "text-slate-muted"
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
                        <p className="text-charcoal font-medium">{notif.title}</p>
                        <p className="mt-0.5 text-slate-muted line-clamp-2">{notif.message}</p>
                        <span className="text-[10px] text-slate-muted mt-1 block">
                          {new Date(notif.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowUserMenu(!showUserMenu);
                setShowNotifMenu(false);
              }}
              className="flex items-center gap-2 p-1.5 rounded-md hover:bg-ivory"
            >
              <div className="w-8 h-8 rounded-md bg-forest text-cream flex items-center justify-center font-medium text-xs">
                {currentUser?.name ? currentUser.name.charAt(0) : "U"}
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-xs font-medium text-charcoal leading-none truncate max-w-[100px]">
                  {currentUser?.name || "Farmer"}
                </p>
                <p className="text-[10px] text-slate-muted mt-0.5">{currentUser?.role || "Farmer"}</p>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-muted hidden sm:block" />
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-md border border-slate-border py-2 z-50">
                <div className="px-4 py-2 border-b border-slate-border">
                  <p className="text-xs font-medium text-charcoal">{currentUser?.name}</p>
                  <p className="text-[11px] text-slate-muted truncate">{currentUser?.email}</p>
                  <div className="mt-1.5">
                    <Badge variant="forest" size="xs">{currentUser?.role}</Badge>
                  </div>
                </div>
                <div className="py-1">
                  <Link
                    to="/settings"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-charcoal hover:bg-ivory"
                  >
                    <User className="w-4 h-4 text-slate-muted" />
                    <span>Profile & settings</span>
                  </Link>
                  <Link
                    to="/digital-profiles"
                    onClick={() => setShowUserMenu(false)}
                    className="flex items-center gap-2 px-4 py-2 text-xs text-charcoal hover:bg-ivory"
                  >
                    <Layers className="w-4 h-4 text-slate-muted" />
                    <span>Farm profile</span>
                  </Link>
                </div>
                <div className="border-t border-slate-border pt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs text-danger hover:bg-rose-50"
                  >
                    <LogOut className="w-4 h-4 text-danger" />
                    <span>Sign out</span>
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
