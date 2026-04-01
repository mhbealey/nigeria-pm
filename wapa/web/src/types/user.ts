export interface User {
  id: string;
  name: string;
  avatar?: string;
  phone: string;
  role: 'admin' | 'member';
  tasksCompleted: number;
  velocity: number[];
}
