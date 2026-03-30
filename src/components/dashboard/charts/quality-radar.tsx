"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface QualityMetric {
  axis: string;
  score: number;
  fullMark: number;
}

const data: QualityMetric[] = [
  { axis: "Structural", score: 88, fullMark: 100 },
  { axis: "Materials", score: 76, fullMark: 100 },
  { axis: "Workmanship", score: 82, fullMark: 100 },
  { axis: "Safety", score: 91, fullMark: 100 },
  { axis: "Compliance", score: 85, fullMark: 100 },
  { axis: "Documentation", score: 70, fullMark: 100 },
];

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: QualityMetric }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;

  const entry = payload[0];
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-3 shadow-md">
      <p className="text-sm font-medium text-gray-700">
        {entry.payload.axis}
      </p>
      <p className="text-sm text-emerald-700">Score: {entry.value}/100</p>
    </div>
  );
}

export function QualityRadar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Quality Assessment</CardTitle>
        <CardDescription>
          Project quality scores across key dimensions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
              <PolarGrid stroke="#d1d5db" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <PolarRadiusAxis
                angle={30}
                domain={[0, 100]}
                tick={{ fontSize: 10, fill: "#9ca3af" }}
                tickCount={5}
              />
              <Tooltip content={<CustomTooltip />} />
              <Radar
                name="Quality Score"
                dataKey="score"
                stroke="#059669"
                strokeWidth={2}
                fill="#059669"
                fillOpacity={0.2}
                dot={{ r: 4, fill: "#059669" }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
