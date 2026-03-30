import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Bug,
  Clock,
  BarChart3,
  Camera,
  Shield,
  Repeat,
  MessageSquare,
  TrendingDown,
  Smartphone,
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
    stat: "WhatsApp",
    description:
      "is how most buyers report defects, leading to lost messages, no tracking, and finger-pointing",
  },
  {
    stat: "72%",
    description:
      "of new homeowners in Nigerian estates report at least one defect within 6 months of handover",
  },
  {
    stat: "Social Media",
    description:
      "shaming on Twitter/X and Instagram has become the primary recourse when developers ignore complaints",
  },
];

const steps = [
  {
    number: "01",
    title: "Report",
    description:
      "Homeowners log defects through a simple mobile form with photos, location tagging, and severity classification. No more scrolling through WhatsApp to find that photo.",
  },
  {
    number: "02",
    title: "Assign",
    description:
      "The developer receives the defect ticket with full details and assigns it to the appropriate contractor or artisan for resolution within a defined SLA.",
  },
  {
    number: "03",
    title: "Resolve",
    description:
      "The contractor fixes the defect and uploads photo evidence of the completed repair. The homeowner confirms satisfaction before the ticket closes.",
  },
  {
    number: "04",
    title: "Analyse",
    description:
      "BuildNG aggregates defect data across your portfolio to identify patterns, problematic contractors, and systemic quality issues before they escalate.",
  },
];

const features = [
  {
    icon: Clock,
    title: "Warranty Tracking",
    description:
      "Define warranty periods per unit, trade, and component. Automatically flag defects reported within warranty and track warranty expiry dates.",
  },
  {
    icon: Repeat,
    title: "Defect Lifecycle",
    description:
      "Track every defect from report through assignment, scheduling, repair, verification, and closure. Full audit trail with timestamps at every stage.",
  },
  {
    icon: BarChart3,
    title: "Pattern Detection",
    description:
      "Identify recurring defects across units, phases, or entire estates. Spot problematic contractors or material suppliers before the pattern becomes a crisis.",
  },
  {
    icon: Camera,
    title: "Photo Documentation",
    description:
      "Before and after photos for every defect. Geo-tagged and timestamped to create an indisputable record of the issue and its resolution.",
  },
  {
    icon: MessageSquare,
    title: "Homeowner Portal",
    description:
      "Give homeowners a branded portal to report defects, track progress, and communicate with your team. Professional, transparent, and far better than WhatsApp.",
  },
  {
    icon: Shield,
    title: "SLA Management",
    description:
      "Set response and resolution SLAs by defect severity. Automatic escalation when SLAs are breached so nothing falls through the cracks.",
  },
];

const defectTypes = [
  { type: "Plumbing Leaks", percentage: "28%" },
  { type: "Cracked Walls/Tiles", percentage: "22%" },
  { type: "Electrical Faults", percentage: "18%" },
  { type: "Door/Window Issues", percentage: "14%" },
  { type: "Drainage Problems", percentage: "11%" },
  { type: "Roofing Defects", percentage: "7%" },
];

export default function DefectsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Bug className="mr-1.5 h-3 w-3" />
              Defect Manager
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Turn Post-Handover Chaos Into{" "}
              <span className="text-emerald-600">Customer Satisfaction</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              BuildNG Defect Manager gives estate developers a professional
              system for logging, tracking, and resolving post-handover defects.
              Replace WhatsApp chaos with structured workflows that protect your
              reputation.
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
              Post-Handover is Where Reputations Go to Die
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              You spend years building an estate and months selling it. Then a
              leaking pipe or cracked tile turns a happy buyer into a social
              media nightmare. Without a proper defect management system, every
              complaint is a reputational risk.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {problems.map((problem) => (
              <Card key={problem.description} className="text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="text-3xl font-bold text-emerald-600">
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
              Professional Defect Management for Nigerian Developers
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Give your homeowners a proper channel to report issues. Give your
              team structured workflows to resolve them. Give yourself the data
              to prevent them from happening again. Turn your biggest liability
              into a competitive advantage.
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
              From complaint to resolution in a trackable, transparent workflow.
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

      {/* Common Defects */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                Know Your Most Common Defects
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Data from BuildNG estates shows clear patterns in post-handover
                defects. Our analytics help you identify and fix root causes
                before they affect every unit.
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Based on aggregated data from 15,000+ defect reports across
                Nigerian estates.
              </p>
            </div>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  {defectTypes.map((defect) => (
                    <div key={defect.type}>
                      <div className="mb-1 flex items-center justify-between text-sm">
                        <span className="font-medium text-gray-700">
                          {defect.type}
                        </span>
                        <span className="font-semibold text-emerald-600">
                          {defect.percentage}
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-100">
                        <div
                          className="h-2 rounded-full bg-emerald-500"
                          style={{ width: defect.percentage }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
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
              Complete Defect Lifecycle Management
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to manage post-handover quality professionally.
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
              Protect Your Reputation Affordably
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Pricing based on number of units under warranty management.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>For small estates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  N30,000{" "}
                  <span className="text-base font-normal text-gray-500">
                    / month
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    "Up to 50 units",
                    "Homeowner reporting portal",
                    "Defect lifecycle tracking",
                    "Photo documentation",
                    "Email notifications",
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
                  <CardTitle>Professional</CardTitle>
                  <Badge>Most Popular</Badge>
                </div>
                <CardDescription>For growing developers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  N75,000{" "}
                  <span className="text-base font-normal text-gray-500">
                    / month
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    "Up to 500 units",
                    "Everything in Starter",
                    "SLA management",
                    "Pattern detection analytics",
                    "Branded homeowner portal",
                    "API integrations",
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
            <Smartphone className="h-8 w-8 text-emerald-600" />
          </div>
          <blockquote className="mt-6 text-xl leading-relaxed text-gray-800">
            &ldquo;Before BuildNG, our WhatsApp group had 200 homeowners all
            complaining at once. We could not track anything. Now every defect
            has a ticket number, an assigned contractor, and a resolution
            deadline. Our Google reviews went from 2.8 to 4.4 stars in 6
            months because people feel heard and see their issues being
            resolved.&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold text-gray-900">Alhaji Musa Ibrahim</p>
            <p className="text-sm text-gray-600">
              CEO, GreenField Estates, Abuja
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
              Stop the WhatsApp Chaos Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
              Give your homeowners a professional defect reporting system and
              give your team the tools to resolve issues efficiently. Your
              reputation will thank you.
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
