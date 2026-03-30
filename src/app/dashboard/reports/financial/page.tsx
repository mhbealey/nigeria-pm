"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
  ReferenceLine,
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
  ArrowLeft,
  Download,
  FileSpreadsheet,
  FileText,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Wallet,
  Receipt,
  PiggyBank,
  Landmark,
  CircleDollarSign,
  CalendarDays,
  Building2,
  Scale,
} from "lucide-react";
import Link from "next/link";

// --- Mock Data ---

const plOverview = {
  totalRevenue: 245000000,
  costOfConstruction: 156000000,
  grossProfit: 89000000,
  grossMargin: 36.3,
  operatingExpenses: 28500000,
  operatingIncome: 60500000,
  operatingMargin: 24.7,
  interestExpense: 8200000,
  taxExpense: 12600000,
  netIncome: 39700000,
  netMargin: 16.2,
};

const cashFlowData = [
  { month: "Apr 25", inflows: 22000000, outflows: -18500000, net: 3500000 },
  { month: "May 25", inflows: 19500000, outflows: -21000000, net: -1500000 },
  { month: "Jun 25", inflows: 24000000, outflows: -19800000, net: 4200000 },
  { month: "Jul 25", inflows: 18200000, outflows: -20500000, net: -2300000 },
  { month: "Aug 25", inflows: 26000000, outflows: -21200000, net: 4800000 },
  { month: "Sep 25", inflows: 23500000, outflows: -19000000, net: 4500000 },
  { month: "Oct 25", inflows: 28000000, outflows: -22800000, net: 5200000 },
  { month: "Nov 25", inflows: 25500000, outflows: -23400000, net: 2100000 },
  { month: "Dec 25", inflows: 20000000, outflows: -24000000, net: -4000000 },
  { month: "Jan 26", inflows: 27500000, outflows: -21500000, net: 6000000 },
  { month: "Feb 26", inflows: 29000000, outflows: -22000000, net: 7000000 },
  { month: "Mar 26", inflows: 31000000, outflows: -23500000, net: 7500000 },
];

const budgetVarianceData = [
  {
    project: "Lekki Pearl Estate",
    budget: 850000000,
    actual: 790000000,
    variance: -60000000,
    variancePercent: -7.1,
    status: "Under Budget",
    phase: "Structure",
    completion: 68,
  },
  {
    project: "Victoria Island Towers",
    budget: 2100000000,
    actual: 2180000000,
    variance: 80000000,
    variancePercent: 3.8,
    status: "Over Budget",
    phase: "MEP",
    completion: 82,
  },
  {
    project: "Ikoyi Crescent Villas",
    budget: 1200000000,
    actual: 1150000000,
    variance: -50000000,
    variancePercent: -4.2,
    status: "Under Budget",
    phase: "Finishing",
    completion: 91,
  },
  {
    project: "Ajah Sunrise Gardens",
    budget: 420000000,
    actual: 398000000,
    variance: -22000000,
    variancePercent: -5.2,
    status: "Under Budget",
    phase: "Foundation",
    completion: 35,
  },
  {
    project: "Abuja Citadel Estate",
    budget: 680000000,
    actual: 665000000,
    variance: -15000000,
    variancePercent: -2.2,
    status: "Under Budget",
    phase: "Structure",
    completion: 55,
  },
  {
    project: "Maitama Grand Residences",
    budget: 950000000,
    actual: 1020000000,
    variance: 70000000,
    variancePercent: 7.4,
    status: "Over Budget",
    phase: "MEP",
    completion: 74,
  },
  {
    project: "Port Harcourt Gardens",
    budget: 340000000,
    actual: 335000000,
    variance: -5000000,
    variancePercent: -1.5,
    status: "On Track",
    phase: "Foundation",
    completion: 28,
  },
  {
    project: "Ikeja Business Park",
    budget: 520000000,
    actual: 540000000,
    variance: 20000000,
    variancePercent: 3.8,
    status: "Over Budget",
    phase: "Structure",
    completion: 60,
  },
];

const receivablesAging = {
  current: {
    label: "Current (0-30 days)",
    amount: 42500000,
    count: 12,
    percentage: 48.3,
  },
  thirtyDays: {
    label: "31-60 days",
    amount: 23800000,
    count: 7,
    percentage: 27.1,
  },
  sixtyDays: {
    label: "61-90 days",
    amount: 14200000,
    count: 4,
    percentage: 16.2,
  },
  ninetyPlus: {
    label: "90+ days",
    amount: 7400000,
    count: 3,
    percentage: 8.4,
  },
};

