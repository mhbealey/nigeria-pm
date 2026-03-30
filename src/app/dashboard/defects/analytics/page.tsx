"use client";

import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  AlertCircle,
  Shield,
  Building2,
  Users,
  Calendar,
  ChevronRight,
  ArrowLeft,
  Lightbulb,
  Target,
  RefreshCw,
  DollarSign,
  Wrench,
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
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { formatNaira } from "@/lib/utils";
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// ---------- Mock Data ----------
const overviewStats = {
  totalDefects: 247,
  openDefects: 38,
  inProgress: 24,
  resolved: 173,
  closed: 12,
  avgResolutionDays: 8.4,
  repeatRate: 6.2,
  warrantyClaimsThisMonth: 15,
};

const categoryData = [
  { name: "Roofing", value: 25, count: 62, color: "#ef4444" },
  { name: "Plumbing", value: 22, count: 54, color: "#3b82f6" },
  { name: "Electrical", value: 15, count: 37, color: "#f59e0b" },
  { name: "Structural", value: 12, count: 30, color: "#8b5cf6" },
  { name: "Finishing", value: 18, count: 44, color: "#10b981" },
  { name: "MEP", value: 8, count: 20, color: "#6366f1" },
];

const monthlyTrendData = [
  { month: "Oct 2025", reported: 32, resolved: 28 },
  { month: "Nov 2025", reported: 45, resolved: 38 },
  { month: "Dec 2025", reported: 28, resolved: 35 },
  { month: "Jan 2026", reported: 52, resolved: 42 },
  { month: "Feb 2026", reported: 48, resolved: 44 },
  { month: "Mar 2026", reported: 42, resolved: 36 },
];

const resolutionTimeData = [
  { category: "Roofing", avgDays: 12.5 },
  { category: "Plumbing", avgDays: 6.2 },
  { category: "Electrical", avgDays: 4.8 },
  { category: "Structural", avgDays: 18.3 },
  { category: "Finishing", avgDays: 5.1 },
  { category: "MEP", avgDays: 7.9 },
];

const estateComparisonData = [
  { estate: "Royal Gardens", defects: 68, resolved: 52, pending: 16 },
  { estate: "Emerald City", defects: 85, resolved: 61, pending: 24 },
  { estate: "Pinnacle Heights", defects: 52, resolved: 45, pending: 7 },
  { estate: "Sapphire Court", defects: 42, resolved: 35, pending: 7 },
];

const priorityDistribution = [
  { name: "Critical", value: 18, color: "#ef4444" },
  { name: "High", value: 32, color: "#f97316" },
  { name: "Medium", value: 35, color: "#eab308" },
  { name: "Low", value: 15, color: "#3b82f6" },
];

const patterns = [
  {
    id: 1,
    severity: "High",
    title: "Recurring Roof Leaks at Royal Gardens Estate",
    description:
      "3 units in Royal Gardens have reported roof leaks at the same junction point \u2014 potential systemic issue with roof-wall flashing installation across Block A.",
    affectedUnits: 3,
    estate: "Royal Gardens",
    recommendation:
      "Commission full roofing inspection of Block A. Consider engaging independent roofing consultant.",
  },
  {
    id: 2,
    severity: "Medium",
    title: "Elevated Plumbing Defects at Emerald City",
    description:
      "Plumbing defects in Emerald City are 40% higher than average across all estates. Concentrated in bathroom drainage and water heater connections.",
    affectedUnits: 12,
    estate: "Emerald City",
    recommendation:
      "Review plumbing contractor workmanship standards. Schedule batch inspection of all affected plumbing runs in Phase 2 units.",
  },
  {
    id: 3,
    severity: "Low",
    title: "Paint Peeling on External Walls - Sapphire Court",
    description:
      "5 units report paint peeling on external walls within 6 months of handover. Likely due to inadequate surface preparation before painting.",
    affectedUnits: 5,
    estate: "Sapphire Court",
    recommendation:
      "Engage painting contractor for warranty rectification. Specify proper surface prep for remaining units.",
  },
];

