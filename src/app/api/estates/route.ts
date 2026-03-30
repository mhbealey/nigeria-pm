import { NextResponse } from "next/server";

const mockEstates = [
  {
    id: "est-001",
    name: "Royal Gardens Estate",
    location: "Lekki Phase 2, Lagos",
    developer: "Adebayo Properties Ltd",
    totalUnits: 48,
    completedUnits: 32,
    occupiedUnits: 28,
    totalLandArea: "12 hectares",
    priceRange: { min: 4500000000, max: 8500000000 },
    amenities: ["Swimming Pool", "Gym", "24/7 Power", "Borehole", "CCTV Security", "Children Playground"],
    status: "phase-2-ongoing",
    completionDate: "2026-11-30",
    createdAt: "2024-01-15",
  },
  {
    id: "est-002",
    name: "Emerald City Apartments",
    location: "Jahi District, Abuja",
    developer: "Nnamdi Okoro Developments",
    totalUnits: 64,
    completedUnits: 64,
    occupiedUnits: 58,
    totalLandArea: "8 hectares",
    priceRange: { min: 3200000000, max: 5500000000 },
    amenities: ["Rooftop Lounge", "Underground Parking", "Smart Home Features", "Solar Power", "Fibre Optic Internet"],
    status: "completed",
    completionDate: "2026-01-20",
    createdAt: "2023-06-10",
  },
  {
    id: "est-003",
    name: "Jabi Luxury Villas",
    location: "Jabi, Abuja",
    developer: "Aliyu Construction Group",
    totalUnits: 24,
    completedUnits: 6,
    occupiedUnits: 0,
    totalLandArea: "15 hectares",
    priceRange: { min: 12000000000, max: 18000000000 },
    amenities: ["Private Pool per Villa", "Smart Home", "EV Charging", "Tennis Court", "Concierge Service", "Helipad"],
    status: "under-construction",
    completionDate: "2027-05-30",
    createdAt: "2025-03-01",
  },
  {
    id: "est-004",
    name: "Wuse Heights Residences",
    location: "Wuse Zone 5, Abuja",
    developer: "ChiChi Homes International",
    totalUnits: 36,
    completedUnits: 24,
    occupiedUnits: 20,
    totalLandArea: "5 hectares",
    priceRange: { min: 5500000000, max: 9000000000 },
    amenities: ["Elevator", "Backup Generator", "Water Treatment", "Green Spaces", "Co-working Hub"],
    status: "phase-2-ongoing",
    completionDate: "2026-07-30",
    createdAt: "2024-04-20",
  },
  {
    id: "est-005",
    name: "Victoria Crest Estate",
    location: "Victoria Island, Lagos",
    developer: "Adebayo Properties Ltd",
    totalUnits: 20,
    completedUnits: 20,
    occupiedUnits: 18,
    totalLandArea: "3 hectares",
    priceRange: { min: 15000000000, max: 25000000000 },
    amenities: ["Waterfront View", "Private Jetty", "Wine Cellar", "Home Cinema", "Smart Security"],
    status: "completed",
    completionDate: "2025-09-15",
    createdAt: "2023-01-10",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockEstates,
    total: mockEstates.length,
    summary: {
      totalUnits: mockEstates.reduce((acc, e) => acc + e.totalUnits, 0),
      completedUnits: mockEstates.reduce((acc, e) => acc + e.completedUnits, 0),
      occupiedUnits: mockEstates.reduce((acc, e) => acc + e.occupiedUnits, 0),
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newEstate = {
    id: `est-${String(mockEstates.length + 1).padStart(3, "0")}`,
    name: body.name,
    location: body.location,
    developer: body.developer,
    totalUnits: body.totalUnits,
    completedUnits: 0,
    occupiedUnits: 0,
    totalLandArea: body.totalLandArea,
    priceRange: body.priceRange,
    amenities: body.amenities || [],
    status: "planning",
    completionDate: body.completionDate,
    createdAt: new Date().toISOString().split("T")[0],
  };

  return NextResponse.json(
    {
      success: true,
      message: "Estate created successfully",
      data: newEstate,
    },
    { status: 201 }
  );
}
