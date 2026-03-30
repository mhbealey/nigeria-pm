// Nigerian Banks (Paystack/Flutterwave compatible codes)
export const NIGERIAN_BANKS = [
  { code: "044", name: "Access Bank", slug: "access-bank" },
  { code: "023", name: "Citibank Nigeria", slug: "citibank" },
  { code: "063", name: "Diamond Bank (Access)", slug: "diamond-bank" },
  { code: "050", name: "Ecobank Nigeria", slug: "ecobank" },
  { code: "070", name: "Fidelity Bank", slug: "fidelity-bank" },
  { code: "011", name: "First Bank of Nigeria", slug: "first-bank" },
  { code: "214", name: "First City Monument Bank", slug: "fcmb" },
  { code: "058", name: "Guaranty Trust Bank", slug: "gtbank" },
  { code: "030", name: "Heritage Bank", slug: "heritage-bank" },
  { code: "301", name: "Jaiz Bank", slug: "jaiz-bank" },
  { code: "082", name: "Keystone Bank", slug: "keystone-bank" },
  { code: "526", name: "Parallex Bank", slug: "parallex-bank" },
  { code: "076", name: "Polaris Bank", slug: "polaris-bank" },
  { code: "101", name: "Providus Bank", slug: "providus-bank" },
  { code: "221", name: "Stanbic IBTC Bank", slug: "stanbic-ibtc" },
  { code: "068", name: "Standard Chartered", slug: "standard-chartered" },
  { code: "232", name: "Sterling Bank", slug: "sterling-bank" },
  { code: "100", name: "SunTrust Bank", slug: "suntrust-bank" },
  { code: "032", name: "Union Bank of Nigeria", slug: "union-bank" },
  { code: "033", name: "United Bank for Africa", slug: "uba" },
  { code: "215", name: "Unity Bank", slug: "unity-bank" },
  { code: "035", name: "Wema Bank", slug: "wema-bank" },
  { code: "057", name: "Zenith Bank", slug: "zenith-bank" },
  { code: "105", name: "Globus Bank", slug: "globus-bank" },
  { code: "103", name: "Lotus Bank", slug: "lotus-bank" },
  { code: "107", name: "Optimus Bank", slug: "optimus-bank" },
  { code: "108", name: "Premium Trust Bank", slug: "premium-trust" },
  { code: "109", name: "Signature Bank", slug: "signature-bank" },
  { code: "110", name: "Titan Trust Bank", slug: "titan-trust" },
  { code: "999992", name: "OPay", slug: "opay" },
  { code: "999991", name: "PalmPay", slug: "palmpay" },
  { code: "999993", name: "Moniepoint MFB", slug: "moniepoint" },
  { code: "090267", name: "Kuda Bank", slug: "kuda-bank" },
] as const;

