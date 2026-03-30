"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Plus,
  Bell,
  ShoppingCart,
  PiggyBank,
  FileBarChart,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  MapPin,
  Calendar,
  Package,
  AlertCircle,
  Filter,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { formatNaira } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// ---------- Types ----------
interface MaterialPrice {
  id: string;
  material: string;
  brand: string;
  unit: string;
  city: string;
  currentPrice: number;
  previousPrice: number;
  changePercent: number;
  lastUpdated: string;
  category: string;
}

interface GroupOrder {
  id: string;
  material: string;
  brand: string;
  targetQty: number;
  currentQty: number;
  unit: string;
  unitPrice: number;
  groupPrice: number;
  members: number;
  deadline: string;
  status: "Active" | "Filled" | "Closed" | "Expired";
  city: string;
  organizer: string;
}

interface MyOrder {
  id: string;
  groupOrderId: string;
  material: string;
  qty: number;
  unit: string;
  unitPrice: number;
  totalAmount: number;
  status: "Pending" | "Confirmed" | "Delivered" | "Cancelled";
  orderDate: string;
  deliveryDate?: string;
}

interface PriceAlert {
  id: string;
  material: string;
  city: string;
  targetPrice: number;
  currentPrice: number;
  direction: "below" | "above";
  triggered: boolean;
  createdAt: string;
}

// ---------- Mock Data ----------
const materialPrices: MaterialPrice[] = [
  { id: "MP-001", material: "Cement (50kg)", brand: "Dangote Cement", unit: "bag", city: "Lagos", currentPrice: 580000, previousPrice: 560000, changePercent: 3.6, lastUpdated: "2026-03-28", category: "Cement" },
  { id: "MP-002", material: "Cement (50kg)", brand: "Dangote Cement", unit: "bag", city: "Abuja", currentPrice: 620000, previousPrice: 600000, changePercent: 3.3, lastUpdated: "2026-03-28", category: "Cement" },
  { id: "MP-003", material: "Cement (50kg)", brand: "BUA Cement", unit: "bag", city: "Lagos", currentPrice: 560000, previousPrice: 550000, changePercent: 1.8, lastUpdated: "2026-03-28", category: "Cement" },
  { id: "MP-004", material: "Cement (50kg)", brand: "BUA Cement", unit: "bag", city: "Abuja", currentPrice: 600000, previousPrice: 590000, changePercent: 1.7, lastUpdated: "2026-03-27", category: "Cement" },
  { id: "MP-005", material: "Cement (50kg)", brand: "Lafarge Africa", unit: "bag", city: "Lagos", currentPrice: 570000, previousPrice: 580000, changePercent: -1.7, lastUpdated: "2026-03-27", category: "Cement" },
  { id: "MP-006", material: "12mm Rebar", brand: "Kam Steel", unit: "ton", city: "Lagos", currentPrice: 62000000, previousPrice: 58500000, changePercent: 6.0, lastUpdated: "2026-03-28", category: "Steel" },
  { id: "MP-007", material: "12mm Rebar", brand: "Kam Steel", unit: "ton", city: "Abuja", currentPrice: 65000000, previousPrice: 61000000, changePercent: 6.6, lastUpdated: "2026-03-28", category: "Steel" },
  { id: "MP-008", material: "16mm Rebar", brand: "Kam Steel", unit: "ton", city: "Lagos", currentPrice: 64000000, previousPrice: 60000000, changePercent: 6.7, lastUpdated: "2026-03-27", category: "Steel" },
  { id: "MP-009", material: "Granite (3/4 inch)", brand: "Generic", unit: "ton", city: "Lagos", currentPrice: 3200000, previousPrice: 3000000, changePercent: 6.7, lastUpdated: "2026-03-28", category: "Aggregates" },
  { id: "MP-010", material: "Granite (3/4 inch)", brand: "Generic", unit: "ton", city: "Port Harcourt", currentPrice: 2800000, previousPrice: 2750000, changePercent: 1.8, lastUpdated: "2026-03-27", category: "Aggregates" },
  { id: "MP-011", material: "Sharp Sand", brand: "Generic", unit: "ton", city: "Lagos", currentPrice: 1800000, previousPrice: 1750000, changePercent: 2.9, lastUpdated: "2026-03-28", category: "Aggregates" },
  { id: "MP-012", material: "Sharp Sand", brand: "Generic", unit: "ton", city: "Abuja", currentPrice: 2200000, previousPrice: 2100000, changePercent: 4.8, lastUpdated: "2026-03-27", category: "Aggregates" },
  { id: "MP-013", material: "Roofing Sheet (0.55mm)", brand: "Aluminum Rolling Mill", unit: "sheet", city: "Lagos", currentPrice: 720000, previousPrice: 750000, changePercent: -4.0, lastUpdated: "2026-03-28", category: "Roofing" },
  { id: "MP-014", material: "Long Span Aluminum (0.55mm)", brand: "WEMPCO", unit: "meter", city: "Lagos", currentPrice: 480000, previousPrice: 470000, changePercent: 2.1, lastUpdated: "2026-03-27", category: "Roofing" },
  { id: "MP-015", material: "Floor Tile (60x60)", brand: "Royal Ceramics", unit: "sqm", city: "Lagos", currentPrice: 550000, previousPrice: 520000, changePercent: 5.8, lastUpdated: "2026-03-28", category: "Finishing" },
  { id: "MP-016", material: "Floor Tile (60x60)", brand: "Goodwill Ceramics", unit: "sqm", city: "Abuja", currentPrice: 480000, previousPrice: 500000, changePercent: -4.0, lastUpdated: "2026-03-27", category: "Finishing" },
  { id: "MP-017", material: "Blocks (9 inch)", brand: "Generic", unit: "piece", city: "Lagos", currentPrice: 45000, previousPrice: 42000, changePercent: 7.1, lastUpdated: "2026-03-28", category: "Blocks" },
  { id: "MP-018", material: "Blocks (6 inch)", brand: "Generic", unit: "piece", city: "Lagos", currentPrice: 32000, previousPrice: 30000, changePercent: 6.7, lastUpdated: "2026-03-28", category: "Blocks" },
  { id: "MP-019", material: "POP Cement (40kg)", brand: "Knauf", unit: "bag", city: "Lagos", currentPrice: 650000, previousPrice: 620000, changePercent: 4.8, lastUpdated: "2026-03-27", category: "Finishing" },
  { id: "MP-020", material: "Binding Wire", brand: "Generic", unit: "roll", city: "Lagos", currentPrice: 380000, previousPrice: 360000, changePercent: 5.6, lastUpdated: "2026-03-28", category: "Steel" },
];

