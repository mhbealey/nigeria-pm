"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  count?: number;
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: { star: "h-3.5 w-3.5", text: "text-xs", gap: "gap-0.5" },
  md: { star: "h-5 w-5", text: "text-sm", gap: "gap-1" },
  lg: { star: "h-6 w-6", text: "text-base", gap: "gap-1" },
};

export function RatingStars({ rating, count, size = "md" }: RatingStarsProps) {
  const config = sizeConfig[size];
  const clampedRating = Math.max(0, Math.min(5, rating));

  const stars = Array.from({ length: 5 }, (_, i) => {
    const starIndex = i + 1;
    if (clampedRating >= starIndex) return "full";
    if (clampedRating >= starIndex - 0.5) return "half";
    return "empty";
  });

  return (
    <div className={cn("inline-flex items-center", config.gap)}>
      <div className={cn("flex items-center", config.gap)}>
        {stars.map((type, i) => (
          <span key={i} className="relative inline-block">
            {type === "full" && (
              <Star
                className={cn(config.star, "fill-amber-400 text-amber-400")}
              />
            )}
            {type === "half" && (
              <>
                <Star
                  className={cn(config.star, "fill-none text-gray-300")}
                />
                <span
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: "50%" }}
                >
                  <Star
                    className={cn(
                      config.star,
                      "fill-amber-400 text-amber-400"
                    )}
                  />
                </span>
              </>
            )}
            {type === "empty" && (
              <Star className={cn(config.star, "fill-none text-gray-300")} />
            )}
          </span>
        ))}
      </div>

      <span className={cn("ml-1 font-semibold text-gray-900", config.text)}>
        {clampedRating.toFixed(1)}
      </span>

      {count !== undefined && (
        <span className={cn("text-gray-400", config.text)}>
          ({count.toLocaleString()})
        </span>
      )}
    </div>
  );
}
