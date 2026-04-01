import type { Sprint, Task } from '../../types';
import { ProgressBar } from '../common/ProgressBar';

function formatDateRange(start: string, end: string) {
  const s = new Date(start);
  const e = new Date(end);
  const opts: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  return `${s.toLocaleDateString('en-NG', opts)} - ${e.toLocaleDateString('en-NG', { ...opts, year: 'numeric' })}`;
}

function daysRemaining(endDate: string) {
  const diff = Math.ceil((new Date(endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
  return diff;
}

interface SprintCardProps {
  sprint: Sprint;
  projectName: string;
  tasks: Task[];
}

export function SprintCard({ sprint, projectName, tasks }: SprintCardProps) {
  const done = tasks.filter((t) => t.status === 'done').length;
  const inProgress = tasks.filter((t) => t.status === 'in_progress').length;
  const todo = tasks.filter((t) => t.status === 'todo').length;
  const blocked = tasks.filter((t) => t.status === 'blocked').length;
  const total = tasks.length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  const remaining = daysRemaining(sprint.endDate);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-base font-bold text-gray-900">{sprint.name}</h3>
          <p className="text-xs text-gray-500">{projectName}</p>
        </div>
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
            remaining > 3
              ? 'bg-blue-100 text-blue-700'
              : remaining > 0
                ? 'bg-orange-100 text-orange-700'
                : 'bg-red-100 text-red-700'
          }`}
        >
          {remaining > 0 ? `${remaining}d left` : remaining === 0 ? 'Due today' : 'Overdue'}
        </span>
      </div>

      <p className="text-xs text-gray-400 mb-4">
        {formatDateRange(sprint.startDate, sprint.endDate)}
      </p>

      <div className="mb-4">
        <ProgressBar percent={percent} size="sm" />
      </div>

      <div className="flex items-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
          <span>{done} Done</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
          <span>{inProgress} Active</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-gray-400" />
          <span>{todo} Todo</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
          <span>{blocked} Blocked</span>
        </div>
      </div>
    </div>
  );
}
