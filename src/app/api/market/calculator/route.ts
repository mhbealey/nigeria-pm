import { NextRequest, NextResponse } from "next/server";

// ── Types ───────────────────────────────────────────────────────────

interface BuildingSpec {
  buildingType: "residential" | "commercial" | "mixed-use" | "industrial";
  subType?:
    | "bungalow"
    | "duplex"
    | "storey-building"
    | "apartment-block"
    | "office"
    | "warehouse"
    | "shopping-complex"
    | "hotel";
  totalArea: number; // sqm
  floors: number;
  bedrooms?: number;
  bathrooms?: number;
  finishLevel: "basic" | "standard" | "premium" | "luxury";
  location: string; // city
  state: string;
  includeRoofing?: boolean;
  includeFencing?: boolean;
  plotSize?: number; // sqm
  includeBoreholeAndTank?: boolean;
  includeGenerator?: boolean;
  includeSolarPower?: boolean;
}

interface CostBreakdown {
  category: string;
  description: string;
  amount: number;
  percentage: number;
}

interface CostEstimate {
  buildingSpec: BuildingSpec;
  totalEstimate: number;
  costPerSqm: number;
  breakdown: CostBreakdown[];
  timeline: { phase: string; duration: string; cost: number }[];
  assumptions: string[];
  disclaimer: string;
}

// ── Per-SQM Cost Tables (NGN) ───────────────────────────────────────

const baseCostPerSqm: Record<string, Record<string, number>> = {
  // city -> finish level -> cost per sqm
  Lagos: { basic: 180000, standard: 280000, premium: 450000, luxury: 750000 },
  Abuja: { basic: 160000, standard: 250000, premium: 400000, luxury: 680000 },
  "Port Harcourt": { basic: 150000, standard: 230000, premium: 370000, luxury: 620000 },
  Ibadan: { basic: 130000, standard: 200000, premium: 320000, luxury: 520000 },
  Kano: { basic: 120000, standard: 190000, premium: 300000, luxury: 480000 },
  Enugu: { basic: 135000, standard: 210000, premium: 340000, luxury: 550000 },
  Benin: { basic: 125000, standard: 195000, premium: 310000, luxury: 500000 },
  Calabar: { basic: 120000, standard: 185000, premium: 290000, luxury: 470000 },
  Uyo: { basic: 125000, standard: 190000, premium: 300000, luxury: 490000 },
  Warri: { basic: 130000, standard: 200000, premium: 310000, luxury: 500000 },
};

const defaultCostPerSqm: Record<string, number> = {
  basic: 140000,
  standard: 220000,
  premium: 350000,
  luxury: 580000,
};

// Building type multipliers
const buildingTypeMultipliers: Record<string, number> = {
  bungalow: 1.0,
  duplex: 1.15,
  "storey-building": 1.2,
  "apartment-block": 1.1,
  office: 1.25,
  warehouse: 0.65,
  "shopping-complex": 1.3,
  hotel: 1.45,
};

// ── Cost Calculation ────────────────────────────────────────────────

