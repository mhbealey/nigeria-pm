import { priorityIcon } from '../../lib/utils';

export function PriorityBadge({ priority }: { priority: string }) {
  return (
    <span className="text-sm" title={priority}>
      {priorityIcon(priority)}
    </span>
  );
}
