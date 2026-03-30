"use client";

import React, { useState } from "react";
import { HardHat, Home, LayoutDashboard, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/dashboard/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md text-center">
        {/* Construction Icon */}
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-amber-50">
          <HardHat className="h-12 w-12 text-amber-500" />
        </div>

        {/* Branding */}
        <div className="mb-2 flex items-center justify-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
            <span className="text-sm font-bold text-white">B</span>
          </div>
          <span className="text-lg font-bold text-gray-900">BuildNG</span>
        </div>

        {/* Error Message */}
        <h1 className="mt-4 text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-2 text-xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        <p className="mt-2 text-gray-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          It might be under construction.
        </p>

        {/* Search Bar */}
        <Card className="mt-8">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search BuildNG..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-9 pr-20"
              />
              <Button
                size="sm"
                onClick={handleSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                Search
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <a href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Go to Dashboard
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a href="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </a>
          </Button>
        </div>

        {/* Footer */}
        <p className="mt-8 text-xs text-gray-400">
          If you believe this is an error, please contact support at
          support@buildng.com
        </p>
      </div>
    </div>
  );
}
