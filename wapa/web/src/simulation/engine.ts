import { useSimulationStore, findUserByName } from '../stores/simulation-store';
import type { SimTask } from '../stores/simulation-store';

export interface SimResponse {
  text: string;
  quickReplies?: string[];
  isSprintComplete?: boolean;
  isTaskComplete?: boolean;
}

const PRIORITY_ICONS: Record<string, string> = {
  urgent: '\u{1F534}',
  high: '\u{1F7E0}',
  medium: '\u{1F7E1}',
  low: '\u{1F7E2}',
};

function progressBar(percent: number): string {
  const total = 10;
  const filled = Math.round((percent / 100) * total);
  const inProg = Math.min(1, total - filled);
  const empty = total - filled - inProg;
  return '\u2588'.repeat(filled) + '\u2592'.repeat(inProg) + '\u2591'.repeat(empty);
}

function formatDueDate(dateStr: string): string {
  const d = new Date(dateStr);
  const now = new Date();
  const today = now.toISOString().slice(0, 10);
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const tomorrowStr = tomorrow.toISOString().slice(0, 10);

  if (dateStr === today) return 'today';
  if (dateStr === tomorrowStr) return 'tomorrow';

  const diff = Math.ceil((d.getTime() - now.getTime()) / 86400000);
  if (diff < 0) return `${Math.abs(diff)} days overdue`;
  if (diff <= 7) return `in ${diff} days`;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function formatTaskLine(t: SimTask): string {
  const icon = PRIORITY_ICONS[t.priority] || '\u{1F7E1}';
  const status = t.status === 'blocked' ? ' \u{1F6AB}' : t.status === 'in_progress' ? ' \u{1F504}' : '';
  const due = t.dueDate ? ` \u2014 due ${formatDueDate(t.dueDate)}` : '';
  return `${icon} *${t.title}*${status}${due}`;
}

type Pattern = {
  regex: RegExp;
  handler: (match: RegExpMatchArray) => SimResponse;
};

function parseDate(text: string): string {
  const lower = text.toLowerCase().trim();
  const now = new Date();
  if (lower === 'today') return now.toISOString().slice(0, 10);
  if (lower === 'tomorrow') {
    now.setDate(now.getDate() + 1);
    return now.toISOString().slice(0, 10);
  }
  const inDays = lower.match(/in (\d+) days?/);
  if (inDays) {
    now.setDate(now.getDate() + parseInt(inDays[1]));
    return now.toISOString().slice(0, 10);
  }
  const parsed = new Date(text);
  if (!isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  now.setDate(now.getDate() + 5);
  return now.toISOString().slice(0, 10);
}

const patterns: Pattern[] = [
  // TASK CREATION
  {
    regex: /^(?:add task[:\s]+|new task[:\s]+|todo[:\s]+)(.+)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const title = match[1].trim();
      const task = store.addTask(title);
      const due = formatDueDate(task.dueDate);
      return {
        text: `\u2705 *${task.title}* \u2014 assigned to you, due ${due}\nWant to set a priority?`,
        quickReplies: ['Low', 'Medium', 'High', 'Urgent'],
      };
    },
  },
  {
    regex: /^(.+?)\s+is a task$/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const title = match[1].trim();
      const task = store.addTask(title);
      return {
        text: `\u2705 *${task.title}* \u2014 assigned to you, due ${formatDueDate(task.dueDate)}`,
        quickReplies: ['My tasks', 'Sprint status'],
      };
    },
  },

  // TASK COMPLETION
  {
    regex: /^(?:done with|finished|completed|✅)\s+(.+)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `Hmm, I couldn't find a task matching "${match[1]}". Try *my tasks* to see your list.` };
      store.completeTask(task.id);
      const progress = store.getSprintProgress();
      const isSprintComplete = progress.done === progress.total;
      if (isSprintComplete) {
        const topUser = store.users.reduce((best, u) => {
          const count = store.tasks.filter(t => t.assignee.id === u.id && t.status === 'done').length;
          return count > best.count ? { user: u, count } : best;
        }, { user: store.users[0], count: 0 });
        return {
          text: `\u{1F389}\u{1F389}\u{1F389} That's ALL of them! ${store.sprint.name} is DONE!\n\n\u2705 ${progress.total}/${progress.total} tasks complete\n\u26A1 Velocity: ${progress.total} pts\n\u{1F3C6} MVP: ${topUser.user.firstName} \u2014 ${topUser.count} tasks\n\nIncredible work, team \u{1F680}`,
          isSprintComplete: true,
        };
      }
      return {
        text: `\u{1F389} Nice \u2014 *${task.title}* is done!\n${store.sprint.name}: ${progressBar(progress.percent)} ${progress.percent}% \u2014 ${progress.done} of ${progress.total} done\n${progress.total - progress.done} tasks left \u{1F4AA}`,
        quickReplies: ['My tasks', 'Sprint status'],
        isTaskComplete: true,
      };
    },
  },
  {
    regex: /^(.+?)\s+is done$/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `Hmm, I couldn't find a task matching "${match[1]}". Try *my tasks* to see your list.` };
      store.completeTask(task.id);
      const progress = store.getSprintProgress();
      return {
        text: `\u{1F389} Nice \u2014 *${task.title}* is done!\n${store.sprint.name}: ${progressBar(progress.percent)} ${progress.percent}% \u2014 ${progress.done} of ${progress.total} done`,
        quickReplies: ['My tasks', 'Sprint status'],
        isTaskComplete: true,
      };
    },
  },

  // ASSIGNMENT
  {
    regex: /^(?:assign|give)\s+(.+?)\s+to\s+(.+)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      const user = findUserByName(match[2]);
      if (!task) return { text: `Couldn't find task "${match[1]}". Try *my tasks* to see available tasks.` };
      if (!user) return { text: `I don't know anyone named "${match[2]}". Team: Alex, Maya, Jordan, Sam, Riley.` };
      store.assignTask(task.id, user);
      return {
        text: `Done \u2014 ${user.firstName}'s on *${task.title}* \u{1F44D}\nI'll let ${user.firstName === 'Alex' ? 'you' : 'them'} know in the group chat.`,
        quickReplies: ['My tasks', 'Sprint status'],
      };
    },
  },
  {
    regex: /^(.+?)\s+should do\s+(.+)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const user = findUserByName(match[1]);
      const task = store.findTask(match[2]);
      if (!user) return { text: `I don't know anyone named "${match[1]}". Team: Alex, Maya, Jordan, Sam, Riley.` };
      if (!task) return { text: `Couldn't find task "${match[2]}".` };
      store.assignTask(task.id, user);
      return { text: `Done \u2014 ${user.firstName}'s on *${task.title}* \u{1F44D}` };
    },
  },

  // BLOCKING
  {
    regex: /^(.+?)\s+is blocked(?:\s+by\s+(.+))?$/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `Couldn't find task "${match[1]}".` };
      const reason = match[2]?.trim();
      store.blockTask(task.id, reason);
      if (reason) {
        return {
          text: `\u{1F6AB} *${task.title}* is blocked \u2014 ${reason}\nI'll flag it for the team.`,
          quickReplies: ['Show blockers', 'Sprint status'],
        };
      }
      return { text: `\u{1F6AB} *${task.title}* is blocked.\nWhat's the reason?` };
    },
  },
  {
    regex: /^(?:unblock)\s+(.+)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `Couldn't find task "${match[1]}".` };
      store.unblockTask(task.id);
      return {
        text: `Back in action \u2705 *${task.title}* moved to in progress.`,
        quickReplies: ['My tasks', 'Sprint status'],
      };
    },
  },
  {
    regex: /^(.+?)\s+is unblocked$/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `Couldn't find task "${match[1]}".` };
      store.unblockTask(task.id);
      return { text: `Back in action \u2705 *${task.title}* moved to in progress.` };
    },
  },

  // PRIORITY
  {
    regex: /^(.+?)\s+is (urgent|high priority|low priority|medium priority)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `Couldn't find task "${match[1]}".` };
      const pMap: Record<string, SimTask['priority']> = { 'urgent': 'urgent', 'high priority': 'high', 'medium priority': 'medium', 'low priority': 'low' };
      const priority = pMap[match[2].toLowerCase()] || 'medium';
      store.setPriority(task.id, priority);
      const icon = PRIORITY_ICONS[priority];
      return { text: `${icon} *${task.title}* bumped to ${priority}. On it.` };
    },
  },
  {
    regex: /^deprioritize\s+(.+)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `Couldn't find task "${match[1]}".` };
      store.setPriority(task.id, 'low');
      return { text: `\u{1F7E2} *${task.title}* set to low priority.` };
    },
  },

  // DUE DATE
  {
    regex: /^(?:push|extend)\s+(.+?)\s+to\s+(.+)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `Couldn't find task "${match[1]}".` };
      const date = parseDate(match[2]);
      store.setDueDate(task.id, date);
      return { text: `\u{1F4C5} *${task.title}* pushed to ${formatDueDate(date)}. Got it.` };
    },
  },
  {
    regex: /^(.+?)\s+due\s+(.+)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `Couldn't find task "${match[1]}".` };
      const date = parseDate(match[2]);
      store.setDueDate(task.id, date);
      return { text: `\u{1F4C5} *${task.title}* due ${formatDueDate(date)}. Got it.` };
    },
  },

  // NOTES
  {
    regex: /^note on\s+(.+?):\s+(.+)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const task = store.findTask(match[1]);
      if (!task) return { text: `Couldn't find task "${match[1]}".` };
      store.addNote(task.id, match[2].trim());
      const preview = match[2].trim().slice(0, 40);
      return { text: `\u{1F4DD} Noted on *${task.title}* \u2014 '${preview}${match[2].length > 40 ? '...' : ''}'` };
    },
  },
  {
    regex: /^(?:note:\s*|btw\s+)(.+)/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const taskId = store.lastMentionedTaskId;
      if (!taskId) return { text: `Which task should I add this note to? Try *note on [task]: [text]*` };
      const task = store.tasks.find(t => t.id === taskId);
      if (!task) return { text: `Which task should I add this note to?` };
      store.addNote(task.id, match[1].trim());
      const preview = match[1].trim().slice(0, 40);
      return { text: `\u{1F4DD} Noted on *${task.title}* \u2014 '${preview}${match[1].length > 40 ? '...' : ''}'` };
    },
  },

  // QUERIES: MY TASKS
  {
    regex: /^(?:what'?s on my plate|my tasks?|what do i have|show me my tasks?|what'?s left)[\s?!]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const tasks = store.getMyTasks();
      if (tasks.length === 0) return { text: `You're all clear! No tasks assigned to you right now \u{1F389}`, quickReplies: ['Add a task', 'Sprint status'] };
      const dueToday = tasks.filter(t => t.dueDate === new Date().toISOString().slice(0, 10)).length;
      const lines = tasks.map(formatTaskLine).join('\n');
      const dueTodayText = dueToday > 0 ? `${dueToday} due today. ` : '';
      return {
        text: `Here's your plate, ${store.currentUser.firstName}:\n\n${lines}\n\n${tasks.length} tasks \u2014 ${dueTodayText}You got this \u{1F4AA}`,
        quickReplies: ['Sprint status', 'Add a task'],
      };
    },
  },

  // QUERIES: SPRINT STATUS
  {
    regex: /^(?:how'?s the sprint|sprint status|are we on track|sprint update)[\s?!]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const p = store.getSprintProgress();
      const now = new Date();
      const end = new Date(store.sprint.endDate);
      const daysLeft = Math.max(0, Math.ceil((end.getTime() - now.getTime()) / 86400000));
      let blockerText = '';
      if (p.blocked > 0) {
        const blocked = store.getBlockedTasks();
        const blockerLines = blocked.map(t => `\u{1F6AB} *${t.title}* \u2014 ${t.blockReason || 'no reason'}`).join('\n');
        blockerText = `\n\n${p.blocked} blocker${p.blocked > 1 ? 's' : ''} need attention:\n${blockerLines}`;
      }
      return {
        text: `\u{1F4CA} *${store.sprint.name}: ${store.project.name}*\n\n${progressBar(p.percent)} ${p.percent}%\n\n\u2705 ${p.done} done \u00B7 \u{1F504} ${p.inProgress} in progress \u00B7 \u{1F6AB} ${p.blocked} blocked \u00B7 \u{1F4CB} ${p.todo} todo\n\n${daysLeft} days left \u2014 ${p.percent >= 50 ? 'on track!' : 'let\'s push!'}${blockerText}`,
        quickReplies: p.blocked > 0 ? ['Show blockers', 'My tasks'] : ['My tasks', 'Add a task'],
      };
    },
  },

  // QUERIES: BLOCKED
  {
    regex: /^(?:what'?s blocked|show blockers?|blocked tasks?)[\s?!]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const blocked = store.getBlockedTasks();
      if (blocked.length === 0) return { text: `No blockers right now! \u{1F389}`, quickReplies: ['Sprint status', 'My tasks'] };
      const lines = blocked.map((t, i) => {
        const days = Math.max(1, Math.ceil((Date.now() - new Date(t.createdAt).getTime()) / 86400000));
        return `${i + 1}. *${t.title}* \u2014 ${t.blockReason || 'no reason'} (${days} days)`;
      }).join('\n');
      return {
        text: `\u{1F6AB} ${blocked.length} task${blocked.length > 1 ? 's' : ''} blocked right now:\n\n${lines}\n\nWant me to ping the team about these?`,
        quickReplies: ['Yes, ping them', "No, I'll handle it"],
      };
    },
  },

  // QUERIES: PERSON'S TASKS
  {
    regex: /^(?:what'?s|what is)\s+(\w+)\s+working on[\s?]*$/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const tasks = store.getTasksByAssignee(match[1]);
      const active = tasks.filter(t => t.status !== 'done');
      if (active.length === 0) return { text: `${match[1]} has no active tasks right now.` };
      const lines = active.map(formatTaskLine).join('\n');
      return { text: `${match[1]}'s plate:\n\n${lines}` };
    },
  },
  {
    regex: /^(\w+)'?s? tasks?[\s?]*$/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const name = match[1];
      if (name.toLowerCase() === 'my') {
        const tasks = store.getMyTasks();
        if (tasks.length === 0) return { text: `You're all clear!`, quickReplies: ['Add a task'] };
        return { text: `Here's your plate:\n\n${tasks.map(formatTaskLine).join('\n')}` };
      }
      const tasks = store.getTasksByAssignee(name);
      const active = tasks.filter(t => t.status !== 'done');
      if (active.length === 0) return { text: `${name} has no active tasks.` };
      return { text: `${name}'s plate:\n\n${active.map(formatTaskLine).join('\n')}` };
    },
  },

  // QUERIES: DUE DATE FILTERS
  {
    regex: /^(?:what'?s due today|due today)[\s?]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const tasks = store.getTasksDueToday();
      if (tasks.length === 0) return { text: `Nothing due today \u{1F389}`, quickReplies: ['My tasks', 'Sprint status'] };
      return { text: `Due today:\n\n${tasks.map(formatTaskLine).join('\n')}` };
    },
  },
  {
    regex: /^(?:what'?s due this week|due this week)[\s?]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const tasks = store.getTasksDueThisWeek();
      if (tasks.length === 0) return { text: `Nothing due this week \u{1F389}` };
      return { text: `Due this week:\n\n${tasks.map(formatTaskLine).join('\n')}` };
    },
  },
  {
    regex: /^(?:overdue tasks?|overdue)[\s?]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const tasks = store.getOverdueTasks();
      if (tasks.length === 0) return { text: `No overdue tasks! \u{1F389}` };
      return { text: `\u{26A0}\u{FE0F} Overdue:\n\n${tasks.map(formatTaskLine).join('\n')}` };
    },
  },

  // CONVERSATION
  {
    regex: /^(?:hi|hey|hello|yo|sup)[\s!.]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const myTasks = store.getMyTasks();
      const dueToday = store.getTasksDueToday();
      return {
        text: `Hey ${store.currentUser.firstName}! \u{1F44B} Ready to crush it today?\n\nYou've got ${myTasks.length} task${myTasks.length !== 1 ? 's' : ''} on your plate${dueToday.length > 0 ? ` \u2014 ${dueToday.length} due today` : ''}.\nType *my tasks* to see the details.`,
        quickReplies: ['My tasks', 'Sprint status', 'Add a task'],
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
        text: `Good morning, ${store.currentUser.firstName}! \u2600\u{FE0F}\n\nHere's your day:\n\n${lines}\n\n${dueToday.length > 0 ? `${dueToday.length} task${dueToday.length !== 1 ? 's' : ''} due today. Let's get it \u{1F4AA}` : 'Nothing urgent today \u2014 good time to get ahead!'}`,
        quickReplies: ['Sprint status', 'Show blockers'],
      };
    },
  },
  {
    regex: /^(?:thanks?|thank you|ty|thx)[\s!.]*$/i,
    handler: () => ({
      text: ['Anytime \u{1F44A}', 'You got it!', 'No problem \u{1F4AA}', 'Happy to help \u{1F64C}'][Math.floor(Math.random() * 4)],
    }),
  },

  // HELP
  {
    regex: /^(?:help|what can you do|commands?)[\s?]*$/i,
    handler: () => ({
      text: `Here's what I can do \u{1F4AC}\n\n*Tasks*\nadd task: [name] \u2014 create a task\ndone with [task] \u2014 mark complete\nassign [task] to [person] \u2014 reassign\n[task] is blocked \u2014 flag a blocker\n\n*Info*\nmy tasks \u2014 see your plate\nhow's the sprint \u2014 sprint progress\nwhat's blocked \u2014 view blockers\n\n*Other*\nnote on [task]: [text] \u2014 add a note\n[task] is urgent \u2014 set priority\npush [task] to [date] \u2014 change due date\n\nJust text me naturally \u2014 I'll figure it out! \u{1F919}`,
      quickReplies: ['My tasks', 'Sprint status'],
    }),
  },

  // PROJECT / SPRINT
  {
    regex: /^(?:new project|create project)[:\s]+(.+)/i,
    handler: (match) => ({
      text: `\u2705 *${match[1].trim()}* project created!\nI've set up Sprint 1 (2 weeks) to get you started.\n\nAdd your first task: *add task: [name]*`,
      quickReplies: ['Add a task'],
    }),
  },
  {
    regex: /^start a new sprint[\s!]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      return {
        text: `\u2705 *Sprint 5* is live! Runs for 2 weeks.\n\n${store.sprint.name} carryover: any incomplete tasks have been moved over.\n\nLet's go! \u{1F680}`,
        quickReplies: ['My tasks', 'Sprint status'],
      };
    },
  },

  // Quick reply handlers
  {
    regex: /^(?:yes,? ping them|ping the team)$/i,
    handler: () => ({
      text: `Done! I've pinged the team about the blockers in the group chat \u{1F4E2}\nI'll follow up if they don't respond by end of day.`,
      quickReplies: ['Sprint status', 'My tasks'],
    }),
  },
  {
    regex: /^(?:no,? i'?ll handle it|i'll handle it)$/i,
    handler: () => ({
      text: `Got it, it's all yours \u{1F4AA}`,
    }),
  },
  {
    regex: /^(?:show me around|let'?s go)$/i,
    handler: () => ({
      text: `Here's the deal \u2014 you text me, I manage your projects. No apps. No dashboards. Just chat. \u{1F4AC}\n\nTry it \u2014 type something like:\n*add task: design the homepage*`,
      quickReplies: ['Add a task', 'My tasks', 'Help'],
    }),
  },

  // Priority quick replies
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
      return { text: `${PRIORITY_ICONS[priority]} *${task.title}* set to ${priority}. Got it.` };
    },
  },

  // STANDUP
  {
    regex: /^(?:standup|daily|daily standup)[\s?!]*$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const userSummaries = store.users.map(u => {
        const userTasks = store.tasks.filter(t => t.assignee.id === u.id);
        const done = userTasks.filter(t => t.status === 'done').slice(-1);
        const inProg = userTasks.filter(t => t.status === 'in_progress').slice(0, 1);
        const blocked = userTasks.filter(t => t.status === 'blocked').slice(0, 1);
        let summary = u.firstName + ': ';
        if (done.length > 0) summary += `Completed ${done[0].title}`;
        if (inProg.length > 0) summary += `${done.length > 0 ? ' \u2192 ' : ''}Working on ${inProg[0].title}`;
        if (blocked.length > 0) summary += ` \u{1F6AB} Blocked on ${blocked[0].title}`;
        if (!done.length && !inProg.length && !blocked.length) summary += 'No updates';
        return summary;
      }).join('\n');
      const blockedCount = store.getBlockedTasks().length;
      return {
        text: `Standup Summary for today:\n\n${userSummaries}${blockedCount > 0 ? `\n\n${blockedCount} blocker${blockedCount > 1 ? 's' : ''} need attention.` : ''}`,
        quickReplies: ['Show blockers', 'Sprint status'],
      };
    },
  },

  // Mark as done shorthand
  {
    regex: /^mark (?:as )?done$/i,
    handler: () => {
      const store = useSimulationStore.getState();
      const taskId = store.lastMentionedTaskId;
      if (!taskId) return { text: `Which task should I mark as done? Try *done with [task name]*` };
      const task = store.tasks.find(t => t.id === taskId);
      if (!task) return { text: `Which task should I mark as done?` };
      store.completeTask(task.id);
      const progress = store.getSprintProgress();
      return {
        text: `\u{1F389} Nice \u2014 *${task.title}* is done!\n${store.sprint.name}: ${progressBar(progress.percent)} ${progress.percent}%`,
        quickReplies: ['My tasks', 'Sprint status'],
        isTaskComplete: true,
      };
    },
  },

  // Assign it shorthand
  {
    regex: /^assign (?:it )?to (\w+)$/i,
    handler: (match) => {
      const store = useSimulationStore.getState();
      const taskId = store.lastMentionedTaskId;
      const user = findUserByName(match[1]);
      if (!taskId || !user) return { text: `Which task and to whom? Try *assign [task] to [person]*` };
      const task = store.tasks.find(t => t.id === taskId);
      if (!task) return { text: `Which task? Try *assign [task] to [person]*` };
      store.assignTask(task.id, user);
      return { text: `Done \u2014 ${user.firstName}'s on *${task.title}* \u{1F44D}` };
    },
  },
];

export function processMessage(text: string): SimResponse {
  const trimmed = text.trim();
  for (const pattern of patterns) {
    const match = trimmed.match(pattern.regex);
    if (match) return pattern.handler(match);
  }
  return {
    text: `Hmm, I didn't catch that \u{1F914}\nTry something like:\n\u2022 *add task: design the footer*\n\u2022 *done with [task name]*\n\u2022 *how's the sprint*\n\nOr type *help* for everything I can do.`,
    quickReplies: ['Help', 'My tasks', 'Sprint status'],
  };
}
