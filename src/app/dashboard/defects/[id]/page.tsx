"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  AlertTriangle,
  Camera,
  Clock,
  CheckCircle2,
  MapPin,
  Home,
  User,
  Phone,
  Mail,
  Send,
  Upload,
  Wrench,
  Shield,
  CalendarDays,
  MessageSquare,
  Star,
  AlertCircle,
  FileText,
  ExternalLink,
  ChevronRight,
  ImageIcon,
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

// ---------- Types ----------
interface TimelineEvent {
  day: number;
  date: string;
  title: string;
  description: string;
  actor: string;
  status: "completed" | "current" | "upcoming";
}

interface Message {
  id: number;
  sender: string;
  role: "homeowner" | "management" | "contractor";
  message: string;
  timestamp: string;
  avatar: string;
}

interface SimilarDefect {
  id: string;
  unit: string;
  estate: string;
  description: string;
  status: string;
  reportedDate: string;
}

interface PhotoEvidence {
  id: number;
  description: string;
  takenBy: string;
  date: string;
}

// ---------- Mock Data ----------
const defect = {
  id: "DEF-2024-0089",
  title: "Roof Leak - Master Bedroom, Unit 7",
  property: "Unit 7, Royal Gardens Estate, Lekki",
  location: "Master Bedroom Ceiling",
  category: "Roofing / Waterproofing",
  priority: "Critical" as const,
  status: "In Progress" as const,
  reportedDate: "2026-03-23",
  reportedBy: "Mr. Ogundimu",
  reporterRole: "Homeowner",
  reporterPhone: "+234 803 456 7890",
  reporterEmail: "ogundimu@email.com",
  description:
    "Water drips from ceiling during heavy rain, concentrated near the corner where the roof meets the external wall. Staining visible on POP ceiling. Issue started approximately 2 weeks after handover.",
  estimatedCost: 185000,
};

const photoEvidence: PhotoEvidence[] = [
  {
    id: 1,
    description: "Water stain on POP ceiling",
    takenBy: "Mr. Ogundimu",
    date: "2026-03-23",
  },
  {
    id: 2,
    description: "Close-up of drip point",
    takenBy: "Mr. Ogundimu",
    date: "2026-03-23",
  },
  {
    id: 3,
    description: "External roof junction",
    takenBy: "Adebayo Construction",
    date: "2026-03-28",
  },
  {
    id: 4,
    description: "Affected area marked",
    takenBy: "Adebayo Construction",
    date: "2026-03-28",
  },
];

const timeline: TimelineEvent[] = [
  {
    day: 0,
    date: "23 Mar 2026",
    title: "Defect Reported",
    description: "Defect reported by homeowner via BuildNG app",
    actor: "Mr. Ogundimu",
    status: "completed",
  },
  {
    day: 1,
    date: "24 Mar 2026",
    title: "Acknowledged",
    description: "Acknowledged by Royal Gardens estate management",
    actor: "Estate Management",
    status: "completed",
  },
  {
    day: 2,
    date: "25 Mar 2026",
    title: "Contractor Assigned",
    description:
      "Assigned to Adebayo Construction (original roofing contractor)",
    actor: "Estate Management",
    status: "completed",
  },
  {
    day: 3,
    date: "26 Mar 2026",
    title: "Site Visit Scheduled",
    description: "Contractor site visit scheduled for the following day",
    actor: "Adebayo Construction",
    status: "completed",
  },
  {
    day: 5,
    date: "28 Mar 2026",
    title: "Inspection Complete",
    description:
      "Contractor inspected, identified flashing issue at roof junction",
    actor: "Adebayo Construction",
    status: "completed",
  },
  {
    day: 6,
    date: "29 Mar 2026",
    title: "Repair Commenced",
    description: "Repair work commenced, materials procured",
    actor: "Adebayo Construction",
    status: "completed",
  },
  {
    day: 7,
    date: "30 Mar 2026",
    title: "Repair In Progress",
    description:
      "Repair in progress \u2014 new flashing being installed at roof junction",
    actor: "Adebayo Construction",
    status: "current",
  },
];

