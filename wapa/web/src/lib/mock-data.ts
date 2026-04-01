import type { User, Team, Project, Sprint, Task, ChatMessage } from '../types';

export const users: User[] = [
  { id: 'u1', name: 'Ade Johnson', phone: '+2348012345678', avatar: '🧑🏾‍💻', timezone: 'Africa/Lagos' },
  { id: 'u2', name: 'Sarah Okafor', phone: '+2348023456789', avatar: '👩🏽‍🎨', timezone: 'Africa/Lagos' },
  { id: 'u3', name: 'Mike Chen', phone: '+6591234567', avatar: '👨🏻‍💼', timezone: 'Asia/Singapore' },
  { id: 'u4', name: 'Fatima Al-Hassan', phone: '+971501234567', avatar: '👩🏽‍🔬', timezone: 'Asia/Dubai' },
  { id: 'u5', name: 'David Kim', phone: '+821012345678', avatar: '👨🏻‍🎤', timezone: 'Asia/Seoul' },
];

export const currentUser = users[0];

export const team: Team = {
  id: 't1',
  name: 'WAPA Dev Team',
  members: [
    { user: users[0], role: 'admin', joinedAt: '2024-01-15' },
    { user: users[1], role: 'member', joinedAt: '2024-01-16' },
    { user: users[2], role: 'member', joinedAt: '2024-01-20' },
    { user: users[3], role: 'member', joinedAt: '2024-02-01' },
    { user: users[4], role: 'member', joinedAt: '2024-02-10' },
  ],
};

export const projects: Project[] = [
  { id: 'p1', name: 'Website Redesign', status: 'active', teamId: 't1', taskCount: 12, completedCount: 5, createdAt: '2024-01-20' },
  { id: 'p2', name: 'Mobile App v2', status: 'active', teamId: 't1', taskCount: 8, completedCount: 2, createdAt: '2024-02-01' },
  { id: 'p3', name: 'API Integration', status: 'active', teamId: 't1', taskCount: 6, completedCount: 6, createdAt: '2024-01-10' },
  { id: 'p4', name: 'Brand Guidelines', status: 'archived', teamId: 't1', taskCount: 4, completedCount: 4, createdAt: '2023-12-01' },
];

export const sprints: Sprint[] = [
  { id: 's1', name: 'Sprint 7', projectId: 'p1', startDate: '2024-03-18', endDate: '2024-04-01', status: 'active' },
  { id: 's2', name: 'Sprint 3', projectId: 'p2', startDate: '2024-03-25', endDate: '2024-04-08', status: 'active' },
  { id: 's3', name: 'Sprint 6', projectId: 'p1', startDate: '2024-03-04', endDate: '2024-03-18', status: 'completed' },
];

