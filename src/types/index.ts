// BuildNG - Nigerian Construction PM Platform
// Frontend TypeScript Types

// Dashboard stats
export interface StatCard {
  title: string;
  value: string;
  change?: { value: number; trend: "up" | "down" };
  icon: string;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  pagination?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

// User types
export type UserRole =
  | "CLIENT"
  | "CONTRACTOR"
  | "ENGINEER"
  | "DEVELOPER"
  | "ESTATE_MANAGER"
  | "ARTISAN"
  | "ADMIN";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  state?: string;
  city?: string;
  company?: string;
  avatar?: string;
  ninVerified: boolean;
}

// Escrow
export type EscrowStatus =
  | "DRAFT"
  | "FUNDED"
  | "ACTIVE"
  | "COMPLETED"
  | "DISPUTED"
  | "CANCELLED";

export type MilestoneStatus =
  | "PENDING"
  | "IN_PROGRESS"
  | "SUBMITTED"
  | "VERIFIED"
  | "RELEASED"
  | "DISPUTED";

export interface EscrowProject {
  id: string;
  reference: string;
  title: string;
  client: User;
  contractor: User;
  engineer?: User;
  totalAmountKobo: number;
  releasedAmountKobo: number;
  status: EscrowStatus;
  milestones: Milestone[];
  state: string;
  city: string;
  createdAt: string;
}

export interface Milestone {
  id: string;
  name: string;
  amountKobo: number;
  status: MilestoneStatus;
  orderIndex: number;
  verifiedAt?: string;
  verifiedBy?: User;
}

// Materials
export type MaterialCategory =
  | "CEMENT"
  | "STEEL"
  | "SAND"
  | "GRANITE"
  | "BLOCKS"
  | "ROOFING"
  | "TILES"
  | "PAINT"
  | "PLUMBING"
  | "ELECTRICAL"
  | "DOORS_WINDOWS"
  | "FINISHING";

export interface Material {
  id: string;
  name: string;
  brand: string;
  category: MaterialCategory;
  unit: string;
}

export interface MaterialPrice {
  id: string;
  material: Material;
  priceKobo: number;
  city: string;
  state: string;
  supplier: string;
  changePercent: number;
  updatedAt: string;
}

export interface GroupOrder {
  id: string;
  material: Material;
  targetQuantity: number;
  currentQuantity: number;
  unitPriceKobo: number;
  savingsPercent: number;
  deadline: string;
  participantCount: number;
  status: string;
}

// Quality
export type InspectionStage =
  | "FOUNDATION"
  | "SUBSTRUCTURE"
  | "DPC_LEVEL"
  | "BLOCK_WORK"
  | "LINTEL_ROOFING"
  | "MEP_ROUGHIN"
  | "FINISHING"
  | "HANDOVER";

export interface QualityProject {
  id: string;
  reference: string;
  title: string;
  address: string;
  client: User;
  engineer: User;
  overallScore: number;
  certified: boolean;
  stages: InspectionStageData[];
}

export interface InspectionStageData {
  stage: InspectionStage;
  status: string;
  score?: number;
  date?: string;
  engineer?: string;
}

// Estates
export type UnitStatus =
  | "NOT_STARTED"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "DELAYED"
  | "ON_HOLD";

export interface Estate {
  id: string;
  name: string;
  address: string;
  totalUnits: number;
  developer: User;
  totalValueKobo: number;
  completionPercent: number;
  units: EstateUnit[];
}

export interface EstateUnit {
  id: string;
  unitNumber: string;
  type: string;
  status: UnitStatus;
  progressPercent: number;
  budgetKobo: number;
  actualSpendKobo: number;
  buyerName?: string;
  paymentStatus: string;
}

// Artisans
export interface Artisan {
  id: string;
  name: string;
  primarySkill: string;
  skills: string[];
  yearsExperience: number;
  dailyRateKobo: number;
  rating: number;
  totalReviews: number;
  location: string;
  state: string;
  city: string;
  available: boolean;
  ninVerified: boolean;
}

export interface JobPost {
  id: string;
  title: string;
  skill: string;
  location: string;
  dailyRateKobo: number;
  durationDays: number;
  workersNeeded: number;
  applicantCount: number;
  status: string;
  postedAt: string;
}

// Permits
export type PermitType =
  | "BUILDING_PLAN"
  | "DEVELOPMENT"
  | "ENVIRONMENTAL"
  | "FIRE_SAFETY"
  | "CERTIFICATE_OF_OCCUPANCY";

export type PermitStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "DOCUMENTS_REQUESTED"
  | "INSPECTION_SCHEDULED"
  | "APPROVED"
  | "REJECTED";

export interface PermitApplication {
  id: string;
  reference: string;
  title: string;
  type: PermitType;
  regulatoryBody: string;
  status: PermitStatus;
  currentStep: number;
  totalSteps: number;
  totalFeeKobo: number;
  paidFeeKobo: number;
  submittedAt: string;
}

// Defects
export type DefectPriority = "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";

export type DefectCategory =
  | "ROOFING"
  | "PLUMBING"
  | "ELECTRICAL"
  | "STRUCTURAL"
  | "FINISHING"
  | "MEP";

export interface DefectReport {
  id: string;
  reference: string;
  title: string;
  property: string;
  unit: string;
  category: DefectCategory;
  priority: DefectPriority;
  status: string;
  reportedBy: string;
  assignedTo?: string;
  daysOpen: number;
  createdAt: string;
}

export interface WarrantyItem {
  component: string;
  warrantyYears: number;
  startDate: string;
  expiryDate: string;
  daysRemaining: number;
  status: string;
}

// Chart data
export interface ChartDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

// Filters
export interface FilterOptions {
  search?: string;
  status?: string;
  state?: string;
  city?: string;
  category?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  perPage?: number;
}

// Notifications
export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  createdAt: string;
  link?: string;
}

// Activity feed
export interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  timestamp: string;
  icon: string;
  color: string;
}
