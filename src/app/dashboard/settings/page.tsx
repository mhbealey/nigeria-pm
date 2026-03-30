"use client";

import React, { useState } from "react";
import {
  User,
  Bell,
  CreditCard,
  Users,
  Shield,
  Save,
  Camera,
  Plus,
  Mail,
  Phone,
  Building2,
  Briefcase,
  CheckCircle2,
  Smartphone,
  Monitor,
  MapPin,
  Clock,
  Trash2,
  LogOut,
  Key,
  Eye,
  EyeOff,
  Copy,
  Send,
  Crown,
  Zap,
  Star,
  AlertCircle,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Invited" | "Inactive";
  joinedDate: string;
}

interface ActiveSession {
  id: string;
  device: string;
  browser: string;
  location: string;
  ip: string;
  lastActive: string;
  current: boolean;
}

interface BillingHistoryItem {
  id: string;
  date: string;
  description: string;
  amount: number;
  status: "Paid" | "Pending" | "Failed";
}

// ---------- Data ----------
const teamMembers: TeamMember[] = [
  {
    id: "TM-001",
    name: "Adebayo Ogunlesi",
    email: "adebayo@buildng.com",
    role: "Owner",
    status: "Active",
    joinedDate: "2024-06-01",
  },
  {
    id: "TM-002",
    name: "Chioma Nwosu",
    email: "chioma@buildng.com",
    role: "Admin",
    status: "Active",
    joinedDate: "2024-08-15",
  },
  {
    id: "TM-003",
    name: "Ibrahim Musa",
    email: "ibrahim@buildng.com",
    role: "Project Manager",
    status: "Active",
    joinedDate: "2025-01-10",
  },
  {
    id: "TM-004",
    name: "Funke Adeyemi",
    email: "funke@buildng.com",
    role: "Quantity Surveyor",
    status: "Active",
    joinedDate: "2025-03-01",
  },
  {
    id: "TM-005",
    name: "Emeka Obi",
    email: "emeka@buildng.com",
    role: "Site Engineer",
    status: "Invited",
    joinedDate: "2026-03-25",
  },
];

const activeSessions: ActiveSession[] = [
  {
    id: "SS-001",
    device: "MacBook Pro",
    browser: "Chrome 122",
    location: "Lagos, Nigeria",
    ip: "102.89.xx.xx",
    lastActive: "Now",
    current: true,
  },
  {
    id: "SS-002",
    device: "iPhone 15 Pro",
    browser: "Safari Mobile",
    location: "Lagos, Nigeria",
    ip: "102.89.xx.xx",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "SS-003",
    device: "Windows Desktop",
    browser: "Edge 121",
    location: "Abuja, Nigeria",
    ip: "197.210.xx.xx",
    lastActive: "1 day ago",
    current: false,
  },
];

const billingHistory: BillingHistoryItem[] = [
  {
    id: "INV-001",
    date: "2026-03-01",
    description: "Professional Plan - March 2026",
    amount: 150000,
    status: "Paid",
  },
  {
    id: "INV-002",
    date: "2026-02-01",
    description: "Professional Plan - February 2026",
    amount: 150000,
    status: "Paid",
  },
  {
    id: "INV-003",
    date: "2026-01-01",
    description: "Professional Plan - January 2026",
    amount: 150000,
    status: "Paid",
  },
  {
    id: "INV-004",
    date: "2025-12-01",
    description: "Professional Plan - December 2025",
    amount: 150000,
    status: "Paid",
  },
  {
    id: "INV-005",
    date: "2025-11-01",
    description: "Professional Plan - November 2025",
    amount: 150000,
    status: "Paid",
  },
];