function calculateCost(spec: BuildingSpec): CostEstimate {
  const cityKey = Object.keys(baseCostPerSqm).find(
    (k) => k.toLowerCase() === spec.location.toLowerCase()
  );
  const cityRates = cityKey ? baseCostPerSqm[cityKey] : defaultCostPerSqm;
  const baseRate = cityRates[spec.finishLevel] || cityRates["standard"];

  const typeMultiplier =
    buildingTypeMultipliers[spec.subType || "bungalow"] || 1.0;

  // Floor premium: each floor above ground adds ~8% to per-sqm cost
  const floorMultiplier = 1 + Math.max(0, spec.floors - 1) * 0.08;

  const effectiveRate = Math.round(baseRate * typeMultiplier * floorMultiplier);
  let structuralCost = effectiveRate * spec.totalArea;

  // Breakdown percentages (typical Nigerian construction)
  const breakdownPercentages = {
    "Foundation & Substructure": 0.15,
    "Block Work & Concrete Frame": 0.2,
    "Roofing & Carpentry": 0.12,
    "Plastering & Screeding": 0.08,
    "Electrical Installation": 0.1,
    "Plumbing & Sanitary": 0.08,
    "Doors & Windows (Aluminium/Wood)": 0.07,
    "Tiling & Floor Finishing": 0.08,
    "Painting & Decoration": 0.05,
    "External Works & Drainage": 0.04,
    "Professional Fees (Architect, Engineer, QS)": 0.03,
  };

  const breakdown: CostBreakdown[] = Object.entries(
    breakdownPercentages
  ).map(([category, pct]) => ({
    category,
    description: getCategoryDescription(category, spec.finishLevel),
    amount: Math.round(structuralCost * pct),
    percentage: Math.round(pct * 100 * 10) / 10,
  }));

  // Additional costs
  let additionalCost = 0;

  if (spec.includeFencing && spec.plotSize) {
    // Approximate perimeter from plot size (assume square plot)
    const perimeter = 4 * Math.sqrt(spec.plotSize);
    const fenceCostPerMeter =
      spec.finishLevel === "luxury"
        ? 85000
        : spec.finishLevel === "premium"
          ? 65000
          : spec.finishLevel === "standard"
            ? 45000
            : 30000;
    const fenceCost = Math.round(perimeter * fenceCostPerMeter);
    additionalCost += fenceCost;
    breakdown.push({
      category: "Perimeter Fencing & Gate",
      description: `${Math.round(perimeter)}m fence with gate house`,
      amount: fenceCost,
      percentage: 0,
    });
  }

  if (spec.includeBoreholeAndTank) {
    const boreholeCost =
      spec.location.toLowerCase() === "lagos" ? 3500000 : 2800000;
    const tankCost = spec.finishLevel === "luxury" ? 1200000 : 800000;
    const waterCost = boreholeCost + tankCost;
    additionalCost += waterCost;
    breakdown.push({
      category: "Borehole & Water Tank",
      description: "Industrial borehole with overhead/underground tank",
      amount: waterCost,
      percentage: 0,
    });
  }

  if (spec.includeGenerator) {
    const genSizeKVA =
      spec.totalArea > 400
        ? 60
        : spec.totalArea > 200
          ? 30
          : 15;
    const genCost =
      genSizeKVA >= 60
        ? 12000000
        : genSizeKVA >= 30
          ? 6500000
          : 3500000;
    additionalCost += genCost;
    breakdown.push({
      category: "Standby Generator",
      description: `${genSizeKVA}KVA diesel generator with changeover`,
      amount: genCost,
      percentage: 0,
    });
  }

  if (spec.includeSolarPower) {
    const solarCostPerSqm = 15000;
    const solarCost = Math.round(spec.totalArea * solarCostPerSqm);
    additionalCost += solarCost;
    breakdown.push({
      category: "Solar Power System",
      description: "Solar panels, inverter, batteries, and installation",
      amount: solarCost,
      percentage: 0,
    });
  }

  const totalEstimate = structuralCost + additionalCost;

  // Recalculate percentages with additionals
  for (const item of breakdown) {
    item.percentage = Math.round((item.amount / totalEstimate) * 1000) / 10;
  }

  // Timeline
  const monthsPerFloor = spec.finishLevel === "luxury" ? 4 : spec.finishLevel === "premium" ? 3.5 : 3;
  const baseDurationMonths = Math.ceil(
    spec.floors * monthsPerFloor + 2 // +2 for foundation and finishing
  );

  const timeline = [
    {
      phase: "Site Preparation & Foundation",
      duration: `${Math.max(4, Math.ceil(baseDurationMonths * 0.15))} weeks`,
      cost: Math.round(totalEstimate * 0.15),
    },
    {
      phase: "Superstructure (Block, Concrete, Columns)",
      duration: `${Math.max(8, Math.ceil(baseDurationMonths * 0.25 * 4))} weeks`,
      cost: Math.round(totalEstimate * 0.25),
    },
    {
      phase: "Roofing & Carpentry",
      duration: `${Math.max(3, Math.ceil(baseDurationMonths * 0.1 * 4))} weeks`,
      cost: Math.round(totalEstimate * 0.12),
    },
    {
      phase: "MEP Rough-in (Electrical, Plumbing)",
      duration: `${Math.max(4, Math.ceil(baseDurationMonths * 0.12 * 4))} weeks`,
      cost: Math.round(totalEstimate * 0.18),
    },
    {
      phase: "Plastering, Screeding & Tiling",
      duration: `${Math.max(4, Math.ceil(baseDurationMonths * 0.15 * 4))} weeks`,
      cost: Math.round(totalEstimate * 0.16),
    },
    {
      phase: "Doors, Windows & Finishing",
      duration: `${Math.max(3, Math.ceil(baseDurationMonths * 0.1 * 4))} weeks`,
      cost: Math.round(totalEstimate * 0.09),
    },
    {
      phase: "Painting, External Works & Cleanup",
      duration: `${Math.max(2, Math.ceil(baseDurationMonths * 0.08 * 4))} weeks`,
      cost: Math.round(totalEstimate * 0.05),
    },
  ];

  const assumptions = [
    `Base cost per sqm for ${spec.location || "default region"} at ${spec.finishLevel} finish: NGN ${baseRate.toLocaleString()}`,
    `Building type multiplier (${spec.subType || "standard"}): ${typeMultiplier}x`,
    spec.floors > 1 ? `Multi-floor premium (${spec.floors} floors): ${Math.round((floorMultiplier - 1) * 100)}% added` : "Single floor - no height premium",
    "Prices based on Q1 2026 market rates and may fluctuate",
    "Labour costs included in each line item",
    "Does not include land acquisition cost",
    "Assumes normal soil conditions (no piling required)",
    "Professional fees estimated at 3% of construction cost",
  ];

  return {
    buildingSpec: spec,
    totalEstimate,
    costPerSqm: Math.round(totalEstimate / spec.totalArea),
    breakdown,
    timeline,
    assumptions,
    disclaimer:
      "This is an indicative estimate based on current market rates in Nigeria. Actual costs may vary by 10-25% depending on site conditions, material price fluctuations, contractor rates, and design complexity. We recommend obtaining at least 3 contractor quotes. All amounts in Nigerian Naira (NGN).",
  };
}

