import { NextResponse } from "next/server";

const mockEscrowProjects = [
  {
    id: "esc-001",
    projectName: "Royal Gardens Estate Phase 2",
    developer: "Adebayo Properties Ltd",
    totalAmount: 45000000000,
    releasedAmount: 18000000000,
    heldAmount: 27000000000,
    milestones: [
      { name: "Foundation & Substructure", amount: 9000000000, status: "released", completedDate: "2025-08-15" },
      { name: "Superstructure", amount: 9000000000, status: "released", completedDate: "2025-11-20" },
      { name: "Roofing & MEP Rough-in", amount: 9000000000, status: "in-progress", dueDate: "2026-04-30" },
      { name: "Finishing & Fit-out", amount: 9000000000, status: "pending", dueDate: "2026-08-15" },
      { name: "External Works & Handover", amount: 9000000000, status: "pending", dueDate: "2026-11-30" },
    ],
    status: "active",
    createdAt: "2025-06-01",
    bankPartner: "Guaranty Trust Bank",
  },
  {
    id: "esc-002",
    projectName: "Emerald City Apartments",
    developer: "Nnamdi Okoro Developments",
    totalAmount: 28000000000,
    releasedAmount: 28000000000,
    heldAmount: 0,
    milestones: [
      { name: "Foundation", amount: 5600000000, status: "released", completedDate: "2024-12-10" },
      { name: "Superstructure", amount: 5600000000, status: "released", completedDate: "2025-04-22" },
      { name: "Roofing", amount: 5600000000, status: "released", completedDate: "2025-07-15" },
      { name: "Finishing", amount: 5600000000, status: "released", completedDate: "2025-10-30" },
      { name: "Handover", amount: 5600000000, status: "released", completedDate: "2026-01-20" },
    ],
    status: "completed",
    createdAt: "2024-09-15",
    bankPartner: "First Bank of Nigeria",
  },
  {
    id: "esc-003",
    projectName: "Jabi Luxury Villas",
    developer: "Aliyu Construction Group",
    totalAmount: 62000000000,
    releasedAmount: 12400000000,
    heldAmount: 49600000000,
    milestones: [
      { name: "Site Clearing & Foundation", amount: 12400000000, status: "released", completedDate: "2025-12-05" },
      { name: "Block Work & Columns", amount: 12400000000, status: "in-progress", dueDate: "2026-05-15" },
      { name: "Roofing & Plumbing", amount: 12400000000, status: "pending", dueDate: "2026-09-01" },
      { name: "Electrical & Finishing", amount: 12400000000, status: "pending", dueDate: "2027-01-15" },
      { name: "Landscaping & Handover", amount: 12400000000, status: "pending", dueDate: "2027-05-30" },
    ],
    status: "active",
    createdAt: "2025-08-20",
    bankPartner: "Zenith Bank",
  },
  {
    id: "esc-004",
    projectName: "Wuse Heights Residences",
    developer: "ChiChi Homes International",
    totalAmount: 35000000000,
    releasedAmount: 21000000000,
    heldAmount: 14000000000,
    milestones: [
      { name: "Foundation", amount: 7000000000, status: "released", completedDate: "2025-05-10" },
      { name: "Superstructure", amount: 7000000000, status: "released", completedDate: "2025-09-18" },
      { name: "Roofing", amount: 7000000000, status: "released", completedDate: "2025-12-22" },
      { name: "Interior Finishing", amount: 7000000000, status: "in-progress", dueDate: "2026-04-15" },
      { name: "External & Handover", amount: 7000000000, status: "pending", dueDate: "2026-07-30" },
    ],
    status: "active",
    createdAt: "2025-02-14",
    bankPartner: "Access Bank",
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockEscrowProjects,
    total: mockEscrowProjects.length,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newEscrow = {
    id: `esc-${String(mockEscrowProjects.length + 1).padStart(3, "0")}`,
    projectName: body.projectName,
    developer: body.developer,
    totalAmount: body.totalAmount,
    releasedAmount: 0,
    heldAmount: body.totalAmount,
    milestones: body.milestones || [],
    status: "active",
    createdAt: new Date().toISOString().split("T")[0],
    bankPartner: body.bankPartner,
  };

  return NextResponse.json(
    {
      success: true,
      message: "Escrow project created successfully",
      data: newEscrow,
    },
    { status: 201 }
  );
}
