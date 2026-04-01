import { db, pool } from '../config/database.js';
import { users } from './schema/users.js';
import { teams, teamMembers } from './schema/teams.js';
import { projects } from './schema/projects.js';
import { sprints } from './schema/sprints.js';
import { tasks } from './schema/tasks.js';
import { createId } from '@paralleldrive/cuid2';
import { format, addDays, addWeeks } from 'date-fns';

async function seed() {
  console.log('🌱 Seeding database...');

  // Users
  const user1Id = createId();
  const user2Id = createId();
  const user3Id = createId();

  await db.insert(users).values([
    { id: user1Id, phone: '+2348012345678', name: 'Ade Johnson', timezone: 'Africa/Lagos' },
    { id: user2Id, phone: '+2348023456789', name: 'Sarah Okafor', timezone: 'Africa/Lagos' },
    { id: user3Id, phone: '+2348034567890', name: 'Mike Chen', timezone: 'Asia/Singapore' },
  ]);
  console.log('  ✅ 3 users created');

  // Team
  const teamId = createId();
  await db.insert(teams).values({ id: teamId, name: 'WAPA Dev Team', whatsappGroupId: 'group_dev_001' });
  await db.insert(teamMembers).values([
    { teamId, userId: user1Id, role: 'admin' },
    { teamId, userId: user2Id, role: 'member' },
    { teamId, userId: user3Id, role: 'member' },
  ]);
  console.log('  ✅ 1 team created with 3 members');

  // Projects
  const project1Id = createId();
  const project2Id = createId();
  await db.insert(projects).values([
    { id: project1Id, teamId, name: 'Website Redesign', status: 'active' },
    { id: project2Id, teamId, name: 'Mobile App', status: 'active' },
  ]);
  console.log('  ✅ 2 projects created');

  // Sprint
  const sprintId = createId();
  const startDate = format(new Date(), 'yyyy-MM-dd');
  const endDate = format(addWeeks(new Date(), 2), 'yyyy-MM-dd');
  await db.insert(sprints).values({
    id: sprintId, projectId: project1Id, name: 'Sprint 1',
    startDate, endDate, status: 'active',
  });
  console.log('  ✅ 1 active sprint created');

  // Tasks
  const taskData = [
    { title: 'Design landing page', status: 'done' as const, priority: 'high' as const, assigneeId: user1Id, dueDate: format(addDays(new Date(), -2), 'yyyy-MM-dd') },
    { title: 'Implement auth flow', status: 'in_progress' as const, priority: 'urgent' as const, assigneeId: user2Id, dueDate: format(addDays(new Date(), 1), 'yyyy-MM-dd') },
    { title: 'Write API documentation', status: 'todo' as const, priority: 'medium' as const, assigneeId: user1Id, dueDate: format(addDays(new Date(), 5), 'yyyy-MM-dd') },
    { title: 'Fix payment bug', status: 'blocked' as const, priority: 'urgent' as const, assigneeId: user3Id, dueDate: format(addDays(new Date(), 0), 'yyyy-MM-dd') },
    { title: 'Set up CI/CD pipeline', status: 'done' as const, priority: 'high' as const, assigneeId: user3Id, dueDate: format(addDays(new Date(), -5), 'yyyy-MM-dd') },
    { title: 'Design onboarding flow', status: 'todo' as const, priority: 'medium' as const, assigneeId: user2Id, dueDate: format(addDays(new Date(), 7), 'yyyy-MM-dd') },
    { title: 'Performance optimization', status: 'todo' as const, priority: 'low' as const, assigneeId: user1Id, dueDate: format(addDays(new Date(), 10), 'yyyy-MM-dd') },
    { title: 'User feedback survey', status: 'in_progress' as const, priority: 'medium' as const, assigneeId: user2Id, dueDate: format(addDays(new Date(), 3), 'yyyy-MM-dd') },
    { title: 'Database migration script', status: 'done' as const, priority: 'high' as const, assigneeId: user3Id, dueDate: format(addDays(new Date(), -3), 'yyyy-MM-dd') },
    { title: 'Mobile responsive fixes', status: 'todo' as const, priority: 'high' as const, assigneeId: user1Id, dueDate: format(addDays(new Date(), 4), 'yyyy-MM-dd') },
  ];

  for (const t of taskData) {
    await db.insert(tasks).values({
      id: createId(),
      projectId: project1Id,
      sprintId: sprintId,
      creatorId: user1Id,
      completedAt: t.status === 'done' ? new Date() : null,
      ...t,
    });
  }
  console.log('  ✅ 10 tasks created');

  console.log('\n🎉 Seed complete!');
  await pool.end();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
