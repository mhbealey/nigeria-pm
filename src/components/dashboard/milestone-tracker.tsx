"use client";

import * as React from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

type StageStatus = "completed" | "current" | "pending" | "failed";

interface Stage {
  name: string;
  status: StageStatus;
  date?: string;
}

interface MilestoneTrackerProps {
  stages: Stage[];
  currentStage: number;
}

const statusStyles: Record<StageStatus, { dot: string; label: string; line: string }> = {
  completed: {
    dot: "bg-emerald-500 border-emerald-500 text-white",
    label: "text-emerald-700 font-semibold",
    line: "bg-emerald-500",
  },
  current: {
    dot: "bg-amber-500 border-amber-500 text-white ring-4 ring-amber-100",
    label: "text-amber-700 font-semibold",
    line: "bg-slate-200",
  },
  pending: {
    dot: "bg-white border-slate-300 text-slate-400",
    label: "text-slate-500",
    line: "bg-slate-200",
  },
  failed: {
    dot: "bg-red-500 border-red-500 text-white",
    label: "text-red-700 font-semibold",
    line: "bg-red-300",
  },
};

function StageIcon({ status }: { status: StageStatus }) {
  if (status === "completed") return <Check className="h-3.5 w-3.5" />;
  if (status === "failed") return <X className="h-3.5 w-3.5" />;
  if (status === "current") {
    return <span className="block h-2 w-2 rounded-full bg-white" />;
  }
  return <span className="block h-2 w-2 rounded-full bg-slate-300" />;
}

export function MilestoneTracker({ stages, currentStage }: MilestoneTrackerProps) {
  return (
    <div>
      {/* Horizontal layout on md+ */}
      <div className="hidden md:flex md:items-start">
        {stages.map((stage, index) => {
          const styles = statusStyles[stage.status];
          const isLast = index === stages.length - 1;

          return (
            <div
              key={index}
              className={cn("flex flex-1 items-start", isLast && "flex-none")}
            >
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
                    styles.dot
                  )}
                >
                  <StageIcon status={stage.status} />
                </div>
                <p
                  className={cn(
                    "mt-2 max-w-[100px] text-center text-xs leading-tight",
                    styles.label
                  )}
                >
                  {stage.name}
                </p>
                {stage.date && (
                  <p className="mt-0.5 text-[10px] text-slate-400">
                    {stage.date}
                  </p>
                )}
              </div>

              {!isLast && (
                <div
                  className={cn(
                    "mt-3.5 h-0.5 flex-1 mx-1",
                    index < currentStage ? "bg-emerald-500" : "bg-slate-200"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Vertical layout on mobile */}
      <div className="flex flex-col md:hidden">
        {stages.map((stage, index) => {
          const styles = statusStyles[stage.status];
          const isLast = index === stages.length - 1;

          return (
            <div key={index} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full border-2 transition-all",
                    styles.dot
                  )}
                >
                  <StageIcon status={stage.status} />
                </div>
                {!isLast && (
                  <div
                    className={cn(
                      "w-0.5 flex-1 min-h-[32px]",
                      index < currentStage ? "bg-emerald-500" : "bg-slate-200"
                    )}
                  />
                )}
              </div>

              <div className={cn("pb-6", isLast && "pb-0")}>
                <p className={cn("text-sm leading-tight", styles.label)}>
                  {stage.name}
                </p>
                {stage.date && (
                  <p className="mt-0.5 text-xs text-slate-400">{stage.date}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
