import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, CheckCircle2, Flame, X, CalendarDays } from 'lucide-react';
import { mockUsers, getUserById } from '../data/mock-users';
import { mockTasks } from '../data/mock-projects';
import { cn } from '../utils/cn';
import type { Task } from '../types/task';

/* ---------- avatar colors ---------- */

const palette = ['#10b857', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#6366f1', '#06b6d4'];

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return Math.abs(hash);
}

/* ---------- helpers ---------- */

function maskPhone(phone: string): string {
  if (phone.length < 8) return phone;
  return phone.slice(0, 4) + ' **** ' + phone.slice(-4);
}

function getUserTasks(userId: string): Task[] {
  return mockTasks.filter((t) => t.assigneeId === userId);
}

function getStreak(userId: string): number {
  const completed = mockTasks.filter((t) => t.assigneeId === userId && t.status === 'done');
  return completed.length;
}

const priorityColors: Record<string, string> = { urgent: 'bg-red-500', high: 'bg-orange-500', medium: 'bg-yellow-400', low: 'bg-green-400' };

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const cardFade = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

/* ---------- page ---------- */

export function TeamPage() {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Team</h1>
          <p className="text-sm text-gray-500 mt-0.5">{mockUsers.length} members</p>
        </div>
      </div>

      {/* Grid of member cards */}
      <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockUsers.map((user) => {
          const tasks = getUserTasks(user.id);
          const openTasks = tasks.filter((t) => t.status !== 'done').length;
          const completedTasks = tasks.filter((t) => t.status === 'done').length;
          const streak = getStreak(user.id);
          const bgColor = palette[hashName(user.name) % palette.length];

          return (
            <motion.div key={user.id} variants={cardFade}>
              <div
                onClick={() => setSelectedUserId(selectedUserId === user.id ? null : user.id)}
                className={cn(
                  'bg-white rounded-xl border border-gray-200 p-5 cursor-pointer transition-all duration-300',
                  'hover:shadow-lg hover:border-[var(--wapa-green-300)]',
                  selectedUserId === user.id && 'ring-2 ring-[var(--wapa-green-500)] border-transparent shadow-lg',
                )}
              >
                <div className="flex items-center gap-4 mb-4">
                  {/* Avatar */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold ring-4 ring-white shadow-md shrink-0"
                    style={{ backgroundColor: bgColor }}
                  >
                    {user.name.split(' ').map((n) => n[0]).join('').toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 truncate">{user.name}</h3>
                    <span className={cn(
                      'inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium mt-1',
                      user.role === 'admin' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600',
                    )}>
                      {user.role === 'admin' ? 'Admin' : 'Member'}
                    </span>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                  <Phone className="w-3.5 h-3.5" />
                  {maskPhone(user.phone)}
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <div className="w-5 h-5 rounded bg-blue-50 flex items-center justify-center">
                      <span className="text-blue-600 font-bold text-[10px]">{openTasks}</span>
                    </div>
                    <span>Open</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-gray-500">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>{completedTasks} done</span>
                  </div>
                  {streak > 0 && (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Flame className="w-4 h-4" />
                      <span className="font-medium">{streak}</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Selected user's tasks */}
      <AnimatePresence>
        {selectedUserId && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-6 overflow-hidden"
          >
            <UserTasksPanel userId={selectedUserId} onClose={() => setSelectedUserId(null)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- user tasks panel ---------- */

function UserTasksPanel({ userId, onClose }: { userId: string; onClose: () => void }) {
  const user = getUserById(userId);
  const tasks = getUserTasks(userId);

  if (!user) return null;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">
          {user.name.split(' ')[0]}'s Tasks ({tasks.length})
        </h3>
        <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-gray-400 py-4 text-center">No tasks assigned</p>
      ) : (
        <div className="space-y-2">
          {tasks.map((task) => {
            const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== 'done';
            return (
              <div
                key={task.id}
                className={cn(
                  'flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors',
                  task.status === 'blocked' && 'border-l-[3px] border-l-red-500',
                )}
              >
                <span className={cn('w-2 h-2 rounded-full shrink-0', priorityColors[task.priority])} />
                <div className="flex-1 min-w-0">
                  <p className={cn('text-sm font-medium truncate', task.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-800')}>
                    {task.title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={cn(
                      'text-[10px] font-medium px-1.5 py-0.5 rounded',
                      task.status === 'done' ? 'bg-green-100 text-green-700' :
                      task.status === 'blocked' ? 'bg-red-100 text-red-700' :
                      task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-gray-100 text-gray-600',
                    )}>
                      {task.status.replace('_', ' ')}
                    </span>
                    {task.dueDate && (
                      <span className={cn('text-[10px] flex items-center gap-0.5', isOverdue ? 'text-red-500' : 'text-gray-400')}>
                        <CalendarDays className="w-3 h-3" />
                        {new Date(task.dueDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Velocity chart */}
      {user.velocity.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider mb-2">Velocity (last 4 sprints)</p>
          <div className="flex items-end gap-1.5 h-12">
            {user.velocity.map((v, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${(v / Math.max(...user.velocity)) * 100}%` }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="flex-1 bg-[var(--wapa-green-400)] rounded-t"
                title={`Sprint ${i + 1}: ${v} pts`}
              />
            ))}
          </div>
          <div className="flex items-center justify-between text-[10px] text-gray-400 mt-1">
            <span>S1</span>
            <span>S4</span>
          </div>
        </div>
      )}
    </div>
  );
}