const notificationSettings = [
  {
    module: "Projects",
    options: [
      { label: "Task assignments", key: "proj_task", enabled: true },
      { label: "Milestone completions", key: "proj_milestone", enabled: true },
      { label: "Schedule changes", key: "proj_schedule", enabled: false },
      { label: "Daily progress digest", key: "proj_digest", enabled: true },
    ],
  },
  {
    module: "Materials",
    options: [
      { label: "Price alerts", key: "mat_price", enabled: true },
      { label: "Order status updates", key: "mat_order", enabled: true },
      { label: "Low stock warnings", key: "mat_stock", enabled: false },
      { label: "Delivery notifications", key: "mat_delivery", enabled: true },
    ],
  },
  {
    module: "Permits",
    options: [
      { label: "Application status changes", key: "perm_status", enabled: true },
      { label: "Document requests", key: "perm_docs", enabled: true },
      { label: "Inspection reminders", key: "perm_inspect", enabled: true },
      { label: "Expiry warnings", key: "perm_expiry", enabled: true },
    ],
  },
  {
    module: "Quality & Defects",
    options: [
      { label: "New defect reports", key: "qual_defect", enabled: true },
      { label: "Defect resolutions", key: "qual_resolve", enabled: false },
      { label: "Warranty expiry alerts", key: "qual_warranty", enabled: true },
      { label: "Inspection results", key: "qual_inspect", enabled: true },
    ],
  },
  {
    module: "Payments & Escrow",
    options: [
      { label: "Payment received", key: "pay_received", enabled: true },
      { label: "Milestone release requests", key: "pay_milestone", enabled: true },
      { label: "Escrow disputes", key: "pay_dispute", enabled: true },
      { label: "Invoice reminders", key: "pay_invoice", enabled: false },
    ],
  },
];

const plans = [
  {
    name: "Starter",
    price: 50000,
    icon: Star,
    color: "text-gray-600",
    bg: "bg-gray-50",
    features: [
      "Up to 3 projects",
      "5 team members",
      "Basic reporting",
      "Email support",
      "Material tracking",
    ],
  },
  {
    name: "Professional",
    price: 150000,
    icon: Zap,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    current: true,
    features: [
      "Up to 15 projects",
      "25 team members",
      "Advanced reporting & analytics",
      "Priority support",
      "Permit navigator",
      "Escrow management",
      "Quality management",
    ],
  },
  {
    name: "Enterprise",
    price: 500000,
    icon: Crown,
    color: "text-amber-600",
    bg: "bg-amber-50",
    features: [
      "Unlimited projects",
      "Unlimited team members",
      "Custom reporting",
      "Dedicated account manager",
      "API access",
      "White-label option",
      "On-site training",
      "SLA guarantee",
    ],
  },
];

