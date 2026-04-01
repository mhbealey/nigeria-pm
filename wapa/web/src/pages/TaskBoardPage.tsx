import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { tasks, sprints, projects } from '../lib/mock-data';
import { TaskCard } from '../components/tasks/TaskCard';
import { TaskDetailPanel } from '../components/tasks/TaskDetailPanel';
import type { Task, TaskStatus } from '../types';

const columns: { status: TaskStatus; label: string; headerColor: string; dotColor: string }[] = [
  { status: 'todo', label: 'Todo', headerColor: 'bg-gray-100 text-gray-700', dotColor: 'bg-gray-400' },
  { status: 'in_progress', label: 'In Progress', headerColor: 'bg-blue-100 text-blue-700', dotColor: 'bg-blue-500' },
  { status: 'blocked', label: 'Blocked', headerColor: 'bg-red-100 text-red-700', dotColor: 'bg-red-500' },
  { status: 'done', label: 'Done', headerColor: 'bg-green-100 text-green-700', dotColor: 'bg-green-500' },
];

export function TaskBoardPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  // If projectId provided, scope to that project's sprint; otherwise show all
  const activeSprint = projectId
    ? sprints.find((s) => s.projectId === projectId && s.status === 'active')
    : sprints.find((s) => s.status === 'active');

  const project = projectId
    ? projects.find((p) => p.id === projectId)
    : activeSprint
      ? projects.find((p) => p.id === activeSprint.projectId)
      : projects[0];

  const boardTasks = activeSprint
    ? tasks.filter((t) => t.sprintId === activeSprint.id)
    : tasks;

  return (
    <div className="p-6 lg:p-8 h-full flex flex-col">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-900">Sprint Board</h1>
        <p className="text-sm text-gray-500 mt-1">
          {activeSprint ? `${activeSprint.name} - ${project?.name}` : 'All Tasks'}
        </p>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colTasks = boardTasks.filter((t) => t.status === col.status);
          return (
            <div key={col.status} className="flex-1 min-w-[260px] flex flex-col">
              {/* Column Header */}
              <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${col.headerColor}`}>
                <span className={`inline-block w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                <span className="text-sm font-semibold">{col.label}</span>
                <span className="ml-auto text-xs font-medium opacity-70">{colTasks.length}</span>
              </div>

              {/* Column Content */}
              <div className="flex-1 space-y-3 overflow-y-auto rounded-lg bg-gray-50 p-2 min-h-[200px]">
                {colTasks.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-8">No tasks</p>
                ) : (
                  colTasks.map((task) => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      onClick={() => setSelectedTask(task)}
                    />
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Task Detail Panel */}
      {selectedTask && (
        <TaskDetailPanel task={selectedTask} onClose={() => setSelectedTask(null)} />
      )}
    </div>
  );
}
