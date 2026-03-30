"use client";

import * as React from "react";
import {
  Shield,
  Package,
  ClipboardCheck,
  Building2,
  Wrench,
  FileText,
  AlertTriangle,
  DollarSign,
  Star,
  UserCheck,
  MapPin,
  Hammer,
  TrendingUp,
  Truck,
  Camera,
  ChevronDown,
  ChevronUp,
  Filter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type ActivityModule =
  | "Escrow"
  | "Materials"
  | "Quality"
  | "Estates"
  | "Artisans"
  | "Permits"
  | "Defects";

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  details?: string;
  module: ActivityModule;
  timestamp: string;
  user: string;
  icon: React.ElementType;
}

const MODULE_CONFIG: Record<
  ActivityModule,
  { color: string; dotColor: string; lineColor: string; bgColor: string }
> = {
  Escrow: {
    color: "text-emerald-700",
    dotColor: "bg-emerald-500",
    lineColor: "border-emerald-200",
    bgColor: "bg-emerald-50",
  },
  Materials: {
    color: "text-amber-700",
    dotColor: "bg-amber-500",
    lineColor: "border-amber-200",
    bgColor: "bg-amber-50",
  },
  Quality: {
    color: "text-blue-700",
    dotColor: "bg-blue-500",
    lineColor: "border-blue-200",
    bgColor: "bg-blue-50",
  },
  Estates: {
    color: "text-purple-700",
    dotColor: "bg-purple-500",
    lineColor: "border-purple-200",
    bgColor: "bg-purple-50",
  },
  Artisans: {
    color: "text-orange-700",
    dotColor: "bg-orange-500",
    lineColor: "border-orange-200",
    bgColor: "bg-orange-50",
  },
  Permits: {
    color: "text-teal-700",
    dotColor: "bg-teal-500",
    lineColor: "border-teal-200",
    bgColor: "bg-teal-50",
  },
  Defects: {
    color: "text-red-700",
    dotColor: "bg-red-500",
    lineColor: "border-red-200",
    bgColor: "bg-red-50",
  },
};

