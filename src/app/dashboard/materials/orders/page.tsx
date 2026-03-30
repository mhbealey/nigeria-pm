"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { formatNaira } from "@/lib/utils";
import {
  ArrowLeft,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Calendar,
  RotateCcw,
  Eye,
  FileText,
  ChevronDown,
  ChevronUp,
  Navigation,
  CircleDot,
  Circle,
  Building2,
  ShoppingCart,
  Download,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

// --- Types ---

interface OrderItem {
  name: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

interface OrderStep {
  label: string;
  date: string | null;
  completed: boolean;
  current: boolean;
}

interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  supplier: string;
  supplierPhone: string;
  totalAmount: number;
  deliveryAddress: string;
  deliveryCity: string;
  orderDate: string;
  expectedDate: string;
  deliveredDate: string | null;
  status: "ordered" | "confirmed" | "dispatched" | "delivered";
  steps: OrderStep[];
  paymentMethod: string;
  paymentStatus: "paid" | "pending" | "partial";
  notes: string;
}

// --- Mock Data ---

const activeOrders: Order[] = [
  {
    id: "ord-001",
    orderNumber: "BNG-2026-0347",
    items: [
      {
        name: "Dangote Cement 50kg",
        quantity: 500,
        unit: "bags",
        unitPrice: 6500,
        total: 3250000,
      },
    ],
    supplier: "Lagos Building Materials Ltd",
    supplierPhone: "+234 801 234 5678",
    totalAmount: 3250000,
    deliveryAddress: "Plot 15, Lekki Phase 1, Admiralty Way",
    deliveryCity: "Lagos",
    orderDate: "2026-03-26",
    expectedDate: "2026-03-31",
    deliveredDate: null,
    status: "dispatched",
    steps: [
      { label: "Ordered", date: "Mar 26, 2026 - 9:15 AM", completed: true, current: false },
      { label: "Confirmed", date: "Mar 26, 2026 - 11:30 AM", completed: true, current: false },
      { label: "Dispatched", date: "Mar 29, 2026 - 7:00 AM", completed: true, current: true },
      { label: "Delivered", date: null, completed: false, current: false },
    ],
    paymentMethod: "Bank Transfer",
    paymentStatus: "paid",
    notes: "Driver: Musa Ibrahim | Vehicle: Lagos ABC-123XY | Contact: +234 812 345 6789",
  },
  {
    id: "ord-002",
    orderNumber: "BNG-2026-0352",
    items: [
      {
        name: "12mm Reinforcement Bar (Rebar)",
        quantity: 20,
        unit: "tons",
        unitPrice: 320000,
        total: 6400000,
      },
    ],
    supplier: "Northern Materials Hub",
    supplierPhone: "+234 806 678 9012",
    totalAmount: 6400000,
    deliveryAddress: "KM 12, Abuja-Keffi Expressway, Nyanya",
    deliveryCity: "Abuja",
    orderDate: "2026-03-27",
    expectedDate: "2026-04-02",
    deliveredDate: null,
    status: "confirmed",
    steps: [
      { label: "Ordered", date: "Mar 27, 2026 - 2:45 PM", completed: true, current: false },
      { label: "Confirmed", date: "Mar 28, 2026 - 10:00 AM", completed: true, current: true },
      { label: "Dispatched", date: null, completed: false, current: false },
      { label: "Delivered", date: null, completed: false, current: false },
    ],
    paymentMethod: "Bank Transfer",
    paymentStatus: "partial",
    notes: "60% advance paid. Balance on delivery. Loading scheduled for March 31.",
  },
  {
    id: "ord-003",
    orderNumber: "BNG-2026-0360",
    items: [
      {
        name: "0.45mm Aluminum Roofing Sheet (Long Span)",
        quantity: 100,
        unit: "bundles",
        unitPrice: 5500,
        total: 550000,
      },
    ],
    supplier: "BulkCem Nigeria",
    supplierPhone: "+234 807 789 0123",
    totalAmount: 550000,
    deliveryAddress: "7 Wetheral Road, Owerri",
    deliveryCity: "Imo",
    orderDate: "2026-03-25",
    expectedDate: "2026-03-30",
    deliveredDate: "2026-03-30",
    status: "delivered",
    steps: [
      { label: "Ordered", date: "Mar 25, 2026 - 8:00 AM", completed: true, current: false },
      { label: "Confirmed", date: "Mar 25, 2026 - 9:30 AM", completed: true, current: false },
      { label: "Dispatched", date: "Mar 27, 2026 - 6:15 AM", completed: true, current: false },
      { label: "Delivered", date: "Mar 30, 2026 - 11:45 AM", completed: true, current: true },
    ],
    paymentMethod: "Card Payment",
    paymentStatus: "paid",
    notes: "Delivery confirmed. All 100 bundles received in good condition.",
  },
];

const pastOrders: Order[] = [
  {
    id: "ord-004",
    orderNumber: "BNG-2026-0298",
    items: [
      { name: "Dangote Cement 50kg", quantity: 300, unit: "bags", unitPrice: 6200, total: 1860000 },
      { name: "Sharp Sand", quantity: 5, unit: "tons", unitPrice: 18000, total: 90000 },
    ],
    supplier: "Lagos Building Materials Ltd",
    supplierPhone: "+234 801 234 5678",
    totalAmount: 1950000,
    deliveryAddress: "22 Allen Avenue, Ikeja",
    deliveryCity: "Lagos",
    orderDate: "2026-03-10",
    expectedDate: "2026-03-14",
    deliveredDate: "2026-03-13",
    status: "delivered",
    steps: [
      { label: "Ordered", date: "Mar 10, 2026", completed: true, current: false },
      { label: "Confirmed", date: "Mar 10, 2026", completed: true, current: false },
      { label: "Dispatched", date: "Mar 12, 2026", completed: true, current: false },
      { label: "Delivered", date: "Mar 13, 2026", completed: true, current: true },
    ],
    paymentMethod: "Bank Transfer",
    paymentStatus: "paid",
    notes: "Delivered 1 day early. Excellent service.",
  },
  {
    id: "ord-005",
    orderNumber: "BNG-2026-0265",
    items: [
      { name: "Granite 20mm", quantity: 10, unit: "tons", unitPrice: 32000, total: 320000 },
    ],
    supplier: "Dangote Distributors PH",
    supplierPhone: "+234 803 456 7890",
    totalAmount: 320000,
    deliveryAddress: "45 Aba Road, Rumuola",
    deliveryCity: "Port Harcourt",
    orderDate: "2026-03-05",
    expectedDate: "2026-03-09",
    deliveredDate: "2026-03-09",
    status: "delivered",
    steps: [
      { label: "Ordered", date: "Mar 5, 2026", completed: true, current: false },
      { label: "Confirmed", date: "Mar 5, 2026", completed: true, current: false },
      { label: "Dispatched", date: "Mar 7, 2026", completed: true, current: false },
      { label: "Delivered", date: "Mar 9, 2026", completed: true, current: true },
    ],
    paymentMethod: "Card Payment",
    paymentStatus: "paid",
    notes: "",
  },
  {
    id: "ord-006",
    orderNumber: "BNG-2026-0234",
    items: [
      { name: "16mm Reinforcement Bar (Rebar)", quantity: 15, unit: "tons", unitPrice: 340000, total: 5100000 },
      { name: "Binding Wire", quantity: 20, unit: "rolls", unitPrice: 3500, total: 70000 },
    ],
    supplier: "AbujaBuild Supplies",
    supplierPhone: "+234 802 345 6789",
    totalAmount: 5170000,
    deliveryAddress: "KM 12, Abuja-Keffi Expressway, Nyanya",
    deliveryCity: "Abuja",
    orderDate: "2026-02-25",
    expectedDate: "2026-03-02",
    deliveredDate: "2026-03-01",
    status: "delivered",
    steps: [
      { label: "Ordered", date: "Feb 25, 2026", completed: true, current: false },
      { label: "Confirmed", date: "Feb 26, 2026", completed: true, current: false },
      { label: "Dispatched", date: "Feb 28, 2026", completed: true, current: false },
      { label: "Delivered", date: "Mar 1, 2026", completed: true, current: true },
    ],
    paymentMethod: "Bank Transfer",
    paymentStatus: "paid",
    notes: "Rebar quality verified on site. All specifications met.",
  },
  {
    id: "ord-007",
    orderNumber: "BNG-2026-0198",
    items: [
      { name: "Building Blocks 9\"", quantity: 2000, unit: "pieces", unitPrice: 350, total: 700000 },
    ],
    supplier: "Enugu Building World",
    supplierPhone: "+234 808 890 1234",
    totalAmount: 700000,
    deliveryAddress: "12 Chime Avenue, New Haven",
    deliveryCity: "Enugu",
    orderDate: "2026-02-18",
    expectedDate: "2026-02-22",
    deliveredDate: "2026-02-23",
    status: "delivered",
    steps: [
      { label: "Ordered", date: "Feb 18, 2026", completed: true, current: false },
      { label: "Confirmed", date: "Feb 19, 2026", completed: true, current: false },
      { label: "Dispatched", date: "Feb 21, 2026", completed: true, current: false },
      { label: "Delivered", date: "Feb 23, 2026", completed: true, current: true },
    ],
    paymentMethod: "Bank Transfer",
    paymentStatus: "paid",
    notes: "15 blocks arrived damaged. Replacement delivered same day.",
  },
  {
    id: "ord-008",
    orderNumber: "BNG-2026-0156",
    items: [
      { name: "Plywood 18mm (Full Sheet)", quantity: 50, unit: "sheets", unitPrice: 12000, total: 600000 },
      { name: "2x3 Timber (Hardwood)", quantity: 100, unit: "pieces", unitPrice: 1500, total: 150000 },
      { name: "4\" Nails", quantity: 25, unit: "kg", unitPrice: 2000, total: 50000 },
    ],
    supplier: "Kola & Sons Construction",
    supplierPhone: "+234 805 567 8901",
    totalAmount: 800000,
    deliveryAddress: "Ring Road, Challenge",
    deliveryCity: "Ibadan",
    orderDate: "2026-02-10",
    expectedDate: "2026-02-14",
    deliveredDate: "2026-02-14",
    status: "delivered",
    steps: [
      { label: "Ordered", date: "Feb 10, 2026", completed: true, current: false },
      { label: "Confirmed", date: "Feb 10, 2026", completed: true, current: false },
      { label: "Dispatched", date: "Feb 13, 2026", completed: true, current: false },
      { label: "Delivered", date: "Feb 14, 2026", completed: true, current: true },
    ],
    paymentMethod: "Cash on Delivery",
    paymentStatus: "paid",
    notes: "Timber quality was excellent. Good for formwork.",
  },
];

function getStatusColor(status: Order["status"]) {
  switch (status) {
    case "ordered":
      return "bg-blue-100 text-blue-700";
    case "confirmed":
      return "bg-yellow-100 text-yellow-700";
    case "dispatched":
      return "bg-purple-100 text-purple-700";
    case "delivered":
      return "bg-green-100 text-green-700";
  }
}

function getStatusIcon(status: Order["status"]) {
  switch (status) {
    case "ordered":
      return <ShoppingCart className="h-3.5 w-3.5 mr-1" />;
    case "confirmed":
      return <CheckCircle2 className="h-3.5 w-3.5 mr-1" />;
    case "dispatched":
      return <Truck className="h-3.5 w-3.5 mr-1" />;
    case "delivered":
      return <CheckCircle2 className="h-3.5 w-3.5 mr-1" />;
  }
}

function getPaymentBadge(paymentStatus: Order["paymentStatus"]) {
  switch (paymentStatus) {
    case "paid":
      return <Badge className="bg-green-100 text-green-700">Paid</Badge>;
    case "pending":
      return <Badge className="bg-red-100 text-red-700">Pending</Badge>;
    case "partial":
      return <Badge className="bg-amber-100 text-amber-700">Partial Payment</Badge>;
  }
}

function getProgressValue(status: Order["status"]) {
  switch (status) {
    case "ordered":
      return 25;
    case "confirmed":
      return 50;
    case "dispatched":
      return 75;
    case "delivered":
      return 100;
  }
}

function OrderTracker({ steps }: { steps: OrderStep[] }) {
  return (
    <div className="flex items-center w-full">
      {steps.map((step, index) => (
        <React.Fragment key={step.label}>
          <div className="flex flex-col items-center min-w-0">
            <div
              className={`flex items-center justify-center h-8 w-8 rounded-full border-2 transition-colors ${
                step.completed
                  ? step.current
                    ? "bg-emerald-600 border-emerald-600 text-white"
                    : "bg-emerald-100 border-emerald-500 text-emerald-600"
                  : "bg-white border-gray-300 text-gray-400"
              }`}
            >
              {step.completed ? (
                step.current ? (
                  <CircleDot className="h-4 w-4" />
                ) : (
                  <CheckCircle2 className="h-4 w-4" />
                )
              ) : (
                <Circle className="h-4 w-4" />
              )}
            </div>
            <p
              className={`text-xs mt-1 font-medium text-center ${
                step.completed ? "text-emerald-700" : "text-gray-400"
              }`}
            >
              {step.label}
            </p>
            {step.date && (
              <p className="text-[10px] text-gray-400 text-center mt-0.5">
                {step.date}
              </p>
            )}
          </div>
          {index < steps.length - 1 && (
            <div
              className={`flex-1 h-0.5 mx-2 mt-[-20px] ${
                steps[index + 1].completed
                  ? "bg-emerald-500"
                  : "bg-gray-200"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

function OrderCard({
  order,
  defaultExpanded = false,
}: {
  order: Order;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const [trackDialogOpen, setTrackDialogOpen] = useState(false);

  const itemSummary =
    order.items.length === 1
      ? `${order.items[0].quantity} ${order.items[0].unit} ${order.items[0].name}`
      : `${order.items.length} items`;

  return (
    <Card className="overflow-hidden">
      <div
        className="p-4 cursor-pointer hover:bg-gray-50/50 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div className="flex items-start gap-3 flex-1">
            <div
              className={`h-10 w-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                order.status === "delivered"
                  ? "bg-green-100"
                  : order.status === "dispatched"
                  ? "bg-purple-100"
                  : "bg-yellow-100"
              }`}
            >
              {order.status === "delivered" ? (
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              ) : order.status === "dispatched" ? (
                <Truck className="h-5 w-5 text-purple-600" />
              ) : (
                <Clock className="h-5 w-5 text-yellow-600" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <p className="font-semibold text-gray-900">
                  {order.orderNumber}
                </p>
                <Badge className={getStatusColor(order.status)}>
                  {getStatusIcon(order.status)}
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
                {getPaymentBadge(order.paymentStatus)}
              </div>
              <p className="text-sm text-gray-600 mt-0.5">{itemSummary}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400 mt-1">
                <span className="flex items-center gap-1">
                  <Building2 className="h-3 w-3" />
                  {order.supplier}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {order.orderDate}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                {formatNaira(order.totalAmount)}
              </p>
              {order.status !== "delivered" && (
                <p className="text-xs text-gray-500">
                  ETA: {order.expectedDate}
                </p>
              )}
              {order.deliveredDate && (
                <p className="text-xs text-green-600">
                  Delivered: {order.deliveredDate}
                </p>
              )}
            </div>
            <div className="text-gray-400">
              {expanded ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </div>
          </div>
        </div>

        {/* Progress bar for active orders */}
        {order.status !== "delivered" && (
          <div className="mt-3">
            <Progress
              value={getProgressValue(order.status)}
              className="h-2"
            />
          </div>
        )}
      </div>

      {/* Expanded Details */}
      {expanded && (
        <div className="border-t border-gray-100 bg-gray-50/50 p-4 space-y-4">
          {/* Order Tracker */}
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-900 mb-4">
              Order Progress
            </h4>
            <OrderTracker steps={order.steps} />
          </div>

          {/* Items Table */}
          <div className="bg-white rounded-lg border border-gray-200">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Material</TableHead>
                  <TableHead className="text-right">Quantity</TableHead>
                  <TableHead className="text-right">Unit Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="text-right">
                      {item.quantity.toLocaleString()} {item.unit}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatNaira(item.unitPrice)}
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {formatNaira(item.total)}
                    </TableCell>
                  </TableRow>
                ))}
                <TableRow>
                  <TableCell
                    colSpan={3}
                    className="text-right font-bold text-gray-900"
                  >
                    Total
                  </TableCell>
                  <TableCell className="text-right font-bold text-emerald-700 text-lg">
                    {formatNaira(order.totalAmount)}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>

          {/* Delivery & Supplier Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">
                Delivery Details
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {order.deliveryAddress}
                    </p>
                    <p className="text-gray-500">{order.deliveryCity}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    Expected: {order.expectedDate}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">
                    Payment: {order.paymentMethod}
                  </span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200 space-y-3">
              <h4 className="text-sm font-semibold text-gray-900">
                Supplier Info
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-gray-400" />
                  <span className="font-medium text-gray-900">
                    {order.supplier}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-gray-600">{order.supplierPhone}</span>
                </div>
                {order.notes && (
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{order.notes}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {order.status === "dispatched" && (
              <Dialog
                open={trackDialogOpen}
                onOpenChange={setTrackDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Navigation className="h-4 w-4 mr-1" />
                    Track Delivery
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Track Delivery</DialogTitle>
                    <DialogDescription>
                      Real-time location tracking for order{" "}
                      {order.orderNumber}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-gray-300 mx-auto" />
                        <p className="text-sm text-gray-400 mt-2">
                          Live Map View
                        </p>
                        <p className="text-xs text-gray-400">
                          GPS tracking will appear here
                        </p>
                      </div>
                    </div>
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Truck className="h-4 w-4 text-emerald-600" />
                        <span className="font-medium text-emerald-700">
                          In Transit
                        </span>
                      </div>
                      <p className="text-sm text-emerald-600 mt-1">
                        Estimated arrival: Tomorrow by 12:00 PM
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {order.notes}
                      </p>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setTrackDialogOpen(false)}>
                      Close
                    </Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                      <Phone className="h-4 w-4 mr-1" />
                      Call Driver
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            {order.status === "delivered" && (
              <>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-1" />
                  Download Receipt
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <RotateCcw className="h-4 w-4 mr-1" />
                  Reorder
                </Button>
              </>
            )}
            {order.status !== "delivered" && (
              <Button variant="outline">
                <Phone className="h-4 w-4 mr-1" />
                Contact Supplier
              </Button>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

export default function MaterialsOrdersPage() {
  const totalActiveValue = activeOrders
    .filter((o) => o.status !== "delivered")
    .reduce((sum, o) => sum + o.totalAmount, 0);

  const totalAllTimeValue = [...activeOrders, ...pastOrders].reduce(
    (sum, o) => sum + o.totalAmount,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/materials"
            className="text-gray-400 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
            <p className="text-sm text-gray-500">
              Track and manage your material orders
            </p>
          </div>
        </div>
        <Link href="/dashboard/materials">
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <ShoppingCart className="h-4 w-4 mr-1" />
            New Order
          </Button>
        </Link>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <Package className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {activeOrders.length + pastOrders.length}
              </p>
              <p className="text-xs text-gray-500">Total Orders</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Truck className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {activeOrders.filter((o) => o.status !== "delivered").length}
              </p>
              <p className="text-xs text-gray-500">In Progress</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {formatNaira(totalActiveValue)}
              </p>
              <p className="text-xs text-gray-500">Active Value</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {formatNaira(totalAllTimeValue)}
              </p>
              <p className="text-xs text-gray-500">All-Time Spend</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Orders Tabs */}
      <Tabs defaultValue="active" className="space-y-4">
        <TabsList>
          <TabsTrigger value="active" className="gap-1">
            <Truck className="h-4 w-4" />
            Active Orders
            <Badge className="bg-emerald-100 text-emerald-700 ml-1">
              {activeOrders.length}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="past" className="gap-1">
            <CheckCircle2 className="h-4 w-4" />
            Past Orders
            <Badge className="bg-gray-200 text-gray-600 ml-1">
              {pastOrders.length}
            </Badge>
          </TabsTrigger>
        </TabsList>

        {/* Active Orders */}
        <TabsContent value="active" className="space-y-4">
          {activeOrders.map((order, index) => (
            <OrderCard
              key={order.id}
              order={order}
              defaultExpanded={index === 0}
            />
          ))}
        </TabsContent>

        {/* Past Orders */}
        <TabsContent value="past" className="space-y-4">
          {pastOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
