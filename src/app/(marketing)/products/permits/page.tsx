import Link from "next/link";
import {
  FileCheck,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Map,
  Calculator,
  Headphones,
  FileText,
  Clock,
  ListChecks,
  BookOpen,
  Landmark,
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
    stat: "6-18 months",
    description:
      "typical time to obtain a building permit in Lagos, Abuja, or Port Harcourt without professional help",
  },
  {
    stat: "47%",
    description:
      "of builders in a 2023 survey said they were asked for unofficial payments during the permit process",
  },
  {
    stat: "80%+",
    description:
      "of residential buildings in Nigeria are built without the legally required planning permits",
  },
];

const steps = [
  {
    number: "01",
    title: "Select Your State",
    description:
      "Choose your state and local government area. We show you the exact permits required, the issuing authority, and the official fee schedule.",
  },
  {
    number: "02",
    title: "Calculate Fees",
    description:
      "Enter your plot size, building type, and number of floors. Our calculator shows you the exact official fees so you know what to expect.",
  },
  {
    number: "03",
    title: "Prepare Documents",
    description:
      "Follow our step-by-step checklist to gather required documents. Upload them for review before submission to avoid costly rejections.",
  },
  {
    number: "04",
    title: "Track Progress",
    description:
      "Monitor your application status in real time. Get notified when action is required and when your permit is approved.",
  },
];

const features = [
  {
    icon: Map,
    title: "State-by-State Guides",
    description:
      "Detailed permit guides for all 36 states and the FCT. Each guide covers required permits, issuing authorities, document checklists, and timelines.",
  },
  {
    icon: Calculator,
    title: "Fee Calculators",
    description:
      "Know the exact official fees before you start. Our calculators cover planning permits, building plan approval, environmental impact, and more.",
  },
  {
    icon: Headphones,
    title: "Concierge Service",
    description:
      "Our permit specialists handle everything for you. We prepare documents, submit applications, follow up with agencies, and deliver your approved permit.",
  },
  {
    icon: ListChecks,
    title: "Document Checklists",
    description:
      "Interactive checklists ensure you have every required document before submission. No more rejections for missing survey plans or C of O copies.",
  },
  {
    icon: Clock,
    title: "Application Tracking",
    description:
      "Real-time status updates on your permit application. Know exactly where your file is in the approval pipeline and what is needed next.",
  },
  {
    icon: BookOpen,
    title: "Regulation Library",
    description:
      "Access the Nigerian Urban and Regional Planning Law, state building codes, and local planning regulations. Stay compliant with current requirements.",
  },
];

const states = [
  "Lagos", "FCT Abuja", "Rivers", "Ogun", "Oyo", "Edo",
  "Delta", "Enugu", "Anambra", "Kaduna", "Kano", "Cross River",
];

export default function PermitsPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              <FileCheck className="mr-1.5 h-3 w-3" />
              Permit Navigator
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Navigate Nigerian Building Permits{" "}
              <span className="text-emerald-600">Without the Headache</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              BuildNG Permits demystifies the building approval process with
              state-by-state guides, official fee calculators, and a concierge
              service that handles the paperwork so you can focus on building.
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
              The Permit Process is Opaque, Slow, and Often Corrupt
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Getting a building permit in Nigeria should not require insider
              connections, unofficial payments, or months of chasing faceless
              bureaucrats. But for most builders, that is exactly what it takes.
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
              Transparency and Guidance at Every Step
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              We have mapped the permit requirements for every state in Nigeria.
              We show you exactly what you need, what it costs, and how long it
              takes. And if you want us to handle it entirely, our concierge
              team will take care of everything through official channels.
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
              From confusion to approved permit in four clear steps.
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

      {/* State Coverage */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Landmark className="mx-auto h-10 w-10 text-emerald-600" />
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Coverage Across Nigeria
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Detailed permit guides and fee calculators for major states, with
              more being added monthly.
            </p>
          </div>
          <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-3">
            {states.map((state) => (
              <Badge key={state} variant="outline" className="px-4 py-2 text-sm">
                {state}
              </Badge>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-gray-500">
            Plus 24 more states with basic coverage. Full detailed guides are
            added monthly.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Tools That Cut Through Bureaucracy
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to navigate the permit process with confidence.
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
              Choose Your Level of Support
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              DIY with our guides or let our concierge team handle everything.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Self-Service</CardTitle>
                <CardDescription>Guides, checklists, and calculators</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">Free</div>
                <ul className="mt-6 space-y-3">
                  {[
                    "State-by-state permit guides",
                    "Official fee calculators",
                    "Document checklists",
                    "Regulation library",
                    "Community forum access",
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
                  <CardTitle>Concierge</CardTitle>
                  <Badge>Hands-Free</Badge>
                </div>
                <CardDescription>We handle everything for you</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  N150,000{" "}
                  <span className="text-base font-normal text-gray-500">
                    per application
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    "Everything in Self-Service",
                    "Document preparation",
                    "Application submission",
                    "Agency follow-up",
                    "Real-time tracking",
                    "Permit delivery to your door",
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
            <FileText className="h-8 w-8 text-emerald-600" />
          </div>
          <blockquote className="mt-6 text-xl leading-relaxed text-gray-800">
            &ldquo;I tried to get my building permit in Ogun State for 8
            months on my own. Nobody could tell me the correct fees or required
            documents. I used the BuildNG Concierge service and had my approved
            permit in 6 weeks. They knew exactly who to talk to and what was
            needed. Worth every naira.&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold text-gray-900">Emeka Nwosu</p>
            <p className="text-sm text-gray-600">
              Property Developer, Abeokuta, Ogun State
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-emerald-600 px-8 py-16 text-center shadow-xl sm:px-16">
            <FileCheck className="mx-auto h-12 w-12 text-emerald-200" />
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Get Your Building Permit the Right Way
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
              Stop guessing, stop overpaying, and stop waiting. Use our free
              guides or let our concierge team handle everything.
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
