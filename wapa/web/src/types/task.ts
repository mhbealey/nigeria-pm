export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  creatorId: string;
  projectId: string;
  sprintId?: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  notes: TaskNote[];
  blockReason?: string;
}

export interface TaskNote {
  id: string;
  content: string;
  authorId: string;
  createdAt: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'active' | 'archived';
}

export interface Sprint {
  id: string;
  name: string;
  projectId: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed';
}
