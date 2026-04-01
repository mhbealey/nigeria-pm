import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, MessageSquare, MoreHorizontal } from 'lucide-react';
import { PriorityBadge } from '../shared/Badge';
import { Avatar } from '../shared/Avatar';

type Priority = 'low' | 'medium' | 'high' | 'urgent';

interface TaskCardData {
  id: string;
  title: string;
  priority: Priority;
  status?: string;
  dueDate?: string;
  notesCount?: number;
  assignee?: { name: string; avatar?: string };
  blocked?: boolean;
  blockReason?: string;
  overdue?: boolean;
}

interface TaskCardProps {
  task: TaskCardData;
  onClick?: (task: TaskCardData) => void;
  onMenuAction?: (action: string, task: TaskCardData) => void;
  className?: string;
}

export function TaskCard({ task, onClick, onMenuAction, className = '' }: TaskCardProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: 'var(--shadow-md)' }}
      transition={{ duration: 0.2 }}
      onClick={() => onClick?.(task)}
      className={`relative bg-[var(--surface-primary)] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-3.5 cursor-pointer group select-none
        ${task.blocked ? 'border-l-[3px] border-l-[var(--color-danger)] bg-red-50/40' : 'border border-[var(--slate-200)]'}
        ${className}`}
    >
      {/* Top row: priority + menu */}
      <div className="flex items-center justify-between mb-2.5">
        <PriorityBadge priority={task.priority} />

        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpen(!menuOpen);
            }}
            onBlur={() => setTimeout(() => setMenuOpen(false), 150)}
            className="p-1 rounded-[var(--radius-sm)] text-[var(--text-tertiary)] opacity-0 group-hover:opacity-100 hover:text-[var(--text-primary)] hover:bg-[var(--slate-100)] transition-all outline-none focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-[var(--wapa-green-500)]"
          >
            <MoreHorizontal size={15} />
          </button>

          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.1 }}
                className="absolute right-0 top-full mt-1 w-36 bg-[var(--surface-primary)] rounded-[var(--radius-md)] shadow-[var(--shadow-lg)] border border-[var(--slate-200)] py-1 z-10"
              >
                {['Edit', 'Move', 'Delete'].map((action) => (
                  <button
                    key={action}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMenuAction?.(action.toLowerCase(), task);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-sm transition-colors outline-none ${
                      action === 'Delete'
                        ? 'text-red-600 hover:bg-red-50'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--slate-100)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {action}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-snug mb-3 line-clamp-2">
        {task.title}
      </h3>

      {/* Bottom row: metadata + assignee */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {task.dueDate && (
            <span className="inline-flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
              <Calendar size={12} />
              <span>{task.dueDate}</span>
              {task.overdue && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-danger)] animate-pulse" />
              )}
            </span>
          )}
          {task.notesCount !== undefined && task.notesCount > 0 && (
            <span className="inline-flex items-center gap-1 text-xs text-[var(--text-tertiary)]">
              <MessageSquare size={12} />
              {task.notesCount}
            </span>
          )}
        </div>

        {task.assignee && (
          <Avatar name={task.assignee.name} src={task.assignee.avatar} size="xs" />
        )}
      </div>
    </motion.div>
  );
}

TaskCard.displayName = 'TaskCard';
export default TaskCard;
