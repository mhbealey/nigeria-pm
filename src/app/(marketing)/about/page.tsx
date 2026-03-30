"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Target,
  Eye,
  MapPin,
  Users,
  Briefcase,
  Award,
  Newspaper,
  TrendingUp,
  Handshake,
  Globe,
  Hammer,
  ChevronRight,
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

const teamMembers = [
  {
    name: "Adebayo Ogunlade",
    role: "Co-Founder & CEO",
    bio: "Former project director at Julius Berger with 15 years of experience in Nigerian infrastructure projects. Adebayo holds an MBA from Lagos Business School and a B.Eng in Civil Engineering from the University of Lagos.",
    initials: "AO",
    color: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Ngozi Eze",
    role: "Co-Founder & CTO",
    bio: "Full-stack engineer and former Andela fellow who spent 8 years building fintech products across Africa. Ngozi holds a B.Sc in Computer Science from the University of Nigeria, Nsukka, and led engineering at a Y Combinator-backed startup.",
    initials: "NE",
    color: "bg-blue-100 text-blue-700",
  },
  {
    name: "Ibrahim Yusuf",
    role: "VP of Product",
    bio: "Product leader with deep expertise in construction technology. Previously at Procore and Autodesk, Ibrahim returned to Nigeria to build tools that address the unique challenges of the local construction industry. B.Sc from ABU Zaria.",
    initials: "IY",
    color: "bg-purple-100 text-purple-700",
  },
  {
    name: "Folake Adeyinka",
    role: "Head of Operations",
    bio: "Operations expert with 12 years in real estate development across Lagos and Abuja. Folake managed the delivery of over 500 residential units before joining BuildNG. She holds a degree in Estate Management from Covenant University.",
    initials: "FA",
    color: "bg-amber-100 text-amber-700",
  },
  {
    name: "Emeka Nwosu",
    role: "Head of Engineering",
    bio: "Senior engineer with experience at Paystack and Flutterwave, specializing in secure payment systems and scalable architecture. Emeka leads the team building BuildNG's escrow and marketplace infrastructure. B.Eng from FUTO.",
    initials: "EN",
    color: "bg-rose-100 text-rose-700",
  },
];

const stats = [
  { value: "₦2.5T", label: "Nigerian construction market size (annual)" },
  { value: "70%", label: "Projects that exceed budget nationally" },
  { value: "45%", label: "Projects delayed beyond schedule" },
  { value: "60%+", label: "Construction workforce is informal" },
  { value: "36", label: "States plus FCT with active building" },
  { value: "3M+", label: "Housing deficit in Nigeria" },
];

const advisors = [
  {
    name: "Chief (Mrs.) Olabisi Akanbi",
    role: "Advisory Board Chair",
    org: "Former MD, Federal Housing Authority",
  },
  {
    name: "Prof. Kunle Adebiyi",
    role: "Technical Advisor",
    org: "Department of Building, University of Lagos",
  },
  {
    name: "Barr. Tosin Adewale",
    role: "Legal Advisor",
    org: "Partner, Aluko & Oyebode",
  },
];

const partners = [
  "Standards Organisation of Nigeria (SON)",
  "Nigerian Institute of Building (NIOB)",
  "Council of Registered Builders of Nigeria (CORBON)",
  "Lagos State Building Control Agency (LASBCA)",
  "Paystack (Payment Processing)",
  "Google Cloud (Infrastructure Partner)",
];

const openPositions = [
  {
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Lagos (Hybrid)",
    type: "Full-time",
    description:
      "Build and scale our core platform using Next.js, TypeScript, and PostgreSQL. Work on escrow systems, real-time collaboration, and marketplace features.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Lagos (On-site)",
    type: "Full-time",
    description:
      "Design intuitive experiences for construction professionals across mobile and web. Conduct user research across Nigerian construction sites.",
  },
  {
    title: "Construction Industry Analyst",
    department: "Operations",
    location: "Abuja",
    type: "Full-time",
    description:
      "Gather and analyze construction material pricing data across all 36 states. Build relationships with suppliers and industry bodies.",
  },
  {
    title: "Enterprise Sales Manager",
    department: "Sales",
    location: "Lagos",
    type: "Full-time",
    description:
      "Drive enterprise adoption among Nigeria's largest construction firms and estate developers. Manage complex sales cycles with C-level stakeholders.",
  },
];