const contractorPerformance = [
  {
    name: "Adebayo Construction",
    specialty: "Roofing",
    totalDefects: 28,
    resolvedDefects: 23,
    avgResponseDays: 2.3,
    resolutionRate: 82,
    rating: 4.2,
  },
  {
    name: "Premier Plumbing Ltd",
    specialty: "Plumbing",
    totalDefects: 34,
    resolvedDefects: 26,
    avgResponseDays: 1.8,
    resolutionRate: 76,
    rating: 3.8,
  },
  {
    name: "Voltex Electrical",
    specialty: "Electrical",
    totalDefects: 18,
    resolvedDefects: 16,
    avgResponseDays: 1.5,
    resolutionRate: 89,
    rating: 4.5,
  },
  {
    name: "Zenith Interiors",
    specialty: "Finishing",
    totalDefects: 22,
    resolvedDefects: 19,
    avgResponseDays: 3.1,
    resolutionRate: 86,
    rating: 4.0,
  },
  {
    name: "Stronghold Engineering",
    specialty: "Structural",
    totalDefects: 15,
    resolvedDefects: 10,
    avgResponseDays: 4.2,
    resolutionRate: 67,
    rating: 3.5,
  },
  {
    name: "MEP Solutions Nigeria",
    specialty: "MEP",
    totalDefects: 12,
    resolvedDefects: 10,
    avgResponseDays: 2.0,
    resolutionRate: 83,
    rating: 4.1,
  },
];

const warrantyExpiring = [
  {
    estate: "Royal Gardens",
    items: [
      {
        type: "Roofing & Waterproofing",
        units: "Block A (Units 1-15)",
        expiryDate: "30 Apr 2026",
        daysRemaining: 31,
      },
      {
        type: "External Painting",
        units: "Block B (Units 16-30)",
        expiryDate: "15 May 2026",
        daysRemaining: 46,
      },
    ],
  },
  {
    estate: "Emerald City",
    items: [
      {
        type: "Plumbing (Phase 1)",
        units: "Units 1-20",
        expiryDate: "22 Apr 2026",
        daysRemaining: 23,
      },
      {
        type: "Electrical Installations",
        units: "Units 1-40",
        expiryDate: "10 Jun 2026",
        daysRemaining: 72,
      },
    ],
  },
  {
    estate: "Pinnacle Heights",
    items: [
      {
        type: "Structural Warranty",
        units: "All Units",
        expiryDate: "01 Jun 2026",
        daysRemaining: 63,
      },
    ],
  },
  {
    estate: "Sapphire Court",
    items: [
      {
        type: "MEP Systems",
        units: "Units 1-12",
        expiryDate: "18 May 2026",
        daysRemaining: 49,
      },
    ],
  },
];

const costAnalysis = {
  totalEstimatedCost: 12450000,
  coveredByWarranty: 9870000,
  outOfWarranty: 2580000,
  savedByWarranty: 9870000,
  avgCostPerDefect: 50405,
  costByCategory: [
    { category: "Structural", cost: 4200000 },
    { category: "Roofing", cost: 3100000 },
    { category: "Plumbing", cost: 2150000 },
    { category: "Electrical", cost: 1200000 },
    { category: "Finishing", cost: 980000 },
    { category: "MEP", cost: 820000 },
  ],
};

// ---------- Helpers ----------
const severityStyles: Record<string, string> = {
  High: "bg-red-100 text-red-700 border-red-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Low: "bg-blue-100 text-blue-700 border-blue-200",
};

function getResolutionRateColor(rate: number): string {
  if (rate >= 85) return "text-emerald-700";
  if (rate >= 70) return "text-amber-700";
  return "text-red-700";
}

function getDaysRemainingColor(days: number): string {
  if (days <= 30) return "text-red-700 bg-red-50";
  if (days <= 60) return "text-amber-700 bg-amber-50";
  return "text-emerald-700 bg-emerald-50";
}

