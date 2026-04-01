import { motion } from 'framer-motion';

interface SprintCounts {
  done: number;
  in_progress: number;
  blocked: number;
  todo: number;
}

interface SprintProgressBarProps {
  counts: SprintCounts;
  className?: string;
}

const segments: { key: keyof SprintCounts; label: string; color: string; textColor: string }[] = [
  { key: 'done', label: 'Done', color: 'var(--wapa-green-500)', textColor: 'text-[var(--wapa-green-700)]' },
  { key: 'in_progress', label: 'In Progress', color: 'var(--color-info)', textColor: 'text-blue-700' },
  { key: 'blocked', label: 'Blocked', color: 'var(--color-danger)', textColor: 'text-red-700' },
  { key: 'todo', label: 'To Do', color: 'var(--slate-300)', textColor: 'text-[var(--text-secondary)]' },
];

export function SprintProgressBar({ counts, className = '' }: SprintProgressBarProps) {
  const total = counts.done + counts.in_progress + counts.blocked + counts.todo;
  if (total === 0) return null;

  return (
    <div className={className}>
      {/* Labels */}
      <div className="flex items-center gap-4 mb-2">
        {segments.map((seg) => {
          const count = counts[seg.key];
          if (count === 0) return null;
          return (
            <span key={seg.key} className={`text-xs font-medium ${seg.textColor}`}>
              {seg.label}: {count}
            </span>
          );
        })}
      </div>

      {/* Bar */}
      <div className="h-3 flex rounded-full overflow-hidden bg-[var(--slate-100)]">
        {segments.map((seg, i) => {
          const pct = (counts[seg.key] / total) * 100;
          if (pct === 0) return null;
          return (
            <motion.div
              key={seg.key}
              initial={{ width: 0 }}
              animate={{ width: `${pct}%` }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ backgroundColor: seg.color }}
              className="h-full"
            />
          );
        })}
      </div>
    </div>
  );
}

SprintProgressBar.displayName = 'SprintProgressBar';
export default SprintProgressBar;
