import type { Task, Project, Sprint } from '../types/task';

export const mockProjects: Project[] = [
  { id: 'proj-1', name: 'Website Redesign', status: 'active' },
  { id: 'proj-2', name: 'Mobile App MVP', status: 'archived' },
];

export const mockSprints: Sprint[] = [
  {
    id: 'spr-1',
    name: 'Sprint 4',
    projectId: 'proj-1',
    startDate: '2026-03-23',
    endDate: '2026-04-05',
    status: 'active',
  },
  {
    id: 'spr-2',
    name: 'Sprint 3',
    projectId: 'proj-1',
    startDate: '2026-03-09',
    endDate: '2026-03-22',
    status: 'completed',
  },
];

export const mockTasks: Task[] = [
  // --- DONE (4) ---
  {
    id: 'task-1',
    title: 'Design landing page hero section',
    description: 'Create hero with gradient background and CTA',
    status: 'done',
    priority: 'high',
    assigneeId: 'u-maya',
    creatorId: 'u-alex',
    projectId: 'proj-1',
    sprintId: 'spr-1',
    dueDate: '2026-03-27',
    completedAt: '2026-03-26',
    createdAt: '2026-03-23',
    notes: [
      { id: 'n1', content: 'Client approved the blue gradient', authorId: 'u-maya', createdAt: '2026-03-26' },
    ],
  },
  {
    id: 'task-2',
    title: 'Implement responsive navigation',
    status: 'done',
    priority: 'high',
    assigneeId: 'u-alex',
    creatorId: 'u-alex',
    projectId: 'proj-1',
    sprintId: 'spr-1',
    dueDate: '2026-03-28',
    completedAt: '2026-03-28',
    createdAt: '2026-03-23',
    notes: [],
  },
  {
    id: 'task-3',
    title: 'Deploy staging environment',
    status: 'done',
    priority: 'high',
    assigneeId: 'u-jordan',
    creatorId: 'u-alex',
    projectId: 'proj-1',
    sprintId: 'spr-1',
    dueDate: '2026-03-26',
    completedAt: '2026-03-25',
    createdAt: '2026-03-23',
    notes: [],
  },
  {
    id: 'task-4',
    title: 'Dark mode support',
    status: 'done',
    priority: 'low',
    assigneeId: 'u-alex',
    creatorId: 'u-maya',
    projectId: 'proj-1',
    sprintId: 'spr-1',
    dueDate: '2026-03-30',
    completedAt: '2026-03-29',
    createdAt: '2026-03-24',
    notes: [],
  },
  // --- IN PROGRESS (3) ---
  {
    id: 'task-5',
    title: 'Build contact form with validation',
    description: 'Use react-hook-form + zod for validation',
    status: 'in_progress',
    priority: 'medium',
    assigneeId: 'u-jordan',
    creatorId: 'u-alex',
    projectId: 'proj-1',
    sprintId: 'spr-1',
    dueDate: '2026-04-02',
    createdAt: '2026-03-25',
    notes: [
      { id: 'n2', content: 'Using react-hook-form + zod', authorId: 'u-jordan', createdAt: '2026-03-28' },
    ],
  },
  {
    id: 'task-6',
    title: 'SEO meta tags and sitemap',
    status: 'in_progress',
    priority: 'medium',
    assigneeId: 'u-sam',
    creatorId: 'u-maya',
    projectId: 'proj-1',
    sprintId: 'spr-1',
    dueDate: '2026-04-03',
    createdAt: '2026-03-26',
    notes: [],
  },
  {
    id: 'task-7',
    title: 'Integrate analytics dashboard',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'u-riley',
    creatorId: 'u-sam',
    projectId: 'proj-1',
    sprintId: 'spr-1',
    dueDate: '2026-04-04',
    createdAt: '2026-03-27',
    notes: [],
  },
  // --- BACKLOG (3) ---
  {
    id: 'task-8',
    title: 'Set up analytics tracking',
    status: 'todo',
    priority: 'low',
    assigneeId: 'u-sam',
    creatorId: 'u-maya',
    projectId: 'proj-1',
    sprintId: 'spr-1',
    dueDate: '2026-04-05',
    createdAt: '2026-03-26',
    notes: [],
  },
  {
    id: 'task-9',
    title: 'Write E2E tests for checkout',
    status: 'todo',
    priority: 'high',
    assigneeId: 'u-riley',
    creatorId: 'u-alex',
    projectId: 'proj-1',
    sprintId: 'spr-1',
    dueDate: '2026-04-06',
    createdAt: '2026-03-28',
    notes: [],
  },
  {
    id: 'task-10',
    title: 'Accessibility audit (WCAG 2.1)',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'u-riley',
    creatorId: 'u-maya',
    projectId: 'proj-1',
    sprintId: 'spr-1',
    dueDate: '2026-04-07',
    createdAt: '2026-03-29',
    notes: [],
  },
  // --- BLOCKED (2) ---
  {
    id: 'task-11',
    title: 'Fix payment gateway integration',
    status: 'blocked',
    priority: 'urgent',
    assigneeId: 'u-jordan',
    creatorId: 'u-alex',
    projectId: 'proj-1',
    sprintId: 'spr-1',
    dueDate: '2026-04-01',
    createdAt: '2026-03-24',
    blockReason: 'Waiting for Stripe API keys from client',
    notes: [
      { id: 'n3', content: 'Waiting for Stripe API keys from client', authorId: 'u-jordan', createdAt: '2026-03-30' },
    ],
  },
  {
    id: 'task-12',
    title: 'Optimize images and lazy loading',
    status: 'blocked',
    priority: 'medium',
    assigneeId: 'u-maya',
    creatorId: 'u-alex',
    projectId: 'proj-1',
    sprintId: 'spr-1',
    dueDate: '2026-04-04',
    createdAt: '2026-03-27',
    blockReason: 'Needs final assets from design team',
    notes: [
      { id: 'n4', content: 'Needs final assets from design team', authorId: 'u-maya', createdAt: '2026-03-31' },
    ],
  },
];

export function getProjectTasks(projectId: string): Task[] {
  return mockTasks.filter((t) => t.projectId === projectId);
}

export function getSprintTasks(sprintId: string): Task[] {
  return mockTasks.filter((t) => t.sprintId === sprintId);
}

export function getSprintProgress(sprintId: string) {
  const sprintTasks = getSprintTasks(sprintId);
  const total = sprintTasks.length;
  const done = sprintTasks.filter((t) => t.status === 'done').length;
  const inProgress = sprintTasks.filter((t) => t.status === 'in_progress').length;
  const blocked = sprintTasks.filter((t) => t.status === 'blocked').length;
  const todo = sprintTasks.filter((t) => t.status === 'todo').length;
  return {
    total,
    done,
    inProgress,
    blocked,
    todo,
    percent: total > 0 ? Math.round((done / total) * 100) : 0,
  };
}
