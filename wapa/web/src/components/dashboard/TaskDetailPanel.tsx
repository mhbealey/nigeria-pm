import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock } from 'lucide-react';
import { Avatar } from '../shared/Avatar';
import { StatusBadge, PriorityBadge } from '../shared/Badge';

type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'done';
type Priority = 'low' | 'medium' | 'high' | 'urgent';

interface Note {
  id: string;
  author: string;
  authorAvatar?: string;
  content: string;
  timestamp: string;
}

interface ActivityEntry {
  id: string;
  user: string;
  action: string;
  timestamp: string;
}

interface TaskDetail {
  id: string;
  title: string;
  status: TaskStatus;
  priority: Priority;
  assignee?: { name: string; avatar?: string };
  dueDate?: string;
  description?: string;
  notes?: Note[];
  activity?: ActivityEntry[];
}

interface TaskDetailPanelProps {
  open: boolean;
  task: TaskDetail | null;
  onClose: () => void;
  onStatusChange?: (status: TaskStatus) => void;
  onPriorityChange?: (priority: Priority) => void;
  className?: string;
}

const statuses: TaskStatus[] = ['todo', 'in_progress', 'blocked', 'done'];
const priorities: Priority[] = ['low', 'medium', 'high', 'urgent'];

export function TaskDetailPanel({
  open,
  task,
  onClose,
  onStatusChange,
  onPriorityChange,
  className = '',
}: TaskDetailPanelProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (open) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  return (
    <AnimatePresence>
      {open && task && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className={`fixed right-0 top-0 h-screen w-[400px] max-w-[90vw] bg-[var(--surface-primary)] shadow-[var(--shadow-float)] z-50 flex flex-col ${className}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--slate-200)] shrink-0">
              <span className="text-xs text-[var(--text-tertiary)] font-mono">#{task.id}</span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-[var(--radius-md)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] hover:bg-[var(--slate-100)] transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--wapa-green-500)]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">
              {/* Title */}
              <h2 className="text-xl font-semibold text-[var(--text-primary)] font-[var(--font-display)] leading-tight">
                {task.title}
              </h2>

              {/* Status + Priority */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[var(--text-tertiary)] font-medium mb-1.5 block">Status</label>
                  <select
                    value={task.status}
                    onChange={(e) => onStatusChange?.(e.target.value as TaskStatus)}
                    className="w-full h-8 px-2 rounded-[var(--radius-md)] border border-[var(--slate-200)] bg-[var(--surface-primary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--wapa-green-500)] transition-colors cursor-pointer"
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>
                        {s.replace('_', ' ').replace(/^\w/, (c) => c.toUpperCase())}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-[var(--text-tertiary)] font-medium mb-1.5 block">Priority</label>
                  <select
                    value={task.priority}
                    onChange={(e) => onPriorityChange?.(e.target.value as Priority)}
                    className="w-full h-8 px-2 rounded-[var(--radius-md)] border border-[var(--slate-200)] bg-[var(--surface-primary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--wapa-green-500)] transition-colors cursor-pointer"
                  >
                    {priorities.map((p) => (
                      <option key={p} value={p}>
                        {p.charAt(0).toUpperCase() + p.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Assignee */}
              {task.assignee && (
                <div>
                  <label className="text-xs text-[var(--text-tertiary)] font-medium mb-2 block">Assignee</label>
                  <div className="flex items-center gap-2.5">
                    <Avatar name={task.assignee.name} src={task.assignee.avatar} size="sm" online />
                    <span className="text-sm font-medium text-[var(--text-primary)]">{task.assignee.name}</span>
                  </div>
                </div>
              )}

              {/* Due date */}
              {task.dueDate && (
                <div>
                  <label className="text-xs text-[var(--text-tertiary)] font-medium mb-1.5 block">Due Date</label>
                  <div className="flex items-center gap-2 text-sm text-[var(--text-primary)]">
                    <Calendar size={14} className="text-[var(--text-tertiary)]" />
                    {task.dueDate}
                  </div>
                </div>
              )}

              {/* Description */}
              {task.description && (
                <div>
                  <label className="text-xs text-[var(--text-tertiary)] font-medium mb-1.5 block">Description</label>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{task.description}</p>
                </div>
              )}

              {/* Notes */}
              {task.notes && task.notes.length > 0 && (
                <div>
                  <label className="text-xs text-[var(--text-tertiary)] font-medium mb-3 block">
                    Notes ({task.notes.length})
                  </label>
                  <div className="space-y-3">
                    {task.notes.map((note) => (
                      <div key={note.id} className="flex gap-2.5">
                        <Avatar name={note.author} src={note.authorAvatar} size="xs" />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-xs font-medium text-[var(--text-primary)]">{note.author}</span>
                            <span className="text-[10px] text-[var(--text-tertiary)]">{note.timestamp}</span>
                          </div>
                          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{note.content}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Activity */}
              {task.activity && task.activity.length > 0 && (
                <div>
                  <label className="text-xs text-[var(--text-tertiary)] font-medium mb-3 block">Activity</label>
                  <div className="space-y-2.5">
                    {task.activity.map((entry) => (
                      <div key={entry.id} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                        <Clock size={12} className="text-[var(--text-tertiary)] shrink-0" />
                        <span>
                          <strong className="font-medium text-[var(--text-primary)]">{entry.user}</strong>{' '}
                          {entry.action}
                        </span>
                        <span className="text-[var(--text-tertiary)] ml-auto shrink-0">{entry.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}

TaskDetailPanel.displayName = 'TaskDetailPanel';
export default TaskDetailPanel;
