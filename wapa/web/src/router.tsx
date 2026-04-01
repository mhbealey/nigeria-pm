import { createHashRouter } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DemoPage } from './pages/DemoPage';
import { DashboardLayout } from './pages/DashboardLayout';
import { DashboardOverview } from './pages/DashboardOverview';
import { ProjectBoardPage } from './pages/ProjectBoardPage';
import { SprintPage } from './pages/SprintPage';
import { TeamPage } from './pages/TeamPage';
import { SettingsPage } from './pages/SettingsPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/demo',
    element: <DemoPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardOverview /> },
      { path: 'board', element: <ProjectBoardPage /> },
      { path: 'sprint', element: <SprintPage /> },
      { path: 'team', element: <TeamPage /> },
      { path: 'settings', element: <SettingsPage /> },
    ],
  },
]);
