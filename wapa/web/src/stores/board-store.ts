import { create } from 'zustand';
import { useSimulationStore } from './simulation-store';
import type { SimTask } from './simulation-store';
import type { BoardCard, BoardColumn, SyncEvent, ColumnStatus, PMTool } from '../types/board';

// ---------------------------------------------------------------------------
// Assignee color map
// ---------------------------------------------------------------------------
const ASSIGNEE_COLORS: Record<string, string> = {
  Alex: '#25d366',
  Maya: '#e91e63',
  Jordan: '#2196f3',
  Sam: '#ff9800',
  Riley: '#9c27b0',
};

// ---------------------------------------------------------------------------
// Column definitions (order matters)
// ---------------------------------------------------------------------------
const COLUMN_DEFS: { id: string; name: string; status: ColumnStatus }[] = [
  { id: 'col-todo', name: 'Todo', status: 'todo' },
  { id: 'col-in-progress', name: 'In Progress', status: 'in_progress' },
  { id: 'col-blocked', name: 'Blocked', status: 'blocked' },
  { id: 'col-done', name: 'Done', status: 'done' },
];

// ---------------------------------------------------------------------------
// Derive board columns from simulation tasks
// ---------------------------------------------------------------------------
export function deriveColumns(tasks: SimTask[]): BoardColumn[] {
  const today = new Date().toISOString().slice(0, 10);

  const taskToCard = (task: SimTask): BoardCard => ({
    id: `card-${task.id}`,
    taskId: task.id,
    title: task.title,
    assigneeInitials: task.assignee.firstName.charAt(0),
    assigneeColor: ASSIGNEE_COLORS[task.assignee.firstName] ?? '#999999',
    priority: task.priority,
    dueDate: task.dueDate,
    isOverdue: task.dueDate < today && task.status !== 'done',
    isBlocked: task.status === 'blocked',
    blockReason: task.blockReason,
  });

  return COLUMN_DEFS.map((col) => ({
    id: col.id,
    name: col.name,
    status: col.status,
    cards: tasks.filter((t) => t.status === col.status).map(taskToCard),
  }));
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
let eventCounter = 0;

function computeDaysLeft(endDate: string): number {
  const end = new Date(endDate);
  const now = new Date();
  // Strip time component for a clean day diff
  end.setHours(0, 0, 0, 0);
  now.setHours(0, 0, 0, 0);
  return Math.max(0, Math.round((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)));
}

function deriveFromSimulation() {
  const sim = useSimulationStore.getState();
  const progress = sim.getSprintProgress();
  return {
    columns: deriveColumns(sim.tasks),
    sprintName: sim.sprint.name,
    sprintProgress: {
      done: progress.done,
      total: progress.total,
      percent: progress.percent,
    },
    daysLeft: computeDaysLeft(sim.sprint.endDate),
  };
}

// ---------------------------------------------------------------------------
// Store
// ---------------------------------------------------------------------------
interface BoardStoreState {
  columns: BoardColumn[];
  sprintName: string;
  sprintProgress: { done: number; total: number; percent: number };
  daysLeft: number;
  syncEvents: SyncEvent[];
  tool: PMTool;
  isConnected: boolean;

  refreshBoard: () => void;
  addSyncEvent: (event: Omit<SyncEvent, 'id' | 'timestamp'>) => void;
  clearExpiredEvents: () => void;
  setTool: (tool: PMTool) => void;
  setConnected: (connected: boolean) => void;
  resetBoard: () => void;
}

const initialDerived = deriveFromSimulation();

export const useBoardStore = create<BoardStoreState>((set, get) => ({
  columns: initialDerived.columns,
  sprintName: initialDerived.sprintName,
  sprintProgress: initialDerived.sprintProgress,
  daysLeft: initialDerived.daysLeft,
  syncEvents: [],
  tool: 'trello' as PMTool,
  isConnected: true,

  refreshBoard: () => {
    set(deriveFromSimulation());
  },

  addSyncEvent: (event) => {
    const id = `sync-${++eventCounter}`;
    const newEvent: SyncEvent = {
      ...event,
      id,
      timestamp: Date.now(),
    };
    set((state) => ({ syncEvents: [...state.syncEvents, newEvent] }));

    // Auto-expire after 3 seconds
    setTimeout(() => {
      get().clearExpiredEvents();
    }, 3000);
  },

  clearExpiredEvents: () => {
    const now = Date.now();
    set((state) => ({
      syncEvents: state.syncEvents.filter((e) => now - e.timestamp < 3000),
    }));
  },

  setTool: (tool) => set({ tool }),

  setConnected: (connected) => set({ isConnected: connected }),

  resetBoard: () => {
    set({
      ...deriveFromSimulation(),
      syncEvents: [],
    });
  },
}));
