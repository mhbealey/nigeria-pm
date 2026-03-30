"use client";

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Building2,
  Home,
  TrendingUp,
  BarChart3,
  Plus,
  MapPin,
  CheckCircle2,
  Clock,
  AlertTriangle,
  XCircle,
  DollarSign,
  FileText,
  Download,
  Eye,
  ArrowUpRight,
  Percent,
} from "lucide-react";
import { formatNaira } from "@/lib/utils";

// --- Mock Data ---

const estates = [
  {
    id: "royal-gardens",
    name: "Royal Gardens Estate",
    location: "Lekki, Lagos",
    totalUnits: 50,
    unitsSold: 38,
    completion: 72,
    health: "On Track" as const,
    revenueCollected: 230000000000,
    revenueOutstanding: 90000000000,
    totalValue: 320000000000,
    manager: "Adebayo Ogunleye",
    startDate: "2024-08-15",
    estCompletion: "2026-11-30",
  },
  {
    id: "emerald-city",
    name: "Emerald City",
    location: "Ajah, Lagos",
    totalUnits: 30,
    unitsSold: 18,
    completion: 45,
    health: "At Risk" as const,
    revenueCollected: 108000000000,
    revenueOutstanding: 72000000000,
    totalValue: 180000000000,
    manager: "Chidinma Eze",
    startDate: "2025-02-01",
    estCompletion: "2027-06-30",
  },
  {
    id: "jabi-luxury",
    name: "Jabi Luxury Villas",
    location: "Jabi, Abuja",
    totalUnits: 20,
    unitsSold: 18,
    completion: 88,
    health: "On Track" as const,
    revenueCollected: 176400000000,
    revenueOutstanding: 33600000000,
    totalValue: 210000000000,
    manager: "Ibrahim Musa",
    startDate: "2024-03-10",
    estCompletion: "2026-06-15",
  },
  {
    id: "wuse-heights",
    name: "Wuse Heights",
    location: "Wuse, Abuja",
    totalUnits: 27,
    unitsSold: 15,
    completion: 55,
    health: "Behind" as const,
    revenueCollected: 74250000000,
    revenueOutstanding: 60750000000,
    totalValue: 135000000000,
    manager: "Ngozi Obi",
    startDate: "2025-01-20",
    estCompletion: "2027-09-30",
  },
];

const units = [
  { id: "RG-A01", estate: "Royal Gardens Estate", type: "3-Bed Detached", status: "Complete" as const, stage: "Handed Over", budget: 6500000000 },
  { id: "RG-A02", estate: "Royal Gardens Estate", type: "4-Bed Semi-Detached", status: "In Progress" as const, stage: "Roofing", budget: 8200000000 },
  { id: "RG-A03", estate: "Royal Gardens Estate", type: "3-Bed Detached", status: "In Progress" as const, stage: "Plastering", budget: 6500000000 },
  { id: "RG-A04", estate: "Royal Gardens Estate", type: "5-Bed Detached", status: "Not Started" as const, stage: "Awaiting Foundation", budget: 12000000000 },
  { id: "RG-A05", estate: "Royal Gardens Estate", type: "3-Bed Terrace", status: "Complete" as const, stage: "Handed Over", budget: 5200000000 },
  { id: "RG-A06", estate: "Royal Gardens Estate", type: "4-Bed Semi-Detached", status: "Delayed" as const, stage: "Electrical — Awaiting Materials", budget: 8200000000 },
  { id: "EC-B01", estate: "Emerald City", type: "3-Bed Terrace", status: "In Progress" as const, stage: "Block Work", budget: 5800000000 },
  { id: "EC-B02", estate: "Emerald City", type: "3-Bed Terrace", status: "Not Started" as const, stage: "Pending Approval", budget: 5800000000 },
  { id: "EC-B03", estate: "Emerald City", type: "4-Bed Detached", status: "In Progress" as const, stage: "Decking", budget: 9500000000 },
  { id: "EC-B04", estate: "Emerald City", type: "2-Bed Flat", status: "Complete" as const, stage: "Handed Over", budget: 3200000000 },
  { id: "JV-C01", estate: "Jabi Luxury Villas", type: "5-Bed Villa", status: "Complete" as const, stage: "Handed Over", budget: 11500000000 },
  { id: "JV-C02", estate: "Jabi Luxury Villas", type: "5-Bed Villa", status: "Complete" as const, stage: "Handed Over", budget: 11500000000 },
  { id: "JV-C03", estate: "Jabi Luxury Villas", type: "4-Bed Villa", status: "In Progress" as const, stage: "Finishing", budget: 9800000000 },
  { id: "JV-C04", estate: "Jabi Luxury Villas", type: "5-Bed Villa", status: "In Progress" as const, stage: "MEP Installation", budget: 11500000000 },
  { id: "WH-D01", estate: "Wuse Heights", type: "3-Bed Flat", status: "In Progress" as const, stage: "Structural Frame", budget: 4500000000 },
  { id: "WH-D02", estate: "Wuse Heights", type: "2-Bed Flat", status: "Delayed" as const, stage: "Foundation — Permit Hold", budget: 3200000000 },
  { id: "WH-D03", estate: "Wuse Heights", type: "3-Bed Flat", status: "Not Started" as const, stage: "Pending Funding", budget: 4500000000 },
  { id: "WH-D04", estate: "Wuse Heights", type: "Penthouse", status: "In Progress" as const, stage: "Block Work", budget: 14000000000 },
];

