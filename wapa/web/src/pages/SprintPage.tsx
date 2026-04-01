import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Trophy,
  AlertTriangle,
} from 'lucide-react';
import { mockTasks, mockSprints, getSprintTasks, getSprintProgress } from '../data/mock-projects';
import { velocityData, burndownData } from '../data/mock-analytics';
import { mockUsers, getUserById } from '../data/mock-users';
import { cn } from '../utils/cn';
import type { TaskStatus } from '../types/task';

/* ---------- tab config ---------- */

const tabs = ['Burndown', 'Tasks', 'Stats'] as const;
type Tab = (typeof tabs)[number];

/* ---------- progress ring (sprint header) ---------- */

function MiniRing({ percent, size = 64 }: { percent: number; size?: number }) {
  const sw = 6;
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e2e8f0" strokeWidth={sw} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--wapa-green-500)"
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-gray-900">{percent}%</span>
      </div>
    </div>
  );
}

/* ---------- column colors ---------- */

const statusConfig: Record<TaskStatus, { label: string; dot: string; bg: string }> = {
  todo: { label: 'Todo', dot: 'bg-gray-400', bg: 'bg-gray-50' },
  in_progress: { label: 'In Progress', dot: 'bg-blue-500', bg: 'bg-blue-50' },
  blocked: { label: 'Blocked', dot: 'bg-red-500', bg: 'bg-red-50' },
  done: { label: 'Done', dot: 'bg-green-500', bg: 'bg-green-50' },
};

const priorityColors: Record<string, string> = { urgent: 'bg-red-500', high: 'bg-orange-500', medium: 'bg-yellow-400', low: 'bg-green-400' };

/* ---------- page ---------- */