const receivablesDetail = [
  { client: "Alhaji Mustapha Ibrahim", project: "Lekki Pearl Estate", amount: 18500000, age: 15, status: "Current" },
  { client: "Greenfield Properties Ltd", project: "Victoria Island Towers", amount: 32000000, age: 28, status: "Current" },
  { client: "Obi Investments Group", project: "Ikoyi Crescent Villas", amount: 12800000, age: 45, status: "31-60 days" },
  { client: "Senator Danjuma Estate", project: "Abuja Citadel Estate", amount: 11000000, age: 52, status: "31-60 days" },
  { client: "Adebayo & Partners", project: "Ajah Sunrise Gardens", amount: 8500000, age: 72, status: "61-90 days" },
  { client: "Coastal Developers Nig. Ltd", project: "Port Harcourt Gardens", amount: 5700000, age: 85, status: "61-90 days" },
  { client: "Pinnacle Holdings", project: "Maitama Grand Residences", amount: 4200000, age: 105, status: "90+ days" },
  { client: "Kano Prime Estates", project: "Ikeja Business Park", amount: 3200000, age: 118, status: "90+ days" },
];

const escrowAccounts = [
  { project: "Lekki Pearl Estate", total: 120000000, utilized: 84000000, rate: 70, status: "Active" },
  { project: "Victoria Island Towers", total: 280000000, utilized: 238000000, rate: 85, status: "Active" },
  { project: "Ikoyi Crescent Villas", total: 180000000, utilized: 162000000, rate: 90, status: "Active" },
  { project: "Ajah Sunrise Gardens", total: 65000000, utilized: 22750000, rate: 35, status: "Active" },
  { project: "Abuja Citadel Estate", total: 95000000, utilized: 52250000, rate: 55, status: "Active" },
  { project: "Maitama Grand Residences", total: 140000000, utilized: 119000000, rate: 85, status: "Under Review" },
];

const taxSummary = [
  { category: "Company Income Tax (CIT)", rate: "30%", estimated: 11910000, status: "Provisioned", dueDate: "Jun 30, 2026" },
  { category: "Value Added Tax (VAT)", rate: "7.5%", estimated: 18375000, status: "Paid to Date", dueDate: "Monthly" },
  { category: "Withholding Tax (WHT)", rate: "5%", estimated: 7800000, status: "Deducted at Source", dueDate: "Monthly" },
  { category: "Capital Gains Tax", rate: "10%", estimated: 3200000, status: "Pending Assessment", dueDate: "On Disposal" },
  { category: "PAYE (Payroll)", rate: "Variable", estimated: 9600000, status: "Paid to Date", dueDate: "Monthly" },
  { category: "Stamp Duty", rate: "Variable", estimated: 2450000, status: "Paid", dueDate: "Per Transaction" },
];

const budgetVarianceChartData = budgetVarianceData.map((d) => ({
  name: d.project.length > 18 ? d.project.substring(0, 18) + "..." : d.project,
  variance: d.variancePercent,
  fullName: d.project,
}));

function CustomCashFlowTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; dataKey: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background p-3 shadow-md">
        <p className="mb-1 text-sm font-medium">{label}</p>
        {payload.map((entry, index) => {
          const displayValue = entry.dataKey === "outflows" ? Math.abs(entry.value) : entry.value;
          const colors: Record<string, string> = { inflows: "#22c55e", outflows: "#ef4444", net: "#3b82f6" };
          const labels: Record<string, string> = { inflows: "Inflows", outflows: "Outflows", net: "Net Cash Flow" };
          return (
            <p key={index} className="text-sm" style={{ color: colors[entry.dataKey] }}>
              {labels[entry.dataKey]}: {formatNaira(displayValue)}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
}

function CustomVarianceTooltip({ active, payload }: { active?: boolean; payload?: Array<{ payload: { fullName: string; variance: number } }> }) {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-3 shadow-md">
        <p className="mb-1 text-sm font-medium">{data.fullName}</p>
        <p className={`text-sm font-semibold ${data.variance > 0 ? "text-red-600" : "text-green-600"}`}>
          {data.variance > 0 ? "+" : ""}{data.variance}% variance
        </p>
      </div>
    );
  }
  return null;
}

export default function FinancialReportPage() {
  const [reportPeriod, setReportPeriod] = useState("q1-2026");

  const totalReceivables =
    receivablesAging.current.amount +
    receivablesAging.thirtyDays.amount +
    receivablesAging.sixtyDays.amount +
    receivablesAging.ninetyPlus.amount;

  const totalEscrowFunds = escrowAccounts.reduce((a, b) => a + b.total, 0);
  const totalUtilized = escrowAccounts.reduce((a, b) => a + b.utilized, 0);
  const totalTaxLiability = taxSummary.reduce((a, b) => a + b.estimated, 0);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/reports">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Financial Report</h1>
            <p className="text-muted-foreground">
              Comprehensive financial analysis across all projects
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Select value={reportPeriod} onValueChange={setReportPeriod}>
            <SelectTrigger className="w-[180px]">
              <CalendarDays className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="q1-2026">Q1 2026</SelectItem>
              <SelectItem value="q4-2025">Q4 2025</SelectItem>
              <SelectItem value="q3-2025">Q3 2025</SelectItem>
              <SelectItem value="fy-2025">FY 2025</SelectItem>
              <SelectItem value="ytd">Year to Date</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* P&L Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNaira(plOverview.totalRevenue)}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              +12% vs last quarter
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Profit</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNaira(plOverview.grossProfit)}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              Margin: {plOverview.grossMargin}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Operating Income</CardTitle>
            <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNaira(plOverview.operatingIncome)}</div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              Margin: {plOverview.operatingMargin}%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNaira(plOverview.netIncome)}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="h-3 w-3" />
              Margin: {plOverview.netMargin}%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* P&L Statement */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-blue-500" />
            Profit & Loss Statement
          </CardTitle>
          <CardDescription>Consolidated P&L overview for all active projects</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Line Item</TableHead>
                <TableHead className="text-right">Amount (₦)</TableHead>
                <TableHead className="text-right">% of Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="font-semibold">
                <TableCell>Total Revenue</TableCell>
                <TableCell className="text-right tabular-nums">{formatNaira(plOverview.totalRevenue)}</TableCell>
                <TableCell className="text-right tabular-nums">100.0%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-muted-foreground">Cost of Construction</TableCell>
                <TableCell className="text-right tabular-nums text-red-600">({formatNaira(plOverview.costOfConstruction)})</TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">{((plOverview.costOfConstruction / plOverview.totalRevenue) * 100).toFixed(1)}%</TableCell>
              </TableRow>
              <TableRow className="border-t-2 font-semibold">
                <TableCell>Gross Profit</TableCell>
                <TableCell className="text-right tabular-nums text-green-600">{formatNaira(plOverview.grossProfit)}</TableCell>
                <TableCell className="text-right tabular-nums">{plOverview.grossMargin}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-muted-foreground">Operating Expenses</TableCell>
                <TableCell className="text-right tabular-nums text-red-600">({formatNaira(plOverview.operatingExpenses)})</TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">{((plOverview.operatingExpenses / plOverview.totalRevenue) * 100).toFixed(1)}%</TableCell>
              </TableRow>
              <TableRow className="border-t-2 font-semibold">
                <TableCell>Operating Income (EBIT)</TableCell>
                <TableCell className="text-right tabular-nums text-green-600">{formatNaira(plOverview.operatingIncome)}</TableCell>
                <TableCell className="text-right tabular-nums">{plOverview.operatingMargin}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-muted-foreground">Interest Expense</TableCell>
                <TableCell className="text-right tabular-nums text-red-600">({formatNaira(plOverview.interestExpense)})</TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">{((plOverview.interestExpense / plOverview.totalRevenue) * 100).toFixed(1)}%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="pl-8 text-muted-foreground">Income Tax Expense</TableCell>
                <TableCell className="text-right tabular-nums text-red-600">({formatNaira(plOverview.taxExpense)})</TableCell>
                <TableCell className="text-right tabular-nums text-muted-foreground">{((plOverview.taxExpense / plOverview.totalRevenue) * 100).toFixed(1)}%</TableCell>
              </TableRow>
              <TableRow className="border-t-2 bg-muted/50 font-bold">
                <TableCell>Net Income</TableCell>
                <TableCell className="text-right tabular-nums text-green-600">{formatNaira(plOverview.netIncome)}</TableCell>
                <TableCell className="text-right tabular-nums">{plOverview.netMargin}%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Cash Flow Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-green-500" />
            Cash Flow Analysis
          </CardTitle>
          <CardDescription>Monthly cash inflows vs outflows over the trailing 12 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[380px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={cashFlowData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="inflowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="outflowGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" tick={{ fontSize: 12 }} />
                <YAxis
                  className="text-xs"
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) => `₦${(Math.abs(value) / 1000000).toFixed(0)}M`}
                />
                <Tooltip content={<CustomCashFlowTooltip />} />
                <Legend />
                <ReferenceLine y={0} stroke="#888" strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey="inflows"
                  stroke="#22c55e"
                  strokeWidth={2}
                  fill="url(#inflowGradient)"
                  name="Inflows"
                />
                <Area
                  type="monotone"
                  dataKey="outflows"
                  stroke="#ef4444"
                  strokeWidth={2}
                  fill="url(#outflowGradient)"
                  name="Outflows"
                />
                <Area
                  type="monotone"
                  dataKey="net"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="none"
                  name="Net Cash Flow"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <Separator className="my-4" />
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-muted-foreground">Total Inflows</p>
              <p className="text-lg font-bold text-green-600">
                {formatNaira(cashFlowData.reduce((a, b) => a + b.inflows, 0))}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Outflows</p>
              <p className="text-lg font-bold text-red-600">
                {formatNaira(Math.abs(cashFlowData.reduce((a, b) => a + b.outflows, 0)))}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net Cash Position</p>
              <p className="text-lg font-bold text-blue-600">
                {formatNaira(cashFlowData.reduce((a, b) => a + b.net, 0))}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Budget Variance Analysis */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-purple-500" />
              Budget Variance by Project
            </CardTitle>
            <CardDescription>Percentage over/under budget per project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={budgetVarianceChartData} layout="vertical" margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" horizontal={false} />
                  <XAxis
                    type="number"
                    className="text-xs"
                    tick={{ fontSize: 11 }}
                    tickFormatter={(v) => `${v}%`}
                    domain={[-10, 10]}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    className="text-xs"
                    tick={{ fontSize: 11 }}
                    width={140}
                  />
                  <Tooltip content={<CustomVarianceTooltip />} />
                  <ReferenceLine x={0} stroke="#888" />
                  <Bar dataKey="variance" radius={[0, 4, 4, 0]}>
                    {budgetVarianceChartData.map((entry, index) => (
                      <Cell key={index} fill={entry.variance > 0 ? "#ef4444" : "#22c55e"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-indigo-500" />
              Project Budget Details
            </CardTitle>
            <CardDescription>Budget vs actual spend with completion status</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[400px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead className="text-right">Budget</TableHead>
                  <TableHead className="text-right">Actual</TableHead>
                  <TableHead className="text-right">Variance</TableHead>
                  <TableHead className="text-right">Done</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {budgetVarianceData.map((p) => (
                  <TableRow key={p.project}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{p.project}</p>
                        <p className="text-xs text-muted-foreground">{p.phase}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right tabular-nums text-muted-foreground">
                      {formatNaira(p.budget)}
                    </TableCell>
                    <TableCell className="text-right tabular-nums">
                      {formatNaira(p.actual)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={p.variancePercent > 0 ? "destructive" : "default"}
                        className={p.variancePercent <= 0 ? "bg-green-600" : ""}
                      >
                        {p.variancePercent > 0 ? "+" : ""}{p.variancePercent}%
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Progress value={p.completion} className="h-2 w-12" />
                        <span className="w-8 text-xs tabular-nums text-muted-foreground">{p.completion}%</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Outstanding Receivables Aging */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-amber-500" />
                Outstanding Receivables Aging
              </CardTitle>
              <CardDescription>Breakdown of receivables by aging bucket</CardDescription>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total Outstanding</p>
              <p className="text-xl font-bold">{formatNaira(totalReceivables)}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Aging Buckets */}
          <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[receivablesAging.current, receivablesAging.thirtyDays, receivablesAging.sixtyDays, receivablesAging.ninetyPlus].map(
              (bucket, i) => {
                const colors = ["bg-green-500", "bg-amber-500", "bg-orange-500", "bg-red-500"];
                const textColors = ["text-green-600", "text-amber-600", "text-orange-600", "text-red-600"];
                return (
                  <div key={bucket.label} className="rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{bucket.label}</p>
                      <Badge variant="outline" className="text-xs">{bucket.count} invoices</Badge>
                    </div>
                    <p className={`mt-1 text-lg font-bold ${textColors[i]}`}>
                      {formatNaira(bucket.amount)}
                    </p>
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{bucket.percentage}% of total</span>
                      </div>
                      <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-muted">
                        <div className={`h-full rounded-full ${colors[i]}`} style={{ width: `${bucket.percentage}%` }} />
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          <Separator className="mb-4" />

          {/* Receivables Detail Table */}
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Age (Days)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {receivablesDetail.map((r) => {
                const statusColor =
                  r.status === "Current"
                    ? "bg-green-600"
                    : r.status === "31-60 days"
                    ? "bg-amber-600"
                    : r.status === "61-90 days"
                    ? "bg-orange-600"
                    : "bg-red-600";
                return (
                  <TableRow key={r.client}>
                    <TableCell className="font-medium">{r.client}</TableCell>
                    <TableCell className="text-muted-foreground">{r.project}</TableCell>
                    <TableCell className="text-right tabular-nums font-medium">{formatNaira(r.amount)}</TableCell>
                    <TableCell className="text-right tabular-nums">{r.age}</TableCell>
                    <TableCell>
                      <Badge className={statusColor}>{r.status}</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Escrow Fund Utilization */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Landmark className="h-5 w-5 text-cyan-500" />
                Escrow Fund Utilization
              </CardTitle>
              <CardDescription>
                Fund disbursement tracking across project escrow accounts
              </CardDescription>
            </div>
            <div className="flex gap-6 text-right">
              <div>
                <p className="text-xs text-muted-foreground">Total Escrow Funds</p>
                <p className="text-lg font-bold">{formatNaira(totalEscrowFunds)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Total Utilized</p>
                <p className="text-lg font-bold text-blue-600">{formatNaira(totalUtilized)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Available</p>
                <p className="text-lg font-bold text-green-600">{formatNaira(totalEscrowFunds - totalUtilized)}</p>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead className="text-right">Total Escrow</TableHead>
                <TableHead className="text-right">Utilized</TableHead>
                <TableHead className="text-right">Available</TableHead>
                <TableHead className="w-[200px]">Utilization Rate</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {escrowAccounts.map((account) => (
                <TableRow key={account.project}>
                  <TableCell className="font-medium">{account.project}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatNaira(account.total)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatNaira(account.utilized)}</TableCell>
                  <TableCell className="text-right tabular-nums text-green-600">
                    {formatNaira(account.total - account.utilized)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={account.rate} className="h-2 flex-1" />
                      <span className="w-10 text-right text-xs tabular-nums font-medium">
                        {account.rate}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={account.status === "Active" ? "default" : "secondary"}>
                      {account.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Separator className="my-4" />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              Overall utilization rate: {((totalUtilized / totalEscrowFunds) * 100).toFixed(1)}%
            </span>
            <Badge variant="outline" className="gap-1">
              <CheckCircle2 className="h-3 w-3 text-green-500" />
              All accounts reconciled
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Tax Implications Summary */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-violet-500" />
                Tax Implications Summary
              </CardTitle>
              <CardDescription>
                Estimated tax liabilities and compliance status under Nigerian tax law
              </CardDescription>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Total Estimated Tax Liability</p>
              <p className="text-xl font-bold text-red-600">{formatNaira(totalTaxLiability)}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tax Category</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead className="text-right">Estimated Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {taxSummary.map((tax) => {
                const statusVariant =
                  tax.status === "Paid" || tax.status === "Paid to Date"
                    ? "default"
                    : tax.status === "Provisioned" || tax.status === "Deducted at Source"
                    ? "secondary"
                    : "outline";
                const statusClass =
                  tax.status === "Paid" || tax.status === "Paid to Date" ? "bg-green-600" : "";
                return (
                  <TableRow key={tax.category}>
                    <TableCell className="font-medium">{tax.category}</TableCell>
                    <TableCell className="tabular-nums">{tax.rate}</TableCell>
                    <TableCell className="text-right tabular-nums font-medium">
                      {formatNaira(tax.estimated)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusVariant} className={statusClass}>
                        {tax.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{tax.dueDate}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Separator className="my-4" />
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
              <div className="text-sm text-amber-800">
                <p className="font-medium">Tax Advisory Note</p>
                <p className="mt-0.5 text-amber-700">
                  CIT filing deadline for FY 2025 is June 30, 2026. Ensure all project-level P&L
                  statements are finalized by May 31 for consolidated filing. VAT returns are due by
                  the 21st of each month following the period of transaction. Contact your tax
                  consultant for FIRS compliance review.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Export Actions Footer */}
      <Card>
        <CardContent className="py-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold">Export Financial Reports</h3>
              <p className="text-sm text-muted-foreground">
                Download comprehensive financial data in your preferred format
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Full P&L (CSV)
              </Button>
              <Button variant="outline" className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Cash Flow (CSV)
              </Button>
              <Button variant="outline" className="gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                Budget Variance (CSV)
              </Button>
              <Button className="gap-2">
                <FileText className="h-4 w-4" />
                Complete Report (PDF)
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
