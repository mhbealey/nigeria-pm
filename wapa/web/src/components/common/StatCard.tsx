import type { ReactNode } from 'react';

export function StatCard({ title, value, icon, color = 'bg-white', trend }: {
  title: string;
  value: string | number;
  icon: ReactNode;
  color?: string;
  trend?: { value: string; positive: boolean };
}) {
  return (
    <div className={`${color} rounded-xl border border-gray-200 p-5 shadow-sm`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`mt-1 text-xs font-medium ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
              {trend.positive ? '\u2191' : '\u2193'} {trend.value}
            </p>
          )}
        </div>
        <div className="text-gray-400">{icon}</div>
      </div>
    </div>
  );
}
