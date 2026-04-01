import type { TaskStatus } from '../../types';

const statusConfig: Record<TaskStatus, { label: string; color: string; bg: string }> = {
  todo: { label: 'Todo', color: 'text-gray-700', bg: 'bg-gray-100' },
  in_progress: { label: 'In Progress', color: 'text-blue-700', bg: 'bg-blue-100' },
  blocked: { label: 'Blocked', color: 'text-red-700', bg: 'bg-red-100' },
  done: { label: 'Done', color: 'text-green-700', bg: 'bg-green-100' },
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  const config = statusConfig[status];
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.bg} ${config.color}`}>
      {config.label}
    </span>
  );
}