export const tasks: Task[] = [
  // Website Redesign - Sprint 7
  { id: 'tk1', title: 'Design new landing page', description: 'Create a modern, conversion-focused landing page', status: 'done', priority: 'high', projectId: 'p1', sprintId: 's1', assignee: users[1], creator: users[0], dueDate: '2024-03-22', completedAt: '2024-03-21', createdAt: '2024-03-18', notes: [{ id: 'n1', content: 'Client approved the wireframe', author: users[1], createdAt: '2024-03-20' }] },
  { id: 'tk2', title: 'Implement auth flow', description: 'OAuth2 with Google and GitHub', status: 'in_progress', priority: 'urgent', projectId: 'p1', sprintId: 's1', assignee: users[0], creator: users[0], dueDate: '2024-03-28', completedAt: null, createdAt: '2024-03-18', notes: [] },
  { id: 'tk3', title: 'Set up CI/CD pipeline', description: 'GitHub Actions with staging and production', status: 'done', priority: 'high', projectId: 'p1', sprintId: 's1', assignee: users[2], creator: users[0], dueDate: '2024-03-25', completedAt: '2024-03-24', createdAt: '2024-03-18', notes: [] },
  { id: 'tk4', title: 'Fix payment integration bug', description: 'Stripe webhook not processing correctly', status: 'blocked', priority: 'urgent', projectId: 'p1', sprintId: 's1', assignee: users[2], creator: users[1], dueDate: '2024-03-26', completedAt: null, createdAt: '2024-03-19', notes: [{ id: 'n2', content: 'Waiting on Stripe support response', author: users[2], createdAt: '2024-03-23' }] },
  { id: 'tk5', title: 'Write API documentation', description: 'OpenAPI spec for all endpoints', status: 'todo', priority: 'medium', projectId: 'p1', sprintId: 's1', assignee: users[0], creator: users[0], dueDate: '2024-03-29', completedAt: null, createdAt: '2024-03-18', notes: [] },
  { id: 'tk6', title: 'Design onboarding flow', description: 'First-time user experience', status: 'todo', priority: 'medium', projectId: 'p1', sprintId: 's1', assignee: users[1], creator: users[0], dueDate: '2024-03-30', completedAt: null, createdAt: '2024-03-19', notes: [] },
  { id: 'tk7', title: 'Performance audit', description: 'Lighthouse score > 90', status: 'todo', priority: 'low', projectId: 'p1', sprintId: 's1', assignee: users[3], creator: users[0], dueDate: '2024-04-01', completedAt: null, createdAt: '2024-03-20', notes: [] },
  { id: 'tk8', title: 'User feedback survey', description: 'Create and send beta user survey', status: 'in_progress', priority: 'medium', projectId: 'p1', sprintId: 's1', assignee: users[3], creator: users[1], dueDate: '2024-03-27', completedAt: null, createdAt: '2024-03-19', notes: [{ id: 'n3', content: 'Survey draft ready for review', author: users[3], createdAt: '2024-03-25' }] },
  { id: 'tk9', title: 'Mobile responsive fixes', description: 'Fix layout issues on iOS Safari', status: 'done', priority: 'high', projectId: 'p1', sprintId: 's1', assignee: users[4], creator: users[1], dueDate: '2024-03-24', completedAt: '2024-03-23', createdAt: '2024-03-18', notes: [] },
  { id: 'tk10', title: 'Database migration script', description: 'Migrate from v1 to v2 schema', status: 'done', priority: 'high', projectId: 'p1', sprintId: 's1', assignee: users[2], creator: users[0], dueDate: '2024-03-22', completedAt: '2024-03-21', createdAt: '2024-03-18', notes: [] },
  { id: 'tk11', title: 'Add dark mode support', description: 'System preference detection + toggle', status: 'done', priority: 'low', projectId: 'p1', sprintId: 's1', assignee: users[4], creator: users[4], dueDate: '2024-03-25', completedAt: '2024-03-24', createdAt: '2024-03-19', notes: [] },
  { id: 'tk12', title: 'Security headers audit', description: 'CSP, HSTS, X-Frame-Options', status: 'in_progress', priority: 'high', projectId: 'p1', sprintId: 's1', assignee: users[0], creator: users[2], dueDate: '2024-03-29', completedAt: null, createdAt: '2024-03-20', notes: [] },
  // Mobile App v2 - Sprint 3
  { id: 'tk13', title: 'Push notification system', description: 'FCM integration for Android + iOS', status: 'in_progress', priority: 'high', projectId: 'p2', sprintId: 's2', assignee: users[2], creator: users[0], dueDate: '2024-04-02', completedAt: null, createdAt: '2024-03-25', notes: [] },
  { id: 'tk14', title: 'Offline mode', description: 'SQLite local cache for offline access', status: 'todo', priority: 'high', projectId: 'p2', sprintId: 's2', assignee: users[4], creator: users[0], dueDate: '2024-04-05', completedAt: null, createdAt: '2024-03-25', notes: [] },
  { id: 'tk15', title: 'Biometric auth', description: 'FaceID and fingerprint login', status: 'done', priority: 'medium', projectId: 'p2', sprintId: 's2', assignee: users[0], creator: users[0], dueDate: '2024-03-29', completedAt: '2024-03-28', createdAt: '2024-03-25', notes: [] },
  { id: 'tk16', title: 'App store screenshots', description: 'Design screenshots for iOS and Android', status: 'done', priority: 'medium', projectId: 'p2', sprintId: 's2', assignee: users[1], creator: users[1], dueDate: '2024-03-30', completedAt: '2024-03-29', createdAt: '2024-03-25', notes: [] },
  { id: 'tk17', title: 'Crash reporting setup', description: 'Sentry for mobile with source maps', status: 'todo', priority: 'medium', projectId: 'p2', sprintId: 's2', assignee: users[2], creator: users[0], dueDate: '2024-04-04', completedAt: null, createdAt: '2024-03-26', notes: [] },
  { id: 'tk18', title: 'Deep linking', description: 'Universal links for iOS, App Links for Android', status: 'todo', priority: 'low', projectId: 'p2', sprintId: 's2', assignee: users[3], creator: users[0], dueDate: '2024-04-07', completedAt: null, createdAt: '2024-03-26', notes: [] },
  { id: 'tk19', title: 'Accessibility audit', description: 'WCAG 2.1 AA compliance', status: 'blocked', priority: 'medium', projectId: 'p2', sprintId: 's2', assignee: users[3], creator: users[1], dueDate: '2024-04-03', completedAt: null, createdAt: '2024-03-27', notes: [{ id: 'n4', content: 'Need VoiceOver test device', author: users[3], createdAt: '2024-03-29' }] },
  { id: 'tk20', title: 'Beta release prep', description: 'TestFlight + Google Play Internal Testing', status: 'todo', priority: 'high', projectId: 'p2', sprintId: 's2', assignee: users[0], creator: users[0], dueDate: '2024-04-08', completedAt: null, createdAt: '2024-03-27', notes: [] },
];

