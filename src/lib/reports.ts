export interface ProjectReport {
  id: string;
  projectId: string;
  projectName: string;
  generatedAt: string;
  summary: {
    status: string;
    percentComplete: number;
    daysRemaining: number;
    totalBudget: number;
    amountSpent: number;
    amountRemaining: number;
    budgetVariance: number;
  };
  milestones: {
    name: string;
    status: "completed" | "in-progress" | "upcoming";
    dueDate: string;
    completedDate?: string;
    cost: number;
  }[];
  risks: {
    description: string;
    severity: "high" | "medium" | "low";
    mitigation: string;
  }[];
  materials: {
    name: string;
    ordered: number;
    delivered: number;
    unit: string;
    totalCost: number;
  }[];
  workforce: {
    role: string;
    count: number;
    hoursLogged: number;
    costToDate: number;
  }[];
  qualityMetrics: {
    inspectionsPassed: number;
    inspectionsFailed: number;
    defectsOpen: number;
    defectsResolved: number;
  };
}

export interface FinancialReport {
  dateRange: { from: string; to: string };
  generatedAt: string;
  profitAndLoss: {
    totalRevenue: number;
    totalCosts: number;
    grossProfit: number;
    operatingExpenses: number;
    netProfit: number;
    margin: number;
  };
  revenueByProject: {
    projectName: string;
    revenue: number;
    costs: number;
    profit: number;
  }[];
  expenseBreakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  cashFlow: {
    month: string;
    inflow: number;
    outflow: number;
    balance: number;
  }[];
  outstandingPayments: {
    client: string;
    project: string;
    amount: number;
    dueDate: string;
    daysOverdue: number;
  }[];
}

export interface InvestorReport {
  estateId: string;
  estateName: string;
  generatedAt: string;
  overview: {
    totalUnits: number;
    unitsSold: number;
    unitsUnderConstruction: number;
    unitsCompleted: number;
    occupancyRate: number;
    totalInvestment: number;
    currentValuation: number;
    roi: number;
  };
  constructionProgress: {
    phase: string;
    percentComplete: number;
    startDate: string;
    expectedCompletion: string;
    budgetAllocated: number;
    budgetSpent: number;
  }[];
  salesPerformance: {
    month: string;
    unitsSold: number;
    revenue: number;
  }[];
  financials: {
    totalRevenue: number;
    totalExpenditure: number;
    netPosition: number;
    projectedReturn: number;
    dividendsPaid: number;
  };
  risks: {
    item: string;
    impact: "high" | "medium" | "low";
    status: string;
  }[];
}

