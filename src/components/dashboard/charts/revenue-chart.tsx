"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
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

interface RevenueDataPoint {
  month: string;
  income: number;
  expenses: number;
}

const data: RevenueDataPoint[] = [
  { month: "Jan", income: 45_000_000, expenses: 32_000_000 },
  { month: "Feb", income: 52_000_000, expenses: 38_000_000 },
  { month: "Mar", income: 48_000_000, expenses: 35_000_000 },
  { month: "Apr", income: 61_000_000, expenses: 42_000_000 },
  { month: "May", income: 55_000_000, expenses: 40_000_000 },
  { month: "Jun", income: 67_000_000, expenses: 48_000_000 },
  { month: "Jul", income: 72_000_000, expenses: 51_000_000 },
  { month: "Aug", income: 58_000_000, expenses: 44_000_000 },
  { month: "Sep", income: 63_000_000, expenses: 46_000_000 },
  { month: "Oct", income: 78_000_000, expenses: 54_000_000 },
  { month: "Nov", income: 85_000_000, expenses: 58_000_000 },
  { month: "Dec", income: 91_000_000, expenses: 62_000_000 },
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
  payload?: Array<{ value: number; dataKey: string; color: string }>;
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
          {entry.dataKey === "income" ? "Income" : "Expenses"}:{" "}
          {formatNairaFull(entry.value)}
        </p>
      ))}
    </div>
  );
}

export function RevenueChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Monthly Revenue</CardTitle>
        <CardDescription>
          Income vs expenses across construction projects (2025)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0.05} />
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ea580c" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#ea580c" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatNaira}
                tick={{ fontSize: 12, fill: "#6b7280" }}
                axisLine={{ stroke: "#d1d5db" }}
                tickLine={false}
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#059669"
                strokeWidth={2}
                fill="url(#incomeGrad)"
                name="Income"
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stroke="#ea580c"
                strokeWidth={2}
                fill="url(#expenseGrad)"
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
