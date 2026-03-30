"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  Plus,
  CheckCircle2,
  Clock,
  Shield,
  Bug,
  Wrench,
  Camera,
  Upload,
  Search,
  Filter,
  ArrowUp,
  ArrowDown,
  CalendarDays,
  Building2,
  User,
  ChevronRight,
  BarChart3,
  ImageIcon,
  AlertCircle,
  CircleDot,
} from "lucide-react";
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
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { formatNaira } from "@/lib/utils";

// ---------- Types ----------
type DefectPriority = "Critical" | "High" | "Medium" | "Low";
type DefectStatus =
  | "Reported"
  | "Acknowledged"
  | "In Progress"
  | "Under Review"
  | "Resolved"
  | "Closed";
type DefectCategory =
  | "Structural"
  | "Plumbing"
  | "Electrical"
  | "Finishing"
  | "HVAC"
  | "Waterproofing"
  | "Roofing"
  | "Tiling";

interface Defect {
  id: string;
  title: string;
  property: string;
  priority: DefectPriority;
  category: DefectCategory;
  status: DefectStatus;
  contractor: string;
  daysOpen: number;
  description: string;
  reportedDate: string;
}

interface WarrantyItem {
  id: string;
  component: string;
  property: string;
  contractor: string;
  warrantyPeriod: string;
  startDate: string;
  endDate: string;
  monthsRemaining: number;
}

// ---------- Data ----------
const activeDefects: Defect[] = [
  {
    id: "DEF-001",
    title: "Ceiling crack in master bedroom",
    property: "Lekki Gardens Estate - Block A",
    priority: "Critical",
    category: "Structural",
    status: "In Progress",
    contractor: "Solid Foundations Ltd",
    daysOpen: 12,
    description: "Visible crack running approximately 2m across ceiling.",
    reportedDate: "2026-03-18",
  },
  {
    id: "DEF-002",
    title: "Water seepage in basement",
    property: "Banana Island Residence",
    priority: "Critical",
    category: "Waterproofing",
    status: "Acknowledged",
    contractor: "AquaShield Nigeria",
    daysOpen: 5,
    description: "Water pooling on basement floor during heavy rain.",
    reportedDate: "2026-03-25",
  },
  {
    id: "DEF-003",
    title: "Faulty electrical outlets - Floor 3",
    property: "Jabi Lake Towers",
    priority: "High",
    category: "Electrical",
    status: "In Progress",
    contractor: "PowerGrid Electrical",
    daysOpen: 8,
    description: "Multiple outlets not providing power on 3rd floor.",
    reportedDate: "2026-03-22",
  },
  {
    id: "DEF-004",
    title: "Bathroom tile lifting",
    property: "Maitama Luxury Villas - Unit 7",
    priority: "Medium",
    category: "Tiling",
    status: "Reported",
    contractor: "Unassigned",
    daysOpen: 3,
    description: "Floor tiles separating from substrate in en-suite.",
    reportedDate: "2026-03-27",
  },
  {
    id: "DEF-005",
    title: "AC unit vibration noise",
    property: "GRA Ikeja Commercial Plaza",
    priority: "Medium",
    category: "HVAC",
    status: "Under Review",
    contractor: "CoolAir Systems",
    daysOpen: 15,
    description: "Excessive vibration and noise from rooftop AC unit.",
    reportedDate: "2026-03-15",
  },
  {
    id: "DEF-006",
    title: "Paint peeling on exterior walls",
    property: "Lekki Gardens Estate - Block C",
    priority: "Low",
    category: "Finishing",
    status: "Acknowledged",
    contractor: "Finish Perfect Ltd",
    daysOpen: 20,
    description: "Paint bubbling and peeling on north-facing exterior.",
    reportedDate: "2026-03-10",
  },
  {
    id: "DEF-007",
    title: "Roof leak near skylight",
    property: "Banana Island Residence",
    priority: "High",
    category: "Roofing",
    status: "In Progress",
    contractor: "TopCover Roofing",
    daysOpen: 7,
    description: "Water dripping from skylight frame during rainfall.",
    reportedDate: "2026-03-23",
  },
  {
    id: "DEF-008",
    title: "Blocked drainage pipe - Kitchen",
    property: "Maitama Luxury Villas - Unit 3",
    priority: "High",
    category: "Plumbing",
    status: "Reported",
    contractor: "Unassigned",
    daysOpen: 2,
    description: "Kitchen sink draining very slowly, possible blockage.",
    reportedDate: "2026-03-28",
  },
];

