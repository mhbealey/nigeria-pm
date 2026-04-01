import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  X,
  CalendarDays,
  ChevronDown,
} from 'lucide-react';
import { mockTasks } from '../data/mock-projects';
import { mockUsers, getUserById } from '../data/mock-users';
import { cn } from '../utils/cn';
import type { Task, TaskStatus, TaskPriority } from '../types/task';

/* ---------- column config ---------- */

const columns: Array<{ id: TaskStatus; label: string; color: string; dotColor: string }> = [
  { id: 'todo', label: 'Todo', color: 'border-t-gray-400', dotColor: 'bg-gray-400' },
  { id: 'in_progress', label: 'In Progress', color: 'border-t-blue-500', dotColor: 'bg-blue-500' },
  { id: 'blocked', label: 'Blocked', color: 'border-t-red-500', dotColor: 'bg-red-500' },
  { id: 'done', label: 'Done', color: 'border-t-green-500', dotColor: 'bg-green-500' },
];

const priorityOrder: Record<TaskPriority, number> = { urgent: 0, high: 1, medium: 2, low: 3 };
const priorityColors: Record<TaskPriority, string> = {
  urgent: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-400',
  low: 'bg-green-400',
};
const priorityLabels: Record<TaskPriority, string> = { urgent: 'Urgent', high: 'High', medium: 'Medium', low: 'Low' };

/* ---------- task card (board version) ---------- */

