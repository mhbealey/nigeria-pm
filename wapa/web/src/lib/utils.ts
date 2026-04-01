export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(' ');
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export function formatDateLong(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
}

export function daysUntil(dateStr: string): number {
  const now = new Date();
  const date = new Date(dateStr);
  return Math.ceil((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
}

export function statusColor(status: string): string {
  const colors: Record<string, string> = {
    todo: 'bg-gray-100 text-gray-700',
    in_progress: 'bg-blue-100 text-blue-700',
    blocked: 'bg-red-100 text-red-700',
    done: 'bg-green-100 text-green-700',
  };
  return colors[status] ?? 'bg-gray-100 text-gray-700';
}

export function statusLabel(status: string): string {
  const labels: Record<string, string> = {
    todo: 'To Do',
    in_progress: 'In Progress',
    blocked: 'Blocked',
    done: 'Done',
  };
  return labels[status] ?? status;
}

export function priorityColor(priority: string): string {
  const colors: Record<string, string> = {
    low: 'text-green-600',
    medium: 'text-yellow-600',
    high: 'text-orange-600',
    urgent: 'text-red-600',
  };
  return colors[priority] ?? 'text-gray-600';
}

export function priorityIcon(priority: string): string {
  const icons: Record<string, string> = {
    low: '🟢',
    medium: '🟡',
    high: '🔴',
    urgent: '🔴🔴',
  };
  return icons[priority] ?? '🟡';
}
