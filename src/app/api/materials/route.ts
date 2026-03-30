import { NextResponse } from "next/server";

const mockMaterials = [
  {
    id: "mat-001",
    name: "Dangote Cement (50kg)",
    category: "Cement",
    unit: "bag",
    prices: [
      { region: "Lagos", price: 550000, vendor: "BUA Cement Depot, Apapa", reportedAt: "2026-03-28" },
      { region: "Abuja", price: 580000, vendor: "Dei-Dei Building Market", reportedAt: "2026-03-27" },
      { region: "Port Harcourt", price: 570000, vendor: "Mile 3 Market", reportedAt: "2026-03-26" },
    ],
    averagePrice: 566700,
    priceChange: 2.3,
  },
  {
    id: "mat-002",
    name: "12mm Iron Rod (Bundle)",
    category: "Reinforcement",
    unit: "bundle",
    prices: [
      { region: "Lagos", price: 38500000, vendor: "Trade Fair Complex, Lagos", reportedAt: "2026-03-28" },
      { region: "Abuja", price: 40000000, vendor: "Dei-Dei Iron Market", reportedAt: "2026-03-27" },
      { region: "Kano", price: 39200000, vendor: "Sabon Gari Market", reportedAt: "2026-03-25" },
    ],
    averagePrice: 39233300,
    priceChange: -1.1,
  },
  {
    id: "mat-003",
    name: "Sharp Sand (Tipper Load)",
    category: "Aggregates",
    unit: "trip",
    prices: [
      { region: "Lagos", price: 7500000, vendor: "Ogun State Quarry", reportedAt: "2026-03-28" },
      { region: "Abuja", price: 5000000, vendor: "Mpape Sand Dealers", reportedAt: "2026-03-27" },
    ],
    averagePrice: 6250000,
    priceChange: 5.0,
  },
  {
    id: "mat-004",
    name: "Granite (20-Tonne Truck)",
    category: "Aggregates",
    unit: "truck",
    prices: [
      { region: "Lagos", price: 25000000, vendor: "Abeokuta Quarry", reportedAt: "2026-03-27" },
      { region: "Abuja", price: 18000000, vendor: "Abuja Quarry Ltd", reportedAt: "2026-03-26" },
    ],
    averagePrice: 21500000,
    priceChange: 3.5,
  },
  {
    id: "mat-005",
    name: "Aluminum Roofing Sheet (0.55mm, per bundle)",
    category: "Roofing",
    unit: "bundle",
    prices: [
      { region: "Lagos", price: 4200000, vendor: "Alaba International", reportedAt: "2026-03-28" },
      { region: "Abuja", price: 4500000, vendor: "Dei-Dei Roofing Market", reportedAt: "2026-03-26" },
    ],
    averagePrice: 4350000,
    priceChange: 0.8,
  },
  {
    id: "mat-006",
    name: "6-inch Blocks (per unit)",
    category: "Blocks",
    unit: "piece",
    prices: [
      { region: "Lagos", price: 35000, vendor: "Ikorodu Block Industry", reportedAt: "2026-03-28" },
      { region: "Abuja", price: 32000, vendor: "Lugbe Block Factory", reportedAt: "2026-03-27" },
      { region: "Enugu", price: 30000, vendor: "Emene Industrial", reportedAt: "2026-03-25" },
    ],
    averagePrice: 32300,
    priceChange: 1.5,
  },
  {
    id: "mat-007",
    name: "POP Cement (40kg)",
    category: "Finishing",
    unit: "bag",
    prices: [
      { region: "Lagos", price: 350000, vendor: "Mushin Building Market", reportedAt: "2026-03-28" },
      { region: "Abuja", price: 380000, vendor: "Mararaba Market", reportedAt: "2026-03-27" },
    ],
    averagePrice: 365000,
    priceChange: -0.5,
  },
  {
    id: "mat-008",
    name: "Ceramic Floor Tiles (60x60cm, per carton)",
    category: "Tiles",
    unit: "carton",
    prices: [
      { region: "Lagos", price: 850000, vendor: "Oba Akran Tile Market", reportedAt: "2026-03-28" },
      { region: "Abuja", price: 920000, vendor: "Life Camp Tile Centre", reportedAt: "2026-03-26" },
    ],
    averagePrice: 885000,
    priceChange: 2.0,
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockMaterials,
    total: mockMaterials.length,
    lastUpdated: "2026-03-28T14:30:00Z",
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newPriceReport = {
    id: `price-${Date.now()}`,
    materialId: body.materialId,
    materialName: body.materialName,
    price: body.price,
    region: body.region,
    vendor: body.vendor,
    reportedBy: body.reportedBy,
    reportedAt: new Date().toISOString(),
    verified: false,
  };

  return NextResponse.json(
    {
      success: true,
      message: "Price report submitted successfully. It will be verified shortly.",
      data: newPriceReport,
    },
    { status: 201 }
  );
}
