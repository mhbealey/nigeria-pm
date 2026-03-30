import Link from "next/link";
import {
  Building2,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  LayoutDashboard,
  Home,
  BarChart3,
  FileText,
  Users,
  PieChart,
  Wallet,
  TrendingUp,
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
    stat: "Excel",
    description:
      "spreadsheets managing N500M+ estate developments, with version conflicts and formula errors",
  },
  {
    stat: "WhatsApp",
    description:
      "groups as the primary communication channel between developers, contractors, and buyers",
  },
  {
    stat: "3 months",
    description:
      "average delay in producing accurate investor reports because data lives in 6 different places",
  },
];

const steps = [
  {
    number: "01",
    title: "Create Your Estate",
    description:
      "Set up your estate portfolio in minutes. Define units, phases, pricing, and payment plans. Import existing data from spreadsheets.",
  },
  {
    number: "02",
    title: "Track Everything",
    description:
      "Monitor construction progress, sales pipeline, payment collections, and contractor deliverables from one dashboard.",
  },
  {
    number: "03",
    title: "Generate Reports",
    description:
      "Produce investor-grade financial reports, construction progress summaries, and sales analytics with one click.",
  },
  {
    number: "04",
    title: "Scale Confidently",
    description:
      "As your portfolio grows, the platform grows with you. Manage multiple estates, phases, and investor relationships effortlessly.",
  },
];

const features = [
  {
    icon: LayoutDashboard,
    title: "Portfolio View",
    description:
      "See all your estates, phases, and units on one dashboard. Drill down from portfolio to individual unit with a single click.",
  },
  {
    icon: Home,
    title: "Unit Tracking",
    description:
      "Track every unit from land allocation through construction to handover. Monitor status, payments received, and outstanding balances.",
  },
  {
    icon: Wallet,
    title: "Financial Management",
    description:
      "Track inflows from off-plan buyers, outflows to contractors, and margins per unit. See your true financial position in real time.",
  },
  {
    icon: FileText,
    title: "Investor Reports",
    description:
      "Generate professional quarterly reports showing construction progress, sales performance, and financial returns for your investors.",
  },
  {
    icon: Users,
    title: "Buyer CRM",
    description:
      "Manage your buyer pipeline from enquiry to handover. Track payment plans, send automated reminders, and manage allocation letters.",
  },
  {
    icon: PieChart,
    title: "Sales Analytics",
    description:
      "Understand your sales velocity, conversion rates, and revenue projections. Know which unit types sell fastest and price accordingly.",
  },
];

export default function EstatesPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Building2 className="mr-1.5 h-3 w-3" />
              Estate Management
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Manage Your Entire Estate From{" "}
              <span className="text-emerald-600">One Dashboard</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              BuildNG Estates replaces your spreadsheets, WhatsApp groups, and
              paper files with a single platform for managing estate
              developments, unit sales, construction progress, and investor
              reporting.
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
              Estate Development is Drowning in Spreadsheet Chaos
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Nigerian estate developers manage billion-naira portfolios with
              tools designed for grocery lists. The result is lost data, missed
              payments, angry investors, and projects that run off the rails.
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
              One Platform for Your Entire Portfolio
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              BuildNG Estates gives you a single source of truth for every
              unit, every payment, every contractor, and every investor across
              all your developments. No more reconciling spreadsheets at 2am
              before an investor meeting.
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
              From first unit to final handover, every stage is tracked and
              reported.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number}>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
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

      {/* Features Section */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Everything an Estate Developer Needs
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Purpose-built for how Nigerian developers actually run estate
              projects.
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
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Pricing That Scales With You
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Start free, upgrade as your portfolio grows.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>For small developers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  N50,000{" "}
                  <span className="text-base font-normal text-gray-500">
                    / month
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    "Up to 50 units",
                    "1 active estate",
                    "Basic financial reports",
                    "Buyer CRM",
                    "Email support",
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
                  <CardTitle>Enterprise</CardTitle>
                  <Badge>For Large Developers</Badge>
                </div>
                <CardDescription>
                  Unlimited estates and units
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">Custom</div>
                <ul className="mt-6 space-y-3">
                  {[
                    "Unlimited units and estates",
                    "Investor reporting portal",
                    "Custom branding",
                    "API integrations",
                    "Multi-user access controls",
                    "Dedicated success manager",
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
            <TrendingUp className="h-8 w-8 text-emerald-600" />
          </div>
          <blockquote className="mt-6 text-xl leading-relaxed text-gray-800">
            &ldquo;We were managing 3 estates with 280 units across Lagos and
            Abuja using Google Sheets and WhatsApp. Payment tracking was a
            nightmare. With BuildNG Estates, our investor reporting went from
            taking 3 weeks to 3 minutes. We finally know our exact financial
            position in real time.&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold text-gray-900">Oluwaseun Adegoke</p>
            <p className="text-sm text-gray-600">
              MD, Adegoke Homes & Properties, Lagos
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-emerald-600 px-8 py-16 text-center shadow-xl sm:px-16">
            <Building2 className="mx-auto h-12 w-12 text-emerald-200" />
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Take Control of Your Estate Portfolio
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
              Join leading Nigerian developers who have moved beyond
              spreadsheets. Set up your first estate in under 15 minutes.
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
