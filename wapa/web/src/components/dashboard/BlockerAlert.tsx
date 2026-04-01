import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';

interface BlockerAlertProps {
  taskId: string;
  taskTitle: string;
  reason: string;
  onViewTask?: (taskId: string) => void;
  className?: string;
}

export function BlockerAlert({ taskId, taskTitle, reason, onViewTask, className = '' }: BlockerAlertProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`bg-red-50 border-l-[3px] border-l-[var(--color-danger)] rounded-[var(--radius-lg)] p-4 ${className}`}
    >
      <div className="flex items-start gap-3">
        <AlertTriangle size={18} className="text-[var(--color-danger)] shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1 truncate">
            {taskTitle}
          </h4>
          <p className="text-xs text-[var(--text-secondary)] leading-relaxed mb-2">
            {reason}
          </p>
          {onViewTask && (
            <button
              onClick={() => onViewTask(taskId)}
              className="text-xs font-medium text-[var(--color-danger)] hover:text-red-700 transition-colors outline-none focus-visible:underline"
            >
              View task →
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

BlockerAlert.displayName = 'BlockerAlert';
export default BlockerAlert;
