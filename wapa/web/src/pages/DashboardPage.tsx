import { useState } from 'react';
import {
  CheckCircle2, Clock, AlertTriangle, ListTodo, CalendarDays,
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { SprintCard } from '../components/dashboard/SprintCard';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';
import { TaskRow } from '../components/tasks/TaskRow';
import { TaskDetailPanel } from '../components/tasks/TaskDetailPanel';
import {
  tasks, sprints, projects, users, recentMessages, getSprintTasks, getUserTasks,
} from '../lib/mock-data';
import type { Task, ChatMessage } from '../types';

const currentUser = users[0]; // Ade Johnson

function toActivityMessages(): ChatMessage[] {
  return recentMessages.map((m) => ({
    id: m.id,
    content: m.content,
    sender: m.direction === 'inbound' ? 'user' as const : 'wapa' as const,
    timestamp: m.timestamp,
  }));
}

export function DashboardPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((t) => t.status === 'done').length;
  const inProgressTasks = tasks.filter((t) => t.status === 'in_progress').length;
  const blockedTasks = tasks.filter((t) => t.status === 'blocked').length;

  const myTasks = getUserTasks(currentUser.id).filter((t) => t.status !== 'done');
  const activeSprints = sprints.filter((s) => s.status === 'active');

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-NG', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="p-6 lg:p-8 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Good morning, Ade <span role="img" aria-label="wave">&#128075;</span>
        </h1>
        <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
          <CalendarDays className="w-4 h-4" />
          {dateStr}
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          icon={<ListTodo className="w-6 h-6" />}
          trend={{ value: '20 this sprint', positive: true }}
        />
        <StatCard
          title="Completed"
          value={completedTasks}
          icon={<CheckCircle2 className="w-6 h-6" />}
          trend={{ value: `${Math.round((completedTasks / totalTasks) * 100)}% done`, positive: true }}
        />
        <StatCard
          title="In Progress"
          value={inProgressTasks}
          icon={<Clock className="w-6 h-6" />}
        />
        <StatCard
          title="Blocked"
          value={blockedTasks}
          icon={<AlertTriangle className="w-6 h-6" />}
          color="bg-white"
          trend={{ value: `${blockedTasks} need attention`, positive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Sprints + My Tasks */}
        <div className="lg:col-span-2 space-y-6">
          {/* Active Sprints */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">Active Sprints</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeSprints.map((sprint) => {
                const project = projects.find((p) => p.id === sprint.projectId);
                return (
                  <SprintCard
                    key={sprint.id}
                    sprint={sprint}
                    projectName={project?.name || 'Unknown'}
                    tasks={getSprintTasks(sprint.id)}
                  />
                );
              })}
            </div>
          </div>

          {/* My Tasks */}
          <div>
            <h2 className="text-lg font-bold text-gray-900 mb-4">
              My Tasks <span className="text-sm font-normal text-gray-500">({myTasks.length} open)</span>
            </h2>
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
              {myTasks.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">All caught up!</p>
              ) : (
                myTasks.map((task) => (
                  <TaskRow key={task.id} task={task} onClick={() => setSelectedTask(task)} />
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right column: Activity Feed */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 mb-4">Activity Feed</h2>
          <ActivityFeed messages={toActivityMessages()} />
        </div>
      </div>

      {/* Task Detail Panel */}
      {selectedTask && (
        <TaskDetailPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
}
