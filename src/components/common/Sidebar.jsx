import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useTranslation } from "../../i18n/translations";
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
  X
} from "lucide-react";
import { Badge } from "./Badge";

export function Sidebar({ isOpen, onClose }) {
  const { unreadNotifCount, recommendations, risks, currentUser, preferredLanguage } = useApp();
  const { tNav } = useTranslation(preferredLanguage);

  const criticalRecCount = recommendations.filter(r => r.status === "New" && (r.priority === "High" || r.priority === "Critical")).length;
  const activeRiskCount = risks.filter(r => r.status === "Active").length;

  const navSections = [
    {
      label: "Overview",
      items: [
        { name: tNav("dashboard"), path: "/dashboard", icon: LayoutDashboard }
      ]
    },
    {
      label: "Sense",
      items: [
        { name: tNav("farmManagement"), path: "/farms", icon: Sprout },
        { name: tNav("fieldMonitoring"), path: "/fields", icon: Grid3X3 },
        { name: tNav("sensorManagement"), path: "/sensors", icon: Cpu }
      ]
    },
    {
      label: "Decide",
      items: [
        {
          name: tNav("agriculturalIntelligence"),
          path: "/intelligence",
          icon: BrainCircuit,
          badge: criticalRecCount > 0 ? criticalRecCount : null,
          badgeVariant: "danger"
        },
        { name: tNav("irrigationAdvisory"), path: "/irrigation", icon: Droplets },
        { name: tNav("cropRecommendation"), path: "/crop-recommendations", icon: BookOpen },
        {
          name: tNav("riskMonitoring"),
          path: "/risks",
          icon: AlertTriangle,
          badge: activeRiskCount > 0 ? activeRiskCount : null,
          badgeVariant: "warning"
        }
      ]
    },
    {
      label: "Records",
      items: [
        { name: tNav("digitalFarmProfile"), path: "/digital-profiles", icon: FileCheck2 },
        { name: tNav("consentManagement"), path: "/consent", icon: ShieldCheck },
        { name: tNav("financeReadiness"), path: "/finance-readiness", icon: Landmark },
        { name: tNav("fpoManagement"), path: "/fpo-management", icon: Users }
      ]
    },
    {
      label: "System",
      items: [
        { name: tNav("analytics"), path: "/analytics", icon: BarChart3 },
        {
          name: tNav("notifications"),
          path: "/notifications",
          icon: Bell,
          badge: unreadNotifCount > 0 ? unreadNotifCount : null,
          badgeVariant: "agri"
        },
        { name: tNav("settings"), path: "/settings", icon: Settings }
      ]
    }
  ];

  const content = (
    <div className="h-full flex flex-col justify-between bg-white border-r border-slate-border w-64 lg:w-72">
      <div>
        <div className="px-5 py-4 flex items-center justify-between border-b border-slate-border">
          <Link to="/" className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="" className="w-8 h-8" />
            <div>
              <span className="text-[15px] font-semibold tracking-wide text-forest block leading-none">
                AGRINOVA
              </span>
              <span className="text-[11px] text-slate-muted">
                TN & MH pilots
              </span>
            </div>
          </Link>
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden p-1.5 rounded-md text-slate-muted hover:text-charcoal hover:bg-ivory"
              aria-label="Close sidebar"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <nav className="p-3 space-y-5 overflow-y-auto max-h-[calc(100vh-180px)]">
          {navSections.map((section, idx) => (
            <div key={idx}>
              <h5 className="px-3 mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-muted">
                {section.label}
              </h5>
              <div className="space-y-0.5">
                {section.items.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => onClose && onClose()}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium ${
                        isActive
                          ? "bg-forest text-cream"
                          : "text-charcoal hover:bg-ivory"
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

      <div className="p-3 border-t border-slate-border">
        <div className="flex items-center justify-between px-2 py-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-md bg-ivory text-forest flex items-center justify-center font-medium text-xs">
              {currentUser?.name ? currentUser.name.charAt(0) : "A"}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-medium text-charcoal truncate">{currentUser?.name || "Demo user"}</p>
              <p className="text-[10px] text-slate-muted truncate">{currentUser?.role || "Farmer"}</p>
            </div>
          </div>
          <Badge variant="outline" size="xs">Demo</Badge>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden lg:block fixed inset-y-0 left-0 z-30">
        {content}
      </aside>

      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-charcoal/40"
            onClick={onClose}
          />
          <div className="fixed inset-y-0 left-0 z-50">
            {content}
          </div>
        </div>
      )}
    </>
  );
}
