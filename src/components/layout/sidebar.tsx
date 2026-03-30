"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  LayoutDashboard,
  Shield,
  Package,
  ClipboardCheck,
  Building2,
  Users,
  FileCheck,
  AlertTriangle,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
  ChevronDown,
} from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  count?: number;
}

const overviewItems: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, count: 0 },
];

const productItems: NavItem[] = [
  { label: "Escrow", href: "/dashboard/escrow", icon: Shield, count: 6 },
  { label: "Materials", href: "/dashboard/materials", icon: Package, count: 14 },
  { label: "Quality", href: "/dashboard/quality", icon: ClipboardCheck, count: 8 },
  { label: "Estates", href: "/dashboard/estates", icon: Building2, count: 3 },
  { label: "Artisans", href: "/dashboard/artisans", icon: Users, count: 22 },
  { label: "Permits", href: "/dashboard/permits", icon: FileCheck, count: 5 },
  { label: "Defects", href: "/dashboard/defects", icon: AlertTriangle, count: 11 },
];

const accountItems: NavItem[] = [
  { label: "Settings", href: "/dashboard/settings", icon: Settings },
  { label: "Help", href: "/dashboard/help", icon: HelpCircle },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname.startsWith(href);
  };

  function renderNavItem(item: NavItem, expanded: boolean) {
    const active = isActive(item.href);
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => onClose()}
        className={cn(
          "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
          active
            ? "bg-emerald-50 text-emerald-700 shadow-sm"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        )}
      >
        <item.icon
          className={cn(
            "h-5 w-5 shrink-0 transition-colors",
            active
              ? "text-emerald-600"
              : "text-gray-400 group-hover:text-gray-600"
          )}
        />
        {expanded && (
          <>
            <span className="flex-1 truncate">{item.label}</span>
            {item.count !== undefined && item.count > 0 && (
              <span
                className={cn(
                  "ml-auto inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                  active
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-600"
                )}
              >
                {item.count}
              </span>
            )}
          </>
        )}
      </Link>
    );
  }

  function renderSection(label: string, items: NavItem[], expanded: boolean) {
    return (
      <div className="space-y-1">
        {expanded && (
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            {label}
          </p>
        )}
        {items.map((item) => renderNavItem(item, expanded))}
      </div>
    );
  }

  function renderSidebarContent(forceExpanded: boolean) {
    const expanded = forceExpanded || !collapsed;

    return (
      <div
        className={cn(
          "flex h-full flex-col border-r border-gray-200 bg-white transition-all duration-300",
          expanded ? "w-64" : "w-[72px]"
        )}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 shadow-sm">
              <Building2 className="h-5 w-5 text-white" />
            </div>
            {expanded && (
              <span className="text-xl font-bold tracking-tight text-gray-900">
                Build<span className="text-emerald-600">NG</span>
              </span>
            )}
          </Link>
          {!forceExpanded && (
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 lg:flex"
            >
              {collapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </button>
          )}
        </div>

        <Separator />

        {/* Navigation */}
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
          {renderSection("Overview", overviewItems, expanded)}
          {renderSection("Products", productItems, expanded)}
          {renderSection("Account", accountItems, expanded)}
        </nav>

        <Separator />

        {/* User section */}
        <div className="relative p-3">
          <button
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-gray-50",
              !expanded && "justify-center px-0"
            )}
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">DO</AvatarFallback>
            </Avatar>
            {expanded && (
              <>
                <div className="flex-1 truncate">
                  <p className="truncate text-sm font-medium text-gray-900">
                    Daniel Okonkwo
                  </p>
                  <p className="truncate text-xs text-gray-500">Admin</p>
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-400 transition-transform",
                    userMenuOpen && "rotate-180"
                  )}
                />
              </>
            )}
          </button>

          {userMenuOpen && (
            <div className="absolute bottom-full left-3 right-3 mb-1 rounded-lg border border-gray-200 bg-white py-1 shadow-lg">
              <Link
                href="/dashboard/settings"
                onClick={() => {
                  setUserMenuOpen(false);
                  onClose();
                }}
                className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
              >
                <Settings className="h-4 w-4" />
                Profile Settings
              </Link>
              <Separator />
              <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex">
        {renderSidebarContent(false)}
      </aside>

      {/* Mobile overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 transition-opacity"
            onClick={onClose}
          />
          <aside className="fixed inset-y-0 left-0 z-50">
            {renderSidebarContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}
