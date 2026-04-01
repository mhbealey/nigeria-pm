import { CalendarDays } from 'lucide-react';
import type { Task } from '../../types';
import { PriorityIndicator } from '../common/PriorityIndicator';
import { Avatar } from '../common/Avatar';

export function TaskCard({ task, onClick }: { task: Task; onClick?: () => void }) {
  const isBlocked = task.status === 'blocked';
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })
    : null;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 cursor-pointer
        hover:shadow-md hover:-translate-y-0.5 transition-all duration-200
        ${isBlocked ? 'border-l-4 border-l-red-500' : ''}`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <PriorityIndicator priority={task.priority} />
      </div>

      <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-3">
        {task.title}
      </h4>

      <div className="flex items-center justify-between">
        {formattedDate ? (
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </div>
        ) : (
          <span />
        )}

        {task.assignee && (
          <Avatar name={task.assignee.name} size="sm" />
        )}
      </div>
    </div>
  );
}