const groupOrders: GroupOrder[] = [
  {
    id: "GO-001",
    material: "Dangote Cement (50kg)",
    brand: "Dangote",
    targetQty: 2000,
    currentQty: 1450,
    unit: "bags",
    unitPrice: 580000,
    groupPrice: 520000,
    members: 12,
    deadline: "2026-04-10",
    status: "Active",
    city: "Lagos",
    organizer: "Chukwuemeka Builders Hub",
  },
  {
    id: "GO-002",
    material: "12mm Rebar (Kam Steel)",
    brand: "Kam Steel",
    targetQty: 50,
    currentQty: 50,
    unit: "tons",
    unitPrice: 62000000,
    groupPrice: 57500000,
    members: 8,
    deadline: "2026-04-05",
    status: "Filled",
    city: "Lagos",
    organizer: "Lekki Developers Association",
  },
  {
    id: "GO-003",
    material: "BUA Cement (50kg)",
    brand: "BUA",
    targetQty: 1500,
    currentQty: 680,
    unit: "bags",
    unitPrice: 600000,
    groupPrice: 540000,
    members: 6,
    deadline: "2026-04-15",
    status: "Active",
    city: "Abuja",
    organizer: "FCT Builders Cooperative",
  },
  {
    id: "GO-004",
    material: "Granite (3/4 inch)",
    brand: "Generic",
    targetQty: 200,
    currentQty: 125,
    unit: "tons",
    unitPrice: 2800000,
    groupPrice: 2500000,
    members: 5,
    deadline: "2026-04-20",
    status: "Active",
    city: "Port Harcourt",
    organizer: "PH Construction Network",
  },
  {
    id: "GO-005",
    material: "Roofing Sheets (0.55mm)",
    brand: "ARM",
    targetQty: 500,
    currentQty: 310,
    unit: "sheets",
    unitPrice: 720000,
    groupPrice: 650000,
    members: 9,
    deadline: "2026-04-12",
    status: "Active",
    city: "Lagos",
    organizer: "Ikeja Builders Forum",
  },
];