function getCategoryDescription(
  category: string,
  finishLevel: string
): string {
  const descriptions: Record<string, Record<string, string>> = {
    "Foundation & Substructure": {
      basic: "Strip foundation with DPC, hardcore filling",
      standard: "Pad/strip foundation, DPC, German floor",
      premium: "Raft foundation, waterproofing membrane, German floor",
      luxury: "Raft foundation, waterproofing, insulated German floor, radon barrier",
    },
    "Block Work & Concrete Frame": {
      basic: "6-inch blocks, plain columns and beams",
      standard: "9-inch external / 6-inch internal, reinforced columns",
      premium: "9-inch blocks throughout, heavy-duty columns, lintel beams",
      luxury: "9-inch blocks, insulated cavity walls, engineered structural frame",
    },
    "Roofing & Carpentry": {
      basic: "Aluminium long-span (0.45mm), treated hardwood trusses",
      standard: "Aluminium long-span (0.55mm), treated hardwood trusses with fascia",
      premium: "Stone-coated tiles, engineered trusses, soffit and fascia boards",
      luxury: "Premium stone-coated tiles, steel trusses, insulated ceiling void",
    },
    "Electrical Installation": {
      basic: "Basic wiring, surface conduit, 2 lighting points per room",
      standard: "Concealed conduit, adequate sockets, DB board with MCBs",
      premium: "Concealed conduit, ample sockets, RCBO protection, LED downlights",
      luxury: "Smart home wiring, whole-house surge protection, designer fittings, home automation prep",
    },
  };

  return (
    descriptions[category]?.[finishLevel] ||
    `${finishLevel.charAt(0).toUpperCase() + finishLevel.slice(1)} grade specification`
  );
}

// ── POST Handler ────────────────────────────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const spec = body as Partial<BuildingSpec>;

    // Validation
    const errors: Record<string, string[]> = {};

    const validBuildingTypes = [
      "residential",
      "commercial",
      "mixed-use",
      "industrial",
    ];
    if (!spec.buildingType || !validBuildingTypes.includes(spec.buildingType)) {
      errors.buildingType = [
        `Building type is required. Valid types: ${validBuildingTypes.join(", ")}`,
      ];
    }

    if (!spec.totalArea || spec.totalArea <= 0 || spec.totalArea > 100000) {
      errors.totalArea = [
        "Total area must be between 1 and 100,000 sqm",
      ];
    }

    if (!spec.floors || spec.floors < 1 || spec.floors > 50) {
      errors.floors = ["Floors must be between 1 and 50"];
    }

    const validFinishLevels = ["basic", "standard", "premium", "luxury"];
    if (
      !spec.finishLevel ||
      !validFinishLevels.includes(spec.finishLevel)
    ) {
      errors.finishLevel = [
        `Finish level is required. Valid levels: ${validFinishLevels.join(", ")}`,
      ];
    }

    if (!spec.location) {
      errors.location = ["Location (city) is required"];
    }

    if (!spec.state) {
      errors.state = ["State is required"];
    }

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Validation failed",
            code: "VALIDATION_ERROR",
            details: errors,
          },
        },
        { status: 400 }
      );
    }

    const estimate = calculateCost(spec as BuildingSpec);

    return NextResponse.json({
      success: true,
      data: estimate,
    });
  } catch (error) {
    console.error("[Cost Calculator API] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: { message: "Failed to calculate construction cost estimate" },
      },
      { status: 500 }
    );
  }
}
