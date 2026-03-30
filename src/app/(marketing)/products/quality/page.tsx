import Link from "next/link";
import {
  ClipboardCheck,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Award,
  Eye,
  FileCheck,
  Users,
  Shield,
  Layers,
  Camera,
  HardHat,
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
    stat: "516",
    description:
      "building collapses recorded in Nigeria between 2000 and 2023, killing over 600 people",
  },
  {
    stat: "90%",
    description:
      "of residential buildings in Nigeria are built without any professional quality oversight",
  },
  {
    stat: "N0",
    description:
      "the typical budget allocated for independent quality inspection on self-build projects",
  },
];

const stages = [
  {
    number: "1",
    title: "Foundation Setting-Out",
    description:
      "Verify foundation layout, dimensions, and alignment against approved architectural drawings before excavation begins.",
  },
  {
    number: "2",
    title: "Foundation Concrete",
    description:
      "Test concrete mix ratio, check rebar placement and spacing, inspect formwork. Slump test on site for concrete grade verification.",
  },
  {
    number: "3",
    title: "Block Work to DPC",
    description:
      "Verify block quality, mortar mix, wall alignment, and damp proof course installation before backfilling.",
  },
  {
    number: "4",
    title: "Block Work to Lintel",
    description:
      "Check wall plumbness, column reinforcement, lintel beam steel, and window/door opening dimensions.",
  },
  {
    number: "5",
    title: "Decking",
    description:
      "Full decking inspection: slab steel spacing, beam reinforcement, plywood formwork integrity, and concrete grade before pouring.",
  },
  {
    number: "6",
    title: "Roofing",
    description:
      "Inspect truss fabrication, rafter spacing, purlins, fascia boards, and roofing sheet installation quality.",
  },
  {
    number: "7",
    title: "MEP Rough-In",
    description:
      "Verify electrical conduit routing, plumbing pipe sizing, waste pipe gradients, and mechanical system layouts before plastering.",
  },
  {
    number: "8",
    title: "Finishing & Handover",
    description:
      "Final inspection covering plastering, tiling, painting, fixtures, fittings, and all snag items before certificate issuance.",
  },
];

const features = [
  {
    icon: Eye,
    title: "8-Stage Inspection Protocol",
    description:
      "Our standardized protocol covers every critical construction phase from setting-out to handover, aligned with Nigerian Building Code standards.",
  },
  {
    icon: Award,
    title: "BuildNG Quality Certificate",
    description:
      "A verifiable digital certificate that proves your building was professionally inspected at every stage. Shareable with buyers and insurers.",
  },
  {
    icon: Users,
    title: "COREN-Registered Engineers",
    description:
      "Every inspection is carried out by a COREN-registered structural or civil engineer with a minimum of 5 years field experience.",
  },
  {
    icon: Camera,
    title: "Photo & Video Evidence",
    description:
      "Every inspection generates a detailed report with geo-tagged photos, annotated diagrams, and actionable recommendations.",
  },
  {
    icon: Shield,
    title: "Defect Warranty",
    description:
      "Buildings that complete all 8 stages qualify for our structural defect warranty, covering major structural issues for up to 5 years.",
  },
  {
    icon: Layers,
    title: "Digital Inspection Reports",
    description:
      "All reports are stored digitally with permanent access. Download PDF reports for banks, insurance, or property sales at any time.",
  },
];