const MOCK_ACTIVITIES: ActivityItem[] = [
  {
    id: "a1",
    title: "Escrow payment initiated",
    description:
      "₦3,200,000 deposited into escrow for Block D foundation at Lekki Phase 1.",
    details:
      "Milestone: Foundation completion. Contractor: Adebayo Construction Ltd. Verification method: Site inspection + drone survey. Expected completion: 2 weeks.",
    module: "Escrow",
    timestamp: "5 min ago",
    user: "Chidi Okonkwo",
    icon: DollarSign,
  },
  {
    id: "a2",
    title: "Granite delivered to site",
    description:
      "15 tonnes of ¾-inch granite delivered to Magodo site from Abeokuta quarry.",
    details:
      "Supplier: West African Quarries Ltd. Delivery vehicle: Dangote truck #LAG-284-XY. Quality grade: A. Received by: Site Engineer Emeka Nwosu.",
    module: "Materials",
    timestamp: "18 min ago",
    user: "Ngozi Adekunle",
    icon: Truck,
  },
  {
    id: "a3",
    title: "Structural inspection completed",
    description:
      "Column reinforcement inspection passed for Admiralty Homes Block C.",
    details:
      "Inspector: Engr. Babatunde Fashola. Standard: NIS 87:2004. Concrete strength: 25 N/mm². Rebar spacing verified at 150mm c/c. All 12 columns passed.",
    module: "Quality",
    timestamp: "42 min ago",
    user: "Engr. Babatunde Fashola",
    icon: ClipboardCheck,
  },
  {
    id: "a4",
    title: "New estate unit listed",
    description:
      "3-bedroom terrace duplex added to Greenfield Estate, Sangotedo. Asking: ₦45,000,000.",
    details:
      "Plot size: 300 sqm. Building area: 180 sqm. Features: 24hr power (solar + inverter), bore hole, CCTV, smart home ready. Title: Governor's Consent.",
    module: "Estates",
    timestamp: "1 hr ago",
    user: "Amina Bello",
    icon: Building2,
  },
  {
    id: "a5",
    title: "Electrician assigned to project",
    description:
      "Master electrician Yusuf Abubakar assigned to Parkview Estate rewiring project.",
    details:
      "Certification: NESEC Grade A. Experience: 12 years. Speciality: Industrial & residential. Rate: ₦15,000/day. Contract duration: 3 weeks.",
    module: "Artisans",
    timestamp: "1 hr ago",
    user: "Funke Adeyemi",
    icon: Wrench,
  },
  {
    id: "a6",
    title: "Building permit submitted",
    description:
      "Planning permit application submitted to LASBCA for 4-storey commercial building, Ikeja.",
    details:
      "Application ID: LASBCA-2024-1293. Building type: Commercial (Office). Floors: 4 + Penthouse. Architect: Arc. Kola Bankole. Estimated review period: 6-8 weeks.",
    module: "Permits",
    timestamp: "2 hrs ago",
    user: "Tolu Adewale",
    icon: FileText,
  },
  {
    id: "a7",
    title: "Plumbing defect logged",
    description:
      "Water seepage detected in ground floor bathroom, Unit 3, Royal Gardens Estate.",
    details:
      "Severity: Medium. Location: Ground floor master bathroom. Likely cause: Faulty pipe joint below slab. Assigned to: Plumber Hassan Musa. SLA: 48 hours.",
    module: "Defects",
    timestamp: "2 hrs ago",
    user: "Ibrahim Sule",
    icon: AlertTriangle,
  },
  {
    id: "a8",
    title: "Milestone payment released",
    description:
      "₦5,800,000 released from escrow to Ogun Builders for roofing completion at Ajah project.",
    details:
      "Milestone: Roof decking & waterproofing. Verified by: QA Inspector + Client representative. Release approved by: Project Manager Chidi Okonkwo.",
    module: "Escrow",
    timestamp: "3 hrs ago",
    user: "Chidi Okonkwo",
    icon: Shield,
  },
  {
    id: "a9",
    title: "Cement price alert",
    description:
      "Dangote Cement price increased to ₦6,200/bag in Abuja market. Up 4% from last week.",
    details:
      "BUA Cement: ₦5,900/bag. Lafarge: ₦6,000/bag. Recommended action: Source from Benue depot for ₦5,500/bag (transport cost: ₦200/bag). Total savings potential: ₦500/bag.",
    module: "Materials",
    timestamp: "3 hrs ago",
    user: "System Alert",
    icon: TrendingUp,
  },
  {
    id: "a10",
    title: "Site photos uploaded",
    description:
      "32 progress photos uploaded for Banana Island mansion project. Week 14 documentation.",
    details:
      "Categories: Structural (12), MEP (8), Finishing (7), Landscaping (5). Uploaded by: Site Supervisor Emeka Nwosu. Geotagged and timestamped.",
    module: "Quality",
    timestamp: "4 hrs ago",
    user: "Emeka Nwosu",
    icon: Camera,
  },
  {
    id: "a11",
    title: "Artisan performance review",
    description:
      "Quarterly review completed for Mason Bello Garba. Rating: 4.8/5 stars.",
    details:
      "Projects completed: 6. On-time delivery: 100%. Quality score: 4.7/5. Client satisfaction: 4.9/5. Recommended for premium projects.",
    module: "Artisans",
    timestamp: "5 hrs ago",
    user: "Funke Adeyemi",
    icon: Star,
  },
  {
    id: "a12",
    title: "Estate valuation updated",
    description:
      "Market valuation for Emerald City Sangotedo updated. Average price: ₦52M per unit.",
    details:
      "Previous valuation: ₦48M. Appreciation: 8.3% (6 months). Comparable sales: 3 units in Q4 2024. Appraiser: Knight Frank Nigeria.",
    module: "Estates",
    timestamp: "6 hrs ago",
    user: "Amina Bello",
    icon: MapPin,
  },
  {
    id: "a13",
    title: "Environmental permit approved",
    description:
      "EIA clearance received from NESREA for Phase 3 development in Abuja.",
    details:
      "Permit ID: NESREA/EIA/2024/0394. Valid until: December 2026. Conditions: Maintain 15m setback from drainage channel. Quarterly environmental audit required.",
    module: "Permits",
    timestamp: "7 hrs ago",
    user: "Tolu Adewale",
    icon: FileText,
  },
  {
    id: "a14",
    title: "Electrical defect resolved",
    description:
      "Faulty circuit breaker replaced at Unit 22, Palm Springs Estate, Abuja.",
    details:
      "Original issue: Tripping main breaker under 60% load. Root cause: Undersized 40A breaker on 63A circuit. Fix: Replaced with 63A Schneider breaker. Cost: ₦45,000.",
    module: "Defects",
    timestamp: "8 hrs ago",
    user: "Yusuf Abubakar",
    icon: Wrench,
  },
  {
    id: "a15",
    title: "Sand delivery received",
    description:
      "3 trips of sharp sand delivered to Ikoyi site from Ogun River source.",
    details:
      "Type: Coarse/sharp sand. Volume: 15 cubic metres. Supplier: Ogun Sand & Gravel Co. Quality check: Passed silt test (<6%). Stored at designated bay.",
    module: "Materials",
    timestamp: "yesterday",
    user: "Ngozi Adekunle",
    icon: Package,
  },
  {
    id: "a16",
    title: "Tiler onboarded",
    description:
      "Tiler Adamu Shehu joined the platform. Specialises in Italian porcelain tiles.",
    details:
      "Experience: 8 years. Certifications: NIOB associate. Portfolio: 24 completed projects. Rate: ₦2,500/sqm (labour only). Available: Immediately. Location: Lagos.",
    module: "Artisans",
    timestamp: "yesterday",
    user: "System",
    icon: UserCheck,
  },
  {
    id: "a17",
    title: "Escrow dispute resolved",
    description:
      "₦4,200,000 dispute resolved for Gbagada project. Funds released to contractor after re-inspection.",
    details:
      "Original dispute: Client claimed incomplete roofing work. Resolution: Independent inspector confirmed 95% completion. Agreement: Release 90%, retain 10% for punchlist.",
    module: "Escrow",
    timestamp: "yesterday",
    user: "Chidi Okonkwo",
    icon: Shield,
  },
  {
    id: "a18",
    title: "Foundation inspection failed",
    description:
      "Strip foundation depth insufficient at Plot 12, Kubwa Extension, Abuja.",
    details:
      "Required depth: 1.2m. Measured depth: 0.8m. Soil type: Laterite with clay sub-layer. Corrective action: Excavate to 1.5m and re-pour. Deadline: 5 working days.",
    module: "Quality",
    timestamp: "2 days ago",
    user: "Engr. Babatunde Fashola",
    icon: ClipboardCheck,
  },
  {
    id: "a19",
    title: "New phase launched",
    description:
      "Phase 4 of Amen Estate, Ibeju-Lekki officially launched. 48 units available.",
    details:
      "Unit types: 3-bed semi-detached (24), 4-bed detached (16), 5-bed detached (8). Price range: ₦38M - ₦95M. Payment plan: 30% initial, balance over 18 months.",
    module: "Estates",
    timestamp: "2 days ago",
    user: "Amina Bello",
    icon: Building2,
  },
  {
    id: "a20",
    title: "Welding artisan rated",
    description:
      "Welder Sani Danjuma received 4.5-star rating for gate fabrication at VGC.",
    details:
      "Project: Custom sliding gate (6m span). Material: 2-inch square pipe + sheet metal. Duration: 5 days. Client feedback: Excellent craftsmanship, minor delay due to rain.",
    module: "Artisans",
    timestamp: "2 days ago",
    user: "Client Review",
    icon: Hammer,
  },
  {
    id: "a21",
    title: "Window crack reported",
    description:
      "Cracked aluminium window frame at Unit 8, Oceana Blue Estate, Lekki.",
    details:
      "Window type: Sliding aluminium (1.2m x 1.5m). Cause: Structural settlement. Priority: Low. Assigned to: Aluminium fabricator Kelechi Eze. Warranty claim filed.",
    module: "Defects",
    timestamp: "3 days ago",
    user: "Ibrahim Sule",
    icon: AlertTriangle,
  },
  {
    id: "a22",
    title: "Fire safety certificate issued",
    description:
      "Federal Fire Service issued compliance certificate for Ikeja commercial plaza.",
    details:
      "Certificate ID: FFS/LAG/2024/2847. Valid: 12 months. Equipment verified: 24 extinguishers, 4 hydrant points, smoke detectors on all floors, 2 emergency exits per floor.",
    module: "Permits",
    timestamp: "3 days ago",
    user: "Tolu Adewale",
    icon: FileText,
  },
];

