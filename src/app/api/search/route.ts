import { NextRequest, NextResponse } from "next/server";

// ── Mock Search Data ────────────────────────────────────────────────

interface SearchResult {
  id: string;
  title: string;
  description: string;
  category: "projects" | "artisans" | "materials" | "permits" | "defects";
  url: string;
  relevance: number;
  metadata: Record<string, string | number>;
}

const searchableItems: SearchResult[] = [
  // Projects
  {
    id: "PRJ-001",
    title: "Royal Gardens Estate Phase 2",
    description: "Luxury residential estate development in Lekki, Lagos. 24 units of 4-bedroom detached houses with smart home features.",
    category: "projects",
    url: "/projects/PRJ-001",
    relevance: 0,
    metadata: { location: "Lekki, Lagos", status: "active", budget: 4500000000, progress: 72 },
  },
  {
    id: "PRJ-002",
    title: "Emerald City Apartments",
    description: "Mid-rise apartment complex in Ikeja GRA, Lagos. 40 units of 2 and 3-bedroom flats with recreational facilities.",
    category: "projects",
    url: "/projects/PRJ-002",
    relevance: 0,
    metadata: { location: "Ikeja GRA, Lagos", status: "completed", budget: 2800000000, progress: 100 },
  },
  {
    id: "PRJ-003",
    title: "Jabi Luxury Villas",
    description: "Premium villa development in Jabi, Abuja. 12 units of 5-bedroom detached villas with private swimming pools.",
    category: "projects",
    url: "/projects/PRJ-003",
    relevance: 0,
    metadata: { location: "Jabi, Abuja", status: "active", budget: 6200000000, progress: 28 },
  },
  {
    id: "PRJ-004",
    title: "Banana Island Residences",
    description: "Ultra-luxury waterfront residences on Banana Island, Lagos. 8 units of 5-bedroom mansions with private jetty access.",
    category: "projects",
    url: "/projects/PRJ-004",
    relevance: 0,
    metadata: { location: "Banana Island, Lagos", status: "active", budget: 15000000000, progress: 45 },
  },
  {
    id: "PRJ-005",
    title: "Wuse Zone 5 Office Complex",
    description: "Grade A commercial office building in Wuse Zone 5, Abuja. 8 floors with underground parking and conference facilities.",
    category: "projects",
    url: "/projects/PRJ-005",
    relevance: 0,
    metadata: { location: "Wuse, Abuja", status: "active", budget: 3500000000, progress: 55 },
  },
  {
    id: "PRJ-006",
    title: "Lekki Sunrise Terraces",
    description: "Contemporary terrace housing in Lekki Phase 1, Lagos. 16 units of 4-bedroom terraced duplexes with communal gardens.",
    category: "projects",
    url: "/projects/PRJ-006",
    relevance: 0,
    metadata: { location: "Lekki Phase 1, Lagos", status: "planning", budget: 2400000000, progress: 5 },
  },

  // Artisans
  {
    id: "ART-001",
    title: "Musa Abdullahi - Master Mason",
    description: "Experienced mason with 18 years in residential and commercial construction across Abuja. Specializes in block work and concrete finishing.",
    category: "artisans",
    url: "/artisans/ART-001",
    relevance: 0,
    metadata: { trade: "Mason", location: "Abuja", experience: 18, rating: 4.8 },
  },
  {
    id: "ART-002",
    title: "Chidi Eze - Electrical Engineer",
    description: "COREN-registered electrical engineer with expertise in industrial and residential wiring, solar installations, and smart home systems. Based in Lagos.",
    category: "artisans",
    url: "/artisans/ART-002",
    relevance: 0,
    metadata: { trade: "Electrician", location: "Lagos", experience: 12, rating: 4.6 },
  },
  {
    id: "ART-003",
    title: "Blessing Okonkwo - Plumber",
    description: "Certified plumber specializing in PPR and CPVC installations, borehole connections, and water treatment systems. Port Harcourt based.",
    category: "artisans",
    url: "/artisans/ART-003",
    relevance: 0,
    metadata: { trade: "Plumber", location: "Port Harcourt", experience: 10, rating: 4.5 },
  },
  {
    id: "ART-004",
    title: "Taiwo Adeyemi - Tiler & Finishing Specialist",
    description: "Expert tiler and finishing specialist covering porcelain, ceramic, and natural stone installations. Also skilled in POP ceiling and screeding.",
    category: "artisans",
    url: "/artisans/ART-004",
    relevance: 0,
    metadata: { trade: "Tiler", location: "Lagos", experience: 15, rating: 4.9 },
  },
  {
    id: "ART-005",
    title: "Ibrahim Bello - Welder & Fabricator",
    description: "Structural steel fabricator and welder. Experienced in burglar proofing, staircase railings, gates, and industrial frameworks. Abuja.",
    category: "artisans",
    url: "/artisans/ART-005",
    relevance: 0,
    metadata: { trade: "Welder", location: "Abuja", experience: 14, rating: 4.7 },
  },

  // Materials
  {
    id: "MAT-001",
    title: "Dangote 3X Cement (50kg)",
    description: "Premium Portland cement for structural and general construction work. Widely available across Nigeria. Current price: NGN 7,500/bag in Lagos.",
    category: "materials",
    url: "/market/prices?material=dangote+cement",
    relevance: 0,
    metadata: { category: "Cement", price: 7500, unit: "bag", city: "Lagos" },
  },
  {
    id: "MAT-002",
    title: "12mm High Yield Iron Rod",
    description: "Reinforcement steel bar for columns, beams, and slabs. Available at Alaba, Trade Depot, and Dei-Dei markets. NGN 420,000/tonne in Lagos.",
    category: "materials",
    url: "/market/prices?material=12mm+iron+rod",
    relevance: 0,
    metadata: { category: "Reinforcement", price: 420000, unit: "tonne", city: "Lagos" },
  },
  {
    id: "MAT-003",
    title: "Aluminium Roofing Sheet (0.55mm Long Span)",
    description: "Durable aluminium roofing sheet suitable for residential and commercial buildings. Available in various colours. NGN 7,200/meter in Lagos.",
    category: "materials",
    url: "/market/prices?material=aluminium+roofing",
    relevance: 0,
    metadata: { category: "Roofing", price: 7200, unit: "meter", city: "Lagos" },
  },
  {
    id: "MAT-004",
    title: "9-inch Sandcrete Block",
    description: "Standard 9-inch (225mm) sandcrete block for load-bearing walls. Machine-vibrated for consistent quality. NGN 500/block in Lagos.",
    category: "materials",
    url: "/market/prices?material=9-inch+block",
    relevance: 0,
    metadata: { category: "Blocks", price: 500, unit: "piece", city: "Lagos" },
  },
  {
    id: "MAT-005",
    title: "Granite Chippings (20mm)",
    description: "Crushed granite aggregate for concrete mixing. Available from quarries in Ogun, Abuja, and Edo states. NGN 65,000/tonne in Lagos.",
    category: "materials",
    url: "/market/prices?material=granite",
    relevance: 0,
    metadata: { category: "Sand & Aggregate", price: 65000, unit: "tonne", city: "Lagos" },
  },

  // Permits
  {
    id: "PRM-001",
    title: "LASPPPA Building Plan Approval - Royal Gardens",
    description: "Building plan approval issued by Lagos State Physical Planning Permit Authority for Royal Gardens Estate Phase 2, Lekki.",
    category: "permits",
    url: "/permits/PRM-001",
    relevance: 0,
    metadata: { authority: "LASPPPA", permitNumber: "LASPPPA/2025/BPA/1847", status: "active" },
  },
  {
    id: "PRM-002",
    title: "FCT Development Permit - Jabi Villas",
    description: "Development permit issued by FCT Development Control Department for Jabi Luxury Villas, Abuja.",
    category: "permits",
    url: "/permits/PRM-002",
    relevance: 0,
    metadata: { authority: "FCT DCD", permitNumber: "FCT/DCD/DP/2025/3291", status: "active" },
  },
  {
    id: "PRM-003",
    title: "NESREA EIA Approval - Wuse Office Complex",
    description: "Environmental Impact Assessment approval from NESREA for Wuse Zone 5 Office Complex. Expiring April 15, 2026.",
    category: "permits",
    url: "/permits/PRM-003",
    relevance: 0,
    metadata: { authority: "NESREA", permitNumber: "NESREA/EIA/2024/0892", status: "expiring-soon" },
  },
  {
    id: "PRM-004",
    title: "LASPPPA Building Plan Approval - Lekki Sunrise",
    description: "Newly approved building plan for Lekki Sunrise Terraces. Permit number: LASPPPA/2026/BPA/0293.",
    category: "permits",
    url: "/permits/PRM-004",
    relevance: 0,
    metadata: { authority: "LASPPPA", permitNumber: "LASPPPA/2026/BPA/0293", status: "active" },
  },

  // Defects
  {
    id: "DEF-001",
    title: "Electrical Non-Compliance - Banana Island Residences",
    description: "Earth bonding incomplete on 3rd floor. Non-compliant cable sizes on power circuit 7B. Remediation required within 14 days.",
    category: "defects",
    url: "/defects/DEF-001",
    relevance: 0,
    metadata: { project: "Banana Island Residences", severity: "critical", status: "open" },
  },
  {
    id: "DEF-002",
    title: "Plaster Cracking - Royal Gardens Block A",
    description: "Hairline cracks observed in external wall plastering on Block A, south elevation. Likely due to insufficient curing time.",
    category: "defects",
    url: "/defects/DEF-002",
    relevance: 0,
    metadata: { project: "Royal Gardens Estate Phase 2", severity: "minor", status: "in-progress" },
  },
  {
    id: "DEF-003",
    title: "Water Seepage - Jabi Villas Foundation",
    description: "Minor water seepage detected at foundation joint in Unit 3. Waterproofing membrane may need reinforcement.",
    category: "defects",
    url: "/defects/DEF-003",
    relevance: 0,
    metadata: { project: "Jabi Luxury Villas", severity: "moderate", status: "open" },
  },
  {
    id: "DEF-004",
    title: "Tile Alignment Issue - Emerald City Unit 12",
    description: "Floor tiles in master bedroom showing 3mm alignment variance. Needs re-laying before handover.",
    category: "defects",
    url: "/defects/DEF-004",
    relevance: 0,
    metadata: { project: "Emerald City Apartments", severity: "minor", status: "resolved" },
  },
];