const messages: Message[] = [
  {
    id: 1,
    sender: "Mr. Ogundimu",
    role: "homeowner",
    message:
      "Good morning. I noticed water dripping from my bedroom ceiling during yesterday's rain. The stain is growing larger. Please look into this urgently.",
    timestamp: "23 Mar 2026, 08:15 AM",
    avatar: "OO",
  },
  {
    id: 2,
    sender: "Royal Gardens Management",
    role: "management",
    message:
      "Good morning Mr. Ogundimu. Thank you for reporting this. We have logged your defect as DEF-2024-0089 with Critical priority. Our team will assess this within 24 hours.",
    timestamp: "23 Mar 2026, 09:30 AM",
    avatar: "RG",
  },
  {
    id: 3,
    sender: "Royal Gardens Management",
    role: "management",
    message:
      "Update: We have assigned Adebayo Construction, who handled the original roofing work on your block, to inspect and resolve this issue. This falls under your 5-year roofing warranty.",
    timestamp: "25 Mar 2026, 10:00 AM",
    avatar: "RG",
  },
  {
    id: 4,
    sender: "Mr. Ogundimu",
    role: "homeowner",
    message:
      "Thank you for the prompt response. When will the contractor visit? The rainy season is getting heavier and I am worried about damage to my furniture.",
    timestamp: "25 Mar 2026, 11:45 AM",
    avatar: "OO",
  },
  {
    id: 5,
    sender: "Adebayo Construction",
    role: "contractor",
    message:
      "Good afternoon Mr. Ogundimu. We will be on site on Friday 28th March to inspect the issue. Please ensure someone is available to grant access to the unit.",
    timestamp: "26 Mar 2026, 02:00 PM",
    avatar: "AC",
  },
  {
    id: 6,
    sender: "Adebayo Construction",
    role: "contractor",
    message:
      "Inspection completed. We identified a flashing deficiency at the junction where the roof meets the external wall. The flashing was not properly sealed during installation, allowing water ingress during heavy downpour. We will procure materials and commence repair on Monday.",
    timestamp: "28 Mar 2026, 04:30 PM",
    avatar: "AC",
  },
  {
    id: 7,
    sender: "Mr. Ogundimu",
    role: "homeowner",
    message:
      "Thank you for the update. I placed a bucket under the drip point as you advised. Looking forward to the repair.",
    timestamp: "28 Mar 2026, 05:15 PM",
    avatar: "OO",
  },
  {
    id: 8,
    sender: "Adebayo Construction",
    role: "contractor",
    message:
      "Good morning. We are on site and have commenced the repair. We are installing new aluminium flashing with proper sealant at the roof junction. Expected completion by end of day today.",
    timestamp: "30 Mar 2026, 09:00 AM",
    avatar: "AC",
  },
];

const similarDefects: SimilarDefect[] = [
  {
    id: "DEF-2024-0076",
    unit: "Unit 12, Royal Gardens Estate",
    estate: "Royal Gardens",
    description:
      "Roof leak at same junction point - master bedroom. Repaired 2 weeks ago.",
    status: "Resolved",
    reportedDate: "2026-03-05",
  },
  {
    id: "DEF-2024-0082",
    unit: "Unit 3, Royal Gardens Estate",
    estate: "Royal Gardens",
    description:
      "Water ingress at roof-wall junction - living room ceiling. Awaiting contractor visit.",
    status: "Assigned",
    reportedDate: "2026-03-18",
  },
];

// ---------- Helpers ----------
const priorityStyles: Record<string, string> = {
  Critical: "bg-red-100 text-red-700 border-red-200",
  High: "bg-orange-100 text-orange-700 border-orange-200",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
  Low: "bg-blue-100 text-blue-700 border-blue-200",
};

const statusStyles: Record<string, string> = {
  "In Progress": "bg-blue-100 text-blue-700 border-blue-200",
  Open: "bg-red-100 text-red-700 border-red-200",
  Assigned: "bg-amber-100 text-amber-700 border-amber-200",
  Resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
  Closed: "bg-gray-100 text-gray-700 border-gray-200",
};