export function SprintPage() {
  const [activeTab, setActiveTab] = useState<Tab>('Burndown');
  const sprint = mockSprints[0];
  const sprintTasks = useMemo(() => getSprintTasks(sprint.id), [sprint.id]);
  const progress = useMemo(() => getSprintProgress(sprint.id), [sprint.id]);

  const daysTotal = Math.ceil((new Date(sprint.endDate).getTime() - new Date(sprint.startDate).getTime()) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.ceil((Date.now() - new Date(sprint.startDate).getTime()) / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(0, daysTotal - daysElapsed);

  /* stats */
  const completedTasks = sprintTasks.filter((t) => t.status === 'done');
  const completionRate = sprintTasks.length > 0 ? Math.round((completedTasks.length / sprintTasks.length) * 100) : 0;
  const avgTimeDays = (() => {
    const times = completedTasks
      .filter((t) => t.completedAt && t.createdAt)
      .map((t) => (new Date(t.completedAt!).getTime() - new Date(t.createdAt).getTime()) / (1000 * 60 * 60 * 24));
    return times.length > 0 ? (times.reduce((a, b) => a + b, 0) / times.length).toFixed(1) : '-';
  })();

  /* top contributor */
  const contributorCounts: Record<string, number> = {};
  completedTasks.forEach((t) => {
    if (t.assigneeId) contributorCounts[t.assigneeId] = (contributorCounts[t.assigneeId] || 0) + 1;
  });
  const topContributorId = Object.entries(contributorCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
  const topContributor = topContributorId ? getUserById(topContributorId) : undefined;

  return (
    <div>
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-5">
          <MiniRing percent={progress.percent} />
          <div>
            <h1 className="text-xl font-bold text-gray-900">{sprint.name}</h1>
            <div className="flex items-center gap-3 text-sm text-gray-500 mt-0.5">
              <span className="flex items-center gap-1">
                <CalendarDays className="w-3.5 h-3.5" />
                {new Date(sprint.startDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })} &ndash;{' '}
                {new Date(sprint.endDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
              </span>
              <span className={cn('text-xs font-medium px-2 py-0.5 rounded-full', daysLeft <= 2 ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700')}>
                {daysLeft}d left
              </span>
            </div>
          </div>
        </div>
        <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-green-100 text-green-700 border border-green-200">
          Active
        </span>
      </div>

      {/* Tabs */}
      <div className="relative border-b border-gray-200 mb-6">
        <div className="flex gap-6">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'relative pb-3 text-sm font-medium transition-colors',
                activeTab === tab ? 'text-[var(--wapa-green-600)]' : 'text-gray-500 hover:text-gray-700',
              )}
            >
              {tab}
              {activeTab === tab && (
                <motion.div
                  layoutId="sprint-tab-underline"
                  className="absolute bottom-0 inset-x-0 h-[2px] bg-[var(--wapa-green-500)] rounded-full"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {activeTab === 'Burndown' && <BurndownTab />}
        {activeTab === 'Tasks' && <TasksTab tasks={sprintTasks} />}
        {activeTab === 'Stats' && (
          <StatsTab
            completionRate={completionRate}
            avgTime={avgTimeDays}
            topContributor={topContributor?.name}
            blockedCount={progress.blocked}
          />
        )}
      </motion.div>
    </div>
  );
}

/* ---------- Burndown Tab ---------- */

function BurndownTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Velocity chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Velocity (Last 4 Sprints)</h3>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={velocityData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="sprint" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontSize: 13 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="planned" fill="#cbd5e1" radius={[4, 4, 0, 0]} name="Planned" />
              <Bar dataKey="completed" fill="#10b857" radius={[4, 4, 0, 0]} name="Completed" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Burndown chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">Sprint Burndown</h3>
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={burndownData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 12, fill: '#94a3b8' }}
                axisLine={false}
                tickLine={false}
                label={{ value: 'Day', position: 'bottom', fontSize: 11, fill: '#94a3b8' }}
              />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', fontSize: 13 }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Line type="monotone" dataKey="ideal" stroke="#cbd5e1" strokeDasharray="5 5" strokeWidth={2} dot={false} name="Ideal" />
              <Line type="monotone" dataKey="actual" stroke="#10b857" strokeWidth={2.5} dot={{ r: 3, fill: '#10b857' }} name="Actual" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* ---------- Tasks Tab ---------- */

function TasksTab({ tasks }: { tasks: typeof mockTasks }) {
  const statuses: TaskStatus[] = ['todo', 'in_progress', 'blocked', 'done'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statuses.map((status) => {
        const colTasks = tasks.filter((t) => t.status === status);
        const cfg = statusConfig[status];
        return (
          <div key={status} className={cn('rounded-xl p-3 border-t-[3px]', `border-t-${cfg.dot.replace('bg-', '')}`, 'bg-gray-50')}>
            <div className="flex items-center gap-2 mb-3 px-1">
              <span className={cn('w-2 h-2 rounded-full', cfg.dot)} />
              <span className="text-sm font-semibold text-gray-700">{cfg.label}</span>
              <span className="text-xs text-gray-400 ml-auto">{colTasks.length}</span>
            </div>
            <div className="space-y-2">
              {colTasks.map((task) => {
                const assignee = task.assigneeId ? getUserById(task.assigneeId) : undefined;
                return (
                  <div key={task.id} className="bg-white rounded-lg border border-gray-200 p-3">
                    <div className="flex items-start gap-2 mb-1.5">
                      <span className={cn('w-2 h-2 rounded-full mt-1.5 shrink-0', priorityColors[task.priority])} />
                      <p className="text-sm font-medium text-gray-800 leading-snug line-clamp-2">{task.title}</p>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-gray-400">
                      {task.dueDate ? (
                        <span>{new Date(task.dueDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}</span>
                      ) : <span />}
                      {assignee && <span>{assignee.name.split(' ')[0]}</span>}
                    </div>
                  </div>
                );
              })}
              {colTasks.length === 0 && (
                <p className="text-center text-xs text-gray-400 py-6">No tasks</p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Stats Tab ---------- */

function StatsTab({
  completionRate,
  avgTime,
  topContributor,
  blockedCount,
}: {
  completionRate: number;
  avgTime: string | number;
  topContributor?: string;
  blockedCount: number;
}) {
  const stats = [
    { icon: CheckCircle2, label: 'Completion Rate', value: `${completionRate}%`, color: 'text-green-600 bg-green-50' },
    { icon: Clock, label: 'Avg Completion Time', value: `${avgTime} days`, color: 'text-blue-600 bg-blue-50' },
    { icon: Trophy, label: 'Top Contributor', value: topContributor || 'N/A', color: 'text-amber-600 bg-amber-50' },
    { icon: AlertTriangle, label: 'Blocked Tasks', value: String(blockedCount), color: 'text-red-600 bg-red-50' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {stats.map((stat) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center', stat.color)}>
              <stat.icon className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  );
}
