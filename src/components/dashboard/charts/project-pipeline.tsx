"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PipelineStage {
  stage: string;
  count: number;
  color: string;
}

const data: PipelineStage[] = [
  { stage: "Planning", count: 18, color: "#d1fae5" },
  { stage: "Foundation", count: 14, color: "#a7f3d0" },
  { stage: "Structure", count: 11, color: "#6ee7b7" },
  { stage: "MEP", count: 8, color: "#34d399" },
  { stage: "Finishing", count: 6, color: "#10b981" },
  { stage: "Handover", count: 3, color: "#059669" },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: PipelineStage }>;
  label?: string;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const entry = payload[0];
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md">
      <p className="text-sm font-medium text-gray-700">
        {entry.payload.stage}
      </p>
      <p className="text-sm text-emerald-700">
        {entry.value} {entry.value === 1 ? "project" : "projects"}
      </p>
    </div>
  );
}

export function ProjectPipeline() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Project Pipeline</CardTitle>
        <CardDescription>
          Active projects by construction stage
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 40, left: 10, bottom: 5 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#e5e7eb"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
              />
              <YAxis
                type="category"
                dataKey="stage"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
                width={90}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="count" radius={[0, 6, 6, 0]} barSize={28}>
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
