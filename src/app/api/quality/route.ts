import { NextResponse } from "next/server";

const mockInspections = [
  {
    id: "insp-001",
    projectName: "Royal Gardens Estate Phase 2",
    type: "Foundation Inspection",
    inspector: "Engr. Adamu Bello",
    inspectorLicense: "COREN/2018/045672",
    scheduledDate: "2026-04-05",
    status: "scheduled",
    location: "Plot 15-30, Royal Gardens, Lekki Phase 2, Lagos",
    checklistItems: 24,
    completedItems: 0,
    priority: "high",
  },
  {
    id: "insp-002",
    projectName: "Emerald City Apartments",
    type: "Final Handover Inspection",
    inspector: "Arc. Ngozi Okafor",
    inspectorLicense: "ARCON/2015/03298",
    scheduledDate: "2026-03-28",
    status: "completed",
    location: "Block C, Emerald City, Jahi District, Abuja",
    checklistItems: 48,
    completedItems: 48,
    score: 92,
    priority: "medium",
    findings: [
      { item: "Minor paint touch-up needed in Unit 12 living room", severity: "low" },
      { item: "Window seal needs reapplication in Unit 8 master bedroom", severity: "medium" },
    ],
  },
  {
    id: "insp-003",
    projectName: "Jabi Luxury Villas",
    type: "Structural Integrity Check",
    inspector: "Engr. Chukwuma Eze",
    inspectorLicense: "COREN/2012/031456",
    scheduledDate: "2026-03-30",
    status: "in-progress",
    location: "Villa 1-10, Jabi Luxury Estate, Jabi, Abuja",
    checklistItems: 36,
    completedItems: 20,
    priority: "critical",
  },
  {
    id: "insp-004",
    projectName: "Wuse Heights Residences",
    type: "MEP Systems Inspection",
    inspector: "Engr. Fatima Abdullahi",
    inspectorLicense: "COREN/2019/058901",
    scheduledDate: "2026-04-10",
    status: "scheduled",
    location: "Block A & B, Wuse Heights, Wuse Zone 5, Abuja",
    checklistItems: 32,
    completedItems: 0,
    priority: "high",
  },
  {
    id: "insp-005",
    projectName: "Royal Gardens Estate Phase 2",
    type: "Plumbing & Drainage Test",
    inspector: "Engr. Oluwaseun Adeyemi",
    inspectorLicense: "COREN/2016/042789",
    scheduledDate: "2026-03-25",
    status: "completed",
    location: "Block D, Royal Gardens, Lekki Phase 2, Lagos",
    checklistItems: 28,
    completedItems: 28,
    score: 87,
    priority: "medium",
    findings: [
      { item: "Slow drainage in Unit 14 kitchen sink", severity: "medium" },
      { item: "Water pressure below specification in Unit 7 upper floor", severity: "high" },
    ],
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockInspections,
    total: mockInspections.length,
    summary: {
      scheduled: 2,
      inProgress: 1,
      completed: 2,
      averageScore: 89.5,
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newInspection = {
    id: `insp-${String(mockInspections.length + 1).padStart(3, "0")}`,
    projectName: body.projectName,
    type: body.type,
    inspector: body.inspector,
    inspectorLicense: body.inspectorLicense,
    scheduledDate: body.scheduledDate,
    status: "scheduled",
    location: body.location,
    checklistItems: body.checklistItems || 0,
    completedItems: 0,
    priority: body.priority || "medium",
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(
    {
      success: true,
      message: "Inspection scheduled successfully",
      data: newInspection,
    },
    { status: 201 }
  );
}
