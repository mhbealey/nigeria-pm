interface ValidationResult {
  valid: boolean;
  errors: string[];
}

// ── Primitive Validators ──────────────────────────────────────────────

export function validateEmail(email: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof email !== "string" || email.trim().length === 0) {
    return { valid: false, errors: ["Email is required"] };
  }

  const trimmed = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(trimmed)) {
    errors.push("Please enter a valid email address");
  }

  if (trimmed.length > 254) {
    errors.push("Email address is too long");
  }

  return { valid: errors.length === 0, errors };
}

export function validatePhone(phone: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof phone !== "string" || phone.trim().length === 0) {
    return { valid: false, errors: ["Phone number is required"] };
  }

  const cleaned = phone.replace(/[\s\-()]/g, "");

  // Accept +234XXXXXXXXXX (13 chars) or 0XXXXXXXXXX (11 chars)
  const nigerianIntl = /^\+234[789]\d{9}$/;
  const nigerianLocal = /^0[789]\d{9}$/;

  if (!nigerianIntl.test(cleaned) && !nigerianLocal.test(cleaned)) {
    errors.push(
      "Please enter a valid Nigerian phone number (e.g., +2348012345678 or 08012345678)"
    );
  }

  return { valid: errors.length === 0, errors };
}

export function validateNIN(nin: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof nin !== "string" || nin.trim().length === 0) {
    return { valid: false, errors: ["NIN is required"] };
  }

  const cleaned = nin.replace(/\s/g, "");

  if (!/^\d{11}$/.test(cleaned)) {
    errors.push("NIN must be exactly 11 digits");
  }

  return { valid: errors.length === 0, errors };
}

export function validateAmount(amount: unknown): ValidationResult {
  const errors: string[] = [];

  if (amount === null || amount === undefined || amount === "") {
    return { valid: false, errors: ["Amount is required"] };
  }

  const num = typeof amount === "string" ? parseFloat(amount) : Number(amount);

  if (isNaN(num)) {
    errors.push("Amount must be a valid number");
  } else {
    if (num <= 0) {
      errors.push("Amount must be greater than zero");
    }
    if (num > 10_000_000_000) {
      errors.push("Amount exceeds maximum allowed (NGN 10,000,000,000)");
    }
    // Kobo precision: max 2 decimal places
    if (Math.round(num * 100) / 100 !== num) {
      errors.push("Amount cannot have more than 2 decimal places");
    }
  }

  return { valid: errors.length === 0, errors };
}

// ── String Helpers ────────────────────────────────────────────────────

function validateRequiredString(
  value: unknown,
  fieldName: string,
  minLength: number,
  maxLength: number
): string[] {
  const errors: string[] = [];

  if (typeof value !== "string" || value.trim().length === 0) {
    errors.push(`${fieldName} is required`);
    return errors;
  }

  if (value.trim().length < minLength) {
    errors.push(`${fieldName} must be at least ${minLength} characters`);
  }

  if (value.trim().length > maxLength) {
    errors.push(`${fieldName} must be no more than ${maxLength} characters`);
  }

  return errors;
}

function validateOptionalString(
  value: unknown,
  fieldName: string,
  maxLength: number
): string[] {
  if (value === null || value === undefined || value === "") return [];

  if (typeof value !== "string") {
    return [`${fieldName} must be a string`];
  }

  if (value.trim().length > maxLength) {
    return [`${fieldName} must be no more than ${maxLength} characters`];
  }

  return [];
}

// ── Nigerian States ───────────────────────────────────────────────────

const NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa",
  "Benue", "Borno", "Cross River", "Delta", "Ebonyi", "Edo",
  "Ekiti", "Enugu", "FCT", "Gombe", "Imo", "Jigawa",
  "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara",
  "Lagos", "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba", "Yobe", "Zamfara",
];

export function validateState(state: unknown): ValidationResult {
  const errors: string[] = [];

  if (typeof state !== "string" || state.trim().length === 0) {
    return { valid: false, errors: ["State is required"] };
  }

  if (!NIGERIAN_STATES.includes(state.trim())) {
    errors.push("Please select a valid Nigerian state");
  }

  return { valid: errors.length === 0, errors };
}

// ── Composite Validators ──────────────────────────────────────────────

interface EscrowProjectInput {
  title?: unknown;
  description?: unknown;
  totalAmount?: unknown;
  milestones?: unknown;
  clientEmail?: unknown;
  contractorEmail?: unknown;
  state?: unknown;
}

export function validateEscrowProject(data: EscrowProjectInput): ValidationResult {
  const errors: string[] = [];

  errors.push(...validateRequiredString(data.title, "Project title", 3, 200));
  errors.push(...validateRequiredString(data.description, "Description", 10, 5000));

  const amountResult = validateAmount(data.totalAmount);
  if (!amountResult.valid) errors.push(...amountResult.errors);

  const clientResult = validateEmail(data.clientEmail);
  if (!clientResult.valid) errors.push(...clientResult.errors.map((e) => `Client email: ${e}`));

  const contractorResult = validateEmail(data.contractorEmail);
  if (!contractorResult.valid) errors.push(...contractorResult.errors.map((e) => `Contractor email: ${e}`));

  if (data.state !== undefined && data.state !== null) {
    const stateResult = validateState(data.state);
    if (!stateResult.valid) errors.push(...stateResult.errors);
  }

  // Validate milestones array
  if (!Array.isArray(data.milestones)) {
    errors.push("At least one milestone is required");
  } else if (data.milestones.length === 0) {
    errors.push("At least one milestone is required");
  } else {
    let milestoneTotal = 0;
    data.milestones.forEach((milestone: Record<string, unknown>, index: number) => {
      const label = `Milestone ${index + 1}`;
      errors.push(...validateRequiredString(milestone.title, `${label} title`, 2, 200));

      const mAmountResult = validateAmount(milestone.amount);
      if (!mAmountResult.valid) {
        errors.push(...mAmountResult.errors.map((e) => `${label}: ${e}`));
      } else {
        milestoneTotal += Number(milestone.amount);
      }
    });

    // Milestone amounts should sum to total
    const total = Number(data.totalAmount);
    if (!isNaN(total) && !isNaN(milestoneTotal)) {
      if (Math.abs(milestoneTotal - total) > 0.01) {
        errors.push(
          `Milestone amounts (NGN ${milestoneTotal.toLocaleString()}) must equal total project amount (NGN ${total.toLocaleString()})`
        );
      }
    }
  }

  return { valid: errors.length === 0, errors };
}

