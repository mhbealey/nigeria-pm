import { NextRequest, NextResponse } from "next/server";

// ── Types ───────────────────────────────────────────────────────────

type ReportType =
  | "project-summary"
  | "financial"
  | "investor"
  | "compliance"
  | "market-analysis";

interface ReportMeta {
  type: ReportType;
  generatedAt: string;
  dateRange: { from: string; to: string };
  projectId: string | null;
}

// ── Report Generators ───────────────────────────────────────────────

function generateProjectSummaryReport(projectId: string | null) {
  return {
    overview: {
      totalProjects: 24,
      activeProjects: 14,
      completedProjects: 8,
      delayedProjects: 2,
      averageCompletionRate: 67.3,
    },
    projectBreakdown: [
      {
        id: projectId || "PRJ-001",
        name: "Royal Gardens Estate Phase 2",
        location: "Lekki, Lagos",
        progress: 72,
        budget: 4_500_000_000,
        spent: 3_240_000_000,
        status: "on-track",
        startDate: "2025-06-01",
        estimatedCompletion: "2026-11-30",
        contractor: "Adebayo Properties Ltd",
        milestonesSummary: { total: 5, completed: 2, inProgress: 1, pending: 2 },
      },
      {
        id: "PRJ-002",
        name: "Emerald City Apartments",
        location: "Ikeja GRA, Lagos",
        progress: 100,
        budget: 2_800_000_000,
        spent: 2_750_000_000,
        status: "completed",
        startDate: "2024-09-15",
        estimatedCompletion: "2026-01-20",
        contractor: "Nnamdi Okoro Developments",
        milestonesSummary: { total: 5, completed: 5, inProgress: 0, pending: 0 },
      },
      {
        id: "PRJ-003",
        name: "Jabi Luxury Villas",
        location: "Jabi, Abuja",
        progress: 28,
        budget: 6_200_000_000,
        spent: 1_736_000_000,
        status: "on-track",
        startDate: "2025-10-01",
        estimatedCompletion: "2027-06-30",
        contractor: "Aliyu Construction Group",
        milestonesSummary: { total: 5, completed: 1, inProgress: 1, pending: 3 },
      },
    ],
    riskFlags: [
      { project: "Banana Island Residences", risk: "Material price inflation exceeding 15% threshold", severity: "high" },
      { project: "Wuse Zone 5 Office Complex", risk: "Permit renewal pending for 45+ days", severity: "medium" },
    ],
  };
}

function generateFinancialReport(dateRange: { from: string; to: string }) {
  return {
    period: dateRange,
    summary: {
      totalRevenue: 18_500_000_000,
      totalExpenditure: 14_200_000_000,
      netPosition: 4_300_000_000,
      escrowHeld: 76_600_000_000,
      pendingDisbursements: 12_400_000_000,
    },
    revenueBreakdown: [
      { category: "Homeowner payments", amount: 12_000_000_000, percentage: 64.9 },
      { category: "Investor contributions", amount: 4_500_000_000, percentage: 24.3 },
      { category: "Platform fees", amount: 1_200_000_000, percentage: 6.5 },
      { category: "Inspection fees", amount: 500_000_000, percentage: 2.7 },
      { category: "Document processing", amount: 300_000_000, percentage: 1.6 },
    ],
    expenditureBreakdown: [
      { category: "Contractor disbursements", amount: 8_500_000_000, percentage: 59.9 },
      { category: "Material procurement", amount: 3_200_000_000, percentage: 22.5 },
      { category: "Labour costs", amount: 1_500_000_000, percentage: 10.6 },
      { category: "Permits & regulatory", amount: 600_000_000, percentage: 4.2 },
      { category: "Equipment hire", amount: 400_000_000, percentage: 2.8 },
    ],
    topTransactions: [
      { date: "2026-03-15", description: "Milestone payment - Royal Gardens Phase 2 Roofing", amount: 9_000_000_000, type: "disbursement", reference: "TRF_BLDNG_003" },
      { date: "2026-03-10", description: "Escrow deposit - Banana Island Residences", amount: 15_000_000_000, type: "deposit", reference: "CHG_BLDNG_012" },
      { date: "2026-03-05", description: "Milestone payment - Jabi Villas Foundation", amount: 12_400_000_000, type: "disbursement", reference: "TRF_BLDNG_004" },
      { date: "2026-02-28", description: "Cement bulk purchase - Dangote 3X (5000 bags)", amount: 30_000_000_00, type: "procurement", reference: "PO_BLDNG_089" },
      { date: "2026-02-20", description: "Inspection fee collection - Q1 batch", amount: 500_000_000, type: "revenue", reference: "INV_BLDNG_045" },
    ],
    paymentGateway: {
      provider: "Paystack",
      totalProcessed: 33_700_000_000,
      fees: 505_500_000,
      successRate: 97.8,
    },
  };
}