export function generateProjectReport(projectId: string): ProjectReport {
  return {
    id: `RPT-${Date.now()}`,
    projectId,
    projectName: "Lekki Phase 2 Residential Estate",
    generatedAt: new Date().toISOString(),
    summary: {
      status: "In Progress",
      percentComplete: 68,
      daysRemaining: 94,
      totalBudget: 125000000,
      amountSpent: 82500000,
      amountRemaining: 42500000,
      budgetVariance: -3200000,
    },
    milestones: [
      {
        name: "Foundation & Substructure",
        status: "completed",
        dueDate: "2025-08-15",
        completedDate: "2025-08-10",
        cost: 18500000,
      },
      {
        name: "Block Work & Concrete Frame",
        status: "completed",
        dueDate: "2025-10-30",
        completedDate: "2025-11-05",
        cost: 24000000,
      },
      {
        name: "Roofing & External Walls",
        status: "completed",
        dueDate: "2025-12-20",
        completedDate: "2025-12-18",
        cost: 16800000,
      },
      {
        name: "MEP First Fix",
        status: "in-progress",
        dueDate: "2026-02-28",
        cost: 12400000,
      },
      {
        name: "Plastering & Screeding",
        status: "in-progress",
        dueDate: "2026-04-15",
        cost: 8200000,
      },
      {
        name: "Finishing & Handover",
        status: "upcoming",
        dueDate: "2026-07-01",
        cost: 22600000,
      },
    ],
    risks: [
      {
        description: "Cement price volatility due to FX fluctuation",
        severity: "high",
        mitigation: "Bulk procurement agreement with Dangote Cement locked at current rates",
      },
      {
        description: "Potential rainy season delays in Q2 2026",
        severity: "medium",
        mitigation: "Accelerating outdoor works to complete before April rains",
      },
      {
        description: "Skilled tiler availability for finishing phase",
        severity: "low",
        mitigation: "Pre-engaged 3 tiling teams through artisan network",
      },
    ],
    materials: [
      { name: "Cement (Dangote 42.5R)", ordered: 2400, delivered: 2100, unit: "bags", totalCost: 14400000 },
      { name: "Reinforcement Steel (12mm)", ordered: 850, delivered: 850, unit: "lengths", totalCost: 8500000 },
      { name: "Sand (sharp)", ordered: 180, delivered: 160, unit: "trips", totalCost: 5400000 },
      { name: "Granite (3/4 inch)", ordered: 120, delivered: 120, unit: "trips", totalCost: 6000000 },
      { name: "Blocks (9 inch)", ordered: 15000, delivered: 14800, unit: "pieces", totalCost: 6750000 },
      { name: "Roofing Sheets (0.55mm)", ordered: 320, delivered: 320, unit: "sheets", totalCost: 4480000 },
    ],
    workforce: [
      { role: "Site Engineers", count: 3, hoursLogged: 4320, costToDate: 5400000 },
      { role: "Masons", count: 12, hoursLogged: 14400, costToDate: 8640000 },
      { role: "Iron Benders", count: 6, hoursLogged: 5400, costToDate: 3240000 },
      { role: "Carpenters", count: 8, hoursLogged: 7200, costToDate: 4320000 },
      { role: "Labourers", count: 20, hoursLogged: 24000, costToDate: 7200000 },
      { role: "Plumbers", count: 4, hoursLogged: 2400, costToDate: 2160000 },
    ],
    qualityMetrics: {
      inspectionsPassed: 24,
      inspectionsFailed: 3,
      defectsOpen: 5,
      defectsResolved: 18,
    },
  };
}

export function generateFinancialReport(dateRange: {
  from: string;
  to: string;
}): FinancialReport {
  return {
    dateRange,
    generatedAt: new Date().toISOString(),
    profitAndLoss: {
      totalRevenue: 156800000,
      totalCosts: 118200000,
      grossProfit: 38600000,
      operatingExpenses: 12400000,
      netProfit: 26200000,
      margin: 16.7,
    },
    revenueByProject: [
      {
        projectName: "Lekki Phase 2 Estate",
        revenue: 68000000,
        costs: 52400000,
        profit: 15600000,
      },
      {
        projectName: "Abuja Centenary City Villa",
        revenue: 45000000,
        costs: 33200000,
        profit: 11800000,
      },
      {
        projectName: "Ibadan Jericho Renovation",
        revenue: 22800000,
        costs: 18600000,
        profit: 4200000,
      },
      {
        projectName: "Port Harcourt GRA Duplex",
        revenue: 21000000,
        costs: 14000000,
        profit: 7000000,
      },
    ],
    expenseBreakdown: [
      { category: "Materials & Supplies", amount: 68500000, percentage: 57.9 },
      { category: "Labour & Workforce", amount: 28400000, percentage: 24.0 },
      { category: "Equipment Rental", amount: 8200000, percentage: 6.9 },
      { category: "Transportation", amount: 5600000, percentage: 4.7 },
      { category: "Professional Fees", amount: 4200000, percentage: 3.6 },
      { category: "Permits & Compliance", amount: 3300000, percentage: 2.8 },
    ],
    cashFlow: [
      { month: "Oct 2025", inflow: 24000000, outflow: 18500000, balance: 42300000 },
      { month: "Nov 2025", inflow: 28500000, outflow: 22100000, balance: 48700000 },
      { month: "Dec 2025", inflow: 18200000, outflow: 19800000, balance: 47100000 },
      { month: "Jan 2026", inflow: 32000000, outflow: 24600000, balance: 54500000 },
      { month: "Feb 2026", inflow: 26800000, outflow: 16900000, balance: 64400000 },
      { month: "Mar 2026", inflow: 27300000, outflow: 16300000, balance: 75400000 },
    ],
    outstandingPayments: [
      {
        client: "Pinnacle Homes Ltd",
        project: "Lekki Phase 2 Estate",
        amount: 18500000,
        dueDate: "2026-03-15",
        daysOverdue: 15,
      },
      {
        client: "Alhaji Musa Ibrahim",
        project: "Abuja Centenary Villa",
        amount: 8200000,
        dueDate: "2026-03-25",
        daysOverdue: 5,
      },
      {
        client: "GreenField Developers",
        project: "PH GRA Duplex",
        amount: 5400000,
        dueDate: "2026-04-10",
        daysOverdue: 0,
      },
    ],
  };
}

