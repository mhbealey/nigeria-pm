"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import {
  User, Bell, CreditCard, Users, Shield, Settings,
  CheckCircle, Mail, Phone, Building2, MapPin, Save,
  Plus, Trash2, Eye, EyeOff, Key, Smartphone, Globe,
} from "lucide-react";

const nigerianStates = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue",
  "Borno", "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT Abuja",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers",
  "Sokoto", "Taraba", "Yobe", "Zamfara",
];

const notificationCategories = [
  {
    name: "Escrow Payments",
    items: ["Payment released", "Milestone verified", "Dispute raised", "Funding received"],
  },
  {
    name: "Materials Market",
    items: ["Price alerts", "Group order updates", "Order delivered", "Price drop"],
  },
  {
    name: "Quality Inspections",
    items: ["Inspection scheduled", "Report ready", "Certificate issued", "Failed inspection"],
  },
  {
    name: "Estate Portfolio",
    items: ["Unit milestone", "Payment received", "Budget alert", "Weekly report"],
  },
  {
    name: "Artisan Network",
    items: ["New application", "Job completed", "Rating received", "Artisan available"],
  },
  {
    name: "Permits",
    items: ["Status update", "Document required", "Approval received", "Expiry warning"],
  },
  {
    name: "Defect Management",
    items: ["New defect reported", "Resolution update", "Warranty expiring", "Pattern detected"],
  },
];

const teamMembers = [
  { name: "Daniel Bealey", email: "daniel@buildng.com", role: "Admin", status: "Active" },
  { name: "Chioma Okafor", email: "chioma@buildng.com", role: "Manager", status: "Active" },
  { name: "Emeka Nwosu", email: "emeka@buildng.com", role: "Manager", status: "Active" },
  { name: "Fatima Mohammed", email: "fatima@buildng.com", role: "Viewer", status: "Invited" },
];

