import { NextRequest, NextResponse } from "next/server";

// ── Types ───────────────────────────────────────────────────────────

interface MaterialPrice {
  id: string;
  material: string;
  category: string;
  unit: string;
  price: number;
  city: string;
  state: string;
  vendor: string;
  reportedBy: string;
  reportedAt: string;
  verified: boolean;
}

// ── Mock Data ───────────────────────────────────────────────────────

const materialPrices: MaterialPrice[] = [
  // Cement
  { id: "mp-001", material: "Dangote 3X Cement (50kg)", category: "Cement", unit: "bag", price: 7500, city: "Lagos", state: "Lagos", vendor: "BuildMart Lagos", reportedBy: "Engr. Tunde Bakare", reportedAt: "2026-03-28", verified: true },
  { id: "mp-002", material: "Dangote 3X Cement (50kg)", category: "Cement", unit: "bag", price: 7200, city: "Abuja", state: "FCT", vendor: "Capital Building Supplies", reportedBy: "Musa Garba", reportedAt: "2026-03-27", verified: true },
  { id: "mp-003", material: "BUA Cement (50kg)", category: "Cement", unit: "bag", price: 7000, city: "Lagos", state: "Lagos", vendor: "Alaba Building Materials", reportedBy: "Chukwudi Eze", reportedAt: "2026-03-26", verified: true },
  { id: "mp-004", material: "BUA Cement (50kg)", category: "Cement", unit: "bag", price: 6800, city: "Kano", state: "Kano", vendor: "Kano Cement Depot", reportedBy: "Abdullahi Sule", reportedAt: "2026-03-25", verified: true },
  { id: "mp-005", material: "Lafarge Cement (50kg)", category: "Cement", unit: "bag", price: 7300, city: "Port Harcourt", state: "Rivers", vendor: "Rivers Building Hub", reportedBy: "Blessing Okonkwo", reportedAt: "2026-03-27", verified: true },

  // Iron Rod / Reinforcement
  { id: "mp-006", material: "12mm Iron Rod (High Yield)", category: "Reinforcement", unit: "tonne", price: 420000, city: "Lagos", state: "Lagos", vendor: "Trade Depot Ikeja", reportedBy: "Emeka Obi", reportedAt: "2026-03-28", verified: true },
  { id: "mp-007", material: "16mm Iron Rod (High Yield)", category: "Reinforcement", unit: "tonne", price: 435000, city: "Lagos", state: "Lagos", vendor: "Trade Depot Ikeja", reportedBy: "Emeka Obi", reportedAt: "2026-03-28", verified: true },
  { id: "mp-008", material: "10mm Iron Rod (High Yield)", category: "Reinforcement", unit: "tonne", price: 410000, city: "Abuja", state: "FCT", vendor: "Dei-Dei Iron Market", reportedBy: "Ibrahim Bello", reportedAt: "2026-03-26", verified: true },
  { id: "mp-009", material: "12mm Iron Rod (High Yield)", category: "Reinforcement", unit: "tonne", price: 400000, city: "Abuja", state: "FCT", vendor: "Dei-Dei Iron Market", reportedBy: "Ibrahim Bello", reportedAt: "2026-03-26", verified: true },

  // Blocks
  { id: "mp-010", material: "9-inch Sandcrete Block", category: "Blocks", unit: "piece", price: 500, city: "Lagos", state: "Lagos", vendor: "Ogba Block Industry", reportedBy: "Taiwo Adeyemi", reportedAt: "2026-03-28", verified: true },
  { id: "mp-011", material: "6-inch Sandcrete Block", category: "Blocks", unit: "piece", price: 350, city: "Lagos", state: "Lagos", vendor: "Ogba Block Industry", reportedBy: "Taiwo Adeyemi", reportedAt: "2026-03-28", verified: true },
  { id: "mp-012", material: "9-inch Sandcrete Block", category: "Blocks", unit: "piece", price: 450, city: "Abuja", state: "FCT", vendor: "Nyanya Block Factory", reportedBy: "Aliyu Danjuma", reportedAt: "2026-03-25", verified: true },

  // Sand & Aggregate
  { id: "mp-013", material: "Sharp Sand", category: "Sand & Aggregate", unit: "trip (10 tonnes)", price: 45000, city: "Lagos", state: "Lagos", vendor: "Ogun Sand Dealers", reportedBy: "Kayode Olumide", reportedAt: "2026-03-27", verified: true },
  { id: "mp-014", material: "Plaster Sand (fine)", category: "Sand & Aggregate", unit: "trip (10 tonnes)", price: 35000, city: "Lagos", state: "Lagos", vendor: "Ogun Sand Dealers", reportedBy: "Kayode Olumide", reportedAt: "2026-03-27", verified: true },
  { id: "mp-015", material: "Granite (20mm)", category: "Sand & Aggregate", unit: "tonne", price: 65000, city: "Lagos", state: "Lagos", vendor: "Crush Rock Industries", reportedBy: "Femi Adesanya", reportedAt: "2026-03-26", verified: true },
  { id: "mp-016", material: "Granite (20mm)", category: "Sand & Aggregate", unit: "tonne", price: 55000, city: "Abuja", state: "FCT", vendor: "Mpape Quarry", reportedBy: "Hassan Yusuf", reportedAt: "2026-03-24", verified: true },

  // Roofing
  { id: "mp-017", material: "Aluminium Roofing Sheet (0.55mm, long span)", category: "Roofing", unit: "meter", price: 7200, city: "Lagos", state: "Lagos", vendor: "Aluminium City Agbara", reportedBy: "Segun Ogunleye", reportedAt: "2026-03-28", verified: true },
  { id: "mp-018", material: "Stone Coated Roofing Tile", category: "Roofing", unit: "piece", price: 3500, city: "Lagos", state: "Lagos", vendor: "Kristin Roofing Nigeria", reportedBy: "Ngozi Ikenna", reportedAt: "2026-03-25", verified: true },
  { id: "mp-019", material: "Aluminium Roofing Sheet (0.55mm, long span)", category: "Roofing", unit: "meter", price: 6800, city: "Abuja", state: "FCT", vendor: "Abuja Roofing Centre", reportedBy: "Yakubu Adamu", reportedAt: "2026-03-26", verified: true },

  // Plumbing
  { id: "mp-020", material: "PPR Pipe (1 inch, 4m)", category: "Plumbing", unit: "length", price: 4500, city: "Lagos", state: "Lagos", vendor: "Fisko Pipes Nigeria", reportedBy: "Olawale Jimoh", reportedAt: "2026-03-24", verified: true },
  { id: "mp-021", material: "PVC Pipe (4 inch, 6m)", category: "Plumbing", unit: "length", price: 8500, city: "Lagos", state: "Lagos", vendor: "Wavin Pipes Lagos", reportedBy: "Adaobi Nwachukwu", reportedAt: "2026-03-23", verified: true },

  // Electrical
  { id: "mp-022", material: "Armoured Cable (16mm, 4-core)", category: "Electrical", unit: "meter", price: 4800, city: "Lagos", state: "Lagos", vendor: "Cutix Cable Nigeria", reportedBy: "Chinedu Okeke", reportedAt: "2026-03-27", verified: true },
  { id: "mp-023", material: "Single Core Cable (2.5mm)", category: "Electrical", unit: "roll (100m)", price: 35000, city: "Lagos", state: "Lagos", vendor: "Coleman Cables", reportedBy: "Tobi Akinwale", reportedAt: "2026-03-26", verified: true },

  // Tiles & Finishing
  { id: "mp-024", material: "Floor Tiles (60x60cm, Grade A)", category: "Tiles & Finishing", unit: "carton (4pcs)", price: 8500, city: "Lagos", state: "Lagos", vendor: "Royal Ceramics Akowonjo", reportedBy: "Funke Adeola", reportedAt: "2026-03-28", verified: true },
  { id: "mp-025", material: "Wall Tiles (30x60cm, Grade A)", category: "Tiles & Finishing", unit: "carton (8pcs)", price: 7000, city: "Lagos", state: "Lagos", vendor: "Royal Ceramics Akowonjo", reportedBy: "Funke Adeola", reportedAt: "2026-03-28", verified: true },
  { id: "mp-026", material: "Emulsion Paint (20L, Dulux)", category: "Tiles & Finishing", unit: "bucket", price: 45000, city: "Lagos", state: "Lagos", vendor: "Dulux Paints Nigeria", reportedBy: "Bayo Coker", reportedAt: "2026-03-25", verified: true },

  // Timber
  { id: "mp-027", material: "2x4 Timber (Hardwood)", category: "Timber", unit: "length (12ft)", price: 2500, city: "Lagos", state: "Lagos", vendor: "Mushin Plank Market", reportedBy: "Dauda Mohammed", reportedAt: "2026-03-24", verified: true },
  { id: "mp-028", material: "Marine Plywood (18mm)", category: "Timber", unit: "sheet", price: 15000, city: "Lagos", state: "Lagos", vendor: "Mushin Plank Market", reportedBy: "Dauda Mohammed", reportedAt: "2026-03-24", verified: true },
];

