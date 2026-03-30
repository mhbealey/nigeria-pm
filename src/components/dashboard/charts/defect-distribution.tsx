"use client";

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DefectCategory {
  name: string;
  value: number;
  color: string;
}

const data: DefectCategory[] = [
  { name: "Roofing", value: 24, color: "#059669" },
  { name: "Plumbing", value: 18, color: "#2563eb" },
  { name: "Electrical", value: 15, color: "#d97706" },
  { name: "Structural", value: 12, color: "#dc2626" },
  { name: "Finishing", value: 21, color: "#7c3aed" },
  { name: "MEP", value: 10, color: "#0891b2" },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ payload: DefectCategory }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const entry = payload[0].payload;
  const pct = ((entry.value / total) * 100).toFixed(1);
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md">
      <p className="text-sm font-medium" style={{ color: entry.color }}>
        {entry.name}
      </p>
      <p className="text-sm text-gray-600">
        {entry.value} defects ({pct}%)
      </p>
    </div>
  );
}

interface LegendPayloadItem {
  value: string;
  color?: string;
  payload?: DefectCategory;
}

function CustomLegend({ payload }: { payload?: LegendPayloadItem[] }) {
  if (!payload) return null;

  return (
    <div className="mt-2 flex flex-wrap justify-center gap-x-4 gap-y-1">
      {payload.map((entry) => {
        const item = data.find((d) => d.name === entry.value);
        const pct = item ? ((item.value / total) * 100).toFixed(1) : "0";
        return (
          <span key={entry.value} className="flex items-center gap-1.5 text-xs text-gray-600">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            {entry.value} ({pct}%)
          </span>
        );
      })}
    </div>
  );
}

interface CenterLabelProps {
  viewBox?: { cx: number; cy: number };
}

function CenterLabel({ viewBox }: CenterLabelProps) {
  if (!viewBox) return null;
  const { cx, cy } = viewBox;
  return (
    <text x={cx} y={cy} textAnchor="middle" dominantBaseline="central">
      <tspan x={cx} dy="-0.5em" className="text-2xl font-bold" fill="#111827">
        {total}
      </tspan>
      <tspan x={cx} dy="1.4em" className="text-xs" fill="#6b7280">
        Total Defects
      </tspan>
    </text>
  );
}

export function DefectDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Defect Distribution</CardTitle>
        <CardDescription>Defects by category across active projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="45%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={3}
                dataKey="value"
                nameKey="name"
                label={false}
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} stroke="none" />
                ))}
                <CenterLabel />
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
