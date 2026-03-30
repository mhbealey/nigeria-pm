"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatNaira } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  ClipboardCheck,
  Package,
  ArrowUpRight,
  Calendar,
  FileCheck,
  Users,
  AlertTriangle,
  CheckCircle2,
  DollarSign,
  Building2,
  Download,
  FileText,
  BarChart3,
  Shield,
  MapPin,
  Star,
  Clock,
  Trophy,
  Layers,
  Activity,
  Filter,
} from "lucide-react";

// --- Mock Data ---

const revenueExpenditureData = [
  { month: "Apr 25", revenue: 18500000, expenditure: 14200000 },
  { month: "May 25", revenue: 19200000, expenditure: 15800000 },
  { month: "Jun 25", revenue: 17800000, expenditure: 16100000 },
  { month: "Jul 25", revenue: 16400000, expenditure: 15300000 },
  { month: "Aug 25", revenue: 18900000, expenditure: 14700000 },
  { month: "Sep 25", revenue: 20100000, expenditure: 15900000 },
  { month: "Oct 25", revenue: 21500000, expenditure: 16800000 },
  { month: "Nov 25", revenue: 22800000, expenditure: 17200000 },
  { month: "Dec 25", revenue: 19600000, expenditure: 18100000 },
  { month: "Jan 26", revenue: 21200000, expenditure: 16400000 },
  { month: "Feb 26", revenue: 23400000, expenditure: 17800000 },
  { month: "Mar 26", revenue: 24500000, expenditure: 18900000 },
];

const materialsCostData = [
  { month: "Apr 25", cement: 4800, steel: 320000, sand: 18000, blocks: 280, granite: 22000 },
  { month: "May 25", cement: 4900, steel: 325000, sand: 18500, blocks: 285, granite: 22500 },
  { month: "Jun 25", cement: 5100, steel: 340000, sand: 19000, blocks: 290, granite: 23000 },
  { month: "Jul 25", cement: 5400, steel: 355000, sand: 19200, blocks: 295, granite: 23500 },
  { month: "Aug 25", cement: 5200, steel: 348000, sand: 19100, blocks: 292, granite: 23200 },
  { month: "Sep 25", cement: 5300, steel: 360000, sand: 19500, blocks: 298, granite: 24000 },
  { month: "Oct 25", cement: 5500, steel: 372000, sand: 20000, blocks: 305, granite: 24500 },
  { month: "Nov 25", cement: 5800, steel: 385000, sand: 20500, blocks: 310, granite: 25000 },
  { month: "Dec 25", cement: 6000, steel: 398000, sand: 21000, blocks: 318, granite: 25800 },
  { month: "Jan 26", cement: 5900, steel: 390000, sand: 20800, blocks: 315, granite: 25500 },
  { month: "Feb 26", cement: 6200, steel: 405000, sand: 21500, blocks: 322, granite: 26200 },
  { month: "Mar 26", cement: 6500, steel: 418000, sand: 22000, blocks: 330, granite: 27000 },
];

const pipelineStages = [
  { stage: "Planning", count: 8, color: "bg-blue-500", percentage: 100 },
  { stage: "Foundation", count: 6, color: "bg-indigo-500", percentage: 85 },
  { stage: "Structure", count: 12, color: "bg-violet-500", percentage: 70 },
  { stage: "MEP", count: 8, color: "bg-purple-500", percentage: 55 },
  { stage: "Finishing", count: 5, color: "bg-fuchsia-500", percentage: 40 },
  { stage: "Handover", count: 3, color: "bg-pink-500", percentage: 25 },
];

const topContractors = [
  { name: "Bolarinwa & Sons Construction", onTime: 98, projects: 12, rating: 4.9 },
  { name: "Adekunle Building Works", onTime: 96, projects: 8, rating: 4.8 },
  { name: "ChiChi Engineering Ltd", onTime: 94, projects: 15, rating: 4.7 },
  { name: "Okonkwo Structures Nig Ltd", onTime: 92, projects: 10, rating: 4.6 },
  { name: "Lagos Premier Builders", onTime: 90, projects: 7, rating: 4.5 },
];

