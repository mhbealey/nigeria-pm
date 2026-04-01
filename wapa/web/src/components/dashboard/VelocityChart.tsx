import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface SprintData {
  name: string;
  tasks: number;
  current?: boolean;
}

interface VelocityChartProps {
  sprints: SprintData[];
  height?: number;
  className?: string;
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[var(--slate-800)] text-white text-xs px-3 py-2 rounded-[var(--radius-md)] shadow-[var(--shadow-lg)]">
      <p className="font-medium mb-0.5">{label}</p>
      <p>{payload[0].value} tasks completed</p>
    </div>
  );
}

export function VelocityChart({ sprints, height = 220, className = '' }: VelocityChartProps) {
  return (
    <div className={`bg-[var(--surface-primary)] rounded-[var(--radius-xl)] shadow-[var(--shadow-sm)] p-5 ${className}`}>
      <h3 className="text-sm font-semibold text-[var(--text-primary)] font-[var(--font-display)] mb-4">
        Sprint Velocity
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={sprints} barCategoryGap="25%">
          <XAxis
            dataKey="name"
            tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: 'var(--text-tertiary)', fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={30}
          />
          <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'var(--slate-50)' }} />
          <Bar dataKey="tasks" radius={[6, 6, 0, 0]} animationDuration={800} animationEasing="ease-out">
            {sprints.map((entry, i) => (
              <Cell
                key={i}
                fill={entry.current ? 'var(--wapa-green-500)' : 'var(--slate-300)'}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

VelocityChart.displayName = 'VelocityChart';
export default VelocityChart;
