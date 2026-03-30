import Link from "next/link";
import {
  Users,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Fingerprint,
  Star,
  CalendarDays,
  Search,
  ShieldCheck,
  MessageSquare,
  Award,
  Clock,
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
    stat: "Word of Mouth",
    description:
      "is still the primary way Nigerians find tilers, plumbers, electricians, and other skilled artisans",
  },
  {
    stat: "Zero",
    description:
      "verification of skills, identity, or past work quality for most artisans in the informal sector",
  },
  {
    stat: "2-4 weeks",
    description:
      "typical time to find a reliable artisan through personal referrals, delaying projects significantly",
  },
];

const steps = [
  {
    number: "01",
    title: "Search by Skill & Location",
    description:
      "Browse verified artisans by trade, location, rating, and availability. Filter by experience level, budget range, and past project type.",
  },
  {
    number: "02",
    title: "Review Profiles",
    description:
      "See NIN-verified identity, skill assessments, portfolio photos of past work, and genuine ratings from previous clients.",
  },
  {
    number: "03",
    title: "Book & Build",
    description:
      "Check real-time availability, agree on scope and pricing, and book your artisan directly through the platform. Pay securely via BuildNG Escrow.",
  },
  {
    number: "04",
    title: "Rate & Review",
    description:
      "After the job, rate the artisan on quality, punctuality, and professionalism. Your review helps the next person make a better choice.",
  },
];

const features = [
  {
    icon: Fingerprint,
    title: "NIN Verification",
    description:
      "Every artisan on BuildNG is verified against the National Identification Number database. You know exactly who is working on your property.",
  },
  {
    icon: Star,
    title: "Skill Ratings",
    description:
      "Artisans are rated on a 5-point scale across quality, punctuality, communication, and value for money. Only artisans above 3.5 stars remain active.",
  },
  {
    icon: CalendarDays,
    title: "Availability Calendar",
    description:
      "See real-time availability for each artisan. No more calling 15 people to find someone free next week. Book directly from their calendar.",
  },
  {
    icon: Award,
    title: "Skill Assessments",
    description:
      "Artisans complete practical skill assessments administered by trade associations. Their certification level is displayed on their profile.",
  },
  {
    icon: MessageSquare,
    title: "In-App Messaging",
    description:
      "Discuss scope, share reference photos, and agree on specifications through our messaging system. All conversations are logged for dispute resolution.",
  },
  {
    icon: ShieldCheck,
    title: "Work Guarantee",
    description:
      "Jobs booked through BuildNG include a 30-day workmanship guarantee. If the work is substandard, we mediate and ensure it is corrected.",
  },
];

const trades = [
  "Tiling", "Plumbing", "Electrical", "Carpentry", "Painting",
  "POP/Screeding", "Welding", "Aluminium", "Block Laying", "Roofing",
  "Waterproofing", "HVAC",
];

export default function ArtisansPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-emerald-50">
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              <Users className="mr-1.5 h-3 w-3" />
              Artisan Marketplace
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              Find Verified Artisans in{" "}
              <span className="text-emerald-600">Minutes, Not Weeks</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-600">
              BuildNG connects you with NIN-verified, skill-assessed artisans
              across every construction trade. See real ratings, check
              availability, and book directly. No more gambling on referrals.
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
              Finding Good Artisans is a Game of Chance
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              In Nigeria, hiring an artisan means asking friends, hoping for the
              best, and having no recourse when the work is poor. There is no
              transparency, no accountability, and no way to verify claims of
              experience.
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
              A Verified Marketplace for Skilled Trades
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Every artisan on BuildNG is identity-verified, skill-assessed, and
              continuously rated by real clients. You see their past work, read
              genuine reviews, and book them when they are actually available.
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
              From search to completed job in four straightforward steps.
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

      {/* Available Trades */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Search className="mx-auto h-10 w-10 text-emerald-600" />
            <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
              Every Trade You Need
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Verified artisans across all major construction trades, available
              in Lagos, Abuja, Port Harcourt, and expanding to other cities.
            </p>
          </div>
          <div className="mx-auto mt-12 flex max-w-2xl flex-wrap justify-center gap-3">
            {trades.map((trade) => (
              <Badge key={trade} variant="outline" className="px-4 py-2 text-sm">
                {trade}
              </Badge>
            ))}
          </div>
          <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-3">
            {[
              { value: "3,200+", label: "Verified artisans on the platform" },
              { value: "12", label: "Trade categories covered" },
              { value: "4.6/5", label: "Average artisan rating" },
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

      {/* Features Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
              Trust Built Into Every Interaction
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Features designed to eliminate the guesswork and risk from hiring
              artisans.
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
              Free for Property Owners
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Searching and booking artisans is completely free. Artisans pay a
              small subscription to be listed on the platform.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-8 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>For Property Owners</CardTitle>
                <CardDescription>Search, book, and review</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">Free</div>
                <ul className="mt-6 space-y-3">
                  {[
                    "Unlimited artisan searches",
                    "View ratings and portfolios",
                    "Direct booking",
                    "In-app messaging",
                    "30-day work guarantee",
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
                  <CardTitle>For Contractors</CardTitle>
                  <Badge>Bulk Hiring</Badge>
                </div>
                <CardDescription>Manage artisan teams at scale</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">
                  N15,000{" "}
                  <span className="text-base font-normal text-gray-500">
                    / month
                  </span>
                </div>
                <ul className="mt-6 space-y-3">
                  {[
                    "Everything in Free",
                    "Team management tools",
                    "Bulk booking discounts",
                    "Attendance tracking",
                    "Performance analytics",
                    "Priority support",
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
            <Clock className="h-8 w-8 text-emerald-600" />
          </div>
          <blockquote className="mt-6 text-xl leading-relaxed text-gray-800">
            &ldquo;I needed a tiler urgently for my Ajah project and the
            referral I got did terrible work. With BuildNG, I found a 4.8-star
            tiler in Sangotedo within 20 minutes, checked his past work photos,
            and booked him for the next day. The difference in quality was night
            and day.&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold text-gray-900">Mrs. Folake Adesanya</p>
            <p className="text-sm text-gray-600">Homeowner, Ajah, Lagos</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-emerald-600 px-8 py-16 text-center shadow-xl sm:px-16">
            <Users className="mx-auto h-12 w-12 text-emerald-200" />
            <h2 className="mt-6 text-3xl font-bold text-white sm:text-4xl">
              Find Your Next Artisan Today
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-emerald-100">
              Stop relying on word of mouth. Search verified artisans, compare
              ratings, and book with confidence.
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
