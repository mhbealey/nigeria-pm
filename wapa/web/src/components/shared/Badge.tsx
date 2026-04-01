import type { ReactNode } from 'react';

/* ---------- Status Badge ---------- */
type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'done';

const statusStyles: Record<TaskStatus, string> = {
  todo: 'bg-[var(--slate-100)] text-[var(--slate-600)]',
  in_progress: 'bg-blue-50 text-blue-700',
  blocked: 'bg-red-50 text-red-700',
  done: 'bg-[var(--wapa-green-50)] text-[var(--wapa-green-700)]',
};

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  blocked: 'Blocked',
  done: 'Done',
};

/* ---------- Priority Badge ---------- */
type Priority = 'low' | 'medium' | 'high' | 'urgent';

const priorityStyles: Record<Priority, string> = {
  low: 'bg-green-50 text-green-700',
  medium: 'bg-yellow-50 text-yellow-700',
  high: 'bg-orange-50 text-orange-700',
  urgent: 'bg-red-50 text-red-700',
};

const priorityDotColors: Record<Priority, string> = {
  low: 'bg-[var(--color-low)]',
  medium: 'bg-[var(--color-medium)]',
  high: 'bg-[var(--color-high)]',
  urgent: 'bg-[var(--color-urgent)]',
};

const priorityLabels: Record<Priority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  urgent: 'Urgent',
};

/* ---------- Components ---------- */

interface StatusBadgeProps {
  status: TaskStatus;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium leading-none select-none ${statusStyles[status]} ${className}`}
    >
      {statusLabels[status]}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: Priority;
  showDot?: boolean;
  className?: string;
}

export function PriorityBadge({ priority, showDot = true, className = '' }: PriorityBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[11px] font-medium leading-none select-none ${priorityStyles[priority]} ${className}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full ${priorityDotColors[priority]}`} />}
      {priorityLabels[priority]}
    </span>
  );
}

interface CountBadgeProps {
  count: number;
  variant?: 'green' | 'red';
  className?: string;
}

export function CountBadge({ count, variant = 'green', className = '' }: CountBadgeProps) {
  const bg = variant === 'green' ? 'bg-[var(--wapa-green-500)]' : 'bg-[var(--color-danger)]';
  return (
    <span
      className={`inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-bold text-white leading-none ${bg} ${className}`}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
}

/* ---------- Generic wrapper ---------- */
interface BadgeProps {
  children: ReactNode;
  color?: string;
  className?: string;
}

export function Badge({ children, color, className = '' }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium leading-none select-none ${className}`}
      style={color ? { backgroundColor: `${color}15`, color } : undefined}
    >
      {children}
    </span>
  );
}

export default Badge;
