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

interface EstateData {
  estate: string;
  completed: number;
  inProgress: number;
  notStarted: number;
}

const data: EstateData[] = [
  { estate: "Lekki Gardens", completed: 42, inProgress: 18, notStarted: 10 },
  { estate: "Eko Atlantic", completed: 28, inProgress: 24, notStarted: 18 },
  { estate: "Banana Island", completed: 15, inProgress: 8, notStarted: 7 },
  { estate: "Abuja Centenary", completed: 35, inProgress: 22, notStarted: 13 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const total = payload.reduce((sum, p) => sum + p.value, 0);
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md">
      <p className="mb-1 text-sm font-medium text-gray-700">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.name}
          className="text-sm"
          style={{ color: entry.color }}
        >
          {entry.name}: {entry.value} units
        </p>
      ))}
      <p className="mt-1 border-t border-gray-100 pt-1 text-xs text-gray-500">
        Total: {total} units
      </p>
    </div>
  );
}

export function EstateProgress() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Estate Unit Progress</CardTitle>
        <CardDescription>
          Construction status by estate development
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="estate"
                tick={{ fontSize: 11, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
                label={{
                  value: "Units",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontSize: 12, fill: "#6b7280" },
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                iconType="square"
                iconSize={10}
              />
              <Bar
                dataKey="completed"
                name="Completed"
                stackId="stack"
                fill="#059669"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="inProgress"
                name="In Progress"
                stackId="stack"
                fill="#f59e0b"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                dataKey="notStarted"
                name="Not Started"
                stackId="stack"
                fill="#9ca3af"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