// ---------- Component ----------
export default function DefectAnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("6m");

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        {/* ---------- Header ---------- */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <Button variant="ghost" size="sm" className="mb-1 -ml-2 gap-1.5 text-gray-500">
              <ArrowLeft className="h-4 w-4" />
              Back to Defects
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">
              Defect Analytics
            </h1>
            <p className="text-sm text-gray-500">
              Comprehensive defect tracking, pattern detection, and contractor
              performance insights
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Tabs
              value={selectedPeriod}
              onValueChange={setSelectedPeriod}
            >
              <TabsList>
                <TabsTrigger value="1m">1M</TabsTrigger>
                <TabsTrigger value="3m">3M</TabsTrigger>
                <TabsTrigger value="6m">6M</TabsTrigger>
                <TabsTrigger value="1y">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
            <Button variant="outline" size="sm">
              <RefreshCw className="mr-1.5 h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* ---------- Overview Stats ---------- */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Total Defects
                </p>
                <BarChart3 className="h-4 w-4 text-gray-400" />
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {overviewStats.totalDefects}
              </p>
              <p className="mt-1 text-xs text-gray-500">
                Across 4 estates
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Open
                </p>
                <AlertCircle className="h-4 w-4 text-red-400" />
              </div>
              <p className="mt-2 text-2xl font-bold text-red-600">
                {overviewStats.openDefects}
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs text-red-600">
                <TrendingUp className="h-3 w-3" />
                +5 this week
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Resolved
                </p>
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <p className="mt-2 text-2xl font-bold text-emerald-600">
                {overviewStats.resolved}
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                <TrendingUp className="h-3 w-3" />
                70% resolution rate
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Avg Resolution
                </p>
                <Clock className="h-4 w-4 text-blue-400" />
              </div>
              <p className="mt-2 text-2xl font-bold text-gray-900">
                {overviewStats.avgResolutionDays}
              </p>
              <p className="mt-1 text-xs text-gray-500">days average</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Repeat Rate
                </p>
                <RefreshCw className="h-4 w-4 text-amber-400" />
              </div>
              <p className="mt-2 text-2xl font-bold text-amber-600">
                {overviewStats.repeatRate}%
              </p>
              <div className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                <TrendingDown className="h-3 w-3" />
                -1.3% vs last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ---------- Charts Row 1 ---------- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Defects by Category - Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Defects by Category</CardTitle>
              <CardDescription>
                Distribution across all reported defects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4 sm:flex-row">
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Share"]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="w-full space-y-2 sm:w-48">
                  {categoryData.map((cat) => (
                    <div
                      key={cat.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: cat.color }}
                        />
                        <span className="text-gray-600">{cat.name}</span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {cat.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Monthly Trend - Area Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Defect Trend</CardTitle>
              <CardDescription>
                Reported vs resolved defects over the last 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={monthlyTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="reported"
                    name="Reported"
                    stroke="#ef4444"
                    fill="#fee2e2"
                    strokeWidth={2}
                  />
                  <Area
                    type="monotone"
                    dataKey="resolved"
                    name="Resolved"
                    stroke="#10b981"
                    fill="#d1fae5"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* ---------- Charts Row 2 ---------- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Resolution Time by Category - Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Resolution Time by Category
              </CardTitle>
              <CardDescription>
                Average days to resolve by defect category
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={resolutionTimeData} layout="vertical">
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    horizontal={false}
                  />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                    unit=" days"
                  />
                  <YAxis
                    type="category"
                    dataKey="category"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                    width={80}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `${value} days`,
                      "Avg. Resolution",
                    ]}
                  />
                  <Bar
                    dataKey="avgDays"
                    name="Avg. Days"
                    fill="#6366f1"
                    radius={[0, 4, 4, 0]}
                    barSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Defects by Estate - Bar Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Defects by Estate</CardTitle>
              <CardDescription>
                Comparison of defects across estates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={estateComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    dataKey="estate"
                    tick={{ fontSize: 11, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <YAxis
                    tick={{ fontSize: 12, fill: "#9ca3af" }}
                    tickLine={false}
                    axisLine={{ stroke: "#e5e7eb" }}
                  />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="resolved"
                    name="Resolved"
                    fill="#10b981"
                    stackId="a"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="pending"
                    name="Pending"
                    fill="#f59e0b"
                    stackId="a"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* ---------- Priority Distribution (Donut) ---------- */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Priority Distribution</CardTitle>
            <CardDescription>
              Current open defects broken down by priority level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center">
              <ResponsiveContainer width={280} height={220}>
                <PieChart>
                  <Pie
                    data={priorityDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={90}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {priorityDistribution.map((entry, index) => (
                      <Cell key={`priority-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => [`${value}%`, "Share"]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-4">
                {priorityDistribution.map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 p-3"
                  >
                    <div
                      className="h-10 w-10 rounded-full flex items-center justify-center text-sm font-bold text-white"
                      style={{ backgroundColor: p.color }}
                    >
                      {p.value}%
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {p.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {Math.round((overviewStats.openDefects * p.value) / 100)}{" "}
                        open defects
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ---------- Pattern Detection ---------- */}
        <Card className="border-amber-200 bg-amber-50/30">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-amber-600" />
              <CardTitle className="text-lg text-amber-800">
                Pattern Detection &amp; Insights
              </CardTitle>
            </div>
            <CardDescription className="text-amber-700">
              AI-powered analysis of recurring defects and quality trends
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {patterns.map((pattern) => (
              <div
                key={pattern.id}
                className="rounded-lg border border-amber-200 bg-white p-4 space-y-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge
                    variant="outline"
                    className={severityStyles[pattern.severity]}
                  >
                    {pattern.severity} Severity
                  </Badge>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {pattern.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600">{pattern.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Building2 className="h-3 w-3" />
                    {pattern.estate}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3 w-3" />
                    {pattern.affectedUnits} units affected
                  </span>
                </div>
                <div className="rounded-md bg-emerald-50 p-3">
                  <p className="flex items-start gap-1.5 text-sm text-emerald-800">
                    <Target className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                    <span>
                      <span className="font-medium">Recommendation:</span>{" "}
                      {pattern.recommendation}
                    </span>
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* ---------- Contractor Performance ---------- */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg">
                  Contractor Performance
                </CardTitle>
                <CardDescription>
                  Defect attribution and resolution metrics by contractor
                </CardDescription>
              </div>
              <Button variant="outline" size="sm">
                Export
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contractor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead className="text-center">Total Defects</TableHead>
                  <TableHead className="text-center">Resolved</TableHead>
                  <TableHead className="text-center">
                    Avg Response (days)
                  </TableHead>
                  <TableHead className="text-center">Resolution Rate</TableHead>
                  <TableHead className="text-center">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contractorPerformance.map((contractor) => (
                  <TableRow key={contractor.name}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                            {contractor.name
                              .split(" ")
                              .map((n) => n[0])
                              .slice(0, 2)
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-gray-900">
                          {contractor.name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="text-xs">
                        {contractor.specialty}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {contractor.totalDefects}
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {contractor.resolvedDefects}
                    </TableCell>
                    <TableCell className="text-center text-sm">
                      {contractor.avgResponseDays}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`text-sm font-semibold ${getResolutionRateColor(
                          contractor.resolutionRate
                        )}`}
                      >
                        {contractor.resolutionRate}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <span className="text-sm font-medium text-gray-900">
                          {contractor.rating}
                        </span>
                        <span className="text-amber-400">/5</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* ---------- Bottom Row ---------- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Warranty Expiry Calendar */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-amber-600" />
                <div>
                  <CardTitle className="text-lg">
                    Warranty Expiry Calendar
                  </CardTitle>
                  <CardDescription>
                    Warranties expiring in the next 90 days
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {warrantyExpiring.map((estate) => (
                <div key={estate.estate} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-900">
                      {estate.estate}
                    </h3>
                  </div>
                  <div className="space-y-2 pl-6">
                    {estate.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between rounded-lg border border-gray-100 p-3"
                      >
                        <div className="space-y-0.5">
                          <p className="text-sm font-medium text-gray-900">
                            {item.type}
                          </p>
                          <p className="text-xs text-gray-500">{item.units}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            {item.expiryDate}
                          </p>
                          <Badge
                            variant="outline"
                            className={`text-[10px] ${getDaysRemainingColor(
                              item.daysRemaining
                            )}`}
                          >
                            {item.daysRemaining} days remaining
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                  {estate !==
                    warrantyExpiring[warrantyExpiring.length - 1] && (
                    <Separator className="mt-2" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Cost Analysis */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-emerald-600" />
                <div>
                  <CardTitle className="text-lg">
                    Defect Repair Cost Analysis
                  </CardTitle>
                  <CardDescription>
                    Financial impact and warranty savings
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-5">
              {/* Summary Cards */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-gray-50 p-3 space-y-1">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
                    Total Estimated Cost
                  </p>
                  <p className="text-lg font-bold text-gray-900">
                    {formatNaira(costAnalysis.totalEstimatedCost)}
                  </p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-3 space-y-1">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-emerald-600">
                    Saved by Warranty
                  </p>
                  <p className="text-lg font-bold text-emerald-700">
                    {formatNaira(costAnalysis.savedByWarranty)}
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3 space-y-1">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-blue-600">
                    Covered by Warranty
                  </p>
                  <p className="text-lg font-bold text-blue-700">
                    {formatNaira(costAnalysis.coveredByWarranty)}
                  </p>
                </div>
                <div className="rounded-lg bg-red-50 p-3 space-y-1">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-red-600">
                    Out of Warranty
                  </p>
                  <p className="text-lg font-bold text-red-700">
                    {formatNaira(costAnalysis.outOfWarranty)}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Cost by Category */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900">
                  Cost by Category
                </p>
                {costAnalysis.costByCategory.map((item) => {
                  const percentage = Math.round(
                    (item.cost / costAnalysis.totalEstimatedCost) * 100
                  );
                  return (
                    <div key={item.category} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{item.category}</span>
                        <span className="font-medium text-gray-900">
                          {formatNaira(item.cost)}
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-emerald-500"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              <Separator />

              <div className="flex items-center justify-between rounded-lg bg-emerald-50 p-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-semibold text-emerald-800">
                      Warranty Enforcement Impact
                    </p>
                    <p className="text-xs text-emerald-600">
                      79.3% of total repair costs covered
                    </p>
                  </div>
                </div>
                <p className="text-lg font-bold text-emerald-700">
                  {formatNaira(costAnalysis.savedByWarranty)}
                </p>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Avg. Cost per Defect</span>
                <span className="font-semibold text-gray-900">
                  {formatNaira(costAnalysis.avgCostPerDefect)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