const topArtisans = [
  { name: "Musa Ibrahim", trade: "Masonry", rating: 4.95, jobs: 34 },
  { name: "Chidi Okafor", trade: "Electrical", rating: 4.9, jobs: 28 },
  { name: "Yusuf Abdullahi", trade: "Plumbing", rating: 4.85, jobs: 31 },
  { name: "Emeka Nwosu", trade: "Tiling", rating: 4.8, jobs: 22 },
  { name: "Femi Adeyemi", trade: "Painting", rating: 4.75, jobs: 26 },
];

const costEfficientEstates = [
  { name: "Lekki Pearl Estate", budget: 850000000, actual: 790000000, variance: -7.1 },
  { name: "Ajah Sunrise Gardens", budget: 420000000, actual: 398000000, variance: -5.2 },
  { name: "Ikoyi Crescent Villas", budget: 1200000000, actual: 1150000000, variance: -4.2 },
  { name: "Victoria Island Towers", budget: 2100000000, actual: 2040000000, variance: -2.9 },
  { name: "Abuja Citadel Estate", budget: 680000000, actual: 665000000, variance: -2.2 },
];

const fastestPermits = [
  { name: "Ikoyi Crescent Villas", days: 12, type: "Building Permit" },
  { name: "Lekki Pearl Estate", days: 15, type: "Environmental Impact" },
  { name: "Ajah Sunrise Gardens", days: 18, type: "Building Permit" },
  { name: "Victoria Island Towers", days: 21, type: "Fire Safety" },
  { name: "Abuja Citadel Estate", days: 24, type: "Building Permit" },
];

const riskRegister = [
  {
    id: "RSK-001",
    description: "Cement price increase expected (Dangote announced)",
    severity: "High",
    category: "Materials",
    impact: "15-20% cost increase on cement-heavy phases",
    mitigation: "Pre-purchase bulk cement; negotiate fixed-price contracts",
    owner: "Procurement Lead",
  },
  {
    id: "RSK-002",
    description: "LASBCA policy change for Lekki permits",
    severity: "Medium",
    category: "Permits",
    impact: "2-4 week delays on Lekki Phase 1 & 2 projects",
    mitigation: "Engage regulatory consultant; file early applications",
    owner: "Compliance Officer",
  },
  {
    id: "RSK-003",
    description: "Rainy season delays expected May-July",
    severity: "High",
    category: "Construction",
    impact: "Foundation & earthwork activities halted",
    mitigation: "Accelerate foundation phase; prepare drainage systems",
    owner: "Project Managers",
  },
  {
    id: "RSK-004",
    description: "Steel shortage from import restrictions",
    severity: "Medium",
    category: "Materials",
    impact: "Structural steel delivery delays of 3-6 weeks",
    mitigation: "Source from local mills; maintain 4-week buffer stock",
    owner: "Procurement Lead",
  },
  {
    id: "RSK-005",
    description: "Labour shortage in Lagos Island",
    severity: "Low",
    category: "Workforce",
    impact: "Reduced workforce capacity by 10-15%",
    mitigation: "Recruit from mainland; partner with artisan cooperatives",
    owner: "HR Manager",
  },
];

const reportTemplates = [
  {
    name: "Weekly Project Summary",
    description: "Overview of all active projects with milestone updates and blockers",
    icon: FileText,
    lastGenerated: "Mar 23, 2026",
    frequency: "Weekly",
  },
  {
    name: "Monthly Financial Report",
    description: "Comprehensive P&L, cash flow, and budget variance analysis",
    icon: DollarSign,
    lastGenerated: "Mar 1, 2026",
    frequency: "Monthly",
  },
  {
    name: "Quarterly Investor Report",
    description: "Portfolio performance, ROI metrics, and strategic outlook",
    icon: BarChart3,
    lastGenerated: "Jan 5, 2026",
    frequency: "Quarterly",
  },
  {
    name: "Annual Portfolio Review",
    description: "Year-end summary with achievements, challenges, and projections",
    icon: Briefcase,
    lastGenerated: "Jan 15, 2026",
    frequency: "Annually",
  },
  {
    name: "Inspection Compliance Report",
    description: "Quality inspection results, defect rates, and compliance metrics",
    icon: ClipboardCheck,
    lastGenerated: "Mar 20, 2026",
    frequency: "Bi-weekly",
  },
  {
    name: "Material Cost Analysis",
    description: "Price trends, vendor comparisons, and procurement optimization",
    icon: Package,
    lastGenerated: "Mar 15, 2026",
    frequency: "Monthly",
  },
];

