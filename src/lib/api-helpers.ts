import { NextResponse } from "next/server";

// ── Standard API Response Wrappers ───────────────────────────────────

interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  meta?: Record<string, unknown>;
}

interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: unknown;
  };
}

export function apiResponse<T>(
  data: T,
  status: number = 200,
  meta?: Record<string, unknown>
): NextResponse<ApiSuccessResponse<T>> {
  const body: ApiSuccessResponse<T> = { success: true, data };
  if (meta) body.meta = meta;
  return NextResponse.json(body, { status });
}

export function apiError(
  message: string,
  status: number = 400,
  code?: string,
  details?: unknown
): NextResponse<ApiErrorResponse> {
  const body: ApiErrorResponse = {
    success: false,
    error: { message },
  };
  if (code) body.error.code = code;
  if (details !== undefined) body.error.details = details;
  return NextResponse.json(body, { status });
}

// ── Search Params Parser ─────────────────────────────────────────────

export interface ParsedSearchParams {
  page: number;
  perPage: number;
  search: string;
  sortBy: string;
  sortOrder: "asc" | "desc";
  filters: Record<string, string>;
}

export function parseSearchParams(url: URL): ParsedSearchParams {
  const params = url.searchParams;

  const page = Math.max(1, parseInt(params.get("page") || "1", 10) || 1);
  const perPage = Math.min(
    100,
    Math.max(1, parseInt(params.get("perPage") || params.get("per_page") || "20", 10) || 20)
  );
  const search = (params.get("search") || params.get("q") || "").trim();
  const sortBy = params.get("sortBy") || params.get("sort_by") || "createdAt";
  const rawOrder = (params.get("sortOrder") || params.get("sort_order") || "desc").toLowerCase();
  const sortOrder: "asc" | "desc" = rawOrder === "asc" ? "asc" : "desc";

  // Collect all params that aren't pagination/sort/search into filters
  const reservedKeys = new Set([
    "page",
    "perPage",
    "per_page",
    "search",
    "q",
    "sortBy",
    "sort_by",
    "sortOrder",
    "sort_order",
  ]);

  const filters: Record<string, string> = {};
  params.forEach((value, key) => {
    if (!reservedKeys.has(key) && value.trim().length > 0) {
      filters[key] = value.trim();
    }
  });

  return { page, perPage, search, sortBy, sortOrder, filters };
}

// ── Client-Side Pagination Helper ────────────────────────────────────

export interface PaginatedResult<T> {
  items: T[];
  pagination: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export function paginate<T>(
  items: T[],
  page: number,
  perPage: number
): PaginatedResult<T> {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const startIndex = (safePage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    items: paginatedItems,
    pagination: {
      page: safePage,
      perPage,
      total,
      totalPages,
      hasNext: safePage < totalPages,
      hasPrev: safePage > 1,
    },
  };
}

// ── ID Generator ─────────────────────────────────────────────────────

export function generateId(prefix: string): string {
  const segment = (): string =>
    Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${segment()}-${segment()}`;
}

// ── Sorting Helper ───────────────────────────────────────────────────

export function sortItems<T extends Record<string, unknown>>(
  items: T[],
  sortBy: string,
  sortOrder: "asc" | "desc"
): T[] {
  return [...items].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];

    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    let comparison: number;
    if (typeof aVal === "string" && typeof bVal === "string") {
      comparison = aVal.localeCompare(bVal);
    } else if (typeof aVal === "number" && typeof bVal === "number") {
      comparison = aVal - bVal;
    } else {
      comparison = String(aVal).localeCompare(String(bVal));
    }

    return sortOrder === "desc" ? -comparison : comparison;
  });
}

// ── Filter Helper ────────────────────────────────────────────────────

export function filterItems<T extends Record<string, unknown>>(
  items: T[],
  search: string,
  searchableFields: (keyof T)[]
): T[] {
  if (!search) return items;

  const lowerSearch = search.toLowerCase();
  return items.filter((item) =>
    searchableFields.some((field) => {
      const value = item[field];
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowerSearch);
      }
      if (typeof value === "number") {
        return String(value).includes(lowerSearch);
      }
      return false;
    })
  );
}

// ── Rate Limit Helper (in-memory, for dev) ───────────────────────────

const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(
  key: string,
  maxRequests: number = 60,
  windowMs: number = 60_000
): { allowed: boolean; remaining: number; resetAt: number } {
  const now = Date.now();
  const entry = rateLimitStore.get(key);

  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });
    return { allowed: true, remaining: maxRequests - 1, resetAt };
  }

  entry.count += 1;
  const remaining = Math.max(0, maxRequests - entry.count);
  return {
    allowed: entry.count <= maxRequests,
    remaining,
    resetAt: entry.resetAt,
  };
}
