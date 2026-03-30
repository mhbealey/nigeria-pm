"use client";

import React from "react";
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
import { formatNaira } from "@/lib/utils";
import {
  TrendingUp,
  TrendingDown,
  Briefcase,
  Shield,
  ClipboardCheck,
  Package,
  CloudSun,
  ArrowUpRight,
  Plus,
  Search,
  Calendar,
  FileCheck,
  Users,
  AlertTriangle,
  CheckCircle2,
  Clock,
  DollarSign,
  Building2,
  Truck,
  Eye,
  Home,
  Wrench,
} from "lucide-react";

// --- Mock Data ---

const projectActivityData = [
  { month: "Oct", projects: 6, completed: 2 },
  { month: "Nov", projects: 8, completed: 4 },
  { month: "Dec", projects: 7, completed: 3 },
  { month: "Jan", projects: 10, completed: 5 },
  { month: "Feb", projects: 11, completed: 6 },
  { month: "Mar", projects: 12, completed: 7 },
];

const revenueData = [
  { month: "Oct", revenue: 18500000 },
  { month: "Nov", revenue: 22300000 },
  { month: "Dec", revenue: 19800000 },
  { month: "Jan", revenue: 28400000 },
  { month: "Feb", revenue: 31200000 },
  { month: "Mar", revenue: 35600000 },
];

const recentProjects = [
  {
    name: "Lekki Phase 2 Estate",
    client: "Pinnacle Homes Ltd",
    status: "In Progress",
    progress: 68,
    amount: 125000000,
  },
  {
    name: "Banana Island Villa",
    client: "Chief Adebayo",
    status: "In Progress",
    progress: 45,
    amount: 340000000,
  },
  {
    name: "Eko Atlantic Tower C",
    client: "Eko Dev Corp",
    status: "On Hold",
    progress: 32,
    amount: 890000000,
  },
  {
    name: "Jabi Lake Apartments",
    client: "Abuja Living Inc",
    status: "Completed",
    progress: 100,
    amount: 56000000,
  },
  {
    name: "GRA Ikeja Duplex",
    client: "Mrs. Nkechi Obi",
    status: "In Progress",
    progress: 82,
    amount: 48000000,
  },
];

const quickActions = [
  {
    label: "Create Escrow",
    description: "Set up a new escrow account for a project",
    icon: Shield,
    color: "bg-blue-50 text-blue-600",
    href: "/dashboard/escrow",
  },
  {
    label: "Order Materials",
    description: "Place an order for construction materials",
    icon: Package,
    color: "bg-amber-50 text-amber-600",
    href: "/dashboard/materials",
  },
  {
    label: "Schedule Inspection",
    description: "Book a quality inspection for a milestone",
    icon: ClipboardCheck,
    color: "bg-emerald-50 text-emerald-600",
    href: "/dashboard/quality",
  },
  {
    label: "Add Unit",
    description: "Register a new estate unit for sale",
    icon: Home,
    color: "bg-purple-50 text-purple-600",
    href: "/dashboard/estates",
  },
  {
    label: "Post Job",
    description: "List a job to find skilled artisans",
    icon: Wrench,
    color: "bg-rose-50 text-rose-600",
    href: "/dashboard/artisans",
  },
  {
    label: "Apply for Permit",
    description: "Start a building permit application",
    icon: FileCheck,
    color: "bg-teal-50 text-teal-600",
    href: "/dashboard/permits",
  },
];

const recentActivity = [
  {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    text: "Milestone 3 verified for Lekki Phase 2 Estate project",
    time: "10 minutes ago",
  },
  {
    icon: Truck,
    color: "text-blue-600",
    bg: "bg-blue-50",
    text: "200 bags of Dangote cement ordered for Banana Island Villa",
    time: "32 minutes ago",
  },
  {
    icon: DollarSign,
    color: "text-amber-600",
    bg: "bg-amber-50",
    text: "Escrow payment of \u20A68,500,000 released to Adex Contractors",
    time: "1 hour ago",
  },
  {
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-50",
    text: "Electrician team (4 artisans) assigned to GRA Ikeja Duplex",
    time: "2 hours ago",
  },
  {
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50",
    text: "Defect reported: Cracked foundation at Eko Atlantic Tower C",
    time: "3 hours ago",
  },
  {
    icon: FileCheck,
    color: "text-teal-600",
    bg: "bg-teal-50",
    text: "Building permit approved for Jabi Lake Apartments Phase 2",
    time: "4 hours ago",
  },
  {
    icon: Eye,
    color: "text-indigo-600",
    bg: "bg-indigo-50",
    text: "Quality inspection passed for Lekki Phase 2 Estate Block A",
    time: "5 hours ago",
  },
  {
    icon: Package,
    color: "text-orange-600",
    bg: "bg-orange-50",
    text: "50 tonnes of iron rods delivered to Banana Island Villa site",
    time: "6 hours ago",
  },
];

