export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high' | 'urgent';
export type ProjectStatus = 'active' | 'archived';
export type SprintStatus = 'planning' | 'active' | 'completed';
export type TeamRole = 'admin' | 'member';

export interface User {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  timezone: string;
}

export interface Team {
  id: string;
  name: string;
  members: TeamMember[];
}

export interface TeamMember {
  user: User;
  role: TeamRole;
  joinedAt: string;
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
  description: string | null;
  status: TaskStatus;
  priority: TaskPriority;
  projectId: string;
  sprintId: string | null;
  assignee: User | null;
  creator: User;
  dueDate: string | null;
  completedAt: string | null;
  createdAt: string;
  notes: Note[];
}

export interface Note {
  id: string;
  content: string;
  author: User;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'wapa';
  timestamp: string;
}
