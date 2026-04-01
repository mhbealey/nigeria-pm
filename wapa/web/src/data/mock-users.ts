import type { User } from '../types/user';

export const mockUsers: User[] = [
  {
    id: 'u-alex',
    name: 'Alex Okonkwo',
    phone: '+2348012345678',
    role: 'admin',
    tasksCompleted: 24,
    velocity: [6, 8, 7, 9],
  },
  {
    id: 'u-maya',
    name: 'Maya Adeyemi',
    phone: '+2348023456789',
    role: 'member',
    tasksCompleted: 18,
    velocity: [5, 4, 6, 5],
  },
  {
    id: 'u-jordan',
    name: 'Jordan Nwosu',
    phone: '+2348034567890',
    role: 'member',
    tasksCompleted: 21,
    velocity: [7, 6, 5, 7],
  },
  {
    id: 'u-sam',
    name: 'Sam Babangida',
    phone: '+2348045678901',
    role: 'member',
    tasksCompleted: 15,
    velocity: [4, 5, 4, 3],
  },
  {
    id: 'u-riley',
    name: 'Riley Eze',
    phone: '+2348056789012',
    role: 'member',
    tasksCompleted: 19,
    velocity: [5, 6, 5, 6],
  },
];

export function getUserById(id: string): User | undefined {
  return mockUsers.find((u) => u.id === id);
}

export function getUserByName(name: string): User | undefined {
  const lower = name.toLowerCase();
  return mockUsers.find(
    (u) =>
      u.name.toLowerCase().includes(lower) ||
      u.name.split(' ')[0].toLowerCase() === lower
  );
}
