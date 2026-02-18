import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  AlertTriangle,
  ClipboardList,
  TrendingUp,
  MessageSquare,
  Building2,
  Database,
  Settings,
  ChefHat,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { cn } from "../ui/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const navItems = [
  { path: "/", icon: LayoutDashboard, labelKey: "nav.dashboard" },
  { path: "/alerts", icon: AlertTriangle, labelKey: "nav.alerts" },
  { path: "/actions", icon: ClipboardList, labelKey: "nav.actions" },
  { path: "/forecast", icon: TrendingUp, labelKey: "nav.forecast" },
  { path: "/chat", icon: MessageSquare, labelKey: "nav.chat" },
  { path: "/hq", icon: Building2, labelKey: "nav.hq" },
  { path: "/data", icon: Database, labelKey: "nav.data" },
  { path: "/settings", icon: Settings, labelKey: "nav.settings" },
];

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { t, dir } = useLanguage();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "h-full bg-card flex flex-col transition-all duration-300 shrink-0",
        dir === "rtl" ? "border-l border-border" : "border-r border-border",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className="h-16 flex items-center gap-3 px-4 border-b border-border shrink-0">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
          <ChefHat className="w-5 h-5 text-primary-foreground" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm truncate" style={{ fontWeight: 600 }}>
              RestaurantAI
            </p>
            <p className="text-xs text-muted-foreground truncate">
              Operations Platform
            </p>
          </div>
        )}
      </div>
      <nav className="flex-1 py-3 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive =
            location.pathname === item.path ||
            (item.path !== "/" && location.pathname.startsWith(item.path));
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span className="truncate">{t(item.labelKey)}</span>}
            </NavLink>
          );
        })}
      </nav>
      <div className="p-2 border-t border-border shrink-0">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-center py-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
        >
          {dir === "rtl" ? (
            collapsed ? (
              <ChevronLeft className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )
          ) : collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>
    </aside>
  );
}
