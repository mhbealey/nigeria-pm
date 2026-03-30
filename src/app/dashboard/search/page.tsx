"use client";

import React, { useState } from "react";
import {
  Search,
  Filter,
  X,
  Building2,
  Users,
  Package,
  FileCheck,
  AlertTriangle,
  FileText,
  Clock,
  ArrowRight,
  MapPin,
  Shield,
  CheckCircle2,
  TrendingUp,
  Calendar,
  ChevronDown,
  Star,
  Briefcase,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ---------- Types ----------
interface SearchResult {
  id: string;
  type: "project" | "artisan" | "material" | "permit" | "defect" | "document";
  title: string;
  subtitle: string;
  meta: string;
  status?: string;
  statusVariant?: "default" | "secondary" | "destructive" | "success" | "warning" | "outline";
}

// ---------- Mock Data ----------
const searchCategories = [
  { key: "all", label: "All Results", icon: Search, count: 24 },
  { key: "projects", label: "Projects", icon: Building2, count: 5 },
  { key: "artisans", label: "Artisans", icon: Users, count: 6 },
  { key: "materials", label: "Materials", icon: Package, count: 4 },
  { key: "permits", label: "Permits", icon: FileCheck, count: 3 },
  { key: "defects", label: "Defects", icon: AlertTriangle, count: 3 },
  { key: "documents", label: "Documents", icon: FileText, count: 3 },
];

const quickFilters = [
  "Active Projects",
  "Pending Permits",
  "Open Defects",
  "Available Artisans",
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "This Week",
  "High Priority",
];

const suggestedSearches = [
  { query: "cement prices Lagos", icon: Package },
  { query: "available tilers", icon: Users },
  { query: "pending permits", icon: FileCheck },
  { query: "quality inspection reports", icon: Eye },
  { query: "milestone payment due", icon: Shield },
  { query: "iron rod 16mm price", icon: TrendingUp },
];

const recentSearches = [
  { query: "Lekki Phase 1", timestamp: "2 minutes ago" },
  { query: "Engr. Tunde Bakare", timestamp: "1 hour ago" },
  { query: "granite 3/4 inch", timestamp: "3 hours ago" },
  { query: "building permit renewal", timestamp: "Yesterday" },
  { query: "plumbing defects", timestamp: "Yesterday" },
  { query: "Banana Island villa", timestamp: "2 days ago" },
  { query: "cement bulk order", timestamp: "3 days ago" },
];

const moduleFilters = [
  "All Modules",
  "Escrow",
  "Artisans",
  "Materials",
  "Permits",
  "Quality",
  "Defects",
  "Estates",
  "Documents",
];

const statusFilters = [
  "All Statuses",
  "Active",
  "Pending",
  "Completed",
  "In Progress",
  "Disputed",
  "Expired",
];

const mockResults: SearchResult[] = [
  {
    id: "r1",
    type: "project",
    title: "4-Bedroom Duplex, Lekki Phase 1",
    subtitle: "Escrow Project - Emeka Nwosu Construction Ltd",
    meta: "N28,500,000 | 4 of 7 milestones completed",
    status: "Active",
    statusVariant: "success",
  },
  {
    id: "r2",
    type: "permit",
    title: "Building Plan Approval - Lekki Phase 1",
    subtitle: "Lagos State Physical Planning Permit Authority (LASPPPA)",
    meta: "Permit No: LASPPPA/2025/BPA/04521 | Issued: Sep 2025",
    status: "Approved",
    statusVariant: "success",
  },
  {
    id: "r3",
    type: "permit",
    title: "Environmental Impact Assessment - Lekki Phase 1",
    subtitle: "Lagos State Environmental Protection Agency (LASEPA)",
    meta: "Ref: LASEPA/EIA/2025/1187 | Submitted: Aug 2025",
    status: "Under Review",
    statusVariant: "warning",
  },
  {
    id: "r4",
    type: "permit",
    title: "Stage Certification - DPC Level, Lekki Phase 1",
    subtitle: "Lagos State Building Control Agency (LASBCA)",
    meta: "Inspection Date: Oct 12, 2025 | Engr. Tunde Bakare",
    status: "Certified",
    statusVariant: "success",
  },
  {
    id: "r5",
    type: "defect",
    title: "Hairline Cracks on Ground Floor Wall - Lekki Phase 1",
    subtitle: "Structural - Block Work | Reported by: Engr. Tunde Bakare",
    meta: "Severity: Medium | Detected during Stage 3 inspection",
    status: "Open",
    statusVariant: "destructive",
  },
  {
    id: "r6",
    type: "defect",
    title: "Improper Reinforcement Spacing - Lekki Phase 1",
    subtitle: "Structural - Foundation | Reported by: QA Team",
    meta: "Severity: High | Corrective action completed",
    status: "Resolved",
    statusVariant: "success",
  },
  {
    id: "r7",
    type: "defect",
    title: "Plumbing Rough-in Misalignment - Lekki Phase 1",
    subtitle: "MEP - Plumbing | Reported by: Site Supervisor",
    meta: "Severity: Low | Awaiting contractor response",
    status: "In Progress",
    statusVariant: "warning",
  },
  {
    id: "r8",
    type: "defect",
    title: "Waterproofing Membrane Damage - Lekki Phase 1",
    subtitle: "Waterproofing - Bathroom | Reported by: QA Inspector",
    meta: "Severity: Medium | Scheduled for re-inspection",
    status: "Open",
    statusVariant: "destructive",
  },
  {
    id: "r9",
    type: "defect",
    title: "Electrical Conduit Routing Error - Lekki Phase 1",
    subtitle: "MEP - Electrical | Reported by: Engr. Tunde Bakare",
    meta: "Severity: Medium | Contractor notified",
    status: "Open",
    statusVariant: "warning",
  },
  {
    id: "r10",
    type: "project",
    title: "Inspection Report - Stage 3 Block Work to Lintel",
    subtitle: "Quality Inspection | Lekki Phase 1 Project",
    meta: "Score: 87/100 | Inspector: Engr. Tunde Bakare | Dec 20, 2025",
    status: "Passed",
    statusVariant: "success",
  },
  {
    id: "r11",
    type: "project",
    title: "Inspection Report - Stage 4 Decking",
    subtitle: "Quality Inspection | Lekki Phase 1 Project",
    meta: "Score: Pending | Scheduled: Feb 15, 2026",
    status: "Scheduled",
    statusVariant: "secondary",
  },
  {
    id: "r12",
    type: "artisan",
    title: "Adebayo Ogundimu - Master Tiler",
    subtitle: "Lekki, Lagos | 12 years experience | 4.8 rating",
    meta: "Verified | Previously worked on Lekki Phase 1 projects",
    status: "Available",
    statusVariant: "success",
  },
  {
    id: "r13",
    type: "material",
    title: "Dangote Cement (50kg) - Lekki Suppliers",
    subtitle: "3 vendors available near Lekki Phase 1",
    meta: "Price range: N5,800 - N6,200 per bag | Last updated: Today",
    status: "In Stock",
    statusVariant: "success",
  },
  {
    id: "r14",
    type: "document",
    title: "Architectural Drawing - Lekki Phase 1 Duplex",
    subtitle: "Uploaded by: Arc. Ngozi Eze | 14 pages",
    meta: "Version 3.2 | Last modified: Nov 2025",
    status: "Current",
    statusVariant: "default",
  },
];

const typeIcons: Record<SearchResult["type"], React.ElementType> = {
  project: Building2,
  artisan: Users,
  material: Package,
  permit: FileCheck,
  defect: AlertTriangle,
  document: FileText,
};

const typeColors: Record<SearchResult["type"], string> = {
  project: "bg-blue-50 text-blue-600",
  artisan: "bg-purple-50 text-purple-600",
  material: "bg-amber-50 text-amber-600",
  permit: "bg-emerald-50 text-emerald-600",
  defect: "bg-red-50 text-red-600",
  document: "bg-gray-50 text-gray-600",
};

const typeLabels: Record<SearchResult["type"], string> = {
  project: "Project",
  artisan: "Artisan",
  material: "Material",
  permit: "Permit",
  defect: "Defect",
  document: "Document",
};

// ---------- Component ----------
export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("Lekki Phase 1");
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedModule, setSelectedModule] = useState("All Modules");
  const [selectedStatus, setSelectedStatus] = useState("All Statuses");
  const [selectedDateRange, setSelectedDateRange] = useState("All Time");
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const hasQuery = searchQuery.trim().length > 0;

  const filteredResults = mockResults.filter((result) => {
    if (activeCategory === "all") return true;
    if (activeCategory === "projects") return result.type === "project";
    if (activeCategory === "artisans") return result.type === "artisan";
    if (activeCategory === "materials") return result.type === "material";
    if (activeCategory === "permits") return result.type === "permit";
    if (activeCategory === "defects") return result.type === "defect";
    if (activeCategory === "documents") return result.type === "document";
    return true;
  });

  const toggleQuickFilter = (filter: string) => {
    setActiveQuickFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  const clearAllFilters = () => {
    setActiveQuickFilters([]);
    setSelectedModule("All Modules");
    setSelectedStatus("All Statuses");
    setSelectedDateRange("All Time");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Search</h1>
        <p className="mt-1 text-gray-500">
          Search across all projects, artisans, materials, permits, and more
        </p>
      </div>

      {/* Search Input */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search projects, artisans, materials, permits, defects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-14 pl-12 pr-24 text-lg border-2 border-gray-200 focus-visible:ring-emerald-600"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>

          {/* Filter Toggle */}
          <div className="mt-4 flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filters
              <ChevronDown
                className={`h-4 w-4 ml-1 transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </Button>
            {(activeQuickFilters.length > 0 ||
              selectedModule !== "All Modules" ||
              selectedStatus !== "All Statuses") && (
              <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                <X className="h-4 w-4 mr-1" />
                Clear all filters
              </Button>
            )}
          </div>

          {/* Expanded Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Module
                </label>
                <select
                  value={selectedModule}
                  onChange={(e) => setSelectedModule(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {moduleFilters.map((mod) => (
                    <option key={mod} value={mod}>
                      {mod}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {statusFilters.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Date Range
                </label>
                <select
                  value={selectedDateRange}
                  onChange={(e) => setSelectedDateRange(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option>All Time</option>
                  <option>Today</option>
                  <option>This Week</option>
                  <option>This Month</option>
                  <option>Last 3 Months</option>
                  <option>Last 6 Months</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>
          )}

          {/* Quick Filter Pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {quickFilters.map((filter) => (
              <button
                key={filter}
                onClick={() => toggleQuickFilter(filter)}
                className={`inline-flex items-center rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                  activeQuickFilters.includes(filter)
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {filter}
                {activeQuickFilters.includes(filter) && (
                  <X className="ml-1.5 h-3 w-3" />
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {/* Sidebar */}
        <div className="space-y-6 lg:col-span-1">
          {/* Search Categories */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Categories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {searchCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setActiveCategory(cat.key)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                      activeCategory === cat.key
                        ? "bg-emerald-50 text-emerald-700 font-medium"
                        : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {cat.label}
                    </span>
                    <Badge
                      variant={
                        activeCategory === cat.key ? "default" : "secondary"
                      }
                      className="text-xs"
                    >
                      {cat.count}
                    </Badge>
                  </button>
                );
              })}
            </CardContent>
          </Card>

          {/* Recent Searches */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Recent Searches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {recentSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearchQuery(item.query)}
                  className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
                >
                  <Clock className="h-3.5 w-3.5 shrink-0 text-gray-400" />
                  <span className="flex-1 truncate text-left">
                    {item.query}
                  </span>
                  <span className="shrink-0 text-xs text-gray-400">
                    {item.timestamp}
                  </span>
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Suggested Searches */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Suggested Searches</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              {suggestedSearches.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <button
                    key={idx}
                    onClick={() => setSearchQuery(item.query)}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-gray-600 transition-colors hover:bg-gray-50"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    <span className="flex-1 truncate text-left">
                      {item.query}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 shrink-0 text-gray-300" />
                  </button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* Main Results Area */}
        <div className="space-y-4 lg:col-span-3">
          {hasQuery ? (
            <>
              {/* Results Header */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  Showing{" "}
                  <span className="font-semibold text-gray-900">
                    {filteredResults.length}
                  </span>{" "}
                  results for{" "}
                  <span className="font-semibold text-gray-900">
                    &ldquo;{searchQuery}&rdquo;
                  </span>
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select className="rounded-md border border-gray-300 bg-white px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-600">
                    <option>Relevance</option>
                    <option>Newest First</option>
                    <option>Oldest First</option>
                    <option>Name A-Z</option>
                  </select>
                </div>
              </div>

              {/* Result Summary Cards */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                {[
                  { label: "Escrow Project", count: 1, icon: Shield, color: "text-blue-600 bg-blue-50" },
                  { label: "Permits", count: 3, icon: FileCheck, color: "text-emerald-600 bg-emerald-50" },
                  { label: "Inspections", count: 2, icon: CheckCircle2, color: "text-purple-600 bg-purple-50" },
                  { label: "Defects", count: 5, icon: AlertTriangle, color: "text-red-600 bg-red-50" },
                  { label: "Artisans", count: 1, icon: Users, color: "text-amber-600 bg-amber-50" },
                  { label: "Documents", count: 2, icon: FileText, color: "text-gray-600 bg-gray-100" },
                ].map((summary) => {
                  const SIcon = summary.icon;
                  return (
                    <Card key={summary.label} className="cursor-pointer hover:shadow-md transition-shadow">
                      <CardContent className="flex flex-col items-center p-4 text-center">
                        <div className={`rounded-full p-2 ${summary.color}`}>
                          <SIcon className="h-4 w-4" />
                        </div>
                        <p className="mt-2 text-xl font-bold text-gray-900">{summary.count}</p>
                        <p className="text-xs text-gray-500">{summary.label}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <Separator />

              {/* Search Results List */}
              <div className="space-y-3">
                {filteredResults.map((result) => {
                  const Icon = typeIcons[result.type];
                  return (
                    <Card
                      key={result.id}
                      className="cursor-pointer transition-all hover:shadow-md hover:border-emerald-200"
                    >
                      <CardContent className="flex items-start gap-4 p-4">
                        <div
                          className={`mt-0.5 rounded-lg p-2.5 ${typeColors[result.type]}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <h3 className="font-semibold text-gray-900 truncate">
                                  {result.title}
                                </h3>
                                <Badge variant="outline" className="shrink-0 text-xs">
                                  {typeLabels[result.type]}
                                </Badge>
                              </div>
                              <p className="mt-0.5 text-sm text-gray-500 truncate">
                                {result.subtitle}
                              </p>
                              <p className="mt-1 text-xs text-gray-400">
                                {result.meta}
                              </p>
                            </div>
                            {result.status && (
                              <Badge
                                variant={result.statusVariant}
                                className="shrink-0"
                              >
                                {result.status}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" className="shrink-0">
                          <ArrowRight className="h-4 w-4" />
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between pt-4">
                <p className="text-sm text-gray-500">
                  Page 1 of 1
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Next
                  </Button>
                </div>
              </div>
            </>
          ) : (
            /* Empty State - No Query */
            <Card>
              <CardContent className="flex flex-col items-center py-16">
                <div className="rounded-full bg-gray-100 p-6">
                  <Search className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Search across BuildNG
                </h3>
                <p className="mt-1 max-w-md text-center text-sm text-gray-500">
                  Find projects, artisans, materials, permits, defects, and
                  documents. Use filters to narrow down your search results.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {suggestedSearches.slice(0, 4).map((item, idx) => (
                    <Button
                      key={idx}
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchQuery(item.query)}
                    >
                      <item.icon className="h-3.5 w-3.5 mr-1" />
                      {item.query}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
