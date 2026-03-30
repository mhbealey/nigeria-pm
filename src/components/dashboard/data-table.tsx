"use client";

import * as React from "react";
import {
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  Search,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export interface ColumnDef<T> {
  key: string;
  header: string;
  sortable?: boolean;
  render?: (row: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  searchableFields?: string[];
  pageSize?: number;
  searchPlaceholder?: string;
  emptyMessage?: string;
}

type SortDirection = "asc" | "desc" | null;

function getNestedValue(obj: unknown, path: string): unknown {
  return path.split(".").reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === "object" && part in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, obj);
}

export function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  searchableFields = [],
  pageSize = 10,
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
}: DataTableProps<T>) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [sortKey, setSortKey] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<SortDirection>(null);
  const [currentPage, setCurrentPage] = React.useState(1);

  // Filter data based on search query
  const filteredData = React.useMemo(() => {
    if (!searchQuery.trim() || searchableFields.length === 0) {
      return data;
    }
    const query = searchQuery.toLowerCase();
    return data.filter((row) =>
      searchableFields.some((field) => {
        const value = getNestedValue(row, field);
        return value != null && String(value).toLowerCase().includes(query);
      })
    );
  }, [data, searchQuery, searchableFields]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortKey || !sortDirection) {
      return filteredData;
    }
    return [...filteredData].sort((a, b) => {
      const aVal = getNestedValue(a, sortKey);
      const bVal = getNestedValue(b, sortKey);

      if (aVal == null && bVal == null) return 0;
      if (aVal == null) return 1;
      if (bVal == null) return -1;

      let comparison = 0;
      if (typeof aVal === "number" && typeof bVal === "number") {
        comparison = aVal - bVal;
      } else {
        comparison = String(aVal).localeCompare(String(bVal));
      }

      return sortDirection === "desc" ? -comparison : comparison;
    });
  }, [filteredData, sortKey, sortDirection]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedData.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const paginatedData = React.useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, safeCurrentPage, pageSize]);

  // Reset to page 1 when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortDirection === "asc") {
        setSortDirection("desc");
      } else if (sortDirection === "desc") {
        setSortKey(null);
        setSortDirection(null);
      }
    } else {
      setSortKey(key);
      setSortDirection("asc");
    }
  };

  const getSortIcon = (key: string) => {
    if (sortKey !== key) {
      return <ArrowUpDown className="ml-1 h-3.5 w-3.5 text-gray-400" />;
    }
    if (sortDirection === "asc") {
      return <ArrowUp className="ml-1 h-3.5 w-3.5 text-emerald-600" />;
    }
    return <ArrowDown className="ml-1 h-3.5 w-3.5 text-emerald-600" />;
  };

  const startItem = sortedData.length === 0 ? 0 : (safeCurrentPage - 1) * pageSize + 1;
  const endItem = Math.min(safeCurrentPage * pageSize, sortedData.length);

  return (
    <div className="space-y-4">
      {/* Search */}
      {searchableFields.length > 0 && (
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      )}

      {/* Table */}
      <div className="rounded-lg border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/80">
              {columns.map((col) => (
                <TableHead key={col.key} className={cn(col.className)}>
                  {col.sortable ? (
                    <button
                      onClick={() => handleSort(col.key)}
                      className="inline-flex items-center font-medium hover:text-gray-900"
                    >
                      {col.header}
                      {getSortIcon(col.key)}
                    </button>
                  ) : (
                    col.header
                  )}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="py-12 text-center text-sm text-gray-500"
                >
                  {emptyMessage}
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col) => (
                    <TableCell key={col.key} className={cn(col.className)}>
                      {col.render
                        ? col.render(row)
                        : String(getNestedValue(row, col.key) ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {sortedData.length > pageSize && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {startItem}-{endItem} of {sortedData.length} results
          </p>
          <div className="flex items-center gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={safeCurrentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                if (totalPages <= 7) return true;
                if (page === 1 || page === totalPages) return true;
                if (
                  page >= safeCurrentPage - 1 &&
                  page <= safeCurrentPage + 1
                )
                  return true;
                return false;
              })
              .reduce<(number | "ellipsis")[]>((acc, page, i, arr) => {
                if (i > 0 && arr[i - 1] !== undefined && page - (arr[i - 1] as number) > 1) {
                  acc.push("ellipsis");
                }
                acc.push(page);
                return acc;
              }, [])
              .map((item, i) =>
                item === "ellipsis" ? (
                  <span
                    key={`ellipsis-${i}`}
                    className="px-2 text-sm text-gray-400"
                  >
                    ...
                  </span>
                ) : (
                  <Button
                    key={item}
                    variant={safeCurrentPage === item ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(item)}
                    className="min-w-[36px]"
                  >
                    {item}
                  </Button>
                )
              )}

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((p) => Math.min(totalPages, p + 1))
              }
              disabled={safeCurrentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
