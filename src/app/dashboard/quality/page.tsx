"use client";

import React, { useState } from "react";
import {
  ClipboardCheck,
  Calendar,
  Award,
  Users,
  ChevronRight,
  Star,
  MapPin,
  Clock,
  Plus,
  Search,
  Filter,
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { formatNaira } from "@/lib/utils";

// ---------- Types ----------
interface StageInfo {
  name: string;
  status: "completed" | "current" | "pending";
}

interface Project {
  id: string;
  name: string;
  location: string;
  client: string;
  engineer: string;
  engineerInitials: string;
  qualityScore: number;
  currentStage: number;
  totalStages: number;
  nextInspection: string;
  certified: boolean;
  stages: StageInfo[];
  contractValue: number;
}

interface Inspection {
  id: string;
  project: string;
  location: string;
  engineer: string;
  engineerInitials: string;
  date: string;
  time: string;
  stage: string;
  type: string;
  status: "Confirmed" | "Pending" | "Rescheduled";
}

interface Certificate {
  id: string;
  project: string;
  location: string;
  issueDate: string;
  qualityScore: number;
  certNumber: string;
  engineer: string;
  grade: "Platinum" | "Gold" | "Silver";
}

interface Engineer {
  id: string;
  name: string;
  initials: string;
  specialization: string;
  rating: number;
  inspections: number;
  certifications: number;
  location: string;
  available: boolean;
  nextAvailable: string;
}

// ---------- Stage Names ----------
const STAGE_NAMES = [
  "Foundation",
  "Substructure",
  "DPC",
  "Block Work",
  "Lintel/Roofing",
  "MEP",
  "Finishing",
  "Handover",
];

function buildStages(currentStage: number): StageInfo[] {
  return STAGE_NAMES.map((name, i) => ({
    name,
    status:
      i < currentStage - 1
        ? "completed"
        : i === currentStage - 1
          ? "current"
          : "pending",
  }));
}

function buildCompletedStages(): StageInfo[] {
  return STAGE_NAMES.map((name) => ({ name, status: "completed" as const }));
}

// ---------- Mock Data ----------
const projects: Project[] = [
  {
    id: "PRJ-001",
    name: "Banana Island Mansion",
    location: "Banana Island, Ikoyi, Lagos",
    client: "Chief Adebayo Williams",
    engineer: "Engr. Chukwuma Obi",
    engineerInitials: "CO",
    qualityScore: 97,
    currentStage: 6,
    totalStages: 8,
    nextInspection: "2026-04-02",
    certified: false,
    stages: buildStages(6),
    contractValue: 450000000,
  },
  {
    id: "PRJ-002",
    name: "Lekki Conservation Villas",
    location: "Lekki Phase 1, Lagos",
    client: "Greenfield Developers Ltd",
    engineer: "Engr. Amina Bello",
    engineerInitials: "AB",
    qualityScore: 88,
    currentStage: 3,
    totalStages: 8,
    nextInspection: "2026-04-01",
    certified: false,
    stages: buildStages(3),
    contractValue: 280000000,
  },
  {
    id: "PRJ-003",
    name: "Eko Atlantic Penthouse",
    location: "Eko Atlantic City, Lagos",
    client: "Atlantic Residences Inc",
    engineer: "Engr. Femi Adeyemi",
    engineerInitials: "FA",
    qualityScore: 96,
    currentStage: 8,
    totalStages: 8,
    nextInspection: "-",
    certified: true,
    stages: buildCompletedStages(),
    contractValue: 720000000,
  },
  {
    id: "PRJ-004",
    name: "Jabi Lake View",
    location: "Jabi District, Abuja",
    client: "Jabi Properties Nig. Ltd",
    engineer: "Engr. Musa Ibrahim",
    engineerInitials: "MI",
    qualityScore: 91,
    currentStage: 5,
    totalStages: 8,
    nextInspection: "2026-04-03",
    certified: false,
    stages: buildStages(5),
    contractValue: 195000000,
  },
  {
    id: "PRJ-005",
    name: "GRA Ikeja Semi-Detached",
    location: "GRA Ikeja, Lagos",
    client: "Mr. & Mrs. Okonkwo",
    engineer: "Engr. Ngozi Eze",
    engineerInitials: "NE",
    qualityScore: 85,
    currentStage: 2,
    totalStages: 8,
    nextInspection: "2026-03-31",
    certified: false,
    stages: buildStages(2),
    contractValue: 120000000,
  },
  {
    id: "PRJ-006",
    name: "Maitama Executive",
    location: "Maitama District, Abuja",
    client: "Senator Abubakar Danladi",
    engineer: "Engr. Chukwuma Obi",
    engineerInitials: "CO",
    qualityScore: 93,
    currentStage: 7,
    totalStages: 8,
    nextInspection: "2026-04-05",
    certified: false,
    stages: buildStages(7),
    contractValue: 380000000,
  },
];

const inspections: Inspection[] = [
  {
    id: "INS-301",
    project: "GRA Ikeja Semi-Detached",
    location: "GRA Ikeja, Lagos",
    engineer: "Engr. Ngozi Eze",
    engineerInitials: "NE",
    date: "2026-03-31",
    time: "09:00 AM",
    stage: "Substructure",
    type: "Stage Completion",
    status: "Confirmed",
  },
  {
    id: "INS-302",
    project: "Lekki Conservation Villas",
    location: "Lekki Phase 1, Lagos",
    engineer: "Engr. Amina Bello",
    engineerInitials: "AB",
    date: "2026-04-01",
    time: "10:30 AM",
    stage: "DPC",
    type: "Stage Completion",
    status: "Confirmed",
  },
  {
    id: "INS-303",
    project: "Banana Island Mansion",
    location: "Banana Island, Ikoyi, Lagos",
    engineer: "Engr. Chukwuma Obi",
    engineerInitials: "CO",
    date: "2026-04-02",
    time: "08:00 AM",
    stage: "MEP",
    type: "Stage Completion",
    status: "Pending",
  },
  {
    id: "INS-304",
    project: "Jabi Lake View",
    location: "Jabi District, Abuja",
    engineer: "Engr. Musa Ibrahim",
    engineerInitials: "MI",
    date: "2026-04-03",
    time: "11:00 AM",
    stage: "Lintel/Roofing",
    type: "Stage Completion",
    status: "Confirmed",
  },
  {
    id: "INS-305",
    project: "Maitama Executive",
    location: "Maitama District, Abuja",
    engineer: "Engr. Chukwuma Obi",
    engineerInitials: "CO",
    date: "2026-04-05",
    time: "02:00 PM",
    stage: "Finishing",
    type: "Pre-Certification",
    status: "Rescheduled",
  },
];

const certificates: Certificate[] = [
  {
    id: "CERT-001",
    project: "Eko Atlantic Penthouse",
    location: "Eko Atlantic City, Lagos",
    issueDate: "2026-03-15",
    qualityScore: 96,
    certNumber: "BNG/QC/2026/001",
    engineer: "Engr. Femi Adeyemi",
    grade: "Platinum",
  },
  {
    id: "CERT-002",
    project: "Victoria Island Duplex",
    location: "Victoria Island, Lagos",
    issueDate: "2026-03-10",
    qualityScore: 94,
    certNumber: "BNG/QC/2026/002",
    engineer: "Engr. Amina Bello",
    grade: "Platinum",
  },
  {
    id: "CERT-003",
    project: "Asokoro Heights",
    location: "Asokoro, Abuja",
    issueDate: "2026-02-28",
    qualityScore: 89,
    certNumber: "BNG/QC/2026/003",
    engineer: "Engr. Musa Ibrahim",
    grade: "Gold",
  },
  {
    id: "CERT-004",
    project: "Lekki Gardens Estate",
    location: "Lekki Phase 2, Lagos",
    issueDate: "2026-02-20",
    qualityScore: 82,
    certNumber: "BNG/QC/2026/004",
    engineer: "Engr. Ngozi Eze",
    grade: "Silver",
  },
  {
    id: "CERT-005",
    project: "Wuse Zone 5 Office",
    location: "Wuse Zone 5, Abuja",
    issueDate: "2026-02-14",
    qualityScore: 91,
    certNumber: "BNG/QC/2026/005",
    engineer: "Engr. Chukwuma Obi",
    grade: "Gold",
  },
  {
    id: "CERT-006",
    project: "Parkview Ikoyi Terrace",
    location: "Parkview Estate, Ikoyi",
    issueDate: "2026-01-30",
    qualityScore: 97,
    certNumber: "BNG/QC/2026/006",
    engineer: "Engr. Femi Adeyemi",
    grade: "Platinum",
  },
];

const engineers: Engineer[] = [
  {
    id: "ENG-001",
    name: "Engr. Chukwuma Obi",
    initials: "CO",
    specialization: "Structural Engineering",
    rating: 4.9,
    inspections: 234,
    certifications: 18,
    location: "Lagos / Abuja",
    available: true,
    nextAvailable: "Now",
  },
  {
    id: "ENG-002",
    name: "Engr. Amina Bello",
    initials: "AB",
    specialization: "Civil Engineering",
    rating: 4.8,
    inspections: 198,
    certifications: 14,
    location: "Lagos",
    available: true,
    nextAvailable: "Now",
  },
  {
    id: "ENG-003",
    name: "Engr. Femi Adeyemi",
    initials: "FA",
    specialization: "Building Services",
    rating: 4.9,
    inspections: 312,
    certifications: 26,
    location: "Lagos",
    available: false,
    nextAvailable: "Apr 4, 2026",
  },
  {
    id: "ENG-004",
    name: "Engr. Musa Ibrahim",
    initials: "MI",
    specialization: "Structural Engineering",
    rating: 4.7,
    inspections: 176,
    certifications: 11,
    location: "Abuja",
    available: true,
    nextAvailable: "Now",
  },
  {
    id: "ENG-005",
    name: "Engr. Ngozi Eze",
    initials: "NE",
    specialization: "Quality Assurance",
    rating: 4.6,
    inspections: 145,
    certifications: 9,
    location: "Lagos",
    available: true,
    nextAvailable: "Now",
  },
  {
    id: "ENG-006",
    name: "Engr. Tunde Bakare",
    initials: "TB",
    specialization: "MEP Engineering",
    rating: 4.8,
    inspections: 203,
    certifications: 15,
    location: "Lagos / Abuja",
    available: false,
    nextAvailable: "Apr 6, 2026",
  },
];

// ---------- Helper Components ----------
function StageTracker({ stages }: { stages: StageInfo[] }) {
  return (
    <div className="flex items-center gap-1 w-full">
      {stages.map((stage, i) => (
        <div key={stage.name} className="flex items-center gap-1 flex-1">
          <div className="flex flex-col items-center flex-1 min-w-0">
            <div
              className={`w-3 h-3 rounded-full shrink-0 ${
                stage.status === "completed"
                  ? "bg-green-500"
                  : stage.status === "current"
                    ? "bg-amber-500 ring-2 ring-amber-200"
                    : "bg-gray-300"
              }`}
            />
            <span className="text-[10px] text-muted-foreground mt-1 text-center leading-tight truncate w-full">
              {stage.name}
            </span>
          </div>
          {i < stages.length - 1 && (
            <div
              className={`h-0.5 w-full mt-[-12px] ${
                stage.status === "completed" ? "bg-green-300" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function ScoreBadge({ score, certified }: { score: number; certified?: boolean }) {
  if (certified) {
    return (
      <Badge className="bg-green-600 hover:bg-green-700 text-white">
        <Award className="w-3 h-3 mr-1" />
        CERTIFIED
      </Badge>
    );
  }
  const color =
    score >= 95
      ? "bg-green-100 text-green-800 border-green-300"
      : score >= 90
        ? "bg-blue-100 text-blue-800 border-blue-300"
        : score >= 85
          ? "bg-amber-100 text-amber-800 border-amber-300"
          : "bg-red-100 text-red-800 border-red-300";
  return (
    <Badge variant="outline" className={color}>
      {score}%
    </Badge>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < Math.floor(rating)
              ? "fill-yellow-400 text-yellow-400"
              : i < rating
                ? "fill-yellow-400/50 text-yellow-400"
                : "text-gray-300"
          }`}
        />
      ))}
      <span className="text-sm font-medium ml-1">{rating.toFixed(1)}</span>
    </div>
  );
}

function GradeColor(grade: string) {
  switch (grade) {
    case "Platinum":
      return "bg-violet-100 text-violet-800 border-violet-300";
    case "Gold":
      return "bg-yellow-100 text-yellow-800 border-yellow-300";
    case "Silver":
      return "bg-gray-100 text-gray-700 border-gray-300";
    default:
      return "bg-gray-100 text-gray-700 border-gray-300";
  }
}

// ---------- Main Page ----------
export default function QualityCertificationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [scheduleDialogOpen, setScheduleDialogOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState("");
  const [selectedEngineer, setSelectedEngineer] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const filteredProjects = projects.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    {
      label: "Inspections Completed",
      value: "156",
      icon: ClipboardCheck,
      change: "+12 this month",
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      label: "Certificates Issued",
      value: "42",
      icon: Award,
      change: "+3 this month",
      color: "text-green-600",
      bg: "bg-green-50",
    },
    {
      label: "Active Projects",
      value: "23",
      icon: Calendar,
      change: "5 near completion",
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Engineers Available",
      value: "18",
      icon: Users,
      change: "4 on assignment",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Build Quality Certification
          </h1>
          <p className="text-muted-foreground">
            Manage inspections, track construction stages, and issue quality
            certificates
          </p>
        </div>
        <Dialog open={scheduleDialogOpen} onOpenChange={setScheduleDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Schedule Inspection
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Schedule New Inspection</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="project">Project</Label>
                <Select value={selectedProject} onValueChange={setSelectedProject}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                  <SelectContent>
                    {projects
                      .filter((p) => !p.certified)
                      .map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="engineer">Assigned Engineer</Label>
                <Select
                  value={selectedEngineer}
                  onValueChange={setSelectedEngineer}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select an engineer" />
                  </SelectTrigger>
                  <SelectContent>
                    {engineers.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="type">Inspection Type</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="stage">Stage Completion</SelectItem>
                    <SelectItem value="precert">Pre-Certification</SelectItem>
                    <SelectItem value="followup">Follow-up</SelectItem>
                    <SelectItem value="adhoc">Ad-hoc Inspection</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setScheduleDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button onClick={() => setScheduleDialogOpen(false)}>
                Schedule Inspection
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.change}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="projects" className="w-full">
        <TabsList>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="engineers">Engineers</TabsTrigger>
        </TabsList>

        {/* Projects Tab */}
        <TabsContent value="projects" className="mt-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search projects..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-base truncate">
                          {project.name}
                        </CardTitle>
                        <ScoreBadge
                          score={project.qualityScore}
                          certified={project.certified}
                        />
                      </div>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {project.location}
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Stage Tracker */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">
                        Stage {project.currentStage} of {project.totalStages}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {Math.round(
                          (project.currentStage / project.totalStages) * 100
                        )}
                        % complete
                      </span>
                    </div>
                    <StageTracker stages={project.stages} />
                  </div>

                  {/* Project Details */}
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t text-sm">
                    <div>
                      <p className="text-muted-foreground text-xs">Client</p>
                      <p className="font-medium truncate">{project.client}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">
                        Contract Value
                      </p>
                      <p className="font-medium">
                        {formatNaira(project.contractValue)}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-[10px]">
                          {project.engineerInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-muted-foreground text-xs">Engineer</p>
                        <p className="font-medium truncate text-xs">
                          {project.engineer}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className="text-muted-foreground text-xs">
                        Next Inspection
                      </p>
                      <p className="font-medium flex items-center gap-1 text-xs">
                        <Clock className="w-3 h-3" />
                        {project.certified ? "Completed" : project.nextInspection}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <Progress
                    value={
                      (project.currentStage / project.totalStages) * 100
                    }
                    className="h-1.5"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Schedule Tab */}
        <TabsContent value="schedule" className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Upcoming Inspections</h3>
              <p className="text-sm text-muted-foreground">
                This week&apos;s scheduled quality inspections
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setScheduleDialogOpen(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Inspection
            </Button>
          </div>
          <div className="space-y-3">
            {inspections.map((inspection) => (
              <Card key={inspection.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="flex flex-col items-center justify-center bg-muted rounded-lg p-2 min-w-[60px]">
                        <span className="text-xs text-muted-foreground">
                          {new Date(inspection.date).toLocaleDateString("en-NG", {
                            weekday: "short",
                          })}
                        </span>
                        <span className="text-lg font-bold">
                          {new Date(inspection.date).getDate()}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(inspection.date).toLocaleDateString("en-NG", {
                            month: "short",
                          })}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium truncate">
                            {inspection.project}
                          </h4>
                          <Badge
                            variant="outline"
                            className={
                              inspection.status === "Confirmed"
                                ? "bg-green-50 text-green-700 border-green-200"
                                : inspection.status === "Pending"
                                  ? "bg-amber-50 text-amber-700 border-amber-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                            }
                          >
                            {inspection.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1 mt-0.5">
                          <MapPin className="w-3 h-3" />
                          {inspection.location}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {inspection.time}
                          </span>
                          <span className="text-muted-foreground">
                            Stage: {inspection.stage}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {inspection.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="text-xs">
                            {inspection.engineerInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="hidden sm:block">
                          <p className="text-sm font-medium">
                            {inspection.engineer}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Assigned
                          </p>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Certificates Tab */}
        <TabsContent value="certificates" className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Issued Certificates</h3>
              <p className="text-sm text-muted-foreground">
                Quality certification records for completed projects
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="platinum">Platinum</SelectItem>
                  <SelectItem value="gold">Gold</SelectItem>
                  <SelectItem value="silver">Silver</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((cert) => (
              <Card key={cert.id} className="overflow-hidden">
                <div
                  className={`h-1.5 w-full ${
                    cert.grade === "Platinum"
                      ? "bg-violet-500"
                      : cert.grade === "Gold"
                        ? "bg-yellow-500"
                        : "bg-gray-400"
                  }`}
                />
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="min-w-0 flex-1">
                      <CardTitle className="text-base truncate">
                        {cert.project}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3" />
                        {cert.location}
                      </CardDescription>
                    </div>
                    <Badge variant="outline" className={GradeColor(cert.grade)}>
                      {cert.grade}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-center">
                    <div className="relative w-20 h-20 rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
                      <div className="text-center">
                        <Award className="w-6 h-6 mx-auto text-muted-foreground/50" />
                        <span className="text-[8px] text-muted-foreground/50 mt-0.5 block">
                          QR Code
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold">{cert.qualityScore}%</p>
                      <p className="text-xs text-muted-foreground">
                        Quality Score
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm border-t pt-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Cert No.</span>
                      <span className="font-mono text-xs font-medium">
                        {cert.certNumber}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Issued</span>
                      <span>{cert.issueDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Engineer</span>
                      <span className="truncate ml-2">{cert.engineer}</span>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" size="sm">
                    <Award className="w-4 h-4 mr-2" />
                    Download Certificate
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Engineers Tab */}
        <TabsContent value="engineers" className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold">Quality Engineers</h3>
              <p className="text-sm text-muted-foreground">
                Certified inspection engineers and their availability
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="All Engineers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Engineers</SelectItem>
                  <SelectItem value="available">Available Now</SelectItem>
                  <SelectItem value="lagos">Lagos Based</SelectItem>
                  <SelectItem value="abuja">Abuja Based</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {engineers.map((eng) => (
              <Card key={eng.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="text-sm font-semibold">
                        {eng.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium truncate">{eng.name}</h4>
                        <Badge
                          variant="outline"
                          className={
                            eng.available
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-600 border-gray-200"
                          }
                        >
                          {eng.available ? "Available" : "Busy"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {eng.specialization}
                      </p>
                      <StarRating rating={eng.rating} />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t">
                    <div className="text-center">
                      <p className="text-lg font-bold">{eng.inspections}</p>
                      <p className="text-[10px] text-muted-foreground">
                        Inspections
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{eng.certifications}</p>
                      <p className="text-[10px] text-muted-foreground">
                        Certifications
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold">{eng.rating}</p>
                      <p className="text-[10px] text-muted-foreground">Rating</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-3 border-t text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      {eng.location}
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      {eng.nextAvailable}
                    </div>
                  </div>

                  <Button
                    variant={eng.available ? "default" : "outline"}
                    className="w-full mt-3"
                    size="sm"
                    disabled={!eng.available}
                  >
                    {eng.available ? "Assign to Project" : "View Schedule"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