export default function QualityPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              <ClipboardCheck className="mr-1.5 h-3 w-3" />
              Quality Certification
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Build With Confidence.{" "}
              <span className="text-emerald-600">Certify With Proof.</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              BuildNG Quality brings independent, COREN-registered engineers to
              inspect your building at every critical stage. Get a verifiable
              quality certificate that proves your property was built right.
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
              Buildings Are Collapsing Because Nobody Is Checking
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Nigeria has one of the highest rates of building collapse in the
              world. The root cause is almost always the same: no independent
              quality oversight during construction.
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
              Professional Inspection at Every Stage
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We send a COREN-registered engineer to your site at each of 8
              critical construction stages. They inspect, document, and certify
              the work before you proceed. It is the same standard used in the
              UK, UAE, and South Africa, now available and affordable in Nigeria.
            </p>
          </div>
        </div>
      </section>

      <Separator />

      {/* 8-Stage Inspection Protocol */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              The 8-Stage Inspection Protocol
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Each stage must pass inspection before the next begins. This is
              how you prevent structural failure.
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stages.map((stage) => (
              <div
                key={stage.number}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                  {stage.number}
                </div>
                <h3 className="font-semibold text-gray-900">{stage.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {stage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certificate Example */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                The BuildNG Quality Certificate
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Every building that completes all 8 inspection stages receives a
                verifiable digital certificate. This certificate is becoming the
                gold standard for property buyers and mortgage lenders in
                Nigeria.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Unique QR code for instant verification",
                  "Complete inspection history with photos",
                  "Engineer credentials and COREN number",
                  "Accepted by major mortgage banks",
                  "Increases property resale value by 8-12%",
                  "Valid for insurance premium discounts",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Card className="border-2 border-emerald-200 bg-emerald-50">
              <CardContent className="flex flex-col items-center py-12">
                <Award className="h-16 w-16 text-emerald-600" />
                <h3 className="mt-4 text-xl font-bold text-gray-900">
                  BuildNG Quality Certificate
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  Certificate No: BNG-2026-LOS-004521
                </p>
                <Separator className="my-6 w-full" />
                <div className="space-y-2 text-center text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Property:</span> 4-Bedroom
                    Detached Duplex
                  </p>
                  <p>
                    <span className="font-medium">Location:</span> Ikeja GRA,
                    Lagos
                  </p>
                  <p>
                    <span className="font-medium">Stages Completed:</span> 8/8
                  </p>
                  <p>
                    <span className="font-medium">Lead Engineer:</span> Engr.
                    Adamu Bello (COREN R.18432)
                  </p>
                  <p>
                    <span className="font-medium">Issue Date:</span> March 2026
                  </p>
                </div>
                <Badge className="mt-6">Verified</Badge>
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
              Complete Quality Assurance Platform
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              More than just inspections. A complete system for ensuring your
              building stands the test of time.
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

      {/* Engineer Network */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <HardHat className="mx-auto h-10 w-10 text-emerald-600" />
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Our Engineer Network
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Every BuildNG inspector is a practicing, COREN-registered engineer
              with field experience in Nigerian construction.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-3">
            {[
              { value: "120+", label: "Registered engineers across 18 states" },
              { value: "5+ yrs", label: "Minimum field experience required" },
              { value: "4,800+", label: "Inspections completed to date" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-emerald-600">
                  {stat.value}
                </div>
                <p className="mt-1 text-sm text-gray-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Affordable Quality Assurance
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Professional inspection costs less than 1% of your total build
              cost. The cheapest insurance you will ever buy.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Single Inspection</CardTitle>
                <CardDescription>Pay per stage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  N75,000{" "}
                  <span className="text-base font-normal text-gray-500">
                    per visit
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    "One inspection stage",
                    "Detailed photo report",
                    "Engineer recommendations",
                    "48-hour report delivery",
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
                  <CardTitle>Full 8-Stage</CardTitle>
                  <Badge>Save 25%</Badge>
                </div>
                <CardDescription>Complete quality certification</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  N450,000{" "}
                  <span className="text-base font-normal text-gray-500">
                    all 8 stages
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    "All 8 inspection stages",
                    "BuildNG Quality Certificate",
                    "Photo + video reports",
                    "24-hour report delivery",
                    "Structural defect warranty",
                    "Priority engineer assignment",
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-emerald-600 px-8 py-16 text-center shadow-xl sm:px-16">
            <FileCheck className="mx-auto h-12 w-12 text-emerald-200" />
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Build It Right the First Time
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
              Schedule your first inspection today. It costs less than fixing a
              cracked foundation later, and infinitely less than a collapsed
              building.
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
