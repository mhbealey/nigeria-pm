import { useState } from 'react';
import { Search } from 'lucide-react';
import { tasks } from '../lib/mock-data';
import { TaskRow } from '../components/tasks/TaskRow';
import { TaskDetailPanel } from '../components/tasks/TaskDetailPanel';
import type { Task, TaskStatus } from '../types';

const filterTabs: { label: string; value: TaskStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Todo', value: 'todo' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Done', value: 'done' },
];

export function AnalyticsPage() {
  const [activeFilter, setActiveFilter] = useState<TaskStatus | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const filteredTasks = tasks
    .filter((t) => activeFilter === 'all' || t.status === activeFilter)
    .filter((t) =>
      search.trim() === '' ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.assignee?.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">All Tasks</h1>
        <p className="text-sm text-gray-500 mt-1">{tasks.length} tasks across all projects</p>
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks by title or assignee..."
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-wapa-500 focus:border-transparent bg-white"
        />
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-gray-200 pb-px">
        {filterTabs.map((tab) => {
          const count = tab.value === 'all'
            ? tasks.length
            : tasks.filter((t) => t.status === tab.value).length;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveFilter(tab.value)}
              className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                activeFilter === tab.value
                  ? 'border-wapa-500 text-wapa-700'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span className="ml-1.5 text-xs text-gray-400">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Task List */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {filteredTasks.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-8">
            {search ? 'No tasks match your search' : 'No tasks match this filter'}
          </p>
        ) : (
          filteredTasks.map((task) => (
            <TaskRow key={task.id} task={task} onClick={() => setSelectedTask(task)} />
          ))
        )}
      </div>

      <p className="text-xs text-gray-400 mt-3 text-right">
        Showing {filteredTasks.length} of {tasks.length} tasks
      </p>

      {/* Task Detail Panel */}
      {selectedTask && (
        <TaskDetailPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
}
