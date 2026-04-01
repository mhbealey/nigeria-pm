import type { User, Team, Project, Sprint, Task, Message } from '../types';

export const users: User[] = [
  { id: 'u1', name: 'Ade Johnson', phone: '+2348012345678', timezone: 'Africa/Lagos' },
  { id: 'u2', name: 'Sarah Okafor', phone: '+2348023456789', timezone: 'Africa/Lagos' },
  { id: 'u3', name: 'Mike Chen', phone: '+2348034567890', timezone: 'Asia/Singapore' },
  { id: 'u4', name: 'Fatima Bello', phone: '+2348045678901', timezone: 'Africa/Lagos' },
  { id: 'u5', name: 'James Wilson', phone: '+447911123456', timezone: 'Europe/London' },
];

export const team: Team = {
  id: 't1',
  name: 'WAPA Dev Team',
  members: users,
};

export const projects: Project[] = [
  { id: 'p1', name: 'Website Redesign', status: 'active', teamId: 't1', taskCount: 12, completedCount: 5, createdAt: '2024-03-01' },
  { id: 'p2', name: 'Mobile App MVP', status: 'active', teamId: 't1', taskCount: 8, completedCount: 2, createdAt: '2024-03-10' },
  { id: 'p3', name: 'API Integration', status: 'archived', teamId: 't1', taskCount: 6, completedCount: 6, createdAt: '2024-02-15' },
];

export const sprints: Sprint[] = [
  { id: 's1', name: 'Sprint 4', projectId: 'p1', startDate: '2024-03-25', endDate: '2024-04-07', status: 'active' },
  { id: 's2', name: 'Sprint 1', projectId: 'p2', startDate: '2024-03-18', endDate: '2024-04-01', status: 'active' },
];

export const tasks: Task[] = [
  // Website Redesign tasks
  { id: 'tk1', title: 'Design landing page hero section', status: 'done', priority: 'high', assignee: users[0], creator: users[0], projectId: 'p1', sprintId: 's1', dueDate: '2024-03-28', completedAt: '2024-03-27', createdAt: '2024-03-25', notes: [{ id: 'n1', content: 'Client approved the blue gradient', author: users[0], createdAt: '2024-03-27' }] },
  { id: 'tk2', title: 'Implement responsive navigation', status: 'done', priority: 'high', assignee: users[1], creator: users[0], projectId: 'p1', sprintId: 's1', dueDate: '2024-03-29', completedAt: '2024-03-29', createdAt: '2024-03-25', notes: [] },
  { id: 'tk3', title: 'Build contact form with validation', status: 'in_progress', priority: 'medium', assignee: users[2], creator: users[0], projectId: 'p1', sprintId: 's1', dueDate: '2024-04-02', createdAt: '2024-03-26', notes: [{ id: 'n2', content: 'Using react-hook-form + zod', author: users[2], createdAt: '2024-03-28' }] },
  { id: 'tk4', title: 'Set up analytics tracking', status: 'todo', priority: 'low', assignee: users[3], creator: users[1], projectId: 'p1', sprintId: 's1', dueDate: '2024-04-05', createdAt: '2024-03-26', notes: [] },
  { id: 'tk5', title: 'Optimize images and lazy loading', status: 'todo', priority: 'medium', assignee: users[0], creator: users[0], projectId: 'p1', sprintId: 's1', dueDate: '2024-04-04', createdAt: '2024-03-27', notes: [] },
  { id: 'tk6', title: 'Fix payment gateway integration', status: 'blocked', priority: 'urgent', assignee: users[1], creator: users[2], projectId: 'p1', sprintId: 's1', dueDate: '2024-04-01', createdAt: '2024-03-25', notes: [{ id: 'n3', content: 'Waiting for Stripe API keys from client', author: users[1], createdAt: '2024-03-30' }] },
  { id: 'tk7', title: 'Write E2E tests for checkout', status: 'todo', priority: 'high', assignee: users[2], creator: users[0], projectId: 'p1', sprintId: 's1', dueDate: '2024-04-06', createdAt: '2024-03-28', notes: [] },
  { id: 'tk8', title: 'Deploy staging environment', status: 'done', priority: 'high', assignee: users[4], creator: users[0], projectId: 'p1', sprintId: 's1', completedAt: '2024-03-26', dueDate: '2024-03-27', createdAt: '2024-03-25', notes: [] },
  { id: 'tk9', title: 'SEO meta tags and sitemap', status: 'in_progress', priority: 'medium', assignee: users[3], creator: users[1], projectId: 'p1', sprintId: 's1', dueDate: '2024-04-03', createdAt: '2024-03-27', notes: [] },
  { id: 'tk10', title: 'Accessibility audit (WCAG 2.1)', status: 'todo', priority: 'medium', assignee: users[4], creator: users[1], projectId: 'p1', sprintId: 's1', dueDate: '2024-04-07', createdAt: '2024-03-28', notes: [] },
  { id: 'tk11', title: 'Dark mode support', status: 'done', priority: 'low', assignee: users[0], creator: users[0], projectId: 'p1', sprintId: 's1', completedAt: '2024-03-30', dueDate: '2024-03-30', createdAt: '2024-03-26', notes: [] },
  { id: 'tk12', title: 'Performance budget setup', status: 'done', priority: 'medium', assignee: users[4], creator: users[2], projectId: 'p1', sprintId: 's1', completedAt: '2024-03-28', dueDate: '2024-03-29', createdAt: '2024-03-25', notes: [] },
  // Mobile App tasks
  { id: 'tk13', title: 'Design app wireframes', status: 'done', priority: 'high', assignee: users[0], creator: users[0], projectId: 'p2', sprintId: 's2', completedAt: '2024-03-20', dueDate: '2024-03-22', createdAt: '2024-03-18', notes: [] },
  { id: 'tk14', title: 'Set up React Native project', status: 'done', priority: 'high', assignee: users[2], creator: users[0], projectId: 'p2', sprintId: 's2', completedAt: '2024-03-19', dueDate: '2024-03-20', createdAt: '2024-03-18', notes: [] },
  { id: 'tk15', title: 'Build auth screens', status: 'in_progress', priority: 'high', assignee: users[1], creator: users[0], projectId: 'p2', sprintId: 's2', dueDate: '2024-03-28', createdAt: '2024-03-20', notes: [] },
  { id: 'tk16', title: 'Implement push notifications', status: 'todo', priority: 'medium', assignee: users[2], creator: users[1], projectId: 'p2', sprintId: 's2', dueDate: '2024-03-30', createdAt: '2024-03-22', notes: [] },
  { id: 'tk17', title: 'Build task list view', status: 'todo', priority: 'high', assignee: users[0], creator: users[0], projectId: 'p2', sprintId: 's2', dueDate: '2024-03-29', createdAt: '2024-03-22', notes: [] },
  { id: 'tk18', title: 'Offline mode with sync', status: 'blocked', priority: 'medium', assignee: users[4], creator: users[2], projectId: 'p2', sprintId: 's2', dueDate: '2024-04-01', createdAt: '2024-03-23', notes: [{ id: 'n4', content: 'Need to decide on sync strategy first', author: users[4], createdAt: '2024-03-25' }] },
  { id: 'tk19', title: 'App store listing prep', status: 'todo', priority: 'low', assignee: users[3], creator: users[0], projectId: 'p2', sprintId: 's2', dueDate: '2024-04-01', createdAt: '2024-03-24', notes: [] },
  { id: 'tk20', title: 'Beta testing setup', status: 'todo', priority: 'medium', assignee: users[4], creator: users[1], projectId: 'p2', sprintId: 's2', dueDate: '2024-03-31', createdAt: '2024-03-24', notes: [] },
];

