import { NextResponse } from "next/server";

const mockArtisans = [
  {
    id: "art-001",
    name: "Ibrahim Musa",
    trade: "Master Plumber",
    location: "Lekki, Lagos",
    phone: "+234 803 456 7890",
    rating: 4.8,
    completedJobs: 142,
    yearsExperience: 18,
    certifications: ["NIS Certified Plumber", "NIOB Member"],
    hourlyRate: 500000,
    availability: "available",
    specializations: ["PVC Piping", "Water Treatment Systems", "Drainage Installation"],
  },
  {
    id: "art-002",
    name: "Chinedu Obi",
    trade: "Electrician",
    location: "Wuse, Abuja",
    phone: "+234 806 123 4567",
    rating: 4.9,
    completedJobs: 203,
    yearsExperience: 22,
    certifications: ["NEMSA Licensed", "COREN Registered"],
    hourlyRate: 600000,
    availability: "busy",
    specializations: ["Industrial Wiring", "Solar Installation", "Smart Home Systems"],
  },
  {
    id: "art-003",
    name: "Adewale Ogundimu",
    trade: "Tiler",
    location: "Ikeja, Lagos",
    phone: "+234 809 876 5432",
    rating: 4.6,
    completedJobs: 98,
    yearsExperience: 12,
    certifications: ["NIOB Member"],
    hourlyRate: 400000,
    availability: "available",
    specializations: ["Marble Installation", "Porcelain Tiles", "Swimming Pool Tiling"],
  },
  {
    id: "art-004",
    name: "Usman Bala",
    trade: "Mason/Bricklayer",
    location: "Jabi, Abuja",
    phone: "+234 802 345 6789",
    rating: 4.7,
    completedJobs: 176,
    yearsExperience: 20,
    certifications: ["NIOB Certified Mason"],
    hourlyRate: 450000,
    availability: "available",
    specializations: ["Block Laying", "Plastering", "Interlocking Stones"],
  },
  {
    id: "art-005",
    name: "Tunde Afolabi",
    trade: "Painter",
    location: "Victoria Island, Lagos",
    phone: "+234 805 678 9012",
    rating: 4.5,
    completedJobs: 87,
    yearsExperience: 10,
    certifications: ["Dulux Certified Applicator"],
    hourlyRate: 350000,
    availability: "busy",
    specializations: ["Interior Design Painting", "Texture Coating", "POP Finishing"],
  },
  {
    id: "art-006",
    name: "Amina Yusuf",
    trade: "Interior Designer",
    location: "Maitama, Abuja",
    phone: "+234 807 234 5678",
    rating: 4.9,
    completedJobs: 64,
    yearsExperience: 8,
    certifications: ["IDAN Member", "LEED Green Associate"],
    hourlyRate: 800000,
    availability: "available",
    specializations: ["Luxury Interiors", "Kitchen Design", "Space Planning"],
  },
  {
    id: "art-007",
    name: "Emeka Nwosu",
    trade: "Welder/Fabricator",
    location: "Surulere, Lagos",
    phone: "+234 810 567 8901",
    rating: 4.4,
    completedJobs: 115,
    yearsExperience: 15,
    certifications: ["AWS Certified Welder"],
    hourlyRate: 450000,
    availability: "available",
    specializations: ["Stainless Steel", "Aluminum Fabrication", "Gate & Burglary Proof"],
  },
  {
    id: "art-008",
    name: "Hassan Garba",
    trade: "Carpenter",
    location: "Kano",
    phone: "+234 803 890 1234",
    rating: 4.7,
    completedJobs: 134,
    yearsExperience: 25,
    certifications: ["Master Craftsman Guild"],
    hourlyRate: 400000,
    availability: "busy",
    specializations: ["Roof Trusses", "Kitchen Cabinets", "Wardrobes"],
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trade = searchParams.get("trade");
  const location = searchParams.get("location");
  const availability = searchParams.get("availability");

  let filtered = mockArtisans;

  if (trade) {
    filtered = filtered.filter((a) =>
      a.trade.toLowerCase().includes(trade.toLowerCase())
    );
  }
  if (location) {
    filtered = filtered.filter((a) =>
      a.location.toLowerCase().includes(location.toLowerCase())
    );
  }
  if (availability) {
    filtered = filtered.filter((a) => a.availability === availability);
  }

  return NextResponse.json({
    success: true,
    data: filtered,
    total: filtered.length,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  const newJobPosting = {
    id: `job-${Date.now()}`,
    title: body.title,
    trade: body.trade,
    description: body.description,
    location: body.location,
    budget: body.budget,
    duration: body.duration,
    postedBy: body.postedBy,
    status: "open",
    applicants: 0,
    createdAt: new Date().toISOString(),
  };

  return NextResponse.json(
    {
      success: true,
      message: "Job posting created successfully",
      data: newJobPosting,
    },
    { status: 201 }
  );
}
