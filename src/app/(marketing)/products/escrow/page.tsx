import Link from "next/link";
import {
  Shield,
  Camera,
  Scale,
  LayoutDashboard,
  Zap,
  History,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Banknote,
  Lock,
  Star,
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

const steps = [
  {
    number: "01",
    title: "Deposit",
    description:
      "Property owner deposits funds into a secure BuildNG escrow account held with licensed Nigerian banks. Funds are ring-fenced and fully insured.",
  },
  {
    number: "02",
    title: "Build",
    description:
      "The contractor executes work against clearly defined milestones agreed upon by both parties before the first naira is released.",
  },
  {
    number: "03",
    title: "Verify",
    description:
      "An independent COREN-registered site engineer inspects the completed milestone, uploads photo evidence, and approves or flags the work.",
  },
  {
    number: "04",
    title: "Release",
    description:
      "Once verified, the milestone payment is automatically released to the contractor within 24 hours. No delays, no excuses.",
  },
];

const features = [
  {
    icon: Shield,
    title: "Milestone Tracking",
    description:
      "Break your project into clear milestones with defined deliverables, budgets, and timelines. Track completion percentage in real time.",
  },
  {
    icon: Camera,
    title: "Photo Verification",
    description:
      "Every milestone requires geo-tagged, timestamped photographic evidence before payment is released. No more doctored progress reports.",
  },
  {
    icon: Scale,
    title: "Dispute Resolution",
    description:
      "Built-in mediation process with access to certified quantity surveyors who can independently assess disputed work within 72 hours.",
  },
  {
    icon: LayoutDashboard,
    title: "Multi-Party Dashboard",
    description:
      "Property owners, contractors, and engineers all get their own view. Everyone sees the same truth about project progress and finances.",
  },
  {
    icon: Zap,
    title: "Automatic Release",
    description:
      "Once an engineer signs off, funds move automatically. No manual bank transfers, no chasing payments, no excuses about bank issues.",
  },
  {
    icon: History,
    title: "Transaction History",
    description:
      "Complete audit trail of every naira. Downloadable reports for tax filing, investor updates, or legal proceedings if ever needed.",
  },
];

const stats = [
  { value: "68%", label: "of Nigerian homeowners report being defrauded by a contractor" },
  { value: "4.2M", label: "housing deficit units in Nigeria as of 2024" },
  { value: "35%", label: "average cost overrun on self-build projects" },
];

export default function EscrowPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Lock className="mr-1.5 h-3 w-3" />
              Escrow Payments
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Never Lose Money to a Bad Contractor{" "}
              <span className="text-emerald-600">Again</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              BuildNG Escrow holds your construction funds in secure, licensed
              accounts and only releases payment when an independent engineer
              verifies each milestone is complete. Your money stays protected
              until the work is done right.
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
              Trust is Broken in Nigerian Construction
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Every day, Nigerians hand over millions of naira to contractors
              with nothing but a handshake and a prayer. The results are
              predictable and devastating.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center">
                <CardContent className="pt-8 pb-8">
                  <div className="text-4xl font-bold text-emerald-600">
                    {stat.value}
                  </div>
                  <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-gray-500">
            Sources: Nigerian Institute of Building, Centre for Affordable
            Housing Finance in Africa, BuildNG user surveys
          </p>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4">Our Solution</Badge>
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Milestone-Based Escrow With Independent Verification
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We sit between you and your contractor, holding funds securely and
              only releasing payment when a COREN-registered engineer confirms
              the work meets specification. It is how construction works in
              developed markets, now available in Nigeria.
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
              Four simple steps stand between you and peace of mind on your
              building project.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <div key={step.number} className="relative">
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
              Everything You Need to Build With Confidence
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Purpose-built features for the realities of Nigerian construction.
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
              Simple, Transparent Pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We charge a small percentage of each milestone released. No hidden
              fees, no surprises.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Starter</CardTitle>
                <CardDescription>For individual homebuilders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  1.5%{" "}
                  <span className="text-base font-normal text-gray-500">
                    per milestone
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    "Up to 10 milestones",
                    "Photo verification",
                    "Basic dispute resolution",
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
                  <CardTitle>Professional</CardTitle>
                  <Badge>Popular</Badge>
                </div>
                <CardDescription>For developers and estates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  1.0%{" "}
                  <span className="text-base font-normal text-gray-500">
                    per milestone
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    "Unlimited milestones",
                    "Photo + video verification",
                    "Priority dispute resolution",
                    "Multi-party dashboards",
                    "API access",
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
            <Star className="h-8 w-8 text-emerald-600" />
          </div>
          <blockquote className="mt-6 text-xl leading-relaxed text-gray-800">
            &ldquo;I was building my house in Lekki and my first contractor
            disappeared with N4.5 million. When I restarted with BuildNG
            Escrow, every naira was accounted for. My engineer verified each
            stage before payment was released. I finished my 4-bedroom duplex
            on budget for the first time in my life.&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold text-gray-900">Chidinma Okafor</p>
            <p className="text-sm text-gray-600">
              Homeowner, Lekki Phase 2, Lagos
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-emerald-600 px-8 py-16 text-center shadow-xl sm:px-16">
            <Banknote className="mx-auto h-12 w-12 text-emerald-200" />
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Start Protecting Your Investment
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
              Join thousands of Nigerian property owners who now build with
              confidence. Set up your first escrow project in under 10 minutes.
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