const ALL_MODULES: ActivityModule[] = [
  "Escrow",
  "Materials",
  "Quality",
  "Estates",
  "Artisans",
  "Permits",
  "Defects",
];

export function ActivityFeed() {
  const [activeFilter, setActiveFilter] = React.useState<
    ActivityModule | "All"
  >("All");
  const [expandedIds, setExpandedIds] = React.useState<Set<string>>(new Set());

  const filteredActivities =
    activeFilter === "All"
      ? MOCK_ACTIVITIES
      : MOCK_ACTIVITIES.filter((a) => a.module === activeFilter);

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <Card>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Activity Feed</CardTitle>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Filter className="h-3.5 w-3.5" />
            <span>{filteredActivities.length} activities</span>
          </div>
        </div>

        {/* Module filters */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          <Button
            variant={activeFilter === "All" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveFilter("All")}
          >
            All
          </Button>
          {ALL_MODULES.map((mod) => {
            const config = MODULE_CONFIG[mod];
            const count = MOCK_ACTIVITIES.filter(
              (a) => a.module === mod
            ).length;
            return (
              <Button
                key={mod}
                variant={activeFilter === mod ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(mod)}
              >
                <span
                  className={cn(
                    "mr-1.5 inline-block h-2 w-2 rounded-full",
                    config.dotColor
                  )}
                />
                {mod}
                <span className="ml-1 text-xs opacity-70">{count}</span>
              </Button>
            );
          })}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Timeline */}
        <div className="relative">
          {filteredActivities.map((activity, index) => {
            const config = MODULE_CONFIG[activity.module];
            const IconComp = activity.icon;
            const isExpanded = expandedIds.has(activity.id);
            const isLast = index === filteredActivities.length - 1;

            return (
              <div key={activity.id} className="relative flex gap-4 pb-6">
                {/* Timeline line */}
                {!isLast && (
                  <div
                    className={cn(
                      "absolute left-[17px] top-10 h-[calc(100%-24px)] w-px border-l-2 border-dashed",
                      config.lineColor
                    )}
                  />
                )}

                {/* Timeline dot */}
                <div
                  className={cn(
                    "relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full ring-4 ring-white",
                    config.bgColor
                  )}
                >
                  <IconComp className={cn("h-4 w-4", config.color)} />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1 pt-0.5">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-gray-900">
                        {activity.title}
                      </p>
                      <p className="mt-0.5 text-sm text-gray-600">
                        {activity.description}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-gray-400">
                      {activity.timestamp}
                    </span>
                  </div>

                  {/* Meta */}
                  <div className="mt-2 flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className={cn("text-[10px] px-1.5 py-0", config.color)}
                    >
                      {activity.module}
                    </Badge>
                    <span className="text-xs text-gray-400">
                      by {activity.user}
                    </span>
                  </div>

                  {/* Expandable details */}
                  {activity.details && (
                    <div className="mt-2">
                      <button
                        onClick={() => toggleExpanded(activity.id)}
                        className="flex items-center gap-1 text-xs font-medium text-emerald-600 hover:text-emerald-700"
                      >
                        {isExpanded ? (
                          <>
                            <ChevronUp className="h-3 w-3" />
                            Hide details
                          </>
                        ) : (
                          <>
                            <ChevronDown className="h-3 w-3" />
                            Show details
                          </>
                        )}
                      </button>
                      {isExpanded && (
                        <div className="mt-2 rounded-lg border border-gray-100 bg-gray-50/80 px-3 py-2.5 text-xs leading-relaxed text-gray-600">
                          {activity.details}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredActivities.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Filter className="mb-3 h-8 w-8 text-gray-300" />
            <p className="text-sm font-medium text-gray-500">
              No activities found
            </p>
            <p className="mt-1 text-xs text-gray-400">
              No activity matches the selected filter.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