export const chatHistory: ChatMessage[] = [
  { id: 'c1', content: 'hey wapa', sender: 'user', timestamp: '2024-03-25T09:00:00Z' },
  { id: 'c2', content: 'Hey Ade! 👋 What can I help you with today?', sender: 'wapa', timestamp: '2024-03-25T09:00:01Z' },
  { id: 'c3', content: 'add task: design new dashboard widgets', sender: 'user', timestamp: '2024-03-25T09:01:00Z' },
  { id: 'c4', content: '✅ Task created — *Design new dashboard widgets* — assigned to you, due April 1', sender: 'wapa', timestamp: '2024-03-25T09:01:01Z' },
  { id: 'c5', content: "how's the sprint?", sender: 'user', timestamp: '2024-03-25T09:02:00Z' },
  { id: 'c6', content: "Sprint 7 is looking good! 🔥\n\n████████░░ 67%\n\n✅ Done: 5 | 🔄 In progress: 3 | ⬜ Todo: 3 | 🚫 Blocked: 1\n\n4 days left — you've got this!", sender: 'wapa', timestamp: '2024-03-25T09:02:01Z' },
  { id: 'c7', content: 'assign auth flow to sarah', sender: 'user', timestamp: '2024-03-25T09:03:00Z' },
  { id: 'c8', content: "Done — Sarah's on it 👍", sender: 'wapa', timestamp: '2024-03-25T09:03:01Z' },
  { id: 'c9', content: "what's on my plate?", sender: 'user', timestamp: '2024-03-25T09:04:00Z' },
  { id: 'c10', content: "Here's what's on your plate:\n\n1. 🔄 *Implement auth flow* — due Mar 28 🔴\n2. ⬜ *Write API documentation* — due Mar 29\n3. 🔄 *Security headers audit* — due Mar 29 🔴\n\n3 tasks open — keep it up! 💪", sender: 'wapa', timestamp: '2024-03-25T09:04:01Z' },
  { id: 'c11', content: 'payment bug is blocked by stripe', sender: 'user', timestamp: '2024-03-25T09:05:00Z' },
  { id: 'c12', content: "🚫 Marked *Fix payment integration bug* as blocked — I'll let the team know", sender: 'wapa', timestamp: '2024-03-25T09:05:01Z' },
];

// Helper functions
export function getProjectTasks(projectId: string): Task[] {
  return tasks.filter(t => t.projectId === projectId);
}

export function getSprintTasks(sprintId: string): Task[] {
  return tasks.filter(t => t.sprintId === sprintId);
}

export function getUserTasks(userId: string): Task[] {
  return tasks.filter(t => t.assignee?.id === userId);
}

export function getSprintProgress(sprintId: string) {
  const sprintTasks = getSprintTasks(sprintId);
  const total = sprintTasks.length;
  const done = sprintTasks.filter(t => t.status === 'done').length;
  const inProgress = sprintTasks.filter(t => t.status === 'in_progress').length;
  const blocked = sprintTasks.filter(t => t.status === 'blocked').length;
  const todo = sprintTasks.filter(t => t.status === 'todo').length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;
  return { total, done, inProgress, blocked, todo, percent };
}
