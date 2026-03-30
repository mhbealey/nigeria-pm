"use client";

import React, { useState } from "react";
import {
  Shield,
  Plus,
  DollarSign,
  CheckCircle2,
  Clock,
  Building2,
  AlertTriangle,
  ArrowRight,
  Users,
  Eye,
  ChevronDown,
  ChevronUp,
  Banknote,
  Lock,
  Search,
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
import { Separator } from "@/components/ui/separator";
import { formatNaira } from "@/lib/utils";

// ---------- Types ----------
type MilestoneStatus =
  | "Completed"
  | "Verified"
  | "In Progress"
  | "Pending"
  | "Disputed";

type ProjectStatus =
  | "Active"
  | "Completed"
  | "In Dispute"
  | "Awaiting Verification";

interface Milestone {
  id: string;
  name: string;
  amount: number;
  status: MilestoneStatus;
  verificationDate?: string;
  verifier?: string;
}

interface EscrowProject {
  id: string;
  name: string;
  location: string;
  client: string;
  contractor: string;
  totalAmount: number;
  status: ProjectStatus;
  milestones: Milestone[];
  createdAt: string;
}

interface Transaction {
  id: string;
  projectName: string;
  milestone: string;
  amount: number;
  type: "Release" | "Deposit" | "Refund";
  timestamp: string;
  recipient: string;
}

// ---------- Mock Data ----------
const escrowProjects: EscrowProject[] = [
  {
    id: "ESC-001",
    name: "4-Bedroom Duplex, Lekki Phase 1",
    location: "Lekki Phase 1, Lagos",
    client: "Chioma Okafor",
    contractor: "Emeka Nwosu Construction Ltd",
    totalAmount: 28500000,
    status: "Active",
    createdAt: "2025-09-15",
    milestones: [
      { id: "m1", name: "Foundation & Substructure", amount: 5700000, status: "Completed", verificationDate: "2025-10-12", verifier: "Engr. Tunde Bakare" },
      { id: "m2", name: "Block Work to DPC", amount: 3420000, status: "Completed", verificationDate: "2025-11-08", verifier: "Engr. Tunde Bakare" },
      { id: "m3", name: "Block Work to Lintel", amount: 4275000, status: "Verified", verificationDate: "2025-12-20", verifier: "Engr. Tunde Bakare" },
      { id: "m4", name: "Decking & Ring Beam", amount: 5130000, status: "In Progress" },
      { id: "m5", name: "Roofing", amount: 3990000, status: "Pending" },
      { id: "m6", name: "Plastering & Finishing", amount: 3420000, status: "Pending" },
      { id: "m7", name: "Final Inspection & Handover", amount: 2565000, status: "Pending" },
    ],
  },
  {
    id: "ESC-002",
    name: "3-Storey Commercial Building, Victoria Island",
    location: "Victoria Island, Lagos",
    client: "Adebayo Williams",
    contractor: "Pinnacle Builders Nigeria",
    totalAmount: 65000000,
    status: "Active",
    createdAt: "2025-07-22",
    milestones: [
      { id: "m1", name: "Piling & Foundation", amount: 13000000, status: "Completed", verificationDate: "2025-09-05", verifier: "Arc. Ngozi Eze" },
      { id: "m2", name: "Ground Floor Structure", amount: 11050000, status: "Completed", verificationDate: "2025-10-30", verifier: "Arc. Ngozi Eze" },
      { id: "m3", name: "First Floor Structure", amount: 11050000, status: "Completed", verificationDate: "2025-12-15", verifier: "Arc. Ngozi Eze" },
      { id: "m4", name: "Second Floor & Roof", amount: 11050000, status: "Verified", verificationDate: "2026-01-28", verifier: "Arc. Ngozi Eze" },
      { id: "m5", name: "MEP Rough-in", amount: 7800000, status: "In Progress" },
      { id: "m6", name: "Finishing & Handover", amount: 11050000, status: "Pending" },
    ],
  },
  {
    id: "ESC-003",
    name: "Executive 5-Bedroom Villa, Banana Island",
    location: "Banana Island, Lagos",
    client: "Fatima Mohammed",
    contractor: "Grandeur Homes International",
    totalAmount: 120000000,
    status: "Active",
    createdAt: "2025-06-10",
    milestones: [
      { id: "m1", name: "Site Prep & Foundation", amount: 24000000, status: "Completed", verificationDate: "2025-08-20", verifier: "Engr. Olumide Adeyemi" },
      { id: "m2", name: "Substructure to DPC", amount: 18000000, status: "Completed", verificationDate: "2025-10-05", verifier: "Engr. Olumide Adeyemi" },
      { id: "m3", name: "Superstructure", amount: 24000000, status: "Completed", verificationDate: "2025-12-01", verifier: "Engr. Olumide Adeyemi" },
      { id: "m4", name: "Roofing & Waterproofing", amount: 18000000, status: "Completed", verificationDate: "2026-01-15", verifier: "Engr. Olumide Adeyemi" },
      { id: "m5", name: "MEP Installation", amount: 15600000, status: "In Progress" },
      { id: "m6", name: "Interior Finishing", amount: 12000000, status: "Pending" },
      { id: "m7", name: "Landscaping & Handover", amount: 8400000, status: "Pending" },
    ],
  },
  {
    id: "ESC-004",
    name: "Residential Estate (10 Units), Ajah",
    location: "Ajah, Lagos",
    client: "Oceanic Properties Ltd",
    contractor: "Bolaji & Sons Construction",
    totalAmount: 85000000,
    status: "Awaiting Verification",
    createdAt: "2025-04-18",
    milestones: [
      { id: "m1", name: "Land Clearing & Foundation", amount: 17000000, status: "Completed", verificationDate: "2025-06-28", verifier: "QS Adaeze Obi" },
      { id: "m2", name: "Block Work All Units", amount: 14450000, status: "Completed", verificationDate: "2025-09-10", verifier: "QS Adaeze Obi" },
      { id: "m3", name: "Roofing All Units", amount: 12750000, status: "Completed", verificationDate: "2025-11-22", verifier: "QS Adaeze Obi" },
      { id: "m4", name: "Plastering & Screeding", amount: 11900000, status: "Completed", verificationDate: "2026-01-05", verifier: "QS Adaeze Obi" },
      { id: "m5", name: "Electrical & Plumbing", amount: 11900000, status: "Verified", verificationDate: "2026-02-18", verifier: "QS Adaeze Obi" },
      { id: "m6", name: "Painting & Tiling", amount: 10200000, status: "In Progress" },
      { id: "m7", name: "External Works & Handover", amount: 6800000, status: "Pending" },
    ],
  },
  {
    id: "ESC-005",
    name: "Warehouse Complex, GRA Ikeja",
    location: "GRA Ikeja, Lagos",
    client: "Kelechi Uba",
    contractor: "Steelcraft Engineering Ltd",
    totalAmount: 42000000,
    status: "Completed",
    createdAt: "2025-01-20",
    milestones: [
      { id: "m1", name: "Foundation & Ground Beams", amount: 8400000, status: "Completed", verificationDate: "2025-03-15", verifier: "Engr. Hassan Musa" },
      { id: "m2", name: "Steel Structure Erection", amount: 12600000, status: "Completed", verificationDate: "2025-05-20", verifier: "Engr. Hassan Musa" },
      { id: "m3", name: "Roofing & Cladding", amount: 8400000, status: "Completed", verificationDate: "2025-07-10", verifier: "Engr. Hassan Musa" },
      { id: "m4", name: "Floor & Utilities", amount: 6300000, status: "Completed", verificationDate: "2025-08-28", verifier: "Engr. Hassan Musa" },
      { id: "m5", name: "Final Finishing & Handover", amount: 6300000, status: "Completed", verificationDate: "2025-10-05", verifier: "Engr. Hassan Musa" },
    ],
  },
  {
    id: "ESC-006",
    name: "Luxury Penthouse, Ikoyi",
    location: "Ikoyi, Lagos",
    client: "Amara Eze-Okonkwo",
    contractor: "Premier Interiors & Build",
    totalAmount: 55000000,
    status: "In Dispute",
    createdAt: "2025-05-05",
    milestones: [
      { id: "m1", name: "Interior Demolition & Prep", amount: 5500000, status: "Completed", verificationDate: "2025-06-15", verifier: "Arc. Yemi Solade" },
      { id: "m2", name: "Structural Modifications", amount: 11000000, status: "Completed", verificationDate: "2025-08-01", verifier: "Arc. Yemi Solade" },
      { id: "m3", name: "MEP Refit", amount: 13750000, status: "Completed", verificationDate: "2025-10-20", verifier: "Arc. Yemi Solade" },
      { id: "m4", name: "Luxury Finishing & Fit-out", amount: 16500000, status: "Disputed" },
      { id: "m5", name: "Snagging & Handover", amount: 8250000, status: "Pending" },
    ],
  },
  {
    id: "ESC-007",
    name: "Office Complex, Jabi District",
    location: "Jabi, Abuja",
    client: "Ibrahim Danjuma",
    contractor: "Abuja Premier Contractors",
    totalAmount: 38000000,
    status: "Active",
    createdAt: "2025-08-01",
    milestones: [
      { id: "m1", name: "Foundation Works", amount: 7600000, status: "Completed", verificationDate: "2025-10-05", verifier: "Engr. Bala Suleiman" },
      { id: "m2", name: "Superstructure", amount: 9500000, status: "Completed", verificationDate: "2025-12-18", verifier: "Engr. Bala Suleiman" },
      { id: "m3", name: "Roofing", amount: 5700000, status: "In Progress" },
      { id: "m4", name: "MEP Installation", amount: 6460000, status: "Pending" },
      { id: "m5", name: "Finishing", amount: 5320000, status: "Pending" },
      { id: "m6", name: "Handover", amount: 3420000, status: "Pending" },
    ],
  },
  {
    id: "ESC-008",
    name: "Diplomat Residence, Maitama",
    location: "Maitama, Abuja",
    client: "Aisha Bello-Kano",
    contractor: "Northern Crown Builders",
    totalAmount: 72000000,
    status: "Completed",
    createdAt: "2024-11-10",
    milestones: [
      { id: "m1", name: "Foundation & Basement", amount: 14400000, status: "Completed", verificationDate: "2025-01-20", verifier: "Arc. Funke Adeniyi" },
      { id: "m2", name: "Superstructure", amount: 15840000, status: "Completed", verificationDate: "2025-04-10", verifier: "Arc. Funke Adeniyi" },
      { id: "m3", name: "Roofing & External", amount: 10800000, status: "Completed", verificationDate: "2025-06-25", verifier: "Arc. Funke Adeniyi" },
      { id: "m4", name: "MEP & Smart Home", amount: 12960000, status: "Completed", verificationDate: "2025-08-30", verifier: "Arc. Funke Adeniyi" },
      { id: "m5", name: "Interior Finishing", amount: 10800000, status: "Completed", verificationDate: "2025-10-28", verifier: "Arc. Funke Adeniyi" },
      { id: "m6", name: "Landscaping & Handover", amount: 7200000, status: "Completed", verificationDate: "2025-12-15", verifier: "Arc. Funke Adeniyi" },
    ],
  },
];

const recentTransactions: Transaction[] = [
  { id: "TXN-001", projectName: "Executive 5-Bedroom Villa", milestone: "Roofing & Waterproofing", amount: 18000000, type: "Release", timestamp: "2026-01-15 14:32", recipient: "Grandeur Homes International" },
  { id: "TXN-002", projectName: "3-Storey Commercial Building", milestone: "Second Floor & Roof", amount: 11050000, type: "Release", timestamp: "2026-01-28 09:15", recipient: "Pinnacle Builders Nigeria" },
  { id: "TXN-003", projectName: "Office Complex, Jabi", milestone: "Superstructure", amount: 9500000, type: "Release", timestamp: "2025-12-18 16:45", recipient: "Abuja Premier Contractors" },
  { id: "TXN-004", projectName: "Residential Estate, Ajah", milestone: "Plastering & Screeding", amount: 11900000, type: "Release", timestamp: "2026-01-05 11:20", recipient: "Bolaji & Sons Construction" },
  { id: "TXN-005", projectName: "4-Bedroom Duplex, Lekki", milestone: "Block Work to Lintel", amount: 4275000, type: "Release", timestamp: "2025-12-20 10:05", recipient: "Emeka Nwosu Construction Ltd" },
  { id: "TXN-006", projectName: "Diplomat Residence", milestone: "Landscaping & Handover", amount: 7200000, type: "Release", timestamp: "2025-12-15 15:30", recipient: "Northern Crown Builders" },
  { id: "TXN-007", projectName: "Warehouse Complex, GRA Ikeja", milestone: "Final Finishing & Handover", amount: 6300000, type: "Release", timestamp: "2025-10-05 12:00", recipient: "Steelcraft Engineering Ltd" },
  { id: "TXN-008", projectName: "Luxury Penthouse, Ikoyi", milestone: "Deposit", amount: 55000000, type: "Deposit", timestamp: "2025-05-05 09:00", recipient: "Escrow Wallet" },
];

// ---------- Helpers ----------
function getStatusBadgeVariant(status: ProjectStatus) {
  switch (status) {
    case "Active":
      return "default" as const;
    case "Completed":
      return "success" as const;
    case "In Dispute":
      return "destructive" as const;
    case "Awaiting Verification":
      return "warning" as const;
    default:
      return "secondary" as const;
  }
}

function getMilestoneStatusColor(status: MilestoneStatus) {
  switch (status) {
    case "Completed":
      return "bg-emerald-100 text-emerald-800";
    case "Verified":
      return "bg-blue-100 text-blue-800";
    case "In Progress":
      return "bg-amber-100 text-amber-800";
    case "Pending":
      return "bg-gray-100 text-gray-600";
    case "Disputed":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

function getCompletedCount(milestones: Milestone[]) {
  return milestones.filter(
    (m) => m.status === "Completed" || m.status === "Verified"
  ).length;
}

function getProgressPercent(milestones: Milestone[]) {
  return Math.round((getCompletedCount(milestones) / milestones.length) * 100);
}

// ---------- Components ----------
function StatCard({
  title,
  value,
  icon: Icon,
  description,
  iconBg,
}: {
  title: string;
  value: string;
  icon: React.ElementType;
  description?: string;
  iconBg: string;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {description && (
              <p className="text-xs text-gray-400">{description}</p>
            )}
          </div>
          <div className={`rounded-full p-3 ${iconBg}`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectCard({
  project,
  expanded,
  onToggle,
}: {
  project: EscrowProject;
  expanded: boolean;
  onToggle: () => void;
}) {
  const completed = getCompletedCount(project.milestones);
  const total = project.milestones.length;
  const progress = getProgressPercent(project.milestones);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <CardTitle className="text-lg">{project.name}</CardTitle>
              <Badge variant={getStatusBadgeVariant(project.status)}>
                {project.status}
              </Badge>
            </div>
            <CardDescription>{project.location}</CardDescription>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-emerald-700">
              {formatNaira(project.totalAmount)}
            </p>
            <p className="text-xs text-gray-400">Total Escrowed</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-gray-400" />
            <span>
              <span className="font-medium">Client:</span> {project.client}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Building2 className="h-4 w-4 text-gray-400" />
            <span>
              <span className="font-medium">Contractor:</span>{" "}
              {project.contractor}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">
              Milestones: {completed}/{total} completed
            </span>
            <span className="font-medium text-emerald-700">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onToggle}
            className="gap-1"
          >
            {expanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
            {expanded ? "Hide" : "View"} Milestones
          </Button>
          {project.status === "Active" && (
            <>
              <Button size="sm" className="gap-1">
                <CheckCircle2 className="h-4 w-4" />
                Release Funds
              </Button>
              <Button variant="destructive" size="sm" className="gap-1">
                <AlertTriangle className="h-4 w-4" />
                Raise Dispute
              </Button>
            </>
          )}
          {project.status === "Awaiting Verification" && (
            <Button size="sm" className="gap-1">
              <Eye className="h-4 w-4" />
              Verify & Release
            </Button>
          )}
        </div>

        {expanded && (
          <div className="mt-4 rounded-lg border border-gray-200">
            <div className="grid grid-cols-12 gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2.5 text-xs font-medium text-gray-500">
              <div className="col-span-4">Milestone</div>
              <div className="col-span-2 text-right">Amount</div>
              <div className="col-span-2 text-center">Status</div>
              <div className="col-span-2 text-center">Verified</div>
              <div className="col-span-2">Verifier</div>
            </div>
            {project.milestones.map((milestone) => (
              <div
                key={milestone.id}
                className="grid grid-cols-12 items-center gap-2 border-b border-gray-100 px-4 py-3 text-sm last:border-b-0"
              >
                <div className="col-span-4 font-medium text-gray-800">
                  {milestone.name}
                </div>
                <div className="col-span-2 text-right text-gray-700">
                  {formatNaira(milestone.amount)}
                </div>
                <div className="col-span-2 text-center">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${getMilestoneStatusColor(
                      milestone.status
                    )}`}
                  >
                    {milestone.status}
                  </span>
                </div>
                <div className="col-span-2 text-center text-xs text-gray-500">
                  {milestone.verificationDate ?? "--"}
                </div>
                <div className="col-span-2 text-xs text-gray-500">
                  {milestone.verifier ?? "--"}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ---------- Page ----------
export default function EscrowPage() {
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(
    new Set()
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [milestoneCount, setMilestoneCount] = useState(5);
  const [searchQuery, setSearchQuery] = useState("");

  function toggleProject(id: string) {
    setExpandedProjects((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function filterProjects(status?: ProjectStatus) {
    let filtered = escrowProjects;
    if (status) {
      filtered = filtered.filter((p) => p.status === status);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.client.toLowerCase().includes(q) ||
          p.contractor.toLowerCase().includes(q) ||
          p.location.toLowerCase().includes(q)
      );
    }
    return filtered;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="flex items-center gap-2 text-3xl font-bold text-gray-900">
              <Shield className="h-8 w-8 text-emerald-600" />
              Construction Escrow
            </h1>
            <p className="mt-1 text-gray-500">
              Secure milestone-based payments for your projects
            </p>
          </div>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="gap-2">
                <Plus className="h-5 w-5" />
                Create Escrow Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create Escrow Project</DialogTitle>
                <DialogDescription>
                  Set up a new milestone-based escrow for your construction
                  project. Funds are released only after independent
                  verification.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="project-name">Project Name</Label>
                  <Input
                    id="project-name"
                    placeholder="e.g., 4-Bedroom Duplex, Lekki Phase 1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="client-name">Client Name</Label>
                    <Input id="client-name" placeholder="Full name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="client-email">Client Email</Label>
                    <Input
                      id="client-email"
                      type="email"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contractor-name">Contractor Name</Label>
                    <Input
                      id="contractor-name"
                      placeholder="Company or individual"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contractor-email">Contractor Email</Label>
                    <Input
                      id="contractor-email"
                      type="email"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="total-amount">Total Amount (₦)</Label>
                    <Input
                      id="total-amount"
                      type="number"
                      placeholder="e.g., 25000000"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="milestone-count">
                      Number of Milestones
                    </Label>
                    <Select
                      value={String(milestoneCount)}
                      onValueChange={(v) => setMilestoneCount(Number(v))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                          <SelectItem key={n} value={String(n)}>
                            {n} milestones
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <Label>Milestone Breakdown</Label>
                  {Array.from({ length: milestoneCount }).map((_, i) => (
                    <div key={i} className="grid grid-cols-5 gap-3 items-end">
                      <div className="col-span-3">
                        <Label className="text-xs text-gray-400">
                          Milestone {i + 1}
                        </Label>
                        <Input
                          placeholder={
                            i === 0
                              ? "Foundation & Substructure"
                              : i === milestoneCount - 1
                              ? "Final Inspection & Handover"
                              : `Milestone ${i + 1} name`
                          }
                        />
                      </div>
                      <div className="col-span-2">
                        <Label className="text-xs text-gray-400">
                          Amount (₦)
                        </Label>
                        <Input type="number" placeholder="0" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <DialogFooter>
                <Button
                  variant="outline"
                  onClick={() => setDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  className="gap-1"
                  onClick={() => setDialogOpen(false)}
                >
                  <Lock className="h-4 w-4" />
                  Create & Fund Escrow
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Row */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Escrowed"
            value={formatNaira(125400000)}
            icon={Lock}
            description="Across all active projects"
            iconBg="bg-emerald-600"
          />
          <StatCard
            title="Released to Contractors"
            value={formatNaira(78200000)}
            icon={Banknote}
            description="Successfully verified & paid"
            iconBg="bg-blue-600"
          />
          <StatCard
            title="Pending Verification"
            value={formatNaira(32500000)}
            icon={Clock}
            description="Awaiting inspector sign-off"
            iconBg="bg-amber-500"
          />
          <StatCard
            title="Active Projects"
            value="8"
            icon={Building2}
            description="4 Lagos, 2 Abuja, 2 Others"
            iconBg="bg-purple-600"
          />
        </div>

        {/* Main Content */}
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          {/* Project Tabs */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search projects, clients, or contractors..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">
                  All Projects ({escrowProjects.length})
                </TabsTrigger>
                <TabsTrigger value="active">
                  Active (
                  {
                    escrowProjects.filter((p) => p.status === "Active").length
                  }
                  )
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed (
                  {
                    escrowProjects.filter((p) => p.status === "Completed")
                      .length
                  }
                  )
                </TabsTrigger>
                <TabsTrigger value="disputed">
                  Disputed (
                  {
                    escrowProjects.filter((p) => p.status === "In Dispute")
                      .length
                  }
                  )
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="mt-4 space-y-4">
                {filterProjects().map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    expanded={expandedProjects.has(project.id)}
                    onToggle={() => toggleProject(project.id)}
                  />
                ))}
              </TabsContent>
              <TabsContent value="active" className="mt-4 space-y-4">
                {filterProjects("Active").map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    expanded={expandedProjects.has(project.id)}
                    onToggle={() => toggleProject(project.id)}
                  />
                ))}
              </TabsContent>
              <TabsContent value="completed" className="mt-4 space-y-4">
                {filterProjects("Completed").map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    expanded={expandedProjects.has(project.id)}
                    onToggle={() => toggleProject(project.id)}
                  />
                ))}
              </TabsContent>
              <TabsContent value="disputed" className="mt-4 space-y-4">
                {filterProjects("In Dispute").map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    expanded={expandedProjects.has(project.id)}
                    onToggle={() => toggleProject(project.id)}
                  />
                ))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Transactions Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Banknote className="h-5 w-5 text-emerald-600" />
                  Recent Transactions
                </CardTitle>
                <CardDescription>Latest fund movements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentTransactions.map((txn) => (
                  <div key={txn.id} className="space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-gray-800">
                          {txn.projectName}
                        </p>
                        <p className="truncate text-xs text-gray-500">
                          {txn.milestone}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p
                          className={`text-sm font-semibold ${
                            txn.type === "Release"
                              ? "text-emerald-600"
                              : txn.type === "Deposit"
                              ? "text-blue-600"
                              : "text-red-600"
                          }`}
                        >
                          {txn.type === "Deposit" ? "+" : "-"}
                          {formatNaira(txn.amount)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {txn.recipient}
                      </span>
                      <Badge
                        variant={
                          txn.type === "Release"
                            ? "success"
                            : txn.type === "Deposit"
                            ? "secondary"
                            : "destructive"
                        }
                        className="text-[10px]"
                      >
                        {txn.type}
                      </Badge>
                    </div>
                    <p className="text-[10px] text-gray-400">
                      {txn.timestamp}
                    </p>
                    <Separator className="mt-2" />
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="ghost" className="w-full gap-1 text-sm">
                  View All Transactions
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