// ── Search Logic ────────────────────────────────────────────────────

function searchItems(query: string, category?: string): SearchResult[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter((t) => t.length > 0);

  const scored = searchableItems
    .filter((item) => {
      if (category && item.category !== category) return false;
      return true;
    })
    .map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const descLower = item.description.toLowerCase();
      const metaValues = Object.values(item.metadata)
        .map((v) => String(v).toLowerCase())
        .join(" ");

      for (const term of terms) {
        // Exact match in title (highest weight)
        if (titleLower.includes(term)) score += 10;
        // Exact match in description
        if (descLower.includes(term)) score += 5;
        // Match in metadata
        if (metaValues.includes(term)) score += 3;
      }

      // Full query match bonus
      const fullQuery = query.toLowerCase();
      if (titleLower.includes(fullQuery)) score += 15;
      if (descLower.includes(fullQuery)) score += 8;

      return { ...item, relevance: score };
    })
    .filter((item) => item.relevance > 0)
    .sort((a, b) => b.relevance - a.relevance);

  return scored;
}

// ── GET Handler ─────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const query = (url.searchParams.get("q") || "").trim();
    const category = url.searchParams.get("category") || undefined;
    const limit = Math.min(
      50,
      Math.max(1, parseInt(url.searchParams.get("limit") || "20", 10))
    );

    if (!query) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Search query is required. Provide a 'q' parameter.",
            code: "MISSING_QUERY",
          },
        },
        { status: 400 }
      );
    }

    if (query.length < 2) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Search query must be at least 2 characters long.",
            code: "QUERY_TOO_SHORT",
          },
        },
        { status: 400 }
      );
    }

    const allResults = searchItems(query, category);
    const limitedResults = allResults.slice(0, limit);

    // Group by category
    const grouped: Record<string, SearchResult[]> = {};
    for (const result of limitedResults) {
      if (!grouped[result.category]) {
        grouped[result.category] = [];
      }
      grouped[result.category].push(result);
    }

    const categoryCounts: Record<string, number> = {};
    for (const result of allResults) {
      categoryCounts[result.category] =
        (categoryCounts[result.category] || 0) + 1;
    }

    return NextResponse.json({
      success: true,
      data: {
        query,
        results: limitedResults,
        grouped,
        totalResults: allResults.length,
        categoryCounts,
        limit,
      },
    });
  } catch (error) {
    console.error("[Search API] Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Search failed" } },
      { status: 500 }
    );
  }
}
