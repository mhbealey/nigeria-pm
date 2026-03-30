"use client";

import * as React from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  ChevronDown,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

type EventStatus = "completed" | "in-progress" | "pending" | "failed";

interface TimelineEvent {
  title: string;
  description?: string;
  date: string;
  status: EventStatus;
  icon?: LucideIcon;
}

interface StatusTimelineProps {
  events: TimelineEvent[];
}

const statusConfig: Record<
  EventStatus,
  { icon: LucideIcon; dot: string; text: string }
> = {
  completed: {
    icon: CheckCircle2,
    dot: "bg-emerald-500 text-white",
    text: "text-emerald-700",
  },
  "in-progress": {
    icon: Clock,
    dot: "bg-amber-500 text-white",
    text: "text-amber-700",
  },
  pending: {
    icon: Clock,
    dot: "bg-slate-300 text-white",
    text: "text-slate-500",
  },
  failed: {
    icon: XCircle,
    dot: "bg-red-500 text-white",
    text: "text-red-700",
  },
};

function TimelineItem({
  event,
  isLast,
}: {
  event: TimelineEvent;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = React.useState(false);
  const config = statusConfig[event.status];
  const Icon = event.icon || config.icon;
  const hasDescription = !!event.description;

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div
          className={cn(
            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
            config.dot
          )}
        >
          <Icon className="h-4 w-4" />
        </div>
        {!isLast && <div className="w-0.5 flex-1 bg-gray-200" />}
      </div>

      <div className={cn("min-w-0 flex-1", !isLast && "pb-6")}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900">{event.title}</p>
            <p className="mt-0.5 text-xs text-gray-400">{event.date}</p>
          </div>

          {hasDescription && (
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              className="shrink-0 rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label={expanded ? "Collapse details" : "Expand details"}
            >
              <ChevronDown
                className={cn(
                  "h-4 w-4 transition-transform",
                  expanded && "rotate-180"
                )}
              />
            </button>
          )}
        </div>

        {hasDescription && expanded && (
          <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2">
            <p className="text-sm text-gray-600">{event.description}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export function StatusTimeline({ events }: StatusTimelineProps) {
  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center py-8 text-sm text-gray-400">
        <AlertCircle className="mr-2 h-4 w-4" />
        No events to display
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {events.map((event, index) => (
        <TimelineItem
          key={index}
          event={event}
          isLast={index === events.length - 1}
        />
      ))}
    </div>
  );
}
