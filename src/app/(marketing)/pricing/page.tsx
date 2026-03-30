"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Check,
  X,
  Minus,
  ChevronDown,
  ChevronUp,
  Shield,
  Package,
  ClipboardCheck,
  Building2,
  Users,
  FileCheck,
  AlertTriangle,
  ArrowRight,
  Zap,
  Phone,
  Mail,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const featureComparison = [
  {
    category: "Project Management",
    icon: Zap,
    features: [
      { name: "Active projects", starter: "1", professional: "Unlimited", enterprise: "Unlimited" },
      { name: "Team members", starter: "1", professional: "5", enterprise: "Unlimited" },
      { name: "Project dashboard", starter: true, professional: true, enterprise: true },
      { name: "Gantt charts & scheduling", starter: false, professional: true, enterprise: true },
      { name: "Budget tracking", starter: false, professional: true, enterprise: true },
      { name: "Custom project templates", starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: "Escrow Payments",
    icon: Shield,
    features: [
      { name: "Milestone-based escrow", starter: true, professional: true, enterprise: true },
      { name: "Automatic fund release", starter: false, professional: true, enterprise: true },
      { name: "Multi-party payments", starter: false, professional: true, enterprise: true },
      { name: "Payment analytics", starter: false, professional: true, enterprise: true },
      { name: "Custom payment terms", starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: "Materials & Price Index",
    icon: Package,
    features: [
      { name: "Price index tracking", starter: "3 materials", professional: "Full index", enterprise: "Full index" },
      { name: "Group buying", starter: false, professional: true, enterprise: true },
      { name: "Supplier verification", starter: false, professional: true, enterprise: true },
      { name: "Bulk order discounts", starter: false, professional: true, enterprise: true },
      { name: "Custom procurement workflows", starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: "Quality Assurance",
    icon: ClipboardCheck,
    features: [
      { name: "Inspection checklists", starter: false, professional: true, enterprise: true },
      { name: "Quality certification", starter: false, professional: "Up to 5 projects", enterprise: "Unlimited" },
      { name: "Photo evidence & timestamps", starter: false, professional: true, enterprise: true },
      { name: "Compliance reporting", starter: false, professional: true, enterprise: true },
      { name: "Third-party audit integration", starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: "Estate Management",
    icon: Building2,
    features: [
      { name: "Unit management", starter: false, professional: "Up to 20 units", enterprise: "Unlimited" },
      { name: "Tenant/buyer portal", starter: false, professional: true, enterprise: true },
      { name: "Sales & allocation tracking", starter: false, professional: true, enterprise: true },
      { name: "Facility management", starter: false, professional: false, enterprise: true },
      { name: "White-label buyer reports", starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: "Artisan Network",
    icon: Users,
    features: [
      { name: "Artisan marketplace access", starter: false, professional: true, enterprise: true },
      { name: "Verified artisan profiles", starter: false, professional: true, enterprise: true },
      { name: "Rating & review system", starter: false, professional: true, enterprise: true },
      { name: "Artisan performance analytics", starter: false, professional: false, enterprise: true },
      { name: "Exclusive artisan pool", starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: "Permits & Compliance",
    icon: FileCheck,
    features: [
      { name: "Permit tracking", starter: false, professional: "Up to 3", enterprise: "Unlimited" },
      { name: "Document management", starter: false, professional: true, enterprise: true },
      { name: "Regulatory calendar", starter: false, professional: true, enterprise: true },
      { name: "Permit concierge service", starter: false, professional: false, enterprise: true },
      { name: "Government agency liaison", starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: "Defect Management",
    icon: AlertTriangle,
    features: [
      { name: "Defect logging", starter: false, professional: true, enterprise: true },
      { name: "Photo evidence capture", starter: false, professional: true, enterprise: true },
      { name: "Contractor accountability", starter: false, professional: true, enterprise: true },
      { name: "Snag list automation", starter: false, professional: true, enterprise: true },
      { name: "Warranty tracking", starter: false, professional: false, enterprise: true },
    ],
  },
  {
    category: "Reporting & Integrations",
    icon: Zap,
    features: [
      { name: "Basic reports", starter: true, professional: true, enterprise: true },
      { name: "Advanced analytics", starter: false, professional: true, enterprise: true },
      { name: "White-label reports", starter: false, professional: false, enterprise: true },
      { name: "API access", starter: false, professional: false, enterprise: true },
      { name: "Custom integrations", starter: false, professional: false, enterprise: true },
      { name: "Data export (CSV, PDF)", starter: false, professional: true, enterprise: true },
    ],
  },
  {
    category: "Support",
    icon: MessageSquare,
    features: [
      { name: "Community forum", starter: true, professional: true, enterprise: true },
      { name: "Email support", starter: false, professional: true, enterprise: true },
      { name: "Priority support", starter: false, professional: true, enterprise: true },
      { name: "Dedicated account manager", starter: false, professional: false, enterprise: true },
      { name: "24/7 phone support", starter: false, professional: false, enterprise: true },
      { name: "On-site training", starter: false, professional: false, enterprise: true },
    ],
  },
];

const faqs = [
  {
    question: "Can I switch plans anytime?",
    answer:
      "Yes, you can upgrade or downgrade your plan at any time. When upgrading, you will get immediate access to new features, and we will prorate the charge for the remainder of your billing cycle. When downgrading, the change takes effect at the start of your next billing cycle.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept payments through Paystack (debit/credit cards), direct bank transfer to our GT Bank and Access Bank accounts, and USSD payments for all major Nigerian banks. Enterprise customers can also pay via invoice with NET-30 terms.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! The Professional plan comes with a 14-day free trial with full access to all features. No credit card is required to start. At the end of the trial, you can choose to subscribe or your account will automatically revert to the free Starter plan.",
  },
  {
    question: "Do you offer discounts for estates with 50+ units?",
    answer:
      "Absolutely. We offer volume-based pricing for large estate developments. Estates with 50-100 units receive a 15% discount, 100-500 units get 25% off, and developments over 500 units qualify for custom enterprise pricing. Contact our sales team for a tailored quote.",
  },
  {
    question: "Can I add more team members to my plan?",
    answer:
      "On the Professional plan, you can add extra team members beyond the included 5 for ₦3,000 per member per month. Enterprise plans include unlimited team members at no extra cost.",
  },
  {
    question: "What happens to my data if I cancel?",
    answer:
      "Your data remains accessible in read-only mode for 90 days after cancellation. You can export all your project data, documents, and reports during this period. After 90 days, data is securely archived for an additional 12 months and can be restored if you resubscribe.",
  },
  {
    question: "Do you offer refunds?",
    answer:
      "We offer a full refund within the first 30 days of any paid subscription if you are not satisfied. After 30 days, we provide prorated refunds for the unused portion of annual plans. Monthly plans are non-refundable but you can cancel anytime to prevent future charges.",
  },
  {
    question: "Is my payment information secure?",
    answer:
      "All payments are processed through Paystack, which is PCI DSS Level 1 compliant, the highest level of security certification. We never store your card details on our servers. All data is encrypted with 256-bit SSL encryption, and we are compliant with NDPR (Nigeria Data Protection Regulation).",
  },
];

function FeatureValue({ value }: { value: boolean | string }) {
  if (typeof value === "string") {
    return <span className="text-sm font-medium text-gray-900">{value}</span>;
  }
  if (value === true) {
    return <Check className="mx-auto h-5 w-5 text-emerald-600" />;
  }
  return <Minus className="mx-auto h-5 w-5 text-gray-300" />;
}

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [enterpriseForm, setEnterpriseForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    units: "",
    message: "",
  });

  const professionalPrice = isAnnual ? "₦250,000" : "₦25,000";
  const professionalPeriod = isAnnual ? "/year" : "/month";
  const professionalSavings = isAnnual ? "Save ₦50,000" : null;

  const enterprisePrice = isAnnual ? "₦1,500,000" : "₦150,000";
  const enterprisePeriod = isAnnual ? "/year" : "/month";
  const enterpriseSavings = isAnnual ? "Save ₦300,000" : null;

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-4">
            Pricing
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Simple, transparent pricing
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            Built for Nigerian construction professionals. Start free and scale
            as your business grows. No hidden fees, no surprises.
          </p>

          {/* Annual/Monthly Toggle */}
          <div className="mt-10 flex items-center justify-center gap-3">
            <span
              className={`text-sm font-medium ${
                !isAnnual ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
            />
            <span
              className={`text-sm font-medium ${
                isAnnual ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Annual
            </span>
            {isAnnual && (
              <Badge variant="success" className="ml-2">
                Save up to 17%
              </Badge>
            )}
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="-mt-8 pb-20">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          {/* Starter */}
          <Card className="relative flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Starter</CardTitle>
              <CardDescription>
                Perfect for individual contractors getting started
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-gray-900">
                  Free
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500">No credit card required</p>

              <Separator className="my-6" />

              <ul className="space-y-3">
                {[
                  "1 active project",
                  "Basic price index (3 materials)",
                  "1 team member",
                  "Project dashboard",
                  "Basic escrow payments",
                  "Basic reports",
                  "Community support",
                  "Mobile app access",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/register" className="w-full">
                <Button variant="outline" className="w-full">
                  Get Started
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Professional */}
          <Card className="relative flex flex-col border-emerald-600 shadow-xl shadow-emerald-100 ring-1 ring-emerald-600">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
              <Badge>POPULAR</Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-xl">Professional</CardTitle>
              <CardDescription>
                For growing firms managing multiple projects
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-gray-900">
                  {professionalPrice}
                </span>
                <span className="text-sm text-gray-500">
                  {professionalPeriod}
                </span>
              </div>
              {professionalSavings && (
                <p className="mt-1 text-sm font-medium text-emerald-600">
                  {professionalSavings}
                </p>
              )}
              {!isAnnual && (
                <p className="mt-1 text-sm text-gray-500">
                  ₦250,000 billed annually
                </p>
              )}

              <Separator className="my-6" />

              <ul className="space-y-3">
                {[
                  "Unlimited projects",
                  "Full price index + group buying",
                  "Quality certification (up to 5 projects)",
                  "Estate management (up to 20 units)",
                  "Artisan marketplace access",
                  "Permit tracking (up to 3)",
                  "Defect management",
                  "5 team members",
                  "Priority support",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="/register?plan=professional" className="w-full">
                <Button className="w-full gap-2">
                  Start Free Trial
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Enterprise */}
          <Card className="relative flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl">Enterprise</CardTitle>
              <CardDescription>
                For large firms and estate developers at scale
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-gray-900">
                  {enterprisePrice}
                </span>
                <span className="text-sm text-gray-500">
                  {enterprisePeriod}
                </span>
              </div>
              {enterpriseSavings && (
                <p className="mt-1 text-sm font-medium text-emerald-600">
                  {enterpriseSavings}
                </p>
              )}
              {!isAnnual && (
                <p className="mt-1 text-sm text-gray-500">
                  ₦1,500,000 billed annually
                </p>
              )}

              <Separator className="my-6" />

              <ul className="space-y-3">
                {[
                  "Everything in Professional",
                  "Unlimited projects & units",
                  "White-label reports",
                  "API access",
                  "Dedicated account manager",
                  "Custom integrations",
                  "Permit concierge included",
                  "Unlimited team members",
                  "24/7 phone support",
                  "On-site training",
                ].map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    <span className="text-sm text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link href="#enterprise-contact" className="w-full">
                <Button variant="outline" className="w-full">
                  Contact Sales
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Detailed feature comparison
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              See exactly what you get with each plan
            </p>
          </div>

          <div className="mt-12 overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-4 text-left text-sm font-semibold text-gray-900 pr-4">
                    Feature
                  </th>
                  <th className="w-[140px] py-4 text-center text-sm font-semibold text-gray-900">
                    Starter
                  </th>
                  <th className="w-[140px] py-4 text-center text-sm font-semibold text-emerald-600">
                    Professional
                  </th>
                  <th className="w-[140px] py-4 text-center text-sm font-semibold text-gray-900">
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {featureComparison.map((group) => (
                  <React.Fragment key={group.category}>
                    <tr>
                      <td
                        colSpan={4}
                        className="pt-8 pb-3"
                      >
                        <div className="flex items-center gap-2">
                          <group.icon className="h-5 w-5 text-emerald-600" />
                          <span className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                            {group.category}
                          </span>
                        </div>
                      </td>
                    </tr>
                    {group.features.map((feature) => (
                      <tr
                        key={feature.name}
                        className="border-b border-gray-100"
                      >
                        <td className="py-3 pr-4 text-sm text-gray-600">
                          {feature.name}
                        </td>
                        <td className="py-3 text-center">
                          <FeatureValue value={feature.starter} />
                        </td>
                        <td className="py-3 text-center bg-emerald-50/50">
                          <FeatureValue value={feature.professional} />
                        </td>
                        <td className="py-3 text-center">
                          <FeatureValue value={feature.enterprise} />
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg text-gray-600">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="mt-12 space-y-2">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-lg border border-gray-200 bg-white"
              >
                <button
                  className="flex w-full items-center justify-between px-6 py-4 text-left"
                  onClick={() =>
                    setExpandedFaq(expandedFaq === index ? null : index)
                  }
                >
                  <span className="text-sm font-medium text-gray-900">
                    {faq.question}
                  </span>
                  {expandedFaq === index ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-gray-500" />
                  )}
                </button>
                {expandedFaq === index && (
                  <div className="border-t border-gray-100 px-6 py-4">
                    <p className="text-sm leading-relaxed text-gray-600">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enterprise CTA */}
      <section id="enterprise-contact" className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Building at scale?{" "}
                <span className="text-emerald-600">Let&apos;s talk.</span>
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Get a custom quote tailored to your organization&apos;s needs.
                Our enterprise solutions include dedicated support, custom
                integrations, and volume-based pricing.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                    <Phone className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Call us
                    </div>
                    <div className="text-sm text-gray-500">
                      +234 (0) 1 888 0000
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                    <Mail className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      Email us
                    </div>
                    <div className="text-sm text-gray-500">
                      enterprise@buildng.com
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
                    <MessageSquare className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      WhatsApp
                    </div>
                    <div className="text-sm text-gray-500">
                      +234 (0) 812 345 6789
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  Request enterprise quote
                </CardTitle>
                <CardDescription>
                  Fill out the form and our team will get back to you within 24
                  hours.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="ent-name">Full name</Label>
                      <Input
                        id="ent-name"
                        placeholder="Your full name"
                        value={enterpriseForm.name}
                        onChange={(e) =>
                          setEnterpriseForm({
                            ...enterpriseForm,
                            name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ent-email">Work email</Label>
                      <Input
                        id="ent-email"
                        type="email"
                        placeholder="you@company.com"
                        value={enterpriseForm.email}
                        onChange={(e) =>
                          setEnterpriseForm({
                            ...enterpriseForm,
                            email: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="ent-company">Company name</Label>
                      <Input
                        id="ent-company"
                        placeholder="Your company"
                        value={enterpriseForm.company}
                        onChange={(e) =>
                          setEnterpriseForm({
                            ...enterpriseForm,
                            company: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ent-phone">Phone number</Label>
                      <Input
                        id="ent-phone"
                        type="tel"
                        placeholder="+234"
                        value={enterpriseForm.phone}
                        onChange={(e) =>
                          setEnterpriseForm({
                            ...enterpriseForm,
                            phone: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ent-units">
                      Estimated number of units/projects
                    </Label>
                    <Input
                      id="ent-units"
                      placeholder="e.g. 200 units across 3 estates"
                      value={enterpriseForm.units}
                      onChange={(e) =>
                        setEnterpriseForm({
                          ...enterpriseForm,
                          units: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ent-message">
                      Tell us about your needs
                    </Label>
                    <Textarea
                      id="ent-message"
                      placeholder="Describe your projects, team size, and any specific requirements..."
                      rows={4}
                      value={enterpriseForm.message}
                      onChange={(e) =>
                        setEnterpriseForm({
                          ...enterpriseForm,
                          message: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    Request Quote
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
