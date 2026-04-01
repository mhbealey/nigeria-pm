import { useNavigate } from 'react-router-dom';
import { FolderKanban, ArrowRight } from 'lucide-react';
import { projects, getProjectTasks } from '../lib/mock-data';
import { ProgressBar } from '../components/common/ProgressBar';

export function ProjectsListPage() {
  const navigate = useNavigate();

  return (
    <div className="p-6 lg:p-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-900">Projects</h1>
        <p className="text-sm text-gray-500 mt-1">{projects.length} projects</p>
      </div>

      {/* Project Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project) => {
          const percent = project.taskCount > 0
            ? Math.round((project.completedCount / project.taskCount) * 100)
            : 0;
          const projectTasks = getProjectTasks(project.id);
          const inProgress = projectTasks.filter((t) => t.status === 'in_progress').length;
          const blocked = projectTasks.filter((t) => t.status === 'blocked').length;

          return (
            <div
              key={project.id}
              onClick={() => navigate(`/projects/${project.id}`)}
              className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-wapa-50 flex items-center justify-center">
                    <FolderKanban className="w-5 h-5 text-wapa-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 group-hover:text-wapa-700 transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {project.taskCount} tasks
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    project.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {project.status === 'active' ? 'Active' : 'Archived'}
                </span>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                  <span>{project.completedCount} / {project.taskCount} done</span>
                  <span className="font-semibold">{percent}%</span>
                </div>
                <ProgressBar percent={percent} size="sm" showLabel={false} />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  {inProgress > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-blue-500" />
                      {inProgress} active
                    </span>
                  )}
                  {blocked > 0 && (
                    <span className="flex items-center gap-1">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                      {blocked} blocked
                    </span>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-wapa-500 transition-colors" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