const resolvedDefects: Defect[] = [
  {
    id: "DEF-050",
    title: "Broken window latch",
    property: "GRA Ikeja Commercial Plaza",
    priority: "Low",
    category: "Finishing",
    status: "Closed",
    contractor: "Finish Perfect Ltd",
    daysOpen: 6,
    description: "Window latch mechanism not engaging properly.",
    reportedDate: "2026-02-20",
  },
  {
    id: "DEF-049",
    title: "Generator wiring fault",
    property: "Jabi Lake Towers",
    priority: "Critical",
    category: "Electrical",
    status: "Resolved",
    contractor: "PowerGrid Electrical",
    daysOpen: 3,
    description: "Generator changeover wiring causing power fluctuations.",
    reportedDate: "2026-03-01",
  },
  {
    id: "DEF-048",
    title: "Staircase railing loose",
    property: "Lekki Gardens Estate - Block A",
    priority: "High",
    category: "Structural",
    status: "Closed",
    contractor: "Solid Foundations Ltd",
    daysOpen: 10,
    description: "Metal railing on 2nd floor staircase moving when touched.",
    reportedDate: "2026-02-15",
  },
];

const warranties: WarrantyItem[] = [
  {
    id: "WRN-001",
    component: "Roofing System",
    property: "Lekki Gardens Estate",
    contractor: "TopCover Roofing",
    warrantyPeriod: "5 years",
    startDate: "2024-06-15",
    endDate: "2029-06-15",
    monthsRemaining: 39,
  },
  {
    id: "WRN-002",
    component: "Plumbing Installation",
    property: "Banana Island Residence",
    contractor: "AquaShield Nigeria",
    warrantyPeriod: "2 years",
    startDate: "2025-01-10",
    endDate: "2027-01-10",
    monthsRemaining: 9,
  },
  {
    id: "WRN-003",
    component: "Electrical Wiring",
    property: "Jabi Lake Towers",
    contractor: "PowerGrid Electrical",
    warrantyPeriod: "3 years",
    startDate: "2024-11-01",
    endDate: "2027-11-01",
    monthsRemaining: 19,
  },
  {
    id: "WRN-004",
    component: "HVAC System",
    property: "GRA Ikeja Commercial Plaza",
    contractor: "CoolAir Systems",
    warrantyPeriod: "2 years",
    startDate: "2025-03-20",
    endDate: "2027-03-20",
    monthsRemaining: 11,
  },
  {
    id: "WRN-005",
    component: "Waterproofing Membrane",
    property: "Maitama Luxury Villas",
    contractor: "AquaShield Nigeria",
    warrantyPeriod: "10 years",
    startDate: "2024-08-01",
    endDate: "2034-08-01",
    monthsRemaining: 100,
  },
  {
    id: "WRN-006",
    component: "Exterior Paint",
    property: "Lekki Gardens Estate",
    contractor: "Finish Perfect Ltd",
    warrantyPeriod: "1 year",
    startDate: "2025-09-01",
    endDate: "2026-09-01",
    monthsRemaining: 5,
  },
  {
    id: "WRN-007",
    component: "Floor Tiling",
    property: "Banana Island Residence",
    contractor: "TileMax Nigeria",
    warrantyPeriod: "2 years",
    startDate: "2025-06-15",
    endDate: "2027-06-15",
    monthsRemaining: 14,
  },
  {
    id: "WRN-008",
    component: "Elevator System",
    property: "Jabi Lake Towers",
    contractor: "LiftTech Solutions",
    warrantyPeriod: "5 years",
    startDate: "2024-12-01",
    endDate: "2029-12-01",
    monthsRemaining: 44,
  },
  {
    id: "WRN-009",
    component: "Fire Alarm System",
    property: "GRA Ikeja Commercial Plaza",
    contractor: "SafeGuard Fire Systems",
    warrantyPeriod: "3 years",
    startDate: "2025-02-01",
    endDate: "2028-02-01",
    monthsRemaining: 22,
  },
  {
    id: "WRN-010",
    component: "Generator Set",
    property: "Maitama Luxury Villas",
    contractor: "PowerGrid Electrical",
    warrantyPeriod: "2 years",
    startDate: "2025-07-01",
    endDate: "2027-07-01",
    monthsRemaining: 15,
  },
];