// ── GET Handler ─────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const material = url.searchParams.get("material");
    const city = url.searchParams.get("city");
    const category = url.searchParams.get("category");
    const dateFrom = url.searchParams.get("dateFrom");
    const dateTo = url.searchParams.get("dateTo");

    let filtered = [...materialPrices];

    if (material) {
      const lowerMaterial = material.toLowerCase();
      filtered = filtered.filter((p) =>
        p.material.toLowerCase().includes(lowerMaterial)
      );
    }

    if (city) {
      const lowerCity = city.toLowerCase();
      filtered = filtered.filter((p) =>
        p.city.toLowerCase().includes(lowerCity)
      );
    }

    if (category) {
      const lowerCategory = category.toLowerCase();
      filtered = filtered.filter((p) =>
        p.category.toLowerCase().includes(lowerCategory)
      );
    }

    if (dateFrom) {
      filtered = filtered.filter((p) => p.reportedAt >= dateFrom);
    }

    if (dateTo) {
      filtered = filtered.filter((p) => p.reportedAt <= dateTo);
    }

    // Group by category for summary
    const categories = [...new Set(filtered.map((p) => p.category))];
    const summary = categories.map((cat) => {
      const catItems = filtered.filter((p) => p.category === cat);
      return {
        category: cat,
        itemCount: catItems.length,
        priceRange: {
          min: Math.min(...catItems.map((p) => p.price)),
          max: Math.max(...catItems.map((p) => p.price)),
        },
      };
    });

    return NextResponse.json({
      success: true,
      data: {
        prices: filtered,
        summary,
        totalResults: filtered.length,
        lastUpdated: "2026-03-28T14:30:00.000Z",
        disclaimer:
          "Prices are crowdsourced and may vary by vendor, quantity, and delivery location. All prices in Nigerian Naira (NGN). Verify with vendors before purchase.",
      },
    });
  } catch (error) {
    console.error("[Market Prices API] Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to fetch material prices" } },
      { status: 500 }
    );
  }
}