const revenueData = [
  { month: "Oct", collected: 4500000000, outstanding: 1200000000 },
  { month: "Nov", collected: 5200000000, outstanding: 980000000 },
  { month: "Dec", collected: 3800000000, outstanding: 1500000000 },
  { month: "Jan", collected: 6100000000, outstanding: 870000000 },
  { month: "Feb", collected: 7300000000, outstanding: 1100000000 },
  { month: "Mar", collected: 8200000000, outstanding: 1400000000 },
];

const expenseBreakdown = [
  { name: "Materials", value: 3800000000, color: "#16a34a" },
  { name: "Labour", value: 2400000000, color: "#2563eb" },
  { name: "Equipment", value: 900000000, color: "#d97706" },
  { name: "Permits & Fees", value: 450000000, color: "#7c3aed" },
  { name: "Overheads", value: 650000000, color: "#dc2626" },
];

const overduePayments = [
  { buyer: "Mr. Chukwuma Eze", estate: "Emerald City", unit: "EC-B03", amountDue: 2800000000, dueDate: "2026-02-15", daysOverdue: 43 },
  { buyer: "Mrs. Folake Adeniyi", estate: "Wuse Heights", unit: "WH-D01", amountDue: 1500000000, dueDate: "2026-03-01", daysOverdue: 29 },
  { buyer: "Alhaji Bello Garba", estate: "Royal Gardens Estate", unit: "RG-A06", amountDue: 3200000000, dueDate: "2026-03-10", daysOverdue: 20 },
  { buyer: "Dr. Amina Yusuf", estate: "Emerald City", unit: "EC-B01", amountDue: 1900000000, dueDate: "2026-03-18", daysOverdue: 12 },
  { buyer: "Chief Okafor", estate: "Wuse Heights", unit: "WH-D04", amountDue: 5000000000, dueDate: "2026-03-22", daysOverdue: 8 },
];

const healthBadgeVariant = (health: "On Track" | "At Risk" | "Behind") => {
  switch (health) {
    case "On Track":
      return "default";
    case "At Risk":
      return "secondary";
    case "Behind":
      return "destructive";
  }
};

const healthIcon = (health: "On Track" | "At Risk" | "Behind") => {
  switch (health) {
    case "On Track":
      return <CheckCircle2 className="h-3.5 w-3.5 mr-1" />;
    case "At Risk":
      return <AlertTriangle className="h-3.5 w-3.5 mr-1" />;
    case "Behind":
      return <XCircle className="h-3.5 w-3.5 mr-1" />;
  }
};

const statusColor = (status: "Complete" | "In Progress" | "Not Started" | "Delayed") => {
  switch (status) {
    case "Complete":
      return "bg-green-500";
    case "In Progress":
      return "bg-blue-500";
    case "Not Started":
      return "bg-gray-400";
    case "Delayed":
      return "bg-red-500";
  }
};

const statusBadgeVariant = (status: "Complete" | "In Progress" | "Not Started" | "Delayed") => {
  switch (status) {
    case "Complete":
      return "default";
    case "In Progress":
      return "secondary";
    case "Not Started":
      return "outline";
    case "Delayed":
      return "destructive";
  }
};

