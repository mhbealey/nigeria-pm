import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  CheckCircle2,
  Gauge,
  Clock,
  AlertTriangle,
  TrendingUp,
  CalendarDays,
} from 'lucide-react';
import { mockTasks, mockSprints, getSprintProgress } from '../data/mock-projects';
import { activityFeed, upcomingDueDates } from '../data/mock-analytics';
import { mockUsers, getUserById } from '../data/mock-users';
import { cn } from '../utils/cn';
import type { TaskStatus } from '../types/task';

/* ---------- animated counter ---------- */

function useCountUp(target: number, duration = 1200) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const startTime = performance.now();
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * target);
      setCount(start);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return { count, ref };
}

function CountUpStat({ value, suffix = '' }: { value: number; suffix?: string }) {
  const { count, ref } = useCountUp(value);
  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ---------- stagger wrapper ---------- */

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};
const fadeSlide = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

/* ---------- progress ring ---------- */

function ProgressRing({ percent, size = 120, strokeWidth = 10, label }: { percent: number; size?: number; strokeWidth?: number; label?: string }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const ref = useRef<SVGCircleElement>(null);
  const inView = useInView(ref as unknown as React.RefObject<Element>, { once: true });

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#e2e8f0" strokeWidth={strokeWidth} />
        <circle
          ref={ref}
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--wapa-green-500)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={inView ? offset : circumference}
          style={{ transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center" style={{ width: size, height: size }}>
        <span className="text-2xl font-bold text-gray-900">{percent}%</span>
        {label && <span className="text-xs text-gray-500">{label}</span>}
      </div>
    </div>
  );
}

/* ---------- sprint progress bar ---------- */

function SprintProgressBar() {
  const sprint = mockSprints[0];
  const progress = getSprintProgress(sprint.id);
  const daysTotal = Math.ceil((new Date(sprint.endDate).getTime() - new Date(sprint.startDate).getTime()) / (1000 * 60 * 60 * 24));
  const daysElapsed = Math.ceil((Date.now() - new Date(sprint.startDate).getTime()) / (1000 * 60 * 60 * 24));
  const daysLeft = Math.max(0, daysTotal - daysElapsed);

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">{sprint.name}</h3>
        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
          {daysLeft}d left
        </span>
      </div>
      <div className="flex items-center gap-1.5 h-4 rounded-full overflow-hidden bg-gray-100 mb-3">
        <div className="h-full bg-green-500 rounded-l-full transition-all duration-700" style={{ width: `${(progress.done / progress.total) * 100}%` }} />
        <div className="h-full bg-blue-500 transition-all duration-700" style={{ width: `${(progress.inProgress / progress.total) * 100}%` }} />
        <div className="h-full bg-red-400 transition-all duration-700" style={{ width: `${(progress.blocked / progress.total) * 100}%` }} />
      </div>
      <div className="flex items-center gap-4 text-[11px] font-medium text-gray-500">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500" /> {progress.done} Done</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500" /> {progress.inProgress} Active</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-300" /> {progress.todo} Todo</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400" /> {progress.blocked} Blocked</span>
      </div>
    </div>
  );
}

/* ---------- activity feed ---------- */

const typeIcons: Record<string, string> = {
  task_created: 'bg-blue-100 text-blue-600',
  task_completed: 'bg-green-100 text-green-600',
  task_blocked: 'bg-red-100 text-red-600',
  task_assigned: 'bg-purple-100 text-purple-600',
  sprint_started: 'bg-amber-100 text-amber-600',
  note_added: 'bg-gray-100 text-gray-600',
  status_changed: 'bg-sky-100 text-sky-600',
};