export const recentMessages: Message[] = [
  { id: 'm1', content: 'add task: design landing page hero section', direction: 'inbound', intent: 'create_task', timestamp: '2024-03-25T09:15:00Z', user: users[0] },
  { id: 'm2', content: '✅ Task created — *Design landing page hero section* — assigned to you, due Thursday', direction: 'outbound', timestamp: '2024-03-25T09:15:01Z', user: users[0] },
  { id: 'm3', content: 'assign payment gateway to @sarah', direction: 'inbound', intent: 'assign_task', timestamp: '2024-03-25T10:30:00Z', user: users[0] },
  { id: 'm4', content: "Done — Sarah's on it 👍", direction: 'outbound', timestamp: '2024-03-25T10:30:01Z', user: users[0] },
  { id: 'm5', content: "how's the sprint?", direction: 'inbound', intent: 'sprint_status', timestamp: '2024-03-30T14:00:00Z', user: users[1] },
  { id: 'm6', content: "Sprint 4 progress:\n█████░░░░░ 42%\n\n✅ Done: 5 | 🔄 In progress: 2 | ⬜ Todo: 4 | 🚫 Blocked: 1\n\n8 days left — looking good!", direction: 'outbound', timestamp: '2024-03-30T14:00:01Z', user: users[1] },
  { id: 'm7', content: 'payment gateway is blocked by stripe keys', direction: 'inbound', intent: 'block_task', timestamp: '2024-03-30T15:20:00Z', user: users[1] },
  { id: 'm8', content: "🚫 Marked as blocked — I'll ping the team", direction: 'outbound', timestamp: '2024-03-30T15:20:01Z', user: users[1] },
  { id: 'm9', content: 'done with dark mode', direction: 'inbound', intent: 'complete_task', timestamp: '2024-03-30T16:45:00Z', user: users[0] },
  { id: 'm10', content: 'Nice, marking it complete 🎉 6 tasks left this sprint', direction: 'outbound', timestamp: '2024-03-30T16:45:01Z', user: users[0] },
  { id: 'm11', content: "what's on my plate?", direction: 'inbound', intent: 'list_tasks', timestamp: '2024-03-31T09:00:00Z', user: users[2] },
  { id: 'm12', content: "Here's what you've got:\n\n1. 🔄 *Build contact form with validation* — due Apr 2\n2. ⬜ *Write E2E tests for checkout* — due Apr 6", direction: 'outbound', timestamp: '2024-03-31T09:00:01Z', user: users[2] },
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
  return { total, done, inProgress, blocked, todo, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
}
