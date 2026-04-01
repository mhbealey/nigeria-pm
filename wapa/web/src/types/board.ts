export interface BoardCard {
  id: string;
  taskId: string;
  title: string;
  assigneeInitials: string;
  assigneeColor: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: string;
  isOverdue?: boolean;
  isBlocked?: boolean;
  blockReason?: string;
}

export type ColumnStatus = 'todo' | 'in_progress' | 'blocked' | 'done';

export interface BoardColumn {
  id: string;
  name: string;
  status: ColumnStatus;
  cards: BoardCard[];
}

export interface SyncEvent {
  id: string;
  type: 'move' | 'create' | 'update';
  cardId: string;
  cardTitle: string;
  fromColumn?: string;
  toColumn: string;
  timestamp: number;
  confirmedBy?: string;
}

export type PMTool = 'trello' | 'sheets';

export interface BoardState {
  columns: BoardColumn[];
  sprintName: string;
  sprintProgress: { done: number; total: number; percent: number };
  daysLeft: number;
  syncEvents: SyncEvent[];
  isConnected: boolean;
  tool: PMTool;
}
