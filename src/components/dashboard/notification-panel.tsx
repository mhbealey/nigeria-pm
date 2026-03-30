"use client";

import * as React from "react";
import {
  Bell,
  X,
  CheckCheck,
  Shield,
  Package,
  ClipboardCheck,
  Building2,
  Wrench,
  FileText,
  AlertTriangle,
  DollarSign,
  Star,
  Calendar,
  TrendingDown,
  UserCheck,
  MapPin,
  Hammer,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type NotificationCategory =
  | "Escrow"
  | "Materials"
  | "Quality"
  | "Estates"
  | "Artisans"
  | "Permits"
  | "Defects";

interface Notification {
  id: string;
  title: string;
  description: string;
  category: NotificationCategory;
  timestamp: string;
  read: boolean;
  icon: React.ElementType;
}

const CATEGORY_CONFIG: Record<
  NotificationCategory,
  { color: string; dotColor: string; bgColor: string }
> = {
  Escrow: {
    color: "text-emerald-700",
    dotColor: "bg-emerald-500",
    bgColor: "bg-emerald-50",
  },
  Materials: {
    color: "text-amber-700",
    dotColor: "bg-amber-500",
    bgColor: "bg-amber-50",
  },
  Quality: {
    color: "text-blue-700",
    dotColor: "bg-blue-500",
    bgColor: "bg-blue-50",
  },
  Estates: {
    color: "text-purple-700",
    dotColor: "bg-purple-500",
    bgColor: "bg-purple-50",
  },
  Artisans: {
    color: "text-orange-700",
    dotColor: "bg-orange-500",
    bgColor: "bg-orange-50",
  },
  Permits: {
    color: "text-teal-700",
    dotColor: "bg-teal-500",
    bgColor: "bg-teal-50",
  },
  Defects: {
    color: "text-red-700",
    dotColor: "bg-red-500",
    bgColor: "bg-red-50",
  },
};

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "1",
    title: "Milestone 3 verified",
    description:
      "Milestone 3 verified for Lekki Phase 1 project. Escrow funds ready for release.",
    category: "Escrow",
    timestamp: "2 min ago",
    read: false,
    icon: Shield,
  },
  {
    id: "2",
    title: "Cement prices dropped",
    description:
      "Cement prices dropped 5% in Lagos. BUA Cement now ₦5,700 per bag at Alaba Market.",
    category: "Materials",
    timestamp: "1 hr ago",
    read: false,
    icon: TrendingDown,
  },
  {
    id: "3",
    title: "New inspection scheduled",
    description:
      "New inspection scheduled for Banana Island estate. QA team to arrive 9:00 AM Thursday.",
    category: "Quality",
    timestamp: "3 hrs ago",
    read: false,
    icon: ClipboardCheck,
  },
  {
    id: "4",
    title: "Payment released",
    description:
      "Payment of ₦2,500,000 released to Adebayo Construction for foundation work at Victoria Island.",
    category: "Escrow",
    timestamp: "5 hrs ago",
    read: false,
    icon: DollarSign,
  },
  {
    id: "5",
    title: "Artisan rated 5 stars",
    description:
      "Artisan Musa Ibrahim rated 5 stars for tiling work at Eko Atlantic City project.",
    category: "Artisans",
    timestamp: "yesterday",
    read: false,
    icon: Star,
  },
  {
    id: "6",
    title: "Permit approved",
    description:
      "Permit application LASBCA-2024-0847 approved! Construction can proceed at Ikoyi plot.",
    category: "Permits",
    timestamp: "yesterday",
    read: true,
    icon: FileText,
  },
  {
    id: "7",
    title: "Defect reported",
    description:
      "Defect reported: Roof leak at Unit 14, Royal Gardens Estate, Ajah.",
    category: "Defects",
    timestamp: "2 days ago",
    read: true,
    icon: AlertTriangle,
  },
  {
    id: "8",
    title: "Granite delivery confirmed",
    description:
      "20 tonnes of granite scheduled for delivery to Magodo site on Monday from Abeokuta quarry.",
    category: "Materials",
    timestamp: "2 days ago",
    read: true,
    icon: Package,
  },
  {
    id: "9",
    title: "Estate phase completed",
    description:
      "Phase 2 of Greenfield Estate, Lekki completed. 24 of 24 units handed over.",
    category: "Estates",
    timestamp: "3 days ago",
    read: true,
    icon: Building2,
  },
  {
    id: "10",
    title: "Plumber assigned",
    description:
      "Plumber Chukwuemeka Obi assigned to fix drainage issue at Parkview Estate.",
    category: "Artisans",
    timestamp: "3 days ago",
    read: true,
    icon: Wrench,
  },
  {
    id: "11",
    title: "Escrow dispute raised",
    description:
      "Dispute raised on ₦4,200,000 payment for roofing at Gbagada project. Awaiting mediation.",
    category: "Escrow",
    timestamp: "4 days ago",
    read: true,
    icon: Shield,
  },
  {
    id: "12",
    title: "Environmental permit pending",
    description:
      "Environmental Impact Assessment for Abuja Phase 3 submitted to NESREA. Awaiting approval.",
    category: "Permits",
    timestamp: "4 days ago",
    read: true,
    icon: FileText,
  },
  {
    id: "13",
    title: "Quality inspection passed",
    description:
      "Structural integrity test passed for Block C, Admiralty Homes, Lekki Phase 1.",
    category: "Quality",
    timestamp: "5 days ago",
    read: true,
    icon: ClipboardCheck,
  },
  {
    id: "14",
    title: "Crack detected in wall",
    description:
      "Hairline crack detected in load-bearing wall at Unit 7, Oceana Estate. Engineer notified.",
    category: "Defects",
    timestamp: "5 days ago",
    read: true,
    icon: AlertTriangle,
  },
  {
    id: "15",
    title: "New artisan onboarded",
    description:
      "Electrician Fatima Abdullahi onboarded. NEC certified. Available for Abuja projects.",
    category: "Artisans",
    timestamp: "6 days ago",
    read: true,
    icon: UserCheck,
  },
  {
    id: "16",
    title: "Iron rod prices rising",
    description:
      "12mm iron rod prices up 8% this week in Lagos. Consider bulk purchase from Ajaokuta Steel.",
    category: "Materials",
    timestamp: "1 week ago",
    read: true,
    icon: TrendingDown,
  },
  {
    id: "17",
    title: "Site inspection due",
    description:
      "Scheduled site inspection for Ikeja GRA duplex project due tomorrow at 10:00 AM.",
    category: "Quality",
    timestamp: "1 week ago",
    read: true,
    icon: Calendar,
  },
  {
    id: "18",
    title: "Land title verified",
    description:
      "C of O verification complete for Plot 45, Maitama District, Abuja. Title is clean.",
    category: "Estates",
    timestamp: "1 week ago",
    read: true,
    icon: MapPin,
  },
  {
    id: "19",
    title: "Milestone payment pending",
    description:
      "₦8,000,000 pending release for Block A completion at Emerald City, Sangotedo.",
    category: "Escrow",
    timestamp: "1 week ago",
    read: true,
    icon: DollarSign,
  },
  {
    id: "20",
    title: "Artisan contract renewed",
    description:
      "Mason Bello Garba contract renewed for 6 months on Kano housing project.",
    category: "Artisans",
    timestamp: "2 weeks ago",
    read: true,
    icon: Hammer,
  },
];

