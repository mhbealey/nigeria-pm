export interface VelocityDataPoint {
  sprint: string;
  planned: number;
  completed: number;
}

export interface BurndownDataPoint {
  day: number;
  date: string;
  ideal: number;
  actual: number;
}

export interface ActivityItem {
  id: string;
  text: string;
  timestamp: string;
  type: 'task_created' | 'task_completed' | 'task_blocked' | 'task_assigned' | 'sprint_started' | 'note_added' | 'status_changed';
  userId: string;
}

export interface DueDateItem {
  taskId: string;
  title: string;
  dueDate: string;
  assigneeId: string;
  status: string;
}

export interface WorkloadEntry {
  userId: string;
  name: string;
  todo: number;
  inProgress: number;
  blocked: number;
  done: number;
  total: number;
}

// --- Velocity per sprint (last 4 sprints) ---
export const velocityData: VelocityDataPoint[] = [
  { sprint: 'Sprint 1', planned: 10, completed: 8 },
  { sprint: 'Sprint 2', planned: 12, completed: 11 },
  { sprint: 'Sprint 3', planned: 14, completed: 12 },
  { sprint: 'Sprint 4', planned: 12, completed: 4 },
];

// --- Burndown data (14 days for Sprint 4) ---
export const burndownData: BurndownDataPoint[] = [
  { day: 1, date: '2026-03-23', ideal: 12, actual: 12 },
  { day: 2, date: '2026-03-24', ideal: 11.14, actual: 12 },
  { day: 3, date: '2026-03-25', ideal: 10.29, actual: 11 },
  { day: 4, date: '2026-03-26', ideal: 9.43, actual: 10 },
  { day: 5, date: '2026-03-27', ideal: 8.57, actual: 9 },
  { day: 6, date: '2026-03-28', ideal: 7.71, actual: 8 },
  { day: 7, date: '2026-03-29', ideal: 6.86, actual: 8 },
  { day: 8, date: '2026-03-30', ideal: 6.0, actual: 8 },
  { day: 9, date: '2026-03-31', ideal: 5.14, actual: 8 },
  { day: 10, date: '2026-04-01', ideal: 4.29, actual: 8 },
  { day: 11, date: '2026-04-02', ideal: 3.43, actual: 8 },
  { day: 12, date: '2026-04-03', ideal: 2.57, actual: 8 },
  { day: 13, date: '2026-04-04', ideal: 1.71, actual: 8 },
  { day: 14, date: '2026-04-05', ideal: 0, actual: 8 },
];