// ---------- Component ----------
export default function SettingsPage() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifStates, setNotifStates] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    notificationSettings.forEach((mod) => {
      mod.options.forEach((opt) => {
        initial[opt.key] = opt.enabled;
      });
    });
    return initial;
  });

  const toggleNotif = (key: string) => {
    setNotifStates((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account, team, and application preferences
        </p>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile" className="gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="billing" className="gap-2">
            <CreditCard className="h-4 w-4" />
            Billing
          </TabsTrigger>
          <TabsTrigger value="team" className="gap-2">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
          <TabsTrigger value="security" className="gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Personal Information</CardTitle>
              <CardDescription>
                Update your profile details and public information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar */}
              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xl">
                    AO
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <Button variant="outline" size="sm" className="gap-2">
                    <Camera className="h-4 w-4" />
                    Change Photo
                  </Button>
                  <p className="text-xs text-muted-foreground">
                    JPG, PNG or GIF. Max 2MB.
                  </p>
                </div>
              </div>

              <Separator />

              {/* Form Fields */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="Adebayo Ogunlesi" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      defaultValue="adebayo@buildng.com"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <div className="flex gap-2">
                    <div className="flex h-10 items-center rounded-md border bg-muted px-3 text-sm text-muted-foreground">
                      +234
                    </div>
                    <Input defaultValue="801 234 5678" className="flex-1" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      defaultValue="BuildNG Construction Ltd"
                      className="pl-9"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select defaultValue="md">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="md">Managing Director</SelectItem>
                      <SelectItem value="pm">Project Manager</SelectItem>
                      <SelectItem value="qs">Quantity Surveyor</SelectItem>
                      <SelectItem value="architect">Architect</SelectItem>
                      <SelectItem value="engineer">Site Engineer</SelectItem>
                      <SelectItem value="contractor">Contractor</SelectItem>
                      <SelectItem value="developer">Developer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>NIN Verification</Label>
                  <div className="flex items-center gap-2 rounded-md border bg-emerald-50 px-3 py-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span className="text-sm font-medium text-emerald-700">
                      Verified
                    </span>
                    <span className="text-xs text-muted-foreground">
                      NIN: ****-****-1234
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-3">
              <Button variant="outline">Cancel</Button>
              <Button className="gap-2">
                <Save className="h-4 w-4" />
                Save Changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-4">
          {notificationSettings.map((module) => (
            <Card key={module.module}>
              <CardHeader>
                <CardTitle className="text-base">{module.module}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {module.options.map((option) => (
                  <div
                    key={option.key}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">{option.label}</p>
                    </div>
                    <Switch
                      checked={notifStates[option.key]}
                      onCheckedChange={() => toggleNotif(option.key)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}

          <div className="flex justify-end">
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Notification Preferences
            </Button>
          </div>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing" className="space-y-6">
          {/* Current Plan */}
          <Card className="border-emerald-200 bg-emerald-50/30">
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <div className="rounded-lg bg-emerald-100 p-3">
                  <Zap className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Professional Plan</h3>
                  <p className="text-sm text-muted-foreground">
                    {formatNaira(150000)}/month &mdash; Renews April 1, 2026
                  </p>
                </div>
              </div>
              <Badge className="bg-emerald-100 text-emerald-700">Active</Badge>
            </CardContent>
          </Card>

          {/* Plan Comparison */}
          <div className="grid gap-4 md:grid-cols-3">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={plan.current ? "border-2 border-emerald-300" : ""}
              >
                {plan.current && (
                  <div className="bg-emerald-600 px-4 py-1 text-center text-xs font-medium text-white">
                    Current Plan
                  </div>
                )}
                <CardHeader className="text-center">
                  <div
                    className={`mx-auto mb-2 rounded-full p-3 ${plan.bg}`}
                  >
                    <plan.icon className={`h-6 w-6 ${plan.color}`} />
                  </div>
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  <div className="mt-1">
                    <span className="text-2xl font-bold">
                      {formatNaira(plan.price)}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      /month
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {plan.features.map((feat, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Check
                          className={`mt-0.5 h-4 w-4 shrink-0 ${plan.color}`}
                        />
                        {feat}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  {plan.current ? (
                    <Button variant="outline" className="w-full" disabled>
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      variant={plan.name === "Enterprise" ? "default" : "outline"}
                      className="w-full"
                    >
                      {plan.price > 150000 ? "Upgrade" : "Downgrade"}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Payment Method</CardTitle>
              <CardDescription>
                Manage your payment methods for subscription billing
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between rounded-lg border p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-blue-100 p-2">
                    <CreditCard className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">
                      Visa ending in 4242
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Expires 08/2028
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Default</Badge>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
              <Button variant="outline" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          {/* Billing History */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Billing History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {billingHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.id}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {item.date}
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="font-medium">
                        {formatNaira(item.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            item.status === "Paid"
                              ? "bg-emerald-100 text-emerald-700"
                              : item.status === "Pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team" className="space-y-6">
          {/* Team Members */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Team Members</CardTitle>
                  <CardDescription>
                    {teamMembers.length} of 25 seats used
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-blue-100 text-blue-700 text-sm">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{member.name}</p>
                        {member.status === "Invited" && (
                          <Badge
                            variant="outline"
                            className="text-amber-600 border-amber-200 bg-amber-50"
                          >
                            Invited
                          </Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {member.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Select defaultValue={member.role.toLowerCase().replace(" ", "-")}>
                      <SelectTrigger className="w-[160px] h-8 text-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="project-manager">
                          Project Manager
                        </SelectItem>
                        <SelectItem value="quantity-surveyor">
                          Quantity Surveyor
                        </SelectItem>
                        <SelectItem value="site-engineer">
                          Site Engineer
                        </SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                    {member.role !== "Owner" && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Invite Form */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Invite Team Member</CardTitle>
              <CardDescription>
                Send an invitation to join your BuildNG workspace
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-3">
                <div className="flex-1 space-y-2">
                  <Label>Email Address</Label>
                  <Input placeholder="colleague@company.com" type="email" />
                </div>
                <div className="w-[180px] space-y-2">
                  <Label>Role</Label>
                  <Select defaultValue="project-manager">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="project-manager">
                        Project Manager
                      </SelectItem>
                      <SelectItem value="quantity-surveyor">
                        Quantity Surveyor
                      </SelectItem>
                      <SelectItem value="site-engineer">
                        Site Engineer
                      </SelectItem>
                      <SelectItem value="viewer">Viewer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="gap-2">
                  <Send className="h-4 w-4" />
                  Send Invite
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Change Password</CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 max-w-md">
              <div className="space-y-2">
                <Label>Current Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter current password"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>New Password</Label>
                <Input type="password" placeholder="Enter new password" />
                <p className="text-xs text-muted-foreground">
                  Minimum 8 characters with uppercase, lowercase, number, and
                  special character.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Confirm New Password</Label>
                <Input type="password" placeholder="Confirm new password" />
              </div>
              <Button className="gap-2">
                <Key className="h-4 w-4" />
                Update Password
              </Button>
            </CardContent>
          </Card>

          {/* Two-Factor Authentication */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>
                    Add an extra layer of security to your account
                  </CardDescription>
                </div>
                <Switch
                  checked={twoFactorEnabled}
                  onCheckedChange={setTwoFactorEnabled}
                />
              </div>
            </CardHeader>
            {twoFactorEnabled && (
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 rounded-lg bg-emerald-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 text-emerald-600" />
                  <div>
                    <p className="text-sm font-medium text-emerald-800">
                      2FA is enabled
                    </p>
                    <p className="text-xs text-emerald-700">
                      Your account is protected with authenticator app
                      verification.
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm">
                    Regenerate Recovery Codes
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Disable 2FA
                  </Button>
                </div>
              </CardContent>
            )}
            {!twoFactorEnabled && (
              <CardContent>
                <div className="flex items-start gap-3 rounded-lg bg-amber-50 p-4">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-medium text-amber-800">
                      2FA is not enabled
                    </p>
                    <p className="text-xs text-amber-700">
                      We strongly recommend enabling two-factor authentication
                      for enhanced security.
                    </p>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Active Sessions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-base">Active Sessions</CardTitle>
                  <CardDescription>
                    Devices currently logged into your account
                  </CardDescription>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-red-600 hover:text-red-700"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out All
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeSessions.map((session) => (
                <div
                  key={session.id}
                  className={`flex items-center justify-between rounded-lg border p-4 ${
                    session.current ? "border-emerald-200 bg-emerald-50/30" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-gray-100 p-2">
                      {session.device.includes("iPhone") ? (
                        <Smartphone className="h-5 w-5 text-gray-600" />
                      ) : (
                        <Monitor className="h-5 w-5 text-gray-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">
                          {session.device}
                        </p>
                        {session.current && (
                          <Badge className="bg-emerald-100 text-emerald-700 text-xs">
                            This device
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{session.browser}</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {session.location}
                        </span>
                        <span>IP: {session.ip}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-muted-foreground">
                      {session.lastActive}
                    </span>
                    {!session.current && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 text-xs text-red-600 hover:text-red-700"
                      >
                        Revoke
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