interface MaterialReportInput {
  materialName?: unknown;
  quantity?: unknown;
  unit?: unknown;
  unitPrice?: unknown;
  vendor?: unknown;
  deliveryDate?: unknown;
  notes?: unknown;
  projectId?: unknown;
}

export function validateMaterialReport(data: MaterialReportInput): ValidationResult {
  const errors: string[] = [];

  errors.push(...validateRequiredString(data.materialName, "Material name", 2, 200));

  if (data.quantity === null || data.quantity === undefined || data.quantity === "") {
    errors.push("Quantity is required");
  } else {
    const qty = Number(data.quantity);
    if (isNaN(qty) || qty <= 0) {
      errors.push("Quantity must be a positive number");
    }
  }

  errors.push(...validateRequiredString(data.unit, "Unit", 1, 50));

  const priceResult = validateAmount(data.unitPrice);
  if (!priceResult.valid) errors.push(...priceResult.errors.map((e) => `Unit price: ${e}`));

  errors.push(...validateOptionalString(data.vendor, "Vendor", 200));
  errors.push(...validateOptionalString(data.notes, "Notes", 2000));

  if (typeof data.projectId !== "string" || data.projectId.trim().length === 0) {
    errors.push("Project ID is required");
  }

  if (data.deliveryDate !== undefined && data.deliveryDate !== null && data.deliveryDate !== "") {
    const date = new Date(data.deliveryDate as string);
    if (isNaN(date.getTime())) {
      errors.push("Delivery date must be a valid date");
    }
  }

  return { valid: errors.length === 0, errors };
}

interface InspectionInput {
  projectId?: unknown;
  scheduledDate?: unknown;
  inspectorNotes?: unknown;
  structuralScore?: unknown;
  electricalScore?: unknown;
  plumbingScore?: unknown;
  finishingScore?: unknown;
  overallRating?: unknown;
  passed?: unknown;
}

export function validateInspection(data: InspectionInput): ValidationResult {
  const errors: string[] = [];

  if (typeof data.projectId !== "string" || data.projectId.trim().length === 0) {
    errors.push("Project ID is required");
  }

  if (!data.scheduledDate) {
    errors.push("Scheduled date is required");
  } else {
    const date = new Date(data.scheduledDate as string);
    if (isNaN(date.getTime())) {
      errors.push("Scheduled date must be a valid date");
    }
  }

  errors.push(...validateOptionalString(data.inspectorNotes, "Inspector notes", 5000));

  // Score fields: 1-10
  const scoreFields: Array<[unknown, string]> = [
    [data.structuralScore, "Structural score"],
    [data.electricalScore, "Electrical score"],
    [data.plumbingScore, "Plumbing score"],
    [data.finishingScore, "Finishing score"],
  ];

  for (const [score, name] of scoreFields) {
    if (score !== undefined && score !== null && score !== "") {
      const num = Number(score);
      if (isNaN(num) || !Number.isInteger(num) || num < 1 || num > 10) {
        errors.push(`${name} must be an integer between 1 and 10`);
      }
    }
  }

  if (data.overallRating !== undefined && data.overallRating !== null && data.overallRating !== "") {
    const rating = Number(data.overallRating);
    if (isNaN(rating) || !Number.isInteger(rating) || rating < 1 || rating > 10) {
      errors.push("Overall rating must be an integer between 1 and 10");
    }
  }

  if (data.passed !== undefined && typeof data.passed !== "boolean") {
    errors.push("Passed must be true or false");
  }

  return { valid: errors.length === 0, errors };
}

interface DefectReportInput {
  projectId?: unknown;
  title?: unknown;
  description?: unknown;
  severity?: unknown;
  location?: unknown;
  photoUrls?: unknown;
}

export function validateDefectReport(data: DefectReportInput): ValidationResult {
  const errors: string[] = [];

  if (typeof data.projectId !== "string" || data.projectId.trim().length === 0) {
    errors.push("Project ID is required");
  }

  errors.push(...validateRequiredString(data.title, "Defect title", 3, 200));
  errors.push(...validateRequiredString(data.description, "Description", 10, 5000));

  const validSeverities = ["LOW", "MEDIUM", "HIGH", "CRITICAL"];
  if (typeof data.severity !== "string" || !validSeverities.includes(data.severity)) {
    errors.push(`Severity must be one of: ${validSeverities.join(", ")}`);
  }

  errors.push(...validateRequiredString(data.location, "Location", 2, 500));

  if (data.photoUrls !== undefined && data.photoUrls !== null) {
    if (!Array.isArray(data.photoUrls)) {
      errors.push("Photo URLs must be an array");
    } else if (data.photoUrls.length > 20) {
      errors.push("Maximum of 20 photos allowed per defect report");
    } else {
      data.photoUrls.forEach((url: unknown, index: number) => {
        if (typeof url !== "string" || url.trim().length === 0) {
          errors.push(`Photo URL at position ${index + 1} is invalid`);
        }
      });
    }
  }

  return { valid: errors.length === 0, errors };
}
