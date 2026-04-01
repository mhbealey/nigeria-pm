import { create } from 'zustand';

export interface SimUser {
  id: string;
  name: string;
  firstName: string;
}

export interface SimTask {
  id: string;
  title: string;
  status: 'todo' | 'in_progress' | 'blocked' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: SimUser;
  dueDate: string;
  notes: string[];
  blockReason?: string;
  createdAt: string;
}

export interface SimSprint {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed';
}

export interface SimProject {
  id: string;
  name: string;
}

interface SimulationState {
  project: SimProject;
  sprint: SimSprint;
  tasks: SimTask[];
  users: SimUser[];
  currentUser: SimUser;
  lastMentionedTaskId: string | null;

  addTask: (title: string, assignee?: SimUser, priority?: SimTask['priority'], dueDate?: string) => SimTask;
  completeTask: (taskId: string) => void;
  blockTask: (taskId: string, reason?: string) => void;
  unblockTask: (taskId: string) => void;
  assignTask: (taskId: string, assignee: SimUser) => void;
  setPriority: (taskId: string, priority: SimTask['priority']) => void;
  setDueDate: (taskId: string, date: string) => void;
  addNote: (taskId: string, note: string) => void;
  setLastMentioned: (taskId: string) => void;
  findTask: (query: string) => SimTask | undefined;
  getMyTasks: () => SimTask[];
  getBlockedTasks: () => SimTask[];
  getTasksDueToday: () => SimTask[];
  getTasksDueThisWeek: () => SimTask[];
  getOverdueTasks: () => SimTask[];
  getTasksByAssignee: (name: string) => SimTask[];
  getSprintProgress: () => { total: number; done: number; inProgress: number; blocked: number; todo: number; percent: number };
  resetState: () => void;
}

const USERS: SimUser[] = [
  { id: 'u-alex', name: 'Alex Okonkwo', firstName: 'Alex' },
  { id: 'u-maya', name: 'Maya Adeyemi', firstName: 'Maya' },
  { id: 'u-jordan', name: 'Jordan Nwosu', firstName: 'Jordan' },
  { id: 'u-sam', name: 'Sam Babangida', firstName: 'Sam' },
  { id: 'u-riley', name: 'Riley Eze', firstName: 'Riley' },
];

const CURRENT_USER = USERS[0];

function makeDueDate(daysFromNow: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  return d.toISOString().slice(0, 10);
}

function makeCreatedAt(daysAgo: number): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toISOString();
}

const INITIAL_TASKS: SimTask[] = [
  // DONE (4)
  { id: 't-1', title: 'Design landing page hero section', status: 'done', priority: 'high', assignee: USERS[1], dueDate: makeDueDate(-4), notes: ['Client approved the blue gradient'], createdAt: makeCreatedAt(8) },
  { id: 't-2', title: 'Implement responsive navigation', status: 'done', priority: 'high', assignee: USERS[0], dueDate: makeDueDate(-3), notes: [], createdAt: makeCreatedAt(8) },
  { id: 't-3', title: 'Deploy staging environment', status: 'done', priority: 'high', assignee: USERS[2], dueDate: makeDueDate(-5), notes: [], createdAt: makeCreatedAt(8) },
  { id: 't-4', title: 'Dark mode support', status: 'done', priority: 'low', assignee: USERS[0], dueDate: makeDueDate(-1), notes: [], createdAt: makeCreatedAt(7) },
  // IN PROGRESS (3)
  { id: 't-5', title: 'Build contact form with validation', status: 'in_progress', priority: 'medium', assignee: USERS[2], dueDate: makeDueDate(1), notes: ['Using react-hook-form + zod'], createdAt: makeCreatedAt(6) },
  { id: 't-6', title: 'SEO meta tags and sitemap', status: 'in_progress', priority: 'medium', assignee: USERS[3], dueDate: makeDueDate(2), notes: [], createdAt: makeCreatedAt(5) },
  { id: 't-7', title: 'Integrate analytics dashboard', status: 'in_progress', priority: 'high', assignee: USERS[4], dueDate: makeDueDate(3), notes: [], createdAt: makeCreatedAt(4) },
  // TODO (3)
  { id: 't-8', title: 'Set up analytics tracking', status: 'todo', priority: 'low', assignee: USERS[3], dueDate: makeDueDate(4), notes: [], createdAt: makeCreatedAt(5) },
  { id: 't-9', title: 'Write E2E tests for checkout', status: 'todo', priority: 'high', assignee: USERS[4], dueDate: makeDueDate(5), notes: [], createdAt: makeCreatedAt(3) },
  { id: 't-10', title: 'Accessibility audit', status: 'todo', priority: 'medium', assignee: USERS[4], dueDate: makeDueDate(6), notes: [], createdAt: makeCreatedAt(2) },
  // BLOCKED (2)
  { id: 't-11', title: 'Fix payment gateway integration', status: 'blocked', priority: 'urgent', assignee: USERS[2], dueDate: makeDueDate(0), blockReason: 'Waiting for Stripe API keys', notes: ['Waiting for Stripe API keys from client'], createdAt: makeCreatedAt(7) },
  { id: 't-12', title: 'Optimize images and lazy loading', status: 'blocked', priority: 'medium', assignee: USERS[1], dueDate: makeDueDate(3), blockReason: 'Needs final assets from design team', notes: ['Needs final assets from design team'], createdAt: makeCreatedAt(4) },
];

const INITIAL_SPRINT: SimSprint = {
  id: 'spr-4',
  name: 'Sprint 4',
  startDate: makeDueDate(-5),
  endDate: makeDueDate(5),
  status: 'active',
};

