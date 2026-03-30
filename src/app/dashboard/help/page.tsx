"use client";

import React, { useState } from "react";
import {
  Search,
  BookOpen,
  HelpCircle,
  Phone,
  Mail,
  MessageCircle,
  Play,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Shield,
  Users,
  Package,
  FileCheck,
  AlertTriangle,
  Building2,
  Code2,
  MessagesSquare,
  Headphones,
  Video,
  ArrowRight,
  CheckCircle2,
  Briefcase,
  Star,
  Wrench,
  BarChart3,
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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// ---------- Data ----------
const gettingStartedCards = [
  {
    title: "Construction Escrow",
    description:
      "Learn how milestone-based payments protect both clients and contractors on your building projects.",
    icon: Shield,
    color: "bg-blue-50 text-blue-600",
    articles: 8,
    readTime: "15 min",
  },
  {
    title: "Artisan Marketplace",
    description:
      "Find verified artisans, check their ratings, and hire skilled tradespeople for your project.",
    icon: Users,
    color: "bg-purple-50 text-purple-600",
    articles: 6,
    readTime: "12 min",
  },
  {
    title: "Material Procurement",
    description:
      "Compare prices from verified vendors, join group buying, and track material deliveries.",
    icon: Package,
    color: "bg-amber-50 text-amber-600",
    articles: 7,
    readTime: "10 min",
  },
  {
    title: "Permits & Compliance",
    description:
      "Navigate Nigerian building permits, track applications, and stay compliant with regulations.",
    icon: FileCheck,
    color: "bg-emerald-50 text-emerald-600",
    articles: 9,
    readTime: "18 min",
  },
  {
    title: "Quality Inspections",
    description:
      "Understand the 8-stage inspection process and how quality scores protect your investment.",
    icon: CheckCircle2,
    color: "bg-indigo-50 text-indigo-600",
    articles: 5,
    readTime: "14 min",
  },
  {
    title: "Estate Management",
    description:
      "Manage multi-unit developments, track portfolio performance, and oversee estate operations.",
    icon: Building2,
    color: "bg-rose-50 text-rose-600",
    articles: 6,
    readTime: "11 min",
  },
];

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

const faqItems: FaqItem[] = [
  {
    question: "How does construction escrow work?",
    answer:
      "BuildNG's construction escrow holds project funds securely in a CBN-regulated trust account managed by our banking partner. When a client creates a project, they deposit the full project amount or fund milestones individually. Funds are only released to the contractor after an independent inspector verifies that each milestone has been completed to specification. This protects clients from paying for incomplete work and guarantees contractors receive prompt payment upon verified completion.",
    category: "Escrow",
  },
  {
    question: "How are material prices verified?",
    answer:
      "Our material pricing engine aggregates data from over 500 verified building material vendors across Nigeria, updated daily. Prices are cross-referenced against market data from major markets like Trade Fair Complex Lagos, Dei-Dei Abuja, and Coal Camp Enugu. We flag any prices that deviate more than 15% from the market average, and our team conducts weekly spot checks at physical vendor locations to ensure accuracy. Vendors found misrepresenting prices are suspended from the platform.",
    category: "Materials",
  },
  {
    question: "What does the 8-stage inspection cover?",
    answer:
      "The BuildNG 8-stage inspection framework covers: (1) Setting Out and Foundation, (2) Substructure to DPC, (3) Block Work to Lintel Level, (4) Lintel to Roof Level, (5) Roofing, (6) MEP Rough-in (Mechanical, Electrical, Plumbing), (7) Plastering and Finishing, and (8) Final Inspection and Handover. Each stage has a detailed checklist aligned with the Nigerian Building Code and is conducted by COREN-registered engineers. A minimum score of 70/100 is required to proceed to the next stage.",
    category: "Quality",
  },
  {
    question: "How do I add units to my estate portfolio?",
    answer:
      "Navigate to the Estates module from your dashboard and select your estate or create a new one. Click 'Add Unit' and fill in the unit details including type (detached, semi-detached, terrace, flat), floor plan, square footage, and pricing. You can bulk-upload units via CSV for large developments. Each unit can be individually tracked through its construction lifecycle, from foundation to handover, with separate escrow accounts and inspection schedules.",
    category: "Estates",
  },
  {
    question: "How is artisan identity verified?",
    answer:
      "BuildNG uses a three-tier verification process for artisans. First, we verify their National Identification Number (NIN) through the NIMC database. Second, we confirm trade certifications through relevant bodies such as the Federal Ministry of Works certification, NABTEB trade certificates, or guild membership cards. Third, we conduct a background check and verify at least three references from previous clients. Artisans who pass all three tiers receive a 'Verified' badge on their profile.",
    category: "Artisans",
  },
  {
    question: "What permits do I need in Lagos?",
    answer:
      "For residential construction in Lagos, you typically need: a Building Plan Approval from LASPPPA (Lagos State Physical Planning Permit Authority), an Environmental Impact Assessment from LASEPA, a Stage Certification from LASBCA (Lagos State Building Control Agency) at each construction phase, and a Certificate of Completion. For commercial projects, you may additionally need a Fire Safety Certificate from the Lagos State Fire Service and an Environmental Sanitation Clearance. BuildNG tracks all required permits and sends reminders before expiry dates.",
    category: "Permits",
  },
  {
    question: "How do I report a defect?",
    answer:
      "To report a defect, go to the Defects module and click 'Report Defect'. Select the project, specify the location within the building, choose the defect category (structural, MEP, finishing, etc.), and assign a severity level. You can upload photos and videos as evidence. The system automatically notifies the contractor and quality inspector. All defects are tracked through resolution with a complete audit trail, and unresolved defects block milestone payment releases.",
    category: "Defects",
  },
  {
    question: "What are the platform fees?",
    answer:
      "BuildNG charges a transparent fee structure: 1.5% of the total project value for escrow services (capped at N500,000 per project), which covers secure fund holding, milestone management, and payment processing. The artisan marketplace is free for clients; artisans pay a 5% commission on completed jobs. Material price comparison is free; group buying coordination charges 1% of the order value. There are no hidden fees, and all charges are displayed before you confirm any transaction.",
    category: "General",
  },
  {
    question: "How do I invite my team?",
    answer:
      "Go to Settings and select 'Team Management'. Click 'Invite Member' and enter their email address and phone number. Assign a role: Project Owner (full access), Project Manager (can manage milestones and inspections), Inspector (can submit inspection reports), Contractor (can view milestones and submit completion requests), or Viewer (read-only access). Team members receive an SMS and email invitation. You can manage permissions and revoke access at any time from the same settings page.",
    category: "General",
  },
  {
    question: "Is my money safe in escrow?",
    answer:
      "Absolutely. All escrow funds are held in a dedicated trust account with our banking partner, a CBN-licensed commercial bank. Funds are ring-fenced and cannot be used for any purpose other than the designated project milestones. BuildNG does not commingle escrow funds with operational funds. The trust account is audited quarterly by an independent firm, and all transactions are insured by NDIC up to the statutory limit. In the unlikely event of a dispute, funds remain protected until resolution.",
    category: "Escrow",
  },
  {
    question: "How do group buying discounts work?",
    answer:
      "Group buying allows multiple builders in the same area to combine their material orders for bulk pricing. When you need materials, you can either create a group buy or join an existing one near your project location. Once the minimum order quantity is reached (typically within 48-72 hours), the order is confirmed with the vendor at the negotiated bulk rate. Savings typically range from 8-20% depending on material type and quantity. Delivery is coordinated to each participant's site, and payment is handled through the platform.",
    category: "Materials",
  },
  {
    question: "Can I use BuildNG for commercial projects?",
    answer:
      "Yes, BuildNG supports both residential and commercial construction projects across Nigeria. Commercial projects benefit from enhanced features including multi-phase milestone tracking, larger escrow limits (up to N500 million), multiple inspector assignments, and advanced reporting for stakeholder presentations. Commercial projects also include compliance tracking for additional permits required by state and federal agencies, as well as integration with quantity surveyor bill of quantities.",
    category: "General",
  },
  {
    question: "What happens if a contractor disputes a milestone?",
    answer:
      "If a contractor believes a milestone has been unfairly rejected, they can raise a formal dispute through the platform. The dispute triggers a 72-hour review period during which a senior BuildNG-appointed inspector (different from the original inspector) conducts an independent assessment. Both parties can submit evidence through the platform. If the dispute is upheld, the milestone is approved and payment released. If rejected, the contractor receives a detailed remediation report. Unresolved disputes can be escalated to our arbitration panel.",
    category: "Escrow",
  },
  {
    question: "How are quality scores calculated?",
    answer:
      "Quality scores are calculated using a weighted assessment across multiple criteria at each inspection stage. The scoring considers structural integrity (30%), material quality compliance (20%), workmanship standards (25%), safety compliance (15%), and adherence to approved drawings (10%). Each criterion is scored on a 0-100 scale by the assigned COREN-registered inspector. The weighted average produces the final stage score. Projects maintaining an average score above 85 across all stages receive a BuildNG Quality Excellence certification.",
    category: "Quality",
  },
  {
    question: "How do I contact support?",
    answer:
      "BuildNG support is available through multiple channels. For immediate assistance, use the live chat button in the bottom-right corner of any page (available Monday-Saturday, 8am-8pm WAT). You can also reach us via email at support@buildng.com (response within 4 hours), phone at +234 1 888 0000 (Monday-Friday, 9am-5pm WAT), or WhatsApp at +234 812 345 6789 for quick queries. For urgent escrow-related issues, our dedicated escrow hotline at +234 1 888 0001 is available 24/7.",
    category: "General",
  },
];

const videoTutorials = [
  {
    title: "Getting Started with BuildNG",
    duration: "5:30",
    description: "Complete walkthrough of the platform setup and first project creation.",
    category: "Beginner",
  },
  {
    title: "Setting Up Your First Escrow",
    duration: "8:15",
    description: "Step-by-step guide to creating a milestone-based escrow project.",
    category: "Escrow",
  },
  {
    title: "Hiring Verified Artisans",
    duration: "6:45",
    description: "How to search, verify, and hire artisans through the marketplace.",
    category: "Artisans",
  },
  {
    title: "Group Buying Materials",
    duration: "7:20",
    description: "Join or create a group buy to save on building materials.",
    category: "Materials",
  },
  {
    title: "Navigating Lagos Permits",
    duration: "10:00",
    description: "Complete guide to building permits in Lagos State.",
    category: "Permits",
  },
  {
    title: "Quality Inspection Process",
    duration: "9:10",
    description: "Understanding the 8-stage quality inspection framework.",
    category: "Quality",
  },
];

// ---------- Component ----------
export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedFaq, setExpandedFaq] = useState<Set<number>>(
    new Set([0, 1, 2])
  );
  const [activeTab, setActiveTab] = useState("all");

  const toggleFaq = (index: number) => {
    setExpandedFaq((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const filteredFaqs = faqItems.filter(
    (faq) =>
      (activeTab === "all" ||
        faq.category.toLowerCase() === activeTab.toLowerCase()) &&
      (searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">Help Center</h1>
        <p className="mt-2 text-gray-500">
          Find answers, tutorials, and support for all BuildNG features
        </p>
      </div>

      {/* Search Bar */}
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search help articles, FAQs, tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-12 pl-10 text-base"
            />
          </div>
        </CardContent>
      </Card>

      {/* Getting Started */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-emerald-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Getting Started
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {gettingStartedCards.map((card) => {
            const Icon = card.icon;
            return (
              <Card
                key={card.title}
                className="cursor-pointer transition-all hover:shadow-md hover:border-emerald-200"
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className={`rounded-lg p-2.5 ${card.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary">{card.articles} articles</Badge>
                  </div>
                  <CardTitle className="text-base">{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">
                      {card.readTime} read
                    </span>
                    <Button variant="ghost" size="sm">
                      Start learning
                      <ArrowRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <Separator />

      {/* FAQ Section */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-emerald-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        <Tabs
          defaultValue="all"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mb-4"
        >
          <TabsList className="flex-wrap h-auto gap-1 bg-transparent p-0">
            {[
              "all",
              "Escrow",
              "Materials",
              "Quality",
              "Artisans",
              "Permits",
              "Defects",
              "Estates",
              "General",
            ].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs data-[state=active]:bg-emerald-600 data-[state=active]:text-white data-[state=active]:border-emerald-600"
              >
                {tab === "all" ? "All Topics" : tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const originalIndex = faqItems.indexOf(faq);
            const isExpanded = expandedFaq.has(originalIndex);
            return (
              <Card key={originalIndex}>
                <button
                  onClick={() => toggleFaq(originalIndex)}
                  className="flex w-full items-start justify-between p-4 text-left"
                >
                  <div className="flex items-start gap-3 pr-4">
                    <div className="mt-0.5 shrink-0 rounded-full bg-emerald-50 p-1">
                      <HelpCircle className="h-4 w-4 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {faq.question}
                      </h3>
                      {isExpanded && (
                        <p className="mt-2 text-sm leading-relaxed text-gray-600">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {faq.category}
                    </Badge>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                </button>
              </Card>
            );
          })}
          {filteredFaqs.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center py-12">
                <HelpCircle className="h-10 w-10 text-gray-300" />
                <p className="mt-3 text-sm text-gray-500">
                  No matching questions found. Try a different search term or
                  contact support.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Separator />

      {/* Contact Support */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Headphones className="h-5 w-5 text-emerald-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Contact Support
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="rounded-full bg-blue-50 p-3">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="mt-3 font-semibold text-gray-900">Email</h3>
              <p className="mt-1 text-sm text-gray-500">
                support@buildng.com
              </p>
              <p className="mt-0.5 text-xs text-gray-400">
                Response within 4 hours
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                Send Email
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="rounded-full bg-emerald-50 p-3">
                <Phone className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="mt-3 font-semibold text-gray-900">Phone</h3>
              <p className="mt-1 text-sm text-gray-500">+234 1 888 0000</p>
              <p className="mt-0.5 text-xs text-gray-400">
                Mon-Fri, 9am-5pm WAT
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                Call Us
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="rounded-full bg-green-50 p-3">
                <MessageCircle className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="mt-3 font-semibold text-gray-900">WhatsApp</h3>
              <p className="mt-1 text-sm text-gray-500">+234 812 345 6789</p>
              <p className="mt-0.5 text-xs text-gray-400">
                Quick queries &amp; updates
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                <MessageCircle className="h-3.5 w-3.5 mr-1" />
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="cursor-pointer transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center p-6 text-center">
              <div className="rounded-full bg-purple-50 p-3">
                <Headphones className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="mt-3 font-semibold text-gray-900">Live Chat</h3>
              <p className="mt-1 text-sm text-gray-500">Chat with an agent</p>
              <p className="mt-0.5 text-xs text-gray-400">
                Mon-Sat, 8am-8pm WAT
              </p>
              <Button size="sm" className="mt-3">
                Start Live Chat
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Video Tutorials */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Video className="h-5 w-5 text-emerald-600" />
          <h2 className="text-xl font-semibold text-gray-900">
            Video Tutorials
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {videoTutorials.map((video) => (
            <Card
              key={video.title}
              className="cursor-pointer overflow-hidden transition-all hover:shadow-md"
            >
              {/* Video Thumbnail Placeholder */}
              <div className="relative flex h-40 items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15),transparent_70%)]" />
                <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white/90 shadow-lg transition-transform hover:scale-110">
                  <Play className="h-6 w-6 text-emerald-600 ml-0.5" />
                </div>
                <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium text-white">
                  {video.duration}
                </div>
                <Badge
                  variant="secondary"
                  className="absolute left-2 top-2 bg-white/90 text-xs"
                >
                  {video.category}
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-gray-900">{video.title}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  {video.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <Separator />

      {/* API Documentation & Community Forum */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Card className="cursor-pointer transition-all hover:shadow-md hover:border-emerald-200">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-gray-900 p-3">
              <Code2 className="h-6 w-6 text-emerald-400" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">
                API Documentation
              </h3>
              <p className="mt-0.5 text-sm text-gray-500">
                Integrate BuildNG into your existing systems with our
                comprehensive REST API. Includes authentication, webhooks, and
                SDKs for popular languages.
              </p>
              <Button variant="link" className="mt-1 h-auto p-0 text-sm">
                View API docs
                <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="cursor-pointer transition-all hover:shadow-md hover:border-emerald-200">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="rounded-lg bg-emerald-50 p-3">
              <MessagesSquare className="h-6 w-6 text-emerald-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Community Forum</h3>
              <p className="mt-0.5 text-sm text-gray-500">
                Join thousands of Nigerian builders, contractors, and developers
                sharing tips, asking questions, and discussing best practices.
              </p>
              <Button variant="link" className="mt-1 h-auto p-0 text-sm">
                Visit community
                <ExternalLink className="ml-1 h-3.5 w-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
