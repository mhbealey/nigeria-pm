import { NextResponse } from "next/server";

const mockPermitApplications = [
  {
    id: "pmt-001",
    projectName: "Royal Gardens Estate Phase 2",
    applicant: "Adebayo Properties Ltd",
    type: "Building Plan Approval",
    authority: "Lagos State Physical Planning Permit Authority (LASPPPA)",
    submissionDate: "2025-04-10",
    status: "approved",
    approvalDate: "2025-06-15",
    expiryDate: "2027-06-15",
    fees: 250000000,
    referenceNumber: "LASPPPA/2025/BP/04521",
    documents: ["Architectural Drawings", "Structural Drawings", "Survey Plan", "C of O", "Environmental Impact Assessment"],
  },
  {
    id: "pmt-002",
    projectName: "Jabi Luxury Villas",
    applicant: "Aliyu Construction Group",
    type: "Development Permit",
    authority: "FCT Development Control Department",
    submissionDate: "2025-07-20",
    status: "approved",
    approvalDate: "2025-10-05",
    expiryDate: "2027-10-05",
    fees: 180000000,
    referenceNumber: "FCTDCD/2025/DP/00892",
    documents: ["Site Plan", "Building Drawings", "Right of Occupancy", "Tax Clearance"],
  },
  {
    id: "pmt-003",
    projectName: "Wuse Heights Phase 2",
    applicant: "ChiChi Homes International",
    type: "Building Plan Approval",
    authority: "FCT Development Control Department",
    submissionDate: "2026-02-15",
    status: "under-review",
    fees: 150000000,
    referenceNumber: "FCTDCD/2026/BP/00156",
    documents: ["Architectural Drawings", "Structural Calculations", "Right of Occupancy", "EIA Report"],
    reviewComments: "Awaiting response on setback compliance query",
  },
  {
    id: "pmt-004",
    projectName: "Victoria Crest Phase 2",
    applicant: "Adebayo Properties Ltd",
    type: "Environmental Impact Assessment",
    authority: "Lagos State Environmental Protection Agency (LASEPA)",
    submissionDate: "2026-01-08",
    status: "pending",
    fees: 350000000,
    referenceNumber: "LASEPA/2026/EIA/00045",
    documents: ["EIA Report", "Noise Assessment", "Waste Management Plan", "Traffic Impact Study"],
  },
  {
    id: "pmt-005",
    projectName: "Emerald City Phase 3",
    applicant: "Nnamdi Okoro Developments",
    type: "Development Permit",
    authority: "FCT Development Control Department",
    submissionDate: "2026-03-01",
    status: "submitted",
    fees: 200000000,
    referenceNumber: "FCTDCD/2026/DP/00203",
    documents: ["Master Plan", "Architectural Drawings", "Survey Plan", "Right of Occupancy", "Tax Clearance"],
  },
  {
    id: "pmt-006",
    projectName: "Royal Gardens Estate Phase 2",
    applicant: "Adebayo Properties Ltd",
    type: "Fire Safety Certificate",
    authority: "Lagos State Fire Service",
    submissionDate: "2025-11-20",
    status: "approved",
    approvalDate: "2026-01-10",
    expiryDate: "2027-01-10",
    fees: 80000000,
    referenceNumber: "LSFS/2025/FSC/01234",
    documents: ["Fire Safety Plan", "Building Drawings", "Fire Equipment List"],
  },
];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: mockPermitApplications,
    total: mockPermitApplications.length,
    summary: {
      approved: mockPermitApplications.filter((p) => p.status === "approved").length,
      pending: mockPermitApplications.filter((p) => p.status === "pending").length,
      underReview: mockPermitApplications.filter((p) => p.status === "under-review").length,
      submitted: mockPermitApplications.filter((p) => p.status === "submitted").length,
    },
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newApplication = {
    id: `pmt-${String(mockPermitApplications.length + 1).padStart(3, "0")}`,
    projectName: body.projectName,
    applicant: body.applicant,
    type: body.type,
    authority: body.authority,
    submissionDate: new Date().toISOString().split("T")[0],
    status: "submitted",
    fees: body.fees,
    referenceNumber: `REF/${new Date().getFullYear()}/${Date.now().toString().slice(-5)}`,
    documents: body.documents || [],
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(
    {
      success: true,
      message: "Permit application submitted successfully",
      data: newApplication,
    },
    { status: 201 }
  );
}