function BoardTaskCard({ task, onClick }: { task: Task; onClick: () => void }) {
  const assignee = task.assigneeId ? getUserById(task.assigneeId) : undefined;
  const formattedDate = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })
    : null;
  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
      className={cn(
        'bg-white rounded-lg border border-gray-200 p-3.5 cursor-pointer',
        'hover:shadow-md hover:-translate-y-0.5 transition-all duration-200',
        task.status === 'blocked' && 'border-l-[3px] border-l-red-500',
      )}
    >
      {/* Priority dot + title */}
      <div className="flex items-start gap-2 mb-2">
        <span className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', priorityColors[task.priority])} title={priorityLabels[task.priority]} />
        <h4 className="text-sm font-medium text-gray-900 leading-snug line-clamp-2">{task.title}</h4>
      </div>

      {/* Block reason */}
      {task.blockReason && (
        <p className="text-[11px] text-red-500 bg-red-50 rounded px-2 py-1 mb-2 line-clamp-1">{task.blockReason}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between">
        {formattedDate ? (
          <div className={cn('flex items-center gap-1 text-[11px]', isOverdue ? 'text-red-500 font-medium' : 'text-gray-400')}>
            <CalendarDays className="w-3 h-3" />
            {formattedDate}
          </div>
        ) : (
          <span />
        )}
        {assignee && (
          <div className="w-6 h-6 rounded-full bg-[var(--wapa-green-500)] flex items-center justify-center text-white text-[9px] font-bold" title={assignee.name}>
            {assignee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
          </div>
        )}
      </div>
    </motion.div>
  );
}

/* ---------- task detail slide-over ---------- */

function TaskDetail({ task, onClose, onMove }: { task: Task; onClose: () => void; onMove: (status: TaskStatus) => void }) {
  const assignee = task.assigneeId ? getUserById(task.assigneeId) : undefined;

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed inset-y-0 right-0 w-96 max-w-full bg-white shadow-2xl border-l border-gray-200 z-50 flex flex-col"
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-base font-bold text-gray-900 truncate pr-4">{task.title}</h2>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
        {/* Status */}
        <div>
          <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">Status</p>
          <div className="flex flex-wrap gap-1.5">
            {columns.map((col) => (
              <button
                key={col.id}
                onClick={() => onMove(col.id)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-medium transition-all border',
                  task.status === col.id
                    ? 'bg-[var(--wapa-green-50)] border-[var(--wapa-green-500)] text-[var(--wapa-green-700)]'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100',
                )}
              >
                {col.label}
              </button>
            ))}
          </div>
        </div>

        {/* Priority */}
        <div>
          <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">Priority</p>
          <div className="flex items-center gap-1.5">
            <span className={cn('w-2.5 h-2.5 rounded-full', priorityColors[task.priority])} />
            <span className="text-sm text-gray-700">{priorityLabels[task.priority]}</span>
          </div>
        </div>

        {/* Assignee */}
        <div>
          <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">Assignee</p>
          {assignee ? (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[var(--wapa-green-500)] flex items-center justify-center text-white text-[10px] font-bold">
                {assignee.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </div>
              <span className="text-sm text-gray-800">{assignee.name}</span>
            </div>
          ) : (
            <p className="text-sm text-gray-400">Unassigned</p>
          )}
        </div>

        {/* Due Date */}
        <div>
          <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">Due Date</p>
          {task.dueDate ? (
            <div className="flex items-center gap-1.5 text-sm text-gray-700">
              <CalendarDays className="w-4 h-4 text-gray-400" />
              {new Date(task.dueDate).toLocaleDateString('en-NG', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No due date</p>
          )}
        </div>

        {/* Description */}
        <div>
          <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">Description</p>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{task.description || 'No description'}</p>
        </div>

        {/* Notes */}
        <div>
          <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">Notes ({task.notes.length})</p>
          {task.notes.length === 0 ? (
            <p className="text-sm text-gray-400">No notes yet</p>
          ) : (
            <div className="space-y-2">
              {task.notes.map((note) => {
                const author = getUserById(note.authorId);
                return (
                  <div key={note.id} className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-xs font-semibold text-gray-800">{author?.name || 'Unknown'}</span>
                      <span className="text-[10px] text-gray-400">
                        {new Date(note.createdAt).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{note.content}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- filter dropdown ---------- */

function FilterDropdown({ label, value, options, onChange }: { label: string; value: string; options: Array<{ value: string; label: string }>; onChange: (v: string) => void }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-white border border-gray-200 rounded-lg pl-3 pr-8 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[var(--wapa-green-500)] focus:border-transparent cursor-pointer"
      >
        <option value="">{label}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
    </div>
  );
}

/* ---------- page ---------- */

export function ProjectBoardPage() {
  const [tasks, setTasks] = useState<Task[]>(() => [...mockTasks]);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterAssignee, setFilterAssignee] = useState('');
  const [filterPriority, setFilterPriority] = useState('');

  const activeFilters = useMemo(() => {
    const f: Array<{ key: string; label: string }> = [];
    if (filterAssignee) {
      const user = getUserById(filterAssignee);
      f.push({ key: 'assignee', label: user?.name.split(' ')[0] || filterAssignee });
    }
    if (filterPriority) f.push({ key: 'priority', label: priorityLabels[filterPriority as TaskPriority] });
    if (searchQuery) f.push({ key: 'search', label: `"${searchQuery}"` });
    return f;
  }, [filterAssignee, filterPriority, searchQuery]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter((t) => {
        if (searchQuery && !t.title.toLowerCase().includes(searchQuery.toLowerCase())) return false;
        if (filterAssignee && t.assigneeId !== filterAssignee) return false;
        if (filterPriority && t.priority !== filterPriority) return false;
        return true;
      })
      .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
  }, [tasks, searchQuery, filterAssignee, filterPriority]);

  const selectedTask = selectedTaskId ? tasks.find((t) => t.id === selectedTaskId) : null;

  const clearFilter = useCallback((key: string) => {
    if (key === 'assignee') setFilterAssignee('');
    if (key === 'priority') setFilterPriority('');
    if (key === 'search') setSearchQuery('');
  }, []);

  const handleMoveTask = useCallback((taskId: string, newStatus: TaskStatus) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: newStatus, completedAt: newStatus === 'done' ? new Date().toISOString() : undefined }
          : t,
      ),
    );
  }, []);

  const assigneeOptions = mockUsers.map((u) => ({ value: u.id, label: u.name }));
  const priorityOptions: Array<{ value: string; label: string }> = [
    { value: 'urgent', label: 'Urgent' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-9 pr-4 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[var(--wapa-green-500)] focus:border-transparent"
          />
        </div>
        <FilterDropdown label="Assignee" value={filterAssignee} options={assigneeOptions} onChange={setFilterAssignee} />
        <FilterDropdown label="Priority" value={filterPriority} options={priorityOptions} onChange={setFilterPriority} />

        {/* Active filter chips */}
        {activeFilters.map((f) => (
          <button
            key={f.key}
            onClick={() => clearFilter(f.key)}
            className="flex items-center gap-1.5 bg-[var(--wapa-green-50)] text-[var(--wapa-green-700)] text-xs font-medium px-2.5 py-1.5 rounded-full hover:bg-[var(--wapa-green-100)] transition-colors"
          >
            {f.label}
            <X className="w-3 h-3" />
          </button>
        ))}
      </div>

      {/* Board */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 overflow-x-auto">
        {columns.map((col) => {
          const colTasks = filteredTasks.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              className={cn('bg-gray-50 rounded-xl border-t-[3px] p-3 min-h-[400px]', col.color)}
            >
              <div className="flex items-center justify-between mb-3 px-1">
                <div className="flex items-center gap-2">
                  <span className={cn('w-2 h-2 rounded-full', col.dotColor)} />
                  <h3 className="text-sm font-semibold text-gray-700">{col.label}</h3>
                </div>
                <span className="text-xs font-medium text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">
                  {colTasks.length}
                </span>
              </div>

              <div className="space-y-2.5">
                <AnimatePresence>
                  {colTasks.map((task) => (
                    <BoardTaskCard
                      key={task.id}
                      task={task}
                      onClick={() => setSelectedTaskId(task.id)}
                    />
                  ))}
                </AnimatePresence>

                {colTasks.length === 0 && (
                  <p className="text-center text-xs text-gray-400 py-8">No tasks</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail panel */}
      <AnimatePresence>
        {selectedTask && (
          <>
            {/* backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/20 z-40"
              onClick={() => setSelectedTaskId(null)}
            />
            <TaskDetail
              task={selectedTask}
              onClose={() => setSelectedTaskId(null)}
              onMove={(status) => handleMoveTask(selectedTask.id, status)}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
