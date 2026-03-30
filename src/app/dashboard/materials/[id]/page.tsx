"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
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
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { formatNaira } from "@/lib/utils";
import {
  ArrowLeft,
  Package,
  Star,
  TrendingUp,
  TrendingDown,
  MapPin,
  Phone,
  Mail,
  ShoppingCart,
  Users,
  AlertTriangle,
  BarChart3,
  Clock,
  CheckCircle2,
  Building2,
  Truck,
  Shield,
  ThumbsUp,
  MessageSquare,
  ExternalLink,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";

// --- Mock Data ---

const material = {
  id: "dangote-cement-50kg",
  name: "Dangote Cement 50kg",
  brand: "Dangote",
  category: "Cement",
  unit: "Bag (50kg)",
  sku: "DNG-CEM-50K",
  description:
    "Dangote 3X Cement is a Portland Limestone Cement (Grade 42.5R) suitable for all concrete and masonry works. It is the most popular cement brand in Nigeria with consistent quality and strength performance.",
  specifications: [
    { label: "Type", value: "Portland Limestone Cement" },
    { label: "Grade", value: "42.5R" },
    { label: "Weight", value: "50kg per bag" },
    { label: "Bags per Pallet", value: "50" },
    { label: "Setting Time", value: "45 minutes (initial)" },
    { label: "Compressive Strength (28 days)", value: "42.5 N/mm\u00B2" },
  ],
  avgPrice: 6500,
  minPrice: 5800,
  maxPrice: 7500,
  priceChange: 4.8,
  lastUpdated: "2026-03-28",
};

const cityPrices = [
  { city: "Lagos (Mainland)", avgPrice: 6200, minPrice: 5800, maxPrice: 6600, trend: "up", change: 3.2 },
  { city: "Lagos (Island)", avgPrice: 6500, minPrice: 6100, maxPrice: 7000, trend: "up", change: 4.1 },
  { city: "Abuja (FCT)", avgPrice: 6800, minPrice: 6400, maxPrice: 7200, trend: "up", change: 5.6 },
  { city: "Port Harcourt", avgPrice: 6900, minPrice: 6500, maxPrice: 7500, trend: "up", change: 6.2 },
  { city: "Ibadan", avgPrice: 6100, minPrice: 5800, maxPrice: 6500, trend: "stable", change: 1.0 },
  { city: "Kano", avgPrice: 7000, minPrice: 6600, maxPrice: 7400, trend: "up", change: 5.0 },
  { city: "Enugu", avgPrice: 6700, minPrice: 6300, maxPrice: 7100, trend: "up", change: 4.5 },
  { city: "Benin City", avgPrice: 6600, minPrice: 6200, maxPrice: 7000, trend: "stable", change: 1.8 },
  { city: "Kaduna", avgPrice: 6900, minPrice: 6500, maxPrice: 7300, trend: "up", change: 5.3 },
  { city: "Warri", avgPrice: 6800, minPrice: 6300, maxPrice: 7200, trend: "up", change: 4.9 },
];

const priceHistory = [
  { month: "Oct 2025", lagos: 5800, abuja: 6200, ph: 6400 },
  { month: "Nov 2025", lagos: 5900, abuja: 6300, ph: 6500 },
  { month: "Dec 2025", lagos: 6000, abuja: 6500, ph: 6600 },
  { month: "Jan 2026", lagos: 6100, abuja: 6600, ph: 6700 },
  { month: "Feb 2026", lagos: 6150, abuja: 6700, ph: 6800 },
  { month: "Mar 2026", lagos: 6200, abuja: 6800, ph: 6900 },
];

const suppliers = [
  {
    id: 1,
    name: "Lagos Building Materials Ltd",
    location: "Lekki, Lagos",
    price: 5800,
    minOrder: 100,
    delivery: true,
    deliveryFee: 25000,
    rating: 4.8,
    reviews: 342,
    phone: "+234 801 234 5678",
    email: "sales@lagosbm.com.ng",
    verified: true,
    responseTime: "< 1 hour",
  },
  {
    id: 2,
    name: "AbujaBuild Supplies",
    location: "Wuse, Abuja",
    price: 6400,
    minOrder: 50,
    delivery: true,
    deliveryFee: 15000,
    rating: 4.6,
    reviews: 218,
    phone: "+234 802 345 6789",
    email: "orders@abujabuild.ng",
    verified: true,
    responseTime: "< 2 hours",
  },
  {
    id: 3,
    name: "Dangote Distributors PH",
    location: "Rumuola, Port Harcourt",
    price: 6500,
    minOrder: 200,
    delivery: true,
    deliveryFee: 0,
    rating: 4.9,
    reviews: 567,
    phone: "+234 803 456 7890",
    email: "info@dangotedistph.com",
    verified: true,
    responseTime: "< 30 mins",
  },
  {
    id: 4,
    name: "Kola & Sons Construction",
    location: "Ring Road, Ibadan",
    price: 5900,
    minOrder: 50,
    delivery: true,
    deliveryFee: 20000,
    rating: 4.3,
    reviews: 89,
    phone: "+234 805 567 8901",
    email: "kolasons@gmail.com",
    verified: false,
    responseTime: "< 3 hours",
  },
  {
    id: 5,
    name: "Northern Materials Hub",
    location: "Sabon Gari, Kano",
    price: 6600,
    minOrder: 100,
    delivery: true,
    deliveryFee: 30000,
    rating: 4.5,
    reviews: 156,
    phone: "+234 806 678 9012",
    email: "northernhub@yahoo.com",
    verified: true,
    responseTime: "< 1 hour",
  },
  {
    id: 6,
    name: "BulkCem Nigeria",
    location: "Apapa, Lagos",
    price: 5850,
    minOrder: 500,
    delivery: true,
    deliveryFee: 0,
    rating: 4.7,
    reviews: 423,
    phone: "+234 807 789 0123",
    email: "bulk@bulkcem.ng",
    verified: true,
    responseTime: "< 1 hour",
  },
  {
    id: 7,
    name: "Enugu Building World",
    location: "New Haven, Enugu",
    price: 6300,
    minOrder: 30,
    delivery: true,
    deliveryFee: 18000,
    rating: 4.4,
    reviews: 112,
    phone: "+234 808 890 1234",
    email: "sales@enugubw.com",
    verified: false,
    responseTime: "< 2 hours",
  },
  {
    id: 8,
    name: "Cement Direct Warehouse",
    location: "Ikeja, Lagos",
    price: 6000,
    minOrder: 200,
    delivery: true,
    deliveryFee: 10000,
    rating: 4.6,
    reviews: 298,
    phone: "+234 809 901 2345",
    email: "warehouse@cementdirect.ng",
    verified: true,
    responseTime: "< 1 hour",
  },
  {
    id: 9,
    name: "Benin Materials Market",
    location: "Sapele Road, Benin",
    price: 6200,
    minOrder: 20,
    delivery: false,
    deliveryFee: 0,
    rating: 4.1,
    reviews: 67,
    phone: "+234 810 012 3456",
    email: "beninmaterials@gmail.com",
    verified: false,
    responseTime: "< 4 hours",
  },
  {
    id: 10,
    name: "Kaduna Cement Depot",
    location: "Barnawa, Kaduna",
    price: 6500,
    minOrder: 100,
    delivery: true,
    deliveryFee: 25000,
    rating: 4.5,
    reviews: 134,
    phone: "+234 811 123 4567",
    email: "depot@kadunacem.ng",
    verified: true,
    responseTime: "< 2 hours",
  },
];

const relatedMaterials = [
  { id: "bua-cement-50kg", name: "BUA Cement 50kg", price: 6300, change: 3.1 },
  { id: "lafarge-cement-50kg", name: "Lafarge Cement 50kg", price: 6400, change: 2.8 },
  { id: "sharp-sand-ton", name: "Sharp Sand (per ton)", price: 18000, change: -1.2 },
  { id: "granite-20mm-ton", name: "Granite 20mm (per ton)", price: 32000, change: 5.5 },
  { id: "building-blocks-9inch", name: "Building Blocks 9\"", price: 350, change: 0 },
  { id: "iron-rod-12mm", name: "Iron Rod 12mm (per ton)", price: 320000, change: 7.2 },
];

const supplierReviews = [
  {
    supplier: "Lagos Building Materials Ltd",
    reviewer: "Engr. Adebayo O.",
    rating: 5,
    date: "2026-03-15",
    comment: "Excellent service. Cement was delivered within 24 hours and quality is consistent. Highly recommend for bulk orders.",
  },
  {
    supplier: "Dangote Distributors PH",
    reviewer: "Arc. Nkechi E.",
    rating: 5,
    date: "2026-03-10",
    comment: "Best prices in Port Harcourt. Free delivery for orders above 200 bags. Always on time.",
  },
  {
    supplier: "BulkCem Nigeria",
    reviewer: "Builder Chukwuma I.",
    rating: 4,
    date: "2026-03-08",
    comment: "Good prices for bulk. Minimum order is high (500 bags) but free delivery makes up for it. Quality cement, no complaints.",
  },
  {
    supplier: "AbujaBuild Supplies",
    reviewer: "Engr. Musa A.",
    rating: 5,
    date: "2026-02-28",
    comment: "Very responsive team. Ordered 300 bags and they arrived next day. Will use again for our Abuja projects.",
  },
  {
    supplier: "Cement Direct Warehouse",
    reviewer: "QS Ibrahim T.",
    rating: 4,
    date: "2026-02-20",
    comment: "Fair pricing. Delivery fee is reasonable. Only issue was a slight delay during the rainy season.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`h-4 w-4 ${
            star <= rating
              ? "fill-amber-400 text-amber-400"
              : "fill-gray-200 text-gray-200"
          }`}
        />
      ))}
    </div>
  );
}

export default function MaterialDetailPage() {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportCity, setReportCity] = useState("");
  const [reportPrice, setReportPrice] = useState("");
  const [reportSupplier, setReportSupplier] = useState("");
  const [sortBy, setSortBy] = useState("price-asc");

  const sortedSuppliers = [...suppliers].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6">
      {/* Breadcrumb & Back */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link
          href="/dashboard/materials"
          className="flex items-center gap-1 hover:text-emerald-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Materials
        </Link>
        <span>/</span>
        <span className="text-gray-400">Cement</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">{material.name}</span>
      </div>

      {/* Header Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image & Basic Info */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <ImageIcon className="h-16 w-16 text-gray-300 mx-auto" />
                <p className="text-sm text-gray-400 mt-2">Product Image</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {material.name}
                </h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-emerald-100 text-emerald-700">
                    {material.category}
                  </Badge>
                  <Badge variant="outline">{material.brand}</Badge>
                </div>
              </div>
              <Separator />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Unit</span>
                  <span className="font-medium">{material.unit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">SKU</span>
                  <span className="font-medium">{material.sku}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Last Updated</span>
                  <span className="font-medium">{material.lastUpdated}</span>
                </div>
              </div>
              <Separator />
              <p className="text-sm text-gray-600 leading-relaxed">
                {material.description}
              </p>
              <Separator />
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  Specifications
                </h3>
                {material.specifications.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-gray-500">{spec.label}</span>
                    <span className="font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price Overview & Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>Price Overview</CardTitle>
                <CardDescription>
                  National average across all tracked cities
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Dialog
                  open={reportDialogOpen}
                  onOpenChange={setReportDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      Report Price
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Report a Price</DialogTitle>
                      <DialogDescription>
                        Help keep prices accurate by reporting what you paid. Your
                        report is anonymous and helps other builders.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-2">
                      <div className="space-y-2">
                        <Label htmlFor="report-city">City</Label>
                        <Select
                          value={reportCity}
                          onValueChange={setReportCity}
                        >
                          <SelectTrigger id="report-city">
                            <SelectValue placeholder="Select city" />
                          </SelectTrigger>
                          <SelectContent>
                            {cityPrices.map((cp) => (
                              <SelectItem key={cp.city} value={cp.city}>
                                {cp.city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="report-price">
                          Price per {material.unit}
                        </Label>
                        <Input
                          id="report-price"
                          type="number"
                          placeholder="e.g. 6500"
                          value={reportPrice}
                          onChange={(e) => setReportPrice(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="report-supplier">
                          Supplier (optional)
                        </Label>
                        <Input
                          id="report-supplier"
                          placeholder="e.g. Lagos Building Materials Ltd"
                          value={reportSupplier}
                          onChange={(e) => setReportSupplier(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setReportDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                        onClick={() => {
                          setReportDialogOpen(false);
                          setReportCity("");
                          setReportPrice("");
                          setReportSupplier("");
                        }}
                      >
                        Submit Report
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <ShoppingCart className="h-4 w-4 mr-1" />
                  Add to Group Order
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Price Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                <p className="text-sm text-emerald-600 font-medium">
                  Avg. Price
                </p>
                <p className="text-2xl font-bold text-emerald-700">
                  {formatNaira(material.avgPrice)}
                </p>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <p className="text-sm text-blue-600 font-medium">
                  Lowest Price
                </p>
                <p className="text-2xl font-bold text-blue-700">
                  {formatNaira(material.minPrice)}
                </p>
              </div>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 text-center">
                <p className="text-sm text-orange-600 font-medium">
                  Highest Price
                </p>
                <p className="text-2xl font-bold text-orange-700">
                  {formatNaira(material.maxPrice)}
                </p>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-sm text-red-600 font-medium">
                  Monthly Change
                </p>
                <div className="flex items-center justify-center gap-1">
                  <TrendingUp className="h-5 w-5 text-red-600" />
                  <p className="text-2xl font-bold text-red-700">
                    +{material.priceChange}%
                  </p>
                </div>
              </div>
            </div>

            {/* Price Prediction */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
              <BarChart3 className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-amber-800">
                  Price Prediction
                </h4>
                <p className="text-sm text-amber-700 mt-1">
                  Based on historical trends and seasonal demand patterns, prices
                  for Dangote Cement are expected to{" "}
                  <span className="font-bold">rise by approximately 3%</span>{" "}
                  next month. The upcoming rainy season typically drives increased
                  construction activity, pushing demand and prices higher. Consider
                  bulk purchasing now to lock in current rates.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Price Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-emerald-600" />
            6-Month Price Trend
          </CardTitle>
          <CardDescription>
            Tracking price per bag across major cities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={priceHistory}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="month"
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                />
                <YAxis
                  tick={{ fontSize: 12 }}
                  stroke="#9ca3af"
                  tickFormatter={(value) => `\u20A6${value.toLocaleString()}`}
                />
                <Tooltip
                  formatter={(value) =>
                    formatNaira(Number(value))
                  }
                  contentStyle={{
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="lagos"
                  name="Lagos"
                  stroke="#10b981"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="abuja"
                  name="Abuja"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="ph"
                  name="Port Harcourt"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* City Prices Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-emerald-600" />
            Current Prices Across Cities
          </CardTitle>
          <CardDescription>
            Average price per bag in major Nigerian cities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>City</TableHead>
                <TableHead className="text-right">Average Price</TableHead>
                <TableHead className="text-right">Min Price</TableHead>
                <TableHead className="text-right">Max Price</TableHead>
                <TableHead className="text-right">Trend</TableHead>
                <TableHead className="text-right">Monthly Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cityPrices.map((cp) => (
                <TableRow key={cp.city}>
                  <TableCell className="font-medium">{cp.city}</TableCell>
                  <TableCell className="text-right font-semibold">
                    {formatNaira(cp.avgPrice)}
                  </TableCell>
                  <TableCell className="text-right text-blue-600">
                    {formatNaira(cp.minPrice)}
                  </TableCell>
                  <TableCell className="text-right text-orange-600">
                    {formatNaira(cp.maxPrice)}
                  </TableCell>
                  <TableCell className="text-right">
                    {cp.trend === "up" ? (
                      <Badge className="bg-red-100 text-red-700">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        Rising
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-700">
                        Stable
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <span
                      className={
                        cp.change > 2 ? "text-red-600" : "text-gray-600"
                      }
                    >
                      +{cp.change}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Supplier Comparison */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-emerald-600" />
                Supplier Comparison
              </CardTitle>
              <CardDescription>
                Compare prices and ratings across 10 verified suppliers
              </CardDescription>
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {sortedSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-emerald-300 hover:shadow-sm transition-all"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">
                        {supplier.name}
                      </h3>
                      {supplier.verified && (
                        <Badge className="bg-blue-100 text-blue-700">
                          <Shield className="h-3 w-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {supplier.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        Responds {supplier.responseTime}
                      </span>
                      <span className="flex items-center gap-1">
                        <Package className="h-3.5 w-3.5" />
                        Min. {supplier.minOrder} bags
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <StarRating rating={Math.round(supplier.rating)} />
                      <span className="text-sm text-gray-600">
                        {supplier.rating} ({supplier.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-2xl font-bold text-emerald-700">
                        {formatNaira(supplier.price)}
                      </p>
                      <p className="text-xs text-gray-500">per bag</p>
                      {supplier.delivery ? (
                        <p className="text-xs text-emerald-600 flex items-center justify-end gap-1 mt-1">
                          <Truck className="h-3 w-3" />
                          {supplier.deliveryFee === 0
                            ? "Free delivery"
                            : `Delivery: ${formatNaira(supplier.deliveryFee)}`}
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400 mt-1">
                          Pickup only
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white"
                      >
                        <Phone className="h-3.5 w-3.5 mr-1" />
                        Call
                      </Button>
                      <Button size="sm" variant="outline">
                        <Mail className="h-3.5 w-3.5 mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Reviews & Related Materials */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Supplier Reviews */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-emerald-600" />
              Supplier Reviews
            </CardTitle>
            <CardDescription>
              Recent reviews from verified buyers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {supplierReviews.map((review, index) => (
                <div key={index}>
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {review.reviewer}
                      </p>
                      <p className="text-xs text-gray-500">
                        on {review.supplier}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <StarRating rating={review.rating} />
                      <span className="text-xs text-gray-400">
                        {review.date}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{review.comment}</p>
                  {index < supplierReviews.length - 1 && (
                    <Separator className="mt-4" />
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Related Materials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-emerald-600" />
              Related Materials
            </CardTitle>
            <CardDescription>
              Materials commonly purchased together
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {relatedMaterials.map((rm) => (
                <Link
                  key={rm.id}
                  href={`/dashboard/materials/${rm.id}`}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-100 transition-colors">
                      <Package className="h-5 w-5 text-gray-400 group-hover:text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">
                        {rm.name}
                      </p>
                      <p className="text-sm text-emerald-600 font-semibold">
                        {formatNaira(rm.price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {rm.change > 0 ? (
                      <Badge className="bg-red-100 text-red-700 text-xs">
                        <TrendingUp className="h-3 w-3 mr-0.5" />+{rm.change}%
                      </Badge>
                    ) : rm.change < 0 ? (
                      <Badge className="bg-green-100 text-green-700 text-xs">
                        <TrendingDown className="h-3 w-3 mr-0.5" />
                        {rm.change}%
                      </Badge>
                    ) : (
                      <Badge className="bg-gray-100 text-gray-600 text-xs">
                        Stable
                      </Badge>
                    )}
                    <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-emerald-600" />
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