const ALL_CATEGORIES: NotificationCategory[] = [
  "Escrow",
  "Materials",
  "Quality",
  "Estates",
  "Artisans",
  "Permits",
  "Defects",
];

interface NotificationPanelProps {
  open: boolean;
  onClose: () => void;
}

export function NotificationPanel({ open, onClose }: NotificationPanelProps) {
  const [notifications, setNotifications] =
    React.useState<Notification[]>(MOCK_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = React.useState<
    NotificationCategory | "All"
  >("All");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications =
    activeFilter === "All"
      ? notifications
      : notifications.filter((n) => n.category === activeFilter);

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-emerald-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Notifications
            </h2>
            {unreadCount > 0 && (
              <Badge variant="default" className="text-xs">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Actions bar */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleMarkAllRead}
            disabled={unreadCount === 0}
            className="text-emerald-600 hover:text-emerald-700"
          >
            <CheckCheck className="mr-1.5 h-4 w-4" />
            Mark all read
          </Button>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Filter className="h-3.5 w-3.5" />
            <span>{filteredNotifications.length} items</span>
          </div>
        </div>

        {/* Category filters */}
        <div className="flex gap-1.5 overflow-x-auto px-6 py-3 scrollbar-none">
          <Button
            variant={activeFilter === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("All")}
            className="shrink-0"
          >
            All
          </Button>
          {ALL_CATEGORIES.map((category) => {
            const count = notifications.filter(
              (n) => n.category === category
            ).length;
            return (
              <Button
                key={category}
                variant={activeFilter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(category)}
                className="shrink-0"
              >
                {category}
                <span className="ml-1 text-xs opacity-70">{count}</span>
              </Button>
            );
          })}
        </div>

        <Separator />

        {/* Notification list */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
              <Bell className="mb-3 h-10 w-10 text-gray-300" />
              <p className="text-sm font-medium text-gray-500">
                No notifications
              </p>
              <p className="mt-1 text-xs text-gray-400">
                Nothing to see in this category yet.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => {
                const config = CATEGORY_CONFIG[notification.category];
                const IconComp = notification.icon;

                return (
                  <button
                    key={notification.id}
                    onClick={() => handleMarkRead(notification.id)}
                    className={cn(
                      "flex w-full gap-3.5 px-6 py-4 text-left transition-colors hover:bg-gray-50",
                      !notification.read && "bg-emerald-50/40"
                    )}
                  >
                    {/* Icon */}
                    <div
                      className={cn(
                        "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
                        config.bgColor
                      )}
                    >
                      <IconComp
                        className={cn("h-4.5 w-4.5", config.color)}
                      />
                    </div>

                    {/* Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p
                          className={cn(
                            "text-sm leading-snug",
                            notification.read
                              ? "font-normal text-gray-700"
                              : "font-semibold text-gray-900"
                          )}
                        >
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span
                            className={cn(
                              "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                              config.dotColor
                            )}
                          />
                        )}
                      </div>
                      <p className="mt-0.5 text-xs leading-relaxed text-gray-500">
                        {notification.description}
                      </p>
                      <div className="mt-1.5 flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={cn("text-[10px] px-1.5 py-0", config.color)}
                        >
                          {notification.category}
                        </Badge>
                        <span className="text-[11px] text-gray-400">
                          {notification.timestamp}
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-3">
          <Button variant="ghost" size="sm" className="w-full text-emerald-600">
            View all notifications
          </Button>
        </div>
      </div>
    </>
  );
}