function getPriorityBadge(priority: DefectPriority) {
  const variants: Record<DefectPriority, string> = {
    Critical: "bg-red-100 text-red-700 border-red-200",
    High: "bg-orange-100 text-orange-700 border-orange-200",
    Medium: "bg-amber-100 text-amber-700 border-amber-200",
    Low: "bg-green-100 text-green-700 border-green-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${variants[priority]}`}
    >
      {priority === "Critical" && <ArrowUp className="mr-1 h-3 w-3" />}
      {priority === "High" && <ArrowUp className="mr-1 h-3 w-3" />}
      {priority === "Low" && <ArrowDown className="mr-1 h-3 w-3" />}
      {priority}
    </span>
  );
}

function getStatusPipeline(status: DefectStatus) {
  const stages: DefectStatus[] = [
    "Reported",
    "Acknowledged",
    "In Progress",
    "Under Review",
    "Resolved",
  ];
  const currentIdx = stages.indexOf(status);

  return (
    <div className="flex items-center gap-1">
      {stages.map((stage, idx) => (
        <React.Fragment key={stage}>
          <div
            className={`h-2 w-2 rounded-full ${
              idx <= currentIdx ? "bg-emerald-500" : "bg-gray-200"
            }`}
            title={stage}
          />
          {idx < stages.length - 1 && (
            <div
              className={`h-0.5 w-4 ${
                idx < currentIdx ? "bg-emerald-500" : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
      <span className="ml-2 text-xs text-muted-foreground">{status}</span>
    </div>
  );
}

function getWarrantyColor(monthsRemaining: number) {
  if (monthsRemaining <= 6) return "text-red-600 bg-red-50";
  if (monthsRemaining <= 12) return "text-amber-600 bg-amber-50";
  if (monthsRemaining <= 24) return "text-blue-600 bg-blue-50";
  return "text-emerald-600 bg-emerald-50";
}

function getWarrantyBarColor(monthsRemaining: number) {
  if (monthsRemaining <= 6) return "bg-red-500";
  if (monthsRemaining <= 12) return "bg-amber-500";
  if (monthsRemaining <= 24) return "bg-blue-500";
  return "bg-emerald-500";
}

// ---------- Component ----------
export default function DefectsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);

  const stats = [
    {
      label: "Open Defects",
      value: "23",
      icon: Bug,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Resolved This Month",
      value: "15",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Avg Resolution",
      value: "8 days",
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Warranty Expiring",
      value: "7",
      icon: Shield,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Defect & Warranty Manager
          </h1>
          <p className="text-muted-foreground">
            Track defects, manage warranties, and ensure construction quality
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Report Defect
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Report New Defect</DialogTitle>
              <DialogDescription>
                Provide details about the defect you have identified on site.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Property</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lekki-a">
                      Lekki Gardens Estate - Block A
                    </SelectItem>
                    <SelectItem value="lekki-c">
                      Lekki Gardens Estate - Block C
                    </SelectItem>
                    <SelectItem value="banana">
                      Banana Island Residence
                    </SelectItem>
                    <SelectItem value="jabi">Jabi Lake Towers</SelectItem>
                    <SelectItem value="maitama-3">
                      Maitama Luxury Villas - Unit 3
                    </SelectItem>
                    <SelectItem value="maitama-7">
                      Maitama Luxury Villas - Unit 7
                    </SelectItem>
                    <SelectItem value="gra">
                      GRA Ikeja Commercial Plaza
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Defect Title</Label>
                <Input placeholder="Brief description of the defect" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="structural">Structural</SelectItem>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="finishing">Finishing</SelectItem>
                      <SelectItem value="hvac">HVAC</SelectItem>
                      <SelectItem value="waterproofing">
                        Waterproofing
                      </SelectItem>
                      <SelectItem value="roofing">Roofing</SelectItem>
                      <SelectItem value="tiling">Tiling</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Describe the defect in detail, including location, severity, and any relevant observations..."
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Photos</Label>
                <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-8 transition-colors hover:border-gray-400">
                  <div className="text-center">
                    <Camera className="mx-auto h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium">
                      Click to upload photos
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      PNG, JPG up to 10MB each. Max 5 photos.
                    </p>
                    <Button variant="outline" size="sm" className="mt-3 gap-2">
                      <Upload className="h-4 w-4" />
                      Choose Files
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setDialogOpen(false)}>
                Submit Defect Report
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4 p-6">
              <div className={`rounded-lg p-3 ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" className="gap-2">
            <AlertTriangle className="h-4 w-4" />
            Active Defects
          </TabsTrigger>
          <TabsTrigger value="resolved" className="gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Resolved
          </TabsTrigger>
          <TabsTrigger value="warranty" className="gap-2">
            <Shield className="h-4 w-4" />
            Warranty Tracker
          </TabsTrigger>
          <TabsTrigger value="analytics" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Active Defects Tab */}
        <TabsContent value="active" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search defects..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select defaultValue="all-cat">
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-cat">All Categories</SelectItem>
                <SelectItem value="structural">Structural</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="finishing">Finishing</SelectItem>
                <SelectItem value="hvac">HVAC</SelectItem>
                <SelectItem value="waterproofing">Waterproofing</SelectItem>
                <SelectItem value="roofing">Roofing</SelectItem>
                <SelectItem value="tiling">Tiling</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {activeDefects.map((defect) => (
              <Card
                key={defect.id}
                className={
                  defect.priority === "Critical"
                    ? "border-red-200 bg-red-50/30"
                    : ""
                }
              >
                <CardContent className="p-5">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {defect.id}
                          </span>
                          {getPriorityBadge(defect.priority)}
                        </div>
                        <h3 className="font-semibold leading-tight">
                          {defect.title}
                        </h3>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground">
                          Days Open
                        </p>
                        <p
                          className={`text-lg font-bold ${
                            defect.daysOpen > 14
                              ? "text-red-600"
                              : defect.daysOpen > 7
                                ? "text-amber-600"
                                : "text-gray-900"
                          }`}
                        >
                          {defect.daysOpen}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {defect.property}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                      <Badge variant="outline" className="font-normal">
                        {defect.category}
                      </Badge>
                      <span className="flex items-center gap-1 text-muted-foreground">
                        <Wrench className="h-3.5 w-3.5" />
                        {defect.contractor}
                      </span>
                    </div>

                    {getStatusPipeline(defect.status)}

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-xs text-muted-foreground">
                        Reported {defect.reportedDate}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-xs"
                      >
                        Details <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Resolved Tab */}
        <TabsContent value="resolved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {resolvedDefects.map((defect) => (
              <Card key={defect.id} className="border-emerald-200 bg-emerald-50/20">
                <CardContent className="p-5">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-muted-foreground">
                            {defect.id}
                          </span>
                          {getPriorityBadge(defect.priority)}
                          <Badge className="bg-emerald-100 text-emerald-700">
                            <CheckCircle2 className="mr-1 h-3 w-3" />
                            {defect.status}
                          </Badge>
                        </div>
                        <h3 className="font-semibold leading-tight">
                          {defect.title}
                        </h3>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Building2 className="h-3.5 w-3.5" />
                        {defect.property}
                      </span>
                      <span className="flex items-center gap-1">
                        <Wrench className="h-3.5 w-3.5" />
                        {defect.contractor}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline" className="font-normal">
                        {defect.category}
                      </Badge>
                      <span className="text-muted-foreground">
                        Resolved in {defect.daysOpen} days
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="flex items-center justify-center border-dashed p-8">
              <div className="text-center text-muted-foreground">
                <CheckCircle2 className="mx-auto h-8 w-8 mb-2" />
                <p className="text-sm font-medium">12 more resolved defects</p>
                <Button variant="link" size="sm">
                  View full history
                </Button>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Warranty Tracker Tab */}
        <TabsContent value="warranty" className="space-y-4">
          <div className="flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>
              <strong>3 warranties</strong> are expiring within the next 6
              months. Consider scheduling final inspections.
            </p>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Component</TableHead>
                    <TableHead>Property</TableHead>
                    <TableHead>Contractor</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Start Date</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead>Time Remaining</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {warranties
                    .sort((a, b) => a.monthsRemaining - b.monthsRemaining)
                    .map((w) => (
                      <TableRow key={w.id}>
                        <TableCell className="font-medium">
                          {w.component}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {w.property}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {w.contractor}
                        </TableCell>
                        <TableCell>{w.warrantyPeriod}</TableCell>
                        <TableCell className="text-muted-foreground">
                          {w.startDate}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {w.endDate}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-16 rounded-full bg-gray-100">
                              <div
                                className={`h-2 rounded-full ${getWarrantyBarColor(w.monthsRemaining)}`}
                                style={{
                                  width: `${Math.min(100, (w.monthsRemaining / 60) * 100)}%`,
                                }}
                              />
                            </div>
                            <span
                              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getWarrantyColor(w.monthsRemaining)}`}
                            >
                              {w.monthsRemaining} mo
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">By Priority</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Critical", count: 4, pct: 17, color: "bg-red-500" },
                  { label: "High", count: 7, pct: 30, color: "bg-orange-500" },
                  { label: "Medium", count: 8, pct: 35, color: "bg-amber-500" },
                  { label: "Low", count: 4, pct: 17, color: "bg-green-500" },
                ].map((item) => (
                  <div key={item.label} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span>{item.label}</span>
                      <span className="text-muted-foreground">
                        {item.count} ({item.pct}%)
                      </span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-gray-100">
                      <div
                        className={`h-2 rounded-full ${item.color}`}
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">By Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { label: "Structural", count: 5, pct: 22 },
                  { label: "Plumbing", count: 4, pct: 17 },
                  { label: "Electrical", count: 4, pct: 17 },
                  { label: "Finishing", count: 3, pct: 13 },
                  { label: "Waterproofing", count: 3, pct: 13 },
                  { label: "HVAC", count: 2, pct: 9 },
                  { label: "Roofing", count: 1, pct: 4 },
                  { label: "Tiling", count: 1, pct: 4 },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="flex items-center gap-2">
                      <CircleDot className="h-3 w-3 text-blue-500" />
                      {item.label}
                    </span>
                    <span className="text-muted-foreground">
                      {item.count}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Resolution Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <p className="text-4xl font-bold text-emerald-600">87%</p>
                  <p className="text-sm text-muted-foreground">
                    Resolution Rate (30 days)
                  </p>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Fastest Resolution
                    </span>
                    <span className="font-medium">1 day</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Slowest Resolution
                    </span>
                    <span className="font-medium">28 days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Average Resolution
                    </span>
                    <span className="font-medium">8 days</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      Repeat Defects
                    </span>
                    <span className="font-medium text-amber-600">3</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <p className="text-sm font-medium">
                    Top Performing Contractors
                  </p>
                  {[
                    { name: "PowerGrid Electrical", avg: "4 days" },
                    { name: "Solid Foundations Ltd", avg: "6 days" },
                    { name: "AquaShield Nigeria", avg: "9 days" },
                  ].map((c) => (
                    <div
                      key={c.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{c.name}</span>
                      <span className="font-medium">{c.avg}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
