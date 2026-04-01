import type { TaskPriority } from '../../types';

const priorityConfig: Record<TaskPriority, { label: string; color: string; emoji: string }> = {
  low: { label: 'Low', color: 'bg-green-400', emoji: '🟢' },
  medium: { label: 'Medium', color: 'bg-yellow-400', emoji: '🟡' },
  high: { label: 'High', color: 'bg-red-400', emoji: '🔴' },
  urgent: { label: 'Urgent', color: 'bg-red-600', emoji: '🔴' },
};

export function PriorityIndicator({ priority, showLabel = false }: { priority: TaskPriority; showLabel?: boolean }) {
  const config = priorityConfig[priority];
  return (
    <div className="flex items-center gap-1.5">
      <span className={`inline-block w-2.5 h-2.5 rounded-full ${config.color}`} title={config.label} />
      {showLabel && <span className="text-xs text-gray-600">{config.label}</span>}
    </div>
  );
}