// --- Activity feed (20 items) ---
export const activityFeed: ActivityItem[] = [
  { id: 'act-1', text: 'Alex created the Website Redesign project', timestamp: '2026-03-23T08:00:00Z', type: 'sprint_started', userId: 'u-alex' },
  { id: 'act-2', text: 'Sprint 4 started', timestamp: '2026-03-23T08:05:00Z', type: 'sprint_started', userId: 'u-alex' },
  { id: 'act-3', text: 'Alex created "Design landing page hero section"', timestamp: '2026-03-23T09:00:00Z', type: 'task_created', userId: 'u-alex' },
  { id: 'act-4', text: 'Maya was assigned "Design landing page hero section"', timestamp: '2026-03-23T09:01:00Z', type: 'task_assigned', userId: 'u-maya' },
  { id: 'act-5', text: 'Alex created "Implement responsive navigation"', timestamp: '2026-03-23T09:10:00Z', type: 'task_created', userId: 'u-alex' },
  { id: 'act-6', text: 'Jordan completed "Deploy staging environment"', timestamp: '2026-03-25T16:00:00Z', type: 'task_completed', userId: 'u-jordan' },
  { id: 'act-7', text: 'Maya completed "Design landing page hero section"', timestamp: '2026-03-26T14:30:00Z', type: 'task_completed', userId: 'u-maya' },
  { id: 'act-8', text: 'Maya added a note on "Design landing page hero section"', timestamp: '2026-03-26T14:31:00Z', type: 'note_added', userId: 'u-maya' },
  { id: 'act-9', text: 'Alex completed "Implement responsive navigation"', timestamp: '2026-03-28T11:00:00Z', type: 'task_completed', userId: 'u-alex' },
  { id: 'act-10', text: 'Jordan added a note on "Build contact form with validation"', timestamp: '2026-03-28T13:00:00Z', type: 'note_added', userId: 'u-jordan' },
  { id: 'act-11', text: 'Alex completed "Dark mode support"', timestamp: '2026-03-29T17:00:00Z', type: 'task_completed', userId: 'u-alex' },
  { id: 'act-12', text: 'Jordan marked "Fix payment gateway" as blocked', timestamp: '2026-03-30T10:00:00Z', type: 'task_blocked', userId: 'u-jordan' },
  { id: 'act-13', text: 'Jordan added a note: "Waiting for Stripe API keys"', timestamp: '2026-03-30T10:01:00Z', type: 'note_added', userId: 'u-jordan' },
  { id: 'act-14', text: 'Maya marked "Optimize images" as blocked', timestamp: '2026-03-31T09:00:00Z', type: 'task_blocked', userId: 'u-maya' },
  { id: 'act-15', text: 'Sam started working on "SEO meta tags and sitemap"', timestamp: '2026-03-31T10:00:00Z', type: 'status_changed', userId: 'u-sam' },
  { id: 'act-16', text: 'Riley started working on "Integrate analytics dashboard"', timestamp: '2026-03-31T10:30:00Z', type: 'status_changed', userId: 'u-riley' },
  { id: 'act-17', text: 'Alex checked sprint progress via WhatsApp', timestamp: '2026-03-31T14:00:00Z', type: 'sprint_started', userId: 'u-alex' },
  { id: 'act-18', text: 'Riley was assigned "Write E2E tests for checkout"', timestamp: '2026-03-31T15:00:00Z', type: 'task_assigned', userId: 'u-riley' },
  { id: 'act-19', text: 'Riley was assigned "Accessibility audit (WCAG 2.1)"', timestamp: '2026-03-31T15:05:00Z', type: 'task_assigned', userId: 'u-riley' },
  { id: 'act-20', text: 'Sam created "Set up analytics tracking"', timestamp: '2026-03-31T16:00:00Z', type: 'task_created', userId: 'u-sam' },
];

// --- Due dates for next 14 days ---
export const upcomingDueDates: DueDateItem[] = [
  { taskId: 'task-11', title: 'Fix payment gateway integration', dueDate: '2026-04-01', assigneeId: 'u-jordan', status: 'blocked' },
  { taskId: 'task-5', title: 'Build contact form with validation', dueDate: '2026-04-02', assigneeId: 'u-jordan', status: 'in_progress' },
  { taskId: 'task-6', title: 'SEO meta tags and sitemap', dueDate: '2026-04-03', assigneeId: 'u-sam', status: 'in_progress' },
  { taskId: 'task-7', title: 'Integrate analytics dashboard', dueDate: '2026-04-04', assigneeId: 'u-riley', status: 'in_progress' },
  { taskId: 'task-12', title: 'Optimize images and lazy loading', dueDate: '2026-04-04', assigneeId: 'u-maya', status: 'blocked' },
  { taskId: 'task-8', title: 'Set up analytics tracking', dueDate: '2026-04-05', assigneeId: 'u-sam', status: 'todo' },
  { taskId: 'task-9', title: 'Write E2E tests for checkout', dueDate: '2026-04-06', assigneeId: 'u-riley', status: 'todo' },
  { taskId: 'task-10', title: 'Accessibility audit (WCAG 2.1)', dueDate: '2026-04-07', assigneeId: 'u-riley', status: 'todo' },
];

// --- Workload per team member ---
export const workloadData: WorkloadEntry[] = [
  { userId: 'u-alex', name: 'Alex Okonkwo', todo: 0, inProgress: 0, blocked: 0, done: 2, total: 2 },
  { userId: 'u-maya', name: 'Maya Adeyemi', todo: 0, inProgress: 0, blocked: 1, done: 1, total: 2 },
  { userId: 'u-jordan', name: 'Jordan Nwosu', todo: 0, inProgress: 1, blocked: 1, done: 1, total: 3 },
  { userId: 'u-sam', name: 'Sam Babangida', todo: 1, inProgress: 1, blocked: 0, done: 0, total: 2 },
  { userId: 'u-riley', name: 'Riley Eze', todo: 2, inProgress: 1, blocked: 0, done: 0, total: 3 },
];
