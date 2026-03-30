import { NextResponse } from "next/server";

// ── Standard API Response Wrappers ───────────────────────────────────

interface ApiSuccessResponse<T = unknown> {
  success: true;
  data: T;
  meta?: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
}

interface ApiErrorResponse {
  success: false;
  error: {
    message: string;
    code?: string;
    details?: Record<string, string[]>;
  };
}

export function apiResponse<T>(
  data: T,
  status: number = 200,
  meta?: ApiSuccessResponse["meta"]
): NextResponse<ApiSuccessResponse<T>> {
  const body: ApiSuccessResponse<T> = { success: true, data };
  if (meta) {
    body.meta = meta;
  }
  return NextResponse.json(body, { status });
}

export function apiError(
  message: string,
  status: number = 400,
  details?: Record<string, string[]>,
  code?: string
): NextResponse<ApiErrorResponse> {
  const body: ApiErrorResponse = {
    success: false,
    error: { message },
  };
  if (code) body.error.code = code;
  if (details) body.error.details = details;
  return NextResponse.json(body, { status });
}

// ── Search Params Parser ─────────────────────────────────────────────

export interface ParsedSearchParams {
  page: number;
  perPage: number;
  sort: string;
  order: "asc" | "desc";
  search: string;
  filters: Record<string, string>;
}

export function parseSearchParams(url: URL): ParsedSearchParams {
  const params = url.searchParams;

  const page = Math.max(1, parseInt(params.get("page") || "1", 10) || 1);
  const perPage = Math.min(
    100,
    Math.max(1, parseInt(params.get("perPage") || params.get("per_page") || "20", 10) || 20)
  );
  const sort = params.get("sort") || "createdAt";
  const rawOrder = (params.get("order") || "desc").toLowerCase();
  const order: "asc" | "desc" = rawOrder === "asc" ? "asc" : "desc";
  const search = (params.get("search") || params.get("q") || "").trim();

  // Collect all params that are not reserved pagination/sort keys
  const reservedKeys = new Set([
    "page",
    "perPage",
    "per_page",
    "sort",
    "order",
    "search",
    "q",
  ]);
  const filters: Record<string, string> = {};
  params.forEach((value, key) => {
    if (!reservedKeys.has(key)) {
      filters[key] = value;
    }
  });

  return { page, perPage, sort, order, search, filters };
}

// ── Client-Side Pagination Helper ────────────────────────────────────

export interface PaginatedResult<T> {
  items: T[];
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

export function paginate<T>(
  items: T[],
  page: number,
  perPage: number
): PaginatedResult<T> {
  const safePage = Math.max(1, page);
  const safePerPage = Math.max(1, Math.min(100, perPage));
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / safePerPage));
  const clampedPage = Math.min(safePage, totalPages);
  const startIndex = (clampedPage - 1) * safePerPage;
  const paginatedItems = items.slice(startIndex, startIndex + safePerPage);

  return {
    items: paginatedItems,
    page: clampedPage,
    perPage: safePerPage,
    total,
    totalPages,
  };
}

// ── ID Generator ─────────────────────────────────────────────────────

export function generateId(prefix: string): string {
  const chars = "0123456789abcdef";
  const segment = (): string => {
    let result = "";
    for (let i = 0; i < 4; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    return result;
  };
  return `${prefix}-${segment()}-${segment()}`;
}

// ── Sort Helper ──────────────────────────────────────────────────────

export function sortItems<T>(
  items: T[],
  sortKey: string,
  order: "asc" | "desc"
): T[] {
  return [...items].sort((a, b) => {
    const aVal = (a as Record<string, unknown>)[sortKey];
    const bVal = (b as Record<string, unknown>)[sortKey];

    if (aVal === bVal) return 0;
    if (aVal === null || aVal === undefined) return 1;
    if (bVal === null || bVal === undefined) return -1;

    let comparison: number;
    if (typeof aVal === "string" && typeof bVal === "string") {
      comparison = aVal.localeCompare(bVal);
    } else if (typeof aVal === "number" && typeof bVal === "number") {
      comparison = aVal - bVal;
    } else if (aVal instanceof Date && bVal instanceof Date) {
      comparison = aVal.getTime() - bVal.getTime();
    } else {
      comparison = String(aVal).localeCompare(String(bVal));
    }

    return order === "asc" ? comparison : -comparison;
  });
}

// ── Filter Helper ────────────────────────────────────────────────────

export function filterItems<T>(
  items: T[],
  search: string,
  searchableKeys: (keyof T)[]
): T[] {
  if (!search) return items;
  const lowerSearch = search.toLowerCase();
  return items.filter((item) =>
    searchableKeys.some((key) => {
      const value = item[key];
      if (typeof value === "string") {
        return value.toLowerCase().includes(lowerSearch);
      }
      if (typeof value === "number") {
        return value.toString().includes(lowerSearch);
      }
      return false;
    })
  );
}