function generateInvestorReport() {
  return {
    portfolioSummary: {
      totalInvested: 85_000_000_000,
      currentValue: 92_350_000_000,
      roi: 8.6,
      activeInvestments: 6,
      completedInvestments: 3,
    },
    investments: [
      {
        projectName: "Royal Gardens Estate Phase 2",
        location: "Lekki, Lagos",
        investedAmount: 15_000_000_000,
        currentValue: 16_200_000_000,
        roi: 8.0,
        maturityDate: "2027-03-30",
        status: "active",
        developer: "Adebayo Properties Ltd",
        unitType: "4-Bedroom Detached",
        unitsOwned: 3,
      },
      {
        projectName: "Banana Island Residences",
        location: "Banana Island, Lagos",
        investedAmount: 35_000_000_000,
        currentValue: 39_550_000_000,
        roi: 13.0,
        maturityDate: "2027-12-31",
        status: "active",
        developer: "Island Premium Homes",
        unitType: "5-Bedroom Mansion",
        unitsOwned: 2,
      },
      {
        projectName: "Emerald City Apartments",
        location: "Ikeja GRA, Lagos",
        investedAmount: 8_000_000_000,
        currentValue: 9_600_000_000,
        roi: 20.0,
        maturityDate: "2026-06-30",
        status: "completed",
        developer: "Nnamdi Okoro Developments",
        unitType: "3-Bedroom Flat",
        unitsOwned: 5,
      },
    ],
    marketInsights: {
      lagosPropertyAppreciation: 12.4,
      abujaPropertyAppreciation: 8.7,
      portHarcourtPropertyAppreciation: 6.2,
      averageRentalYield: 5.8,
      constructionCostInflation: 18.3,
    },
    riskAssessment: {
      overallRisk: "moderate",
      factors: [
        { factor: "Currency volatility (NGN)", impact: "high", mitigation: "USD-indexed pricing on premium units" },
        { factor: "Construction material inflation", impact: "high", mitigation: "Bulk procurement contracts with Dangote, BUA" },
        { factor: "Regulatory changes", impact: "medium", mitigation: "Pre-approved permits, legal compliance team" },
        { factor: "Demand softening", impact: "low", mitigation: "Lagos housing deficit remains at 3M+ units" },
      ],
    },
  };
}

function generateComplianceReport() {
  return {
    summary: {
      totalPermitsActive: 18,
      permitsExpiringSoon: 3,
      expiredPermits: 1,
      inspectionsPassed: 42,
      inspectionsFailed: 4,
      outstandingDefects: 7,
    },
    permits: [
      {
        projectName: "Royal Gardens Estate Phase 2",
        permitType: "Building Plan Approval",
        authority: "Lagos State Physical Planning Permit Authority (LASPPPA)",
        permitNumber: "LASPPPA/2025/BPA/1847",
        issueDate: "2025-05-10",
        expiryDate: "2027-05-10",
        status: "active",
      },
      {
        projectName: "Jabi Luxury Villas",
        permitType: "Development Permit",
        authority: "FCT Development Control Department",
        permitNumber: "FCT/DCD/DP/2025/3291",
        issueDate: "2025-09-01",
        expiryDate: "2027-09-01",
        status: "active",
      },
      {
        projectName: "Wuse Zone 5 Office Complex",
        permitType: "Environmental Impact Assessment",
        authority: "National Environmental Standards and Regulations Enforcement Agency (NESREA)",
        permitNumber: "NESREA/EIA/2024/0892",
        issueDate: "2024-11-15",
        expiryDate: "2026-04-15",
        status: "expiring-soon",
      },
    ],
    recentInspections: [
      {
        projectName: "Royal Gardens Estate Phase 2",
        inspectionType: "Structural integrity - Column reinforcement",
        inspector: "Engr. Fatima Abdullahi",
        date: "2026-03-20",
        result: "passed",
        notes: "All 32 columns meet NIS 87:2004 standards. Concrete cube test results satisfactory.",
      },
      {
        projectName: "Banana Island Residences",
        inspectionType: "Electrical installation - Phase 1",
        inspector: "Engr. Chidi Eze",
        date: "2026-03-18",
        result: "failed",
        notes: "Earth bonding incomplete on 3rd floor. Non-compliant cable sizes on power circuit 7B. Remediation required within 14 days.",
      },
      {
        projectName: "Jabi Luxury Villas",
        inspectionType: "Foundation depth verification",
        inspector: "Engr. Musa Ibrahim",
        date: "2026-03-12",
        result: "passed",
        notes: "Foundation depth at 1.8m as per geotechnical report. Bearing capacity confirmed at 150kN/m2.",
      },
    ],
    regulatoryUpdates: [
      {
        date: "2026-03-01",
        authority: "Standards Organisation of Nigeria (SON)",
        title: "Updated NIS 444-1:2003 Cement Standards",
        summary: "New testing requirements for all cement used in structural works effective June 2026.",
      },
      {
        date: "2026-02-15",
        authority: "LASPPPA",
        title: "Digital Permit Processing Mandate",
        summary: "All new permit applications must be submitted through the e-Planning portal from April 2026.",
      },
    ],
  };
}

