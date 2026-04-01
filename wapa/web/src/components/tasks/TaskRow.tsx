import { CalendarDays, MessageSquare } from 'lucide-react';
import type { Task } from '../../types';
import { PriorityIndicator } from '../common/PriorityIndicator';
import { StatusBadge } from '../common/StatusBadge';
import { Avatar } from '../common/Avatar';

function isOverdue(dueDate: string | null): boolean {
  if (!dueDate) return false;
  return new Date(dueDate) < new Date() && true;
}

export function TaskRow({ task, onClick }: { task: Task; onClick?: () => void }) {
  const overdue = task.status !== 'done' && isOverdue(task.dueDate);
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric', year: 'numeric' })
    : null;

  return (
    <div
      onClick={onClick}
      className="grid grid-cols-[2rem_1fr_2.5rem_7rem_7rem] items-center gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors"
    >
      <div className="flex justify-center">
        <PriorityIndicator priority={task.priority} />
      </div>

      <div className="flex items-center gap-2 min-w-0">
        <span className="text-sm font-medium text-gray-900 truncate">{task.title}</span>
        {task.notes.length > 0 && (
          <span className="inline-flex items-center gap-0.5 text-xs text-gray-400">
            <MessageSquare className="w-3 h-3" />
            {task.notes.length}
          </span>
        )}
      </div>

      <div className="flex justify-center">
        {task.assignee ? (
          <Avatar name={task.assignee.name} size="sm" />
        ) : (
          <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-dashed border-gray-300" />
        )}
      </div>

      <div className={`flex items-center gap-1 text-xs ${overdue ? 'text-red-600 font-semibold' : 'text-gray-500'}`}>
        {formattedDate && (
          <>
            <CalendarDays className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </>
        )}
      </div>

      <div className="flex justify-end">
        <StatusBadge status={task.status} />
      </div>
    </div>
  );
}