const upcomingDeadlines = [
  {
    project: "Lekki Phase 2 Estate",
    milestone: "Roofing completion",
    date: "Apr 2, 2026",
    daysLeft: 3,
    urgency: "critical" as const,
  },
  {
    project: "Banana Island Villa",
    milestone: "Structural inspection",
    date: "Apr 5, 2026",
    daysLeft: 6,
    urgency: "warning" as const,
  },
  {
    project: "GRA Ikeja Duplex",
    milestone: "Electrical rough-in",
    date: "Apr 8, 2026",
    daysLeft: 9,
    urgency: "normal" as const,
  },
  {
    project: "Eko Atlantic Tower C",
    milestone: "Foundation review",
    date: "Apr 12, 2026",
    daysLeft: 13,
    urgency: "normal" as const,
  },
  {
    project: "Jabi Lake Apartments",
    milestone: "Finishing Phase 1",
    date: "Apr 15, 2026",
    daysLeft: 16,
    urgency: "normal" as const,
  },
];

function getStatusBadgeVariant(status: string) {
  switch (status) {
    case "In Progress":
      return "default" as const;
    case "Completed":
      return "success" as const;
    case "On Hold":
      return "warning" as const;
    default:
      return "secondary" as const;
  }
}

function getUrgencyStyles(urgency: "critical" | "warning" | "normal") {
  switch (urgency) {
    case "critical":
      return "border-l-red-500 bg-red-50/50";
    case "warning":
      return "border-l-amber-500 bg-amber-50/50";
    default:
      return "border-l-gray-300 bg-white";
  }
}