const pressFeatures = [
  {
    outlet: "TechCabal",
    title: "BuildNG raises seed funding to digitise Nigerian construction",
    date: "February 2026",
  },
  {
    outlet: "BusinessDay",
    title: "How technology is solving Nigeria's ₦2.5 trillion construction challenge",
    date: "January 2026",
  },
  {
    outlet: "Disrupt Africa",
    title: "Nigerian proptech startup BuildNG launches escrow payments for construction",
    date: "December 2025",
  },
  {
    outlet: "The Guardian Nigeria",
    title: "Lagos-based BuildNG tackles construction quality crisis with digital tools",
    date: "November 2025",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-4">
              About BuildNG
            </Badge>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
              We&apos;re building the future of{" "}
              <span className="text-emerald-600">Nigerian construction</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              Founded in Lagos in 2024, BuildNG was born from a simple
              observation: Nigeria&apos;s ₦2.5 trillion construction industry
              still runs on phone calls, WhatsApp groups, and handshake
              agreements. We&apos;re changing that.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                Our story
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600">
                <p>
                  BuildNG started when our founders, Adebayo Ogunlade and Ngozi
                  Eze, watched a ₦200 million estate project in Lekki collapse
                  into disputes. The contractor had received payments without
                  verified milestones. Materials were sourced at inflated prices.
                  Quality inspections existed only on paper. Permits had expired
                  without anyone noticing.
                </p>
                <p>
                  They realized this wasn&apos;t an isolated incident -- it was
                  the norm across Nigerian construction. Projects routinely
                  exceeded budgets by 70%, timelines slipped by months, and both
                  clients and contractors operated in an environment of mutual
                  distrust.
                </p>
                <p>
                  So they built BuildNG: a platform designed from the ground up
                  for how construction actually works in Nigeria. Not a Western
                  tool adapted for Africa, but a Nigerian solution to Nigerian
                  problems. From escrow payments that work with Naira and local
                  banks, to a materials price index that tracks costs across all
                  36 states, to permit tracking that understands the complexity
                  of Nigerian regulatory approvals.
                </p>
                <p>
                  Today, BuildNG serves thousands of construction professionals
                  across Nigeria, from individual contractors in Port Harcourt to
                  large estate developers in Abuja. We are just getting started.
                </p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="rounded-2xl bg-emerald-50 p-8">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600">
                  <Hammer className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Founded in Lagos, 2024
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Built by a team that understands the Nigerian construction
                  industry from the inside out.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-2xl border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-extrabold text-emerald-600">
                    50K+
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Active projects
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-extrabold text-emerald-600">
                    10K+
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Registered users
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-extrabold text-emerald-600">
                    ₦15B+
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Processed in escrow
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-200 p-6 text-center">
                  <div className="text-3xl font-extrabold text-emerald-600">
                    36
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    States covered
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                  <Target className="h-6 w-6 text-emerald-600" />
                </div>
                <CardTitle className="mt-4">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-gray-600">
                  To bring transparency, accountability, and efficiency to every
                  construction project in Nigeria. We believe that when builders
                  have the right tools, they build better -- better structures,
                  better communities, and a better Nigeria.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                  <Eye className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="mt-4">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed text-gray-600">
                  To become the operating system for construction across Africa.
                  We envision a future where every building project on the
                  continent is managed digitally, where payments are transparent,
                  materials are traceable, and quality is guaranteed.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nigerian Construction Market Stats */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              The Nigerian construction challenge
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Nigeria&apos;s construction industry is massive but plagued by
              inefficiency. These numbers show why BuildNG exists.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-gray-200 p-6 text-center"
              >
                <div className="text-3xl font-extrabold text-emerald-600">
                  {stat.value}
                </div>
                <div className="mt-2 text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Meet our team
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              A team of builders, engineers, and operators who understand
              Nigerian construction from the ground up.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member) => (
              <Card key={member.name} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold ${member.color}`}
                    >
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-gray-900">
                        {member.name}
                      </h3>
                      <p className="text-sm text-emerald-600">{member.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-gray-600">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors & Partners */}
      <section id="partners" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Advisors */}
            <div>
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-emerald-600" />
                <h2 className="text-2xl font-bold text-gray-900">Advisors</h2>
              </div>
              <p className="mt-2 text-gray-600">
                Industry leaders guiding our strategic direction.
              </p>
              <div className="mt-8 space-y-4">
                {advisors.map((advisor) => (
                  <div
                    key={advisor.name}
                    className="rounded-xl border border-gray-200 p-5"
                  >
                    <h3 className="text-sm font-semibold text-gray-900">
                      {advisor.name}
                    </h3>
                    <p className="text-sm text-emerald-600">{advisor.role}</p>
                    <p className="mt-1 text-xs text-gray-500">{advisor.org}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Partners */}
            <div>
              <div className="flex items-center gap-2">
                <Handshake className="h-5 w-5 text-emerald-600" />
                <h2 className="text-2xl font-bold text-gray-900">Partners</h2>
              </div>
              <p className="mt-2 text-gray-600">
                Trusted organizations we work with to deliver quality.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {partners.map((partner) => (
                  <div
                    key={partner}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 p-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                      <Building2 className="h-4 w-4 text-emerald-600" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {partner}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Location */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Our office
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Visit us at our headquarters in the heart of Victoria Island,
              Lagos.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-xl">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100">
                  <MapPin className="h-7 w-7 text-emerald-600" />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                  Lagos Headquarters
                </h3>
                <p className="mt-2 text-gray-600">
                  3rd Floor, The Civic Centre
                  <br />
                  Ozumba Mbadiwe Ave
                  <br />
                  Victoria Island, Lagos
                </p>
                <Separator className="my-6" />
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                  <Globe className="h-4 w-4" />
                  Monday - Friday, 8:00 AM - 6:00 PM WAT
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2">
              <Briefcase className="h-5 w-5 text-emerald-600" />
              <Badge variant="secondary">We&apos;re hiring</Badge>
            </div>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
              Join our team
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Help us transform how Nigeria builds. We are looking for
              passionate people who want to make a real impact on Africa&apos;s
              largest economy.
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {openPositions.map((position) => (
              <Card
                key={position.title}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-gray-900">
                          {position.title}
                        </h3>
                        <Badge variant="secondary">{position.department}</Badge>
                      </div>
                      <p className="mt-2 text-sm text-gray-600">
                        {position.description}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {position.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {position.type}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      <Button variant="outline" size="sm" className="gap-1">
                        Apply
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Don&apos;t see a role that fits? Send your CV to{" "}
              <a
                href="mailto:careers@buildng.com"
                className="font-medium text-emerald-600 hover:underline"
              >
                careers@buildng.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Press */}
      <section id="press" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <div className="flex items-center justify-center gap-2">
              <Newspaper className="h-5 w-5 text-emerald-600" />
              <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                In the press
              </h2>
            </div>
            <p className="mt-4 text-lg text-gray-600">
              What the media is saying about BuildNG.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {pressFeatures.map((item) => (
              <Card
                key={item.title}
                className="transition-shadow hover:shadow-md"
              >
                <CardContent className="p-6">
                  <Badge variant="outline" className="mb-3">
                    {item.outlet}
                  </Badge>
                  <h3 className="text-base font-semibold leading-snug text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-500">{item.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              For press inquiries, contact{" "}
              <a
                href="mailto:press@buildng.com"
                className="font-medium text-emerald-600 hover:underline"
              >
                press@buildng.com
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
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
                Ready to build with us?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
                Join thousands of Nigerian construction professionals already
                transforming how they build.
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="gap-2 bg-white px-8 text-base text-emerald-700 hover:bg-emerald-50"
                  >
                    Get Started Free
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 border-emerald-400 px-8 text-base text-white hover:bg-emerald-700"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