const roleColors: Record<string, string> = {
  homeowner: "bg-blue-50 border-blue-200",
  management: "bg-emerald-50 border-emerald-200",
  contractor: "bg-amber-50 border-amber-200",
};

const roleAvatarColors: Record<string, string> = {
  homeowner: "bg-blue-100 text-blue-700",
  management: "bg-emerald-100 text-emerald-700",
  contractor: "bg-amber-100 text-amber-700",
};

// ---------- Component ----------
export default function DefectDetailPage() {
  const [newMessage, setNewMessage] = useState("");
  const [repairDescription, setRepairDescription] = useState("");
  const [materialsUsed, setMaterialsUsed] = useState("");
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="mx-auto max-w-7xl space-y-6 p-6">
        {/* ---------- Header ---------- */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-2">
            <Button variant="ghost" size="sm" className="mb-1 -ml-2 gap-1.5 text-gray-500">
              <ArrowLeft className="h-4 w-4" />
              Back to Defects
            </Button>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-gray-900">
                {defect.title}
              </h1>
              <Badge
                variant="outline"
                className={priorityStyles[defect.priority]}
              >
                <AlertTriangle className="mr-1 h-3 w-3" />
                {defect.priority}
              </Badge>
              <Badge
                variant="outline"
                className={statusStyles[defect.status]}
              >
                {defect.status}
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1.5">
                <FileText className="h-3.5 w-3.5" />
                {defect.id}
              </span>
              <span className="flex items-center gap-1.5">
                <CalendarDays className="h-3.5 w-3.5" />
                Reported: {defect.reportedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {defect.property}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText className="mr-1.5 h-4 w-4" />
              Export Report
            </Button>
            <Dialog open={resolveDialogOpen} onOpenChange={setResolveDialogOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  <CheckCircle2 className="mr-1.5 h-4 w-4" />
                  Mark as Resolved
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Resolve Defect {defect.id}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-2">
                  <div className="space-y-2">
                    <Label>Description of Work Done</Label>
                    <textarea
                      className="w-full rounded-md border border-gray-200 p-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      rows={4}
                      placeholder="Describe the repair work completed..."
                      value={repairDescription}
                      onChange={(e) => setRepairDescription(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Materials Used</Label>
                    <textarea
                      className="w-full rounded-md border border-gray-200 p-3 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      rows={3}
                      placeholder="List materials used for the repair..."
                      value={materialsUsed}
                      onChange={(e) => setMaterialsUsed(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Upload Proof of Repair (Photos)</Label>
                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-6 transition-colors hover:border-emerald-400">
                      <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-500">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">
                          PNG, JPG up to 10MB each (max 6 photos)
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Repair Cost</Label>
                    <Input placeholder="e.g. 185,000" />
                  </div>
                  <Separator />
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      onClick={() => setResolveDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700">
                      <CheckCircle2 className="mr-1.5 h-4 w-4" />
                      Submit Resolution
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* ---------- Main Content ---------- */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column - 2/3 */}
          <div className="space-y-6 lg:col-span-2">
            {/* Defect Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Defect Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Property
                    </p>
                    <p className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                      <Home className="h-3.5 w-3.5 text-gray-400" />
                      {defect.property}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Location in Unit
                    </p>
                    <p className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      {defect.location}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Category
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {defect.category}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                      Reported By
                    </p>
                    <p className="flex items-center gap-1.5 text-sm font-medium text-gray-900">
                      <User className="h-3.5 w-3.5 text-gray-400" />
                      {defect.reportedBy} ({defect.reporterRole})
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Description
                  </p>
                  <p className="text-sm leading-relaxed text-gray-700">
                    &ldquo;{defect.description}&rdquo;
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Estimated Repair Cost
                  </p>
                  <p className="text-sm font-semibold text-gray-900">
                    {formatNaira(defect.estimatedCost)}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Photo Evidence */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Photo Evidence</CardTitle>
                  <Badge variant="outline" className="text-gray-500">
                    <Camera className="mr-1 h-3 w-3" />
                    {photoEvidence.length} Photos
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {photoEvidence.map((photo) => (
                    <div key={photo.id} className="group space-y-2">
                      <div className="relative flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 transition-colors group-hover:border-emerald-300 group-hover:bg-emerald-50/30">
                        <div className="text-center">
                          <ImageIcon className="mx-auto h-8 w-8 text-gray-300" />
                          <p className="mt-1 px-2 text-[10px] leading-tight text-gray-400">
                            {photo.description}
                          </p>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/0 opacity-0 transition-all group-hover:bg-black/5 group-hover:opacity-100">
                          <Button variant="outline" size="sm" className="bg-white text-xs shadow-sm">
                            View
                          </Button>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-700">
                          {photo.description}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {photo.takenBy} &middot; {photo.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resolution Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Resolution Timeline</CardTitle>
                <CardDescription>
                  Day 7 of defect lifecycle &mdash; target resolution within 10
                  business days
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Progress value={70} className="mb-6 h-2" />
                <div className="relative space-y-0">
                  {timeline.map((event, index) => (
                    <div key={event.day} className="relative flex gap-4 pb-6 last:pb-0">
                      {/* Vertical line */}
                      {index < timeline.length - 1 && (
                        <div className="absolute left-[15px] top-8 h-full w-px bg-gray-200" />
                      )}
                      {/* Circle */}
                      <div
                        className={`relative z-10 mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 ${
                          event.status === "completed"
                            ? "border-emerald-500 bg-emerald-500 text-white"
                            : event.status === "current"
                            ? "border-blue-500 bg-blue-500 text-white animate-pulse"
                            : "border-gray-300 bg-white text-gray-400"
                        }`}
                      >
                        {event.status === "completed" ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : event.status === "current" ? (
                          <Wrench className="h-4 w-4" />
                        ) : (
                          <Clock className="h-4 w-4" />
                        )}
                      </div>
                      {/* Content */}
                      <div className="flex-1 space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-gray-900">
                            {event.title}
                          </p>
                          {event.status === "current" && (
                            <Badge className="bg-blue-100 text-blue-700 text-[10px] border-blue-200">
                              TODAY
                            </Badge>
                          )}
                          <span className="text-xs text-gray-400">
                            Day {event.day} &middot; {event.date}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {event.description}
                        </p>
                        <p className="text-xs text-gray-400">
                          By: {event.actor}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Communication Thread */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Communication Thread</CardTitle>
                  <Badge variant="outline" className="text-gray-500">
                    <MessageSquare className="mr-1 h-3 w-3" />
                    {messages.length} Messages
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-[480px] space-y-3 overflow-y-auto pr-1">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`rounded-lg border p-3 ${roleColors[msg.role]}`}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback
                            className={`text-xs ${roleAvatarColors[msg.role]}`}
                          >
                            {msg.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-900">
                              {msg.sender}
                            </p>
                            <p className="text-[10px] text-gray-400">
                              {msg.timestamp}
                            </p>
                          </div>
                          <p className="text-sm leading-relaxed text-gray-700">
                            {msg.message}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="flex-1"
                  />
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Similar Defects - Pattern Detection */}
            <Card className="border-amber-200 bg-amber-50/30">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-600" />
                  <CardTitle className="text-lg text-amber-800">
                    Pattern Detected: Similar Defects
                  </CardTitle>
                </div>
                <CardDescription className="text-amber-700">
                  3 units in Royal Gardens Estate have reported roof leaks at
                  the same junction point. This may indicate a systemic issue
                  with the roofing installation on this block.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Reference</TableHead>
                      <TableHead>Unit</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reported</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {similarDefects.map((d) => (
                      <TableRow key={d.id}>
                        <TableCell>
                          <span className="flex items-center gap-1 text-sm font-medium text-emerald-700">
                            {d.id}
                            <ExternalLink className="h-3 w-3" />
                          </span>
                        </TableCell>
                        <TableCell className="text-sm">{d.unit}</TableCell>
                        <TableCell className="max-w-xs text-sm text-gray-600">
                          {d.description}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusStyles[d.status]}
                          >
                            {d.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {d.reportedDate}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="mt-4 rounded-md bg-amber-100/60 p-3">
                  <p className="text-sm font-medium text-amber-800">
                    Recommendation:
                  </p>
                  <p className="mt-1 text-sm text-amber-700">
                    Commission a full roofing inspection of all units in Block A,
                    Royal Gardens Estate. The recurring flashing failure at
                    roof-wall junctions suggests a workmanship issue during
                    original installation. Consider engaging an independent
                    roofing consultant for assessment.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Warranty Info */}
            <Card className="border-emerald-200">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-emerald-600" />
                  <CardTitle className="text-lg">Warranty Information</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-emerald-50 p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                    <span className="text-sm font-semibold text-emerald-800">
                      Within Warranty
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-emerald-700">
                    This defect is covered under the roofing warranty. No cost to
                    homeowner.
                  </p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Warranty Type</span>
                    <span className="font-medium text-gray-900">
                      Roofing &amp; Waterproofing
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium text-gray-900">5 Years</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Start Date</span>
                    <span className="font-medium text-gray-900">
                      01 May 2021
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Expiry Date</span>
                    <span className="font-medium text-gray-900">
                      30 Apr 2026
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Remaining</span>
                    <span className="font-semibold text-emerald-700">
                      1 month remaining
                    </span>
                  </div>
                  <Progress value={98} className="h-2" />
                  <p className="text-[10px] text-amber-600 font-medium">
                    <AlertTriangle className="mr-1 inline h-3 w-3" />
                    Warranty expiring soon - ensure all defects reported before 30 Apr 2026
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Assigned Contractor */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Assigned Contractor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-amber-100 text-amber-700 text-sm font-bold">
                      AC
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Adebayo Construction
                    </p>
                    <p className="text-xs text-gray-500">
                      Original Roofing Contractor
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    +234 812 345 6789
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    info@adebayoconstruction.ng
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-3.5 w-3.5 text-gray-400" />
                    Lekki Phase 1, Lagos
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Avg. Response Time</span>
                    <span className="font-medium text-gray-900">
                      2.3 days
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Resolution Rate</span>
                    <span className="font-medium text-emerald-700">87%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Active Defects</span>
                    <span className="font-medium text-gray-900">4</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total Resolved</span>
                    <span className="font-medium text-gray-900">23</span>
                  </div>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  {[1, 2, 3, 4].map((s) => (
                    <Star
                      key={s}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <Star className="h-4 w-4 fill-amber-400/30 text-amber-400" />
                  <span className="ml-1 text-xs text-gray-500">
                    4.2 / 5.0 (23 reviews)
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Reporter Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Reporter Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-blue-100 text-blue-700 text-sm font-bold">
                      OO
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-gray-900">
                      {defect.reportedBy}
                    </p>
                    <p className="text-xs text-gray-500">
                      {defect.reporterRole}
                    </p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="h-3.5 w-3.5 text-gray-400" />
                    {defect.reporterPhone}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="h-3.5 w-3.5 text-gray-400" />
                    {defect.reporterEmail}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Home className="h-3.5 w-3.5 text-gray-400" />
                    {defect.property}
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Defects Filed</span>
                    <span className="font-medium text-gray-900">2</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Handover Date</span>
                    <span className="font-medium text-gray-900">
                      08 Mar 2026
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-sm"
                >
                  <Phone className="h-4 w-4" />
                  Call Contractor
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-sm"
                >
                  <AlertTriangle className="h-4 w-4" />
                  Escalate Defect
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-sm"
                >
                  <CalendarDays className="h-4 w-4" />
                  Schedule Follow-up
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start gap-2 text-sm"
                >
                  <Wrench className="h-4 w-4" />
                  Reassign Contractor
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
