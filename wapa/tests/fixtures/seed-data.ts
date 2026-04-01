import { createId } from '@paralleldrive/cuid2';

export function createTestUser(overrides: Partial<{ id: string; phone: string; name: string }> = {}) {
  return {
    id: overrides.id ?? createId(),
    phone: overrides.phone ?? `+23480${Math.floor(10000000 + Math.random() * 90000000)}`,
    name: overrides.name ?? 'Test User',
    timezone: 'Africa/Lagos',
  };
}

export function createTestTeam(overrides: Partial<{ id: string; name: string }> = {}) {
  return {
    id: overrides.id ?? createId(),
    name: overrides.name ?? 'Test Team',
    whatsappGroupId: `group_${createId()}`,
  };
}

export function createTestProject(teamId: string, overrides: Partial<{ id: string; name: string }> = {}) {
  return {
    id: overrides.id ?? createId(),
    teamId,
    name: overrides.name ?? 'Test Project',
    status: 'active' as const,
  };
}

export function createTestSprint(projectId: string, overrides: Partial<{ id: string; name: string }> = {}) {
  return {
    id: overrides.id ?? createId(),
    projectId,
    name: overrides.name ?? 'Sprint 1',
    startDate: '2024-01-01',
    endDate: '2024-01-14',
    status: 'active' as const,
  };
}

export function createTestTask(overrides: Partial<{
  id: string; title: string; projectId: string; sprintId: string;
  creatorId: string; assigneeId: string; status: string; priority: string; dueDate: string;
}> = {}) {
  return {
    id: overrides.id ?? createId(),
    title: overrides.title ?? 'Test Task',
    projectId: overrides.projectId ?? null,
    sprintId: overrides.sprintId ?? null,
    creatorId: overrides.creatorId ?? createId(),
    assigneeId: overrides.assigneeId ?? null,
    status: (overrides.status ?? 'todo') as 'todo' | 'in_progress' | 'blocked' | 'done',
    priority: (overrides.priority ?? 'medium') as 'low' | 'medium' | 'high' | 'urgent',
    dueDate: overrides.dueDate ?? null,
    description: null,
  };
}