function generateMarketAnalysisReport() {
  return {
    constructionCostIndex: {
      national: 342.5,
      lagos: 385.2,
      abuja: 362.8,
      portHarcourt: 318.4,
      kano: 295.1,
      baseYear: 2020,
      yoyChange: 18.3,
    },
    materialPriceTrends: [
      { material: "Cement (Dangote 3X, 50kg)", currentPrice: 7500, previousQuarterPrice: 6800, change: 10.3, unit: "per bag" },
      { material: "12mm Iron Rod (bundle)", currentPrice: 420000, previousQuarterPrice: 385000, change: 9.1, unit: "per tonne" },
      { material: "Granite (20mm)", currentPrice: 65000, previousQuarterPrice: 58000, change: 12.1, unit: "per tonne" },
      { material: "Sharp Sand", currentPrice: 45000, previousQuarterPrice: 40000, change: 12.5, unit: "per trip (10 tonnes)" },
      { material: "Roofing Sheet (0.55mm Aluminium)", currentPrice: 7200, previousQuarterPrice: 6500, change: 10.8, unit: "per sheet" },
      { material: "Blocks (9-inch)", currentPrice: 500, previousQuarterPrice: 450, change: 11.1, unit: "per block" },
    ],
    labourRates: [
      { role: "Mason/Bricklayer", dailyRate: 8000, monthlyRate: 200000, city: "Lagos" },
      { role: "Mason/Bricklayer", dailyRate: 6500, monthlyRate: 162500, city: "Abuja" },
      { role: "Carpenter", dailyRate: 7500, monthlyRate: 187500, city: "Lagos" },
      { role: "Electrician", dailyRate: 10000, monthlyRate: 250000, city: "Lagos" },
      { role: "Plumber", dailyRate: 9000, monthlyRate: 225000, city: "Lagos" },
      { role: "Tiler", dailyRate: 8500, monthlyRate: 212500, city: "Lagos" },
      { role: "Welder/Fabricator", dailyRate: 9000, monthlyRate: 225000, city: "Lagos" },
      { role: "Labourer", dailyRate: 4000, monthlyRate: 100000, city: "Lagos" },
    ],
    demandIndicators: {
      housingDeficitNational: 28_000_000,
      housingDeficitLagos: 3_000_000,
      mortgageRateRange: { min: 18, max: 28 },
      nhfRate: 6,
      averagePricePerSqmLagos: 450000,
      averagePricePerSqmAbuja: 380000,
      averagePricePerSqmPH: 280000,
    },
    outlook: {
      period: "Q2-Q3 2026",
      summary:
        "Construction costs expected to remain elevated due to naira depreciation and imported material costs. Cement prices may stabilize following BUA and Dangote capacity expansions. Steel prices remain volatile due to global supply chain disruptions. Local sand and granite supply stable but transportation costs rising with diesel prices.",
      recommendations: [
        "Lock in cement prices through bulk procurement agreements",
        "Consider alternative building technologies (prefab, ICF) for cost control",
        "Prioritize projects with USD-indexed pricing for investor confidence",
        "Leverage NHF and FMBN mortgage products for off-plan sales",
      ],
    },
  };
}

// ── GET Handler ─────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const type = url.searchParams.get("type") as ReportType | null;
    const dateFrom = url.searchParams.get("dateFrom") || "2026-01-01";
    const dateTo = url.searchParams.get("dateTo") || "2026-03-31";
    const projectId = url.searchParams.get("projectId");

    const validTypes: ReportType[] = [
      "project-summary",
      "financial",
      "investor",
      "compliance",
      "market-analysis",
    ];

    if (!type || !validTypes.includes(type)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: `Invalid or missing report type. Valid types: ${validTypes.join(", ")}`,
            code: "INVALID_REPORT_TYPE",
          },
        },
        { status: 400 }
      );
    }

    const dateRange = { from: dateFrom, to: dateTo };
    const meta: ReportMeta = {
      type,
      generatedAt: new Date().toISOString(),
      dateRange,
      projectId,
    };

    let reportData: unknown;

    switch (type) {
      case "project-summary":
        reportData = generateProjectSummaryReport(projectId);
        break;
      case "financial":
        reportData = generateFinancialReport(dateRange);
        break;
      case "investor":
        reportData = generateInvestorReport();
        break;
      case "compliance":
        reportData = generateComplianceReport();
        break;
      case "market-analysis":
        reportData = generateMarketAnalysisReport();
        break;
    }

    return NextResponse.json({
      success: true,
      meta,
      data: reportData,
    });
  } catch (error) {
    console.error("[Reports API] Error generating report:", error);
    return NextResponse.json(
      {
        success: false,
        error: { message: "Failed to generate report", code: "REPORT_GENERATION_ERROR" },
      },
      { status: 500 }
    );
  }
}