function TeamActivityFeed() {
  const items = activityFeed.slice(-12).reverse();

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <h3 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h3>
      <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
        {items.map((item) => {
          const colorClass = typeIcons[item.type] || 'bg-gray-100 text-gray-600';
          const timeAgo = formatTimeAgo(item.timestamp);
          return (
            <div key={item.id} className="flex items-start gap-3">
              <div className={cn('w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs', colorClass)}>
                <TrendingUp className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-gray-700 leading-snug">{item.text}</p>
                <p className="text-[11px] text-gray-400 mt-0.5">{timeAgo}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function formatTimeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  if (hours < 1) return 'Just now';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

/* ---------- due dates ---------- */

const statusColors: Record<string, string> = {
  todo: 'bg-gray-100 text-gray-700',
  in_progress: 'bg-blue-100 text-blue-700',
  blocked: 'bg-red-100 text-red-700',
  done: 'bg-green-100 text-green-700',
};

function UpcomingDueDates() {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5">
      <div className="flex items-center gap-2 mb-4">
        <CalendarDays className="w-4 h-4 text-gray-400" />
        <h3 className="text-sm font-semibold text-gray-900">Upcoming Due Dates</h3>
      </div>
      <div className="space-y-2.5 max-h-[340px] overflow-y-auto">
        {upcomingDueDates.map((item) => {
          const user = getUserById(item.assigneeId);
          const isOverdue = new Date(item.dueDate) < new Date() && item.status !== 'done';
          return (
            <div key={item.taskId} className="flex items-center gap-3 py-1.5">
              <div className={cn('shrink-0 w-1.5 h-8 rounded-full', isOverdue ? 'bg-red-500' : 'bg-gray-200')} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800 truncate">{item.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className={cn('text-[10px] font-medium px-1.5 py-0.5 rounded', statusColors[item.status] || 'bg-gray-100 text-gray-600')}>
                    {item.status.replace('_', ' ')}
                  </span>
                  <span className={cn('text-[10px]', isOverdue ? 'text-red-500 font-medium' : 'text-gray-400')}>
                    {new Date(item.dueDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                  </span>
                  {user && <span className="text-[10px] text-gray-400">{user.name.split(' ')[0]}</span>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ---------- page ---------- */

export function DashboardOverview() {
  const sprintProgress = getSprintProgress('spr-1');
  const doneTasks = mockTasks.filter((t) => t.status === 'done').length;
  const totalVelocity = mockUsers.reduce((sum, u) => sum + u.velocity[u.velocity.length - 1], 0);
  const blockedCount = mockTasks.filter((t) => t.status === 'blocked').length;

  const stats = [
    { title: 'Tasks Done', value: doneTasks, icon: CheckCircle2, trend: { value: '+3 this week', positive: true }, color: 'border-l-4 border-l-green-500' },
    { title: 'Velocity', value: totalVelocity, suffix: ' pts', icon: Gauge, trend: { value: '+2 vs last sprint', positive: true }, color: 'border-l-4 border-l-blue-500' },
    { title: 'Avg Time', value: 1.8, suffix: ' days', icon: Clock, trend: { value: '-0.3 days', positive: true }, color: 'border-l-4 border-l-amber-500' },
    { title: 'Blocked', value: blockedCount, icon: AlertTriangle, trend: { value: '+1 today', positive: false }, color: 'border-l-4 border-l-red-500' },
  ];

  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="space-y-6">
      {/* Row 1: Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <motion.div key={stat.title} variants={fadeSlide}>
            <div className={cn('bg-white rounded-xl border border-gray-200 p-5 shadow-sm', stat.color)}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                  <p className="mt-1 text-2xl font-bold text-gray-900">
                    {typeof stat.value === 'number' && stat.value === Math.round(stat.value) ? (
                      <CountUpStat value={stat.value} suffix={stat.suffix} />
                    ) : (
                      <>
                        {stat.value}
                        {stat.suffix}
                      </>
                    )}
                  </p>
                  {stat.trend && (
                    <p className={cn('mt-1 text-xs font-medium', stat.trend.positive ? 'text-green-600' : 'text-red-600')}>
                      {stat.trend.positive ? '\u2191' : '\u2193'} {stat.trend.value}
                    </p>
                  )}
                </div>
                <div className="text-gray-300">
                  <stat.icon className="w-8 h-8" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Row 2: Progress Ring + Sprint Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <motion.div variants={fadeSlide}>
          <div className="bg-white rounded-xl border border-gray-200 p-6 flex items-center gap-8">
            <div className="relative">
              <ProgressRing percent={sprintProgress.percent} label={`${sprintProgress.done} of ${sprintProgress.total} tasks`} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">Sprint Completion</h3>
              <p className="text-sm text-gray-500 mb-3">Sprint 4 is {sprintProgress.percent}% done</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--wapa-green-500)]" /> Complete</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-gray-200" /> Remaining</span>
              </div>
            </div>
          </div>
        </motion.div>
        <motion.div variants={fadeSlide}>
          <SprintProgressBar />
        </motion.div>
      </div>

      {/* Row 3: Activity + Due Dates */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <motion.div variants={fadeSlide} className="lg:col-span-3">
          <TeamActivityFeed />
        </motion.div>
        <motion.div variants={fadeSlide} className="lg:col-span-2">
          <UpcomingDueDates />
        </motion.div>
      </div>
    </motion.div>
  );
}
