import Link from "next/link";
import {
  Package,
  TrendingDown,
  Users,
  Star,
  Bell,
  Truck,
  Percent,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BarChart3,
  ShieldCheck,
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
import { Separator } from "@/components/ui/separator";

const problems = [
  {
    stat: "25-40%",
    description: "markup charged by retail material sellers over factory price",
  },
  {
    stat: "Zero",
    description:
      "price transparency across cement, iron rod, and granite suppliers",
  },
  {
    stat: "3 in 5",
    description:
      "builders report receiving substandard materials after paying premium prices",
  },
];

const steps = [
  {
    number: "01",
    title: "Check Prices",
    description:
      "See real-time wholesale and retail prices for cement, iron rods, granite, sand, blocks, tiles, and 200+ materials across Nigerian states.",
  },
  {
    number: "02",
    title: "Join a Group Buy",
    description:
      "Pool your order with other builders in your area. When the group hits the minimum order quantity, everyone gets the bulk discount.",
  },
  {
    number: "03",
    title: "Save 10-15%",
    description:
      "Pay wholesale prices even on small orders. The savings on a typical 4-bedroom bungalow can exceed N1.5 million.",
  },
];

const features = [
  {
    icon: BarChart3,
    title: "Real-Time Prices",
    description:
      "Live market prices for cement, iron rods, granite, sand, blocks, roofing sheets, and 200+ building materials across all 36 states and the FCT.",
  },
  {
    icon: Users,
    title: "Group Buying",
    description:
      "Join verified buying groups in your location. When the group order hits minimum quantity, the supplier ships at wholesale prices to everyone.",
  },
  {
    icon: Star,
    title: "Supplier Ratings",
    description:
      "Every supplier is rated by real buyers on quality, delivery speed, and reliability. See verified purchase reviews before you order.",
  },
  {
    icon: Bell,
    title: "Price Alerts",
    description:
      "Set alerts for materials you need. We notify you when prices drop, when group buys open near you, or when a trusted supplier runs a promotion.",
  },
  {
    icon: Truck,
    title: "Delivery Tracking",
    description:
      "Track your material delivery from warehouse to site with real-time GPS. Get notifications when the truck is 30 minutes away so your labourers are ready.",
  },
  {
    icon: Percent,
    title: "Bulk Discounts",
    description:
      "Access factory-direct pricing on large orders. We have negotiated standing agreements with Dangote, BUA, Lafarge, and 50+ major manufacturers.",
  },
];

const materialPrices = [
  { name: "Dangote Cement (50kg)", retail: "N7,500", buildng: "N6,400" },
  { name: "12mm Iron Rod (length)", retail: "N5,200", buildng: "N4,500" },
  { name: "Granite (per ton)", retail: "N32,000", buildng: "N27,500" },
  { name: "Sharp Sand (trip)", retail: "N85,000", buildng: "N72,000" },
];

export default function MaterialsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Package className="mr-1.5 h-3 w-3" />
              Materials Marketplace
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Stop Overpaying for{" "}
              <span className="text-emerald-600">Building Materials</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Access real-time material prices, join group buying cooperatives,
              and save 10-15% on every order. BuildNG connects you directly to
              verified suppliers and manufacturers across Nigeria.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-2">
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="border-y border-gray-100 bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge variant="warning" className="mb-4">
              <AlertTriangle className="mr-1.5 h-3 w-3" />
              The Problem
            </Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              The Material Market is Rigged Against Small Buyers
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              If you are building one house, you pay retail. If you are building
              ten, you get wholesale. There has never been a way for individual
              homebuilders to access fair pricing until now.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {problems.map((problem) => (
              <Card key={problem.description} className="text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="text-4xl font-bold text-emerald-600">
                    {problem.stat}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4">Our Solution</Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Group Buying Power Meets Price Transparency
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We aggregate demand from builders in the same area, negotiate
              factory-direct prices, and pass the savings to you. No middlemen,
              no inflated invoices, no substandard substitutions.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* How It Works */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Three steps to start saving on every bag of cement and length of
              iron rod.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-4xl gap-12 md:grid-cols-3">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Price Comparison */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              See the Difference
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Real price comparisons from Lagos market, updated weekly.
            </p>
          </div>
          <div className="mx-auto mt-12 max-w-2xl">
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 border-b border-gray-100 pb-3 text-sm font-semibold text-gray-500">
                    <span>Material</span>
                    <span className="text-center">Retail Price</span>
                    <span className="text-center text-emerald-600">
                      BuildNG Price
                    </span>
                  </div>
                  {materialPrices.map((item) => (
                    <div
                      key={item.name}
                      className="grid grid-cols-3 items-center border-b border-gray-50 pb-3 text-sm"
                    >
                      <span className="font-medium text-gray-900">
                        {item.name}
                      </span>
                      <span className="text-center text-gray-500 line-through">
                        {item.retail}
                      </span>
                      <span className="text-center font-semibold text-emerald-600">
                        {item.buildng}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-center text-xs text-gray-400">
                  Prices shown for Lagos mainland. Actual prices vary by
                  location and order volume.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Built for How Nigerians Actually Buy Materials
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Every feature designed around the real challenges of sourcing
              building materials in Nigeria.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                    <feature.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Free to Browse. Free to Save.
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Price checking is always free. We earn a small commission from
              suppliers when you order through our platform.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Free</CardTitle>
                <CardDescription>For individual builders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  N0{" "}
                  <span className="text-base font-normal text-gray-500">
                    forever
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    "Real-time price checking",
                    "Join group buys",
                    "Supplier ratings",
                    "Basic price alerts",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/register" className="mt-8 block">
                  <Button className="w-full">Get Started Free</Button>
                </Link>
              </CardContent>
            </Card>
            <Card className="border-emerald-200 shadow-emerald-100">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Pro Buyer</CardTitle>
                  <Badge>Best Value</Badge>
                </div>
                <CardDescription>For contractors and developers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  N25,000{" "}
                  <span className="text-base font-normal text-gray-500">
                    / month
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    "Everything in Free",
                    "Priority group buy access",
                    "Advanced price alerts",
                    "Delivery tracking",
                    "Purchase analytics",
                    "Dedicated account manager",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Link href="/contact" className="mt-8 block">
                  <Button className="w-full">Talk to Sales</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-y border-gray-100 bg-emerald-50 py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <ShieldCheck className="h-8 w-8 text-emerald-600" />
          </div>
          <blockquote className="mt-6 text-xl leading-relaxed text-gray-800">
            &ldquo;I used to send my site foreman to Owode-Onirin market and
            just hope he brought the right quality. With BuildNG, I compare
            prices online, order from rated suppliers, and track delivery to
            site. I saved over N2 million on my last project in Abuja.&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold text-gray-900">Engr. Babajide Akinwale</p>
            <p className="text-sm text-gray-600">
              Contractor, JBA Construction Ltd, Abuja
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-emerald-600 px-8 py-16 text-center shadow-xl sm:px-16">
            <TrendingDown className="mx-auto h-12 w-12 text-emerald-200" />
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Start Saving on Materials Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
              Check prices for free. No credit card required. See how much you
              could save on your next building project.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button
                  size="lg"
                  className="gap-2 bg-white text-emerald-700 hover:bg-emerald-50"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-400 text-white hover:bg-emerald-700"
                >
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
