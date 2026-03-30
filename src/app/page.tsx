"use client";

import Link from "next/link";
import {
  Shield,
  Package,
  ClipboardCheck,
  Building2,
  Users,
  FileCheck,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Star,
  Zap,
  Globe,
  Clock,
  ChevronRight,
  UserPlus,
  Settings,
  Hammer,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const products = [
  {
    icon: Shield,
    title: "Escrow Payments",
    description:
      "Secure milestone-based payments that protect both clients and contractors. Funds are released only when work is verified and approved.",
    color: "bg-emerald-50 text-emerald-600",
    href: "/products/escrow",
  },
  {
    icon: Package,
    title: "Materials Marketplace",
    description:
      "Source quality building materials from verified suppliers across all 36 states. Compare prices, track deliveries, and manage inventory.",
    color: "bg-blue-50 text-blue-600",
    href: "/products/materials",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Assurance",
    description:
      "Automated inspection checklists, real-time progress photos, and compliance tracking to ensure every project meets Nigerian building standards.",
    color: "bg-purple-50 text-purple-600",
    href: "/products/quality",
  },
  {
    icon: Building2,
    title: "Estate Management",
    description:
      "End-to-end estate development tools from land acquisition to unit sales. Manage multi-unit projects with ease and transparency.",
    color: "bg-amber-50 text-amber-600",
    href: "/products/estate",
  },
  {
    icon: Users,
    title: "Artisan Network",
    description:
      "Connect with verified skilled artisans including plumbers, electricians, masons, and more. Review ratings and book professionals instantly.",
    color: "bg-rose-50 text-rose-600",
    href: "/products/artisans",
  },
  {
    icon: FileCheck,
    title: "Permit Tracker",
    description:
      "Navigate Nigerian building permits and regulatory approvals with guided workflows. Track application status across all government agencies.",
    color: "bg-cyan-50 text-cyan-600",
    href: "/products/permits",
  },
  {
    icon: AlertTriangle,
    title: "Defect Management",
    description:
      "Log, track, and resolve construction defects with photo evidence and contractor accountability. Never lose track of snag lists again.",
    color: "bg-orange-50 text-orange-600",
    href: "/products/defects",
  },
];

const testimonials = [
  {
    name: "Engr. Chidinma Okafor",
    role: "Managing Director",
    company: "Apex Construction Ltd, Lagos",
    quote:
      "BuildNG transformed how we manage our projects across Lagos and Abuja. The escrow system alone saved us from two potential disputes worth over ₦50 million. Our clients trust us more because of the transparency.",
    rating: 5,
  },
  {
    name: "Alhaji Musa Bello",
    role: "Estate Developer",
    company: "Bello Properties, Abuja",
    quote:
      "Before BuildNG, tracking materials across our three estate sites was a nightmare. Now everything is in one dashboard. We reduced material waste by 30% in just six months. This platform understands Nigerian construction.",
    rating: 5,
  },
  {
    name: "Arc. Funke Adeyemi",
    role: "Principal Architect",
    company: "Adeyemi & Partners, Ibadan",
    quote:
      "The quality assurance module is exceptional. We can now do remote inspections with timestamped photos and automated checklists. Our defect rates dropped by 45% since we started using BuildNG on all our projects.",
    rating: 5,
  },
];

const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Perfect for individual contractors and small projects",
    features: [
      "Up to 3 active projects",
      "Basic escrow payments",
      "Materials price comparison",
      "Community support",
      "Mobile app access",
    ],
    cta: "Get Started Free",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "₦25,000",
    period: "/mo",
    description: "For growing construction firms managing multiple projects",
    features: [
      "Unlimited active projects",
      "Advanced escrow with milestones",
      "Full materials marketplace",
      "Quality assurance tools",
      "Artisan network access",
      "Permit tracking",
      "Priority email support",
      "Team collaboration (up to 15)",
    ],
    cta: "Start 14-Day Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "₦150,000",
    period: "/mo",
    description: "For large firms and estate developers with complex needs",
    features: [
      "Everything in Professional",
      "Estate management suite",
      "Advanced analytics & reporting",
      "Custom integrations & API",
      "Dedicated account manager",
      "On-site training",
      "Unlimited team members",
      "SLA guarantee (99.9% uptime)",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600">
              <Hammer className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Build<span className="text-emerald-600">NG</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <Link
              href="#products"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600"
            >
              Products
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600"
            >
              Pricing
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-gray-600 transition-colors hover:text-emerald-600"
            >
              Testimonials
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" className="hidden sm:inline-flex">
                Sign In
              </Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16">
        {/* Subtle grid background */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)",
            backgroundSize: "4rem 4rem",
            opacity: 0.4,
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 sm:px-6 sm:pb-28 sm:pt-32 lg:px-8 lg:pt-40">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
              <Zap className="h-4 w-4" />
              Now serving all 36 states + FCT
            </div>
            <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
              Build Nigeria{" "}
              <span className="bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent">
                Better
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-xl">
              The all-in-one platform transforming construction project
              management across Nigeria. From escrow payments to quality
              assurance, manage every aspect of your building projects with
              confidence and transparency.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="gap-2 px-8 text-base">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="#how-it-works">
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 px-8 text-base"
                >
                  See How It Works
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-gray-100 bg-gray-50">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-4 px-4 py-10 sm:px-6 md:grid-cols-4 lg:px-8">
          {[
            { value: "₦2.5T+", label: "Construction market" },
            { value: "50,000+", label: "Active projects" },
            { value: "36 States", label: "Covered nationwide" },
            { value: "99.9%", label: "Uptime guaranteed" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-extrabold text-emerald-600 sm:text-3xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm font-medium text-gray-500">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to build
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Seven powerful tools designed specifically for the Nigerian
              construction industry. Use them individually or together for
              complete project control.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.title}
                href={product.href}
                className="group relative rounded-2xl border border-gray-200 bg-white p-8 transition-all duration-200 hover:border-emerald-200 hover:shadow-lg hover:shadow-emerald-50"
              >
                <div
                  className={`inline-flex rounded-xl p-3 ${product.color}`}
                >
                  <product.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  {product.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {product.description}
                </p>
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald-600 transition-all group-hover:gap-2">
                  Learn more
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Get started in minutes
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Three simple steps to transform how you manage construction
              projects in Nigeria.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: UserPlus,
                title: "Sign Up",
                description:
                  "Create your free account in under 2 minutes. No credit card required. Choose your role as a client, contractor, engineer, or developer.",
              },
              {
                step: "02",
                icon: Settings,
                title: "Choose Your Tools",
                description:
                  "Select the products that fit your needs. Start with our free tier or unlock everything with Professional. Each tool works independently or together.",
              },
              {
                step: "03",
                icon: Hammer,
                title: "Start Building",
                description:
                  "Invite your team, create your first project, and experience the future of construction management in Nigeria. We are with you every step.",
              },
            ].map((item) => (
              <div key={item.step} className="relative text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-600 shadow-lg shadow-emerald-200">
                  <item.icon className="h-7 w-7 text-white" />
                </div>
                <div className="mt-2 text-xs font-bold tracking-widest text-emerald-600 uppercase">
                  Step {item.step}
                </div>
                <h3 className="mt-3 text-xl font-semibold text-gray-900">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Trusted by builders across Nigeria
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See what construction professionals are saying about BuildNG.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-2xl border border-gray-200 bg-white p-8"
              >
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-relaxed text-gray-600">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-sm font-bold text-emerald-700">
                    {testimonial.name
                      .replace("Engr. ", "")
                      .replace("Alhaji ", "")
                      .replace("Arc. ", "")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {testimonial.role}, {testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="bg-gray-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Start free and scale as your business grows. No hidden fees.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
            {pricingPlans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-2xl border p-8 ${
                  plan.highlighted
                    ? "border-emerald-600 bg-white shadow-xl shadow-emerald-100 ring-1 ring-emerald-600"
                    : "border-gray-200 bg-white"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-4 py-1 text-xs font-semibold text-white">
                    Most Popular
                  </div>
                )}
                <h3 className="text-lg font-semibold text-gray-900">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-gray-900">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-sm text-gray-500">{plan.period}</span>
                  )}
                </div>
                <p className="mt-2 text-sm text-gray-600">
                  {plan.description}
                </p>
                <ul className="mt-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      <span className="text-sm text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Link href="/register">
                    <Button
                      className="w-full"
                      variant={plan.highlighted ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-emerald-600 px-8 py-16 text-center sm:px-16 sm:py-20">
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "3rem 3rem",
              }}
            />
            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to transform your
                <br />
                construction business?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
                Join thousands of Nigerian construction professionals already
                using BuildNG to deliver better projects, on time and on budget.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="gap-2 bg-white px-8 text-base text-emerald-700 hover:bg-emerald-50"
                  >
                    Create Free Account
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-emerald-400 px-8 text-base text-white hover:bg-emerald-700"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            {/* Company Info */}
            <div className="md:col-span-1">
              <Link href="/" className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
                  <Hammer className="h-4 w-4 text-white" />
                </div>
                <span className="text-lg font-bold text-gray-900">
                  Build<span className="text-emerald-600">NG</span>
                </span>
              </Link>
              <p className="mt-4 text-sm leading-relaxed text-gray-500">
                The all-in-one construction project management platform built
                for Nigeria. Empowering builders to deliver better projects.
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <Globe className="h-4 w-4" />
                Lagos, Nigeria
              </div>
            </div>

            {/* Products */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Products</h4>
              <ul className="mt-4 space-y-2.5">
                {products.map((product) => (
                  <li key={product.title}>
                    <Link
                      href={product.href}
                      className="text-sm text-gray-500 transition-colors hover:text-emerald-600"
                    >
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Company</h4>
              <ul className="mt-4 space-y-2.5">
                {[
                  "About Us",
                  "Careers",
                  "Blog",
                  "Press",
                  "Contact",
                  "Partners",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 transition-colors hover:text-emerald-600"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900">Legal</h4>
              <ul className="mt-4 space-y-2.5">
                {[
                  "Privacy Policy",
                  "Terms of Service",
                  "Cookie Policy",
                  "Data Processing",
                  "Security",
                ].map((item) => (
                  <li key={item}>
                    <Link
                      href="#"
                      className="text-sm text-gray-500 transition-colors hover:text-emerald-600"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-8 sm:flex-row">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} BuildNG. All rights reserved.
            </p>
            <p className="text-sm text-gray-500">
              Made in Nigeria{" "}
              <span role="img" aria-label="Nigerian flag">
                &#127475;&#127468;
              </span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
