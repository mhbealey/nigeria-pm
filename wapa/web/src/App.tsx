import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { ProjectPage } from './pages/ProjectPage';
import { TaskBoardPage } from './pages/TaskBoardPage';
import { TeamPage } from './pages/TeamPage';
import { MessagesPage } from './pages/MessagesPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ProjectsListPage } from './pages/ProjectsListPage';

export function App() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/projects" element={<ProjectsListPage />} />
          <Route path="/projects/:projectId" element={<ProjectPage />} />
          <Route path="/tasks" element={<AnalyticsPage />} />
          <Route path="/sprint" element={<TaskBoardPage />} />
          <Route path="/board/:projectId" element={<TaskBoardPage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/chat" element={<MessagesPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}
