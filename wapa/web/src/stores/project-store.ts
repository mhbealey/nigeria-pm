import { create } from 'zustand';
import type { Task, TaskStatus, TaskPriority, TaskNote, Project, Sprint } from '../types/task';
import { mockTasks, mockProjects, mockSprints } from '../data/mock-projects';
import { activityFeed, type ActivityItem } from '../data/mock-analytics';

/**
 * Zustand store for project, sprint, and task state powering the dashboard.
 * The simulation engine mutates this store via side effects so that
 * chat interactions are reflected in real time on the kanban board,
 * velocity chart, and activity feed.
 */
interface ProjectState {
  tasks: Task[];
  projects: Project[];
  sprints: Sprint[];
  activities: ActivityItem[];

  addTask: (task: Task) => void;
  updateTaskStatus: (taskId: string, status: TaskStatus) => void;
  moveTask: (taskId: string, status: TaskStatus) => void;
  updateTaskPriority: (taskId: string, priority: TaskPriority) => void;
  assignTask: (taskId: string, assigneeId: string) => void;
  addNote: (taskId: string, note: TaskNote) => void;
  blockTask: (taskId: string, reason: string) => void;
  unblockTask: (taskId: string) => void;
  addActivity: (activity: ActivityItem) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  getSprintProgress: (sprintId: string) => {
    total: number;
    done: number;
    inProgress: number;
    blocked: number;
    todo: number;
    percent: number;
  };
  getTasksByAssignee: (assigneeId: string) => Task[];
  findTaskByTitle: (title: string) => Task | undefined;
  resetTasks: () => void;
}

export const useProjectStore = create<ProjectState>((set, get) => ({
  tasks: [...mockTasks],
  projects: [...mockProjects],
  sprints: [...mockSprints],
  activities: [...activityFeed],

  addTask: (task) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),

  updateTaskStatus: (taskId, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId
          ? {
              ...t,
              status,
              completedAt: status === 'done' ? new Date().toISOString() : undefined,
              blockReason: status === 'blocked' ? t.blockReason : undefined,
            }
          : t
      ),
    })),

  moveTask: (taskId, status) => {
    get().updateTaskStatus(taskId, status);
  },

  updateTaskPriority: (taskId, priority) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, priority } : t
      ),
    })),

  assignTask: (taskId, assigneeId) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, assigneeId } : t
      ),
    })),

  addNote: (taskId, note) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId ? { ...t, notes: [...t.notes, note] } : t
      ),
    })),

  blockTask: (taskId, reason) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId
          ? { ...t, status: 'blocked' as TaskStatus, blockReason: reason }
          : t
      ),
    })),

  unblockTask: (taskId) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === taskId
          ? { ...t, status: 'in_progress' as TaskStatus, blockReason: undefined }
          : t
      ),
    })),

  addActivity: (activity) =>
    set((state) => ({
      activities: [activity, ...state.activities],
    })),

  getTasksByStatus: (status) => {
    return get().tasks.filter((t) => t.status === status);
  },

  getSprintProgress: (sprintId) => {
    const sprintTasks = get().tasks.filter((t) => t.sprintId === sprintId);
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
  },

  getTasksByAssignee: (assigneeId) => {
    return get().tasks.filter((t) => t.assigneeId === assigneeId);
  },

  findTaskByTitle: (title) => {
    const lower = title.toLowerCase();
    return get().tasks.find((t) => t.title.toLowerCase().includes(lower));
  },

  resetTasks: () =>
    set({
      tasks: [...mockTasks],
      activities: [...activityFeed],
    }),
}));
