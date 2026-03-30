import { NextResponse } from "next/server";

const mockDefects = [
  {
    id: "def-001",
    title: "Roof Leak - Master Bedroom",
    property: "Unit 7, Royal Gardens Estate, Lekki",
    estate: "Royal Gardens Estate",
    reportedBy: "Mr. Babatunde Olatunji",
    reportedDate: "2026-03-25",
    priority: "critical",
    category: "Plumbing",
    status: "in-progress",
    assignedContractor: "Ibrahim Musa (Master Plumber)",
    contractorPhone: "+234 803 456 7890",
    description: "Water dripping from ceiling in master bedroom during rainfall. Appears to be a roofing membrane failure near the parapet wall junction.",
    daysOpen: 5,
    photos: ["roof-leak-01.jpg", "roof-leak-02.jpg", "ceiling-damage-01.jpg"],
    timeline: [
      { date: "2026-03-25", event: "Defect reported by owner", actor: "Mr. Babatunde Olatunji" },
      { date: "2026-03-25", event: "Acknowledged by facility management", actor: "BuildNG System" },
      { date: "2026-03-26", event: "Assigned to Ibrahim Musa", actor: "Engr. Adamu Bello" },
      { date: "2026-03-27", event: "Site inspection completed. Root cause identified.", actor: "Ibrahim Musa" },
      { date: "2026-03-28", event: "Repair work commenced", actor: "Ibrahim Musa" },
    ],
    estimatedCost: 35000000,
    warrantyStatus: "covered",
  },
  {
    id: "def-002",
    title: "Hairline Cracks - External Wall",
    property: "Unit 23, Emerald City Apartments, Jahi",
    estate: "Emerald City Apartments",
    reportedBy: "Mrs. Chioma Eze",
    reportedDate: "2026-03-18",
    priority: "medium",
    category: "Structural",
    status: "assigned",
    assignedContractor: "Usman Bala (Mason/Bricklayer)",
    contractorPhone: "+234 802 345 6789",
    description: "Hairline cracks observed on external wall of living room. Cracks run vertically from window lintel to the DPC level. No water ingress observed yet.",
    daysOpen: 12,
    photos: ["crack-ext-01.jpg", "crack-ext-02.jpg"],
    timeline: [
      { date: "2026-03-18", event: "Defect reported by owner", actor: "Mrs. Chioma Eze" },
      { date: "2026-03-19", event: "Acknowledged by facility management", actor: "BuildNG System" },
      { date: "2026-03-22", event: "Structural assessment scheduled", actor: "Engr. Chukwuma Eze" },
      { date: "2026-03-25", event: "Assessment completed - cosmetic crack, not structural", actor: "Engr. Chukwuma Eze" },
      { date: "2026-03-26", event: "Assigned to Usman Bala for repair", actor: "Engr. Chukwuma Eze" },
    ],
    estimatedCost: 15000000,
    warrantyStatus: "covered",
  },
  {
    id: "def-003",
    title: "Electrical Short - Kitchen Circuit",
    property: "Unit 3, Jabi Luxury Villas, Jabi",
    estate: "Jabi Luxury Villas",
    reportedBy: "Alhaji Shehu Mohammed",
    reportedDate: "2026-03-28",
    priority: "high",
    category: "Electrical",
    status: "acknowledged",
    assignedContractor: null,
    contractorPhone: null,
    description: "Kitchen circuit breaker keeps tripping when multiple appliances are in use. Burning smell noticed from socket near dishwasher. Urgent attention needed.",
    daysOpen: 2,
    photos: ["elec-socket-01.jpg", "breaker-panel-01.jpg"],
    timeline: [
      { date: "2026-03-28", event: "Defect reported by owner - marked urgent", actor: "Alhaji Shehu Mohammed" },
      { date: "2026-03-28", event: "Acknowledged by facility management", actor: "BuildNG System" },
      { date: "2026-03-29", event: "Electrical safety assessment requested", actor: "Facility Manager" },
    ],
    estimatedCost: 25000000,
    warrantyStatus: "covered",
  },
  {
    id: "def-004",
    title: "Poor Drainage - Compound",
    property: "Unit 15, Royal Gardens Estate, Lekki",
    estate: "Royal Gardens Estate",
    reportedBy: "Dr. Amaka Obi",
    reportedDate: "2026-03-22",
    priority: "high",
    category: "Plumbing",
    status: "in-progress",
    assignedContractor: "Ibrahim Musa (Master Plumber)",
    contractorPhone: "+234 803 456 7890",
    description: "Compound floods after every rainfall. Water pools around the building foundation. Drainage channels appear to be improperly graded.",
    daysOpen: 8,
    photos: ["drainage-01.jpg", "flooding-02.jpg", "drainage-channel-03.jpg"],
    timeline: [
      { date: "2026-03-22", event: "Defect reported by owner", actor: "Dr. Amaka Obi" },
      { date: "2026-03-22", event: "Acknowledged by facility management", actor: "BuildNG System" },
      { date: "2026-03-23", event: "Site inspection conducted", actor: "Engr. Adamu Bello" },
      { date: "2026-03-24", event: "Assigned to Ibrahim Musa", actor: "Engr. Adamu Bello" },
      { date: "2026-03-26", event: "Drainage regrading work commenced", actor: "Ibrahim Musa" },
    ],
    estimatedCost: 45000000,
    warrantyStatus: "covered",
  },
  {
    id: "def-005",
    title: "POP Ceiling Peeling",
    property: "Unit 8, Wuse Heights Residences, Wuse",
    estate: "Wuse Heights Residences",
    reportedBy: "Mr. Emeka Nwankwo",
    reportedDate: "2026-03-10",
    priority: "low",
    category: "Finishing",
    status: "assigned",
    assignedContractor: "Tunde Afolabi (Painter)",
    contractorPhone: "+234 805 678 9012",
    description: "POP ceiling in guest bedroom showing signs of peeling and flaking. Small area approximately 2 square meters. No water stain visible.",
    daysOpen: 20,
    photos: ["pop-ceiling-01.jpg"],
    timeline: [
      { date: "2026-03-10", event: "Defect reported by owner", actor: "Mr. Emeka Nwankwo" },
      { date: "2026-03-11", event: "Acknowledged by facility management", actor: "BuildNG System" },
      { date: "2026-03-15", event: "Inspection completed - poor adhesion identified", actor: "Facility Manager" },
      { date: "2026-03-18", event: "Assigned to Tunde Afolabi", actor: "Facility Manager" },
    ],
    estimatedCost: 8000000,
    warrantyStatus: "covered",
  },
  {
    id: "def-006",
    title: "Window Seal Leak",
    property: "Unit 31, Emerald City Apartments, Jahi",
    estate: "Emerald City Apartments",
    reportedBy: "Mrs. Folake Adeyemo",
    reportedDate: "2026-03-24",
    priority: "medium",
    category: "Finishing",
    status: "reported",
    assignedContractor: null,
    contractorPhone: null,
    description: "Water seeping through window frame seal during heavy rain in living room. Affecting curtain wall and floor area beneath window.",
    daysOpen: 6,
    photos: ["window-leak-01.jpg", "window-seal-02.jpg"],
    timeline: [
      { date: "2026-03-24", event: "Defect reported by owner", actor: "Mrs. Folake Adeyemo" },
      { date: "2026-03-25", event: "Acknowledged by facility management", actor: "BuildNG System" },
    ],
    estimatedCost: 12000000,
    warrantyStatus: "covered",
  },
  {
    id: "def-007",
    title: "AC Drainage Issue",
    property: "Unit 19, Royal Gardens Estate, Lekki",
    estate: "Royal Gardens Estate",
    reportedBy: "Chief Olumide Bakare",
    reportedDate: "2026-03-26",
    priority: "medium",
    category: "MEP",
    status: "assigned",
    assignedContractor: "Chinedu Obi (Electrician)",
    contractorPhone: "+234 806 123 4567",
    description: "Air conditioning condensate drain pipe leaking inside wall cavity. Water stain appearing on bedroom wall below AC unit.",
    daysOpen: 4,
    photos: ["ac-drain-01.jpg", "wall-stain-02.jpg"],
    timeline: [
      { date: "2026-03-26", event: "Defect reported by owner", actor: "Chief Olumide Bakare" },
      { date: "2026-03-26", event: "Acknowledged by facility management", actor: "BuildNG System" },
      { date: "2026-03-27", event: "MEP inspection completed", actor: "Engr. Fatima Abdullahi" },
      { date: "2026-03-28", event: "Assigned to Chinedu Obi", actor: "Engr. Fatima Abdullahi" },
    ],
    estimatedCost: 18000000,
    warrantyStatus: "covered",
  },
  {
    id: "def-008",
    title: "Floor Tile Lifting",
    property: "Unit 5, Jabi Luxury Villas, Jabi",
    estate: "Jabi Luxury Villas",
    reportedBy: "Mrs. Halima Danjuma",
    reportedDate: "2026-03-15",
    priority: "low",
    category: "Finishing",
    status: "in-progress",
    assignedContractor: "Adewale Ogundimu (Tiler)",
    contractorPhone: "+234 809 876 5432",
    description: "Floor tiles in entrance foyer lifting and making hollow sounds when stepped on. Approximately 6 tiles affected. Possible adhesive failure.",
    daysOpen: 15,
    photos: ["tile-lift-01.jpg", "tile-lift-02.jpg", "tile-gap-03.jpg"],
    timeline: [
      { date: "2026-03-15", event: "Defect reported by owner", actor: "Mrs. Halima Danjuma" },
      { date: "2026-03-16", event: "Acknowledged by facility management", actor: "BuildNG System" },
      { date: "2026-03-18", event: "Inspection completed", actor: "Facility Manager" },
      { date: "2026-03-20", event: "Assigned to Adewale Ogundimu", actor: "Facility Manager" },
      { date: "2026-03-25", event: "Tile removal commenced, awaiting matching replacement tiles", actor: "Adewale Ogundimu" },
    ],
    estimatedCost: 22000000,
    warrantyStatus: "covered",
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");
  const category = searchParams.get("category");
  const estate = searchParams.get("estate");

  let filtered = mockDefects;

  if (status) {
    filtered = filtered.filter((d) => d.status === status);
  }
  if (priority) {
    filtered = filtered.filter((d) => d.priority === priority);
  }
  if (category) {
    filtered = filtered.filter((d) =>
      d.category.toLowerCase() === category.toLowerCase()
    );
  }
  if (estate) {
    filtered = filtered.filter((d) =>
      d.estate.toLowerCase().includes(estate.toLowerCase())
    );
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
    summary: {
      open: mockDefects.filter((d) => d.status !== "resolved" && d.status !== "verified").length,
      resolved: mockDefects.filter((d) => d.status === "resolved" || d.status === "verified").length,
      critical: mockDefects.filter((d) => d.priority === "critical").length,
      averageDaysOpen: Math.round(mockDefects.reduce((acc, d) => acc + d.daysOpen, 0) / mockDefects.length),
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newDefect = {
    id: `def-${String(mockDefects.length + 1).padStart(3, "0")}`,
    title: body.title,
    property: body.property,
    estate: body.estate,
    reportedBy: body.reportedBy,
    reportedDate: new Date().toISOString().split("T")[0],
    priority: body.priority,
    category: body.category,
    status: "reported",
    assignedContractor: null,
    contractorPhone: null,
    description: body.description,
    daysOpen: 0,
    photos: body.photos || [],
    timeline: [
      {
        date: new Date().toISOString().split("T")[0],
        event: "Defect reported by owner",
        actor: body.reportedBy,
      },
    ],
    estimatedCost: null,
    warrantyStatus: "pending-review",
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(
    {
      success: true,
      message: "Defect reported successfully. Our team will review it within 24 hours.",
      data: newDefect,
    },
    { status: 201 }
  );
}
