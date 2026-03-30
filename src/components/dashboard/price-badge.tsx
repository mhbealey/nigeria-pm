"use client";

import * as React from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn, formatNaira } from "@/lib/utils";

interface PriceBadgeProps {
  price: number;
  change: number;
  period: string;
}

function MiniSparkline({ positive }: { positive: boolean }) {
  const color = positive ? "#10b981" : "#ef4444";
  const points = positive
    ? "2,18 10,14 18,16 26,10 34,12 42,6 50,8 58,2"
    : "2,2 10,6 18,4 26,10 34,8 42,14 50,12 58,18";

  return (
    <svg
      width={60}
      height={20}
      viewBox="0 0 60 20"
      className="overflow-visible"
    >
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.6}
      />
    </svg>
  );
}

export function PriceBadge({ price, change, period }: PriceBadgeProps) {
  const isPositive = change >= 0;

  return (
    <div className="inline-flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
      <div className="min-w-0">
        <p className="text-lg font-bold text-gray-900">{formatNaira(price)}</p>
        <div className="mt-0.5 flex items-center gap-1">
          {isPositive ? (
            <TrendingUp className="h-3.5 w-3.5 text-green-600" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-red-500" />
          )}
          <span
            className={cn(
              "text-xs font-semibold",
              isPositive ? "text-green-600" : "text-red-500"
            )}
          >
            {isPositive ? "+" : ""}
            {change.toFixed(1)}%
          </span>
          <span className="text-xs text-gray-400">{period}</span>
        </div>
      </div>

      <MiniSparkline positive={isPositive} />
    </div>
  );
}