// ── POST Handler (Submit Price Report) ──────────────────────────────

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { material, category, unit, price, city, state, vendor, reportedBy } =
      body as {
        material?: string;
        category?: string;
        unit?: string;
        price?: number;
        city?: string;
        state?: string;
        vendor?: string;
        reportedBy?: string;
      };

    // Validation
    const errors: Record<string, string[]> = {};
    if (!material) errors.material = ["Material name is required"];
    if (!category) errors.category = ["Category is required"];
    if (!unit) errors.unit = ["Unit of measurement is required"];
    if (!price || price <= 0) errors.price = ["Price must be a positive number"];
    if (!city) errors.city = ["City is required"];
    if (!state) errors.state = ["State is required"];
    if (!reportedBy) errors.reportedBy = ["Reporter name is required"];

    if (Object.keys(errors).length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Validation failed",
            code: "VALIDATION_ERROR",
            details: errors,
          },
        },
        { status: 400 }
      );
    }

    const newPrice: MaterialPrice = {
      id: `mp-${String(materialPrices.length + 1).padStart(3, "0")}`,
      material: material!,
      category: category!,
      unit: unit!,
      price: price!,
      city: city!,
      state: state!,
      vendor: vendor || "Self-reported",
      reportedBy: reportedBy!,
      reportedAt: new Date().toISOString().split("T")[0],
      verified: false,
    };

    materialPrices.push(newPrice);

    return NextResponse.json(
      {
        success: true,
        data: {
          priceReport: newPrice,
          message:
            "Price report submitted successfully. It will be reviewed and verified by our team within 24 hours.",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("[Market Prices API] POST Error:", error);
    return NextResponse.json(
      { success: false, error: { message: "Failed to submit price report" } },
      { status: 500 }
    );
  }
}