// Construction Materials with realistic 2024/2025 Nigerian prices (in kobo)
export const CONSTRUCTION_MATERIALS = [
  // Cement
  { name: "Dangote Cement 50kg", brand: "Dangote", category: "cement", unit: "bag", avgPriceKobo: 650000, minPriceKobo: 580000, maxPriceKobo: 720000 },
  { name: "BUA Cement 50kg", brand: "BUA", category: "cement", unit: "bag", avgPriceKobo: 620000, minPriceKobo: 550000, maxPriceKobo: 680000 },
  { name: "Lafarge Cement 50kg", brand: "Lafarge", category: "cement", unit: "bag", avgPriceKobo: 640000, minPriceKobo: 570000, maxPriceKobo: 700000 },
  // Steel/Iron
  { name: "12mm Rebar", brand: "Various", category: "steel", unit: "ton", avgPriceKobo: 35000000, minPriceKobo: 32000000, maxPriceKobo: 38000000 },
  { name: "16mm Rebar", brand: "Various", category: "steel", unit: "ton", avgPriceKobo: 37000000, minPriceKobo: 34000000, maxPriceKobo: 40000000 },
  { name: "10mm Rebar", brand: "Various", category: "steel", unit: "ton", avgPriceKobo: 34000000, minPriceKobo: 31000000, maxPriceKobo: 37000000 },
  { name: "Binding Wire", brand: "Various", category: "steel", unit: "roll", avgPriceKobo: 2500000, minPriceKobo: 2200000, maxPriceKobo: 2800000 },
  // Sand
  { name: "Sharp Sand", brand: "N/A", category: "sand", unit: "trip (5 tons)", avgPriceKobo: 5500000, minPriceKobo: 4500000, maxPriceKobo: 6500000 },
  { name: "Plaster Sand", brand: "N/A", category: "sand", unit: "trip (5 tons)", avgPriceKobo: 4500000, minPriceKobo: 3500000, maxPriceKobo: 5500000 },
  // Granite
  { name: "Granite (3/4 inch)", brand: "N/A", category: "granite", unit: "trip (10 tons)", avgPriceKobo: 14000000, minPriceKobo: 12000000, maxPriceKobo: 16000000 },
  { name: "Granite (1 inch)", brand: "N/A", category: "granite", unit: "trip (10 tons)", avgPriceKobo: 13000000, minPriceKobo: 11000000, maxPriceKobo: 15000000 },
  // Blocks
  { name: "6-inch Sandcrete Block", brand: "Various", category: "blocks", unit: "piece", avgPriceKobo: 35000, minPriceKobo: 30000, maxPriceKobo: 45000 },
  { name: "9-inch Sandcrete Block", brand: "Various", category: "blocks", unit: "piece", avgPriceKobo: 50000, minPriceKobo: 45000, maxPriceKobo: 60000 },
  // Roofing
  { name: "0.45mm Longspan Roofing Sheet", brand: "Various", category: "roofing", unit: "sheet (3.6m)", avgPriceKobo: 450000, minPriceKobo: 400000, maxPriceKobo: 550000 },
  { name: "0.55mm Longspan Roofing Sheet", brand: "Various", category: "roofing", unit: "sheet (3.6m)", avgPriceKobo: 600000, minPriceKobo: 520000, maxPriceKobo: 680000 },
  { name: "Stone Coated Roofing Sheet", brand: "Tilcor/Docherich", category: "roofing", unit: "piece", avgPriceKobo: 450000, minPriceKobo: 350000, maxPriceKobo: 600000 },
  // Tiles
  { name: "60x60 Floor Tiles (Grade A)", brand: "Various", category: "tiles", unit: "carton (4pcs)", avgPriceKobo: 1200000, minPriceKobo: 800000, maxPriceKobo: 1500000 },
  { name: "30x60 Wall Tiles", brand: "Various", category: "tiles", unit: "carton (8pcs)", avgPriceKobo: 600000, minPriceKobo: 400000, maxPriceKobo: 900000 },
  { name: "Spanish Porcelain Tiles 60x60", brand: "Imported", category: "tiles", unit: "carton (4pcs)", avgPriceKobo: 2500000, minPriceKobo: 1800000, maxPriceKobo: 4000000 },
  // Paint
  { name: "Emulsion Paint (20L)", brand: "Dulux", category: "paint", unit: "bucket", avgPriceKobo: 3500000, minPriceKobo: 3000000, maxPriceKobo: 4500000 },
  { name: "Emulsion Paint (20L)", brand: "Berger", category: "paint", unit: "bucket", avgPriceKobo: 2800000, minPriceKobo: 2500000, maxPriceKobo: 3500000 },
  { name: "Gloss Paint (4L)", brand: "Dulux", category: "paint", unit: "tin", avgPriceKobo: 1200000, minPriceKobo: 1000000, maxPriceKobo: 1500000 },
  // Plumbing
  { name: "PPR Pipe 1 inch (4m)", brand: "Various", category: "plumbing", unit: "length", avgPriceKobo: 350000, minPriceKobo: 280000, maxPriceKobo: 450000 },
  { name: "PVC Pipe 4 inch (6m)", brand: "Various", category: "plumbing", unit: "length", avgPriceKobo: 800000, minPriceKobo: 650000, maxPriceKobo: 950000 },
  { name: "Water Closet (Complete Set)", brand: "Twyford", category: "plumbing", unit: "set", avgPriceKobo: 4500000, minPriceKobo: 2500000, maxPriceKobo: 8000000 },
  // Electrical
  { name: "2.5mm Single Cable (100m)", brand: "Cutix/Coleman", category: "electrical", unit: "roll", avgPriceKobo: 4500000, minPriceKobo: 3800000, maxPriceKobo: 5500000 },
  { name: "4mm Single Cable (100m)", brand: "Cutix/Coleman", category: "electrical", unit: "roll", avgPriceKobo: 7000000, minPriceKobo: 6000000, maxPriceKobo: 8500000 },
  { name: "Distribution Board 12-way", brand: "Schneider", category: "electrical", unit: "piece", avgPriceKobo: 2500000, minPriceKobo: 1800000, maxPriceKobo: 3500000 },
  // Doors & Windows
  { name: "Steel Security Door", brand: "Various", category: "doors_windows", unit: "piece", avgPriceKobo: 12000000, minPriceKobo: 8000000, maxPriceKobo: 25000000 },
  { name: "Internal Flush Door", brand: "Various", category: "doors_windows", unit: "piece", avgPriceKobo: 3500000, minPriceKobo: 2500000, maxPriceKobo: 6000000 },
  { name: "Aluminium Sliding Window (1.2x1.2m)", brand: "Various", category: "doors_windows", unit: "piece", avgPriceKobo: 4500000, minPriceKobo: 3000000, maxPriceKobo: 7000000 },
  // Finishing
  { name: "POP Cement (40kg)", brand: "Various", category: "finishing", unit: "bag", avgPriceKobo: 500000, minPriceKobo: 400000, maxPriceKobo: 650000 },
  { name: "Tile Gum (25kg)", brand: "Various", category: "finishing", unit: "bag", avgPriceKobo: 350000, minPriceKobo: 250000, maxPriceKobo: 450000 },
  { name: "Waterproof Cement (25kg)", brand: "Sika/Fosroc", category: "finishing", unit: "bag", avgPriceKobo: 800000, minPriceKobo: 600000, maxPriceKobo: 1200000 },
] as const;

