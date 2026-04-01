import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, FolderKanban } from 'lucide-react';
import { projects, sprints, getProjectTasks } from '../lib/mock-data';
import { TaskRow } from '../components/tasks/TaskRow';
import { TaskDetailPanel } from '../components/tasks/TaskDetailPanel';
import { ProgressBar } from '../components/common/ProgressBar';
import { StatusBadge } from '../components/common/StatusBadge';
import type { Task, TaskStatus } from '../types';

const filterTabs: { label: string; value: TaskStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Todo', value: 'todo' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Blocked', value: 'blocked' },
  { label: 'Done', value: 'done' },
];

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeFilter, setActiveFilter] = useState<TaskStatus | 'all'>('all');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const project = projects.find((p) => p.id === projectId);
  if (!project) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <FolderKanban className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">Project not found</p>
          <Link to="/projects" className="text-wapa-600 hover:underline text-sm mt-2 inline-block">
            Back to projects
          </Link>
        </div>
      </div>
    );
  }

  const projectTasks = getProjectTasks(project.id);
  const projectSprints = sprints.filter((s) => s.projectId === project.id);
  const activeSprint = projectSprints.find((s) => s.status === 'active');
  const percent = project.taskCount > 0 ? Math.round((project.completedCount / project.taskCount) * 100) : 0;

  const filteredTasks = activeFilter === 'all'
    ? projectTasks
    : projectTasks.filter((t) => t.status === activeFilter);

  return (
    <div className="p-6 lg:p-8 max-w-5xl">
      {/* Back link */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All Projects
      </Link>

      {/* Project Header */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
            <p className="text-sm text-gray-500 mt-1">
              Created {new Date(project.createdAt).toLocaleDateString('en-NG', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              project.status === 'active'
                ? 'bg-green-100 text-green-700'
                : 'bg-gray-100 text-gray-600'
            }`}
          >
            {project.status === 'active' ? 'Active' : 'Archived'}
          </span>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>{project.completedCount} of {project.taskCount} tasks complete</span>
            <span className="font-semibold">{percent}%</span>
          </div>
          <ProgressBar percent={percent} size="md" showLabel={false} />
        </div>

        {activeSprint && (
          <div className="flex items-center gap-3 bg-blue-50 rounded-lg px-4 py-3">
            <span className="inline-block w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <div className="text-sm">
              <span className="font-semibold text-blue-900">{activeSprint.name}</span>
              <span className="text-blue-600 ml-2">
                {new Date(activeSprint.startDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
                {' - '}
                {new Date(activeSprint.endDate).toLocaleDateString('en-NG', { month: 'short', day: 'numeric' })}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 mb-4 border-b border-gray-200 pb-px">
        {filterTabs.map((tab) => {
          const count = tab.value === 'all'
            ? projectTasks.length
            : projectTasks.filter((t) => t.status === tab.value).length;
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
          <p className="text-sm text-gray-400 text-center py-8">No tasks match this filter</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskRow key={task.id} task={task} onClick={() => setSelectedTask(task)} />
          ))
        )}
      </div>

      {/* Task Detail Panel */}
      {selectedTask && (
        <TaskDetailPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
}