function CustomTooltip({
  active,
  payload,
  label,
  isCurrency,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
  isCurrency?: boolean;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-gray-200 bg-white px-3 py-2 shadow-md">
      <p className="mb-1 text-xs font-medium text-gray-500">{label}</p>
      {payload.map((entry, index) => (
        <p key={index} className="text-sm font-semibold" style={{ color: entry.color }}>
          {entry.name}: {isCurrency ? formatNaira(entry.value) : entry.value}
        </p>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const today = new Date();
  const hour = today.getHours();
  const greeting =
    hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  const formattedDate = today.toLocaleDateString("en-NG", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 p-6 text-white shadow-lg sm:p-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              {greeting}, Daniel{" "}
              <span role="img" aria-label="wave">
                👋
              </span>
            </h1>
            <p className="mt-1 text-emerald-100">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-white/15 px-4 py-2 backdrop-blur-sm">
            <CloudSun className="h-6 w-6" />
            <div>
              <p className="text-sm font-semibold">Lagos, Nigeria</p>
              <p className="text-xs text-emerald-100">32°C Partly Cloudy</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-emerald-50 p-2.5">
                <Briefcase className="h-5 w-5 text-emerald-600" />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <TrendingUp className="h-3.5 w-3.5" />
                +2
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-sm text-gray-500">Active Projects</p>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              ↑ 2 from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-blue-50 p-2.5">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <TrendingUp className="h-3.5 w-3.5" />
                12%
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">
                {formatNaira(45200000)}
              </p>
              <p className="text-sm text-gray-500">Escrowed Funds</p>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Across 6 active escrows
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-amber-50 p-2.5">
                <ClipboardCheck className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-red-500">
                <TrendingDown className="h-3.5 w-3.5" />
                3
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-gray-500">Pending Inspections</p>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              3 overdue, 5 upcoming
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="rounded-lg bg-purple-50 p-2.5">
                <Package className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex items-center gap-1 text-xs font-medium text-emerald-600">
                <TrendingUp className="h-3.5 w-3.5" />
                1
              </div>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-900">5</p>
              <p className="text-sm text-gray-500">Active Orders</p>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              2 in transit, 3 processing
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Project Activity chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Project Activity</CardTitle>
                <CardDescription>
                  Monthly project activity over the last 6 months
                </CardDescription>
              </div>
              <Badge variant="secondary">Last 6 months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={projectActivityData}>
                  <defs>
                    <linearGradient
                      id="projectGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#059669"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="#059669"
                        stopOpacity={0}
                      />
                    </linearGradient>
                    <linearGradient
                      id="completedGradient"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="#10b981"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="#10b981"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <Tooltip
                    content={<CustomTooltip />}
                  />
                  <Area
                    type="monotone"
                    dataKey="projects"
                    name="Active"
                    stroke="#059669"
                    strokeWidth={2}
                    fill="url(#projectGradient)"
                  />
                  <Area
                    type="monotone"
                    dataKey="completed"
                    name="Completed"
                    stroke="#10b981"
                    strokeWidth={2}
                    fill="url(#completedGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue chart */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Revenue Overview</CardTitle>
                <CardDescription>
                  Monthly revenue in Nigerian Naira
                </CardDescription>
              </div>
              <Badge variant="secondary">Last 6 months</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#f0f0f0"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "#9ca3af", fontSize: 12 }}
                    tickFormatter={(value: number) =>
                      `${(value / 1000000).toFixed(0)}M`
                    }
                  />
                  <Tooltip
                    content={<CustomTooltip isCurrency />}
                  />
                  <Bar
                    dataKey="revenue"
                    name="Revenue"
                    fill="#059669"
                    radius={[6, 6, 0, 0]}
                    maxBarSize={48}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Projects table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">Recent Projects</CardTitle>
              <CardDescription>
                Overview of your latest construction projects
              </CardDescription>
            </div>
            <Button size="sm" className="w-fit">
              <Plus className="h-4 w-4" />
              New Project
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-left font-medium text-gray-500">
                    Project
                  </th>
                  <th className="pb-3 text-left font-medium text-gray-500 hidden sm:table-cell">
                    Client
                  </th>
                  <th className="pb-3 text-left font-medium text-gray-500">
                    Status
                  </th>
                  <th className="pb-3 text-left font-medium text-gray-500 hidden md:table-cell">
                    Progress
                  </th>
                  <th className="pb-3 text-right font-medium text-gray-500">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentProjects.map((project, idx) => (
                  <tr
                    key={idx}
                    className="group transition-colors hover:bg-gray-50/50"
                  >
                    <td className="py-3.5">
                      <p className="font-medium text-gray-900">
                        {project.name}
                      </p>
                      <p className="text-xs text-gray-500 sm:hidden">
                        {project.client}
                      </p>
                    </td>
                    <td className="py-3.5 hidden sm:table-cell">
                      <p className="text-gray-600">{project.client}</p>
                    </td>
                    <td className="py-3.5">
                      <Badge variant={getStatusBadgeVariant(project.status)}>
                        {project.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 hidden md:table-cell">
                      <div className="flex items-center gap-3">
                        <Progress
                          value={project.progress}
                          className="h-2 w-24"
                        />
                        <span className="text-xs font-medium text-gray-500">
                          {project.progress}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 text-right">
                      <p className="font-medium text-gray-900">
                        {formatNaira(project.amount)}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Quick Actions</CardTitle>
          <CardDescription>
            Frequently used actions to manage your projects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className="group flex items-start gap-4 rounded-xl border border-gray-100 p-4 text-left transition-all hover:border-emerald-200 hover:bg-emerald-50/30 hover:shadow-sm"
              >
                <div className={`rounded-lg p-2.5 ${action.color}`}>
                  <action.icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900 group-hover:text-emerald-700">
                    {action.label}
                  </p>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {action.description}
                  </p>
                </div>
                <ArrowUpRight className="mt-1 h-4 w-4 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-emerald-500" />
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom section: Activity + Deadlines */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Recent Activity */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Recent Activity</CardTitle>
                <CardDescription>
                  Latest updates across all your projects
                </CardDescription>
              </div>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {recentActivity.map((item, idx) => (
                <div key={idx}>
                  <div className="flex gap-3 rounded-lg px-2 py-3 transition-colors hover:bg-gray-50">
                    <div
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.bg}`}
                    >
                      <item.icon className={`h-4 w-4 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700">{item.text}</p>
                      <p className="mt-0.5 text-xs text-gray-400">
                        <Clock className="mr-1 inline h-3 w-3" />
                        {item.time}
                      </p>
                    </div>
                  </div>
                  {idx < recentActivity.length - 1 && (
                    <Separator className="ml-12" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-base">Upcoming Deadlines</CardTitle>
                <CardDescription>
                  Milestones due in the next 30 days
                </CardDescription>
              </div>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingDeadlines.map((deadline, idx) => (
                <div
                  key={idx}
                  className={`rounded-lg border-l-4 p-3 ${getUrgencyStyles(
                    deadline.urgency
                  )}`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {deadline.milestone}
                      </p>
                      <p className="mt-0.5 text-xs text-gray-500 truncate">
                        {deadline.project}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs font-medium text-gray-700">
                        {deadline.date}
                      </p>
                      <p
                        className={`mt-0.5 text-xs font-semibold ${
                          deadline.urgency === "critical"
                            ? "text-red-600"
                            : deadline.urgency === "warning"
                            ? "text-amber-600"
                            : "text-gray-500"
                        }`}
                      >
                        {deadline.daysLeft === 1
                          ? "Tomorrow"
                          : `${deadline.daysLeft} days left`}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