const myOrders: MyOrder[] = [
  { id: "MO-001", groupOrderId: "GO-001", material: "Dangote Cement (50kg)", qty: 200, unit: "bags", unitPrice: 520000, totalAmount: 104000000, status: "Confirmed", orderDate: "2026-03-20", deliveryDate: "2026-04-12" },
  { id: "MO-002", groupOrderId: "GO-002", material: "12mm Rebar (Kam Steel)", qty: 5, unit: "tons", unitPrice: 57500000, totalAmount: 287500000, status: "Pending", orderDate: "2026-03-22" },
  { id: "MO-003", groupOrderId: "GO-005", material: "Roofing Sheets (0.55mm)", qty: 50, unit: "sheets", unitPrice: 650000, totalAmount: 32500000, status: "Pending", orderDate: "2026-03-25" },
  { id: "MO-004", groupOrderId: "GO-003", material: "BUA Cement (50kg)", qty: 100, unit: "bags", unitPrice: 540000, totalAmount: 54000000, status: "Delivered", orderDate: "2026-03-10", deliveryDate: "2026-03-18" },
];

const priceAlerts: PriceAlert[] = [
  { id: "PA-001", material: "Dangote Cement (50kg)", city: "Lagos", targetPrice: 550000, currentPrice: 580000, direction: "below", triggered: false, createdAt: "2026-03-15" },
  { id: "PA-002", material: "12mm Rebar", city: "Lagos", targetPrice: 65000000, currentPrice: 62000000, direction: "above", triggered: false, createdAt: "2026-03-18" },
  { id: "PA-003", material: "BUA Cement (50kg)", city: "Abuja", targetPrice: 580000, currentPrice: 600000, direction: "below", triggered: false, createdAt: "2026-03-20" },
  { id: "PA-004", material: "Sharp Sand", city: "Lagos", targetPrice: 1900000, currentPrice: 1800000, direction: "above", triggered: true, createdAt: "2026-03-10" },
  { id: "PA-005", material: "Roofing Sheet (0.55mm)", city: "Lagos", targetPrice: 750000, currentPrice: 720000, direction: "below", triggered: true, createdAt: "2026-03-08" },
  { id: "PA-006", material: "Floor Tile (60x60)", city: "Lagos", targetPrice: 500000, currentPrice: 550000, direction: "below", triggered: false, createdAt: "2026-03-22" },
  { id: "PA-007", material: "Granite (3/4 inch)", city: "Port Harcourt", targetPrice: 3000000, currentPrice: 2800000, direction: "above", triggered: false, createdAt: "2026-03-19" },
  { id: "PA-008", material: "Blocks (9 inch)", city: "Lagos", targetPrice: 40000, currentPrice: 45000, direction: "below", triggered: false, createdAt: "2026-03-21" },
  { id: "PA-009", material: "POP Cement (40kg)", city: "Lagos", targetPrice: 600000, currentPrice: 650000, direction: "below", triggered: false, createdAt: "2026-03-23" },
  { id: "PA-010", material: "16mm Rebar", city: "Lagos", targetPrice: 68000000, currentPrice: 64000000, direction: "above", triggered: false, createdAt: "2026-03-24" },
  { id: "PA-011", material: "Long Span Aluminum (0.55mm)", city: "Lagos", targetPrice: 460000, currentPrice: 480000, direction: "below", triggered: false, createdAt: "2026-03-16" },
  { id: "PA-012", material: "Binding Wire", city: "Lagos", targetPrice: 350000, currentPrice: 380000, direction: "below", triggered: false, createdAt: "2026-03-25" },
];

const priceTrendData = [
  { month: "Oct 2025", Lagos: 480000, Abuja: 520000, PH: 510000 },
  { month: "Nov 2025", Lagos: 500000, Abuja: 540000, PH: 525000 },
  { month: "Dec 2025", Lagos: 530000, Abuja: 560000, PH: 545000 },
  { month: "Jan 2026", Lagos: 550000, Abuja: 580000, PH: 560000 },
  { month: "Feb 2026", Lagos: 560000, Abuja: 600000, PH: 570000 },
  { month: "Mar 2026", Lagos: 580000, Abuja: 620000, PH: 590000 },
];