export default function EstatesPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newEstate, setNewEstate] = useState({
    name: "",
    location: "",
    units: "",
    type: "",
  });

  const totalUnits = 127;
  const unitsSold = 89;
  const soldPercentage = Math.round((unitsSold / totalUnits) * 100);
  const portfolioValueKobo = 845000000000;
  const avgCompletion = 64;

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Estate Portfolio</h1>
          <p className="text-muted-foreground">
            Manage your estate developments, track units, and monitor financial performance across all projects.
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add New Estate
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Estate Development</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="estate-name">Estate Name</Label>
                <Input
                  id="estate-name"
                  placeholder="e.g. Sunrise Gardens"
                  value={newEstate.name}
                  onChange={(e) => setNewEstate({ ...newEstate, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estate-location">Location</Label>
                <Input
                  id="estate-location"
                  placeholder="e.g. Ikoyi, Lagos"
                  value={newEstate.location}
                  onChange={(e) => setNewEstate({ ...newEstate, location: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estate-units">Total Units</Label>
                <Input
                  id="estate-units"
                  type="number"
                  placeholder="e.g. 40"
                  value={newEstate.units}
                  onChange={(e) => setNewEstate({ ...newEstate, units: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="estate-type">Development Type</Label>
                <Select
                  value={newEstate.type}
                  onValueChange={(value) => setNewEstate({ ...newEstate, type: value })}
                >
                  <SelectTrigger id="estate-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="mixed-use">Mixed-Use</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="luxury">Luxury Villas</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>Create Estate</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Units</CardTitle>
            <Home className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalUnits}</div>
            <p className="text-xs text-muted-foreground">Across 4 estates</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Units Sold</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{unitsSold}</div>
            <div className="flex items-center gap-2 mt-1">
              <Progress value={soldPercentage} className="h-2" />
              <span className="text-xs text-muted-foreground font-medium">{soldPercentage}%</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNaira(portfolioValueKobo / 100)}</div>
            <p className="text-xs text-muted-foreground flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
              +12.3% from last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgCompletion}%</div>
            <Progress value={avgCompletion} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Portfolio Overview</TabsTrigger>
          <TabsTrigger value="units">Units</TabsTrigger>
          <TabsTrigger value="financials">Financials</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>

        {/* Portfolio Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {estates.map((estate) => (
              <Card key={estate.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{estate.name}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <MapPin className="h-3.5 w-3.5 mr-1" />
                        {estate.location}
                      </CardDescription>
                    </div>
                    <Badge variant={healthBadgeVariant(estate.health)} className="flex items-center">
                      {healthIcon(estate.health)}
                      {estate.health}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Units</p>
                      <p className="font-semibold text-lg">{estate.totalUnits}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Units Sold</p>
                      <p className="font-semibold text-lg">{estate.unitsSold}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Completion</p>
                      <p className="font-semibold text-lg">{estate.completion}%</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{estate.completion}%</span>
                    </div>
                    <Progress value={estate.completion} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm pt-2 border-t">
                    <div>
                      <p className="text-muted-foreground">Revenue Collected</p>
                      <p className="font-semibold text-green-600">
                        {formatNaira(estate.revenueCollected / 100)}
                      </p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Outstanding</p>
                      <p className="font-semibold text-amber-600">
                        {formatNaira(estate.revenueOutstanding / 100)}
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                    <ArrowUpRight className="h-3.5 w-3.5 ml-auto" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Units Tab */}
        <TabsContent value="units" className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span>Complete</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span>In Progress</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full bg-gray-400" />
                <span>Not Started</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="h-3 w-3 rounded-full bg-red-500" />
                <span>Delayed</span>
              </div>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {units.map((unit) => (
              <Card key={unit.id} className="relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${statusColor(unit.status)}`} />
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base font-semibold">{unit.id}</CardTitle>
                    <Badge variant={statusBadgeVariant(unit.status)}>{unit.status}</Badge>
                  </div>
                  <CardDescription>{unit.estate}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Type</span>
                    <span className="font-medium">{unit.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Stage</span>
                    <span className="font-medium">{unit.stage}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Budget</span>
                    <span className="font-medium">{formatNaira(unit.budget / 100)}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Financials Tab */}
        <TabsContent value="financials" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            {/* Revenue Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Revenue Overview
                </CardTitle>
                <CardDescription>Monthly collected vs outstanding payments (in billions)</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" className="text-xs" />
                      <YAxis
                        className="text-xs"
                        tickFormatter={(value) => `${(value / 1000000000).toFixed(1)}B`}
                      />
                      <Tooltip
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        formatter={(value: any) => formatNaira(Number(value) / 100)}
                        labelStyle={{ fontWeight: "bold" }}
                      />
                      <Bar dataKey="collected" name="Collected" fill="#16a34a" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="outstanding" name="Outstanding" fill="#d97706" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Expense Donut Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Expense Breakdown
                </CardTitle>
                <CardDescription>Current quarter expense distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenseBreakdown}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={110}
                        paddingAngle={3}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) =>
                          `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                        }
                        labelLine={true}
                      >
                        {expenseBreakdown.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatNaira(Number(value) / 100)} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overdue Payments Table */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Overdue Payments
              </CardTitle>
              <CardDescription>
                {overduePayments.length} buyer payments currently overdue requiring follow-up
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Buyer</TableHead>
                    <TableHead>Estate</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead className="text-right">Amount Due</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead className="text-right">Days Overdue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {overduePayments.map((payment) => (
                    <TableRow key={payment.unit}>
                      <TableCell className="font-medium">{payment.buyer}</TableCell>
                      <TableCell>{payment.estate}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{payment.unit}</Badge>
                      </TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatNaira(payment.amountDue / 100)}
                      </TableCell>
                      <TableCell>{payment.dueDate}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={payment.daysOverdue > 30 ? "destructive" : "secondary"}>
                          {payment.daysOverdue} days
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Reports Tab */}
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Weekly Investor Report
                  </CardTitle>
                  <CardDescription>
                    Auto-generated summary for week ending March 28, 2026
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export PDF
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-6 space-y-5">
                <div>
                  <h3 className="font-semibold text-lg mb-1">BuildNG Estate Portfolio - Investor Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Report Period: March 22 - March 28, 2026
                  </p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Building2 className="h-4 w-4" />
                    Portfolio Summary
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="rounded-md bg-muted/50 p-3">
                      <p className="text-muted-foreground">Active Estates</p>
                      <p className="text-xl font-bold">4</p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-3">
                      <p className="text-muted-foreground">Total Units</p>
                      <p className="text-xl font-bold">{totalUnits}</p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-3">
                      <p className="text-muted-foreground">Sales Rate</p>
                      <p className="text-xl font-bold">{soldPercentage}%</p>
                    </div>
                    <div className="rounded-md bg-muted/50 p-3">
                      <p className="text-muted-foreground">Portfolio Value</p>
                      <p className="text-xl font-bold">{formatNaira(portfolioValueKobo / 100)}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    Key Highlights This Week
                  </h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>
                        <strong>Jabi Luxury Villas</strong> reached 88% completion. Two units (JV-C01, JV-C02)
                        have been handed over to buyers successfully.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                      <span>
                        <strong>Royal Gardens Estate</strong> progressed to 72%. Roofing on Block A is ahead
                        of schedule by 5 days.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                      <span>
                        <strong>Emerald City</strong> flagged as At Risk due to delayed material deliveries
                        from Sagamu Cement depot. Mitigation: alternative supplier sourced from Dangote direct.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 shrink-0" />
                      <span>
                        <strong>Wuse Heights</strong> is Behind schedule. Foundation permit for Unit WH-D02
                        still pending FCDA approval. Escalated to legal team on March 25.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Financial Summary
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="rounded-md border p-3">
                      <p className="text-muted-foreground">Revenue This Week</p>
                      <p className="text-lg font-bold text-green-600">{formatNaira(820000000)}</p>
                    </div>
                    <div className="rounded-md border p-3">
                      <p className="text-muted-foreground">Total Outstanding</p>
                      <p className="text-lg font-bold text-amber-600">{formatNaira(2563500000)}</p>
                    </div>
                    <div className="rounded-md border p-3">
                      <p className="text-muted-foreground">Overdue Accounts</p>
                      <p className="text-lg font-bold text-red-600">5 buyers</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Next Week Priorities
                  </h4>
                  <ul className="space-y-1.5 text-sm list-disc list-inside text-muted-foreground">
                    <li>Complete roofing inspection on Royal Gardens Block B units</li>
                    <li>Follow up on FCDA permit for Wuse Heights WH-D02</li>
                    <li>Initiate payment recovery calls for 5 overdue accounts</li>
                    <li>Finalize Dangote Cement supply agreement for Emerald City</li>
                    <li>Schedule investor site visit for Jabi Luxury Villas (April 5)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Generated automatically by BuildNG on March 28, 2026</span>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview Full Report
                </Button>
              </div>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
