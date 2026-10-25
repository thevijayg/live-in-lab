import React, { useState } from "react";
import { useApp } from "../context/AppContext";
import { Link } from "react-router-dom";
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  AlertCircle,
  Filter,
  Check,
  Clock,
  ArrowRight
} from "lucide-react";
import { Badge } from "../components/common/Badge";

export function NotificationsPage() {
  const { notifications, markNotificationRead, unreadNotifCount } = useApp();
  const [filterType, setFilterType] = useState("");

  const filteredNotifs = notifications.filter(n => {
    if (!filterType) return true;
    return n.type.toLowerCase() === filterType.toLowerCase();
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-border shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-extrabold text-charcoal">
              Centralized Alert & Notification Center
            </h1>
            <Badge variant="lime">{unreadNotifCount} Unread</Badge>
          </div>
          <p className="text-xs sm:text-sm text-slate-muted mt-1">
            Real-time notifications for threshold anomalies, sensor telemetry dropouts, and priority agricultural advisories.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {["", "Critical", "Warning", "Success"].map(type => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`py-2 px-3.5 rounded-xl font-bold transition-all border ${
              filterType === type
                ? "bg-forest text-lime-accent border-forest shadow-sm"
                : "bg-white text-slate-muted border-slate-border hover:text-charcoal hover:bg-slate-50"
            }`}
          >
            {type === "" ? "All Alerts" : type}
          </button>
        ))}
      </div>

      {/* Notification Items List */}
      <div className="bg-white rounded-2xl border border-slate-border shadow-sm overflow-hidden divide-y divide-slate-100">
        {filteredNotifs.length === 0 ? (
          <div className="p-8 text-center text-slate-muted text-xs">
            No notifications match your active filter.
          </div>
        ) : (
          filteredNotifs.map((notif) => (
            <div
              key={notif.id}
              className={`p-4 sm:p-5 flex items-start gap-4 transition-colors ${
                !notif.read ? "bg-lime-soft/30" : "hover:bg-slate-50"
              }`}
            >
              <div className={`p-2.5 rounded-xl flex-shrink-0 ${
                notif.type === "Critical"
                  ? "bg-rose-100 text-danger"
                  : notif.type === "Warning"
                  ? "bg-amber-100 text-amber-warn"
                  : "bg-emerald-100 text-agri"
              }`}>
                {notif.type === "Critical" ? (
                  <AlertCircle className="w-5 h-5" />
                ) : notif.type === "Warning" ? (
                  <AlertTriangle className="w-5 h-5" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </div>

              <div className="flex-1 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-charcoal">{notif.title}</h4>
                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {new Date(notif.timestamp).toLocaleString([], { dateStyle: "short", timeStyle: "short" })}
                  </span>
                </div>
                <p className="text-slate-muted leading-relaxed">{notif.message}</p>
                <div className="pt-2 flex items-center gap-3">
                  {notif.link && (
                    <Link
                      to={notif.link}
                      className="text-forest font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Take Action</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  )}
                  {!notif.read && (
                    <button
                      onClick={() => markNotificationRead(notif.id)}
                      className="text-slate-500 hover:text-agri font-semibold"
                    >
                      Mark as Read
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
