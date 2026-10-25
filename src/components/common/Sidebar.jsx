import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import {
  LayoutDashboard,
  Sprout,
  Grid3X3,
  Cpu,
  BrainCircuit,
  Droplets,
  BookOpen,
  AlertTriangle,
  FileCheck2,
  ShieldCheck,
  Landmark,
  Users,
  BarChart3,
  Bell,
  Settings,
  X,
  Radio,
  ExternalLink
} from "lucide-react";
import { Badge } from "./Badge";

export function Sidebar({ isOpen, onClose }) {
  const { unreadNotifCount, recommendations, risks, currentUser } = useApp();

  const criticalRecCount = recommendations.filter(r => r.status === "New" && (r.priority === "High" || r.priority === "Critical")).length;
  const activeRiskCount = risks.filter(r => r.status === "Active").length;

  const navSections = [
    {
      label: "General",
      items: [
        { name: "Overview", path: "/dashboard", icon: LayoutDashboard }
      ]
    },
    {
      label: "1. Sense Layer (IoT)",
      items: [
        { name: "Farm Management", path: "/farms", icon: Sprout },
        { name: "Field Monitoring", path: "/fields", icon: Grid3X3 },
        { name: "Sensor Telemetry", path: "/sensors", icon: Cpu }
      ]
    },
    {
      label: "2. Decide Layer (AI Engine)",
      items: [
        {
          name: "Agricultural Intelligence",
          path: "/intelligence",
          icon: BrainCircuit,
          badge: criticalRecCount > 0 ? criticalRecCount : null,
          badgeVariant: "danger"
        },
        { name: "Irrigation Advisory", path: "/irrigation", icon: Droplets },
        { name: "Crop Recommendations", path: "/crop-recommendations", icon: BookOpen },
        {
          name: "Risk Monitoring",
          path: "/risks",
          icon: AlertTriangle,
          badge: activeRiskCount > 0 ? activeRiskCount : null,
          badgeVariant: "warning"
        }
      ]
    },
    {
      label: "3. Finance & Trust Layer",
      items: [
        { name: "Digital Farm Profiles", path: "/digital-profiles", icon: FileCheck2 },
        { name: "Consent & Data Sharing", path: "/consent", icon: ShieldCheck },
        { name: "Finance Readiness", path: "/finance-readiness", icon: Landmark },
        { name: "FPO Management", path: "/fpo-management", icon: Users }
      ]
    },
    {
      label: "System & Reports",
      items: [
        { name: "Analytics & Reports", path: "/analytics", icon: BarChart3 },
        {
          name: "Notifications",
          path: "/notifications",
          icon: Bell,
          badge: unreadNotifCount > 0 ? unreadNotifCount : null,
          badgeVariant: "agri"
        },
        { name: "Farmer Settings", path: "/settings", icon: Settings }
      ]
    }
  ];

  const content = (
    <div className="h-full flex flex-col justify-between bg-white border-r border-slate-border w-64 lg:w-72">
      {/* Brand Header */}
      <div>
        <div className="px-6 py-5 flex items-center justify-between border-b border-slate-100 bg-ivory/60">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-forest flex items-center justify-center p-1.5 shadow-md">
              <img src="/logo.svg" alt="AGRINOVA logo" className="w-full h-full" />
            </div>
            <div>
              <span className="text-lg font-black tracking-tight text-forest-dark block leading-none">
                AGRINOVA
              </span>
              <span className="text-[10px] font-semibold text-agri tracking-wider uppercase">
                Smart Agriculture
              </span>
            </div>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-lg text-slate-muted hover:text-charcoal hover:bg-slate-100"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Pilot Geographic Tag */}
        <div className="px-6 py-2.5 bg-gradient-to-r from-forest/5 via-agri/5 to-transparent border-b border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
            <Radio className="w-3 h-3 text-agri animate-pulse" />
            Pilot: TN & MH
          </span>
          <Link to="/" className="text-[11px] font-medium text-slate-muted hover:text-agri flex items-center gap-0.5">
            Portal <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        {/* Navigation Sections */}
        <nav className="p-4 space-y-5 overflow-y-auto max-h-[calc(100vh-220px)]">
          {navSections.map((section, idx) => (
            <div key={idx}>
              <h5 className="px-3 mb-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-muted">
                {section.label}
              </h5>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => onClose && onClose()}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-forest text-lime-accent shadow-sm"
                          : "text-charcoal hover:bg-ivory hover:text-forest"
                      }`
                    }
                  >
                    <div className="flex items-center gap-2.5">
                      <item.icon className="w-4 h-4 flex-shrink-0" />
                      <span>{item.name}</span>
                    </div>
                    {item.badge && (
                      <Badge variant={item.badgeVariant || "default"} size="xs">
                        {item.badge}
                      </Badge>
                    )}
                  </NavLink>
                ))}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* User Status Footer */}
      <div className="p-4 border-t border-slate-100 bg-ivory/40">
        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-border">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-agri/15 text-forest flex items-center justify-center font-bold text-xs">
              {currentUser?.name ? currentUser.name.charAt(0) : "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-charcoal truncate">{currentUser?.name || "Demo User"}</p>
              <p className="text-[10px] text-slate-muted truncate">{currentUser?.role || "Farmer"}</p>
            </div>
          </div>
          <Badge variant="lime" size="xs">Demo</Badge>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-30">
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 left-0 z-50 shadow-2xl animate-in slide-in-from-left duration-200">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