const geographicData = [
  { state: "Lagos", city: "Lekki", projects: 14, value: 4200000000, status: "Active" },
  { state: "Lagos", city: "Ikoyi", projects: 6, value: 3100000000, status: "Active" },
  { state: "Lagos", city: "Victoria Island", projects: 5, value: 2800000000, status: "Active" },
  { state: "Lagos", city: "Ajah", projects: 4, value: 1200000000, status: "Active" },
  { state: "Lagos", city: "Ikeja", projects: 3, value: 890000000, status: "Active" },
  { state: "Abuja FCT", city: "Maitama", projects: 4, value: 1800000000, status: "Active" },
  { state: "Abuja FCT", city: "Wuse", projects: 2, value: 650000000, status: "Active" },
  { state: "Rivers", city: "Port Harcourt", projects: 2, value: 480000000, status: "Active" },
  { state: "Ogun", city: "Abeokuta", projects: 1, value: 220000000, status: "Planning" },
  { state: "Oyo", city: "Ibadan", projects: 1, value: 180000000, status: "Planning" },
];

function getSeverityBadgeVariant(severity: string) {
  switch (severity) {
    case "High":
      return "destructive" as const;
    case "Medium":
      return "secondary" as const;
    case "Low":
      return "outline" as const;
    default:
      return "secondary" as const;
  }
}

function CustomRevenueTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-md">
        <p className="mb-1 text-sm font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.dataKey === "revenue" ? "#22c55e" : "#ef4444" }}>
            {entry.dataKey === "revenue" ? "Revenue" : "Expenditure"}: {formatNaira(entry.value)}
          </p>
        ))}
        {payload.length === 2 && (
          <p className="mt-1 border-t pt-1 text-sm font-medium text-muted-foreground">
            Margin: {formatNaira(payload[0].value - payload[1].value)}
          </p>
        )}
      </div>
    );
  }
  return null;
}

function CustomMaterialsTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-md">
        <p className="mb-1 text-sm font-medium">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.dataKey.charAt(0).toUpperCase() + entry.dataKey.slice(1)}: {formatNaira(entry.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("12m");

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Data-driven insights across your entire portfolio
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 Days</SelectItem>
              <SelectItem value="30d">Last 30 Days</SelectItem>
              <SelectItem value="3m">Last 3 Months</SelectItem>
              <SelectItem value="6m">Last 6 Months</SelectItem>
              <SelectItem value="12m">Last 12 Months</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Executive Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNaira(245000000)}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +12% MoM
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Activity className="h-3 w-3" />
              Across 5 states
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Materials Spent</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNaira(89000000)}</div>
            <div className="flex items-center gap-1 text-xs text-red-600">
              <TrendingUp className="h-3 w-3" />
              +8% vs budget
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inspections Passed</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156/164</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <CheckCircle2 className="h-3 w-3" />
              95.1% pass rate
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Artisan Placements</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +15% this quarter
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Permits Approved</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6/14</div>
            <div className="flex items-center gap-1 text-xs text-amber-600">
              <Clock className="h-3 w-3" />
              8 pending
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Revenue & Expenditure Chart + Project Pipeline */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Expenditure</CardTitle>
            <CardDescription>
              Monthly revenue vs expenditure trend over the last 12 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={revenueExpenditureData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="expenditureGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="month" className="text-xs" tick={{ fontSize: 12 }} />
                  <YAxis
                    className="text-xs"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `₦${(value / 1000000).toFixed(0)}M`}
                  />
                  <Tooltip content={<CustomRevenueTooltip />} />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#22c55e"
                    strokeWidth={2}
                    fill="url(#revenueGradient)"
                    name="Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenditure"
                    stroke="#ef4444"
                    strokeWidth={2}
                    fill="url(#expenditureGradient)"
                    name="Expenditure"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Project Pipeline Funnel */}
        <Card>
          <CardHeader>
            <CardTitle>Project Pipeline</CardTitle>
            <CardDescription>Projects at each construction stage</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              {pipelineStages.map((stage) => (
                <div key={stage.stage} className="space-y-1.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{stage.stage}</span>
                    <span className="tabular-nums text-muted-foreground">
                      {stage.count} projects
                    </span>
                  </div>
                  <div className="relative">
                    <div className="h-8 w-full overflow-hidden rounded-md bg-muted">
                      <div
                        className={`flex h-full items-center justify-center ${stage.color} transition-all`}
                        style={{ width: `${stage.percentage}%` }}
                      >
                        <span className="text-xs font-semibold text-white">{stage.count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Separator className="my-2" />
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>Total Active</span>
                <span className="tabular-nums">42 projects</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Materials Cost Tracker */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Materials Cost Tracker</CardTitle>
              <CardDescription>
                Price index trends for key construction materials (per unit/tonne)
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="gap-1 border-amber-300 bg-amber-50 text-amber-700">
                <AlertTriangle className="h-3 w-3" />
                Cement +35% YoY
              </Badge>
              <Badge variant="outline" className="gap-1 border-red-300 bg-red-50 text-red-700">
                <TrendingUp className="h-3 w-3" />
                Steel +31% YoY
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={materialsCostData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" tick={{ fontSize: 12 }} />
                <YAxis className="text-xs" tick={{ fontSize: 12 }} tickFormatter={(value) => `₦${value.toLocaleString()}`} />
                <Tooltip content={<CustomMaterialsTooltip />} />
                <Legend />
                <Line type="monotone" dataKey="cement" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3 }} name="Cement (per bag)" />
                <Line type="monotone" dataKey="blocks" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} name="Blocks (per unit)" />
                <Line type="monotone" dataKey="sand" stroke="#06b6d4" strokeWidth={2} dot={{ r: 3 }} name="Sand (per tonne)" />
                <Line type="monotone" dataKey="granite" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="Granite (per tonne)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Performing Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Tabs defaultValue="contractors">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-amber-500" />
                    Top Performers
                  </CardTitle>
                  <CardDescription>Highest-rated contractors and artisans</CardDescription>
                </div>
                <TabsList>
                  <TabsTrigger value="contractors">Contractors</TabsTrigger>
                  <TabsTrigger value="artisans">Artisans</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="contractors" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8">#</TableHead>
                      <TableHead>Contractor</TableHead>
                      <TableHead className="text-right">On-Time %</TableHead>
                      <TableHead className="text-right">Projects</TableHead>
                      <TableHead className="text-right">Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topContractors.map((c, i) => (
                      <TableRow key={c.name}>
                        <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
                        <TableCell className="font-medium">{c.name}</TableCell>
                        <TableCell className="text-right">
                          <Badge variant={c.onTime >= 95 ? "default" : "secondary"} className="tabular-nums">
                            {c.onTime}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{c.projects}</TableCell>
                        <TableCell className="text-right">
                          <span className="flex items-center justify-end gap-1 tabular-nums">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {c.rating}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="artisans" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-8">#</TableHead>
                      <TableHead>Artisan</TableHead>
                      <TableHead>Trade</TableHead>
                      <TableHead className="text-right">Jobs</TableHead>
                      <TableHead className="text-right">Rating</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topArtisans.map((a, i) => (
                      <TableRow key={a.name}>
                        <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
                        <TableCell className="font-medium">{a.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{a.trade}</Badge>
                        </TableCell>
                        <TableCell className="text-right tabular-nums">{a.jobs}</TableCell>
                        <TableCell className="text-right">
                          <span className="flex items-center justify-end gap-1 tabular-nums">
                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                            {a.rating}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>

        <Tabs defaultValue="estates">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="h-5 w-5 text-green-500" />
                    Efficiency Rankings
                  </CardTitle>
                  <CardDescription>Cost efficiency and permit speed</CardDescription>
                </div>
                <TabsList>
                  <TabsTrigger value="estates">Cost Efficient</TabsTrigger>
                  <TabsTrigger value="permits">Fast Permits</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            <CardContent>
              <TabsContent value="estates" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Estate</TableHead>
                      <TableHead className="text-right">Budget</TableHead>
                      <TableHead className="text-right">Actual</TableHead>
                      <TableHead className="text-right">Savings</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {costEfficientEstates.map((e, i) => (
                      <TableRow key={e.name}>
                        <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
                        <TableCell className="font-medium">{e.name}</TableCell>
                        <TableCell className="text-right tabular-nums text-muted-foreground">
                          {formatNaira(e.budget)}
                        </TableCell>
                        <TableCell className="text-right tabular-nums">
                          {formatNaira(e.actual)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Badge variant="default" className="tabular-nums bg-green-600">
                            {e.variance}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
              <TabsContent value="permits" className="mt-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>#</TableHead>
                      <TableHead>Project</TableHead>
                      <TableHead>Permit Type</TableHead>
                      <TableHead className="text-right">Days to Approve</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fastestPermits.map((p, i) => (
                      <TableRow key={p.name + p.type}>
                        <TableCell className="font-medium text-muted-foreground">{i + 1}</TableCell>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{p.type}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="flex items-center justify-end gap-1 tabular-nums">
                            <Clock className="h-3 w-3 text-muted-foreground" />
                            {p.days} days
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </CardContent>
          </Card>
        </Tabs>
      </div>

      {/* Risk Register */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-red-500" />
                Risk Register
              </CardTitle>
              <CardDescription>
                Active risks requiring monitoring and mitigation
              </CardDescription>
            </div>
            <Badge variant="outline" className="gap-1">
              {riskRegister.length} Active Risks
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[90px]">ID</TableHead>
                <TableHead>Risk Description</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Impact</TableHead>
                <TableHead>Mitigation</TableHead>
                <TableHead>Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {riskRegister.map((risk) => (
                <TableRow key={risk.id}>
                  <TableCell className="font-mono text-xs font-medium">{risk.id}</TableCell>
                  <TableCell className="max-w-[250px] font-medium">{risk.description}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityBadgeVariant(risk.severity)}>
                      {risk.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{risk.category}</Badge>
                  </TableCell>
                  <TableCell className="max-w-[200px] text-sm text-muted-foreground">
                    {risk.impact}
                  </TableCell>
                  <TableCell className="max-w-[200px] text-sm text-muted-foreground">
                    {risk.mitigation}
                  </TableCell>
                  <TableCell className="text-sm">{risk.owner}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Report Templates</h2>
            <p className="text-sm text-muted-foreground">
              Generate and download standardized reports
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {reportTemplates.map((report) => {
            const Icon = report.icon;
            return (
              <Card key={report.name} className="flex flex-col">
                <CardHeader className="flex-1">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <CardTitle className="text-base">{report.name}</CardTitle>
                      <CardDescription className="text-xs">
                        {report.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <Separator className="mb-3" />
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <p className="text-xs text-muted-foreground">Last generated</p>
                      <p className="text-xs font-medium">{report.lastGenerated}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {report.frequency}
                      </Badge>
                      <Button size="sm" className="h-8">
                        <Download className="mr-1.5 h-3.5 w-3.5" />
                        Generate
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Geographic Activity Heatmap */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                Geographic Activity
              </CardTitle>
              <CardDescription>
                Project distribution across Nigerian states and cities
              </CardDescription>
            </div>
            <div className="flex gap-2 text-sm">
              <Badge variant="outline" className="gap-1">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Active
              </Badge>
              <Badge variant="outline" className="gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-500" />
                Planning
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>State</TableHead>
                <TableHead>City / Area</TableHead>
                <TableHead className="text-right">Projects</TableHead>
                <TableHead className="text-right">Portfolio Value</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Activity Level</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {geographicData.map((row) => {
                const maxProjects = 14;
                const activityPercent = Math.round((row.projects / maxProjects) * 100);
                return (
                  <TableRow key={`${row.state}-${row.city}`}>
                    <TableCell className="font-medium">{row.state}</TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell className="text-right tabular-nums">{row.projects}</TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNaira(row.value)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={row.status === "Active" ? "default" : "secondary"}
                        className={row.status === "Active" ? "bg-green-600" : ""}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Progress value={activityPercent} className="h-2 w-20" />
                        <span className="w-8 text-right text-xs tabular-nums text-muted-foreground">
                          {activityPercent}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Separator className="my-4" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Total: {geographicData.reduce((a, b) => a + b.projects, 0)} projects across{" "}
              {new Set(geographicData.map((d) => d.state)).size} states
            </span>
            <span className="font-semibold">
              Portfolio Value: {formatNaira(geographicData.reduce((a, b) => a + b.value, 0))}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
