"use client";

import * as React from "react";
import { MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface MapPlaceholderProps {
  location: string;
  height?: string;
}

export function MapPlaceholder({
  location,
  height = "200px",
}: MapPlaceholderProps) {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-lg border border-gray-200"
      )}
      style={{ height }}
    >
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0d9488 1px, transparent 1px), linear-gradient(to bottom, #0d9488 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-2 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 shadow-sm backdrop-blur-sm">
          <MapPin className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">{location}</p>
          <p className="mt-0.5 text-xs text-gray-500">
            Map view coming soon
          </p>
        </div>
      </div>
    </div>
  );
}
