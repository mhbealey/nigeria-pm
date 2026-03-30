"use client";

import React, { useState } from "react";
import {
  FileCheck,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Building2,
  ChevronRight,
  Search,
  Shield,
  Calculator,
  Headphones,
  FileText,
  MapPin,
  Calendar,
  Eye,
  Upload,
  ArrowRight,
  Star,
  Zap,
  Crown,
  Info,
  CircleDot,
  Check,
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { formatNaira } from "@/lib/utils";

// ---------- Types ----------
type PermitStatus =
  | "Draft"
  | "Under Review"
  | "Documents Requested"
  | "Processing"
  | "Inspection Scheduled"
  | "Approved"
  | "Rejected";

interface PermitApplication {
  id: string;
  title: string;
  agency: string;
  currentStage: number;
  totalStages: number;
  status: PermitStatus;
  daysElapsed: number;
  location: string;
  submittedDate: string;
  lastUpdate: string;
}

// ---------- Data ----------
const applications: PermitApplication[] = [
  {
    id: "PRM-001",
    title: "Building Plan Approval - Lekki",
    agency: "LASBCA",
    currentStage: 4,
    totalStages: 7,
    status: "Under Review",
    daysElapsed: 32,
    location: "Lekki Phase 1, Lagos",
    submittedDate: "2026-02-26",
    lastUpdate: "2026-03-28",
  },
  {
    id: "PRM-002",
    title: "Environmental Impact - Banana Island",
    agency: "LASEPA",
    currentStage: 2,
    totalStages: 5,
    status: "Documents Requested",
    daysElapsed: 18,
    location: "Banana Island, Lagos",
    submittedDate: "2026-03-12",
    lastUpdate: "2026-03-27",
  },
  {
    id: "PRM-003",
    title: "Foundation Permit - Jabi",
    agency: "FCDA",
    currentStage: 6,
    totalStages: 7,
    status: "Inspection Scheduled",
    daysElapsed: 55,
    location: "Jabi District, Abuja",
    submittedDate: "2026-02-03",
    lastUpdate: "2026-03-29",
  },
  {
    id: "PRM-004",
    title: "C of O - Maitama",
    agency: "AGIS",
    currentStage: 3,
    totalStages: 8,
    status: "Processing",
    daysElapsed: 41,
    location: "Maitama, Abuja",
    submittedDate: "2026-02-17",
    lastUpdate: "2026-03-25",
  },
  {
    id: "PRM-005",
    title: "Development Permit - GRA Ikeja",
    agency: "LASBCA",
    currentStage: 7,
    totalStages: 7,
    status: "Approved",
    daysElapsed: 67,
    location: "GRA Ikeja, Lagos",
    submittedDate: "2026-01-22",
    lastUpdate: "2026-03-30",
  },
  {
    id: "PRM-006",
    title: "Renovation Permit - VI",
    agency: "LASBCA",
    currentStage: 1,
    totalStages: 7,
    status: "Draft",
    daysElapsed: 3,
    location: "Victoria Island, Lagos",
    submittedDate: "2026-03-27",
    lastUpdate: "2026-03-27",
  },
];

const stateRequirements: Record<
  string,
  {
    permitType: string;
    documents: string[];
  }[]
> = {
  Lagos: [
    {
      permitType: "Building Plan Approval",
      documents: [
        "Architectural drawings (6 copies)",
        "Structural drawings (6 copies)",
        "Mechanical & Electrical drawings",
        "Survey plan (not older than 5 years)",
        "Certificate of Occupancy (C of O) or equivalent",
        "Tax clearance certificate",
        "Environmental Impact Assessment",
        "Fire safety compliance certificate",
        "LASBCA application form",
        "Evidence of land ownership",
      ],
    },
    {
      permitType: "Development Permit",
      documents: [
        "Site analysis report",
        "Development proposal document",
        "Traffic Impact Assessment",
        "Neighbourhood consent (where applicable)",
        "Geotechnical investigation report",
        "LASURA approval",
        "Drainage plan",
        "Landscaping plan",
      ],
    },
    {
      permitType: "Renovation Permit",
      documents: [
        "Existing building plans",
        "Proposed modification drawings",
        "Structural integrity report",
        "Consent from original architect",
        "Evidence of ownership / lease",
        "Neighbours' consent letter",
      ],
    },
  ],
  Abuja: [
    {
      permitType: "Building Plan Approval (FCDA)",
      documents: [
        "Right of Occupancy (R of O)",
        "Architectural drawings (5 copies)",
        "Structural drawings (5 copies)",
        "Land allocation letter",
        "AGIS confirmation",
        "Environmental Impact Assessment",
        "Soil test report",
        "Fire safety plan",
      ],
    },
    {
      permitType: "Certificate of Occupancy",
      documents: [
        "Letter of allocation / offer",
        "Survey plan from registered surveyor",
        "Passport photographs (4)",
        "Completed application form",
        "Evidence of development levy payment",
        "Ground rent receipts",
        "Tax clearance certificate (3 years)",
        "Evidence of Nigerian citizenship or company registration",
      ],
    },
  ],
  "Rivers State": [
    {
      permitType: "Building Permit (RSMHUD)",
      documents: [
        "Architectural drawings (4 copies)",
        "Structural drawings (4 copies)",
        "Certificate of Occupancy / Land receipt",
        "Environmental Impact Assessment",
        "Tax clearance certificate",
        "Application form from Ministry",
        "Evidence of payment of processing fees",
      ],
    },
  ],
};

const conciergeTiers = [
  {
    name: "Basic",
    price: 100000,
    icon: Star,
    color: "text-blue-600",
    bg: "bg-blue-50",
    border: "border-blue-200",
    features: [
      "Document checklist preparation",
      "Application form pre-filling",
      "Submission tracking dashboard",
      "Email status updates",
      "Standard processing timeline",
    ],
  },
  {
    name: "Standard",
    price: 300000,
    icon: Zap,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    popular: true,
    features: [
      "Everything in Basic",
      "Dedicated permit officer liaison",
      "Document review & correction",
      "Priority queue where available",
      "Weekly progress calls",
      "Inspection scheduling assistance",
      "Up to 2 permit applications",
    ],
  },
  {
    name: "Premium",
    price: 500000,
    icon: Crown,
    color: "text-amber-600",
    bg: "bg-amber-50",
    border: "border-amber-200",
    features: [
      "Everything in Standard",
      "End-to-end permit management",
      "In-person submission & follow-up",
      "Expedited processing liaison",
      "24/7 WhatsApp support",
      "Regulatory compliance audit",
      "Unlimited permit applications",
      "Post-approval compliance support",
    ],
  },
];

function getStatusBadge(status: PermitStatus) {
  const variants: Record<PermitStatus, string> = {
    Draft: "bg-gray-100 text-gray-700",
    "Under Review": "bg-blue-100 text-blue-700",
    "Documents Requested": "bg-amber-100 text-amber-700",
    Processing: "bg-purple-100 text-purple-700",
    "Inspection Scheduled": "bg-cyan-100 text-cyan-700",
    Approved: "bg-emerald-100 text-emerald-700",
    Rejected: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${variants[status]}`}
    >
      {status === "Approved" && <Check className="h-3 w-3" />}
      {status === "Documents Requested" && (
        <AlertTriangle className="h-3 w-3" />
      )}
      {status === "Inspection Scheduled" && <Eye className="h-3 w-3" />}
      {status}
    </span>
  );
}

function StageProgress({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  const stages = Array.from({ length: total }, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-1">
      {stages.map((stage) => (
        <div
          key={stage}
          className={`h-2 flex-1 rounded-full ${
            stage < current
              ? "bg-emerald-500"
              : stage === current
                ? "bg-blue-500"
                : "bg-gray-200"
          }`}
        />
      ))}
      <span className="ml-2 text-xs text-muted-foreground">
        {current}/{total}
      </span>
    </div>
  );
}

// ---------- Component ----------
export default function PermitsPage() {
  const [selectedState, setSelectedState] = useState("Lagos");
  const [calcState, setCalcState] = useState("Lagos");
  const [calcPlotSize, setCalcPlotSize] = useState("500");
  const [calcFloors, setCalcFloors] = useState("2");
  const [calcType, setCalcType] = useState("residential");

  const plotSize = parseInt(calcPlotSize) || 0;
  const floors = parseInt(calcFloors) || 0;
  const baseFee = calcState === "Abuja" ? 150000 : 100000;
  const plotFee = plotSize * 200;
  const floorFee = floors * 50000;
  const typeMult = calcType === "commercial" ? 1.5 : calcType === "industrial" ? 2.0 : 1.0;
  const envFee = plotSize > 1000 ? 250000 : 75000;
  const subtotal = (baseFee + plotFee + floorFee) * typeMult;
  const consultancyFee = subtotal * 0.1;
  const totalFee = subtotal + envFee + consultancyFee;

  const stats = [
    {
      label: "Active Applications",
      value: "14",
      icon: FileCheck,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Approved This Month",
      value: "6",
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Avg Processing",
      value: "45 days",
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Compliance",
      value: "94%",
      icon: Shield,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Permit Navigator
          </h1>
          <p className="text-muted-foreground">
            Track applications, requirements, and fees across Nigerian states
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Start New Application
        </Button>
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
      <Tabs defaultValue="applications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="applications" className="gap-2">
            <FileText className="h-4 w-4" />
            My Applications
          </TabsTrigger>
          <TabsTrigger value="requirements" className="gap-2">
            <FileCheck className="h-4 w-4" />
            Requirements
          </TabsTrigger>
          <TabsTrigger value="calculator" className="gap-2">
            <Calculator className="h-4 w-4" />
            Fee Calculator
          </TabsTrigger>
          <TabsTrigger value="concierge" className="gap-2">
            <Headphones className="h-4 w-4" />
            Concierge
          </TabsTrigger>
        </TabsList>

        {/* My Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search applications..." className="pl-9" />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="review">Under Review</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4">
            {applications.map((app) => (
              <Card
                key={app.id}
                className={
                  app.status === "Approved"
                    ? "border-emerald-200 bg-emerald-50/30"
                    : app.status === "Documents Requested"
                      ? "border-amber-200 bg-amber-50/30"
                      : ""
                }
              >
                <CardContent className="p-5">
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-start gap-3">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold">{app.title}</h3>
                            {getStatusBadge(app.status)}
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Building2 className="h-3.5 w-3.5" />
                              {app.agency}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {app.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              Submitted {app.submittedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="max-w-md">
                        <StageProgress
                          current={app.currentStage}
                          total={app.totalStages}
                        />
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">
                          Days Elapsed
                        </p>
                        <p
                          className={`text-lg font-semibold ${
                            app.daysElapsed > 50
                              ? "text-red-600"
                              : app.daysElapsed > 30
                                ? "text-amber-600"
                                : "text-gray-900"
                          }`}
                        >
                          {app.daysElapsed}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-1">
                        View <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Requirements Tab */}
        <TabsContent value="requirements" className="space-y-4">
          <div className="flex items-center gap-3">
            <Label className="font-medium">Select State:</Label>
            <Select
              value={selectedState}
              onValueChange={setSelectedState}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Lagos">Lagos</SelectItem>
                <SelectItem value="Abuja">Abuja (FCT)</SelectItem>
                <SelectItem value="Rivers State">Rivers State</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {(stateRequirements[selectedState] || []).map((req) => (
              <Card key={req.permitType}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <FileText className="h-5 w-5 text-blue-600" />
                    {req.permitType}
                  </CardTitle>
                  <CardDescription>
                    {req.documents.length} documents required
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {req.documents.map((doc, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CircleDot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                        {doc}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="gap-2">
                    <Upload className="h-4 w-4" />
                    Start Application
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Fee Calculator Tab */}
        <TabsContent value="calculator" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">
                  Permit Fee Estimator
                </CardTitle>
                <CardDescription>
                  Estimate fees based on your project details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>State</Label>
                  <Select value={calcState} onValueChange={setCalcState}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Lagos">Lagos</SelectItem>
                      <SelectItem value="Abuja">Abuja (FCT)</SelectItem>
                      <SelectItem value="Rivers">Rivers State</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Plot Size (sqm)</Label>
                  <Input
                    type="number"
                    value={calcPlotSize}
                    onChange={(e) => setCalcPlotSize(e.target.value)}
                    placeholder="e.g. 500"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Number of Floors</Label>
                  <Input
                    type="number"
                    value={calcFloors}
                    onChange={(e) => setCalcFloors(e.target.value)}
                    placeholder="e.g. 2"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Building Type</Label>
                  <Select value={calcType} onValueChange={setCalcType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Fee Breakdown</CardTitle>
                <CardDescription>
                  Estimated fees for {calcState} &mdash;{" "}
                  {calcType.charAt(0).toUpperCase() + calcType.slice(1)}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Base application fee
                  </span>
                  <span className="font-medium">{formatNaira(baseFee)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Plot assessment ({plotSize} sqm x {formatNaira(200)}/sqm)
                  </span>
                  <span className="font-medium">{formatNaira(plotFee)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Floor levy ({floors} floor{floors !== 1 ? "s" : ""} x{" "}
                    {formatNaira(50000)})
                  </span>
                  <span className="font-medium">{formatNaira(floorFee)}</span>
                </div>
                <Separator />
                {typeMult > 1 && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        {calcType.charAt(0).toUpperCase() + calcType.slice(1)}{" "}
                        surcharge ({((typeMult - 1) * 100).toFixed(0)}%)
                      </span>
                      <span className="font-medium">
                        {formatNaira(subtotal - (baseFee + plotFee + floorFee))}
                      </span>
                    </div>
                    <Separator />
                  </>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Environmental assessment fee
                  </span>
                  <span className="font-medium">{formatNaira(envFee)}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    Consultancy fee (10%)
                  </span>
                  <span className="font-medium">
                    {formatNaira(consultancyFee)}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between pt-2">
                  <span className="font-semibold">Estimated Total</span>
                  <span className="text-xl font-bold text-emerald-600">
                    {formatNaira(totalFee)}
                  </span>
                </div>
                <div className="flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
                  <Info className="mt-0.5 h-4 w-4 shrink-0" />
                  <p>
                    This is an estimate only. Actual fees may vary based on
                    specific LGA requirements, zoning, and current government
                    schedules. Contact your local planning authority for exact
                    figures.
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Proceed to Application
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Concierge Tab */}
        <TabsContent value="concierge" className="space-y-4">
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Permit Concierge Service
            </h2>
            <p className="text-sm text-muted-foreground">
              Let our expert team handle the permit process for you. We
              navigate the bureaucracy so you can focus on building.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {conciergeTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`relative ${
                  tier.popular ? `border-2 ${tier.border}` : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-emerald-600 text-white">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto mb-2 rounded-full p-3 ${tier.bg}`}
                  >
                    <tier.icon className={`h-6 w-6 ${tier.color}`} />
                  </div>
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-bold">
                      {formatNaira(tier.price)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {" "}
                      / application
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${tier.color}`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={tier.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
