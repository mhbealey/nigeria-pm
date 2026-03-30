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

interface PaymentDataPoint {
  month: string;
  deposited: number;
  released: number;
  held: number;
}

const data: PaymentDataPoint[] = [
  { month: "Oct", deposited: 35_000_000, released: 28_000_000, held: 7_000_000 },
  { month: "Nov", deposited: 42_000_000, released: 33_000_000, held: 9_000_000 },
  { month: "Dec", deposited: 38_000_000, released: 25_000_000, held: 13_000_000 },
  { month: "Jan", deposited: 50_000_000, released: 41_000_000, held: 9_000_000 },
  { month: "Feb", deposited: 55_000_000, released: 46_000_000, held: 9_000_000 },
  { month: "Mar", deposited: 48_000_000, released: 38_000_000, held: 10_000_000 },
];

function formatNaira(value: number): string {
  if (value >= 1_000_000) {
    return `₦${(value / 1_000_000).toFixed(0)}M`;
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
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md">
      <p className="mb-1 text-sm font-medium text-gray-700">{label}</p>
      {payload.map((entry) => (
        <p
          key={entry.name}
          className="text-sm"
          style={{ color: entry.color }}
        >
          {entry.name}: {formatNairaFull(entry.value)}
        </p>
      ))}
    </div>
  );
}

export function PaymentFlow() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Payment Flow (Escrow)</CardTitle>
        <CardDescription>
          Monthly escrow deposits, releases, and holds
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
              <Legend
                wrapperStyle={{ fontSize: 12, paddingTop: 8 }}
                iconType="square"
                iconSize={10}
              />
              <Bar
                dataKey="deposited"
                name="Deposited"
                fill="#059669"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="released"
                name="Released"
                fill="#2563eb"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
              <Bar
                dataKey="held"
                name="Held"
                fill="#f59e0b"
                radius={[4, 4, 0, 0]}
                barSize={20}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
