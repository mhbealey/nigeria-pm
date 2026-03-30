"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* BuildNG branding */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600">
          <span className="text-xl font-bold text-white">B</span>
        </div>

        {/* Error icon */}
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
          <AlertTriangle className="h-8 w-8 text-red-500" />
        </div>

        {/* Error message */}
        <h2 className="text-xl font-bold text-gray-900">
          Wahala dey o! Something went wrong
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          We encountered an unexpected error while loading your dashboard.
          No worry, your data is safe. Try refreshing or go back to the dashboard.
        </p>

        {error.message && (
          <div className="mt-4 rounded-lg border border-red-100 bg-red-50 px-4 py-3">
            <p className="text-xs font-mono text-red-700 break-all">
              {error.message}
            </p>
          </div>
        )}

        {error.digest && (
          <p className="mt-2 text-xs text-gray-400">
            Error ID: {error.digest}
          </p>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-colors hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <RefreshCw className="h-4 w-4" />
            Try again
          </button>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <Home className="h-4 w-4" />
            Go to Dashboard
          </Link>
        </div>

        {/* Support note */}
        <p className="mt-8 text-xs text-gray-400">
          If this keeps happening, contact BuildNG support at{" "}
          <a href="mailto:support@buildng.com" className="text-emerald-600 hover:underline">
            support@buildng.com
          </a>
        </p>
      </div>
    </div>
  );
}