const categories = ["All", "Cement", "Steel", "Aggregates", "Roofing", "Finishing", "Blocks"];
const cities = ["All", "Lagos", "Abuja", "Port Harcourt"];

// ---------- Helpers ----------
function getOrderStatusColor(status: MyOrder["status"]) {
  switch (status) {
    case "Delivered": return "bg-green-100 text-green-800";
    case "Confirmed": return "bg-blue-100 text-blue-800";
    case "Pending": return "bg-yellow-100 text-yellow-800";
    case "Cancelled": return "bg-red-100 text-red-800";
  }
}

function getGroupOrderStatusColor(status: GroupOrder["status"]) {
  switch (status) {
    case "Active": return "bg-green-100 text-green-800";
    case "Filled": return "bg-blue-100 text-blue-800";
    case "Closed": return "bg-gray-100 text-gray-800";
    case "Expired": return "bg-red-100 text-red-800";
  }
}

// ---------- Component ----------
export default function MaterialsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [groupOrderDialogOpen, setGroupOrderDialogOpen] = useState(false);

  // Report price form state
  const [reportMaterial, setReportMaterial] = useState("");
  const [reportCity, setReportCity] = useState("");
  const [reportPrice, setReportPrice] = useState("");
  const [reportVendor, setReportVendor] = useState("");

  // Group order form state
  const [goMaterial, setGoMaterial] = useState("");
  const [goCity, setGoCity] = useState("");
  const [goTargetQty, setGoTargetQty] = useState("");
  const [goDeadline, setGoDeadline] = useState("");

  const filteredPrices = materialPrices.filter((p) => {
    const matchesSearch =
      searchQuery === "" ||
      p.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;
    const matchesCity = selectedCity === "All" || p.city === selectedCity;
    return matchesSearch && matchesCategory && matchesCity;
  });

  const triggeredAlerts = priceAlerts.filter((a) => a.triggered).length;
  const activeAlerts = priceAlerts.length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Materials Market</h1>
          <p className="text-muted-foreground">
            Track prices, join group orders, and save on construction materials across Nigeria
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Send className="mr-2 h-4 w-4" />
                Report Price
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Report a Material Price</DialogTitle>
                <DialogDescription>
                  Help the community by reporting current material prices from your location. All reports are verified before publishing.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="report-material">Material</Label>
                  <Select value={reportMaterial} onValueChange={setReportMaterial}>
                    <SelectTrigger id="report-material">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dangote-cement">Dangote Cement (50kg)</SelectItem>
                      <SelectItem value="bua-cement">BUA Cement (50kg)</SelectItem>
                      <SelectItem value="lafarge-cement">Lafarge Cement (50kg)</SelectItem>
                      <SelectItem value="12mm-rebar">12mm Rebar</SelectItem>
                      <SelectItem value="16mm-rebar">16mm Rebar</SelectItem>
                      <SelectItem value="granite">Granite (3/4 inch)</SelectItem>
                      <SelectItem value="sharp-sand">Sharp Sand</SelectItem>
                      <SelectItem value="roofing-sheet">Roofing Sheet (0.55mm)</SelectItem>
                      <SelectItem value="floor-tile">Floor Tile (60x60)</SelectItem>
                      <SelectItem value="blocks-9">Blocks (9 inch)</SelectItem>
                      <SelectItem value="blocks-6">Blocks (6 inch)</SelectItem>
                      <SelectItem value="binding-wire">Binding Wire</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="report-city">City</Label>
                  <Select value={reportCity} onValueChange={setReportCity}>
                    <SelectTrigger id="report-city">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lagos">Lagos</SelectItem>
                      <SelectItem value="abuja">Abuja</SelectItem>
                      <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                      <SelectItem value="ibadan">Ibadan</SelectItem>
                      <SelectItem value="kano">Kano</SelectItem>
                      <SelectItem value="enugu">Enugu</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="report-price">Price (Naira)</Label>
                  <Input
                    id="report-price"
                    type="number"
                    placeholder="e.g. 5800"
                    value={reportPrice}
                    onChange={(e) => setReportPrice(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="report-vendor">Vendor / Location</Label>
                  <Input
                    id="report-vendor"
                    placeholder="e.g. Ikeja Building Materials Market"
                    value={reportVendor}
                    onChange={(e) => setReportVendor(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setReportDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setReportDialogOpen(false)}>
                  Submit Report
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={groupOrderDialogOpen} onOpenChange={setGroupOrderDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Group Order
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create Group Order</DialogTitle>
                <DialogDescription>
                  Start a group buying order to get bulk discount pricing. Other builders can join your order.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="go-material">Material</Label>
                  <Select value={goMaterial} onValueChange={setGoMaterial}>
                    <SelectTrigger id="go-material">
                      <SelectValue placeholder="Select material" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dangote-cement">Dangote Cement (50kg)</SelectItem>
                      <SelectItem value="bua-cement">BUA Cement (50kg)</SelectItem>
                      <SelectItem value="lafarge-cement">Lafarge Cement (50kg)</SelectItem>
                      <SelectItem value="12mm-rebar">12mm Rebar (Kam Steel)</SelectItem>
                      <SelectItem value="16mm-rebar">16mm Rebar (Kam Steel)</SelectItem>
                      <SelectItem value="granite">Granite (3/4 inch)</SelectItem>
                      <SelectItem value="sharp-sand">Sharp Sand</SelectItem>
                      <SelectItem value="roofing-sheet">Roofing Sheet (0.55mm ARM)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="go-city">City</Label>
                  <Select value={goCity} onValueChange={setGoCity}>
                    <SelectTrigger id="go-city">
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lagos">Lagos</SelectItem>
                      <SelectItem value="abuja">Abuja</SelectItem>
                      <SelectItem value="port-harcourt">Port Harcourt</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="go-target">Target Quantity</Label>
                  <Input
                    id="go-target"
                    type="number"
                    placeholder="e.g. 2000"
                    value={goTargetQty}
                    onChange={(e) => setGoTargetQty(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="go-deadline">Order Deadline</Label>
                  <Input
                    id="go-deadline"
                    type="date"
                    value={goDeadline}
                    onChange={(e) => setGoDeadline(e.target.value)}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setGroupOrderDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setGroupOrderDialogOpen(false)}>
                  Create Order
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Price Alerts</CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeAlerts}</div>
            <p className="text-xs text-muted-foreground">
              {triggeredAlerts} triggered recently
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Group Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5 active</div>
            <p className="text-xs text-muted-foreground">
              3 accepting new members
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Saved</CardTitle>
            <PiggyBank className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNaira(420000000)}</div>
            <p className="text-xs text-muted-foreground">
              via group buying this quarter
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Price Reports</CardTitle>
            <FileBarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">248</div>
            <p className="text-xs text-muted-foreground">
              community reports this month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Price Trend Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Cement Price Trend (50kg bag) — 6 Months</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(val: number) => `${(val / 100).toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value) => formatNaira(Number(value))}
                  labelStyle={{ fontWeight: "bold" }}
                />
                <Line type="monotone" dataKey="Lagos" stroke="#2563eb" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="Abuja" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="PH" stroke="#16a34a" strokeWidth={2} dot={{ r: 4 }} name="Port Harcourt" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-600" />
              <span>Lagos</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-600" />
              <span>Abuja</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-600" />
              <span>Port Harcourt</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="price-index" className="space-y-4">
        <TabsList>
          <TabsTrigger value="price-index">Price Index</TabsTrigger>
          <TabsTrigger value="group-buying">Group Buying</TabsTrigger>
          <TabsTrigger value="my-orders">My Orders</TabsTrigger>
          <TabsTrigger value="price-alerts">Price Alerts</TabsTrigger>
        </TabsList>

        {/* Price Index Tab */}
        <TabsContent value="price-index" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <CardTitle className="text-base">Current Material Prices</CardTitle>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search materials..."
                      className="pl-8 sm:w-[200px]"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="sm:w-[140px]">
                      <Filter className="mr-2 h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger className="sm:w-[150px]">
                      <MapPin className="mr-2 h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="text-right">Change</TableHead>
                    <TableHead>Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPrices.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.material}</TableCell>
                      <TableCell>{item.brand}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {item.city}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">per {item.unit}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatNaira(item.currentPrice)}
                      </TableCell>
                      <TableCell className="text-right">
                        <div
                          className={`inline-flex items-center gap-1 text-sm font-medium ${
                            item.changePercent > 0
                              ? "text-red-600"
                              : item.changePercent < 0
                              ? "text-green-600"
                              : "text-gray-500"
                          }`}
                        >
                          {item.changePercent > 0 ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : item.changePercent < 0 ? (
                            <ArrowDownRight className="h-4 w-4" />
                          ) : null}
                          {Math.abs(item.changePercent).toFixed(1)}%
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {item.lastUpdated}
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredPrices.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No materials match your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Group Buying Tab */}
        <TabsContent value="group-buying" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {groupOrders.map((order) => {
              const progress = Math.round((order.currentQty / order.targetQty) * 100);
              const savings = order.unitPrice - order.groupPrice;
              const savingsPercent = ((savings / order.unitPrice) * 100).toFixed(1);

              return (
                <Card key={order.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-base">{order.material}</CardTitle>
                        <div className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {order.city}
                        </div>
                      </div>
                      <Badge className={getGroupOrderStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-muted-foreground">Market Price</p>
                        <p className="font-medium line-through text-red-500">
                          {formatNaira(order.unitPrice)}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Group Price</p>
                        <p className="font-semibold text-green-600">
                          {formatNaira(order.groupPrice)}
                        </p>
                      </div>
                    </div>

                    <div className="rounded-md bg-green-50 px-3 py-2 text-center">
                      <span className="text-sm font-medium text-green-700">
                        Save {formatNaira(savings)}/{order.unit === "bags" ? "bag" : order.unit === "tons" ? "ton" : order.unit === "sheets" ? "sheet" : "unit"} ({savingsPercent}%)
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {order.currentQty.toLocaleString()} / {order.targetQty.toLocaleString()} {order.unit}
                        </span>
                        <span className="font-medium">{progress}%</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>

                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {order.members} members
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" />
                        Closes {order.deadline}
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Organized by: {order.organizer}
                    </div>

                    <Button
                      className="w-full"
                      variant={order.status === "Filled" ? "outline" : "default"}
                      disabled={order.status === "Filled"}
                    >
                      {order.status === "Filled" ? "Order Full" : "Join Group Order"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* My Orders Tab */}
        <TabsContent value="my-orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">My Group Buying Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Material</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead className="text-right">Unit Price</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Order Date</TableHead>
                    <TableHead>Delivery</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {myOrders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-mono text-sm">{order.id}</TableCell>
                      <TableCell className="font-medium">{order.material}</TableCell>
                      <TableCell className="text-right">
                        {order.qty.toLocaleString()} {order.unit}
                      </TableCell>
                      <TableCell className="text-right">{formatNaira(order.unitPrice)}</TableCell>
                      <TableCell className="text-right font-semibold">
                        {formatNaira(order.totalAmount)}
                      </TableCell>
                      <TableCell>
                        <Badge className={getOrderStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{order.orderDate}</TableCell>
                      <TableCell className="text-muted-foreground">
                        {order.deliveryDate ?? "—"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Price Alerts Tab */}
        <TabsContent value="price-alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Active Price Alerts</CardTitle>
                <Badge variant="outline" className="gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {triggeredAlerts} triggered
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Material</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Condition</TableHead>
                    <TableHead className="text-right">Target Price</TableHead>
                    <TableHead className="text-right">Current Price</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {priceAlerts.map((alert) => (
                    <TableRow key={alert.id} className={alert.triggered ? "bg-yellow-50" : ""}>
                      <TableCell className="font-medium">{alert.material}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          {alert.city}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {alert.direction === "below" ? (
                            <span className="flex items-center gap-1">
                              <ArrowDownRight className="h-3 w-3 text-green-600" />
                              Drops below
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <ArrowUpRight className="h-3 w-3 text-red-600" />
                              Rises above
                            </span>
                          )}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatNaira(alert.targetPrice)}
                      </TableCell>
                      <TableCell className="text-right">
                        {formatNaira(alert.currentPrice)}
                      </TableCell>
                      <TableCell>
                        {alert.triggered ? (
                          <Badge className="bg-yellow-100 text-yellow-800">Triggered</Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-600">Watching</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">
                        {alert.createdAt}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