const INITIAL_PROJECT: SimProject = {
  id: 'proj-1',
  name: 'Website Redesign',
};

let taskCounter = 13;

export const useSimulationStore = create<SimulationState>((set, get) => ({
  project: { ...INITIAL_PROJECT },
  sprint: { ...INITIAL_SPRINT },
  tasks: INITIAL_TASKS.map(t => ({ ...t })),
  users: USERS,
  currentUser: CURRENT_USER,
  lastMentionedTaskId: null,

  addTask: (title, assignee, priority = 'medium', dueDate) => {
    const id = `t-${taskCounter++}`;
    const task: SimTask = {
      id,
      title,
      status: 'todo',
      priority,
      assignee: assignee || CURRENT_USER,
      dueDate: dueDate || makeDueDate(5),
      notes: [],
      createdAt: new Date().toISOString(),
    };
    set(state => ({ tasks: [...state.tasks, task], lastMentionedTaskId: id }));
    return task;
  },

  completeTask: (taskId) =>
    set(state => ({
      tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: 'done' as const, blockReason: undefined } : t),
      lastMentionedTaskId: taskId,
    })),

  blockTask: (taskId, reason) =>
    set(state => ({
      tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: 'blocked' as const, blockReason: reason || 'No reason given' } : t),
      lastMentionedTaskId: taskId,
    })),

  unblockTask: (taskId) =>
    set(state => ({
      tasks: state.tasks.map(t => t.id === taskId ? { ...t, status: 'in_progress' as const, blockReason: undefined } : t),
      lastMentionedTaskId: taskId,
    })),

  assignTask: (taskId, assignee) =>
    set(state => ({
      tasks: state.tasks.map(t => t.id === taskId ? { ...t, assignee } : t),
      lastMentionedTaskId: taskId,
    })),

  setPriority: (taskId, priority) =>
    set(state => ({
      tasks: state.tasks.map(t => t.id === taskId ? { ...t, priority } : t),
      lastMentionedTaskId: taskId,
    })),

  setDueDate: (taskId, date) =>
    set(state => ({
      tasks: state.tasks.map(t => t.id === taskId ? { ...t, dueDate: date } : t),
      lastMentionedTaskId: taskId,
    })),

  addNote: (taskId, note) =>
    set(state => ({
      tasks: state.tasks.map(t => t.id === taskId ? { ...t, notes: [...t.notes, note] } : t),
      lastMentionedTaskId: taskId,
    })),

  setLastMentioned: (taskId) => set({ lastMentionedTaskId: taskId }),

  findTask: (query) => {
    const lower = query.toLowerCase().trim();
    const tasks = get().tasks;
    // Exact match
    const exact = tasks.find(t => t.title.toLowerCase() === lower);
    if (exact) return exact;
    // Includes match
    const includes = tasks.find(t => t.title.toLowerCase().includes(lower));
    if (includes) return includes;
    // Word overlap fuzzy match
    const queryWords = lower.split(/\s+/);
    let bestMatch: SimTask | undefined;
    let bestScore = 0;
    for (const t of tasks) {
      const titleWords = t.title.toLowerCase().split(/\s+/);
      const score = queryWords.filter(w => titleWords.some(tw => tw.includes(w) || w.includes(tw))).length / queryWords.length;
      if (score > bestScore && score >= 0.4) {
        bestScore = score;
        bestMatch = t;
      }
    }
    return bestMatch;
  },

  getMyTasks: () => get().tasks.filter(t => t.assignee.id === CURRENT_USER.id && t.status !== 'done'),

  getBlockedTasks: () => get().tasks.filter(t => t.status === 'blocked'),

  getTasksDueToday: () => {
    const today = new Date().toISOString().slice(0, 10);
    return get().tasks.filter(t => t.dueDate === today && t.status !== 'done');
  },

  getTasksDueThisWeek: () => {
    const now = new Date();
    const endOfWeek = new Date(now);
    endOfWeek.setDate(now.getDate() + (7 - now.getDay()));
    return get().tasks.filter(t => {
      if (t.status === 'done') return false;
      const d = new Date(t.dueDate);
      return d >= now && d <= endOfWeek;
    });
  },

  getOverdueTasks: () => {
    const today = new Date().toISOString().slice(0, 10);
    return get().tasks.filter(t => t.dueDate < today && t.status !== 'done');
  },

  getTasksByAssignee: (name) => {
    const lower = name.toLowerCase();
    return get().tasks.filter(t =>
      t.assignee.firstName.toLowerCase() === lower ||
      t.assignee.name.toLowerCase().includes(lower)
    );
  },

  getSprintProgress: () => {
    const tasks = get().tasks;
    const total = tasks.length;
    const done = tasks.filter(t => t.status === 'done').length;
    const inProgress = tasks.filter(t => t.status === 'in_progress').length;
    const blocked = tasks.filter(t => t.status === 'blocked').length;
    const todo = tasks.filter(t => t.status === 'todo').length;
    return { total, done, inProgress, blocked, todo, percent: total > 0 ? Math.round((done / total) * 100) : 0 };
  },

  resetState: () => {
    taskCounter = 13;
    set({
      project: { ...INITIAL_PROJECT },
      sprint: { ...INITIAL_SPRINT },
      tasks: INITIAL_TASKS.map(t => ({ ...t })),
      lastMentionedTaskId: null,
    });
  },
}));

export function findUserByName(name: string): SimUser | undefined {
  const lower = name.toLowerCase().trim();
  return USERS.find(u =>
    u.firstName.toLowerCase() === lower ||
    u.name.toLowerCase().includes(lower)
  );
}
