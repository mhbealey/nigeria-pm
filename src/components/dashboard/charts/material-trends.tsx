"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ReferenceLine,
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

interface MaterialDataPoint {
  month: string;
  cement: number;
  rebar: number;
  granite: number;
}

const data: MaterialDataPoint[] = [
  { month: "Oct", cement: 5_800, rebar: 420_000, granite: 38_000 },
  { month: "Nov", cement: 5_950, rebar: 435_000, granite: 39_500 },
  { month: "Dec", cement: 6_200, rebar: 450_000, granite: 41_000 },
  { month: "Jan", cement: 6_800, rebar: 480_000, granite: 42_000 },
  { month: "Feb", cement: 7_100, rebar: 465_000, granite: 44_500 },
  { month: "Mar", cement: 6_500, rebar: 470_000, granite: 43_000 },
];

function formatNaira(value: number): string {
  if (value >= 1_000_000) {
    return `₦${(value / 1_000_000).toFixed(1)}M`;
  }
  if (value >= 1_000) {
    return `₦${(value / 1_000).toFixed(0)}K`;
  }
  return `₦${value.toLocaleString()}`;
}

function formatNairaFull(value: number): string {
  return `₦${value.toLocaleString("en-NG")}`;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    color: string;
    name: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md">
      <p className="mb-1 text-sm font-medium text-gray-700">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          className="text-sm"
          style={{ color: entry.color }}
        >
          {entry.name}: {formatNairaFull(entry.value)}
          {entry.dataKey === "cement" && "/bag"}
          {entry.dataKey === "rebar" && "/ton"}
          {entry.dataKey === "granite" && "/trip"}
        </p>
      ))}
    </div>
  );
}

const MATERIALS = [
  { key: "cement" as const, name: "Cement (per bag)", color: "#059669" },
  { key: "rebar" as const, name: "Rebar (per ton)", color: "#2563eb" },
  { key: "granite" as const, name: "Granite (per trip)", color: "#d97706" },
];

export function MaterialTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Material Price Trends</CardTitle>
        <CardDescription>
          Key construction material prices over 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
              />
              <YAxis
                yAxisId="left"
                tickFormatter={formatNaira}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
                width={70}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={formatNaira}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                iconType="circle"
                iconSize={8}
              />
              <ReferenceLine
                yAxisId="left"
                x="Jan"
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{
                  value: "Price spike",
                  position: "top",
                  fill: "#ef4444",
                  fontSize: 11,
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="cement"
                name="Cement (per bag)"
                stroke="#059669"
                strokeWidth={2}
                dot={{ r: 4, fill: "#059669" }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="rebar"
                name="Rebar (per ton)"
                stroke="#2563eb"
                strokeWidth={2}
                dot={{ r: 4, fill: "#2563eb" }}
                activeDot={{ r: 6 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="granite"
                name="Granite (per trip)"
                stroke="#d97706"
                strokeWidth={2}
                dot={{ r: 4, fill: "#d97706" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
