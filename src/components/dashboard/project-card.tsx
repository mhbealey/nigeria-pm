"use client";

import * as React from "react";
import { MapPin } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn, formatNaira } from "@/lib/utils";

type ProjectStatus =
  | "planning"
  | "in-progress"
  | "completed"
  | "on-hold"
  | "delayed"
  | "cancelled";

type ProjectType =
  | "residential"
  | "commercial"
  | "infrastructure"
  | "industrial"
  | "mixed-use";

interface ProjectCardProps {
  title: string;
  location: string;
  status: ProjectStatus;
  progress: number;
  budget: number;
  spent: number;
  client: string;
  contractor: string;
  type: ProjectType;
  onClick?: () => void;
}

const statusConfig: Record<
  ProjectStatus,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" }
> = {
  planning: { label: "Planning", variant: "secondary" },
  "in-progress": { label: "In Progress", variant: "default" },
  completed: { label: "Completed", variant: "success" },
  "on-hold": { label: "On Hold", variant: "warning" },
  delayed: { label: "Delayed", variant: "destructive" },
  cancelled: { label: "Cancelled", variant: "outline" },
};

const typeLabels: Record<ProjectType, string> = {
  residential: "Residential",
  commercial: "Commercial",
  infrastructure: "Infrastructure",
  industrial: "Industrial",
  "mixed-use": "Mixed Use",
};

export function ProjectCard({
  title,
  location,
  status,
  progress,
  budget,
  spent,
  client,
  contractor,
  type,
  onClick,
}: ProjectCardProps) {
  const variance = budget - spent;
  const variancePercent = budget > 0 ? ((variance / budget) * 100).toFixed(1) : "0";
  const isOverBudget = variance < 0;
  const { label: statusLabel, variant: statusVariant } = statusConfig[status];

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5",
        onClick && "hover:border-emerald-300"
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-gray-900">
              {title}
            </h3>
            <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{location}</span>
            </div>
          </div>
          <Badge variant={statusVariant}>{statusLabel}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <div className="mb-1.5 flex items-center justify-between text-sm">
            <span className="text-gray-500">Progress</span>
            <span className="font-semibold text-gray-900">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-2 gap-3 text-sm">
          <div>
            <p className="text-gray-500">Budget</p>
            <p className="font-semibold text-gray-900">{formatNaira(budget)}</p>
          </div>
          <div>
            <p className="text-gray-500">Spent</p>
            <p className="font-semibold text-gray-900">{formatNaira(spent)}</p>
          </div>
        </div>

        <div
          className={cn(
            "flex items-center justify-between rounded-lg px-3 py-2 text-sm",
            isOverBudget ? "bg-red-50" : "bg-green-50"
          )}
        >
          <span className={isOverBudget ? "text-red-700" : "text-green-700"}>
            Variance
          </span>
          <span
            className={cn(
              "font-semibold",
              isOverBudget ? "text-red-700" : "text-green-700"
            )}
          >
            {isOverBudget ? "-" : "+"}
            {formatNaira(Math.abs(variance))} ({isOverBudget ? "-" : "+"}
            {Math.abs(Number(variancePercent))}%)
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 text-sm">
          <div>
            <p className="text-gray-400">Client</p>
            <p className="truncate font-medium text-gray-700">{client}</p>
          </div>
          <div>
            <p className="text-gray-400">Contractor</p>
            <p className="truncate font-medium text-gray-700">{contractor}</p>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <Badge variant="outline" className="text-xs">
            {typeLabels[type]}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
