"use client";

import * as React from "react";
import { ArrowUp, ArrowDown, type LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: number;
    trend: "up" | "down";
  };
  icon: LucideIcon;
  color?: string;
  sparklineData?: number[];
}

function MiniSparkline({
  data,
  color = "text-emerald-500",
}: {
  data: number[];
  color?: string;
}) {
  if (data.length < 2) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const width = 80;
  const height = 28;
  const padding = 2;

  const points = data
    .map((val, i) => {
      const x = padding + (i / (data.length - 1)) * (width - padding * 2);
      const y =
        height - padding - ((val - min) / range) * (height - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  // Derive stroke color from the text color class
  const strokeColor = color.includes("emerald")
    ? "#10b981"
    : color.includes("blue")
      ? "#3b82f6"
      : color.includes("amber")
        ? "#f59e0b"
        : color.includes("red")
          ? "#ef4444"
          : color.includes("purple")
            ? "#8b5cf6"
            : color.includes("teal")
              ? "#14b8a6"
              : color.includes("orange")
                ? "#f97316"
                : "#10b981";

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
    >
      <polyline
        points={points}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color = "text-emerald-600",
  sparklineData,
}: StatCardProps) {
  const bgColor = color.includes("emerald")
    ? "bg-emerald-50"
    : color.includes("blue")
      ? "bg-blue-50"
      : color.includes("amber")
        ? "bg-amber-50"
        : color.includes("red")
          ? "bg-red-50"
          : color.includes("purple")
            ? "bg-purple-50"
            : color.includes("teal")
              ? "bg-teal-50"
              : color.includes("orange")
                ? "bg-orange-50"
                : "bg-emerald-50";

  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="mt-1.5 text-2xl font-bold text-gray-900">{value}</p>

            {change && (
              <div className="mt-2 flex items-center gap-1">
                {change.trend === "up" ? (
                  <ArrowUp className="h-3.5 w-3.5 text-green-600" />
                ) : (
                  <ArrowDown className="h-3.5 w-3.5 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-xs font-semibold",
                    change.trend === "up" ? "text-green-600" : "text-red-500"
                  )}
                >
                  {change.value}%
                </span>
                <span className="text-xs text-gray-400">vs last month</span>
              </div>
            )}
          </div>

          <div className="flex flex-col items-end gap-2">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-lg",
                bgColor
              )}
            >
              <Icon className={cn("h-5 w-5", color)} />
            </div>

            {sparklineData && sparklineData.length >= 2 && (
              <MiniSparkline data={sparklineData} color={color} />
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
