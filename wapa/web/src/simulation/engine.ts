import { useSimulationStore, findUserByName } from '../stores/simulation-store';
import type { SimTask } from '../stores/simulation-store';

export interface SimResponse {
  text: string;
  quickReplies?: string[];
  isSprintComplete?: boolean;
  isTaskComplete?: boolean;
  syncAction?: {
    type: 'move' | 'create' | 'update';
    cardTitle: string;
    fromColumn?: string;
    toColumn: string;
  };
}

const PRIORITY_ICONS: Record<string, string> = {
  urgent: '🔴', high: '🟠', medium: '🟡', low: '🟢',
};

const STATUS_COLUMN: Record<string, string> = {
  todo: 'Todo', in_progress: 'In Progress', blocked: 'Blocked', done: 'Done',
};

function progressBar(percent: number): string {
  const total = 10;
  const filled = Math.round((percent / 100) * total);
  const inProg = Math.min(1, total - filled);
  const empty = total - filled - inProg;
  return '█'.repeat(filled) + '▒'.repeat(inProg) + '░'.repeat(empty);
}

function formatDueDate(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  if (dateStr === today) return 'today';
  if (dateStr === tomorrow.toISOString().slice(0, 10)) return 'tomorrow';
  const diff = Math.ceil((d.getTime() - now.getTime()) / 86400000);
  if (diff < 0) return `${Math.abs(diff)} days overdue`;
  if (diff <= 7) return `in ${diff} days`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTaskLine(t: SimTask): string {
  const icon = PRIORITY_ICONS[t.priority] || '🟡';
  const status = t.status === 'blocked' ? ' 🚫' : t.status === 'in_progress' ? ' 🔨' : '';
  const due = t.dueDate ? ` — due ${formatDueDate(t.dueDate)}` : '';
  return `${icon} *${t.title}*${status}${due}`;
}

// Tool name — will be read by the caller and can be set externally
let toolName = 'Trello';
export function setToolName(name: string) { toolName = name; }
export function getToolName() { return toolName; }

// Pending suggestion state for observe→suggest→act model
let pendingSuggestion: {
  actionType: string;
  taskId: string;
  description: string;
  execute: () => SimResponse;
} | null = null;

type Pattern = {
  regex: RegExp;
  handler: (match: RegExpMatchArray) => SimResponse;
};

const patterns: Pattern[] = [
  // ──────────────────────────────────────────────────────
  // CONFIRMATION REPLIES (must be first to catch quick replies)
  // ──────────────────────────────────────────────────────
  {
    regex: /^(?:✅ ?(?:yes|move it|yes!)|^yes$|^yep$|^do it$|^yes,? (?:add note|block it))/i,
    handler: () => {
      if (pendingSuggestion) {
        const result = pendingSuggestion.execute();
        pendingSuggestion = null;
        return result;
      }
      return { text: `Nothing pending — what would you like me to do?`, quickReplies: ['My tasks', 'Sprint status'] };
    },
  },
  {
    regex: /^(?:not yet|no|nope|leave it|skip|hold on|keep it)$/i,
    handler: () => {
      pendingSuggestion = null;
      return { text: `No problem — I'll leave it for now. 👍` };
    },
  },
  {
    regex: /^wrong task$/i,
    handler: () => {
      pendingSuggestion = null;
      return { text: `Which task did you mean? Try the full task name.` };
    },
  },

  // ──────────────────────────────────────────────────────
  // EXPLICIT @WAPA COMMANDS (act immediately)
  // ──────────────────────────────────────────────────────
  {
    regex: /^@wapa\s+(?:mark\s+)?(.+?)\s+(?:as\s+)?done$/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `Couldn't find *${match[1]}* on your ${toolName} board. Try *@wapa my tasks* to see what's there.` };
      const fromCol = STATUS_COLUMN[task.status] || 'In Progress';
      store.completeTask(task.id);
      const p = store.getSprintProgress();
      const isComplete = p.done === p.total;
      if (isComplete) {
        const topUser = store.users.reduce((best, u) => {
          const count = store.tasks.filter(t => t.assignee.id === u.id && t.status === 'done').length;
          return count > best.count ? { user: u, count } : best;
        }, { user: store.users[0], count: 0 });
        return {
          text: `🎉🎉🎉 That's ALL of them! ${store.sprint.name} is DONE!\n\n*${p.total}/${p.total} complete on ${toolName}* — 100%\n\n📈 Sprint stats:\n• Velocity: ${p.total} cards in 2 weeks\n• MVP: ${topUser.user.firstName} — ${topUser.count} tasks\n\nIncredible work team. Time to ship it! 🚀`,
          isSprintComplete: true,
          syncAction: { type: 'move', cardTitle: task.title, fromColumn: fromCol, toColumn: 'Done' },
        };
      }
      return {
        text: `✓ Moved *${task.title}* → Done on ${toolName}.\n${store.sprint.name}: ${p.done}/${p.total} complete (${p.percent}%)${p.total - p.done <= 3 ? ' — almost there!' : ''}`,
        syncAction: { type: 'move', cardTitle: task.title, fromColumn: fromCol, toColumn: 'Done' },
        isTaskComplete: true,
        quickReplies: ['My tasks', 'Sprint status'],
      };
    },
  },
  {
    regex: /^@wapa\s+assign\s+(.+?)\s+to\s+(.+)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      const user = findUserByName(match[2]);
      if (!task) return { text: `Couldn't find *${match[1]}* on ${toolName}.` };
      if (!user) return { text: `I don't know anyone named "${match[2]}". Team: Alex, Maya, Jordan, Sam, Riley.` };
      store.assignTask(task.id, user);
      return {
        text: `✓ *${task.title}* assigned to ${user.firstName} on ${toolName}.`,
        syncAction: { type: 'update', cardTitle: task.title, toColumn: STATUS_COLUMN[task.status] },
        quickReplies: ['My tasks', 'Sprint status'],
      };
    },
  },
  {
    regex: /^@wapa\s+move\s+(.+?)\s+to\s+backlog$/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `Couldn't find *${match[1]}* on ${toolName}.` };
      const fromCol = STATUS_COLUMN[task.status];
      // Remove from sprint by completing (simulated backlog)
      store.completeTask(task.id);
      const p = store.getSprintProgress();
      return {
        text: `✓ Moved *${task.title}* → Backlog on ${toolName}.\n${store.sprint.name} is now ${p.done}/${p.total} (${p.percent}%) — tighter scope, faster ship. 🚢`,
        syncAction: { type: 'move', cardTitle: task.title, fromColumn: fromCol, toColumn: 'Backlog' },
        quickReplies: ['Sprint status', 'My tasks'],
      };
    },
  },
  {
    regex: /^@wapa\s+(?:what'?s\s+overdue|overdue)[\s?]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const tasks = store.getOverdueTasks();
      if (tasks.length === 0) return { text: `No overdue cards on ${toolName}! 🎉`, quickReplies: ['Sprint status'] };
      return { text: `⚠️ Overdue on your ${toolName} board:\n\n${tasks.map(formatTaskLine).join('\n')}` };
    },
  },
  {
    regex: /^@wapa\s+(?:sprint\s+status|how'?s\s+the\s+sprint)[\s?]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const p = store.getSprintProgress();
      const end = new Date(store.sprint.endDate);
      const daysLeft = Math.max(0, Math.ceil((end.getTime() - Date.now()) / 86400000));
      let blockerText = '';
      if (p.blocked > 0) {
        const blocked = store.getBlockedTasks();
        blockerText = `\n\n🚫 Blocked:\n${blocked.map(t => `• *${t.title}* — ${t.blockReason || 'no reason'}`).join('\n')}`;
      }
      return {
        text: `📊 *${store.sprint.name} from ${toolName}:*\n\n${progressBar(p.percent)} ${p.percent}%\n\n✅ ${p.done} done · 🔨 ${p.inProgress} in progress · 🚫 ${p.blocked} blocked · 📝 ${p.todo} todo\n\n${daysLeft} day${daysLeft !== 1 ? 's' : ''} left — ${p.percent >= 50 ? 'on track!' : "let's push!"}${blockerText}`,
        quickReplies: p.blocked > 0 ? ['Show blockers', 'My tasks'] : ['My tasks'],
      };
    },
  },
  {
    regex: /^@wapa\s+my\s+tasks[\s?]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const tasks = store.getMyTasks();
      if (tasks.length === 0) return { text: `You're all clear on ${toolName}! 🎉`, quickReplies: ['Sprint status'] };
      return {
        text: `📋 ${store.currentUser.firstName}, here are your tasks from ${toolName}:\n\n${tasks.map(formatTaskLine).join('\n')}\n\n${tasks.length} card${tasks.length !== 1 ? 's' : ''} assigned to you.`,
        quickReplies: ['Sprint status'],
      };
    },
  },
  {
    regex: /^@wapa\s+(?:what'?s\s+blocked|show\s+blockers?)[\s?]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const blocked = store.getBlockedTasks();
      if (blocked.length === 0) return { text: `No blockers on ${toolName}! 🎉`, quickReplies: ['Sprint status'] };
      const lines = blocked.map((t, i) => {
        const days = Math.max(1, Math.ceil((Date.now() - new Date(t.createdAt).getTime()) / 86400000));
        return `${i + 1}. *${t.title}* — ${t.blockReason || 'no reason'} (${days} days)`;
      }).join('\n');
      return {
        text: `🚫 ${blocked.length} card${blocked.length > 1 ? 's' : ''} blocked on ${toolName}:\n\n${lines}\n\nWant me to ping the team?`,
        quickReplies: ['Yes, ping them', "No, I'll handle it"],
      };
    },
  },
  {
    regex: /^@wapa\s+standup[\s?]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const p = store.getSprintProgress();
      const overdue = store.getOverdueTasks();
      const blocked = store.getBlockedTasks();
      const dueToday = store.getTasksDueToday();
      let text = `☀️ *Morning standup — ${store.sprint.name} from ${toolName}:*\n\n📋 ${p.total} cards total\n✅ Done: ${p.done} · 🔨 In Progress: ${p.inProgress} · 🚫 Blocked: ${p.blocked} · 📝 Todo: ${p.todo}`;
      if (overdue.length > 0) text += `\n\n🔴 Overdue:\n${overdue.map(t => `• *${t.title}* (${t.assignee.firstName})`).join('\n')}`;
      if (blocked.length > 0) text += `\n\n🚫 Blocked:\n${blocked.map(t => `• *${t.title}* (${t.assignee.firstName}) — ${t.blockReason || 'no reason'}`).join('\n')}`;
      if (dueToday.length > 0) text += `\n\n📅 Due today:\n${dueToday.map(t => `• *${t.title}* (${t.assignee.firstName})`).join('\n')}`;
      text += `\n\nQuestions? Just ask. Or update your tasks right here 👇`;
      return { text, quickReplies: ['My tasks', 'Show blockers'] };
    },
  },

  // ──────────────────────────────────────────────────────
  // NATURAL CONVERSATION DETECTION (suggest, don't act)
  // ──────────────────────────────────────────────────────
  {
    regex: /^(?:(.+?)\s+is\s+done|(?:finished|completed|just pushed)\s+(.+))[\s!.🎉]*$/i,
    handler: (match) => {
      const taskName = (match[1] || match[2]).trim();
      const store = useSimulationStore.getState();
      const task = store.findTask(taskName);
      if (!task) return { text: `Nice work! I couldn't match that to a card on ${toolName} though.` };
      if (task.status === 'done') return { text: `*${task.title}* is already Done on ${toolName}. 👍` };
      const fromCol = STATUS_COLUMN[task.status];
      pendingSuggestion = {
        actionType: 'complete',
        taskId: task.id,
        description: `Move ${task.title} to Done`,
        execute: () => {
          store.completeTask(task.id);
          const p = store.getSprintProgress();
          const isComplete = p.done === p.total;
          if (isComplete) {
            return {
              text: `🎉🎉🎉 That's ALL of them! ${store.sprint.name} is DONE!\n\n*${p.total}/${p.total} complete on ${toolName}*\n\nIncredible work team! 🚀`,
              isSprintComplete: true,
              syncAction: { type: 'move', cardTitle: task.title, fromColumn: fromCol, toColumn: 'Done' },
            };
          }
          return {
            text: `✓ Moved *${task.title}* → Done on ${toolName}.\n${store.sprint.name}: ${p.done}/${p.total} complete (${p.percent}%)`,
            syncAction: { type: 'move', cardTitle: task.title, fromColumn: fromCol, toColumn: 'Done' },
            isTaskComplete: true,
          };
        },
      };
      return {
        text: `Nice! Want me to move *${task.title}* to Done on ${toolName}?`,
        quickReplies: ['✅ Yes', 'Not yet', 'Wrong task'],
      };
    },
  },
  {
    regex: /^(.+?)\s+is\s+blocked(?:\s+(?:by|on)\s+(.+))?[\s.!]*$/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `I couldn't match that to a card on ${toolName}.` };
      const reason = match[2]?.trim();
      pendingSuggestion = {
        actionType: 'block',
        taskId: task.id,
        description: `Flag ${task.title} as blocked`,
        execute: () => {
          store.blockTask(task.id, reason);
          return {
            text: `✓ Moved *${task.title}* → Blocked on ${toolName}.${reason ? ` Reason: ${reason}` : ''}\nI'll remind the group if it stays blocked for 48h.`,
            syncAction: { type: 'move', cardTitle: task.title, fromColumn: STATUS_COLUMN[task.status], toColumn: 'Blocked' },
          };
        },
      };
      return {
        text: `Flag *${task.title}* as blocked on ${toolName}?${reason ? ` Reason: "${reason}"` : ''}`,
        quickReplies: ['🚫 Yes, block it', 'No'],
      };
    },
  },
  {
    regex: /^(?:let'?s\s+)?(?:cut|remove)\s+(.+?)(?:\s+from\s+(?:this\s+)?sprint)?$/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `Couldn't find *${match[1]}* on ${toolName}.` };
      pendingSuggestion = {
        actionType: 'backlog',
        taskId: task.id,
        description: `Move ${task.title} to backlog`,
        execute: () => {
          const fromCol = STATUS_COLUMN[task.status];
          store.completeTask(task.id);
          const p = store.getSprintProgress();
          return {
            text: `✓ Moved *${task.title}* → Backlog on ${toolName}.\n${store.sprint.name} is now ${p.done}/${p.total} (${p.percent}%) — tighter scope, faster ship. 🚢`,
            syncAction: { type: 'move', cardTitle: task.title, fromColumn: fromCol, toColumn: 'Backlog' },
          };
        },
      };
      return {
        text: `Move *${task.title}* to Backlog on ${toolName}?`,
        quickReplies: ['Yes, backlog', 'Keep it'],
      };
    },
  },

  // ──────────────────────────────────────────────────────
  // NON-@WAPA QUERIES (still reference tool)
  // ──────────────────────────────────────────────────────
  {
    regex: /^(?:what'?s on my plate|my tasks?|what do i have|show me my tasks?)[\s?!]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const tasks = store.getMyTasks();
      if (tasks.length === 0) return { text: `You're all clear on ${toolName}! 🎉`, quickReplies: ['Sprint status'] };
      return {
        text: `📋 Here's your plate from ${toolName}, ${store.currentUser.firstName}:\n\n${tasks.map(formatTaskLine).join('\n')}\n\n${tasks.length} card${tasks.length !== 1 ? 's' : ''} assigned to you.`,
        quickReplies: ['Sprint status'],
      };
    },
  },
  {
    regex: /^(?:how'?s the sprint|sprint status|are we on track)[\s?!]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const p = store.getSprintProgress();
      const end = new Date(store.sprint.endDate);
      const daysLeft = Math.max(0, Math.ceil((end.getTime() - Date.now()) / 86400000));
      return {
        text: `📊 *${store.sprint.name} from ${toolName}:*\n\n${progressBar(p.percent)} ${p.percent}%\n✅ ${p.done} done · 🔨 ${p.inProgress} in progress · 🚫 ${p.blocked} blocked · 📝 ${p.todo} todo\n\n${daysLeft} day${daysLeft !== 1 ? 's' : ''} left.`,
        quickReplies: ['My tasks', 'Show blockers'],
      };
    },
  },
  {
    regex: /^(?:what'?s blocked|show blockers?|blocked tasks?)[\s?!]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const blocked = store.getBlockedTasks();
      if (blocked.length === 0) return { text: `No blockers on ${toolName}! 🎉` };
      const lines = blocked.map((t, i) => `${i + 1}. *${t.title}* — ${t.blockReason || 'no reason'}`).join('\n');
      return {
        text: `🚫 Blocked on your ${toolName} board:\n\n${lines}\n\nWant me to ping the team?`,
        quickReplies: ['Yes, ping them', "No, I'll handle it"],
      };
    },
  },
  {
    regex: /^(?:due today|what'?s due today)[\s?]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const tasks = store.getTasksDueToday();
      if (tasks.length === 0) return { text: `Nothing due today on ${toolName}! 🎉` };
      return { text: `📅 Due today on ${toolName}:\n\n${tasks.map(formatTaskLine).join('\n')}` };
    },
  },
  {
    regex: /^(?:overdue|overdue tasks?)[\s?]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const tasks = store.getOverdueTasks();
      if (tasks.length === 0) return { text: `No overdue cards on ${toolName}! 🎉` };
      return { text: `⚠️ Overdue on ${toolName}:\n\n${tasks.map(formatTaskLine).join('\n')}` };
    },
  },
  {
    regex: /^(?:standup|daily|daily standup)[\s?!]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const p = store.getSprintProgress();
      const overdue = store.getOverdueTasks();
      const blocked = store.getBlockedTasks();
      const dueToday = store.getTasksDueToday();
      let text = `☀️ *Morning standup — ${store.sprint.name} from ${toolName}:*\n\n📋 ${p.total} cards · ✅ ${p.done} done · 🔨 ${p.inProgress} in progress · 🚫 ${p.blocked} blocked`;
      if (overdue.length > 0) text += `\n\n🔴 Overdue:\n${overdue.map(t => `• *${t.title}* (${t.assignee.firstName})`).join('\n')}`;
      if (blocked.length > 0) text += `\n\n🚫 Blocked:\n${blocked.map(t => `• *${t.title}* — ${t.blockReason || 'no reason'}`).join('\n')}`;
      if (dueToday.length > 0) text += `\n\n📅 Due today:\n${dueToday.map(t => `• *${t.title}* (${t.assignee.firstName})`).join('\n')}`;
      return { text, quickReplies: ['My tasks', 'Show blockers'] };
    },
  },

  // ──────────────────────────────────────────────────────
  // TASK CREATION (bridge-aware)
  // ──────────────────────────────────────────────────────
  {
    regex: /^(?:@wapa\s+)?(?:add task[:\s]+|new task[:\s]+|create task[:\s]+)(.+)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const title = match[1].trim();
      const task = store.addTask(title);
      return {
        text: `✅ Added *${task.title}* to ${toolName} — assigned to you, due ${formatDueDate(task.dueDate)}.\nWant to set a priority?`,
        syncAction: { type: 'create', cardTitle: task.title, toColumn: 'Todo' },
        quickReplies: ['Low', 'Medium', 'High', 'Urgent'],
      };
    },
  },

  // ──────────────────────────────────────────────────────
  // ASSIGNMENT (non @wapa - suggest)
  // ──────────────────────────────────────────────────────
  {
    regex: /^(?:assign|give)\s+(.+?)\s+to\s+(.+)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      const user = findUserByName(match[2]);
      if (!task) return { text: `Couldn't find *${match[1]}* on ${toolName}.` };
      if (!user) return { text: `I don't know anyone named "${match[2]}". Team: Alex, Maya, Jordan, Sam, Riley.` };
      pendingSuggestion = {
        actionType: 'assign',
        taskId: task.id,
        description: `Assign ${task.title} to ${user.firstName}`,
        execute: () => {
          store.assignTask(task.id, user);
          return {
            text: `✓ *${task.title}* assigned to ${user.firstName} on ${toolName}. 👍`,
            syncAction: { type: 'update', cardTitle: task.title, toColumn: STATUS_COLUMN[task.status] },
          };
        },
      };
      return {
        text: `Move *${task.title}* to ${user.firstName} on ${toolName}?`,
        quickReplies: ['✅ Yes', 'No'],
      };
    },
  },

  // ──────────────────────────────────────────────────────
  // QUICK REPLY HANDLERS
  // ──────────────────────────────────────────────────────
  {
    regex: /^(?:yes,? ping them|ping the team)$/i,
    handler: () => ({
      text: `Done! I've pinged the team about the blockers in the group chat. 📢\nI'll follow up if they don't respond by end of day.`,
      quickReplies: ['Sprint status', 'My tasks'],
    }),
  },
  {
    regex: /^(?:no,? i'?ll handle it|i'll handle it)$/i,
    handler: () => ({ text: `Got it, it's all yours. 💪` }),
  },
  {
    regex: /^(low|medium|high|urgent)$/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const taskId = store.lastMentionedTaskId;
      if (!taskId) return { text: `What task should I set to ${match[1].toLowerCase()}?` };
      const task = store.tasks.find(t => t.id === taskId);
      if (!task) return { text: `What task should I set to ${match[1].toLowerCase()}?` };
      const priority = match[1].toLowerCase() as SimTask['priority'];
      store.setPriority(task.id, priority);
      return {
        text: `${PRIORITY_ICONS[priority]} *${task.title}* set to ${priority} on ${toolName}. Got it.`,
        syncAction: { type: 'update', cardTitle: task.title, toColumn: STATUS_COLUMN[task.status] },
      };
    },
  },
  {
    regex: /^yes,? add note$/i,
    handler: () => {
      if (pendingSuggestion) {
        const result = pendingSuggestion.execute();
        pendingSuggestion = null;
        return result;
      }
      return { text: `Nothing pending to update.` };
    },
  },
  {
    regex: /^🚫 ?yes,? block it$/i,
    handler: () => {
      if (pendingSuggestion) {
        const result = pendingSuggestion.execute();
        pendingSuggestion = null;
        return result;
      }
      return { text: `Nothing pending.` };
    },
  },
  {
    regex: /^yes,? backlog$/i,
    handler: () => {
      if (pendingSuggestion) {
        const result = pendingSuggestion.execute();
        pendingSuggestion = null;
        return result;
      }
      return { text: `Nothing pending.` };
    },
  },

  // ──────────────────────────────────────────────────────
  // CONVERSATION
  // ──────────────────────────────────────────────────────
  {
    regex: /^(?:hi|hey|hello|yo|sup)[\s!.]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const myTasks = store.getMyTasks();
      return {
        text: `Hey ${store.currentUser.firstName}! 👋 Your ${toolName} board has ${myTasks.length} task${myTasks.length !== 1 ? 's' : ''} on your plate.\nType *my tasks* or *sprint status* to see the details.`,
        quickReplies: ['My tasks', 'Sprint status'],
      };
    },
  },
  {
    regex: /^(?:good morning|morning)[\s!.]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const myTasks = store.getMyTasks();
      const dueToday = store.getTasksDueToday();
      const lines = myTasks.slice(0, 4).map(formatTaskLine).join('\n');
      return {
        text: `Good morning, ${store.currentUser.firstName}! ☀️\n\nHere's your day from ${toolName}:\n\n${lines}\n\n${dueToday.length > 0 ? `${dueToday.length} due today. Let's get it 💪` : 'Nothing urgent — good time to get ahead!'}`,
        quickReplies: ['Sprint status', 'Show blockers'],
      };
    },
  },
  {
    regex: /^(?:thanks?|thank you|ty|thx)[\s!.]*$/i,
    handler: () => ({
      text: ['Anytime 🤙', 'You got it!', 'No problem 💪', `Happy to help — ${toolName} is up to date. 🙌`][Math.floor(Math.random() * 4)],
    }),
  },
  {
    regex: /^(?:help|what can you do|commands?)[\s?]*$/i,
    handler: () => ({
      text: `I'm WAPA — I keep your ${toolName} board in sync with this chat. 💬\n\n*Bridge commands*\n@wapa mark [task] as done → update ${toolName}\n@wapa assign [task] to [person] → reassign\n@wapa move [task] to backlog → descope\n\n*Just chat naturally*\n"homepage is done" → I'll suggest a ${toolName} update\n"blocked on API keys" → I'll flag it\n\n*Info*\nmy tasks · sprint status · show blockers\ndue today · overdue · standup\n\nI listen to the group chat and suggest ${toolName} updates. You confirm with one tap. 👂`,
      quickReplies: ['My tasks', 'Sprint status'],
    }),
  },
  {
    regex: /^(?:connect|setup|connect my (?:board|sheet))[\s?]*$/i,
    handler: () => ({
      text: `Sure! I can connect to your team's PM tool. What do you use?\n\nPaste your board URL and I'll hook it up.`,
      quickReplies: ['Trello', 'Google Sheets', 'Asana'],
    }),
  },
];

export function processMessage(text: string): SimResponse {
  const trimmed = text.trim();
  for (const pattern of patterns) {
    const match = trimmed.match(pattern.regex);
    if (match) return pattern.handler(match);
  }
  return {
    text: `I'm listening to the chat and watching your ${toolName} board. 👂\n\nTry:\n• *@wapa mark [task] as done*\n• *@wapa sprint status*\n• Or just chat naturally — I'll catch task updates.\n\nType *help* for more.`,
    quickReplies: ['Help', 'My tasks', 'Sprint status'],
  };
}

export function clearPendingSuggestion() {
  pendingSuggestion = null;
}