// Regulatory Bodies per State
export const REGULATORY_BODIES = [
  {
    state: "Lagos",
    name: "Lagos State Building Control Agency",
    acronym: "LASBCA",
    permitTypes: ["Building Plan Approval", "Development Permit", "Renovation Permit", "Demolition Permit"],
    avgProcessingDays: 45,
    contact: "+234 1 279 2000",
  },
  {
    state: "FCT Abuja",
    name: "Federal Capital Development Authority",
    acronym: "FCDA",
    permitTypes: ["Building Plan Approval", "Development Permit", "Foundation Permit", "C of O Application"],
    avgProcessingDays: 60,
    contact: "+234 9 234 5678",
  },
  {
    state: "Rivers",
    name: "Rivers State Physical Planning & Development Authority",
    acronym: "RSPPDA",
    permitTypes: ["Building Plan Approval", "Development Permit", "Environmental Clearance"],
    avgProcessingDays: 35,
    contact: "+234 84 230 000",
  },
  {
    state: "Ogun",
    name: "Ogun State Physical Planning Board",
    acronym: "OSPPB",
    permitTypes: ["Building Plan Approval", "Development Permit"],
    avgProcessingDays: 30,
    contact: "+234 39 240 000",
  },
  {
    state: "Oyo",
    name: "Oyo State Town Planning Authority",
    acronym: "OSTPA",
    permitTypes: ["Building Plan Approval", "Development Permit"],
    avgProcessingDays: 28,
    contact: "+234 2 810 0000",
  },
] as const;

// Construction cost per square meter by city and finish level (in kobo)
export const COST_PER_SQM: Record<string, Record<string, number>> = {
  Lagos: {
    basic: 18000000,    // ₦180,000/sqm
    standard: 25000000, // ₦250,000/sqm
    premium: 40000000,  // ₦400,000/sqm
    luxury: 65000000,   // ₦650,000/sqm
  },
  "FCT Abuja": {
    basic: 16500000,
    standard: 23000000,
    premium: 37000000,
    luxury: 55000000,
  },
  "Port Harcourt": {
    basic: 14500000,
    standard: 20000000,
    premium: 32000000,
    luxury: 48000000,
  },
  Ibadan: {
    basic: 12000000,
    standard: 17000000,
    premium: 28000000,
    luxury: 42000000,
  },
  Kano: {
    basic: 11000000,
    standard: 16000000,
    premium: 26000000,
    luxury: 38000000,
  },
  Enugu: {
    basic: 13000000,
    standard: 18000000,
    premium: 30000000,
    luxury: 45000000,
  },
};

// Nigerian Public Holidays (affecting construction schedules)
export const NIGERIAN_HOLIDAYS_2025 = [
  { date: "2025-01-01", name: "New Year's Day" },
  { date: "2025-03-30", name: "Eid el-Fitr (estimated)" },
  { date: "2025-03-31", name: "Eid el-Fitr Holiday" },
  { date: "2025-04-18", name: "Good Friday" },
  { date: "2025-04-21", name: "Easter Monday" },
  { date: "2025-05-01", name: "Workers' Day" },
  { date: "2025-05-27", name: "Children's Day" },
  { date: "2025-06-06", name: "Eid el-Kabir (estimated)" },
  { date: "2025-06-07", name: "Eid el-Kabir Holiday" },
  { date: "2025-06-12", name: "Democracy Day" },
  { date: "2025-09-05", name: "Eid el-Maulud (estimated)" },
  { date: "2025-10-01", name: "Independence Day" },
  { date: "2025-12-25", name: "Christmas Day" },
  { date: "2025-12-26", name: "Boxing Day" },
] as const;

// Rainy season periods by region (affects construction timelines)
export const RAINY_SEASONS = {
  south: { start: "April", end: "October", peak: "June-July", note: "Short break in August (August Break)" },
  north: { start: "June", end: "September", peak: "July-August", note: "Shorter but more intense" },
  lagos: { start: "March", end: "November", peak: "June-July", note: "Two peaks: June-July and September-October" },
} as const;
