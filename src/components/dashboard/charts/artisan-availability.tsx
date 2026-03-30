"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
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

interface ArtisanData {
  skill: string;
  available: number;
  busy: number;
}

const data: ArtisanData[] = [
  { skill: "Bricklayer", available: 24, busy: 36 },
  { skill: "Tiler", available: 12, busy: 18 },
  { skill: "Electrician", available: 8, busy: 22 },
  { skill: "Plumber", available: 10, busy: 15 },
  { skill: "Carpenter", available: 18, busy: 27 },
  { skill: "Welder", available: 6, busy: 14 },
  { skill: "Painter", available: 15, busy: 10 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const total = payload.reduce((sum, p) => sum + p.value, 0);
  const avail = payload.find((p) => p.name === "Available");
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md">
      <p className="mb-1 text-sm font-medium text-gray-700">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.name}
          className="text-sm"
          style={{ color: entry.color }}
        >
          {entry.name}: {entry.value}
        </p>
      ))}
      <p className="mt-1 border-t border-gray-100 pt-1 text-xs text-gray-500">
        Total: {total} | Availability:{" "}
        {avail ? ((avail.value / total) * 100).toFixed(0) : 0}%
      </p>
    </div>
  );
}

export function ArtisanAvailability() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Artisan Availability</CardTitle>
        <CardDescription>
          Workforce availability by skill category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 10, bottom: 5 }}
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
                dataKey="skill"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
                width={90}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                iconType="square"
                iconSize={10}
              />
              <Bar
                dataKey="available"
                name="Available"
                stackId="stack"
                fill="#10b981"
                barSize={22}
              />
              <Bar
                dataKey="busy"
                name="Busy"
                stackId="stack"
                fill="#d1d5db"
                barSize={22}
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
