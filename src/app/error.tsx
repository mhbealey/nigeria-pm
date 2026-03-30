"use client";

import React from "react";
import { AlertTriangle, RefreshCw, LayoutDashboard, Bug } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-lg">
        {/* Branding */}
        <div className="mb-6 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
            <span className="text-sm font-bold text-white">B</span>
          </div>
          <span className="text-lg font-bold text-gray-900">BuildNG</span>
        </div>

        {/* Error Card */}
        <Card className="border-red-200">
          <CardHeader className="text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
            <CardTitle className="text-xl">Something went wrong</CardTitle>
            <CardDescription>
              An unexpected error occurred while loading this page. Our team has
              been notified and is working on a fix.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Error Details */}
            <div className="rounded-lg bg-gray-50 p-4">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">
                Error Details
              </p>
              <p className="text-sm text-gray-700">
                {error.message || "An unknown error occurred."}
              </p>
              {error.digest && (
                <p className="mt-2 text-xs text-gray-400">
                  Error ID: {error.digest}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button onClick={reset} className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" />
                Try Again
              </Button>
              <Button variant="outline" className="flex-1" asChild>
                <a href="/dashboard">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Go to Dashboard
                </a>
              </Button>
            </div>

            {/* Report Issue */}
            <div className="text-center">
              <Button variant="ghost" size="sm" asChild>
                <a href="mailto:support@buildng.com?subject=Bug Report&body=Error: ${encodeURIComponent(error.message || 'Unknown error')}">
                  <Bug className="mr-1 h-3.5 w-3.5" />
                  Report this issue
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-gray-400">
          If this problem persists, please contact support at
          support@buildng.com or call +234 1 888 0000
        </p>
      </div>
    </div>
  );
}