export function generateInvestorReport(estateId: string): InvestorReport {
  return {
    estateId,
    estateName: "Emerald Gardens Estate, Lekki",
    generatedAt: new Date().toISOString(),
    overview: {
      totalUnits: 48,
      unitsSold: 34,
      unitsUnderConstruction: 18,
      unitsCompleted: 22,
      occupancyRate: 64.7,
      totalInvestment: 2400000000,
      currentValuation: 3100000000,
      roi: 29.2,
    },
    constructionProgress: [
      {
        phase: "Phase 1 - Block A (12 Units)",
        percentComplete: 100,
        startDate: "2024-06-01",
        expectedCompletion: "2025-09-30",
        budgetAllocated: 600000000,
        budgetSpent: 585000000,
      },
      {
        phase: "Phase 1 - Block B (10 Units)",
        percentComplete: 100,
        startDate: "2024-08-15",
        expectedCompletion: "2025-12-31",
        budgetAllocated: 500000000,
        budgetSpent: 512000000,
      },
      {
        phase: "Phase 2 - Block C (14 Units)",
        percentComplete: 72,
        startDate: "2025-03-01",
        expectedCompletion: "2026-06-30",
        budgetAllocated: 700000000,
        budgetSpent: 490000000,
      },
      {
        phase: "Phase 2 - Block D (12 Units)",
        percentComplete: 35,
        startDate: "2025-09-01",
        expectedCompletion: "2026-12-31",
        budgetAllocated: 600000000,
        budgetSpent: 198000000,
      },
    ],
    salesPerformance: [
      { month: "Oct 2025", unitsSold: 3, revenue: 195000000 },
      { month: "Nov 2025", unitsSold: 4, revenue: 260000000 },
      { month: "Dec 2025", unitsSold: 2, revenue: 130000000 },
      { month: "Jan 2026", unitsSold: 5, revenue: 325000000 },
      { month: "Feb 2026", unitsSold: 3, revenue: 210000000 },
      { month: "Mar 2026", unitsSold: 4, revenue: 280000000 },
    ],
    financials: {
      totalRevenue: 2210000000,
      totalExpenditure: 1785000000,
      netPosition: 425000000,
      projectedReturn: 890000000,
      dividendsPaid: 120000000,
    },
    risks: [
      {
        item: "Naira depreciation increasing imported material costs",
        impact: "high",
        status: "Mitigated through local sourcing strategy",
      },
      {
        item: "Lagos State building permit renewal delays",
        impact: "medium",
        status: "Engaged LASBCA liaison for expedited processing",
      },
      {
        item: "Seasonal flooding risk for Phase 2 site",
        impact: "medium",
        status: "Drainage infrastructure completed ahead of schedule",
      },
      {
        item: "Competition from nearby Ibeju-Lekki developments",
        impact: "low",
        status: "Differentiated by premium finishing and escrow payment model",
      },
    ],
  };
}
