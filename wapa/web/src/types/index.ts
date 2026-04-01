export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ProjectStatus = 'active' | 'archived';
export type SprintStatus = 'planning' | 'active' | 'completed';

export interface User {
  id: string;
  name: string;
  phone: string;
  avatar?: string;
  timezone: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

export interface Project {
  id: string;
  name: string;
  status: ProjectStatus;
  teamId: string;
  taskCount: number;
  completedCount: number;
  createdAt: string;
}

export interface Sprint {
  id: string;
  name: string;
  projectId: string;
  startDate: string;
  endDate: string;
  status: SprintStatus;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee?: User;
  creator: User;
  projectId: string;
  sprintId?: string;
  dueDate?: string;
  completedAt?: string;
  createdAt: string;
  notes: Note[];
}

export interface Note {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface Message {
  id: string;
  content: string;
  direction: 'inbound' | 'outbound';
  intent?: string;
  timestamp: string;
  user: User;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'wapa';
  timestamp: string;
}

export interface TeamMember {
  user: User;
  role: 'admin' | 'member';
  joinedAt: string;
}