const billingHistory = [
  { date: "Mar 1, 2026", description: "Professional Plan - Monthly", amount: "₦25,000", status: "Paid" },
  { date: "Feb 1, 2026", description: "Professional Plan - Monthly", amount: "₦25,000", status: "Paid" },
  { date: "Jan 1, 2026", description: "Professional Plan - Monthly", amount: "₦25,000", status: "Paid" },
  { date: "Dec 1, 2025", description: "Professional Plan - Monthly", amount: "₦25,000", status: "Paid" },
  { date: "Nov 1, 2025", description: "Professional Plan - Monthly", amount: "₦25,000", status: "Paid" },
  { date: "Oct 15, 2025", description: "Plan Upgrade - Starter to Professional", amount: "₦12,500", status: "Paid" },
];

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-slate-500">Manage your account, notifications, and preferences</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile"><User className="mr-1.5 h-4 w-4" /> Profile</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="mr-1.5 h-4 w-4" /> Notifications</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="mr-1.5 h-4 w-4" /> Billing</TabsTrigger>
          <TabsTrigger value="team"><Users className="mr-1.5 h-4 w-4" /> Team</TabsTrigger>
          <TabsTrigger value="security"><Shield className="mr-1.5 h-4 w-4" /> Security</TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal and business details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 text-2xl font-bold text-emerald-700">
                  DB
                </div>
                <div>
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="mt-1 text-xs text-slate-500">JPG, PNG. Max 2MB.</p>
                </div>
              </div>
              <Separator />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Full Name</Label>
                  <Input defaultValue="Daniel Bealey" />
                </div>
                <div className="space-y-2">
                  <Label>Email Address</Label>
                  <div className="flex items-center gap-2">
                    <Input defaultValue="daniel@buildng.com" />
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Phone Number</Label>
                  <div className="flex items-center gap-2">
                    <Input defaultValue="+234 801 234 5678" />
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input defaultValue="BuildNG Technologies Ltd" />
                </div>
                <div className="space-y-2">
                  <Label>Role</Label>
                  <Select defaultValue="admin">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="client">Client / Property Owner</SelectItem>
                      <SelectItem value="contractor">Contractor</SelectItem>
                      <SelectItem value="engineer">Site Engineer</SelectItem>
                      <SelectItem value="developer">Estate Developer</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Select defaultValue="Lagos">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {nigerianStates.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Separator />
              <div className="space-y-2">
                <Label>NIN Verification</Label>
                <div className="flex items-center gap-3">
                  <Badge variant="secondary" className="bg-green-100 text-green-700">Verified</Badge>
                  <span className="text-sm text-slate-500">National Identity Number verified on Oct 15, 2025</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label>CAC Registration</Label>
                <div className="flex items-center gap-3">
                  <Input defaultValue="RC-1234567" className="max-w-xs" />
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Pending Verification</Badge>
                </div>
              </div>
              <div className="flex justify-end">
                <Button className="bg-emerald-600 hover:bg-emerald-700"><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-slate-500">Receive updates via email</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-slate-500">Get critical alerts via SMS (+234)</p>
                  </div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">Push Notifications</p>
                    <p className="text-sm text-slate-500">Browser push notifications</p>
                  </div>
                </div>
                <Switch />
              </div>
              <Separator />
              {notificationCategories.map((category) => (
                <div key={category.name} className="space-y-3">
                  <h4 className="font-medium text-slate-700">{category.name}</h4>
                  <div className="grid gap-2 pl-4">
                    {category.items.map((item) => (
                      <div key={item} className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">{item}</span>
                        <Switch defaultChecked />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Billing Tab */}
        <TabsContent value="billing">
          <div className="space-y-6">
            <Card className="border-emerald-200 bg-emerald-50">
              <CardContent className="flex items-center justify-between p-6">
                <div>
                  <Badge className="bg-emerald-600">Current Plan</Badge>
                  <h3 className="mt-2 text-xl font-bold">Professional</h3>
                  <p className="text-slate-600">₦25,000 / month</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-slate-600">Next billing: April 1, 2026</p>
                  <Button variant="outline" className="mt-2">Upgrade to Enterprise</Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="rounded bg-slate-100 p-2"><CreditCard className="h-5 w-5" /></div>
                  <div>
                    <p className="font-medium">Visa ending in 4532</p>
                    <p className="text-sm text-slate-500">Expires 12/2027</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">Update</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Billing History</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingHistory.map((item, i) => (
                      <TableRow key={i}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.description}</TableCell>
                        <TableCell className="font-medium">{item.amount}</TableCell>
                        <TableCell><Badge variant="secondary" className="bg-green-100 text-green-700">{item.status}</Badge></TableCell>
                        <TableCell><Button variant="ghost" size="sm">Invoice</Button></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Team Tab */}
        <TabsContent value="team">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Manage who has access to your organization</CardDescription>
              </div>
              <Button className="bg-emerald-600 hover:bg-emerald-700"><Plus className="mr-2 h-4 w-4" /> Invite Member</Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Member</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teamMembers.map((member) => (
                    <TableRow key={member.email}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-slate-500">{member.email}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Select defaultValue={member.role.toLowerCase()}>
                          <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                            <SelectItem value="viewer">Viewer</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Badge variant={member.status === "Active" ? "secondary" : "outline"} className={member.status === "Active" ? "bg-green-100 text-green-700" : ""}>
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {member.role !== "Admin" && <Button variant="ghost" size="sm"><Trash2 className="h-4 w-4 text-red-500" /></Button>}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <div className="relative">
                    <Input type={showPassword ? "text" : "password"} placeholder="Enter current password" />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <EyeOff className="h-4 w-4 text-slate-400" /> : <Eye className="h-4 w-4 text-slate-400" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>New Password</Label>
                  <Input type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label>Confirm New Password</Label>
                  <Input type="password" placeholder="Confirm new password" />
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Update Password</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Key className="h-5 w-5 text-slate-500" />
                  <div>
                    <p className="font-medium">Authenticator App</p>
                    <p className="text-sm text-slate-500">Use Google Authenticator or similar</p>
                  </div>
                </div>
                <Switch />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Active Sessions</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                {[
                  { device: "Chrome on MacOS", location: "Lagos, Nigeria", time: "Active now", current: true },
                  { device: "Safari on iPhone", location: "Lagos, Nigeria", time: "2 hours ago", current: false },
                  { device: "Chrome on Windows", location: "Abuja, Nigeria", time: "1 day ago", current: false },
                ].map((session, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-slate-400" />
                      <div>
                        <p className="text-sm font-medium">{session.device} {session.current && <Badge variant="secondary" className="ml-1 bg-green-100 text-green-700">Current</Badge>}</p>
                        <p className="text-xs text-slate-500">{session.location} · {session.time}</p>
                      </div>
                    </div>
                    {!session.current && <Button variant="ghost" size="sm" className="text-red-500">Revoke</Button>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
